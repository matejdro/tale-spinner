import Koa from "koa";
import koaMount from "koa-mount";
import koaStatic from "koa-static";
import * as path from "path";

const koa = new Koa();

koa
    .use(koaMount("/display/", koaStatic(path.join(process.cwd(), "../display/build"))))
    .listen(4000);
