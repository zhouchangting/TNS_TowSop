import React,{Component} from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/Home.scss'


class Home extends Component{
    render () {
        return(
            <div className="home">
                {/* 头部搜索栏 */}
                <header>
                    <div className="searchBox">
                        <div className="search_box">
                            <form className="searchForm">
                                <input type="search" placeholder="搜索你想要的商品"/>
                                <span className="iconfont icon-fangdajing"></span>
                            </form>
                        </div>
                    </div>
                    <div className="rightBox">
                        <a>
                            <span className="iconfont icon-yonghu1"></span>
                        </a>
                        <a>
                            <span className="iconfont icon-gouwuche"></span>
                        </a>
                    </div>
                </header>
                <div className="bigBox">
                    {/* 头部菜单 */}
                    <div className="header-menu">
                        <div className="sales-header">
                            <ul className="headerMenu-ul">
                                <li>
                                    <div className="pic">
                                        <img src="//img14.360buyimg.com/img/jfs/t1/86620/19/13356/18230/5e5726fbE87ffa70e/063adf3a006d6eb2.png" />
                                    </div>
                                    <span>超市馆</span>
                                </li>
                                <li>
                                    <div className="pic">
                                        <img src="//img14.360buyimg.com/img/jfs/t1/100232/9/13384/19172/5e572738E4aa3a9ea/a51298abb328d253.png" />
                                    </div>
                                    <span>时令生鲜</span>
                                </li>
                                <li>
                                    <div className="pic">
                                        <img src="//img13.360buyimg.com/img/jfs/t1/106785/21/13441/6913/5e57281dE4db76c97/a74c87d36aeac08b.png" />
                                    </div>
                                    <span>家电馆</span>
                                </li>
                                <li>
                                    <div className="pic">
                                        <img src="//img14.360buyimg.com/img/jfs/t1/99808/12/11015/5659/5e26bfcfE2047e6b9/38a48132db621bb1.png" />
                                    </div>
                                    <span>电脑数码</span>
                                </li>
                                <li>
                                    <div className="pic">
                                        <img src="//img11.360buyimg.com/img/jfs/t1/96446/20/13483/14800/5e572840E0bf82fe1/d7857361654890a5.png" />
                                    </div>
                                    <span>图书馆</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* 超级单品 */}
                    <div className="superonce">
                        <div className="rush-head">
                            <h3>超级单品</h3>
                            <div className="last-box">
                                <span className="last-time">
                                    <em className="hour num">00</em>
                                    <em className="split">:</em>
                                    <em className="min num">00</em>
                                    <em className="split">:</em>
                                    <em className="sec num">00</em>
                                </span>
                            </div>
                            <span className="more-text">限时低价&gt;&gt;</span>
                        </div>
                        <div className="rush-box">
                            <div className="product-list">
                                <div className="product-item">
                                    <a className="product-box">
                                        <div className="pic-wrap">
                                            <img src="https://m.360buyimg.com/n12/s450x450_jfs/t22312/360/2261848837/120916/6a4a2c4d/5b4da838N74151cdb.jpg"/>
                                        </div>
                                        <div className="item-tit">育儿宝 拨浪鼓...</div>
                                        <div className="price-box">
                                            <div className="now-price">
                                                <span>￥219</span>
                                            </div>
                                            <div className="old-price">
                                                <span>￥399</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-item">
                                    <a className="product-box">
                                        <div className="pic-wrap">
                                            <img src="https://m.360buyimg.com/n12/s450x450_jfs/t22312/360/2261848837/120916/6a4a2c4d/5b4da838N74151cdb.jpg"/>
                                        </div>
                                        <div className="item-tit">育儿宝 拨浪鼓...</div>
                                        <div className="price-box">
                                            <div className="now-price">
                                                <span>￥219</span>
                                            </div>
                                            <div className="old-price">
                                                <span>￥399</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-item">
                                    <a className="product-box">
                                        <div className="pic-wrap">
                                            <img src="https://m.360buyimg.com/n12/s450x450_jfs/t22312/360/2261848837/120916/6a4a2c4d/5b4da838N74151cdb.jpg"/>
                                        </div>
                                        <div className="item-tit">育儿宝 拨浪鼓...</div>
                                        <div className="price-box">
                                            <div className="now-price">
                                                <span>￥219</span>
                                            </div>
                                            <div className="old-price">
                                                <span>￥399</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-item">
                                    <a className="product-box">
                                        <div className="pic-wrap">
                                            <img src="https://m.360buyimg.com/n12/s450x450_jfs/t22312/360/2261848837/120916/6a4a2c4d/5b4da838N74151cdb.jpg"/>
                                        </div>
                                        <div className="item-tit">育儿宝 拨浪鼓...</div>
                                        <div className="price-box">
                                            <div className="now-price">
                                                <span>￥219</span>
                                            </div>
                                            <div className="old-price">
                                                <span>￥399</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-item">
                                    <a className="product-box">
                                        <div className="pic-wrap">
                                            <img src="https://m.360buyimg.com/n12/s450x450_jfs/t22312/360/2261848837/120916/6a4a2c4d/5b4da838N74151cdb.jpg"/>
                                        </div>
                                        <div className="item-tit">育儿宝 拨浪鼓...</div>
                                        <div className="price-box">
                                            <div className="now-price">
                                                <span>￥219</span>
                                            </div>
                                            <div className="old-price">
                                                <span>￥399</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 领卷中心&超值9.9 */}
                    <div className="module-wrap">
                        <div className="module-con">
                            <a>
                                <div className="pic-head">
                                    <div className="head-con">
                                        <h3>领券中心</h3>
                                        <div className="sub-tit">先领券 再购物</div>
                                    </div>
                                </div>
                                <div className="pic-wrap">
                                    <img src="//img14.360buyimg.com/img/jfs/t29743/285/1164606474/55663/997b4812/5cd8eb18Nc1fdac57.jpg"/>
                                    <img src="//img30.360buyimg.com/img/jfs/t10258/308/2802516987/31240/df2e769a/5cd8eb24Nbc32abc0.jpg"/>
                                </div>
                            </a>
                            <a>
                                <div className="pic-head">
                                    <div className="head-con">
                                        <h3>超值9.9</h3>
                                        <div className="sub-tit">低价优选，放心购买</div>
                                    </div>
                                </div>
                                <div className="pic-wrap">
                                    <img src="//img13.360buyimg.com/img/jfs/t1/51195/17/2139/14144/5cfdfa88E5040c7f2/5df850f665e2e758.jpg"/>
                                    <img src="//img30.360buyimg.com/img/jfs/t1/69541/8/1556/15837/5cfdfa93E45b727c2/57748cfd719bc190.jpg"/>
                                </div>
                            </a>
                        </div>
                    </div>
                    {/* 粮油调味 */}
                    <div className="module-wrap">
                        <div className="sense-module-head">
                            <a className="head-left">
                                <img src="//img12.360buyimg.com/img/jfs/t26299/192/1966203301/61888/1728a559/5bf3d773N9a00f2a0.jpg"/>
                                <img src="//img.yihaodianimg.com/front-homepage/mobile/images/index2018/group-purple.png"/>
                                <i>粮油调味</i>
                            </a>
                            <a className="head-right">
                                <img src="//img20.360buyimg.com/img/jfs/t29938/100/429764369/72061/f5a87a58/5bf3d857Nad4aa7ec.jpg"/>
                            </a>
                        </div>
                        <div className="sense-module-con">
                            <div className="sense-module-con-goods">
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* 水果 */}
                    <div className="module-wrap">
                        <div className="sense-module-head">
                            <a className="head-left">
                                <img src="//img20.360buyimg.com/img/jfs/t27205/192/1997565557/67073/17677c08/5bf3d94bN936d950d.jpg"/>
                                <img src="//img.yihaodianimg.com/front-homepage/mobile/images/index2018/group-yellow.png"/>
                                <i>水果</i>
                            </a>
                            <a className="head-right">
                                <img src="//img30.360buyimg.com/img/jfs/t28402/16/129713362/57601/9ef54056/5bf3d9c7N79fd781a.jpg"/>
                            </a>
                        </div>
                        <div className="sense-module-con">
                            <div className="sense-module-con-goods">
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* 纸品清洁 */}
                    <div className="module-wrap">
                        <div className="sense-module-head">
                            <a className="head-left">
                                <img src="//img14.360buyimg.com/img/jfs/t30796/222/461005367/49868/5050cdf3/5bf3da82Ncec5f071.jpg"/>
                                <img src="//img.yihaodianimg.com/front-homepage/mobile/images/index2018/group-red.png"/>
                                <i>纸品清洁</i>
                            </a>
                            <a className="head-right">
                                <img src="//img14.360buyimg.com/img/jfs/t27535/348/2000356271/42019/3d6da16e/5bf3dcc9N2ac930bd.jpg"/>
                            </a>
                        </div>
                        <div className="sense-module-con">
                            <div className="sense-module-con-goods">
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* 手机通讯 */}
                    <div className="module-wrap">
                        <div className="sense-module-head">
                            <a className="head-left">
                                <img src="//img11.360buyimg.com/img/jfs/t30076/109/446356799/52801/73de2e38/5bf3dda3Ne7370881.jpg"/>
                                <img src="//img.yihaodianimg.com/front-homepage/mobile/images/index2018/group-green.png"/>
                                <i>手机通讯</i>
                            </a>
                            <a className="head-right">
                                <img src="//img14.360buyimg.com/img/jfs/t27535/348/2000356271/42019/3d6da16e/5bf3dcc9N2ac930bd.jpg"/>
                            </a>
                        </div>
                        <div className="sense-module-con">
                            <div className="sense-module-con-goods">
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                                <a>
                                    <img src="//img12.360buyimg.com/img/jfs/t25585/175/1926852675/39693/80f938/5bbf0815Nad16fee5.jpg"/>
                                    <p>坚果炒货</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* 懂你想要 */}
                    <div className="module-wrap know-you-like">
                        <div className="module-head">
                            <h3>懂你想要</h3>
                        </div>
                        <div className="module-con">
                            <ul className="waterfall-lists">
                                <li>
                                    <div className="item-box">
                                        <a>
                                            <div className="link-list">
                                                <img src="https://img13.360buyimg.com/jdcms/jfs/t1/150244/30/1354/94854/5ef30345E4ff97b83/048b9fec7ba4204e.jpg"/>
                                            </div>
                                        </a>
                                        <div className="item-title">
                                            <p>ins小清新干花花瓶 创意北欧餐桌电视酒柜家居客厅插花装饰品摆件 A款【单瓶】</p>
                                            <div className="item-bottom">
                                                <div className="item-price-info">
                                                    <span className="item-price">￥<span>70.4</span></span>
                                                    <span className="find-like">找相似</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="item-box">
                                        <a>
                                            <div className="link-list">
                                                <img src="https://img13.360buyimg.com/jdcms/jfs/t1/150244/30/1354/94854/5ef30345E4ff97b83/048b9fec7ba4204e.jpg"/>
                                            </div>
                                        </a>
                                        <div className="item-title">
                                            <p>ins小清新干花花瓶 创意北欧餐桌电视酒柜家居客厅插花装饰品摆件 A款【单瓶】</p>
                                            <div className="item-bottom">
                                                <div className="item-price-info">
                                                    <span className="item-price">￥<span>70.4</span></span>
                                                    <span className="find-like">找相似</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="item-box">
                                        <a>
                                            <div className="link-list">
                                                <img src="https://img13.360buyimg.com/jdcms/jfs/t1/150244/30/1354/94854/5ef30345E4ff97b83/048b9fec7ba4204e.jpg"/>
                                            </div>
                                        </a>
                                        <div className="item-title">
                                            <p>ins小清新干花花瓶 创意北欧餐桌电视酒柜家居客厅插花装饰品摆件 A款【单瓶】</p>
                                            <div className="item-bottom">
                                                <div className="item-price-info">
                                                    <span className="item-price">￥<span>70.4</span></span>
                                                    <span className="find-like">找相似</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="item-box">
                                        <a>
                                            <div className="link-list">
                                                <img src="https://img13.360buyimg.com/jdcms/jfs/t1/150244/30/1354/94854/5ef30345E4ff97b83/048b9fec7ba4204e.jpg"/>
                                            </div>
                                        </a>
                                        <div className="item-title">
                                            <p>ins小清新干花花瓶 创意北欧餐桌电视酒柜家居客厅插花装饰品摆件 A款【单瓶】</p>
                                            <div className="item-bottom">
                                                <div className="item-price-info">
                                                    <span className="item-price">￥<span>70.4</span></span>
                                                    <span className="find-like">找相似</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bottom-tip"><span>正在加载</span></div>
                </div>
                <footer>
                    <div className="mod-computer">
                        <a>电脑端</a>
                    </div>
                    <div className="copyright">
                        <p>上海京东才奥电子商务有限公司</p>
                        <p>400-007-1111</p>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Home