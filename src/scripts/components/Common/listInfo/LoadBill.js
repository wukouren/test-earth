import React, { Component } from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'antd-mobile';
import { changeNum } from '../../../constant';
class LoadBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      showSecond: true, //收款信息是否显示
      // showSecond:true, //收款信息是否显示
      isFixed: props.dataFix
    };
  }
  componentWillMount() {
    jw.setTitle({ title: '借款单' });
  }
  handelShow(val, item) {
    let self = this;
    self.props.handelToggle(val, item);
  }
  handelToAttach() {
    let self = this;
    let url = window.location.origin + '/build/#/attach';
    localStorage.setItem('attachData', JSON.stringify(self.props.attachData));
    jw.pushWebView(url);
  }

  render() {
    let self = this;
    let dataInfo = self.props.data;
    let attachData = self.props.attachData;
    return (
      <div className="expense-content " id="expense">
        <div className="expense ">
          <div className={'exp-title ' + (dataInfo && dataInfo.length ? 'bb-gray' : '')} onClick={() => self.handelShow('showAll')}>
            <div><img src="images/loadbill.png" width="20" alt="" />
              借款行信息</div>
            <div>
              <img className={self.props.showAll ? 'trans-90' : 'trans180'} src="images/next.png" width="8" alt="" />
            </div>
          </div>
          <div className="exp-cells ">
            {_.map(dataInfo, function (item, i) {
              let isShow;
              if (self.props.showAll) {
                isShow = true;
              } else {
                if (i == 0) {
                  isShow = true;
                } else {
                  isShow = false;
                }
              }
              return <div>
                {isShow && <div className={'exp-cell ' + (i != 0 ? 'bt-gray' : '')}>
                  <div className="exp-cell-left ">
                    <div className="exp-item">
                      <div className="exp-item-left">借款类型</div>
                      <div className="exp-item-right">{item.paymentRequisitionLineType}</div>
                    </div>
                    <div className="exp-item">
                      <div className="exp-item-left">收款方</div>
                      <div className="exp-item-right">{item.accountName}</div>
                    </div>
                    <div className="exp-item">
                      <div className="exp-item-left">借款金额</div>
                      <div className="exp-item-right">{changeNum(item.payAmount)}</div>
                    </div>
                    <div className="exp-item">
                      <div className="exp-item-left">支付方式</div>
                      <div className="exp-item-right">{item.paymentMethod}</div>
                    </div>
                  </div>
                </div>}
              </div>;
            })}
          </div>
          {/* {!!dataInfo.length && self.props.showAll && <div className="exp-bottom " onClick={() => self.handelShow('showAll')}>
            收起更多信息
        </div>}
          {!!dataInfo.length && dataInfo.length > 1 && !self.props.showAll && <div className="exp-bottom " onClick={() => self.handelShow('showAll')}>
            还有{dataInfo.length - 1}条费用信息
        </div>} */}
        </div>
        <div className="attach " onClick={() => self.handelToAttach()}>
          <div><img className="imgOne" src="images/attach.png" width="20" alt="" />附件</div>
          {!!attachData && attachData.length > 0 && <div><span className="num">共{attachData.length}个</span><img className="imgNext" style={{ textAlign: 'center' }} src="images/next.png" width="8" alt="" /></div>}
          {(!attachData || attachData.length == 0) && <div><span className="num">无</span></div>}
        </div>
      </div>
    );
  }
}
export default connect((state) => { return state })(LoadBill);
