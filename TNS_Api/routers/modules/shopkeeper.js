const express = require('express'); //引入expree模块

const query = require("../../db/mysql"); //引入mysql方法，做数据库的查询

const {
    create,
    verify
} = require('./token'); //引入转换token方法
const router = express.Router();
var multer = require('multer')

//普通用户转商铺
router.post('/regShop', async (req, res) => { //post请求,data传参
    let myDate = new Date();
    let dateTiem = myDate.toLocaleString();
    let {
        name,
        shopName,
        area,
        site,
        linkman,
        phone,
        idCard,
        email
    } = req.body; //data传参用body接收

    try {
        let sql2 = `SELECT * FROM user WHERE userName='${name}'`;
        let p2 = await query(sql2);
        let psw = p2[0].userPsw;
        let audit = "待审核";
        let sql3 = `SELECT * FROM shoppeeker WHERE userName='${name}'`;
        let p3 = await query(sql3);
        let inf = {}
        if (p3.length) {
            inf = {
                code: 3000,
                flag: false,
                message: '请勿二次提交，正在等待管理员审核'
            }
            res.send(inf);
        } else if (!p3.length) {
            let sql = `INSERT INTO shoppeeker(userName, password,shopName,area,site,linkman,phone,idCard,email,audit,regTiem) 
        VALUES('${name}','${psw}','${shopName}','${area}','${site}','${linkman}','${phone}','${idCard}','${email}','${audit}','${dateTiem}')`;
            let p = await query(sql); //[{},{}]
            if (p.affectedRows) {
                let token = create(name);
                inf = {
                    code: 2000,
                    flag: true,
                    message: '提交成功，等待管理员审核',
                    data: {
                        name,
                        token
                    }

                }
            } else {
                inf = {
                    code: 3000,
                    flag: false,
                    message: '提交失败，请检查提交信息是否规范正确'
                }
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

//查询
router.post('/checkgood', async (req, res) => {
    let {
        userName,
        title,
        alias,
        token
    } = req.body;
    title = title || "";
    alias = alias || ""
    try {
        let result = verify(token);
        if (result.data == userName) {
            if (title) {
                let sql = `SELECT * FROM goodlist WHERE userName='${userName}' and goodstitle='${title}'`;
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
                    inf = {
                        code: 3000,
                        flag: false,
                        message: '查询失败或没有该商品'
                    }
                }
                res.send(inf);
            } else if (alias) {
                let sql = `SELECT * FROM goodsmin WHERE userName='${userName}' and alias='${alias}'`;
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
                    inf = {
                        code: 3000,
                        flag: false,
                        message: '查询失败或没有该商品'
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
            message: '服务器处理相关信息失败'
        }
        res.send(inf);
    }

});

//商铺登陆
router.post('/log', async (req, res) => {
    let {
        userName,
        psw
    } = req.body;
    try {
        let sql = `SELECT * FROM shoppeeker WHERE userName='${userName}' and password='${psw}'`;

        let p = await query(sql); //[{},{}]

        let inf = {};
        if (p[0].audit == "通过") {
            //查到数据：可以登陆
            let {
                shopName,
                area,
                site,
                shopState
            } = p[0];
            let token = create(userName);
            inf = {
                code: 2000,
                flag: true,
                message: '登录成功',
                data: {
                    userName,
                    shopName,
                    area,
                    site,
                    shopState,
                    token
                }
            }
        } else if (p[0].audit == "未通过") {
            inf = {
                code: 3000,
                flag: false,
                message: '登录失败,未通过审核',
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '登录失败,正在审核中'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: 5000,
            flag: false,
            message: '服务器处理性格信息失败'
        }
        res.send(inf);
    }
});

//商品信息分页
router.post('/paging', async (req, res) => {
    let {
        userName,
        id,
        token,
        page,
        size
    } = req.body;
    id = id || "";
    page = page || 1;
    size = size || 10;
    let index = (page - 1) * size;
    let result = verify(token);
    if (id) {
        try {
            let inf = {};
            if (result.data == userName) {
                let sql = `SELECT * FROM goodsmin WHERE userName='${userName}' and gid='${id}' LIMIT ${index},${size} `;
                let p = await query(sql); //[{},{}]

                let sql2 = `SELECT * FROM goodsmin WHERE userName='${userName}' and gid='${id}'`;
                let arr = await query(sql2);
                if (p.length) {
                    inf = {
                        code: 2000,
                        flag: true,
                        message: '查询成功',
                        total: arr.length,
                        page,
                        size,
                        data: {
                            p
                        }
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
    } else if (result.data == "admin") {
        let inf = {};
        let sql = `SELECT * FROM goodsmin  LIMIT ${index},${size} `;
        let p = await query(sql); //[{},{}]

        let sql2 = `SELECT * FROM goodsmin `;
        let arr = await query(sql2);
        if (p.length) {
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                total: arr.length,
                page,
                size,
                data: {
                    p
                }
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
        try {
            let inf = {};
            let result = verify(token);
            if (result.data == userName) {
                let sql = `SELECT * FROM goodlist WHERE userName='${userName}' LIMIT ${index},${size} `;
                let p = await query(sql); //[{},{}]
                let sql2 = `SELECT * FROM goodlist WHERE userName='${userName}'`;
                let arr = await query(sql2);
                if (p.length) {
                    inf = {
                        code: 2000,
                        flag: true,
                        message: '查询成功',
                        total: arr.length,
                        page,
                        size,
                        data: {
                            p
                        }
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
                code: 5000,
                flag: false,
                message: '服务器处理相关信息失败'
            }
            res.send(err);
        }
    }

});

//添加商品
router.post('/addgood', async (req, res) => {
    let {
        userName,
        title,
        type,
        describe,
        typemin,
        alias,
        discount,
        price,
        stock,
        token
    } = req.body;
    title = title || "";
    describe = describe || "";
    alias = alias || "";
    discount = discount || "";
    price = price || 0;
    stock = stock || "";
    typemin = typemin || "";
    let checkes = "待审核";
    let situation = "上架";
    if (alias) {
        try {
            let sql3 = `SELECT * FROM goodlist WHERE userName='${userName}' and goodstitle='${title}'`
            let p3 = await query(sql3);
            if (p3.length) {
                let sql4 = `SELECT * FROM goodsmin WHERE userName='${userName}' and alias='${alias}'`
                let p4 = await query(sql4);
                if (p4.length) {
                    let inf = {
                        code: 3000,
                        flag: false,
                        message: '该商品已存在'
                    }
                    res.send(inf);
                } else {
                    let result = verify(token);
                    if (result.data == userName) {
                        let typeID = p3[0].goods_id;
                        let sql2 = `INSERT INTO goodsmin (type,typemin,alias,discount,price,stock,userName,checkes,situation,gid) VALUES ('${type}','${typemin}','${alias}','${discount}','${price}','${stock}','${userName}','${checkes}','${situation}','${typeID}')`;
                        let p2 = await query(sql2);
                        let inf = {}
                        if (p2.affectedRows) {
                            let sql = `SELECT * FROM goodsmin WHERE userName='${userName}'`
                            let p = await query(sql)
                            inf = {
                                code: 2000,
                                flag: true,
                                message: '添加成功',
                                data: {
                                    p
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
                    } else {
                        inf = {
                            code: 4000,
                            flag: false,
                            message: 'token校验失败或已失效'
                        }
                        res.send(inf);
                    }
                }
            } else {
                let result = verify(token);
                if (result.data == userName) {
                    let p5 = await query(`SELECT * FROM shoppeeker WHERE userName='${userName}'`)
                    let sql = `INSERT INTO goodlist (goodstitle,type,describes,userName,shopName) VALUES ('${title}','${type}','${describe}','${userName}','${p[0].shopName}')`;
                    let p = await query(sql);
                    let sql4 = `SELECT * FROM goodlist WHERE userName='${userName}' and goodstitle='${title}'`
                    let p4 = await query(sql4);
                    // let shopName = p4[0].shopName;
                    let typeID = p4[0].goods_id;
                    let sql2 = `INSERT INTO goodsmin (type,typemin,alias,discount,price,stock,userName,checkes,situation,gid) VALUES ('${type}','${typemin}','${alias}','${discount}','${price}','${stock}','${userName}','${checkes}','${situation}','${typeID}')`;
                    let p2 = await query(sql2);
                    let inf = {}
                    if (p2.affectedRows && p.affectedRows) {
                        let sql3 = `SELECT * FROM goodlist WHERE userName='${userName}'`
                        let p3 = await query(sql3)
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
                } else {
                    inf = {
                        code: 4000,
                        flag: false,
                        message: 'token校验失败或已失效'
                    }
                }
                res.send(inf);
            }
        } catch (err) {
            let inf = {
                err: err,
                code: 5000,
                flag: false,
                message: '服务器处理相关信息失败'
            }
            res.send(inf);
        }
    } else {
        try {
            let sql3 = `SELECT * FROM goodlist WHERE userName='${userName}' and goodstitle='${title}'`
            let p3 = await query(sql3);
            let inf = {}
            if (p3.length) {
                let inf = {
                    code: 3000,
                    flag: false,
                    message: '该商品已存在'
                }
                res.send(inf);
            } else {
                let result = verify(token);
                if (result.data == userName) {
                    let sql4 = `SELECT * FROM goodlist WHERE userName='${userName}'`;
                    let p4 = await query(sql4);
                    let shopName = p4[0].shopName;
                    let sql = `INSERT INTO goodlist (goodstitle,type,describes,userName,shopName) VALUES ('${title}','${type}','${describe}','${userName}','${shopName}')`;
                    let p = await query(sql); //[{},{}]
                    if (p.affectedRows) {
                        let sql2 = `SELECT * FROM goodlist WHERE userName='${userName}'`;
                        let p2 = await query(sql2)
                        inf = {
                            code: 2000,
                            flag: true,
                            message: '添加成功',
                            data: {
                                p2
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
                } else {
                    inf = {
                        code: 4000,
                        flag: false,
                        message: 'token校验失败或已失效'
                    }
                    res.send(inf);
                }

            }
        } catch (err) {
            let inf = {
                err: err,
                code: 5000,
                flag: false,
                message: '服务器处理相关信息失败'
            }
            res.send(inf);
        }
    }

});

//删子类表
router.delete('/deleZi', async (req, res) => {
    let {
        userName,
        id,
        token
    } = req.body;
    // id = JSON.parse(id);
    let src = id.join();
    try {
        let inf = {};
        let result = verify(token);
        if (result.data == userName) {
            let sql = `DELETE FROM goodsmin WHERE id in(${src})`;
            let p = await query(sql);

            if (p.affectedRows > 0) {
                let sql2 = `SELECT * FROM goodsmin WHERE userName='${userName}'`;
                let p2 = await query(sql2);
                //删除成功
                inf = {
                    code: 2000,
                    flag: true,
                    message: '删除成功',
                    data: {
                        p2
                    }
                }
            } else {
                //删除失败
                inf = {
                    code: 3000,
                    flag: false,
                    message: '删除失败或商品已删除'
                }
            }
            res.send(inf);
        } else {
            inf = {
                code: 3000,
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

//删主类表
router.delete('/deleFu', async (req, res) => {
    let {
        userName,
        id,
        token
    } = req.body;
    // id = JSON.parse(id);
    let src = id.join();
    try {
        let inf = {};
        let result = verify(token);
        if (result.data == userName) {
            let sql = `DELETE FROM goodlist WHERE goods_id in(${src})`;
            let p = await query(sql); //[{},{}]
            if (p.affectedRows > 0) {
                //删除成功
                let sql2 = `SELECT * FROM goodlist WHERE userName='${userName}'`;
                let p2 = await query(sql2);
                inf = {
                    code: 2000,
                    flag: true,
                    message: '删除成功',
                    data: {
                        p2
                    }
                }
            } else {
                //删除失败
                inf = {
                    code: 3000,
                    flag: false,
                    message: '删除失败或商品已删除'
                }
            }
            res.send(inf);
        } else {
            inf = {
                code: 3000,
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
//更改子
router.put('/editZi', async (req, res) => {
    let userName = req.body.userName;
    let id = req.body.id;
    let sql2 = `SELECT * FROM goodsmin WHERE userName='${userName}' and id='${id}'`
    let p2 = await query(sql2);
    let obj = {};
    let token = req.body.token;
    let str = "";
    obj.typemin = req.body.typemin || p2[0].typemin;
    obj.alias = req.body.alias || p2[0].alias;
    obj.discount = req.body.discount || p2[0].discount;
    obj.price = req.body.price || p2[0].price;
    obj.discount = req.body.stock || p2[0].stock;
    obj.situation = req.body.situation || p2[0].situation;
    for (let key in obj) {
        str += key + '=' + `'${obj[key]}'` + ','
    }
    str = str.slice(0, -1);
    try {
        let inf = {};
        let result = verify(token);
        if (result.data == userName) {
            let sql = `UPDATE goodsmin SET ${str} WHERE id=${id}`;
            let p = await query(sql); //[{},{}]
            if (p.affectedRows) {
                let sql2 = `SELECT * FROM goodsmin WHERE userName='${userName}'`;
                let p2 = await query(sql2);
                //修改成功
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
                    message: '修改失败，查询不到相关信息'
                }
            }
            res.send(inf);
        } else {
            inf = {
                code: 3000,
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

//更改父
router.put('/editFu', async (req, res) => {
    let userName = req.body.userName;
    let id = req.body.id;
    let sql2 = `SELECT * FROM goodlist WHERE userName='${userName}' and goods_id='${id}'`
    let p2 = await query(sql2);
    let obj = {};
    let token = req.body.token;
    obj.goodstitle = req.body.goodstitle || p2[0].goodstitle;
    obj.describes = req.body.describes || p2[0].describes;
    let str = "";
    for (let key in obj) {
        str += key + '=' + `'${obj[key]}'` + ','
    }
    str = str.slice(0, -1);

    try {
        let inf = {};
        let result = verify(token);
        if (result.data == userName) {
            let sql = `UPDATE goodlist SET ${str} WHERE goods_id=${id}`;
            let p = await query(sql); //[{},{}]
            // console.log(p);


            if (p.affectedRows) {
                let sql2 = `SELECT * FROM goodlist WHERE userName='${userName}'`;
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
                    message: '修改失败，查询不到相关信息'
                }
            }
            res.send(inf);
        } else {
            inf = {
                code: 3000,
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

var storage = multer.diskStorage({
    //目录：无则创建
    destination: 'goods/',
    filename: function (req, file, cb) {
        let arr = file.originalname.split('.');
        // cb(null, file.fieldname + '-' + Date.now()) //avatar-42432476
        cb(null, arr[0] + '-' + Date.now() + '.' + arr[1]) //avatar-42432476
    }
});

var uploadgood = multer({
    storage
})


router.post('/goodsimg', uploadgood.single('goods'), async (req, res) => {
    let {
        userName,
        token,
        id
    } = req.body; //获取formdata传过来的uid
    console.log(req.body);
    console.log(req.file);
    let host = "http://122.51.198.207:8088/";
    let url = host + 'tns/goods/' + req.file.filename;
    try {
        let inf = {};
        let result = verify(token);
        console.log(result);
        if (result.data == userName) {
            let sql2 = `SELECT * FROM goodsmin  WHERE userName='${userName}' and id=${id}`
            let p2 = await query(sql2);
            console.log(p2);
            console.log(p2[0].imgsrc);
            if (p2[0].imgsrc) {
                console.log(1);
                let urlimg = p2[0].imgsrc + "," + url
                console.log(urlimg);
                let p = await query(`UPDATE goodsmin SET imgsrc='${urlimg}' WHERE id=${id} and userName='${userName}'`);
                console.log(p);
                if (p.affectedRows) {
                    //上传成功
                    inf = {
                        code: 2000,
                        flag: true,
                        message: '上传成功',
                        imgurl: url
                    };
                } else {
                    inf = {
                        code: 3000,
                        flag: false,
                        message: '上传失败'
                    };
                }
                res.send(inf);
            } else {
                console.log(2);
                let urlimg = url;
                console.log(urlimg);
                let p = await query(`UPDATE goodsmin SET imgsrc='${urlimg}' WHERE id=${id} and userName='${userName}'`);
                console.log(p);
                if (p.affectedRows) {
                    inf = {
                        code: 2000,
                        flag: true,
                        message: '上传成功',
                        imgurl: url
                    };
                } else {
                    inf = {
                        code: 3000,
                        flag: false,
                        message: '上传失败'
                    };
                }
                res.send(inf);
            }
        } else {
            fs.unlink(req.files[0].filename, function (err) {
                if (err) {
                    return console.error(err);
                }
            });
            inf = {
                code: 3000,
                flag: false,
                message: 'token校验失败'
            }
            res.send(inf);

        }
    } catch (err) {
        let inf = {
            err,
            code: 5000,
            flag: false,
            message: '服务器处理错误'
        }
        res.send(inf);
    }

})

module.exports = router;