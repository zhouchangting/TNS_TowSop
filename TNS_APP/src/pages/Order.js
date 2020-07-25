import React, {useCallback, useEffect, useState} from 'react'
import shopDataAjax from "../ajax/shopData";
import {Spin, Switch,message} from "antd";
import userAjax from "../ajax/user";
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/Order.scss'

let yunfei = 6
function Order (props) {
    let [loding,lodingCh] = useState(true)
    let [userSite,userSiteCh] = useState([])
    useEffect(()=>{
        userAjax.userGetSite().then(res=>{
            if(res.code == '2000'){
                userSiteCh(res.data)
            }
            lodingCh(false)
        })
        let data = props.location.state || []
        if(data.length == 0){
            props.history.push({
                pathname:'/',
            })
        }
    },[])
    let {submitPage} = useCallback({
        submitPage(){
            lodingCh(true)
            if(userSite.length == 0){
                message.warning('请先添加收货地址')
                lodingCh(false)
                return
            }
            shopDataAjax.submitPage(props.location.state).then(res=>{
                lodingCh(false)
                if(res.code == '2000'){
                    props.history.push({
                        pathname:'/pay',
                        state:{price:res.price - -yunfei}
                    })
                }
            })
        },
    })
        return (
            <Spin  spinning = {loding}>
            <div className="OrderBox">
                {
                    userSite.map((item,index)=>{
                        if(index == 0){
                            return (<a className="noorder" key={index}>
                                <div className="left">
                                    <div className="name">
                                        <em>{item.consignee + ' ' + item.phone}</em>
                                        <span className="tag">家</span>
                                    </div>
                                    <div className="address">{item.district + ' ' + item.detailedly}</div>
                                </div>
                                <span className="icon iconfont icon-you"></span>
                            </a>)
                        }else {
                            return ''
                        }
                    })
                }
                <div style={{
                    height: '60px',
                    lineHeight: '60px',
                    textAlign: 'center',
                    display:userSite.length == 0 ? '':'none'
                }} onClick={()=>{
                    props.history.push({
                        pathname:'/addarea',
                    })
                }}>
                    没有收货地址,请点击添加
                </div>

                <div className="shoporder">
                    <div className="b-wrapper">
                        <div className="p-wrapper">
                            <ul>
                                {
                                    (props.location.state || []).map((item,index)=>(
                                        <li key={index} style={{
                                            position: 'relative'
                                        }}>
                                            <a>
                                                <div className="img-box">
                                            <span>
                                                <img src={item.goodImg.replace(/[,].*/,'')} />
                                            </span>
                                                </div>
                                                <div className="price" >
                                                    <span style={{
                                                        position: 'absolute',
                                                        top:' 30%',
                                                        left: '20%',
                                                        color:'#666',
                                                        display:'inline-block',
                                                        maxWidth:'4rem',
                                                        textAlign:'left'
                                                    }}> {item.goodName}</span>
                                                    <span className="total-price">￥{item.discount * item.price * item.goodNum}</span>
                                                    <span className="count">共{item.goodNum}件</span>
                                                </div>
                                                <div className="icon iconfont icon-you"></div>
                                            </a>
                                        </li>
                                    ))
                                }

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
                        <div className="price">￥{
                            ((props.location.state || []).reduce((lod,ne,index,item)=>{
                                return lod + (item[index].discount * item[index].price * item[index].goodNum)
                            },0) - -yunfei).toFixed(3)
                        }</div>
                    </div>
                    <button onClick={submitPage}>立即支付</button>
                </div>
            </div>
            </Spin>
        )
}

export default Order