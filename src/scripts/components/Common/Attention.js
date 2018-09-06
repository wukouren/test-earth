import React, { Component } from 'react';
import { connect } from 'dva';
// import { ConfirmBase,AlertBase} from './EpsModal';

class Attention extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	handelToggle() {
		let self = this;
		self.props.handelToggle('attent');
	}

	render() {
		let self = this;
		console.log('att', self.props);
		return (
			<div className="attention" onClick={() => self.handelToggle()}>
				<div className="attent-content ">
					<div className="header-img ">
					</div>
					<div className="attention-content " >
						{self.props.data}
					</div>
				</div>
			</div>
		);
	}
}

export default connect((state) => { return state })(Attention);