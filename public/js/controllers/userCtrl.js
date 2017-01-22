angular.module('gardenRed')
.controller('userCtrl',['$scope','userInfo','$state', '$window',"Auth",
	function($scope, userInfo, $state,$window,Auth){
		$scope.temp_graph = {};
		$scope.moist_graph = {};
		var dateGraphConf = {
			axis : {
				x : {
					type:"timeseries",
					tick: {
						format:"%d/%m/%y %H:%M:%S",
						fit : true,
						culling: {
							max: 4 
						},
						max : 5
					},
					label: "Date"    
				},
				y : {
					label: {
						position : "outer-middle"
					},
					 tick: {
						format: d3.format('.2f')
					}
				}
			},
			grid :{
				x: {
					show : true
				},
				y :{
					show : true
				}
			},
			data : {
				xFormat: '%Y-%m-%d %H:%M:%S',
				keys : {
					x : 'date'
				}
			},
			//for our legend
			legend : {
				position : "right",
				inset: {
					anchor: 'top-left',
					x: 20,
					y: 10,
					step: 3
				}
			},
			//enable zoom
			zoom : {
				enabled : true,
				rescale : true
			}

		}
		$scope.addDeviceFlag = false;
		$scope.status = {
			isopen: false
		};
		$scope.toggleDropdown = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.status.isopen = !$scope.status.isopen;
		};
		$scope.device_list_names = [];
		$scope.device_list = [];
		$scope.isCollapsed = true;
		$scope.deviceSelect = false;
		$scope.editDevBool = false;
		$scope.dev_id = null;
		$scope.deviceResults = {};
		$scope.thisState = "";
		$scope.edit 	 = {};
		$scope.edit_dev	 = {};
		$scope.device 	 = {};
		
		//Inits user info
		$scope.__init__ = function(){
			$scope.user= {}
			userInfo.getInfo()
				.success(function(resp){
					//Preview User Data
					if (resp.info)
						$scope.user = resp.info;
					else return;
					
					$scope.device_list = resp.device_list
					for (var i=0; i < resp.device_list.length; i++)
						$scope.device_list_names.push(resp.device_list[i].name);

					if ($scope.thisState === '')
						$state.go('menu.info')
					
				})
				.error(function(err){
					
					$state.go('site')
				 })

		}

		$scope.reset_sel = function(){
			$scope.deviceSelect = false;
			$scope.editDevBool = false;
			$scope.deviceResults = {};
		}

		$scope.getDeviceStats = function(selDev){
			for (var i = 0; i < $scope.device_list.length; i++)
				if (selDev == $scope.device_list[i].name){
					selDev_id = $scope.device_list[i].id;
					break
				}
			userInfo.getGraphData(selDev_id)
				.success(function(res){
					reports = res.reports
					$scope.deviceResults = res
					console.log($scope.deviceResults)
					$scope.deviceSelect = selDev;
					$scope.dev_id = selDev_id;
					
					for (var i = 0; i < reports.length; i++)
						reports[i].date = new Date(reports[i].date)
					temp_obj = {};
					moist_obj = {};
					copyObject(dateGraphConf, temp_obj);
					copyObject(dateGraphConf, moist_obj);
					
					temp_obj.data.json = reports;
					temp_obj.data.keys.value = ['temp'];
					temp_obj.axis.y.label.text = "Temperature (C)";
					temp_obj.bindto = "#tempGraph"
					$scope.temp_graph = c3.generate(temp_obj)

					moist_obj.data.json = reports;
					moist_obj.data.keys.value = ['moist'];
					moist_obj.axis.y.label.text = "Moisture %";
					moist_obj.bindto = "#moistGraph"
					$scope.moist_graph = c3.generate(moist_obj)
					
				})
				.error(function(err){
					notie.alert("warning","It appears that this sensor doesn't have any data", 1);
				})
		}

		$scope.showDeviceForm = function(){
			$scope.addDeviceFlag = !$scope.addDeviceFlag
		}
		//Sets current state. Useful for info management
		$scope.setState = function(state){
			$scope.thisState = state;	
			if (state == 'devices'){
				$scope.deviceSelect = false;
				$scope.deviceResults = {};
			}
		}
		

		$scope.editDevice = function(){
			userInfo.editDevice({id : $scope.dev_id, edit : $scope.edit_dev})
				.success(function(resp){
					$scope.editDevBool = false;
					notie.alert(1, "Device Was Successfully Edited", 1.5);
				})
				.error(function(err){
					notie.alert(2, err, 1.5);
					
				})
		}

		$scope.addDevice = function(){
			//test mac address
			var regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
			if (!($scope.device.name && $scope.device.mac_address && regex.test($scope.device.mac_address))){
				notie.alert('error',"Couldn't add new device. Check your data and try again",1);
				return	
			}

			if($scope.device_list_names.indexOf($scope.device.name)!=-1){
				notie.alert('error',"Device Name already exists",1)
				return
			}
			userInfo.addDevice($scope.device)
				.success(function(resp){

					$scope.addDeviceFlag = !$scope.addDeviceFlag;
					//to avoid refresh
					$scope.device_list.push({name : $scope.device.name, id : resp.id})
					$scope.device_list_names.push($scope.device.name)
					notie.alert(1, "New Device Was Added", 1.5);
					return;
				})			
				.error(function(err){
						mqtt_client.subscribe(mqtt_channel)
  						mqtt_client.publish(mqtt_channel,"hi")
					notie.alert('error',"Check your values and try again.",1)
					return;
				})
		}


		//Edits user info
		$scope.editInfo = function(){
			if ($scope.edit.password != $scope.edit.passwordRep){
				notie.alert(2, "Passwords don't match try again", 1.5);
				return;
			}
			var changes = $scope.edit;    

			userInfo.editInfo(changes)
				.success(function(resp){
					copyObject(changes, $scope.user);
					notie.alert(1, "Your data was succesfully edited", 1.5);
					$scope.edit = {}; 
					$state.go('menu.info')
				})
				.error(function(err){
					notie.alert(2, "Check your data and try again", 1.5);
					$scope.edit.password 	= ""
					$scope.edit.passwordRep = ""
				 })

		}



		//Logs user out
		$scope.logout = function(){
			// notie.confirm('Are you sure you want to do that?', 'Yes', 'Cancel', function() {
				// notie.alert(1, 'See you soon!', 2);

				userInfo.logout()
					.success(function(resp){
						Auth.remove();
						$state.go('site')
					})
					.error(function(err){
						// notie.alert(3, err.errorMessage, 2.5);
						return;
					})
				// });
		}

}]);


//used to copy newly edited user info to display correctly
function copyObject(objA, objB){

	for (attr in objA){
		if (objA[attr])
			objB[attr] = objA[attr]
	}

}
