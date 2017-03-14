(function() {
  'use strict';

  angular.module('sw-planets', [])
    .controller('PlanetsController', PlanetsController)

    function PlanetsController($http) {
      const vm = this
      vm.planets = []

      initData();

      function initData() {
        $http.get('http://swapi.co/api/planets')
          .then(setPlanetsData)
          .catch(showError)
      }

      function setPlanetsData(response) {
        vm.planets = response.data.results
      }

      function showError(err) {
        // TODO
      }
    }
}());
