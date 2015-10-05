!function(t){function e(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return t[n].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){var n,r,s,o,a;s=i(1),o=i(9),r=i(10),a=i(11),n=function(){function t(){this.largeDots=new s,this.smallDots=new o,this.encrypted=new r,this.unencrypted=new a}return t}(),t.exports=new n},function(t,e,i){var n,r,s,o,a,h=function(t,e){return function(){return t.apply(e,arguments)}};a=i(2),o=i(4),n=i(5),s=i(8),t.exports=r=function(){function t(){this.update=h(this.update,this),this.createLines=h(this.createLines,this),this.el=$("#large-dots"),this.el&&(this.createScene(),this.createCircles(),this.seperateCircles(),this.createLines(),o.on("update",this.update))}return t.prototype.el=null,t.prototype.circles=[],t.prototype.lines=[],t.prototype.radii=[5,3,2,2],t.prototype.leftCircles=[],t.prototype.rightCircles=[],t.prototype.options={resolution:1,transparent:!0},t.prototype.createScene=function(){return this.renderer=new PIXI.CanvasRenderer(a.width,a.height+100,this.options),this.stage=new PIXI.Container,this.el.append(this.renderer.view)},t.prototype.createCircles=function(){var t,e,i,r,s,o,h;for(h=[],e=o=0;50>o;e=++o)r=Math.random()*a.width,s=Math.random()*a.height,i=this.radii[e%4],t=new n(this.stage,r,s,i),h.push(this.circles.push(t));return h},t.prototype.seperateCircles=function(){var t,e,i,n,r;for(n=this.circles,r=[],e=0,i=n.length;i>e;e++)t=n[e],t.x<a.width/2?r.push(this.leftCircles.push(t)):r.push(this.rightCircles.push(t));return r},t.prototype.createLines=function(){var t,e,i;return e=this.leftCircles[0],i=[this.leftCircles[1],this.leftCircles[2],this.leftCircles[3]],t=new s(this.stage,e,i),e=this.rightCircles[0],i=[this.rightCircles[1],this.rightCircles[2],this.rightCircles[3]],t=new s(this.stage,e,i)},t.prototype.animateScale=function(){var t,e,i,n,r,s,o,a,h,p;if(i=Math.floor(Math.random()*this.circles.length),t=this.circles[i],!t.animating){for(t.animating=!0,e=0,h=t.dot.children,p=[],o=0,a=h.length;a>o;o++)s=h[o],e++,n=0,r={x:1.25,y:1.25,easing:Power2.easeOut,delay:.1*e,onComplete:function(){var e,i,o,a,h;if(n++,5===n){for(a=t.dot.children,h=[],i=0,o=a.length;o>i;i++)s=a[i],e=0,r={x:1,y:1,easing:Power2.easeInOut,onComplete:function(){return e++,5===e?t.animating=!1:void 0}},h.push(TweenMax.to(s.scale,5,r));return h}}},p.push(TweenMax.to(s.scale,1,r));return p}},t.prototype.update=function(t){return this.renderer.render(this.stage),this.animateScale()},t}()},function(t,e,i){var n,r,s=function(t,e){return function(){return t.apply(e,arguments)}};r=i(3),n=function(){function t(){this.resize=s(this.resize,this),r(this),this.window.on("resize",this.resize),this.resize()}return t.prototype.window=$(window),t.prototype.width=0,t.prototype.height=0,t.prototype.resize=function(){return this.width=this.window.width(),this.height=this.window.height(),this.emit("resize")},t}(),t.exports=new n},function(t,e){function i(t){if(!(t&&t instanceof Function))throw new Error(t+" is not a Function")}t.exports=function(t){t=t||{};for(var e in n)t[e]=n[e];return t};var n={__init:function(t){var e=this.__listeners||(this.__listeners=[]);return e[t]||(e[t]=[])},on:function(t,e){i(e),this.__init(t).push(e)},off:function(t,e){var i=this.__init(t);i.splice(i.indexOf(e),1)},once:function(t,e){i(e);var n=this,r=function(){n.off(t,r),e.apply(this,arguments)};this.on(t,r)},emit:function(t){var e,i=this.__init(t).slice(0);for(e in i)i[e].apply(this,[].slice.call(arguments,1))}}},function(t,e,i){var n,r,s=function(t,e){return function(){return t.apply(e,arguments)}};r=i(3),function(){var t,e,i;for(t=0,e=["ms","moz","o"],i=0;i<e.length&&!window.requestAnimationFrame;)window.requestAnimationFrame=window[e[i]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[i]+"CancelAnimationFrame"]||window[e[i]+"CancelRequestAnimationFrame"],++i;return window.requestAnimationFrame||(window.requestAnimationFrame=function(e,i){var n,r,s;return n=(new Date).getTime(),s=Math.max(0,16-(n-t)),r=window.setTimeout(function(){return e(n+s)},s),t=n+s,r}),window.cancelAnimationFrame?void 0:window.cancelAnimationFrame=function(t){return clearTimeout(t)}}(),n=function(){function t(){this.animloop=s(this.animloop,this),r(this),this.start()}return t.prototype.id_animloop=null,t.prototype.start=function(){return this.id_animloop=window.requestAnimationFrame(this.animloop)},t.prototype.stop=function(){return window.cancelAnimationFrame(this.id_animloop),this.id_animloop=null},t.prototype.animloop=function(t){return this.id_animloop=window.requestAnimationFrame(this.animloop),this.emit("update",t)},t}(),t.exports=new n},function(t,e,i){var n,r,s,o,a,h,p,u=function(t,e){return function(){return t.apply(e,arguments)}};h=i(6),p=i(2),a=i(7),s=i(4),o=n,t.exports=r=function(){function t(t,e,i,n){var r,o,a,h,p,d;for(this.stage=t,this.x=e,this.y=i,this.radius=n,this.update=u(this.update,this),this.fallSpeed=Math.random()*(this.radius/10),this.dot=new PIXI.Container,r=new PIXI.Graphics,r.beginFill(16777215,1),r.drawCircle(0,0,2*this.radius),(5===this.radius||3===this.radius)&&(r.alpha=1),2===this.radius&&(r.alpha=.5),1===this.radius&&(r.alpha=.25),o=d=5;d>=0;o=d+=-1){switch(this.radius){case 5:h=.5*Math.random()+.25,a=1.5;break;case 3:h=.5*Math.random()+.25,a=1;break;case 2:h=.5,a=1;break;case 1:h=.25,a=.5}n=o*this.radius+3*this.radius,p=new PIXI.Graphics,p.beginFill(16777215,0),p.lineStyle(a,16777215,1),p.drawCircle(0,0,n),p.alpha=5===o?.25:h,this.dot.addChild(p)}this.dot.x=this.x,this.dot.y=this.y,this.dot.addChild(r),this.stage.addChild(this.dot),s.on("update",this.update)}return t.prototype.x=0,t.prototype.y=0,t.prototype.a=0,t.prototype.update=function(){var t,e;return e=this.y>p.height+100?-50:this.y,this.y>p.height-25?this.dot.alpha-=.005:this.dot.alpha=1,this.dot.y=this.y,this.radius>0?(t=a.x/h.sensitivity,this.a+=(t-this.a)/50,this.x+=(t-this.a)*this.radius,this.y=e+this.fallSpeed,this.dot.x=this.x):void 0},t}()},function(t,e){t.exports={debug:!0,infinite:!1,fallSpeed:.6,scaleTimer:4,sensitivity:1500,shapePath:"images/shape.png"}},function(t,e,i){var n,r,s,o=function(t,e){return function(){return t.apply(e,arguments)}};r=i(3),s=i(2),n=function(){function t(){this.mousemove=o(this.mousemove,this),r(this),this.doc.on("mousemove",this.mousemove)}return t.prototype.doc=$(document),t.prototype.x=0,t.prototype.y=0,t.prototype.mousemove=function(t){return this.x=t.pageX-s.width/2,this.y=t.pageY-s.height/2,this.emit("move")},t}(),t.exports=new n},function(t,e,i){var n,r,s,o=function(t,e){return function(){return t.apply(e,arguments)}};s=i(2),r=i(4),t.exports=n=function(){function t(t,e,i){var n,s,a,h,p;for(this.stage=t,this.origin=e,this.points=i,this.update=o(this.update,this),this.lines=new PIXI.Container,p=this.points,a=0,h=p.length;h>a;a++)s=p[a],n=new PIXI.Graphics,n.owner=s,this.lines.addChild(n);this.stage.addChild(this.lines),r.on("update",this.update)}return t.prototype.update=function(){var t,e,i,n,r,o,a;for(o=this.lines.children,a=[],t=n=0,r=o.length;r>n;t=++n)e=o[t],e.clear(),e.lineStyle(1,16777215,.25),e.owner.y>s.height-4*e.owner.radius&&(e.alpha<=0||(e.alpha-=.01)),this.origin.y>s.height-2*this.origin.radius&&(e.alpha<=0||(e.alpha-=.01)),(e.owner.y<0||this.origin.y<0)&&(i={alpha:1,ease:Power2.easeInOut},TweenMax.to(e,5,i)),e.moveTo(this.origin.x,this.origin.y),a.push(e.lineTo(e.owner.x,e.owner.y));return a},t}()},function(t,e,i){var n,r,s,o,a=function(t,e){return function(){return t.apply(e,arguments)}};o=i(2),r=i(4),n=i(5),t.exports=s=function(){function t(){this.update=a(this.update,this),this.el=$("#small-dots"),this.el&&(this.createScene(),this.createCircles(),r.on("update",this.update))}return t.prototype.options={resolution:1,transparent:!0},t.prototype.el=null,t.prototype.createScene=function(){return this.renderer=new PIXI.CanvasRenderer(o.width,o.height,this.options),this.stage=new PIXI.Container,this.el.append(this.renderer.view)},t.prototype.createCircles=function(){var t,e,i,r,s,a;for(a=[],e=s=0;30>s;e=++s)i=Math.random()*o.width,r=Math.random()*o.height,a.push(t=new n(this.stage,i,r,1));return a},t.prototype.update=function(t){return this.renderer.render(this.stage)},t}()},function(t,e,i){var n,r,s=function(t,e){return function(){return t.apply(e,arguments)}};r=i(4),t.exports=n=function(){function t(){this.update=s(this.update,this),this.el=$("#encrypted"),this.el&&(this.createScene(),this.makeCircle(),this.importShape(),r.on("update",this.update))}return t.prototype.width=600,t.prototype.height=600,t.prototype.options={transparent:!0,resolution:1},t.prototype.radius=100,t.prototype.createScene=function(){return this.renderer=new PIXI.CanvasRenderer(600,600,this.options),this.stage=new PIXI.Container,this.stage.x=this.width/2,this.stage.y=this.height/2,this.el.append(this.renderer.view)},t.prototype.makeCircle=function(){var t,e,i,n,r;for(this.dot=new PIXI.Container,t=new PIXI.Graphics,t.beginFill("0xffffff",1),t.drawCircle(0,0,this.radius),i=this.radius,e=r=5;r>=0;e=r+=-1)i+=24,n=new PIXI.Graphics,n.lineStyle(1.5,"0xffffff",1),n.drawCircle(0,0,i),n.alpha=.5*Math.random()+.25,n.type="ring",this.dot.addChild(n);return this.dot.addChild(t),this.stage.addChild(this.dot)},t.prototype.importShape=function(){var t,e;return this.complexShape=new PIXI.Container,e=PIXI.Texture.fromImage("images/shape.png"),t=new PIXI.Sprite(e),t.alpha=.4,t.x=-102,t.y=-102,t.scale.x=.52,t.scale.y=.52,this.complexShape.addChild(t),this.stage.addChild(this.complexShape)},t.prototype.animate=function(t){var e,i,n,r,s;for(this.complexShape.rotation+=.001,this.complexShape.scale.x=.02*Math.sin(t/300)+1,this.complexShape.scale.y=.02*Math.sin(t/300)+1,r=this.dot.children,s=[],i=0,n=r.length;n>i;i++)e=r[i],"ring"===e.type?(e.alpha-=.005,e.alpha<=.1?s.push(TweenMax.to(e,3,{alpha:.8*Math.random()+.2})):s.push(void 0)):s.push(void 0);return s},t.prototype.update=function(t){return this.renderer.render(this.stage),this.animate(t)},t}()},function(t,e,i){var n,r,s=function(t,e){return function(){return t.apply(e,arguments)}};n=i(4),t.exports=r=function(){function t(){this.update=s(this.update,this),this.el=$("#unencrypted"),this.el&&(this.createScene(),this.bigRing(),this.smallDots(),n.on("update",this.update))}return t.prototype.width=700,t.prototype.height=700,t.prototype.options={antialias:!0,transparent:!0},t.prototype.count=200,t.prototype.radius=250,t.prototype.speed=5,t.prototype.createScene=function(){return this.renderer=new PIXI.autoDetectRenderer(this.width,this.height,this.options),this.stage=new PIXI.Container,this.stage.x=this.width/2,this.stage.y=this.height/2,this.el.append(this.renderer.view)},t.prototype.bigRing=function(){var t;return t=new PIXI.Graphics,t.beginFill("0x000000",0),t.lineStyle(3,"0x000000",1),t.drawCircle(0,0,this.radius),t.alpha=1,this.stage.addChild(t)},t.prototype.smallDots=function(){var t,e,i,n,r,s;for(this.dots=new PIXI.Container,t=r=0,s=this.count;s>=0?s>r:r>s;t=s>=0?++r:--r)e=new PIXI.Graphics,e.beginFill("0x000000",1),e.drawCircle(0,0,15*Math.random()+5),e.type="dot",e.alpha=Math.random()+.15,e.angle=t/(this.count/2)*Math.PI,i=Math.random()*this.radius-this.radius/2+50,n=this.radius/2,e.x=(n+i)*Math.cos(e.angle),e.y=(n+i)*Math.sin(e.angle),this.dots.addChild(e);return this.stage.addChild(this.dots)},t.prototype.animate=function(){var t,e,i,n,r,s,o;for(s=this.dots.children,o=[],n=0,r=s.length;r>n;n++)t=s[n],e=t.x,i=t.y,75>e&&e>-75&&75>i&&i>-75&&(t.alpha-=.001,t.alpha<=0&&(e=(this.radius+50)*Math.cos(t.angle),i=(this.radius+50)*Math.sin(t.angle),TweenMax.to(t,3,{alpha:Math.random(),ease:Power2.easeIn}))),t.x=e-.01*this.speed*Math.cos(t.angle),o.push(t.y=i-.01*this.speed*Math.sin(t.angle));return o},t.prototype.update=function(t){return this.renderer.render(this.stage),this.animate()},t}()}]);