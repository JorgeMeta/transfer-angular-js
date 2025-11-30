angular.module("bankingApp").factory("ToastService", function () {
  return {
    success: function (msg) {
      if (window.__toastComponent) {
        window.__toastComponent.show(msg, "success");
      }
    },
    error: function (msg) {
      if (window.__toastComponent) {
        window.__toastComponent.show(msg, "error");
      }
    },
  };
});
