angular.module('LetsCook', [
 'LetsCook.builder',
 'LetsCook.nav',
 'LetsCook.services',
 'LetsCook.recipes',
 'LetsCook.questions',
 'LetsCook.planner',
 'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $httpProvider.defaults.headers.get = { 'X-Mashape-Key' : 'key' };
  $httpProvider.defaults.headers.post = { 'X-Mashape-Key' : 'key' };
  $httpProvider.defaults.headers.common = { 'X-Mashape-Key' : 'key' };
  $httpProvider.defaults.headers.common = {'Accept': 'application/json'};
  $routeProvider
  .when('/recipes', {
    templateUrl: 'app/recipes/recipes.html',
    controller: 'RecipeController'
  })
  .when('/question', {
    templateUrl: 'app/askQuestion/question.html',
    controller: 'QuestionController'
  })
  .when('/builder', {
    templateUrl: 'app/buildRecipe/builder.html',
    controller: 'BuilderController'
  })
  .when('/planner', {
    templateUrl: 'app/mealPlan/planner.html',
    controller: 'PlannerController'
  });

});


// author: ask for name
// backgroundColour: #ffffff
// backgroundImage: "none"
// fontColor: #333333
// image: binary, choose image
// ingredients: take from get request
// instructions: take from get request
// mask: "ellipse"
// readyinmin: take from get request
// servings: take from get request
// source: take from get request
// title: take from get request