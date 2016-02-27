var firebaseUtil = require('./firebaseUtil.js');
var React = require('react');


function requireAuth(nextState, replaceState) {
  if (!firebaseUtil.isSignedIn()) {
    console.log("not logged in, can't access dashboard");
    replaceState({nextPathname: nextState.location.pathname}, '/signin');
  } else {
    console.log("logged in, can access dashboard");
  }
}

module.exports = requireAuth;