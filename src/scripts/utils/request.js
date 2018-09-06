// import fetch from 'dva/fetch';

// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }

//   const error = new Error(response.statusText);
//   error.response = response;
//   throw error;
// }

// /**
//  * Requests a URL, returning a promise.
//  *
//  * @param  {string} url       The URL we want to request
//  * @param  {object} [options] The options we want to pass to "fetch"
//  * @return {object}           An object containing either "data" or "err"
//  */
// export default async function request(url, options) {
//   const response = await fetch(url, options);

//   checkStatus(response);

//   const data = await response.json();

//   const ret = {
//     data,
//     headers: {},
//   };

//   if (response.headers.get('x-total-count')) {
//     ret.headers['x-total-count'] = response.headers.get('x-total-count');
//   }

//   return ret;
// }
"use strict";
import fetch from 'dva/fetch';
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function checkError(response,url,requestParams){
  if(response['msg']){
  }
}
function combineUrlParam(url,params){
  if(params){
    if(url.indexOf('?')!=-1){
      url+='&'
    }else{
      url+='?'
    }  
  }
  let newArray = [];
  _.each(params,function(item,key){
    if(item){
      newArray.push(key+'='+item)
    }
  })
  return url+''+newArray.join('&');
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  let requestParams;
  switch (options.method){
    case 'POST':
      requestParams = _.extend({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          // 'Authorization':'Basic b2FhcHA6b2FhcHBodHRw',
          'token':'G5Jkc36XRSZ5GAJ1'
        }
      },options);
      break;
    case 'PUT':
    case 'PATCH':
    case 'DELETE':
      requestParams = options;
      break;
    default:
      requestParams = {
        method: 'GET'
      }
      url = combineUrlParam(url,options.body);
      break;
  }
  try{
    requestParams['credentials'] = 'include';
    // 发起请求
    const response = await fetch(url, requestParams);
    // 校验返回状态
    checkStatus(response,url,requestParams);
    let data;
    if(requestParams.headers["Content-type"]=='text/html'){
      data = await response.text();
    }else{
      data = await response.json();
    }
    // const data = await response.json();
    // const data = await response.json();
    console.log('请求的接口是：',url,'请求的数据：',requestParams,'服务器返回的数据:',data);
    checkError(data,url,requestParams);
    // 拼装返回值
    const ret = {
      data,
      headers: {},
    };
    return ret;
  }
  catch(err){
    return {
      data: {
        errcode: 'no-network',
        errmemo: '请求失败，请检查网络连接123',
        errinfo: err,
        success:false,
        statusText:'请求失败，请检查网络连接234'
      },
      headers: {},
    }
  }
}
