Settings = require 'settings'
Stats    = require 'utils/stats'
dat      = require 'dat-gui'
win      = require 'utils/window'

module.exports = class UNENCRYPTED

  scene : null

  width  : 600
  height : 600

  options:
    antialias   : true
    transparent : true

  count  : 200
  radius : 200

  constructor: ->

    @el = $ '#unencrypted'

    @stats = new Stats

    @createScene()
    @bigRing()
    @smallDots()
    @update()

  createScene: ->

    @renderer = new PIXI.autoDetectRenderer 600, 600, @options
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
      object.speed = 0.05
      object.angle = ( i / ( @count / 2 ) ) * Math.PI

      pos = ( ( Math.random() * 200 ) - 100 ) + 50
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

      object.x = x - ( object.speed * Math.cos( object.angle ) )
      object.y = y - ( object.speed * Math.sin( object.angle ) )

  update: ( time ) =>

    requestAnimationFrame @update

    @stats.begin()

    @renderer.render @stage

    @animate()

    @stats.end()

  createGUI: ->

    gui = new dat.GUI
