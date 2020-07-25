import React, {useCallback, useEffect, useState} from 'react'
import userVerify from '../public/userVerify'
import userAjax from "../ajax/user";
import {Spin, Switch} from "antd";
import addRess from '../assets/css/Address_sel.module.scss'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/AddArea.scss'
function AddArea (props) {
    let [loading,loadingCh] = useState(false)
    let [areaData,areaDataCh] = useState([])
    let {areaKeep,delUserArea} = useCallback({
        areaKeep(id,keep){
            loadingCh(true)
            userAjax.userArea({id,keep}).then(res=>{
                if(res.code == '2000'){
                    areaDataCh(res.data)
                }
                loadingCh(false)
            })
        },
        delUserArea(id){
            loadingCh(true)
            userAjax.delUserArea(id).then(res=>{
                if(res.code == '2000'){
                    areaDataCh(res.data)
                }
                loadingCh(false)
            })
        }
    })
    useEffect(()=>{
        loadingCh(true)
        userAjax.userGetSite().then(res=>{
            if(res.code == '2000'){
                areaDataCh(res.data)
            }
            loadingCh(false)
        })
    },[])
        return (
        <Spin  spinning = {loading}>
            <div className="addareaBox">
                {/* 头部 */}
                {/*<header>*/}
                {/*    <a className="iconfont icon-zuo" onClick={()=>{*/}
                {/*        props.history.go(-1)*/}
                {/*    }}></a>*/}
                {/*    <h1>地址管理</h1>*/}
                {/*    /!* <div className="rightBox">*/}
                {/*        <a>注册</a>*/}
                {/*    </div> *!/*/}
                {/*</header>*/}
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
                {
                    areaData.map((item,index)=>(
                        <div key={index} className={addRess.areaDiv}>
                            <p><span>收货人:</span> <span>{item.consignee}</span> </p>
                            <p><span>收货地址:</span> <span>{item.district + '' + item.detailedly}</span></p>

                            <p><span>手机号:</span> <span>{item.phone}</span> </p>
                            <p><span>邮编:</span> <span>{item.postcode}</span> </p>
                            <p><span>是否默认:</span> <Switch checked={item.keep != 'false'} onChange={(e)=>areaKeep(item.id,e)}/>  </p>

                            <p style={{color:'red',textAlign: 'right'}} onClick={()=>delUserArea(item.id)}>删除地址</p>
                        </div>
                    ))
                }
                <section className="addarea">
                    <a onClick={()=>{
                        props.history.push({
                            pathname:'/address'
                        })
                    }}>
                        +添加收货地址
                    </a>
                </section>
            </div>
        </Spin>
        )
}
AddArea = userVerify(AddArea)
export default AddArea