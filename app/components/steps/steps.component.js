angular.module("bankingApp").component("stepsIndicator", {
  bindings: {
    currentStep: "=",
    total: "<",
  },
  templateUrl: "components/steps/steps.template.html",
  controller: function () {
    var ctrl = this;

    ctrl.$onInit = function () {
      ctrl.total = ctrl.total || 3;
      ctrl.currentStep = ctrl.currentStep || 1;
    };

    ctrl.getSteps = function () {
      return Array.from({ length: ctrl.total }, (_, i) => i + 1);
    };

    ctrl.getClass = function (step) {
      if (step < ctrl.currentStep) return "completed";
      if (step === ctrl.currentStep) return "active";
      return "";
    };

    ctrl.progress = function () {
      if (ctrl.total <= 1) return 0;
      return ((ctrl.currentStep - 1) / (ctrl.total - 1)) * 100;
    };
  },
});
