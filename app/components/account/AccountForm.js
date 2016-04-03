'use strict';

require('./Account.css');
var React = require('react');

var History = require('react-router').History;
var Link = require('react-router').Link;

var Form = require('formsy-react').Form;
var FormsyText = require('formsy-material-ui/lib/FormsyText');
var RaisedButton = require('material-ui/lib/raised-button');

var Colors = require('material-ui/lib/styles/colors');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../rawTheme.js');


var AccountForm = React.createClass({
  mixins: [History],
  childContextTypes: {
      muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
      return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  getInitialState: function() {
    return {canSubmit: true};
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
  errorMessages: {
    isWords: "Please only use letters",
    isEmail: "Please enter a new valid email",
    isNewPassword: "Please enter a new password between 8 and 25 characters",
    isNewPasswordAgain: "Please exactly match the new password entered above"
  },
  render: function() {
    var styles = {
      form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      },
      textField: {
        flex: '1 1 auto',
      },
      formActionBttn: {
        textAlign: 'center',
        flex: '1 1 auto',
        margin: '2vw'
      },
      formDeleteBttn: {
        textAlign: 'center',
        flex: '1 1 auto',
        margin: '3.5vw',
        marginBottom: '1vw'
      },
      formDeleteLabel: {
        color: Colors.grey100
      }
    };
    return (
      <div id="accountForm">
        <div id="formContainer">
          <Form id="formData" onValidSubmit={this.props.handleSubmit} style={styles.form}>
            <FormsyText id="firstName" name="firstName" value={this.props.default_fn} validations="isWords" validationError={this.errorMessages.isWords} fullWidth={true} errorStyle={{fontSize: '2.5vw'}} hintStyle={{fontSize: '3.5vw'}} inputStyle={{fontSize: '3.5vw'}} style={styles.textField}/>
            <FormsyText id="lastName" name="lastName" value={this.props.default_ln} validations="isWords" validationError={this.errorMessages.isWords} fullWidth={true} errorStyle={{fontSize: '2.5vw'}} hintStyle={{fontSize: '3.5vw'}} inputStyle={{fontSize: '3.5vw'}} style={styles.textField}/>
            <FormsyText id="email" name="email" value={this.props.default_em} validations="isEmail" validationError={this.errorMessages.isEmail} fullWidth={true} errorStyle={{fontSize: '2.5vw'}} hintStyle={{fontSize: '3.5vw'}} inputStyle={{fontSize: '3.5vw'}} style={styles.textField}/>
            <FormsyText id="newPassword" name="newPassword" hintText="New Password" validations="minLength:8,maxLength:25" validationError={this.errorMessages.isNewPassword} type="password" fullWidth={true} errorStyle={{fontSize: '2.5vw'}} hintStyle={{fontSize: '3.5vw'}} inputStyle={{fontSize: '3.5vw'}} style={styles.textField}/>
            <FormsyText id="newPasswordAgain" name="newPasswordAgain" hintText="Re-Type New Password" validations="equalsField:newPassword" validationError={this.errorMessages.isNewPasswordAgain} type="password" fullWidth={true} errorStyle={{fontSize: '2.5vw'}} hintStyle={{fontSize: '3.5vw'}} inputStyle={{fontSize: '3.5vw'}} style={styles.textField}/>
            <FormsyText id="oldPassword" name="oldPassword" hintText="Enter current password to submit changes" type="password" fullWidth={true} errorStyle={{fontSize: '2.5vw'}} hintStyle={{fontSize: '3.5vw'}} inputStyle={{fontSize: '3.5vw'}} style={styles.textField} required/>
            <RaisedButton label="DELETE USER ACCOUNT" labelStyle={styles.formDeleteLabel} fullWidth={true} backgroundColor={Colors.redA400} style={styles.formDeleteBttn} onTouchTap={this.props.handleDelete}/>
            <div id="warningDelete">(Are you sure? This cannot be undone)</div>
            <div id="formActionButtons">
              <RaisedButton type="submit" label="SUBMIT" primary={true} style={styles.formActionBttn} disabled={!this.state.canSubmit}/>
              <RaisedButton label="CANCEL" secondary={true} style={styles.formActionBttn} onTouchTap={this.props.handleCancel}/>
            </div>
          </Form>
        </div>
      </div>
    );
  }
});

module.exports = AccountForm;