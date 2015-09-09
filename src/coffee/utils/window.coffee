happens = require 'happens'

class Window

	window : $ window
	width  : 0
	height : 0

	constructor: ->

		happens @

		@window.on 'resize', @resize

		do @resize

	resize: =>

		@width  = @window.width()
		@height = @window.height()

		@emit 'resize'

module.exports = new Window