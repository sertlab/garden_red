/////////////////////////////////////////////////////////////
//////////AUTHORS :   chocof (https://github.com/chocof)/////
//////////File :  app/api/gardener.js   		    /////////
/////////////////////////////////////////////////////////////

var crypto = require('crypto');

//Basic User Model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var gardener = mongoose.Schema({
	email 				: String,  ///users' unique email
	password  			: String,  ///Users' password... will later be md5-hashed
	name				: String,  ///Users' name
	surname				: String,  ///Users's surname
	username			: String,  ///User's username
	device_list 		: []
});
//Create md5 hashing with crypto
gardener.methods.generateHash = function(password) {
    var hash = crypto.createHash('md5'); //used for signup
    return hash.update(password).digest('hex');
};

// check if password is valid
gardener.methods.validPassword = function(password) {
    var hash = crypto.createHash('md5'); //used for login	
	var input = hash.update(password).digest('hex')
	//compare to hashed password
    return (input === this.password);
};


module.exports = mongoose.model('Gardener', gardener);