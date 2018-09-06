import React, { Component } from 'react';
import { connect } from 'dva';
// import { ConfirmBase,AlertBase} from './EpsModal';

class Confirm extends React.Component {
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
	handelClose(val) {
		console.log('val--', val);
		let self = this;
		$('#confirm').attr('disabled', 'disabled');
		$('#reject').attr('disabled', 'disabled');
		let inputV;
		if (val == 'reject') {
			inputV = self.state.inputValue ? self.state.inputValue : '拒绝';
			self.props.handelClickB('confirm', inputV, 'REJECTED');
		} else if (val == 'approve') {
			// inputV='';
			self.props.handelClickB('confirm', inputV, 'APPROVED');
		} else {
			self.props.handelClickB(val, inputV);
		}

	}
	changeInput(e) {
		let val = e.target.value;
		let self = this;
		self.setState({
			inputValue: val
		})
	}

	render() {
		let self = this;
		console.log('ppp', self.props.showWhich, self.props.showBottom, self.props.imgUrl);
		return (
			<div className="reject-pop">
				{self.props.showWhich == 'reject' && <div className="reject">
					<div className="reject-up ">
						<img className="imgs" src="images/person-img.png" width="36" alt="" /><span>处理意见</span>
						<img onClick={() => self.handelClose('cancle')} className="imgDel " src="images/close.png" width="14" alt="" />
					</div>
					<div className="reject-content">
						<textarea placeholder="拒绝" onChange={(e) => self.changeInput(e)}></textarea>
					</div>
					<div className="reject-b">
						<button id="reject" className="reject-bottom" onClick={() => self.handelClose('reject')}>
							拒绝
                    </button>
						<img src="images/reject.png" width="18" alt="" />
					</div>
				</div>}
				{self.props.showWhich == 'approve' && <div className="approve ">
					<div className="approve-title">请确认同意</div>
					<div className="approve-bottom">
						<button className="approve-flex " onClick={() => self.handelClose('cancle')}>取消</button>
						<button id="confirm" className="approve-flex bl-gray" onClick={() => self.handelClose('approve')}>确认</button>
					</div>
				</div>}
				{self.props.showWhich == 'know' &&
					<div className="know-content">
						<div className="know">
							<div className="know-title">
								{self.props.imgUrl && <div className="mb30"><img src={self.props.imgUrl} width="126" alt="" /></div>}
								<div>{self.props.showText}</div>
							</div>
							<div className="know-bottom" onClick={() => self.handelClose('cancle')}>知道了</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default connect((state) => { return state })(Confirm);