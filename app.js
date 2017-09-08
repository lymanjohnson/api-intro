
app.get('/activities/')
// Show a list of all activities I am tracking, and links to their individual pages

app.post('/activities/')
// Create a new activity for me to track.

app.get('/activities/:id')
// Show information about one activity I am tracking, and give me the data I have recorded for that activity.

app.put('/activities/:id')
// Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.

app.delete('activities/:id')
// Delete one activity I am tracking. This should remove tracked data for that activity as well.

app.post('/activities/:id/stats')
// Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.

app.delete('/stats/:id')
//	Remove tracked data for a day.
