'use strict';

require('./Calendar.css');
var React = require('react');

var moment = require('moment');
moment().format();

var WeekDayLabel = require('./WeekDayLabel.js');
var CalendarDay = require('./CalendarDay.js');
var createSubstData = require('./createSubstData.js');

//var expandIcon = require('material-ui/lib/svg-icons/navigation/expand-less');

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../rawTheme.js');


var CalendarContent = React.createClass({
  childContextTypes: {
      muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
      return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  render: function() {
    var numDays = moment().endOf('month').format('D');
    var currentDate =  moment();
    var dateObj = createSubstData.createCalDateObj(currentDate);
    var moodData = createSubstData.createMoodData(numDays);
    return (
      <div id="calendarContent">
        <div className="monthTitle"><h2>{moment().format('MMMM')}</h2></div>
        <WeekDayLabel/>
        <div className="calendarGridList">
          {dateObj.map(function(i){
            return <CalendarDay key={i} dateObj={i} moodObj={moodData[i.format('D')-1]}/>;
          })}
        </div>
      </div>
    );
  }
});

module.exports = CalendarContent;

        // <div className="expandBttn">
        //   <RaisedButton 
        //   icon={<expandIcon/>} 
        //   label="Earlier Months" 
        //   labelPosition="after" 
        //   primary={true} />
        // </div>