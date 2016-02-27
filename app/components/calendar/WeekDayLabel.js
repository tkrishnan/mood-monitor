'use strict';

require('./Calendar.css');
var React = require('react');


var WeekDayLabel = React.createClass({
  childContextTypes: {
       muiTheme: React.PropTypes.object,
  },
  contextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
       return {muiTheme: this.context.muiTheme};
  }, 
  getInitialState: function() {
    return {
      muiTheme: this.context.muiTheme,
    };
  },
  render: function() {
    return (
      <div id="weekDayNames">
        <div id="mon" className="day">Mon</div>
        <div id="tue" className="day">Tue</div>
        <div id="wed" className="day">Wed</div>
        <div id="thu" className="day">Thu</div>
        <div id="fri" className="day">Fri</div>
        <div id="sat" className="day">Sat</div>
        <div id="sun" className="day">Sun</div>
      </div>
    );
  }
});

module.exports = WeekDayLabel;