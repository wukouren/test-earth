import { registerModel } from '../constant';

module.exports = {
  path: 'itSmList',
  onEnter: function () {

  },
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        let model = require('./../models/itSmList')["default"];
        registerModel(window.dvaApp, model);
        cb(null, require('./../components/ItSmList')['default'])
      }, 'ItSmList')
    }
  }
}
