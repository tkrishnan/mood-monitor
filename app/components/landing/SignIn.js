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
        width: '70%',
        margin: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
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
        marginTop: '10vw'
      },
      labelStyle: {
        fontSize: '4vw'
      }
    };
    return(
      <div id="signIn">
        <div className="app_title"><h1>Mood Monitor</h1></div>
        <div className="err_mssg"><span>{this.state.errorMessage}</span></div>
        <Form onValidSubmit={this.handleSubmitForm} onValid={this.enableButton} onInvalid={this.disableButton} style={styles.form}>
          <FormsyText name="email" hintText="Please enter your email" floatingLabelText="Email" style={styles.textField} required/>
          <FormsyText name="password" hintText="Please enter your password" floatingLabelText="Password" type="password" style={styles.textField} required/>
          <RaisedButton className="submitBttn" type="submit" label="Submit" labelStyle={styles.labelStyle} primary={true} style={styles.submitBttn} disabled={!this.state.canSubmit}/>
        </Form>
      </div>
    );
  }
});

module.exports = SignIn;