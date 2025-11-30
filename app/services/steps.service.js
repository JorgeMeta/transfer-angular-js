angular.module("bankingApp").factory("StepsService", function ($rootScope) {
  var currentStep = 1;
  var totalSteps = 3;

  function broadcastStep(step) {
    if (currentStep !== step) {
      currentStep = step;
      $rootScope.$broadcast("stepChanged", currentStep);
    }
  }

  return {
    getCurrentStep: function () {
      return currentStep;
    },

    setCurrentStep: function (step) {
      broadcastStep(step);
    },

    getTotalSteps: function () {
      return totalSteps;
    },

    updateStepFromRoute: function (path) {
      switch (path) {
        case "/transfer/input":
          broadcastStep(1);
          break;
        case "/transfer/verify":
          broadcastStep(2);
          break;
        case "/transfer/result":
          broadcastStep(3);
          break;
      }
    },
  };
});
