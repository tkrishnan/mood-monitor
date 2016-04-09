'use strict';

require('./SafetyPlan.css');
var React = require('react');

var firebaseUtil = require('../../util/firebaseUtil.js');

var Avatar = require('material-ui/lib/avatar');
var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardText = require('material-ui/lib/card/card-text');
var FlatButton = require('material-ui/lib/flat-button');
var Form = require('formsy-react').Form;
var FormsyText = require('formsy-material-ui/lib/FormsyText');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var RaisedButton = require('material-ui/lib/raised-button');

var Colors = require('material-ui/lib/styles/colors');


var ReasonsToLive = React.createClass({
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
    return {muiTheme: this.context.muiTheme, onForm: false, extraFields: null, dataFields: null, dataList: this.props.initialData};
  },
  toggleForm: function() {
    //render form view and set transitional form states if needed
    this.setState({onForm: true});
    if (this.state.dataList) {
      this.setState({extraFields: [1]});
      this.setState({dataFields: this.state.dataList});
    }
  },
  handleAdd: function() {
    //add extra form field
    if (!this.state.extraFields) {
      this.setState({extraFields: [1]});
    } else {
      this.setState({extraFields: this.state.extraFields.concat([this.state.extraFields[this.state.extraFields.length-1]+1])}); 
    }
  },
  handleDelete: function() {
    //remove form field from either extraFields or dataFields states
    if (this.state.extraFields) {
      if (this.state.extraFields.length == 1) {
        this.setState({extraFields: null});
      } else {
        this.setState({extraFields: this.state.extraFields.slice(0, this.state.extraFields.length-1)});
      } 
    } else {
      if (this.state.dataFields) {
        if (this.state.dataFields.length == 1) {
          this.setState({dataFields: null});
        } else {
          this.setState({dataFields: this.state.dataFields.slice(0, this.state.dataFields.length-1)}); 
        }
      }
    }
  },
  handleCancel: function() {
    //go back to data view and reset transitional form states
    this.setState({onForm: false});
    this.setState({extraFields: null});
    this.setState({dataFields: null});
  },
  handleSubmit: function(model) {
    //do something here
    var keysList = Object.keys(model);
    //check if no data was submitted
    var noData = true;
    for (var i=0; i<keysList.length; i++) {
      if (model[keysList[i]]) {
        noData = false;
      }
    }
    //if no data submitted, empty the warning signs data in DB
    if (noData) {
      firebaseUtil.removeReasonToLiveData(function(){
        this.setState({dataList: null});
        this.setState({onForm: false});
      }.bind(this));
    //if data submitted, set warning signs data in DB
    } else {
      var data = [];
      for (var key in model) {
        data.push(model[key]);
      }
      firebaseUtil.saveReasonToLiveData(data);
      this.setState({dataList: data});
      this.setState({onForm: false});
    }
    //reset transitional form states
    this.setState({extraFields: null});
    this.setState({dataFields: null});
  },
  render: function() {
    var styles = {
      cardHeader: {
        general: {
            backgroundColor: Colors.indigo400,
            height: '17vw'
        },
        title: {
            fontSize: '4vw',
            paddingBottom: '1vw'
        },
        subtitle: {
          fontSize: '3vw',
          fontWeight: '300'
        }
      },
      cardTextNone: {
        display: 'flex',
        height: '25vw',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: Colors.indigo50,
        fontSize: '4vw',
        fontWeight: '300',
        textAlign: 'center',
      },
      cardTextData: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: Colors.indigo50
      },
      editButton: {
        width: '5%',
        bottom: '5',
        right: '5',
        position: 'absolute',
        alignSelf: 'flex-end'
      },
      editLabel: {
        fontSize: '4vw'
      },
      cardTextForm: {
        padding: '1vw',
        backgroundColor: Colors.indigo50
      },
      form: {
        general: {
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 auto'
        },
        formActionBttns: {
          general: {
            flex: '1 1 auto',
            margin: '2vw',
            width: '40%'
          },
          labelStyle: {
            fontSize: '3vw',
            color: Colors.grey100
          }
        }
      }
    };
    if (this.state.onForm) {
      if (this.state.dataFields) {
        var newStart = this.state.dataFields.length;
        if (this.state.extraFields) {
          return (
            <Card id="reasonsToLive" className="planCard">
              <CardHeader 
              title="Reasons To Live"
              titleColor={Colors.grey100}
              titleStyle={styles.cardHeader.title}
              subtitle="Important reminders in a crisis"
              subtitleColor={Colors.grey100}
              subtitleStyle={styles.cardHeader.subtitle}
              actAsExpander={true} 
              showExpandableButton={true}
              style={styles.cardHeader.general}/>
              <CardText color={Colors.indigo900} style={styles.cardTextForm} expandable={true}>
                <Form onSubmit={this.handleSubmit} style={styles.form}>
                    {this.state.dataFields.map(function(i){ 
                      return <div className="addFormField">
                        <FormsyText name={"reasonToLive"+this.state.dataFields.indexOf(i).toString()} 
                        value={i} hintText="Please describe a reason to live you can use to keep from acting on suicidal thoughts or urges." 
                        multiLine={true} rows={2} rowsMax={4} fullWidth={true}
                        textAreaStyle={{color: Colors.indigo900}}
                        hintStyle={{fontSize: '3vw'}} inputStyle={{fontSize: '3vw', color: Colors.indigo900}}/>
                      </div>;
                    }.bind(this))}
                  {this.state.extraFields.map(function(i){
                    return <div className="addFormField">
                      <FormsyText name={"reasonToLive"+(newStart+i).toString()}
                      hintText="Please describe a reason to live you can use to keep from acting on suicidal thoughts or urges." 
                      multiLine={true} rows={2} rowsMax={4} fullWidth={true} hintStyle={{fontSize: '3vw'}} 
                      inputStyle={{fontSize: '3vw', color: Colors.indigo900}}/>
                    </div>;
                  }.bind(this))}
                  <div className="textfieldBttns">
                    <FlatButton label="ADD" labelStyle={{fontSize: '2.5vw'}} style={{flex: '1 1 auto', height: '9vw', margin: '0.5vw', minWidth: '15vw', width: '15vw', textAlign: 'center'}} onTouchTap={this.handleAdd} primary={true}/>
                    <FlatButton label="DELETE" labelStyle={{fontSize: '2.5vw'}} style={{flex: '1 1 auto', height: '9vw', margin: '0.5vw', minWidth: '20vw', width: '20vw', textAlign: 'center'}} onTouchTap={this.handleDelete} secondary={true}/>
                  </div>
                  <div className="formActionButtons">
                    <RaisedButton label="SUBMIT" type="submit" primary={true} style={styles.form.formActionBttns.general} labelStyle={styles.form.formActionBttns.labelStyle}/>
                    <RaisedButton label="CANCEL" onTouchTap={this.handleCancel} secondary={true} style={styles.form.formActionBttns.general} labelStyle={styles.form.formActionBttns.labelStyle}/>
                  </div>
                </Form>
              </CardText>
            </Card>
          );
        } else {
          return (
            <Card id="reasonsToLive" className="planCard">
              <CardHeader 
              title="Reasons To Live"
              titleColor={Colors.grey100}
              titleStyle={styles.cardHeader.title}
              subtitle="Important reminders in a crisis"
              subtitleColor={Colors.grey100}
              subtitleStyle={styles.cardHeader.subtitle}
              actAsExpander={true} 
              showExpandableButton={true}
              style={styles.cardHeader.general}/>
              <CardText color={Colors.indigo900} style={styles.cardTextForm} expandable={true}>
                <Form onSubmit={this.handleSubmit} style={styles.form}>
                  {this.state.dataFields.map(function(i){ 
                    return <div className="addFormField">
                      <FormsyText name={"reasonToLive"+this.state.dataFields.indexOf(i).toString()} 
                      value={i} hintText="Please describe a reason to live you can use to keep from acting on suicidal thoughts or urges." 
                      multiLine={true} rows={2} rowsMax={4} fullWidth={true}
                      textAreaStyle={{color: Colors.indigo900}}
                      hintStyle={{fontSize: '3vw'}} inputStyle={{fontSize: '3vw', color: Colors.indigo900}}/>
                    </div>;
                  }.bind(this))}
                  <div className="textfieldBttns">
                    <FlatButton label="ADD" labelStyle={{fontSize: '2.5vw'}} style={{flex: '1 1 auto', height: '9vw', minWidth: '15vw', width: '15vw', textAlign: 'center'}} onTouchTap={this.handleAdd} primary={true}/>
                    <FlatButton label="DELETE" labelStyle={{fontSize: '2.5vw'}} style={{flex: '1 1 auto', height: '9vw', margin: '0.5vw', minWidth: '20vw', width: '20vw', textAlign: 'center'}} onTouchTap={this.handleDelete} secondary={true}/>
                  </div>
                  <div className="formActionButtons">
                    <RaisedButton label="SUBMIT" type="submit" primary={true} style={styles.form.formActionBttns.general} labelStyle={styles.form.formActionBttns.labelStyle}/>
                    <RaisedButton label="CANCEL" onTouchTap={this.handleCancel} secondary={true} style={styles.form.formActionBttns.general} labelStyle={styles.form.formActionBttns.labelStyle}/>
                  </div>
                </Form>
              </CardText>
            </Card>
          );        
        }
      } else {
        if (this.state.extraFields) {
          return (
            <Card id="reasonsToLive" className="planCard">
              <CardHeader 
              title="Reasons To Live"
              titleColor={Colors.grey100}
              titleStyle={styles.cardHeader.title}
              subtitle="Important reminders in a crisis"
              subtitleColor={Colors.grey100}
              subtitleStyle={styles.cardHeader.subtitle}
              actAsExpander={true} 
              showExpandableButton={true}
              style={styles.cardHeader.general}/>
              <CardText color={Colors.indigo900} style={styles.cardTextForm} expandable={true}>
                <Form onSubmit={this.handleSubmit} style={styles.form}>
                  <div className="addFormField">
                    <FormsyText name="reasonToLive1" 
                    hintText="Please describe a reason to live you can use to keep from acting on suicidal thoughts or urges." 
                    multiLine={true} rows={2} rowsMax={4} fullWidth={true}
                    hintStyle={{fontSize: '3vw'}} inputStyle={{fontSize: '3vw', color: Colors.indigo900}}/>
                  </div>
                  {this.state.extraFields.map(function(i){
                    return <div className="addFormField">
                      <FormsyText name={"reasonToLive"+(1+i).toString()}
                      hintText="Please describe a reason to live you can use to keep from acting on suicidal thoughts or urges." 
                      multiLine={true} rows={2} rowsMax={4} fullWidth={true} hintStyle={{fontSize: '3vw'}} 
                      inputStyle={{fontSize: '3vw', color: Colors.indigo900}}/>
                    </div>;
                  }.bind(this))}
                  <div className="textfieldBttns">
                    <FlatButton label="ADD" labelStyle={{fontSize: '2.5vw'}} style={{flex: '1 1 auto', height: '9vw', margin: '0.5vw', minWidth: '15vw', width: '15vw', textAlign: 'center'}} onTouchTap={this.handleAdd} primary={true}/>
                    <FlatButton label="DELETE" labelStyle={{fontSize: '2.5vw'}} style={{flex: '1 1 auto', height: '9vw', margin: '0.5vw', minWidth: '20vw', width: '20vw', textAlign: 'center'}} onTouchTap={this.handleDelete} secondary={true}/>
                  </div>
                  <div className="formActionButtons">
                    <RaisedButton label="SUBMIT" type="submit" primary={true} style={styles.form.formActionBttns.general} labelStyle={styles.form.formActionBttns.labelStyle}/>
                    <RaisedButton label="CANCEL" onTouchTap={this.handleCancel} secondary={true} style={styles.form.formActionBttns.general} labelStyle={styles.form.formActionBttns.labelStyle}/>
                  </div>
                </Form>
              </CardText>
            </Card>
          );
        } else {
          return (
            <Card id="reasonsToLive" className="planCard">
              <CardHeader 
              title="Reasons To Live"
              titleColor={Colors.grey100}
              titleStyle={styles.cardHeader.title}
              subtitle="Important reminders in a crisis"
              subtitleColor={Colors.grey100}
              subtitleStyle={styles.cardHeader.subtitle}
              actAsExpander={true} 
              showExpandableButton={true}
              style={styles.cardHeader.general}/>
              <CardText color={Colors.indigo900} style={styles.cardTextForm} expandable={true}>
                <Form onSubmit={this.handleSubmit} style={styles.form}>
                  <div className="addFormField">
                    <FormsyText name="reasonToLive1" 
                    hintText="Please describe a reason to live you can use to keep from acting on suicidal thoughts or urges." 
                    multiLine={true} rows={2} rowsMax={4} fullWidth={true}
                    textAreaStyle={{color: Colors.indigo900}}
                    hintStyle={{fontSize: '3vw'}} inputStyle={{fontSize: '3vw', color: Colors.indigo900}}/>
                  </div>
                  <div className="textfieldBttns">
                    <FlatButton label="ADD" labelStyle={{fontSize: '2.5vw'}} style={{flex: '1 1 auto', height: '9vw', minWidth: '15vw', width: '15vw', textAlign: 'center'}} onTouchTap={this.handleAdd} primary={true}/>
                  </div>
                  <div className="formActionButtons">
                    <RaisedButton label="SUBMIT" type="submit" primary={true} style={styles.form.formActionBttns.general} labelStyle={styles.form.formActionBttns.labelStyle}/>
                    <RaisedButton label="CANCEL" onTouchTap={this.handleCancel} secondary={true} style={styles.form.formActionBttns.general} labelStyle={styles.form.formActionBttns.labelStyle}/>
                  </div>
                </Form>
              </CardText>
            </Card>
          );
        }
      }
    } else {
      if (this.state.dataList) {
        return (
          <Card id="reasonsToLive" className="planCard">
            <CardHeader 
            title="Reasons To Live"
            titleColor={Colors.grey100}
            titleStyle={styles.cardHeader.title}
            subtitle="Important reminders in a crisis"
            subtitleColor={Colors.grey100}
            subtitleStyle={styles.cardHeader.subtitle}
            actAsExpander={true} 
            showExpandableButton={true}
            style={styles.cardHeader.general}/>
            <CardText color={Colors.indigo900} style={styles.cardTextData} expandable={true}>
              <List style={{flex: '1 1 auto', backgroundColor: Colors.indigo50}}>
                {this.state.dataList.map(function(i){
                  return <ListItem disabled={true} leftAvatar={<Avatar color={Colors.indigo900} backgroundColor={Colors.cyan400}>{this.state.dataList.indexOf(i)+1}</Avatar>}>
                    <div className="data">{i}</div>
                  </ListItem>;
                }.bind(this))}
              </List>
              <FlatButton label="EDIT" onTouchTap={this.toggleForm} labelStyle={styles.editLabel} style={styles.editButton} secondary={true}/>
            </CardText>
          </Card>
        );     
      } else {
        return (
        <Card id="reasonsToLive" className="planCard">
            <CardHeader
            title="Reasons To Live"
            titleColor={Colors.grey100}
            titleStyle={styles.cardHeader.title}
            subtitle="Important reminders in a crisis"
            subtitleColor={Colors.grey100}
            subtitleStyle={styles.cardHeader.subtitle}
            actAsExpander={true}
            showExpandableButton={true}
            style={styles.cardHeader.general}/>
            <CardText color={Colors.indigo900} style={styles.cardTextNone} expandable={true}>
                <div className="noData">No reasons to live have been saved</div>
                <FlatButton label="EDIT" onTouchTap={this.toggleForm} labelStyle={styles.editLabel} style={styles.editButton} secondary={true}/>
            </CardText>
          </Card>
        );
      }  
    }
  }
});

module.exports = ReasonsToLive;