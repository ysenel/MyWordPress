var mongoose = require('mongoose');

/* Schéma d'une catégorie */
var categorieSchema = new mongoose.Schema({
	title : String,
	date : Date
});

var categorieModel = mongoose.model('categorie', categorieSchema);


exports.create = function (req, res) {
	if (typeof req.body.title != 'undefined'){
		var page = new categorieModel({
			title : req.body.title,
			date : req.body.date
		});
		page.save(function (err, doc) {
	  		if (err) { throw err; res.sendStatus(500);}
	  		console.log('categorie ajoutée avec succès !');
	  		res.json(doc);
		});
	}
	else
		res.sendStatus(500);
};

exports.getAll = function (res, res) {
	var query = categorieModel.find(null);
	query.exec(function (err, categories) {
  		if (err) { throw err; res.sendStatus(500);}
  		return res.json(categories);
	});
};

exports.getOne = function (req, res) {
	var query = categorieModel.findById({_id : req.params.id});
	query.exec(function (err, categorie) {
  		if (err) { throw err; res.sendStatus(500);}
		return res.json(categorie);
	});
};

exports.deleteOne = function (req, res) {
	var id = req.params.id;
	categorieModel.remove({_id : id}, function (err, result) {
  	if (err) { throw err; res.sendStatus(500);}
  	console.log('Categorie id = ' + id + ' supprimée.');
  	res.json({msg: 'This is CORS-enabled for all origins!', result : result});
	});
};

exports.deleteAll = function (req, res) {
	categorieModel.remove(null, function (err, result) {
  	if (err) { throw err; res.sendStatus(500);}
  	console.log('Toutes les categories ont été supprimées.');
  	return res.json(result);
	});
};

exports.updateCategorie = function (req, res) {
	var id = req.body.id;
	categorieModel.update({_id : id}, req.body, { multi : true }, function (err, result) {
  		if (err) { throw err; res.sendStatus(500);}
  		console.log('Categories modifiée');
  		res.json({msg: 'This is CORS-enabled for all origins!', result : result});
	});
};
