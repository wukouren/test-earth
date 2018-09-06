import React, { Component } from 'react';
import { connect } from 'dva';

class ItSmList extends Component {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    let self = this;
    jw.showTabs({
      tabs: ['待处理', '已完成'],
      position: 'top',
      style: '33a6e2'
    })
    window.onJwSelectTab = function (index) {
      alert(index);
    }
    window.addEventListener('scroll', () => {
      // alert('11')
      self.scroll();
    })
  }
  scroll() {
    let a = document.body.scrollTop;
    let b = document.documentElement.scrollTop;
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    let wScrollY = window.scrollY;//当前滚动条的位置
    let wInnerH = window.innerHeight;//设置窗口的高度（不会变）
    let cInnerH = window.clientHeight;
    let bScrooH = document.body.scrollHeight;//滚动条的总高度
    console.log('1', a, '2', b, '3', scrollTop, '4', wScrollY, '5', wInnerH, '-', cInnerH, '6', bScrooH);


  }
  componentDidMount() {

  }
  handelToInfo() {
    let url = window.location.origin + '#/itSmInfo';
    jw.pushWebView(url);
  }
  render() {
    let self = this;
    return (
      <div className="list">
        <div className="list-sum"> 共34条</div>
        <div className="list-content m-top">
          <div className="lists">
            <div className="lists-content " onClick={() => self.handelToInfo()}>
              <div className="list-cell ">
                <div className="l-cell-title ">
                  <div>
                    <img src="images/approve.png" width="20" alt="" />
                    <span className="list-name" >CHG201805227273</span>
                  </div>
                  <div className="cell-time">
                    <img className="time-img" src="images/list/time.png" width="12" alt="" />
                    <span className="list-time">2018.05.22</span>
                  </div>
                </div>
                <div className="cell-item  mt17">
                  <div className="cell-item-left width-num">提交人</div>
                  <div >董子良</div>
                </div>
                <div className="cell-item ">
                  <div className="cell-item-left width-num">来源系统   </div>
                  <div> ITSM</div>
                  {/* <div >{item.dueAmount}</div> */}
                </div>
                <div className="cell-item ">
                  <div className="cell-item-left width-num" >变更分类</div>
                  <div className="cell-item-right" onClick={(e) => self.handelShowAttent(e, item.description)}>数据修改变更</div>
                </div>
              </div>
            </div>
            <div className="lists-content mt16">
              <div className="list-cell ">
                <div className="l-cell-title ">
                  <div>
                    <img src="images/approve.png" width="20" alt="" />
                    <span className="list-name" >CHG201805227273</span>
                  </div>
                  <div className="cell-time">
                    <img className="time-img" src="images/list/time.png" width="12" alt="" />
                    <span className="list-time">2018.05.22</span>
                  </div>
                </div>
                <div className="cell-item  mt17">
                  <div className="cell-item-left">提交人</div>
                  <div >董子良</div>
                </div>
                <div className="cell-item ">
                  <div className="cell-item-left">来源系统   </div>
                  <div> ITSM</div>
                  {/* <div >{item.dueAmount}</div> */}
                </div>
                <div className="cell-item ">
                  <div className="cell-item-left" >变更分类</div>
                  <div className="cell-item-right" onClick={(e) => self.handelShowAttent(e, item.description)}>数据修改变更</div>
                </div>
              </div>
            </div>
            <div className="lists-content mt16" onClick={() => self.handelToInfo()}>
              <div className="list-cell ">
                <div className="l-cell-title ">
                  <div>
                    <img src="images/approve.png" width="20" alt="" />
                    <span className="list-name" >CHG201805227273</span>
                  </div>
                  <div className="cell-time">
                    <img className="time-img" src="images/list/time.png" width="12" alt="" />
                    <span className="list-time">2018.05.22</span>
                  </div>
                </div>
                <div className="cell-item  mt17">
                  <div className="cell-item-left width-num">提交人</div>
                  <div >董子良</div>
                </div>
                <div className="cell-item ">
                  <div className="cell-item-left width-num">来源系统   </div>
                  <div> ITSM</div>
                  {/* <div >{item.dueAmount}</div> */}
                </div>
                <div className="cell-item ">
                  <div className="cell-item-left width-num" >变更分类</div>
                  <div className="cell-item-right" onClick={(e) => self.handelShowAttent(e, item.description)}>数据修改变更</div>
                </div>
              </div>
            </div>
            <div className="lists-content mt16">
              <div className="list-cell ">
                <div className="l-cell-title ">
                  <div>
                    <img src="images/approve.png" width="20" alt="" />
                    <span className="list-name" >CHCHCHHCHHCHCHCHCH</span>
                  </div>
                  <div className="cell-time">
                    <img className="time-img" src="images/list/time.png" width="12" alt="" />
                    <span className="list-time">2018.05.22</span>
                  </div>
                </div>
                <div className="cell-item  mt17">
                  <div className="cell-item-left">提交人</div>
                  <div >董子良</div>
                </div>
                <div className="cell-item ">
                  <div className="cell-item-left">来源系统   </div>
                  <div> ITSM</div>
                  {/* <div >{item.dueAmount}</div> */}
                </div>
                <div className="cell-item ">
                  <div className="cell-item-left" >变更分类</div>
                  <div className="cell-item-right" onClick={(e) => self.handelShowAttent(e, item.description)}>数据修改变更</div>
                </div>
              </div>
            </div>
            <div className="lists-content " onClick={() => self.handelToInfo()}>
              <div className="list-cell ">
                <div className="l-cell-title ">
                  <div>
                    <img src="images/approve.png" width="20" alt="" />
                    <span className="list-name" >CHCHCHHCHHCHCHCHCH</span>
                  </div>
                  <div className="cell-time">
                    <img className="time-img" src="images/list/time.png" width="12" alt="" />
                    <span className="list-time">2018.05.22</span>
                  </div>
                </div>
                <div className="cell-item  mt17">
                  <div className="cell-item-left width-num">提交人</div>
                  <div >董子良</div>
                </div>
                <div className="cell-item ">
                  <div className="cell-item-left width-num">来源系统   </div>
                  <div> ITSM</div>
                  {/* <div >{item.dueAmount}</div> */}
                </div>
                <div className="cell-item ">
                  <div className="cell-item-left width-num" >变更分类</div>
                  <div className="cell-item-right" onClick={(e) => self.handelShowAttent(e, item.description)}>数据修改变更</div>
                </div>
              </div>
            </div>
            <div className="lists-content mt16">
              <div className="list-cell ">
                <div className="l-cell-title ">
                  <div>
                    <img src="images/approve.png" width="20" alt="" />
                    <span className="list-name" >CHCHCHHCHHCHCHCHCH</span>
                  </div>
                  <div className="cell-time">
                    <img className="time-img" src="images/list/time.png" width="12" alt="" />
                    <span className="list-time">2018.05.22</span>
                  </div>
                </div>
                <div className="cell-item  mt17">
                  <div className="cell-item-left">提交人</div>
                  <div >董子良</div>
                </div>
                <div className="cell-item ">
                  <div className="cell-item-left">来源系统   </div>
                  <div> ITSM</div>
                  {/* <div >{item.dueAmount}</div> */}
                </div>
                <div className="cell-item ">
                  <div className="cell-item-left" >变更分类</div>
                  <div className="cell-item-right" onClick={(e) => self.handelShowAttent(e, item.description)}>数据修改变更</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(state => state)(ItSmList)
