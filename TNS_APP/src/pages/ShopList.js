import React, {useCallback, useEffect, useState} from 'react'
import {Spin} from "antd";
import shopDataAjax from "../ajax/shopData";
import imgSni from "../assets/images/Snipaste.png";
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/ShopList.scss'
function ShopList (props) {
    let [loading,loadingCh] = useState(true)
    let [ShopPage,ShopPageCh] = useState(1) //当前页数
    let [ShopPageAll,ShopPageAllCh] = useState(null) //总条数
    let [ShopSize,ShopSizeCh] = useState(10) //条数
    let [listData,listDataCh] = useState([])
    let [loadingTime,loadingTimeCh] = useState(null) //定时器
    let [seeShop,seeShopCh] = useState(true) //视图切换
    let {getShopData,goOneShop} = useCallback({
        goOneShop(shopId){
            props.history.push({
                pathname:'/shop',
                search:`?GoodsId=${shopId}`
            })
        },
        getShopData(page,size){
            let type = null
            let urltype = props.location.search.match((/[?&]type=[^&]*/i))
            if(urltype)type = decodeURI(urltype[0].replace(/[?&]type=/i,''))
            shopDataAjax.shopData({
                type,
                page,
                size
            }).then(res=>{
                if(res.code == '2000'){
                    ShopPageAllCh(res.total)
                    let superShop = []
                    for(let i = 0; i < res.data.length; i++){
                        if(res.data[i].typeSpecification.length == 0)continue
                        superShop.push({
                            goodstitle:res.data[i].goodstitle,
                            shopName:res.data[i].shopName,
                            describes:res.data[i].describes,
                            imgsrc:res.data[i].typeSpecification[0].specification[0].imgsrc ? res.data[i].typeSpecification[0].specification[0].imgsrc.replace(/[,].*/,'') : imgSni ,
                            price:res.data[i].typeSpecification[0].specification[0].price,
                            discount:res.data[i].typeSpecification[0].specification[0].discount,
                            goods_id:res.data[i].goods_id,
                            id:res.data[i].typeSpecification[0].specification[0].id
                        })
                    }
                    listDataCh(superShop)
                    loadingCh(false)
                }

            })
            loadingTimeCh(setTimeout(()=>{
                if(loading){
                    loadingCh(false)
                }
            },6000))
        },
    })
    useEffect(()=>{
        getShopData()
        return function () {
            clearTimeout(loadingTime)
        }
    },[])


    return (
        <Spin  spinning = {loading}>
            <div className="shoplistBox">
            <header>
                <a className="left iconfont icon-zuo" onClick={()=>props.history.go(-1)}></a>
                <div className="searchBox">
                    <div className="search_box">
                        <form className="searchshop">
                            <input type="text" placeholder="搜索你想要的商品"/>
                            <span className="iconfont icon-fangdajing"></span>
                        </form>
                    </div>
                </div>
                <div className="rightBox">
                    <a>
                        <span className="iconfont icon-gouwuche" onClick={()=>props.history.push({pathname:'/shopcar'})}></span>
                    </a>
                    <a>
                        <span className="iconfont icon-fangzi" onClick={()=>props.history.push({pathname:'/'})}></span>
                    </a>
                </div>
            </header>
            <div className="container">
                <div className="change-two">
                    <ul>
                        <li style={{backgroundColor:seeShop ? 'red' : '#fff',color:seeShop ? '#fff' : 'red'}} onClick={()=>seeShopCh(true)}>
                            <i className="iconfont icon-liebiao"></i>
                            列表视图
                        </li>
                        <li className="white" style={{backgroundColor:seeShop ? '#fff' : 'red',color:seeShop ? 'red' : '#fff'}} onClick={()=>seeShopCh(false)}>
                            <i className="iconfont icon-leimupinleifenleileibie"></i>
                            图片视图
                        </li>
                    </ul>
                </div>
                <div className="big-change">
                    <div className="big-change-main">
                        <div className="item-box">
                            <a>
                                <span>分类</span>
                                <i></i>
                            </a>
                            <a>
                                <span>品牌</span>
                                <i></i>
                            </a>
                            <a>
                                <span>综合排序</span>
                                <i></i>
                            </a>
                            <span className="item-JD">
                                <input type="checkbox"/>
                                <label>京东配送</label>
                            </span>
                        </div>
                        <ul>
                            <li className="iconfont icon-shaixuan"></li>
                        </ul>
                    </div>
                </div>
                <div className="shoplist-container" style={{display:seeShop ? '' : 'none'}}>
                    <ul>
                        {
                            listData.map((item,index)=>(
                                <li key={item.goods_id + index} onClick={()=>goOneShop(item.goods_id)}>
                                    <div className="item-box" style={{overflow:'hidden'}}>
                                        <div className="pic_box">
                                            {/*<a>*/}
                                                <img src={item.imgsrc} style={{
                                                    display: 'block',
                                                    width: '100%',
                                                    height: '100%'}}/>
                                            {/*</a>*/}
                                        </div>
                                        <div className="middle">
                                            <a>
                                                <div className="title-box">
                                                    {item.goodstitle}
                                                </div>
                                                <div className="active-box" style={{color:'#666',height:'18px'}}>
                                                    {item.describes}
                                                    <div className="coupon-icon">
                                                        {/* 优惠卷 */}
                                                    </div>
                                                </div>
                                                <div className="comment_box">
                                            <span>
                                                <i className="iconfont icon-pinglun"></i>
                                                297万+
                                            </span>
                                                    <span>
                                                <i className="iconfont icon-zan"></i>
                                                98%
                                            </span>
                                                </div>
                                            </a>
                                            <div className="search-shop">
                                                <span>自营</span>
                                                <a>
                                                    <span>{item.shopName}&gt;</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="price">
                                    <span className="newprice">
                                        {/*<small></small>*/}
                                        <i>￥{(item.price * item.discount).toFixed(3)}</i>
                                    </span>
                                            <span className="addshop">
                                        <i className="iconfont icon-shangpinjiarugouwuche"></i>
                                    </span>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }


                        {/* <li>
                            <div className="item-box">
                                <div className="pic_box">
                                    <a>
                                        <img src="https://img13.360buyimg.com/n7/s230x230_jfs/t1/116795/5/11965/373067/5f091877Ec6db48fe/7d4b9e5ed60f0051.jpg"/>
                                    </a>
                                </div>
                                <div className="middle">
                                    <a>
                                        <div className="title-box">
                                            三只松鼠每日坚果大礼包 孕妇零食节日礼物送女友混合干果礼盒榛子腰果巴旦木葡萄干核桃仁开心果 750g/30袋
                                        </div>
                                        <div className="active-box">
                                            <div className="coupon-icon">
                                                优惠卷
                                            </div>
                                        </div>
                                        <div className="comment_box">
                                            <span>
                                                <i className="iconfont icon-pinglun"></i>
                                                297万+
                                            </span>
                                            <span>
                                                <i className="iconfont icon-zan"></i>
                                                98%
                                            </span>
                                        </div>
                                    </a>
                                    <div className="search-shop">
                                        <span>自营</span>
                                        <a>
                                            <span>三只松鼠自营旗舰店&gt;</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="price">
                                    <span className="newprice">
                                        <small>￥</small>
                                        <i>149</i>
                                    </span>
                                    <span className="addshop">
                                        <i className="iconfont icon-shangpinjiarugouwuche"></i>
                                    </span>
                                </div>
                            </div>
                        </li>*/}

                    </ul>
                </div>
                <div className="shoplist-container2" style={{display:seeShop ? 'none' : ''}}>
                    <ul>
                        {
                            listData.map((item,index)=>(
                                <li key={index + item.goods_id} onClick={()=>goOneShop(item.goods_id)}>
                                    <div className="item">
                                        <div className="pic-box">
                                            {/*<a>*/}
                                                <img src={item.imgsrc} style={{width:'100%',maxHeight:'160px'}}/>
                                            {/*</a>*/}
                                        </div>
                                        <div className="title">
                                            <div className="title-box">
                                                {item.goodstitle}
                                            </div>
                                        </div>
                                        <div className="price">
                                        <span className="newprice">
                                            <small>￥</small>
                                            <i>{(item.price * item.discount).toFixed(3)}</i>
                                        </span>
                                            <span className="icon iconfont icon-shangpinjiarugouwuche">

                                        </span>
                                        </div>
                                        <div className="comment-shop">
                                        <span className="comment-one">
                                            <i className="iconfont icon-pinglun"></i>
                                            298万+
                                        </span>
                                            <span className="comment-two">
                                            <i className="iconfont icon-shangpinjiarugouwuche"></i>
                                            98%
                                       </span>
                                        </div>
                                        <div className="search-shop">
                                            <span className="small">自营</span>
                                            <a>
                                                <span className="store">{item.shopName}&gt;</span>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }

                    </ul>
                </div>
            </div>
        </div>
        </Spin>
    )
}

export default ShopList