'use strict';

require('../Assessment.css');

var React = require('react');

//var History = require('react-router').History;
var Link = require('react-router').Link;

var firebaseUtil = require('../../../util/firebaseUtil.js');

var FlatButton = require('material-ui/lib/flat-button');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../../rawTheme.js');


var QuestionOne = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  handleYes: function() {
    firebaseUtil.tempSaveAssessQuest('question1', 1);
  },
  handleNo: function() {
    firebaseUtil.tempSaveAssessQuest('question1', 0);
  },
  render: function() {
    var style = {
      rootStyle: {
        height: '13vw',
        lineHeight: '13vw',
        textAlign: 'center'
      },
      labelStyle: {
        fontSize: '7vw',
        textAlign: 'center'
      }
    };
    return (
      <div id="assessContent">
        <div className="questionText">
          <h2>
            <span>Do you have little interest or pleasure in doing things today?</span>
          </h2>
        </div>
        <div className="bttn">
          <div className="yesBttn">
            <FlatButton
            linkButton={true}
            containerElement={<Link to='/assessment/question2'/>}
            label="YES" 
            labelStyle={style.labelStyle} 
            style={style.rootStyle} 
            primary={true}
            onTouchTap={this.handleYes}/>
          </div>
          <div className="noBttn">
            <FlatButton 
            linkButton={true}
            containerElement={<Link to='/assessment/question2'/>}
            label="NO" 
            labelStyle={style.labelStyle} 
            style={style.rootStyle} 
            secondary={true}
            onTouchTap={this.handleNo}/>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = QuestionOne;