# encoding: UTF-8

require 'fileutils'
require 'json'

# Helpers

def getPackageJson
  JSON.parse(IO.read('package.json'))
end

def version
  getPackageJson['version']
end

#Tasks

task :default => [:jshint]

task :build do
  puts 'Building Breakdown Generator'

  # remove old version
  Dir["dist/*.js"].each do |f|
    File.delete(f)
  end

  # copy and minify the sources
  FileUtils.copy("js/breakdown-generator.js", "dist/breakdown-generator-#{version}.js")
  FileUtils.copy("js/breakdown-generator-graph.js", "dist/breakdown-generator-graph-#{version}.js")

  system "uglifyjs dist/breakdown-generator-#{version}.js -o dist/breakdown-generator-#{version}.min.js"
  system "uglifyjs dist/breakdown-generator-graph-#{version}.js -o dist/breakdown-generator-graph-#{version}.min.js"

  # add version to uncompressed files
  Dir["dist/*-#{version}.js"].each do |filename|
    content = File.read(filename)
    File.open(filename, "w") do |f|
      content = content.gsub("<%= version %>", version)
      f.write(content)
    end
  end

  # add header with credits and version to minified
  Dir["dist/*.min.js"].each do |filename|
    content = File.read(filename)
    File.open(filename, "w") do |f|
      content = "/*! Breakdown Generator #{version} | https://github.com/romainberger/breakdown-generator */\n #{content}"
      f.write(content)
    end
  end

  puts "\033[32m✔   Done\033[39m"
end

task :jshint do
  files = [
    'js/breakdown-generator.js',
    'js/breakdown-generator-graph.js',
    'js/main.js'
  ]

  files.each do |f|
    system "jshint #{f}"
  end
end

task :test do
  # @todo
end
