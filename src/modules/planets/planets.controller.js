(function() {
  'use strict';

  angular.module('sw-planets')
    .controller('PlanetsController', PlanetsController)

  function PlanetsController(swApi) {
    const vm = this
    vm.planets = []

    initData();

    function initData() {
      swApi.planets()
        .then(setPlanetsData)
        .catch(showError)
    }

    function setPlanetsData(planets) {
      vm.planets = planets.results
    }

    function showError(err) {
      // TODO
    }
  }
}());
