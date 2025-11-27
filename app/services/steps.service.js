angular.module("bankingApp").factory("StepsService", function ($rootScope) {
  var currentStep = 1;
  var totalSteps = 3;

  return {
    getCurrentStep: function () {
      return currentStep;
    },
    setCurrentStep: function (step) {
      currentStep = step;
      $rootScope.$broadcast("stepChanged", currentStep);
    },
    getTotalSteps: function () {
      return totalSteps;
    },
    updateStepFromRoute: function (path) {
      if (path === "/transfer/input") this.setCurrentStep(1);
      else if (path === "/transfer/verify") this.setCurrentStep(2);
      else if (path === "/transfer/result") this.setCurrentStep(3);
    },
  };
});
