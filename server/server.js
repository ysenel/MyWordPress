var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

/* Module codé */
var article = require("./route/article");
var page = require("./route/page");
var user = require("./route/user");


var app = express();

app.use(bodyParser());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/* Connexion à la base de donées */
var db = mongoose.connect('mongodb://localhost/MyWordPress', function(err) {
  if (err) { throw err; }
});


/* Mise en place du token sur toute les routes sauf /login */
var mySecret = 'my_secret_key';
app.use(expressJwt({ secret: mySecret }).unless({ path: [ '/app/login','/app/user']}));

/* Login */
app.post('/app/login', user.userCheck);

/* Articles */
app.get('/app/articles', article.getAll);
app.post('/app/article', article.create);
app.get('/app/article/:id', article.getOne);
app.delete('/app/article/:id', article.deleteOne);
app.delete('/app/articles', article.deleteAll);
app.put('/app/article', article.updateArticle);


/* Pages */
app.get('/app/pages', page.getAll);
app.post('/app/page', page.create);
app.get('/app/page/:id', page.getOne);
app.delete('/app/page/:id', page.deleteOne);
app.delete('/app/pages', page.deleteAll);
app.put('/app/page', page.updatePage);

/* Users */
app.get('/app/users', user.getAll);
app.post('/app/user', user.create);
app.get('/app/user/:id', user.getOne);
app.delete('/app/user/:id', user.deleteOne);
app.delete('/app/users', user.deleteAll);
app.put('/app/user', user.updateUser);


app.listen(8080);
