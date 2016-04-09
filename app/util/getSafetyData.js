var firebaseUtil = require('./firebaseUtil.js');


function retrieveSafetyPlanData(nextState, replaceState, callback) {
  firebaseUtil.loadSafetyPlanData(function(){
    console.log("Load Safety Plan data");
    callback();
  });
}

module.exports = retrieveSafetyPlanData;