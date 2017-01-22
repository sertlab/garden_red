/////////////////////////////////////////////////////////////
//////////AUTHORS :   chocof (https://github.com/chocof)/////
//////////File :  app/api/device.js 		        /////////
/////////////////////////////////////////////////////////////


//Basic Request Model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var dev = mongoose.Schema({
	mac_address  : String,
	name		 : String,
	report_list  : [],
	history		 : Date,
	max_moist 	 : Number,
	med_moist	 : Number,
	water_period : Number,
	data_period : Number
});


module.exports = mongoose.model('Device', dev);