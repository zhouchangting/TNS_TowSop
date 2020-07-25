import React, {useEffect, useCallback} from "react";
import store from "../redux/store";
import {message} from 'antd';
import utils from "./utils";
import userAjax from '../ajax/user'

function loginVerify(ReactDom) {
	return function (props) {
		let username = utils.getCookie('username') === "undefined" ? '获取错误,请刷新' : utils.getCookie('username')
		let nickName = utils.getCookie('nickName') === "undefined" ? '未设置' : utils.getCookie('nickName')
		let userPhone = utils.getCookie('userPhone') === "undefined" ? '未设置' : utils.getCookie('userPhone')
		let regTiem = utils.getCookie('regTiem') === "undefined" ? '未设置' : utils.getCookie('regTiem')
		let headPortraitUrl = utils.getCookie('headPortraitUrl') === "undefined" ? 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595252490592&di=555bd85304091890024a944aa72aa597&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20181227%2F19%2F1545910900-bhikFXDBWf.jpeg' : utils.getCookie('headPortraitUrl')
		let userMessage = {
			username,
			nickName,
			userPhone,
			regTiem,
			headPortraitUrl,
		}
		let propsNew = {
			...props,
			userMessage
		}
		useEffect(() => {
			if (!store.getState().uesrLogin.userLogin) {
				if (utils.getCookie('token')) {
					userAjax.tokenTrue(utils.getCookie('token')).then(res => {
						if (res.code == '2000') {
							store.dispatch({
								type: 'userLoginIn',
								userLogin: true,
							})
						} else {
							store.dispatch({
								type: 'userLoginOut'
							})
							store.dispatch({
								type: 'userLoginIn',
								userLogin: false
							})
							let key = store.getState().uesrLogin.hash[1] ? store.getState().uesrLogin.hash[1].key : '/'
							let url = ['/login'].some(hash => hash == key) ? '/' : '/login'
							if (url == '/login') message.warning('请先登录');
							props.history.push({
								pathname: url
							})
						}
					})
				} else {
					let key = store.getState().uesrLogin.hash[1] ? store.getState().uesrLogin.hash[1].key : '/'
					let url = ['/login'].some(hash => hash == key) ? '/' : '/login'
					if (url == '/login') message.warning('请先登录');
					props.history.push({
						pathname: url
					})
				}
			}
		}, [])
		return <ReactDom {...propsNew}/>
	}
}

export default loginVerify















