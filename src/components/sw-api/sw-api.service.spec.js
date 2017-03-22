describe('swApi', () => {

  beforeEach(module('sw-planets'))

  beforeEach(inject(function (swApi, $httpBackend) {
    this.swApi = swApi
    this.$httpBackend = $httpBackend
  }))

  afterEach(function () {
     this.$httpBackend.verifyNoOutstandingExpectation()
     this.$httpBackend.verifyNoOutstandingRequest()
  })

  describe('planets', () => {

    it('should be', function () {
      expect(this.swApi.planets).toBeDefined()
    })

    it("should return a promise for planets", function () {
      var promise = this.swApi.planets()

      this.$httpBackend.expectGET('http://swapi.co/api/planets')
        .respond({
          results: [
            {name: 'Saturn'},
            {name: 'Jupiter'},
          ]
        })
      var spy = jasmine.createSpy('then')
      promise.then(spy)

      this.$httpBackend.flush()

      expect(promise.then).toBeDefined()
      expect(spy).toHaveBeenCalled()
    })

    it("should request film data", function () {
      this.swApi.planets().then((data) => {
        this.planets = data.results
      });

      this.$httpBackend.whenGET(/http:\/\/swapi\.co\/api\/films\/(\d+)/, undefined, ['id'])
      .respond((method, url, data, headers, params) => {
        return [200, {id: parseInt(params.id)}];
      })

      this.$httpBackend.expectGET('http://swapi.co/api/planets')
        .respond({
          results: [
            {films: ['http://swapi.co/api/films/5', 'http://swapi.co/api/films/10']},
          ],
        })
      this.$httpBackend.expectGET('http://swapi.co/api/films/5')
      this.$httpBackend.expectGET('http://swapi.co/api/films/10')

      this.$httpBackend.flush()


      expect(this.planets[0].films.length).toEqual(2)
      expect(this.planets[0].films[0].id).toEqual(5);
      expect(this.planets[0].films[1].id).toEqual(10);
    })

    it('should parse terrain into array', function () {
      this.swApi.planets().then((data) => {
        this.planets = data.results
      })

      this.$httpBackend.expectGET('http://swapi.co/api/planets')
        .respond({
          results: [
            {terrain: 'a, b, c'},
          ],
        })

      this.$httpBackend.flush()

      expect(this.planets[0].terrain).toEqual(['a', 'b', 'c'])

    })

  })

})
