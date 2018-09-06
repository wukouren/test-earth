import React, { Component } from 'react';
import { connect } from 'dva';
import Dialog from './common/dialog';

class ItSmInfo extends Component {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    jw.setTitle({ title: '审批' })
  }
  handelApprove(index) {
    let self = this;
    let dispatch = self.props.dispatch;
    dispatch({
      type: 'itSmInfo/setKeyValue',
      payload: {
        showWhich: 'confirm',
        approve: index
      }
    })

  }
  handelClose() {
    let self = this;
    let dispatch = self.props.dispatch;
    console.log('111')
    dispatch({
      type: 'itSmInfo/setKeyValue',
      payload: {
        showWhich: '',
        approve: ''
      }
    })
  }
  handelAjax(index) {
    //调同意和不同意的接口index为agree，reject
    let self = this;
    let dispatch = self.props.dispatch;
    dispatch({
      type: 'itSmInfo/setKeyValue',
      payload: {
        showWhich: 'know',
        resultStatus: 3
      }
    })
    setTimeout(function () {
      dispatch({
        type: 'itSmInfo/setKeyValue',
        payload: {
          showWhich: 'know',
          resultStatus: 1
        }
      })
    }, 1000);
  }
  render() {
    let self = this;
    let itSmInfo = self.props.itSmInfo;
    console.log('pppp', itSmInfo)

    let showWhich = itSmInfo.showWhich;
    let resultStatus = itSmInfo.resultStatus;
    let approve = itSmInfo.approve;

    return (
      <div className="itSm-info ">
        <div className="header-img">
          <img src="images/bg-two.png" width="100%" alt="" />
        </div>
        <div className="header-content ">
          <div className="header-p">
            <img src="images/person-img.png" width="50" alt="" />
          </div>
          <div className="header-text ">
            <div className="header-cell">
              <div className="cell-left font-s13">变更单号 </div>
              <div className="cell-left "> CHG201805227273 </div>
            </div>
            <div className="header-cell">
              <div className="cell-left font-s13">生成时间  </div>
              <div className="cell-left "> 2018/05/22 14:35:28 </div>
            </div>
            <div className="header-cell">
              <div className="cell-left font-s13">变更提交人  </div>
              <div className="cell-left ">  董子良 </div>
            </div>
            <div className="header-cell">
              <div className="cell-left font-s13">来源系统  </div>
              <div className="cell-left ">  ITSM </div>
            </div>
          </div>
        </div>
        <div className="itSm-content">
          <div className="it-content-title border-b">
            <img className="it-img" src="images/approve.png" width="20" alt="" />
            &nbsp;&nbsp;2018.05.22 新理赔内部数据修改单
          </div>
          <div className="itSm-text">
            <div className="itSm-cell border-b">
              <div className="itSm-cell-item">
                <div className="cell-item-left  " >变更标题</div>
                <div className="cell-item-right ">2018.05.22 新理赔内部数据修改单</div>
              </div>
              <div className="itSm-cell-item border-b">
                <div className="cell-item-left " >应用系统</div>
                <div className="cell-item-right ">新理赔系统</div>
              </div>
            </div>
            <div className="itSm-cell">
              <div className="itSm-cell-item">
                <div className="cell-item-left  " >变更分类</div>
                <div className="cell-item-right ">数据修改变更</div>
              </div>
              <div className="itSm-cell-item border-b">
                <div className="cell-item-left " >变更类型</div>
                <div className="cell-item-right ">标准变更</div>
              </div>
              <div className="itSm-cell-item border-b">
                <div className="cell-item-left " >期望完成时间</div>
                <div className="cell-item-right ">2018.05.22 17:00:00</div>
              </div>
            </div>
          </div>
          <div className="it-content-bottom">
            <div className="it-b-left">变更内容</div>
            <div className="it-b-right">相关事件 IM201804278133</div>
          </div>
        </div>
        <div className="itSm-button">
          <div className="reject" onClick={() => self.handelAjax('reject')}>拒绝</div>
          {/* <div className="reject" onClick={() => self.handelApprove('reject')}>拒绝</div> */}
          <div className="agree" onClick={() => self.handelApprove('agree')}>通过</div>
        </div>
        {showWhich && <Dialog showWhich={showWhich} approve={approve} resultStatus={resultStatus} handelAjax={self.handelAjax.bind(this)} handelClose={self.handelClose.bind(this)}></Dialog>}
      </div>
    );
  }
}

export default connect(state => state)(ItSmInfo)