
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
  var getFromDB = function ($scope) {
    return $http({
      method: 'GET',
      url: 'http://127.0.0.1:3000',
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getAnswer: getAnswer,
    getFromDB: getFromDB
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
  return {
    getPlan: getPlan
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
  // var saveRecipe = function ($scope, recipe) {
  //   return $http({
  //     method: 'GET',
  //     url: '/api/buildPlan',
  //   })
  //   .then(function (resp));
  // };
  return {
    extractRecipe: extractRecipe
    // saveRecipe: saveRecipe
  }
});













