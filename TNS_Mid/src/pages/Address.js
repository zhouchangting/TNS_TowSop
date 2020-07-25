import React from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/Address.scss'

class Address extends React.Component {
    render () {
        return (
            <div className="addressBox">
                {/* 头部 */}
                <header>
                    <a className="iconfont icon-zuo"></a>
                    <h1>新增收货地址</h1>
                    {/* <div className="rightBox">
                        <a>注册</a>
                    </div> */}
                </header>
                {/* 添加收货地址详细信息显示 */}
                <div className="address-add"></div>
            </div>
        )
    }
}

export default Address