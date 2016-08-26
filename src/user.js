/**
 * Created by Biless on 2016/8/26.
 */

const Router = require('koa-router');
const router = new Router();

router.get("/user/:system/:arch/", ctx => {
    ctx.body = "hello User";
});

module.exports = router.routes();