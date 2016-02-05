'use strict';

require('./Calendar.css');
var React = require('react');

var Colors = require('material-ui/lib/styles/colors');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../rawTheme.js');

var WeekDayLabel = React.createClass({
  render: function() {
    return (
      <div id="weekDayNames">
        <span class="day">Mon</span>
        <span class="day">Tue</span>
        <span class="day">Wed</span>
        <span class="day">Thu</span>
        <span class="day">Fri</span>
        <span class="day">Sat</span>
        <span class="day">Sun</span>
      </div>
    );
  }
});

module.exports = WeekDayLabel;