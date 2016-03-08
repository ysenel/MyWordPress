var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Schéma d'une page */
var commentaireSchema = new mongoose.Schema({
	article : {type : Schema.Types.ObjectId, ref:'articles'},
	content : String,
	user : {type : Schema.Types.ObjectId, ref:'users'},
	date : Date,
	anonymous : Boolean
});

var commentaireModel = mongoose.model('commentaires', commentaireSchema);


exports.create = function (req, res) {
	var commentaire = new commentaireModel({
		article : req.body.article,
		content : req.body.content,
		user : req.body.user,
		date : req.body.date,
		anonymous : req.body.anonymous
	});
	commentaire.save(function (err, doc) {
  		if (err) {throw err; res.sendStatus(500);}
  		console.log('commentaire ajouté avec succès !');
  		res.json(doc);
	});

};

exports.getAll = function (res, res) {
	var query = commentaireModel.find(null).populate('user article');
	query.exec(function (err, commentaires) {
  		if (err) { throw err; res.sendStatus(500);}
  		return res.json(commentaires);
	});
};

exports.getOne = function (req, res) {
	var query = commentaireModel.findById({_id : req.params.id});
	query.exec(function (err, commentaire) {
  		if (err) { throw err; res.sendStatus(500);}
		return res.json(commentaire);
	});
};

exports.deleteOne = function (req, res) {
	var id = req.params.id;
	commentaireModel.remove({_id : id}, function (err, result) {
  	if (err) { throw err; res.sendStatus(500);}
  	console.log('Commentaire id = ' + id + ' supprimée.');
  	res.json({msg: 'This is CORS-enabled for all origins!', result : result});
	});
};

exports.deleteAll = function (req, res) {
	commentaireModel.remove(null, function (err, result) {
  	if (err) { throw err; res.sendStatus(500);}
  	console.log('Tout les commentaires ont été supprimés.');
  	return res.json(result);
	});
};

exports.updateCommentaire = function (req, res) {
	var id = req.body.id;
	commentaireModel.update({_id : id}, req.body, { multi : true }, function (err, result) {
  		if (err) { throw err; res.sendStatus(500);}
  		console.log('Commentaire modifié');
  		res.json({msg: 'This is CORS-enabled for all origins!', result : result});
	});
};

exports.getArticleCommentaires = function (req, res) {
	var query = commentaireModel.find({article : req.params.id}).sort({date: 'descending'}).populate('user');
	query.exec(function (err, commentaires) {
  		if (err) { throw err; res.sendStatus(500);}
		return res.json(commentaires);
	});
};
