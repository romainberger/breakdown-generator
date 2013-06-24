
!function() {

  'use strict'

  var generator  = new BreakdownGenerator
    , playButton = document.querySelector('#play')
    , loading    = document.querySelector('#loading')
    , generateRiff = document.querySelector('#generate-riff')
    , getRiff = document.querySelector('#get-riff')
    , tempoInput = document.querySelector('#tempo')

  generator.init(function(err) {
    if (err) {
      document.querySelector('#old-crap').show()
      return
    }

    // display the play button once everything is loaded
    loading.style.display = 'none'
    playButton.style.display = 'block'
    generateRiff.style.display = 'block'

    // set tempo
    tempoInput.addEventListener('change', function() {
      var tempo = $(this).val()
      generator.setTempo.call(generator, tempo)
    })

    // generate riff
    generateRiff.addEventListener('click', function() {
      generator.generateRiff.call(generator)
    })

    // and play!
    playButton.addEventListener('click', function() {
      generator.play.call(generator)
    })

    // get the riff as json
    getRiff.addEventListener('click', function() {
      generator.getJson.call(generator)
    })

  })

}();
