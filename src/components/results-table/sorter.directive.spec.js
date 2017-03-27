describe('sorter directive', () => {

  beforeEach(module('sw-planets.components'))

  beforeEach(inject(function ($compile, $rootScope) {
    this.$compile = $compile
    this.scope = $rootScope.$new(false);
    this.scope.vm = {
      order: null,
    }
    this.element = this.$compile('<div sorter="name" ng-model="vm.order"></div>')(this.scope)
  }))

  afterEach(function () {
    this.scope.$destroy();
  })

  it('should add class', function () {
    expect(this.element[0].classList).toContain('results-table__header-cell--sortable')
  })

  it('should toggle through sort orders when clicked', function () {
    this.scope.$digest();
    this.element.triggerHandler('click')
    expect(this.scope.vm.order).toBe('+name')
    this.element.triggerHandler('click')
    expect(this.scope.vm.order).toBe('-name')
    this.element.triggerHandler('click')
    expect(this.scope.vm.order).toBe(null)
  })

  describe('model', () => {
    beforeEach(function () {
      this.ngModel = this.element.controller('ngModel')
      this.scope.$digest()
    })

    describe('formatter', () => {
      it('should be empty string when model null', function () {
        this.scope.vm.order = null
        this.scope.$digest()
        expect(this.ngModel.$viewValue).toBe('')
      })
      it('should be empty string when key not in model', function () {
        this.scope.vm.order = '+wrongkey'
        this.scope.$digest()
        expect(this.ngModel.$viewValue).toBe('')
      })
      it('should be + when +key in model', function () {
        this.scope.vm.order = '+name'
        this.scope.$digest()
        expect(this.ngModel.$viewValue).toBe('+')
      })
      it('should be - when -key in model', function () {
        this.scope.vm.order = '-name'
        this.scope.$digest()
        expect(this.ngModel.$viewValue).toBe('-')
      })
    })

    describe('parser', () => {

      it('should be null', function () {
        this.ngModel.$setViewValue('')
        expect(this.scope.vm.order).toBe(null)
      })
      it('should be +', function () {
        this.ngModel.$setViewValue('+')
        expect(this.scope.vm.order).toBe('+name')
      })
      it('should be -', function () {
        this.ngModel.$setViewValue('-')
        expect(this.scope.vm.order).toBe('-name')
      })
    })
  })

})
