angular.module('LetsCook.planner', [])

.controller('PlannerController', function ($scope, Planner, Recipes) {
  $scope.data = {};
  $scope.plan = {
    meals: [],
    nutrients: {}
  };
  $scope.loaded = false;
  $scope.dbLoaded = false;
  $scope.dbSaved = false;

  $scope.getPlan = function () {
    Planner.getPlan($scope, $scope.data.calories).then(function (plan) {
      $scope.plan.nutrients = plan.nutrients;
      plan.meals.forEach(function (meal) {
        var url = (meal.image).slice(0, -4);
        $scope.plan.meals.push({
          id: meal.id,
          title: meal.title,
          image: 'https://spoonacular.com/recipeImages/'+meal.image,
          url: 'https://spoonacular.com/recipes/'+url
        });
      });
      $scope.loaded = true;
    })
    .catch(function (err) {
      console.error(err);
    });
  };
  $scope.savePlanToDB = function () {
    Planner.savePlanToDB($scope, $scope.plan).then(function (resp) {
      $scope.DBResponse = resp;
      $scope.dbSaved = true;
    })
    .catch(function (err) {
      console.error(err);
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