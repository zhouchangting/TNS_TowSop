//引入express开启静态资源服务器
const express = require('express');
const router = express.Router(); //router==app
// 引入json解析中间件
var bodyParser = require('body-parser');

// 添加json解析
//转json数据的 {"key":"value","key":"value"}
router.use(bodyParser.urlencoded({
    extended: false
})); //转键值对数据 key=value&key=value
router.use(bodyParser.json());
//导入子路由
const UserRouter = require('./modules/userRouter'); //用户功能接口
const Admin = require("./modules/admin"); //管理员功能接口
const Shop = require('./modules/shopkeeper'); //中台功能接口
const Upload = require('./modules/upload'); //上传功能接口
const Shopcar = require('./modules/shopcar'); //购物车接口



//CORS跨域：方便和小伙伴共享接口：加上这段话，再设置防火墙，别人就可以访问你的接口了(记得保证服务器开启)
//把这个路由配置放在所有路由的前面，方便调用next操作
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE,OPTIONS");
    // 跨域请求CORS中的预请求
    if (req.method == "OPTIONS") { //特殊请求：发送了请求头的那些请求
        res.sendStatus(200); /*让options请求快速返回*/
    } else {
        next();
    }
})

//启用中间件
router.use('/user', UserRouter);
router.use('/admin', Admin);
router.use('/shopKeeper', Shop);
router.use('/upload', Upload);
router.use('/shopcar', Shopcar);

//导出路由
module.exports = router;