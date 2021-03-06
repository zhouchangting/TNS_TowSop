import React, {useCallback, useEffect, useState} from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/Pay.scss'
import {Spin} from "antd";

function Pay (props) {
    let [payWay,payWayCh] = useState(['京东支付','云闪付','微信支付'])
    let [loding,lodingCh] = useState(false)
    let [payWayIndex,payWayIndexCh] = useState(0)
    useEffect(()=>{
        let data = props.location.state || []
        if(data.length == 0){
            props.history.push({
                pathname:'/'
            })
        }
    },[])
    let {payWay_Ch} = useCallback({
        payWay_Ch(index){
            payWayIndexCh(index)
            let div = document.querySelectorAll('.payBox .rightBox')
            div.forEach((dom,ind)=>{
                if(index == ind) {
                    dom.className = 'rightBox iconfont icon-weixuanze1 red'
                }else {
                    dom.className = 'rightBox iconfont icon-xuanze'
                }

            })
        }
    })
        return (
            <Spin  spinning = {loding}>
            <div className="payBox">
                <div className="pay-content">
                    <div className="cashier-container">
                         {/*<header>
                            <div className={'goBack'}>
                                <a className="iconfont icon-zuo" onClick={()=>{
                                    props.history.go(-1)
                                }}></a>
                                <h1>确认支付</h1>
                            </div>
                            <div className="header-common">
                                <p className="num">
                                    <span className="yuan">￥</span>
                                    <span className="money">99.00</span>
                                </p>
                                <p className="order-num">订单号：127731826724</p>
                            </div>
                        </header>*/}
                        <div className="pay-container" onClick={()=>payWay_Ch('0')}>
                            <div className="change-pay">
                                <div className="JD-pay">
                                    <div className="JD-pay-container">
                                        <div className="leftBox">
                                            <div className="title-img">
                                                <img src="//img30.360buyimg.com/jr_image/jfs/t17569/130/1414314842/7437/e87182fb/5acadbe7N3eb973a8.png"/>
                                            </div>
                                        </div>
                                        <div className="rightBox iconfont icon-weixuanze1 red"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pay-item" onClick={()=>payWay_Ch('1')}>
                            <div className="item-contain">
                                <div className="item-left">
                                    <div className="icon-img">
                                        <img src="//static.360buyimg.com/finance/mobile/payment/cashiers/2.0.1/images/common/icon_wx.png"/>
                                    </div>
                                    <div className="title">云闪付</div>
                                </div>
                                <div className="rightBox iconfont icon-xuanze"></div>
                            </div>
                        </div>
                        <div className="pay-item" onClick={()=>payWay_Ch('2')}>
                            <div className="item-contain">
                                <div className="item-left">
                                    <div className="icon-img">
                                        <img src="//storage.360buyimg.com/payment-assets/sdk/icon/YUNSHANFU.png"/>
                                    </div>
                                    <div className="title">
                                        微信支付
                                        <img src="//img30.360buyimg.com/jr_image/jfs/t16849/48/1079000064/3076/1724ce6a/5ab9ff46Nfc8d42c4.png"/>
                                    </div>
                                </div>
                                <div className="rightBox iconfont icon-xuanze"></div>
                            </div>
                        </div>
                        <footer>
                            <div className="payBtn">{payWay[payWayIndex]}&nbsp;￥{props.location.state ? props.location.state.price.toFixed(3) : 0}</div>
                        </footer>
                   </div>
                </div>
            </div>
            </Spin>
        )
}

export default Pay