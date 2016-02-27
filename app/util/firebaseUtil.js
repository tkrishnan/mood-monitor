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
            console.log("This email has been taken");
            break;
          case 'INVALID_EMAIL':
            console.log("This email is invalid");
            break;
          default:
            console.log("Error creating user:", err.message);
        }
      } else {
        this.signInUser(newUserData, function(authData) {
          addNewUserToDB({
            email: newUserData.email,
            uid: authData.uid,
            token: authData.token
          });
        }, callback);
      }
    }.bind(this));
  },
  signInUser: function(userData, callback, callbackCreateUser) {
    ref.authWithPassword({email: userData.email, password: userData.password}, function(err, authData) {
      if (err) {
        console.log("Error signing in user:", err.message);
        callbackCreateUser && callbackCreateUser(false); 
      } else {
        authData.email = userData.email;
        cachedUser = authData;
        callback(authData);
        callbackCreateUser && callbackCreateUser(true);
        console.log("Successfully signed in user with payload:", authData);
      }
    }.bind(this));
  },
  signOut: function(callback) {
    ref.unauth();
    cachedUser = null;
    callback();
  },
  isSignedIn: function() {
    return cachedUser && true || ref.getAuth() || false;
  },
};


module.exports = firebaseUtil;