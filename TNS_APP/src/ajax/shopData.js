import ajax from "../public/ajax";
import url from "../public/url";
import utils from "../public/utils";
export default {
	shopData(args = {}){ //查询商品接口
		let obj = {}
		if(args.page)obj.page = args.page
		if(args.size)obj.size = args.size
		if(args.type)obj.type = args.type
		if(args.goods_id)obj.goods_id = args.goods_id
		return ajax({
			url:url.shopData,
			method: 'post',
			body:{
				...obj
			}
		})
	},
	getShopCar(args = {}){ //获取购物车
		let obj = {}
		if(args.page)obj.page = args.page
		if(args.size)obj.size = args.size
		obj.userName = utils.getCookie('username')
		obj.token = utils.getCookie('token')
		if(args.goods_id)obj.goods_id = args.goods_id
		return ajax({
			url:url.shopCar,
			method: 'post',
			body:{
				...obj
			}
		})
	},
	setShopCar(args){ //添加商品
		let obj = {}
		if(args.discount)obj.discount = args.discount
		if(args.price)obj.price = args.price
		if(args.id)obj.id = args.id
		if(args.goodName)obj.goodName = args.goodName
		if(args.goodImg)obj.goodImg = args.goodImg
		obj.userName = utils.getCookie('username')
		obj.token = utils.getCookie('token')
		return ajax({
			url:url.setShopCar,
			method: 'post',
			body:{
				...obj
			}
		})
	},
	putShopCar(id,goodNum){ //修改商品数量
		let obj = {id,goodNum}
		obj.userName = utils.getCookie('username')
		obj.token = utils.getCookie('token')
		return ajax({
			url:url.putShopCar,
			method: 'put',
			body:{
				...obj
			}
		})
	},
	delShopCar(id){ //删除商品
		let obj = {id}
		obj.userName = utils.getCookie('username')
		obj.token = utils.getCookie('token')
		return ajax({
			url:url.delShopCar,
			method: 'delete',
			body:{
				...obj
			}
		})
	},
	submitPage(data){ //提交订单
		let obj = {data}
		obj.userName = utils.getCookie('username')
		obj.token = utils.getCookie('token')
		return ajax({
			url:url.submitPage,
			method: 'post',
			body:{
				...obj
			}
		})
	},
}