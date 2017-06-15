'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$window','$scope','$http','userService', function ($window,$scope, $http, userService) {
      $scope.card_size = ($window.innerWidth < 650)? 'small':'large';
      $scope.details = userService.getResponse();
      initAnalyticsCall();
      function initAnalyticsCall(){
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
          $scope.weakFilter = function(data,score){
              console.log("weak filter"+ (score <= 0.25));
              return score <= 0.25;
          };
          // $scope.disabled1 =18;
          $scope.readonly =true;
          $scope.responseType = function(data){
            if (data==1){return "Incorrect";}
            else if (data==0){return "Correct";}
            else if (data==2){return "Unattempted";}
          }
          $scope.productSlider = function(data){
            return 100*data;
          }
          $scope.checkOldExam = true;
          if($scope.details.old_weak_to_normal){
            console.log();
            $scope.checkOldExam = true;
          }
          $scope.sizeName= function(){

          }
          // $scope.$apply();
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


