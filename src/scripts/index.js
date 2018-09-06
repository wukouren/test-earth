import 'babel-polyfill';
import dva from 'dva';
import createLoading from 'dva-loading';
const app = dva();
window.dvaApp = app;
window.base64decode = function (str) {
	let c1, c2, c3, c4;
	let base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
	let i, len, out;
	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		/* c1 */
		do {
			c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		}
		while (i < len && c1 == -1);
		if (c1 == -1)
			break;
		/* c2 */
		do {
			c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		}
		while (i < len && c2 == -1);
		if (c2 == -1)
			break;
		out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
		/* c3 */
		do {
			c3 = str.charCodeAt(i++) & 0xff;
			if (c3 == 61)
				return out;
			c3 = base64DecodeChars[c3];
		}
		while (i < len && c3 == -1);
		if (c3 == -1)
			break;
		out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
		/* c4 */
		do {
			c4 = str.charCodeAt(i++) & 0xff;
			if (c4 == 61)
				return out;
			c4 = base64DecodeChars[c4];
		}
		while (i < len && c4 == -1);
		if (c4 == -1)
			break;
		out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
	}
	return out;
}
var jschars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
window.generateMixed = function (n) {
	var res = "";
	for (var i = 0; i < n; i++) {
		var id = Math.ceil(Math.random() * 61);
		res += jschars[id];
	}
	return res;
}
window.id = window.generateMixed(16);
window.upTabsData = function (namespace, type, data) {
	if (type == 'publish') {
		let datas = {
			events: namespace,
			uid: window.id,
			type: 'publish',
			data: _.extend({}, data),
		}
		jw.shareData(datas)
	} else if (type == 'cache') {
		let datas = {
			namespace: namespace,
			uid: window.id,
			type: type || 'publish',
			id: 'tab:cache',
			data: data,
		}
		window.localstore = new Store('Joywok:cache:tabs:' + namespace);
		window.localstore.update(datas);
	} else {
		let nowApplyData = window.dvaApp._store.getState()[namespace];
		let datas = {
			namespace: namespace,
			uid: window.id,
			type: type || 'publish',
			id: 'cache',
			data: _.extend({}, nowApplyData, data),
		}
		window.localstore = new Store('Joywok:cache:' + namespace);
		window.localstore.update(datas);
		jw.shareData(datas)
	}
}
window.subShareData = function (data) {
	if (typeof (data) == 'string') {
		data = JSON.parse(data);
	}
	if (data['uid'] != window.id) {
		if (data['type'] == 'publish') {
			console.log(data['events'], data['data'], 'events');
			PubSub.publish(data['events'], data['data']);
		} else {
			if (data['data']["targetModel"]) {
				let newData = {};
				_.each(data["data"], function (i, key) {
					if (key != 'targetModel') {
						newData[key] = i
					}
				})
				app._store.dispatch({
					type: data['data']["targetModel"] + "/resetAllData",
					data: newData
				})
			}
			let datas = {
				uid: window.id,
				id: 'cache',
				data: data['data']
			}
			window.localstore = new Store('Joywok:cache:' + data['namespace']);
			window.localstore.update(datas);
			app._store.dispatch({
				type: data["type"],
				data: data['data']
			})
		}
	}
}

window.localstoreUserinfo = new Store('Joywok:cache:userinfo');

jw.ready = function () {
	// alert('44');
	// return;
	window.requestHead = {
		classCode: "",
		consumerID: "oaapp",
		consumerSeqNo: "",
		providerID: "",
		regionCode: "",
		riskCode: "",
		seqNo: "",
		version: ""
	};
	jw.setBarBg({
		background: '33a6e2'
	})
	typeof (jw.setHeaderLine) == 'function' ? jw.setHeaderLine({ status: 0 }) : '';

	jw.getInfo({
		success: function (res) {
			console.log('res22', res);
			window.upTabsData('personData', 'cache', res.info);
			//  window.localstoreUserinfo.update({
			//   id:'cache',
			//   data:res.info
			// });
			// localStorage.setItem('personInfo',JSON.stringify(res.info));
			jwstat = true;
			app.router(require('./router'));
			app.start("#root");
		}
	})
}
// setTimeout(function(){
// console.log('333355566-----');
jw.config({
	debug: false, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，
	//可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
	appid: '77138353aa7779d2db90f299c22cb3c4', // 必填，公众号的唯一标识
	timestamp: 0, // 必填，生成签名的时间戳（10 位）
	nonceStr: '', // 必填，生成签名的随机串
	signature: '', // 必填，签名
	app_access_token: '', // 免登录后获取的 token ，应用于上传文件，下载文件等功能
	corpid: 'x40bWDE7TnvvXaH4' // 企业 ID
});
// },1500)






