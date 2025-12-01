angular
  .module("bankingApp")
  .controller(
    "ResultController",
    function ($scope, $location, StorageService, StepsService) {
      StepsService.setCurrentStep(3);

      $scope.message = StorageService.getResultMessage();
      $scope.isSuccess = StorageService.isSuccess;
      $scope.newTransfer = function () {
        StorageService.reset();
        $location.path("/transfer/input");
      };
    }
  );
