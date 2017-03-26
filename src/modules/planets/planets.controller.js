(function() {
  'use strict';

  angular.module('sw-planets')
    .controller('PlanetsController', PlanetsController)

  function PlanetsController(swApi, $stateParams) {
    const vm = this
    vm.planets = []

    initData();

    function initData() {
      swApi.planets({page: $stateParams.page})
        .then(setPlanetsData)
        .catch(showError)
    }

    function setPlanetsData(planets) {
      vm.planets = planets.results
      vm.pagination = planets.pagination;
    }

    function showError(err) {
      // TODO
    }
  }
}());
