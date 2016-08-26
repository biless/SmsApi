/**
 * Created by Biless on 2016/8/26.
 */

const Koa = require('koa');
const Router = require('koa-router');
const fs = require("fs");
const userRouter = require("./src/user.js");
const app = new Koa();
const router = new Router();


router.get('/version/:system/:arch/', ctx => {
    var system = ctx.params.system;
    var arch = ctx.params.arch;
    var folder_exists = fs.existsSync('./version');
    var dir_paths = fs.readdirSync('./version');
    var ves = '0.0.0.0';
    dir_paths.forEach(filename => {
        var vesTemp1 = ves.split('.');
        var vesTemp2 = filename.split('.');
        if (parseInt(vesTemp1[0]) < parseInt(vesTemp2[0])
            || parseInt(vesTemp1[1]) < parseInt(vesTemp2[1])
            || parseInt(vesTemp1[2]) < parseInt(vesTemp2[2])
            || parseInt(vesTemp1[3]) < parseInt(vesTemp2[3])) {
            ves = filename;
        }
    });
    console.log(ves);
    var file_paths = fs.readdirSync('./version/' + ves);
    console.log(file_paths);
    var file_path = "";
    file_paths.forEach(filePath => {
        if (filePath.match(new RegExp(".*" + system + "_" + arch + ".*"))) {
            file_path = filePath;
        }
    });
    console.log(file_path);
    if (folder_exists && file_path !== "")
        ctx.body = {result: true, msg: "success", data: ves + "/" + file_path};
    else
        ctx.body = {result: false, msg: "can't find the last", data: null};
});

app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
})
    .use(userRouter)
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);
console.log("application listen port 3000");