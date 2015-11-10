 angular.module('LetsCook.questions', [])

 .controller('QuestionController', function ($scope, Question) {
  $scope.data = {};

  $scope.getAnswer = function () {
    Question.getAnswer($scope, $scope.data.question).then(function (data) {
      $scope.result = data;
    })
    .catch(function (err) {
      console.error(err);
    });
  };
  $scope.getFromDB = function () {
    Question.getFromDB($scope).then(function (data) {
      $scope.DB = data;
    })
    .catch(function (err) {
      console.error(err);
    });
  };
 });