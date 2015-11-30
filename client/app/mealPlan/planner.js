angular.module('LetsCook.planner', ['ui.bootstrap'])

.controller('PlannerController', function ($scope, Planner) {
  $scope.data = {};
  $scope.plans = [];
  $scope.plans.plan = {
    meals: [],
    nutrients: {}
  };
  $scope.loaded = false;
  $scope.dbLoaded = false;
  $scope.dbSaved = false;

  $scope.getPlan = function () {
    Planner.getPlan($scope, $scope.data.calories).then(function (plan) {
      var meals = [];
      plan.meals.forEach(function (meal) {
        var url = (meal.image).slice(0, -4);
        meals.push({
          id: meal.id,
          title: meal.title,
          image: 'https://spoonacular.com/recipeImages/'+meal.image,
          url: 'https://spoonacular.com/recipes/'+url
        });
      });
      var plan = {
        nutrients: plan.nutrients,
        meals: meals
      };
      $scope.plans.push(plan);
      $scope.loaded = true;
    })
    .catch(function (err) {
      console.error(err);
    });
  };
  $scope.savePlanToDB = function () {
    Planner.savePlanToDB($scope, $scope.plans[0]).then(function (resp) {
      $scope.dbSaved = true;
    })
    .catch(function (err) {
      console.error(err);
    });
  };
  $scope.getPlansFromDB = function () {
    Planner.getPlansFromDB($scope).then(function (recipes) {
      recipes.forEach(function (recipe) {
        var temp = {
          nutrients: recipe.plan.nutrients,
          meals: recipe.plan.meals
        };
        $scope.plans.push(temp);
      });
      $scope.paginate();
      $scope.loaded = true;
    })
    .catch(function (err) {
      console.error(err);
    });
  };
  /// PAGINATION ==========================================
  $scope.itemsPerPage = 5
  $scope.currentPage = 1;

  $scope.paginate = function () {
    $scope.totalItems = $scope.plans.length;
    $scope.$watch('currentPage + itemsPerPage', function() {
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.filteredPlans = $scope.plans.slice(begin, end);
    
      var counter = $scope.plans.length / $scope.itemsPerPage;
      if ($scope.currentPage <= counter) {
        $scope.showing = $scope.itemsPerPage*$scope.currentPage;
      } else {
        $scope.showing = $scope.plans.length;
      }
    });
  };
});