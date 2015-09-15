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

    for line in @lines.children

      line.clear()

      line.lineStyle 1, '0xffffff', 0.5

      line.moveTo @origin.x, @origin.y
      line.lineTo line.owner.x, line.owner.y