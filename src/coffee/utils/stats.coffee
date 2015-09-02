Settings = require 'settings'
Stats    = require 'stats-js'

module.exports = class STATS

  stats: null

  constructor: ->

    if Settings.debug

      @stats = new Stats
       
      @setMode(2)
      @setStyle()
      @appendDomElement()

  appendDomElement: ->
     
    document.body.appendChild( @stats.domElement )

  setStyle: ->

    @stats.domElement.style.position = 'absolute'
    @stats.domElement.style.left     = '5px'
    @stats.domElement.style.top      = '5px'

  setMode: ( mode ) ->

    @stats.setMode( mode )

  begin: ->

    @stats?.begin()

  end: ->

    @stats?.end()

