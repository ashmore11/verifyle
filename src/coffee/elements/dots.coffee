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

  constructor: ->
    
    win.on 'resize', @resize

    @createScene()

    @createCircles()
    # @createLines()
    @createGUI()

  createScene: ->

    params = 
      type      : 'SVGRenderer'
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
      radius = ( i % 6 ) + 1
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

      tween = new TWEEN.Tween ring

        .to( scale: 1.25, 1000 )
        .delay( i * 100 )
        .easing( TWEEN.Easing.Cubic.Out )
        .onComplete ->

          j++

          if j is 5

            for key, ring of circle.group.children

              k = 0

              tween = new TWEEN.Tween ring

                .to( scale: 1, 3000 )
                .easing( TWEEN.Easing.Cubic.InOut )
                .onComplete ->

                  k++

                  if k is 5

                    circle.group.animating = false

              tween.start()

      tween.start()

  update: ( frameCount, timeDelta ) =>

    if frameCount % settings.scaleTimer is 1
      
      @animateScale()
    
    circle.update() for circle in @circles
    lines.update()  for lines  in @lines

    TWEEN.update()

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
