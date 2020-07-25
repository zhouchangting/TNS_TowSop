const express = require('express'); //引入expree模块

const {
    create,
    verify
} = require('./token'); //引入转换token方法
const query = require("../../db/mysql"); //引入mysql方法，做数据库的查询

const router = express.Router();

//登陆
router.post('/login', async (req, res) => {
    let {
        name,
        psw
    } = req.body;
    try {
        let sql = `SELECT * FROM adminlist WHERE adminName='${name}' and adminPsw='${psw}'`;
        let sql2 = `SELECT * FROM adminlist WHERE adminName='${name}'`;
        let p = await query(sql); //[{},{}]
        let p2 = await query(sql2);
        let inf = {}
        if (p.length) {
            let token = create(name);
            let {
                nickName,
                adminPhone,
                headPortraitUrl,
                authority
            } = p2[0];

            inf = {
                code: 2000,
                flag: true,
                message: '登录成功',
                data: {
                    name,
                    nickName,
                    adminPhone,
                    headPortraitUrl,
                    authority,
                    token
                }

            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '登录失败，账号或密码错误'
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
});

//修改密码
router.put('/amend', async (req, res) => {
    let {
        userName,
        newpsw,
        token
    } = req.body

    try {
        let result = verify(token);
        let inf = {};
        if (result.data == "admin") {
            let sql = `UPDATE user SET userPsw='${newpsw}' WHERE userName='${userName}'`;
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

//审核用户转商铺
router.put('/auditshop', async (req, res) => {
    let {
        id,
        audit,
        token
    } = req.body;
    if (!audit) {
        let inf = {
            code: 2000,
            flag: true,
            message: '获取传入值失败或为空',
        }
        res.send(inf);
    }
    try {
        let result = verify(token);
        if (result.data == "admin") {
            let sql = `UPDATE shoppeeker SET audit='${audit}' WHERE id=${id}`;
            let p = await query(sql);
            let inf = {}
            if (p.affectedRows) {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '状态更新成功',
                }
            } else {
                inf = {
                    code: 3000,
                    flag: false,
                    message: '状态更新失败，查询不到相关数据'
                }
            }
            res.send(inf);
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: 'token校验失败或已失效'
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
});

//审核商品
router.put('/auditgood', async (req, res) => {
    let {
        id,
        audit,
        token
    } = req.body;
    try {
        let result = verify(token);
        if (result.data == "admin") {
            let sql = `UPDATE goodsmin SET checkes='${audit}' WHERE id=${id}`;
            let p = await query(sql);
            let inf = {}
            if (p.affectedRows) {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '状态更新成功',
                }
            } else {
                inf = {
                    code: 3000,
                    flag: false,
                    message: '状态更新失败，查询不到相关信息'
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

//用户类型更换
router.put('/audituser', async (req, res) => {
    let {
        id,
        type,
        token
    } = req.body;
    try {
        let result = verify(token);
        if (result.data == "admin") {
            if (type == "通过") {
                let sql = `UPDATE user SET type='shopkeeper' WHERE id=${id}`;
                let p = await query(sql);
                let inf = {}
                if (p.affectedRows) {
                    inf = {
                        code: 2000,
                        flag: true,
                        message: '状态更新成功',
                    }
                } else {
                    inf = {
                        code: 3000,
                        flag: false,
                        message: '状态更新失败，查询不到相关数据'
                    }
                }
                res.send(inf);
            } else {
                let sql = `UPDATE user SET type='common' WHERE id=${id}`;
                let p = await query(sql);
                let inf = {}
                if (p.affectedRows) {
                    inf = {
                        code: 2000,
                        flag: true,
                        message: '状态更新成功',
                    }
                } else {
                    inf = {
                        code: 3000,
                        flag: false,
                        message: '状态更新失败，查询不到相关数据'
                    }
                }
                res.send(inf);
            }

        } else {
            inf = {
                code: 3000,
                flag: false,
                message: 'token校验失败或已失效'
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
});

//分页查询商铺
router.post('/checkshop', async (req, res) => {
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
            let sql = `SELECT * FROM shoppeeker LIMIT ${index},${size}`;
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


//更改商铺用户个人信息
router.put('/editshop', async (req, res) => {
    let {
        userName,
        token
    } = req.body
    let sql3 = `SELECT * FROM shoppeeker WHERE userName='${userName}'`;
    let p3 = await query(sql3);
    let obj = {}
    obj.password = req.body.password || p3[0].password;
    obj.shopName = req.body.shopName || p3[0].shopName;
    obj.area = req.body.area || p3[0].area;
    obj.site = req.body.site || p3[0].site;
    obj.linkman = req.body.linkman || p3[0].linkman;
    obj.phone = req.body.phone || p3[0].phone;
    obj.idCard = req.body.idCard || p3[0].idCard;
    obj.email = req.body.email || p3[0].email;
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
            let sql = `UPDATE shoppeeker SET ${str} WHERE userName='${userName}'`;
            let p = await query(sql); //[{},{}]
            //校验成功
            if (p.affectedRows) {
                //修改成功   
                let sql2 = `SELECT * FROM user WHERE userName='${userName}'`
                let p2 = await query(sql2);
                let {
                    shopName,
                    area,
                    site,
                    linkman,
                    phone,
                    idCard,
                    email
                } = p2[0];
                inf = {
                    code: 2000,
                    flag: true,
                    message: '修改成功',
                    data: {
                        shopName,
                        area,
                        site,
                        linkman,
                        phone,
                        idCard,
                        email
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


module.exports = router;