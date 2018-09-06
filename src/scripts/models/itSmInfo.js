export default {
  namespace: 'itSmInfo',
  state: {
    dataInfo: '',
    showWhich: '',//下面的都是弹框的内容
    imgUrl: '',
    approve: '',
    resultStatus: '',//1表示成功 2表示失败 3表示正在提交中
  },
  reducers: {
    setKeyValue(state, action) {
      console.log('setKeyValue', state, action);
      return { ...state, ...action.payload }
    }
  },
  effect: {

  }
}


