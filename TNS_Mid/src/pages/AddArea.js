import React from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/AddArea.scss'

class AddArea extends React.Component {
    render () {
        return (
            <div className="addareaBox">
                {/* 头部 */}
                <header>
                    <a className="iconfont icon-zuo"></a>
                    <h1>地址管理</h1>
                    {/* <div className="rightBox">
                        <a>注册</a>
                    </div> */}
                </header>
                {/* 进程 */}
                <div className="crumbs">
                    <a>
                        <span></span>
                        首页
                    </a>
                    <a>
                        <span></span>
                        我的2号店
                    </a>
                    地址管理
                </div>
                {/* 添加收货地址 */}
                <section className="addarea">
                    <a>
                        +添加收货地址
                    </a>
                </section>
            </div>
        )
    }
}

export default AddArea