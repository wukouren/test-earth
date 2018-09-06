import { registerModel } from '../constant';
module.exports = {
  path: 'history',
  onEnter: function () {

  },
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {

        let model = require('./../models/history')["default"];
        registerModel(window.dvaApp, model);
        cb(null, require('./../components/HistoryFlow')['default'])
      }, 'HistoryFlow')
    }
  }
}
