//for publishing mqtt info
var mqtt = require('mqtt');
//subscribe to sensor channel
var mqtt_client  = mqtt.connect('mqtt://test.mosquitto.org')
var mqtt_channel = 'chocof'
mqtt_client.on('connect', function () {
	mqtt_client.subscribe(mqtt_channel)
})
module.exports = {client : mqtt_client, channel : mqtt_channel};