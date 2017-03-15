(function() {
  'use strict';

  angular.module('sw-planets')
    .factory('swApi', swApi)

  function swApi($http) {
    return {
      planets: getPlanets,
    }

    function getPlanets() {
      return $http.get('http://swapi.co/api/planets')
    }
  }

}());
