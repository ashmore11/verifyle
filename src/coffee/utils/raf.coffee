happens = require 'happens'

class RAF

	constructor: ->

		happens @

		@update()

	update: ( time ) =>

		requestAnimationFrame @update

		@emit 'update', time

module.exports = new RAF