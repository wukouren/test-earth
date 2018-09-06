import React, { Component } from 'react';
import { connect } from 'dva';
import { changeNum } from '../../../constant';

class PersonInfo extends React.Component {
	constructor(props) {
		super(props);
		// console.log('p',props)
		this.state = {
			// isFixed:false
			isFixed: this.props.dataFix,//是否固定
		};
	}
	componentWillReceiveProps(newProps) {
		//   console.log('xx',newProps)
		let self = this;
		this.state = {
			isFixed: newProps.dataFix,//是否固定
		};


	}
	handelShowAttent(content) {
		let self = this;
		self.props.handelToggle('attent', content);
	}
	showContent(which, content) {
		let self = this;
		self.props.onShowConfirm(which, content);
	}

	render() {
		let self = this;

		let dataInfo = self.props.dataInfo;
		let dataImg = self.props.dataImg;
		console.log('dataImg', dataImg);
		return (
			<div className="person-info "  >
				<div className="header-bg "></div>
				<div className={'img ' + (self.state.isFixed ? 'img-bg' : '')}>
					{!self.state.isFixed && <img src="images/bg-p.png" width="100%" />}
					{self.state.isFixed && <img src="images/bg-p2.png" width="100%" />}
				</div>
				<div className="person-content ">
					{!self.state.isFixed && <div className="p-content-left " >
						{/* <div className={'p-content-left '+ (self.state.isFixed ? 'fix-img' :'')} > */}
						{/* <img src="images/person-img.png" width="50"/> */}
						<img style={{ borderRadius: '50%' }} src={dataImg && dataImg.avatar.avatar_s} width="50" />
					</div>}
					{self.state.isFixed && <div className="fix-content ">
						<div className="fix-c-img">
							{/* <img src="images/person-img.png" width="50"/> */}
							<img style={{ borderRadius: '50%' }} src={dataImg && dataImg.avatar.avatar_s} width="50" />
						</div>
						<div className="fix-c-info ">
							<div className="fix-c-left ">{/*看右边显示的几个金额其宽度会改变*/}
								<div className="fix-left">
									<span className="fix-c-name ">{dataInfo.employeeName}</span>
									<span onClick={() => self.showContent('know', dataInfo.unitName)} className="fix-c-dept w70">{dataInfo.unitName}</span>
								</div>
								<div className="fix-c-dept mt5">{dataInfo.documentNumber}</div>
							</div>
							<div className="fix-c-right ">
								<div className="fix-c-right-name">总金额<br />({dataInfo.currencyCode || '-'})</div>
								<div className="fix-c-right-name mt10">{changeNum(dataInfo.documentAmount)}</div>
							</div>
							{dataInfo.documentType == 'EXP_REPORT' && <div className="fix-c-right ">
								<div className="fix-c-right-name">应付合计<br />({dataInfo.currencyCode || '-'})</div>
								<div className="fix-c-right-name mt10">{changeNum(dataInfo.paymentAmount)}</div>
							</div>}
						</div>
					</div>}
					{!self.state.isFixed && <div className="p-content-right ">
						<div className="p-right-cell">
							<div className="p-cell-left ">申请人</div>
							<div className="p-cell-right">{dataInfo.employeeName}</div>
						</div>
						<div className="p-right-cell" onClick={() => self.showContent('know', dataInfo.unitName)}>
							<div className="p-cell-left">申请部门</div>
							<div className="p-cell-right text-hidden ">{dataInfo.unitName}</div>
						</div>
						<div className="p-right-cell ">
							<div className="p-cell-left ">总金额({dataInfo.currencyCode || '-'})</div>
							{/* <div className="p-cell-left ">总金额(¥)</div> */}
							<div className="p-cell-right"> {dataInfo.documentAmount ? changeNum(dataInfo.documentAmount) : ''}</div>
						</div>
						{dataInfo.documentType == 'EXP_REPORT' && <div className="p-right-cell ">
							<div className="p-cell-left ">应付合计({dataInfo.currencyCode || '-'})</div>
							<div className="p-cell-right"> {changeNum(dataInfo.paymentAmount)}</div>
						</div>}
						<div className="p-right-cell ">
							<div className="p-cell-left ">单据编号</div>
							<div className="p-cell-right font-12">{dataInfo.documentNumber}</div>
						</div>
						{dataInfo.documentType == 'ACP_REQUISITION' && <div className="p-right-cell ">
							<div className="p-cell-left ">关联报销单号</div>
							<div className="p-cell-right font-12">{dataInfo.sourceDocumentNumber}</div>
						</div>}
						<div className="p-right-cell ">
							<div className="p-cell-left ">事由描述</div>
							{/* <div className="p-cell-right text-hidden " onClick={() => self.handelShowD(dataInfo.documentDescription)}>{dataInfo.documentDescription}</div> */}
							<div className="p-cell-right text-hidden " onClick={() => self.showContent('know', dataInfo.documentDescription)}>{dataInfo.documentDescription}</div>
						</div>
					</div>}
				</div>
			</div>
		);
	}
}

export default connect((state) => { return state })(PersonInfo);