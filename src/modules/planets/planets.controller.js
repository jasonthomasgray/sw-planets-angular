(function() {
  'use strict';

  angular.module('sw-planets.modules')
    .controller('PlanetsController', PlanetsController)

  function PlanetsController(swApi, $stateParams) {
    const vm = this
    vm.planets = []

    initData();

    function initData() {
      swApi.planets({page: $stateParams.page, search: $stateParams.search})
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
