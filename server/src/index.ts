import * as fs from "fs";
import http from "http";
import Koa from "koa";
import koaMount from "koa-mount";
import Router from "koa-router";
import koaStatic from "koa-static";
import * as path from "path";
import {Socket} from "socket.io";
import {DisplayState} from "../../common/src/DisplayState";
import {loadConfig} from "./Config";

const config = loadConfig();

const koa = new Koa();
const router = new Router();

router.get("/musicCollections", async (ctx) => {
    const allItems = fs.readdirSync(config.musicPath);

    ctx.body = allItems.filter((item) => {
        return fs.lstatSync(path.join(config.musicPath, item)).isDirectory();
    });
});

router.get("/creatureIcons", async (ctx) => {
    ctx.body = fs.readdirSync(config.creatureIconsPath);
});

router.get("/effectList", async (ctx) => {
    ctx.body = fs.readdirSync(config.effectsPath);
});

router.get("/musicList*", async (ctx) => {
    const category = ctx.query.category;
    if (!category) {
        ctx.throw(400, "category parameter missing");
        return;
    }

    const allItems = fs.readdirSync(path.join(config.musicPath, category));

    ctx.body = allItems.filter((item) => {
        return item.endsWith("m4a") ||
            item.endsWith("ogg") ||
            item.endsWith("flac") ||
            item.endsWith("mp3") ||
            item.endsWith("wav");
    });
});

koa
    .use(async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", ctx.get("Origin"));
        ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
        ctx.set("Access-Control-Allow-Credentials", "true");
        await next();
    })
    .use(koaMount("/display/", koaStatic(path.join(process.cwd(), "../display/build"))))
    .use(koaMount("/admin/", koaStatic(path.join(process.cwd(), "../admin/build"))))
    .use(koaMount("/music/", koaStatic(config.musicPath)))
    .use(koaMount("/effects/", koaStatic(config.effectsPath)))
    .use(koaMount("/creatures/", koaStatic(config.creatureIconsPath)))
    .use(router.routes());

let currentState: DisplayState;

const socketHttp = http.createServer(koa.callback());
// tslint:disable-next-line
const socketConnection = require("socket.io")(socketHttp);

const eventsToBroadcast = [
    "onMusicEnded",
    "onEffectEnded",
];

socketConnection.on("connection", (socket: Socket) => {
    if (currentState) {
        socket.emit("broadcast-state", currentState);
    }

    socket.on("broadcast-state", (state: DisplayState) => {
        currentState = state;
        socket.broadcast.emit("broadcast-state", state);
    });

    for (const event of eventsToBroadcast) {
        socket.on(event, (data: any) => {
            socket.broadcast.emit(event, data);
        });
    }
});

socketHttp.listen(4000);
