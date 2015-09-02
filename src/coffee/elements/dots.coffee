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
  radii   : [6,4,3,2,2,1]

  constructor: ->
    
    win.on 'resize', @resize

    @createScene()

    @createCircles()
    # @createLines()
    @createGUI()

    @stats = new Stats

  createScene: ->

    types =
      webgl  : 'WebGLRenderer'
      svg    : 'SVGRenderer'
      canvas : 'CanvasRenderer'

    params = 
      type      : types.svg
      width     : win.width
      height    : win.height + 100
      autostart : true

    @scene = new Two params
    @el    = document.getElementById 'dots'

    @scene.appendTo( @el )

    @scene.bind 'update', @update

  createCircles: ->

    for i in [0...100]
      
      x      = Math.random() * win.width
      y      = Math.random() * win.height
      radius = @radii[ i % 6 ]
      circle = new Circle( @scene, x, y, radius )

      @circles.push circle

  createLines: ->

    for i in [0...1]

      origin = @circles[ Math.floor( Math.random() * @circles.length ) ]
      points = []

      for j in [0...3]
        
        point = @circles[ Math.floor( Math.random() * @circles.length ) ]
        points.push point

      line = new Line @scene, origin, points
      
      @lines.push line

  animateScale: ->

    index  = Math.floor( Math.random() * @circles.length )
    circle = @circles[ index ]

    return if circle.group.animating

    circle.group.animating = true

    i = 0

    for key, ring of circle.group.children

      i++
      j = 0

      params =
        scale: 1.25
        easing: Power2.easeOut
        delay: i * 0.1
        onComplete: ->

          j++

          if j is 5

            for key, ring of circle.group.children

              k = 0

              params =
                scale: 1
                easing: Power2.easeInOut
                onComplete: ->

                  k++

                  if k is 5

                    circle.group.animating = false

              TweenMax.to ring, 5, params

      TweenMax.to ring, 1, params

  update: ( frameCount, timeDelta ) =>

    @stats.begin()

    if frameCount % settings.scaleTimer is 1
      
      @animateScale()
    
    circle.update() for circle in @circles
    lines.update()  for lines  in @lines

    TWEEN.update()

    @stats.end()

  resize: =>

    @scene.width = win.width

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
