RAF = require 'utils/raf'

module.exports = class UNENCRYPTED

  width  : 700
  height : 700

  options:
    antialias   : true
    transparent : true

  count  : 200
  radius : 250
  speed  : 5

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

    @stage.x = @width / 2
    @stage.y = @height / 2

    @el.append @renderer.view

  bigRing: ->

    object = new PIXI.Graphics
    object.beginFill "0x000000", 0
    object.lineStyle 3, "0x000000", 1
    object.drawCircle 0, 0, @radius
    object.alpha = 1

    @stage.addChild object

  smallDots: ->

    @dots = new PIXI.Container

    for i in [0...@count]

      object = new PIXI.Graphics
      
      object.beginFill '0x000000', 1
      object.drawCircle 0, 0, ( Math.random() * 15 ) + 5

      object.type  = 'dot'
      object.alpha = Math.random() + 0.15
      object.angle = ( i / ( @count / 2 ) ) * Math.PI

      pos = ( ( Math.random() * @radius ) - @radius / 2 ) + 50
      r2  = @radius / 2

      object.x = ( r2 + pos ) * Math.cos( object.angle )
      object.y = ( r2 + pos ) * Math.sin( object.angle )

      @dots.addChild object

    @stage.addChild @dots

  animate: ->

    for object in @dots.children

      x = object.x
      y = object.y

      if x < 75 and x > -75 and y < 75 and y > -75

        object.alpha -= 0.001

        if object.alpha <= 0

          x = ( @radius + 50 ) * Math.cos( object.angle )
          y = ( @radius + 50 ) * Math.sin( object.angle )

          TweenMax.to object, 3, alpha: Math.random(), ease: Power2.easeIn

      object.x = x - ( ( @speed * 0.01 ) * Math.cos( object.angle ) )
      object.y = y - ( ( @speed * 0.01 ) * Math.sin( object.angle ) )

  update: ( time ) =>

    @renderer.render @stage

    @animate()
