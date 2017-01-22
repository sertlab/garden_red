angular.module('gardenRed')
.factory('userInfo', ["$http", function($http){
   

    return  {
        getInfo : function (){
          return $http.get("/api/v1/user"); 
    	},

      getGraphData : function (device_id){
          return $http.get("/api/v1/user/device/" + device_id); 
      },
    	
      editInfo : function (objectToEdit){
          return $http.post("/api/v1/user", objectToEdit); 
    	},

      addDevice : function(device){
        return $http.post("/api/v1/user/device", device);
      },

      editDevice : function(toEdit){
        return $http.post("/api/v1/user/device/" + toEdit.id, toEdit.edit);
      },

      logout : function(){
			  return $http.get("/api/v1/user/logout");
		  },

      checkIfLoggedIn : function (){
          return $http.get("/api/v1/user"); 
      },

  }
    
}]);
