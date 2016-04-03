'use strict';

var React = require('react');

var History = require('react-router').History;
var Link = require('react-router').Link;

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
      loggedIn: false,
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
    firebaseUtil.signInUser(model, function(err, result) {
      if (err) {
        this.setState({errorMessage: err});
      } else if (result) {
        this.setState({errorMessage: err});
        this.history.pushState(null, '/dashboard');
      }
    }.bind(this));
  },
  render: function() {
    var styles = {
      form: {
        display: 'flex',
        flexDirection: 'column',
      },
      textField: {
        flex: '1 1 auto',
      },
      submitBttn: {
        flex: '1 1 auto',
        width: '80%',
        height: '10vw',
        margin: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '5vw',
        marginBottom: '5vw'
      },
      labelStyle: {
        fontSize: '4vw'
      }
    };
    if (this.state.errorMessage == "The specified password is incorrect.") {
      return(
        <div id="signIn">
          <div className="app_title"><h1>Mood Monitor</h1></div>
          <div className="err_mssg"><span>{this.state.errorMessage}</span></div>
          <div className="formContainer">
            <Form onValidSubmit={this.handleSubmitForm} onValid={this.enableButton} onInvalid={this.disableButton} style={styles.form}>
              <FormsyText name="email" hintText="Please enter your email" floatingLabelText="Email" style={styles.textField} hintStyle={{fontSize: '3.5vw'}} inputStyle={{fontSize: '3.5vw'}} errorStyle={{fontSize: '2.5vw'}} fullWidth={true} required/>
              <FormsyText name="password" hintText="Please enter your password" floatingLabelText="Password" type="password" style={styles.textField} hintStyle={{fontSize: '3.5vw'}} inputStyle={{fontSize: '3.5vw'}} errorStyle={{fontSize: '2.5vw'}} fullWidth={true} required/>
              <RaisedButton className="submitBttn" type="submit" label="Submit" labelStyle={styles.labelStyle} primary={true} style={styles.submitBttn} disabled={!this.state.canSubmit}/>
              <div className="resetLink"><Link to="/reset-password"><span>Forgot Your Password?</span></Link></div>
            </Form>
          </div>
        </div>
      );
    }
    return(
      <div id="signIn">
        <div className="app_title"><h1>Mood Monitor</h1></div>
        <div className="err_mssg"><span>{this.state.errorMessage}</span></div>
        <div className="formContainer">
          <Form onValidSubmit={this.handleSubmitForm} onValid={this.enableButton} onInvalid={this.disableButton} style={styles.form}>
            <FormsyText name="email" hintText="Please enter your email" floatingLabelText="Email" style={styles.textField} hintStyle={{fontSize: '3.5vw'}} inputStyle={{fontSize: '3.5vw'}} errorStyle={{fontSize: '2.5vw'}} fullWidth={true} required/>
            <FormsyText name="password" hintText="Please enter your password" floatingLabelText="Password" type="password" style={styles.textField} hintStyle={{fontSize: '3.5vw'}} inputStyle={{fontSize: '3.5vw'}} errorStyle={{fontSize: '2.5vw'}} fullWidth={true} required/>
            <RaisedButton className="submitBttn" type="submit" label="Submit" labelStyle={styles.labelStyle} primary={true} style={styles.submitBttn} disabled={!this.state.canSubmit}/>
          </Form>
        </div>
      </div>
    );
  }
});

module.exports = SignIn;