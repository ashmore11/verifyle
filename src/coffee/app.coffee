Dots        = require 'elements/dots'
Encrypted   = require 'elements/encrypted'
Unencrypted = require 'elements/unencrypted'

class APP

  constructor: ->

    # @dots        = new Dots
    # @encrypted   = new Encrypted
    @unencrypted = new Unencrypted

module.exports = new APP