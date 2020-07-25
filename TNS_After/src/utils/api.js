import request from './service';

const USE_API_URL = '/user';
const ADMIN_API_URL = '/admin';
const UPLOAD_IMG = '/upload';
const GOODS_URL = '/shopKeeper'

export default {
    //用户获取信息（分页）
    getUserInfo({page,size,token}){
        return request({
            url: `${USE_API_URL}/paging`,
            method: 'post',
            data: {
                page,
                size,
                // token
            }
        })
    },
    //用户删除（单条）
    delUser({id}){
        return request({
            url: `${USE_API_URL}/dele`,
            method: 'delete',
            data: {
                id
            }
        })
    },
    //用户头像上传
    uploadUserAvater({data}){
        return request({
            url: `${UPLOAD_IMG}/touxiang`,
            method: 'post',
            data: {
                data
            }
        })
    },
    //修改用户信息
    editUserInfo({userName,nickName,userPhone}){
        return request({
            url: `${USE_API_URL}/edit`,
            method: 'put',
            data: {
                userName,
                nickName,
                userPhone
            }
        })
    },
    //修改用户密码
    editUserPsw({userName,newpsw}){
        return request({
            url: `${ADMIN_API_URL}/amend`,
            method: 'put',
            data: {
                userName,
                newpsw,
            }
        })
    },
    //系统管理员登录
    login(data){
        return request({
            url: `${ADMIN_API_URL}/login`,
            method: 'post',
            data: JSON.stringify(data)
        })
    },
    //查询所有商铺信息
    getStoreInfo({page,size}){
        return request({
            url: `${ADMIN_API_URL}/checkshop`,
            method: 'post',
            data: {
                page,
                size
            }
        })
    },
    //用户转商铺审核
    auditStore({id,audit}){
        return request({
            url: `${ADMIN_API_URL}/auditshop`,
            method: 'put',
            data:{
                id,
                audit
            }
        })

    },
    //商品信息分页
    getGoodsInfo(data){
        return request({
            url: `${GOODS_URL}/paging`,
            method: 'post',
            data:{...data}
        })
    },
    //商品审核
    auditGoods({id,audit}){
        return request({
            url: `${ADMIN_API_URL}/auditgood`,
            method: 'put',
            data:{
                id,
                audit
            }
        })
    },
    //查询评论分页
    getComment({page,size}){
        return request({
            url: `shopcar/allcomment`,
            method: 'post',
            data:{
                page,
                size
            }
        })
    },
    //删除评论（ID）
    delComment({id}){
        return request({
            url: `shopcar/delecomment`,
            method: 'delete',
            data:{
                id
            }
        })
    },
    //获取订单信息
    getOrderInfo({page,size}){
        return request({
            url: `shopcar/pageorder`,
            method: 'post',
            data:{
                page,
                size
            }
        })
    }
}