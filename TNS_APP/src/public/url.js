let urlTest = 'http://10.3.141.27:8092' //粱
// let urlTest = 'http://localhost:3300'
// let urlTest = 'http://localhost:3699'
// let urlTest = 'http://10.3.141.155:3699' //长
// let urlTest = 'http://122.51.198.207:8088/tns' //上线测试


let urlGo = 'http://122.51.198.207:8088/tns' //上线

let url = process.env.NODE_ENV === 'production' ? urlGo : urlTest
export default {
	//验证用户名是否存在
	nameVerify: url + '/user/regVerify',
	//用户登录
	userLogin: url + '/user/log',
	//用户注册
	userReg: url + '/user/register',
	//token验证
	userToken: url + '/user/verify',
	//退出登录
	userLoginOut: url + '/user/logout',
	//上传头像
	userImgUp: url + '/upload/touxiang',
	//用户编辑
	userMesUp: url + '/user/edit',
	//用户修改密码
	userNewPass: url + '/user/amend',
	//添加收货地址
	userSite: url + '/user/address',
	//获取收货地址
	userGetSite: url + '/user/checkress',
	//修改收货地址
	userAreaPut: url + '/user/editress',
	//删除收货地址
	delUserArea: url + '/user/deleress',

	//获取商品数据
	shopData: url + '/user/pageGood',

	//获取购物车数据
	shopCar: url + '/shopcar/paging',
	//添加购物车
	setShopCar: url + '/shopcar/addcar',
	//修改购物车
	putShopCar: url + '/shopcar/editcar',
	//删除购物车
	delShopCar: url + '/shopcar/delecar',

	//提交订单:
	submitPage : url + '/shopcar/addorder',


	//入驻商家:
	userInShop: url + '/shopKeeper/regshop',

}



