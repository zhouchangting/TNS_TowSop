import React, {useCallback, useEffect, useState} from 'react'
import store from "../redux/store";
import {message, Spin} from "antd";
import utils from "../public/utils";
import {connect} from "react-redux";
import Login from "./Login";
import defImg from '../assets/images/Snipaste.png'
import getShopCar from "../public/getShopCar";
import shopDataAjax from "../ajax/shopData";
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/ShopCar.scss'
function ShopCar(props) {
	let [loading,loadingCh] = useState(false) //遮罩层
	let [carData,carDataCh] = useState([]) //购物车数据
	let {shopOnGoCh,shopOneOnGoCh,allShopOnGo,shopNumCh,addOrLose,deleteShop,shopCarClose,goOneShop} = useCallback({
		goOneShop(shopId){
			props.history.push({
				pathname:'/shop',
				search:`?GoodsId=${shopId}`
			})
		},
		shopOnGoCh(shopName,index,e){
			let newCar = [...carData]
			newCar[index].data.forEach((item,index2)=>newCar[index].data[index2].onGo = e.target.checked)
			carDataCh(newCar)
		},
		shopOneOnGoCh(shopName,index1,index2,e){
			let newCar = [...carData]
			newCar[index1].data[index2].onGo = e.target.checked
			carDataCh(newCar)
		},
		allShopOnGo(e){
			let newCar = [...carData]
			newCar.forEach((item,index1)=>item.data.forEach((item2,index2)=>newCar[index1].data[index2].onGo = e.target.checked))
			carDataCh(newCar)
		},
		shopNumCh(id,index1,index2,e){
			let newCar = [...carData]
			let num = e.target.value.trim()
			if(num < 1 || !num.match(/^\d*$/))num = '1'
			let lodnum = newCar[index1].data[index2].goodNum
			newCar[index1].data[index2].goodNum = num
			carDataCh(newCar)

			loadingCh(true)
			shopDataAjax.putShopCar(id,num,lodnum).then(res=>{
				if(res.code != '2000'){
					newCar[index1].data[index2].goodNum = lodnum
					carDataCh(newCar)
				}
				loadingCh(false)
			})
		},
		addOrLose(id,index1,index2,addOrLose){
			let newCar = [...carData]
			let lodnum = newCar[index1].data[index2].goodNum
			let num = +lodnum + (addOrLose == 'add' ? 1 : -1)
			if(num < 1)num = 1
			newCar[index1].data[index2].goodNum = num
			carDataCh(newCar)

			loadingCh(true)
			shopDataAjax.putShopCar(id,num,lodnum).then(res=>{
				if(res.code != '2000'){
					newCar[index1].data[index2].goodNum = lodnum
					carDataCh(newCar)
				}
				loadingCh(false)
			})
		},
		deleteShop(id,index1,index2){
			let newCar = [...carData]
			let lodData = []
			for(let i = 0; i < newCar.length; i++){
				let obj = {
					...newCar[i]
				}
				lodData.push(obj)
			}

			newCar[index1].data.splice(index2,1)
			if(newCar[index1].data.length == 0)newCar.splice(index1,1)
			carDataCh(newCar)

			loadingCh(true)
			shopDataAjax.delShopCar(id,lodData).then(res=>{
				// console.log(lodData)
				if(res.code != '2000'){
					carDataCh(lodData)
				}
				loadingCh(false)
			})
		},
		shopCarClose(){
			let num = carData.reduce((lod,ne,index,item)=>{
				let num = carData[index].data.reduce((lod2,ne2,index2,item2)=>{
					if(item2[index2].onGo){
						return  +item2[index2].goodNum + lod2
					}else {
						return lod2
					}
				},0)
				return num + lod
			},0)
			if(num == 0){
				message.warning('请选中商品')
				return
			}
			let shopCar_OnData = []
			carData.forEach(item=>{
				item.data.forEach(item2=>{
					if(item2.onGo){
						shopCar_OnData.push(item2)
					}
				})
			})
			props.history.push({
				pathname:'/order',
				state:shopCar_OnData
			})
		}
	})
	useEffect(()=>{
		let carData = []
		store.getState().uesrLogin.shopCarData.forEach((item,index)=>{
			item.onGo = false
			if(carData == []){
				carData.push({
					shopName:item.shopName,
					data:[item]
				})
			}else {
				let index = null
				for(let i = 0; i < carData.length; i++){
					if(carData[i].shopName == item.shopName){
						index = i
						break
					}
				}
				if(index != null){
					carData[index].data.push(item)
				}else {
					carData.push({
						shopName:item.shopName,
						data:[item]
					})
				}
			}
		})
		carDataCh(carData)
	},[store.getState().uesrLogin.shopCarData])
	useEffect(()=>{
		getShopCar(function (data) {
			let carData = []
			data.forEach((item,index)=>{
				item.onGo = false
				if(carData == []){
					carData.push({
						shopName:item.shopName,
						data:[item]
					})
				}else {
					let index = null
					for(let i = 0; i < carData.length; i++){
						if(carData[i].shopName == item.shopName){
							index = i
							break
						}
					}
					if(index != null){
						carData[index].data.push(item)
					}else {
						carData.push({
							shopName:item.shopName,
							data:[item]
						})
					}
				}
			})
			carDataCh(carData)
		})
	},[])

	return (
	<Spin  spinning = {loading}>
		<div className="shopcarBox">
			{/* 头部 */}
			{/* <header>
				<a className="iconfont icon-zuo" onClick={()=>{
					props.history.go(-1)
				}}></a>
				<h1>购物车</h1>
				<div className="rightBox">
					<a className="iconfont icon-shenglvehao" onClick={()=>{
						extendChan(!extend)
					}}></a>
					 更多选项，解开注释即可
					<div className="more-list" style={{display: extend ? 'block' : 'none'}}>
						<a>
							<span className="iconfont icon-gouwuche"></span>
							<span>购物车</span>
						</a>
						<a>
							<span className="iconfont icon-fangdajing"></span>
							<span>搜索&nbsp;&nbsp;</span>
						</a>
						<a>
							<span className="iconfont icon-leimu"></span>
							<span>类目&nbsp;&nbsp;</span>
						</a>
						<a onClick={()=>{
							props.history.push({
								pathname:'/'
							})
						}}>
							<span className="iconfont icon-fangzi" ></span>
							<span>首页&nbsp;&nbsp;</span>
						</a>
						<a onClick={()=>{
							props.history.push({
								pathname:'/mine'
							})
						}}>
							<span className="iconfont icon-yonghu"></span>
							<span>我的&nbsp;&nbsp;</span>
						</a>
					</div>
				</div>
			</header> */}
			{/* 购物车主体 */}
			<div className="container">
				<div className="product-body">
					{/* 未有商品状态，解开注释即可 */}
					<div className="floor" style={{display:props.state.userLogin ? 'none' : 'block'}} >
						<div className="shop-empty">
							<img src="//img.yihaodianimg.com/cart/shopping/h5/images/kongtai@2x.png"/>
							<div className="shop-text">
								<p>登录并同步购物车中商品</p>
							</div>
							<div className="shop-btn">
								<a onClick={()=>{
									props.history.push({
										pathname:'/reg'
									})
								}}>注册</a>
								<a onClick={()=>{
									props.history.push({
										pathname:'/login'
									})
								}}>登录</a>
							</div>
						</div>
					</div>
					<div style={{display:(props.state.userLogin && carData.length == 0)? 'block' : 'none',color:'red',textAlign:'center',margin:'10px 0'}}>购物车空空如也,快去添加吧!</div>

					{/*一个商家就是一个itemLink */}

					{
						carData.map((item,index)=>(
							<div className="itemLink" key={item.shopName}>
								<div className="top_head">
									<h2>
										<label>
											<input type="checkbox" checked={item.data.every(item2=>item2.onGo)} onChange={(e)=>shopOnGoCh(item.shopName,index,e)}/>
										</label>
										<a className="how-shop">
											<span>{item.shopName}</span>
											<img src="//img.yihaodianimg.com/cart/shopping/h5/images/arrow.png"/>
										</a>
									</h2>
								</div>
								{
									item.data.map((item2,index2)=>(
										<div className="content-wrap" key={item2.id}>
											<div className="product-list">
												<div className="product-header">
													<div className="sale-mod">
														<div className="sale-info">
															<span className="tag">满减</span>
															<span className="tag-one">购满￥39999999.00立减</span>
															<strong>￥10.00</strong>
														</div>
														<span className="play" onClick={()=>deleteShop(item2.id,index,index2)}>删除商品&gt;</span>
													</div>

												</div>
												<div className="product-list">
													<div className="item-wrap">
														<div className="item-main">
															<label>
																<input type="checkbox" checked={item2.onGo} onChange={(e)=>shopOneOnGoCh(item.shopName,index,index2,e)}/>
															</label>
															<div className="img-box">
																<img
																	src={item2.goodImg != 'undefined' ? item2.goodImg.replace(/[,].*/,'') : defImg}/>
															</div>
															<div className="right-info">
																<div className="title">
																	<h2>
																		<a onClick={()=>goOneShop(item2.gid)}>{item2.title} </a>
																	</h2>
																</div>
																{/* <div className="change"></div> */}
																<div className="price-box">
																	<div className="price-wrap">
																		<span>￥{item2.discount * item2.price}</span>
																	</div>
																	<div className="buy-num">
																		<span className="sub" onClick={()=>addOrLose(item2.id,index,index2,'lose')}>-</span>
																		<input type="text" className="num-box"  value={item2.goodNum}  onChange={(e)=>shopNumCh(item2.id,index,index2,e)}/>
																		<span className="add" onClick={()=>addOrLose(item2.id,index,index2,'add')}>+</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									))
								}

							</div>
						))
					}

					{/* 猜你喜欢 */}
					<div className="group-like">
						<div className="big_content">
							<div className="mian_content">
								<p>猜你喜欢</p>
								<div className="content">
									<ul>
										<a>
											<div className="head-drink">
												<img
													src="//img13.360buyimg.com/n4/s264x264_jfs/t1/79962/5/15699/172070/5dd29c9dE9d9da5a9/fc4f01580292559c.jpg"/>
											</div>
											<div className="text">
												<p>量天尺 开花仙人柱室内大型绿植多肉植物组合盆栽仙人掌秘鲁苹果 单头无根 裸根不带土</p>
											</div>
											<div className="price">
												<span className="price-one">￥<span className="price-two">50<em>.00</em></span></span>
												<div className="addshop">
													<img
														src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADxUlEQVRoge3YT2gcVRwH8M+2Kj3UP1jTomwpFFyFIuJBxKaLth4KiWD0ogcRhF4ETyIqYg1URMhJD4IUFfEiXmIVkyL+K060aIuipZfRg8VgJanFWsGDYjy8t93pZnYyO9kNYvKF5Tfz3u/95vt77/dnZlnDGlY3atmbhV3XT2Ek3p7HCRzEm1gYOJskLaVWq7VpryvQuxw78QYml9AtwlT8DQSdpEaFU6nhCjyAeYzh2YrPGNE+1b6jaFfP423cF+8fxWWDIlIVZcJiBsewCXcNlk7vKBvXH0XZHBSRquisQt30RpRPxGkhly6YzXuWEI4H8BCuLbB3DsfxgiT9mPJVKIsvlC+jZfUO4EnF5OFKIXQ/0Gw80jlZ9gTgO9yEYcGhsuh2Aj8L5EeFU8vvA83GNjwoOLwOo7WZ76db073U9pkod/WwpgitnZ8u1ErSU5L0eYzHkcey07048HmUwz2s6Sdej/LW7GCVExi2OBw6sQ8/KpcPC1F33xJ66/MGe3HgFGaFfnBjgd42vBJlC3kVLBs6YU2I9264LcpvsoO9vt+UyYMtwm7Nxusa7s7Ra722bIm667G5wO5YlO9nBwfhwFc4ijo+WYLU5qhTx1FJeixXq9m4VLu3HMpODcIBwm6dxI5IcChHZyjO7Yi6Yzk6LdyBq3BSkv6QnejVgRP4HdsVN6A57NF24lMXOzEUx1rk98Q13dBy7lDnRK8O/KPdxJY6hTnsttiJTvK7FZOHe6JctgO0+0GZhjZvsROd5OcLLTQbO4UcmZWkxzunLynLOoNeO/K8ECKteKcs+YCno3wtb7KKA1/iL9yMjfijxJpWTkzG+3uVId9s7Beqzzm8mKdSxYE/8bXQWG7HhyXXzSlzas3GJtyCx7EXf+NhSfpbnnrVD/VuYfRUfOBCpV+zsYAzwqbsxVncL0nf6Uak3w70A79G++PYLkkni5R7+R7I4hr8IuRCPT50+ejz/0JFOIN3sQGLvpJWElUdgJeiHHfxN/CKYjkOfIZnhEr2Hl4VKtPGPvAqjao5kMV+odls6AehDkxJ0kWv4v3IgSyeww14WWhyZRpb39CPE+gfVrAK/WdQ5VWCUPsncGe8P4InhE/D6mg28u0maVe7VUKojm9xdcf4WeEFr6oTxXYzTiw3hCbiQw5ja/wdjmMTFewty26VE2j9JbhVe7fr+AmncV1vvHPstnY7hFSwm6QX7P6vkriKA0eiPCjsfD1eZ+eqoG232ajH3V/S7qpM4lmB6FtCzJ+O18shX2y3oIyuYQ2rHf8CXIsD7dBEd/kAAAAASUVORK5CYII="/>
												</div>
											</div>
										</a>
										<a>
											<div className="head-drink">
												<img
													src="//img13.360buyimg.com/n4/s264x264_jfs/t1/79962/5/15699/172070/5dd29c9dE9d9da5a9/fc4f01580292559c.jpg"/>
											</div>
											<div className="text">
												<p>量天尺 开花仙人柱室内大型绿植多肉植物组合盆栽仙人掌秘鲁苹果 单头无根 裸根不带土</p>
											</div>
											<div className="price">
												<span className="price-one">￥<span className="price-two">50<em>.00</em></span></span>
												<div className="addshop">
													<img
														src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADxUlEQVRoge3YT2gcVRwH8M+2Kj3UP1jTomwpFFyFIuJBxKaLth4KiWD0ogcRhF4ETyIqYg1URMhJD4IUFfEiXmIVkyL+K060aIuipZfRg8VgJanFWsGDYjy8t93pZnYyO9kNYvKF5Tfz3u/95vt77/dnZlnDGlY3atmbhV3XT2Ek3p7HCRzEm1gYOJskLaVWq7VpryvQuxw78QYml9AtwlT8DQSdpEaFU6nhCjyAeYzh2YrPGNE+1b6jaFfP423cF+8fxWWDIlIVZcJiBsewCXcNlk7vKBvXH0XZHBSRquisQt30RpRPxGkhly6YzXuWEI4H8BCuLbB3DsfxgiT9mPJVKIsvlC+jZfUO4EnF5OFKIXQ/0Gw80jlZ9gTgO9yEYcGhsuh2Aj8L5EeFU8vvA83GNjwoOLwOo7WZ76db073U9pkod/WwpgitnZ8u1ErSU5L0eYzHkcey07048HmUwz2s6Sdej/LW7GCVExi2OBw6sQ8/KpcPC1F33xJ66/MGe3HgFGaFfnBjgd42vBJlC3kVLBs6YU2I9264LcpvsoO9vt+UyYMtwm7Nxusa7s7Ra722bIm667G5wO5YlO9nBwfhwFc4ijo+WYLU5qhTx1FJeixXq9m4VLu3HMpODcIBwm6dxI5IcChHZyjO7Yi6Yzk6LdyBq3BSkv6QnejVgRP4HdsVN6A57NF24lMXOzEUx1rk98Q13dBy7lDnRK8O/KPdxJY6hTnsttiJTvK7FZOHe6JctgO0+0GZhjZvsROd5OcLLTQbO4UcmZWkxzunLynLOoNeO/K8ECKteKcs+YCno3wtb7KKA1/iL9yMjfijxJpWTkzG+3uVId9s7Beqzzm8mKdSxYE/8bXQWG7HhyXXzSlzas3GJtyCx7EXf+NhSfpbnnrVD/VuYfRUfOBCpV+zsYAzwqbsxVncL0nf6Uak3w70A79G++PYLkkni5R7+R7I4hr8IuRCPT50+ejz/0JFOIN3sQGLvpJWElUdgJeiHHfxN/CKYjkOfIZnhEr2Hl4VKtPGPvAqjao5kMV+odls6AehDkxJ0kWv4v3IgSyeww14WWhyZRpb39CPE+gfVrAK/WdQ5VWCUPsncGe8P4InhE/D6mg28u0maVe7VUKojm9xdcf4WeEFr6oTxXYzTiw3hCbiQw5ja/wdjmMTFewty26VE2j9JbhVe7fr+AmncV1vvHPstnY7hFSwm6QX7P6vkriKA0eiPCjsfD1eZ+eqoG232ajH3V/S7qpM4lmB6FtCzJ+O18shX2y3oIyuYQ2rHf8CXIsD7dBEd/kAAAAASUVORK5CYII="/>
												</div>
											</div>
										</a>
										<a>
											<div className="head-drink">
												<img
													src="//img13.360buyimg.com/n4/s264x264_jfs/t1/79962/5/15699/172070/5dd29c9dE9d9da5a9/fc4f01580292559c.jpg"/>
											</div>
											<div className="text">
												<p>量天尺 开花仙人柱室内大型绿植多肉植物组合盆栽仙人掌秘鲁苹果 单头无根 裸根不带土</p>
											</div>
											<div className="price">
												<span className="price-one">￥<span className="price-two">50<em>.00</em></span></span>
												<div className="addshop">
													<img
														src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADxUlEQVRoge3YT2gcVRwH8M+2Kj3UP1jTomwpFFyFIuJBxKaLth4KiWD0ogcRhF4ETyIqYg1URMhJD4IUFfEiXmIVkyL+K060aIuipZfRg8VgJanFWsGDYjy8t93pZnYyO9kNYvKF5Tfz3u/95vt77/dnZlnDGlY3atmbhV3XT2Ek3p7HCRzEm1gYOJskLaVWq7VpryvQuxw78QYml9AtwlT8DQSdpEaFU6nhCjyAeYzh2YrPGNE+1b6jaFfP423cF+8fxWWDIlIVZcJiBsewCXcNlk7vKBvXH0XZHBSRquisQt30RpRPxGkhly6YzXuWEI4H8BCuLbB3DsfxgiT9mPJVKIsvlC+jZfUO4EnF5OFKIXQ/0Gw80jlZ9gTgO9yEYcGhsuh2Aj8L5EeFU8vvA83GNjwoOLwOo7WZ76db073U9pkod/WwpgitnZ8u1ErSU5L0eYzHkcey07048HmUwz2s6Sdej/LW7GCVExi2OBw6sQ8/KpcPC1F33xJ66/MGe3HgFGaFfnBjgd42vBJlC3kVLBs6YU2I9264LcpvsoO9vt+UyYMtwm7Nxusa7s7Ra722bIm667G5wO5YlO9nBwfhwFc4ijo+WYLU5qhTx1FJeixXq9m4VLu3HMpODcIBwm6dxI5IcChHZyjO7Yi6Yzk6LdyBq3BSkv6QnejVgRP4HdsVN6A57NF24lMXOzEUx1rk98Q13dBy7lDnRK8O/KPdxJY6hTnsttiJTvK7FZOHe6JctgO0+0GZhjZvsROd5OcLLTQbO4UcmZWkxzunLynLOoNeO/K8ECKteKcs+YCno3wtb7KKA1/iL9yMjfijxJpWTkzG+3uVId9s7Beqzzm8mKdSxYE/8bXQWG7HhyXXzSlzas3GJtyCx7EXf+NhSfpbnnrVD/VuYfRUfOBCpV+zsYAzwqbsxVncL0nf6Uak3w70A79G++PYLkkni5R7+R7I4hr8IuRCPT50+ejz/0JFOIN3sQGLvpJWElUdgJeiHHfxN/CKYjkOfIZnhEr2Hl4VKtPGPvAqjao5kMV+odls6AehDkxJ0kWv4v3IgSyeww14WWhyZRpb39CPE+gfVrAK/WdQ5VWCUPsncGe8P4InhE/D6mg28u0maVe7VUKojm9xdcf4WeEFr6oTxXYzTiw3hCbiQw5ja/wdjmMTFewty26VE2j9JbhVe7fr+AmncV1vvHPstnY7hFSwm6QX7P6vkriKA0eiPCjsfD1eZ+eqoG232ajH3V/S7qpM4lmB6FtCzJ+O18shX2y3oIyuYQ2rHf8CXIsD7dBEd/kAAAAASUVORK5CYII="/>
												</div>
											</div>
										</a>
										<a>
											<div className="head-drink">
												<img
													src="//img13.360buyimg.com/n4/s264x264_jfs/t1/79962/5/15699/172070/5dd29c9dE9d9da5a9/fc4f01580292559c.jpg"/>
											</div>
											<div className="text">
												<p>量天尺 开花仙人柱室内大型绿植多肉植物组合盆栽仙人掌秘鲁苹果 单头无根 裸根不带土</p>
											</div>
											<div className="price">
												<span className="price-one">￥<span className="price-two">50<em>.00</em></span></span>
												<div className="addshop">
													<img
														src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADxUlEQVRoge3YT2gcVRwH8M+2Kj3UP1jTomwpFFyFIuJBxKaLth4KiWD0ogcRhF4ETyIqYg1URMhJD4IUFfEiXmIVkyL+K060aIuipZfRg8VgJanFWsGDYjy8t93pZnYyO9kNYvKF5Tfz3u/95vt77/dnZlnDGlY3atmbhV3XT2Ek3p7HCRzEm1gYOJskLaVWq7VpryvQuxw78QYml9AtwlT8DQSdpEaFU6nhCjyAeYzh2YrPGNE+1b6jaFfP423cF+8fxWWDIlIVZcJiBsewCXcNlk7vKBvXH0XZHBSRquisQt30RpRPxGkhly6YzXuWEI4H8BCuLbB3DsfxgiT9mPJVKIsvlC+jZfUO4EnF5OFKIXQ/0Gw80jlZ9gTgO9yEYcGhsuh2Aj8L5EeFU8vvA83GNjwoOLwOo7WZ76db073U9pkod/WwpgitnZ8u1ErSU5L0eYzHkcey07048HmUwz2s6Sdej/LW7GCVExi2OBw6sQ8/KpcPC1F33xJ66/MGe3HgFGaFfnBjgd42vBJlC3kVLBs6YU2I9264LcpvsoO9vt+UyYMtwm7Nxusa7s7Ra722bIm667G5wO5YlO9nBwfhwFc4ijo+WYLU5qhTx1FJeixXq9m4VLu3HMpODcIBwm6dxI5IcChHZyjO7Yi6Yzk6LdyBq3BSkv6QnejVgRP4HdsVN6A57NF24lMXOzEUx1rk98Q13dBy7lDnRK8O/KPdxJY6hTnsttiJTvK7FZOHe6JctgO0+0GZhjZvsROd5OcLLTQbO4UcmZWkxzunLynLOoNeO/K8ECKteKcs+YCno3wtb7KKA1/iL9yMjfijxJpWTkzG+3uVId9s7Beqzzm8mKdSxYE/8bXQWG7HhyXXzSlzas3GJtyCx7EXf+NhSfpbnnrVD/VuYfRUfOBCpV+zsYAzwqbsxVncL0nf6Uak3w70A79G++PYLkkni5R7+R7I4hr8IuRCPT50+ejz/0JFOIN3sQGLvpJWElUdgJeiHHfxN/CKYjkOfIZnhEr2Hl4VKtPGPvAqjao5kMV+odls6AehDkxJ0kWv4v3IgSyeww14WWhyZRpb39CPE+gfVrAK/WdQ5VWCUPsncGe8P4InhE/D6mg28u0maVe7VUKojm9xdcf4WeEFr6oTxXYzTiw3hCbiQw5ja/wdjmMTFewty26VE2j9JbhVe7fr+AmncV1vvHPstnY7hFSwm6QX7P6vkriKA0eiPCjsfD1eZ+eqoG232ajH3V/S7qpM4lmB6FtCzJ+O18shX2y3oIyuYQ2rHf8CXIsD7dBEd/kAAAAASUVORK5CYII="/>
												</div>
											</div>
										</a>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* 结算框 */}
			<div className="confirm-box" style={{zIndex: 500}}>
				<label>
					<input type="checkbox" checked={carData.every(item=>item.data.every(item2=>item2.onGo))} onChange={(e)=>{allShopOnGo(e)}}/>
				</label>
				<div className="checkall">全选</div>
				<div className="price">
					<div className="price-wrap">
						<span>￥{carData.reduce((lod,ne,index,item)=>{
							let num = carData[index].data.reduce((lod2,ne2,index2,item2)=>{
								if(item2[index2].onGo){
									return  +item2[index2].goodNum * item2[index2].discount * item2[index2].price + lod2
								}else {
									return lod2
								}
							},0)
							return num + lod
						},0).toFixed(3)}</span>
						<span>(不含运费)</span>
					</div>
				</div>
				<a>
					<button onClick={shopCarClose}>
						去结算
						<span className="num">({carData.reduce((lod,ne,index,item)=>{
							let num = carData[index].data.reduce((lod2,ne2,index2,item2)=>{
								if(item2[index2].onGo){
									return  +item2[index2].goodNum + lod2
								}else {
									return lod2
								}
							},0)
							return num + lod
						},0)})</span>
					</button>
				</a>
			</div>
		</div>
	</Spin>
	)
}

// ShopCar = userLogin(ShopCar)
ShopCar = connect(state=>({
	state:state.uesrLogin
}),dispatch=>({
	userLoginIn(obj){
		dispatch({
			type:'userLoginIn',
			...obj
		})
	},
	userLoginOut(obj){
		dispatch({
			type:'userLoginOut',
			...obj
		})
	}
}))(ShopCar)
export default ShopCar