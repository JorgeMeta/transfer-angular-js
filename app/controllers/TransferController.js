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
      $scope.message = StorageService.getResultMessage();
      $scope.isSuccess = StorageService.isSuccess;
      $scope.today = new Date();

      $scope.$on("$routeChangeSuccess", function () {
        const step = StepsService.updateStepFromRoute($location.path());
        if (step) {
          $scope.currentStep = step;
        }
      });

      TransferService.getAccounts().then(function (accounts) {
        $scope.accounts = accounts;
      });

      $scope.$on("stepChanged", function (event, newStep) {
        $scope.currentStep = newStep;
      });

      $scope.goToVerify = function () {
        $scope.loading = true;

        if ($scope.formData.from) {
          $scope.formData.fromAccount = $scope.accounts.find(
            (acc) => acc.id === $scope.formData.from
          );
        }

        if ($scope.formData.to) {
          $scope.formData.toAccount = $scope.accounts.find(
            (acc) => acc.id === $scope.formData.to
          );
        }

        TransferService.validateTransfer($scope.formData)
          .then(function () {
            StorageService.setFormData($scope.formData);
            $location.path("/transfer/verify");
          })
          .finally(() => ($scope.loading = false));
      };

      $scope.confirmTransfer = function () {
        $scope.loading = true;

        TransferService.executeTransfer($scope.formData)
          .then(function (response) {
            StorageService.setResultMessage(response.message, true);
            $scope.message = response.message;
            $scope.isSuccess = true;
            $location.path("/transfer/result");
          })
          .catch(function (err) {
            const msg =
              typeof err === "string" ? err : err.message || "Erro inesperado";
            StorageService.setResultMessage(msg, false);
            $scope.message = msg;
            $scope.isSuccess = false;
            $location.path("/transfer/result");
          })
          .finally(() => ($scope.loading = false));
      };

      $scope.goBack = () => $location.path("/transfer/input");
    }
  );
