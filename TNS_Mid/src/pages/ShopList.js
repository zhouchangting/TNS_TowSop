import React from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/ShopList.scss'

class ShopCar extends React.Component {
    render () {
        return (
            <div className="shoplistBox">
                <header>
                    <a className="left iconfont icon-zuo"></a>
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
                            <span className="iconfont icon-gouwuche"></span>
                        </a>
                        <a>
                            <span className="iconfont icon-fangzi"></span>
                        </a>
                    </div>
                </header>
                <div className="container">
                    <div className="change-two">
                        <ul>
                            <li>
                                <i className="iconfont icon-liebiao"></i>
                                列表视图
                            </li>
                            <li className="white">
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
                    <div className="shoplist-container">
                        <ul>
                            <li>
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
                            </li>
                            <li>
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
                            </li>
                            <li>
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
                            </li>
                            <li>
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
                            </li>
                            <li>
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
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShopCar