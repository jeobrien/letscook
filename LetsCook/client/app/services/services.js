
angular.module('LetsCook.services', [])

.factory('Recipes', function ($http) {
  var getRecipes = function ($scope, cuisine, diet, exclude, intolerances, query, type) {
    return $http({
      method: 'GET',
      url: 'https://webknox-recipes.p.mashape.com/recipes/search?cuisine='+encodeURIComponent(cuisine).replace(/%20/g, "+")+'&diet='+encodeURIComponent(diet).replace(/%20/g, "+")+'&excludeIngredients='+encodeURIComponent(exclude).replace(/%20/g, "+")+'&intolerances='+encodeURIComponent(intolerances).replace(/%20/g, "+")+'&number=5&offset=0&query='+encodeURIComponent(query).replace(/%20/g, "+")+'&type='+encodeURIComponent(type).replace(/%20/g, "+")
    })
    .then(function (resp) {
      return resp.data.results;
    });
  };
    var getRecipe = function ($scope, id) {
      return $http({
        method: 'GET',
        url: 'https://webknox-recipes.p.mashape.com/recipes/'+id+'/information'
      })
      .then(function (resp) {
        return resp.data;
      });
    };
  return {
    getRecipes: getRecipes,
    getRecipe: getRecipe
  };

})
.factory('Question', function ($http) {
  var getAnswer = function ($scope, question) {
    return $http({
      method: 'GET',
      url: 'https://webknox-recipes.p.mashape.com/recipes/quickAnswer?q='+encodeURIComponent(question).replace(/%20/g, "+")
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getAnswer: getAnswer
  };
})
.factory('Planner', function ($http) {
  var getPlan = function ($scope, calories, time) {
    return $http({
      method: 'GET',
      url: 'https://webknox-recipes.p.mashape.com/recipes/mealplans/generate?targetCalories='+calories+'&timeFrame='+time
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  var getPlansFromDB = function ($scope) {
    return $http({
      method: 'GET',
      url: '/api/plans',
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  var savePlanToDB = function ($scope, plan) {
    return $http({
      method: 'POST',
      url: '/api/plans',
      data: plan
    })
    .then(function (resp) {
      return resp;
    });
  };
  return {
    getPlan: getPlan,
    getPlansFromDB: getPlansFromDB,
    savePlanToDB: savePlanToDB
  };
})
.factory('Builder', function ($http) {
  var extractRecipe = function ($scope, url) {
    return $http({
      method: 'GET',
      url: 'https://webknox-recipes.p.mashape.com/recipes/extract?forceExtraction=false&url='+encodeURIComponent(url).replace(/%20/g, "+")
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  return {
    extractRecipe: extractRecipe
  }
});













