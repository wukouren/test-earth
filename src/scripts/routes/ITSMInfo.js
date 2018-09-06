import { registerModel } from '../constant';

module.exports = {
  path: 'itSmInfo',
  onEnter: function () {

  },
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        let model = require('./../models/itSmInfo')["default"];
        registerModel(window.dvaApp, model);
        cb(null, require('./../components/ItSmInfo')['default'])
      }, 'ItSmInfo')
    }
  }
}
