var Firebase = require('firebase');
var ref = new Firebase('http://mood-monitor-app.firebaseio.com');
var moment = require('moment');
moment().format();
var cachedUser = null;
var dateAssessed = null;
var assessed = null;
var thisMonth = null;


var surveyAnswers = {
  question1: null,
  question2: null,
  question3: null,
  question4: null,
  question5: null,
  question6: null,
  question7: null,
  question8: null,
  question9: null,
  question10: null,
};

var addNewUserToDB = function(newUser){
  var key = newUser.uid;
  ref.child('user').child(key).set(newUser);
};

var firebaseUtil = {
  createUser: function(newUserData, callback) {
    ref.createUser({email: newUserData.email, password: newUserData.password}, function(err) {
      if (err) {
        switch(err.code) {
          case 'EMAIL_TAKEN':
            console.log("The new user account cannot be created because the email is already in use.");
            callback("The new user account cannot be created because the email is already in use.", false);
            break;
          case 'INVALID_EMAIL':
            console.log("Error creating user: the specified email address is invalid.");
            callback("The specified email address is invalid.", false);
            break;
          default:
            callback(err.message, false);
        }
      } else {
        this.signInUser(newUserData, function(err = null, authData) {
          addNewUserToDB({
            uid: authData.uid,
            email: newUserData.email,
            token: authData.token,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName
          });
        }, callback);
        console.log("Successfully created user with payload:", newUserData);
      }
    }.bind(this));
  },
  signInUser: function(userData, callback, callbackCreateUser) {
    ref.authWithPassword({email: userData.email, password: userData.password}, function(err, authData) {
      if (err) {
        console.log("Error signing in user:", err.message);
        callback(err.message, null);
        callbackCreateUser && callbackCreateUser(err.message, false); 
      } else {
        authData.email = userData.email;
        cachedUser = authData;
        callback(null, authData);
        callbackCreateUser && callbackCreateUser(false, true);
        console.log("Successfully signed in user with payload:", authData);
      }
    }.bind(this));
  },
  signOut: function(callback) {
    ref.unauth();
    cachedUser = null;
    assessed = null;
    console.log("Successfully signed out user");
    callback();
  },
  isSignedIn: function() {
    if (ref.getAuth() || cachedUser) {
      cachedUser = ref.getAuth();
    }
    return cachedUser && true || ref.getAuth() || false;
  },
  checkIfAssessed: function(callback) {
    if (assessed == null) {
      ref.child('assessment').child(cachedUser.uid).once("value", function(snapshot) {
        if (snapshot.hasChild(moment().format("MM-DD-YYYY"))) {
          console.log("Today's assessment in FB DB");
          dateAssessed = moment().format("MM-DD-YYYY");
          assessed = true;
          callback(true);
        } else { 
          console.log("Today's assessent not in FB DB");
          assessed = false;
          callback(false); 
        }
      }.bind(this));
    } else {
      console.log("Assessment today is: " + assessed);
      callback(assessed);
    }
  },
  getTodaysAssessmentResult: function(callback) {
    ref.child('assessment').child(cachedUser.uid).child(dateAssessed).once("value", function(snapshot) {
      var assessmentObj = snapshot.val();
      callback(false, assessmentObj.score);
      console.log("The read was successful: ", assessmentObj);
    }, function(err) {
      callback(err, false);
      console.log("The read failed: ", err);
    }.bind(this));
  },
  tempSaveAssessQuest: function(question, answer) {
    surveyAnswers[question] = answer;
  },
  addAssessQuestAnsToDB: function() {
    dateAssessed = moment().format("MM-DD-YYYY");
    var score = 0;
    for (var key in surveyAnswers) {
      ref.child('assessment').child(cachedUser.uid).child(dateAssessed).child(key).set(surveyAnswers[key]);
      score += parseFloat(surveyAnswers[key]);
      surveyAnswers[key] = null;
    }
    ref.child('assessment').child(cachedUser.uid).child(dateAssessed).child('score').set(score);
    console.log("Added all survey answers and score to DB successfully");
    assessed = true;
  },
  deleteAssessmentData: function(callback) {
    //delete data from firebase
    ref.child('assessment').child(cachedUser.uid).child(dateAssessed).remove( function(err) {
      if (err) {
        console.log("Unable to delete today's assessment data: ", err.message);
        callback(err.message);
      } else {
        console.log("Successfully able to delete today's assessment data");
        assessed = null;
        dateAssessed = null;
        callback();
      }
    }.bind(this));
  },
  retrieveMonthlyAssessmentRecord: function(startDate, endDate, callback) {
    var answer = {};
    ref.child('assessment').child(cachedUser.uid).orderByKey().startAt(startDate).endAt(endDate).once("value", function(snapshot) {
      if (!snapshot) {
        answer = null;
      } else {
        for (var date in snapshot.val()){
          answer[moment(date).format('D')] = snapshot.val()[date];
        }
        if (callback) {
          callback(answer);
        }
      }
    }.bind(this));
  },
  loadThisMonthlyRecord: function(callback) {
    var startDate = moment().startOf('month').format("MM-DD-YYYY");
    var endDate = moment().format("MM-DD-YYYY");
    this.retrieveMonthlyAssessmentRecord(startDate, endDate, function(ans){
      thisMonth = ans;
      console.log("loaded info in firebaseUtil:"+ thisMonth);
      callback();
    });
  },
  getThisMonthlyRecord: function() {
    return thisMonth;
  }
};


module.exports = firebaseUtil;