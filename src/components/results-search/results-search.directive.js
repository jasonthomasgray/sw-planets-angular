(function() {
  'use strict';

  angular.module('sw-planets.components')
    .directive('resultsSearch', resultsSearch)

  function resultsSearch() {
    return {
      restrict: 'A',
      templateUrl: 'components/results-search/results-search.html',
    }
  }
}());
