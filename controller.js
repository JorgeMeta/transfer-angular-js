angular
  .module("transferApp")
  .controller("MainController", function ($scope, TransferService) {
    // Transfer Data
    $scope.formData = {
      from: "",
      to: "",
      amount: null,
    };

    // First Screen
    $scope.currentStep = "templates/input.html";

    // Second Screen
    $scope.goToVerify = function () {
      if (
        !$scope.formData.from ||
        !$scope.formData.to ||
        !$scope.formData.amount
      ) {
        alert("Fill in all fields");
        return;
      }
      $scope.currentStep = "templates/verify.html";
    };

    // Confirm transfer
    $scope.confirmTransfer = function () {
      $scope.resultMessage = TransferService.validateTransfer($scope.formData);
      $scope.currentStep = "templates/result.html";
    };

    // Go back
    $scope.goBack = function () {
      $scope.currentStep = "templates/input.html";
    };
  });
