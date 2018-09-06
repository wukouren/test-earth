
module.exports = {
  path: 'filter',
  onEnter: function () {

  },
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        // let model = require('./../models/filter')["default"];
        // registerModel(window.dvaApp, model);
        cb(null, require('./../components/filter')['default'])
      }, 'AttachMent')
    }
  }
}
