settings = require 'settings'
win      = require 'utils/window'
mouse    = require 'utils/mouse'

module.exports = class Circle

  x: 0
  y: 0
  a: 0

  constructor: ( @stage, @x, @y, @radius ) ->

    @fallSpeed = Math.random() * ( @radius / 10 )

    @dot = new PIXI.Container

    circle = new PIXI.Graphics
    circle.beginFill "0xffffff", 1
    circle.drawCircle 0.5, 0.5, @radius * 2

    if @radius is 5 or @radius is 3
      circle.alpha = 1

    if @radius is 2
      circle.alpha = 0.5
    
    if @radius is 1
      circle.alpha = 0.25

    for i in [ 5..0 ] by -1

      switch @radius

        when 5
          opacity   = ( Math.random() * 0.5 ) + 0.25
          lineWidth = 1.5

        when 3
          opacity   = ( Math.random() * 0.5 ) + 0.25
          lineWidth = 1

        when 2
          opacity   = 0.5
          lineWidth = 1

        when 1
          opacity   = 0.25
          lineWidth = 0.5

      radius = ( i * @radius ) + @radius * 3

      ring = new PIXI.Graphics
      ring.beginFill "0xffffff", 0
      ring.lineStyle lineWidth, "0xffffff", 1
      ring.drawCircle 0, 0, radius
      ring.alpha = if i is 5 then 0.25 else opacity
      ring.type = 'ring'

      @dot.addChild ring

    @dot.x = @x
    @dot.y = @y

    @dot.addChild circle
    @stage.addChild @dot

  update: ->

    if @x > win.width + 50
      x = -50 
    else if @x < -50
      x = win.width + 50
    else
      x = @x
    
    if @y > win.height + 50 and @radius is 5 or @radius is 3 or @radius is 2
      y = -50 
    else
      y = @y

    if @y > win.height - 25 and @radius is 5 or @radius is 3 or @radius is 2
      @dot.alpha -= 0.005
    else
      @dot.alpha = 1

    if settings.infinite
      @x = x + ( mouse.x / settings.sensitivity ) * @radius
    else
      mouseNorm  = mouse.x / ( settings.sensitivity )
      @a        += ( mouseNorm - @a ) / 50
      @x        += ( mouseNorm - @a ) * @radius

    @y = y + @fallSpeed

    @dot.x = @x
    @dot.y = @y