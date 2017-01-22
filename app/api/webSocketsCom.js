
/////////////////////////////////////////////////////////////
//////////AUTHORS :   chocof (https://github.com/chocof)/////
//////////File :  app/api/webSocketsCom.js             /////////
/////////////////////////////////////////////////////////////

var DeviceDB 	= require('../models/device');        					///MSA User's Model
var ReportsDB 	= require('../models/report'); 

module.exports = function(wss, app) {

	//set function for receiving data form sensors
	wss.on('connection', function connection(ws) {
		ws.on('message', function incoming(message) {
			//convert to json
			mess_obj = JSON.parse(message)
			try {
				//find device
				DeviceDB.findOne({'mac_address': mess_obj.mac.toUpperCase()},function(err,dev){
					//check if this device exists
					if (!dev){
						console.log("User tried to add data for non existing device : "  + mess_obj.mac);
						return;
					}
					//if plant was watered
					if (mess_obj.watered){
						dev.history = (new Date());
						dev.save(function(err, dev){
							if (err){
								console.log("Error saving device history : ",err.message)
								return;
							}
							return;

						});
					}else{ 
						new_rep = ReportsDB({ date : new Date(),
												  temp : Math.round(mess_obj.temp * 100)/100,
												  moist : Math.round(mess_obj.moist * 100)/100});
						//save new report object
						new_rep.save(function(err, rep){
							if (err){
								console.log("Error saving new Report: ",err.message)
								return;
							}
							//add new report in list	
							dev.report_list.push(rep._id)

							dev.save(function(err, dev){
								if (err)
									console.log("Error while adding report in Device: ",err.message)
								if (mess_obj.need_conf){
									var mq_send = {}
									mq_send["med_moist"] = dev["med_moist"]
									mq_send["mac_address"] = dev["mac_address"]
									mq_send["max_moist"] = dev["max_moist"]
									mq_send["water_period"] = dev["water_period"]
									mq_send["data_period"] = dev["data_period"]
									app.get('mqtt_client').publish('chocof', JSON.stringify(mq_send));
								}
								return
							});

						});
					}
				});
			}	
			catch(err){
				console.log("Websocket error : " + err);
				return;
			}		
		});
	});

}
