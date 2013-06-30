# Breakdown Generator

When you mix the nerdiness of html5 and Djent, you get the Breakdown Generator.

## What the fuck is that

When I am not coding, I am playing music. Like every developer I try to automate everything I do more than twice, so naturally I tried to automate music writing. Turns out, it's not a good idea. Who knew ?

## Usage

### Installation

Download the library and the samples or use your own samples. Your tree must be like this (you can change it easily by modifying the library):

```
    .
    |-- js
    |  |-- breakdown-generator.js
    |-- samples
    |  |-- drums
    |  |  |-- kick.mp3
    |  |  |-- snare.mp3
    |  |  |-- china.mp3
    |  |-- guitar
    |  |  |-- mute.mp3
    |  |  |-- plain.mp3

```

Include the library:

```
    <script src="js/breakdown-generator.js"></script>
```

Then go crazy.

```
    var generator = new BreakdownGenerator

    // init the generator
    generator.init(function(err) {
        if (err) {
            // throw an error if the browser
            // does not support the web audio API
            console.log('Your browser sucks')
            return
        }

        // if everything is ok, place your code here
        // Start by generating a riff
        $.proxy(generator.generateRiff(), generator)

        // then play it
        $.proxy(generator.play(), generator)
    })
```

### Method

```
    // Generate a riff
    generator.generateRiff()

    // Play the riff
    generator.play()

    // Set the generator's tempo
    generator.setTempo(120)

    // get the riff as JSON
    var riffJson = generator.getJson()
```

## Improvements

Some ideas that would be cool to implement:

* mix console for volume of each instruments
* record the audio to export
* MIDI file of the riff
