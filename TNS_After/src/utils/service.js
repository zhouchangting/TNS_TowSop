import axios from 'axios';
import {message} from 'antd';
//http://10.3.141.155:3699 10.3.141.27
const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://122.51.198.207:8088/tns' : 'http://122.51.198.207:8088/tns';

const Service = axios.create({
    thimeout: 5000,  //请求超时
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
});

//请求拦截
Service.interceptors.request.use(req=>{
    // console.log(req);
    //需要token的方法
    const excludeToken = ['login'];
    // if(req.method.toUpperCase() === ['POST','DELETE','PUT']){
    if(/^(POST|DELETE|PUT)$/.test(req.method.toUpperCase())){
        // console.log('请求拦截');
        //获取请求后台的具体方法
        let reqF = req.url.split('/')[2];
        if(excludeToken.filter(item=>{
            return item === reqF;
        }).length){
            JSON.stringify(req.data);
        }else{
            if(JSON.parse(sessionStorage.getItem('userInfo')).token){
                //附加token
                req.data.token = JSON.parse(sessionStorage.getItem('userInfo')).token;
            }else{
                window.location.href = '/';
            }
        }

    }

    return req;
})

//响应拦截
Service.interceptors.response.use(
    res=>{
        if(res.status === 200){
            return Promise.resolve(res);
        }
        return Promise.reject(res);
    },
    err=>{
        if(err && err.response){
            switch(err.response.status){
                case 400: err.message = '请求错误(400)' ; break;
                case 401: err.message = '未授权，请重新登录(401)'; break;
                case 403: err.message = '拒绝访问(403)'; break;
                case 404: err.message = '请求出错(404)'; break;
                case 408: err.message = '请求超时(408)'; break;
                case 500: err.message = '服务器错误(500)'; break;
                case 501: err.message = '服务未实现(501)'; break;
                case 502: err.message = '网络错误(502)'; break;
                case 503: err.message = '服务不可用(503)'; break;
                case 504: err.message = '网络超时(504)'; break;
                case 505: err.message = 'HTTP版本不受支持(505)'; break;
                default: 
                    err.message = `连接出错(${err.response.status})!`;
            }
        }else{
            err.message = '连接服务器失败！';
        }
        message.error(err);
        return Promise.reject(err);
    }
)

export default Service;