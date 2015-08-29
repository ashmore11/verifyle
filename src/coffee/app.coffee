Dots      = require './elements/dots'
Encrypted = require './elements/encrypted'

class APP

	constructor: ->

		# @dots      = new Dots
		@encrypted = new Encrypted

		@transitionIn()

	transitionIn: ->

		params = 
      autoAlpha: 1
      ease: Power1.easeInOut

    TweenMax.to document.getElementsByTagName('img'), 2, params

    setTimeout( =>

      params = 
        autoAlpha: 1
        ease: Power1.easeInOut

      TweenMax.to @dots.el, 2, params if @dots

    , 500 )

module.exports = new APP