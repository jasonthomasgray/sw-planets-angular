(function() {
  'use strict';
  angular.module('sw-planets.components')
    .directive('sorter', sorter)

  function sorter() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: (scope, iElement, iAttrs, ngModel) => {

        iElement.addClass('results-table__header-cell--sortable')

        var sortKey
        iAttrs.$observe('sorter', (val) => {
          sortKey = val
          ngModel.$render() // trigger render after getting sort key
        })

        ngModel.$render = render
        ngModel.$parsers.push(parser)
        ngModel.$formatters.push(formatter)

        const cycle = {
          '': '+',
          '+': '-',
          '-': '',
        }

        iElement.on('click', (event) => {
          ngModel.$setViewValue(cycle[ngModel.$viewValue]);
          ngModel.$render();
        })

        const classLookup = {
          '': {add: '', remove: 'results-table__header-cell--sort-asc results-table__header-cell--sort-desc'},
          '+': {add: 'results-table__header-cell--sort-asc', remove: 'results-table__header-cell--sort-desc'},
          '-': {add: 'results-table__header-cell--sort-desc', remove: 'results-table__header-cell--sort-asc'},
        }
        function render() {
          const classes = classLookup[ngModel.$viewValue]
          if (classes) {
            iElement.addClass(classes.add)
            iElement.removeClass(classes.remove)
          }
        }

        function parser(viewValue) {
          return viewValue ? viewValue + sortKey : null;
        }

        function formatter(modelValue) {
          const match = new RegExp('([+-])' + sortKey).exec(modelValue)
          if (!match) return '';
          return match[1];
        }
      }
    }
  }
}());
