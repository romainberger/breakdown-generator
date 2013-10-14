
!function() {

  'use strict';

  /**
   * Breakdown Generator Graph constructor
   *
   * @param string table - Id of the element
   */
  var BreakdownGeneratorGraph = function(table) {
    this.table    = document.querySelector(table)
    this.china  = this.table.querySelector('#china')
    this.snare  = this.table.querySelector('#snare')
    this.kick   = this.table.querySelector('#kick')
    this.guitar = this.table.querySelector('#guitar')
    this.riff
    this.instruments = ['snare', 'china', 'kick']
  }

  BreakdownGeneratorGraph.prototype = {

      /**
       * @param string riff - json string
       */
      draw: function(riff) {
        this.riff = JSON.parse(riff)
        this.drawGuitar()
        this.drawInstruments()
      }

    , drawInstruments: function() {
        var self = this

        this.instruments.forEach(function(instrument) {
          var html = ''
          for (var i = 0; i < 8; i++) {
            html += '<td'
            if (self.riff[instrument].indexOf(i) != -1) {
              html += ' class="filled"'
            }
            html += '></td>'
          }

          self[instrument].insertAdjacentHTML('beforeend', html)
        })
      }

    , drawGuitar: function() {

      }

  }

  // export for front-end
  if (typeof window != 'undefined') {
    if (window.BreakdownGeneratorGraph) {
      for (var prop in BreakdownGeneratorGraph) {
        window.BreakdownGeneratorGraph[prop] = BreakdownGeneratorGraph[prop]
      }
    }
    else {
      window.BreakdownGeneratorGraph = BreakdownGeneratorGraph
    }
  }

  // export as module for node.js
  if (typeof module != 'undefined' && module.exports) {
    module.exports = BreakdownGeneratorGraph
  }

}();
