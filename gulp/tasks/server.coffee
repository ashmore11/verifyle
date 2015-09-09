gulp 	   = require 'gulp'
ecstatic = require 'ecstatic'

gulp.task 'server', ->
	require('http')
		.createServer ecstatic root: __dirname + '/../../public'
		.listen 3000