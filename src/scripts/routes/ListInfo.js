import { registerModel } from '../constant';
module.exports = {
  path: 'listInfo/UAID=:id',
  // path: 'listInfo',
  onEnter: function () {

  },
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {

        let model = require('./../models/ListInfo')["default"];
        registerModel(window.dvaApp, model);
        cb(null, require('./../components/ListInfo')['default'])
      }, 'ListInfo')
    }
  }
}
