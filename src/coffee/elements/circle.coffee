module.exports = class Circle

  win:
    w: $( window ).outerWidth()
    h: $( window ).outerHeight()

  x: 0
  y: 0

  group: null

  fallSpeed: 0

  constructor: ( @scene, @x, @y, @radius ) ->

    $(window).on 'resize', @resize

    @scene     = window.DOTS.scene
    @fallSpeed = Math.random() * 0.01 + 0.125

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
