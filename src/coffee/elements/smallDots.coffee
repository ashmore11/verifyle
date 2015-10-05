win      = require 'utils/window'
RAF      = require 'utils/raf'
Circle   = require 'helpers/circle'

module.exports = class SMALLDOTS

  options :
    resolution  : 1
    transparent : true

  el: null

  constructor: ->

    @el = $ '#small-dots'

    return unless @el

    @createScene()

    @createCircles()

    RAF.on 'update', @update

  createScene: ->

    @renderer = new PIXI.CanvasRenderer win.width, win.height, @options
    @stage    = new PIXI.Container

    @el.append @renderer.view

  createCircles: ->

    for i in [0...30]
      
      x = Math.random() * win.width
      y = Math.random() * win.height

      circle = new Circle( @stage, x, y, 1 )

  update: ( time ) =>

    @renderer.render @stage
