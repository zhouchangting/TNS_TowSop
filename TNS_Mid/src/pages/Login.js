import React from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/Login.scss'

class Login extends React.Component {
    render () {
        return (
            <div className="loginBox">
                {/* 头部 */}
                <header>
                    <a className="iconfont icon-zuo"></a>
                    <h1>登录2号店</h1>
                    <div className="rightBox">
                        <a>注册</a>
                    </div>
                </header>
                {/* 内容 */}
                <div className="container">
                    <div className="login-box">
                        <div className="form-item">
                            <label className="iconfont icon-yonghu"></label>
                            <div className="input-box">
                                <input type="text" placeholder="邮箱/手机/用户名"/>
                            </div>
                        </div>
                        <div className="form-item">
                            <label className="iconfont icon-mima"></label>
                            <div className="input-box">
                                <input type="text" placeholder="请输入密码"/>
                            </div>
                        </div>
                    </div>
                    <div className="remember-login">
                        <input type="checkbox"/>
                        <label>两周内记住登录</label>
                        <a>忘记密码?</a>
                    </div>
                    <div className="login-btn">
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
            </div>
        )
    }
}

export default Login