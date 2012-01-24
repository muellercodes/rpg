define (require) ->
  Grob = require('app/grob')
  Bounds = require('app/bounds')

  # This is a Grob so that if we want to we can draw the collision layer
  MapBlock = Grob.extend 'game.MapBlock',
    init: (core, x1, y1, width, height) ->
      @_initDims = ->
        @width = width
        @height = height
      @_initBoundsOnMap = ->
        @bounds.onMap = Bounds.rect(x1, y1, width, height)
      @_super(core)

    tick: ->
      # don't draw anything

  return MapBlock
