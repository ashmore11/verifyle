happens = require 'happens'

class Mouse

	doc : $ document
	x   : 0
	y   : 0

	constructor: ->

		happens @

		@doc.on 'mousemove', @mousemove

	mousemove: ( event ) =>

    @x = event.pageX - ( $(window).width() / 2 )
    @y = event.pageY - ( $(window).height() / 2 )

    @emit 'move'

module.exports = new Mouse