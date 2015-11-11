angular.module('LetsCook.planner', [])

.controller('PlannerController', function ($scope, Planner, Recipes) {
  $scope.data = {};
  $scope.plan = [];
  $scope.loaded = false;
  $scope.timeFrames = ['day', 'week'];

  $scope.getPlan = function () {
    Planner.getPlan($scope, $scope.data.calories, $scope.data.timeFrame).then(function (plan) {
      // $scope.plan = plan;
      plan.meals.forEach(function (meal) {
        Recipes.getRecipe($scope, meal.id).then(function (summary){
          $scope.plan.push(summary);
          $scope.loaded = true;
        })
        .catch(function (err){
          console.error(err);
        });
      })
    })
    .catch(function (err) {
      console.error(err);
    });
  };
  $scope.savePlanToDB = function () {
    Planner.savePlanToDB($scope, $scope.plan).then(function (resp) {
      $scope.DBResponse = resp;
    })
    .catch(function (err) {
      console.error(err);
    });
  };
  $scope.getPlansFromDB = function () {
    Planner.getPlansFromDB($scope).then(function (recipes) {
      $scope.DBResult = recipes;
    })
    .catch(function (err) {
      console.error(err);
    });
  };
});