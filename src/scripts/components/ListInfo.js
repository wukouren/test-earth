import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Expense from './common/listInfo/Expense';
import LoadBill from './common/listInfo/LoadBill';
import Payment from './common/listInfo/Payment';
// import DetailInfo from './common/listInfo/Detail';//明细页面
import PersonInfo from './common/listInfo/PersonInfo';
import ApproveFooter from './common/ApproveFooter';
import Confirm from './common/Confirm';
import Attention from './common/Attention';
import Load from './common/load';


class ListInfoPage extends React.Component {
  constructor(props) {
    let store = new Store('Joywok:cache:tabs:personData');
    console.log('personData----', store, store.name);
    var cache = store.find({ id: 'tab:cache' }) || {};
    if (cache['id']) {
      let dispatch = props.dispatch;
      dispatch({
        type: 'listInfo/setKeyValue',
        payload: {
          personImg: cache["data"]
        }
      })
      // props['personImg'] = cache["data"];
    }
    console.log('personData222----', cache);
    super(props);
    this.id = props.params.id;
    this.state = {
      infoHeightFix: false,//是否固定person信息
      showAttention: false,
      scrollHeight: '',//
      showWhichBill: props.listInfo.personInfo.documentType,//1显示报销单  2 显示付款单    3 显示借款单,
      personInfo: props.listInfo.personInfo,
      showKnow: true
    };
    console.log('pppppp', props);
  }
  componentWillMount() {
    let self = this;
    let dispatch = self.props.dispatch;
    dispatch({
      type: 'listInfo/setKeyValue',
      payload: {
        showLoad: true
      }
    })
    dispatch({
      type: 'listInfo/getDataList',
      payload: {
        params: {
          requestHead: window.requestHead,
          requestBody: { UAID: self.props.params.id }
        }
      },
      dispatch: dispatch
    });
  }

  componentDidMount() {
    let self = this;
    typeof (jw.setHeaderLine) == 'function' ? jw.setHeaderLine({ status: 0 }) : '';
    window.addEventListener('scroll', () => {
      self.scrolls();
    })
    // window.addEventListener('touchmove', (e) => {
    //   // alert(this.props.listInfo.showConfirm);
    //   if (this.props.listInfo.showConfirm) e.preventDefault();
    // }, false)
  }
  scrolls() {
    let self = this;
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (parseInt(scrollTop) >= 65) {
      // if (parseInt(scrollTop) >= 1) {
      self.setState({
        infoHeightFix: true,
        scrollHeight: parseInt(scrollTop)
      })
    } else {
      self.setState({
        infoHeightFix: false,
        scrollHeight: parseInt(scrollTop)
      })
    }
  }

  handelToggle(val, content) {
    console.log('contet', content);
    let self = this;
    let dispatch = self.props.dispatch;
    switch (val) {
      case 'attent':
        dispatch({
          type: 'listInfo/setKeyValue',
          payload: {
            showAttention: !self.props.listInfo.showAttention,
            describe: content
          }
        });
        break;
      case 'showAll':
        dispatch({
          type: 'listInfo/setKeyValue',
          payload: {
            showAllList: !self.props.listInfo.showAllList
          }
        });
        if (self.state.scrollHeight) {
          window.scrollTo(0, self.state.scrollHeight);
        }
        break;
      case 'showSecond':
        dispatch({
          type: 'listInfo/setKeyValue',
          payload: {
            showSecond: !self.props.listInfo.showSecond
          }
        });
        break;
      // case 'detail':
      //   let url=window.location.origin+'/build#/detail';
      //   jw.pushWebView(url);
      // case 'detail':
      //   dispatch({
      //     type:'listInfo/setKeyValue',
      //     payload:{
      //       showDetail:!self.props.listInfo.showDetail,
      //       detailInfo:content
      //     }
      //   });
      //   if(self.state.scrollHeight){
      //       window.scrollTo(0, self.state.scrollHeight);
      //     }
      //   break;
    }
  }
  //val点击同意(approve)和不同意按钮(reject),部门等信息（know）
  // handelButton(val,content) {
  //    let self=this;
  //    let dispatch=self.props.dispatch;
  //    if(val=='know'){
  //     dispatch({
  //       type:'listInfo/setKeyValue',
  //       payload:{
  //         showReject:val,
  //         showToast:content
  //       }
  //     })
  //    }else{
  //     dispatch({
  //       type:'listInfo/setKeyValue',
  //       payload:{
  //         showReject:val,
  //         showToast:false
  //       }
  //     })
  //    }

  // }
  //val点击同意(approve)和不同意按钮(reject),部门等信息（know）
  handelShowConfirm(val, content) {
    console.log('====', val, content);
    let self = this;
    let dispatch = self.props.dispatch;
    switch (val) {
      case 'know':
        dispatch({
          type: 'listInfo/setKeyValue',
          payload: {
            showConfirm: val,
            showText: content
          }
        });
        break;
      default:
        dispatch({
          type: 'listInfo/setKeyValue',
          payload: {
            showConfirm: val,
            showText: ''
          }
        });
    }
  }

  //val为cancle（取消）为confirm（拒绝或同意的确定），data（'REJECTED','APPROVED'）
  //inputValue拒绝内容
  handelClickB(val, inputValue, data) {
    console.log('rreject', val, inputValue);
    let self = this;
    let dispatch = self.props.dispatch;
    switch (val) {
      case 'cancle':
        dispatch({
          type: 'listInfo/setKeyValue',
          payload: {
            showConfirm: '',
            showText: ''
          }
        });
        break;
      case 'confirm':
        // alert('confirm')
        // 调同意的接口和不同意的接口
        dispatch({
          type: 'listInfo/setKeyValue',
          payload: {
            showLoad: true
          }
        });
        dispatch({
          type: 'listInfo/getApprove',
          payload: {
            params: {
              requestHead: window.requestHead,
              requestBody: {
                // UAID:self.props.params.id,
                toDoList: [{ UAID: self.props.params.id }],
                approveStatus: data,
                description: inputValue
              }
            }
          }
        });
        break;
    }
    // console.log('ssccc',val,inputValue);

    //   dispatch({
    //     type:'listInfo/setKeyValue',
    //     payload:{
    //       showReject:'',
    //       showToast:false
    //     }
    //   })
  }
  render() {
    var self = this;
    console.log('rrr----', self.props);
    // alert(self.state.scrollHeight);
    let listInfo = self.props.listInfo;
    let personInfo = listInfo.personInfo;
    let personImg = listInfo.personImg || '';
    let feeInfo = listInfo.feeInfo;
    let showDetail = listInfo.showDetail;
    let showAttention = listInfo.showAttention;
    // let showReject=listInfo.showReject;
    let showConfirm = listInfo.showConfirm;

    // let showToast=listInfo.showToast;
    let showText = listInfo.showText;

    let showAllList = listInfo.showAllList;
    let showSecond = listInfo.showSecond;
    let dataInfo = listInfo.dataInfo;
    let detailInfo = listInfo.detailInfo;
    let describe = listInfo.describe;
    let showError = listInfo.showError;
    let attachData = listInfo.attachData;
    return (
      <div className="list-info " >
        {/* <div onClick={()=>self.add()}>ssss</div> */}
        {!showDetail && !showError && <PersonInfo
          dataImg={personImg} dataFix={self.state.infoHeightFix}
          onShowConfirm={self.handelShowConfirm.bind(this)}
          dataInfo={personInfo} handelToggle={self.handelToggle.bind(this)} />}
        {!showDetail && !showError && personInfo.documentType == 'EXP_REPORT' && <Expense feeData={feeInfo}
          showAll={showAllList}
          showSecond={showSecond}
          attachData={attachData}
          handelToggle={self.handelToggle.bind(this)}
          showDetail={showDetail}
          dataInfo={dataInfo} />}
        {!showDetail && personInfo.documentType == 'ACP_REQUISITION' && !showError && <Payment data={dataInfo}
          showAll={showAllList}
          attachData={attachData}
          handelToggle={self.handelToggle.bind(this)} />}
        {!showDetail && personInfo.documentType == 'CSH_REQUISITION' && !showError && <LoadBill data={dataInfo}
          showAll={showAllList}
          attachData={attachData}
          handelToggle={self.handelToggle.bind(this)} />}
        {/* {showDetail&&!showError&&<DetailInfo data={detailInfo} handelToggle={self.handelToggle.bind(this)}/>} */}
        {!showDetail && !showError && <ApproveFooter data={personInfo} onShowConfirm={self.handelShowConfirm.bind(this)} />}
        {showAttention && !showError && <Attention data={describe} handelToggle={self.handelToggle.bind(this)} />}
        {showConfirm && !showError && <Confirm showWhich={showConfirm} showText={showText} handelClickB={self.handelClickB.bind(this)} />}
        {/* {showReject&&!showError&&<Reject showWhich={showReject} showBottom={showToast} handelClickB={self.handelClickB.bind(this)}/>} */}
        {showError && <div className="error-msg">{showError}</div>}
        {self.props.listInfo.showLoad && <Load />}
      </div>
    )
  }


}

export default connect((state) => { return state })(ListInfoPage);
