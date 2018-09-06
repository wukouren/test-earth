import * as DataService from '../services/ListInfo';
import { getUsers } from '../constant';

let data = {
	"responseHead": {
		"seqNo": "33879790-48d8-4471-baea-65556c190069",
		"status": "0",
		"esbCode": "ESB-000000",
		"esbMessage": "ESB服务成功",
		"appCode": "1"
	},
	"responseBody": [
		{
			"documentType": "EXP_REPORT",
			"documentNumber": "EJE1101000018020016",
			"documentDate": "2018-02-23",
			"employeeCode": "6101020301",
			"employeeName": "王春晖",
			"operationDate": "2018-03-15",
			"operationCode": "拒绝"
		},
		{
			"documentType": "EXP_REPORT",
			"documentNumber": "EJE1101000018020016",
			"documentDate": "2018-02-23",
			"employeeCode": "8000534786",
			"employeeName": "admin",
			"operationDate": "2018-03-12",
			"operationCode": "同意",
			"description": "2"
		},
		{
			"documentType": "EXP_REPORT",
			"documentNumber": "EJE1101000018020016",
			"documentDate": "2018-02-23",
			"employeeCode": "8000087985",
			"employeeName": "admin",
			"operationDate": "2018-03-12",
			"operationCode": "同意",
			"description": "2"
		},
		{
			"documentType": "EXP_REPORT",
			"documentNumber": "EJE1101000018020016",
			"documentDate": "2018-02-23",
			"employeeCode": "8000611467",
			"employeeName": "admin",
			"operationDate": "2018-03-12",
			"operationCode": "同意",
			"description": "2"
		},
		{
			"documentType": "EXP_REPORT",
			"documentNumber": "EJE1101000018020016",
			"documentDate": "2018-02-23",
			"employeeCode": "8000166961",
			"employeeName": "admin",
			"operationDate": "2018-03-12",
			"operationCode": "同意",
			"description": "2"
		}
	]
};
// let dataAll=JSON.parse(JSON.stringify(data));
// let historyData=dataAll.responseBody instanceof Array ?  dataAll.responseBody : [dataAll.responseBody];


export default {
	namespace: 'history',
	state: {
		data: '',//
		showLoad: false
		// data:historyData,//
	},
	reducers: {
		setKeyValue(state, action) {
			console.log('setKeyValue', state, action);
			return { ...state, ...action.payload };
		}
	},
	effects: {
		*getHistory({ payload }, { call, put }) {
			let params = payload.params;
			console.log('getHistory', params)
			let dataList = yield call(DataService.getHistory, params);
			console.log('getHistory222', dataList);
			let data = dataList.data.responseBody;
			let datas = data ? (data instanceof Array ? data : [data]) : '';

			let dataCode = [];
			if (datas && datas.length) {
				_.each(datas, function (item, i) {
					dataCode.push(item.employeeCode);
				})
			}
			yield put({
				type: 'setKeyValue',
				payload: {
					data: datas,
					showLoad: false
				}
			})
		}
	}
}