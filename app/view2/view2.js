'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','$http','userService','$location',function($scope,$http,userService,$location) {
	$scope.getCall=false;
	$scope.getExamList = function(){
		// $scope.$apply(function(){
		// 	$scope.getCall=true;
  //       });
		$scope.getCall=true;
		userService.setRollno($scope.rollno);
		var rootApi = userService.getRootApi();
		var one = $http.get(rootApi+'api/analytics/get_exam_list?rollno='+$scope.rollno)
	        .success(function(data, status, headers, config) {
	          // $scope.details = data
	          userService.setExamList(data);
	          populateExamList();
	        })
	        .error(function(data, status, headers, config) {
	          // log error
	    });
    }

    function populateExamList(){
    	$location.path('/exam-list');
    };
        
}]);