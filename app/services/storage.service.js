angular.module("bankingApp").factory("StorageService", function () {
  const data = {
    formData: { from: "", to: "", amount: null },
    resultMessage: "",
  };

  return {
    getFormData: () => data.formData,
    setFormData: (newData) => Object.assign(data.formData, newData),
    getResultMessage: () => data.resultMessage,
    setResultMessage: (msg) => {
      data.resultMessage = msg;
    },

    reset: () => {
      data.formData.from = "";
      data.formData.to = "";
      data.formData.amount = null;
      data.resultMessage = "";
    },
  };
});
