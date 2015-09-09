randomColor = require 'randomcolor'
win         = require 'utils/window'
RAF         = require 'utils/raf'
mouse       = require 'utils/mouse'

module.exports = class UNENCRYPTED

  width  : win.width
  height : win.height

  frameCount: 0

  options:
    antialias   : true
    transparent : true
    autoResize  : true

  count  : 2000
  radius : 1000
  speed  : 500

  x  : 0
  y  : 0
  x1 : 0
  y1 : 0

  constructor: ->

    @el = $ '#unencrypted'

    return unless @el

    @createScene()
    @bigRing()
    @smallDots()

    RAF.on 'update', @update

  createScene: ->

    @renderer = new PIXI.autoDetectRenderer @width, @height, @options
    @stage    = new PIXI.Container

    @stage.x = mouse.x + ( win.width  / 2 )
    @stage.y = mouse.y + ( win.height / 2 )

    @el.append @renderer.view

  bigRing: ->

    object = new PIXI.Graphics
    object.beginFill "0xffffff", 0
    object.lineStyle 3, "0xffffff", 0
    object.drawCircle 0, 0, @radius
    object.alpha = 1

    @stage.addChild object

  smallDots: ->

    @dots = new PIXI.Container

    for i in [0...@count]

      object = new PIXI.Graphics
      color  = randomColor( luminosity: 'light', format: 'hex' ).split('#')[1]

      object.radius = ( Math.random() * 20 ) + 5
      object.beginFill "0x#{color}", 1
      object.drawCircle 0, 0, object.radius

      object.alpha = Math.random() + 0.15
      object.angle = ( i / ( @count / 2 ) ) * Math.PI

      pos = ( ( Math.random() * @radius ) - @radius / 2 ) + 50
      r2  = @radius / 2

      object.x = ( r2 + pos ) * Math.cos( object.angle )
      object.y = ( r2 + pos ) * Math.sin( object.angle )

      @dots.addChild object

    @stage.addChild @dots

  animate: ->

    @stage.rotation += 0.01

    # @stage.x += ( ( mouse.x + ( win.width  / 2 ) ) - @stage.x ) / 30
    # @stage.y += ( ( mouse.y + ( win.height / 2 ) ) - @stage.y ) / 30

    for object in @dots.children

      x = object.x
      y = object.y

      if x < 75 and x > -75 and y < 75 and y > -75

        object.alpha -= 0.2

        if object.alpha <= 0

          x = ( @radius + 50 ) * Math.cos( object.angle )
          y = ( @radius + 50 ) * Math.sin( object.angle )

          TweenMax.to object, 3, alpha: Math.random(), ease: Power2.easeIn

      object.x = x - ( ( @speed * 0.01 ) * Math.cos( object.angle ) )
      object.y = y - ( ( @speed * 0.01 ) * Math.sin( object.angle ) )

      object.x += ( Math.random() * 5 ) - 2.5
      object.y += ( Math.random() * 5 ) - 2.5

  update: =>

    @renderer.render @stage

    @animate()
