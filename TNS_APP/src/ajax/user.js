import ajax from "../public/ajax";
import url from "../public/url";
import utils from "../public/utils";
export default {
	username(name) {  //用户名注册验证
		return ajax({
			url: url.nameVerify + "?name=" + name ,
		})
	},
	userReg(name, psw) { //用户注册
		return ajax({
			method: 'post',
			url: url.userReg,
			body:{
				name,
				psw
			}

		})
	},
	userLogin(name, psw) { //用户登录

		return ajax({
			url: url.userLogin,
			method: 'post',
			body: {
				name,
				psw
			}
		})
	},
	tokenTrue(token){  //token验证
		if(!token)token = utils.getCookie('token')
		return ajax({
			url:url.userToken,
			method: 'post',
			body:{
				token
			}
		})
	},
	userLoginOut(token){  //退出登录
		if(!token)token = utils.getCookie('token')
		return ajax({
			url:url.userLoginOut,
			method: 'post',
			body:{
				token
			}
		})
	},
	userImgUp(formData){ //上传头像

		return ajax({
			url:url.userImgUp,
			method: 'post',
			body:formData,
			type:'formData',
			headers:{
				// "Content-type":'multipart/form-data'
			}
		})
	},
	userMesPut(str,data,token,userName){ //修改用户信息
		if(!token)token = utils.getCookie('token')
		if(!userName)userName = utils.getCookie('username')
		return ajax({
			url:url.userMesUp,
			method:'put',
			body:{
				token,
				userName,
				[str]:data
			}
		})
	},
	userNewPass(psw,newpsw,name,token){ //修改密码
		if(!token)token = utils.getCookie('token')
		if(!name)name = utils.getCookie('username')
		return ajax({
			url:url.userNewPass,
			method:'put',
			body:{
				token,
				name,
				newpsw,
				psw
			}
		})
	},
	uesrSaveSite(site){ //增加地址
		site.token = utils.getCookie('token')
		site.name = utils.getCookie('username')
		if(site.postcode == '')site.postcode = '00000'
		return ajax({
			url:url.userSite,
			method:'post',
			body:{
				...site
			}
		})
	},
	userGetSite(){ //查询地址
		let site = {}
		site.token = utils.getCookie('token')
		site.name = utils.getCookie('username')
		return ajax({
			url:url.userGetSite,
			method:'post',
			body:{
				...site
			}
		})
	},
	userArea(obj){ //修改收货地址
		let site = {...obj}
		site.token = utils.getCookie('token')
		site.name = utils.getCookie('username')
		return ajax({
			url:url.userAreaPut,
			method:'put',
			body:{
				...site
			}
		})
	},
	delUserArea(id){ //删除地址
		let site = {id}
		site.token = utils.getCookie('token')
		site.name = utils.getCookie('username')
		return ajax({
			url:url.delUserArea,
			method:'delete',
			body:{
				...site
			}
		})
	},
	userInShop(obj){ //入驻商家
		obj.token = utils.getCookie('token')
		obj.name = utils.getCookie('username')
		return ajax({
			url:url.userInShop,
			method:'post',
			body:{
				...obj
			}
		})
	}
}