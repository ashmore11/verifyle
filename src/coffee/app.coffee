$ -> app = new APP

class APP

  win:
    w: $( window ).outerWidth()
    h: $( window ).outerHeight()

  mouse:
    x: 0
    y: 0

  Scene: null

  circles: []
  lines: []

  constructor: ->

    window.APP = @

    @el = document.getElementById 'scene'
    
    $(document).on 'mousemove', @mousemove

    @Scene = new Two( fullscreen: true, type: 'SVGRenderer' )

    @Scene.appendTo( @el )

    @createCircles()
    @createLines()
    @animateScale()
    @animateScene()

  createCircles: ->

    for i in [0...250]

      circle = new Circle
      x      = Math.random() * @win.w
      y      = Math.random() * @win.h
      radius = ( Math.random() * 30 ) + 5

      circle.makeCircle( x, y, radius )

      @circles.push circle

  createLines: ->

    for i in [0...6]

      line   = new Line
      origin = @circles[ Math.floor( Math.random() * @circles.length ) ]
      points = []

      for i in [0...3]
        
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

              tween.start()

      tween.start()

  animateScene: ->

    @RAF = @Scene.bind 'update', ( frameCount, timeDelta ) =>

      @animateScale() if frameCount % 50 is 1
      
      circle.update( @mouse ) for circle in @circles

      lines.update() for lines in @lines

      TWEEN.update()

    @RAF.play()

class Line

  win:
    w: $( window ).outerWidth()
    h: $( window ).outerHeight()

  origin: null
  points: []
  lines : []

  constructor: ->

    @scene = window.APP.Scene

  makeLine: ( @origin, @points ) ->

    for point in @points
      
      line = @scene.makeLine( @origin.x, @origin.y, point.x, point.y )

      line.stroke  = '#eee'
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

    @scene = window.APP.Scene

  makeCircle: ( @x, @y, @radius ) ->

    @group = @scene.makeGroup()
    @delta = new Two.Vector

    @fallSpeed = Math.random() * 3.05 + 1.05

    for i in [ 3..0 ] by -1

      radius = ( i * @radius ) + @radius * 2

      ring           = @scene.makeCircle( 0, 0, radius )
      ring.stroke    = randomColor( hue: 'monochrome', luminosity: 'light' )
      ring.linewidth = 1
      ring.opacity   = 1
      ring.type      = 'ring'
      ring.fill      = 'rgba(0,0,0,0)'

      if i is 3 then ring.fill = 'black'

      ring.addTo @group

    center           = @scene.makeCircle( 0, 0, @radius )
    center.fill      = '#eee'
    center.linewidth = 0
    center.type      = 'center'

    center.addTo @group

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

    if @x > @win.w + 50
      x = -50
    else if @x < -50
      x = @win.w + 50
    else
      x = @x

    if @y > @win.h + 50
      y = -50
    else
      y = @y

    @x = x + ( mouse.x / 10 ) / @radius
    @y = y + @fallSpeed

    @group.translation.set( @x, @y )
