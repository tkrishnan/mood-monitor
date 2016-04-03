'use strict';

var React = require('react');

var firebaseUtil = require('../../util/firebaseUtil.js');

var Divider = require('material-ui/lib/divider');
var Form = require('formsy-react').Form;
var FormsyText = require('formsy-material-ui/lib/FormsyText');
var RaisedButton = require('material-ui/lib/raised-button');
var TextField = require('material-ui/lib/text-field');

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../rawTheme.js');


var SafetyPlanContent = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },
    getChildContext: function() {
        return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
    },
    render: function() {
        return (
            <div id="safetyContent">
                <h2>Safety Plan Page</h2>
                <span> Hello, I am a placeholder for the safety plan page</span>
            </div>
        );
    } 
});

module.exports = SafetyPlanContent;