import React from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/Store.scss'

class Store extends React.Component {
    render () {
        return (
            <div className="storeBox">
                {/* 头部 */}
                <header>
                    <a className="iconfont icon-zuo"></a>
                    <h1>入驻商家</h1>
                </header>
                {/* 注意事项 */}
                <div className="warning">
                    <p className="title">注意事项</p>
                    <p className="info">以下填写内容请保证在绝对安全的环境下填写，避免信息泄漏，商家入驻商铺默认同意<a>商家入驻合同</a></p>
                </div>
                <div className="content">
                    <h2>店铺及联系人信息</h2>
                    <div className="store-info">
                        <div className="item-info">
                            <span>店铺名称</span>
                            <input type="text" placeholder="请输入店铺名称"/>
                        </div>
                        <div className="item-info">
                            <span>所在地</span>
                            <input type="text" placeholder="请输入所在地"/>
                        </div>
                        <div className="item-info">
                            <span>详细地址</span>
                            <input type="text" placeholder="请输入详细地址"/>
                        </div>
                        <div className="item-info">
                            <span>联系人姓名</span>
                            <input type="text" placeholder="请输入联系人姓名"/>
                        </div>
                        <div className="item-info">
                            <span>联系人电话</span>
                            <input type="text" placeholder="请输入联系人电话"/>
                        </div>
                        <div className="item-info">
                            <span>身份证</span>
                            <input type="text" placeholder="请输入身份证"/>
                        </div>
                        <div className="item-info">
                            <span>电子邮箱</span>
                            <input type="text" placeholder="请输入电子邮箱"/>
                        </div>
                    </div>
                    <div className="btn">
                        <div className="btn-sub">提交</div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Store