module.exports = class ENCRYPTED

  scene: null

  constructor: ->

    params = 
      width : 500
      height: 500

    @scene = new Two params, type: 'SVGRenderer'
    @el    = document.getElementById 'encryption'
    @$el   = $ '#encryption'

    @scene.appendTo( @el )

    @makeCircle 100
    @importShape()

    @update()

  makeCircle: ( radius ) ->

    @group = @scene.makeGroup()
    @group.animating = false

    center           = @scene.makeCircle( 0, 0, radius )
    center.fill      = '#eee'
    center.linewidth = 0
    center.type      = 'center'

    center.addTo @group

    j = radius

    for i in [ 5..0 ] by -1

      j = j + 20

      if i is 0 or i is 2 or i is 5
        opacity = 0.4
      else
        opacity = 0.8

      ring           = @scene.makeCircle( 0, 0, j )
      ring.stroke    = '#eee'
      ring.linewidth = 1.5
      ring.opacity   = opacity
      ring.fill      = 'rgba(0,0,0,0)'
      ring.type      = 'ring'

      ring.addTo @group

    @group.opacity = 1

    @group.translation.set( @$el.width() / 2, @$el.height() / 2 )

  importShape: ->

    el = document.getElementById('assets').children[0]

    @complexShape = @scene.interpret( el ).center()

    @complexShape.translation.set( @$el.width() / 2, @$el.height() / 2 )

    @complexShape.opacity = 0.8

  update: ->

    @RAF = @scene.bind 'update', ( frameCount, timeDelta ) =>

      @complexShape.rotation += 0.001
      
      @complexShape.scale = 0.02 * Math.sin( frameCount / 20 ) + 0.54

    @RAF.play()