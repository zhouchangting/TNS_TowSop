export default {
	//-------------------------------------------------------------------
	//封装获取cookie方法
	//@param key    <string>  传入要获取的名字,返回值,如果没有,返回 undefined
	getCookie: function (key) {
		var arr = document.cookie.split(';')
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].match(RegExp(`${key}=`))) {
				return decodeURIComponent(arr[i].slice(arr[i].indexOf('=') + 1))
			}
		}
		return undefined
	},
	//封装设置cookie方法
	//@param key              <string>  传入要设置的名字
	//@param value            <string>  传入要设置的值
	//@param [expires]        <number>  传入要设置的过期时间,单位:天,只能传入数字 可选
	//@param [path]           <string>  传入要设置的路径,可选
	setCookie: function (key, value, expires = 'Session', path = '/') {
		if (expires !== 'Session') {
			var date = new Date()
			date.setDate(date.getDate() + expires)
			expires = date.toUTCString()
		}
		document.cookie = `${key}=${encodeURIComponent(value)};expires=${expires};path=${path}`
	},


}