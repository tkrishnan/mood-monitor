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
      canSubmit: false,
      errorMessage: ""
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
    firebaseUtil.createUser(model, function(err, result) {
      if (err) {
        this.setState({errorMessage: err})
      } else if (result) {
        this.setState({errorMessage: ""})
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
        display: 'flex',
        flexDirection: 'column'
      },
      textField: {
        flex: '1 1 auto'
      },
      submitBttn: {
        flex: '1 1 auto',
        width: '70%',
        height: '10vw',
        margin: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '5vw',
      },
      labelStyle: {
        fontSize: '4vw'
      }
    };
    return (
      <div id="createAccount">
        <div className="app_title"><h1>Mood Monitor</h1></div>
        <div className="err_mssg"><span>{this.state.errorMessage}</span></div>
        <div className="formContainer">
          <Form onValidSubmit={this.handleSubmitForm} style={styles.form} onValid={this.enableButton} onInvalid={this.disableButton}>
            <FormsyText name="firstName" hintText="Please enter your first name" floatingLabelText="First Name" validations="isWords" validationError={this.errorMessages.isWords} style={styles.textField} required/>
            <FormsyText name="lastName" hintText="Please enter your last name" floatingLabelText="Last Name" validations="isWords" validationError={this.errorMessages.isWords} style={styles.textField} required/>
            <FormsyText name="email" hintText="Please enter an email address" floatingLabelText="Email" validations="isEmail" validationError={this.errorMessages.isEmail} style={styles.textField} required/>
            <FormsyText name="password" hintText="Please enter a password" floatingLabelText="Password" type="password" validations="minLength:8,maxLength:25" validationError={this.errorMessages.isPassword} style={styles.textField} required/>
            <FormsyText name="passwordAgain" hintText="Please re-type the above password" floatingLabelText="Re-Type Password" type="password" validations="equalsField:password" validationError={this.errorMessages.isPasswordAgain} style={styles.textField} required/>
            <RaisedButton type="submit" label="Create Account" labelStyle={styles.labelStyle} primary={true} style={styles.submitBttn} disabled={!this.state.canSubmit}/>
          </Form>
        </div>
      </div>
    );
  }
});

module.exports = CreateAccount;