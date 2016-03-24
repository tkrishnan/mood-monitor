'use strict';

var React = require('react');

var Divider = require('material-ui/lib/divider');
var Paper = require('material-ui/lib/paper');
var Avatar = require('material-ui/lib/avatar');

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../../rawTheme.js');


var SuggestionsForModerate = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  render: function() {
    return(
      <div>Suggestions For Moderate Depression Placeholder</div>
    );
  }
});

module.exports = SuggestionsForModerate;