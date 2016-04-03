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
                fontSize: '3.25vw',  
            },
            rootStyle: {
                textAlign: 'center',
                width: '50%',
                height: '12vw',
                margin: 'auto',
                flex: '1 2 auto'
            }
        };
        return (
            <div id="assessContent">
                <div id="startQuest">
                    <h1>How are you feeling today?</h1>
                </div>
                <RaisedButton
                containerElement={<Link to='/assessment/question1'/>}
                icon={<NavNext/>}
                label="Take the Survey" 
                labelStyle={styles.labelStyle} 
                labelPosition="after"
                linkButton={true}
                primary={true} 
                style={styles.rootStyle}/>
                {this.props.children}
            </div>
        );
   } 
});

module.exports = AssessmentContent;
