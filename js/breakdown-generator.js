/*! Breakdown Generator */

!function($) {

  'use strict'

  var App = function() {
    this.context = false
    // stores the url to the samples
    // once the files are load they
    // store the sound
    this.snare = 'drums/snare.mp3'
    this.kick = 'drums/kick.mp3'
    this.china = 'drums/china.mp3'
    this.guitar = 'guitar/e.mp3'
  }

  App.prototype = {

    // Creates the audio context
    init: function() {
      if (typeof AudioContext !== 'undefined') {
        this.context = new AudioContext()
      }
      else if (typeof webkitAudioContext !== 'undefined') {
        this.context = new webkitAudioContext()
      }
      else {
          throw new Error('Go get a real browser dude')
      }

      this.context && this.loadSamples()
    }

    // Load a sample
  , loadSample: function(filename, cb) {
      var request = new XMLHttpRequest
      request.open('GET', '../samples/'+filename, true)
      request.responseType = 'arraybuffer'
      request.onload = function() {
        cb(request.response)
      }
      request.send()
    }

    // Load the samples and store them
    // sooooo ugly
    // but I am lazy I'll refactor later
    // I promise. no pun intended
  , loadSamples: function() {
      var self = this

      // CALLBACK HELL !!!
      self.loadSample(self.snare, function(sample) {
        self.snare = sample

        self.loadSample(self.kick, function(sample) {
          self.kick = sample

          self.loadSample(self.guitar, function(sample) {
            self.guitar = sample

            self.loadSample(self.china, function(sample) {
              self.china = sample
              self.play()
            })
          })
        })
      })
    }

  , readSound: function(sample, time) {
      var sound = this.context.createBufferSource()
      var soundBuffer = this.context.createBuffer(sample, false)
      sound.buffer = soundBuffer
      sound.connect(this.context.destination)
      sound.noteOn(time)
    }

  , play: function() {
      var self = this
        , bar
        , time
        , i
        , startTime = this.context.currentTime+0.100
        , tempo = 80
        , eighthNoteTime = (60 / tempo) / 2

      for (bar = 0; bar < 2; bar++) {
        time = startTime + bar * 8 * eighthNoteTime;
        // Kick on beats 1, 5
        self.readSound(self.kick, time)
        self.readSound(self.kick, time + 4 * eighthNoteTime)

        // Snare on beats 3, 7
        self.readSound(self.snare, time + 2 * eighthNoteTime)
        self.readSound(self.snare, time + 6 * eighthNoteTime)

        // China everyfuckingwhere
        self.readSound(self.china, time)
        self.readSound(self.china, time + 2 * eighthNoteTime)
        self.readSound(self.china, time + 4 * eighthNoteTime)
        self.readSound(self.china, time + 6 * eighthNoteTime)
      }
    }

  }


  var app = new App
  app.init()

}(window.jQuery);
