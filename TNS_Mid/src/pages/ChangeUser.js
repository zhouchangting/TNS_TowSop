import React,{Component} from 'react'
import '../assets/js/flexible'
import '../assets/css/reset.css'
import '../assets/css/ChangeUser.scss'


class ChangeUser extends Component{
    render () {
        return(
            <div className="changeuserBox">
                {/* 头部 */}
                <header>
                    <a className="iconfont icon-zuo"></a>
                    <h1>个人资料</h1>
                    <div className="rightBox">
                        <a className="iconfont icon-shenglvehao"></a>
                        {/* 更多选项，解开注释即可 */}
                        {/* <div className="more-list">
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
                        </div> */}
                    </div>
                </header>
                {/* 主体 */}
                <div className="my-page">
                    <div className="list-box">
                        <a>
                            <label>头像</label>
                            <div className="my-box">
                                <span className="avatar">
                                    <img src="//img.yihaodianimg.com/myyhd/member/images/peopleicon_02.gif" />
                                </span>
                            </div>
                            <span className="iconfont icon-you icon"></span>
                        </a>
                        <a>
                            <label>昵称</label>
                            <div className="my-box">
                                <span className="text">
                                    1581*****22@phone
                                </span>
                            </div>
                            <span className="iconfont icon-you icon"></span>
                        </a>
                        <a>
                            <label>地址管理</label>
                            <div className="my-box">
                                <span className="text">
                                    {/* 空 */}
                                </span>
                            </div>
                            <span className="iconfont icon-you icon"></span>
                        </a>
                        <a>
                            <label>实名验证</label>
                            <div className="my-box">
                                <span className="text">
                                    {/* 空 */}
                                </span>
                            </div>
                            <span className="iconfont icon-you icon"></span>
                        </a>
                    </div>
                    <div className="list-box">
                    <a>
                            <label>手机绑定</label>
                            <div className="my-box">
                                <span className="text">
                                    1581*****22
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
                                <span className="text">
                                    {/* 空 */}
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
                        <a>退出当前账号</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangeUser