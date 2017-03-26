describe('numberDisplay', () => {

  beforeEach(module('sw-planets.components'))

  beforeEach(inject(function ($filter) {
    this.$filter = $filter
  }))

  it('should format numbers with commas', function () {
    expect(this.$filter('numberDisplay')(1000)).toEqual('1,000')
    expect(this.$filter('numberDisplay')(123456789)).toEqual('123,456,789')
    expect(this.$filter('numberDisplay')(100)).toEqual('100')
  })

  it('should format digit only strings with commas', function () {
    expect(this.$filter('numberDisplay')('1000')).toEqual('1,000')
    expect(this.$filter('numberDisplay')('123456789')).toEqual('123,456,789')
    expect(this.$filter('numberDisplay')('100')).toEqual('100')
  })

  it('should pass non numbers through unchanged', function () {
    expect(this.$filter('numberDisplay')('unknown')).toEqual('unknown')
    expect(this.$filter('numberDisplay')('testValue')).toEqual('testValue')
    expect(this.$filter('numberDisplay')({id: 4})).toEqual({id: 4})
    expect(this.$filter('numberDisplay')([1,2,3])).toEqual([1,2,3])
  })
})
