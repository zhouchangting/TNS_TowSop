import React,{Component} from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/Shop.scss'


class Shop extends Component{
    render () {
        return(
            <div className="shopBox">
                {/* 头部 */}
                <header>
                    <a className="iconfont icon-zuo"></a>
                    <h1>商品详情</h1>
                    <div className="rightBox">
                        <a className="iconfont icon-shenglvehao"></a>
                        {/* 更多选项，解开注释即可 */}
                        {/* <div className="more-list">
                            <a>
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
                            <a>
                                <span className="iconfont icon-fangzi">
                                    <span className="name">首页</span>
                                </span>
                            </a>
                            <a>
                                <span className="iconfont icon-yonghu">
                                    <span className="name">我的</span>
                                </span>
                            </a>
                        </div> */}
                    </div>
                </header>
                {/* 主体 */}
                <div className="product-main">
                    <div className="banner">
                        <div className="banner-wrap">
                            <div className="banner-wrap-main">
                                <ul>
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
                                    <li>
                                        <img src="//img12.360buyimg.com/n1/jfs/t1/124065/24/5517/317631/5ef2f8aaE1ec646bf/16c021166d076a14.jpg"/>
                                    </li>
                                </ul>
                            </div>
                            <div className="banner-wrap-num">
                                <span className="cur">1</span>
                                <span>/</span>
                                <span className="sum">6</span>
                            </div>
                        </div>
                    </div>
                    <div className="inner-wrap">
                        <div className="product-box">
                            <div className="product-box-title">
                                <div className="product-box-title-box">
                                    <h2>
                                        <span>自营</span>
                                        三只松鼠每日坚果大礼包 孕妇零食节日礼物送女友混合干果礼盒榛子腰果巴旦木葡萄干核桃仁开心果 750g/30袋
                                    </h2>
                                </div>
                            </div>
                            <div className="product-box-price">
                                <div className="pd-price">
                                    <span>￥</span>
                                    <strong>149</strong>
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
                            <a>
                                <span className="title">
                                    已选择
                                </span>
                                <span className="text">
                                    家庭版分享装750g/30天装
                                </span>
                                <span className="right iconfont icon-you"></span>
                            </a>
                        </div>
                        <div className="pd-box">
                            <div className="pd-region">
                                <div className="address">
                                    送货至
                                    <span className="name">上海 静安区 城区</span>
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
                                    <img src="//img30.360buyimg.com/popshop/jfs/t1/135064/24/2674/11913/5eedf919E0084e7be/40ad14ee2c4f9a56.jpg"/>
                                </div>
                                <div className="info">
                                    <div className="title-box">
                                        <h2>三只松鼠自营旗舰店</h2>
                                        <span>自营</span>
                                    </div>
                                    <div className="collect">三只松鼠自营旗舰店欢迎您</div>
                                </div>
                            </div>
                            <div className="btn-box">
                                <a>进入店铺</a>
                            </div>
                        </div>
                        <div className="pd-like">
                            <h2>相似商品</h2>
                            <div className="list-box">
                                <div className="list">
                                    <div className="item">
                                        <a>
                                            <div className="pic">
                                                <img src="https://img13.360buyimg.com/jdcms/jfs/t1/125621/23/6886/201463/5f091d0dEe723e636/f6b9a18efb1550d3.jpg"/>
                                            </div>
                                            <h3>三只松鼠奶油味夏威夷果 坚果炒货孕妇坚果每日坚果干果零食160g/袋</h3>
                                            <div className="price-box">
                                                <span className="price">
                                                    ￥
                                                    <span>36.90</span>
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a>
                                            <div className="pic">
                                                <img src="https://img13.360buyimg.com/jdcms/jfs/t1/125621/23/6886/201463/5f091d0dEe723e636/f6b9a18efb1550d3.jpg"/>
                                            </div>
                                            <h3>三只松鼠奶油味夏威夷果 坚果炒货孕妇坚果每日坚果干果零食160g/袋</h3>
                                            <div className="price-box">
                                                <span className="price">
                                                    ￥
                                                    <span>36.90</span>
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a>
                                            <div className="pic">
                                                <img src="https://img13.360buyimg.com/jdcms/jfs/t1/125621/23/6886/201463/5f091d0dEe723e636/f6b9a18efb1550d3.jpg"/>
                                            </div>
                                            <h3>三只松鼠奶油味夏威夷果 坚果炒货孕妇坚果每日坚果干果零食160g/袋</h3>
                                            <div className="price-box">
                                                <span className="price">
                                                    ￥
                                                    <span>36.90</span>
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a>
                                            <div className="pic">
                                                <img src="https://img13.360buyimg.com/jdcms/jfs/t1/125621/23/6886/201463/5f091d0dEe723e636/f6b9a18efb1550d3.jpg"/>
                                            </div>
                                            <h3>三只松鼠奶油味夏威夷果 坚果炒货孕妇坚果每日坚果干果零食160g/袋</h3>
                                            <div className="price-box">
                                                <span className="price">
                                                    ￥
                                                    <span>36.90</span>
                                                </span>
                                            </div>
                                        </a>
                                    </div>
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
                            <div className="items">
                                <img src="//img10.360buyimg.com/imgzone/jfs/t27256/283/1745121591/239155/bea4ef6b/5beceb27N5695dc4b.jpg"/>
                            </div>
                            <div className="items">
                                <img src="//img10.360buyimg.com/imgzone/jfs/t27256/283/1745121591/239155/bea4ef6b/5beceb27N5695dc4b.jpg"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-buy">
                    <a className="addshopcar">加入购物车</a>
                    <a className="iconfont icon-shangpinjiarugouwuche icon"></a>
                </div>
            </div>
        )
    }
}

export default Shop