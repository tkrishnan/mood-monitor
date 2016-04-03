'use strict';

require('./Calendar.css');
var React = require('react');

var moment = require('moment');
moment().format();

var Link = require('react-router').Link;

var evaluateScore = require('../../util/evaluateScore.js');

var FlatButton = require('material-ui/lib/flat-button');
var Popover = require('material-ui/lib/popover/popover');
var RaisedButton = require('material-ui/lib/raised-button');


var moodColors = {
  0: "#4dd0e1",
  1: "#00b0ff",
  2: "#00b0ff",
  3: "#0288d1",
  4: "#0288d1",
  5: "#01579b",
  6: "#01579b",
  7: "#3949ab",
  8: "#3949ab",
  9: "#1a237e",
  10: "#1a237e" 
};


var CalendarDay = React.createClass({
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
      open: false,
    };
  },
  handleTouchTap: function(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  },
  handleRequestClose: function() {
    this.setState({
      open: false
    });
  },
  render: function() {
    var styles = {
      flatButton: {
        maxWidth: '11%',
        minWidth: '11vw',
        maxHeight: '5%',
        minHeight: '11vw',
        margin: '0 auto',
        position: 'relative'
      },
      noMoodStyles: {
        color: '#455a64',
        fontWeight: '500',
        padding: '5vw'
      },
      raisedButton: {
        width: '40vw',
        height: '10vw',
        margin: '0 auto',
        position: 'relative',
        textAlign: 'center'
      },
      raisedLabel: {
        fontSize: '3vw'
      }
    };
    if ((this.props.date == parseInt(moment().format("D"))) && (this.props.currentMonth)) {
      if ((this.props.data) && (this.props.data != "Not Yet")) {
        var moodStyles= {
          calDay: {
            backgroundColor: moodColors[this.props.data.score.toString()], 
          },
          moodPopup: {
            color: moodColors[this.props.data.score.toString()],
          },
        };
        return (
          <div className="calendarDay">
            <FlatButton style={styles.flatButton} onTouchTap={this.handleTouchTap}>
              <div style={moodStyles.calDay} className="tile dayTile currentDay"> 
                <label>{this.props.date}</label>
              </div>        
            </FlatButton>
            <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
            onRequestClose={this.handleRequestClose}>
              <div style={moodStyles.moodPopup} className="moodPopOver">
                <h2>{evaluateScore(this.props.data.score)}</h2>
                {"score: "+this.props.data.score}
              </div>
            </Popover>
          </div>
        );  
      } else {
        return (
          <div className="calendarDay">
            <FlatButton style={styles.flatButton} onTouchTap={this.handleTouchTap}>
              <div style={{backgroundColor: "#b0bec5"}} className="tile dayTile currentDay">
                <label style={{color:"#37474f"}}>{this.props.date}</label>
              </div>
            </FlatButton>
            <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
            onRequestClose={this.handleRequestClose}>
              <div style={{padding: "5vw"}}>
                <RaisedButton label="Take the Survey" labelStyle={styles.raisedLabel} linkButton={true} containerElement={<Link to='/assessment'/>} secondary={true} style={styles.raisedButton}/>
              </div>
            </Popover>
          </div>
        );
      }
    } else {
      if (!this.props.data) {
        return (
          <div className="calendarDay">
            <FlatButton style={styles.flatButton} onTouchTap={this.handleTouchTap}>
              <div className="tile doneTile">
                <label>{this.props.date}</label>
              </div>
            </FlatButton>
            <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
            onRequestClose={this.handleRequestClose}>
              <div style={styles.noMoodStyles} className="moodPopOver">
                <h2>No assessment taken</h2>
              </div>
            </Popover>
          </div>
        );
      } else if (this.props.data == "Not Yet") {
        return (
          <div className="calendarDay">
          <div className="futureTileWrapper">
              <div className="tile futureTile">
                <label>{this.props.date}</label>
              </div>
            </div>
          </div>
        );
      } else if (this.props.data) {
        var moodStyles= {
          calDay: {
            backgroundColor: moodColors[this.props.data.score.toString()], 
          },
          moodPopup: {
            color: moodColors[this.props.data.score.toString()],
          },
        };
        return (
          <div className="calendarDay">
            <FlatButton style={styles.flatButton} onTouchTap={this.handleTouchTap}>
              <div style={moodStyles.calDay} className="tile dayTile"> 
                <label>{this.props.date}</label>
              </div>        
            </FlatButton>
            <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
            onRequestClose={this.handleRequestClose}>
              <div style={moodStyles.moodPopup} className="moodPopOver">
                <h2>{evaluateScore(this.props.data.score)}</h2>
                {"score: "+this.props.data.score}
              </div>
            </Popover>
          </div>
        );  
      }
    }
  }
});

module.exports = CalendarDay;


