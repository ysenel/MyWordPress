var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
	title : String,
	content : String,
	date : Date
});

var articleModel = mongoose.model('articles', articleSchema);


exports.create = function (req, res) {
	if (typeof req.body.title != 'undefined'){
		console.log("error");
		var article = new articleModel({
			title : req.body.title,
			content : req.body.content,
			date : req.body.date
		});
		article.save(function (err, doc) {
	  		if (err) { throw err; }
	  		console.log('article ajouté avec succès !');
	  		res.json(doc);
		});
	}
	else
		res.json("error");
};

exports.getAll = function (res, res) {
	var query = articleModel.find(null);
	query.exec(function (err, articles) {
  		if (err) { throw err; }
  		return res.json(articles);
	});
};

exports.getOne = function (req, res) {
	var query = articleModel.findById({_id : req.params.id});
	query.exec(function (err, article) {
  		if (err) { throw err; }
  		return res.json(article);
	});
};

exports.deleteOne = function (req, res) {
	var id = req.params.id;
	console.log(id);
	articleModel.remove({_id : id}, function (err, result) {
  	if (err) { throw err; }
  	console.log('Article id = ' + id + ' supprimé.');
  	res.json({msg: 'This is CORS-enabled for all origins!'});
  	//return res.json(result);
	});
};

exports.deleteAll = function (req, res) {
	articleModel.remove(null, function (err, result) {
  	if (err) { throw err; }
  	console.log('Tout les articles ont été supprimés.');
  	return res.json(result);
	});
};

exports.updateArticle = function (req, res) {
	var id = req.body.id;
	console.log(req.body);
	articleModel.update({_id : id}, req.body, { multi : true }, function (err, ressult) {
  		if (err) { throw err; }
  		console.log('Article modifié');
  		res.json({msg: 'This is CORS-enabled for all origins!'});
	});
};