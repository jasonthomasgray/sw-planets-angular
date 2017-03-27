(function() {
  'use strict';

  angular.module('sw-planets.components')
    .directive('resultsSearch', resultsSearch)

  function resultsSearch($state, $stateParams) {
    return {
      restrict: 'A',
      templateUrl: 'components/results-search/results-search.html',
      scope: {},
      bindToController: true,
      controller: resultsSearchController,
      controllerAs: 'vm',
      link: (scope, iElement, iAttrs, vm) => {
        vm.query = $stateParams.search || ''
        vm.search = search

        scope.$on('$stateChangeSuccess', (event, toState, toParams) => {
          vm.query = toParams.search
        })

        function search(event) {
          event.preventDefault();
          $state.go($state.current.name, {search: vm.query, page: null})
        }
      }
    }
  }

  function resultsSearchController() {

  }
}());
