'use strict';

require('./SafetyPlan.css');
var React = require('react');

var firebaseUtil = require('../../util/firebaseUtil.js');

var WarningSigns = require('./WarningSigns.js');
var CopingStrategies = require('./CopingStrategies.js');
var Distractions = require('./Distractions.js');
var SafetyMeasures = require('./SafetyMeasures.js');
var ReasonsToLive = require('./ReasonsToLive.js');

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../rawTheme.js');


var SafetyPlanContent = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },
    getChildContext: function() {
        return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
    },
    getInitialState: function() {
        return {warningSigns: null, copingStrategies: null, distractions: null, safetyMeasures: null, reasonsToLive: null };
    },
    componentWillMount: function() {
        var safetyPlanData = firebaseUtil.getSafetyPlanData();
        if (safetyPlanData) {
            this.setState({warningSigns: safetyPlanData.warning_signs});
            this.setState({copingStrategies: safetyPlanData.coping_strategies});
            this.setState({distractions: safetyPlanData.distractions});
            this.setState({safetyMeasures: safetyPlanData.safety_measures});
            this.setState({reasonsToLive: safetyPlanData.reasons_to_live});
        }
    },
    render: function() {
        return (
            <div id="safetyPlanContent">
                <div id="safetyPlan">
                    <WarningSigns initialData={this.state.warningSigns}/>
                    <CopingStrategies initialData={this.state.copingStrategies}/>
                    <Distractions initialData={this.state.distractions}/>
                    <SafetyMeasures initialData={this.state.safetyMeasures}/>
                    <ReasonsToLive initialData={this.state.reasonsToLive}/>
                </div>
            </div>
        );
    } 
});

module.exports = SafetyPlanContent;