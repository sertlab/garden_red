/////////////////////////////////////////////////////////////
//////////AUTHORS :   chocof (https://github.com/chocof)/////
//////////File :  public/js/app/userApp.js          /////////
/////////////////////////////////////////////////////////////

const DB_SERVER_URL   = "http://localhost:8500"

/*!
  Basic module for the frontend
*/
var GardenRed = angular.module('gardenRed', ['ui.bootstrap','ui.router','ngResource','ngCookies']);

//This solution does not belong to me. It has been written
//by Deividi Cavarzan in a solution he gave to Stack Overflow
//http://stackoverflow.com/questions/17982868/angularjs-best-practice-for-ensure-user-is-logged-in-or-out-using-cookiestore
GardenRed.factory('Auth', ['$cookieStore', function ($cookieStore) {
        var _user = {};
        return {
            user : _user,
            set: function (_user) {
                // you can retrive a user setted from another page, like login sucessful page.
                existing_cookie_user = $cookieStore.get('current.user');
                _user =  _user || existing_cookie_user;
                $cookieStore.put('current.user', _user);
            },
            remove: function () {
                $cookieStore.remove('current.user', _user);
            }
        };
    }])


GardenRed.run(['Auth', 'userInfo', function run(Auth, userInfo) {
            var _user = userInfo.checkIfLoggedIn();
            Auth.set(_user);
        }])
//Copy pasting Ends here



GardenRed
.config(['$stateProvider', '$urlRouterProvider','$locationProvider','$httpProvider', 
  function ($stateProvider,   $urlRouterProvider, $locationProvider,$httpProvider) {
        
        $urlRouterProvider.otherwise('/');
        
        //Interceptors used to route user accordingly
        $httpProvider.interceptors.push(function($q,$location,$cookieStore) {
            return {
                request: function(config){ return config; },
                response: function(response) {  
                  if (response.status === 401){
                      $window.location.href = '/';
                      return $q.reject(response);
                  }
                  else
                    return $q.resolve(response);                  
              }
            };
        });
    
//Configuration and routing for states
        $stateProvider 
        
            //public login/signup forms
            .state('site',{
              url : '/',
              templateUrl : 'home',
              controller : 'homeCtrl'
            })


            //---------private states---------
            //user profile
            .state('menu',{
              url : '/user',
              templateUrl : 'profile',
              controller : 'userCtrl'
            })

            //user info
            .state('menu.info',{
              url : '/info',
              templateUrl : 'info'
           
            })

            //edit info
            .state('menu.edit',{
              url : '/edit',
              templateUrl : 'edit'
            })


            //Statistics
            .state('menu.devices',{
              url : '/devices',
              templateUrl : 'devices'
            })

           

            //Contact 
            .state('menu.contact',{
              url : '/contact',
              templateUrl : 'contact'
            })

        
        $locationProvider.html5Mode(true);
        
}]);


