import * as fs from "fs";
import http from "http";
import Koa from "koa";
import koaMount from "koa-mount";
import Router from "koa-router";
import koaStatic from "koa-static";
import * as path from "path";
import {Socket} from "socket.io";
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

router.get("/musicList*", async (ctx) => {
    const category = ctx.query.category;
    if (!category) {
        ctx.throw(400, "category parameter missing");
        return;
    }

    const allItems = fs.readdirSync(path.join(config.musicPath, category));

    ctx.body = allItems.filter((item) => {
        return item.endsWith("m4a") || item.endsWith("oog") || item.endsWith("flac") || item.endsWith("mp3");
    });
});

const socketHttp = http.createServer(koa.callback());
// tslint:disable-next-line
const socketConnection = require("socket.io")(socketHttp);

socketConnection.on("connection", (socket: Socket) => {
    console.log("Client connected", socket);
});

koa
    .use(async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", "http://localhost:3001");
        ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
        ctx.set("Access-Control-Allow-Credentials", "true");
        await next();
    })
    .use(koaMount("/display/", koaStatic(path.join(process.cwd(), "../display/build"))))
    .use(koaMount("/music/", koaStatic(config.musicPath)))
    .use(router.routes())
    .listen(4000);
