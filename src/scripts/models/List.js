import * as DataService from '../services/List';
import * as ListInfo from '../services/ListInfo';


export default {
	namespace: 'list',
	state: {
		pageNumber: 1,//当前页面
		pageShowNumber: 100,//一页显示的数据量
		standbyStates: 'N',//待办已办标记, Y（已办）,N（待办）
		approveEmployeeCode: '',//当前审批人工号
		dueAmountFrom: '',//总金额从
		dueAmountTo: '',//总金额到
		employeeCode: '',//单据提交人工号
		// employeeName:'',//单据提交人名字
		description: '',//事由描述,可填写部分事由，作模糊查询

		scrollTop: 0,

		totalSize: '',//总数量
		showChoose: false,//显示筛选
		// propsName:'',//提交人姓名
		// numStart:'',//搜索金额
		// numEnd:'',//搜索金额
		isBulk: false,//是否批量
		isFixed: false,//是否固定在最上面
		showReject: '',//全选的提示框是否显示
		isAll: false,//是否点击全选,
		showReason: '',//事由
		dataList: [],
		isGetData: false,//是否重新获取数据
		showload: false,
		// dataList:dataList,
	},
	reducers: {
		setKeyValue(state, action) {
			// console.log('setKeyValue',state,action);
			return { ...state, ...action.payload };
		},

	},
	effects: {
		*getDataList({ payload, dispatch }, { call, put, select }) {
			let params = payload.params;

			// console.log('getParams',params,datas);
			let page = params.requestBody.pageNumber;
			// let dataList=yield call(DataService.getApply);
			let dataList = yield call(DataService.getData, params);
			let total = dataList.data.responseBody.total;
			console.log('getDataList', dataList.data.responseBody.lineDetail);

			if (total > 0) {
				let dataL = dataList.data.responseBody.lineDetail;
				let newDate = dataL instanceof Array ? dataL : [dataL];
				let preData = yield select();
				console.log('preData', preData);
				let preDataList = preData.list.dataList;
				let resultData;
				if (page != 1) {
					resultData = preDataList.concat(newDate);
				} else {
					resultData = newDate;
				}
				dispatch({
					type: 'list/setKeyValue',
					payload: {
						dataList: resultData,
						// dataList:dataL instanceof Array ? dataL : [dataL],
						totalSize: total,
						isGetData: false,
						showload: false
					}
				})
			} else {
				dispatch({
					type: 'list/setKeyValue',
					payload: {
						dataList: [],
						// dataList:dataL instanceof Array ? dataL : [dataL],
						totalSize: 0,
						isGetData: false,
						showload: false

					}
				})
			}
			// 
			console.log('dataList', dataList);
		},
		*getApprove({ payload }, { call, put }) {
			let params = payload.params;
			console.log('000getApprove', params)
			let dataList = yield call(ListInfo.getApprove, params);
			console.log('222getApprove', dataList);
			let data = dataList.data.responseHead;
			if (data.status == 0) {
				// jw.closeWebView();
				yield put({
					type: 'setKeyValue',
					payload: {
						showText: '',
						showConfirm: '',
						isGetData: true,
						showload: false
					}
				})
			} else {
				yield put({
					type: 'setKeyValue',
					payload: {
						showText: data.appMessage,
						showConfirm: 'know',
						showload: false
					}
				})
			}
			// yield put({
			// 	type: 'setKeyValue',
			// 	payload: {
			// 		showload: false,
			// 		isGetData: true,
			// 		showText: '',
			// 		showConfirm: ''
			// 	}
			// })
			// let url = window.location.origin + '#/list/result';
			// jw.pushWebView(url);
		}
	}
}