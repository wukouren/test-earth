import React, { Component } from 'react';
import IScroll from '../../../../src/otherfiles/iscroll';
import PropTypes from 'prop-types';
// import 'ASSET/scss/kit/scroll.scss';

const defaultConfig = {
  preventDefault: true, // true 导致chrome warning
  mouseWheel: true,
  click: true,
  scrollX: true,
  // scrollY: false,
  // snap: true, // 默认为 undefine，设置为 true 后，可按一定步长移动。
};

// let thisScroll; 变量不可作为静态对象，会被全局修改
let threshold = 40;
let scrollOpts = {};

const LoadTips = (loadMore,showFooter) => {
  return (
    <div className={'scroll-load-tips '+(showFooter ? ' mb100' : '')}>
      {loadMore ? '上拉，加载更多' : '已经是全部啦！'}
    </div>
  );
};

export default class ScrollListBox extends Component {
  constructor(props) {
    super(props);
    scrollOpts = _.extend({}, props.opts);
    if (scrollOpts.needUpLoad) {
      this.state = {
        scroll: null,
        showTips: !scrollOpts.loadMore,
        needRefresh: false,
        isScrollToTop: false
      };
    } else {
      this.state = {
        showTips: false,
        needRefresh: false,
        isScrollToTop: false
      };
    };
  }
  componentDidMount() {
    let thisScroll = new IScroll('#' + scrollOpts.id, defaultConfig);
    thisScroll.on('scrollStart', () => this.scrollStart());
    thisScroll.on('scroll', () => this.scrolling());
    thisScroll.on('scrollEnd', () => this.scrollEnd());
    this.setState({
      scroll: thisScroll
    });
  }
  componentDidUpdate() {
    if (this.state.needRefresh) {
      this.state.scroll.refresh();
    };
    if (this.state.isScrollToTop) {
      this.scrollToTop();
    };
    this.state.scroll.scrollTo(0, this.props.opts.scrollY || 0);
    // this.setState({
    //     needRefresh: false,
    //     isScrollToTop: false
    // });
  }
  componentWillUnmount() {
    // console.log('scroll componentWillUnmount');
    // this.state.scroll.destroy();
    // this.state.scroll = null;
  }
  componentWillReceiveProps(nextProps) {
    scrollOpts = _.extend(scrollOpts, nextProps.opts);
    let showTips = scrollOpts.needUpLoad;
    if (scrollOpts.needUpLoad && scrollOpts.loadMore) {
      if (nextProps.children.length > this.props.children.length) {
        showTips = false;
      } else {
        showTips = true;
      }
    }
    this.setState({
      showTips: showTips,
      needRefresh: true,
      isScrollToTop: scrollOpts.isScrollToTop
    });
    if (nextProps.opts.scrollY && nextProps.opts.scrollY !== this.props.opts.scrollY) {
      this.state.scroll.scrollTo(0, nextProps.opts.scrollY);
    }
  }
  scrollStart() {
    scrollOpts.scrollStartEvent && scrollOpts.scrollStartEvent();
  }
  scrolling() {
    scrollOpts.scrollingEvent && scrollOpts.scrollingEvent();
  }
  scrollEnd() {
    if (scrollOpts.scrollEndEvent) {
      scrollOpts.scrollEndEvent(this.state.scroll);
    }
    if (scrollOpts.needUpLoad && scrollOpts.loadMore) {
      this.checkScrollWrapper();
    }
  }
  scrollToTop() {
    this.state.scroll.scrollTo(0, 0, 0);
  }
  checkScrollWrapper() {
    let curPagePosition = this.state.scroll.scrollerHeight + this.state.scroll.y;
    if ((curPagePosition - this.state.scroll.wrapperHeight) < threshold) {
      if (!this.state.showTips) {
        this.setState({
          showTips: true
        });
      } else {
        scrollOpts.scrollBottomEvent && scrollOpts.scrollBottomEvent();
      };
    };
  }
  render() {
    console.log('sssscroll---',this.props,scrollOpts);
    return (
      <div id={scrollOpts.id} style={this.props.style} className={this.props.className ? (this.props.className + " m-landscrop-scroll__wrapper") : "m-landscrop-scroll__wrapper"}>
        <div className="m-landscrop-scroll__scroller">
          {(this.props.children && this.props.children.length > 0) ? this.props.children : ''}
          {this.props.children && this.props.children.length > 0 && this.state.showTips && LoadTips(scrollOpts.loadMore,scrollOpts.showFooter)}
        </div>
      </div>
    );
  }
};

ScrollListBox.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.array,
  opts: PropTypes.object
};

// tipsOpt = {
    // id: '唯一值',
//     showTips: true, // 是否显示tips
//     text: '没有更多内容', // tips text
//     needUpLoad: false // 是否需要upload回调
    // scrollStartEvent: PropTypes.func,
    // scrollingEvent: PropTypes.func,
    // scrollBottomEvent: PropTypes.func,
// }
