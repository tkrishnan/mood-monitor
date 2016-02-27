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
            <span>Are you feeling tired or having little energy?</span>
          </h2>
        </div>        
        <div id="yesBttn">
          <FlatButton
          linkButton={true}
          containerElement={<Link to='/assessment/question5'/>}
          label="YES" 
          labelStyle={style.labelStyle} 
          style={style.root1Style} 
          primary={true}/>
        </div>
        <div id="noBttn">
          <FlatButton 
          linkButton={true}
          containerElement={<Link to='/assessment/question5'/>}
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

module.exports = QuestionFour;