/////////////////////////////////////////////////////////////
//////////AUTHORS :   chocof (https://github.com/chocof)/////
//////////File    :  index.js                       /////////
/////////////////////////////////////////////////////////////

///MACROS///
var TIMEOUT_MS = 30000;

// Load Tools----------
var express  = require('express');
var app = express();
var port     = process.env.PORT || 9000;
var ws_port     = process.env.PORT + 1;

var WebSocketServer = require('ws').Server
	,wss = new WebSocketServer({ port: ws_port });

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
app.use(morgan('dev'));
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//for publishing mqtt info
var mqtt = require('mqtt');
//subscribe to sensor channel
var mqtt_client  = mqtt.connect('mqtt://test.mosquitto.org')
var mqtt_channel = 'chocof'
mqtt_client.on('connect', function () {
	console.log("[+]Connected to mqtt broker @ port 1883")
  	mqtt_client.subscribe(mqtt_channel)
})
app.set('mqtt_client', mqtt_client);
app.set('mqtt_channel', mqtt_channel);

//documentation folder
app.use(express.static(__dirname +'/doc'));
//our folders to be used by the frontend
app.use(express.static(__dirname +'/public'));
//for frontend dependencies
app.use(express.static(__dirname +'/bower_components'));



var engines = require('consolidate');

//view engines
//app.engine('jade',engines.jade);
app.engine('jade',require('jade').__express);


//options for database
var db_options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: TIMEOUT_MS } },
		replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : TIMEOUT_MS } } 
	};

//configuration settings for passport
var configSession   = require('./config/session.js')
var flash           = require('connect-flash');
var passport        = require('passport');
var session         = require('express-session');


//load my tools
var tools = require('./config/tools.js')


//init passport stuff
app.use(session({
	secret: configSession.secret,
	name: configSession.name,
	proxy: true,
	resave: true,
	saveUninitialized: true
}));
app.use(flash()); 



require('./config/passportConfig')(passport, tools); //We need to create passport file for configuration 
app.use(passport.initialize());
app.use(passport.session()); 


//DATABASE STUFF
// I used my mongolab account to host a database you can create your own in mongolab.com(hooray for this)

//the bellow file contains username and password and it's not going to be uploaded...yet
//the general form is 
//'mongodb://<DBuserName>:<DBpassword>@ds<DB_ID>.mongolab.com:<DB_ID>/mysearchdb'
var privateData = require('./config/privateData.js')


//Config Database Stuff
var uriUtil = require('mongodb-uri');
var mongoose = require('mongoose');
var mongodbUri = privateData.url;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
mongoose.connect(mongooseUri, db_options);
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:')); //check errors



//--------------------HTTP CONNECTION--------------------//

//start server
conn.once('open', function() {

	
	//create https server
	app.listen(port);
	
	require('./app/api/gardenAPI.js')(app,passport,tools,privateData);
	require('./app/router/router.js')(app);

	require('./app/api/webSocketsCom.js')(wss, app);
	

	console.log('[+]GardenRed Server Running @ port : ' + port);
	console.log('[+]GardenRed Websocket Service Running @ port : ' + ws_port);
   

})


