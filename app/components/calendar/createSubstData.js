'use strict';

var React = require('react');
var moment = require('moment');
moment().format();

exports.createCalDateObj = function(date) {

  // clones the argument to another mutable object
  var cloneDate = date.clone();
  cloneDate.endOf('month');
  // // retrieves the number of days of the arg's month by retrieving the last day e.g. 28 or 29, 30, 31
  var numDays = cloneDate.format('D');
  cloneDate.startOf('month');
  var firstDay = cloneDate.clone();
  // answer to return
  var daysThisMon = [firstDay];
  //add date objects for entire month to answer
  for (var i=1; i<numDays; i++) {
    cloneDate.add(1, 'days');
    var addDay = cloneDate.clone();
    daysThisMon.push(addDay);
 }
  return daysThisMon;
};

exports.createMoodData = function(numDays) {
  
  var moodEvals = [
    "zero",
    "minimal",
    "mild",
    "moderate",
    "moderatelySevere",
    "severe"
  ]
  
  var moodData = [];
  
  for (var i=0; i<numDays; i++) {
    var index = Math.floor((Math.random() * 6));
    console.log(index);
    moodData.push(moodEvals[index]);
  }
  
  return moodData;
}