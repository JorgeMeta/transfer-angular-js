angular.module("bankingApp").factory("StorageService", function () {
  const data = {
    formData: { from: null, to: null, amount: null },
    resultMessage: "",
    isSuccess: false,
  };

  return {
    getFormData: () => data.formData,

    setFormData: (newData) => Object.assign(data.formData, newData),

    // ------------------------------
    // Só deve retornar mensagem se for sucesso
    // ------------------------------
    getResultMessage: () => {
      return data.isSuccess ? data.resultMessage : "";
    },

    // ------------------------------
    // Define a mensagem e se foi sucesso
    // ------------------------------
    setResultMessage: (msg, success = false) => {
      data.resultMessage = msg;
      data.isSuccess = success;
    },

    reset: () => {
      data.formData.from = null;
      data.formData.to = null;
      data.formData.amount = null;

      data.resultMessage = "";
      data.isSuccess = false;
    },
  };
});
