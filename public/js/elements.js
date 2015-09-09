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
	    this.unencrypted = new Unencrypted;
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

	var RAF, UNENCRYPTED, mouse, randomColor, win,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	randomColor = __webpack_require__(12);

	win = __webpack_require__(2);

	RAF = __webpack_require__(4);

	mouse = __webpack_require__(7);

	module.exports = UNENCRYPTED = (function() {
	  UNENCRYPTED.prototype.width = win.width;

	  UNENCRYPTED.prototype.height = win.height;

	  UNENCRYPTED.prototype.frameCount = 0;

	  UNENCRYPTED.prototype.options = {
	    antialias: true,
	    transparent: true,
	    autoResize: true
	  };

	  UNENCRYPTED.prototype.count = 2000;

	  UNENCRYPTED.prototype.radius = 1000;

	  UNENCRYPTED.prototype.speed = 500;

	  UNENCRYPTED.prototype.x = 0;

	  UNENCRYPTED.prototype.y = 0;

	  UNENCRYPTED.prototype.x1 = 0;

	  UNENCRYPTED.prototype.y1 = 0;

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
	    this.stage.x = mouse.x + (win.width / 2);
	    this.stage.y = mouse.y + (win.height / 2);
	    return this.el.append(this.renderer.view);
	  };

	  UNENCRYPTED.prototype.bigRing = function() {
	    var object;
	    object = new PIXI.Graphics;
	    object.beginFill("0xffffff", 0);
	    object.lineStyle(3, "0xffffff", 0);
	    object.drawCircle(0, 0, this.radius);
	    object.alpha = 1;
	    return this.stage.addChild(object);
	  };

	  UNENCRYPTED.prototype.smallDots = function() {
	    var color, i, object, pos, r2, _i, _ref;
	    this.dots = new PIXI.Container;
	    for (i = _i = 0, _ref = this.count; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	      object = new PIXI.Graphics;
	      color = randomColor({
	        luminosity: 'light',
	        format: 'hex'
	      }).split('#')[1];
	      object.radius = (Math.random() * 20) + 5;
	      object.beginFill("0x" + color, 1);
	      object.drawCircle(0, 0, object.radius);
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
	    this.stage.rotation += 0.01;
	    _ref = this.dots.children;
	    _results = [];
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      object = _ref[_i];
	      x = object.x;
	      y = object.y;
	      if (x < 75 && x > -75 && y < 75 && y > -75) {
	        object.alpha -= 0.2;
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
	      object.y = y - ((this.speed * 0.01) * Math.sin(object.angle));
	      object.x += (Math.random() * 5) - 2.5;
	      _results.push(object.y += (Math.random() * 5) - 2.5);
	    }
	    return _results;
	  };

	  UNENCRYPTED.prototype.update = function() {
	    this.renderer.render(this.stage);
	    return this.animate();
	  };

	  return UNENCRYPTED;

	})();


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// randomColor by David Merfield under the MIT license
	// https://github.com/davidmerfield/randomColor/

	;(function(root, factory) {

	  // Support AMD
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	  // Support CommonJS
	  } else if (typeof exports === 'object') {
	    var randomColor = factory();
	    
	    // Support NodeJS & Component, which allow module.exports to be a function
	    if (typeof module === 'object' && module && module.exports) {
	      exports = module.exports = randomColor;
	    }
	    
	    // Support CommonJS 1.1.1 spec
	    exports.randomColor = randomColor;
	  
	  // Support vanilla script loading
	  } else {
	    root.randomColor = factory();
	  };

	}(this, function() {

	  // Seed to get repeatable colors
	  var seed = null;

	  // Shared color dictionary
	  var colorDictionary = {};

	  // Populate the color dictionary
	  loadColorBounds();

	  var randomColor = function(options) {
	    options = options || {};
	    if (options.seed && !seed) seed = options.seed;

	    var H,S,B;

	    // Check if we need to generate multiple colors
	    if (options.count != null) {

	      var totalColors = options.count,
	          colors = [];

	      options.count = null;

	      while (totalColors > colors.length) {
	        colors.push(randomColor(options));
	      }

	      options.count = totalColors;

	      //Keep the seed constant between runs. 
	      if (options.seed) seed = options.seed;
	      
	      return colors;
	    }

	    // First we pick a hue (H)
	    H = pickHue(options);

	    // Then use H to determine saturation (S)
	    S = pickSaturation(H, options);

	    // Then use S and H to determine brightness (B).
	    B = pickBrightness(H, S, options);

	    // Then we return the HSB color in the desired format
	    return setFormat([H,S,B], options);
	  };

	  function pickHue (options) {

	    var hueRange = getHueRange(options.hue),
	        hue = randomWithin(hueRange);

	    // Instead of storing red as two seperate ranges,
	    // we group them, using negative numbers
	    if (hue < 0) {hue = 360 + hue}

	    return hue;

	  }

	  function pickSaturation (hue, options) {

	    if (options.luminosity === 'random') {
	      return randomWithin([0,100]);
	    }

	    if (options.hue === 'monochrome') {
	      return 0;
	    }

	    var saturationRange = getSaturationRange(hue);

	    var sMin = saturationRange[0],
	        sMax = saturationRange[1];

	    switch (options.luminosity) {

	      case 'bright':
	        sMin = 55;
	        break;

	      case 'dark':
	        sMin = sMax - 10;
	        break;

	      case 'light':
	        sMax = 55;
	        break;
	   }

	    return randomWithin([sMin, sMax]);

	  }

	  function pickBrightness (H, S, options) {

	    var brightness,
	        bMin = getMinimumBrightness(H, S),
	        bMax = 100;

	    switch (options.luminosity) {

	      case 'dark':
	        bMax = bMin + 20;
	        break;

	      case 'light':
	        bMin = (bMax + bMin)/2;
	        break;

	      case 'random':
	        bMin = 0;
	        bMax = 100;
	        break;
	    }

	    return randomWithin([bMin, bMax]);

	  }

	  function setFormat (hsv, options) {

	    switch (options.format) {

	      case 'hsvArray':
	        return hsv;

	      case 'hslArray':
	        return HSVtoHSL(hsv);

	      case 'hsl':
	        var hsl = HSVtoHSL(hsv);
	        return 'hsl('+hsl[0]+', '+hsl[1]+'%, '+hsl[2]+'%)';

	      case 'rgbArray':
	        return HSVtoRGB(hsv);

	      case 'rgb':
	        var rgb = HSVtoRGB(hsv);
	        return 'rgb(' + rgb.join(', ') + ')';

	      default:
	        return HSVtoHex(hsv);
	    }

	  }

	  function getMinimumBrightness(H, S) {

	    var lowerBounds = getColorInfo(H).lowerBounds;

	    for (var i = 0; i < lowerBounds.length - 1; i++) {

	      var s1 = lowerBounds[i][0],
	          v1 = lowerBounds[i][1];

	      var s2 = lowerBounds[i+1][0],
	          v2 = lowerBounds[i+1][1];

	      if (S >= s1 && S <= s2) {

	         var m = (v2 - v1)/(s2 - s1),
	             b = v1 - m*s1;

	         return m*S + b;
	      }

	    }

	    return 0;
	  }

	  function getHueRange (colorInput) {

	    if (typeof parseInt(colorInput) === 'number') {

	      var number = parseInt(colorInput);

	      if (number < 360 && number > 0) {
	        return [number, number];
	      }

	    }

	    if (typeof colorInput === 'string') {

	      if (colorDictionary[colorInput]) {
	        var color = colorDictionary[colorInput];
	        if (color.hueRange) {return color.hueRange}
	      }
	    }

	    return [0,360];

	  }

	  function getSaturationRange (hue) {
	    return getColorInfo(hue).saturationRange;
	  }

	  function getColorInfo (hue) {

	    // Maps red colors to make picking hue easier
	    if (hue >= 334 && hue <= 360) {
	      hue-= 360;
	    }

	    for (var colorName in colorDictionary) {
	       var color = colorDictionary[colorName];
	       if (color.hueRange &&
	           hue >= color.hueRange[0] &&
	           hue <= color.hueRange[1]) {
	          return colorDictionary[colorName];
	       }
	    } return 'Color not found';
	  }

	  function randomWithin (range) {
	    if (seed == null) {
	      return Math.floor(range[0] + Math.random()*(range[1] + 1 - range[0]));
	    } else {
	      //Seeded random algorithm from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
	      var max = range[1] || 1;
	      var min = range[0] || 0;
	      seed = (seed * 9301 + 49297) % 233280;
	      var rnd = seed / 233280.0;
	      return Math.floor(min + rnd * (max - min));
	    }
	  }

	  function HSVtoHex (hsv){

	    var rgb = HSVtoRGB(hsv);

	    function componentToHex(c) {
	        var hex = c.toString(16);
	        return hex.length == 1 ? "0" + hex : hex;
	    }

	    var hex = "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);

	    return hex;

	  }

	  function defineColor (name, hueRange, lowerBounds) {

	    var sMin = lowerBounds[0][0],
	        sMax = lowerBounds[lowerBounds.length - 1][0],

	        bMin = lowerBounds[lowerBounds.length - 1][1],
	        bMax = lowerBounds[0][1];

	    colorDictionary[name] = {
	      hueRange: hueRange,
	      lowerBounds: lowerBounds,
	      saturationRange: [sMin, sMax],
	      brightnessRange: [bMin, bMax]
	    };

	  }

	  function loadColorBounds () {

	    defineColor(
	      'monochrome',
	      null,
	      [[0,0],[100,0]]
	    );

	    defineColor(
	      'red',
	      [-26,18],
	      [[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]
	    );

	    defineColor(
	      'orange',
	      [19,46],
	      [[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]
	    );

	    defineColor(
	      'yellow',
	      [47,62],
	      [[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]
	    );

	    defineColor(
	      'green',
	      [63,178],
	      [[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]
	    );

	    defineColor(
	      'blue',
	      [179, 257],
	      [[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]
	    );

	    defineColor(
	      'purple',
	      [258, 282],
	      [[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]
	    );

	    defineColor(
	      'pink',
	      [283, 334],
	      [[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]]
	    );

	  }

	  function HSVtoRGB (hsv) {

	    // this doesn't work for the values of 0 and 360
	    // here's the hacky fix
	    var h = hsv[0];
	    if (h === 0) {h = 1}
	    if (h === 360) {h = 359}

	    // Rebase the h,s,v values
	    h = h/360;
	    var s = hsv[1]/100,
	        v = hsv[2]/100;

	    var h_i = Math.floor(h*6),
	      f = h * 6 - h_i,
	      p = v * (1 - s),
	      q = v * (1 - f*s),
	      t = v * (1 - (1 - f)*s),
	      r = 256,
	      g = 256,
	      b = 256;

	    switch(h_i) {
	      case 0: r = v, g = t, b = p;  break;
	      case 1: r = q, g = v, b = p;  break;
	      case 2: r = p, g = v, b = t;  break;
	      case 3: r = p, g = q, b = v;  break;
	      case 4: r = t, g = p, b = v;  break;
	      case 5: r = v, g = p, b = q;  break;
	    }
	    var result = [Math.floor(r*255), Math.floor(g*255), Math.floor(b*255)];
	    return result;
	  }

	  function HSVtoHSL (hsv) {
	    var h = hsv[0],
	      s = hsv[1]/100,
	      v = hsv[2]/100,
	      k = (2-s)*v;

	    return [
	      h,
	      Math.round(s*v / (k<1 ? k : 2-k) * 10000) / 100,
	      k/2 * 100
	    ];
	  }

	  return randomColor;
	}));


/***/ }
/******/ ]);