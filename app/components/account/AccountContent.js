'use strict';

require('./Account.css');
var React = require('react');

var History = require('react-router').History;

var firebaseUtil = require('../../util/firebaseUtil.js');

var AccountForm = require('./AccountForm.js');
var AccountInfo = require('./AccountInfo.js');
var Dialog = require('material-ui/lib/dialog');
var Divider = require('material-ui/lib/divider');
var FlatButton = require('material-ui/lib/flat-button');
var NavBefore = require('material-ui/lib/svg-icons/image/navigate-before');

var Colors = require('material-ui/lib/styles/colors');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../../rawTheme.js');


var AccountContent = React.createClass({
    mixins: [History],
    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },
    getChildContext: function() {
        return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
    },
    getInitialState: function() {
        return {edit: false, firstName: "", lastName: "", email: "", errorMessages: ["", "", "", ""]};
    },
    componentWillMount: function() {
        var userData = firebaseUtil.getCachedUser();
        this.setState({firstName: userData.password.firstName});
        this.setState({lastName: userData.password.lastName});
        this.setState({email: userData.password.email});
    },
    handleCancel: function() {
        this.setState({errorMessages: ["", "", "", ""]});
        this.setState({edit: false});
    },
    handleDelete: function() {
        firebaseUtil.deleteUser(this.state.email, document.getElementById("oldPassword").value, function(err){
            if (err) {
                this.setState({errorMessage: err});
            } else {
                this.handleSignOut();
            }
        }.bind(this));
    },
    handleSubmit: function(model) {
        var formData = model;
        var queue = Array(4);
        
        if (formData.firstName != this.state.firstName) {
            queue[0] = {func: firebaseUtil.changeUserFirstName, arg: formData.firstName, state: 'firstName'};
        }
        if (formData.lastName != this.state.lastName) {
            queue[1] = {func: firebaseUtil.changeUserLastName, arg: formData.lastName, state: 'lastName'};
        }
        if (formData.email != this.state.email) {
            queue[2] = {func: firebaseUtil.changeUserEmail, arg: formData.email, state: 'email'};
        }
        if (formData.newPassword) {
            queue[3] = {func: firebaseUtil.changeUserPassword, arg: formData.newPassword, state: null};
        }
        
        this.recurseQueue(queue, formData.oldPassword, 0, function() {
            var isErrors = false;
            for (var i=0; i<this.state.errorMessages; i++) {
                if (this.state.errorMessages[i] != "") {
                    isErrors = true;
                }
            }
            if (!isErrors) {
                this.setState({edit: false});
            } 
        }.bind(this));
    },
    handleEdit: function() {
        this.setState({edit: true});
    },
    handleSignOut: function() {
        firebaseUtil.signOut(function() {
            console.log("You are now signed out"); 
            this.props.actionBack(true);
        }.bind(this));
    },
    recurseQueue: function(queue, pw, errIndex, callback) {
        var change = {};
        if (queue[0]) {
            queue[0].func(this.state.email, pw, queue[0].arg, function(err) {
                if (err) {
                    this.setState({errorMessages: this.state.errorMessages.slice(0, errIndex).concat([err]).concat(this.state.errorMessages.slice(errIndex+1))});
                    this.forceUpdate();   
                } else {
                    this.setState({errorMessages: this.state.errorMessages.slice(0, errIndex).concat([""]).concat(this.state.errorMessages.slice(errIndex+1))});
                    this.forceUpdate();   
                    if (queue[0].state) {
                        change[queue[0].state] = queue[0].arg;
                        this.setState(change);
                        this.forceUpdate();
                    }
                    if (queue.length > 1) {
                        this.recurseQueue(queue.slice(1), pw, errIndex+1, callback);
                    } else {
                        callback();
                    }
                }
            }.bind(this));
        } else {
            if (queue.length > 1) {
                this.recurseQueue(queue.slice(1), pw, errIndex+1, callback);
            } else {
                callback();
            }
        }
    },
    render: function() {
        var styles = {
            dialogContent: {
                top: '-100',
                bottom: '-100',
                maxHeight: '100%',
                height: '100%',
                margin: '0',
                padding: '0',
                maxWidth: 'none',
                width: '100%'
            },
            dialogBody: {
                paddingTop: '5vw',
                paddingLeft: '0',
                paddingRight: '0'
            },
            divider: {
                backgroundColor: Colors.blueGrey200,
            },
            goBackBttn: {
                textAlign: 'center',
                height: '15vw',
                flex: '1 1 auto'
            },
            goBackLabel: {
                fontSize: '4vw'  
            },
        };
        if (this.state.edit) {
            return (
                <div id="accountContentDialog">
                    <Dialog autoDetectWindowHeight={false} repositionOnUpdate={false} bodyStyle={styles.dialogBody} contentStyle={styles.dialogContent} open={this.props.open}>
                        <div id="dialogContent">
                            <div id="closeBttn"><FlatButton icon={<NavBefore/>} label="BACK" labelPosition="after" labelStyle={styles.goBackLabel} style={styles.goBackBttn} fullWidth={true} onTouchTap={this.props.actionBack}/></div>
                            <div className="dialogTitle">
                                <h1>Account</h1>
                                <Divider style={styles.divider}/>
                            </div>
                            <div id="accountContent">
                                <div className="error_message">
                                    {this.state.errorMessages.map(function(err){
                                        return <div className="err">{err}</div>;  
                                    }.bind(this))}
                                </div>
                                <AccountForm default_fn={this.state.firstName} default_ln={this.state.lastName} default_em={this.state.email} handleCancel={this.handleCancel} handleDelete={this.handleDelete} handleSubmit={this.handleSubmit}/>
                            </div>
                            <div id="dialogContentEnd"/>
                        </div>
                    </Dialog>
                </div>
            );
        } else {
            return (
                <div id="accountContentDialog">
                    <Dialog autoDetectWindowHeight={false} repositionOnUpdate={false} bodyStyle={styles.dialogBody} contentStyle={styles.dialogContent} open={this.props.open}>
                        <div id="dialogContent">
                            <div id="closeBttn"><FlatButton icon={<NavBefore/>} label="BACK" labelPosition="after" labelStyle={styles.goBackLabel} style={styles.goBackBttn} onTouchTap={this.props.actionBack}/></div>
                            <div className="dialogTitle">
                                <h1>Account</h1>
                                <Divider style={styles.divider}/>
                            </div>
                            <div id="accountContent">
                                <AccountInfo handleSignOut={this.handleSignOut} handleEdit={this.handleEdit} firstName={this.state.firstName} lastName={this.state.lastName} email={this.state.email}/>
                            </div>
                            <div id="dialogContentEnd"/>
                        </div>
                    </Dialog>
                </div>
            );   
        }
    } 
});

module.exports = AccountContent;