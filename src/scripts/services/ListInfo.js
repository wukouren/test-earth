// 待办接口
// import request from '../utils/EpsRequest';
import request from '../utils/request';

window.basurl = "https://www.easy-mock.com/mock/5994f61b059b9c566dc0ffe8/eps";
import qs from 'qs';

// export function getData(parame) {
//   console.log('ssssccc',parame);
//   return request(`/APITEST/Api/BasicData/GetTaskList?${qs.stringify(parame)}`, {
//     method: 'GET',
//   });
// }
// let a={"WFCode":"HR032Bat","ProcID":"","app_date":"2018.03.15","app_hrid":"350006","app_uid":"7971B015-A639-4AAC-90E2-D02DAA5B8FC8","app_name":"胡国良","app_dept":"信息系统部","app_deptcd":"26224B36-EA2F-4BFB-B85D-4638FC27B253","app_sect":"运营信息科","app_sectcd":"0C6C247E-6970-499E-BAF5-72E8CD51B089","app_area":"","app_areaid":"","jobname":"应用系统工程师","jobgroup":"P","jobid":"B724A82E-4A44-4137-AF69-F22952B03AEC","apptel":"13816815891","haveannual":"15.0","haveholiday":"5.0","useannual":"17.0","canuseday":"1.0","haveoutday":"10.0","syannual":"0.0","syholiday":"1.0","sywpday":"8.0","syrest":"-13.5","appingRestday":"","nowappingRestday":"","nowleavetorest":"","restall":"2.0","ljsickday":"5.0","ljsicktime":"16.0","ljleaveday":"1.0","leaveday":1,"leavedaytime":0,"leavetorest":"","Reason":"尺寸vvv","attlist":"","Leave_det":[{"vacation":"年休假","vacationid":"Annual","startdt":"2018-03-15 10:00","enddt":"2018-03-15 10:30","leaveday":"1","leavedaytime":""}],"code":"ZBqncU18xzh6poGW"};

export function getApprove(params) {
  console.log('getApprove', params);
  return request(`/agent/todooperation`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}
export function getData(param) {
  console.log('getData', param);
  let data = param;
  return request(`/agent/tododetail`, {
    method: 'POST',
    // headers:{"Content-type":"application/json"},
    body: JSON.stringify(param)
  });
}

export function getHistory(params) {
  console.log('getHistory', params);
  return request(`/agent/todohistory`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

export function getAttach(params) {
  console.log('getAttach', params);
  let str = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bean="http://service.ccic.com/h5img/h5imgQueryDown/bean" xmlns:bean1="http://service.ccic.com/common/bean">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<bean:H5imgQueryDownRequest>' +
    ' <bean:requestHead>' +
    ' <!--Optional:-->' +
    ' <bean1:seqNo></bean1:seqNo>' +
    '<!--Optional:-->' +
    '<bean1:consumerSeqNo></bean1:consumerSeqNo>' +
    '<bean1:consumerID>oaapp</bean1:consumerID>' +
    ' <!--Optional:-->' +
    ' <bean1:providerID></bean1:providerID>' +
    ' <!--Optional:-->' +
    '<bean1:classCode></bean1:classCode>' +
    ' <!--Optional:-->' +
    '<bean1:riskCode></bean1:riskCode>' +
    '<!--Optional:-->' +
    '<bean1:regionCode></bean1:regionCode>' +
    '<!--Optional:-->' +
    '<bean1:version></bean1:version>' +
    '</bean:requestHead>' +
    '<bean:requestBody>' +
    '<!--Optional:-->' +
    '<bean:baseData>' +
    '<bean:netType>http.inner</bean:netType>' +
    '  <bean:comCode>' + params.comCode + '</bean:comCode>' +
    '<bean:operator>' + params.operator + '</bean:operator>' +
    ' <!--Optional:-->' +
    ' <bean:operatorName>' + params.operatorName + '</bean:operatorName>' +
    '<bean:operatorRole>' + params.operatorRole + '</bean:operatorRole>' +
    ' </bean:baseData>' +
    ' <bean:metaData>' +
    ' <bean:appCode>' + params.appCode + '</bean:appCode>' +
    ' <!--Optional:-->' +
    ' <bean:classCode></bean:classCode>' +
    ' <!--Optional:-->' +
    '<bean:busiDate>' + params.busiDate + '</bean:busiDate>' +
    '<bean:businessNo>' + params.businessNo + '</bean:businessNo>' +
    ' </bean:metaData>' +
    '</bean:requestBody>' +
    ' </bean:H5imgQueryDownRequest>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';
  return request(`/agent/todofilelist`, {
    method: 'POST',
    headers: { "Content-type": "text/html", 'token': 'G5Jkc36XRSZ5GAJ1' },
    body: str
  });
}