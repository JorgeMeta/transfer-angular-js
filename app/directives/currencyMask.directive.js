angular.module("bankingApp").directive("currencyMask", [
  "$timeout",
  function ($timeout) {
    function formatCurrency(value) {
      if (!value) return "";

      // Remove tudo que não é número
      value = value.toString().replace(/\D/g, "");

      // Se estiver vazio após limpar → retorna
      if (!value) return "";

      // Converte para número com centavos
      const number = (parseInt(value, 10) / 100).toFixed(2);

      // Formata estilo brasileiro
      return (
        "R$ " +
        number
          .replace(".", ",") // vírgula para centavos
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      ); // pontos de milhar
    }

    function parseCurrency(value) {
      if (!value) return null;

      // Remove "R$", pontos e espaços, troca vírgula por ponto
      const clean = value
        .toString()
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".")
        .trim();

      return parseFloat(clean) || null;
    }

    return {
      restrict: "A",
      require: "ngModel",
      link: function (scope, element, attrs, ngModelCtrl) {
        // Muda para type text para evitar conflitos
        element.attr("type", "text");

        // MODEL → VIEW (quando o Angular atualiza a tela)
        ngModelCtrl.$formatters.push(function (value) {
          if (value === null || value === undefined) return "";
          return formatCurrency(value.toString());
        });

        // VIEW → MODEL (quando o usuário digita)
        ngModelCtrl.$parsers.push(function (value) {
          const parsed = parseCurrency(value);

          // Atualiza a view com o valor formatado
          $timeout(() => {
            const formatted = formatCurrency(value);
            element.val(formatted);
          });

          return parsed;
        });

        // Formata enquanto digita
        element.on("input", function () {
          const value = element.val();
          const formatted = formatCurrency(value);

          // Só atualiza se for diferente para evitar loop
          if (value !== formatted) {
            element.val(formatted);
          }
        });

        // Foca no final quando clicar
        element.on("click", function () {
          const value = element.val();
          if (value) {
            element[0].setSelectionRange(value.length, value.length);
          }
        });
      },
    };
  },
]);
