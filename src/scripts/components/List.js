import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Toast, WhiteSpace } from 'antd-mobile';
import Choose from './common/list/choose';
import Load from './common/load';
import Confirm from './common/Confirm';
import Attention from './common/Attention';
import Scroller from './common/iscrollIndex';
import { changeNum } from '../constant';
// import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
class ListPage extends React.Component {
	constructor(props) {
		let store = new Store('Joywok:cache:tabs:personData');
		let cache = store.find({ id: 'tab:cache' }) || {};
		super(props);
		this.personInfo = cache["data"];
		this.state = {
		};
		let listData = this.props.list;
		this.defaultData = {
			pageNumber: listData.pageNumber,//当前页面
			pageShowNumber: listData.pageShowNumber,//一页显示的数据量
			standbyStates: listData.standbyStates,//待办已办标记, Y（已办）,N（待办）
			approveEmployeeCode: this.personInfo["employee_id"],//当前审批人（即工号，通过JSSDK可获取employee_id）
			dueAmountTo: listData.dueAmountTo,//总金额到
			employeeCode: listData.employeeCode,//单据提交人
			description: listData.description,//事由描述,可填写部分事由，作模糊查询
		};
	}
	componentWillMount() {
		let self = this;
		jw.setTitle({
			title: ' '
		})
		jw.showTabs({
			tabs: [    // 在 NavBar 中显示 Tab 页
				"待处理", "已完成",
			],
			position: 'top',
			style: "33a6e2"
		});
		self.getDataList({ pageNumber: 1 });

		PubSub.subscribe('reload', function (evt, data) {
			console.log('reload', data, data.sessionData);
			let sessionD = data.sessionData;
			let bool = data.reload;
			if (bool) {
				// alert('reload')
				self.getDataList({ pageNumber: 1 });
			}
		});

		PubSub.subscribe('filter', function (evt, data) {
			console.log('filter--', data);
			// 	let sessionD = data.sessionData;
			// 	let bool = data.reload;
			// 	if (bool) {
			// 		// alert('reload')
			// 		self.getDataList({ pageNumber: 1 });
			// 	}
		});
	}
	componentDidMount() {
		let self = this;
		let dispatch = self.props.dispatch;
		window.addEventListener('scroll', () => {
			self.scrolls()
		})
		window.onJwSelectTab = function (index) {
			//index在IOS中事number，在安卓事string
			// console.log('index',typeof index)
			//调接口待处理，已完成
			if (index == 0) {
				window.scrollTo(0, 0);
				self.resetStatus('N');
				self.getDataList({ pageNumber: 1, standbyStates: 'N', employeeCode: '', dueAmountFrom: '', dueAmountTo: '' })
			} else {
				window.scrollTo(0, 0);
				self.resetStatus('Y');
				self.getDataList({ pageNumber: 1, standbyStates: 'Y', employeeCode: '', dueAmountFrom: '', dueAmountTo: '' })
			}
		}
		PubSub.subscribe('filter', function (evt, data) {
			console.log('filter222--', data);
			self.handelfilter(data.name, data.dueAmountFrom, data.dueAmountTo);
			// 	let sessionD = data.sessionData;
			// 	let bool = data.reload;
			// 	if (bool) {
			// 		// alert('reload')
			// 		self.getDataList({ pageNumber: 1 });
			// 	}
		});
	}

	componentWillReceiveProps(newProps) {
		let self = this;
		let dispatch = self.props.dispatch;
		let newIsGetDate = newProps.list.isGetData;
		let oldIsGetData = this.props.list.isGetData;
		if (newIsGetDate != oldIsGetData && newIsGetDate) {
			window.scrollTo(0, 0);
			self.getDataList({ pageNumber: 1 });
			dispatch({
				type: 'list/setKeyValue',
				payload: {
					isBulk: false,//是否批量
					isFixed: false,//是否固定在最上面
					isAll: false,//是否点击全选,
					scrollTop: 0,
					pageNumber: 1,
				}
			})
		}
		// console.log('newProps',newIsGetDate,oldIsGetData);
	}
	resetStatus(val) {
		let self = this;
		let dispatch = self.props.dispatch;
		dispatch({
			type: 'list/setKeyValue',
			payload: {
				isBulk: false,//是否批量
				isFixed: false,//是否固定在最上面
				isAll: false,//是否点击全选,
				scrollTop: 0,
				pageNumber: 1,
				standbyStates: val,
				employeeCode: '',
				dueAmountFrom: '',
				dueAmountTo: ''
			}
		})
	}

	scrolls() {
		let self = this;
		let dispatch = self.props.dispatch;
		let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if (parseInt(scrollTop) >= 1) {
			dispatch({
				type: 'list/setKeyValue',
				payload: {
					isFixed: true
				}
			})
		} else {
			dispatch({
				type: 'list/setKeyValue',
				payload: {
					isFixed: false
				}
			})
		}
		let wScrollY = window.scrollY; // 当前滚动条位置    
		let wInnerH = window.innerHeight; // 设备窗口的高度（不会变）    
		let bScrollH = document.body.scrollHeight; // 滚动条总高度 
		if (wScrollY + wInnerH >= bScrollH) {
			self.scrollUp();
		}
	}
	getDataList(val) {
		let self = this;
		let dispatch = this.props.dispatch;
		let defaultData = self.defaultData;
		let newDate = _.extend(defaultData, val)
		dispatch({
			type: 'list/setKeyValue',
			payload: {
				showload: true
			}
		});
		dispatch({
			type: 'list/getDataList',
			payload: {
				params: {
					requestHead: window.requestHead,
					requestBody: newDate
				}
			},
			dispatch: dispatch
		})

	}

	handelToInfo(item) {
		//   let url=window.location.origin+'/build#/listInfo/UAID=CCICHEC2481';
		//   let url=window.location.origin+'/build#/listInfo/UAID=CCICHEC3081';
		//   let url=window.location.origin+'/build#/listInfo/UAID=CCICHEC5041';
		//   let url=window.location.origin+'/build#/listInfo/UAID=CCICHEC1002';
		// let url=window.location.origin+'/build#/listInfo/UAID=CCICHEC2601';
		// let url=window.location.origin+'/build#/listInfo/UAID=CCICHEC6581';
		// let url=window.location.origin+'/build#/listInfo/UAID='+item.UAID;

		// console.log('url',url);
		//   jw.pushWebView(url);
	}

	// //点击过滤筛选
	// handelShowChoose() {
	// 	window.scrollTo(0, 0);
	// 	let self = this;
	// 	let dispatch = self.props.dispatch;
	// 	dispatch({
	// 		type: 'list/setKeyValue',
	// 		payload: {
	// 			showChoose: true
	// 		}
	// 	})
	// }
	handelShowChoose() {
		let self = this;
		let searchData = {
			employeeCode: self.props.list.employeeCode || '',
			dueAmountFrom: self.props.list.dueAmountFrom || '',
			dueAmountTo: self.props.list.dueAmountTo || '',
			emplyeeId: self.personInfo["employee_id"]
		};
		window.upTabsData('filterData', 'cache', searchData);
		// let url = window.location.origin + '/build#/list/result/batchNumber=' + 'T000000000921';
		// let url = window.location.origin + '#/list/filter';
		let url = window.location.origin + '/build/#/list/filter';
		// let url = window.location.origin + '#/itSmList';
		console.log('uu', url)
		// let url = window.location.origin + '/build#/itSmInfo';
		jw.pushWebView(url);
	}
	//点击筛选里面的确认按钮
	handelfilter(name, numStart, numEnd) {
		//工号，金额
		// console.log('handelfilter',name,numStart,numEnd);
		//调接口（筛选接口）
		let self = this;
		let dispatch = self.props.dispatch;
		self.resetStatus(self.props.list.standbyStates);
		dispatch({
			type: 'list/setKeyValue',
			payload: {
				showChoose: false,
				dueAmountFrom: numStart,//总金额从
				dueAmountTo: numEnd,//总金额到
				employeeCode: name,//单据提交人工号
			}
		})
		let params = {
			dueAmountFrom: numStart,//总金额从
			dueAmountTo: numEnd,//总金额到
			employeeCode: name,//单据提交人工号
			pageNumber: 1
		};
		window.scrollTo(0, 0);
		self.getDataList(params);
	}
	//点击批量审批
	handelBulk() {
		let self = this;
		let dispatch = self.props.dispatch;
		if (self.props.list.standbyStates == 'N') {
			let dataList = self.props.list.dataList;
			_.each(dataList, function (item, i) {
				item.active = false;
			})
			dispatch({
				type: 'list/setKeyValue',
				payload: {
					isBulk: !self.props.list.isBulk,
					dataList: dataList,
					isAll: false
				}
			})
		}
	}
	//点击全选按钮
	selectAll() {
		let self = this;
		let dispatch = self.props.dispatch;
		let data = self.props.list.dataList;
		let totalSize = self.props.list.totalSize;
		let isAll = self.props.list.isAll;
		if (isAll) {
			_.each(data, function (item, i) {
				item.active = false;
			})
		} else {
			_.each(data, function (item, i) {
				if (i <= 99) {
					item.active = true;
				} else {
					item.active = false;
				}
			})
		}
		if (totalSize > 100) {
			// if(data.length>100){
			dispatch({
				type: 'list/setKeyValue',
				payload: {
					isAll: !self.props.list.isAll,
					showConfirm: isAll ? '' : 'know',
					showText: '单次批量最多100条,已为您选中前100条'
					// showText:'单次批量最多20条单据'
					//   showReject:isAll ? '' : 'know'
				}
			})
		} else {
			dispatch({
				type: 'list/setKeyValue',
				payload: {
					isAll: !self.props.list.isAll,
					// showText:'单次批量最多20条单据'
					//   showReject:isAll ? '' : 'know'
				}
			})
		}

	}
	//点击我知道了
	handelClickB(val, inputValue, data) {
		console.log('rreject', val, inputValue);
		let self = this;
		let dispatch = self.props.dispatch;
		console.log('tongyi ', self.props.list.dataList);
		let dataList = self.props.list.dataList;
		let seletedData = _.filter(dataList, function (item, i) { return item.active == true; })
		let newArr = [];
		_.each(seletedData, function (item, i) {
			newArr.push({
				UAID: item.UAID
			})
		})
		console.log('seletedData', seletedData, newArr);
		switch (val) {
			case 'cancle':
				dispatch({
					type: 'list/setKeyValue',
					payload: {
						showConfirm: '',
						showText: ''
					}
				});
				break;
			case 'confirm':
				// alert('confirm')
				// 调同意的接口和不同意的接口
				// alert('sss');
				dispatch({
					type: 'list/setKeyValue',
					payload: {
						showload: true
					}
				});
				dispatch({
					type: 'list/getApprove',
					payload: {
						params: {
							requestHead: window.requestHead,
							requestBody: {
								// UAID:self.props.params.id,
								approveStatus: data,
								description: inputValue,
								toDoList: newArr
							}
						}
					}
				});
				break;
		}
	}

	handelItem(items) {
		let self = this;
		let isBulk = self.props.list.isBulk;
		let dispatch = self.props.dispatch;
		let data = self.props.list.dataList;
		let selectArr = _.filter(data, function (item, i) { return item.active == true; });
		if (isBulk) {
			if ((!items.active && selectArr.length < 100) || (items.active)) {
				_.each(data, function (item, i) {
					if (item.UAID == items.UAID) {
						item.active = !item.active;
					}
				})
				dispatch({
					type: 'list/setKeyValue',
					payload: {
						dataList: data,
						isAll: false
					}
				})
			} else {
				dispatch({
					type: 'list/setKeyValue',
					payload: {
						showConfirm: 'know',
						// showText:'最多只能选择3条数据'
						showText: '单次批量最多100条单据'
					}
				})
			}

		} else {

			// let url = window.location.origin + '#/listInfo/UAID=' + items.UAID;
			let url = window.location.origin + '/build/#/listInfo/UAID=' + items.UAID;
			jw.pushWebView(url);
		}
	}
	//显示事由描述
	handelShowAttent(e, text) {
		// console.log('e',text);
		// e.stopPropagation();
		// let self=this;
		// let dispatch=self.props.dispatch;
		// 	dispatch({
		// 	type:'list/setKeyValue',
		// 	payload:{
		// 		showReason:text
		// 	}
		// })
	}
	handelToggle(val, content) {
		let self = this;
		let dispatch = self.props.dispatch;
		dispatch({
			type: 'list/setKeyValue',
			payload: {
				showReason: ''
			}
		})
	}

	handelReject() {
		let self = this;
		let dispatch = self.props.dispatch;
		dispatch({
			type: 'list/setKeyValue',
			payload: {
				showConfirm: 'reject'
			}
		})
	}

	handelApprove() {
		let self = this;
		let dispatch = self.props.dispatch;
		dispatch({
			type: 'list/setKeyValue',
			payload: {
				showConfirm: 'approve'
			}
		})
	}
	scrollUp() {
		let self = this;
		console.log('scrollUp', self.props.list.totalSize, self.state.pageShowNumber, self.props.list.pageNumber)
		// 下拉刷新

		let dispatch = self.props.dispatch;
		let currentP = self.props.list.pageNumber;
		if (Math.ceil(self.props.list.totalSize / self.props.list.pageShowNumber) > currentP) {
			dispatch({
				type: 'list/setKeyValue',
				payload: {
					pageNumber: currentP + 1
				}
			})
			self.getDataList({ pageNumber: currentP + 1 });
		}
	}
	scrollEnd(scroller) {
		console.log('scrollEnd', scroller.y)
		let scrollY = scroller.y;
		let self = this;
		let dispatch = self.props.dispatch;
		if (scrollY < 0) {
			dispatch({
				type: 'list/setKeyValue',
				payload: {
					scrollTop: scroller.y,
					isFixed: true
				}
			})
		} else {
			dispatch({
				type: 'list/setKeyValue',
				payload: {
					scrollTop: scroller.y,
					isFixed: false
				}
			})
		}
	}
	scrolling() {

	}

	changeDate(val) {
		let newDate = val.split('-').join('.');
		return newDate;
	}



	render() {
		let self = this;
		let searchData = {
			employeeCode: self.props.list.employeeCode || '',
			dueAmountFrom: self.props.list.dueAmountFrom || '',
			dueAmountTo: self.props.list.dueAmountTo || '',
			emplyeeId: self.personInfo["employee_id"]
		};
		let dataList = self.props.list.dataList;
		console.log('rrrrr1111', self.props.list);
		let isFixed = self.props.list.isFixed;
		let showConfirm = self.props.list.showConfirm;
		let showText = self.props.list.showText;
		let isAll = self.props.list.isAll;
		let selectedNum = 0;
		_.each(dataList, function (item, i) {
			if (item.active) {
				selectedNum++;
			}
		})
		//    let text='公务出公务出差到北京公务出差到北京公务出差到北京公务出差到北京公务出差到北公务出差到北京公务出差到北京公务出差到北京公务出差到北京公务出差到北京京差到北京';
		let showReason = self.props.list.showReason;
		//  dataList=[];
		// let scrollerOpts={
		// 	id: 'listScroll',
		// 	scrollBottomEvent: () => this.scrollUp(),
		// 	scrollEndEvent: (scroller) => this.scrollEnd(scroller),
		// 	scrollingEvent: () => this.scrolling(),
		// 	isScrollToTop: false,
		// 	scrollY: this.props.list.scrollTop,
		// 	needUpLoad: true,
		// 	loadMore: Math.ceil(this.props.list.totalSize / this.props.list.pageShowNumber) > this.props.list.pageNumber,
		//   showFooter:	!!selectedNum
		// };

		let filter;
		if (self.props.list.dueAmountFrom || self.props.list.dueAmountTo || self.props.list.employeeCode) {
			filter = true;
		}
		let loadMore = Math.ceil(this.props.list.totalSize / this.props.list.pageShowNumber) > this.props.list.pageNumber;
		return (
			<div className="list">
				{!isFixed && <div className="">
					<img src="images/list/bg.png" width="100%" alt="" />
				</div>}
				<div className={'list-content ' + (isFixed ? 'is-fixed' : '')}>
					{/* <div className="fixed"> */}
					<div className={isFixed ? 'fixed' : ''}>
						<div className={"content-choose " + (isFixed ? '' : 'b-radius')}>
							<div className={'choose-item ' + (filter ? 'color-green' : '')} onClick={() => self.handelShowChoose()}>
								{!filter && <img className="choose-img" src="images/list/filter.png" width="16" alt="" />}
								{filter && <img className="choose-img" src="images/list/filter-choose.png" width="16" alt="" />}
								过滤筛选
							</div>
							<div className={"choose-item " + (self.props.list.isBulk ? 'color-green' : '')} onClick={() => self.handelBulk()}>
								{!self.props.list.isBulk && <img className="choose-img" src="images/list/approve.png" width="18" alt="" />}
								{self.props.list.isBulk && <img className="choose-img" src="images/list/approve-choose.png" width="18" alt="" />}
								批量审批
							</div>
						</div>
						{!!dataList.length && <div className={'list-num ' + (isFixed ? 'padding20' : '')}>
							<div>总 {self.props.list.totalSize} 条{self.props.list.standbyStates == 'N' ? '待审批' : ''}{!!selectedNum && selectedNum > 0 && <span>，选中 {selectedNum} 条</span>}</div>
							{self.props.list.isBulk && <div className="select-all" onClick={() => self.selectAll()}>
								{!isAll && <img className="select-img" src="images/list/select.png" width="22" alt="" />}
								{isAll && <img className="select-img" src="images/list/selected.png" width="22" alt="" />}
								<span className="all">全选</span>
							</div>}
						</div>}
					</div>
					{!!dataList.length && <div className={'lists ' + (isFixed ? 'mt90' : '')}>
						{/* <Scroller opts={scrollerOpts}> */}
						{_.map(dataList, function (item, i) {
							return <div className={"lists-content " + (i == 0 ? '' : 'mt16 ')} onClick={() => self.handelItem(item)}>
								{self.props.list.isBulk && <div className="img" >
									{!item.active && <img src="images/list/select.png" width="22" alt="" />}
									{item.active && <img src="images/list/selected.png" width="22" alt="" />}
								</div>}
								<div className={"list-cell " + (self.props.list.isBulk ? 'bulk' : '')}  >
									<div className="l-cell-title">
										<div>
											<img src="images/list/plane.png" width="20" alt="" />
											<span className="list-name" >{item.title}</span>
										</div>
										<div className="cell-time">
											<img className="time-img" src="images/list/time.png" width="12" alt="" />
											<span className="list-time">{item.reportDate ? self.changeDate(item.reportDate) : ''}</span>
										</div>
									</div>
									<div className="cell-item  mt17">
										<div className="cell-item-left">提交人</div>
										<div >{item.employeeName}</div>
									</div>
									<div className="cell-item ">
										<div className="cell-item-left">金额</div>
										<div>{changeNum(item.dueAmount)}</div>
										{/* <div >{item.dueAmount}</div> */}
									</div>
									<div className="cell-item ">
										<div className="cell-item-left" >事由</div>
										<div className="cell-item-right" onClick={(e) => self.handelShowAttent(e, item.description)}>{item.description}</div>
									</div>
								</div>
							</div>;
						})}
						{loadMore && <div className="list-bottom">上拉，加载更多</div>}
						{!loadMore && <div className="list-bottom">已经是全部啦！</div>}
						{/* </Scroller> */}
					</div>}
					{!dataList.length && <div className="list-empty ">
						<div className="img-content">
							<div>
								<img src="images/list/empty-pic.png" width="126" alt="" />
							</div>
							<div className="empty-text">没有搜索到匹配的单据</div>
						</div>
					</div>}
					{self.props.list.isBulk && <div>
						<WhiteSpace />
						<WhiteSpace />
					</div>}
				</div>
				{/* 过滤筛选 */}
				{self.props.list.showChoose && <Choose searchData={searchData} handelfilter={self.handelfilter.bind(this)} />}
				{showConfirm && <Confirm showWhich={showConfirm} showText={showText} imgUrl={'images/list/notice-all.png'} handelClickB={self.handelClickB.bind(this)} />}
				{!!selectedNum && <div className="list-footer">
					<div className="list-footer-flex bb-gray" onClick={() => self.handelReject()}>拒绝</div>
					<div className="list-footer-flex bg-green" onClick={() => self.handelApprove()}>同意</div>
				</div>}
				{showReason && <Attention data={showReason} handelToggle={self.handelToggle.bind(this)} />}
				{self.props.list.showload && <Load />}
			</div>

		)
	}

}

export default connect((state) => { return state })(ListPage);
