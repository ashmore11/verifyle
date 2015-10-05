RAF = require 'utils/raf'

module.exports = class ENCRYPTED

  width  : 600
  height : 600

  options:
    transparent : true
    resolution  : 1

  radius : 100

  constructor: ->

    @el = $ '#encrypted'

    return unless @el

    @createScene()
    @makeCircle()
    @importShape()

    RAF.on 'update', @update

  createScene: ->

    @renderer = new PIXI.CanvasRenderer 600, 600, @options
    @stage    = new PIXI.Container

    @stage.x = @width / 2
    @stage.y = @height / 2

    @el.append @renderer.view

  makeCircle: ->

    @dot = new PIXI.Container

    circle = new PIXI.Graphics
    circle.beginFill "0xffffff", 1
    circle.drawCircle 0, 0, @radius

    j = @radius

    for i in [ 5..0 ] by -1

      j = j + 24

      ring = new PIXI.Graphics
      ring.lineStyle 1.5, "0xffffff", 1
      ring.drawCircle 0, 0, j
      ring.alpha = ( Math.random() * 0.5 ) + 0.25
      ring.type = 'ring'

      @dot.addChild ring

    @dot.addChild circle
    @stage.addChild @dot

  importShape: ->

    @complexShape = new PIXI.Container

    texture = PIXI.Texture.fromImage 'images/shape.png'
    sprite  = new PIXI.Sprite texture

    sprite.alpha = 0.4

    sprite.x = -102
    sprite.y = -102

    sprite.scale.x = 0.52
    sprite.scale.y = 0.52

    @complexShape.addChild sprite
    @stage.addChild @complexShape

  animate: ( time ) ->

    @complexShape.rotation += 0.001
    
    @complexShape.scale.x = 0.02 * Math.sin( time / 300 ) + 1
    @complexShape.scale.y = 0.02 * Math.sin( time / 300 ) + 1

    for object in @dot.children

      if object.type is 'ring'

        object.alpha -= 0.005

        if object.alpha <= 0.1

          TweenMax.to object, 3, alpha: ( Math.random() * 0.8 ) + 0.2

  update: ( time ) =>

    @renderer.render @stage

    @animate( time )