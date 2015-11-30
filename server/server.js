// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');
var key            = require('../keys');

// configuration ===========================================

// set our port
var port = process.env.PORT || 3000;
mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/recipes';

// connect to our mongoDB database 
mongoose.connect(mongoURI); 

app.use(bodyParser.json()); 

app.use(bodyParser.json({ type: 'application/json' })); 

app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/../client'));

// routes ==================================================
require('./routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;                         
