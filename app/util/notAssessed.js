var firebaseUtil = require('./firebaseUtil.js');


function requireNotAssessed(nextState, replaceState, callback) {
  firebaseUtil.checkIfAssessed(function(assessed) {
    if (assessed) {
      console.log("Assessed today, can access assessment results!!");
      replaceState({nextPathname: nextState.location.pathname}, '/assessment-results');
    } else {
      console.log("Not Assessed, can take assessment survey");
    }
    callback();
  }.bind(this));
}

module.exports = requireNotAssessed;