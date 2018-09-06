import request from '../utils/request';

window.basurl = "https://www.easy-mock.com/mock/5994f61b059b9c566dc0ffe8/eps";
import qs from 'qs';

export function getData(param) {
  console.log('getData', param);
  let data = param;
  return request(`/agent/todolist`, {
    method: 'POST',
    // headers:{"Content-type":"application/json"},
    body: JSON.stringify(param)
  });
}

export function getResult(params) {
  console.log('params', params)
  return request('/agent/todofailedinfo', {
    // return request('/daditestgroup/ccicsit/expreportapprovalerrorservicerest/Restful', {
    method: 'POST',
    body: JSON.stringify(params)
  })
}