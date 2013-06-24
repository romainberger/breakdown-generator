
!function($) {

  'use strict'

  $(document).ready(function() {

    var generator  = new BreakdownGenerator
      , playButton = $('#play')
      , loading    = $('#loading')

    generator.init(function(err) {
      if (err) {
        $('#old-crap').show()
        return
      }

      // display the play button once everything is loaded
      loading.hide()
      playButton.show()

      // set tempo
      $('#tempo').change(function() {
        var tempo = $(this).val()
        $.proxy(generator.setTempo(tempo), generator)
      })

      // generate riff
      generateRiff.click(function() {
        $.proxy(generator.generateRiff(), generator)
      })

      // and play!
      playButton.click(function() {
        $.proxy(generator.play(), generator)
      })

    })

  })

}(window.jQuery);
