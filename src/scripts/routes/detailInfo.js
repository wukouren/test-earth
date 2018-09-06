import { registerModel } from '../constant';
module.exports = {
  path: 'detail',
  onEnter:function(){
    
  },
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {

        // let model = require('./../models/List')["default"];
        // registerModel(window.dvaApp, model);
        cb(null, require('./../components/Common/listInfo/Detail')['default'])
      }, 'Detail')
    }
  }
}
