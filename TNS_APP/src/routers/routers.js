import React, { lazy } from "react";
let  Home = lazy(()=>import( '../pages/Home' ))
let  Login = lazy(()=>import( '../pages/Login' ))
let  Reg = lazy(()=>import( '../pages/Reg'))
let  ShopCar = lazy(()=>import( '../pages/ShopCar'))
let  ShopList = lazy(()=>import( '../pages/ShopList'))
let  Mine = lazy(()=>import( '../pages/Mine'))
let  AddArea = lazy(()=>import( '../pages/AddArea'))
let  Address = lazy(()=>import( '../pages/Address'))
let  ChangeUser = lazy(()=>import( '../pages/ChangeUser'))
// let  ShopList2 = lazy(()=>import( '../pages/ShopList2'))
let  Shop = lazy(()=>import( '../pages/Shop'))
let  ShopStore = lazy(()=>import( '../pages/ShopStore'))
let  Order = lazy(()=>import( '../pages/Order'))
let  Pay = lazy(()=>import( '../pages/Pay'))
let  Store = lazy(()=>import( "../pages/Store"))
let routers	= [
	{
		path:'/',
		component:Home,
		name:'首页',
		isHeader:false
	},
	{
		path:'/reg',
		component:Reg,
		name:'注册',
		isHeader:false
	},
	{
		path:'/login',
		component:Login,
		name:'登录',
		isHeader:false
	},
	{
		path:'/shoplist',
		component:ShopList,
		name:'商品列表',
		isHeader:false
	},
	// {
	// 	path:'/shoplist2',
	// 	component:ShopList2,
	// 	name:'商品列表',
	// 	isHeader:false
	// },
	{
		path:'/shop',
		component:Shop,
		name:'商品详情',
		isHeader:true
	},
	{
		path:'/shopcar',
		component:ShopCar,
		name:'购物车',
		isHeader:true
	},
	{
		path:'/mine',
		component:Mine,
		name:'我的',
		isHeader:false
	},
	{
		path:'/addarea',
		component:AddArea,
		name:'地址管理',
		isHeader:true
	},
	{
		path:'/address',
		component:Address,
		name:'新增收货地址',
		isHeader:true
	},
	{
		path:'/changeuser',
		component:ChangeUser,
		name:'设置',
		isHeader:true
	},
	{
		path:'/shopstore',
		component:ShopStore,
		name:'店铺主页',
		isHeader:true
	},
	{
		path:'/order',
		component:Order,
		name:'确认订单',
		isHeader:true
	},
	{
		path:'/pay',
		component:Pay,
		name:'支付页',
		isHeader:true
	},
	{
		path:'/store',
		component:Store,
		name:'商家入驻',
		isHeader:true
	},
]
export default routers




































