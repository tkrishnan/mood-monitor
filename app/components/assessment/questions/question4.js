'use strict';

require('../Assessment.css');
var React = require('react');
var Link = require('react-router').Link;
var FlatButton = require('material-ui/lib/flat-button');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../../rawTheme.js');


var QuestionFour = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
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
            <span>Are you feeling tired or having little energy?</span>
          </h2>
        </div>
        <div className="bttn">
          <div className="yesBttn">
            <FlatButton
            linkButton={true}
            containerElement={<Link to='/assessment/question5'/>}
            label="YES" 
            labelStyle={style.labelStyle} 
            style={style.rootStyle} 
            primary={true}/>
          </div>
          <div className="noBttn">
            <FlatButton 
            linkButton={true}
            containerElement={<Link to='/assessment/question5'/>}
            label="NO" 
            labelStyle={style.labelStyle} 
            style={style.rootStyle} 
            secondary={true}/>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = QuestionFour;