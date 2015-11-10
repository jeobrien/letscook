angular.module('LetsCook.planner', [])

.controller('PlannerController', function ($scope, Planner) {
  $scope.data = {};
  $scope.plan = [];
  $scope.timeFrames = ['day', 'week'];

  $scope.getPlan = function () {
    Planner.getPlan($scope, $scope.data.calories, $scope.data.timeFrame).then(function (plan) {
      $scope.plan = plan;
    })
    .catch(function (err) {
      console.error(err);
    });
  };
});