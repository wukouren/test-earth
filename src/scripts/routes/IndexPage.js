const registerModel = (app, model)=>{
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}
module.exports = {
  path: 'index',
  onEnter:function(){
    
  },
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {

        let model = require('./../models/IndexPage')["default"];
        registerModel(window.dvaApp, model);
        cb(null, require('./../components/IndexPage')['default'])
      }, 'IndexPage')
    }
  }
}
