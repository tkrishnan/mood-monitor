var Firebase = require('firebase');
var ref = new Firebase('http://mood-monitor-app.firebaseio.com');
var cachedUser = null;

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
    console.log("Successfully signed out user");
    callback();
  },
  isSignedIn: function() {
    return cachedUser && true || ref.getAuth() || false;
  },
};


module.exports = firebaseUtil;