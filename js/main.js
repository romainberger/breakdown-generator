
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

      // and play!
      playButton.click(function() {
        $.proxy(generator.play(), generator)
      })

      // set tempo
      $('#tempo').change(function() {
        var tempo = $(this).val()
        $.proxy(generator.setTempo(tempo), generator)
      })

    })

  })

}(window.jQuery);
