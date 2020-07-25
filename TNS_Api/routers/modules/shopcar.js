const express = require('express'); //引入expree模块

const {
    create,
    verify
} = require('./token'); //引入转换token方法

const query = require("../../db/mysql"); //引入mysql方法，做数据库的查询
const e = require('express');
const router = express.Router();

//查询购物车信息
router.post('/paging', async (req, res) => {

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
            let sql = `SELECT * FROM shopcar WHERE userName='${userName}' LIMIT ${index},${size}`;
            let p = await query(sql); //[{},{}]
            let sql2 = `SELECT * FROM shopcar WHERE userName='${userName}'`;
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

//分页查询购物车信息
router.post('/pagecar', async (req, res) => {
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
            let sql = `SELECT * FROM shopcar LIMIT ${index},${size}`;
            let p = await query(sql);
            let sql2 = `SELECT * FROM shipaddress`;
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

//添加购物车信息
router.post('/addcar', async (req, res) => {
    let {
        token,
        userName,
        goodName,
        goodImg,
        discount,
        price,
        id
    } = req.body; //data传参用body接收

    try {
        let inf = {}
        let result = verify(token);
        if (result.data == userName) {
            let sql2 = `SELECT * FROM shopcar WHERE userName='${userName}' and goodName='${goodName}'`;
            let p2 = await query(sql2);
            if (p2.length) {
                let num = p2[0].goodNum + 1
                let sql = `UPDATE shopcar SET goodNum='${num}' WHERE userName='${userName}' and goodName='${goodName}'`;
                let p = await query(sql);
                if (p.affectedRows) {
                    let sql3 = `SELECT * FROM shopcar WHERE userName='${userName}'`;
                    let p3 = await query(sql3);
                    inf = {
                        code: 2000,
                        flag: true,
                        message: '添加成功',
                        total: p3.length
                    }
                } else {
                    inf = {
                        code: 3000,
                        flag: false,
                        message: '添加失败，信息接收错误或查询错误',
                    }
                }
                res.send(inf);
            } else if (!p2.length) {
                let sql3 = `SELECT * FROM goodsmin WHERE id='${id}'`
                let p3 = await query(sql3);
                let p5 = await query(`SELECT * FROM goodlist WHERE goods_id='${p3[0].gid}'`)
                let sql4 = `SELECT * FROM shoppeeker WHERE userName='${p3[0].userName}'`
                let p4 = await query(sql4);
                let sql = `INSERT INTO shopcar(goodName,title,goodImg,discount,price,minid,shopName,userName,goodNum,gid,stock) VALUES('${goodName}','${p5[0].goodstitle}','${goodImg}','${discount}','${price}','${id}','${p4[0].shopName}','${userName}','1','${p3[0].gid}','${p3[0].stock}')`;
                let p = await query(sql);
                if (p.affectedRows) {
                    let sql3 = `SELECT * FROM shopcar WHERE userName='${userName}'`;
                    let p3 = await query(sql3);
                    inf = {
                        code: 2000,
                        flag: true,
                        message: '添加成功',
                        total: p3.length
                    }
                } else {
                    inf = {
                        code: 3000,
                        flag: false,
                        message: '添加失败，信息接收错误或查询错误'
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

});

//删除购物车信息
router.delete('/delecar', async (req, res) => {
    let {
        id,
        userName,
        token
    } = req.body;
    try {
        let inf = {};
        let result = verify(token);
        if (result.data == userName) {
            let sql = `DELETE FROM shopcar WHERE id=${id} and userName='${userName}'`;
            let p = await query(sql);
            if (p.affectedRows) {
                let sql2 = `SELECT * FROM shopcar WHERE userName='${userName}'`
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
                    message: '删除失败,查询不到相关信息'
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

//更改购物车信息
router.put('/editcar', async (req, res) => {
    let {
        userName,
        id,
        goodNum,
        token
    } = req.body
    try {

        let result = verify(token);
        let inf = {};
        if (result.data == userName) {

            let sql2 = `SELECT * FROM user WHERE userName='${userName}'`;
            let p2 = await query(sql2);

            if (p2.length) {
                let sql = `UPDATE shopcar SET goodNum='${goodNum}' WHERE userName='${userName}' and id='${id}'`;
                let p = await query(sql); //[{},{}]

                if (p.affectedRows) {
                    let sql3 = `SELECT * FROM shopcar WHERE userName='${userName}'`
                    let p3 = await query(sql3);
                    inf = {
                        code: 2000,
                        flag: true,
                        message: '修改成功',
                        data: p3
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

//分页查询订单
router.post('/pageorder', async (req, res) => {
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
        if (result.data == "admin") {
            let sql = `SELECT * FROM orderform LIMIT ${index},${size}`;
            let p = await query(sql);
            let sql2 = `SELECT * FROM orderform`;
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
                    code: 3000,
                    flag: false,
                    message: '暂无数据',
                    data: []
                }
            }
            res.send(inf);
        } else if (result.data == userName) {
            let p2 = await query(`SELECT * FROM shoppeeker WHERE userName='${userName}'`)
            let sql = `SELECT * FROM orderform WHERE shopName='${p2[0].shopName}' LIMIT ${index},${size}`;
            let p = await query(sql);
            let sql2 = `SELECT * FROM orderform WHERE shopName='${p2[0].shopName}'`;
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

//单个查询订单
router.post('/checkorder', async (req, res) => {
    let {
        userName,
        token,
        id
    } = req.body;
    try {
        let result = verify(token);
        if (result.data == userName) {
            let sql = `SELECT * FROM orderform where id='${id}'`;
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
                    message: '查询失败'
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
            err,
            code: 5000,
            flag: false,
            message: '服务器处理错误'
        }
        res.send(inf);
    }

});

//删除订单
router.delete('/delorder', async (req, res) => {
    let {
        userName,
        id,
        token
    } = req.body;

    try {
        let inf = {};
        let result = verify(token);
        if (result.data == userName) {
            id = JSON.parse(id)
            let src = id.join();

            let sql = `DELETE FROM orderform WHERE id in(${src})`;

            let p = await query(sql);
            if (p.affectedRows > 0) {
                let p2 = await query(`SELECT * FROM shoppeeker WHERE userName='${userName}'`)
                let sql3 = `SELECT * FROM orderform WHERE shopName='${p2[0].shopName}'`;
                let p3 = await query(sql3);
                //删除成功
                inf = {
                    code: 2000,
                    flag: true,
                    message: '删除成功',
                    data: {
                        p3
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
        } else if (result.data == "admin") {
            let sql = `DELETE FROM orderform WHERE id='${id}'`;
            let p = await query(sql);
            if (p.affectedRows > 0) {
                let sql2 = `SELECT * FROM orderform `;
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
                code: 4000,
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

});

///分页查询评论
router.post('/allcomment', async (req, res) => {
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
        let result = verify(token);
        if (result.data == "admin") {
            let sql = `SELECT * FROM leaveaud LIMIT ${index},${size}`;
            let p = await query(sql); //[{},{}]
            let arr = await query(`SELECT * FROM leaveaud`)

            let inf = {}
            if (p.length) {
                //查到数据：查询成功
                inf = {
                    code: 2000,
                    flag: true,
                    message: '查询成功',
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

        } else if (result.data == userName) {
            let p2 = await query(`SELECT * FROM shoppeeker WHERE userName='${userName}'`)

            let sql = `SELECT * FROM leaveaud WHERE shopName='${p2[0].shopName}' LIMIT ${index},${size}`;
            let p = await query(sql);
            let sql2 = `SELECT * FROM leaveaud WHERE shopName='${p2[0].shopName}'`;
            let arr = await query(sql2);

            let inf = {}
            if (p.length) {
                //查到数据：查询成功
                inf = {
                    code: 2000,
                    flag: true,
                    message: '查询成功',
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

});

//单个查询评论
router.post('/checkcomment', async (req, res) => {
    let {
        userName,
        token,
        alias
    } = req.body;

    try {
        let result = verify(token);
        if (result.data == userName) {
            let sql = `SELECT * FROM leaveaud where alias='${alias}'`;
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
                    message: '查询失败'
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
            err,
            code: 5000,
            flag: false,
            message: '服务器处理错误'
        }
        res.send(inf);
    }

});

//删除评论
router.delete('/delecomment', async (req, res) => {
    let {
        id,
        token
    } = req.body;
    try {
        let inf = {};
        let result = verify(token);
        if (result.data == "admin") {
            let sql = `DELETE FROM leaveaud WHERE id=${id}`;
            let p = await query(sql);
            if (p.affectedRows > 0) {
                let sql2 = `SELECT * FROM leaveaud `;
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
                code: 4000,
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

});

//生成订单
router.post('/addorder', async (req, res) => {
    let {
        userName,
        token,
        data
    } = req.body; //data传参用body接收
    let state = "待支付"
    try {

        let p3 = await query(`SELECT * FROM shipaddress WHERE userName='${userName}' and keep='true'`);
        let inf = {}
        let consignee = p3[0].consignee || "";
        let phone = p3[0].phone || "";
        let district = p3[0].district || "";
        let detailedly = p3[0].detailedly || "";
        let result = verify(token);
        let price = 0;
        for (let index = 0; index < data.length; index++) {
            price += data[index].discount * data[index].goodNum * data[index].price
        }
        if (result.data == userName) {
            for (let i = 0; i < data.length; i++) {
                let p2 = await query(`SELECT * FROM goodsmin WHERE id='${data[i].minid}'`);
                let p = await query(`INSERT INTO orderform(gid,minid,goodImg,goodNum,title,price,typemin,alias,consignee,phone,district,detailedly,userName,shopName,state) VALUES('${data[i].gid}','${data[i].minid}','${data[i].goodImg}','${data[i].goodNum}','${data[i].title}','${data[i].price}','${p2[0].typemin}','${data[i].goodName}','${consignee}','${phone}','${district}','${detailedly}','${userName}','${data[i].shopName}','${state}')`);
                let p4 = await query(`DELETE FROM shopcar WHERE id=${data[i].minid}`);
                if (p.affectedRows) {
                    inf = {
                        code: 2000,
                        flag: true,
                        message: '生成订单成功',
                        price
                    }
                } else {
                    inf = {
                        code: 3000,
                        flag: false,
                        message: '生成订单失败'
                    }
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
            message: '服务器处理相关信息失败',
        }
        res.send(inf);
    }

});


//渲染订单


module.exports = router;