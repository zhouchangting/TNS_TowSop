import React, {useCallback, useState} from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/Store.scss'
import userVerify from '../public/userVerify'
import { message } from 'antd';
import userAjax from "../ajax/user";
function Store(props) {
    let [data,dataCh] = useState({
        linkman:'',
        shopName:'',
        area:'',
        site:'',
        phone:'',
        idCard:'',
        email:''
    })
    let {userInShopDataCh,userInShopGo} = useCallback({
        userInShopDataCh(key,e){
            dataCh({
                ...data,
                [key]:e.target.value.trim()
            })
        },
        userInShopGo(){
            if(!data.linkman.match(/^[a-zA-Z\u4e00-\u9fa5]*$/)){
                message.warning('请输入正确名字')
                return
            }
            if(!data.shopName.match(/^[a-zA-Z\u4e00-\u9fa5]*$/)){
                message.warning('请输入正确店铺名')
                return
            }
            if(!data.area.match(/^[\u4e00-\u9fa5,/]*$/)){
                message.warning('请输入正确省/市/区')
                return
            }
            if(!data.site.match(/^[a-zA-Z\u4e00-\u9fa50-9,]*$/)){
                message.warning('请输入正确详细地址')
                return
            }
            if(!data.phone.match(/^1[2-9]\d{9}$/)){
                message.warning('请输入正确手机号')
                return
            }
            if(!data.idCard.match(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/)){
                message.warning('请输入正确身份证号码')
                return
            }
            if(!data.email.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/i)){
                message.warning('请输入正确邮箱')
                return
            }
            userAjax.userInShop(data).then(res=>{
                if(res.code == '2000'){
                    message.warning('申请成功')
                    dataCh({
                        linkman:'',
                        shopName:'',
                        area:'',
                        site:'',
                        phone:'',
                        idCard:'',
                        email:''
                    })
                }
            })
        },
    })
        return (
            <div className="storeBox">
                {/* 头部
                <header>
                    <a className="iconfont icon-zuo" onClick={()=>{
                        props.history.go(-1)
                    }}></a>
                    <h1>入驻商家</h1>
                </header> */}
                 {/*注意事项 */}
                <div className="warning">
                    <p className="title">注意事项</p>
                    <p className="info">以下填写内容请保证在绝对安全的环境下填写，避免信息泄漏，商家入驻商铺默认同意<a>商家入驻合同</a></p>
                </div>
                <div className="content">
                    <h2>店铺及联系人信息</h2>
                    <div className="store-info">
                        <div className="item-info">
                            <span>店铺名称</span>
                            <input type="text" placeholder="请输入店铺名称" value={data.shopName} onChange={e=>userInShopDataCh('shopName',e)}/>
                        </div>
                        <div className="item-info">
                            <span>所在地</span>
                            <input type="text" placeholder="请输入所在地" value={data.area} onChange={e=>userInShopDataCh('area',e)}/>
                        </div>
                        <div className="item-info">
                            <span>详细地址</span>
                            <input type="text" placeholder="请输入详细地址" value={data.site} onChange={e=>userInShopDataCh('site',e)}/>
                        </div>
                        <div className="item-info">
                            <span>联系人姓名</span>
                            <input type="text" placeholder="请输入联系人姓名" value={data.linkman} onChange={e=>userInShopDataCh('linkman',e)}/>
                        </div>
                        <div className="item-info">
                            <span>联系人电话</span>
                            <input type="text" placeholder="请输入联系人电话" value={data.phone} onChange={e=>userInShopDataCh('phone',e)}/>
                        </div>
                        <div className="item-info">
                            <span>身份证</span>
                            <input type="text" placeholder="请输入身份证" value={data.idCard} onChange={e=>userInShopDataCh('idCard',e)}/>
                        </div>
                        <div className="item-info">
                            <span>电子邮箱</span>
                            <input type="text" placeholder="请输入电子邮箱" value={data.email} onChange={e=>userInShopDataCh('email',e)}/>
                        </div>
                    </div>
                    <div className="btn">
                        <div className="btn-sub" onClick={userInShopGo}>提交</div>
                    </div>
                </div>
            </div>
        )
}
Store = userVerify(Store)
export default Store