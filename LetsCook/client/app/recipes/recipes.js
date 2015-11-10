angular.module('LetsCook.recipes', [])

.controller('RecipeController', function ($scope, Recipes) {
  $scope.data = {
    cuisine: "",
    diet: "",
    exclude: "",
    intolerances: "",
    query: "",
    type: ""
  };
  $scope.results = [];
  $scope.loaded = false;
  $scope.cuisines = [
  "african", "chinese", "japanese", "korean", "vietnamese", "thai", "indian", "british", "irish", "french", "italian", "mexican", "spanish", "middle eastern", "jewish", "american", "cajun", "southern", "greek", "german", "nordic", "eastern european", "caribbean", "latin american"
  ];
  $scope.diets = [
  "Diet", "pescetarian", "lacto vegetarian", "ovo vegetarian", "vegan", "vegetarian"
  ];
  $scope.intolerances = [
  "dairy", "egg", "gluten", "peanut", "sesame", "seafood", "shellfish", "soy", "sulfite", "tree nut", "wheat"
  ];
  $scope.types = [
  "main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "drink"
  ];

  $scope.getRecipes = function () {
    Recipes.getRecipes($scope, $scope.data.cuisine, $scope.data.diet, $scope.data.exclude, $scope.data.intolerances, $scope.data.query, $scope.data.type).then(function (responses) {
      // for each result, call getRecipe
      responses.forEach(function (response) {
        Recipes.getRecipe($scope, response.id).then(function (summary) {
          $scope.loaded = true;
          $scope.results.push(summary);
        })
        .catch(function (err) {
          console.error(err);
        });
      });
    })
    .catch(function (err) {
      console.error(err);
    });
  };
});
