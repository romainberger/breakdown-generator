# encoding: UTF-8

task :default => [:jshint]

task :build do
  puts 'Building Breakdown Generator'
  # copy and minify the source
  `cp js/breakdown-generator.js dist/breakdown-generator.js`
  # add header with credits and shit in minify version
  `uglifyjs dist/breakdown-generator.js -o dist/breakdown-generator.min.js`

  content = File.read('dist/breakdown-generator.min.js')
  File.open('dist/breakdown-generator.min.js', 'w') do |f|
    content = "/*! Breakdown Generator | https://github.com/romainberger/breakdown-generator */\n #{content}"
    f.write(content)
  end
  puts "\033[32m✔   Done\033[39m"
end

task :jshint do
  system "jshint js/breakdown-generator.js"
end

task :test do
  # @todo
end
