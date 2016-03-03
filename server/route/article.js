var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Schéma d'un article */
var articleSchema = new mongoose.Schema({
	title : String,
	content : String,
	categorie : {type : Schema.Types.ObjectId, ref:'categorie'},
	date : Date
});

var articleModel = mongoose.model('articles', articleSchema);


exports.create = function (req, res) {
	if (typeof req.body.title != 'undefined'){
		var article = new articleModel({
			title : req.body.title,
			content : req.body.content,
			categorie : req.body.categorie,
			date : req.body.date
		});
		article.save(function (err, doc) {
	  		if (err) { throw err; res.sendStatus(500);}
	  		console.log('article ajouté avec succès !');
	  		res.json(doc);
		});
	}
	else
		res.sendStatus(500);
};

exports.getAll = function (req, res) {
	var query = articleModel.find(null);
	query.exec(function (err, articles) {
  		if (err) { throw err; res.sendStatus(500);}
  		return res.json(articles);
	});
};

exports.getOne = function (req, res) {
	var query = articleModel.findById({_id : req.params.id});
	query.exec(function (err, article) {
  		if (err) { throw err; res.sendStatus(500);}
  		return res.json(article);
	});
};

exports.deleteOne = function (req, res) {
	var id = req.params.id;
	articleModel.remove({_id : id}, function (err, result) {
  	if (err) { throw err; res.sendStatus(500);}
  	console.log('Article id = ' + id + ' supprimé.');
  	res.json({msg: 'This is CORS-enabled for all origins!', result : result});
	});
};

exports.deleteAll = function (req, res) {
	articleModel.remove(null, function (err, result) {
  	if (err) { throw err; res.sendStatus(500);}
  	console.log('Tout les articles ont été supprimés.');
  	return res.json(result);
	});
};

exports.updateArticle = function (req, res) {
	var id = req.body.id;
	articleModel.update({_id : id}, req.body, { multi : true }, function (err, result) {
  		if (err) { throw err; res.sendStatus(500);}
  		console.log('Article modifié');
  		res.json({msg: 'This is CORS-enabled for all origins!', result : result});
	});
};

exports.getArticlesByCategorie = function (req, res) {
	var categorie_id = req.params.id;
	var query = articleModel.find({categorie : categorie_id});
	query.exec(function (err, articles) {
  		if (err) { throw err; res.sendStatus(500);}
  		return res.json(articles);
	});
};
