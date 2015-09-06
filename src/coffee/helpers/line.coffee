module.exports = class Line

  constructor: ( @stage, @origin, @points ) ->

    @lines = new PIXI.Container

    for point in @points

      line = new PIXI.Graphics
      line.lineStyle 1, '0xffffff', 0.25

      line.owner = point

      line.moveTo @origin.x, @origin.y
      line.lineTo point.x, point.y

      @lines.addChild line

    @stage.addChild @lines

  update: ->

    for line in @lines.children

      line.clear()

      line.lineStyle 1, '0xffffff', 0.25

      line.moveTo @origin.x, @origin.y
      line.lineTo line.owner.x, line.owner.y