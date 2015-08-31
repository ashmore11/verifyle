module.exports = class Line

  origin: null
  points: []
  lines : []

  constructor: ( @scene, @origin, @points ) ->

    for point in @points
      
      line = @scene.makeLine( @origin.x, @origin.y, point.x, point.y )

      line.stroke  = 'rgba(255,255,255,0.5)'
      line.opacity = 1
      line.point   = point

      @lines.push line

  update: ->

    for line in @lines

      w2 = ( line.point.x - @origin.x ) / 2
      h2 = ( line.point.y - @origin.y ) / 2

      line.vertices[0].x = -w2
      line.vertices[0].y = -h2
      line.vertices[1].x = w2
      line.vertices[1].y = h2

      line.translation.set( @origin.x + w2, @origin.y + h2 )