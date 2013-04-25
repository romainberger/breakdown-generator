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
    this.guitarMute = 'guitar/mute.mp3'
    this.guitarPlain = 'guitar/plain.mp3'
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
              self.displayReady()
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
        , nbrOfBar = 2
        , time
        , i
        , startTime = this.context.currentTime + 0.100
        , tempo = parseInt($('#tempo').val())
        , eighthNoteTime = (60 / tempo) / 2
        // random magic
        , randStart = Math.floor(Math.random() * 100) + 25
        , randEnd = Math.floor(Math.random() * 240) + 120
        , randKick = Math.floor(Math.random() * randEnd) + randStart
        , randInt
        , timePlaying = 120 / tempo * nbrOfBar * 2

      // Randomly call the kick / guitar function
      // really ugly there is probably
      // a better way to do this
      randInt = setInterval(function() {
        // skip some kick
        var really = (Math.random() * 9 + 4) / 10
        var reallyReally = Math.random() < really ? true : false
        reallyReally && self.playRandom(randKick)
      }, randKick)
      setTimeout(function() {
        clearInterval(randInt)
      }, timePlaying * 1000)

      for (bar = 0; bar < nbrOfBar; bar++) {
        time = startTime + bar * 8 * eighthNoteTime;

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

    // play the kick and guitar samples
  , playRandom: function(rand) {
      this.readSound(this.kick, 0)

      // // do we play the mute or plain version ?
      // mute = Math.random() < .5 ? true : false
      // if (mute) {
      //   this.readSound(this.guitarMute)
      // }
      // else {
      //   this.readSound(this.guitarPlain)
      // }
    }

    // Cheap way to tell the user
    // everything is ready
  , displayReady: function() {
      loading.hide()
      playButton.show()
    }

  , showPlaying: function() {
      playButton.hide()
      playingText.show()
    }

  , donePlaying: function() {
      playingText.hide()
      playButton.show()
    }

  }


  var app = new App
    , loading
    , playButton
    , playingText

  $(document).ready(function() {

    loading = $('#loading')
    playButton = $('#play')
    playingText = $('#playing')
    app.init()

    playButton.click(function() {
      app.play()
    })

  })

}(window.jQuery);
