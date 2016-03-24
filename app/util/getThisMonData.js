var firebaseUtil = require('./firebaseUtil.js');


function retrieveThisMonthData(nextState, replaceState, callback) {
  firebaseUtil.loadThisMonthlyRecord(function(){
    console.log("this got called");
    callback();
  });
}

module.exports = retrieveThisMonthData;