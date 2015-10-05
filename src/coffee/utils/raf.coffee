happens  = require 'happens'

(->
	lastTime = 0
	vendors = ["ms", "moz", "o"]
	x = 0

	while x < vendors.length and not window.requestAnimationFrame
		window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"]
		window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] or window[vendors[x] + "CancelRequestAnimationFrame"]
		++x

	unless window.requestAnimationFrame
		window.requestAnimationFrame = (callback, element) ->
			currTime = new Date().getTime()
			timeToCall = Math.max(0, 16 - (currTime - lastTime))
			id = window.setTimeout(->
				callback currTime + timeToCall
			, timeToCall)
			lastTime = currTime + timeToCall
			id

	unless window.cancelAnimationFrame
		window.cancelAnimationFrame = (id) ->
			clearTimeout id
)()

class RAF

	id_animloop : null

	constructor: ( ) ->

		happens @

		@start()

	start: ( ) ->

		@id_animloop = window.requestAnimationFrame @animloop

	stop: ( ) ->

		window.cancelAnimationFrame @id_animloop
		
		@id_animloop = null

	animloop: ( time ) =>
 
		@id_animloop = window.requestAnimationFrame @animloop

		@emit 'update', time

module.exports = new RAF