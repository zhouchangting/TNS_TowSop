import React from 'react'
import { Spin, message } from 'antd';
import userAjax from '../ajax/user'
import utils from "../public/utils";
import { connect } from 'react-redux'
import userLogin from '../public/userLogin'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/Login.scss'
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username:'', //用户名
            password:'', //密码
            noLogin:false, //是否免登录
            logining:false, //登陆中
            times:null
        }
    }
    componentDidMount() {
        // console.log(this.props)
    }

    componentWillUnmount(){
        clearTimeout(this.state.times)
    }
    //用户名/密码
    inputChange(type,e){
        if(type === 'username'){
            this.setState({
                username:e.target.value
            })
        }
        if(type === 'password'){
            this.setState({
                password:e.target.value
            })
        }
    }
    //登录按钮触发
    inputLogin(){
        if(this.state.username.trim().match(/^\w{6,16}$/)){
            if(this.state.password.trim().match(/^\w{6,16}$/)){
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
                userAjax.userLogin(this.state.username,this.state.password).then(res=>{
                    clearTimeout(this.state.times)
                    if(res.code == '2000'){
                        this.props.userLoginIn( {
                            username:res.data.name,
                            token:res.data.token,
                            nickName:res.data.nickName,
                            userPhone:res.data.userPhone,
                            headPortraitUrl:res.data.headPortraitUrl,
                            regTiem:res.data.regTiem,
                            noLogin:this.state.noLogin,
                            cookie:true
                        })
                        // console.log(this.props.hashchange().replace(/[?].*/,''))
                        // console.log(this.props.hashchange().replace(/[^?]*/,''))
                        this.props.history.push(
                            {
                                pathname: this.props.hashchange().replace(/[?].*/,''),
                                search: this.props.hashchange().replace(/[^?]*/,'')
                            }
                        )
                        return
                    }
                    this.setState({
                        logining:false
                    })
                })
            }else {
                message.warning('请输入6~16位字母数字下划线密码')
            }
        }else {
            message.warning('请输入6~16位字母数字下划线账号')
        }
    }
    //
    render () {
        return (
            <div className="loginBox">
                <Spin  spinning = {this.state.logining}>
                {/* 头部 */}
                <header>
                    <a className="iconfont icon-zuo" onClick={this.props.historyBack}></a>
                    <h1>登录2号店</h1>
                    <div className="rightBox" onClick={()=>{
                        this.props.history.push({
                            pathname:'/Reg'
                        })
                    }}>
                        <a>注册</a>
                    </div>
                </header>
                {/* 内容 */}
                <div className="container">
                    <div className="login-box">
                        <div className="form-item">
                            <label className="iconfont icon-yonghu"></label>
                            <div className="input-box">
                                <input type="text" placeholder="邮箱/手机/用户名" value={this.state.username} onChange={this.inputChange.bind(this,'username')}/>
                            </div>
                        </div>
                        <div className="form-item">
                            <label className="iconfont icon-mima"></label>
                            <div className="input-box">
                                <input type="password" placeholder="请输入密码" value={this.state.password} onChange={this.inputChange.bind(this,'password')}/>
                            </div>
                        </div>
                    </div>
                    <div className="remember-login">
                        <input type="checkbox" onChange={(event)=>{
                            this.setState({
                                noLogin:event.target.checked
                            })
                        }}/>
                        <label>两周内记住登录</label>
                        <a>忘记密码?</a>
                    </div>
                    <div className="login-btn" onClick={this.inputLogin.bind(this)}>
                        <a>登录</a>
                    </div>
                    <div className="sms-login">
                        <a>短信快捷登录</a>
                    </div>
                    <div className="joint-login">
                        <h2>
                            <span>合作账号登录</span>
                        </h2>
                        <ul>
                            <li>
                                <a href="https://passport.yhd.com/m/qq/login.do" className="iconfont icon-qq"></a>
                            </li>
                            <li>
                                <a href="https://passport.yhd.com/m/qq/login.do" className="iconfont icon-jd"></a>
                            </li>
                        </ul>
                    </div>
                </div>



                </Spin>
            </div>
        )
    }
}
Login = userLogin(Login)
Login = connect(state=>({
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
}))(Login)
export default Login