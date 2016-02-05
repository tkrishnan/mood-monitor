'use strict';

require('./Assessment.css');
var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var RaisedButton = require('material-ui/lib/raised-button');
var FloatingActionButton = require('material-ui/lib/floating-action-button');
var NavNext = require('material-ui/lib/svg-icons/image/navigate-next');
var Colors = require('material-ui/lib/styles/colors');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../rawTheme.js');


var AssessmentContent = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },
    getChildContext: function() {
        return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
    },
    render: function() {
        var styles = {
            labelStyle: {
                fontSize: '3vw',  
            },
            rootStyle: {
                minWidth: '40vw',
                height: '10vw'
            }
        };
        return (
            <div id="assessContent">
                <div id="startQuest">
                    <h1>What is your level of depression today?</h1>
                </div>
                <div id="next">
                    <RaisedButton
                    linkButton={true}
                    containerElement={<Link to='/assessment/question1'/>}
                    primary={true} 
                    style={styles.rootStyle} 
                    fullWidth={true} 
                    label="Take the Survey" 
                    labelStyle={styles.labelStyle} 
                    labelPosition="after" >   
                        <NavNext color={Colors.grey100} viewBox='-7 -7 25 25'/>
                    </RaisedButton>
                </div>
                {this.props.children}
            </div>
        );
   } 
});

module.exports = AssessmentContent;
