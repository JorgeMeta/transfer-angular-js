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
        console.log("goToVerify FOI CHAMADO!"); // ← VERIFIQUE SE ESTÁ APARECENDO
        console.log("Dados do formData:", $scope.formData); // ← VEJA OS DADOS

        $scope.loading = true;
        $scope.today = new Date();

        // Só busca as contas se os IDs existirem
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

        console.log("Dados após buscar contas:", $scope.formData); // ← VEJA OS DADOS APÓS

        TransferService.validateTransfer($scope.formData)
          .then(function (result) {
            StorageService.setFormData($scope.formData);
            $location.path("/transfer/verify");
          })
          .catch(function (error) {
            console.log("Erro na validação:", error); // ← VEJA SE HÁ ERRO
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
