import {message} from "antd";
import utils from "./utils";
function ajax(obj){
	return new Promise(function (resolved, rejected){
		if (ajax.innet) {
			obj = ajax.innet(obj)
		}
		if (obj && obj.body && obj.type != 'formData') {
			obj.body = JSON.stringify(obj.body)
		}
		fetch(obj.url, {
			headers: {
				"Content-type": 'application/json',
			},
			method: 'get',
			...obj
		}).then(res=>{
			if(res.ok){
				res = res.json()
				if(ajax.out){
					res = ajax.out(res,obj)
				}
				resolved(res)
			}else {
				if(ajax.error){
					ajax.error(res.status)
				}
				rejected()
			}
		}).catch(err=>{
			if(ajax.error){
				ajax.error(err)
			}
			rejected()
		})
	})
}
ajax.innet = function(obj){
	obj.my_hash = window.location.href.toLowerCase().replace(/.*[/][/][^/]*[/]?[#]?[/]/, '/').replace(/[/][?].*/, '')
	return obj
}
ajax.out = async function (resIn,obj) {
	try {
		let res = await resIn
		if(res.code != '2000'){
			message.warning(res.message || '服务器错误')
		}
		if(obj.my_hash != window.location.href.toLowerCase().replace(/.*[/][/][^/]*[/]?[#]?[/]/, '/').replace(/[/][?].*/, '')){
			res.code = '9000'
		}
		return res
	}catch (e) {
		console.log(e)
	}
	// return resIn


}
ajax.error = function (err) {
	console.log(err)
	message.warning('系统错误,请检查网络,刷新重试')
}
export default ajax