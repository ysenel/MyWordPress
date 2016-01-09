var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var article = require("./article");
var cors = require('cors');





var app = express();
app.use(bodyParser());
app.use(cors());

var db = mongoose.connect('mongodb://localhost/MyWordPress', function(err) {
  if (err) { throw err; }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/app/articles', article.getAll);
app.post('/app/article', article.create);
app.get('/app/article/:id', article.getOne);
app.delete('/app/article/:id', article.deleteOne);
app.delete('/app/articles', article.deleteAll);


app.listen(8080);