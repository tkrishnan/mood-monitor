var firebaseUtil = require('./firebaseUtil.js');
//var React = require('react');


function requireSurvey(nextState, replaceState, callback) {
  firebaseUtil.checkIfAssessed(function(assessed) {
    if (!assessed) {
      console.log("Not assessed today in DB, can't access assessment results without survey");
      replaceState({nextPathname: nextState.location.pathname}, '/dashboard');
    } else {
      console.log("Assessed today in DB, can access assessment results");
    }
    callback();
  }.bind(this));
}


module.exports = requireSurvey;