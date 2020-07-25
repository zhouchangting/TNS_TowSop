import React from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/Reg.scss'

class Reg extends React.Component {
    render () {
        return (
            <div className="regBox">
                {/* 头部 */}
                <header>
                    <a className="iconfont icon-zuo"></a>
                    <h1>2号店注册</h1>
                    <div className="rightBox">
                        <a>登录</a>
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
                    <div className="agreement">
                        <label>
                            点击注册，表示您同意1号店
                            <a>服务协议及隐私声明》</a>
                        </label>
                    </div>
                    <div className="btn_box">
                        <a>注册</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reg
