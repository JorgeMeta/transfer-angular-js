angular.module("transferApp").factory("TransferService", function () {
  return {
    validateTransfer: function (data) {
      if (data.amount <= 0) return "Invalid amount for transfer.";
      return "Transfer completed successfully!!";
    },
  };
});
