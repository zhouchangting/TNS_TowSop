import React, {useState, useEffect, useContext, useMemo, useCallback} from "react";
import store from "./redux/store";
import {withRouter} from 'react-router-dom'

function OnHash(props) {
	// useEffect(() => {
		let myHistoryPush = window.history.pushState
		window.history.pushState = function (state, data, hash) {
			myHistoryPush.call(this, state, data, hash)
			let olUrl = store.getState().uesrLogin.hash[store.getState().uesrLogin.hash.length - 1]
			store.dispatch({
				type: 'hashchange',
				hash: hash.toLowerCase()
			})
			let noInURL = ['/shopcar']
			let noOutURL = ['/login', '/reg']
			if (noInURL.some(url => url == hash) && noOutURL.some(url => url == olUrl)) {
				props.history.push({
					pathname: '/'
				})
			} else {
				if (noInURL.some(url => url == hash)){
					props.history.push({
						pathname: '/login'
					})
				}
			}
		}
	// }, [])
	return (
		<></>
	)
}

OnHash = withRouter(OnHash)
export default OnHash