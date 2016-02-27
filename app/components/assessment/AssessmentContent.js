'use strict';

require('./Assessment.css');

var React = require('react');

//var History = require('react-router').History;
var Link = require('react-router').Link;

var RaisedButton = require('material-ui/lib/raised-button');
var NavNext = require('material-ui/lib/svg-icons/image/navigate-next');

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../rawTheme.js');


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
                textAlign: 'center',
                fontSize: '3vw',  
            },
            rootStyle: {
                textAlign: 'center',
                width: '40%',
                height: '10vw',
                margin: 'auto',
                flex: '1 2 auto'
            }
        };
        return (
            <div id="assessContent">
                <div id="startQuest">
                    <h1>What is your level of depression today?</h1>
                </div>
                <RaisedButton
                linkButton={true}
                containerElement={<Link to='/assessment/question1'/>}
                primary={true} 
                style={styles.rootStyle} 
                label="Take the Survey" 
                labelStyle={styles.labelStyle} 
                labelPosition="after"
                icon={<NavNext/>}/>
                {this.props.children}
            </div>
        );
   } 
});

module.exports = AssessmentContent;
