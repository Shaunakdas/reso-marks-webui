'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$http','userService', function ($scope, $http, userService) {
    var one = $http.get('https://ff61d493.ngrok.io/api/analytics/get_analytics?rollno=16437970&exam_id=1')
        .success(function(data, status, headers, config) {
          // $scope.details = data
          userService.setResponse(data);
          $scope.details = userService.getResponse();
          initCall();
        })
        .error(function(data, status, headers, config) {
          // log error
    });
        function initCall(){
          console.log($scope.details);
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
          var starts_zero = {
            ticks: {
                beginAtZero:true
            }
        };
          // Difficulty Breakup Graph section
        $scope.difficulty_colors = ['#f44242', '#42f4f1', '#40E0D0'];
        $scope.difficulty_labels = $scope.details.difficulty_breakup.name;
        $scope.difficulty_series = ['Total', 'Correct'];
        $scope.difficulty_data = [
          $scope.details.difficulty_breakup.user,
          $scope.details.difficulty_breakup.exam
        ]; 
        
        $scope.difficulty_options = {
          scales: {
              xAxes: [starts_zero],
              yAxes: [starts_zero]
          }
        };
        $scope.difficulty_datasetOverride = {
          label: '# of Votes'
        } 
        $scope.relAnalysisInfoTitle = "More about Difficulty Analysis";
        $scope.relAnalysisInfoContent = "In this section, you can see analysis of your attempt based on different difficulty levels. With respect to each level of difficulty, you can see total questions in the paper and number of questions correctly attempted by you.";
        
        // Relative Breakup Graph section
        $scope.relative_colors = ['#f44242', '#42f4f1', '#40E0D0'];
        $scope.relative_labels = $scope.details.relative_user_score.name;
        $scope.relative_series = ['Total', 'Correct'];
        $scope.relative_data = [
          $scope.details.relative_user_score.user_score,
          $scope.details.relative_user_score.average_score
        ]; 
        
        $scope.relative_options = {
          scales: {
              xAxes: [starts_zero],
              yAxes: [starts_zero]
          }
        };
        $scope.relative_datasetOverride = {
          label: '# of Votes'
        }
        }
        
        

}]);


