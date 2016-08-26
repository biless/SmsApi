/**
 * Created by Biless on 2016/8/26.
 */

const Router = require('koa-router');
const router = new Router();

router.get("/user/:system/:arch/", ctx => {
    ctx.body = { token: ""};
});

module.exports = router.routes();