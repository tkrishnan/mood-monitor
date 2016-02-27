'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var AppRoutes = require('./config/routes.js');

var Router = require('react-router').Router;
var createBrowserHistory = require('history/lib/createBrowserHistory');
let history = createBrowserHistory();

var injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();


ReactDOM.render(
  <Router history={history} routes={AppRoutes}/>, 
  document.getElementById('content')
);















































