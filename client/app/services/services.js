
angular.module('LetsCook.services', [])

.factory('Recipes', function ($http) {
  var getRecipes = function ($scope, cuisine, diet, exclude, intolerances, query, type) {
    return $http({
      method: 'GET',
      url: '/recipes',
      params: {
        cuisine: cuisine,
        diet: diet,
        exclude: exclude,
        intolerances: intolerances,
        query: query,
        type: type
      }
    })
    .then(function (resp) {
      return resp.data.results;
    });
  };
  return {
    getRecipes: getRecipes
  };
})
.factory('Question', function ($http) {
  var getAnswer = function ($scope, question) {
    return $http({
      method: 'GET',
      url: '/question',
      params: {
        question: question
      }
    })
    .then(function (resp) {
      console.log(resp);
      return resp.data;
    });
  };
  return {
    getAnswer: getAnswer
  };
})
.factory('Planner', function ($http) {
  var getPlan = function ($scope, calories) {
    return $http({
      method: 'GET',
      url: '/searchplan',
      params: {
        calories: calories
      }
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
      data: plan,
      headers: {'Content-Type': 'application/json'}
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
      url: '/recipecard',
      params: {
        url: url
      }
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  return {
    extractRecipe: extractRecipe
  }
});













