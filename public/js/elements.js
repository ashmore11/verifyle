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
/***/ function(module, exports) {

	var APP, Circle, Line,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	$(function() {
	  var app;
	  return app = new APP;
	});

	APP = (function() {
	  APP.prototype.win = {
	    w: $(window).outerWidth(),
	    h: $(window).outerHeight()
	  };

	  APP.prototype.mouse = {
	    x: 0,
	    y: 0
	  };

	  APP.prototype.Scene = null;

	  APP.prototype.circles = [];

	  APP.prototype.lines = [];

	  function APP() {
	    this.mousemove = __bind(this.mousemove, this);
	    window.APP = this;
	    this.el = document.getElementById('scene');
	    $(document).on('mousemove', this.mousemove);
	    this.Scene = new Two({
	      fullscreen: true,
	      type: 'SVGRenderer'
	    });
	    this.Scene.appendTo(this.el);
	    this.createCircles();
	    this.createLines();
	    this.animateScale();
	    this.animateScene();
	  }

	  APP.prototype.createCircles = function() {
	    var circle, i, radius, x, y, _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 250; i = ++_i) {
	      circle = new Circle;
	      x = Math.random() * this.win.w;
	      y = Math.random() * this.win.h;
	      radius = (Math.random() * 30) + 5;
	      circle.makeCircle(x, y, radius);
	      _results.push(this.circles.push(circle));
	    }
	    return _results;
	  };

	  APP.prototype.createLines = function() {
	    var i, line, origin, point, points, _i, _j, _results;
	    _results = [];
	    for (i = _i = 0; _i < 6; i = ++_i) {
	      line = new Line;
	      origin = this.circles[Math.floor(Math.random() * this.circles.length)];
	      points = [];
	      for (i = _j = 0; _j < 3; i = ++_j) {
	        point = this.circles[Math.floor(Math.random() * this.circles.length)];
	        points.push(point);
	      }
	      line.makeLine(origin, points);
	      _results.push(this.lines.push(line));
	    }
	    return _results;
	  };

	  APP.prototype.mousemove = function(event) {
	    return this.mouse = {
	      x: event.pageX - (this.win.w / 2),
	      y: event.pageY - (this.win.h / 2)
	    };
	  };

	  APP.prototype.animateScale = function() {
	    var circle, i, index, j, key, ring, tween, _ref, _results;
	    index = Math.floor(Math.random() * this.circles.length);
	    circle = this.circles[index];
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
	            }, 3000).easing(TWEEN.Easing.Cubic.InOut);
	            _results1.push(tween.start());
	          }
	          return _results1;
	        }
	      });
	      _results.push(tween.start());
	    }
	    return _results;
	  };

	  APP.prototype.animateScene = function() {
	    this.RAF = this.Scene.bind('update', (function(_this) {
	      return function(frameCount, timeDelta) {
	        var circle, lines, _i, _j, _len, _len1, _ref, _ref1;
	        if (frameCount % 50 === 1) {
	          _this.animateScale();
	        }
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

	  return APP;

	})();

	Line = (function() {
	  Line.prototype.win = {
	    w: $(window).outerWidth(),
	    h: $(window).outerHeight()
	  };

	  Line.prototype.origin = null;

	  Line.prototype.points = [];

	  Line.prototype.lines = [];

	  function Line() {
	    this.scene = window.APP.Scene;
	  }

	  Line.prototype.makeLine = function(origin, points) {
	    var line, point, _i, _len, _ref, _results;
	    this.origin = origin;
	    this.points = points;
	    _ref = this.points;
	    _results = [];
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      point = _ref[_i];
	      line = this.scene.makeLine(this.origin.x, this.origin.y, point.x, point.y);
	      line.stroke = '#eee';
	      line.opacity = 1;
	      line.point = point;
	      _results.push(this.lines.push(line));
	    }
	    return _results;
	  };

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

	Circle = (function() {
	  Circle.prototype.win = {
	    w: $(window).outerWidth(),
	    h: $(window).outerHeight()
	  };

	  Circle.prototype.x = 0;

	  Circle.prototype.y = 0;

	  Circle.prototype.group = null;

	  Circle.prototype.fallSpeed = 0;

	  function Circle() {
	    this.scene = window.APP.Scene;
	  }

	  Circle.prototype.makeCircle = function(x, y, radius) {
	    var center, i, ring, _i;
	    this.x = x;
	    this.y = y;
	    this.radius = radius;
	    this.group = this.scene.makeGroup();
	    this.delta = new Two.Vector;
	    this.fallSpeed = Math.random() * 3.05 + 1.05;
	    for (i = _i = 3; _i >= 0; i = _i += -1) {
	      radius = (i * this.radius) + this.radius * 2;
	      ring = this.scene.makeCircle(0, 0, radius);
	      ring.stroke = randomColor({
	        hue: 'monochrome',
	        luminosity: 'light'
	      });
	      ring.linewidth = 1;
	      ring.opacity = 1;
	      ring.type = 'ring';
	      ring.fill = 'rgba(0,0,0,0)';
	      if (i === 3) {
	        ring.fill = 'black';
	      }
	      ring.addTo(this.group);
	    }
	    center = this.scene.makeCircle(0, 0, this.radius);
	    center.fill = '#eee';
	    center.linewidth = 0;
	    center.type = 'center';
	    center.addTo(this.group);
	    return this.group.translation.set(this.x, this.y);
	  };

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
	    this.x = x + (mouse.x / 10) / this.radius;
	    this.y = y + this.fallSpeed;
	    return this.group.translation.set(this.x, this.y);
	  };

	  return Circle;

	})();


/***/ }
/******/ ]);