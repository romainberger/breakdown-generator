
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          keepalive: true
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-connect');
}
