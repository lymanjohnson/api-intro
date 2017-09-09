const fs = require('fs'),
  path = require('path'),
  express = require('express'),
  // mustacheExpress = require('mustache-express'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  // flash = require('express-flash-messages'),
  mongoose = require('mongoose'),
  expressValidator = require('express-validator'),
  bcrypt = require('bcryptjs');

const app = express();

const activitySchema = new mongoose.Schema({
  user: {type:String, default: "anonymous"},
  description: {type: String, default:"Read"},
  unit: {type:String, default:"pages"},
  entry: {
    date: {type: Date, default: Date.now},
    quantity: {type: Number, default:0}
  }
});

mongoose.connect('mongodb://localhost/activitydb');


const Activity = mongoose.model('Activity',activitySchema);


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

//WORKS//
app.get('/api/activities/', function(req,res) {
// Show a list of all activities I am tracking, and links to their individual pages
  console.log("get activities");
  Activity.find().then(function(err, activity) {
    if (err) {
      res.send(err);
    }
    res.json(activity);
  });
});

//WORKS//
app.post('/api/activities/', function(req,res) {
// Create a new activity for me to track.
  console.log("post activities");

  const newActivity = new Activity(req.body);
    newActivity.save(function(err, activity) {
      if (err){
        res.send(err);
      }
      res.json(activity);
    });
});

//WORKS
app.get('/api/activities/:id', function(req,res) {
// Show information about one activity I am tracking, and give me the data I have recorded for that activity.
  console.log("get activities id");
  Activity.find({_id : req.params.id}).then(function(err,activity){
    if (err) {
      res.send(err)
    }
    res.json(activity)
  })
})

// WORKS , but displays old results?
app.put('/api/activities/:id', function(req,res) {
// Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.
  console.log("put activities id");
  Activity.findOneAndUpdate(
    {_id : req.params.id},
    { description  : req.body.description,
      unit         : req.body.unit }
  )
  .then(function(err,activity) {
    if (err){
      res.send(err)
    }
    res.json(activity)
  })
})

/*user
date
description
quantity
unit*/

//WORKS, BUT THEN DOESN'T REDIRECT WELL...
app.delete('/api/activities/:id', function(req,res) {
// Delete one activity I am tracking. This should remove tracked data for that activity as well.
  Activity.deleteOne({_id : req.params.id}).then(
    function(err,res){
      if (err) {
        res.send(err)
      }
      res.send("Deleted")
    }
  )
})


app.post('/api/activities/:id/stats', function(req,res) {
// Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.

})

app.delete('/api/stats/:id', function(req,res) {
//	Remove tracked data for a day.

})

app.listen(3000, function() {
  console.log('Express running on http://localhost:3000/.')
});
