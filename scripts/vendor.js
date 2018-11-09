/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return n.indexOf(t)==-1&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return n!=-1&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){i=i.slice(0),t=t||[];for(var n=this._onceEvents&&this._onceEvents[e],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(e,r),delete n[r]),r.apply(this,t)}return this}},t.allOff=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){if(Array.isArray(e))return e;var t="object"==typeof e&&"number"==typeof e.length;return t?d.call(e):[e]}function o(e,t,r){if(!(this instanceof o))return new o(e,t,r);var s=e;return"string"==typeof e&&(s=document.querySelectorAll(e)),s?(this.elements=n(s),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(this.check.bind(this))):void a.error("Bad element for imagesLoaded "+(s||e))}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console,d=Array.prototype.slice;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&u[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var u={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});

/**
 * jQuery.marquee - scrolling text like old marquee element
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com / http://aamirafridi.com/jquery/jquery-marquee-plugin
 */
(function(f){f.fn.marquee=function(x){return this.each(function(){var a=f.extend({},f.fn.marquee.defaults,x),b=f(this),c,t,e=3,y="animation-play-state",p=!1,E=function(a,b,c){for(var e=["webkit","moz","MS","o",""],d=0;d<e.length;d++)e[d]||(b=b.toLowerCase()),a.addEventListener(e[d]+b,c,!1)},F=function(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(c+":"+a[c]);b.push();return"{"+b.join(",")+"}"},l={pause:function(){p&&a.allowCss3Support?c.css(y,"paused"):f.fn.pause&&c.pause();b.data("runningStatus",
"paused");b.trigger("paused")},resume:function(){p&&a.allowCss3Support?c.css(y,"running"):f.fn.resume&&c.resume();b.data("runningStatus","resumed");b.trigger("resumed")},toggle:function(){l["resumed"==b.data("runningStatus")?"pause":"resume"]()},destroy:function(){clearTimeout(b.timer);b.find("*").addBack().unbind();b.html(b.find(".js-marquee:first").html())}};if("string"===typeof x)f.isFunction(l[x])&&(c||(c=b.find(".js-marquee-wrapper")),!0===b.data("css3AnimationIsSupported")&&(p=!0),l[x]());else{var u;
f.each(a,function(c,d){u=b.attr("data-"+c);if("undefined"!==typeof u){switch(u){case "true":u=!0;break;case "false":u=!1}a[c]=u}});a.speed&&(a.duration=parseInt(b.width(),10)/a.speed*1E3);var v="up"==a.direction||"down"==a.direction;a.gap=a.duplicated?parseInt(a.gap):0;b.wrapInner('<div class="js-marquee"></div>');var h=b.find(".js-marquee").css({"margin-right":a.gap,"float":"left"});a.duplicated&&h.clone(!0).appendTo(b);b.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');
c=b.find(".js-marquee-wrapper");if(v){var k=b.height();c.removeAttr("style");b.height(k);b.find(".js-marquee").css({"float":"none","margin-bottom":a.gap,"margin-right":0});a.duplicated&&b.find(".js-marquee:last").css({"margin-bottom":0});var q=b.find(".js-marquee:first").height()+a.gap;a.startVisible&&!a.duplicated?(a._completeDuration=(parseInt(q,10)+parseInt(k,10))/parseInt(k,10)*a.duration,a.duration*=parseInt(q,10)/parseInt(k,10)):a.duration*=(parseInt(q,10)+parseInt(k,10))/parseInt(k,10)}else{var m=
b.find(".js-marquee:first").width()+a.gap;var n=b.width();a.startVisible&&!a.duplicated?(a._completeDuration=(parseInt(m,10)+parseInt(n,10))/parseInt(n,10)*a.duration,a.duration*=parseInt(m,10)/parseInt(n,10)):a.duration*=(parseInt(m,10)+parseInt(n,10))/parseInt(n,10)}a.duplicated&&(a.duration/=2);if(a.allowCss3Support){h=document.body||document.createElement("div");var g="marqueeAnimation-"+Math.floor(1E7*Math.random()),A=["Webkit","Moz","O","ms","Khtml"],B="animation",d="",r="";h.style.animation&&
(r="@keyframes "+g+" ",p=!0);if(!1===p)for(var z=0;z<A.length;z++)if(void 0!==h.style[A[z]+"AnimationName"]){h="-"+A[z].toLowerCase()+"-";B=h+B;y=h+y;r="@"+h+"keyframes "+g+" ";p=!0;break}p&&(d=g+" "+a.duration/1E3+"s "+a.delayBeforeStart/1E3+"s infinite "+a.css3easing,b.data("css3AnimationIsSupported",!0))}var C=function(){c.css("transform","translateY("+("up"==a.direction?k+"px":"-"+q+"px")+")")},D=function(){c.css("transform","translateX("+("left"==a.direction?n+"px":"-"+m+"px")+")")};a.duplicated?
(v?a.startVisible?c.css("transform","translateY(0)"):c.css("transform","translateY("+("up"==a.direction?k+"px":"-"+(2*q-a.gap)+"px")+")"):a.startVisible?c.css("transform","translateX(0)"):c.css("transform","translateX("+("left"==a.direction?n+"px":"-"+(2*m-a.gap)+"px")+")"),a.startVisible||(e=1)):a.startVisible?e=2:v?C():D();var w=function(){a.duplicated&&(1===e?(a._originalDuration=a.duration,a.duration=v?"up"==a.direction?a.duration+k/(q/a.duration):2*a.duration:"left"==a.direction?a.duration+n/
(m/a.duration):2*a.duration,d&&(d=g+" "+a.duration/1E3+"s "+a.delayBeforeStart/1E3+"s "+a.css3easing),e++):2===e&&(a.duration=a._originalDuration,d&&(g+="0",r=f.trim(r)+"0 ",d=g+" "+a.duration/1E3+"s 0s infinite "+a.css3easing),e++));v?a.duplicated?(2<e&&c.css("transform","translateY("+("up"==a.direction?0:"-"+q+"px")+")"),t={transform:"translateY("+("up"==a.direction?"-"+q+"px":0)+")"}):a.startVisible?2===e?(d&&(d=g+" "+a.duration/1E3+"s "+a.delayBeforeStart/1E3+"s "+a.css3easing),t={transform:"translateY("+
("up"==a.direction?"-"+q+"px":k+"px")+")"},e++):3===e&&(a.duration=a._completeDuration,d&&(g+="0",r=f.trim(r)+"0 ",d=g+" "+a.duration/1E3+"s 0s infinite "+a.css3easing),C()):(C(),t={transform:"translateY("+("up"==a.direction?"-"+c.height()+"px":k+"px")+")"}):a.duplicated?(2<e&&c.css("transform","translateX("+("left"==a.direction?0:"-"+m+"px")+")"),t={transform:"translateX("+("left"==a.direction?"-"+m+"px":0)+")"}):a.startVisible?2===e?(d&&(d=g+" "+a.duration/1E3+"s "+a.delayBeforeStart/1E3+"s "+a.css3easing),
t={transform:"translateX("+("left"==a.direction?"-"+m+"px":n+"px")+")"},e++):3===e&&(a.duration=a._completeDuration,d&&(g+="0",r=f.trim(r)+"0 ",d=g+" "+a.duration/1E3+"s 0s infinite "+a.css3easing),D()):(D(),t={transform:"translateX("+("left"==a.direction?"-"+m+"px":n+"px")+")"});b.trigger("beforeStarting");if(p){c.css(B,d);var h=r+" { 100%  "+F(t)+"}",l=c.find("style");0!==l.length?l.filter(":last").html(h):f("head").append("<style>"+h+"</style>");E(c[0],"AnimationIteration",function(){b.trigger("finished")});
E(c[0],"AnimationEnd",function(){w();b.trigger("finished")})}else c.animate(t,a.duration,a.easing,function(){b.trigger("finished");a.pauseOnCycle?b.timer=setTimeout(w,a.delayBeforeStart):w()});b.data("runningStatus","resumed")};b.bind("pause",l.pause);b.bind("resume",l.resume);a.pauseOnHover&&(b.bind("mouseenter",l.pause),b.bind("mouseleave",l.resume));p&&a.allowCss3Support?w():b.timer=setTimeout(w,a.delayBeforeStart)}})};f.fn.marquee.defaults={allowCss3Support:!0,css3easing:"linear",easing:"linear",
delayBeforeStart:1E3,direction:"left",duplicated:!1,duration:5E3,gap:20,pauseOnCycle:!1,pauseOnHover:!1,startVisible:!1}})(jQuery);

(function ($) {
    function FollowCursor(config) {
        this.init(config);
    }

    FollowCursor.prototype = {
        middleX : 0,
        middleY : 0,

        //----------------------- protected properties and methods -------------
        /**
         * @protected
         */
        constructor: FollowCursor,

        /**
         * Container element. Should be passed into constructor config
         * @protected
         * @type {jQuery}
         */
        el: null,

        /**
         * Init/re-init the object
         * @param {object} config - Config
         */
        init: function(config) {
            $.extend(this, config);
        },

        handleMove: function(event) {
            var newY = 0;
            var newX = 0;
            var middleX = this.middleX;
            var middleY = this.middleY;
            var degrees = 0;

            /* done together in just four quadrants. */
            if (event.pageY < middleY && event.pageX < middleX) {
              /* upper left. */
              newY = middleY - event.pageY;
              newX = middleX - event.pageX;

              var radians = Math.atan2(newY, newX);
              degrees = radians * (180 / Math.PI);
              degrees = 90 - degrees;
              degrees *= -1;
            } else if (event.pageY < middleY && event.pageX > middleX) {
              /* upper right. */
              newY = middleY - event.pageY;
              newX = event.pageX - middleX;
              add = 0.25 * 360;

              var radians = Math.atan2(newY, newX);
              degrees = radians * (180 / Math.PI);
              degrees = 90 - degrees;
            } else if (event.pageY > middleY && event.pageX > middleX) {
              /* lower right. */
              newY = event.pageY - middleY;
              newX = event.pageX - middleX;
              add = 0.5 * 360;

              var radians = Math.atan2(newY, newX);
              degrees = radians * (180 / Math.PI);
              degrees += 90;
            } else if (event.pageY > middleY && event.pageX < middleX) {
              /* lower left. */
              newY = event.pageY - middleY;
              newX = middleX - event.pageX;
              add = 0.75 * 360;

              var radians = Math.atan2(newY, newX);
              degrees = radians * (180 / Math.PI);
              degrees += 90;
              degrees *= -1;
            } else if (event.pageX < middleX && event.pageY == middleY) {
              /* west */
              degrees = -90;
            } else if (event.pageX == middleX && event.pageY > middleY) {
              /* south */
              degrees = -180;
            } else if (event.pageX > middleX && event.pageY == middleY) {
              /* east */
              degrees = 90;
            }

            var $cvs = this.el;
            // the degrees in this transform are absolute!
            $cvs.css('-ms-transform', 'rotate(' + degrees + 'deg)');
            $cvs.css('-o-transform', 'rotate(' + degrees + 'deg)');
            $cvs.css('-webkit-transform', 'rotate(' + degrees + 'deg)');
            $cvs.css('-moz-transform', 'rotate(' + degrees + 'deg)');
        }
    }

    //----------------------- Initiating jQuery plugin -------------------------

    /**
     * Set an element to rotate following the mouse movement.
     */
    $.fn.followCursor = function() {
        var dataName = 'followCursor';

        return this.each(function() {
            var el = $(this);
            var initialConfig = $.extend({}, el.data());
            config = $.extend(initialConfig, {});
            config.el = el;
            var instance = new FollowCursor(config);

            var position = el.offset();
            var realWidth = el.outerWidth();
            var realHeight = el.outerHeight();
            var middleX = position.left + (el.width() / 2);
            var middleY = position.top + (el.height() / 2);

            instance.middleX = middleX;
            instance.middleY = middleY;

            el.data(dataName, instance);

            $(document).mousemove(function(event) {
                instance.handleMove(event);
            });
        });
    };
}(jQuery));

!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("UniversalTilt",[],t):"object"==typeof exports?exports.UniversalTilt=t():e.UniversalTilt=t()}(window,function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";(function(e){function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}n.d(t,"a",function(){return o});var s,o=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t.length>0?this.init(t,n):0!==t.length&&(this.element=t,this.settings=this.settings(n),this.reverse=this.settings.reverse?-1:1,this.settings.shine&&this.shine(),this.element.style.transform="perspective(".concat(this.settings.perspective,"px)"),this.addEventListeners())}return function(e,t,n){t&&i(e.prototype,t),n&&i(e,n)}(e,[{key:"init",value:function(t,n){var i=!0,s=!1,o=void 0;try{for(var a,r=t[Symbol.iterator]();!(i=(a=r.next()).done);i=!0){var l=a.value;this.universalTilt=new e(l,n)}}catch(e){s=!0,o=e}finally{try{i||null==r.return||r.return()}finally{if(s)throw o}}}},{key:"isMobile",value:function(){if(window.DeviceMotionEvent&&"ontouchstart"in document.documentElement)return!0}},{key:"addEventListeners",value:function(){var e=this;navigator.userAgent.match(this.settings.exclude)||(this.isMobile()?window.addEventListener("devicemotion",function(t){return e.onDeviceMove(t)}):("element"===this.settings["position-base"]?this.base=this.element:"window"===this.settings["position-base"]&&(this.base=window),this.base.addEventListener("mouseenter",function(t){return e.onMouseEnter(t)}),this.base.addEventListener("mousemove",function(t){return e.onMouseMove(t)}),this.base.addEventListener("mouseleave",function(t){return e.onMouseLeave(t)})))}},{key:"onMouseEnter",value:function(e){this.updateElementPosition(),this.transitions(),"function"==typeof this.settings.onMouseEnter&&this.settings.onMouseEnter(this.element)}},{key:"onMouseMove",value:function(e){var t=this;this.event=e,this.updateElementPosition(),window.requestAnimationFrame(function(){return t.update()}),"function"==typeof this.settings.onMouseMove&&this.settings.onMouseMove(this.element)}},{key:"onMouseLeave",value:function(e){var t=this;this.transitions(),window.requestAnimationFrame(function(){return t.reset()}),"function"==typeof this.settings.onMouseLeave&&this.settings.onMouseLeave(this.element)}},{key:"onDeviceMove",value:function(e){this.event=e,this.update(),this.updateElementPosition(),this.transitions(),"function"==typeof this.settings.onDeviceMove&&this.settings.onDeviceMove(this.element)}},{key:"reset",value:function(){this.event={pageX:this.left+this.width/2,pageY:this.top+this.height/2},this.settings.reset&&(this.element.style.transform="perspective(".concat(this.settings.perspective,"px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)")),this.settings.shine&&!this.settings["shine-save"]&&Object.assign(this.shineElement.style,{transform:"rotate(180deg) translate3d(-50%, -50%, 0)",opacity:"0"})}},{key:"getValues",value:function(){var e,t,n;this.isMobile()?(e=this.event.accelerationIncludingGravity.x/4,t=this.event.accelerationIncludingGravity.y/4,90===window.orientation?(n=(1-t)/2,t=(1+e)/2,e=n):-90===window.orientation?(n=(1+t)/2,t=(1-e)/2,e=n):0===window.orientation?(t=n=(1+t)/2,e=(1+e)/2):180===window.orientation&&(t=n=(1-t)/2,e=(1-e)/2)):"element"===this.settings["position-base"]?(e=(this.event.clientX-this.left)/this.width,t=(this.event.clientY-this.top)/this.height):"window"===this.settings["position-base"]&&(e=this.event.clientX/window.innerWidth,t=this.event.clientY/window.innerHeight);e=Math.min(Math.max(e,0),1),t=Math.min(Math.max(t,0),1);var i=(this.settings.max/2-e*this.settings.max).toFixed(2),s=(t*this.settings.max-this.settings.max/2).toFixed(2),o=Math.atan2(e-.5,.5-t)*(180/Math.PI);return{tiltX:this.reverse*i,tiltY:this.reverse*s,angle:o}}},{key:"updateElementPosition",value:function(){var e=this.element.getBoundingClientRect();this.width=this.element.offsetWidth,this.height=this.element.offsetHeight,this.left=e.left,this.top=e.top}},{key:"update",value:function(){var e=this.getValues();this.element.style.transform="perspective(".concat(this.settings.perspective,"px)\n      rotateX(").concat(this.settings.disabled&&"X"===this.settings.disabled.toUpperCase()?0:e.tiltY,"deg)\n      rotateY(").concat(this.settings.disabled&&"Y"===this.settings.disabled.toUpperCase()?0:e.tiltX,"deg)\n      scale3d(").concat(this.settings.scale,", ").concat(this.settings.scale,", ").concat(this.settings.scale,")"),this.settings.shine&&Object.assign(this.shineElement.style,{transform:"rotate(".concat(e.angle,"deg) translate3d(-50%, -50%, 0)"),opacity:"".concat(this.settings["shine-opacity"])}),this.element.dispatchEvent(new CustomEvent("tiltChange",{detail:e}))}},{key:"shine",value:function(){var e=document.createElement("div"),t=document.createElement("div");e.classList.add("shine"),t.classList.add("shine-inner"),e.appendChild(t),this.element.appendChild(e),this.shineWrapper=this.element.querySelector(".shine"),this.shineElement=this.element.querySelector(".shine-inner"),Object.assign(this.shineWrapper.style,{position:"absolute",top:"0",left:"0",height:"100%",width:"100%",overflow:"hidden"}),Object.assign(this.shineElement.style,{position:"absolute",top:"50%",left:"50%","pointer-events":"none","background-image":"linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",width:"".concat(2*this.element.offsetWidth,"px"),height:"".concat(2*this.element.offsetWidth,"px"),transform:"rotate(180deg) translate3d(-50%, -50%, 0)","transform-origin":"0% 0%",opacity:"0"})}},{key:"transitions",value:function(){var e=this;clearTimeout(this.timeout),this.element.style.transition="all ".concat(this.settings.speed,"ms ").concat(this.settings.easing),this.settings.shine&&(this.shineElement.style.transition="opacity ".concat(this.settings.speed,"ms ").concat(this.settings.easing)),this.timeout=setTimeout(function(){e.element.style.transition="",e.settings.shine&&(e.shineElement.style.transition="")},this.settings.speed)}},{key:"settings",value:function(e){var t={"position-base":"element",reset:!0,exclude:null,shine:!1,"shine-opacity":0,"shine-save":!1,max:35,perspective:1e3,scale:1,disabled:null,reverse:!1,speed:300,easing:"cubic-bezier(.03, .98, .52, .99)",onMouseEnter:null,onMouseMove:null,onMouseLeave:null,onDeviceMove:null},n={};for(var i in t)if(i in e)n[i]=e[i];else if(this.element.getAttribute("data-".concat(i))){var s=this.element.getAttribute("data-".concat(i));try{n[i]=JSON.parse(s)}catch(e){n[i]=s}}else n[i]=t[i];return n}}]),e}();("undefined"!=typeof document&&new o(document.querySelectorAll("[tilt]")),"undefined"!=typeof window?s=window:void 0!==e&&(s=e),s&&s.jQuery)&&(s.jQuery.fn.universalTilt=function(e){new o(this,e)})}).call(this,n(2))},function(e,t,n){"use strict";n.r(t);var i=n(0);t.default=i.a},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n}])});
