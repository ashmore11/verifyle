gulp 	     = require 'gulp'
livereload = require 'gulp-livereload'

production = process.env.NODE_ENV is 'production'

paths = 
	scripts : require('./scripts').paths

gulp.task "watch", ->

	livereload.listen()

	gulp.watch paths.scripts.watch, ['scripts']