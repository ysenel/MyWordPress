var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var path = require('path');
var application_root = __dirname;

/* Module codé */
var article = require("./route/article");
var page = require("./route/page");
var user = require("./route/user");
var categorie = require("./route/categorie");
var commentaire = require("./route/commentaires");


var app = express();

app.use(express.static(path.join(application_root ,'../client')));

app.use(bodyParser());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options('/*', function (request, response, next) {
    response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    response.send();
});


/* Connexion à la base de donées */
var db = mongoose.connect('mongodb://localhost/MyWordPress', function(err) {
  if (err) { throw err; }
});


/* Mise en place du token sur toute les routes sauf /login */
var mySecret = 'my_secret_key';
app.use(expressJwt({ secret: mySecret }).unless({ path: [ '/app/login','/app/user','/app/pages', '/app/categories', '/app/commentaire', /^\/app\/categorie_articles\/.*/, /^\/app\/page\/.*/]}));

/* Login */
app.post('/app/login', user.userCheck);

/* Articles */
app.get('/app/articles', article.getAll);
app.post('/app/article', article.create);
app.get('/app/article/:id', article.getOne);
app.delete('/app/article/:id', article.deleteOne);
app.delete('/app/articles', article.deleteAll);
app.put('/app/article', article.updateArticle);
app.get('/app/categorie_articles/:id', article.getArticlesByCategorie);
app.delete('/app/categorie_articles/:id', article.deleteArticlesByCategorie);


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

/* Categories */
app.get('/app/categories', categorie.getAll);
app.post('/app/categorie', categorie.create);
app.get('/app/categorie/:id', categorie.getOne);
app.delete('/app/categorie/:id', categorie.deleteOne);
app.delete('/app/categories', categorie.deleteAll);
app.put('/app/categorie', categorie.updateCategorie);

/* Commentaires */
app.get('/app/commentaires', commentaire.getAll);
app.post('/app/commentaire', commentaire.create);
app.get('/app/commentaire/:id', commentaire.getOne);
app.delete('/app/commentaire/:id', commentaire.deleteOne);
app.delete('/app/commentaires', commentaire.deleteAll);
app.put('/app/commentaire', commentaire.updateCommentaire);


app.listen(23456);
