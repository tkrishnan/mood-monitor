'use strict';

require('./Landing.css');
var React = require('react');

var History = require('react-router').History;
var Link = require('react-router').Link;

var firebaseUtil = require('../../util/firebaseUtil.js');

var CheckCircle = require('material-ui/lib/svg-icons/action/check-circle');
var FlatButton = require('material-ui/lib/flat-button');
var Form = require('formsy-react').Form;
var FormsyText = require('formsy-material-ui/lib/FormsyText');
var Lock = require('material-ui/lib/svg-icons/action/lock');
var NavBefore = require('material-ui/lib/svg-icons/image/navigate-before');
var Paper = require('material-ui/lib/paper');
var RaisedButton = require('material-ui/lib/raised-button');

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../rawTheme.js');
var Colors = require('material-ui/lib/styles/colors');


var ResetPassword = React.createClass({
  mixins: [History],
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  getInitialState: function() {
    return {errMessage: "", successfullySent: false};
  },
  handleSubmit: function(model) {
    //send email for resetting password
    firebaseUtil.sendUserPasswordResetEmail(model.accountEmail, function(err) {
      if (err) {
        this.setState({errMessage: err});
      } else {
        this.setState({successfullySent: true});
      }
    }.bind(this));
  },
  render: function() {
    var styles = {
      checkCircleIcon: {
        display: 'block',
        width:  '21%',
        height: '27.5%',
        margin: 'auto',
        marginBottom: '5vw',
        textAlign: 'center'
      },
      form: {
        width: '85%',
        margin: 'auto'
      },
      goBackBttn: {
        textAlign: 'center',
        height: '10vw',
      },
      goBackLabel: {
        fontSize: '3.5vw'
      },
      lockIcon: {
        display: 'block',
        width: '20.9%',
        height: '27.5%',
        margin: 'auto',
        textAlign: 'center'
      },
      paperPasswordRequest: {
        alignSelf: 'center',
        backgroundColor: Colors.grey200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '1 1 auto',
        width: '80%',
        height: '100vw',
        margin: 'auto',
        padding: '5vw'
      },
      paperSuccessfullySent: {
        alignSelf: 'center',
        backgroundColor: Colors.grey200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '1 1 auto',
        width: '80%',
        height: '50vw',
        margin: 'auto',
        padding: '5vw'
      }
    };
    if (this.state.successfullySent) {
      return (
        <div id="resetPasswordContent">
          <div id="closeBttn">
            <FlatButton icon={<NavBefore/>} label="BACK" linkButton={true} containerElement={<Link to="/"/>} labelPosition="after" labelStyle={styles.goBackLabel} style={styles.goBackBttn} fullWidth={true}/>
          </div>
          <Paper zDepth={2} style={styles.paperSuccessfullySent}>
            <CheckCircle color={Colors.indigo400} style={styles.checkCircleIcon} viewBox="0 0 21 27.5"/>
            <div id="successMssg"><span>We sent you an email with the temporary token to sign in so you can change your password</span></div>
          </Paper>
        </div>
      );
    } else {
      return (
        <div id="resetPasswordContent">
          <div id="closeBttn">
            <FlatButton icon={<NavBefore/>} label="BACK" linkButton={true} containerElement={<Link to="/"/>} labelPosition="after" labelStyle={styles.goBackLabel} style={styles.goBackBttn} fullWidth={true}/>
          </div>
          <Paper zDepth={2} style={styles.paperPasswordRequest}>
            <div id="resetPassword">
              <Lock color={Colors.cyan400} style={styles.lockIcon} viewBox="0 0 20.9 27.5"/>
              <div id="forgotTitle">Forgot Your Password?</div>
              <div id="forgotInstructions">
                <span>Enter your email below and we'll send you a temporary token with which to sign in and change your password</span>
              </div>
            </div>
            <div id="errMessage"><span>{this.state.errMessage}</span></div>
            <div id="resetFormContainer">
              <Form style={styles.form} onValidSubmit={this.handleSubmit}>
                <FormsyText id="accountEmail" name="accountEmail" hintText="Email" fullWidth={true} validations="isEmail" validationError={"Please enter a valid emaiil"} errorStyle={{fontSize: '2.5vw'}} hintStyle={{fontSize: '3.5vw'}} inputStyle={{fontSize: '3.5vw'}} required/>
                <RaisedButton type="submit" label="RESET PASSWORD" fullWidth={true} secondary={true} style={{marginTop: '3vw'}}/>
              </Form>
            </div>
          </Paper>
        </div>
      ); 
    }
  }
});

module.exports = ResetPassword;