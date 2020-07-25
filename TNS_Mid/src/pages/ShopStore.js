import React from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/ShopStore.scss'

class ShopStore extends React.Component {
    render () {
        return (
            <div className="shopstoreBox">
                <header>
                    <div className="header-content">
                        <div className="searchBox">
                            <i className="icon iconfont icon-fangdajing"></i>
                            <input type="text" placeholder="搜索店铺内商品" className="inp1"/>
                        </div>
                        <a className="header-menu"></a>
                    </div>
                </header>
                <div className="contain">
                    <div className="banner">
                        <img src="//img12.360buyimg.com/jshopm/jfs/t4954/157/801982695/52649/129d9344/58e89b20N58408f68.jpg"/>
                    </div>
                    <div className="banner-mask"></div>
                    <div className="banner-content">
                        <div className="banner-shop">
                            <span>
                                <img src="//img12.360buyimg.com/jshopm/jfs/t4978/124/823456181/5950/a485b788/58e89b7eN28afc6a1.jpg"/>
                            </span>
                            <div className="shop-info">
                                <span className="name">中国特产·乌兰察布馆</span>
                                <span className="people">6.5万人关注</span>
                            </div>
                        </div>
                        <div className="banner-btn">
                            <i className="iconfont icon-xinheart118-copy"></i>
                            <span>关注</span>
                        </div>
                    </div>
                    <div className="store-grids">
                        <ul>
                            <li>
                                <span className="num">290</span>
                                <span className="title">全部商品</span>
                            </li>
                            <li>
                                <span className="num">32</span>
                                <span className="title">上新</span>
                            </li>
                            <li>
                                <span className="num">0</span>
                                <span className="title">促销</span>
                            </li>
                        </ul>
                    </div>
                    <div className="coupon-section">
                        <div className="couponBox">
                            <ul>
                                <li>
                                    <div className="coupon-info">
                                        <div className="coupon-info-inner">
                                            <span className="price">
                                                <em className="yuan">￥</em>
                                                <em className="money">300</em>
                                            </span>
                                            <span className="totalprice">满588元可用</span>
                                        </div>
                                    </div>
                                    <div className="coupon-other">
                                        <div className="coupon-other-inner">
                                            <span className="title">优惠券</span>
                                            <span className="btn">点击领取</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="coupon-info">
                                        <div className="coupon-info-inner">
                                            <span className="price">
                                                <em className="yuan">￥</em>
                                                <em className="money">300</em>
                                            </span>
                                            <span className="totalprice">满588元可用</span>
                                        </div>
                                    </div>
                                    <div className="coupon-other">
                                        <div className="coupon-other-inner">
                                            <span className="title">优惠券</span>
                                            <span className="btn">点击领取</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="coupon-info">
                                        <div className="coupon-info-inner">
                                            <span className="price">
                                                <em className="yuan">￥</em>
                                                <em className="money">300</em>
                                            </span>
                                            <span className="totalprice">满588元可用</span>
                                        </div>
                                    </div>
                                    <div className="coupon-other">
                                        <div className="coupon-other-inner">
                                            <span className="title">优惠券</span>
                                            <span className="btn">点击领取</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="coupon-info">
                                        <div className="coupon-info-inner">
                                            <span className="price">
                                                <em className="yuan">￥</em>
                                                <em className="money">300</em>
                                            </span>
                                            <span className="totalprice">满588元可用</span>
                                        </div>
                                    </div>
                                    <div className="coupon-other">
                                        <div className="coupon-other-inner">
                                            <span className="title">优惠券</span>
                                            <span className="btn">点击领取</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="coupon-info">
                                        <div className="coupon-info-inner">
                                            <span className="price">
                                                <em className="yuan">￥</em>
                                                <em className="money">300</em>
                                            </span>
                                            <span className="totalprice">满588元可用</span>
                                        </div>
                                    </div>
                                    <div className="coupon-other">
                                        <div className="coupon-other-inner">
                                            <span className="title">优惠券</span>
                                            <span className="btn">点击领取</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="img-floor">
                        <div className="hotfloor">
                            <img src="//img12.360buyimg.com/zx/jfs/t22138/47/1704037269/150961/1285f7ea/5b32e2c8N00e9c27a.jpg!q80"/>
                        </div>
                        <div className="hotfloor">
                            <img src="//img20.360buyimg.com/zx/jfs/t23449/128/488746697/262797/c963c5/5b32e487N76691184.jpg!q80"/>
                        </div>
                        <div className="hotfloor">
                            <img src="//img11.360buyimg.com/zx/jfs/t22624/241/512789685/135181/dec412b9/5b32e548Nbfdb4a97.jpg!q80"/>
                        </div>
                        <div className="shopfloor">
                            <ul className="shoplist">
                                <li>
                                    <span className="pro-img">
                                        <img src="https://m.360buyimg.com/n1/s220x220_jfs/t1/135592/34/4255/189284/5f0a5b42E8436e839/d883c1772224a1dc.jpg!q70"/>
                                    </span>
                                    <span className="pro-title">内蒙古风干手撕牛肉干500-1000g 真空包装 肉干肉铺 散装特产零食 原味500g</span>
                                    <span className="pro-price">￥67.9</span>
                                </li>
                                <li>
                                    <span className="pro-img">
                                        <img src="https://m.360buyimg.com/n1/s220x220_jfs/t1/135592/34/4255/189284/5f0a5b42E8436e839/d883c1772224a1dc.jpg!q70"/>
                                    </span>
                                    <span className="pro-title">内蒙古风干手撕牛肉干500-1000g 真空包装 肉干肉铺 散装特产零食 原味500g</span>
                                    <span className="pro-price">￥67.9</span>
                                </li>
                                <li>
                                    <span className="pro-img">
                                        <img src="https://m.360buyimg.com/n1/s220x220_jfs/t1/135592/34/4255/189284/5f0a5b42E8436e839/d883c1772224a1dc.jpg!q70"/>
                                    </span>
                                    <span className="pro-title">内蒙古风干手撕牛肉干500-1000g 真空包装 肉干肉铺 散装特产零食 原味500g</span>
                                    <span className="pro-price">￥67.9</span>
                                </li>
                                <li>
                                    <span className="pro-img">
                                        <img src="https://m.360buyimg.com/n1/s220x220_jfs/t1/135592/34/4255/189284/5f0a5b42E8436e839/d883c1772224a1dc.jpg!q70"/>
                                    </span>
                                    <span className="pro-title">内蒙古风干手撕牛肉干500-1000g 真空包装 肉干肉铺 散装特产零食 原味500g</span>
                                    <span className="pro-price">￥67.9</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <ul>
                        <li>
                            <div>店铺会员</div>
                        </li>
                        <li>
                            <div>店铺详情</div>
                        </li>
                        <li>
                            <div className="icon iconfont icon-leimu"></div>
                            <div>热销分类</div>
                        </li>
                        <li>
                        <div className="icon iconfont icon-lingdang"></div>
                            <div>联系卖家</div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ShopStore