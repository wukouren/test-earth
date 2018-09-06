import React, { Component } from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'antd-mobile';
import { changeNum } from '../../../constant';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetail: false
        };
        let store = new Store('Joywok:cache:tabs:detail');
        let cache = store.find({ id: 'tab:cache' }) || {};
        this.detail = cache["data"];
    }

    componentWillMount() {
        jw.setTitle({ title: '费用明细' })
    }


    componentWillReceiveProps(newProps) {
        let self = this;

    }

    handelShowD() {
        let self = this;
        self.setState({
            // showDetail:true
        })
    }
    handelShowSecond() {
        let self = this;
        self.setState({
            //   showSecond:!self.state.showSecond
        })
    }

    handelToAttach() {
        // let url=window.location.origin+'#/attach';
        // jw.pushWebView(url);
    }
    handelClose() {
        //   let self=this;
        //   self.props.handelToggle('detail');
    }
    // changeNum(val) {
    //     let value = Math.round(parseFloat(val) * 100) / 100;
    //     let xsd = value.toString().split(".");
    //     if (xsd.length == 1) {
    //         value = value.toString() + ".00";
    //         return value;
    //     }
    //     if (xsd.length > 1) {
    //         if (xsd[1].length < 2) {
    //             value = value.toString() + "0";
    //         }
    //         return value;
    //     }
    // }
    render() {
        let self = this;
        // let data=localStorage.getItem('detailInfo') ? JSON.parse(localStorage.getItem('detailInfo')) : '';
        let data = self.detail;
        // let data=self.props.data;
        // console.log('detail',self.props.data);
        return (
            <div className="detail-info" onClick={() => self.handelClose()}>
                <div className="">
                    <img src="images/bg-p2.png" width="100%" alt="" />
                </div>
                <div className="expense " onClick={() => self.handelClose()}>
                    <div className="exp-cells ">
                        <div className="exp-detail-cell">
                            <div className="exp-detail-item">
                                <div className="exp-detail-left">预算归属公司</div>
                                <div className="exp-detail-right">{data.companyName || '-'}</div>
                            </div>
                            <div className="exp-detail-item mt5">
                                <div className="exp-detail-left">预算归属部门</div>
                                <div className="exp-detail-right">{data.unitName || '-'}</div>
                            </div>
                            <div className="exp-detail-item mt5">
                                <div className="exp-detail-left">成本承担公司</div>
                                <div className="exp-detail-right">{data.costCompanyName || '-'}</div>
                            </div>
                            <div className="exp-detail-item mt5">
                                <div className="exp-detail-left">成本承担部门</div>
                                <div className="exp-detail-right">{data.costUnitName || '-'}</div>
                            </div>
                            <div className="exp-detail-item mt5">
                                <div className="exp-detail-left">发票内容</div>
                                <div className="exp-detail-right">
                                    {data.invoiceDescription || '-'}
                                </div>
                            </div>
                            <div className="exp-detail-item mt5">
                                <div className="exp-detail-left">金额(含税）</div>
                                <div className="exp-detail-right">{data.lineSumAmount ? changeNum(data.lineSumAmount) : '-'}</div>
                            </div>
                        </div>
                        <div className="exp-detail-cell bt-gray">
                            <div className="exp-detail-item">
                                <div className="exp-detail-left">费用类型</div>
                                <div className="exp-detail-right">{data.expenseType || '-'}</div>
                            </div>
                            <div className="exp-detail-item mt5">
                                <div className="exp-detail-left">预算科目</div>
                                <div className="exp-detail-right">{data.budgetItemCode || '-'}</div>
                            </div>
                            <div className="exp-detail-item mt5">
                                <div className="exp-detail-left">事项</div>
                                <div className="exp-detail-right">{data.dimension4 || '-'}</div>
                            </div>
                            <div className="exp-detail-item mt5">
                                <div className="exp-detail-left">会计核算科目</div>
                                <div className="exp-detail-right">{data.gldAccountCode || '-'}</div>
                            </div>
                            <div className="exp-detail-item mt5">
                                <div className="exp-detail-left">产品</div>
                                <div className="exp-detail-right">{data.dimension2 || '-'}</div>
                            </div>
                            <div className="exp-detail-item mt5">
                                <div className="exp-detail-left">渠道</div>
                                <div className="exp-detail-right">{data.dimension3 || '-'}</div>
                            </div>
                        </div>
                        {(data.dateFrom || data.dateTo || data.travelPlace) && <div className="exp-detail-cell bt-gray">
                            <div className="exp-detail-item">
                                <div className="exp-detail-left">日期从</div>
                                <div className="exp-detail-right">{data.dateFrom || '-'}</div>
                            </div>
                            <div className="exp-detail-item mt5">
                                <div className="exp-detail-left">日期到</div>
                                <div className="exp-detail-right">{data.dateTo || '-'}</div>
                            </div>
                            <div className="exp-detail-item mt5">
                                <div className="exp-detail-left">出差地点</div>
                                <div className="exp-detail-right">{data.travelPlace || '-'}</div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        );
    }

}

export default connect((state) => { return state })(Detail);