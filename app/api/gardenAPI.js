
/////////////////////////////////////////////////////////////
//////////AUTHORS :   chocof (https://github.com/chocof)/////
//////////File :  app/api/gardenApi.js             /////////
/////////////////////////////////////////////////////////////


var UsersDB 	= require('../models/gardener');        					///MSA User's Model
var DeviceDB 	= require('../models/device');        					///MSA User's Model
var ReportsDB 	= require('../models/report'); 

//for making http requests to google API's
var rp = require('request-promise');



module.exports = function(app,passport,tools, privateData) {
	

	//Used for signing up user in the application
	app.route('/api/v1/signup')
		/**
		*@api {post} /api/v1/signup Registers user to the website
		*@apiName UserSignUp
		*@apiGroup User
		*
		*
		*@apiParam {json} Users' mail, username and password are mandatory. Name, surname, age are optional
		*@apiParamExample {json} Request-Example:
		*    {
		*		email		: USER_EMAIL,
		*		password	: USER_PASSWORD,
		*		username	: USER_USERNAME,
		*		name		: USER_NAME,
		*		surname		: USER_SURNAME,
		*		age			: USER_AGE
		*	} 
		*
		*
		*@apiSuccess {String} message Success message
		*@apiSuccessExample {json} Success-Response:
		*	  {successMessage : SUCCESS_MESSAGE}
		*
		*@apiError 400 BAD REQUEST
		*@apiError 500 Internal Server Error
		*@apiErrorExample {json} Error-Response:
		*     {message: ERROR_MESSAGE }
		*/
		.post(function(req, res, next) { //register user with passport
			passport.authenticate('signup', function(err, user, info) {
				
				//get errors
				if (err){
					console.log("Signup Error : ",err.message)
					res.status(500).send({errorMessage : err.message})
					return;
				};
				if(!user){
					errMess = req.flash('signupMessage')
					res.status(400).send({errorMessage : errMess[0]}); 
					return;
				}
				
				//log in user
				req.logIn(user, function(err) {
					if (err){
							console.log("Signup Error : ",e.message)
							res.status(500).send({errorMessage : err.message})
							return;
						}
						user.save(function(err,user){
							if (err){
								console.log("Signup Error : ",e.message)
								res.status(500).send({errorMessage : err.message})
								return;
							}
							res.status(200).send({successMessage : "You successfully signed up"})
						});	
					});	
			})(req, res, next);
		});


	//used for logging user in the application
	app.route('/api/v1/login')
		/**
		*@api {post} /api/v1/login Logs user in the website
		*@apiName UserLogin
		*@apiGroup User
		*
		*
		*@apiParam {json} User's username or email in the field username and password on password
		*@apiParamExample {json} Request-Example:
		*    {
		*		username : email_or_username,
		*		password : user_password
		*	}
		*
		*@apiSuccess {String} successMessage Success message
		*@apiSuccessExample {json} Success-Response:
		*	  {successMessage : SUCCESS_MESSAGE}
		*
		*@apiError 400 BAD REQUEST
		*@apiError 401 Authorization Failed
		*@apiError 500 Internal Server Error
		*@apiErrorExample {json} Error-Response:
		*     {errorMessage: ERROR_MESSAGE }
		*/
		.post(function(req, res, next) { //register user with passport
			passport.authenticate('login',function(err, user, info) {
								
				//find errors(if they exist) and send message
				if (err){
					console.log("Login Error : ",e.message)
					res.status(500).send({errorMessage : "Couldn't Login"}); 
					return;
				};
				if(!user){
					res.status(400).send({errorMessage : "Couldn't Login"}); 
					return;
				}
				
				req.logIn(user, function(err) {
					
					console.log('[+]User with username '+user.username+' successfully logged in!!!')
					
						if (err){
							console.log("Login  Error : ",e.message)
							res.status(500).send({errorMessage : err.message})
							return;
						}
						res.status(200).send({successMessage : "You successfully logged in!!!"})
					
					});
			})(req, res, next);

		});	



	//-----------------From this point on every request needs to be authenticated-------------------//
	app.route('/api/v1/user')
		/**
		*@api {get} /api/v1/user Gets user information
		*@apiName UserInfo
		*@apiGroup User
		*
		*
		*@apiSuccess {json} info Json object which contains user data
		*@apiSuccessExample {json} Success-Response:
		*	  {	
		*		info	:	{
		*			email 		: USERS_EMAIL,
		*			username	: USER_USERNAME
		*			name		: USERS_NAME,
		*			surname		: USERS_SURNAME,
		*			age			: USERS_AGE
		*		}
		*	}
		*
		*@apiError 400 BAD REQUEST
		*@apiError 401 Authorization Failed
		*@apiError 500 Internal Server Error
		*@apiErrorExample {json} Error-Response:
		*     {message: ERROR_MESSAGE }
		*/
		.get(tools.authenticateUser,function(req,res){

			//first find user by id
			UsersDB.findById(req.user,function(err, user){
				if (err){
					console.log("Getting User Info  Error : ",e.message)
					res.status(500).send({errorMessage : err.message})
					return;
				}
 				
 				var jsonToSend = {
						info : {

							email 	 : user.email,
							username : user.username,
							name     : user.name,
							surname  : user.surname,
						},
						device_list : user.device_list
				};
				res.send(jsonToSend)
 			})
		})




		/**
		*@api {post} /api/v1/user Sets user information
		*@apiName UserSetInfo
		*@apiGroup User
		*
		*@apiParam {json} Attributes to change for user
		*@apiParamExample {json} Request-Example:
		*    {
		*		username 	: username_to_change_it_with,
		*		email		: email_to_change_it_with,
		*		name		: name_to_change_it_with,
		*		surname		: surname_to_change_it_with,
		*		age			: age_to_change_it_with  		
		*	}
		*
		*@apiSuccess {String} successMessage Success message
		*@apiSuccessExample {json} Success-Response:
		*	  {successMessage : SUCCESS_MESSAGE}
		*
		*@apiError 400 BAD REQUEST
		*@apiError 401 Authorization Failed
		*@apiError 500 Internal Server Error
		*@apiErrorExample {json} Error-Response:
		*     {message: ERROR_MESSAGE }
		*/
		.post(tools.authenticateUser,function(req,res){

			//first find user by id
			UsersDB.findById(req.user,function(err, user){
				if (err){
					console.log("Getting User Info  Error : ",e.message)
					res.status(500).send({errorMessage : err.message})
					return;
				}

				var makeCheck = false;

				//set new attributes
				var toChangeAttrs = req.body; 
					
				var arrayOfAllowedAttrs = ['username','email','name','surname','age'];	
				for (attr in toChangeAttrs){
					//if user wants to change password
					if (attr === 'password' && toChangeAttrs[attr] && toChangeAttrs[attr] != ""){
						if (toChangeAttrs[attr].length < 6){
							res.status(400).send({errorMessage : "Password must be more than 6 characters"})
							return
						}
						user.password = user.generateHash(toChangeAttrs[attr]);
						continue;
					}
					
					//check if we need to make changes	
					if (attr === 'email' || attr === 'username'){
						makeCheck = true;
						if (attr === 'username' && toChangeAttrs[attr] && toChangeAttrs[attr].length < 3){
							res.status(400).send({errorMessage : "Username must be more than 3 characters"})
							return
						}
					}

					//else set normally
					if (arrayOfAllowedAttrs.indexOf(attr) >= 0 && toChangeAttrs[attr] && toChangeAttrs[attr] != ""){
						if (attr == 'email' && !tools.validEmail(toChangeAttrs[attr])){
							res.status(400).send({errorMessage : "This is not a valid email"})
							return
						}

						user[attr] = toChangeAttrs[attr];
					}
					//check for malicius use
					else if (attr === 'id' || attr === '_id') {
						console.log("User with email " + user.email + " and username " 
							+ user.username + " is trying to change his id.");
						res.status(400).send({errorMessage : "You can't change your id"})
						return
					}
				}

				if (!makeCheck){
					//save user
					user.save(function(req, user){
						if (err){
							console.log("Getting User Info  Error : ",e.message)
							res.status(500).send({errorMessage : err.message})
							return;
						}

						res.send({successMessage : "Changes Saved to User"});
					});
				}
				else
					UsersDB.findOne({ $or: [ { 'username': toChangeAttrs.username }, { 'email': toChangeAttrs.email } ] },function(err,otherUser){
					// if there are any errors, return the error
					if (err){
						res.status(500).send({errorMessage : err.message})
						return;
					}
					if (otherUser) {
						res.status(400).send({errorMessage : "We are sorry username or email you entered are taken"});
						return;
					}
					user.save(function(req, user){
						if (err){
							console.log("Getting User Info  Error : ",e.message)
							res.status(500).send({errorMessage : err.message})
							return;
						}

						res.send({successMessage : "Changes Saved to User"});
					});
			});

		});
	});


	app.route('/api/v1/user/device')
		
		/**
		*@api {post} /api/v1/user/device Adds a new device
		*@apiName AddDevice 
		*@apiGroup Device
		*
		*@apiParam {json} Device attributes
		*@apiParamExample {json} Request-Example:
		*    {
		*		mac 			: device_mac_address,
		*		name			: device_name,
		*		max_moist		: device_max_moisture,
		*		med_moist		: device_med_moisture,
		*		water_period	: watering_interval_to_days,
		*		data_period		: data_interval_to_minutes  		
		*	}
		*
		*@apiSuccess {String} successMessage Success message
		*@apiSuccessExample {json} Success-Response:
		*	  {id : new_device_id}
		*
		*@apiError 400 BAD REQUEST
		*@apiError 401 Authorization Failed
		*@apiError 500 Internal Server Error
		*@apiErrorExample {json} Error-Response:
		*     {errorMessage: ERROR_MESSAGE }
		*/
		.post(tools.authenticateUser, function(req,res){
			//first find user by id
			UsersDB.findById(req.user,function(err, user){
				if (err){
					console.log("Getting User Info  Error : ",e.message)
					res.status(500).send({errorMessage : err.message})
					return;
				}
				//check if mac_address exists
				DeviceDB.findOne({'mac_address':req.body.mac_address},function(err,dev){
					
					//check if device exists
					if (dev){
						res.status(400).send({errorMessage : "Device Already Exists"})
						return
					}
					var newDevice = new DeviceDB();
					newDevice.max_moist = 70;
					newDevice.med_moist = 50;
					newDevice.water_period = 1;
					newDevice.data_period = 5;
					for (var key in req.body)
						if (key === 'name')
							newDevice.name = req.body.name;
						else if (key === 'mac_address')
							newDevice.mac_address = req.body.mac_address.toUpperCase();
						else if (req.body.hasOwnProperty(key) && req.body[key]) 
							newDevice[key] = parseInt(req.body[key]);
					if (newDevice.max_moist <= newDevice.med_moist){
						res.status(400).send({errorMessage : "Wrong Values"})
						return;
					}
							

					newDevice.save(function(req, newDevice){
						if (err){
							console.log("Getting User Info  Error : ",e.message)
							res.status(500).send({errorMessage : err.message})
							return;
						}
						user.device_list.push({ "id" : newDevice._id, "name" : newDevice.name})
						user.save(function(req,user){
							if (err){
								console.log("Getting User Info  Error : ",e.message)
								res.status(500).send({errorMessage : err.message})
								return;
							}
							app.get('mqtt_client').publish('chocof', JSON.stringify(newDevice));
							res.send({ "id" : newDevice._id});
						})
					})
				})
			})
		})
	
	app.route('/api/v1/user/device/:device_id')
		
		/**
		*@api {get} /api/v1/user/device/:device_id Gets device with id=device_id information
		*@apiName DeviceInfo
		*@apiGroup Device
		*
		*
		*@apiSuccess {json} info Json object which contains user data
		*@apiSuccessExample {json} Success-Response:
		*	  {	reports 	: report_data,
		*		max_moist 	: device_max_moisture,
		*		med_moist 	: device_med_moisture,
		*		history   	: last_watering,
		*		data_period : watering_interval_to_days,
		*		water_period: data_interval_to_minutes}
		*
		*@apiError 400 BAD REQUEST
		*@apiError 401 Authorization Failed
		*@apiError 500 Internal Server Error
		*@apiErrorExample {json} Error-Response:
		*     {errorMessage: ERROR_MESSAGE }
		*/
		.get(tools.authenticateUser, function(req,res){

			dev_id = req.params.device_id;
			//find this device
			DeviceDB.findOne({'_id':dev_id},function(err,dev){
				if (!dev){
						res.status(404).send({errorMessage : "Device not found!"})
						return
				}
				ReportsDB.find({_id : { $in: dev.report_list}}).sort('-date').exec(function(err, reports){ 
					if (!reports){
						res.status(404).send({errorMessage : "Reports not found!"})
						return
					}
					toSend = {	reports : reports,
								max_moist : dev.max_moist,
								med_moist : dev.med_moist,
								history   : dev.history,
								data_period : dev.data_period,
								water_period : dev.water_period};
					res.send(toSend);
				});
			});
		})

		/**
		*@api {post} /api/v1/user/device/:device_id Edits device with id=device_id 
		*@apiName EditDevice 
		*@apiGroup Device
		*
		*@apiParam {json} Device attributes
		*@apiParamExample {json} Request-Example:
		*    {
		*		mac 			: device_mac_address,
		*		name			: device_name,
		*		max_moist		: device_max_moisture,
		*		med_moist		: device_med_moisture,
		*		water_period	: watering_interval_to_days,
		*		data_period		: data_interval_to_minutes  		
		*	}
		*
		*@apiSuccess {String} successMessage Success message
		*@apiSuccessExample {json} Success-Response:
		*	  {newDev : new_device_vars}
		*
		*@apiError 400 BAD REQUEST
		*@apiError 401 Authorization Failed
		*@apiError 500 Internal Server Error
		*@apiErrorExample {json} Error-Response:
		*     {errorMessage: ERROR_MESSAGE }
		*/
		.post(tools.authenticateUser, function(req,res){

			dev_id = req.params.device_id;
			//find this device
			DeviceDB.findOne({'_id':dev_id},function(err,dev){
				if (!dev){
						res.status(404).send({errorMessage : "Device not found!"})
						return
				}
				//add new data
				for (var key in req.body)
					if (req.body.hasOwnProperty(key) && req.body[key]) 
						dev[key] = parseInt(req.body[key]);

				if (dev.max_moist <= dev.med_moist){
						res.status(400).send({errorMessage : "Wrong Values"})
						return;
					}	
				//save device
				dev.save(function(err,saved_dev){
					if (err){
						res.status(500).send({errorMessage : err})
						return;
					}
					var mq_send = {}
					mq_send["med_moist"] = saved_dev["med_moist"]
					mq_send["mac_address"] = saved_dev["mac_address"]
					mq_send["max_moist"] = saved_dev["max_moist"]
					mq_send["water_period"] = saved_dev["water_period"]
					mq_send["data_period"] = saved_dev["data_period"]
					app.get('mqtt_client').publish('chocof', JSON.stringify(mq_send));
					res.send(saved_dev)
				})	

			});	
		});
	


	app.route('/api/v1/user/logout')
		/**
		*@api {get} /api/v1/user/logout Logs user out of the session
		*@apiName UserLogout
		*@apiGroup User
		*
		*
		*@apiSuccess {json} message Message with info
		*@apiSuccessExample {json} Success-Response:
		*	  {	message : SUCCESS_STRING}
		*
		*@apiError 400 BAD REQUEST
		*@apiError 401 Authorization Failed
		*@apiError 500 Internal Server Error
		*@apiErrorExample {json} Error-Response:
		*     {errorMessage: ERROR_MESSAGE }
		*/	
		.get(function(req,res){
				req.logout();
				console.log("User logged out");
				res.send({message : "User successfully logged out"})
				return
		})
}
