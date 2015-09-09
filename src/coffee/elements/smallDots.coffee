win      = require 'utils/window'
RAF      = require 'utils/raf'
Circle   = require 'helpers/circle'

module.exports = class SMALLDOTS

  el      : null
  circles : []

  constructor: ->

    @el = $ '#small-dots'

    return unless @el

    @createScene()

    @createCircles()

    RAF.on 'update', @update

  createScene: ->

    @renderer = new PIXI.autoDetectRenderer win.width, win.height, antialias: true, transparent: true
    @stage    = new PIXI.Container

    @el.append @renderer.view

  createCircles: ->

    for i in [0...30]
      
      x      = Math.random() * win.width
      y      = Math.random() * win.height
      circle = new Circle( @stage, x, y, 1 )

      @circles.push circle

  update: ( time ) =>

    @renderer.render @stage
    
    circle.update() for circle in @circles
