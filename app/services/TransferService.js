angular.module("bankingApp").factory("TransferService", [
  "$q",
  "$timeout",
  "$http",
  function ($q, $timeout, $http) {
    const API_URL = "http://localhost:3000";

    return {
      getAccounts: function () {
        return $http
          .get(`${API_URL}/accounts`)
          .then((response) => response.data)
          .catch((error) => {
            console.error("Erro ao buscar contas:", error);
            return $q.reject("Falha ao carregar contas");
          });
      },

      validateTransfer: function (transferData) {
        // Validações síncronas - usar $timeout para garantir que o toast seja exibido
        if (!transferData.from || !transferData.to || !transferData.amount) {
          return $q(function (resolve, reject) {
            $timeout(function () {
              window.__toastComponent.show(
                "Preencha todos os campos obrigatórios",
                "error"
              );
              reject({
                success: false,
                message: "Campos obrigatórios não preenchidos",
              });
            });
          });
        }

        if (transferData.from === transferData.to) {
          return $q(function (resolve, reject) {
            $timeout(function () {
              window.__toastComponent.show(
                "Conta de origem e destino não podem ser iguais",
                "error"
              );
              reject({
                success: false,
                message: "Conta de origem e destino iguais",
              });
            });
          });
        }

        if (transferData.amount <= 0) {
          return $q(function (resolve, reject) {
            $timeout(function () {
              window.__toastComponent.show(
                "O valor deve ser maior que zero",
                "error"
              );
              reject({
                success: false,
                message: "Valor inválido",
              });
            });
          });
        }

        // Validação assíncrona do saldo
        return $http
          .get(`${API_URL}/accounts/${transferData.from}`)
          .then((response) => {
            const account = response.data;

            if (account.balance < transferData.amount) {
              window.__toastComponent.show("Saldo insuficiente", "error");
              return $q.reject({
                success: false,
                message: "Saldo insuficiente",
              });
            }

            return { success: true, message: "Validação bem-sucedida" };
          })
          .catch(() => {
            window.__toastComponent.show("Saldo insuficiente", "error");
            return $q.reject({
              success: false,
              message: "Saldo insuficiente",
            });
          });
      },

      executeTransfer: function (transferData) {
        // Primeiro valida, depois executa
        return (
          this.validateTransfer(transferData)
            .then((validationResult) => {
              // Se chegou aqui, a validação passou (success: true)

              // Executa a transferência
              return $timeout(() => {
                return $http
                  .get(`${API_URL}/accounts/${transferData.from}`)
                  .then((response) => {
                    const fromAccount = response.data;

                    // Atualizar conta origem
                    return $http.patch(
                      `${API_URL}/accounts/${transferData.from}`,
                      {
                        balance: fromAccount.balance - transferData.amount,
                      }
                    );
                  })
                  .then(() => {
                    // Atualizar conta destino
                    return $http
                      .get(`${API_URL}/accounts/${transferData.to}`)
                      .then((res) => {
                        const toAccount = res.data;

                        return $http.patch(
                          `${API_URL}/accounts/${transferData.to}`,
                          { balance: toAccount.balance + transferData.amount }
                        );
                      });
                  })
                  .then(() => {
                    // Registrar histórico
                    return $http.post(`${API_URL}/transfers`, {
                      from: transferData.from,
                      to: transferData.to,
                      amount: transferData.amount,
                      description: transferData.description,
                      date: new Date().toISOString(),
                      status: "completed",
                    });
                  })
                  .then(() => {
                    window.__toastComponent.show(
                      "Transferência realizada com sucesso!",
                      "success"
                    );
                    return {
                      success: true,
                      message: "Transferência realizada com sucesso!",
                    };
                  });
              }, 1000);
            })
            // O catch aqui captura apenas erros de rede/timeout da execução
            .catch((error) => {
              // Se o erro já tem mensagem (vindo da validação), não mostra toast duplicado
              if (!error.message) {
                window.__toastComponent.show(
                  "Erro ao processar transferência",
                  "error"
                );
              }
              return $q.reject(error);
            })
        );
      },
    };
  },
]);
