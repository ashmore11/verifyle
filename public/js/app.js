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

	Encrypted = __webpack_require__(4);

	APP = (function() {
	  function APP() {
	    this.encrypted = new Encrypted;
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

	var Circle, DOTS, Line,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Circle = __webpack_require__(2);

	Line = __webpack_require__(3);

	module.exports = DOTS = (function() {
	  DOTS.prototype.win = {
	    w: $(window).outerWidth(),
	    h: $(window).outerHeight()
	  };

	  DOTS.prototype.mouse = {
	    x: 0,
	    y: 0
	  };

	  DOTS.prototype.scene = null;

	  DOTS.prototype.el = null;

	  DOTS.prototype.circles = [];

	  DOTS.prototype.lines = [];

	  function DOTS() {
	    this.resize = __bind(this.resize, this);
	    this.mousemove = __bind(this.mousemove, this);
	    var params;
	    window.DOTS = this;
	    $(document).on('mousemove', this.mousemove);
	    $(window).on('resize', this.resize);
	    params = {
	      width: this.win.w,
	      height: this.win.h + 100
	    };
	    this.scene = new Two(params, {
	      type: 'SVGRenderer'
	    });
	    this.el = document.getElementById('dots');
	    this.scene.appendTo(this.el);
	    this.createCircles();
	    this.animateScene();
	  }

	  DOTS.prototype.createCircles = function() {
	    var circle, i, radius, x, y, _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 60; i = ++_i) {
	      x = Math.random() * this.win.w;
	      y = Math.random() * this.win.h;
	      radius = (Math.random() * 5) + 1;
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

	  DOTS.prototype.mousemove = function(event) {
	    return this.mouse = {
	      x: event.pageX - (this.win.w / 2),
	      y: event.pageY - (this.win.h / 2)
	    };
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
	        var _ref1, _results1;
	        j++;
	        if (j === 5) {
	          _ref1 = circle.group.children;
	          _results1 = [];
	          for (key in _ref1) {
	            ring = _ref1[key];
	            tween = new TWEEN.Tween(ring).to({
	              scale: 1
	            }, 3000).easing(TWEEN.Easing.Cubic.InOut).onComplete(function() {
	              return circle.group.animating = false;
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

	  DOTS.prototype.animateScene = function() {
	    this.RAF = this.scene.bind('update', (function(_this) {
	      return function(frameCount, timeDelta) {
	        var circle, lines, _i, _j, _len, _len1, _ref, _ref1;
	        _ref = _this.circles;
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          circle = _ref[_i];
	          circle.update(_this.mouse);
	        }
	        _ref1 = _this.lines;
	        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
	          lines = _ref1[_j];
	          lines.update();
	        }
	        return TWEEN.update();
	      };
	    })(this));
	    return this.RAF.play();
	  };

	  DOTS.prototype.resize = function() {
	    this.win = {
	      w: $(window).outerWidth(),
	      h: $(window).outerHeight()
	    };
	    return this.scene.width = this.win.w;
	  };

	  return DOTS;

	})();


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Circle,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	module.exports = Circle = (function() {
	  Circle.prototype.win = {
	    w: $(window).outerWidth(),
	    h: $(window).outerHeight()
	  };

	  Circle.prototype.x = 0;

	  Circle.prototype.y = 0;

	  Circle.prototype.group = null;

	  Circle.prototype.fallSpeed = 0;

	  function Circle(scene, x, y, radius) {
	    var center, i, lineWidth, opacity, ring, _i;
	    this.scene = scene;
	    this.x = x;
	    this.y = y;
	    this.radius = radius;
	    this.resize = __bind(this.resize, this);
	    $(window).on('resize', this.resize);
	    this.scene = window.DOTS.scene;
	    this.fallSpeed = Math.random() * 0.01 + 0.125;
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
	        opacity = (0.175 * -i) + 1;
	        lineWidth = 1.5;
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

	  Circle.prototype.randomRing = function() {
	    var ids, index, key, ring;
	    ids = [];
	    for (key in this.group.children) {
	      ids.push(key);
	    }
	    index = Math.floor(Math.random() * ids.length);
	    if (index === 0) {
	      index = index + 1;
	    }
	    if (index === ids.length - 1) {
	      index = index - 1;
	    }
	    ring = this.group.children[ids[index]];
	    return ring;
	  };

	  Circle.prototype.update = function(mouse) {
	    var x, y;
	    if (this.x > this.win.w + 50) {
	      x = -50;
	    } else if (this.x < -50) {
	      x = this.win.w + 50;
	    } else {
	      x = this.x;
	    }
	    if (this.y > this.win.h + 50) {
	      y = -50;
	    } else {
	      y = this.y;
	    }
	    if (this.y > this.win.h - 25) {
	      this.group.opacity -= 0.005;
	    } else {
	      this.group.opacity = 1;
	    }
	    this.x = x + (mouse.x / 3000) / this.radius;
	    this.y = y + this.fallSpeed;
	    return this.group.translation.set(this.x, this.y);
	  };

	  Circle.prototype.resize = function() {
	    this.win = {
	      w: $(window).outerWidth(),
	      h: $(window).outerHeight()
	    };
	    return this.scene.width = this.win.w;
	  };

	  return Circle;

	})();


/***/ },
/* 3 */
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
/* 4 */
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