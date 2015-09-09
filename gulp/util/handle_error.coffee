gutil = require 'gulp-util'

module.exports = (err) ->
	gutil.log err
	gutil.beep()
	this.emit 'end'