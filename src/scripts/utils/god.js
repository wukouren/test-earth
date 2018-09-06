import fetch from 'dva/fetch';
let md5 = require('md5')
import {
  Time,
  PATH,
  PATH_login,
  PATH_login2
} from './../request_config'
console.log(PATH_login, 'asdjaoisdjoi')
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
// 处理请求报文
export default async function request(mapCase, options) {
  // options前端请求时传递的具体参数
  let Content = JSON.stringify({
    appRequestVO: {
      requestCode: mapCase,
      requestParams: options
    }
  })
  const ContentLength = Content.length
  //生成signature
  function signature(Content, Time) {
    return 'DLMAppServicerequestHandling' + Content + 'appKey=DLM_SCW_APP_REQUEST_HANDLINGformat=jsontimestamp=' + Time + 'signatureMethod=md5version=1RfXOjO07';
  }
  var StrMd5 = md5(signature(Content, Time))
  var requestParams = {
    method: 'POST', // 所有的method都是post 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Content-Length': ContentLength,
      'appKey': 'DLM_SCW_APP_REQUEST_HANDLING',
      'timestamp': Time(),
      'version': '1',
      'format': 'json',
      'signatureMethod': 'md5',
      'Signature': StrMd5.toLocaleUpperCase()
    },
    body: Content
  }
  // 所有的url只有一个hangling 所以把url放在request.js中处理
  let response = null
  if (mapCase == "1128") {
    console.log(PATH_login2, 'PATH_login2')
    response = await fetch(PATH_login2, requestParams);
  } else {
    response = await fetch(PATH_login, requestParams);
  }
  checkStatus(response);
  let data = await response.json(); // response.json()是将promise对象返回的结果body值序列化成json字符串
  // console.log(data, '我是调json之后的')
  // let txt = (data.result).replace( /\\/g,"")
  if (data.errorCode != 0) {
    console.log(data.errorMessage, 'data.errorMessage', data, 'data')
    if (data.errorMessage) {
      alert('服务器错误:' + data.errorMessage)
    } else if (data.errorMsg) {
      alert('服务器错误:' + data.errorMsg)
    } else {

      data = JSON.stringify(data)
      alert('!!服务器异常!!:' + data)
    }
    return
  }
  // console.log(JSON.parse(txt),'转成对象')
  const ret = {
    data,
    headers: {},
  };
  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }
  return ret;

}
