var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var serverRoutes = require('./app/routes/server.routes');
var session = require('express-session');

// create express server instance
var app = express();
app.set('views', path.join(__dirname,'/app/views')); //set views
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({secret:'secretMessage', cookie:{maxAge:600000},resave: true, saveUninitialized: true})); // 10min session
app.use(express.static(path.join(__dirname, '/public')));  //static contents
// router
app.use('/',serverRoutes);
app.listen(3000, function () {
  console.log('listening on port 3000')
});

//module.exports = app;
