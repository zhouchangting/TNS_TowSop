import React from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/Mine.scss'
import userVerify from '../public/userVerify'
import utils from "../public/utils";
function Mine(props){
    return (
        <div className="mineBox">
            <header>
                <a className="leftBox iconfont icon-fangzi" onClick={()=>{
                    props.history.push({
                        pathname:'/'
                    })
                }}></a>
                <div className="rightBox" onClick={()=>{
                    props.history.push({
                        pathname:'/addarea'
                    })
                }}>
                    <a>收货地址</a>
                </div>
            </header>
            <div className="mypage">
                <div className="mine-page">
                    <a className="member-avatar">
                        <img src={props.userMessage.headPortraitUrl}/>
                    </a>
                    <div className="member-info">
                        <div className="name">
                            <div className="content">{props.userMessage.nickName}</div>
                            <div className="bages">
                                <span></span>
                            </div>
                        </div>
                        <a className="iconfont icon-shezhi" onClick={()=>{
                            props.history.push({
                                pathname:'/changeuser'
                            })
                        }}></a>
                    </div>
                    <div className="member-property">
                        <a className="item">
                            <div className="number">0</div>
                            <div className="name">金币</div>
                        </a>
                        <a className="item item-two">
                            <div className="number">0</div>
                            <div className="name">抵用券</div>
                        </a>
                        <a className="item">
                            <div className="number">0</div>
                            <div className="name">金额</div>
                        </a>
                    </div>
                </div>
                <div className="mine-block">
                    <div className="mine-title">
                        <div className="title">我的订单</div>
                    </div>
                    <div className="mine-content">
                        <div className="item-list">
                            <a className="items">
                                <div className="iconfont icon-dingdan icon"></div>
                                <div className="name">全部订单</div>
                            </a>
                            <a className="items">
                                <div className="iconfont icon-daifukuan icon"></div>
                                <div className="name">待付款</div>
                            </a>
                            <a className="items">
                                <div className="iconfont icon-shouhuo icon"></div>
                                <div className="name">待收货</div>
                            </a>
                        </div>
                    </div>

                </div>
                <div className="mine-check">
                    <div className="mine-content">
                        <a className="item">
                            <div className="iconfont icon-huiyuanzhongxin icon"></div>
                            <div className="name">会员中心</div>
                        </a>
                        <a className="item">
                            <div className="iconfont icon-yinhangqia icon"></div>
                            <div className="name">联名卡</div>
                        </a>
                        <a className="item">
                            <div className="iconfont icon-qianbao icon"></div>
                            <div className="name">2号钱包</div>
                        </a>
                        <a className="item">
                            <div className="iconfont icon-shouji icon"></div>
                            <div className="name">手机充值</div>
                        </a>
                        <a className="item">
                            <div className="iconfont icon-kefufuwu icon"></div>
                            <div className="name">客户服务</div>
                        </a>
                        <a className="item" onClick={()=>props.history.push({
                            pathname:'/store'
                        })}>
                            <div className="icon">=></div>
                            <div className="name">入驻商家</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
Mine = userVerify(Mine)
export default Mine