
import React, { Component } from 'react';
import { connect } from 'dva';
// import { ConfirmBase} from './EpsModal';
// import { ConfirmBase,AlertBase} from './EpsModal';

class ApproveFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handelToHistory() {
    let url = window.location.origin + '/build/#/history';
    // console.log('d',url);
    jw.pushWebView(url);
  }
  handelConfirm(val) {
    let self = this;
    self.props.onShowConfirm(val);
  }
  render() {
    let self = this;
    let data = self.props.data;
    console.log('standbyStates', data, data.standbyStates);
    let handeling, finish;
    let showWhich;
    if (data.standbyStates == "N") {
      showWhich = true;
    } else if (data.standbyStates == "W") {
      handeling = "处理中";
    } else {
      if (data.documentStatus == "审批中") {
        handeling = data.approveEmployee + data.documentStatus;
      } else if (data.documentStatus == "拒绝") {
        finish = '拒绝';
      } else {
        finish = '审批完成';
      }
      showWhich = false;
    }
    console.log('footer', showWhich, '1', handeling, '2', finish);
    return (
      <div className="approve-footer">
        <div className="approve-f-left  " onClick={() => self.handelToHistory()}>
          {/* <div style={{marginTop:'5px'}}><img src="images/history.png" width="24" alt=""/></div> */}
          <div><img src="images/history.png" width="24" alt="" /></div>
          <div className="history" >审批历史</div>
        </div>
        {showWhich && <div className="approve-f-right bg-gray" onClick={() => self.handelConfirm('reject')}>拒绝</div>}
        {showWhich && <div className="approve-f-right bg-green" onClick={() => self.handelConfirm('approve')} >同意</div>}
        {!showWhich && <div className="approve-right">
          {!!finish && <span><img src="images/finish.png" width="24" alt="" />{finish} </span>}
          {!!handeling && <span><img src="images/handeling.png" width="24" alt="" />{handeling}</span>}
        </div>}
      </div>
    );
  }
}

export default connect((state) => { return state })(ApproveFooter);