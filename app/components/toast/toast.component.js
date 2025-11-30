angular.module("bankingApp").component("appToast", {
  template: `
    <div class="toast-container" ng-class="{ visible: $ctrl.visible, error: $ctrl.type === 'error', success: $ctrl.type === 'success' }">
      {{$ctrl.message}}
    </div>
  `,
  controller: function ($timeout) {
    var ctrl = this;

    ctrl.visible = false;
    ctrl.message = "";
    ctrl.type = "success";

    ctrl.show = function (msg, type) {
      ctrl.message = msg;
      ctrl.type = type;
      ctrl.visible = true;

      // some depois de 3s
      $timeout(function () {
        ctrl.visible = false;
      }, 3000);
    };

    // expõe globalmente
    window.__toastComponent = ctrl;
  },
});
