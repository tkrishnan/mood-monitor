'use strict';

require('./Calendar.css');
var React = require('react');

var evaluateScore = require('../../util/evaluateScore.js');

var FlatButton = require('material-ui/lib/flat-button');
var Popover = require('material-ui/lib/popover/popover');


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
        minHeight: '11vw',
        margin: '0.75vw',
        flex: '1'
      }
    }; 
    if (!this.props.data) {
      console.log("tile with no data");
      var noMoodStyles = {
        color: '#455a64',
        padding: '1.5vw'
      };
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
            <div style={noMoodStyles} className="moodPopOver">No assessment taken</div>
          </Popover>
        </div>
      );
    } else if (this.props.data == "Not Yet") {
      console.log("tile in future");
      return (
        <div className="calendarDay">
          <div className="tile futureTile">
            <label>{this.props.date}</label>
          </div>
        </div>
      );
    } else if (this.props.data) {
      console.log("tile with data");
      var moodStyles = {
        calDay: {
        backgroundColor: moodColors[this.props.data.score.toString()], 
      },
        moodPopup: {
          color: moodColors[this.props.data.score.toString()],
          padding: '1.5vw'
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
            <div style={moodStyles.moodPopup} className="moodPopOver">{evaluateScore(this.props.data.score)}</div>
          </Popover>
        </div>
      ); 
    }
  }
});

module.exports = CalendarDay;


