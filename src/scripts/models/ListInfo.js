import * as DataService from '../services/ListInfo';


// xml 转 string
// function xmlToString(xmlData) {  
//     var xmlString;  
//     //IE  
//     if (window.ActiveXObject){  
//         xmlString = xmlData.xml;  
//     }  
//     // code for Mozilla, Firefox, Opera, etc.  
//     else{  
//         xmlString = (new XMLSerializer()).serializeToString(xmlData);  
//     }  
//     return xmlString;  
// } 
// // 加载xml
// function loadXMLDoc(dname) {
//     let xhttp,
//         loadXMLDoc
//     if(window.XMLHttpRequest) {
//          xhttp = new XMLHttpRequest();
//     } else {
//         loadXMLDoc
//         xhttp = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     xhttp.open("GET", dname, false);
//     xhttp.send();
//     return xhttp.responseXML;
// }


export default {
	namespace: 'listInfo',
	state: {
		// personInfo:personInfo,//个人信息
		personInfo: '',//个人信息
		// personImg:localStorage.getItem('personInfo')?JSON.parse(localStorage.getItem('personInfo')) : '',
		personImg: '',

		// feeInfo:feeInfo,//报销单的费用信息，
		feeInfo: '',//报销单的费用信息，
		showAllList: false,//报销单是否显示全部信息
		showDetail: false,//报销单是否显示详细信息即费用明细
		detailInfo: '',//报销单费用明细
		showSecond: false,//报销单的收款信息是否显示

		dataInfo: '',//收款，借款信息（3个表单数据都有信息）
		// dataInfo: dataInfo,//收款，借款信息（3个表单数据都有信息）
		showAttention: false,
		describe: '',//描述的弹框内容
		showReject: '',
		showConfirm: '',//弹框
		showText: '',//弹框为know，显示的内容

		showError: '',//接口报错信息
		showToast: '',//调同意和不同意接口报错的信息

		attachData: [],//附件的信息
		showLoad: false,
		// data:'',

	},
	reducers: {
		setKeyValue(state, action) {
			console.log('toggleData', state, action);
			return { ...state, ...action.payload };
		}
	},
	effects: {
		*getDataList({ payload, dispatch }, { call, put }) {
			let params = payload.params;
			// console.log('000',payload,dispatch);
			// let dataList=yield call(DataService.getApply);
			let dataList = yield call(DataService.getData, params);
			console.log('222', dataList);

			let data = dataList.data;
			let dataHeader = data.responseHead;
			if (dataHeader.status == 0) {
				let personInfo = data.responseBody ? data.responseBody : '';
				let dataInfo = personInfo.paymentDetail ? (personInfo.paymentDetail instanceof Array ? personInfo.paymentDetail : [personInfo.paymentDetail]) : '';
				// console.log('paymentDetail',dataInfo);
				let feeInfo = personInfo.lineDetail ? (personInfo.lineDetail instanceof Array ? personInfo.lineDetail : [personInfo.lineDetail]) : '';
				localStorage.setItem('applyDate', personInfo.reportDate);
				localStorage.setItem('documentNumber', personInfo.documentNumber);
				localStorage.setItem('documentType', personInfo.documentType);

				yield put({
					type: 'setKeyValue',
					payload: {
						personInfo: personInfo,
						dataInfo: dataInfo,
						feeInfo: feeInfo,
						showLoad: false,
					}
				})
				let date = personInfo.reportDate;
				console.log('ss', personInfo, typeof date);
				//获取附件的信息
				let newDate = date.split('-').join('');
				dispatch({
					type: 'listInfo/getAttach',
					payload: {
						params: {
							comCode: personInfo.companyCode,//机构号码即公司代码
							operator: personInfo.employeeCode,//操作员ID  即
							operatorName: personInfo.employeeName,//操作员姓名  即
							operatorRole: personInfo.operatorRoleCode,//操作角色   即
							appCode: personInfo.businessCode,//业务类型    即
							busiDate: newDate,//分区年份   即报销日期
							businessNo: 'HEC' + personInfo.documentNumber,//业务编号  即单据编号
						}
					}
				})
			} else {
				yield put({
					type: 'setKeyValue',
					payload: {
						showError: dataHeader.appMessage,
						showLoad: false,
					}
				})
			}

		},
		*getAttach({ payload }, { call, put }) {
			let params = payload.params;
			let attachData = yield call(DataService.getAttach, params);
			let data = attachData.data;
			//  XMLSerializer xmlSerializer=new XMLSerializer();
			var mc_convert = require('xml-js');
			data = mc_convert.xml2js(data, { compact: true, spaces: 4 });
			console.log('yyyy--', data);
			let headData = data['soap:Envelope']['soap:Body']['ns2:H5imgQueryDownResponse']['ns2:responseHead'];
			let statusText = headData['ns1:status']['_text'];
			let esbMessage = headData['ns1:esbMessage']['_text'];
			let appMessage = headData['ns1:appMessage']['_text'];
			if (statusText == 0) {
				let responseData = data['soap:Envelope']['soap:Body']['ns2:H5imgQueryDownResponse']['ns2:responseBody'];
				console.log('responseBody', responseData); let size = responseData['ns2:size']['_text'];
				let resData = responseData['ns2:imageNodes'] ? (responseData['ns2:imageNodes'] instanceof Array ? responseData['ns2:imageNodes'] : [responseData['ns2:imageNodes']]) : '';
				let imgData = [];
				if (resData) {
					_.each(resData, function (item, i) {
						let uploadTime = item['ns2:extendFields']['2']['ns2:value']['_text'];
						let uploadUserCode = item['ns2:extendFields']['1']['ns2:value']['_text'];
						let picPath = item['ns2:picPath']['_text'];
						//获取miniType的值
						// let picA = picPath.split('?');
						// let newPicA = base64decode(picA[picA.length - 1]).split('.');
						// let mimeType = newPicA[newPicA.length - 1];
						let mimeT = item['ns2:orgFileName']['_text'].split('.');
						let mimeType = mimeT[1];
						let newPathArray = picPath.split('/');
						newPathArray[2] = "106.15.195.115:25175";
						// newPathArray[2] = "139.224.241.62:25175";//生产环境的外网访问的地址
						let thumbPath = item['ns2:thumbnailPath']['_text'];
						let newThumbArray = thumbPath.split('/');
						// newThumbArray[2] = "106.15.195.115:25175";
						newThumbArray[2] = "139.224.241.62:25175";//生产环境的外网访问的地址
						imgData.push({
							picPath: item['ns2:picPath']['_text'],
							thumbPath: item['ns2:thumbnailPath']['_text'],
							// picPath1: newPathArray.join('/'),
							thumbPath1: newThumbArray.join('/'),
							name: item['ns2:orgFileName']['_text'],
							// name: item['ns2:picName']['_text'],
							mime: mimeType,
							uploadUserCode: uploadUserCode,
							uploadTime: uploadTime
						})
					})
				}
				console.log('imgData', imgData);
				let userCodeArr = [];
				let userName = [];
				if (imgData && imgData.length) {
					_.each(imgData, function (item, i) {
						userCodeArr.push(item.uploadUserCode);
					})
					//获取userName
					jw.getUsers({
						users: userCodeArr.join(','),
						type: 'num'
					}, {
							success: function (res) {
								console.log('333', res);
								userName = res.data;
								_.each(imgData, function (item, i) {
									item.uploadUserName = userName[i]['name'];
								})
							}
						})
					console.log('userCodeArr', userCodeArr);

					console.log('end', imgData)
				}

				yield put({
					type: 'setKeyValue',
					payload: {
						attachData: imgData,
						showLoad: false,
					}
				})
				// let imageNode=data['soap:Envelope'][]
				console.log('attach', attachData, size, resData, imgData);
			} else if (statusText == 1) {
				//ESB报错，所以取esbMessage
				yield put({
					type: 'setKeyValue',
					payload: {
						showText: esbMessage,
						showConfirm: 'know',
						showLoad: false,
					}
				})
			} else {
				//2为应用失败取appMessage
				yield put({
					type: 'setKeyValue',
					payload: {
						showText: appMessage,
						showConfirm: 'know',
						showLoad: false,
					}
				})
			}



		},
		*getApprove({ payload }, { call, put }) {
			let params = payload.params;
			console.log('000getApprove', params)
			let dataList = yield call(DataService.getApprove, params);
			console.log('222getApprove', dataList);
			let data = dataList.data.responseHead;
			if (data.status == 0) {
				yield put({
					type: 'setKeyValue',
					payload: {
						showText: '',
						showConfirm: '',
						showLoad: false,
					}
				})
				window.upTabsData('reload', 'publish', { reload: true });
				jw.closeWebView();
			} else {
				yield put({
					type: 'setKeyValue',
					payload: {
						showText: data.appMessage,
						showConfirm: 'know',
						showLoad: false,
					}
				})
			}
		}
	}
}