import React, {Component, useCallback, useEffect, useState} from 'react'
import shopData from "../ajax/shopData";
import {message, Carousel, Drawer, Spin} from 'antd';
import add_site from '../public/ressJSON.json'
import store from "../redux/store";
import utils from "../public/utils";
import userAjax from '../ajax/user'
import imgDefault from '../assets/images/Snipaste.png'
import getShopCar from "../public/getShopCar";
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/Shop.scss'
import Add_css from "../assets/css/Address_sel.module.scss";

 function Shop (props){
     let [loading,loadingCh] = useState(true)
     let [analogyShop,analogyShopCh] = useState([]) //类似商品
     let [shopLength,shopLengthCh] = useState(0)
     let [ulId,ulIdChange] = useState('set_ul1')
     let [liOver,liOverChange] = useState({
         'set_ul1': 0,
         'set_ul2': 0,
         'set_ul3': 0,
     })
     let [moren,morenCh] = useState(false) //原来高度
     let [topPx,topPxCh] = useState(0)
     let [fangdou,fangdouCh] = useState(false) //防抖
     let [times,timesCh] = useState(null) //定时器
     let [address,addressCh] = useState(false) //选择商品弹出层开关
     let [addsite,addsiteCh] = useState(false) //地址弹出层开关
     let [shop,shopCh] = useState({ //总数据
         goods_id : '',
         goodstitle : '',
         type : '',
         shopName : '',
         describe:'',
         typeSpecification : [],
         circulationImg : []
     })
     let [shopIndex,shopIndexCh] = useState({ //当前选中数据下标
         typeSpecification:0,
         specification:0
     })
     useEffect(()=>{
         if(addsite == false)return
         // if(!document.querySelector('#set_div'))return
         setTimeout(()=>{
             document.querySelector('#set_div').style.opacity = addsite ? 1 : 0
         },300)
     },[addsite])
     useEffect(()=>{
         getShopCar(function (data) {
             shopLengthCh(data.length)
         })
         let goods_id = props.location.search.match((/[?&]GoodsId=[^&]*/i))
         if(!goods_id){
             message.warning('请选择商品')
             props.history.push({pathname:'/'})
             return
         }
         //当前选中商品下标
         let indexA = props.location.search.match((/[?&]shopIndexA=[^&]*/i)) ? props.location.search.match((/[?&]shopIndexA=[^&]*/i))[0].replace(/[?&]shopIndexA=/i,'') : 0
         let indexB = props.location.search.match((/[?&]shopIndexB=[^&]*/i)) ? props.location.search.match((/[?&]shopIndexB=[^&]*/i))[0].replace(/[?&]shopIndexB=/i,'') : 0
         goods_id = decodeURI(goods_id[0].replace(/[?&]GoodsId=/i,''))
         shopData.shopData({goods_id}).then(res=>{
             if(res.code == '2000'){
                 let data = {}
                 data.goods_id = res.data[0].goods_id
                 data.goodstitle = res.data[0].goodstitle
                 data.describes = res.data[0].describes
                 data.type = res.data[0].type
                 data.shopName = res.data[0].shopName
                 data.typeSpecification = res.data[0].typeSpecification
                 data.circulationImg = []
                 res.data[0].typeSpecification.map(item=>item.specification.map(item2=>item2.imgsrc ? item2.imgsrc.replace(/[,].*/,'') : null)).forEach(item=>{
                     item.forEach(item2=>{
                         if(item2)data.circulationImg.push(item2)
                     })
                 })
                 if(indexA > data.typeSpecification.length - 1)indexA = data.typeSpecification.length - 1
                 if(indexB > data.typeSpecification[indexA].specification.length - 1)indexB = data.typeSpecification[indexA].specification.length - 1
                 shopIndexCh({
                     typeSpecification:indexA,
                     specification:indexB
                 })
                 shopCh(data)
                 shopData.shopData({type:data.type}).then(res2=>{
                     if(res2.code == '2000'){
                         for(let i = 0; i < res2.data.length; i++){
                             if(res2.data[i].goods_id == data.goods_id || res2.data[i].typeSpecification.length == 0){
                                 res2.data.splice(i,1)
                                 i--
                             }
                         }
                         analogyShopCh(res2.data)
                     }
                 })
                 loadingCh(false)
             }
         })
         timesCh(setTimeout(()=>{
             if(loading)loadingCh(false)
         },6000))
         return function () {
            clearTimeout(times)
         }
     },[])
     let userGood = useCallback(()=>{ //已登录执行
        shopData.setShopCar({
            discount:shop.typeSpecification[shopIndex.typeSpecification || 0].specification[shopIndex.specification || 0].discount,
            price:shop.typeSpecification[shopIndex.typeSpecification || 0].specification[shopIndex.specification || 0].price,
            id:shop.typeSpecification[shopIndex.typeSpecification || 0].specification[shopIndex.specification || 0].id,
            goodName:shop.typeSpecification[shopIndex.typeSpecification || 0].specification[shopIndex.specification || 0].alias,
            goodImg:shop.typeSpecification[shopIndex.typeSpecification || 0].specification[shopIndex.specification || 0].imgsrc
        }).then(res=>{
            if(res.code == '2000'){
                shopLengthCh(res.total)
                getShopCar() //更新购物车内容
                message.warning('商品添加成功')
                loadingCh(false)
            }

        })
     })
     let {typeSpecificationCh,specificationCh,setChange,setIn,setOut,addShopCar,goOneShop} = useCallback({
         goOneShop(shopId){
             props.history.push({
                 pathname:'/shop',
                 search:`?GoodsId=${shopId}`
             })
             window.history.go(0)
         },
         addShopCar(){ //加入购物车
             loadingCh(true)
             if(!store.getState().uesrLogin.userLogin){
                if(utils.getCookie('token')){
                    timesCh(setTimeout(()=>{
                        if(loading)loadingCh(false)
                    },6000))
                    userAjax.tokenTrue(utils.getCookie('token')).then(res => {
                        if (res.code == '2000') {
                            store.dispatch({
                                type: 'userLoginIn',
                                userLogin: true,
                            })
                            //登录成功执行
                            userGood()
                        } else {
                            store.dispatch({
                                type: 'userLoginOut'
                            })
                            message.warning('请先登录');
                            props.history.push({
                                pathname: '/login'
                            })
                        }
                    })
                }else {
                    message.warning('请先登录');
                    props.history.push({
                        pathname: '/login'
                    })
                }
             }else {
                 userGood()
             }
         },
         typeSpecificationCh(index){
             shopIndexCh({
                 ...shopIndex,
                 typeSpecification:index
             })
             props.history.replace({
                 pathname:'/shop',
                 search:`?GoodsId=${shop.goods_id}&shopIndexA=${index}&shopIndexB=${shopIndex.specification}`
             })
         },
         specificationCh(index){
             shopIndexCh({
                 ...shopIndex,
                 specification:index
             })
             props.history.replace({
                 pathname:'/shop',
                 search:`?GoodsId=${shop.goods_id}&shopIndexA=${shopIndex.typeSpecification}&shopIndexB=${index}`,
             })
         },
         setIn(e){
             if(!moren){
                 morenCh(getComputedStyle(document.querySelector(`#set_ul1`),false).top.replace(/px/,''))
             }
             if (e.targetTouches.length == 1) {
                 let left = e.changedTouches[0].pageX
                 let ulId
                 if(left < window.innerWidth / 3){
                     ulId = 'set_ul1'
                     ulIdChange('set_ul1')
                 }else if(left > window.innerWidth / 3 * 2){
                     ulId = 'set_ul3'
                     ulIdChange('set_ul3')
                 }else {
                     ulId = 'set_ul2'
                     ulIdChange('set_ul2')
                 }
                 topPxCh (e.changedTouches[0].screenY)
                 e.preventDefault();
             }
         },
         setChange(e){
             fangdouCh(true)
             if (e.targetTouches.length == 1) {
                 let ul = document.querySelector(`#${ulId}`)
                 ul.style.transition = ''

                 let li = ul.querySelectorAll('li')
                 let Lcss =  getComputedStyle(ul,false)
                 let Ltop =  Lcss.top.replace(/px/,'')
                 Ltop = +Ltop - (topPx - e.changedTouches[0].screenY)/1.5
                 if(Ltop > moren)Ltop = moren
                 if(Ltop < moren - Lcss.height.replace(/px/,'')/li.length * (li.length - 1))Ltop = moren - Lcss.height.replace(/px/,'')/li.length * (li.length - 1)
                 ul.style.top = Ltop + 'px'
                 topPxCh (e.changedTouches[0].screenY)
                 ul.endTopCh = Ltop
                 e.preventDefault();
             }
         },
         setOut(e){
             // if(!liLength.ulId)return
             let ul = document.querySelector(`#${ulId}`)
             if(!ul.endTopCh)return
             ul.style.transition = 'top 300ms ease'

             let li = ul.querySelectorAll('li')
             clearTimeout(fangdou)
             fangdouCh(setTimeout(()=>{
                 let oneHeigth = getComputedStyle(li[0],false).height.replace(/px/,'')
                 let number = (moren - ul.endTopCh) % oneHeigth
                 if(number >= oneHeigth / 2){
                     number = oneHeigth
                 }else {
                     number = 0
                 }
                 let newTop = ul.endTopCh + (moren - ul.endTopCh) % oneHeigth - number
                 let inliLength = parseInt((moren - newTop) / oneHeigth)
                 if(oneHeigth == moren)inliLength = 0
                 if(newTop == oneHeigth * li.length)inliLength = li.length - 1
                 ul.style.top = (-oneHeigth * inliLength) + moren * 1  + 'px'
                 if(ulId == 'set_ul1'){
                     liOverChange({
                         ...liOver,
                         'set_ul1':inliLength,
                         'set_ul2':0,
                         'set_ul3':0
                     })
                     document.querySelector(`#set_ul2`).style.top = moren + 'px'
                     document.querySelector(`#set_ul3`).style.top = moren + 'px'
                 }else if(ulId == 'set_ul2'){
                     liOverChange({
                         ...liOver,
                         'set_ul2':inliLength,
                         'set_ul3':0
                     })
                     document.querySelector(`#set_ul3`).style.top = moren + 'px'
                 }else {
                     liOverChange({
                         ...liOver,
                         'set_ul3':inliLength
                     })
                 }
             },150))
         }
     })
        return(
            <Spin  spinning = {loading}>
                <div className="shopBox">

                {/* 主体 */}
                <div className="product-main">
                    <div className="banner" style={{maxHeight:'6rem'}}>
                        <Carousel autoplay>
                            {
                                shop.circulationImg.map((item,index)=>(
                                    <div key={index}>
                                        <div style={{backgroundColor:'#fff'}}>
                                            <img src={item} style={{margin:'auto',maxHeight:'6rem',width:'100%'}}/>
                                        </div>
                                    </div>
                                ))
                            }
                        </Carousel>
                        {/* <div className="banner-wrap">
                            <div className="banner-wrap-main">
                                <ul>
                                    {
                                        shop.circulationImg.map((item,index)=>(
                                            <li key={item + index}>
                                                <img src={item} />
                                            </li>
                                        ))
                                    }

                                    <li>
                                        <img src="//img12.360buyimg.com/n1/jfs/t1/124065/24/5517/317631/5ef2f8aaE1ec646bf/16c021166d076a14.jpg"/>
                                    </li>
                                    <li>
                                        <img src="//img12.360buyimg.com/n1/jfs/t1/124065/24/5517/317631/5ef2f8aaE1ec646bf/16c021166d076a14.jpg"/>
                                    </li>
                                    <li>
                                        <img src="//img12.360buyimg.com/n1/jfs/t1/124065/24/5517/317631/5ef2f8aaE1ec646bf/16c021166d076a14.jpg"/>
                                    </li>
                                    <li>
                                        <img src="//img12.360buyimg.com/n1/jfs/t1/124065/24/5517/317631/5ef2f8aaE1ec646bf/16c021166d076a14.jpg"/>
                                    </li>
                                    <li>
                                        <img src="//img12.360buyimg.com/n1/jfs/t1/124065/24/5517/317631/5ef2f8aaE1ec646bf/16c021166d076a14.jpg"/>
                                    </li>
                                </ul>
                            </div>
                            <div className="banner-wrap-num">
                                <span className="cur">1</span>
                                <span>/</span>
                                <span className="sum">{shop.circulationImg.length}</span>
                            </div>
                        </div>*/}
                    </div>
                    <div className="inner-wrap">
                        <div className="product-box">
                            <div className="product-box-title">
                                <div className="product-box-title-box">
                                    <h2>
                                        <span>自营</span>
                                        {shop.goodstitle}
                                    </h2>
                                </div>
                            </div>
                            <div className="product-box-price">
                                <div className="pd-price">
                                    <span>￥</span>
                                    <strong>{
                                        shop.typeSpecification[shopIndex.typeSpecification || 0] ? (shop.typeSpecification[shopIndex.typeSpecification || 0].specification[shopIndex.specification || 0].discount * shop.typeSpecification[shopIndex.typeSpecification || 0].specification[shopIndex.specification || 0].price).toFixed(3) : '加载中'
                                    }</strong>
                                </div>
                                <span className="circle-box">降价通知</span>
                            </div>
                            <a>
                                <span className="leftbox">
                                    298万+ 评论
                                    <span className="num">
                                        [
                                        <em>98%</em>
                                        好评]
                                    </span>
                                </span>
                                <span className="rightbox iconfont icon-you"></span>
                            </a>
                        </div>
                        <div className="product-promotions">
                            <div className="item">
                                <div className="item-box">
                                    <span className="item-box-one">促</span>
                                    <span className="item-box-two">满140元减60元</span>
                                    <span className="item-box-three iconfont icon-xia1"></span>
                                </div>
                            </div>
                        </div>
                        <div className="product-arguments">
                            <a onClick={()=>addressCh(true)}>
                                <span className="title">
                                    已选择
                                </span>
                                <span className="text">
                                    {shop.typeSpecification[shopIndex.typeSpecification || 0] ? shop.typeSpecification[shopIndex.typeSpecification || 0].type_min + '/' + shop.typeSpecification[shopIndex.typeSpecification || 0].specification[shopIndex.specification || 0].alias : '加载中'}
                                </span>
                                <span className="right iconfont icon-you"></span>
                            </a>
                        </div>
                        <div className="pd-box">
                            <div className="pd-region">
                                <div className="address" onClick={()=>addsiteCh(true)}>
                                    送货至
                                    <span className="name">
                                        {add_site[liOver.set_ul1].name + ' / ' + add_site[liOver.set_ul1].c_list[liOver.set_ul2].name + ' / ' + add_site[liOver.set_ul1].c_list[liOver.set_ul2].y_list[liOver.set_ul3].name}
                                    </span>
                                    <span className="iconfont icon-weizhi icon1"></span>
                                    <span className="iconfont icon-you icon2"></span>
                                </div>
                                <div className="desc">
                                    <p>有货， 23:10前下单，预计 明天(07月13日) 送达</p>
                                    <p>由  2号店  发货, 并提供售后服务. </p>
                                </div>
                            </div>
                            <div className="prodTags">
                                <a className="item">
                                    <span></span>
                                    满99元免基础运费(20kg内)
                                </a>
                                <a className="item">
                                    <span></span>
                                    准时达
                                </a>
                            </div>
                            <div className="pd-services">
                                <label>服务保障：</label>
                                <span className="iconfont icon-gou1 icon"></span>
                                <span className="text">支持7天无理由退货(拆封后不支持)</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="iconfont icon-gou1 icon"></span>
                                <span className="text">正品保障</span>
                            </div>
                        </div>
                        <div className="pd-store">
                            <div className="info-box">
                                <div className="name">
                                    <img src={imgDefault} />
                                </div>
                                <div className="info">
                                    <div className="title-box">
                                        <h2>{shop.shopName}</h2>
                                        <span>自营</span>
                                    </div>
                                    sdasdas
                                    <div className="collect">{shop.shopName}欢迎您</div>
                                </div>
                            </div>
                            <div className="btn-box">
                                <a onClick={()=>{
                                    props.history.push({
                                        pathname:'/shopstore',
                                        search:`?shopName=${shop.shopName}`,
                                    })
                                }}>进入店铺</a>
                            </div>
                        </div>
                        <div className="pd-like">
                            <h2>相似商品</h2>
                            <div className="list-box">
                                <div className="list">
                                    {
                                        analogyShop.map((item,index)=>(
                                            <div className="item" key={index} onClick={()=>goOneShop(item.goods_id)}>
                                                <a>
                                                    <div className="pic">
                                                        <img src={item.typeSpecification[0].specification[0].imgsrc ? item.typeSpecification[0].specification[0].imgsrc.replace(/[,].*/,'') : imgDefault}/>
                                                    </div>
                                                    <h3>{item.goodstitle}</h3>
                                                    <div className="price-box">
                                                <span className="price">
                                                    ￥
                                                    <span>{(item.typeSpecification[0].specification[0].discount * item.typeSpecification[0].specification[0].price).toFixed(3)}</span>
                                                </span>
                                                    </div>
                                                </a>
                                            </div>
                                        ))
                                    }


                                </div>
                            </div>
                        </div>
                        <div className="pd-tab">
                            <div className="tab">
                                <a className="cur">图文详情</a>
                                <a>规格参数</a>
                                <a>评论298万+</a>
                                <a>售后服务</a>
                            </div>
                        </div>
                        <div className="pd-detail">
                            {

                                shop.typeSpecification[shopIndex.typeSpecification || 0] &&
                                shop.typeSpecification[shopIndex.typeSpecification || 0].specification[shopIndex.specification || 0].imgsrc ?
                                shop.typeSpecification[shopIndex.typeSpecification || 0].specification[shopIndex.specification || 0].imgsrc.split(',').map(item=>(
                                        <div className="items" key={item}>
                                            <img src={item} />
                                        </div>
                                     ))
                                    : [imgDefault].map(item=>(
                                        <div className="items" key={item}>
                                            <img src={item} />
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </div>
                <div className="product-buy">
                    <a className="addshopcar" onClick={addShopCar}>加入购物车</a>
                    <a className="iconfont icon-shangpinjiarugouwuche icon" onClick={()=>props.history.push({
                        pathname:'/shopcar'
                    })}></a>
                    <span style={{
                        position: 'absolute',
                        width: '15px',
                        fontSize: '12px',
                        display: 'inline-block',
                        height: '15px',
                        textAlign: 'center',
                        lineHeight: '15px',
                        borderRadius: '10px',
                        backgroundColor: 'red',
                        color: 'white',
                        top:'5px',
                        right:'10px'
                    }}>
                        {shopLength}
                    </span>
                </div>
                {/*弹出层*/}
                <Drawer
                    height={'70%'}
                    onClose={()=>addressCh(false)}
                    visible={address}
                    placement={'bottom'}
                    closable={true}
                    key={'bottom'}
                >
                    <div>
                        <p className={'p1'}>请选择类型</p>
                        {
                            shop.typeSpecification.map((item,index)=>(
                                <span key={index} style={{
                                    display: 'inline-block',
                                    padding:'5px',
                                    border : '1px solid',
                                    borderColor:index == shopIndex.typeSpecification ? 'red' : '#7e7e7e',
                                    borderRadius: '3px',
                                    margin:'8px',
                                }} onClick={()=>typeSpecificationCh(index)}>
                                    {item.type_min}
                                </span>
                            ))
                        }
                        <p className={'p2'}>请选择商品</p>
                        {
                            (shop.typeSpecification[shopIndex.typeSpecification || 0] || {specification:[]}).specification.map((item,index)=>(
                                <span key={index} style={{
                                    display: 'inline-block',
                                    padding:'5px',
                                    border : '1px solid',
                                    borderColor:index == shopIndex.specification ? 'red' : '#7e7e7e',
                                    borderRadius: '3px',
                                    margin:'8px',
                                }} onClick={()=>specificationCh(index)}>
                                    {item.alias}
                                </span>
                            ))
                        }

                        <p style={{
                            margin:'20px auto ',
                            width:'80%',
                            borderRadius:'5px',
                            backgroundColor:'red',
                            color:'#fff',
                            textAlign: 'center',
                            padding: '5px'
                        }} onClick={()=>addressCh(false)}>确定</p>
                    </div>
                </Drawer>

                <Drawer
                    height={'45%'}
                    onClose={()=>addsiteCh(false)}
                    visible={addsite}
                    placement={'bottom'}
                    closable={true}
                    key={'bottom2'}
                >
                    <div onTouchStart={setIn}
                         onTouchMove={setChange}
                         onTouchEnd={setOut}
                         id={'set_div'}
                         className={Add_css.set_div}
                        // style={{opacity:address ? '1' : '0'}}
                    >
                        <div className={Add_css.div1}></div>
                        <div className={Add_css.div2}></div>
                        <p></p>
                        <ul id={'set_ul1'}  className={Add_css.ul1}>
                            {
                                add_site.map((site,index)=><li key={site.name} style={{color:liOver.set_ul1 == index ? 'red' : ''}}>{site.name}</li>)
                            }
                        </ul>
                        <ul id={'set_ul2'} className={Add_css.ul2}>
                            {
                                add_site[liOver.set_ul1].c_list.map((site,index)=><li key={site.name} style={{color:liOver.set_ul2 == index ? 'red' : ''}}>{site.name}</li>)
                            }
                        </ul>
                        <ul id={'set_ul3'} className={Add_css.ul3}>
                            {
                                add_site[liOver.set_ul1].c_list[liOver.set_ul2].y_list.map((site,index)=><li key={site.name} style={{color:liOver.set_ul3 == index ? 'red' : ''}}>{site.name}</li>)
                            }
                        </ul>
                    </div>
                </Drawer>

                </div>
            </Spin>
        )
}

export default Shop