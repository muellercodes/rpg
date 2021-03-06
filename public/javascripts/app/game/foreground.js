(function() {
  var __slice = Array.prototype.slice;

  define('game.Foreground', function() {
    var Foreground, assignable, attachable, meta, tickable, _ref;
    meta = require('meta');
    _ref = require('roles'), attachable = _ref.attachable, assignable = _ref.assignable, tickable = _ref.tickable;
    Foreground = meta.def('game.Foreground', attachable, assignable, tickable, {
      init: function(map, width, height) {
        this.map = map;
        this.width = width;
        this.height = height;
        this.objects = require('game.CollidableMatrix').create(this);
        this.framedObjects = this.objects.clone().extend(require('game.FramedObjectMatrix'));
        this.blocks = [];
        this.player = null;
        return this.enableCollisions = true;
      },
      setParent: function(parent) {
        this._super(parent);
        this.viewport = parent;
        return this.framedObjects.frameWithin(this.viewport.bounds);
      },
      attach: function() {
        this._super();
        return this.ctx = this.$canvas[0].getContext('2d');
      },
      tick: function() {
        var self;
        self = this;
        this.$canvas.css({
          top: -this.viewport.bounds.y1,
          left: -this.viewport.bounds.x1
        });
        this.framedObjects.each(function(object) {
          return typeof object.predraw === "function" ? object.predraw(self.ctx) : void 0;
        });
        this.framedObjects.each(function(object) {
          return typeof object.draw === "function" ? object.draw(self.ctx) : void 0;
        });
        return this.framedObjects.each(function(object) {
          return typeof object.postdraw === "function" ? object.postdraw(self.ctx) : void 0;
        });
      },
      addObject: function() {
        var positions, proto, self;
        proto = arguments[0], positions = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        self = this;
        return $.v.each(positions, function(_arg) {
          var height, object, width, x, y;
          x = _arg[0], y = _arg[1], width = _arg[2], height = _arg[3];
          object = proto.clone().assignToMap(self);
          object.setMapPosition(x, y);
          return self.objects.push(object);
        });
      },
      removeObject: function(object) {
        return this.objects.remove(object);
      },
      addPlayer: function(player) {
        this.player = player;
        this.player.assignToMap(this);
        return this.objects.add(this.player);
      },
      removePlayer: function() {
        return this.removeObject(this.player);
      },
      onLoad: function(onLoadCallback) {
        this.onLoadCallback = onLoadCallback;
      },
      load: function() {
        var _ref2;
        this.$canvas = $('<canvas>').attr('width', this.width).attr('height', this.height).addClass('foreground');
        this.setElement(this.$canvas);
        return (_ref2 = this.onLoadCallback) != null ? _ref2.call(this) : void 0;
      },
      unload: function() {
        this.$canvas = null;
        this.clearElement();
        return this.ctx = null;
      },
      activate: function() {
        return this.objects.each(function(object) {
          return typeof object.activate === "function" ? object.activate() : void 0;
        });
      },
      deactivate: function() {
        return this.objects.each(function(object) {
          return typeof object.deactivate === "function" ? object.deactivate() : void 0;
        });
      },
      getObjectsWithout: function(object) {
        var coll;
        coll = this.enableCollisions ? this.framedObjects.clone() : require('game.CollidableMatrix').create(this);
        coll.extend(require('game.FilteredObjectMatrix')).without(object);
        return coll;
      }
    });
    Foreground.add = Foreground.addObject;
    Foreground.remove = Foreground.removeObject;
    return Foreground;
  });

}).call(this);
