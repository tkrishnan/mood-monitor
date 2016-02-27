'use strict';

require('./Landing.css');

var React = require('react');

var History = require('react-router').History;

var Tabs = require('material-ui/lib/tabs/tabs');
var Tab = require('material-ui/lib/tabs/tab');

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../rawTheme.js');


var Landing = React.createClass({
  mixins: [History],
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  getInitialState: function() {
    return {value: "signIn"};
  },
  handleTouchTap: function(value) {
    this.setState({value: value});
  },
  handleActive: function(tab) {
    this.history.pushState(null, tab.props.route);
  },
  render: function() {
    return (
      <div id="landing">
        <Tabs ref="tabs" value={this.state.value} style={{width: '100%'}} onChange={this.handleTouchTap}>
          <Tab label="Sign In" value="signIn" route="/signin" onActive={this.handleActive}/>
          <Tab label="Create Account" value="createAccount" route="/create-account" onActive={this.handleActive}/>
        </Tabs>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Landing;