import React, { Component } from 'react';
import { connect } from 'dva';
import Confirm from './common/Confirm';

class Result extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    jw.setTitle({ title: '审批结果详情' });
    let batchNum = this.props.params.batchNumber;
    let dispatch = this.props.dispatch;
    dispatch({
      type: 'result/getResult',
      payload: {
        requestHead: window.requestHead,
        requestBody: { batchNumber: batchNum }
      }
    })
  }
  turnMoney(data) {
    return Number(data).formatMoney(2, '', '')
  }
  formatDate(dates) {
    let date = new Date(dates);
    const pad = n => n < 10 ? `0${n}` : n;
    const dateStr = `${date.getFullYear()}:${pad(date.getMonth() + 1)}:${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    let resultDate = `${dateStr} ${timeStr}` || '';
    return `${dateStr} ${timeStr}`;
  }
  handelClickB() {
    let self = this;
    let dispatch = self.props.dispatch;
    dispatch({
      type: 'result/setKeyValue',
      payload: {
        showConfirm: '',
        showText: ''
      }
    });
  }
  render() {
    let self = this;
    let showConfirm = this.props.result.showConfirm;
    let showText = this.props.result.showText;
    console.log('11', showConfirm, showText)
    let resData = this.props.result.resultData;
    let listDetail = resData && resData.listDetail && resData.listDetail;
    let date = resData && resData.approvalDate;
    console.log('dd', date, new Date(date))
    // let listDetail = resData.listDetail && resData.listDetail instanceof Array ? resData.listDetail : resData.listDetail;
    // let listDetail = resData.listDetail && resData.listDetail instanceof Array ? resData.listDetail : [resData.listDetail];
    console.log('1', this.props, '5', resData, '2', listDetail)
    return (
      <div className="result-content">
        <div className="imgs">
          <img src="images/bg-p2.png" width="100%" alt="" />
        </div>
        <div className="header ">
          <div className="header-img">
            <img src="images/fee-biao.png" alt="" />
          </div>
          <div className="header-content ">
            <div><span className="mr10">审批时间</span>{resData.approvalDate ? self.formatDate(resData.approvalDate) : ''}</div>
            {/* 把提交时间改为审批时间 */}
            {/* <div><span className="mr10">提交时间</span>{resData.approvalDate ? self.formatDate(resData.approvalDate) : ''}</div> */}
            <div className="mt5"><span className="mr10 ">审批结果</span>{resData.approvalResult}</div>
          </div>
        </div>
        <div className="line">
          <div className="line-w ">
            <div className="lines"></div>
          </div>
          <div className="line-text ">失败的审批列表</div>
          <div className="line-w ">
            <div className="lines"></div>
          </div>
        </div>
        <div className="fail-list">
          {!!listDetail && !!listDetail.length && _.map(listDetail, function (item, i) {
            console.log('it', item)
            let type;
            switch (item.documentType) {
              case 'EXP_REPORT':
                type = "报销单";
                break;
              case 'CSH_REQUISITION':
                type = "借款单";
                break;
              case 'ACP_REQUISITION':
                type = "付款单";
                break;
              default:
                type = "";
            }
            return <div className="fail-cell">
              <div className="f-cell-t">· {item.documentNumber}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{type}</div>
              <div className="f-cell-m">
                <div className="f-cell-two">
                  提交人：<span style={{ marginLeft: '10px' }}>{item.employeeName}</span>
                </div>
                <div className="f-cell-two">
                  金额：<span style={{ marginLeft: '10px' }}>{self.turnMoney(item.dueAmount)}</span>
                </div>
              </div>
              <div className="f-cell-r">失败审批原因：{item.description}</div>
            </div>
          })}

          {/*    <div className="fail-cell">
            <div className="f-cell-t">· EJE64513997646  报销单</div>
            <div className="f-cell-m">
              <div className="f-cell-two">
                提交人：<span style={{ marginLeft: '10px' }}>王春晖</span>
              </div>
              <div className="f-cell-two">
                金额：<span style={{ marginLeft: '10px' }}>234.00</span>
              </div>
            </div>
            <div className="f-cell-r">失败审批原因：单据不在可审批节点</div>
          </div> */}
        </div>
        {showConfirm && <Confirm showWhich={showConfirm} showText={showText} handelClickB={self.handelClickB.bind(this)} />}
      </div>
    );
  }
}

export default connect(state => state)(Result);
