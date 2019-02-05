import Koa from "koa";
import Router from "koa-router";

const koa = new Koa();
const router = new Router();

router.get("/*", async (ctx) => {
    ctx.body = "Hello World";
});

koa.use(router.routes());

koa.listen(4000);
