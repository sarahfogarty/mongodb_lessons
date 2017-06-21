//HAVE YOU INSTALLED THE FOLLOWING?
// make a package.json file:
// yourcommandline> npm init -y
// yourcommandline> npm install express --save
// yourcommandline> npm install ejs --save
// yourcommandline> npm install body-parser --save
// yourcommandline> npm install mongoose --save


// Require the Express Module
var express = require('express');

// Create an Express App
var app = express();

// Require Mongoose
var mongoose = require('mongoose');

//use a native promise
mongoose.Promise = global.Promise;

//This is how we connect to the mongodb database using mongoose --"baseic_mongoose is the name of our db in mongodb, Thsi shoudl match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');


// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));

// Require path
var path = require('path');

// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));

// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));

// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

// Routes
// Root Request
// app.get('/', function(req, res) {
//     // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
//     res.render('index');
// });


// Create mongoose schema - Lets say the user will have a name which is a string and an age that is a number.
var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
});

//we are setting theis Schema in out Models as 'User'
mongoose.model('User', UserSchema);
//we are retreiving this Schema from out Models, names 'User'
var User = mongoose.model('User');


//Now to modify the root route to render index.ejs and pass all of the users that are in the database.
//The root route -- we want to get all of the users from the database and then render the index view passing it all of the users
app.get('/', function(req,res){
    User.find({}, function(err, users){
        //This is the method that finds all of the users from the database
        //Notice how the first parameter is teh options for what to find and the second is the callback function that has an error (if any) and all of the users
        //keep in mind that everything you want to do AFTER you get the users from the database must happen inside of the callback for it to be synchronous.
        //Make sure you handle the case when there is an error, as well as the case when there is no error
        if (err){
            console.log ("Error");
        }
        else {
            console.log(users);
            res.render('index', {users: users});
        }
    });
});

// Add User Request
// When the user presses the submit button on index.ejsm it shoudl send a post request to '/users'. In this route we shoudl add the user to the database and then redirect to the root route. (index view)
app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database. User is actually an object constructor. The "User" which constructs user objects, have methods that talk to the database.
    var user = new User({name: req.body.name, age: req.body.age});
// Try to save that new user to the database (this is the nethod that actually inserts into the db) ad run a callback function with an error (if any) from the operation
//.save is the method that actually inserts into the DB.
//.save takes a callback function tha thas an error parameter so that we know whether or not the insert was successful. Any method that interacts with the database will typically have a callback function as a parameter (the callback function will run when the database operation finishes)
    user.save(function(err){
        //if there is an error console.log that something went wrong.
        if(err){
            console.log('something went wrong');
        } else {
            //else console.log that we did well adn then redirect to the root route
            console.log('successfully added a user!');
            res.redirect('/');
        }
    });
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
