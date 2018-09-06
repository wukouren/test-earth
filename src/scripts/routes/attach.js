import { registerModel } from '../constant';

module.exports = {
  path: 'attach',
  onEnter: function () {

  },
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {

        let model = require('./../models/attach')["default"];
        registerModel(window.dvaApp, model);
        cb(null, require('./../components/AttachMent')['default'])
      }, 'AttachMent')
    }
  }
}
