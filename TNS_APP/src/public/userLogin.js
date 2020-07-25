import React,{useEffect,useCallback} from "react";
import store from "../redux/store";
import utils from "./utils";
function userLogink(ReactDom) {
	return function (props) {
		//返回点击触发
		let inVerify = ['/mine','/addarea','/address','/changeuser']
		let hash = store.getState().uesrLogin.hash
		let {historyBack,hashchange} = useCallback({
			historyBack:function () {
				if(!store.getState().uesrLogin.userLogin){
					// console.log(hash)
					if(hash[1] && inVerify.some(loUrl=>loUrl == hash[1].key)){
						for(let i = 1; i < hash.length; i++){
							if(inVerify.every(inKey=>inKey != hash[i].key)){
								// console.log(hash[i])
								let url = hash[i].url.split(/.*[/][/][^/]*/)[1] ? hash[i].url.split(/.*[/][/][^/]*/)[1] : '/'
								props.history.push({
									pathname:url
								})
								return
							}
						}
					}
				}
				props.history.go(-1)
			},
			//登录成功跳转页面用
			hashchange(noHash= ['/reg','/login']){
				// console.log(hash)
				for (let i = 0; i < hash.length; i++){
					if(noHash.every(sit=>sit != hash[i].key)){
						// console.log(hash[i])
						return hash[i].url
					}
				}
				return '/'
			}
		})
		return <ReactDom historyBack={historyBack} hashchange={hashchange} {...props}/>
	}
}
export default userLogink