import React,{useState,useEffect,useCallback} from 'react'
import userVerify from '../public/userVerify'
import { Switch,Drawer,message } from 'antd';
import userAjax from "../ajax/user";
import add_site from '../public/ressJSON.json'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/Address.scss'
import Add_css from '../assets/css/Address_sel.module.scss'
function Address (props) {
    let [address,addressOpen] = useState(null) //弹出层开关
    let [ulId,ulIdChange] = useState('set_ul1')
    let [liOver,liOverChange] = useState({
        'set_ul1': 0,
        'set_ul2': 0,
        'set_ul3': 0,
    })
    let [moren,morenCh] = useState(false) //原来高度
    let [topPx,topPxCh] = useState(0)
    let [fangdou,fangdouCh] = useState(false) //防抖
    let [site,siteChange] = useState({
        consignee:'', //收货人
        phone:'', //手机
        district:'', //大地址
        detailedly:'',//详细地址
        postcode:'', //邮编
        keep:false, //默认地址
    })
    useEffect(()=>{
        if(address == null)return
        // if(!document.querySelector('#set_div'))return
        setTimeout(()=>{
            document.querySelector('#set_div').style.opacity = address ? 1 : 0
        },300)
    },[address])
    let {inputChange,setChange,setIn,setOut,saveSite} = useCallback({
        saveSite(){
            let obj = {
                ...site,
                district:add_site[liOver.set_ul1].name + ' / ' + add_site[liOver.set_ul1].c_list[liOver.set_ul2].name + ' / ' + add_site[liOver.set_ul1].c_list[liOver.set_ul2].y_list[liOver.set_ul3].name
            }
            if(!obj.consignee.match(/^[a-z0-9_A-Z\u4e00-\u9fa5]+$/)){
                message.warning('收货人姓名错误')
                return
            }
            if(!obj.phone.match(/^\d+[-]?\d+$/)){
                message.warning('手机号码错误')
                return
            }
            if(!obj.detailedly.match(/\S./)){
                message.warning('请输入详细地址')
                return
            }
            if(!obj.postcode.match(/\d+/)){
                message.warning('请输入正确邮编')
                return
            }
            message.warning('正在添加')
            userAjax.uesrSaveSite(obj).then(res=>{
                if(res.code == '2000'){
                    message.warning('添加成功')
                    siteChange({
                        consignee:'', //收货人
                        phone:'', //手机
                        detailedly:'',//详细地址
                        postcode:'', //邮编
                        keep:false, //默认地址
                    })
                }
            })
        },
        inputChange(key,e){
            siteChange({
                ...site,
                [key]:e.target.value.trim()
            })
        },
        setIn(e){
            if(!moren){
                morenCh(getComputedStyle(document.querySelector(`#set_ul1`),false).top.replace(/px/,''))
            }
            if (e.targetTouches.length == 1) {
                let left = e.changedTouches[0].pageX
                let ulId
                if(left < window.innerWidth / 3){
                    ulId = 'set_ul1'
                    ulIdChange('set_ul1')
                }else if(left > window.innerWidth / 3 * 2){
                    ulId = 'set_ul3'
                    ulIdChange('set_ul3')
                }else {
                    ulId = 'set_ul2'
                    ulIdChange('set_ul2')
                }
                topPxCh (e.changedTouches[0].screenY)
                e.preventDefault();
            }
        },
        setChange(e){
            fangdouCh(true)
            if (e.targetTouches.length == 1) {
                let ul = document.querySelector(`#${ulId}`)
                ul.style.transition = ''

                let li = ul.querySelectorAll('li')
                let Lcss =  getComputedStyle(ul,false)
                let Ltop =  Lcss.top.replace(/px/,'')
                Ltop = +Ltop - (topPx - e.changedTouches[0].screenY)/1.5
                if(Ltop > moren)Ltop = moren
                if(Ltop < moren - Lcss.height.replace(/px/,'')/li.length * (li.length - 1))Ltop = moren - Lcss.height.replace(/px/,'')/li.length * (li.length - 1)
                ul.style.top = Ltop + 'px'
                topPxCh (e.changedTouches[0].screenY)
                ul.endTopCh = Ltop
                e.preventDefault();
            }
        },
        setOut(e){
            // if(!liLength.ulId)return
            let ul = document.querySelector(`#${ulId}`)
            if(!ul.endTopCh)return
            ul.style.transition = 'top 300ms ease'

            let li = ul.querySelectorAll('li')
            clearTimeout(fangdou)
            fangdouCh(setTimeout(()=>{
                let oneHeigth = getComputedStyle(li[0],false).height.replace(/px/,'')
                let number = (moren - ul.endTopCh) % oneHeigth
                if(number >= oneHeigth / 2){
                    number = oneHeigth
                }else {
                    number = 0
                }
                let newTop = ul.endTopCh + (moren - ul.endTopCh) % oneHeigth - number
                let inliLength = parseInt((moren - newTop) / oneHeigth)
                if(oneHeigth == moren)inliLength = 0
                if(newTop == oneHeigth * li.length)inliLength = li.length - 1
                ul.style.top = (-oneHeigth * inliLength) + moren * 1  + 'px'
                if(ulId == 'set_ul1'){
                    liOverChange({
                        ...liOver,
                        'set_ul1':inliLength,
                        'set_ul2':0,
                        'set_ul3':0
                    })
                    document.querySelector(`#set_ul2`).style.top = moren + 'px'
                    document.querySelector(`#set_ul3`).style.top = moren + 'px'
                }else if(ulId == 'set_ul2'){
                    liOverChange({
                        ...liOver,
                        'set_ul2':inliLength,
                        'set_ul3':0
                    })
                    document.querySelector(`#set_ul3`).style.top = moren + 'px'
                }else {
                    liOverChange({
                        ...liOver,
                        'set_ul3':inliLength
                    })
                }
            },150))
        }
    })
        return (
            <div className="addressBox">
                {/* 头部
                <header>
                    <a className="iconfont icon-zuo" onClick={()=>{
                        props.history.go(-1)
                    }}></a>
                    <h1>新增收货地址</h1>

                </header>*/}
                {/* 添加收货地址详细信息显示 */}
                <div className="address-add">
                    <div>
                        <p><span>姓名</span><input type="text" placeholder={'收货人姓名'}  onChange={inputChange.bind(null,'consignee')} value={site.consignee}/></p>
                        <p><span>电话</span><input type="text" placeholder={'收货人手机号'} onChange={inputChange.bind(null,'phone')} value={site.phone}/></p>
                        <p onClick={
                            ()=>{
                                addressOpen(true)
                            }
                        }><span>地区</span><input type="text" disabled placeholder={'选择省/市/区'} value={add_site[liOver.set_ul1].name + ' / ' + add_site[liOver.set_ul1].c_list[liOver.set_ul2].name + ' / ' + add_site[liOver.set_ul1].c_list[liOver.set_ul2].y_list[liOver.set_ul3].name} onChange={()=>''} /></p>
                        <p><span>详细地址</span><input type="text" placeholder={'详细地址'} onChange={inputChange.bind(null,'detailedly')} value={site.detailedly}/></p>
                        <p className={'p5'}><span>邮政编码</span><input type="text" placeholder={'邮政编码'} onChange={inputChange.bind(null,'postcode')} value={site.postcode}/></p>
                    </div>
                </div>
                <p className={'default'}><span>设置为默认收货地址</span><Switch onChange={(br)=>siteChange({...site,keep:br})}/></p>
                <div className='address-append'>
                    <p className='p1' onClick={saveSite}>
                        保存
                    </p>
                    <p className='p2' onClick={()=>siteChange({
                        consignee:'', //收货人
                        phone:'', //手机
                        detailedly:'',//详细地址
                        postcode:'', //邮编
                        keep:false, //默认地址
                    })}>
                        清空
                    </p>
                </div>

                <Drawer
                    height={'45%'}
                    onClose={()=>addressOpen(false)}
                    visible={address}
                    placement={'bottom'}
                    closable={true}
                    key={'bottom'}
                >
                    <div onTouchStart={setIn}
                         onTouchMove={setChange}
                         onTouchEnd={setOut}
                         id={'set_div'}
                         className={Add_css.set_div}
                         // style={{opacity:address ? '1' : '0'}}
                    >
                        <div className={Add_css.div1}></div>
                        <div className={Add_css.div2}></div>
                        <p></p>
                        <ul id={'set_ul1'}  className={Add_css.ul1}>
                            {
                                add_site.map((site,index)=><li key={site.name} style={{color:liOver.set_ul1 == index ? 'red' : ''}}>{site.name}</li>)
                            }
                        </ul>
                        <ul id={'set_ul2'} className={Add_css.ul2}>
                            {
                                add_site[liOver.set_ul1].c_list.map((site,index)=><li key={site.name} style={{color:liOver.set_ul2 == index ? 'red' : ''}}>{site.name}</li>)
                            }
                        </ul>
                        <ul id={'set_ul3'} className={Add_css.ul3}>
                            {
                                add_site[liOver.set_ul1].c_list[liOver.set_ul2].y_list.map((site,index)=><li key={site.name} style={{color:liOver.set_ul3 == index ? 'red' : ''}}>{site.name}</li>)
                            }
                        </ul>
                    </div>
                </Drawer>
            </div>
        )
}
Address = userVerify(Address)
export default Address