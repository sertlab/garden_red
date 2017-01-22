/*!
	controller to handle user signup and login
*/
angular.module('gardenRed')
	.controller('homeCtrl',['$scope','loginSrvc','signupSrvc', '$state','$window', 
		function($scope, loginSrvc, signupSrvc, $state,$window){
	
		$scope.registerBool = false;
		

		//login user in function
		$scope.login = function(){


			loginSrvc.login($scope.usernameLog,$scope.passwordLog)
				.then(
			        function(resp){
			           	$state.go("menu")
			        },
			        function(err){
						$scope.passwordLog = ""
			        	notie.alert('error',"Username or password is wrong",1);
			        	
			        }
			    )
  		}

  		
  		$scope.signup = function(){

  			//check if passwords are the same
  			if ($scope.password === $scope.passwordRep && $scope.password.length >= 6  && $scope.username.length >= 3){
  			
  				

				signupSrvc.signup($scope.username, $scope.email, $scope.password, $scope.name, $scope.surname, $scope.age)
					.then(
				        function(resp){
				        	$state.go("menu")
				        },
				        function(err){
				        	notie.alert('error',"Couldn't register user. Check your data and try again",1);
				      		$scope.passwordRep = "";
							$scope.password    = "";
				        }
				    )
			}else {
				
				if ($scope.password.length < 6)
				    notie.alert('error',"Password must be more than 6 characters",1);
			 	else if ($scope.username.length < 3)
				    notie.alert('error',"Username must be more than 3 characters",1);
			 	else
				    notie.alert('error',"Passwords don't match",1);
				$scope.passwordRep = "";
				$scope.password    = "";
			 	}
  		}

  		
  		$scope.register = function (){
        	$scope.registerBool = !$scope.registerBool;
    	};

  		
}])