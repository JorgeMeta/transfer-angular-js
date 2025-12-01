angular.module("bankingApp").directive("currencyMask", [
  "$timeout",
  function ($timeout) {
    function formatCurrency(value) {
      if (!value) return "";

      value = value.toString().replace(/\D/g, "");

      if (!value) return "";

      const number = (parseInt(value, 10) / 100).toFixed(2);

      return (
        "R$ " + number.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      );
    }

    function parseCurrency(value) {
      if (!value) return null;

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
        element.attr("type", "text");

        ngModelCtrl.$formatters.push(function (value) {
          if (value === null || value === undefined) return "";
          return formatCurrency(value.toString());
        });

        ngModelCtrl.$parsers.push(function (value) {
          const parsed = parseCurrency(value);

          $timeout(() => {
            const formatted = formatCurrency(value);
            element.val(formatted);
          });

          return parsed;
        });

        element.on("input", function () {
          const value = element.val();
          const formatted = formatCurrency(value);

          if (value !== formatted) {
            element.val(formatted);
          }
        });

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
