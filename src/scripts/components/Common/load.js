import React,{ Component }from 'react';
import { connect } from 'dva';
// import { ConfirmBase,AlertBase} from './EpsModal';

 class Load extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        inputValue:''
    };
  }
  
  render(){
    let self=this;
    console.log('ppp',self.props.showWhich,self.props.showBottom,self.props.imgUrl);
    return (
        <div className="loading">
             <div className="loading-content">
                 <img src="images/list/loading.gif" width="16" alt=""/>
             </div>
        </div>
    );
  }
}

export default connect((state)=>{return state})(Load);