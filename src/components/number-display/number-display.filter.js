(function() {
  'use strict';
  angular.module('sw-planets.components')
    .filter('numberDisplay', numberDisplay)

  function numberDisplay() {
    const isDigits = /^\d+$/;
    return (n) => {
      if (typeof n !== 'number' && !isDigits.test(n)) return n
      n = n.toString()
      var o = '';
      while (n.length > 3) {
        o = ',' + n.substr(-3) + o
        n = n.substr(0, n.length - 3)
      }
      return n + o
    }
  }
}());
