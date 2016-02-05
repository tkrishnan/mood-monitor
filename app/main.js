'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./App.js');
var AccountContent = require('./account/AccountContent.js');
var AssessmentContent = require('./assessment/AssessmentContent.js');
var AssessmentResults = require('./assessment/AssessmentResults.js');
var CalendarContent = require('./calendar/CalendarContent.js');
var SafetyContent = require('./safetyPlan/SafetyPlanContent.js');
var TextMssgContent = require('./txtMssgContacts/TextMssgContent.js');

var Questions = require('./assessment/questions');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Redirect = require('react-router').Redirect;
//var NotFoundRoute =  require('react-router').NotFoundRoute;
var createBrowserHistory = require('history/lib/createBrowserHistory');
let history = createBrowserHistory();


var AppRoutes = (
  <Route path='/' component={App}>
  <IndexRoute component={AssessmentContent}/>
  <Route path='/assessment/question1' component={Questions.question1}/>
  <Route path='/assessment/question2' component={Questions.question2}/>
  <Route path='/assessment/question3' component={Questions.question3}/>
  <Route path='/assessment/question4' component={Questions.question4}/>
  <Route path='/assessment/question5' component={Questions.question5}/>
  <Route path='/assessment/question6' component={Questions.question6}/>
  <Route path='/assessment/question7' component={Questions.question7}/>
  <Route path='/assessment/question8' component={Questions.question8}/>
  <Route path='/assessment/question9' component={Questions.question9}/>
  <Route path='/assessment/question10' component={Questions.question10}/>
  <Route path='/assessmentResults' component={AssessmentResults}/>
  <Redirect from='/assessment' to='/'/>
  <Route path='/account' component={AccountContent}/>
  <Route path='/calendar' component={CalendarContent}/>
  <Route path='/safety-plan' component={SafetyContent}/>
  <Route path='/emergency-contacts' component={TextMssgContent}/>
  </Route>
);

ReactDOM.render(<Router history={history} routes={AppRoutes}/>, document.getElementById('content'));















































