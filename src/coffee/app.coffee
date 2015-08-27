$ -> new DOTS

class DOTS

  win:
    w: $( window ).outerWidth()
    h: $( window ).outerHeight()

  mouse:
    x: 0
    y: 0

  scene: null

  circles: []
  lines: []

  constructor: ->

    window.DOTS = @
    
    $(document).on 'mousemove', @mousemove
    $(window).on 'resize', @resize

    params = 
      width : @win.w
      height: @win.h + 100

    @scene = new Two( params, type: 'SVGRenderer' )
    @el    = document.getElementById 'scene'

    @scene.appendTo( @el )

    @createCircles()
    # @createLines()
    @animateScale()
    @animateScene()

    params = 
      autoAlpha: 1
      ease: Power1.easeInOut

    TweenMax.to document.getElementsByTagName('img'), 2, params

    setTimeout( =>

      params = 
        autoAlpha: 1
        ease: Power1.easeInOut

      TweenMax.to @el, 2, params

    , 500 )

  createCircles: ->

    for i in [0...60]

      circle = new Circle
      x      = Math.random() * @win.w
      y      = Math.random() * @win.h
      radius = ( Math.random() * 5 ) + 1

      circle.makeCircle( x, y, radius )

      @circles.push circle

  createLines: ->

    for i in [0...1]

      line   = new Line
      origin = @circles[ Math.floor( Math.random() * @circles.length ) ]
      points = []

      for j in [0...3]
        
        point = @circles[ Math.floor( Math.random() * @circles.length ) ]
        points.push point

      line.makeLine origin, points
      
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

      @animateScale() if frameCount % 25 is 1
      
      circle.update( @mouse ) for circle in @circles

      lines.update() for lines in @lines

      TWEEN.update()

    @RAF.play()

  resize: =>

    @win =
      w: $( window ).outerWidth()
      h: $( window ).outerHeight()

    @scene.width = @win.w

class Line

  origin: null
  points: []
  lines : []

  constructor: ->

    @scene = window.DOTS.scene

  makeLine: ( @origin, @points ) ->

    for point in @points
      
      line = @scene.makeLine( @origin.x, @origin.y, point.x, point.y )

      line.stroke  = 'rgba(255,255,255,0.5)'
      line.opacity = 1
      line.point   = point

      @lines.push line

  update: ->

    for line in @lines

      w2 = ( line.point.x - @origin.x ) / 2
      h2 = ( line.point.y - @origin.y ) / 2

      line.vertices[0].x = -w2
      line.vertices[0].y = -h2
      line.vertices[1].x = w2
      line.vertices[1].y = h2

      line.translation.set( @origin.x + w2, @origin.y + h2 )

class Circle

  win:
    w: $( window ).outerWidth()
    h: $( window ).outerHeight()

  x: 0
  y: 0

  group: null

  fallSpeed: 0

  constructor: ->

    $(window).on 'resize', @resize

    @scene     = window.DOTS.scene
    @fallSpeed = Math.random() * 0.01 + 0.125

  makeCircle: ( @x, @y, @radius ) ->

    @group = @scene.makeGroup()
    @group.animating = false

    center           = @scene.makeCircle( 0, 0, @radius * 2 )
    center.fill      = '#eee'
    center.linewidth = 0
    center.type      = 'center'

    if @radius < 2
      center.opacity = 0.5
    else
      center.opacity = 1

    center.addTo @group

    for i in [ 5..0 ] by -1

      if @radius < 2
        opacity   = 0.5
        lineWidth = 0.5
      else
        opacity   = ( 0.175 * -i ) + 1
        lineWidth = 1.5

      radius = ( i * @radius ) + @radius * 3

      ring           = @scene.makeCircle( 0, 0, radius )
      ring.stroke    = '#eee'
      ring.linewidth = lineWidth
      ring.opacity   = opacity
      ring.fill      = 'rgba(0,0,0,0)'
      ring.type      = 'ring'

      ring.addTo @group

    @group.opacity = 0.1
    

    @group.translation.set( @x, @y )

  randomRing: ->

    ids = []

    for key of @group.children

      ids.push key

    index = Math.floor( Math.random() * ids.length )
    
    if index is 0
    
      index = index + 1

    if index is ids.length - 1

      index = index - 1

    ring = @group.children[ ids[ index ] ]

    return ring

  update: ( mouse ) ->

    if @x > @win.w + 50 then x = -50 else if @x < -50 then x = @win.w + 50 else x = @x
    if @y > @win.h + 50 then y = -50 else y = @y

    if @y > @win.h - 25
      @group.opacity -= 0.005
    else
      @group.opacity = 1

    @x = x + ( mouse.x / 3000 ) / @radius
    @y = y + @fallSpeed

    @group.translation.set( @x, @y )

  resize: =>

    @win =
      w: $( window ).outerWidth()
      h: $( window ).outerHeight()

    @scene.width = @win.w
