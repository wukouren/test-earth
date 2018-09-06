import React, { Component } from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'antd-mobile';
import Confirm from './common/Confirm';

class AttachMent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
    jw.setTitle({
      title: '附件'
    })
  }
  handelA() {
    // jw.previewDoc({
    //   url:'http://10.98.13.71:25175/h5img/app/ImgView/getImgFile?a=Y2NpYy1pbWctdGVzdEBGSy8yMDE4LzA0LzE4LzE3L0hFQ0VKRTMxMDMwMDAwMTgwNDA2NzQvMEEyMENDOUNCMDRBNEYzRjgyNjgzMDNGOTA5RjdCM0MuZG9jeA==.docx',
    //   name:'附件',
    //   type:'application/msword'
    // });
  }
  handelS() {
    // jw.previewDoc({
    //   url:'http://10.98.13.71:25175/h5img/app/ImgView/getImgFile',
    //   name:'附件',
    //   type:'application/msword'
    // });
  }
  handelshow(item) {
    console.log('item', item);
    let fileType = item.mime;
    // if ($.inArray(fileType, ['jpg', 'bmp', 'png', 'gif']) > -1) {
    //   jw.previewImages({
    //     current: item['picPath'], // 当前显示图片的http链接
    //     urls: [item['picPath']] // 需要预览的图片http链接列表
    //   });
    // } else if ($.inArray(fileType, ['doc', 'docx']) > -1) {
    //   jw.previewDoc({
    //     url: item['picPath'],
    //     name: '附件',
    //     type: 'application/msword'// application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
    //   }, {
    //       success: function () {
    //       }
    //     })
    // } else if ($.inArray(fileType, ['xls', 'xlsx']) > -1) {
    //   jw.previewDoc({
    //     url: item['picPath'],
    //     name: '附件',
    //     type: 'application/vnd.ms-excel'// application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
    //   }, {
    //       success: function () {
    //       }
    //     })
    // } else if ($.inArray(fileType, ['ppt', 'pptx', 'pps', 'ppsx']) > -1) {
    //   jw.previewDoc({
    //     url: item['picPath'],
    //     name: '附件',
    //     type: 'application/vnd.ms-powerpoint'// application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
    //   }, {
    //       success: function () {
    //       }
    //     })
    // } else if ($.inArray(fileType, ['pdf']) > -1) {
    //   jw.previewDoc({
    //     url: item['picPath'],
    //     name: '附件',
    //     type: 'application/pdf'// application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
    //   }, {
    //       success: function () {
    //       }
    //     })
    // }
    if ($.inArray(fileType, ['jpg', 'bmp', 'png', 'gif']) > -1) {
      jw.previewImages({
        current: item['picPath'], // 当前显示图片的http链接
        urls: [item['picPath']] // 需要预览的图片http链接列表
      });
    } else if ($.inArray(fileType, ['pdf']) > -1) {
      jw.previewDoc({
        url: item['picPath'],
        name: '附件',
        type: 'application/pdf'// application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
      }, {
          success: function () {
          }
        })
    } else {
      let url = "/jmis/filepreview.do?fileurl=" + item['picPath'];
      $.get(url, function (data) {
        console.log('url--', data);
        // return;
        // let datas=JSON.parse(data);
        let openUrl = data.previewDocUrl;
        jw.newWebView(openUrl);
      })
    }
    // jw.previewImages({
    //     current: item.picPath, // 当前显示图片的http链接
    //     urls:[item.picPath] // 需要预览的图片http链接列表
    //   });
    // jw.newWebView(item.picPath1);
  }
  showAll(val, e) {
    e.stopPropagation();
    let self = this;
    let dispatch = self.props.dispatch;
    dispatch({
      type: 'attach/setKeyValue',
      payload: {
        showWhich: 'know',
        showText: val
      }
    });
  }
  handelClickB(val, inputValue, data) {
    let self = this;
    if (val == 'cancle') {
      let dispatch = self.props.dispatch;
      dispatch({
        type: 'attach/setKeyValue',
        payload: {
          showWhich: '',
          showText: ''
        }
      });
    }
  }
  //获取中英文混合的长度：一个汉字是2个字节，一个数字和一个英文是1个字节
  getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      var a = val.charAt(i);
      if (a.match(/[^\x00-\xff]/ig) != null) {
        len += 2;
      } else {
        len += 1;
      }
    }
    return len;
  }
  //截取中英文混合的字符串
  subString(str, len) {
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex, "**").length;
    for (var i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(chineseRegex) != null) {
        newLength += 2;
      } else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }
    if (strLength > len) {
      newStr += "";
    }
    return newStr;
  }
  render() {
    let self = this;
    let a = "http://10.98.13.71:25175/h5img/app/ImgView/getImgFile?Y2NpYy1pbWctdGVzdEBGSy8yMDE4LzAzLzIwLzEwL0hFQ0VKRTMxMDMwMDAwMTgwMzAwNDkvRDkzRDhDQTZGOTI0NDVGM0IyOEE2ODA1OEUzNzIxRUMueGxzeA==";
    let data = localStorage.getItem('attachData') ? JSON.parse(localStorage.getItem('attachData')) : '';
    console.log('att', data, self.props);
    return (
      <div className="attach-ment">
        <div className="bg-img" >
          <img src="images/bg-p2.png" width="100%" alt="" />
        </div>
        <div className="attach-content ">
          {data && _.map(data, function (item, i) {
            return <div>
              <div className="attach-cell" onClick={() => self.handelshow(item)}>
                <div className="a-cell-img ">
                  <img src={item.thumbPath1} width="66" alt="" />
                </div>
                <div className="attach-info">
                  <div className="attach-top" >
                    <span className="">{self.subString(item.name, 26)}</span>
                    {item.name && self.getByteLen(item.name) > 26 && <span onClick={(e) => self.showAll(item.name, e)}>...</span>}
                  </div>
                  <div className="attach-bottom mt10">{item.uploadUserName}   上传</div>
                  <div className="attach-bottom">{item.uploadTime}</div>
                </div>
              </div>
              <WhiteSpace />
            </div>;
          })}
        </div>
        {self.props.attach.showWhich && <Confirm showWhich={self.props.attach.showWhich} showText={self.props.attach.showText} handelClickB={self.handelClickB.bind(this)} />}
        {(!data || data.length == 0) && <div className="empty"><div className="empty-content">暂无信息</div></div>}
      </div>
    );
  }
}

export default connect((state) => { return state })(AttachMent);