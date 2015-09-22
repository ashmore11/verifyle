win = require 'utils/window'
RAF = require 'utils/raf'

module.exports = class Line

  constructor: ( @stage, @origin, @points ) ->

    @lines = new PIXI.Container

    for point in @points

      line = new PIXI.Graphics

      line.owner = point

      @lines.addChild line

    @stage.addChild @lines

    RAF.on 'update', @update

  update: =>

    for line, i in @lines.children

      line.clear()

      line.lineStyle 1, 0xffffff, 0.25

      if line.owner.y > win.height - ( line.owner.radius * 4 )
        
        line.alpha -= 0.01 unless line.alpha <= 0

      if @origin.y > win.height - ( @origin.radius * 2 )

        line.alpha -= 0.01 unless line.alpha <= 0

      if line.owner.y < 0 or @origin.y < 0

        params =
          alpha : 1
          ease  : Power2.easeInOut

        TweenMax.to line, 5, params

      line.moveTo @origin.x, @origin.y
      line.lineTo line.owner.x, line.owner.y