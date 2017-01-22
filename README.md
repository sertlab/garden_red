# gardenRed

AUTHORS
-------
[chocof](https://github.com/chocof)


Description
-------
gardenRed is a project developed for an assignment at University of Thessaly. 
It uses sensors to monitor and water the plants while it also communicates 
with the website via MQTT sending plant data and waiting for options. 
This repo includes the website source code as well as a Node-Red script 
for wiring the different components 

Running gardenRed
========


SERVERS
-------

Make sure you've downloaded NodeJs as well as npm and bower package manager
You can find these here: 

1. [NODEJS](https://nodejs.org/),

2. [Npm](https://github.com/npm/npm)

3. [Bower](http://bower.io/)

1. Get The Files (clone the directory). 
2. In order to run a server move to the appropriate folder and type:
  
  sudo npm install
  
  sudo npm -g bower install(Optional. Install bower globally)
  
  bower install (When asked for angular version choose >1.4.8)

3. After You Install the dependencies run *node index.js* 
in order to start the server

NODE-RED SCRIPT
--------

You have to download [Node-Red](https://nodered.org/) in order to execute the nr_script.json.
sudo npm install -g --unsafe-perm node-red

You have to also include the other dependencies from the modules used.
In order to start the Node Red server type : sudo node-red
Then import the script using NodeReds' toolbar.

WIRING
------

I used the CM5000 TelosB sensor in order to gather data from plants. The root node
was connected with an Raspberry Pi. Raspberry sends instruction to water the plants
to an actuator, made with an Arduino, and communicates via MQTT with the website.
NodeRed is executed on the Raspberrry Pi node.


HEROKU LINKS
------
GardenRed 		: https://gardenred.herokuapp.com/

