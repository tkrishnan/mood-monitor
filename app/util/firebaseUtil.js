var Firebase = require('firebase');
var ref = new Firebase('http://mood-monitor-app.firebaseio.com');
var moment = require('moment');
moment().format();
var cachedUser = null;
var dateAssessed = null;
var assessed = null;
var thisMonth = null;
var safetyData = null;


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
        this.getAllUserData();
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
      this.getAllUserData();
    }
    return cachedUser && true || ref.getAuth() || false;
  },
  getAllUserData: function() {
    ref.child('user').child(cachedUser.uid).once("value", function(snapshot){
      console.log(snapshot.val());
      cachedUser.password.firstName = snapshot.val().firstName;
      cachedUser.password.lastName = snapshot.val().lastName;
    });
  },
  getCachedUser: function() {
    console.log(cachedUser);
    return cachedUser;
  },
  changeUserFirstName: function(email, password, firstName, callback) {
    ref.authWithPassword({email: email, password: password}, function(error, authData){
      if (error) {
        console.log("Authentication error for first name change:", error.message);
        callback(error.message);
      } else {
        ref.child('user').child(cachedUser.uid).child('firstName').set(firstName);
        console.log("Successfully changed first name");
        firebaseUtil.getAllUserData();
        callback();
      }
    });
  },
  changeUserLastName: function(email, password, lastName, callback) {
    ref.authWithPassword({email: email, password: password}, function(error, authData){
      if (error) {
        console.log("Authentication error for last name change:", error.message);
        callback(error.message);
      } else {
        ref.child('user').child(cachedUser.uid).child('lastName').set(lastName);
        console.log("Successfully changed last name");
        firebaseUtil.getAllUserData();
        callback();
      }
    }); 
  },
  changeUserEmail: function(oldEmail, password, newEmail, callback) {
    ref.changeEmail({
      oldEmail: oldEmail,
      newEmail: newEmail,
      password: password
    }, function(err){
      if (err) {
        switch(err.code) {
          case 'INVALID_USER':
            console.log("The specified user account does not exist.");
            callback("The specified user account does not exist.");
            break;
          case 'INVALID_PASSWORD':
            console.log("The specified user account password is incorrect.");
            callback("The specified user account password is incorrect.");
            break
          default:
            console.log("Error changing email: ", err.message);
            callback(err.message);
        }
      } else {
        ref.child('user').child(cachedUser.uid).child('email').set(newEmail);
        console.log("Email changed successfully");
        firebaseUtil.getAllUserData();
        callback();
      }
    });
  },
  changeUserPassword: function(email, oldPassword, newPassword, callback) {
    ref.changePassword({
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword
    }, function(err) {
      if (err) {
        switch(err.code) {
          case 'INVALID_USER':
            console.log("The specified user account does not exist.");
            callback("The specified user account does not exist.");
            break;
          case 'INVALID_PASSWORD':
            console.log("The specified user account password is incorrect.");
            callback("The specified user account password is incorrect.");
            break;
          default:
            console.log("Error changing email: ", err.message);
            callback(err.message);
        }
      } else {
        console.log("Password changed successfully");
        ref.child('user').child(cachedUser.uid).child('token').set(ref.getAuth().token);
        firebaseUtil.getAllUserData();
        callback();
      }
    });
  },
  sendUserPasswordResetEmail: function(email, callback) {
    ref.resetPassword({
      email: email
    }, function(err) {
      if (err) {
        switch(err.code) {
          case('INVALID_USER'):
            console.log("The specified user account does not exist.");
            callback("The specified user account does not exist.");
            break;
          default:
            console.log("Error resetting password: ", err.message);
            callback(err.message);
        }
      } else {
        console.log("Password reset email sent successfully");
        callback();
      }
    });
  },
  deleteUser: function(email, password, callback) {
    ref.removeUser({
      email: email,
      password: password
    }, function(err) {
      if (err) {
        switch(err.code) {
          case 'INVALID_EMAIL':
          case 'INVALID_PASSWORD':
          default: 
            console.log("Error deleting user: ", err);
            callback(err.message);
        }
      } else {
        console.log("User deleted successfully");
        callback();
      }
    });
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
      }, function(err) {
        console.log("The read failed: ", err);
      });
    } else {
      console.log("Assessment today is: " + assessed);
      callback(assessed);
    }
  },
  getTodaysAssessmentResult: function(callback) {
    ref.child('assessment').child(cachedUser.uid).child(dateAssessed).once("value", function(snapshot) {
      var assessmentObj = snapshot.val();
      callback(assessmentObj.score);
      console.log("The read was successful: ", assessmentObj);
    }, function(err) {
      console.log("The read failed: ", err);
    });
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
      } else {
        console.log("Successfully able to delete today's assessment data");
        assessed = null;
        dateAssessed = null;
        callback();
      }
    });
  },
  retrieveMonthlyAssessmentRecord: function(startDate, endDate, callback) {
    var answer = {};
    ref.child('assessment').child(cachedUser.uid).orderByKey().startAt(startDate).endAt(endDate).once("value", function(snapshot) {
      console.log(snapshot.val());
      if (!snapshot.val()) {
        console.log("No records found for given date range");
        answer = null;
      } else {
        console.log("Records found for given date range");
        for (var date in snapshot.val()){
          answer[moment(date).format('D')] = snapshot.val()[date];
        }
      }
      callback(answer);
    }, function(err){
      console.log("The read failed: ", err);
    });
  },
  loadThisMonthlyRecord: function(callback) {
    var startDate = moment().startOf('month').format("MM-DD-YYYY");
    var endDate = moment().format("MM-DD-YYYY");
    this.retrieveMonthlyAssessmentRecord(startDate, endDate, function(ans){
      thisMonth = ans;
      callback();
    });
  },
  getThisMonthlyRecord: function() {
    return thisMonth;
  },
  saveWarningSignData: function(model) {
    ref.child('safety_plan').child(cachedUser.uid).child('warning_signs').set(model);
  },
  removeWarningSignData: function(callback) {
    ref.child('safety_plan').child(cachedUser.uid).child('warning_signs').remove(function(err){
      if (err) {
        console.log("Synchronization failed.");
      } else {
        console.log("Synchronization sucessful.");
        callback();
      }
    });
  },
  saveCopingStrategyData: function(model) {
    ref.child('safety_plan').child(cachedUser.uid).child('coping_strategies').set(model);
  },
  removeCopingStrategyData: function(callback) {
    ref.child('safety_plan').child(cachedUser.uid).child('coping_strategies').remove(function(err){
      if (err) {
        console.log("Synchronization failed.");
      } else {
        console.log("Synchronization successful");
        callback();
      }
    });
  },
  saveDistractionData: function(model) {
    ref.child('safety_plan').child(cachedUser.uid).child('distractions').set(model);
  },
  removeDistractionData: function(callback) {
    ref.child('safety_plan').child(cachedUser.uid).child('distractions').remove(function(err) {
      if (err) {
        console.log("Synchronization failed.");
      } else {
        console.log("Synchronization successful.");
        callback();
      }
    });
  },
  saveSafetyMeasureData: function(model) {
    ref.child('safety_plan').child(cachedUser.uid).child('safety_measures').set(model);
  },
  removeSafetyMeasureData: function(callback) {
    ref.child('safety_plan').child(cachedUser.uid).child('safety_measures').remove(function(err) {
        if (err) {
          console.log("Synchronization failed.");
        } else {
          console.log("Synchronization successful.");
          callback();
        }
    });
  },
  saveReasonToLiveData: function(model) {
    ref.child('safety_plan').child(cachedUser.uid).child('reasons_to_live').set(model);
  },
  removeReasonToLiveData: function(callback) {
    ref.child('safety_plan').child(cachedUser.uid).child('reasons_to_live').remove(function(err){
      if (err) {
        console.log("Synchronization failed.");
      } else {
        console.log("Synchronization successful.");
        callback();
      }
    });
  },
  loadSafetyPlanData: function(callback) {
    ref.child('safety_plan').child(cachedUser.uid).once('value', function(snapshot) {
      if (!snapshot.val()) {
        console.log("No safety plan data saved for user");
      } else {
        console.log("Safety plan data found for user");
        safetyData = snapshot.val();
      }
      callback();
    }, function(err){
      console.log("The read failed: ", err);
    });
  },
  getSafetyPlanData: function() {
    return safetyData;
  }
};


module.exports = firebaseUtil;