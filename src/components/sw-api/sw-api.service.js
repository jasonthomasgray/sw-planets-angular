(function() {
  'use strict';

  angular.module('sw-planets.components')
    .factory('swApi', swApi)

  function swApi($http, $q) {
    return {
      planets: getPlanets,
    }

    function getPage(url) {
      const pageMatcher = /page=(\d+)/
      const match = pageMatcher.exec(url)
      if (match) {
        return parseInt(match[1],10)
      }
      return null
    }

    function getPlanets(options) {
      var filmPromises = {}; // cache object for film data
      return $http.get('http://swapi.co/api/planets/', {params: options}).then((response) => {
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

          // convert digit strings to numbers

          Object.keys(planet).forEach((key) => {
            const value = planet[key];
            if (typeof value === 'string' && /^\d+$/.test(value)) {
              planet[key] = Number(value)
            }
          })

          // parse terrain string into array to match film display
          if (planet.terrain) {
            planet.terrain = planet.terrain.split(',').map(s => s.trim())
          }
        })

        // create pagination data
        const pagination = response.data.pagination = {
          first: 1,
          previous: getPage(response.data.previous),
          current: 1, // default value, used if previous isn't defined
          next: getPage(response.data.next),
          last: Math.ceil(response.data.count / 10),
          neighbours: [],
        }
        // set the current page based on previous page
        if (pagination.previous) pagination.current = pagination.previous + 1

        var lowerBound = Math.max(pagination.current - 2, pagination.first)
        var upperBound = Math.min(pagination.current + 2, pagination.last)
        for (var i =lowerBound; i <= upperBound; i++) {
          pagination.neighbours.push(i);
        }

        // return data object, films data will be filled in at some point.
        return response.data
      })
    }
  }

}());
