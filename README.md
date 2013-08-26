# Breakdown Generator

When you mix the nerdiness of html5 and Djent, you get the Breakdown Generator.

## What the fuck is that

When I am not coding, I am playing music. Like every developer I try to automate everything I do more than twice, so naturally I tried to automate music writing. Turns out, it's not a good idea. Who knew ?

## Usage

### Installation

#### Quick install

To quickly get started you can clone the repo and use it as a base.

    # Clone the repo
    $ git clone git@github.com:romainberger/breakdown-generator.git
    $ cd breakdown-generator

    # Install the dependencies
    $ npm install

    # Then start the development server
    $ grunt connect

You can then open your browser at the url [http://localhost:8000/](http://localhost:8000/) and do... whatever you want.

#### New project

To create a project from the beginning, you will need to add the library with a simple

    <script src="/js/breakdown-generator.js"></script>

### Methods

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

* export / import riff (json format) *work in progress*
* mix console for volume of each instruments
* record the audio to export
* MIDI file of the riff
