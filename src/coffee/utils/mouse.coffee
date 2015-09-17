happens = require 'happens'
win     = require 'utils/window'

class Mouse

	doc : $ document
	x   : 0
	y   : 0

	constructor: ->

		happens @

		@doc.on 'mousemove', @mousemove

	mousemove: ( event ) =>

    @x = event.pageX - ( win.width  / 2 )
    @y = event.pageY - ( win.height / 2 )

    @emit 'move'

module.exports = new Mouse