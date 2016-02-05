'use strict';

require('../Assessment.css');
var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var RaisedButton = require('material-ui/lib/raised-button');
var FlatButton = require('material-ui/lib/flat-button');
var Slider = require('material-ui/lib/slider');
var Colors = require('material-ui/lib/styles/colors');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../rawTheme.js');


var LastQuestion = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  render: function() {
    var style = {
      labelStyle: {
        fontSize: '3.5vw',
      },
      rootStyle: {
        minWidth: '20vw',
        height: '10vw',
      },
      sliderStyle: {
        marginTop: '35px'
      }
    };
    return (
      <div id="assessContent">
        <div id="lastQuestion">
          <div className="questionText">
            <h2>
              <span>If you said yes to any of these problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?</span>
            </h2>
          </div>
          <div id="sliderLabel">
            <div id="min">Not At All</div>
            <div id="max">Extremely</div>
          </div>
          <div id="sliderCont">
            <Slider step={1/3} style={style.sliderStyle}/>
          </div>
          <div id="submitAssess">
            <RaisedButton 
            linkButton={true} 
            containerElement={<Link to='/assessmentResults'/>} 
            primary={true} 
            style={style.rootStyle} 
            label="Submit" 
            labelStyle={style.labelStyle} 
            fullWidth={true}/> 
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = LastQuestion;