angular.module('LetsCook.planner', [])

.controller('PlannerController', function ($scope, Planner, Recipes) {
  $scope.data = {};
  $scope.plan = [];
  $scope.loaded = false;
  $scope.dbLoaded = false;
  $scope.dbSaved = false;

  $scope.timeFrames = ['day', 'week'];

  $scope.getPlan = function () {
    Planner.getPlan($scope, $scope.data.calories, $scope.data.timeFrame).then(function (plan) {
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
    $scope.plan.forEach(function (meal) {
      Planner.savePlanToDB($scope, meal).then(function (resp) {
        $scope.DBResponse = resp;
        $scope.dbSaved = true;
      })
      .catch(function (err) {
        console.error(err);
      });
    });
  };
  $scope.getPlansFromDB = function () {
    Planner.getPlansFromDB($scope).then(function (recipes) {
      $scope.DBResult = recipes;
      $scope.dbLoaded = true;
    })
    .catch(function (err) {
      console.error(err);
    });
  };
});