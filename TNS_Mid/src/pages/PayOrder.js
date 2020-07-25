import React from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/PayOrder.scss'

class PayOrder extends React.Component {
    render () {
        return (
            <div className="payorderBox">
                {/* 头部 */}
                <header>
                    <a className="iconfont icon-zuo"></a>
                    <h1>交易成功</h1>
                </header>
                {/* 内容 */}
                <container>
                    {/* 地址 */}
                    <div className="header-top">
                        <div className="header-top-one">
                            <span className="iconfont icon-weizhi icon"></span>
                            <div className="content">
                                <p className="content-one">
                                    <span className="one">小甜甜</span>
                                    <span className="two">13999999999</span>
                                </p>
                                <p className="content-two">江门市 蓬江区 神田花园25座26号</p>
                            </div>
                        </div>
                    </div>
                    {/* 主体 */}
                    <div className="header-main">
                        <div className="header-main-one">
                            <div className="main-one">
                                <p className="left">
                                    <img src="https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3871865850,3551013363&fm=85&app=92&f=PNG?w=121&h=75&s=6BA43A626BBB07B95D54011E0300C0C0"/>
                                    <span>书香文化传媒&gt;</span>
                                </p>
                                <p className="right">
                                    <span className="iconfont icon-kefufuwu icon"></span>
                                    <span className="text">联系客服</span>
                                </p>
                            </div>
                        </div>
                        <div className="header-main-two">
                            <div className="main-one">
                                <img src="https://dss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=148521741,962820141&fm=85&app=92&f=JPG?w=121&h=75&s=34FAEF36417EF5CC4E5355EA03007038"/>
                                <div className="main-two2">
                                    <p className="text">保育员(第二版)(基础知识+初级)技能保余元培训教材共两本 书籍</p>
                                    <span>1套</span>
                                </div>
                                <div className="main-two3">
                                    <span className="money">￥31</span>
                                    <span className="num">X1</span>
                                </div>
                            </div>
                            <div className="main-two">
                                <div className="btn">申请退款</div>
                            </div>
                        </div>
                        <div className="header-main-three">
                            <p className="left">使用1元APP专享券</p>
                            <p className="right">
                                <span className="text">
                                    实付
                                    <span className="yuan">￥30</span>
                                    (免运费)
                                </span>
                            </p>
                        </div>
                    </div>
                    {/* 订单编号 */}
                    <div className="header-order">
                        <div className="order-main">
                            <p>
                                <span className="left">订单编号：180804-40951820772531</span>
                                <span className="right">复制</span>
                            </p>
                            <p>
                                <span className="left">支付方式：微信支付</span>
                            </p>
                            <p>
                                <span className="left">物流公司：韵达快递</span>
                            </p>
                            <p>
                                <span className="left">快递单号：3101886042951</span>
                                <span className="right">复制</span>
                            </p>
                            <p>
                                <span className="left">下单时间：2018-08-04 19:31:53</span>
                            </p>
                            <p>
                                <span className="left">发货时间：2018-08-04 19:31:53</span>
                            </p>
                            <p>
                                <span className="left">成交时间：2018-08-04 19:31:53</span>
                            </p>
                        </div>
                    </div>
                </container>
                {/* 固定栏 */}
                <footer>
                    <div className="footer-main">
                        <div className="again">再次购买</div>
                        <div className="remove">删除订单</div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default PayOrder