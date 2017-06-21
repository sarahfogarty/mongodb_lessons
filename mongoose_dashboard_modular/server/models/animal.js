// require mongoose
var mongoose = require('mongoose');

// //Create Schema and attach as a model to our database
var AnimalSchema = new mongoose.Schema({
 name: String,
 updated_at: Date
});

AnimalSchema.path('name').required(true, 'name cannot be blank');

var Animal = mongoose.model('Animal', AnimalSchema);
