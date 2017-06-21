var mongoose = require('mongoose');
var animal = mongoose.model('animal');


module.exports = {
	show_all: function(req, res){
		animal.find({}, function(err, animal){
			if(err){
				console.log('Idk why but you didn"t get that animal info');
			}
			else{
				console.log('Good job, you got that info');
				res.render('index', {animal:animal});
			}
		});
	},
	show_one: function(req, res){
		animal.findOne({_id:req.params.id}, function(err, animal){
			res.render('animal', {animal:animal});
		});
	},
	show_edit_one: function(req, res){
		animal.findOne({_id:req.params.id}, function(err, animal){
			res.render('edit', {animal:animal});
		});
	},
	create: function(req, res){
		var animal = new animal({name:req.body.name, age:req.body.age});
		animal.save(function(err){
			if(err){
				console.log('NOPE');
				res.render('new', {title: 'you have errors', errors:animal.errors});
			}
			else{
				console.log('Got info!');
				res.redirect('/');
			}
		});
	},
	edit_one: function(req, res){
		animal.update({_id:req.params.id}, {name:req.body.name, age:req.body.age}, function(err, animal){
			if(err){
				console.log('NOPE');
				//validations for updating don't work
				//fix this later!
				//res.render('edit/:id', {title: 'you have errors', errors:animal.errors});
			}
			else{
				console.log('Congrats');
				res.redirect('/');
			}
		});
	},
	destroy: function(req, res){
		animal.remove({_id:req.params.id}, function(err, animal){
			if(err){
				console.log("Didn't delete, check your code");
			}
			else{
				console.log("Deleted that animal :(");
				res.redirect('/');
			}
		});
	},
};
