
var assert             = require('assert')
  , BreakdownGenerator = require('../js/breakdown-generator')

describe('Breakdown Generator', function() {

  var generator = new BreakdownGenerator()
  generator.init(function(err) {
    if (err) {
      console.log('Error')
      return
    }
  })

  describe('Tempo', function() {
    it('should set the tempo', function() {
      var tempoToSet = 180
        , tempo = generator.setTempo.call(generator, tempoToSet)
      assert.equal(tempo, tempoToSet)
    })
  })

})
