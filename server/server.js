var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var article = require("./article");


var app = express();
app.use(bodyParser());


var db = mongoose.connect('mongodb://localhost/MyWordPress', function(err) {
  if (err) { throw err; }
});


app.get('/app/articles', article.getAll);
app.post('/app/article', article.create);
app.get('/app/article/:id', article.getOne);
app.delete('/app/article/:id', article.deleteOne);
app.delete('/app/articles', article.deleteAll);


app.listen(8080);