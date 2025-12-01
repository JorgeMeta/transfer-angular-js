angular.module("bankingApp").factory("StorageService", function ($window) {
  const data = {
    formData: { from: null, to: null, amount: null },
    resultMessage: "",
    isSuccess: false,
  };

  const PERSIST_KEY = "transfer_result_msg";

  function persist() {
    try {
      $window.sessionStorage.setItem(
        PERSIST_KEY,
        JSON.stringify({
          msg: data.resultMessage,
          isSuccess: data.isSuccess,
        })
      );
    } catch (e) {}
  }

  function restore() {
    try {
      const raw = $window.sessionStorage.getItem(PERSIST_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        data.resultMessage = parsed.msg || "";
        data.isSuccess = !!parsed.isSuccess;
      }
    } catch (e) {}
  }

  restore();

  return {
    getFormData: () => {
      console.log("[StorageService] getFormData ->", data.formData);
      return data.formData;
    },

    setFormData: (newData) => {
      Object.assign(data.formData, newData);
      console.log("[StorageService] setFormData ->", data.formData);
    },

    getResultMessage: () => {
      console.log(
        "[StorageService] getResultMessage ->",
        data.resultMessage,
        "isSuccess:",
        data.isSuccess
      );
      return data.resultMessage;
    },

    setResultMessage: (msg, success = false) => {
      console.log(
        "[StorageService] setResultMessage RECEIVED ->",
        msg,
        "success:",
        success
      );
      data.resultMessage = msg;
      data.isSuccess = success;
      persist();
      console.log(
        "[StorageService] setResultMessage SAVED ->",
        data.resultMessage,
        "isSuccess:",
        data.isSuccess
      );
    },

    reset: () => {
      data.formData.from = null;
      data.formData.to = null;
      data.formData.amount = null;
      data.resultMessage = "";
      data.isSuccess = false;
      try {
        $window.sessionStorage.removeItem(PERSIST_KEY);
      } catch (e) {}
    },
  };
});
