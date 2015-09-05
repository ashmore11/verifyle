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
    @evilDots()
    @update()

  createScene: ->

    @renderer = new PIXI.autoDetectRenderer 600, 600, @options
    @stage    = new PIXI.Container

    @stage.x = 300
    @stage.y = 300

    @el.append @renderer.view

  bigRing: ->

    object = new PIXI.Graphics
    object.beginFill "0x000000", 0
    object.lineStyle 3, "0x000000", 1
    object.drawCircle 0, 0, @radius
    object.alpha = 1

    @stage.addChild object

  evilDots: ->

    for i in [0...@count]

      width = ( Math.random() * 15 ) + 5
      angle = ( i / ( @count / 2 ) ) * Math.PI

      object = new PIXI.Graphics
      object.beginFill "0x000000", 1
      object.drawCircle 0, 0, width
      object.alpha = Math.random()
      object.xDir  = ( Math.random() * 1 ) - 0.5
      object.yDir  = ( Math.random() * 1 ) - 0.5
      object.type  = 'evil-dot'
      object.angle = angle
      object.speed = ( Math.random() * 0.1 ) + 0.05

      @stage.addChild object
                                                
      x = ( @radius * Math.cos( angle ) ) + ( Math.random() * 100 ) - 50
      y = ( @radius * Math.sin( angle ) ) + ( Math.random() * 100 ) - 50

      object.x = x
      object.y = y

  update: ( time ) =>

    requestAnimationFrame @update

    @stats.begin()

    @renderer.render @stage

    for object in @stage.children

      if object.type is 'evil-dot'

        x = object.x
        y = object.y

        if x < 320 or x > 280 and y < 320 or y > 280

          object.alpha -= 0.001

          if object.alpha <= 0

            x = ( @radius * Math.cos( object.angle ) ) + ( Math.random() * 100 ) - 50
            y = ( @radius * Math.sin( object.angle ) ) + ( Math.random() * 100 ) - 50

            TweenMax.to object, 5, alpha: Math.random()

        object.x = x - ( object.speed * Math.cos( object.angle ) )
        object.y = y - ( object.speed * Math.sin( object.angle ) )

    @stats.end()

  createGUI: ->

    gui = new dat.GUI
