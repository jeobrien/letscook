angular.module('LetsCook', [
 'LetsCook.builder',
 'LetsCook.services',
 'LetsCook.recipes',
 'LetsCook.questions',
 'LetsCook.planner',
 'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $httpProvider.defaults.headers.get = { 'X-Mashape-Key' : '8SkB57oFpnmsh6lSn5OjBxMsafOSp1xuwFfjsnpoQMSiMBYSZr' };
  $httpProvider.defaults.headers.post = { 'X-Mashape-Key' : '8SkB57oFpnmsh6lSn5OjBxMsafOSp1xuwFfjsnpoQMSiMBYSZr' };
  $httpProvider.defaults.headers.common = { 'X-Mashape-Key' : '8SkB57oFpnmsh6lSn5OjBxMsafOSp1xuwFfjsnpoQMSiMBYSZr' };
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