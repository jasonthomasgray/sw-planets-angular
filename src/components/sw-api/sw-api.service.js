(function() {
  'use strict';

  angular.module('sw-planets')
    .factory('swApi', swApi)

  function swApi($http, $q) {
    return {
      planets: getPlanets,
    }

    function getPlanets() {
      var filmPromises = {}; // cache object for film data
      return $http.get('http://swapi.co/api/planets').then((response) => {
        response.data.results.forEach((planet) => {
          // request film data for planets
          if (planet.films) {
            planet.films.forEach((film, i) => {
              if (!filmPromises[film])
              filmPromises[film] = $http.get(film)
              filmPromises[film]
              .then((response) => {
                return planet.films[i] = response.data;
              })
              .catch((err) => {
                return planet.films[i] = '<Data unavailable>'
              })
            })
          }

          // parse terrain string into array to match film display
          if (planet.terrain) {
            planet.terrain = planet.terrain.split(',').map(s => s.trim())
          }
        })

        // wait for all the films to be returned
        return response.data;
        // return $q.all(Object.keys(filmPromises).map((key) => {
        //   return filmPromises[key];
        // })).then(() => {
        //   return response.data
        // }).catch(() => {
        //   return response.data
        // })
      })
    }
  }

}());
