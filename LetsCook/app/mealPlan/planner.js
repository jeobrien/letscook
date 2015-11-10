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
});