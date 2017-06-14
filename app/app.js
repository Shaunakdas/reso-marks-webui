'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
   'ngAnimate',
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
   'ngAria',
   'ngMaterial',
  'chart.js',
   'ngMessages'
]).run(['$rootScope','$http',function($rootScope, $http) {
  $rootScope.base_url_api = "http://localhost:3000/"
}]).service('userService', function(){
	this.setResponse = function(data) {
	        this.responseData = data;
	};
	this.getResponse = function() {
	        return this.responseData;
	};
}).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
