Circle = require './circle'
Line   = require './line'

module.exports = class DOTS

  win:
    w: $( window ).outerWidth()
    h: $( window ).outerHeight()

  mouse:
    x: 0
    y: 0

  scene: null
  el   : null

  circles: []
  lines: []

  constructor: ->

    window.DOTS = @
    
    $(document).on 'mousemove', @mousemove
    $(window).on 'resize', @resize

    params = 
      width : @win.w
      height: @win.h + 100

    @scene = new Two params, type: 'SVGRenderer'
    @el    = document.getElementById 'dots'

    @scene.appendTo( @el )

    @createCircles()
    # @createLines()
    @animateScene()

  createCircles: ->

    for i in [0...60]
      
      x      = Math.random() * @win.w
      y      = Math.random() * @win.h
      radius = ( Math.random() * 5 ) + 1
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

  mousemove: ( event ) =>

    @mouse =
      x: ( event.pageX - ( @win.w / 2 ) )
      y: ( event.pageY - ( @win.h / 2 ) )

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

              tween = new TWEEN.Tween ring

                .to( scale: 1, 3000 )
                .easing( TWEEN.Easing.Cubic.InOut )
                .onComplete ->

                  circle.group.animating = false

              tween.start()

      tween.start()

  animateScene: ->

    @RAF = @scene.bind 'update', ( frameCount, timeDelta ) =>

      # if frameCount % 25 is 1

      #   @animateScale()
      
      for circle in @circles

        circle.update( @mouse )

      for lines in @lines

        lines.update()

      TWEEN.update()

    @RAF.play()

  resize: =>

    @win =
      w: $( window ).outerWidth()
      h: $( window ).outerHeight()

    @scene.width = @win.w
