var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
	title : String,
	content : String,
	date : Date
});

var pageModel = mongoose.model('pages', pageSchema);


exports.create = function (req, res) {
	if (typeof req.body.title != 'undefined'){
		var page = new pageModel({
			title : req.body.title,
			content : req.body.content,
			date : req.body.date
		});
		page.save(function (err, doc) {
	  		if (err) { throw err; }
	  		console.log('page ajoutée avec succès !');
	  		res.json(doc);
		});
	}
	else
		res.json("error");
};

exports.getAll = function (res, res) {
	var query = pageModel.find(null);
	query.exec(function (err, pages) {
  		if (err) { throw err; }
  		return res.json(pages);
	});
};

exports.getOne = function (req, res) {
	var query = pageModel.findById({_id : req.params.id});
	query.exec(function (err, page) {
  		if (err) { throw err; }
  		return res.json(page);
	});
};

exports.deleteOne = function (req, res) {
	var id = req.params.id;
	pageModel.remove({_id : id}, function (err, result) {
  	if (err) { throw err; }
  	console.log('Page id = ' + id + ' supprimée.');
  	res.json({msg: 'This is CORS-enabled for all origins!'});
  	//return res.json(result);
	});
};

exports.deleteAll = function (req, res) {
	pageModel.remove(null, function (err, result) {
  	if (err) { throw err; }
  	console.log('Toutes les pages ont été supprimées.');
  	return res.json(result);
	});
};

exports.updatePage = function (req, res) {
	var id = req.body.id;
	pageModel.update({_id : id}, req.body, { multi : true }, function (err, ressult) {
  		if (err) { throw err; }
  		console.log('Page modifié');
  		res.json({msg: 'This is CORS-enabled for all origins!'});
	});
};