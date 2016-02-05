require('./App.css');
var React = require('react');
var ReactDOM = require('react-dom');
//var Router = require('react-router').Router;
var History = require('react-router').History;
var Link = require('react-router').Link;

var Assessment = require('material-ui/lib/svg-icons/action/assessment')
var Calendar = require('material-ui/lib/svg-icons/action/date-range');
var Safety = require('material-ui/lib/svg-icons/maps/local-hospital');
var TextMssg = require('material-ui/lib/svg-icons/action/feedback');

var AppBar = require('material-ui/lib/app-bar');
var FlatButton = require('material-ui/lib/flat-button');
var Tabs = require('material-ui/lib/tabs/tabs');
var Tab = require('material-ui/lib/tabs/tab');

var Colors = require('material-ui/lib/styles/colors');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('./rawTheme.js');

var injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();


var App = React.createClass({
  getInitialState: function(){
    return {value: "assessment"};
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  mixins: [History],
  getChildContext: function() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
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
        flexWrap: 'wrap',
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
          style = {styles.appBar} 
          iconElementRight={<FlatButton label="Account" containerElement={<Link to='/account'/>} linkButton={true}/>} 
          showMenuIconButton={false}>
            <Tabs
            value = {this.state.value}
            onChange={this.handleTouchTap} 
            style={styles.tabs}>
              <Tab label={<Assessment color={Colors.white}/>} value="assessment" route="/assessment" onActive={this.handleActive}/>
              <Tab label={<Calendar color={Colors.white}/>} value="calendar" route="/calendar" onActive={this.handleActive}/>
              <Tab label={<Safety color={Colors.white}/>} value="safety" route="/safety-plan" onActive={this.handleActive}/>
              <Tab label={<TextMssg color={Colors.white}/>} value="txtmssg" route="/emergency-contacts" onActive={this.handleActive}/>
            </Tabs>
          </AppBar>
        </header>
        {this.props.children}
      </div>
    ); 
  }
});

module.exports = App;