import { registerModel } from '../constant';
module.exports = {
  path: 'list',
  onEnter: function () {

  },
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        let model = require('./../models/List')["default"];
        registerModel(window.dvaApp, model);
        cb(null, require('./../components/List')['default'])
      }, 'List')
    }
  },
  childRoutes: [
    {
      path: 'filter',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./../components/filter')['default'])
        }, 'filter')
      }
    },
    {
      path: 'result/batchNumber=:batchNumber',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          let model = require('./../models/Result')["default"];
          registerModel(window.dvaApp, model);
          cb(null, require('./../components/result')['default'])
        }, 'result')
      }
    }
  ]
}
