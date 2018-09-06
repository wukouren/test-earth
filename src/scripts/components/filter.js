import React, { Component } from 'react';
import { connect } from 'dva';
// import { ConfirmBase,AlertBase} from './EpsModal';

class Choose extends React.Component {
  constructor(props) {
    super(props);
    // let searchData = props.searchData;
    // console.log('searchData', searchData)


    let store = new Store('Joywok:cache:tabs:filterData');

    let cache = store.find({ id: 'tab:cache' }) || {};
    console.log('filterData----', cache);
    let searchData = cache['data'];
    if (cache['id']) {
      this.state = {
        // employeeName:searchData.employeeName || '',
        employeeCode: searchData.employeeCode || '',
        dueAmountFrom: searchData.dueAmountFrom || '',
        dueAmountTo: searchData.dueAmountTo || ''
      };
    }
  }
  componentWillMount() {
    jw.setTitle({ title: '筛选' });
  }
  //   handelToggle() {
  //      let self=this;
  //      self.props.handelToggle('attent');
  //   }
  handelfilter() {
    let self = this;
    // let name='赵';
    // let name=self.state.employeeCode;

    // let name = self.state.employeeCode;
    // let dueAmountFrom = self.state.dueAmountFrom;
    // let dueAmountTo = self.state.dueAmountTo;
    let data = {
      name: self.state.employeeCode,
      dueAmountFrom: self.state.dueAmountFrom,
      dueAmountTo: self.state.dueAmountTo
    };

    // console.log('1111', name)
    window.upTabsData('filter', 'publish', data);
    jw.closeWebView();
    // self.props.handelfilter(name, dueAmountFrom, dueAmountTo);
  }
  reset() {
    let self = this;
    self.setState({
      // employeeName: '',
      employeeCode: '',
      dueAmountFrom: '',
      dueAmountTo: ''
    })
  }

  changeNum(val, index) {
    console.log('val', typeof val, val);
    let self = this;
    let value;
    if (val) {
      value = Math.round(parseFloat(val) * 100) / 100;
      let xsd = value.toString().split(".");
      if (xsd.length == 1) {
        value = value.toString() + ".00";

        // return value;
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          value = value.toString() + "0";
        }
        // return value;
      }
    } else {
      value = val;
    }
    switch (index) {
      case 'to':
        self.setState({
          dueAmountTo: value
        });
        break;
      default:
        self.setState({
          dueAmountFrom: value
        })
    }


  }
  render() {
    let self = this;
    let searchData = self.props.searchData;
    console.log('searchData', searchData);
    return (
      <div className="list-choose">
        <div className="list-choose-content ">
          <div className="list-choose-input ">
            {/* <input type="text" readOnly onClick={()=>self.handelSelP()} value={self.state.employeeName} placeholder="请输入提交人姓名"/> */}
            <input type="text" onChange={(e) => { self.setState({ employeeCode: e.target.value }) }} value={self.state.employeeCode} placeholder="请输入提交人姓名" />
            <img src="images/list/search.png" width="15" alt="" />
          </div>
          <div className="choose-money">
            <div className="money-title">订单金额</div>
            <div className="choose-area">
              <div className="choose-num ">
                <input type="tel" placeholder="请输入" onBlur={() => self.changeNum(self.state.dueAmountFrom, 'from')} onChange={(e) => { self.setState({ dueAmountFrom: e.target.value }) }} value={self.state.dueAmountFrom} />
              </div>
              <div className="line "><div className="choose-line"></div></div>
              <div className="choose-num ">
                <input type="tel" placeholder="请输入" value={self.state.dueAmountTo} onBlur={() => self.changeNum(self.state.dueAmountTo, 'to')} onChange={(e) => { self.setState({ dueAmountTo: e.target.value }) }} />
              </div>
            </div>
            <div className="list-choose-footer">
              <div className="list-f-left" onClick={() => self.reset()}>清空搜索条件</div>
              <div className="list-f-right" onClick={() => self.handelfilter()}>确认</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => { return state })(Choose);