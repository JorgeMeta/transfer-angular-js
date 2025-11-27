angular
  .module("bankingApp", ["ngRoute", "ngAnimate"])
  .controller("AppController", function ($scope, StepsService) {
    $scope.currentStep = StepsService.getCurrentStep();

    $scope.$on("stepChanged", function (event, newStep) {
      $scope.currentStep = newStep;
    });
  });
