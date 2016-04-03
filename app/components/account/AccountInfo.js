'use strict';

require('./Account.css');
var React = require('react');

var History = require('react-router').History;
var Link = require('react-router').Link;

var RaisedButton = require('material-ui/lib/raised-button');

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../rawTheme.js');


var AccountInfo = React.createClass({
  mixins: [History],
  childContextTypes: {
      muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
      return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  render: function() {
    return (
      <div id="accountInfo">
          <div className="contentField" id="firstNameContent"><div className="label">First Name: </div><div className="content">{this.props.firstName}</div></div>
          <div className="contentField" id="lastNameContent"><div className="label">Last Name: </div><div className="content">{this.props.lastName}</div></div>
          <div className="contentField" id="emailContent"><div className="label">Email: </div><div className="content">{this.props.email}</div></div>
          <div className="contentField" id="passwordContent"><div className="label">Password: </div><div className="content"> Click EDIT to change</div></div>
          <div id="actionBttns">
              <RaisedButton label="Sign Out" linkButton={true} containerElement={<Link to='/'/>} secondary={true} fullWidth={true} style={{margin: '2vw', textAlign: 'center'}} onTouchTap={this.props.handleSignOut}/>
              <RaisedButton label="Edit" primary={true} fullWidth={true} style={{margin: '2vw', textAlign: 'center'}} onTouchTap={this.props.handleEdit}/>
          </div>
      </div>
    );
  }
});

module.exports = AccountInfo;