'use strict';

require('./Assessment.css');

var React = require('react');

var path = require('path');
var firebaseUtil = require('../../util/firebaseUtil.js');
var evaluateScore = require('../../util/evaluateScore.js');

var History = require('react-router').History;
var Link = require('react-router').Link;

var FlatButton = require('material-ui/lib/flat-button');
var Redo = require('material-ui/lib/svg-icons/content/redo');

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../rawTheme.js');


var AssessmentResults = React.createClass({
  mixins: [History],
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  getInitialState: function() {
    return {errRetake: "", evaluation: "", suggestions: ""};
  },
  componentWillMount: function() {
    //get score and evaluation
    var evaluation;
    firebaseUtil.getTodaysAssessmentResult(function(err, result) {
      if (err) {
        this.setState({evaluation: "Couldn't Retrieve Evaluation", suggestions: "none"});
      } else if (result) {
        evaluation = evaluateScore(result);
        console.log(evaluation);
        this.setState({evaluation: evaluation});
        if (evaluation == "Zero Depression") {
          this.setState({suggestions: "zero"});
        } else if (evaluation == "Minimal Deression") {
          this.setState({suggestions: "minimal"});
        } else if (evaluation == "Mild Depression") {
          this.setState({suggestions: "mild"});
        } else if (evaluation == "Moderate Depression") {
          this.setState({suggestions: "moderate"});
        } else if (evaluation == "Moderately Severe Depression") {
          this.setState({suggestions: "moderately-severe"});
        } else if (evaluation == "Severe Depression") {
          this.setState({suggestions: "severe"});
        } 
      }
    }.bind(this));
  },
  handleRedo: function() {
    //do when backend implemented
    firebaseUtil.deleteAssessmentData(function(err) {
      if (err) {
        this.setState({errRetake: err});
      } else {
        this.history.pushState(null, '/dashboard');
      }
    }.bind(this));
    //this.history.pushState(null, '/dashboard');
  },
  handleAlertContacts: function() {
    //do when backend implemented
  },
  render: function() {
    var styles = {
      rootStyle: {
        //center buttons
        width: '100%',
        height: '15vw',
        lineHeight: '15vw',
        textAlign: 'center',
      },
      labelStyle: {
        //center label in button
        textAlign: 'center',
        fontSize: '5vw'
      }
    };
    return (
      <div id="assessResults">
        <div id="result">
          <h3>Your symptoms today indicate:</h3>
          <h1>{this.state.evaluation}</h1>
        </div>
        <div id="errRetake"><span>{this.state.errRetake}</span></div>
        <div id="resultBttns">
          <div className="resBttn">
            <FlatButton 
            label="RETAKE" 
            labelPosition="after" 
            labelStyle={styles.labelStyle} 
            icon={<Redo />}
            fullWidth={true}
            style={styles.rootStyle}
            onTouchTap={this.handleRedo}/>
          </div>
          
          <div className="resBttn">
            <FlatButton 
            label={"SUGGESTIONS"} 
            labelStyle={styles.labelStyle}
            fullWidth={true}
            linkButton={true}
            containerElement={
            <Link to={
            path.join("/assessment-results/suggestions", 
            this.state.suggestions)}/>}
            style={styles.rootStyle}
            />
          </div>
          
          <div className="resBttn">
            <FlatButton 
            label={"Alert Emergency Contacts"} 
            labelStyle={styles.labelStyle} 
            linkButton={true}
            containerElement={<Link to="/emergency-contacts"/>}
            fullWidth={true}
            style={styles.rootStyle}
            onTouchTap={this.handleAlertContacts}/>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
});


module.exports = AssessmentResults;