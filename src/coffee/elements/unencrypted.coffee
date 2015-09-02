Settings = require 'settings'
Stats    = require 'utils/stats'
dat      = require 'dat-gui'

module.exports = class UNENCRYPTED

  scene : null
  group : null
  ring  : null

  params:
    type      : 'SVGRenderer'
    width     : 600
    height    : 600
    autostart : true

  count  : 200
  radius : 200
  shake  : false
  pulse  : true

  shakeStrength: 1

  constructor: ->

    @$el = $ '#unencrypted'

    @stats = new Stats

    @createScene()
    @bigRing()
    @evilDots()
    @createGUI() if Settings.debug

  createScene: ->

    @scene = new Two @params
    @el    = document.getElementById 'unencrypted'
    @group = @scene.makeGroup()

    @scene.appendTo( @el )

    @scene.bind 'update', @update

    @group.translation.set( @$el.width() / 2, @$el.height() / 2 )

  bigRing: ->

    @ring = @scene.makeCircle( 0, 0, @radius ).center()
    
    @ring.fill      = 'rgba(0,0,0,0)'
    @ring.stroke    = '#000'
    @ring.linewidth = 3
    @ring.type      = 'ring'

    @ring.addTo( @group ).center()

  evilDots: ->

    for i in [0...@count]

      dot = @scene.makeCircle( 0, 0, ( Math.random() * 15 ) + 5 )
    
      dot.fill      = 'rgba(0,0,0,1)'
      dot.linewidth = 0
      dot.opacity   = Math.random()
      dot.type      = 'evil-dot'
      dot.xDir      = Math.random() - 0.5
      dot.yDir      = Math.random() - 0.5

      dot.addTo( @group ).center()

      x = ( Math.random() * ( @radius * 2 ) ) - @radius
      y = ( Math.random() * ( @radius * 2 ) ) - @radius 

      dot.translation.set( x, y )

  update: ( frameCount, timeDelta ) =>

    @stats.begin()

    if @pulse

      @ring.scale = 0.02 * Math.sin( frameCount / 20 ) + 1

    for key, object of @group.children

      if object.type is 'evil-dot'

        x = object.translation.x
        y = object.translation.y

        vx = ( Math.random() * @shakeStrength ) - ( @shakeStrength / 2 )
        vy = ( Math.random() * @shakeStrength ) - ( @shakeStrength / 2 )

        if x > 200 or x < -200 or y > 200 or y < -200

          object.opacity -= 0.01

          if object.opacity <= 0

            x = ( Math.random() * 200 ) - 100
            y = ( Math.random() * 200 ) - 100

            object.opacity = Math.random()

        object.translation.x = x + object.xDir
        object.translation.y = y + object.yDir

        if @shake

          object.translation.x += vx
          object.translation.y += vy

    @stats.end()

  createGUI: ->

    gui = new dat.GUI

    shake = gui.add( @, 'shake' )

    shakeStrength = gui.add( @, 'shakeStrength', 1, 10 )

    shakeStrength.onChange ( change ) =>

      @shakeStrength = change

    pulse = gui.add( @, 'pulse' )
