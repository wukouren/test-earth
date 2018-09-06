import React, { Component } from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'antd-mobile';
import { changeNum } from '../../../constant';


class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    jw.setTitle({
      title: '报销单'
    })
  }


  handelToAttach() {
    let self = this;
    let url = window.location.origin + '/build/#/attach';
    localStorage.setItem('attachData', JSON.stringify(self.props.attachData));
    jw.pushWebView(url);
  }

  changeRender(data) {
    _.each(data, function (item, i) {
      if (i == 0) {
        item.active = true;
      }
    })
    return data;
  }
  handelShow(val, item) {
    let self = this;
    console.log('item', item);
    self.props.handelToggle(val, item)
  }
  // add() {
  //   let self = this;
  //   let dispatch = self.props.dispatch;
  //   dispatch({
  //     type: 'listInfo/getDataList',
  //     payload: {
  //       params: {
  //         UserAccountNo: 'ghu2',//当前申请人账号
  //         FlowCode: 'HR032Bat',//流程代码
  //         TaskListType: 1,//任务列表类型1:待处理；2:我提交;3:我处理
  //         SearchText: '',//搜索条件内容
  //         displayStart: 1,//是当前页码，1，2，3
  //         displayLength: 20//每页显示条数
  //       }
  //     }
  //   })
  // }


  handelToDetail(item) {
    console.log('ddd', item)
    window.upTabsData('detail', 'cache', item);
    let url = window.location.origin + '/build/#/detail';
    jw.pushWebView(url);
  }
  render() {
    let self = this;
    let feeInfo = self.props.feeData;
    let attachData = self.props.attachData;
    // let feeInfo=self.state.feeInfo&&self.state.feeInfo.length?self.changeRender(self.state.feeInfo):'';
    console.log('feeInfo', feeInfo);
    console.log('rrr2222----', self.props);
    // console.log('rrr',feeInfo.length,self.props.feeData);
    return (
      <div className="expense-content " id="expense">
        <div className="expense ">
          <div className={'exp-title ' + (feeInfo.length ? 'bb-gray' : '')} onClick={() => self.handelShow('showAll')}>
            <div><img src="images/fee.png" width="20" alt="" />
              费用信息</div>
            <div>
              <img className={self.props.showAll ? 'trans-90' : 'trans180'} src="images/next.png" width="8" alt="" />
            </div>
          </div>
          <div className="exp-cells ">
            {_.map(feeInfo, function (item, i) {
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
                {isShow && <div className={'exp-cell ' + (i == 0 ? '' : 'bt-gray')} onClick={() => self.handelToDetail(item)}>
                  <div className="exp-cell-left ">
                    <div className="exp-item">
                      <div className="exp-item-left">预算归属公司</div>
                      <div className="exp-item-right ">{item.companyName}</div>
                    </div>
                    <div className="exp-item">
                      <div className="exp-item-left">预算科目</div>
                      <div className="exp-item-right">{item.budgetItemCode}</div>
                    </div>
                    <div className="exp-item">
                      <div className="exp-item-left">金额(含税）</div>
                      <div className="exp-item-right">{changeNum(item.lineSumAmount)}</div>
                    </div>
                  </div>
                  <div className="exp-cell-right ">
                    <img src="images/next.png" width="8" alt="" />
                  </div>
                </div>}
              </div>;
            })}

          </div>
          {/* {!!feeInfo.length && self.props.showAll && <div className="exp-bottom " onClick={() => self.handelShow('showAll')}>
            收起更多信息
        </div>}
          {!!feeInfo.length && feeInfo.length > 1 && !self.props.showAll && <div className="exp-bottom " onClick={() => self.handelShow('showAll')}>
            还有{feeInfo.length - 1}条费用信息
        </div>} */}
        </div>
        <WhiteSpace />
        <div className="expense mt16">
          <div className="exp-title " onClick={() => self.handelShow('showSecond')} >
            <div><img src="images/collect.png" width="20" alt="" />
              收款信息</div>
            <div>
              <img className={self.props.showSecond ? 'trans180' : ''} src="images/next.png" width="8" alt="" />
            </div>
          </div>
          {self.props.showSecond && <div className="exp-cells bt-gray">
            {_.map(self.props.dataInfo, function (item, i) {
              return <div className={'exp-cell ' + (i == 0 ? '' : 'bt-gray')}>
                <div className="exp-cell-left ">
                  <div className="exp-item">
                    <div className="exp-item-left">收款方</div>
                    <div className="exp-item-right">{item.accountName}</div>
                  </div>
                  <div className="exp-item">
                    <div className="exp-item-left">本次应付</div>
                    <div className="exp-item-right">{changeNum(item.payAmount)}</div>
                  </div>
                  <div className="exp-item">
                    <div className="exp-item-left">核销借款</div>
                    <div className="exp-item-right">{item.writeOffAmount}</div>
                  </div>
                </div>
                {/* <div className="exp-cell-right ">
                  <img src="images/next.png" width="8" alt="" />
                </div> */}
              </div>;
            })}
          </div>}
        </div>
        <div className="attach " onClick={() => self.handelToAttach()}>
          <div><img className="imgOne" src="images/attach.png" width="20" alt="" />附件</div>
          {attachData && attachData.length > 0 && <div><span className="num">共{attachData.length}个</span><img className="imgNext" style={{ textAlign: 'center' }} src="images/next.png" width="8" alt="" /></div>}
          {(!attachData || attachData.length == 0) && <div><span className="num">无</span></div>}
          {/* <div><span className="num">共5个</span><img className="imgNext"  src="images/next.png" width="8" alt=""/></div> */}
        </div>
      </div>
    );
  }

}

export default connect((state) => { return state })(Expense);

