var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
//Create Express app
var app = express();

var bodyParser = require('body-parser');
//use boyParser to parse for data sent cia HTTP POST
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "./static")));

//Tell server where views are adn what templating engind I'm using
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');
//  Require the routes.js file and pass in app
require('./server/config/routes.js') (app);

// store the function in a variable
// var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
// console.log('RS',routes_setter);

// routes_setter(app);



// var mongoose =require('mongoose');



// //
//
//


app.listen(8000, function(){
  console.log("listening on port 8000");
});
