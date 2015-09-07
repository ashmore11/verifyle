gulp 		    = require 'gulp'
livereload  = require 'gulp-livereload'
webpack     = require 'gulp-webpack'
gulpif      = require 'gulp-if'
uglify      = require 'gulp-uglify'
rename      = require 'gulp-rename'
handleError = require '../util/handle_error'

production  = process.env.NODE_ENV is 'production'
development = process.env.NODE_ENV is 'development'
base_path   = process.env.PWD

exports.paths =
	source      : './src/coffee/app.coffee'
	watch       : './src/coffee/*.coffee'
	destination : './public/js/'
	filename    : 'elements.js'

gulp.task 'scripts', ->
	
	gulp.src exports.paths.source

		.pipe webpack require( base_path + '/webpack.config' )
		.pipe gulpif production, uglify()
		.pipe rename exports.paths.filename
		.pipe gulp.dest exports.paths.destination
		.pipe gulpif development, livereload()

		.on 'error', handleError