(function() {
  'use strict';

  angular.module('sw-planets', ['sw-planets.routing', 'sw-planets.modules', 'sw-planets.components'])
  angular.module('sw-planets.components', [])
  angular.module('sw-planets.modules', ['sw-planets.components'])
  angular.module('sw-planets.routing', ['ui.router'])
    .config(routerConfig)

  function routerConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise('/')
  }

}());
