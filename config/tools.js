/////////////////////////////////////////////////////////////
//////////AUTHORS :   chocof (https://github.com/chocof)/////
//////////File :   config/tools.js                  /////////
/////////////////////////////////////////////////////////////

var User 	= require('../app/models/gardener');        		///User's Model

//for parsing
var qs = require('qs');

//this module will contain basic functions and methods to use in the application
// so it will basically work as a toolbox
module.exports = {

	//this function will be used to authenticate user when he tries to access 
	//private content
	authenticateUser : function(req,res,next){
		console.log('Is Authenticated : ' + req.isAuthenticated())
		if (req.isAuthenticated())
			return next();
		else{	
			console.log("Not authenticated")
			var possibleThreatIp = req.headers['x-forwarded-for'] || 
			req.connection.remoteAddress || 
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress;
			console.log("User with IP "+possibleThreatIp+" tried to access private content")
			res.status(401).send({message : "You are not authorized to access this content"});
			return;		
		}

	},


	validEmail : function (email){
        var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(email)
    }

}
