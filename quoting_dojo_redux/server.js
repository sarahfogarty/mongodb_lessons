// require express and path
var express = require("express");
var path = require("path");
// create the express app
var app = express();
// require bodyParser since we need to handle post data for adding a user
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotes');
var QuoteSchema = new mongoose.Schema({
  name: String,
  quote: String
})
var Quote = mongoose.model('Quote', QuoteSchema);
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
  res.render("index");
})
app.post('/quotes', function(req,res){
  var quote = new Quote({name: req.body.name, quote: req.body.quote});
  quote.save(function(err) {
    if(err){
      console.log("something went wrong");
    } else {
      res.redirect('/main');
    }
  })
})
app.get('/main', function (req, res) {
  Quote.find({}, function (err, quotes){
    res.render('main', {quotes:quotes});
  });
})
// tell the express app to listen on port 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})
