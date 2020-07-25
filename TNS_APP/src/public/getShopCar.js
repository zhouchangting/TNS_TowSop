import store from "../redux/store";
import shopData from "../ajax/shopData";
import utils from "./utils";
import userAjax from "../ajax/user";
export default function (fn) {
	if(store.getState().uesrLogin.userLogin){
		shopData.getShopCar().then(res=>{
			if(res.code == '2000'){
				store.dispatch({
					type:'shopCarData',
					shopCarData:res.data
				})
				fn && fn(res.data)
			}
		})
	}else {
		return false
	}
	// else if(utils.getCookie('token')){
	// 	userAjax.tokenTrue().then(res=>{
	// 		if (res.code == '2000'){
	// 			store.dispatch({
	// 				type: 'userLoginIn',
	// 				userLogin: true,
	// 			})
	// 			shopData.getShopCar().then(res=>{
	// 				if(res.code == '2000'){
	// 					store.dispatch({
	// 						type:'shopCarData',
	// 						shopCarData:res.data
	// 					})
	// 				}
	// 			})
	// 		}else {
	// 			store.dispatch({
	// 				type: 'userLoginOut'
	// 			})
	// 			store.dispatch({
	// 				type: 'userLoginIn',
	// 				userLogin: false
	// 			})
	// 		}
	// 	})
	// }
}




