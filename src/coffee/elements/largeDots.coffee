win    = require 'utils/window'
RAF    = require 'utils/raf'
Circle = require 'helpers/circle'
Line   = require 'helpers/line'

module.exports = class DOTS

  el      : null
  circles : []
  lines   : []
  radii   : [5,3,2,2]
  
  options :
    antialias   : true
    transparent : true

  constructor: ->

    @el = $ '#large-dots'

    return unless @el

    @createScene()

    @createCircles()

    RAF.on 'update', @update

  createScene: ->

    @renderer = new PIXI.autoDetectRenderer win.width, win.height + 100, @options
    @stage    = new PIXI.Container

    @el.append @renderer.view

  createCircles: ->

    for i in [0...60]
      
      x      = Math.random() * win.width
      y      = Math.random() * win.height
      radius = @radii[ i % 6 ]
      circle = new Circle( @stage, x, y, radius )

      @circles.push circle

  animateScale: ->

    index  = Math.floor( Math.random() * @circles.length )
    circle = @circles[ index ]

    return if circle.animating

    circle.animating = true

    i = 0

    for ring in circle.dot.children

      i++
      j = 0

      params =
        x: 1.25
        y: 1.25
        easing: Power2.easeOut
        delay: i * 0.1
        onComplete: ->

          j++

          if j is 5

            for ring in circle.dot.children

              k = 0

              params =
                x: 1
                y: 1
                easing: Power2.easeInOut
                onComplete: ->

                  k++

                  if k is 5

                    circle.animating = false

              TweenMax.to ring.scale, 5, params

      TweenMax.to ring.scale, 1, params

  update: ( time ) =>

    @renderer.render @stage
    
    circle.update() for circle in @circles

    @animateScale()
