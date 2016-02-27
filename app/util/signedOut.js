var firebaseUtil = require('./firebaseUtil.js');
var React = require('react');

function requireSignOut(nextState, replaceState) {
  if (firebaseUtil.isSignedIn()) {
    replaceState({nextPathname: nextState.location.pathname}, '/dashboard');
    console.log("signed in, can't go to sign in page and sign in again");
  } else {
    console.log("signed out, can go to the sign in page and sign in");
  }
}

module.exports = requireSignOut;