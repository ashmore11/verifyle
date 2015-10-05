LargeDots   = require 'elements/largeDots'
SmallDots   = require 'elements/smallDots'
Encrypted   = require 'elements/encrypted'
Unencrypted = require 'elements/unencrypted'

class APP

  constructor: ->

    @largeDots   = new LargeDots
    @smallDots   = new SmallDots
    @encrypted   = new Encrypted
    @unencrypted = new Unencrypted

module.exports = new APP