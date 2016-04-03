'use strict';

require('./Calendar.css');
var React = require('react');

var moment = require('moment');
moment().format();

var firebaseUtil = require('../../util/firebaseUtil.js');

var RaisedButton = require('material-ui/lib/raised-button');
var ExpandIcon = require('material-ui/lib/svg-icons/navigation/expand-less');
var CircularProgress = require('material-ui/lib/circular-progress');
var WeekDayLabel = require('./WeekDayLabel.js');
var Calendar = require('./Calendar.js');

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
    return {thisMonth: null, pastMonths: [], pastMonthTitles: [], pastMonthRecs: [], pastMonthDays: [], pastMonthOffset: [], enabled: true, load: false, noMoreCal: null};
  },
  componentWillMount: function() {
    var startNum = parseInt(moment().add(1, 'day').format("D"));
    var endNum = parseInt(moment().endOf('month').format("D"));
    var records = firebaseUtil.getThisMonthlyRecord();
    if (!records) {
      records = {};
    }
    for (var i = startNum; i <= endNum; i++) {
      records[i.toString()] = "Not Yet";
    }
    this.setState({thisMonth: records});
  },
  handleClick: function() {
    //put load indicator there and disable button button
    this.setState({enabled: false});
    this.setState({load: true}, function(){
      //load titles for past month records
      setTimeout(function(){
      var pastMonth;
      var pastMonthTitle;
      if (this.state.pastMonths.length == 0) {
        pastMonth = moment().subtract(1, 'month');
        pastMonthTitle = moment().subtract(1, 'month').format("MMMM YYYY");
      } else {
        pastMonth = moment(this.state.pastMonths[this.state.pastMonths.length-1]).subtract(1, 'month');
        pastMonthTitle = moment(this.state.pastMonths[this.state.pastMonths.length-1]).subtract(1, 'month').format("MMMM YYYY");
      }
      
      //load records for the past month
      var startDate = moment(pastMonth).startOf('month').format("MM-DD-YYYY");
      var endDate = moment(pastMonth).endOf('month').format("MM-DD-YYYY");
      firebaseUtil.retrieveMonthlyAssessmentRecord(startDate, endDate, function(records) {
        if (!records) {
          this.setState({noMoreCal: "No more previous monthly assessment surveys taken"});
          //remove load indicator, keep button disabled
          this.setState({load: false});
        } else {
          this.setState({pastMonthRecs: this.state.pastMonthRecs.concat([records])});
          //load days array for the past month
          var daysNum = moment(pastMonth).endOf('month').format("D");
          this.setState({pastMonthDays: this.state.pastMonthDays.concat([outputDaysIntoArray(daysNum)])});
          this.setState({pastMonthTitles: this.state.pastMonthTitles.concat([pastMonthTitle])});
          //load offset days array for the past month
          var startDayOfWeek = parseInt(moment(pastMonth).startOf('month').format("e"));
          var offsetNum = (startDayOfWeek - 1).toString();
          this.setState({pastMonthOffset: this.state.pastMonthOffset.concat([outputDaysIntoArray(offsetNum)])});
          //load last indicator that will force rendering of past month calendar objects
          this.setState({pastMonths: this.state.pastMonths.concat([pastMonth])});
          //remove load indicator and enable button again
          this.setState({load: false});
          this.setState({enabled: true});
        }
      }.bind(this))}.bind(this), 1000);
    });
  },
  render: function() {
    var styles = {
      rootStyle: {
        width: '90%',
        height: '10vw',
        lineHeight: '10vw',
        margin: 'auto',
        marginTop: '2vw',
        marginBottom: '5vw',
        flex: '1 1 auto',
      },
      labelStyle: {
        fontSize: '3vw'
      },
      loadStyle: {
        width: '10%',
        margin: '0 auto',
        flex: '1 1 auto'
      }
    };
    
    //figure out offset for showing correct starting weekday for this month
    var thisMonthStartWeekDay = parseInt(moment().startOf('month').format('e'));
    var numOffset = (thisMonthStartWeekDay - 1).toString();
    var offsetDays = outputDaysIntoArray(numOffset);
    
    //create list of days/indices to iterate through in return function for current month view
    var thisMonthNumDays = moment().endOf('month').format('D');
    var thisMonthDays = outputDaysIntoArray(thisMonthNumDays);
    
    //create list of indices to iterate through in return function for past months looked up
    var pastMonthNum = outputDaysIntoArray(this.state.pastMonths.length.toString());
    
    if (this.state.load) {
      if (pastMonthNum.length > 0) {
        if (!this.state.noMoreCal) {
          return (
            <div id="calendarContent">
              <CircularProgress style={styles.loadStyle} size={0.75}/>
              <RaisedButton className="loadContent" label="Previous Months" labelStyle={styles.labelStyle} labelPosition="after" icon={<ExpandIcon/>} primary={true} style={styles.rootStyle} disabled={!this.state.enabled} onTouchTap={this.handleClick}/>
              <div id="pastCalendarContent">
              {pastMonthNum.map(function(i){
                return (<div className="pastCalendar" key={i}>
                  <div className="monthTitle"><h2>{this.state.pastMonthTitles[this.state.pastMonthTitles.length-i]}</h2></div>
                  <WeekDayLabel/>
                  <Calendar offset={this.state.pastMonthOffset[this.state.pastMonthOffset.length-i]} days={this.state.pastMonthDays[this.state.pastMonthDays.length-i]} records={this.state.pastMonthRecs[this.state.pastMonthRecs.length-i]} currentMonth={false}/>
                </div>);
              }, this)}
              </div>
              <div id="currentCalendarContent">
                <div className="monthTitle"><h2>{moment().format('MMMM YYYY')}</h2></div>
                <WeekDayLabel/>
                <Calendar offset={offsetDays} days={thisMonthDays} records={this.state.thisMonth} currentMonth={true}/>
              </div>
            </div>
          ); 
        } else {
          return (
            <div id="calendarContent">
              <CircularProgress style={styles.loadStyle} size={0.75}/>
              <RaisedButton className="loadContent" label="Previous Months" labelStyle={styles.labelStyle} labelPosition="after" icon={<ExpandIcon/>} primary={true} style={styles.rootStyle} disabled={!this.state.enabled} onTouchTap={this.handleClick}/>
              <div id="noMoreMessage">{this.state.noMoreCal}</div>
              <div id="pastCalendarContent">
              {pastMonthNum.map(function(i){
                return (<div className="pastCalendar" key={i}>
                  <div className="monthTitle"><h2>{this.state.pastMonthTitles[this.state.pastMonthTitles.length-i]}</h2></div>
                  <WeekDayLabel/>
                  <Calendar offset={this.state.pastMonthOffset[this.state.pastMonthOffset.length-i]} days={this.state.pastMonthDays[this.state.pastMonthDays.length-i]} records={this.state.pastMonthRecs[this.state.pastMonthRecs.length-i]} currentMonth={false}/>
                </div>);
              }, this)}
              </div>
              <div id="currentCalendarContent">
                <div className="monthTitle"><h2>{moment().format('MMMM YYYY')}</h2></div>
                <WeekDayLabel/>
                <Calendar offset={offsetDays} days={thisMonthDays} records={this.state.thisMonth} currentMonth={true}/>
              </div>
            </div>
          ); 
        }
      } else {
        if (!this.state.noMoreCal) {
          return (
            <div id="calendarContent">
              <CircularProgress style={styles.loadStyle} size={0.75}/>
              <RaisedButton label="Previous Months" labelStyle={styles.labelStyle} labelPosition="after" icon={<ExpandIcon/>} primary={true} style={styles.rootStyle} disabled={!this.state.enabled} onTouchTap={this.handleClick}/>
              <div id="currentCalendarContent">
                <div className="monthTitle"><h2>{moment().format('MMMM YYYY')}</h2></div>
                <WeekDayLabel/>
                <Calendar offset={offsetDays} days={thisMonthDays} records={this.state.thisMonth} currentMonth={true}/>
              </div>
            </div>
          );
        } else {
          return (
            <div id="calendarContent">
              <CircularProgress style={styles.loadStyle} size={0.75}/>
              <RaisedButton label="Previous Months" labelStyle={styles.labelStyle} labelPosition="after" icon={<ExpandIcon/>} primary={true} style={styles.rootStyle} disabled={!this.state.enabled} onTouchTap={this.handleClick}/>
              <div id="noMoreMessage">{this.state.noMoreCal}</div>
              <div id="currentCalendarContent">
                <div className="monthTitle"><h2>{moment().format('MMMM YYYY')}</h2></div>
                <WeekDayLabel/>
                <Calendar offset={offsetDays} days={thisMonthDays} records={this.state.thisMonth} currentMonth={true}/>
              </div>
            </div>
          );
        }
      }
    } else {
      if (pastMonthNum.length > 0) {
        if (!this.state.noMoreCal) {
          return (
            <div id="calendarContent">
              <RaisedButton className="loadContent" label="Previous Months" labelStyle={styles.labelStyle} labelPosition="after" icon={<ExpandIcon/>} primary={true} style={styles.rootStyle} disabled={!this.state.enabled} onTouchTap={this.handleClick}/>
              <div id="pastCalendarContent">
              {pastMonthNum.map(function(i){
                return (<div className="pastCalendar" key={i}>
                  <div className="monthTitle"><h2>{this.state.pastMonthTitles[this.state.pastMonthTitles.length-i]}</h2></div>
                  <WeekDayLabel/>
                  <Calendar offset={this.state.pastMonthOffset[this.state.pastMonthOffset.length-i]} days={this.state.pastMonthDays[this.state.pastMonthDays.length-i]} records={this.state.pastMonthRecs[this.state.pastMonthRecs.length-i]} currentMonth={false}/>
                </div>);
              }, this)}
              </div>
              <div id="currentCalendarContent">
                <div className="monthTitle"><h2>{moment().format('MMMM YYYY')}</h2></div>
                <WeekDayLabel/>
                <Calendar offset={offsetDays} days={thisMonthDays} records={this.state.thisMonth} currentMonth={true}/>
              </div>
            </div>
          ); 
        } else {
          return (
            <div id="calendarContent">
              <RaisedButton className="loadContent" label="Previous Months" labelStyle={styles.labelStyle} labelPosition="after" icon={<ExpandIcon/>} primary={true} style={styles.rootStyle} disabled={!this.state.enabled} onTouchTap={this.handleClick}/>
              <div id="noMoreMessage">{this.state.noMoreCal}</div>
              <div id="pastCalendarContent">
              {pastMonthNum.map(function(i){
                return (<div className="pastCalendar" key={i}>
                  <div className="monthTitle"><h2>{this.state.pastMonthTitles[this.state.pastMonthTitles.length-i]}</h2></div>
                  <WeekDayLabel/>
                  <Calendar offset={this.state.pastMonthOffset[this.state.pastMonthOffset.length-i]} days={this.state.pastMonthDays[this.state.pastMonthDays.length-i]} records={this.state.pastMonthRecs[this.state.pastMonthRecs.length-i]} currentMonth={false}/>
                </div>);
              }, this)}
              </div>
              <div id="currentCalendarContent">
                <div className="monthTitle"><h2>{moment().format('MMMM YYYY')}</h2></div>
                <WeekDayLabel/>
                <Calendar offset={offsetDays} days={thisMonthDays} records={this.state.thisMonth} currentMonth={true}/>
              </div>
            </div>
          ); 
        }
      } else {
        if (!this.state.noMoreCal) {
          return (
            <div id="calendarContent">
              <RaisedButton label="Previous Months" labelStyle={styles.labelStyle} labelPosition="after" icon={<ExpandIcon/>} primary={true} style={styles.rootStyle} disabled={!this.state.enabled} onTouchTap={this.handleClick}/>
              <div id="currentCalendarContent">
                <div className="monthTitle"><h2>{moment().format('MMMM YYYY')}</h2></div>
                <WeekDayLabel/>
                <Calendar offset={offsetDays} days={thisMonthDays} records={this.state.thisMonth} currentMonth={true}/>
              </div>
            </div>
          ); 
        } else {
          return (
            <div id="calendarContent">
              <RaisedButton label="Previous Months" labelStyle={styles.labelStyle} labelPosition="after" icon={<ExpandIcon/>} primary={true} style={styles.rootStyle} disabled={!this.state.enabled} onTouchTap={this.handleClick}/>
              <div id="noMoreMessage">{this.state.noMoreCal}</div>
              <div id="currentCalendarContent">
                <div className="monthTitle"><h2>{moment().format('MMMM YYYY')}</h2></div>
                <WeekDayLabel/>
                <Calendar offset={offsetDays} days={thisMonthDays} records={this.state.thisMonth} currentMonth={true}/>
              </div>
            </div>
          );  
        }
      }
    }
  }
});

module.exports = CalendarContent;
