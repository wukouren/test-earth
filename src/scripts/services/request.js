import fetch from 'dva/fetch';
import {xmlToString,loadXMLDoc} from './../components/Common/Common';
var mc_convert = require('xml-js')

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
// 处理请求报文
export default async function request(options) {
  let response=null
  var requestParams = new Request(options.url,{
    method:options.method , 
    // mode:'cors',
    // headers: new Headers({
    //   'Access-Control-Allow-Origin': '*',
    // }),
    body: options.data
  })
  // await 异步语法 获取fetch返回的promise对象
  response = await fetch(requestParams);  
  checkStatus(response);
  console.info(response,'response')
  // response.text()是将promise对象返回的结果body值序列化成字符串
  let data = await response.text();
  // 将xml结构的 字符串 转换成 js对象
  data=mc_convert.xml2js(data,{compact:true,spaces:4})
  const ret = {
    data,
    headers: {},
  };
  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }
  return ret;
}
