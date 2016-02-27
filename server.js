var path = require('path');
//var Firebase = require('firebase');
//var ref = new Firebase('http://mood-monitor-app.firebaseio.com');
var express = require('express');
var app = express();

//set port
app.set('port', (process.env.PORT || 3000));


//serve static assets normally
app.use('/', express.static(path.join(__dirname, 'build')));


//for every other route, serve up index.html
app.get('*', function(request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


//listen for requests on port and log process
app.listen(app.get('port'), function() {
   console.log('Server started: http://localhost:' + app.get('port') + '/');
 });