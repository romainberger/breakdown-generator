
!function($) {

  'use strict'

  $(document).ready(function() {

    var generator = new BreakdownGenerator;

    generator.init(function(err) {
      if (err) {
        $('#old-crap').show()
        return
      }

    })

  })

}(window.jQuery);
