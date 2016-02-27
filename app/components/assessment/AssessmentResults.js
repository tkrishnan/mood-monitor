'use strict';

require('./Assessment.css');
var React = require('react');
var FlatButton = require('material-ui/lib/flat-button');
var Redo = require('material-ui/lib/svg-icons/content/redo');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../rawTheme.js');


var AssessmentResults = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  handleRedo: function() {
    //do when backend implemented
  },
  handleSugg: function() {
    //do when backend implemented
  },
  handleAlertContacts: function() {
    //do when backend implemented
  },
  render: function() {
    var styles = {
      labelStyle: {
        fontSize: '5vw',
      }
    }
    return (
      <div id="assessResults">
        <h3>Your symptoms today indicate:</h3>
        <h1>Moderately Severe Depression</h1>
        <div id="resultBttns">
          <FlatButton className="resBttn" label="RETAKE" labelPosition="after" labelStyle={styles.labelStyle} fullWidth={true} onTouchTap={this.handleRedo}>
            <Redo />
          </FlatButton>
          <FlatButton className="resBttn" label={"SUGGESTIONS"} labelStyle={styles.labelStyle} fullWidth={true} onTouchTap={this.handleSugg}/>
          <FlatButton className="resBttn" label={"Alert Emergency Contacts"} labelStyle={styles.labelStyle} fullWidth={true} onTouchTap={this.handleAlertContacts}/>
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = AssessmentResults;