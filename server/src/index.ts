import * as fs from "fs";
import Koa from "koa";
import koaMount from "koa-mount";
import Router from "koa-router";
import koaStatic from "koa-static";
import * as path from "path";
import {AudioState} from "../../common/src/AudioState";
import {loadConfig} from "./Config";

const config = loadConfig();

const koa = new Koa();
const router = new Router();

// Dummy class to keep dist folder output
// noinspection JSUnusedLocalSymbols
const dummy: AudioState = {playbackUuid: "", url: "", paused: false};

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

koa
    .use(koaMount("/display/", koaStatic(path.join(process.cwd(), "../display/build"))))
    .use(router.routes())
    .listen(4000);
