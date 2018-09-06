
// function mc_Ajax(data) {
//     var def = $.Deferred();
//     console.log(data,'data')
//     var canceled = false;
//         var jqXHR = $.ajax({
//             type: data.type,
//             url: data.url,
//             //防止自动转换数据格式。
//             processData: false,
//             data: data.data,
//             // xhrFields crossDomain  开启跨域设置
//             xhrFields: {withCredentials: true},
//             crossDomain: true,
//             // 设置header头
//             // contentType: data.contentType?data.contentType:"application/json",
//             // 预期服务器返回的数据类型。
//             // datatype:data.datatype?data.datatype:"json",
//             error: function (xhr, status, error) {
//                 if (canceled) return;
//                 var data = {
//                     result: 4,
//                     message: error,
//                     status: status
//                 };
//                 console.error("调用接口:[" + this.url + "]报错;状态码:[" + xhr.status + "];错误信息:[" + error + "]");
//                 def.reject(data);
//             },
//             success: function (data) {
//                 if (canceled) return;
//                 def.resolve(data);
//             }
//         });
//         var promise = def.promise();
//         var then = promise.then;
//         var thenWrapper = function () {
//             var promise = then.apply(this, arguments);
//             promise.cancel = function () {
//                 canceled = true;
//                 jqXHR.abort();
//             };
//             promise.then = thenWrapper;
//             return promise;
//         };
//         promise.then = thenWrapper;

//         return promise;

// }
// xml 转 string
function xmlToString(xmlData) {  
    var xmlString;  
    //IE  
    if (window.ActiveXObject){  
        xmlString = xmlData.xml;  
    }  
    // code for Mozilla, Firefox, Opera, etc.  
    else{  
        xmlString = (new XMLSerializer()).serializeToString(xmlData);  
    }  
    return xmlString;  
} 
// 加载xml
function loadXMLDoc(dname) {
    let xhttp,
        loadXMLDoc
    if(window.XMLHttpRequest) {
         xhttp = new XMLHttpRequest();
    } else {
        loadXMLDoc
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", dname, false);
    xhttp.send();
    return xhttp.responseXML;
}
export {xmlToString,loadXMLDoc}