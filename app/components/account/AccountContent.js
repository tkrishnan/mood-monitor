'use strict';

var React = require('react');

var RaisedButton = require('material-ui/lib/raised-button');
var Link = require('react-router').Link;

var firebaseUtil = require('../../util/firebaseUtil.js');

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../rawTheme.js');


var AccountContent = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },
    getChildContext: function() {
        return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
    },
    handleSignOut: function() {
        console.log("I PRESSED BTTN");
        firebaseUtil.signOut(function() {
            console.log("You are now signed out"); 
        });
    },
    render: function() {
        return (
            <div id="accountContent">
                <h2>Account Page</h2>
                <span> Hello, I am a placeholder for the account page</span>
                <RaisedButton label="Sign Out" 
                linkButton={true} 
                containerElement={<Link to='/'/>} 
                secondary={true} 
                onTouchTap={this.handleSignOut}
                />
                {this.props.children}
            </div>
        );
    } 
});

module.exports = AccountContent;