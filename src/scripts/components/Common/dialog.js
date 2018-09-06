import React, { Component } from 'react';
import { connect } from 'dva';
// import { ConfirmBase,AlertBase} from './EpsModal';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }
  handelToggle() {
    let self = this;
    self.props.handelToggle('attent');
  }
  handelClose(val, index) {
    console.log('val--', val);
    let self = this;
    if (val == 'reject') {
      self.props.handelAjax(index);
    } else {
      if (self.props.resultStatus == 3) {
      } else {
        self.props.handelClose();
      }

      // self.props.handelClose();
    }

  }
  changeInput(e) {
    let val = e.target.value;
    let self = this;
    self.setState({
      inputValue: val
    })
  }

  showResultText(status) {
    return status == 1 ? '已成功提交' : (status == 2 ? '提交失败' : '正在提交');
  }
  showImg(status) {
    return status == 1 ? "images/confirm/success.png" : (status == 2 ? "images/confirm/cancel.png" : "images/confirm/success.png");
  }

  render() {
    let self = this;
    let isAgree = self.props.approve == 'agree';
    let resultStatus = self.props.resultStatus;
    return (
      <div className="reject-pop">
        {self.props.showWhich == 'confirm' && <div className="reject">
          <div className="reject-up bg-color">
            <img className="imgs" src="images/person-img.png" width="36" alt="" /><span>{isAgree ? '确认通过该申请？' : '确认拒绝该申请？'}</span>
            <img onClick={() => self.handelClose('cancle')} className="imgDel " src="images/close.png" width="14" alt="" />
          </div>
          <div className="reject-content">
            <textarea placeholder={isAgree ? '选择输入备注…' : '拒绝必须输入备注 …'} onChange={(e) => self.changeInput(e)}></textarea>
          </div>
          <div className="reject-b">
            <button id="reject" className="reject-bottom" onClick={() => self.handelClose('reject', self.props.approve)}>
              {isAgree ? '通过' : '拒绝'}
            </button>
            <img src={isAgree ? 'images/agree.png' : 'images/reject.png'} width="18" alt="" />
            {/* <img src="images/reject.png" width="18" alt="" /> */}
          </div>
        </div>}
        {self.props.showWhich == 'know' &&
          <div className="know-content">
            <div className="know">
              <div className="know-title">
                {/* {resultStatus && <div className="mb30 loading b"> */}
                <div className="mb30 loading-icon ">
                  <div className={resultStatus == 3 ? 'custom-confirm-icon' : ''}>
                    <img src={self.showImg(resultStatus)} alt="" />
                    {resultStatus == 3 && <div className="html-loading">
                      <div className="html-loading-bg">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </div>}
                  </div>
                </div>
                {/* </div>} */}
                <div>{self.showResultText(resultStatus)}</div>
              </div>
              <div className="know-bottom" onClick={() => self.handelClose('cancle')}>{resultStatus == 3 ? '提交中' : '知道了'}</div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default connect((state) => { return state })(Dialog);