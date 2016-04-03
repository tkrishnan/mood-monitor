var firebaseUtil = require('./firebaseUtil.js');


function retrieveThisMonthData(nextState, replaceState, callback) {
  firebaseUtil.loadThisMonthlyRecord(function(){
    console.log("Load this month's assessment data");
    callback();
  });
}

module.exports = retrieveThisMonthData;