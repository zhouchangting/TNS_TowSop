import React from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/Order.scss'

class Order extends React.Component {
    render () {
        return (
            <div className="OrderBox">
                <header>
                    <a className="iconfont icon-zuo"></a>
                    <h1>确认订单</h1>
                </header>
                <a className="noorder">
                    {/* 您当前没有收货地址，点击新建 */}
                    {/* 如果设置了地址，解开即可 */}
                    <div className="left">
                        <div className="name">
                            <em>天天 13555555555</em>
                            <span className="tag">家</span>
                        </div>
                        <div className="address">北京 朝阳区 八里庄街道 dada</div>
                    </div>
                    <span className="icon iconfont icon-you"></span>
                </a>
                <div className="shoporder">
                    <div className="b-wrapper">
                        <div className="p-wrapper">
                            <ul>
                                <li>
                                    <a>
                                        <div className="img-box">
                                            <span>
                                                <img src="//img14.360buyimg.com/N4/jfs/t1/134185/15/4265/374175/5f0bc927E0658c7e6/d696b4d102f5f3ae.jpg"/>
                                            </span>
                                        </div>
                                        <div className="price">
                                            <span className="total-price">￥89</span>
                                            <span className="count">共1件</span>
                                        </div>
                                        <div className="icon iconfont icon-you"></div>
                                    </a>
                                </li>
                            </ul>
                            <div className="mod-bar">
                                <span className="title">支付配送</span>
                                <div className="mod-time">
                                    <div className="pay-info">
                                        <p className="one">在线支付</p>
                                        <p className="two">第三方配送</p>
                                        <p className="three">共运费<em>￥6.00</em></p>
                                    </div>
                                    <div className="icon iconfont icon-you"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="payment">
                    <div className="pay-way">
                        <div className="name">发票</div>
                        <a>
                            商品明细(电子普通发票)-个人
                            <i className="icon iconfont icon-you"></i>
                        </a>
                    </div>
                </div>
                <div className="payment">
                    <div className="pay-way">
                        <div className="content">
                            抵用券
                            <span>已选择0张</span>
                        </div>
                        <a className="right">
                            抵用&nbsp;￥&nbsp;0
                            <i className="icon iconfont icon-you"></i>
                        </a>
                    </div>
                    <div className="pay-way">
                        <div className="content">
                            抵用券
                            <span className="text">0个金币可用</span>
                        </div>
                        <a className="right">
                            抵用&nbsp;￥&nbsp;0
                            <i className="icon iconfont icon-you"></i>
                        </a>
                    </div>
                    <div className="pay-way">
                        <div className="content">
                            礼品卡
                            <span>已选择0张</span>
                        </div>
                        <a className="right">
                            抵用&nbsp;￥&nbsp;0
                            <i className="icon iconfont icon-you"></i>
                        </a>
                    </div>
                    <div className="pay-way">
                        <div className="content">
                            账户余额
                            <span className="text">0</span>
                        </div>
                        <a className="right">
                            使用&nbsp;￥&nbsp;0
                            <i className="icon iconfont icon-you"></i>
                        </a>
                    </div>
                </div>
                <div className="confirm-box">
                    <div className="total">
                        需支付
                        <div className="price">￥95</div>
                    </div>
                    <button>立即支付</button>
                </div>
            </div>
        )
    }
}

export default Order