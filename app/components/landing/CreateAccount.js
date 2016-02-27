'use strict';

var React = require('react');

var History = require('react-router').History;
var firebaseUtil = require('../../util/firebaseUtil.js');

var Form = require('formsy-react').Form;
var FormsyText = require('formsy-material-ui/lib/FormsyText');
var RaisedButton = require('material-ui/lib/raised-button');


var CreateAccount = React.createClass({
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
      canSubmit: false
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
    firebaseUtil.createUser(model, function(result) {
      if (result) {
        this.history.pushState(null, '/dashboard');
      }
    }.bind(this));
  },
  errorMessages: {
    isWords: "Please only use letters",
    isEmail: "Please enter a valid email",
    isPassword: "Please enter a password between 8 and 25 characters",
    isPasswordAgain: "Please exactly match the password entered above"
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
        marginTop: '5vw',
      }
    };
    return (
      <div id="createAccount">
        <div className="app_title"><h1>Mood Monitor</h1></div>
        <Form onSubmit={this.handleSubmitForm} style={styles.form}>
          <FormsyText name="firstName" hintText="Please enter your first name" floatingLabelText="First Name" validations="isWords" validationError={this.errorMessages.isWords} required/>
          <FormsyText name="lastName" hintText="Please enter your last name" floatingLabelText="Last Name" validations="isWords" validationError={this.errorMessages.isWords} required/>
          <FormsyText name="email" hintText="Please enter an email address" floatingLabelText="Email" validations="isEmail" validationError={this.errorMessages.isEmail} required/>
          <FormsyText name="password" hintText="Please enter a password" floatingLabelText="Password" type="password" validations="minLength:8,maxLength:25" validationError={this.errorMessages.isPassword} required/>
          <FormsyText name="passwordAgain" hintText="Please re-type the above password" floatingLabelText="Re-Type Password" type="password" validations="equalsField:password" validationError={this.errorMessages.isPasswordAgain} required/>
          <RaisedButton type="submit" label="Create Account" primary={true} style={styles.submitBttn}/>
        </Form>
      </div>
    );
  }
});

module.exports = CreateAccount;