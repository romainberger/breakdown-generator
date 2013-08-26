
!function() {

  'use strict';

  var generator  = new BreakdownGenerator()
    , playButton = document.querySelector('#play')
    , loading    = document.querySelector('#loading')
    , generateRiff = document.querySelector('#generate-riff')
    , tempoInput = document.querySelector('#tempo')
    , riffOutputWrapper = document.querySelector('#riff-output-wrapper')
    , riffOutput = document.querySelector('#riff-output')
    , importRiff = document.querySelector('#import-riff')

  generator.init(function(err) {
    if (err) {
      document.querySelector('#old-crap').show()
      return
    }

    // display the play button once everything is loaded
    loading.style.display = 'none'
    generateRiff.style.display = 'block'

    // set tempo
    tempoInput.addEventListener('change', function() {
      var tempo = this.value
      generator.setTempo.call(generator, tempo)
    })

    // generate riff
    generateRiff.addEventListener('click', function() {
      playButton.style.display = 'block'
      generator.generateRiff.call(generator)

      // output the riff
      var riff = generator.getJson.call(generator)
      riffOutput.textContent = riff
    })

    // and play!
    playButton.addEventListener('click', function() {
      generator.play.call(generator)
    })

    // load a riff
    importRiff.addEventListener('click', function() {
      var riff = riffOutput.textContent
      generator.loadRiff(riff)
    })

  })

}();
