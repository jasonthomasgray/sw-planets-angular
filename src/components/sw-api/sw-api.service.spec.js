describe('swApi', () => {

  beforeEach(module('sw-planets.components'))

  beforeEach(inject(function (swApi, $httpBackend) {
    this.swApi = swApi
    this.$httpBackend = $httpBackend
  }))

  afterEach(function () {
     this.$httpBackend.verifyNoOutstandingExpectation()
     this.$httpBackend.verifyNoOutstandingRequest()
  })

  describe('planets', () => {

    it('should be defined', function () {
      expect(this.swApi.planets).toBeDefined()
    })

    it("should return a promise for planets", function () {
      var promise = this.swApi.planets()

      this.$httpBackend.expectGET('http://swapi.co/api/planets/')
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

    it("should request a specific page", function () {
      this.swApi.planets({page: 4})

      this.$httpBackend.expectGET('http://swapi.co/api/planets/?page=4')
        .respond({
          results: [],
        })

      this.$httpBackend.flush()
    })

    it("should send search query", function () {
      this.swApi.planets({search: 'Hoth'})

      this.$httpBackend.expectGET('http://swapi.co/api/planets/?search=Hoth')
        .respond({
          results: [{
            name: 'Hoth',
          }],
        })

      this.$httpBackend.flush()
    })

    it("should request film data", function () {
      this.swApi.planets().then((data) => {
        this.planets = data.results
      });

      this.$httpBackend.whenGET(/http:\/\/swapi\.co\/api\/films\/(\d+)/, undefined, ['id'])
      .respond((method, url, data, headers, params) => {
        return [200, {id: parseInt(params.id)}];
      })

      this.$httpBackend.expectGET('http://swapi.co/api/planets/')
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

      this.$httpBackend.expectGET('http://swapi.co/api/planets/')
        .respond({
          results: [
            {terrain: 'a, b, c'},
          ],
        })

      this.$httpBackend.flush()

      expect(this.planets[0].terrain).toEqual(['a', 'b', 'c'])

    })

    it('should convert number strings into numbers', function () {
      this.swApi.planets().then((data) => {
        this.planets = data.results
      })

      this.$httpBackend.expectGET('http://swapi.co/api/planets/')
        .respond({
          results: [
            {a: 'abc', b: '123', c:'100203'},
          ],
        })

      this.$httpBackend.flush()

      expect(this.planets[0].a).toEqual(jasmine.any(String))
      expect(this.planets[0].b).toEqual(jasmine.any(Number))
      expect(this.planets[0].b).toEqual(123)
      expect(this.planets[0].c).toEqual(jasmine.any(Number))
      expect(this.planets[0].c).toEqual(100203)

    })

    describe('pagination data', () => {

      beforeEach(function () {
        this.request = this.$httpBackend.expectGET('http://swapi.co/api/planets/')
      })

      it('should work for first page data', function () {
        this.swApi.planets().then((data) => {
          this.pagination = data.pagination
        })

        this.request.respond({
          count: 61,
          next: 'http://swapi.co/api/planets/?page=2',
          previous: null,
          results: [],
        })

        this.$httpBackend.flush()

        expect(this.pagination).toEqual({
          first: 1,
          previous: null,
          current: 1,
          next: 2,
          last: 7,
          neighbours: [1,2,3],
        })
      })

      it('should work for middle page data', function () {
        this.swApi.planets().then((data) => {
          this.pagination = data.pagination
        })

        this.request.respond({
          count: 60,
          next: 'http://swapi.co/api/planets/?page=4',
          previous: 'http://swapi.co/api/planets/?page=2',
          results: [],
        })

        this.$httpBackend.flush()

        expect(this.pagination).toEqual({
          first: 1,
          previous: 2,
          current: 3,
          next: 4,
          last: 6,
          neighbours: [1,2,3,4,5],
        })
      })

      it('should work for last page data', function () {
        this.swApi.planets().then((data) => {
          this.pagination = data.pagination
        })

        this.request.respond({
          count: 55,
          next: null,
          previous: 'http://swapi.co/api/planets/?page=5',
          results: [],
        })

        this.$httpBackend.flush()

        expect(this.pagination).toEqual({
          first: 1,
          previous: 5,
          current: 6,
          next: null,
          last: 6,
          neighbours: [4,5,6],
        })
      })

    })
  })
})
