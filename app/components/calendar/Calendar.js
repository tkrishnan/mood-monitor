'use strict';

require('./Calendar.css');
var React = require('react');

var CalendarDay = require('./CalendarDay.js');


var Calendar = React.createClass({
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
    return {muiTheme: this.context.muiTheme};
  },
  render: function() {
    if (this.props.offset) {
      return (
        <div className="calendarGridList">
          {this.props.offset.map(function(i){
            return (<div key={"offset"+i} className="offsetTile "/>);
          }, this)}
          {this.props.days.map(function(i){
            return (<CalendarDay key={i} date={i} data={this.props.records[i]} currentMonth={this.props.currentMonth}/>);
          }, this)}
        </div>
      );
    } else {
      return (
        <div className="calendarGridList">
          {this.props.days.map(function(i){
            return (<CalendarDay key={i} date={i} data={this.props.records[i]} current={this.props.currentMonth}/>);
          }, this)}
        </div>
      );      
    }
  }
});

module.exports = Calendar;
