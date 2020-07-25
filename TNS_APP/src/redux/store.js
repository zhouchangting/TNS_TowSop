import { createStore,combineReducers } from 'redux'
import utils from "../public/utils";
//登录仓库
function uesrLogin(state = {shopCarData:[],shopCarLength:0,userLogin:false,hash:[{key:'/',url:'/'}],historyLength:[]},action){
	let newState = {}
	switch (action.type) {
		case 'shopCarData':
			newState.shopCarData = action.shopCarData
			break
		// case 'shopCarLength': //购物车下标值
		// 	newState.shopCarLength = action.shopCarLength
		// 	break
		case 'userLoginIn': //登录成功
			newState.userLogin = true
			// newState.username = action.username
			// newState.nickName = action.nickName ? action.nickName : '默认昵称'
			// newState.userPhone = action.userPhone ? action.userPhone : '10000000000'
			// newState.headPortraitUrl = action.headPortraitUrl ? action.headPortraitUrl : 'http://a3.att.hudong.com/35/34/19300001295750130986345801104.jpg'
			// newState.regTiem = action.regTiem ? action.regTiem : '2020-07-15 20:55:24'
			// newState.token = action.token
			if(action.cookie){
				if(!action.nickName)action.nickName = '未设置昵称'
				if(!action.userPhone)action.userPhone = '未设置手机号'
				if(!action.regTiem)action.regTiem = '未知'
				if(!action.headPortraitUrl)action.headPortraitUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595252490592&di=555bd85304091890024a944aa72aa597&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20181227%2F19%2F1545910900-bhikFXDBWf.jpeg'
				if(action.noLogin){
					utils.setCookie('username',action.username,14)
					utils.setCookie('nickName',action.nickName,14)
					utils.setCookie('userPhone',action.userPhone,14)
					utils.setCookie('regTiem',action.regTiem,14)
					utils.setCookie('headPortraitUrl',action.headPortraitUrl,14)
					utils.setCookie('token',action.token,14)
				}else {
					utils.setCookie('username',action.username)
					utils.setCookie('nickName',action.nickName)
					utils.setCookie('userPhone',action.userPhone)
					utils.setCookie('regTiem',action.regTiem)
					utils.setCookie('headPortraitUrl',action.headPortraitUrl)
					utils.setCookie('token',action.token)
				}
			}

			break
		case "userLoginOut" : //退出登录
			newState.userLogin = false
			// newState.username = null
			// newState.nickName = null
			// newState.userPhone = null
			// newState.headPortraitUrl = null
			// newState.regTiem = null
			newState.shopCarData = []
			newState.token = null
			utils.setCookie('username','',-2)
			utils.setCookie('nickName','',-2)
			utils.setCookie('userPhone','',-2)
			utils.setCookie('regTiem','',-2)
			utils.setCookie('headPortraitUrl','',-2)
			utils.setCookie('token','',-2)
			break
		case "hashchange" :  //切换路径,保存参数
			let hash = [...state.hash]
			hash.unshift(action.hash)
			newState.hash = hash
			break
		case "hashDell" :  //切换路径,保存参数
			let hashDel = [...state.hash]
			hashDel.splice(1,1)
			newState.hash = hashDel
			break
		case 'historyLength': //记录跳转登录页面下标
			let historyLength = [...state.historyLength]
			historyLength.unshift(action.historyLength)
			newState.historyLength = historyLength
			break
	}
	state = JSON.parse(JSON.stringify(state))
	return Object.assign(state,newState)
}



let reducer = combineReducers({ uesrLogin })
let store = createStore(reducer);

// window.addEventListener('hashchange',function(e) {
// 	// console.log(e)
// 	store.dispatch({
// 		type:'hashchange',
// 		hash:window.location.hash.match(/[/].*/)[0]
// 	})
// 	if(store.getState().uesrLogin.uesrLogin)return
// 	let newurl  = e.newURL.split(e.newURL.match(/.*[/][/][^/]*/)[0])[1].toLowerCase()
// 	let lodurl  = e.oldURL.split(e.oldURL.match(/.*[/][/][^/]*/)[0])[1].toLowerCase()
// 	if(newurl.match(/[/][#][/]/)){
// 		newurl  = newurl.split(newurl.match(/[/][#][/]/)[0])[1]
// 		newurl = '/' + newurl
// 	}
// 	if(lodurl.match(/[/][#][/]/)){
// 		lodurl  = lodurl.split(lodurl.match(/[/][#][/]/)[0])[1]
// 		lodurl = '/' + lodurl
// 	}
// 	let noInURL = ['/shopcar']
// 	let noOutURL = ['/login','/reg']
// 	if(noInURL.some(url=>url == newurl) && noOutURL.some(url=>url == lodurl)){
// 		window.location.hash = '/'
// 	}
//
// },false);


// let myHistoryPush = window.history.pushState
// window.history.pushState = function (state,data,hash) {
// 	myHistoryPush.call(this,state,data,hash)
// 	let olUrl = store.getState().uesrLogin.hash[store.getState().uesrLogin.hash.length - 1]
// 	store.dispatch({
// 		type:'hashchange',
// 		hash:hash.toLowerCase()
// 	})
// 	let noInURL = ['/shopcar']
// 	let noOutURL = ['/login','/reg']
// 	if(noInURL.some(url=>url == hash){
//
// 	}
// 	if(noInURL.some(url=>url == hash) && noOutURL.some(url=>url == olUrl)){
// 		window.location.href = './'
// 	}
// }

// function rorte(newurl,lodurl) {
// 	let noInURL = ['/shopcar']
// 	let noOutURL = ['/login','/reg']
// 	if(noInURL.some(url=>url == newurl) && noOutURL.some(url=>url == lodurl)){
// 		window.location.hash = '/'
// 	}
// }


export default store