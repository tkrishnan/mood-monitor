'use strict';

require('./Calendar.css');
var React = require('react');

var moment = require('moment');
moment().format();

var firebaseUtil = require('../../util/firebaseUtil.js');

var RaisedButton = require('material-ui/lib/raised-button');
var WeekDayLabel = require('./WeekDayLabel.js');
var CalendarDay = require('./CalendarDay.js');

var ExpandIcon = require('material-ui/lib/svg-icons/navigation/expand-less');

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../rawTheme.js');


function outputDaysIntoArray(days) {
  return Array(parseInt(days)).fill().map(function(x,i) {return i+1});
}


var CalendarContent = React.createClass({
  childContextTypes: {
      muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
      return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  getInitialState: function() {
    return {thisMonth: null, pastMonthTitles: [], pastMonthRecs: [], pastMonthDays: [], pastMonthOffset: [], enabled: true, noMoreCal: ""};
  },
  componentWillMount: function() {
    var startNum = parseInt(moment().format("D"));
    var endNum = parseInt(moment().endOf('month').format("D"));
    var records = firebaseUtil.getThisMonthlyRecord();
    if (records) {
      for (var i = startNum; i <= endNum; i++) {
        records[i.toString()] = "Not Yet";
      }
      this.setState({thisMonth: records});
    }
  },
  handleClick: function() {
    //load titles for past month records
    var loadTitle;
    if (!this.state.pastMonthTitles) {
      loadTitle = moment().subtract(1, 'month').format("MMMM YYYY");
    } else {
      loadTitle = moment(this.state.pastMonthTitle[this.state.pastMonthTitle.length-1]).subtract(1, 'month').format("MMMM YYYY");
    }

    //load records for the past month
    var startDate = moment(loadTitle).subtract(1, 'month').startOf('month').format("MM-DD-YYYY");
    var endDate = moment(loadTitle).subtract(1, 'month').endOf('month').format("MM-DD-YYYY");
    firebaseUtil.retrieveMonthlyAssessmentRecord(startDate, endDate, function(records) {
      if (!records) {
        this.setState({noMoreCal: "No more earlier assessments taken"});
      } else {
        this.setState({pastMonthRecs: this.state.pastMonthRecs.concat([records])});
        this.setState({pastMonthTitles: this.state.pastMonthTitles.concat([loadTitle])});
      }
    }.bind(this));
    
    //load days array for the past month
    var daysNum = moment(loadTitle).subtract(1, 'month').endOf('month').format("D");
    this.setState({pastMonthDays: this.state.pastMonthDays.concat([outputDaysIntoArray(daysNum)])});
    
    //load offset days array for the past month
    var startDayOfWeek = parseInt(moment(loadTitle).subtract(1, 'month').startOf('month').format("e"));
    var numOffset = (startDayOfWeek - 1).toString();
    this.setState({pastMonthOffset: this.state.pastOffset.concat([outputDaysIntoArray(numOffset)])});
  },
  render: function() {
    var styles = {
      rootStyle: {
        width: '90%',
        height: '8vw',
        lineHeight: '8vw',
        margin: 'auto',
        marginTop: '2vw',
        flex: '1 1 auto',
      },
      labelStyle: {
        fontSize: '3vw'
      }
    };
    
    //figure out offset for showing correct starting weekday for this month
    var thisMonthStartWeekDay = parseInt(moment().startOf('month').format('e'));
    var numOffset = (thisMonthStartWeekDay - 1).toString();
    var offsetDays = outputDaysIntoArray(numOffset);
    
    var thisMonthNumDays = moment().endOf('month').format('D');
    var thisMonthDays = outputDaysIntoArray(thisMonthNumDays);
    console.log(this.state.thisMonth);
    return (
      <div id="calendarContent">
        <RaisedButton label="Previous Months" labelStyle={styles.labelStyle} labelPosition="after" icon={<ExpandIcon/>} primary={true} style={styles.rootStyle} onTouchTap={this.handleClick}/>
        <div id="pastCalendarContent">
        <div id="noMoreMessage">{this.state.noMoreCal}</div>
        {this.state.pastMonthRecs.map(function(i){
          return (<div className="pastCalendar">
            <div className="monthTitle"><h2>{this.state.pastMonthTitles[this.state.pastMonthTitles.length-1-i]}</h2></div>
            <WeekDayLabel/>
            {this.state.pastMonthOffset[this.state.pastMonthOffset.length-1-i].map(function(j){
              return (<div key={"offset"+i} className="offsetTile "/>);
            }, this)}
            {this.state.pastMonthDays[this.state.pastMonthDays.length-1-i].map(function(j){
              return (<CalendarDay key={i} date={i} data={this.state.pastMonthRecs[this.state.pastMonthRecs.length-1-i]}/>);
            }, this)}
          </div>);
        }, this)}
        </div>
        <div id="currentCalendarContent">
          <div className="monthTitle"><h2>{moment().format('MMMM YYYY')}</h2></div>
          <WeekDayLabel/>
          <div className="calendarGridList">
            {offsetDays.map(function(i){
              return (<div key={"offset"+i} className="offsetTile"/>);
            })}
            {thisMonthDays.map(function(i){
              return (<CalendarDay key={i} date={i} data={this.state.thisMonth[i.toString()]}/>);
            }, this)}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CalendarContent;
