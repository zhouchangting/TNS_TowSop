import React from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/Reg.scss'
import userAjax from '../ajax/user'
import utils from "../public/utils";
import {Spin,message} from "antd";
import { connect } from 'react-redux'
import userLogin from '../public/userLogin'
class Reg extends React.Component {
    constructor() {
        super();
        this.state = {
            username:'', //用户名
            password:'', //密码
            logining:false, //登陆中
            times:null, //定时器
            colorRed:'', //按钮颜色
        }
    }
    componentWillUnmount(){
        clearTimeout(this.state.times)
    }
    //进入请求状态
    onWait(){
        this.setState({
            logining:true,
            times:(()=>{
                clearTimeout(this.state.times)
                return setTimeout(()=>{
                    if(this.state.logining){
                        message.warning('网络迟缓,请等待')
                        this.setState({
                            logining:false
                        })
                    }
                },6000)
            })()
        })
    }
    //更新按钮颜色
    colorChange(){
        if(this.state.username.trim().match(/^\w{6,16}$/)){
            if(this.state.password.trim().match(/^\w{6,16}$/)){
                this.setState({
                    colorRed:'red'
                })
                return
            }
        }
        this.setState({
            colorRed:''
        })
    }
    //用户名/密码
    inputChange(type,e){
        let value = e.target.value
        if(type === 'username'){
            this.setState(()=>({
                username:value
            }),this.colorChange)
        }
        if(type === 'password'){
            this.setState(()=>({
                password:value
            }),this.colorChange)
        }
    }
    //发送注册请求,验证用户名是否存在
    goReg(){
        if(this.state.colorRed == ''){
            message.warning('账号密码只能为6~16位字母数字下划线')
            return
        }
        this.onWait.call(this)
        userAjax.username(this.state.username).then(res=>{
            clearTimeout(this.state.times)
            if(res.code == '2000'){
                this.goReg2.call(this)
            }
            this.setState({
                logining:false
            })
        })
    }
    goReg2(){
        this.onWait.call(this)
        userAjax.userReg(this.state.username,this.state.password).then(res=>{
            clearTimeout(this.state.times)
            if(res.code == '2000'){
                this.props.userLoginIn({
                    username:res.data.name,
                    token:res.data.token,
                    cookie:true
                })
                message.warning('注册成功')
                this.props.history.push({
                        pathname: this.props.hashchange().replace(/[?].*/,''),
                        search: this.props.hashchange().replace(/[^?]*/,'')
                    })
                return
            }
            this.setState({
                logining:false
            })
        })
    }
    render () {
        return (
            <div className="regBox">
                <Spin  spinning = {this.state.logining}>
                {/* 头部 */}
                <header>
                    <a className="iconfont icon-zuo" onClick={()=>{
                        this.props.history.go(-1)
                    }}></a>
                    <h1>2号店注册</h1>
                    <div className="rightBox" onClick={()=>{
                        this.props.history.push({
                            pathname:'/login'
                        })
                    }}>
                        <a>登录</a>
                    </div>
                </header>
                {/* 内容 */}
                <div className="container">
                    <div className="login-box">
                        <div className="form-item">
                            <label className="iconfont icon-yonghu"></label>
                            <div className="input-box">
                                <input type="text" placeholder="邮箱/手机/用户名" value={this.state.username}
                                       onChange={this.inputChange.bind(this,'username')}/>
                            </div>
                        </div>
                        <div className="form-item">
                            <label className="iconfont icon-mima"></label>
                            <div className="input-box">
                                <input type="password" placeholder="请输入密码" value={this.state.password}
                                       onChange={this.inputChange.bind(this,'password')}/>
                            </div>
                        </div>
                    </div>
                    <div className="agreement">
                        <label>
                            点击注册，表示您同意1号店
                            <a>服务协议及隐私声明》</a>
                        </label>
                    </div>
                    <div className="btn_box">
                        <a style={{backgroundColor:this.state.colorRed}} onClick={this.goReg.bind(this)}>注册</a>
                    </div>
                </div>
                </Spin>
            </div>
        )
    }
}
Reg = connect(state=>({
    state:state.uesrLogin
}),dispatch=>({
    userLoginIn(obj){
        dispatch({
            type:'userLoginIn',
            ...obj
        })
    },
    userLoginOut(obj){
        dispatch({
            type:'userLoginOut',
            ...obj
        })
    }
}))(Reg)
Reg = userLogin(Reg)
export default Reg
