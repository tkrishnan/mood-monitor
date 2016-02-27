'use strict';

require('./Calendar.css');
var React = require('react');

var FlatButton = require('material-ui/lib/flat-button');
var Popover = require('material-ui/lib/popover/popover');


var moodColors = {
  zero: "#4dd0e1",
  minimal: "#00b0ff",
  mild: "#0288d1",
  moderate: "#01579b",
  moderatelySevere: "#3949ab",
  severe: "#1a237e"
};

var moodLabels = {
  zero: "Zero Depression",
  minimal: "Minimal Depression",
  mild: "Mild Depression",
  moderate: "Moderate Depression",
  moderatelySevere: "Moderately Severe Depression",
  severe: "Severe Depression"
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
      },
      calDay: {
        backgroundColor: moodColors[this.props.moodObj], 
      },
      popup: {
        color: moodColors[this.props.moodObj],
        padding: '1.5vw'
      }
    }; 
    
    return (
      <div className="calendarDay">
        <FlatButton style={styles.flatButton} onTouchTap={this.handleTouchTap}>
          <div style={styles.calDay} className="tile dayTile"> 
            <label>{this.props.dateObj.format('D')}</label>
          </div>        
        </FlatButton>
        <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
        onRequestClose={this.handleRequestClose}>
          <div style={styles.popup} className="moodPopOver">{moodLabels[this.props.moodObj]}</div>
        </Popover>
      </div>
    );
  }
});

module.exports = CalendarDay;


