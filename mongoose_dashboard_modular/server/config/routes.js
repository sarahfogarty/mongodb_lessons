var mongoose = require('mongoose');
var animals = require('../controllers/animals.js');
var animal = mongoose.model('animal', AnimalSchema);

module.exports = function(app){
	app.get('/', function(req, res){
		animals.show_all(req, res);
	});

	app.get('/new', function(req, res){
		res.render('new');
	});

	app.post('/new', function(req, res){
		animals.create(req, res);
	});

	app.get('/show/:id', function(req, res){
		animals.show_one(req, res);
	});

	app.get('/edit/:id', function(req, res){
		animals.show_edit_one(req,res);
	});

	app.post('/edit/:id', function(req, res){
		animals.edit_one(req, res);
	});

	app.post('/delete/:id', function(req, res){
		animals.destroy(req, res);
	});
};
