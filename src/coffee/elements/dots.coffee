Stats    = require 'utils/stats'
dat      = require 'dat-gui'
settings = require 'settings'
win      = require 'utils/window'
Circle   = require 'helpers/circle'
Line     = require 'helpers/line'

module.exports = class DOTS

  scene   : null
  el      : null
  circles : []
  lines   : []
  radii   : [5,3,2,2,1,1]

  largeCircles : []

  constructor: ->

    @el = $ '#dots'

    @createScene()

    @createCircles()
    @getLargeCircles()
    # @createLines()
    # @createGUI()

    @stats = new Stats

    @update()

  createScene: ->

    @renderer = new PIXI.autoDetectRenderer win.width, win.height, antialias: true, transparent: true
    @stage    = new PIXI.Container

    @renderer.resize win.width, win.height

    @el.append @renderer.view

  createCircles: ->

    for i in [0...100]
      
      x      = Math.random() * win.width
      y      = Math.random() * win.height
      radius = @radii[ i % 6 ]
      circle = new Circle( @stage, x, y, radius )

      @circles.push circle

  getLargeCircles: ->

    for circle in @circles

      if circle.radius is 5

        @largeCircles.push circle

  createLines: ->

    for i in [0...2]

      origin = @largeCircles[ Math.floor( Math.random() * @largeCircles.length ) ]
      points = []

      for j in [0...3]
        
        point = @largeCircles[ Math.floor( Math.random() * @largeCircles.length ) ]
        points.push point

      line = new Line @stage, origin, points
      
      @lines.push line

  animateScale: ->

    index  = Math.floor( Math.random() * @circles.length )
    circle = @circles[ index ]

    return if circle.animating

    circle.animating = true

    i = 0

    for ring in circle.dot.children

      i++
      j = 0

      params =
        x: 1.25
        y: 1.25
        easing: Power2.easeOut
        delay: i * 0.1
        onComplete: ->

          j++

          if j is 5

            for ring in circle.dot.children

              k = 0

              params =
                x: 1
                y: 1
                easing: Power2.easeInOut
                onComplete: ->

                  k++

                  if k is 5

                    circle.animating = false

              TweenMax.to ring.scale, 5, params

      TweenMax.to ring.scale, 1, params

  update: ( time ) =>

    requestAnimationFrame @update

    @stats.begin()

    @renderer.render @stage
    
    circle.update() for circle in @circles
    lines.update()  for lines  in @lines

    @animateScale() if Math.floor( time ) % settings.scaleTimer is 1

    @stats.end()

  createGUI: ->

    gui = new dat.GUI

    infinite    = gui.add( settings, 'infinite' )
    fallSpeed   = gui.add( settings, 'fallSpeed',  0, 3 )
    scaleTimer  = gui.add( settings, 'scaleTimer', 2, 50 )
    sensitivity = gui.add( settings, 'sensitivity', 500, 1500 )

    infinite.onChange ( change ) =>

      for circle in @circles

        circle.infinite = change

    fallSpeed.onChange ( change ) =>

      for circle in @circles

        speed = Math.random() * change

        circle.fallSpeed = speed

    scaleTimer.onChange ( change ) =>

      @scaleTimer = Math.floor( change )

    sensitivity.onChange ( change ) =>

      for circle in @circles

        circle.sensitivity = change
