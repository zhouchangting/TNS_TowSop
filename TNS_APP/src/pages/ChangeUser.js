import React, {Component, useCallback, useState} from 'react'
import userAjax from '../ajax/user'
import store from "../redux/store";
import userVerify from '../public/userVerify'
import {Drawer, message} from 'antd';
import utils from "../public/utils";
// import Add_css from "../assets/css/Address_sel.module.scss";
// import add_site from "../public/ressJSON.json";
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/ChangeUser.scss'
function ChangeUser(props) {
    let [userMessage,userMessageCh] = useState(props.userMessage)
    let [address,addressOpen] = useState(false)
    let [input,inputCh] = useState('')
    let [newpsw,newpswCh] = useState('')
    let [newpsw2,newpswCh2] = useState('')
    let [lodpsw,lodpswCh] = useState('')
    let [edit,editCh] = useState({name:'无',str:''})
    const {userLoginOut,userImgUp,userMesUp} = useCallback({
        userLoginOut(){
            userAjax.userLoginOut().then(res=>{
                if(res.code == '2000'){
                    store.dispatch({
                        type:'userLoginOut'
                    })
                }
                props.history.push({
                    pathname:'/'
                })
            })
        },
        userImgUp(e){
            let img = e.target.files[0]
            if(img){
                if(!img.type.match(/(image)|(jpeg)|(png)|(gif)/)){
                    message.warning('请选择图片文件')
                    return
                }
                if(img.size > 1024 * 10000){
                    message.warning('图片太大')
                    return
                }
                let formData = new FormData()
                formData.append('file',img)
                formData.append('token',utils.getCookie('token'))
                formData.append('userName',utils.getCookie('username'))
                userAjax.userImgUp(formData).then(res=>{
                    if(res.code == '2000'){
                        message.warning(res.message)
                        utils.setCookie('headPortraitUrl',res.data.imgurl,14)
                        userMessageCh({
                            ...userMessage,
                            headPortraitUrl:res.data.imgurl
                        })
                    }
                })
            }
        },
        userMesUp(str,name){
            inputCh('')
            newpswCh('')
            newpswCh2('')
            lodpswCh('')
            addressOpen(true)
            editCh({
                str,
                name
            })
        },
    },[])

    function userMesPut(str){
        if(str == 'nickName'){
            if(!input.trim().match(/^[a-z0-9_A-Z\u4e00-\u9fa5]*$/)){
                message.warning('昵称不符合规范')
                return
            }
        }
        if(str == 'userPhone'){
            if(!input.trim().match(/^1[3-9]\d{9}$/)){
                message.warning('手机号不符合规格')
                return
            }
        }
        if(str == 'newpsw'){
            if(!lodpsw.trim().match(/^\w{6,16}$/) || !newpsw.trim().match(/^\w{6,16}$/)){
                message.warning('密码不符合规范,请输入6~16位数字字母下划线')
                return
            }else {
                if(newpsw !== newpsw2){
                    message.warning('两次密码需要一致')
                    return;
                }
                userAjax.userNewPass(lodpsw.trim(),newpsw.trim()).then(res=>{
                    if(res.code == '2000'){
                        message.warning('密码修改成功,请牢记新密码')
                        addressOpen(false)
                    }
                })
            }
            return;
        }
        userAjax.userMesPut(str,input).then(res=>{
            if(res.code == '2000'){
                message.warning('修改成功')
                utils.setCookie(str,res.data[str],14)
                userMessageCh({
                    ...userMessage,
                    [str]:res.data[str]
                })
            }
        })
        addressOpen(false)
    }
    return(
        <div className="changeuserBox">
            {/* 头部
            <header>
                <a className="iconfont icon-zuo" onClick={()=>{
                    props.history.go(-1)
                }}></a>
                <h1>个人资料</h1>
                <div className="rightBox">
                    <a className="iconfont icon-shenglvehao" ></a>
                   更多选项，解开注释即可
                    <div className="more-list">
                            <a>
                                <span className="iconfont icon-gouwuche">
                                    <span className="name">购物车</span>
                                </span>
                            </a>
                            <a>
                                <span className="iconfont icon-fangdajing">
                                    <span className="name">搜索</span>
                                </span>
                            </a>
                            <a>
                                <span className="iconfont icon-leimu">
                                    <span className="name">类目</span>
                                </span>
                            </a>
                            <a>
                                <span className="iconfont icon-fangzi">
                                    <span className="name">首页</span>
                                </span>
                            </a>
                            <a>
                                <span className="iconfont icon-yonghu">
                                    <span className="name">我的</span>
                                </span>
                            </a>
                        </div>
                </div>

            </header> */}
            {/* 主体 */}
            <div className="my-page">
                <div className="list-box">
                    {/*图片上传*/}
                    <input type="file" name="userImg" id="userImgUp" style={{display:'none'}} onChange={userImgUp}/>
                    <a>
                        <label>头像</label>
                        <div className="my-box">
                                <span className="avatar" onClick={()=>{
                                    document.querySelector('#userImgUp').click()
                                }}>
                                    <img src={userMessage.headPortraitUrl} />
                                </span>
                        </div>
                        <span className="iconfont icon-you icon"></span>
                    </a>
                    <a>
                        <label>昵称</label>
                        <div className="my-box" >
                                <span className="text" onClick={userMesUp.bind(this,'nickName','昵称')}>
                                    {userMessage.nickName}
                                </span>
                        </div>
                        <span className="iconfont icon-you icon"></span>
                    </a>
                    <a onClick={()=>{
                        props.history.push({
                            pathname:'/addarea'
                        })
                    }}>
                        <label>地址管理</label>
                        <div className="my-box">
                                <span className="text">
                                   点击查看
                                </span>
                        </div>
                        <span className="iconfont icon-you icon"></span>
                    </a>
                    <a>
                        <label>实名验证</label>
                        <div className="my-box">
                                <span className="text">
                                    未认证
                                </span>
                        </div>
                        <span className="iconfont icon-you icon"></span>
                    </a>
                </div>
                <div className="list-box">
                    <a>
                        <label>手机绑定</label>
                        <div className="my-box">
                                <span className="text" onClick={userMesUp.bind(this,'userPhone','手机')}>
                                    {userMessage.userPhone}
                                </span>
                        </div>
                        <span className="iconfont icon-you icon"></span>
                    </a>
                    <a>
                        <label>邮箱绑定</label>
                        <div className="my-box">
                                <span className="text">
                                    {/* 空 */}
                                </span>
                        </div>
                        <span className="iconfont icon-you icon"></span>
                    </a>
                    <a>
                        <label>密码修改</label>
                        <div className="my-box">
                                <span className="text" onClick={userMesUp.bind(this,'newpsw','密码')}>
                                    点击修改密码
                                </span>
                        </div>
                        <span className="iconfont icon-you icon"></span>
                    </a>
                    <a>
                        <label>账号注销</label>
                        <div className="my-box">
                                <span className="text phone">
                                    拨打400-007-1111
                                </span>
                        </div>
                    </a>
                </div>
                <div className="btn-box">
                    <a onClick={userLoginOut}>退出当前账号</a>
                </div>
            </div>
            <Drawer
                height={'45%'}
                onClose={()=>addressOpen(false)}
                visible={address}
                placement={'bottom'}
                closable={true}
                key={'bottom'}
            >
                <span>正在修改: {edit.name}</span>
                <div style={{padding:'20px',marginTop:'15px'}}>
                    <input type="text" style={{
                        width:'100%',
                        listStyle:'none',
                        border:'rgb(200,200,200) solid 1px',
                        borderRadius:'5px',
                        height:'40px',
                        padding:'0 5px',
                        display: edit.str != 'newpsw' ? '' : 'none'
                    }} value={input} onChange={(e)=>inputCh(e.target.value)}/>

                    <input type="password" style={{
                        width:'100%',
                        listStyle:'none',
                        border:'rgb(200,200,200) solid 1px',
                        borderRadius:'5px',
                        height:'40px',
                        padding:'0 5px',
                        marginTop:'20px',
                        display: edit.str == 'newpsw' ? '' : 'none'
                    }}
                       placeholder='请输入原密码'
                       value={lodpsw}
                       onChange={(e)=>lodpswCh(e.target.value)}/>
                    <input type="password" style={{
                        width:'100%',
                        listStyle:'none',
                        border:'rgb(200,200,200) solid 1px',
                        borderRadius:'5px',
                        height:'40px',
                        padding:'0 5px',
                        marginTop:'20px',
                        display: edit.str == 'newpsw' ? '' : 'none'
                    }}
                           placeholder='请输入新密码'
                           value={newpsw}
                           onChange={(e)=>newpswCh(e.target.value)}/>

                    <input type="password" style={{
                        width:'100%',
                        listStyle:'none',
                        border:'rgb(200,200,200) solid 1px',
                        borderRadius:'5px',
                        height:'40px',
                        padding:'0 5px',
                        marginTop:'20px',
                        display: edit.str == 'newpsw' ? '' : 'none'
                    }}
                           placeholder='请再次输入新密码'
                           value={newpsw2}
                           onChange={(e)=>newpswCh2(e.target.value)}/>
                </div>
                <div style={{marginTop:'30px'}}>
                    <p style={{
                        width:'80%',
                        height:'40px',
                        backgroundColor:'rgb(254, 85, 93)',
                        color:'rgb(250,250,250)',
                        margin:'auto',
                        borderRadius:'5px',
                        lineHeight:'40px',
                        // fontSize:'25px',
                        textAlign:'center'
                    }} onClick={userMesPut.bind(this,edit.str)}>保存</p>
                </div>
            </Drawer>
        </div>
    )
}
ChangeUser = userVerify(ChangeUser)
export default ChangeUser