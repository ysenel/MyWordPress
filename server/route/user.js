var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var mySecret = 'my_secret_key';

/* Schéma d'un utilisateur */
var userSchema = new mongoose.Schema({
	login : String,
	pass : String,
	last_name : String,
  first_name : String,
  token : String
});

var userModel = mongoose.model('users', userSchema);


exports.create = function (req, res) {
		var user = new userModel({
			login : req.body.login,
			pass : req.body.pass,
			last_name : req.body.last_name,
      first_name : req.body.first_name,
      token : ""
		});
		user.save(function (err, doc) {
	  		if (err) { throw err; res.sendStatus(500);}
	  		console.log('user ajouté avec succès !');
	  		res.json(doc);
		});
};

exports.getAll = function (res, res) {
	var query = userModel.find(null);
	query.exec(function (err, users) {
  		if (err) { throw err; res.sendStatus(500);}
  		return res.json(users);
	});
};

exports.getOne = function (req, res) {
	var query = userModel.findById({_id : req.params.id});
	query.exec(function (err, user) {
  		if (err) { throw err; res.sendStatus(500);}
  		return res.json(user);
	});
};

exports.userCheck = function (req, res) {
	var query = userModel.find({login : req.body.login, pass : req.body.pass});
	query.exec(function (err, user) {
  		if (err) { throw err; res.sendStatus(500);}
			if (user.length == 1) {
			//création et envoie d'un token
		  var token = jwt.sign({username: req.body.user_name}, mySecret);
			console.log("token = " + token);
		  res.send({ success: true, token: token});
			}
			else {
					res.sendStatus(500);
			}

	});
};

exports.deleteOne = function (req, res) {
	var id = req.params.id;
	userModel.remove({_id : id}, function (err, result) {
  	if (err) { throw err; res.sendStatus(500);}
  	console.log('User id = ' + id + ' supprimé.');
  	res.json({msg: 'This is CORS-enabled for all origins!', result : result});
	});
};

exports.deleteAll = function (req, res) {
	userModel.remove(null, function (err, result) {
  	if (err) { throw err; res.sendStatus(500);}
  	console.log('Tout les users ont été supprimés.');
  	return res.json(result);
	});
};

exports.updateUser = function (req, res) {
	var id = req.body.id;
	userModel.update({_id : id}, req.body, { multi : true }, function (err, ressult) {
  		if (err) { throw err; res.sendStatus(500);}
  		console.log('User modifié');
  		res.json({msg: 'This is CORS-enabled for all origins!', ressult : result});
	});
};
