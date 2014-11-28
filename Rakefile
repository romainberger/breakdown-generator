# encoding: UTF-8

task :default => [:jshint]

task :build do
  puts 'Building Breakdown Generator'
  # copy and minify the source
  `cp js/breakdown-generator.js dist/breakdown-generator.js`
  `./node_modules/.bin/uglifyjs dist/breakdown-generator.js -o dist/breakdown-generator.min.js`

  # add header with credits and shit in minify version
  content = File.read('dist/breakdown-generator.min.js')
  File.open('dist/breakdown-generator.min.js', 'w') do |f|
    content = "/*! Breakdown Generator | https://github.com/romainberger/breakdown-generator */\n #{content}"
    f.write(content)
  end
  puts "\033[32m✔   Done\033[39m"
end

task :jshint do
  files = ['js/breakdown-generator.js', 'js/main.js']

  files.each do |f|
    system "jshint #{f}"
  end
end

task :test do
  # @todo
end
