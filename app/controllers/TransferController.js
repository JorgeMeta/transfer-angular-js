angular
  .module("bankingApp")
  .controller(
    "TransferController",
    function (
      $scope,
      $location,
      TransferService,
      StorageService,
      StepsService
    ) {
      $scope.currentStep = StepsService.getCurrentStep();
      $scope.StorageService = StorageService;
      $scope.formData = StorageService.getFormData();
      $scope.accounts = [];
      $scope.loading = false;

      $scope.today = new Date();

      TransferService.getAccounts().then(function (accounts) {
        $scope.accounts = accounts;
      });

      $scope.$on("$routeChangeSuccess", function () {
        StepsService.updateStepFromRoute($location.path());
      });

      $scope.$on("stepChanged", function (event, newStep) {
        $scope.currentStep = newStep;
      });

      $scope.goToVerify = function () {
        $scope.loading = true;

        $scope.today = new Date();

        $scope.formData.fromAccount = $scope.accounts.find(
          (acc) => acc.id === $scope.formData.from
        );
        $scope.formData.toAccount = $scope.accounts.find(
          (acc) => acc.id === $scope.formData.to
        );

        TransferService.validateTransfer($scope.formData)
          .then(function () {
            StorageService.setFormData($scope.formData);
            $location.path("/transfer/verify");
          })
          .catch(function (error) {
            alert(error);
          })
          .finally(function () {
            $scope.loading = false;
          });
      };

      $scope.confirmTransfer = function () {
        $scope.loading = true;

        TransferService.executeTransfer($scope.formData)
          .then(function (successMsg) {
            StorageService.setResultMessage(successMsg);
            $location.path("/transfer/result");
          })
          .catch(function (errorMsg) {
            StorageService.setResultMessage(errorMsg, true);
            $location.path("/transfer/result");
          })
          .finally(function () {
            $scope.loading = false;
          });
      };

      $scope.goBack = function () {
        StorageService.reset();
        $location.path("/transfer/input");
      };
    }
  );
