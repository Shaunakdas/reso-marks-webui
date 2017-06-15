'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
   'ngAnimate',
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.exam-list',
  'myApp.version',
   'ngAria',
   'ngMaterial',
  'chart.js',
   'ngMessages'
]).run(['$rootScope','$http',function($rootScope, $http) {
  $rootScope.base_url_api = "http://localhost:3000/"
}]).service('userService', function(){
  this.getRootApi = function(){
    return 'https://9cb8477c.ngrok.io/';
  }
  this.setRollno = function(data) {
          this.rollnumber = data;
  };
  this.getRollNo = function() {
          return this.rollnumber;
  };
	this.setResponse = function(data) {
	        this.responseData = data;
	};
	this.getResponse = function() {
	        return this.responseData;
	};
  this.setExamList = function(data){
          this.exam_list = data
  };
  this.getExamList = function(){
          return this.exam_list;
  };
  
}).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.
    when('#!/view1', {
            template: '<view1></view1>'
          }).
    when('#!/view2', {
            template: '<view2></view2>'
          }).
    when('#!/exam-list', {
            template: '<exam-list></exam-list>'
          }).
    otherwise({redirectTo: '/view2'});
}]);
