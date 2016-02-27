'use strict';

var React = require('react');

var History = require('react-router').History;
var firebaseUtil = require('../../util/firebaseUtil.js');

var Form = require('formsy-react').Form;
var FormsyText = require('formsy-material-ui/lib/FormsyText');
var RaisedButton = require('material-ui/lib/raised-button');


var SignIn = React.createClass({
  mixins: [History],
  childContextTypes: {
       muiTheme: React.PropTypes.object,
  },
  contextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
       return {muiTheme: this.context.muiTheme};
  }, 
  getInitialState: function() {
    return {
      muiTheme: this.context.muiTheme,
      canSubmit: false,
      loggedIn: false
    };
  },
  enableButton: function() {
    this.setState({
      canSubmit: true
    });
  },
  disableButton: function() {
    this.setState({
      canSubmit: false
    });
  },
  handleSubmitForm: function(model) {
    firebaseUtil.signInUser(model, function(result) {
      if (result) {
        this.history.pushState(null, '/dashboard');
      }
    }.bind(this));
  },
  render: function() {
    var styles = {
      form: {
        width: '70%',
        margin: 'auto',
      },
      submitBttn: {
        width: '80%',
        margin: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10vw'
      }
    };
    return(
      <div id="signIn">
        <div className="app_title"><h1>Mood Monitor</h1></div>
        <Form onSubmit={this.handleSubmitForm} style={styles.form}>
          <FormsyText name="email" hintText="Please enter your email" floatingLabelText="Email" required/>
          <FormsyText name="password" hintText="Please enter your password" floatingLabelText="Password" type="password" required/>
          <RaisedButton className="submitBttn" type="submit" label="Submit" primary={true} style={styles.submitBttn}/>
        </Form>
      </div>
    );
  }
});

module.exports = SignIn;