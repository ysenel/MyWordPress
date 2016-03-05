var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Schéma d'une page */
var pageSchema = new mongoose.Schema({
	title : String,
	content : String,
	user : {type : Schema.Types.ObjectId, ref:'users'},
	date : Date
});

var pageModel = mongoose.model('pages', pageSchema);


exports.create = function (req, res) {
	if (typeof req.body.title != 'undefined'){
		var page = new pageModel({
			title : req.body.title,
			content : req.body.content,
			user : req.body.user,
			date : req.body.date
		});
		page.save(function (err, doc) {
	  		if (err) { throw err; res.sendStatus(500);}
	  		console.log('page ajoutée avec succès !');
	  		res.json(doc);
		});
	}
	else
		res.sendStatus(500);
};

exports.getAll = function (res, res) {
	var query = pageModel.find(null).populate('user');
	query.exec(function (err, pages) {
  		if (err) { throw err; res.sendStatus(500);}
  		return res.json(pages);
	});
};

exports.getOne = function (req, res) {
	var query = pageModel.findById({_id : req.params.id});
	query.exec(function (err, page) {
  		if (err) { throw err; res.sendStatus(500);}
		return res.json(page);
	});
};

exports.deleteOne = function (req, res) {
	var id = req.params.id;
	pageModel.remove({_id : id}, function (err, result) {
  	if (err) { throw err; res.sendStatus(500);}
  	console.log('Page id = ' + id + ' supprimée.');
  	res.json({msg: 'This is CORS-enabled for all origins!', result : result});
	});
};

exports.deleteAll = function (req, res) {
	pageModel.remove(null, function (err, result) {
  	if (err) { throw err; res.sendStatus(500);}
  	console.log('Toutes les pages ont été supprimées.');
  	return res.json(result);
	});
};

exports.updatePage = function (req, res) {
	var id = req.body.id;
	pageModel.update({_id : id}, req.body, { multi : true }, function (err, result) {
  		if (err) { throw err; res.sendStatus(500);}
  		console.log('Page modifié');
  		res.json({msg: 'This is CORS-enabled for all origins!', result : result});
	});
};
