const express = require('express');
const router = express.Router();
const fs = require('fs');
const {
    create,
    verify
} = require('./token'); //引入转换token方法

const query = require('../../db/mysql');
//图片上传
var multer = require('multer') //引入插件multer用于上传文件


var storage = multer.diskStorage({
    //目录：无则创建
    destination: 'userimg/',
    filename: function (req, file, cb) {
        // console.log(file);
        //3.jpg 
        let arr = file.originalname.split('.');
        // cb(null, file.fieldname + '-' + Date.now()) //avatar-42432476
        cb(null, arr[0] + '-' + Date.now() + '.' + arr[1]) //avatar-42432476
    }
});



var uploaduser = multer({
    storage
})

//上传单个文件：上传头像  /upload/touxiang
router.post('/touxiang', uploaduser.single('file'), async (req, res) => {
    let {
        userName,
        token
    } = req.body; //获取formdata传过来的uid
    console.log(req.file);
    let host = "http://122.51.198.207:8088/";
    let url = host + '/tns/userimg/' + req.file.filename;

    try {
        let inf = {};
        let result = verify(token);
        if (result) {
            let p = await query(`UPDATE user SET headPortraitUrl='${url}' WHERE userName='${userName}'`);
            if (p.affectedRows) {
                inf = {
                    code: 2000,
                    flag: true,
                    message: '上传成功',
                    data: {
                        imgurl: url
                    }
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
            fs.unlink(req.file.filename, function (err) {
                if (err) {
                    return console.error(err);
                }
            });
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

})





module.exports = router; //导出