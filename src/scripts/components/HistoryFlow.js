import React, { Component } from 'react';
import { connect } from 'dva';
import Load from './common/load';

class HistoryFlow extends React.Component {
  constructor(props) {
    super(props);
    console.log('dd', props);
    this.state = {
      transDate: localStorage.getItem('applyDate') || '',
      transNum: localStorage.getItem('documentNumber') || '',
    };
  }
  componentWillMount() {
    let self = this;
    let dispatch = self.props.dispatch;
    dispatch({
      type: 'history/setKeyValue',
      payload: {
        showLoad: true
      }
    })
    dispatch({
      type: 'history/getHistory',
      payload: {
        params: {
          requestHead: window.requestHead,
          requestBody: {
            documentNumber: localStorage.getItem('documentNumber') || '',
            documentType: localStorage.getItem('documentType') || ''
          }
        }
      }
    });
  }

  componentDidMount() {
    jw.setTitle({ title: '审批历史' });
    let data = this.props.history.data;
    let employIds = this.pingId(data);
    console.log('employIds', employIds);
    //获取审批人的头像
    jw.getUsers({
      users: employIds,
      type: 'num'
    }, {
        success: function (res) {
          console.log('res8888', res);
        }
      })

  }

  pingId(data) {
    let str = '';
    _.each(data, function (item, i) {
      str += item.employeeCode + ',';
    })
    return str.substr(0, str.length - 1);
  }

  formatDate(dates) {
    let date = new Date(dates);
    const pad = n => n < 10 ? `0${n}` : n;
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    let resultDate = `${dateStr} ${timeStr}` || '';
    return `${dateStr} ${timeStr}`;
  }

  _changeTime(dataInfo) {
    let self = this;
    let dataArray = [];
    _.each(dataInfo, function (item, i) {
      console.log('rrrrr', item);
      let newData = self.formatDate(item.operationDate);
      let data = newData.split(' ');
      dataArray.push({
        documentDate: item.documentDate,
        documentNumber: item.documentNumber,
        documentType: item.documentType,
        employeeCode: item.employeeCode,
        operationDate: data[0],
        dateDown: data[1],
        operationCode: item.operationCode,
        employeeName: item.employeeName,
        workflowNode: item.workflowNode,
        avatar: item.avatar,
        xxx: '123'
      });
    })
    return dataArray;
  }

  render() {
    let self = this;
    console.log('q', self.props.history.data);
    let dataInfo = self.props.history.data;
    let data = self._changeTime(dataInfo);
    console.log('11', data);
    // let aa=dataInfo&&dataInfo[0].operationDate;
    // let b=self.formatDate(aa).split(' ');
    // console.log('bbb',b);
    return (
      <div className="history-flow" >
        <div className="">
          <img src="images/bg-p2.png" width="100%" alt="" />
        </div>
        <div className="history-content ">
          <div className="h-c-title ">
            <div className="t-left ">
              <img src="images/flow.png" width="50" alt="" />
            </div>
            <div className="t-right ">
              <div className="h-cell " onClick={() => self.add()}>
                <div className="h-cell-left ">单据编号</div>
                {/* <div className="h-cell-right font-12">ETee66767676766767</div> */}
                <div className="h-cell-right font-12">{self.state.transNum}</div>
                {/* 注意上面的在安卓上面都正常在IOS就不溢出 */}
              </div>
              <div className="h-cell  color-gray">
                <div className="h-cell-left">申请日期</div>
                {/* <div className="h-cell-right">2018-01-26</div> */}
                <div className="h-cell-right">{self.state.transDate}</div>
              </div>
            </div>
          </div>
        </div>
        {!!data && !!data.length && <div className="flow ">
          {_.map(data, function (item, i) {
            console.log(item)
            return <div className={'history-cell ' + (i == 0 ? '' : 'mt42')}>
              <div className="h-item-left ">
                <div>{item.operationDate}</div>
                <div>{item.dateDown}</div>
              </div>
              <div className="h-item-center ">
                {/* <img src={item['avatar'] && item['avatar']['avatar_s']} width="33" alt="" /> */}
                <img src="images/person-img.png" width="33" alt="" />
              </div>
              <div className="h-item-right ">
                <div className="right-up ">
                  <div className="name">{item.employeeName}</div>
                  <div className={'process ' + (item.operationCode == "拒绝" ? 'bg-red' : '')}>{item.operationCode}</div>
                </div>
                <div className="dept-name">{item.workflowNode}</div>
                {item.description && <div>
                  <div className="right-triangle">
                  </div>
                  <div className="right-down ">
                    {item.description}
                  </div>
                </div>}
              </div>
            </div>
          })}
        </div>}
        {self.props.history.showLoad && <Load />}
      </div>
    );
  }
}

export default connect((state) => { return state })(HistoryFlow);