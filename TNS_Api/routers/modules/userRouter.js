const express = require('express'); //引入expree模块

const {
    create,
    verify
} = require('./token'); //引入转换token方法

const query = require("../../db/mysql"); //引入mysql方法，做数据库的查询
const e = require('express');
const router = express.Router();

//查询
router.get('/checkUser', async (req, res) => {
    let {
        id
    } = req.query;
    id = id || "";
    if (id) {
        try {
            let sql = `SELECT * FROM user WHERE id='${id}'`;
            let p = await query(sql); //[{},{}]
            let inf = {}
            console.log(p);
            if (p.length) {
                //查到数据：查询成功
                inf = {
                    code: 2000,
                    flag: true,
                    message: '查询成功',
                    data: {
                        p
                    }
                }
            } else {
                //查不到数据:不能登录
                inf = {
                    code: 2000,
                    flag: true,
                    message: '暂无数据',
                    data: []
                }
            }
            res.send(inf);
        } catch (err) {
            let inf = {
                code: 5000,
                flag: false,
                message: '服务器处理相关信息失败'
            }
            res.send(inf);
        }
    } else {
        try {
            let sql = `SELECT * FROM user`;
            let p = await query(sql); //[{},{}]
            let inf = {}
            if (p.length) {
                //查到数据：查询成功
                inf = {
                    code: 2000,
                    flag: true,
                    message: '查询成功',
                    data: {
                        p
                    }
                }
            } else {
                //查不到数据:不能登录
                inf = {
                    code: 3000,
                    flag: false,
                    message: '暂无数据',
                    data: []
                }
            }
            res.send(inf);
        } catch (err) {
            let inf = {
                code: err.errno,
                flag: false,
                message: '服务器处理相关信息失败'
            }
            res.send(inf);
        }
    }

});

//注册验证
router.get('/regVerify', async (req, res) => {
    let {
        name
    } = req.query;
    try {
        let sql = `SELECT * FROM user WHERE userName='${name}'`;
        let p = await query(sql); //[{},{}]
        let inf = {}
        if (p.length) {
            inf = {
                code: 3000,
                flag: false,
                message: '该用户名已存在'

            }
        } else {
            inf = {
                code: 2000,
                flag: true,
                message: '该用户名可以注册'
            }
        }

        res.send(inf);
    } catch (err) {
        let inf = {
            code: 5000,
            flag: false,
            message: '服务器处理相关信息失败',
        }
        res.send(inf);
    }
});

//注册功能
router.post('/register', async (req, res) => { //post请求,data传参
    let num = Math.floor(Math.random() * 100);
    let myDate = new Date();
    let dateTiem = myDate.toLocaleString();
    let {
        name,
        psw,
    } = req.body; //data传参用body接收

    let url = "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2519824424,1132423651&fm=26&gp=0.jpg";
    let phone = "";
    let nike = "用户00" + num;
    let type = "common";
    if (name == "admin") {
        let inf = {
            code: 3000,
            flag: false,
            message: '用户名包含敏感字段'
        }
    }
    try {

        if (/[0-9a-zA-Z]/g.test(name) && /[0-9a-zA-Z]/g.test(psw)) {
            let sql2 = `SELECT * FROM user WHERE userName='${name}'`;
            let p2 = await query(sql2);
            let inf = {}
            if (p2.length) {
                inf = {
                    code: 3000,
                    flag: false,
                    message: '该用户名已存在'
                }
                res.send(inf);
            } else if (!p2.length) {
                let sql = `INSERT INTO user(userName, userPsw,nickName,userPhone,headPortraitUrl,regTiem,type) VALUES('${name}','${psw}','${nike}','${phone}','${url}','${dateTiem}','${type}')`;
                let p = await query(sql);
                if (p.affectedRows) {
                    let token = create(name);
                    inf = {
                        code: 2000,
                        flag: true,
                        message: '注册成功',
                        data: {
                            name,
                            token
                        }

                    }
                } else {
                    inf = {
                        code: 3000,
                        flag: false,
                        message: '注册失败，信息有误'
                    }
                }
                res.send(inf);
            }

        } else {
            let inf = {
                code: 3000,
                flag: false,
                message: '用户名或密码不规范，仅可输入数字与字母',
            }
            res.send(inf);
        }
    } catch (err) {
        let inf = {
            err,
            code: 5000,
            flag: false,
            message: '服务器处理相关信息失败',
        }
        res.send(inf);
    }

});

//登陆
router.post('/log', async (req, res) => {

    let {
        name,
        psw
    } = req.body;
    // console.log(req.body);
    try {
        let sql = `SELECT * FROM user WHERE userName='${name}' and userPsw='${psw}'`;
        let p = await query(sql); //[{},{}]
        // console.log(p[0]);
        let inf = {};
        if (p.length) {
            //查到数据：可以登陆
            let {
                nickName,
                userPhone,
                headPortraitUrl,
                regTiem,
                type
            } = p[0];
            let token = create(name);
            inf = {
                code: 2000,
                flag: true,
                message: '登录成功',
                data: {
                    name,
                    psw,
                    nickName,
                    userPhone,
                    headPortraitUrl,
                    regTiem,
                    type,
                    token
                }
            }
        } else {
            //查不到数据:不能登录
            inf = {
                code: 3000,
                flag: false,
                message: '登录失败,用户名或密码错误'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: 5000,
            flag: false,
            message: '服务器处理相关信息失败'
        }
        res.send(inf);
    }
});

//token验证
router.post('/verify', (req, res) => {
    let {
        token
    } = req.body;
    let result = verify(token);
    let inf = {};
    if (result) {
        //校验成功
        inf = {
            code: 2000,
            flag: true,
            message: '校验成功'
        }
    } else {
        inf = {
            code: 3000,
            flag: false,
            message: '校验失败'
        }
    }
    res.send(inf);
});

//退出功能
router.post('/logout', (req, res) => {
    let {
        token
    } = req.body;
    let result = verify(token);
    let inf = {};
    if (result) {
        inf = {
            code: 2000,
            flag: true,
            message: '退出成功'
        }
    } else {
        inf = {
            code: 3000,
            flag: false,
            message: '退出失败'
        }
    }
    res.send(inf);
});

//用户信息编辑
router.put('/edit', async (req, res) => {
    let {
        userName,
        token
    } = req.body
    // console.log(req.body);
    let sql3 = `SELECT * FROM user WHERE userName='${userName}'`;
    let p3 = await query(sql3);
    let obj = {}
    obj.nickName = req.body.nickName || p3[0].nickName;
    obj.userPhone = req.body.userPhone || p3[0].userPhone;
    let str = '';
    //拼接出sql语句想要的结构
    for (let key in obj) {
        str += key + '=' + `'${obj[key]}'` + ','
    }
    str = str.slice(0, -1);
    try {
        let inf = {};
        let result = verify(token);
        if (result.data == userName || result.data == "admin") {
            let sql = `UPDATE user SET ${str} WHERE userName='${userName}'`;
            let p = await query(sql); //[{},{}]
            //校验成功
            if (p.affectedRows) {
                //修改成功   
                let sql2 = `SELECT * FROM user WHERE userName='${userName}'`
                let p2 = await query(sql2);
                console.log(p2);
                let {
                    nickName,
                    userPhone,
                    headPortraitUrl
                } = p2[0];
                inf = {
                    code: 2000,
                    flag: true,
                    message: '修改成功',
                    data: {
                        nickName,
                        userPhone,
                        headPortraitUrl
                    }
                }
            } else {
                //修改失败
                inf = {
                    code: 3000,
                    flag: false,
                    message: '修改失败，查询不到相关信息'
                }
            }
            res.send(inf);
        } else {
            inf = {
                code: 4000,
                flag: false,
                message: 'token校验失败或已失效'
            }
            res.send(inf);
        }

    } catch (err) {
        let inf = {
            err,
            code: 5000,
            flag: false,
            message: '服务器处理相关信息失败'
        }
        res.send(err);
    }
});

//用户分页
router.post('/paging', async (req, res) => {
    // console.log(req.params);
    let {
        token,
        page,
        size
    } = req.body;
    page = page || 1;
    size = size || 10;
    let index = (page - 1) * size;

    try {
        let inf = {};
        let result = verify(token);
        if (result.data == "admin") {
            let sql = `SELECT * FROM user LIMIT ${index},${size}`;
            let p = await query(sql); //[{},{}]
            let sql2 = `SELECT * FROM user`;
            let arr = await query(sql2); //所有的数据 []

            if (p.length) {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '分页查询成功',
                    total: arr.length,
                    page,
                    size,
                    data: p
                }
            } else {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '暂无数据',
                    data: []
                }
            }
            res.send(inf);
        } else {
            inf = {
                code: 4000,
                flag: false,
                message: 'token校验失败或已失效'
            }
            res.send(inf);
        }

    } catch (err) {
        let inf = {
            code: 5000,
            flag: false,
            message: '服务器处理相关信息失败'
        }
        res.send(inf);
    }
});

//删除
router.delete('/dele', async (req, res) => {
    let {
        id,
        token
    } = req.body;
    try {
        let inf = {};
        let result = verify(token);
        if (result.data == "admin") {
            let sql = `DELETE FROM user WHERE id=${id}`;
            let p = await query(sql); //[{},{}]
            if (p.affectedRows) {
                //删除成功
                inf = {
                    code: 2000,
                    flag: true,
                    message: '删除成功'
                }
            } else {
                //删除失败
                inf = {
                    code: 3000,
                    flag: false,
                    message: '删除失败，查询不到相关信息'
                }
            }
            res.send(inf);
        } else {
            inf = {
                code: 4000,
                flag: false,
                message: 'token校验失败'
            }
            res.send(inf);
        }

    } catch (err) {
        let inf = {
            code: 5000,
            flag: false,
            message: '服务器处理相关信息失败'
        }
        res.send(inf);
    }
});

//修改密码
router.put('/amend', async (req, res) => {
    let {
        name,
        newpsw,
        psw,
        token
    } = req.body

    try {
        let result = verify(token);
        let inf = {};
        if (result.data == name) {
            let sql2 = `SELECT * FROM user WHERE userName='${name}' and userPsw='${psw}'`;
            let p2 = await query(sql2);

            if (p2.length) {
                let sql = `UPDATE user SET userPsw='${newpsw}' WHERE userName='${name}'`;
                let p = await query(sql); //[{},{}]
                //校验成功
                if (p.affectedRows) {
                    //修改成功 
                    inf = {
                        code: 2000,
                        flag: true,
                        message: '修改成功',
                    }
                } else {
                    //修改失败
                    inf = {
                        code: 3000,
                        flag: false,
                        message: '修改失败，查询不到相关信息'
                    }
                }
                res.send(inf);
            } else {
                inf = {
                    code: 3000,
                    flag: false,
                    message: '用户名或密码错误'
                }
                res.send(inf);
            }
        } else {
            inf = {
                code: 4000,
                flag: false,
                message: 'token校验失败或已失效'
            }
            res.send(inf);
        }
    } catch (err) {
        let inf = {
            code: 5000,
            flag: false,
            message: '服务器处理相关信息失败'
        }
        res.send(err);
    }
});


//添加收货地址
router.post('/address', async (req, res) => { //post请求,data传参
    let {
        name,
        consignee,
        phone,
        district,
        detailedly,
        postcode,
        keep,
        token
    } = req.body; //data传参用body接收
    keep = keep || false;
    try {
        let result = verify(token);
        if (result.data == name) {
            if (name && consignee && phone && district && detailedly && postcode) {
                if (keep) {
                    let sql2 = `SELECT * FROM shipaddress WHERE district='${district}' and detailedly='${detailedly}' and userName='${name}'`;
                    let p2 = await query(sql2);
                    let inf = {}
                    if (p2.length) {
                        inf = {
                            code: 3000,
                            flag: false,
                            message: '该地址已存在'
                        }
                        res.send(inf);
                    } else if (!p2.length) {

                        let sql4 = `UPDATE shipaddress SET keep=REPLACE(keep, 'true', 'false')`
                        let p4 = await query(sql4);

                        let sql = `INSERT INTO shipaddress(consignee, phone,district,detailedly,postcode,userName,keep) VALUES('${consignee}','${phone}','${district}','${detailedly}','${postcode}','${name}','${keep}')`;
                        let p = await query(sql);
                        if (p.affectedRows) {
                            let sql3 = `SELECT * FROM shipaddress WHERE  userName='${name}'`;
                            let p3 = await query(sql3);
                            inf = {
                                code: 2000,
                                flag: true,
                                message: '添加成功',
                                data: {
                                    p3
                                }

                            }
                        } else {
                            inf = {
                                code: 3000,
                                flag: false,
                                message: '添加失败，查询不到相关信息'
                            }
                        }
                        res.send(inf);
                    }
                } else {
                    let sql2 = `SELECT * FROM shipaddress WHERE district='${district}' and detailedly='${detailedly}' and userName='${name}'`;
                    let p2 = await query(sql2);
                    let inf = {}
                    if (p2.length) {
                        inf = {
                            code: 3000,
                            flag: false,
                            message: '该地址已存在'
                        }
                        res.send(inf);
                    } else if (!p2.length) {
                        let sql = `INSERT INTO shipaddress(consignee, phone,district,detailedly,postcode,userName,keep) VALUES('${consignee}','${phone}','${district}','${detailedly}','${postcode}','${name}','${keep}')`;
                        let p = await query(sql);
                        if (p.affectedRows) {
                            let sql3 = `SELECT * FROM shipaddress WHERE  userName='${name}'`;
                            let p3 = await query(sql3);
                            inf = {
                                code: 2000,
                                flag: true,
                                message: '添加成功',
                                data: {
                                    p3
                                }

                            }
                        } else {
                            inf = {
                                code: 3000,
                                flag: false,
                                message: '添加失败，查询不到相关信息'
                            }
                        }
                        res.send(inf);
                    }
                }
            } else {
                let inf = {
                    code: 3000,
                    flag: false,
                    message: '请填写完整的信息后提交',
                }
                res.send(inf);
            }

        } else {
            let inf = {
                code: 4000,
                flag: false,
                message: 'token验证失败或已失效',
            }
            res.send(inf);
        }
    } catch (err) {
        let inf = {
            err,
            code: 5000,
            flag: false,
            message: '服务器处理相关信息失败',
        }
        res.send(inf);
    }

});

//修改收货地址
router.put('/editress', async (req, res) => { //post请求,data传参
    let {
        name,
        id,
        token
    } = req.body; //data传参用body接收
    let sql3 = `SELECT * FROM shipaddress WHERE id='${id}' and userName='${name}'`;
    let p3 = await query(sql3);
    if (!p3.length) {
        let inf = {
            code: 3000,
            flag: false,
            message: '查询不到数据'

        }
        res.send(inf);
    } else {
        let obj = {}
        obj.consignee = req.body.consignee || p3[0].consignee;
        obj.phone = req.body.phone || p3[0].phone;
        obj.district = req.body.district || p3[0].district;
        obj.detailedly = req.body.detailedly || p3[0].detailedly;
        obj.postcode = req.body.postcode || p3[0].postcode;
        obj.keep = req.body.keep || p3[0].keep;
        let str = '';
        for (let key in obj) {
            str += key + '=' + `'${obj[key]}'` + ','
        }
        str = str.slice(0, -1);
        try {
            let inf = {};
            let result = verify(token);
            if (result.data == name || result.data == "admin") {
                if (obj.keep) {
                    let sql4 = `UPDATE shipaddress SET keep=REPLACE(keep, 'true', 'false')`
                    let p4 = await query(sql4);
                    let sql = `UPDATE shipaddress SET ${str} WHERE id='${id}' and userName='${name}'`;
                    let p = await query(sql); //[{},{}]

                    if (p.affectedRows) {
                        let sql2 = `SELECT * FROM shipaddress WHERE userName='${name}'`
                        let p2 = await query(sql2);
                        inf = {
                            code: 2000,
                            flag: true,
                            message: '修改成功',
                            data: p2


                        }
                    } else {
                        //修改失败
                        inf = {
                            code: 3000,
                            flag: false,
                            message: '修改失败,查询不到相关信息'
                        }
                    }
                    res.send(inf);
                } else {

                    let sql = `UPDATE shipaddress SET ${str} WHERE id='${id}' and userName='${name}'`;
                    let sql2 = `SELECT * FROM shipaddress WHERE userName='${name}'`
                    let p = await query(sql); //[{},{}]
                    if (p.affectedRows) {
                        let p2 = await query(sql2);
                        inf = {
                            code: 2000,
                            flag: true,
                            message: '修改成功',
                            data: {
                                p2
                            }
                        }
                    } else {
                        //修改失败
                        inf = {
                            code: 3000,
                            flag: false,
                            message: '修改失败,查询不到相关信息'
                        }
                    }
                    res.send(inf);
                }
            } else {
                inf = {
                    code: 4000,
                    flag: false,
                    message: 'token校验失败或已失效'
                }
                res.send(inf);
            }

        } catch (err) {
            let inf = {
                err,
                code: 5000,
                flag: false,
                message: '服务器处理相关信息失败',
            }
            res.send(inf);
        }
    }

});

//删除收货地址
router.delete('/deleress', async (req, res) => {
    let {
        name,
        id,
        token
    } = req.body;
    try {
        let inf = {};
        let result = verify(token);
        if (result.data == name || result.data == "admin") {
            let sql = `DELETE FROM shipaddress WHERE id='${id}' and userName='${name}'`;
            let p = await query(sql);
            if (p.affectedRows) {
                let sql2 = `SELECT * FROM shipaddress WHERE  userName='${name}'`;
                let p2 = await query(sql2);
                inf = {
                    code: 2000,
                    flag: true,
                    message: '删除成功',
                    data: p2


                }
            } else {
                //删除失败
                inf = {
                    code: 3000,
                    flag: false,
                    message: '删除失败，查询不到相关信息'
                }
            }
            res.send(inf);
        } else {
            inf = {
                code: 4000,
                flag: false,
                message: 'token校验失败或已失效'
            }
            res.send(inf);
        }
    } catch (err) {
        let inf = {
            err,
            code: 5000,
            flag: false,
            message: '服务器处理相关信息失败'
        }
        res.send(inf);
    }
});

//查询收货地址
router.post('/checkress', async (req, res) => { //post请求,data传参
    let {
        name,
        token
    } = req.body; //data传参用body接收
    try {
        let result = verify(token);
        let inf = {}
        if (result.data == name) {
            let sql = `SELECT * FROM shipaddress WHERE userName='${name}'`;
            let p = await query(sql);
            if (p.length) {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '查询成功',
                    data: p

                }
            } else {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '暂无数据',
                    data: []
                }
            }
            res.send(inf);


        } else {
            let inf = {
                code: 4000,
                flag: false,
                message: 'token验证失败或已失效',
            }
            res.send(inf);
        }
    } catch (err) {
        let inf = {
            err,
            code: 5000,
            flag: false,
            message: '服务器处理相关信息失败',
        }
        res.send(inf);
    }

});

//分页查询地址
router.post('/pageress', async (req, res) => {
    // console.log(req.params);
    let {
        token,
        page,
        size
    } = req.body;
    page = page || 1;
    size = size || 10;
    let index = (page - 1) * size;

    try {
        let inf = {};
        let result = verify(token);
        if (result.data == "admin") {
            let sql = `SELECT * FROM shipaddress LIMIT ${index},${size}`;
            let p = await query(sql); //[{},{}]
            let sql2 = `SELECT * FROM shipaddress`;
            let arr = await query(sql2); //所有的数据 []

            if (p.length) {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '分页查询成功',
                    total: arr.length,
                    page,
                    size,
                    data: p
                }
            } else {
                inf = {
                    code: 3000,
                    flag: false,
                    message: '暂无数据',
                    data: []
                }
            }
            res.send(inf);
        } else {
            inf = {
                code: 4000,
                flag: false,
                message: 'token校验失败或已失效'
            }
            res.send(inf);
        }

    } catch (err) {
        let inf = {
            err,
            code: 5000,
            flag: false,
            message: '服务器处理相关信息失败'
        }
        res.send(inf);
    }
});

//查询数据
router.post('/pageGood', async (req, res) => {
    let {
        goods_id,
        type,
        page,
        size
    } = req.body;
    // console.log('11', page, size);
    page = page || 1;
    size = size || 10;
    type = type || "";
    goods_id = goods_id || "";
    let index = (page - 1) * size;
    if (type) {
        try {
            let inf = {};
            let sql = `SELECT * FROM goodlist  WHERE  goodstitle like '%${type}%' LIMIT ${index},${size}`;
            let p = await query(sql); //[{},{}]
            let data = [];
            for (let i = 0; i < p.length; i++) {
                let obj = {};
                obj.goods_id = p[i].goods_id;
                obj.goodstitle = p[i].goodstitle;
                obj.type = p[i].type;
                obj.shopName = p[i].shopName;
                obj.describes = p[i].describes;
                obj.typeSpecification = [];
                let sql2 = `SELECT DISTINCT typemin FROM goodsmin WHERE gid=${p[i].goods_id}`
                let p2 = await query(sql2);

                for (let j = 0; j < p2.length; j++) {
                    let mobj = {};
                    mobj.type_min = p2[j].typemin;
                    let sql3 = `SELECT id,alias,discount,price,stock,imgsrc FROM goodsmin WHERE typemin='${p2[j].typemin}' and gid='${p[i].goods_id}'`
                    let p3 = await query(sql3);
                    mobj.specification = p3;
                    obj.typeSpecification.push(mobj);
                }
                data.push(obj);
            }
            if (p.length) {
                let sql4 = `SELECT * FROM goodlist  WHERE  goodstitle like '%${type}%'`;
                let p4 = await query(sql4)
                inf = {
                    code: 2000,
                    flag: true,
                    message: '查询成功',
                    total: p4.length,
                    page,
                    size,
                    data
                }
            } else {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '没有该商品',
                    data: []
                }

            }
            res.send(inf);
        } catch (err) {
            let inf = {
                err,
                code: 5000,
                flag: false,
                message: '服务器处理相关信息失败'
            }
            res.send(inf);
        }
    } else if (goods_id) {
        try {
            let inf = {};
            let sql = `SELECT * FROM goodlist WHERE goods_id='${goods_id}'`;
            let p = await query(sql); //[{},{}]
            let data = [];
            for (let i = 0; i < p.length; i++) {
                let obj = {};
                obj.goods_id = p[i].goods_id;
                obj.goodstitle = p[i].goodstitle;
                obj.type = p[i].type;
                obj.shopName = p[i].shopName;
                obj.describes = p[i].describes;
                obj.typeSpecification = [];
                let sql2 = `SELECT DISTINCT typemin FROM goodsmin WHERE gid=${p[i].goods_id}`
                let p2 = await query(sql2);

                for (let j = 0; j < p2.length; j++) {
                    let mobj = {};
                    mobj.type_min = p2[j].typemin;
                    let sql3 = `SELECT id,alias,discount,price,stock,imgsrc FROM goodsmin WHERE typemin='${p2[j].typemin}' and gid='${p[i].goods_id}'`
                    let p3 = await query(sql3);
                    mobj.specification = p3;
                    obj.typeSpecification.push(mobj);
                }
                data.push(obj);
            }
            if (p.length) {
                let sql4 = `SELECT * FROM goodlist `;
                let p4 = await query(sql4)
                inf = {
                    code: 2000,
                    flag: true,
                    message: '查询成功',
                    total: p4.length,
                    page,
                    size,
                    data
                }
            } else {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '没有该商品',
                    data: []

                }

            }
            res.send(inf);
        } catch (err) {
            let inf = {
                err,
                code: 5000,
                flag: false,
                message: '服务器处理相关信息失败'
            }
            res.send(inf);
        }
    } else {
        try {
            let inf = {};
            let sql = `SELECT * FROM goodlist  LIMIT ${index},${size} `;
            let p = await query(sql); //[{},{}]
            let data = [];
            for (let i = 0; i < p.length; i++) {
                let obj = {};
                obj.goods_id = p[i].goods_id;
                obj.goodstitle = p[i].goodstitle;
                obj.type = p[i].type;
                obj.shopName = p[i].shopName;
                obj.describes = p[i].describes;
                obj.typeSpecification = [];
                let sql2 = `SELECT DISTINCT typemin FROM goodsmin WHERE gid=${p[i].goods_id}`
                let p2 = await query(sql2);

                for (let j = 0; j < p2.length; j++) {
                    let mobj = {};
                    mobj.type_min = p2[j].typemin;
                    let sql3 = `SELECT id,alias,discount,price,stock,imgsrc FROM goodsmin WHERE typemin='${p2[j].typemin}' and gid='${p[i].goods_id}'`
                    let p3 = await query(sql3);
                    mobj.specification = p3;
                    obj.typeSpecification.push(mobj);
                }
                data.push(obj);
            }
            if (p.length) {
                let sql4 = `SELECT * FROM goodlist `;
                let p4 = await query(sql4)
                inf = {
                    code: 2000,
                    flag: true,
                    message: '查询成功',
                    total: p4.length,
                    page,
                    size,
                    data
                }
            } else {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '没有该商品',
                    data: []

                }

            }
            res.send(inf);
        } catch (err) {
            let inf = {
                err,
                code: 5000,
                flag: false,
                message: '服务器处理相关信息失败'
            }
            res.send(inf);
        }
    }


});

//分页查询订单
router.post('/pageorder', async (req, res) => {
    // console.log(req.params);
    let {
        userName,
        token,
        page,
        size
    } = req.body;
    page = page || 1;
    size = size || 10;
    let index = (page - 1) * size;

    try {
        let inf = {};
        let result = verify(token);
        if (result.data == userName) {
            let sql = `SELECT * FROM orderform WHERE userName='${userName}' LIMIT ${index},${size}`;
            let p = await query(sql);
            let sql2 = `SELECT * FROM orderform WHERE userName='${userName}`;
            let arr = await query(sql2);
            if (p.length) {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '分页查询成功',
                    total: arr.length,
                    page,
                    size,
                    data: p
                }
            } else {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '暂无数据',
                    data: []
                }
            }
            res.send(inf);
        } else {
            inf = {
                code: 4000,
                flag: false,
                message: 'token校验失败或已失效'
            }
            res.send(inf);
        }

    } catch (err) {
        let inf = {
            err,
            code: 5000,
            flag: false,
            message: '服务器处理相关信息失败'
        }
        res.send(inf);
    }
});

module.exports = router;