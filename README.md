# Breakdown Generator

When you mix the nerdiness of html5 and Djent, you get the Breakdown Generator.

Demo: [http://romainberger.com/lab/breakdown-generator](http://romainberger.com/lab/breakdown-generator)

## What is this

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

To create a project from the beginning, you will need to add the library with a simple script tag. You will find in the `dist` folder the built and minified versions of the libraries.

    <script src="/js/breakdown-generator.js"></script>

### Methods

#### Initialization

    // Basic initialization
    var generator  = new BreakdownGenerator()

    // You can set a few options while calling the constructor
    var generator  = new BreakdownGenerator({
        tempo: 120
      , samplePath: 'path/to/samples/' // path to the samples. MUST end with a trailing slash. default to '../samples/'
    })

    // Call the init method to get started, you can then use then generator
    // be sure to use the callback function to be sure the samples are loaded
    generator.init(function(err) {
        if (err) {
            // something went wrong...
            return
        }

        // Place all your code using the generator here
    })

#### Have fun

    // Generate a riff
    generator.generateRiff()

    // Play the riff
    generator.play()

    // Set the generator's tempo
    generator.setTempo(120)

    // get the riff as JSON
    var riffJson = generator.getJson()

To see examples of every methods take a look inside [main.js](https://github.com/romainberger/breakdown-generator/blob/master/js/main.js).

#### Graph

Editing a riff with a json is kinda nerdy. Clicking on stuff is way easier. So you can generate a graph of you riff and edit it. To do so, include the `breakdown-generate-graph.js` file:

    <script src="/js/breakdown-generator-graph.js"></script>

You then have a bunch of method to poke around:

    // Create the graph
    // It uses an id as parameter, pointing to an empty div or whatever you want
    var graph = new BreakdownGenerateGraph('#riff-graph')

    // Generate the graph from a riff's json
    var riff = generator.getJson()
    graph.draw(riff)

    // To automatically edit the riff by clicking on the graph, call the watch method
    graph.watch()

Once again, every methods are used in [main.js](https://github.com/romainberger/breakdown-generator/blob/master/js/main.js) if you want to see working examples.

## Improvements

Some ideas that would be cool to implement:

* export / import riff (json format) - *work in progress*
* mix console for volume of each instruments
* record the audio to export
* MIDI file of the riff
