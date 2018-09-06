// const DlmEnv = require('./../../src/config')
import dva from 'dva';
import createLoading from 'dva-loading';
import request from './utils/god';
import {
  PagParameter
} from './request_config'
// // 初始化DLM配置信息
// let DLMConfig = DlmEnv.DLMEnvConfig
// let dlmapi=DLMConfig.dlmapi,
// dlm=DLMConfig.dlm
const app = dva();
window.dvaApp = app;
app.router(require('./router'));
if (window.localStorage) {
  var storage = window.localStorage;
  var usertoken = storage["usertoken"];
  var timeStamp = storage["timeStamp"];
  var now = Date.parse(new Date);
  var avtiveTime=storage['avtiveTime']
  if (usertoken != undefined && timeStamp != undefined && timeStamp && (now/1000 - timeStamp/1000 < 3600*168)) {
    $('#root').find(".emptyView").text('加载中，请稍等...')
    jw.ready = function () {
      console.log('有免登数据，开始注册jw回调函数')
      jw.getInfo({
        success: function (res) {
          console.log('检验缓存中的用户信息')
          if(JSON.parse(storage.positionInfo).name != res.info.name ){
            console.log('用户信息不正确，开始清除localStorage并刷新当前页面')
            storage.clear();
            location.reload();
          }else{
            let positionInfo =JSON.parse(storage["positionInfo"])
            if( avtiveTime != undefined && avtiveTime && (now/1000 - avtiveTime/1000 < 3600*24)){
              console.log('开始渲染页面')
              app.start('#root');
            }else{
              console.log('activityList失效，开始重新请求')
              request('1161', {UserLoginVO:{userId: positionInfo['userId'],dealerId:positionInfo['dealerId']}
              })
              .then((values)=>{
                storage['avtiveTime']=Date.parse(new Date)
                let data_activity=JSON.parse("\""+decodeURIComponent(values.data.result)+"\"");
                let activityList=JSON.parse(data_activity).obj
                let list1014=JSON.parse(storage[1014])
                list1014.activityList=activityList
                storage[1014]=JSON.stringify(list1014)
                app.start('#root');
              })
            }
          }
        }
      })
    }
    let config = JSON.parse(storage.jwConfig);
    if (!config) {
      config = {}
    }
    console.log('JSSDK环境初始化')
    jw.config(config)
    //本地调试
    // app.start('#root');
  } else {
    $('#root').find(".emptyView").text('免登中，请稍等...')    
    var url = "/dlm_test/appToken/appAccessToken";
    console.log('token失效，重新请求免登数据')
    $.get(url, function (data) {
      var res = JSON.parse(data);
      if (res.ifSuccess == "1") {
        var redirecturl = res.data.redirect_url;
        console.log('获取token成功,开始注册jw回调')
        jw.ready = function () {
          console.log('开始获取免登码',new Date())
          jw.getAuthCode({
            url: redirecturl
          }, {
            success: function (data) {
              console.log(data.code,'免登码获取成功！！',new Date())
              usertoken=data.code
              storage.setItem('authCode', data.code);
              storage.setItem('timeStamp', Date.parse(new Date));
              var url2 = "/dlm_test/appToken/appAccessUserToken?signTiket=" + data.code;
              $.get(url2, function (data) {
                console.log('通过免登码获取用户信息',new Date())
                var res = JSON.parse(data);
                if (res.ifSuccess == "1") {
                  console.log('获取用户信息成功！！',data,new Date())
                  var positionInfo = res.data.user.userLoginInfoList[0];
                  storage["usertoken"] = usertoken;
                  storage["loginInfo"] = data;
                  storage["positionInfo"] = JSON.stringify(positionInfo);
                  Promise.all([
                    request('1014', {
                    UserLoginVO: {
                      userId: positionInfo.userId,
                      dealerId: positionInfo.dealerId
                    }
                  }),
                  request('1007', {
                    dealerCode: positionInfo['dealerCode']
                  }),
                  request('1161', {
                  UserLoginVO:{
                    userId: positionInfo['userId'],
                    dealerId:positionInfo['dealerId']
                  }
                }),
              ])
                .then(values=>{
                  let data1014=JSON.parse("\""+decodeURIComponent(values[0].data.result)+"\"")
                  let list1014=JSON.parse(data1014)
                  storage[1007]=JSON.parse("\""+decodeURIComponent(values[1].data.result)+"\"");
                  let data_activity=JSON.parse("\""+decodeURIComponent(values[2].data.result)+"\"");
                  let activityList=JSON.parse(data_activity).obj
                  list1014.activityList=activityList
                  storage[1014]=JSON.stringify(list1014)
                  storage['avtiveTime']=Date.parse(new Date)
                  app.start('#root');
                });
                }else{
                    var Msg = JSON.parse(data).errcode;
                    if(Msg == "E00003"){
                      Msg = "该系统用户不存在！"
                    }
                    alert("免登失败，" + Msg);
                }
              });
            },
            fail: function (data) {
              alert("错误" + JSON.stringify(data));
            }
          });
        }

         /*jsskd免登环境*/
         storage.setItem('jwConfig', JSON.stringify({
            debug: true,
            appid: res.data.appid, // 必填，公众号的唯一标识
            timestamp: res.data.timeStamp, // 必填，生成签名的时间戳（10位）
            nonceStr: res.data.noncestr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名，见附录
            app_access_token: '', // 免登录后获取的token，应用于上传文件，下载文
            corpid: res.data.corpid // 企业ID
          }))
          console.log('jssdk环境初始化,成功后会注册jw.ready');
          jw.config({
            debug: true,
            appid: res.data.appid, // 必填，公众号的唯一标识
            timestamp: res.data.timeStamp, // 必填，生成签名的时间戳（10位）
            nonceStr: res.data.noncestr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名，见附录
            app_access_token: '', // 免登录后获取的token，应用于上传文件，下载文
            corpid: res.data.corpid // 企业ID
          })
          console.log('typeof jw.ready', typeof jw.ready);

      } else {

        alert("免登失败，错误代码[" + JSON.parse(data).errcode + "]");

      }
    });
  }
}


var jschars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

window.generateMixed = function (n) {
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 61);
    res += jschars[id];
  }
  return res;
}

window.id = window.generateMixed(16)

window.upTabsData = function (data, type, nameSpace) {
  let nowApplyData = window.dvaApp._store.getState()[nameSpace]; // 拿到apply命名空间下的所有state
  let datas = {
    uid: window.id, // 区别 当前tabs  在chailv.js中生成随机数id
    id: 'cache',
    data: _.extend({}, nowApplyData, data), // 把新数据传入nowApplayData
    type: type,
  }

  // console.log(nowApplyData, data, 'nowApplyData', 'data');
  window.localstore = new Store('Joywok:cache:'+nameSpace);
  // window.localstore = new Store(nameSpace); // 通过new Store去读本地存储的数据
  // console.log(window.localstore);
  window.localstore.update(datas); // 更新本地数据
  jw.shareData(datas)

}

    // 从本地数据中读取数据 然后分发给指定页面
window.subShareData = function(data){
  // 54 - 65 三级数据往二级传数据会存在问题
  if(typeof(data)=='string'){
    data = JSON.parse(data);
  }
  if(data['uid']!=window.id){
    // 这段代码有错误，暂时不研究
    // if(data['data']["targetModel"]){
    //   let newData = {};
    //   _.each(data["data"],function(i,key){
    //     if(key!='targetModel'){
    //       newData[key]=i
    //     }
    //   })
    //   app._store.dispatch({
    //     type:data['data']["targetModel"]+"/resetAllData",
    //     data:newData
    //   })
    // }
    // console.log(data,'subShareData中的data!!!')
    // console.log(data["data"],'subShareData');
    // 把当前页面中的数据拿走
    let datas = {
      uid:window.id,
      id:'cache',
      data:data['data']
    }
    // new Store localStrogae的方法
    window.localstore = new Store('Joywok:'+'dlmsubShareData'+':cache');
    window.localstore.update(datas);
    // alert(data["type"])
    // alert(JSON.stringify(data["data"]))
    app._store.dispatch({
      type:data["type"] || "resetAllData",
      data:data['data'],
    })
  }
}