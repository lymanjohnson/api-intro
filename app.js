const fs = require('fs'),
  path = require('path'),
  express = require('express'),
  mustacheExpress = require('mustache-express'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  // flash = require('express-flash-messages'),
  mongoose = require('mongoose'),
  expressValidator = require('express-validator'),
  bcrypt = require('bcryptjs');

const app = express();

const activitySchema = new mongoose.Schema({
  user: {type: String, lowercase:true, required:true},
  date: {type: Date, default: Date.now, required:true},
  description: {type: String, required:true, default:"Read"},
  quantity: {type: Number, required: true, default:0},
  unit: {type:String, required:true, default:"pages"}
});

mongoose.connect('mongodb://localhost/activitydb');

// Not certain I need what is in between these lines: -->
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new(require('express-sessions'))({
    storage: 'mongodb',
    instance: mongoose, // optional
    host: 'localhost', // optional
    port: 27017, // optional
    db: 'test', // optional
    collection: 'sessions', // optional
    expire: 86400 // optional
  })
}));
// <-- Not sure I need what is in between these lines //

app.get('/activities/', function(req,res) {
// Show a list of all activities I am tracking, and links to their individual pages

})

app.post('/activities/', function(req,res) {
// Create a new activity for me to track.

})

app.get('/activities/:id', function(req,res) {
// Show information about one activity I am tracking, and give me the data I have recorded for that activity.

})

app.put('/activities/:id', function(req,res) {
// Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.

})

app.delete('activities/:id', function(req,res) {
// Delete one activity I am tracking. This should remove tracked data for that activity as well.

})


app.post('/activities/:id/stats', function(req,res) {
// Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.

})

app.delete('/stats/:id', function(req,res) {
//	Remove tracked data for a day.

})
