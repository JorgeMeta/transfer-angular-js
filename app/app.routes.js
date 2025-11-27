angular.module("bankingApp").config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/transfer/input", {
        templateUrl: "views/transfer-input.html",
        controller: "TransferController",
      })
      .when("/transfer/verify", {
        templateUrl: "views/transfer-verify.html",
        controller: "TransferController",
      })
      .when("/transfer/result", {
        templateUrl: "views/transfer-result.html",
        controller: "TransferController",
      })
      .otherwise({
        redirectTo: "/transfer/input",
      });
  },
]);
