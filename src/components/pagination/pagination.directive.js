(function() {
  'use strict';

  angular.module('sw-planets')
    .directive('pagination', pagination)

  function pagination($state) {
    return {
      restrict: 'A',
      scope: {
        pagination: '=',
      },
      templateUrl: 'components/pagination/pagination.html',
      controller: paginationController,
      controllerAs: 'vm',
      bindToController: true,
      link: (scope, iElement, iAttrs, vm) => {
        // add class to element for styling purposes
        iElement.addClass('pagination-directive')

        vm.state = $state.current.name
        vm.isFirst = true
        vm.first = ''
        vm.previous = ''
        vm.current = 0
        vm.next = ''
        vm.last = ''
        vm.isLast = true
        vm.pages = []

        scope.$watch('vm.pagination', (pagination) => {
          if (pagination) {
            vm.first = $state.href(vm.state, {page: pagination.first})
            vm.previous = $state.href(vm.state, {page: pagination.previous})
            vm.current = pagination.current
            vm.next = $state.href(vm.state, {page: pagination.next})
            vm.last = $state.href(vm.state, {page: pagination.last})
            vm.pages = pagination.neighbours

            vm.isFirst = pagination.current === pagination.first
            vm.isLast = pagination.current === pagination.last
          }
        })
      },
    }

    function paginationController() {

    }
  }
}());
