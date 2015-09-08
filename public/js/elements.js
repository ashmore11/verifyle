/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var APP, Encrypted, LargeDots, SmallDots, Unencrypted;

	LargeDots = __webpack_require__(1);

	SmallDots = __webpack_require__(9);

	Encrypted = __webpack_require__(10);

	Unencrypted = __webpack_require__(11);

	APP = (function() {
	  function APP() {
	    this.largeDots = new LargeDots;
	    this.smallDots = new SmallDots;
	  }

	  return APP;

	})();

	module.exports = new APP;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Circle, DOTS, Line, RAF, win,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	win = __webpack_require__(2);

	RAF = __webpack_require__(4);

	Circle = __webpack_require__(5);

	Line = __webpack_require__(8);

	module.exports = DOTS = (function() {
	  DOTS.prototype.el = null;

	  DOTS.prototype.circles = [];

	  DOTS.prototype.lines = [];

	  DOTS.prototype.radii = [5, 3, 2, 2];

	  DOTS.prototype.options = {
	    antialias: true,
	    transparent: true
	  };

	  function DOTS() {
	    this.update = __bind(this.update, this);
	    this.el = $('#large-dots');
	    if (!this.el) {
	      return;
	    }
	    this.createScene();
	    this.createCircles();
	    RAF.on('update', this.update);
	  }

	  DOTS.prototype.createScene = function() {
	    this.renderer = new PIXI.autoDetectRenderer(win.width, win.height + 100, this.options);
	    this.stage = new PIXI.Container;
	    return this.el.append(this.renderer.view);
	  };

	  DOTS.prototype.createCircles = function() {
	    var circle, i, radius, x, y, _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 60; i = ++_i) {
	      x = Math.random() * win.width;
	      y = Math.random() * win.height;
	      radius = this.radii[i % 6];
	      circle = new Circle(this.stage, x, y, radius);
	      _results.push(this.circles.push(circle));
	    }
	    return _results;
	  };

	  DOTS.prototype.animateScale = function() {
	    var circle, i, index, j, params, ring, _i, _len, _ref, _results;
	    index = Math.floor(Math.random() * this.circles.length);
	    circle = this.circles[index];
	    if (circle.animating) {
	      return;
	    }
	    circle.animating = true;
	    i = 0;
	    _ref = circle.dot.children;
	    _results = [];
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      ring = _ref[_i];
	      i++;
	      j = 0;
	      params = {
	        x: 1.25,
	        y: 1.25,
	        easing: Power2.easeOut,
	        delay: i * 0.1,
	        onComplete: function() {
	          var k, _j, _len1, _ref1, _results1;
	          j++;
	          if (j === 5) {
	            _ref1 = circle.dot.children;
	            _results1 = [];
	            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
	              ring = _ref1[_j];
	              k = 0;
	              params = {
	                x: 1,
	                y: 1,
	                easing: Power2.easeInOut,
	                onComplete: function() {
	                  k++;
	                  if (k === 5) {
	                    return circle.animating = false;
	                  }
	                }
	              };
	              _results1.push(TweenMax.to(ring.scale, 5, params));
	            }
	            return _results1;
	          }
	        }
	      };
	      _results.push(TweenMax.to(ring.scale, 1, params));
	    }
	    return _results;
	  };

	  DOTS.prototype.update = function(time) {
	    var circle, _i, _len, _ref;
	    this.renderer.render(this.stage);
	    _ref = this.circles;
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      circle = _ref[_i];
	      circle.update();
	    }
	    return this.animateScale();
	  };

	  return DOTS;

	})();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Window, happens,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(3);

	Window = (function() {
	  Window.prototype.window = $(window);

	  Window.prototype.width = 0;

	  Window.prototype.height = 0;

	  function Window() {
	    this.resize = __bind(this.resize, this);
	    happens(this);
	    this.window.on('resize', this.resize);
	    this.resize();
	  }

	  Window.prototype.resize = function() {
	    this.width = this.window.width();
	    this.height = this.window.height();
	    return this.emit('resize');
	  };

	  return Window;

	})();

	module.exports = new Window;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Module constructor
	 * @param  {Object} target Target object to extends methods and properties into
	 * @return {Object}        Target after with extended methods and properties
	 */
	module.exports = function(target) {
	  target = target || {};
	  for(var prop in Happens)
	    target[prop] = Happens[prop];
	  return target;
	};



	/**
	 * Class Happens
	 * @type {Object}
	 */
	var Happens = {

	  /**
	   * Initializes event
	   * @param  {String} event Event name to initialize
	   * @return {Array}        Initialized event pool
	   */
	  __init: function(event) {
	    var tmp = this.__listeners || (this.__listeners = []);
	    return tmp[event] || (tmp[event] = []);
	  },

	  /**
	   * Adds listener
	   * @param  {String}   event Event name
	   * @param  {Function} fn    Event handler
	   */
	  on: function(event, fn) {
	    validate(fn);
	    this.__init(event).push(fn);
	  },

	  /**
	   * Removes listener
	   * @param  {String}   event Event name
	   * @param  {Function} fn    Event handler
	   */
	  off: function(event, fn) {
	    var pool = this.__init(event);
	    pool.splice(pool.indexOf(fn), 1);
	  },

	  /**
	   * Add listener the fires once and auto-removes itself
	   * @param  {String}   event Event name
	   * @param  {Function} fn    Event handler
	   */
	  once: function(event, fn) {
	    validate(fn);
	    var self = this, wrapper = function() {
	      self.off(event, wrapper);
	      fn.apply(this, arguments);
	    };
	    this.on(event, wrapper );
	  },

	  /**
	   * Emit some event
	   * @param  {String} event Event name -- subsequent params after `event` will
	   * be passed along to the event's handlers
	   */
	  emit: function(event /*, arg1, arg2 */ ) {
	    var i, pool = this.__init(event).slice(0);
	    for(i in pool)
	      pool[i].apply(this, [].slice.call(arguments, 1));
	  }
	};



	/**
	 * Validates if a function exists and is an instanceof Function, and throws
	 * an error if needed
	 * @param  {Function} fn Function to validate
	 */
	function validate(fn) {
	  if(!(fn && fn instanceof Function))
	    throw new Error(fn + ' is not a Function');
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var RAF, happens,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(3);

	(function() {
	  var lastTime, vendors, x;
	  lastTime = 0;
	  vendors = ["ms", "moz", "o"];
	  x = 0;
	  while (x < vendors.length && !window.requestAnimationFrame) {
	    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
	    window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
	    ++x;
	  }
	  if (!window.requestAnimationFrame) {
	    window.requestAnimationFrame = function(callback, element) {
	      var currTime, id, timeToCall;
	      currTime = new Date().getTime();
	      timeToCall = Math.max(0, 16 - (currTime - lastTime));
	      id = window.setTimeout(function() {
	        return callback(currTime + timeToCall);
	      }, timeToCall);
	      lastTime = currTime + timeToCall;
	      return id;
	    };
	  }
	  if (!window.cancelAnimationFrame) {
	    return window.cancelAnimationFrame = function(id) {
	      return clearTimeout(id);
	    };
	  }
	})();

	RAF = (function() {
	  RAF.prototype.id_animloop = null;

	  function RAF() {
	    this.animloop = __bind(this.animloop, this);
	    happens(this);
	    this.start();
	  }

	  RAF.prototype.start = function() {
	    return this.id_animloop = window.requestAnimationFrame(this.animloop);
	  };

	  RAF.prototype.stop = function() {
	    window.cancelAnimationFrame(this.id_animloop);
	    return this.id_animloop = null;
	  };

	  RAF.prototype.animloop = function() {
	    this.id_animloop = window.requestAnimationFrame(this.animloop);
	    return this.emit('update');
	  };

	  return RAF;

	})();

	module.exports = new RAF;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Circle, mouse, settings, win;

	settings = __webpack_require__(6);

	win = __webpack_require__(2);

	mouse = __webpack_require__(7);

	module.exports = Circle = (function() {
	  Circle.prototype.x = 0;

	  Circle.prototype.y = 0;

	  Circle.prototype.a = 0;

	  function Circle(stage, x, y, radius) {
	    var circle, i, lineWidth, opacity, ring, _i;
	    this.stage = stage;
	    this.x = x;
	    this.y = y;
	    this.radius = radius;
	    this.fallSpeed = Math.random() * (this.radius / 10);
	    this.dot = new PIXI.Container;
	    circle = new PIXI.Graphics;
	    circle.beginFill("0xffffff", 1);
	    circle.drawCircle(0.5, 0.5, this.radius * 2);
	    if (this.radius === 5 || this.radius === 3) {
	      circle.alpha = 1;
	    }
	    if (this.radius === 2) {
	      circle.alpha = 0.5;
	    }
	    if (this.radius === 1) {
	      circle.alpha = 0.25;
	    }
	    for (i = _i = 5; _i >= 0; i = _i += -1) {
	      switch (this.radius) {
	        case 5:
	          opacity = (Math.random() * 0.5) + 0.25;
	          lineWidth = 1.5;
	          break;
	        case 3:
	          opacity = (Math.random() * 0.5) + 0.25;
	          lineWidth = 1;
	          break;
	        case 2:
	          opacity = 0.5;
	          lineWidth = 1;
	          break;
	        case 1:
	          opacity = 0.25;
	          lineWidth = 0.5;
	      }
	      radius = (i * this.radius) + this.radius * 3;
	      ring = new PIXI.Graphics;
	      ring.beginFill("0xffffff", 0);
	      ring.lineStyle(lineWidth, "0xffffff", 1);
	      ring.drawCircle(0, 0, radius);
	      ring.alpha = i === 5 ? 0.25 : opacity;
	      this.dot.addChild(ring);
	    }
	    this.dot.x = this.x;
	    this.dot.y = this.y;
	    this.dot.addChild(circle);
	    this.stage.addChild(this.dot);
	  }

	  Circle.prototype.update = function() {
	    var mouseNorm, y;
	    if (this.y > win.height + 100) {
	      y = -50;
	    } else {
	      y = this.y;
	    }
	    if (this.y > win.height - 25) {
	      this.dot.alpha -= 0.005;
	    } else {
	      this.dot.alpha = 1;
	    }
	    mouseNorm = mouse.x / settings.sensitivity;
	    this.a += (mouseNorm - this.a) / 50;
	    this.x += (mouseNorm - this.a) * this.radius;
	    this.y = y + this.fallSpeed;
	    this.dot.x = this.x;
	    return this.dot.y = this.y;
	  };

	  return Circle;

	})();


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = {
	  debug: true,
	  infinite: false,
	  fallSpeed: 0.6,
	  scaleTimer: 4,
	  sensitivity: 1500,
	  shapePath: 'images/shape.png'
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Mouse, happens,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(3);

	Mouse = (function() {
	  Mouse.prototype.doc = $(document);

	  Mouse.prototype.x = 0;

	  Mouse.prototype.y = 0;

	  function Mouse() {
	    this.mousemove = __bind(this.mousemove, this);
	    happens(this);
	    this.doc.on('mousemove', this.mousemove);
	  }

	  Mouse.prototype.mousemove = function(event) {
	    this.x = event.pageX - ($(window).width() / 2);
	    this.y = event.pageY - ($(window).height() / 2);
	    return this.emit('move');
	  };

	  return Mouse;

	})();

	module.exports = new Mouse;


/***/ },
/* 8 */
/***/ function(module, exports) {

	var Line;

	module.exports = Line = (function() {
	  function Line(stage, origin, points) {
	    var line, point, _i, _len, _ref;
	    this.stage = stage;
	    this.origin = origin;
	    this.points = points;
	    this.lines = new PIXI.Container;
	    _ref = this.points;
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      point = _ref[_i];
	      line = new PIXI.Graphics;
	      line.lineStyle(1, '0xffffff', 0.25);
	      line.owner = point;
	      line.moveTo(this.origin.x, this.origin.y);
	      line.lineTo(point.x, point.y);
	      this.lines.addChild(line);
	    }
	    this.stage.addChild(this.lines);
	  }

	  Line.prototype.update = function() {
	    var line, _i, _len, _ref, _results;
	    _ref = this.lines.children;
	    _results = [];
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      line = _ref[_i];
	      line.clear();
	      line.lineStyle(1, '0xffffff', 0.25);
	      line.moveTo(this.origin.x, this.origin.y);
	      _results.push(line.lineTo(line.owner.x, line.owner.y));
	    }
	    return _results;
	  };

	  return Line;

	})();


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Circle, RAF, SMALLDOTS, win,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	win = __webpack_require__(2);

	RAF = __webpack_require__(4);

	Circle = __webpack_require__(5);

	module.exports = SMALLDOTS = (function() {
	  SMALLDOTS.prototype.el = null;

	  SMALLDOTS.prototype.circles = [];

	  function SMALLDOTS() {
	    this.update = __bind(this.update, this);
	    this.el = $('#small-dots');
	    if (!this.el) {
	      return;
	    }
	    this.createScene();
	    this.createCircles();
	    RAF.on('update', this.update);
	  }

	  SMALLDOTS.prototype.createScene = function() {
	    this.renderer = new PIXI.autoDetectRenderer(win.width, win.height, {
	      antialias: true,
	      transparent: true
	    });
	    this.stage = new PIXI.Container;
	    return this.el.append(this.renderer.view);
	  };

	  SMALLDOTS.prototype.createCircles = function() {
	    var circle, i, x, y, _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 30; i = ++_i) {
	      x = Math.random() * win.width;
	      y = Math.random() * win.height;
	      circle = new Circle(this.stage, x, y, 1);
	      _results.push(this.circles.push(circle));
	    }
	    return _results;
	  };

	  SMALLDOTS.prototype.update = function(time) {
	    var circle, _i, _len, _ref, _results;
	    this.renderer.render(this.stage);
	    _ref = this.circles;
	    _results = [];
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      circle = _ref[_i];
	      _results.push(circle.update());
	    }
	    return _results;
	  };

	  return SMALLDOTS;

	})();


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var ENCRYPTED, RAF, settings,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	settings = __webpack_require__(6);

	RAF = __webpack_require__(4);

	module.exports = ENCRYPTED = (function() {
	  ENCRYPTED.prototype.width = 600;

	  ENCRYPTED.prototype.height = 600;

	  ENCRYPTED.prototype.options = {
	    antialias: true,
	    transparent: true
	  };

	  ENCRYPTED.prototype.radius = 100;

	  function ENCRYPTED() {
	    this.update = __bind(this.update, this);
	    this.el = $('#encrypted');
	    if (!this.el) {
	      return;
	    }
	    this.createScene();
	    this.makeCircle();
	    this.importShape();
	    RAF.on('update', this.update);
	  }

	  ENCRYPTED.prototype.createScene = function() {
	    this.renderer = new PIXI.autoDetectRenderer(600, 600, this.options);
	    this.stage = new PIXI.Container;
	    this.stage.x = this.width / 2;
	    this.stage.y = this.height / 2;
	    return this.el.append(this.renderer.view);
	  };

	  ENCRYPTED.prototype.makeCircle = function() {
	    var circle, i, j, ring, _i;
	    this.dot = new PIXI.Container;
	    circle = new PIXI.Graphics;
	    circle.beginFill("0xffffff", 1);
	    circle.drawCircle(0, 0, this.radius);
	    j = this.radius;
	    for (i = _i = 5; _i >= 0; i = _i += -1) {
	      j = j + 24;
	      ring = new PIXI.Graphics;
	      ring.lineStyle(1.5, "0xffffff", 1);
	      ring.drawCircle(0, 0, j);
	      ring.alpha = (Math.random() * 0.5) + 0.25;
	      ring.type = 'ring';
	      this.dot.addChild(ring);
	    }
	    this.dot.addChild(circle);
	    return this.stage.addChild(this.dot);
	  };

	  ENCRYPTED.prototype.importShape = function() {
	    var sprite, texture;
	    this.complexShape = new PIXI.Container;
	    texture = PIXI.Texture.fromImage(settings.shapePath);
	    sprite = new PIXI.Sprite(texture);
	    sprite.alpha = 0.4;
	    sprite.x = -102;
	    sprite.y = -102;
	    sprite.scale.x = 0.52;
	    sprite.scale.y = 0.52;
	    this.complexShape.addChild(sprite);
	    return this.stage.addChild(this.complexShape);
	  };

	  ENCRYPTED.prototype.animate = function(time) {
	    var object, _i, _len, _ref, _results;
	    this.complexShape.rotation += 0.001;
	    this.complexShape.scale.x = 0.02 * Math.sin(time / 300) + 1;
	    this.complexShape.scale.y = 0.02 * Math.sin(time / 300) + 1;
	    _ref = this.dot.children;
	    _results = [];
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      object = _ref[_i];
	      if (object.type === 'ring') {
	        object.alpha -= 0.005;
	        if (object.alpha <= 0.1) {
	          _results.push(TweenMax.to(object, 3, {
	            alpha: (Math.random() * 0.8) + 0.2
	          }));
	        } else {
	          _results.push(void 0);
	        }
	      } else {
	        _results.push(void 0);
	      }
	    }
	    return _results;
	  };

	  ENCRYPTED.prototype.update = function(time) {
	    this.renderer.render(this.stage);
	    return this.animate(time);
	  };

	  return ENCRYPTED;

	})();


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var RAF, UNENCRYPTED,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	RAF = __webpack_require__(4);

	module.exports = UNENCRYPTED = (function() {
	  UNENCRYPTED.prototype.width = 700;

	  UNENCRYPTED.prototype.height = 700;

	  UNENCRYPTED.prototype.options = {
	    antialias: true,
	    transparent: true
	  };

	  UNENCRYPTED.prototype.count = 200;

	  UNENCRYPTED.prototype.radius = 250;

	  UNENCRYPTED.prototype.speed = 5;

	  function UNENCRYPTED() {
	    this.update = __bind(this.update, this);
	    this.el = $('#unencrypted');
	    if (!this.el) {
	      return;
	    }
	    this.createScene();
	    this.bigRing();
	    this.smallDots();
	    RAF.on('update', this.update);
	  }

	  UNENCRYPTED.prototype.createScene = function() {
	    this.renderer = new PIXI.autoDetectRenderer(this.width, this.height, this.options);
	    this.stage = new PIXI.Container;
	    this.stage.x = this.width / 2;
	    this.stage.y = this.height / 2;
	    return this.el.append(this.renderer.view);
	  };

	  UNENCRYPTED.prototype.bigRing = function() {
	    var object;
	    object = new PIXI.Graphics;
	    object.beginFill("0x000000", 0);
	    object.lineStyle(3, "0x000000", 1);
	    object.drawCircle(0, 0, this.radius);
	    object.alpha = 1;
	    return this.stage.addChild(object);
	  };

	  UNENCRYPTED.prototype.smallDots = function() {
	    var i, object, pos, r2, _i, _ref;
	    this.dots = new PIXI.Container;
	    for (i = _i = 0, _ref = this.count; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	      object = new PIXI.Graphics;
	      object.beginFill('0x000000', 1);
	      object.drawCircle(0, 0, (Math.random() * 15) + 5);
	      object.alpha = Math.random() + 0.15;
	      object.angle = (i / (this.count / 2)) * Math.PI;
	      pos = ((Math.random() * this.radius) - this.radius / 2) + 50;
	      r2 = this.radius / 2;
	      object.x = (r2 + pos) * Math.cos(object.angle);
	      object.y = (r2 + pos) * Math.sin(object.angle);
	      this.dots.addChild(object);
	    }
	    return this.stage.addChild(this.dots);
	  };

	  UNENCRYPTED.prototype.animate = function() {
	    var object, x, y, _i, _len, _ref, _results;
	    _ref = this.dots.children;
	    _results = [];
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      object = _ref[_i];
	      x = object.x;
	      y = object.y;
	      if (x < 75 && x > -75 && y < 75 && y > -75) {
	        object.alpha -= 0.001;
	        if (object.alpha <= 0) {
	          x = (this.radius + 50) * Math.cos(object.angle);
	          y = (this.radius + 50) * Math.sin(object.angle);
	          TweenMax.to(object, 3, {
	            alpha: Math.random(),
	            ease: Power2.easeIn
	          });
	        }
	      }
	      object.x = x - ((this.speed * 0.01) * Math.cos(object.angle));
	      _results.push(object.y = y - ((this.speed * 0.01) * Math.sin(object.angle)));
	    }
	    return _results;
	  };

	  UNENCRYPTED.prototype.update = function(time) {
	    this.renderer.render(this.stage);
	    return this.animate();
	  };

	  return UNENCRYPTED;

	})();


/***/ }
/******/ ]);