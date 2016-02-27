'use strict';

var React = require('react');

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