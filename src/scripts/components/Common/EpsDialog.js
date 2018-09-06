/**
 * 审批弹框 五星评价弹框
 */

import React,{ Component } from 'react';
import { connect } from 'dva';


class EpsDialog extends Component{
	constructor(props){
		super(props);
		this.state = {
			show:props["data"]["show"]?true:false,
			moving:false
		}
	}
	FormChange(values,schema){
		// console.log("values:",values,"FormChange:",schema);
	}
	changeData(){}
	render(){
		let data = this.props.data || {
			title:'请您评价',
			buttonIconClass:'icon-check',
			buttonVal:'完成'
		}
		data.avatar = data.avatar ? data.avatar : 'images/user-normal.png';
		let show,
			moveing = '';
		if(this.state['moving']){
			show = true;
			if(this.state['show']){
				moveing = 'bounceOutDown'
			}else{
				moveing = 'bounceInUp'
			}

		}else{
			moveing = '';
			show = this.state['show']
		}
		return (<div className={"eps-dialog "+(data['fix']?'fix ':' ')+(show?'':'hide')}>
			<div className="eps-dialog-mark"></div>
			<div className={"eps-dialog-w animated "+(moveing)}>
				<div className="eps-dialog-close icon-close-b" onClick={(e)=>this.close(e)}></div>
				<div className="eps-dialog-title">
					<div className="eps-dialog-pic"><img src={data["avatar"]}></img></div>
					<div className="eps-dialog-title-c">{data["title"]}</div>
				</div>
				<div className="eps-dialog-c">
					{this.props['Component']}
				</div>
				<div className="eps-dialog-btn" onClick={(e)=>this.btnClick(e)}>
					<i className={data["buttonIconClass"]}></i>
					<span>{data["buttonVal"]}</span>
				</div>
			</div>
		</div>)
	}
	componentWillReceiveProps(nextProps){
		let self = this;
		if(nextProps && nextProps["data"]['show']!=this.state['show']){
			this.setState({
				moving:true
			})
			setTimeout(function(){
				self.setState({show:nextProps["data"]['show'], moving:false})
			},800)
		}else{
		}
	}
	componentDidUpdate(){
		if(this.props.data['fix']){
			let height = $('.eps-dialog-w').height();
			$('.eps-dialog-w').css({
				marginTop:-(height/2)+'px'
			})
		}
		if(this.props.data['show']){
			$('.main-c').addClass('hide-scroll')
		}else{
			$('.main-c').removeClass('hide-scroll')
		}
	}
	close(){
		let self = this;
		this.setState({moving:true})
		setTimeout(function(){
			self.setState({
				show:false,
				moving:false
			})
			self.props.close()
		},800)
	}
	btnClick(e){
		this.props.btnClick(e);
	}
	componentDidMount(){
	}
};

export default connect((state)=>{return state})(EpsDialog);
