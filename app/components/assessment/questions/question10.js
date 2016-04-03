'use strict';

require('../Assessment.css');

var React = require('react');

var firebaseUtil = require('../../../util/firebaseUtil.js');

//var History = require('react-router').History;
var Link = require('react-router').Link;

var RaisedButton = require('material-ui/lib/raised-button');
var Slider = require('material-ui/lib/slider');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../../rawTheme.js');


var LastQuestion = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  getInitialState: function() {
    return {sliderValue: 0};
  },
  handleSliderChange: function(e, value) {
    this.setState({sliderValue: value});
  },
  handleSubmit: function() {
    if ((this.state.sliderValue == 0) || (this.state.sliderValue == 0.33333)) {
      firebaseUtil.tempSaveAssessQuest('question10', 0);
    } else if ((this.state.sliderValue == 0.66667) || (this.state.sliderValue == 1)) {
      firebaseUtil.tempSaveAssessQuest('question10', 1);
    }
    firebaseUtil.addAssessQuestAnsToDB();
  },
  render: function() {
    var style = {
      labelStyle: {
        fontSize: '3.5vw',
        textAlign: 'center'
      },
      rootStyle: {
        flex: '1 1 auto',
        width: '40%',
        margin: 'auto',
        height: '10vw',
        lineHeight: '10vw',
        textAlign: 'center'
      },
      sliderStyle: {
        marginTop: '7vw'
      }
    };
    return (
      <div id="assessContent">
        <div className="questionText">
          <h2>
            <span>If you said yes to any of these problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?</span>
          </h2>
        </div>
        <div id="slider">
          <div id="sliderLabel">
            <div id="min">Not At All</div>
            <div id="max">Extremely</div>
          </div>
          <div id="sliderCont">
            <Slider step={1/3} style={style.sliderStyle} onChange={this.handleSliderChange}/>
          </div>
        </div>
        <RaisedButton 
        linkButton={true} 
        containerElement={<Link to='/assessment-results'/>} 
        primary={true} 
        style={style.rootStyle} 
        label="Submit" 
        labelStyle={style.labelStyle}
        onTouchTap={this.handleSubmit}/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = LastQuestion;