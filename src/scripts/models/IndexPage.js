import {xmlToString,loadXMLDoc} from './../components/Common/Common';
import fetch from 'dva/fetch';
import async from './../services/request';
var mc_convert = require('xml-js')
export default{
    namespace:'IndexPage',
    state:{
        resultData:null
    },
    
    effects:{
        *fetch_test({},{call,put}){
            let xmlDoc = new Request("/scripts/models/test.xml");
            fetch(xmlDoc).then(function(response){
                console.info(response,'response')
                response.text().then(function(res){
                    let data=mc_convert.xml2js(res,{compact:true,spaces:4})
                    console.log(data,'data')
                })
            })
            return
            // let xml_string =xmlToString(xmlDoc)
            // localStorage.setItem('request_xml',xml_string)
            // let xml_string=localStorage.getItem('request_xml')
            // const data =yield call(async,{
            //     method:'post',
            //     url:'/api/appssoap/service/soap/form',
            //     // url:'https://soaptest.joywok.com/appssoap/service/soap/form',
            //     data:xml_string,
            //     // contentType:'text/xml;charset=UTF-8',
            //  //    datatype:'xml'
            //  })
        // console.info(data,'data++++')
        // yield put({
        //     type:'fetch_test_success',
        //     xml_list:data.data
        // })
        } 
    },
    reducers:{
        fetch_test_success(state,{xml_list}){
            state.resultData=xml_list
            return {...state}
        }
    }
}