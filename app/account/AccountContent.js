'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../rawTheme.js');


var AccountContent = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },
    getChildContext: function() {
        return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
    },
    render: function() {
        return (
            <div id="accountContent">
                <h2>Account Page</h2>
                <span> Hello, I am a placeholder for the account page</span>
            </div>
        );
    } 
});

module.exports = AccountContent;