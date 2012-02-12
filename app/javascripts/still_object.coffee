game = (window.game ||= {})

meta = game.meta2
Block = game.Block
{assignable, drawable} = game.roles
Mappable = game.Mappable
Collidable = game.Collidable

# A StillObject represents an object on the map that lives in the foreground
# layer and is thus collidable. It is simple in that it does not contain any
# states, and always use the same image to draw itself.
#
StillObject = meta.def 'game.StillObject',
  assignable,
  Mappable,
  Collidable,
  drawable,  # implies tickable

  init: (imagePath, width, height) ->
    @_super(width, height)  # Mappable
    @image = game.imageCollection.get(imagePath)
    return this

  activate: ->

  deactivate: ->

  draw: (ctx) ->
    b = @mbounds
    @image.draw(ctx, b.x1, b.y1)

game.StillObject = StillObject

window.scriptLoaded('app/still_object')