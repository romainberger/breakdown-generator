# encoding: UTF-8

task :build do
  puts 'Building Breakdown Generator'
  # copy and minify the source
  # @todo use a version thing to bump in the file
  # and in the filename
  `cp js/breakdown-generator.js dist/breakdown-generator.js`
  # add header with credits and shit in minify version
  `uglifyjs dist/breakdown-generator.js -o dist/breakdown-generator.min.js`
  puts "\033[32m✔   Done\033[39m"
end
