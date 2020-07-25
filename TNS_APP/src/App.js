import React, {useEffect,useState,Suspense} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import userAjax from './ajax/user'
import utils from "./public/utils";
import store from "./redux/store";
import routers from './routers/routers'
import {Drawer} from "antd";
import './App.css';
import './assets/css/App.scss'
import Add_css from "./assets/css/Address_sel.module.scss";
import add_site from "./public/ressJSON.json";
import getShopCar from "./public/getShopCar";
function App(props) {
	let [router,routerCh] = useState('/')
	let [more,moreCh] = useState(false)

	useEffect(() => {
		if (utils.getCookie('token')) {
			userAjax.tokenTrue(utils.getCookie('token')).then(res => {
				if (res.code == '2000') {
					store.dispatch({
						type: 'userLoginIn',
						userLogin: true
					})
					getShopCar()
				} else {
					store.dispatch({
						type: 'userLoginOut'
					})
				}
			})
		}
		let key = window.location.href.toLowerCase().replace(/.*[/][/][^/]*[/]?[#]?[/]/, '/').replace(/[/][?].*/, '')
		routerCh(key)
		store.dispatch({
			type: 'hashchange',
			hash: {
				key: key,
				url: window.location.href.toLowerCase().replace(/.*[/][/][^/]*[/]?[#]?[/]/, '/')
			}
		})
		props.history.listen(hash => {
			if (store.getState().uesrLogin.hash[1]) {
				if (hash.pathname.toLowerCase() == store.getState().uesrLogin.hash[1].key) {
					store.dispatch({
						type: 'hashDell',
					})
				}
			}
			store.dispatch({
				type: 'hashchange',
				hash: {
					key: hash.pathname.toLowerCase(),
					url: window.location.href.toLowerCase().replace(/.*[/][/][^/]*[/]?[#]?[/]/, '/')
				}
			})
			moreCh(false)
			routerCh(hash.pathname.toLowerCase())
		})
	}, [])
	return (
		<div className="App">
			{/* 头部 */}
			<div className={'my_header'} style={{display:routers.some(rou=>{
					if(rou.path == router.replace(/[?].*/,''))return rou.isHeader
					return false
				}) ? 'block' : 'none'}}>
				<header>
					<a className="iconfont icon-zuo" onClick={()=>{
						props.history.go(-1)
					}}></a>
					<h1>{routers.map(rou=>rou.path == router.replace(/[?].*/,'') ? rou.name : '')}</h1>
				</header>
				<div className="shop_rightBox" >
					<a className="iconfont icon-shenglvehao icon" onClick={()=>moreCh(!more)}></a>

					<div className="more-list" style={{display:more ? 'block' : 'none'}}>
						<a onClick={()=>{
							props.history.push({
								pathname:'/shopcar'
							})
						}}>
                                <span className="iconfont icon-gouwuche">
                                    <span className="name">购物车</span>
                                </span>
						</a>
						<a>
                                <span className="iconfont icon-fangdajing">
                                    <span className="name">搜索</span>
                                </span>
						</a>
						<a>
                                <span className="iconfont icon-leimu">
                                    <span className="name">类目</span>
                                </span>
						</a>
						<a onClick={()=>{
							props.history.push({
								pathname:'/'
							})
						}}>
                                <span className="iconfont icon-fangzi">
                                    <span className="name">首页</span>
                                </span>
						</a>
						<a onClick={()=>{
							props.history.push({
								pathname:'/mine'
							})
						}}>
                                <span className="iconfont icon-yonghu">
                                    <span className="name">我的</span>
                                </span>
						</a>
					</div>
				</div>
			</div>
			{/*渲染*/}
			<Suspense fallback={<div style={{position: 'absolute',top: '0',left: '0',right: '0',
				bottom: '0',margin: 'auto'}}>加载中...</div>}>
				<Switch>
					{
						routers.map(rou=><Route path={rou.path} component={rou.component} exact key={rou.path}/>)
					}
				</Switch>
			</Suspense>


		</div>
	);
}

export default withRouter(App);