(function() {
  'use strict';

  /**
  * @desc order directive that is specific to the order module at a company named Acme
  * @example <div acme-order-calendar-range></div>
  */
  angular
      .module('cardinal')
      .directive('cnIcon', cnIcon);

  function cnIcon() {
    var directive = {
      link: link,
      restrict: 'A'
    };

    return directive;

    function link(scope, element, attrs) {
      var params = attrs.cnIcon.split(' ');
      var param;

      element.addClass('zmdi zmdi-' + params.shift());

      while(param = params.pop()) {
        element.addClass('zmdi-hc-' + param);
      }
    }
  }
})();