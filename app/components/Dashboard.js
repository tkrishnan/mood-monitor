require('./Dashboard.css');

var React = require('react');

var History = require('react-router').History;
var Link = require('react-router').Link;

var Assessment = require('material-ui/lib/svg-icons/action/assessment');
var Calendar = require('material-ui/lib/svg-icons/action/date-range');
var Safety = require('material-ui/lib/svg-icons/maps/local-hospital');
var TextMssg = require('material-ui/lib/svg-icons/action/feedback');

var AppBar = require('material-ui/lib/app-bar');
var FlatButton = require('material-ui/lib/flat-button');
var Tabs = require('material-ui/lib/tabs/tabs');
var Tab = require('material-ui/lib/tabs/tab');

var Colors = require('material-ui/lib/styles/colors');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../rawTheme.js');


var Dashboard = React.createClass({
  mixins: [History],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  getInitialState: function(){
    return {value: "assessment"};
  },
  handleTouchTap: function(value) {
    this.setState({value: value});
  },
  handleActive: function(tab) {
    this.history.pushState(null, tab.props.route);
  },
  render: function() {
    var styles = {
      appBar: {
        width: '100%',
        flexWrap: 'wrap',
      },
      titleStyle: {
        fontFamily: "'Comfortaa', cursive",
        fontWeight: '400'
      },
      tabs: {
        width: '100%',
      },
    };
    return (
      <div id="app-container">
        <header>
          <AppBar 
          title="Mood Monitor"
          titleStyle= {styles.titleStyle}
          style = {styles.appBar} 
          iconElementRight={<FlatButton label="Account" containerElement={<Link to='/account'/>} linkButton={true}/>} 
          showMenuIconButton={false}>
            <Tabs
            value={this.state.value}
            onChange={this.handleTouchTap} 
            style={styles.tabs}>
              <Tab icon={<Assessment color={Colors.white}/>} value="assessment" route="/assessment" onActive={this.handleActive}/>
              <Tab icon={<Calendar color={Colors.white}/>} value="calendar" route="/calendar" onActive={this.handleActive}/>
              <Tab icon={<Safety color={Colors.white}/>} value="safety" route="/safety-plan" onActive={this.handleActive}/>
              <Tab icon={<TextMssg color={Colors.white}/>} value="txtmssg" route="/emergency-contacts" onActive={this.handleActive}/>
            </Tabs>
          </AppBar>
        </header>
        <div id="content">
          {this.props.children}
        </div>
      </div>
    ); 
  }
});

module.exports = Dashboard;