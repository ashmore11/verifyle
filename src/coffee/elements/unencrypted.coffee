Stats = require 'stats-js'

module.exports = class UNENCRYPTED

  scene : null
  group : null
  ring  : null

  params:
    type      : 'SVGRenderer'
    width     : 600
    height    : 600
    autostart : true

  radius: 200

  constructor: ->

    @$el = $ '#unencrypted'

    @createScene()
    @bigRing()
    @evilDots()
    @createStats()

  createScene: ->

    @scene = new Two @params
    @el    = document.getElementById 'unencrypted'

    @scene.appendTo( @el )

    @scene.bind 'update', @update

    @group = @scene.makeGroup()

    @group.translation.set( @$el.width() / 2, @$el.height() / 2 )

  bigRing: ->

    ring = @scene.makeCircle( 0, 0, @radius ).center()
    
    ring.fill      = 'rgba(0,0,0,0)'
    ring.stroke    = '#000'
    ring.linewidth = 3

    ring.addTo( @group ).center()

  evilDots: ->

    for i in [0...200]

      dot = @scene.makeCircle( 0, 0, ( Math.random() * 15 ) + 5 )
    
      dot.fill      = 'rgba(0,0,0,1)'
      dot.linewidth = 0
      dot.opacity   = Math.random()
      dot.type      = 'evil-dot'

      dot.addTo( @group ).center()

      x = ( Math.random() * ( @radius * 2 ) ) - @radius
      y = ( Math.random() * ( @radius * 2 ) ) - @radius 

      dot.translation.set( x, y )

  update: ( frameCount, timeDelta ) =>

    @stats.begin()

    for key, object of @group.children

      return unless object.type

      x = object.translation.x
      y = object.translation.y

      object.translation.x += 1
      object.translation.y += 1

    @stats.end()

  createStats: ->

    @stats = new Stats
    @stats.setMode( 2 )
     
    @stats.domElement.style.position = 'absolute'
    @stats.domElement.style.left = '5px'
    @stats.domElement.style.top = '5px'
     
    document.body.appendChild( @stats.domElement )
