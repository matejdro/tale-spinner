import * as fs from "fs";
import Koa from "koa";
import koaMount from "koa-mount";
import koaStatic from "koa-static";
import * as path from "path";
import {Config, configDecoder} from "./Config";

const koa = new Koa();
const config = loadConfig();

koa
    .use(koaMount("/display/", koaStatic(path.join(process.cwd(), "../display/build"))))
    .listen(4000);

function loadConfig(): Config {
    const configFile = path.join(process.cwd(), "config.json");

    if (!fs.existsSync(configFile)) {
        throw new Error("config.json missing");
    }

    const configText = fs.readFileSync(configFile, "utf8");

    try {
        return configDecoder.runWithException(JSON.parse(configText));
    } catch (e) {
        throw new Error("config.json decoding failed: " + e.message);
    }
}
