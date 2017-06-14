'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$http','userService', function ($scope, $http, userService) {
    $http.get('http://localhost:3000/api/analytics/get_analytics?rollno=16437970&exam_id=1')
        .success(function(data, status, headers, config) {
          // $scope.details = data
          userService.setResponse(data);
          $scope.details = userService.getResponse();
        })
        .error(function(data, status, headers, config) {
          // log error
    });

        $scope.diffAnalysisInfoTitle = "More about Difficulty Analysis";
        $scope.diffAnalysisInfoContent = "In this section, you can see analysis of your attempt based on different difficulty levels. With respect to each level of difficulty, you can see total questions in the paper and number of questions correctly attempted by you.";
        $scope.showDialogInfo = function(ev,title,content) {
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title(title)
                .textContent(content)
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );

          };
          // Difficulty Breakup Graph section
        $scope.colors = ['#f44242', '#42f4f1', '#40E0D0'];
        $scope.labels = ['Total', 'Easy', 'Medium', 'Tough'];
        $scope.series = ['Total', 'Correct'];
        $scope.data = [
          [20, 10, 5, 5],
          [10, 4, 2, 3]
        ]; 
        var starts_zero = {
            ticks: {
                beginAtZero:true
            }
        };
        $scope.difficulty_options = {
          scales: {
              xAxes: [starts_zero],
              yAxes: [starts_zero]
          }
        };
        $scope.datasetOverride = {
          label: '# of Votes'
        }

}]);


