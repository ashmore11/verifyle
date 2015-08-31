win   = require 'utils/window'
mouse = require 'utils/mouse'

module.exports = class Circle

  x: 0
  y: 0
  a: 0
  
  fallSpeed : 0
  infinite  : false
  group     : null

  constructor: ( @scene, @x, @y, @radius ) ->

    @fallSpeed = Math.random() * ( @radius / 10 )

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
        opacity   = ( Math.random() * 0.5 ) + 0.25
        lineWidth = 1.5

      if i is 5 then opacity = 0.25

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

  update: ->

    if @x > win.width + 50
      x = -50 
    else if @x < -50
      x = win.width + 50
    else
      x = @x
    
    if @y > win.height + 50
      y = -50 
    else
      y = @y

    if @y > win.height - 25
      @group.opacity -= 0.005
    else
      @group.opacity = 1

    if @infinite
    
      @x = x + ( mouse.x / win.width ) * @radius
    
    else
      
      mouseNorm  = mouse.x / ( win.width / 2 )
      @a        += ( mouseNorm - @a ) / 50
      @x        += ( mouseNorm - @a ) * @radius

    @y = y + @fallSpeed

    @group.translation.set( @x, @y )