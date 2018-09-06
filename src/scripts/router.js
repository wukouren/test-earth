import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Router, hashHistory, browserHistory } from 'dva/router';
import NotFound from './components/NotFound';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}


module.exports = function ({ hashHistory, app }) {
  const routeConfig = [
    {
      path: '',
      indexRoute: {
        getComponents(location, callback) {
          require.ensure([], function (require) {
            callback(null, require('./components/IndexPage')["default"]);
          }, 'IndexPage')
        },
        onEnter: function () {
        },
      },
      childRoutes: [
        require('./routes/List'),
        require('./routes/ListInfo'),
        require('./routes/history'),
        require('./routes/attach'),
        require('./routes/detailInfo'),
        require('./routes/ITSMInfo'),
        require('./routes/ITSMList'),
      ],
      // getChildRoutes(partialNextState, cb) {

      // }
    }, {
      path: '*',
      component: NotFound,
      onEnter: function () {
        alert(123);
      }
    }
  ]
  return (
    <Router routes={routeConfig} history={hashHistory} />
  );
};