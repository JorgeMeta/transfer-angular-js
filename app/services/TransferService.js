angular.module("bankingApp").factory("TransferService", [
  "$q",
  "$timeout",
  "$http",
  function ($q, $timeout, $http) {
    const API_URL = "http://localhost:3000"; // URL do seu JSON Server

    return {
      getAccounts: function () {
        return $http
          .get(`${API_URL}/accounts`)
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            console.error("Erro ao buscar contas:", error);
            return $q.reject("Falha ao carregar contas");
          });
      },

      validateTransfer: function (transferData) {
        var deferred = $q.defer();

        // Validações básicas
        if (!transferData.from || !transferData.to || !transferData.amount) {
          deferred.reject("Preencha todos os campos obrigatórios");
          return deferred.promise;
        }

        if (transferData.from === transferData.to) {
          deferred.reject("Conta de origem e destino não podem ser iguais");
          return deferred.promise;
        }

        if (transferData.amount <= 0) {
          deferred.reject("Valor deve ser maior que zero");
          return deferred.promise;
        }

        // Buscar saldo da conta de origem
        $http
          .get(`${API_URL}/accounts/${transferData.from}`)
          .then(function (response) {
            var account = response.data;
            if (account.balance < transferData.amount) {
              deferred.reject("Saldo insuficiente na conta de origem");
            } else {
              deferred.resolve("Transferência válida");
            }
          })
          .catch(function () {
            deferred.reject("Erro ao validar saldo");
          });

        return deferred.promise;
      },

      executeTransfer: function (transferData) {
        var deferred = $q.defer();

        // Primeiro valida
        this.validateTransfer(transferData)
          .then(function () {
            // Simula processamento
            $timeout(function () {
              // Atualiza saldo das contas no JSON Server
              $http
                .patch(`${API_URL}/accounts/${transferData.from}`, {
                  balance:
                    transferData.fromAccount.balance - transferData.amount,
                })
                .then(function () {
                  return $http.patch(`${API_URL}/accounts/${transferData.to}`, {
                    balance:
                      transferData.toAccount.balance + transferData.amount,
                  });
                })
                .then(function () {
                  // Salva o histórico da transferência
                  return $http.post(`${API_URL}/transfers`, {
                    from: transferData.from,
                    to: transferData.to,
                    amount: transferData.amount,
                    description: transferData.description,
                    date: new Date().toISOString(),
                    status: "completed",
                  });
                })
                .then(function () {
                  deferred.resolve("Transferência realizada com sucesso!");
                })
                .catch(function (error) {
                  deferred.reject(
                    "Erro ao processar transferência: " + error.data
                  );
                });
            }, 1000);
          })
          .catch(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      },
    };
  },
]);
