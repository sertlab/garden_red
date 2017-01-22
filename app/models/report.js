/////////////////////////////////////////////////////////////
//////////AUTHORS :   chocof (https://github.com/chocof)/////
//////////File :  app/models/report.js 		    /////////
/////////////////////////////////////////////////////////////

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var dev_rep = mongoose.Schema({
	date		: Date,
	temp		: Number,
	moist		: Number
});


module.exports = mongoose.model('DeviceReport', dev_rep);