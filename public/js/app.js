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

	var APP, Dots, Encrypted;

	Dots = __webpack_require__(1);

	Encrypted = __webpack_require__(7);

	APP = (function() {
	  function APP() {
	    this.dots = new Dots;
	    this.transitionIn();
	  }

	  APP.prototype.transitionIn = function() {
	    var params;
	    params = {
	      autoAlpha: 1,
	      ease: Power1.easeInOut
	    };
	    TweenMax.to(document.getElementsByTagName('img'), 2, params);
	    return setTimeout((function(_this) {
	      return function() {
	        params = {
	          autoAlpha: 1,
	          ease: Power1.easeInOut
	        };
	        if (_this.dots) {
	          return TweenMax.to(_this.dots.el, 2, params);
	        }
	      };
	    })(this), 500);
	  };

	  return APP;

	})();

	module.exports = new APP;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Circle, DOTS, Line, win,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	win = __webpack_require__(2);

	Circle = __webpack_require__(4);

	Line = __webpack_require__(6);

	module.exports = DOTS = (function() {
	  DOTS.prototype.scene = null;

	  DOTS.prototype.el = null;

	  DOTS.prototype.circles = [];

	  DOTS.prototype.lines = [];

	  function DOTS() {
	    this.resize = __bind(this.resize, this);
	    this.update = __bind(this.update, this);
	    win.on('resize', this.resize);
	    this.createScene();
	    this.createCircles();
	    this.scene.bind('update', this.update).play();
	  }

	  DOTS.prototype.createScene = function() {
	    var params;
	    params = {
	      width: win.width,
	      height: win.height + 100
	    };
	    this.scene = new Two(params, {
	      type: 'SVGRenderer'
	    });
	    this.el = document.getElementById('dots');
	    return this.scene.appendTo(this.el);
	  };

	  DOTS.prototype.createCircles = function() {
	    var circle, i, radius, x, y, _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 60; i = ++_i) {
	      x = Math.random() * win.width;
	      y = Math.random() * win.height;
	      radius = (i % 6) + 1;
	      circle = new Circle(this.scene, x, y, radius);
	      _results.push(this.circles.push(circle));
	    }
	    return _results;
	  };

	  DOTS.prototype.createLines = function() {
	    var i, j, line, origin, point, points, _i, _j, _results;
	    _results = [];
	    for (i = _i = 0; _i < 1; i = ++_i) {
	      origin = this.circles[Math.floor(Math.random() * this.circles.length)];
	      points = [];
	      for (j = _j = 0; _j < 3; j = ++_j) {
	        point = this.circles[Math.floor(Math.random() * this.circles.length)];
	        points.push(point);
	      }
	      line = new Line(this.scene, origin, points);
	      _results.push(this.lines.push(line));
	    }
	    return _results;
	  };

	  DOTS.prototype.animateScale = function() {
	    var circle, i, index, j, key, ring, tween, _ref, _results;
	    index = Math.floor(Math.random() * this.circles.length);
	    circle = this.circles[index];
	    if (circle.group.animating) {
	      return;
	    }
	    circle.group.animating = true;
	    i = 0;
	    _ref = circle.group.children;
	    _results = [];
	    for (key in _ref) {
	      ring = _ref[key];
	      i++;
	      j = 0;
	      tween = new TWEEN.Tween(ring).to({
	        scale: 1.25
	      }, 1000).delay(i * 100).easing(TWEEN.Easing.Cubic.Out).onComplete(function() {
	        var k, _ref1, _results1;
	        j++;
	        if (j === 5) {
	          _ref1 = circle.group.children;
	          _results1 = [];
	          for (key in _ref1) {
	            ring = _ref1[key];
	            k = 0;
	            tween = new TWEEN.Tween(ring).to({
	              scale: 1
	            }, 3000).easing(TWEEN.Easing.Cubic.InOut).onComplete(function() {
	              k++;
	              if (k === 5) {
	                return circle.group.animating = false;
	              }
	            });
	            _results1.push(tween.start());
	          }
	          return _results1;
	        }
	      });
	      _results.push(tween.start());
	    }
	    return _results;
	  };

	  DOTS.prototype.update = function(frameCount, timeDelta) {
	    var circle, lines, _i, _j, _len, _len1, _ref, _ref1;
	    this.animateScale();
	    _ref = this.circles;
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      circle = _ref[_i];
	      circle.update();
	    }
	    _ref1 = this.lines;
	    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
	      lines = _ref1[_j];
	      lines.update();
	    }
	    return TWEEN.update();
	  };

	  DOTS.prototype.resize = function() {
	    return this.scene.width = win.width;
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

	var Circle, mouse, win;

	win = __webpack_require__(2);

	mouse = __webpack_require__(5);

	module.exports = Circle = (function() {
	  Circle.prototype.x = 0;

	  Circle.prototype.y = 0;

	  Circle.prototype.a = 0;

	  Circle.prototype.fallSpeed = 0;

	  Circle.prototype.infinite = false;

	  Circle.prototype.group = null;

	  function Circle(scene, x, y, radius) {
	    var center, i, lineWidth, opacity, ring, _i;
	    this.scene = scene;
	    this.x = x;
	    this.y = y;
	    this.radius = radius;
	    this.fallSpeed = Math.random() * (this.radius / 10);
	    this.group = this.scene.makeGroup();
	    this.group.animating = false;
	    center = this.scene.makeCircle(0, 0, this.radius * 2);
	    center.fill = '#eee';
	    center.linewidth = 0;
	    center.type = 'center';
	    if (this.radius < 2) {
	      center.opacity = 0.5;
	    } else {
	      center.opacity = 1;
	    }
	    center.addTo(this.group);
	    for (i = _i = 5; _i >= 0; i = _i += -1) {
	      if (this.radius < 2) {
	        opacity = 0.5;
	        lineWidth = 0.5;
	      } else {
	        opacity = (Math.random() * 0.5) + 0.25;
	        lineWidth = 1.5;
	      }
	      if (i === 5) {
	        opacity = 0.25;
	      }
	      radius = (i * this.radius) + this.radius * 3;
	      ring = this.scene.makeCircle(0, 0, radius);
	      ring.stroke = '#eee';
	      ring.linewidth = lineWidth;
	      ring.opacity = opacity;
	      ring.fill = 'rgba(0,0,0,0)';
	      ring.type = 'ring';
	      ring.addTo(this.group);
	    }
	    this.group.opacity = 0.1;
	    this.group.translation.set(this.x, this.y);
	  }

	  Circle.prototype.update = function() {
	    var mouseNorm, x, y;
	    if (this.x > win.width + 50) {
	      x = -50;
	    } else if (this.x < -50) {
	      x = win.width + 50;
	    } else {
	      x = this.x;
	    }
	    if (this.y > win.height + 50) {
	      y = -50;
	    } else {
	      y = this.y;
	    }
	    if (this.y > win.height - 25) {
	      this.group.opacity -= 0.005;
	    } else {
	      this.group.opacity = 1;
	    }
	    if (this.infinite) {
	      this.x = x + (mouse.x / win.width) * this.radius;
	    } else {
	      mouseNorm = mouse.x / (win.width / 2);
	      this.a += (mouseNorm - this.a) / 50;
	      this.x += (mouseNorm - this.a) * this.radius;
	    }
	    this.y = y + this.fallSpeed;
	    return this.group.translation.set(this.x, this.y);
	  };

	  return Circle;

	})();


/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports) {

	var Line;

	module.exports = Line = (function() {
	  Line.prototype.origin = null;

	  Line.prototype.points = [];

	  Line.prototype.lines = [];

	  function Line(scene, origin, points) {
	    var line, point, _i, _len, _ref;
	    this.scene = scene;
	    this.origin = origin;
	    this.points = points;
	    _ref = this.points;
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      point = _ref[_i];
	      line = this.scene.makeLine(this.origin.x, this.origin.y, point.x, point.y);
	      line.stroke = 'rgba(255,255,255,0.5)';
	      line.opacity = 1;
	      line.point = point;
	      this.lines.push(line);
	    }
	  }

	  Line.prototype.update = function() {
	    var h2, line, w2, _i, _len, _ref, _results;
	    _ref = this.lines;
	    _results = [];
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      line = _ref[_i];
	      w2 = (line.point.x - this.origin.x) / 2;
	      h2 = (line.point.y - this.origin.y) / 2;
	      line.vertices[0].x = -w2;
	      line.vertices[0].y = -h2;
	      line.vertices[1].x = w2;
	      line.vertices[1].y = h2;
	      _results.push(line.translation.set(this.origin.x + w2, this.origin.y + h2));
	    }
	    return _results;
	  };

	  return Line;

	})();


/***/ },
/* 7 */
/***/ function(module, exports) {

	var ENCRYPTED;

	module.exports = ENCRYPTED = (function() {
	  ENCRYPTED.prototype.scene = null;

	  function ENCRYPTED() {
	    var params;
	    params = {
	      width: 500,
	      height: 500
	    };
	    this.scene = new Two(params, {
	      type: 'SVGRenderer'
	    });
	    this.el = document.getElementById('encryption');
	    this.$el = $('#encryption');
	    this.scene.appendTo(this.el);
	    this.makeCircle(100);
	    this.importShape();
	    this.update();
	  }

	  ENCRYPTED.prototype.makeCircle = function(radius) {
	    var center, i, j, opacity, ring, _i;
	    this.group = this.scene.makeGroup();
	    this.group.animating = false;
	    center = this.scene.makeCircle(0, 0, radius);
	    center.fill = '#eee';
	    center.linewidth = 0;
	    center.type = 'center';
	    center.addTo(this.group);
	    j = radius;
	    for (i = _i = 5; _i >= 0; i = _i += -1) {
	      j = j + 20;
	      if (i === 0 || i === 2 || i === 5) {
	        opacity = 0.4;
	      } else {
	        opacity = 0.8;
	      }
	      ring = this.scene.makeCircle(0, 0, j);
	      ring.stroke = '#eee';
	      ring.linewidth = 1.5;
	      ring.opacity = opacity;
	      ring.fill = 'rgba(0,0,0,0)';
	      ring.type = 'ring';
	      ring.addTo(this.group);
	    }
	    this.group.opacity = 1;
	    return this.group.translation.set(this.$el.width() / 2, this.$el.height() / 2);
	  };

	  ENCRYPTED.prototype.importShape = function() {
	    var el;
	    el = document.getElementById('assets').children[0];
	    this.complexShape = this.scene.interpret(el).center();
	    this.complexShape.translation.set(this.$el.width() / 2, this.$el.height() / 2);
	    return this.complexShape.opacity = 0.8;
	  };

	  ENCRYPTED.prototype.update = function() {
	    this.RAF = this.scene.bind('update', (function(_this) {
	      return function(frameCount, timeDelta) {
	        _this.complexShape.rotation += 0.001;
	        return _this.complexShape.scale = 0.02 * Math.sin(frameCount / 20) + 0.54;
	      };
	    })(this));
	    return this.RAF.play();
	  };

	  return ENCRYPTED;

	})();


/***/ }
/******/ ]);