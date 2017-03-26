(function() {
  'use strict';
  angular.module('sw-planets')
    .config(planetsRouting)

  function planetsRouting($stateProvider) {
    $stateProvider
      .state({
        name: 'planets',
        url: '/?search&page&sort&order',
        templateUrl: 'modules/planets/planets.index.html',
        controller: 'PlanetsController',
        controllerAs: 'vm',
      })
  }
}());
