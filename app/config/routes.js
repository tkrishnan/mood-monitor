'use strict';

var React = require('react');

var Dashboard = require('../components/Dashboard.js');
var AccountContent = require('../components/account/AccountContent.js');
var AssessmentContent = require('../components/assessment/AssessmentContent.js');
var AssessmentResults = require('../components/assessment/AssessmentResults.js');
var CalendarContent = require('../components/calendar/CalendarContent.js');
var CreateAccount = require('../components/landing/CreateAccount.js');
var Landing = require('../components/landing/Landing.js');
var Questions = require('../components/assessment/questions');
var SafetyContent = require('../components/safetyPlan/SafetyPlanContent.js');
var SignIn = require('../components/landing/SignIn.js');
var SuggestionsForZero = require('../components/assessment/suggestions/ZeroDepression.js');
var SuggestionsForMinimal = require('../components/assessment/suggestions/MinimalDepression.js');
var SuggestionsForMild = require('../components/assessment/suggestions/MildDepression.js');
var SuggestionsForModerate = require('../components/assessment/suggestions/ModerateDepression.js');
var SuggestionsForModeratelySevere = require('../components/assessment/suggestions/ModeratelySevereDepression.js');
var SuggestionsForSevere = require('../components/assessment/suggestions/SevereDepression.js');
var ResetPassword = require('../components/landing/ResetPassword.js');
var TextMssgContent = require('../components/txtMssgContacts/TextMssgContent.js');

var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Redirect = require('react-router').Redirect;

var requireAuth = require('../util/authenticated.js');
var requireSignOut = require('../util/signedOut.js');
var requireSurvey = require('../util/assessed.js');
var requireNotAssessed = require('../util/notAssessed.js');
var retrieveThisMonthData = require('../util/getThisMonData.js');


var AppRoutes = (
  <Route>
    <Route path='/' component={Landing} onEnter={requireSignOut}>
      <IndexRoute component={SignIn}/>
      <Route path='/signin' component={SignIn}/>
          <Route path='/create-account' component={CreateAccount} onEnter={requireSignOut}/>
    </Route>
    <Route path='/reset-password' component={ResetPassword}/>
    <Route path='/dashboard' component={Dashboard} onEnter={requireAuth}>
      <IndexRoute component={AssessmentContent} onEnter={requireNotAssessed}/>
      <Route onEnter={requireNotAssessed}>
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
      </Route>
      <Route onEnter={requireSurvey}>
        <Route path='/assessment-results' component={AssessmentResults}/>
        <Route path='/assessment-results/suggestions/zero' component={SuggestionsForZero}/>
        <Route path='/assessment-results/suggestions/minimal' component={SuggestionsForMinimal}/>
        <Route path='/assessment-results/suggestions/mild' component={SuggestionsForMild}/>
        <Route path='/assessment-results/suggestions/moderate' component={SuggestionsForModerate}/>
        <Route path='/assessment-results/suggestions/moderately-severe' component={SuggestionsForModeratelySevere}/>
        <Route path='/assessment-results/suggestions/severe' component={SuggestionsForSevere}/>
      </Route>
      <Redirect from='/assessment' to='/dashboard'/>
      <Route path='/calendar' component={CalendarContent} onEnter={retrieveThisMonthData}/>
      <Route path='/safety-plan' component={SafetyContent}/>
      <Route path='/emergency-contacts' component={TextMssgContent}/>
    </Route>
  </Route>
);


module.exports = AppRoutes;