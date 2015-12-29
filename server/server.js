var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser());


var db = mongoose.connect('mongodb://localhost/MyWordPress', function(err) {
  if (err) { throw err; }
});

var ArticleSchema = new mongoose.Schema({title : String});

var ArticleModel = mongoose.model('articles', ArticleSchema);


app.get('/articles', function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	var query = ArticleModel.find(null);
	query.exec(function (err, articles) {
  		if (err) { throw err; }
  		return res.json(articles);
});

});

app.post('/article', function(req, res) {

	console.log(req.body.title);
	var article = new ArticleModel({title : req.body.title});
	console.log("titititi");
	article.save(function (err) {
	  if (err) { throw err; }
	  console.log('article ajouté avec succès !');
	});
});


app.listen(8080);