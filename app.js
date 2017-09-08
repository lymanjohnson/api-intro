
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const activitySchema = new mongoose.Schema({
  user: {type: String, lowercase:true, required:true},
  date: {type: Date, default: Date.now, required;true},
  description: {type: String, required:true, default:"Read"},
  quantity: {type: Number, required: true, default:0},
  unit: {type:String, required:true, default:"pages"}
});

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
