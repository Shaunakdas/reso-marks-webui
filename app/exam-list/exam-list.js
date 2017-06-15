'use strict';

angular.module('myApp.exam-list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/exam-list', {
    templateUrl: 'exam-list/exam-list.html',
    controller: 'ExamListCtrl'
  });
}])

.controller('ExamListCtrl', ['$scope','$http','userService','$location',function($scope,$http,userService,$location) {
	$scope.exam_list = userService.getExamList();
	$scope.getExamAnalysis = function(data){
		console.log(data);
		var rootApi = userService.getRootApi();
		var one = $http.get(rootApi+'api/analytics/get_analytics?rollno='+userService.getRollNo()+'&exam_id='+data)
        .success(function(data, status, headers, config) {
          // $scope.details = data
          userService.setResponse(data);
          openAnalysis();
        })
        .error(function(data, status, headers, config) {
	          // log error
	    });

	}
	

    function openAnalysis(){
    	$location.path('/view1');
    }
    
}]);