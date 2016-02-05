'use strict';

require('../Assessment.css');
var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var RaisedButton = require('material-ui/lib/raised-button');
var FlatButton = require('material-ui/lib/flat-button');
var Colors = require('material-ui/lib/styles/colors');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../rawTheme.js');


var QuestionThree = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  render: function() {
    var style = {
      root1Style: {
        height: '10vw',
        marginTop: '40px',
        marginLeft: '50px'  
      },
      root2Style: {
        height: '10vw',
        marginTop: '40px',
        marginRight: '50px'
      },
      labelStyle: {
        fontSize: '7vw'
      }
    };
    return (
      <div id="assessContent">
        <div className="questionText">
          <h2>
            <span>Did you have trouble falling or staying asleep, or sleeping too much last night?</span>
          </h2>
        </div>
        <div id="yesBttn">
          <FlatButton
          linkButton={true}
          containerElement={<Link to='/assessment/question4'/>}
          label="YES" 
          labelStyle={style.labelStyle} 
          style={style.root1Style} 
          primary={true}/>
        </div>
        <div id="noBttn">
          <FlatButton 
          linkButton={true}
          containerElement={<Link to='/assessment/question4'/>}
          label="NO" 
          labelStyle={style.labelStyle} 
          style={style.root2Style} 
          secondary={true}/>
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = QuestionThree;