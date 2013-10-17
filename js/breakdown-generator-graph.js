
!function() {

  'use strict';

  /**
   * Breakdown Generator Graph constructor
   *
   * @param string table - Id of the element
   */
  var BreakdownGeneratorGraph = function(table) {
    this.table  = document.querySelector(table)
    this.china  = this.table.querySelector('#china')
    this.snare  = this.table.querySelector('#snare')
    this.kick   = this.table.querySelector('#kick')
    this.guitar = this.table.querySelector('#guitar')
    this.riff
    this.instruments    = ['snare', 'china', 'kick']
    this.allInstruments = [this.china, this.snare, this.kick, this.guitar]
  }

  BreakdownGeneratorGraph.prototype = {

      /**
       * @param string riff - json string
       */
      draw: function(riff) {
        this.riff = JSON.parse(riff)
        this.empty()
        this.drawGuitar()
        this.drawInstruments()
      }

      /**
       * Generate the basic instruments' graph
       */
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

      /**
       * Generate the guitar's graph
       */
    , drawGuitar: function() {
        var self  = this
          , html  = ''
          , index = 0

        for (var i = 0; i < 8; i++) {
          html += '<td'
          // the guitar follows the kick pattern so we check with it
          if (self.riff.kick.indexOf(i) != -1) {
            html += ' class="filled'
            if (self.riff.guitar[index] === 1) {
              html += ' mute"'
            }
            else {
              html += ' plain"'
            }
            index++
          }
          html += '></td>'
        }

        self.guitar.insertAdjacentHTML('beforeend', html)
      }

      /**
       * Remove the existing tds
       */
    , empty: function() {
        this.allInstruments.forEach(function(element) {
          [].forEach.call(element.querySelectorAll('td'), function(td) {
            element.removeChild(td)
          })
        })
      }

      /**
       * Watch for changes in the table to regenerate a modified riff
       *
       * @param function cb - Callback function
       */
    , watch: function(cb) {
        // do sthi
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
