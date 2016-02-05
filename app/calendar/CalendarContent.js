'use strict';

require('./Calendar.css');
var React = require('react');
//var ReactDOM = require('react-dom');
var History = require('react-router').History;

var GridList = require('material-ui/lib/grid-list/grid-list');
var GridTile = require('material-ui/lib/grid-list/grid-tile');

var Colors = require('material-ui/lib/styles/colors');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../rawTheme.js');


var CalendarContent = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },
    getChildContext: function() {
        return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
    },
    render: function() {
        var styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            gridList: {
                width: '40vw',
                height: '50vw',
                marginBottom: '30px'
            }
        };
        return (
            <div id="calendarContent">
                <h2>Calendar Page</h2>
                <span>Hello, I am a placeholder for the Calendar Page</span>
                <div id="calendarGridList" style={styles.root}>
                    <GridList cellHeight='4vw' cols={7} style={styles.gridList}>
                    </GridList>
                </div>
            </div>
        );
    } 
});

module.exports = CalendarContent;