/**
 * Breakdown Generator
 * https://github.com/romainberger/breakdown-generator
 *
 * @author Romain Berger <romain@romainberger.com>
 */

!function() {

  'use strict';

  var BreakdownGenerator = function(options) {
    this.context = false
    // stores the url to the samples
    // once the files are load they
    // store the sound
    this.snare = 'drums/snare.mp3'
    this.kick = 'drums/kick.mp3'
    this.china = 'drums/china.mp3'
    this.guitarMute = 'guitar/mute.mp3'
    this.guitarPlain = 'guitar/plain.mp3'

    this.riff = {
        snare:  [2, 6]
      , china:  [0, 2, 4, 6]
      , kick:   []
      , guitar: []
    }

    options = typeof options == 'object' ? options : {}
    this.tempo = options.tempo || 100
  }

  BreakdownGenerator.prototype = {

    // Creates the audio context
    init: function(cb) {
      if (typeof AudioContext !== 'undefined') {
        this.context = new AudioContext()
      }
      else if (typeof webkitAudioContext !== 'undefined') {
        this.context = new webkitAudioContext()
      }
      else {
        return cb(true)
      }

      this.context && this.loadSamples(cb)
    }

  , ready: function(cb) {
      cb()
    }

  , setTempo: function(tempo) {
      if (isNaN(tempo)) return
      this.tempo = tempo || 100
    }

    // Load a sample
  , loadSample: function(filename, cb) {
      var request = new XMLHttpRequest()
      request.open('GET', '../samples/'+filename, true)
      request.responseType = 'arraybuffer'
      request.onload = function() {
        cb(request.response)
      }
      request.send()
    }

    // sooooo ugly
    // but I am lazy I'll refactor later
    // I promise (no pun intended)
  , loadSamples: function(cb) {
      var self = this

      self.loadSample(self.snare, function(sample) {
        self.snare = sample

        self.loadSample(self.kick, function(sample) {
          self.kick = sample

          self.loadSample(self.guitarMute, function(sample) {
            self.guitarMute = sample

            self.loadSample(self.china, function(sample) {
              self.china = sample

              self.loadSample(self.guitarPlain, function(sample) {
                self.guitarPlain = sample
                self.ready(cb)
              })
            })
          })
        })
      })
    }

    // Plays a sound
  , readSound: function(sample, time) {
      var sound = this.context.createBufferSource()
        , soundBuffer = this.context.createBuffer(sample, false)
      sound.buffer = soundBuffer
      sound.connect(this.context.destination)
      sound.noteOn(time)
    }

    // Generate randoms kick/guitar notes
  , generateRiff: function() {
      // remove previous datas
      this.riff.kick = []
      this.riff.guitar = []

      // random kick
      var nbrOfKick = Math.floor(Math.random() * 12) + 4
      for (var i = 0; i < nbrOfKick; i++) {
        var beat = Math.floor(Math.random() * 9)
        // avoid duplicates
        if (this.riff.kick.indexOf(beat) == -1) {
          this.riff.kick.push(beat)
        }
      }
      // sort the kick for pretty output
      this.riff.kick.sort(function(a, b) {
        return a - b
      })

      // for each kick determines if we play open
      // or muted chords
      var self = this
      this.riff.kick.forEach(function(g) {
        var mute = Math.random() < 0.9 ? true : false
        if (mute) {
          self.riff.guitar.push(1)
        }
        else {
          self.riff.guitar.push(0)
        }
      })
    }

    // That's where the buziness happens
  , play: function() {
      var self = this
        , bar
        , nbrOfBar = 2
        , time
        , i
        , startTime = this.context.currentTime + 0.100
        , tempo = this.tempo
        , eighthNoteTime = (60 / tempo) / 2

      time = startTime + 1 * 8 * eighthNoteTime

      // play riff
      this.riff.snare.forEach(function(beat) {
        self.readSound(self.snare, time + parseInt(beat, 10) * eighthNoteTime)
      })

      this.riff.china.forEach(function(beat) {
        self.readSound(self.china, time + parseInt(beat, 10) * eighthNoteTime)
      })

      var beatIndex = 0
      this.riff.kick.forEach(function(beat) {
        self.readSound(self.kick, time + parseInt(beat, 10) * eighthNoteTime)

        // play mute / open guitar
        var mute = self.riff.guitar[beatIndex]
        if (mute) {
          self.readSound(self.guitarMute, time + parseInt(beat, 10) * eighthNoteTime)
        }
        else {
          self.readSound(self.guitarPlain, time + parseInt(beat, 10) * eighthNoteTime)
        }
        beatIndex++
      })
    }

  , getJson: function() {
      return JSON.stringify(this.riff)
    }

    /**
     * Loads a riff from a string
     * Must be in json format
     *
     * @returns object with status and message
     */
  , loadRiff: function(riff) {
      try {
        riff = JSON.parse(riff)
        this.riff = riff
        var result = {success: 1, error: 0}
      }
      catch(e) {
        var result = {
            success: 0
          , error: 1
          , message: 'Breakdown Geneator Error: Invalid riff format. You need to use a valid JSON string'
        }
      }

      return result
    }

  }

  if (typeof window != 'undefined') {
    window.BreakdownGenerator = BreakdownGenerator
  }

}();
