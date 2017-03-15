describe('swApi', () => {

  beforeEach(module('sw-planets'))

  beforeEach(inject(function (swApi, $httpBackend) {
    this.swApi = swApi;
    this.$httpBackend = $httpBackend;
  }))

  afterEach(function () {
     this.$httpBackend.verifyNoOutstandingExpectation();
     this.$httpBackend.verifyNoOutstandingRequest();
  })

  describe('planets', () => {

    it('should be', function () {
      expect(this.swApi.planets).toBeDefined();
    })

    it("should return a promise for planets", function () {
      var promise = this.swApi.planets();

      this.$httpBackend.expectGET('http://swapi.co/api/planets')
        .respond({
          results: [
            {name: 'Saturn'},
            {name: 'Jupiter'},
          ]
        });
      var spy = jasmine.createSpy('then');
      promise.then(spy);

      this.$httpBackend.flush();

      expect(promise.then).toBeDefined();
      expect(spy).toHaveBeenCalled();
    })

  })

})
