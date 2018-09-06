import React , {Component} from 'react';
import {connect} from 'dva';
class IndexPage extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render(){
    var self=this;
    return(
        <div className="indexpage">
          hello world!
        </div>
      )
  }
}

export default connect((state)=>{return state})(IndexPage);
