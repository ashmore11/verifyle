module.exports = class ENCRYPTED

  scene  : null
  radius : 100

  params:
    type      : 'SVGRenderer'
    width     : 500
    height    : 500
    autostart : true

  constructor: ->

    @$el = $ '#encryption'

    @createScene()
    @makeCircle()
    @importShape()

  createScene: ->

    @scene = new Two @params
    @el    = document.getElementById 'encrypted'

    @scene.appendTo( @el )

    @scene.bind 'update', @update

  makeCircle: ->

    @group = @scene.makeGroup()
    @group.animating = false

    center           = @scene.makeCircle( 0, 0, @radius )
    center.fill      = '#eee'
    center.linewidth = 0
    center.type      = 'center'

    center.addTo @group

    j = @radius

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

    i = 0

    for key, object of @group.children

      i++

      params = 
        rotation : 180
        delay    : i * 100
        ease     : Power1.easeInOut

      TweenMax.to object, 5, params

  importShape: ->

    el = document.getElementById('assets').children[0]

    @complexShape = @scene.interpret( el ).center()

    @complexShape.translation.set( @$el.width() / 2, @$el.height() / 2 )

    @complexShape.opacity = 0.8

    @displaceVertices()

  displaceVertices: ->

    for key, child of @complexShape.children

      for key, object of child.children

        x = ( Math.random() * 200 ) - 100
        y = ( Math.random() * 200 ) - 100

        object.translation.x = x
        object.translation.y = y
        object.opacity       = 0

        params = 
          x    : 0
          y    : 0
          ease : Power1.easeInOut

        TweenMax.to object.translation, 5, params

        params = 
          opacity : 1
          ease    : Power1.easeInOut

        TweenMax.to object, 5, params

  update: ( frameCount, timeDelta ) =>

    @complexShape.rotation += 0.001
    
    @complexShape.scale = 0.02 * Math.sin( frameCount / 20 ) + 0.54
