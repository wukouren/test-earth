import * as DataService from '../services/List';


export default {
  namespace: 'result',
  state: {
    resultData: '',
    showText: '',
    showConfirm: ''
  },
  reducers: {
    setKeyValue(state, action) {
      console.log('toggleData', state, action);
      return { ...state, ...action.payload };
    }
  },
  effects: {
    *getResult({ payload }, { call, put }) {
      // console.log('ggg', payload);
      let data = yield call(DataService.getResult, payload);
      console.log('ss', data);
      let newData = data.data;
      if (newData.responseHead.status == '0') {
        let resData = newData.responseBody;
        yield put({
          type: 'result/setKeyValue',
          payload: {
            resultData: resData
          }
        })
      } else {
        yield put({
          type: 'result/setKeyValue',
          payload: {
            showText: data.appMessage,
            showConfirm: 'know',
          }
        })
      }
    }
  }
}