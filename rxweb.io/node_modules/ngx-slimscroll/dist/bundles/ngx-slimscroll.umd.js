(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ngx-slimscroll', ['exports', '@angular/core', '@angular/common', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global['ngx-slimscroll'] = {}),global.ng.core,global.ng.common,global.rxjs,global.rxjs.operators));
}(this, (function (exports,core,common,rxjs,operators) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var SlimScrollEvent = (function () {
        function SlimScrollEvent(obj) {
            this.type = obj.type;
            this.y = obj && obj.y ? obj.y : 0;
            this.percent = obj && obj.percent ? obj.percent : 0;
            this.duration = obj && obj.duration ? obj.duration : 0;
            this.easing = obj && obj.easing ? obj.easing : 'linear';
        }
        return SlimScrollEvent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ SLIMSCROLL_DEFAULTS = new core.InjectionToken('NGX_SLIMSCROLL_DEFAULTS');
    var SlimScrollOptions = (function () {
        function SlimScrollOptions(obj) {
            this.position = obj && obj.position ? obj.position : 'right';
            this.barBackground = obj && obj.barBackground ? obj.barBackground : '#343a40';
            this.barOpacity = obj && obj.barOpacity ? obj.barOpacity : '1';
            this.barWidth = obj && obj.barWidth ? obj.barWidth : '12';
            this.barBorderRadius = obj && obj.barBorderRadius ? obj.barBorderRadius : '5';
            this.barMargin = obj && obj.barMargin ? obj.barMargin : '1px 0';
            this.gridBackground = obj && obj.gridBackground ? obj.gridBackground : '#adb5bd';
            this.gridOpacity = obj && obj.gridOpacity ? obj.gridOpacity : '1';
            this.gridWidth = obj && obj.gridWidth ? obj.gridWidth : '8';
            this.gridBorderRadius = obj && obj.gridBorderRadius ? obj.gridBorderRadius : '10';
            this.gridMargin = obj && obj.gridMargin ? obj.gridMargin : '1px 2px';
            this.alwaysVisible = obj && typeof obj.alwaysVisible !== 'undefined' ? obj.alwaysVisible : true;
            this.visibleTimeout = obj && obj.visibleTimeout ? obj.visibleTimeout : 1000;
        }
        /**
         * @param {?=} obj
         * @return {?}
         */
        SlimScrollOptions.prototype.merge = /**
         * @param {?=} obj
         * @return {?}
         */
            function (obj) {
                var /** @type {?} */ result = new SlimScrollOptions();
                result.position = obj && obj.position ? obj.position : this.position;
                result.barBackground = obj && obj.barBackground ? obj.barBackground : this.barBackground;
                result.barOpacity = obj && obj.barOpacity ? obj.barOpacity : this.barOpacity;
                result.barWidth = obj && obj.barWidth ? obj.barWidth : this.barWidth;
                result.barBorderRadius = obj && obj.barBorderRadius ? obj.barBorderRadius : this.barBorderRadius;
                result.barMargin = obj && obj.barMargin ? obj.barMargin : this.barMargin;
                result.gridBackground = obj && obj.gridBackground ? obj.gridBackground : this.gridBackground;
                result.gridOpacity = obj && obj.gridOpacity ? obj.gridOpacity : this.gridBackground;
                result.gridWidth = obj && obj.gridWidth ? obj.gridWidth : this.gridWidth;
                result.gridBorderRadius = obj && obj.gridBorderRadius ? obj.gridBorderRadius : this.gridBorderRadius;
                result.gridMargin = obj && obj.gridMargin ? obj.gridMargin : this.gridMargin;
                result.alwaysVisible = obj && typeof obj.alwaysVisible !== 'undefined' ? obj.alwaysVisible : this.alwaysVisible;
                result.visibleTimeout = obj && obj.visibleTimeout ? obj.visibleTimeout : this.visibleTimeout;
                return result;
            };
        return SlimScrollOptions;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var SlimScrollState = (function () {
        function SlimScrollState(obj) {
            this.scrollPosition = obj && obj.scrollPosition ? obj.scrollPosition : 0;
            this.isScrollAtStart = obj && typeof obj.isScrollAtStart !== 'undefined' ? obj.isScrollAtStart : true;
            this.isScrollAtEnd = obj && typeof obj.isScrollAtEnd !== 'undefined' ? obj.isScrollAtEnd : false;
        }
        return SlimScrollState;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ easing = {
        linear: function (t) { return t; },
        inQuad: function (t) { return t * t; },
        outQuad: function (t) { return t * (2 - t); },
        inOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
        inCubic: function (t) { return t * t * t; },
        outCubic: function (t) { return (--t) * t * t + 1; },
        inOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
        inQuart: function (t) { return t * t * t * t; },
        outQuart: function (t) { return 1 - (--t) * t * t * t; },
        inOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
        inQuint: function (t) { return t * t * t * t * t; },
        outQuint: function (t) { return 1 + (--t) * t * t * t * t; },
        inOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
    };
    var SlimScrollDirective = (function () {
        function SlimScrollDirective(viewContainer, renderer, document, optionsDefaults) {
            var _this = this;
            this.viewContainer = viewContainer;
            this.renderer = renderer;
            this.document = document;
            this.optionsDefaults = optionsDefaults;
            this.enabled = true;
            this.scrollChanged = new core.EventEmitter();
            this.barVisibilityChange = new core.EventEmitter();
            this.initWheel = function () {
                var /** @type {?} */ dommousescroll = rxjs.fromEvent(_this.el, 'DOMMouseScroll');
                var /** @type {?} */ mousewheel = rxjs.fromEvent(_this.el, 'mousewheel');
                var /** @type {?} */ wheelSubscription = rxjs.merge.apply(void 0, __spread([dommousescroll, mousewheel])).subscribe(function (e) {
                    var /** @type {?} */ delta = 0;
                    if (e.wheelDelta) {
                        delta = -e.wheelDelta / 120;
                    }
                    if (e.detail) {
                        delta = e.detail / 3;
                    }
                    _this.scrollContent(delta, true, false);
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                });
                _this.interactionSubscriptions.add(wheelSubscription);
            };
            this.initDrag = function () {
                var /** @type {?} */ bar = _this.bar;
                var /** @type {?} */ mousemove = rxjs.fromEvent(_this.document.documentElement, 'mousemove');
                var /** @type {?} */ touchmove = rxjs.fromEvent(_this.document.documentElement, 'touchmove');
                var /** @type {?} */ mousedown = rxjs.fromEvent(bar, 'mousedown');
                var /** @type {?} */ touchstart = rxjs.fromEvent(_this.el, 'touchstart');
                var /** @type {?} */ mouseup = rxjs.fromEvent(_this.document.documentElement, 'mouseup');
                var /** @type {?} */ touchend = rxjs.fromEvent(_this.document.documentElement, 'touchend');
                var /** @type {?} */ mousedrag = mousedown
                    .pipe(operators.mergeMap(function (e) {
                    _this.pageY = e.pageY;
                    _this.top = parseFloat(getComputedStyle(bar).top);
                    return mousemove
                        .pipe(operators.map(function (emove) {
                        emove.preventDefault();
                        return _this.top + emove.pageY - _this.pageY;
                    }), operators.takeUntil(mouseup));
                }));
                var /** @type {?} */ touchdrag = touchstart
                    .pipe(operators.mergeMap(function (e) {
                    _this.pageY = e.targetTouches[0].pageY;
                    _this.top = -parseFloat(getComputedStyle(bar).top);
                    return touchmove
                        .pipe(operators.map(function (tmove) {
                        return -(_this.top + tmove.targetTouches[0].pageY - _this.pageY);
                    }), operators.takeUntil(touchend));
                }));
                var /** @type {?} */ dragSubscription = rxjs.merge.apply(void 0, __spread([mousedrag, touchdrag])).subscribe(function (top) {
                    _this.body.addEventListener('selectstart', _this.preventDefaultEvent, false);
                    _this.renderer.setStyle(_this.body, 'touch-action', 'pan-y');
                    _this.renderer.setStyle(_this.body, 'user-select', 'none');
                    _this.renderer.setStyle(_this.bar, 'top', top + "px");
                    var /** @type {?} */ over = _this.scrollContent(0, true, false);
                    var /** @type {?} */ maxTop = _this.el.offsetHeight - _this.bar.offsetHeight;
                    if (over && over < 0 && -over <= maxTop) {
                        _this.renderer.setStyle(_this.el, 'paddingTop', -over + 'px');
                    }
                    else if (over && over > 0 && over <= maxTop) {
                        _this.renderer.setStyle(_this.el, 'paddingBottom', over + 'px');
                    }
                });
                var /** @type {?} */ dragEndSubscription = rxjs.merge.apply(void 0, __spread([mouseup, touchend])).subscribe(function () {
                    _this.body.removeEventListener('selectstart', _this.preventDefaultEvent, false);
                    var /** @type {?} */ paddingTop = parseInt(_this.el.style.paddingTop, 10);
                    var /** @type {?} */ paddingBottom = parseInt(_this.el.style.paddingBottom, 10);
                    _this.renderer.setStyle(_this.body, 'touch-action', 'unset');
                    _this.renderer.setStyle(_this.body, 'user-select', 'default');
                    if (paddingTop > 0) {
                        _this.scrollTo(0, 300, 'linear');
                    }
                    else if (paddingBottom > 0) {
                        _this.scrollTo(0, 300, 'linear');
                    }
                });
                _this.interactionSubscriptions.add(dragSubscription);
                _this.interactionSubscriptions.add(dragEndSubscription);
            };
            this.preventDefaultEvent = function (e) {
                e.preventDefault();
                e.stopPropagation();
            };
            this.viewContainer = viewContainer;
            this.el = viewContainer.element.nativeElement;
            this.body = this.document.querySelector('body');
            this.mutationThrottleTimeout = 50;
        }
        /**
         * @return {?}
         */
        SlimScrollDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                // setup if no changes for enabled for the first time
                if (!this.interactionSubscriptions && this.enabled) {
                    this.setup();
                }
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        SlimScrollDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes["enabled"]) {
                    if (this.enabled) {
                        this.setup();
                    }
                    else {
                        this.destroy();
                    }
                }
            };
        /**
         * @return {?}
         */
        SlimScrollDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.destroy();
            };
        /**
         * @return {?}
         */
        SlimScrollDirective.prototype.setup = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.interactionSubscriptions = new rxjs.Subscription();
                if (this.optionsDefaults) {
                    this.options = new SlimScrollOptions(this.optionsDefaults).merge(this.options);
                }
                else {
                    this.options = new SlimScrollOptions(this.options);
                }
                this.setStyle();
                this.wrapContainer();
                this.initGrid();
                this.initBar();
                this.getBarHeight();
                this.initWheel();
                this.initDrag();
                if (!this.options.alwaysVisible) {
                    this.hideBarAndGrid();
                }
                if (MutationObserver) {
                    if (this.mutationObserver) {
                        this.mutationObserver.disconnect();
                    }
                    this.mutationObserver = new MutationObserver(function () {
                        if (_this.mutationThrottleTimeout) {
                            clearTimeout(_this.mutationThrottleTimeout);
                            _this.mutationThrottleTimeout = setTimeout(_this.onMutation.bind(_this), 50);
                        }
                    });
                    this.mutationObserver.observe(this.el, { subtree: true, childList: true });
                }
                if (this.scrollEvents && this.scrollEvents instanceof core.EventEmitter) {
                    var /** @type {?} */ scrollSubscription = this.scrollEvents.subscribe(function (event) { return _this.handleEvent(event); });
                    this.interactionSubscriptions.add(scrollSubscription);
                }
            };
        /**
         * @param {?} e
         * @return {?}
         */
        SlimScrollDirective.prototype.handleEvent = /**
         * @param {?} e
         * @return {?}
         */
            function (e) {
                if (e.type === 'scrollToBottom') {
                    var /** @type {?} */ y = this.el.scrollHeight - this.el.clientHeight;
                    this.scrollTo(y, e.duration, e.easing);
                }
                else if (e.type === 'scrollToTop') {
                    var /** @type {?} */ y = 0;
                    this.scrollTo(y, e.duration, e.easing);
                }
                else if (e.type === 'scrollToPercent' && (e.percent >= 0 && e.percent <= 100)) {
                    var /** @type {?} */ y = Math.round(((this.el.scrollHeight - this.el.clientHeight) / 100) * e.percent);
                    this.scrollTo(y, e.duration, e.easing);
                }
                else if (e.type === 'scrollTo') {
                    var /** @type {?} */ y = e.y;
                    if (y <= this.el.scrollHeight - this.el.clientHeight && y >= 0) {
                        this.scrollTo(y, e.duration, e.easing);
                    }
                }
                else if (e.type === 'recalculate') {
                    this.getBarHeight();
                }
            };
        /**
         * @return {?}
         */
        SlimScrollDirective.prototype.setStyle = /**
         * @return {?}
         */
            function () {
                var /** @type {?} */ el = this.el;
                this.renderer.setStyle(el, 'overflow', 'hidden');
                this.renderer.setStyle(el, 'position', 'relative');
                this.renderer.setStyle(el, 'display', 'block');
            };
        /**
         * @return {?}
         */
        SlimScrollDirective.prototype.onMutation = /**
         * @return {?}
         */
            function () {
                this.getBarHeight();
            };
        /**
         * @return {?}
         */
        SlimScrollDirective.prototype.wrapContainer = /**
         * @return {?}
         */
            function () {
                this.wrapper = this.renderer.createElement('div');
                var /** @type {?} */ wrapper = this.wrapper;
                var /** @type {?} */ el = this.el;
                this.renderer.addClass(wrapper, 'slimscroll-wrapper');
                this.renderer.setStyle(wrapper, 'position', 'relative');
                this.renderer.setStyle(wrapper, 'overflow', 'hidden');
                this.renderer.setStyle(wrapper, 'display', 'inline-block');
                this.renderer.setStyle(wrapper, 'margin', getComputedStyle(el).margin);
                this.renderer.setStyle(wrapper, 'width', '100%');
                this.renderer.setStyle(wrapper, 'height', getComputedStyle(el).height);
                this.renderer.insertBefore(el.parentNode, wrapper, el);
                this.renderer.appendChild(wrapper, el);
            };
        /**
         * @return {?}
         */
        SlimScrollDirective.prototype.initGrid = /**
         * @return {?}
         */
            function () {
                this.grid = this.renderer.createElement('div');
                var /** @type {?} */ grid = this.grid;
                this.renderer.addClass(grid, 'slimscroll-grid');
                this.renderer.setStyle(grid, 'position', 'absolute');
                this.renderer.setStyle(grid, 'top', '0');
                this.renderer.setStyle(grid, 'bottom', '0');
                this.renderer.setStyle(grid, this.options.position, '0');
                this.renderer.setStyle(grid, 'width', this.options.gridWidth + "px");
                this.renderer.setStyle(grid, 'background', this.options.gridBackground);
                this.renderer.setStyle(grid, 'opacity', this.options.gridOpacity);
                this.renderer.setStyle(grid, 'display', 'block');
                this.renderer.setStyle(grid, 'cursor', 'pointer');
                this.renderer.setStyle(grid, 'z-index', '99');
                this.renderer.setStyle(grid, 'border-radius', this.options.gridBorderRadius + "px");
                this.renderer.setStyle(grid, 'margin', this.options.gridMargin);
                this.renderer.appendChild(this.wrapper, grid);
            };
        /**
         * @return {?}
         */
        SlimScrollDirective.prototype.initBar = /**
         * @return {?}
         */
            function () {
                this.bar = this.renderer.createElement('div');
                var /** @type {?} */ bar = this.bar;
                this.renderer.addClass(bar, 'slimscroll-bar');
                this.renderer.setStyle(bar, 'position', 'absolute');
                this.renderer.setStyle(bar, 'top', '0');
                this.renderer.setStyle(bar, this.options.position, '0');
                this.renderer.setStyle(bar, 'width', this.options.barWidth + "px");
                this.renderer.setStyle(bar, 'background', this.options.barBackground);
                this.renderer.setStyle(bar, 'opacity', this.options.barOpacity);
                this.renderer.setStyle(bar, 'display', 'block');
                this.renderer.setStyle(bar, 'cursor', 'pointer');
                this.renderer.setStyle(bar, 'z-index', '100');
                this.renderer.setStyle(bar, 'border-radius', this.options.barBorderRadius + "px");
                this.renderer.setStyle(bar, 'margin', this.options.barMargin);
                this.renderer.appendChild(this.wrapper, bar);
                this.barVisibilityChange.emit(true);
            };
        /**
         * @return {?}
         */
        SlimScrollDirective.prototype.getBarHeight = /**
         * @return {?}
         */
            function () {
                var /** @type {?} */ elHeight = this.el.offsetHeight;
                var /** @type {?} */ barHeight = Math.max((elHeight / this.el.scrollHeight) * elHeight, 30) + 'px';
                var /** @type {?} */ display = parseInt(barHeight, 10) === elHeight ? 'none' : 'block';
                if (this.wrapper.offsetHeight !== elHeight) {
                    this.renderer.setStyle(this.wrapper, 'height', elHeight + 'px');
                }
                this.renderer.setStyle(this.bar, 'height', barHeight);
                this.renderer.setStyle(this.bar, 'display', display);
                this.renderer.setStyle(this.grid, 'display', display);
                this.barVisibilityChange.emit(display !== 'none');
            };
        /**
         * @param {?} y
         * @param {?} duration
         * @param {?} easingFunc
         * @return {?}
         */
        SlimScrollDirective.prototype.scrollTo = /**
         * @param {?} y
         * @param {?} duration
         * @param {?} easingFunc
         * @return {?}
         */
            function (y, duration, easingFunc) {
                var _this = this;
                var /** @type {?} */ start = Date.now();
                var /** @type {?} */ from = this.el.scrollTop;
                var /** @type {?} */ maxTop = this.el.offsetHeight - this.bar.offsetHeight;
                var /** @type {?} */ maxElScrollTop = this.el.scrollHeight - this.el.clientHeight;
                var /** @type {?} */ barHeight = Math.max((this.el.offsetHeight / this.el.scrollHeight) * this.el.offsetHeight, 30);
                var /** @type {?} */ paddingTop = parseInt(this.el.style.paddingTop, 10) || 0;
                var /** @type {?} */ paddingBottom = parseInt(this.el.style.paddingBottom, 10) || 0;
                var /** @type {?} */ scroll = function (timestamp) {
                    var /** @type {?} */ currentTime = Date.now();
                    var /** @type {?} */ time = Math.min(1, ((currentTime - start) / duration));
                    var /** @type {?} */ easedTime = easing[easingFunc](time);
                    if (paddingTop > 0 || paddingBottom > 0) {
                        var /** @type {?} */ fromY = null;
                        if (paddingTop > 0) {
                            fromY = -paddingTop;
                            fromY = -((easedTime * (y - fromY)) + fromY);
                            _this.renderer.setStyle(_this.el, 'paddingTop', fromY + "px");
                        }
                        if (paddingBottom > 0) {
                            fromY = paddingBottom;
                            fromY = ((easedTime * (y - fromY)) + fromY);
                            _this.renderer.setStyle(_this.el, 'paddingBottom', fromY + "px");
                        }
                    }
                    else {
                        _this.el.scrollTop = (easedTime * (y - from)) + from;
                    }
                    var /** @type {?} */ percentScroll = _this.el.scrollTop / maxElScrollTop;
                    if (paddingBottom === 0) {
                        var /** @type {?} */ delta = Math.round(Math.round(_this.el.clientHeight * percentScroll) - barHeight);
                        if (delta > 0) {
                            _this.renderer.setStyle(_this.bar, 'top', delta + "px");
                        }
                    }
                    if (time < 1) {
                        requestAnimationFrame(scroll);
                    }
                };
                requestAnimationFrame(scroll);
            };
        /**
         * @param {?} y
         * @param {?} isWheel
         * @param {?} isJump
         * @return {?}
         */
        SlimScrollDirective.prototype.scrollContent = /**
         * @param {?} y
         * @param {?} isWheel
         * @param {?} isJump
         * @return {?}
         */
            function (y, isWheel, isJump) {
                var _this = this;
                var /** @type {?} */ delta = y;
                var /** @type {?} */ maxTop = this.el.offsetHeight - this.bar.offsetHeight;
                var /** @type {?} */ hiddenContent = this.el.scrollHeight - this.el.offsetHeight;
                var /** @type {?} */ percentScroll;
                var /** @type {?} */ over = null;
                if (isWheel) {
                    delta = parseInt(getComputedStyle(this.bar).top, 10) + y * 20 / 100 * this.bar.offsetHeight;
                    if (delta < 0 || delta > maxTop) {
                        over = delta > maxTop ? delta - maxTop : delta;
                    }
                    delta = Math.min(Math.max(delta, 0), maxTop);
                    delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
                    this.renderer.setStyle(this.bar, 'top', delta + 'px');
                }
                percentScroll = parseInt(getComputedStyle(this.bar).top, 10) / (this.el.offsetHeight - this.bar.offsetHeight);
                delta = percentScroll * hiddenContent;
                this.el.scrollTop = delta;
                this.showBarAndGrid();
                if (!this.options.alwaysVisible) {
                    if (this.visibleTimeout) {
                        clearTimeout(this.visibleTimeout);
                    }
                    this.visibleTimeout = setTimeout(function () {
                        _this.hideBarAndGrid();
                    }, this.options.visibleTimeout);
                }
                var /** @type {?} */ isScrollAtStart = delta === 0;
                var /** @type {?} */ isScrollAtEnd = delta === hiddenContent;
                var /** @type {?} */ scrollPosition = Math.ceil(delta);
                var /** @type {?} */ scrollState = new SlimScrollState({ scrollPosition: scrollPosition, isScrollAtStart: isScrollAtStart, isScrollAtEnd: isScrollAtEnd });
                this.scrollChanged.emit(scrollState);
                return over;
            };
        /**
         * @return {?}
         */
        SlimScrollDirective.prototype.showBarAndGrid = /**
         * @return {?}
         */
            function () {
                this.renderer.setStyle(this.grid, 'background', this.options.gridBackground);
                this.renderer.setStyle(this.bar, 'background', this.options.barBackground);
            };
        /**
         * @return {?}
         */
        SlimScrollDirective.prototype.hideBarAndGrid = /**
         * @return {?}
         */
            function () {
                this.renderer.setStyle(this.grid, 'background', 'transparent');
                this.renderer.setStyle(this.bar, 'background', 'transparent');
            };
        /**
         * @return {?}
         */
        SlimScrollDirective.prototype.destroy = /**
         * @return {?}
         */
            function () {
                if (this.mutationObserver) {
                    this.mutationObserver.disconnect();
                    this.mutationObserver = null;
                }
                if (this.el.parentElement.classList.contains('slimscroll-wrapper')) {
                    var /** @type {?} */ wrapper = this.el.parentElement;
                    var /** @type {?} */ bar = wrapper.querySelector('.slimscroll-bar');
                    wrapper.removeChild(bar);
                    var /** @type {?} */ grid = wrapper.querySelector('.slimscroll-grid');
                    wrapper.removeChild(grid);
                    this.unwrap(wrapper);
                }
                if (this.interactionSubscriptions) {
                    this.interactionSubscriptions.unsubscribe();
                }
            };
        /**
         * @param {?} wrapper
         * @return {?}
         */
        SlimScrollDirective.prototype.unwrap = /**
         * @param {?} wrapper
         * @return {?}
         */
            function (wrapper) {
                var /** @type {?} */ docFrag = document.createDocumentFragment();
                while (wrapper.firstChild) {
                    var /** @type {?} */ child = wrapper.removeChild(wrapper.firstChild);
                    docFrag.appendChild(child);
                }
                wrapper.parentNode.replaceChild(docFrag, wrapper);
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        SlimScrollDirective.prototype.onResize = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                this.getBarHeight();
            };
        SlimScrollDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[slimScroll]',
                        // tslint:disable-line
                        exportAs: 'slimScroll'
                    },] },
        ];
        /** @nocollapse */
        SlimScrollDirective.ctorParameters = function () {
            return [
                { type: core.ViewContainerRef, decorators: [{ type: core.Inject, args: [core.ViewContainerRef,] },] },
                { type: core.Renderer2, decorators: [{ type: core.Inject, args: [core.Renderer2,] },] },
                { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] },] },
                { type: undefined, decorators: [{ type: core.Inject, args: [SLIMSCROLL_DEFAULTS,] }, { type: core.Optional },] },
            ];
        };
        SlimScrollDirective.propDecorators = {
            "enabled": [{ type: core.Input },],
            "options": [{ type: core.Input },],
            "scrollEvents": [{ type: core.Input },],
            "scrollChanged": [{ type: core.Output, args: ['scrollChanged',] },],
            "barVisibilityChange": [{ type: core.Output, args: ['barVisibilityChange',] },],
            "onResize": [{ type: core.HostListener, args: ['window:resize', ['$event'],] },],
        };
        return SlimScrollDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgSlimScrollModule = (function () {
        function NgSlimScrollModule() {
        }
        NgSlimScrollModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            SlimScrollDirective
                        ],
                        exports: [
                            SlimScrollDirective
                        ]
                    },] },
        ];
        return NgSlimScrollModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.SlimScrollEvent = SlimScrollEvent;
    exports.SLIMSCROLL_DEFAULTS = SLIMSCROLL_DEFAULTS;
    exports.SlimScrollOptions = SlimScrollOptions;
    exports.easing = easing;
    exports.SlimScrollDirective = SlimScrollDirective;
    exports.NgSlimScrollModule = NgSlimScrollModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNsaW1zY3JvbGwudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtc2xpbXNjcm9sbC9hcHAvbmd4LXNsaW1zY3JvbGwvY2xhc3Nlcy9zbGltc2Nyb2xsLWV2ZW50LmNsYXNzLnRzIiwibmc6Ly9uZ3gtc2xpbXNjcm9sbC9hcHAvbmd4LXNsaW1zY3JvbGwvY2xhc3Nlcy9zbGltc2Nyb2xsLW9wdGlvbnMuY2xhc3MudHMiLG51bGwsIm5nOi8vbmd4LXNsaW1zY3JvbGwvYXBwL25neC1zbGltc2Nyb2xsL2NsYXNzZXMvc2xpbXNjcm9sbC1zdGF0ZS5jbGFzcy50cyIsIm5nOi8vbmd4LXNsaW1zY3JvbGwvYXBwL25neC1zbGltc2Nyb2xsL2RpcmVjdGl2ZXMvc2xpbXNjcm9sbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1zbGltc2Nyb2xsL2FwcC9uZ3gtc2xpbXNjcm9sbC9tb2R1bGUvbmd4LXNsaW1zY3JvbGwubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSVNsaW1TY3JvbGxFdmVudCB7XG4gIHR5cGU6ICdzY3JvbGxUb0JvdHRvbScgfCAnc2Nyb2xsVG9Ub3AnIHwgJ3Njcm9sbFRvUGVyY2VudCcgfCAnc2Nyb2xsVG8nIHwgJ3JlY2FsY3VsYXRlJztcbiAgeT86IG51bWJlcjtcbiAgcGVyY2VudD86IG51bWJlcjtcbiAgZHVyYXRpb24/OiBudW1iZXI7XG4gIGVhc2luZz86ICdsaW5lYXInIHwgJ2luUXVhZCcgfCAnb3V0UXVhZCcgfCAnaW5PdXRRdWFkJyB8ICdpbkN1YmljJyB8XG4gICAgJ291dEN1YmljJyB8ICdpbk91dEN1YmljJyB8ICdpblF1YXJ0JyB8ICdvdXRRdWFydCcgfCAnaW5PdXRRdWFydCcgfFxuICAgICdpblF1aW50JyB8ICdvdXRRdWludCcgfCAnaW5PdXRRdWludCc7XG59XG5cbmV4cG9ydCBjbGFzcyBTbGltU2Nyb2xsRXZlbnQgaW1wbGVtZW50cyBJU2xpbVNjcm9sbEV2ZW50IHtcbiAgdHlwZTogJ3Njcm9sbFRvQm90dG9tJyB8ICdzY3JvbGxUb1RvcCcgfCAnc2Nyb2xsVG9QZXJjZW50JyB8ICdzY3JvbGxUbycgfCAncmVjYWxjdWxhdGUnO1xuICB5PzogbnVtYmVyO1xuICBwZXJjZW50PzogbnVtYmVyO1xuICBkdXJhdGlvbj86IG51bWJlcjtcbiAgZWFzaW5nOiAnbGluZWFyJyB8ICdpblF1YWQnIHwgJ291dFF1YWQnIHwgJ2luT3V0UXVhZCcgfCAnaW5DdWJpYycgfFxuICAgICdvdXRDdWJpYycgfCAnaW5PdXRDdWJpYycgfCAnaW5RdWFydCcgfCAnb3V0UXVhcnQnIHwgJ2luT3V0UXVhcnQnIHxcbiAgICAnaW5RdWludCcgfCAnb3V0UXVpbnQnIHwgJ2luT3V0UXVpbnQnO1xuXG4gIGNvbnN0cnVjdG9yKG9iaj86IElTbGltU2Nyb2xsRXZlbnQpIHtcbiAgICB0aGlzLnR5cGUgPSBvYmoudHlwZTtcbiAgICB0aGlzLnkgPSBvYmogJiYgb2JqLnkgPyBvYmoueSA6IDA7XG4gICAgdGhpcy5wZXJjZW50ID0gb2JqICYmIG9iai5wZXJjZW50ID8gb2JqLnBlcmNlbnQgOiAwO1xuICAgIHRoaXMuZHVyYXRpb24gPSBvYmogJiYgb2JqLmR1cmF0aW9uID8gb2JqLmR1cmF0aW9uIDogMDtcbiAgICB0aGlzLmVhc2luZyA9IG9iaiAmJiBvYmouZWFzaW5nID8gb2JqLmVhc2luZyA6ICdsaW5lYXInO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJU2xpbVNjcm9sbE9wdGlvbnMgfSBmcm9tICcuL3NsaW1zY3JvbGwtb3B0aW9ucy5jbGFzcyc7XG5pbXBvcnQgeyBJU2xpbVNjcm9sbEV2ZW50IH0gZnJvbSAnLi9zbGltc2Nyb2xsLWV2ZW50LmNsYXNzJztcbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNsaW1TY3JvbGxPcHRpb25zIHtcbiAgcG9zaXRpb24/OiBzdHJpbmc7XG4gIGJhckJhY2tncm91bmQ/OiBzdHJpbmc7XG4gIGJhck9wYWNpdHk/OiBzdHJpbmc7XG4gIGJhcldpZHRoPzogc3RyaW5nO1xuICBiYXJCb3JkZXJSYWRpdXM/OiBzdHJpbmc7XG4gIGJhck1hcmdpbj86IHN0cmluZztcbiAgZ3JpZEJhY2tncm91bmQ/OiBzdHJpbmc7XG4gIGdyaWRPcGFjaXR5Pzogc3RyaW5nO1xuICBncmlkV2lkdGg/OiBzdHJpbmc7XG4gIGdyaWRCb3JkZXJSYWRpdXM/OiBzdHJpbmc7XG4gIGdyaWRNYXJnaW4/OiBzdHJpbmc7XG4gIGFsd2F5c1Zpc2libGU/OiBib29sZWFuO1xuICB2aXNpYmxlVGltZW91dD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IFNMSU1TQ1JPTExfREVGQVVMVFM6IEluamVjdGlvblRva2VuPElTbGltU2Nyb2xsT3B0aW9ucz5cbiAgICA9IG5ldyBJbmplY3Rpb25Ub2tlbignTkdYX1NMSU1TQ1JPTExfREVGQVVMVFMnKTtcblxuZXhwb3J0IGNsYXNzIFNsaW1TY3JvbGxPcHRpb25zIGltcGxlbWVudHMgSVNsaW1TY3JvbGxPcHRpb25zIHtcbiAgcG9zaXRpb24/OiBzdHJpbmc7XG4gIGJhckJhY2tncm91bmQ/OiBzdHJpbmc7XG4gIGJhck9wYWNpdHk/OiBzdHJpbmc7XG4gIGJhcldpZHRoPzogc3RyaW5nO1xuICBiYXJCb3JkZXJSYWRpdXM/OiBzdHJpbmc7XG4gIGJhck1hcmdpbj86IHN0cmluZztcbiAgZ3JpZEJhY2tncm91bmQ/OiBzdHJpbmc7XG4gIGdyaWRPcGFjaXR5Pzogc3RyaW5nO1xuICBncmlkV2lkdGg/OiBzdHJpbmc7XG4gIGdyaWRCb3JkZXJSYWRpdXM/OiBzdHJpbmc7XG4gIGdyaWRNYXJnaW4/OiBzdHJpbmc7XG4gIGFsd2F5c1Zpc2libGU/OiBib29sZWFuO1xuICB2aXNpYmxlVGltZW91dD86IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihvYmo/OiBJU2xpbVNjcm9sbE9wdGlvbnMpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gb2JqICYmIG9iai5wb3NpdGlvbiA/IG9iai5wb3NpdGlvbiA6ICdyaWdodCc7XG4gICAgdGhpcy5iYXJCYWNrZ3JvdW5kID0gb2JqICYmIG9iai5iYXJCYWNrZ3JvdW5kID8gb2JqLmJhckJhY2tncm91bmQgOiAnIzM0M2E0MCc7XG4gICAgdGhpcy5iYXJPcGFjaXR5ID0gb2JqICYmIG9iai5iYXJPcGFjaXR5ID8gb2JqLmJhck9wYWNpdHkgOiAnMSc7XG4gICAgdGhpcy5iYXJXaWR0aCA9IG9iaiAmJiBvYmouYmFyV2lkdGggPyBvYmouYmFyV2lkdGggOiAnMTInO1xuICAgIHRoaXMuYmFyQm9yZGVyUmFkaXVzID0gb2JqICYmIG9iai5iYXJCb3JkZXJSYWRpdXMgPyBvYmouYmFyQm9yZGVyUmFkaXVzIDogJzUnO1xuICAgIHRoaXMuYmFyTWFyZ2luID0gb2JqICYmIG9iai5iYXJNYXJnaW4gPyBvYmouYmFyTWFyZ2luIDogJzFweCAwJztcbiAgICB0aGlzLmdyaWRCYWNrZ3JvdW5kID0gb2JqICYmIG9iai5ncmlkQmFja2dyb3VuZCA/IG9iai5ncmlkQmFja2dyb3VuZCA6ICcjYWRiNWJkJztcbiAgICB0aGlzLmdyaWRPcGFjaXR5ID0gb2JqICYmIG9iai5ncmlkT3BhY2l0eSA/IG9iai5ncmlkT3BhY2l0eSA6ICcxJztcbiAgICB0aGlzLmdyaWRXaWR0aCA9IG9iaiAmJiBvYmouZ3JpZFdpZHRoID8gb2JqLmdyaWRXaWR0aCA6ICc4JztcbiAgICB0aGlzLmdyaWRCb3JkZXJSYWRpdXMgPSBvYmogJiYgb2JqLmdyaWRCb3JkZXJSYWRpdXMgPyBvYmouZ3JpZEJvcmRlclJhZGl1cyA6ICcxMCc7XG4gICAgdGhpcy5ncmlkTWFyZ2luID0gb2JqICYmIG9iai5ncmlkTWFyZ2luID8gb2JqLmdyaWRNYXJnaW4gOiAnMXB4IDJweCc7XG4gICAgdGhpcy5hbHdheXNWaXNpYmxlID0gb2JqICYmIHR5cGVvZiBvYmouYWx3YXlzVmlzaWJsZSAhPT0gJ3VuZGVmaW5lZCcgPyBvYmouYWx3YXlzVmlzaWJsZSA6IHRydWU7XG4gICAgdGhpcy52aXNpYmxlVGltZW91dCA9IG9iaiAmJiBvYmoudmlzaWJsZVRpbWVvdXQgPyBvYmoudmlzaWJsZVRpbWVvdXQgOiAxMDAwO1xuICB9XG5cbiAgcHVibGljIG1lcmdlKG9iaj86IElTbGltU2Nyb2xsT3B0aW9ucyk6IFNsaW1TY3JvbGxPcHRpb25zIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgU2xpbVNjcm9sbE9wdGlvbnMoKTtcblxuICAgIHJlc3VsdC5wb3NpdGlvbiA9IG9iaiAmJiBvYmoucG9zaXRpb24gPyBvYmoucG9zaXRpb24gOiB0aGlzLnBvc2l0aW9uO1xuICAgIHJlc3VsdC5iYXJCYWNrZ3JvdW5kID0gb2JqICYmIG9iai5iYXJCYWNrZ3JvdW5kID8gb2JqLmJhckJhY2tncm91bmQgOiB0aGlzLmJhckJhY2tncm91bmQ7XG4gICAgcmVzdWx0LmJhck9wYWNpdHkgPSBvYmogJiYgb2JqLmJhck9wYWNpdHkgPyBvYmouYmFyT3BhY2l0eSA6IHRoaXMuYmFyT3BhY2l0eTtcbiAgICByZXN1bHQuYmFyV2lkdGggPSBvYmogJiYgb2JqLmJhcldpZHRoID8gb2JqLmJhcldpZHRoIDogdGhpcy5iYXJXaWR0aDtcbiAgICByZXN1bHQuYmFyQm9yZGVyUmFkaXVzID0gb2JqICYmIG9iai5iYXJCb3JkZXJSYWRpdXMgPyBvYmouYmFyQm9yZGVyUmFkaXVzIDogdGhpcy5iYXJCb3JkZXJSYWRpdXM7XG4gICAgcmVzdWx0LmJhck1hcmdpbiA9IG9iaiAmJiBvYmouYmFyTWFyZ2luID8gb2JqLmJhck1hcmdpbiA6IHRoaXMuYmFyTWFyZ2luO1xuICAgIHJlc3VsdC5ncmlkQmFja2dyb3VuZCA9IG9iaiAmJiBvYmouZ3JpZEJhY2tncm91bmQgPyBvYmouZ3JpZEJhY2tncm91bmQgOiB0aGlzLmdyaWRCYWNrZ3JvdW5kO1xuICAgIHJlc3VsdC5ncmlkT3BhY2l0eSA9IG9iaiAmJiBvYmouZ3JpZE9wYWNpdHkgPyBvYmouZ3JpZE9wYWNpdHkgOiB0aGlzLmdyaWRCYWNrZ3JvdW5kO1xuICAgIHJlc3VsdC5ncmlkV2lkdGggPSBvYmogJiYgb2JqLmdyaWRXaWR0aCA/IG9iai5ncmlkV2lkdGggOiB0aGlzLmdyaWRXaWR0aDtcbiAgICByZXN1bHQuZ3JpZEJvcmRlclJhZGl1cyA9IG9iaiAmJiBvYmouZ3JpZEJvcmRlclJhZGl1cyA/IG9iai5ncmlkQm9yZGVyUmFkaXVzIDogdGhpcy5ncmlkQm9yZGVyUmFkaXVzO1xuICAgIHJlc3VsdC5ncmlkTWFyZ2luID0gb2JqICYmIG9iai5ncmlkTWFyZ2luID8gb2JqLmdyaWRNYXJnaW4gOiB0aGlzLmdyaWRNYXJnaW47XG4gICAgcmVzdWx0LmFsd2F5c1Zpc2libGUgPSBvYmogJiYgdHlwZW9mIG9iai5hbHdheXNWaXNpYmxlICE9PSAndW5kZWZpbmVkJyA/IG9iai5hbHdheXNWaXNpYmxlIDogdGhpcy5hbHdheXNWaXNpYmxlO1xuICAgIHJlc3VsdC52aXNpYmxlVGltZW91dCA9IG9iaiAmJiBvYmoudmlzaWJsZVRpbWVvdXQgPyBvYmoudmlzaWJsZVRpbWVvdXQgOiB0aGlzLnZpc2libGVUaW1lb3V0O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSB5W29wWzBdICYgMiA/IFwicmV0dXJuXCIgOiBvcFswXSA/IFwidGhyb3dcIiA6IFwibmV4dFwiXSkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbMCwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgIH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChvW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9OyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgSVNsaW1TY3JvbGxTdGF0ZSB7XG4gICAgc2Nyb2xsUG9zaXRpb246IG51bWJlcjtcbiAgICBpc1Njcm9sbEF0U3RhcnQ6IGJvb2xlYW47XG4gICAgaXNTY3JvbGxBdEVuZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFNsaW1TY3JvbGxTdGF0ZSBpbXBsZW1lbnRzIElTbGltU2Nyb2xsU3RhdGUge1xuICAgIHNjcm9sbFBvc2l0aW9uOiBudW1iZXI7XG4gICAgaXNTY3JvbGxBdFN0YXJ0OiBib29sZWFuO1xuICAgIGlzU2Nyb2xsQXRFbmQ6IGJvb2xlYW47XG4gICAgY29uc3RydWN0b3Iob2JqPzogSVNsaW1TY3JvbGxTdGF0ZSkge1xuICAgICAgICB0aGlzLnNjcm9sbFBvc2l0aW9uID0gb2JqICYmIG9iai5zY3JvbGxQb3NpdGlvbiA/IG9iai5zY3JvbGxQb3NpdGlvbiA6IDA7XG4gICAgICAgIHRoaXMuaXNTY3JvbGxBdFN0YXJ0ID0gb2JqICYmIHR5cGVvZiBvYmouaXNTY3JvbGxBdFN0YXJ0ICE9PSAndW5kZWZpbmVkJyA/IG9iai5pc1Njcm9sbEF0U3RhcnQgOiB0cnVlO1xuICAgICAgICB0aGlzLmlzU2Nyb2xsQXRFbmQgPSBvYmogJiYgdHlwZW9mIG9iai5pc1Njcm9sbEF0RW5kICE9PSAndW5kZWZpbmVkJyA/IG9iai5pc1Njcm9sbEF0RW5kIDogZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgSW5qZWN0LFxuICBPcHRpb25hbCxcbiAgSW5wdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU2xpbVNjcm9sbE9wdGlvbnMsIElTbGltU2Nyb2xsT3B0aW9ucywgU0xJTVNDUk9MTF9ERUZBVUxUUyB9IGZyb20gJy4uL2NsYXNzZXMvc2xpbXNjcm9sbC1vcHRpb25zLmNsYXNzJztcbmltcG9ydCB7IElTbGltU2Nyb2xsRXZlbnQsIFNsaW1TY3JvbGxFdmVudCB9IGZyb20gJy4uL2NsYXNzZXMvc2xpbXNjcm9sbC1ldmVudC5jbGFzcyc7XG5pbXBvcnQgeyBTbGltU2Nyb2xsU3RhdGUsIElTbGltU2Nyb2xsU3RhdGUgfSBmcm9tICcuLi9jbGFzc2VzL3NsaW1zY3JvbGwtc3RhdGUuY2xhc3MnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCwgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBlYXNpbmc6IHsgW2tleTogc3RyaW5nXTogRnVuY3Rpb24gfSA9IHtcbiAgbGluZWFyOiAodDogbnVtYmVyKSA9PiB0LFxuICBpblF1YWQ6ICh0OiBudW1iZXIpID0+IHQgKiB0LFxuICBvdXRRdWFkOiAodDogbnVtYmVyKSA9PiB0ICogKDIgLSB0KSxcbiAgaW5PdXRRdWFkOiAodDogbnVtYmVyKSA9PiB0IDwgLjUgPyAyICogdCAqIHQgOiAtMSArICg0IC0gMiAqIHQpICogdCxcbiAgaW5DdWJpYzogKHQ6IG51bWJlcikgPT4gdCAqIHQgKiB0LFxuICBvdXRDdWJpYzogKHQ6IG51bWJlcikgPT4gKC0tdCkgKiB0ICogdCArIDEsXG4gIGluT3V0Q3ViaWM6ICh0OiBudW1iZXIpID0+IHQgPCAuNSA/IDQgKiB0ICogdCAqIHQgOiAodCAtIDEpICogKDIgKiB0IC0gMikgKiAoMiAqIHQgLSAyKSArIDEsXG4gIGluUXVhcnQ6ICh0OiBudW1iZXIpID0+IHQgKiB0ICogdCAqIHQsXG4gIG91dFF1YXJ0OiAodDogbnVtYmVyKSA9PiAxIC0gKC0tdCkgKiB0ICogdCAqIHQsXG4gIGluT3V0UXVhcnQ6ICh0OiBudW1iZXIpID0+IHQgPCAuNSA/IDggKiB0ICogdCAqIHQgKiB0IDogMSAtIDggKiAoLS10KSAqIHQgKiB0ICogdCxcbiAgaW5RdWludDogKHQ6IG51bWJlcikgPT4gdCAqIHQgKiB0ICogdCAqIHQsXG4gIG91dFF1aW50OiAodDogbnVtYmVyKSA9PiAxICsgKC0tdCkgKiB0ICogdCAqIHQgKiB0LFxuICBpbk91dFF1aW50OiAodDogbnVtYmVyKSA9PiB0IDwgLjUgPyAxNiAqIHQgKiB0ICogdCAqIHQgKiB0IDogMSArIDE2ICogKC0tdCkgKiB0ICogdCAqIHQgKiB0XG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbc2xpbVNjcm9sbF0nLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gIGV4cG9ydEFzOiAnc2xpbVNjcm9sbCdcbn0pXG5leHBvcnQgY2xhc3MgU2xpbVNjcm9sbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBlbmFibGVkID0gdHJ1ZTtcbiAgQElucHV0KCkgb3B0aW9uczogU2xpbVNjcm9sbE9wdGlvbnM7XG4gIEBJbnB1dCgpIHNjcm9sbEV2ZW50czogRXZlbnRFbWl0dGVyPElTbGltU2Nyb2xsRXZlbnQ+O1xuICBAT3V0cHV0KCdzY3JvbGxDaGFuZ2VkJykgc2Nyb2xsQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SVNsaW1TY3JvbGxTdGF0ZT4oKTtcbiAgQE91dHB1dCgnYmFyVmlzaWJpbGl0eUNoYW5nZScpIGJhclZpc2liaWxpdHlDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgZWw6IEhUTUxFbGVtZW50O1xuICB3cmFwcGVyOiBIVE1MRWxlbWVudDtcbiAgZ3JpZDogSFRNTEVsZW1lbnQ7XG4gIGJhcjogSFRNTEVsZW1lbnQ7XG4gIGJvZHk6IEhUTUxFbGVtZW50O1xuICBwYWdlWTogbnVtYmVyO1xuICB0b3A6IG51bWJlcjtcbiAgZHJhZ2dpbmc6IGJvb2xlYW47XG4gIG11dGF0aW9uVGhyb3R0bGVUaW1lb3V0OiBudW1iZXI7XG4gIG11dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gIGxhc3RUb3VjaFBvc2l0aW9uWTogbnVtYmVyO1xuICB2aXNpYmxlVGltZW91dDogYW55O1xuICBpbnRlcmFjdGlvblN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbjtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChWaWV3Q29udGFpbmVyUmVmKSBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgQEluamVjdChTTElNU0NST0xMX0RFRkFVTFRTKSBAT3B0aW9uYWwoKSBwcml2YXRlIG9wdGlvbnNEZWZhdWx0czogSVNsaW1TY3JvbGxPcHRpb25zXG4gICkge1xuICAgIHRoaXMudmlld0NvbnRhaW5lciA9IHZpZXdDb250YWluZXI7XG4gICAgdGhpcy5lbCA9IHZpZXdDb250YWluZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuYm9keSA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIHRoaXMubXV0YXRpb25UaHJvdHRsZVRpbWVvdXQgPSA1MDtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIHNldHVwIGlmIG5vIGNoYW5nZXMgZm9yIGVuYWJsZWQgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgaWYgKCF0aGlzLmludGVyYWN0aW9uU3Vic2NyaXB0aW9ucyAmJiB0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuZW5hYmxlZCkge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgICB0aGlzLnNldHVwKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHNldHVwKCkge1xuICAgIHRoaXMuaW50ZXJhY3Rpb25TdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIGlmICh0aGlzLm9wdGlvbnNEZWZhdWx0cykge1xuICAgICAgdGhpcy5vcHRpb25zID0gbmV3IFNsaW1TY3JvbGxPcHRpb25zKHRoaXMub3B0aW9uc0RlZmF1bHRzKS5tZXJnZSh0aGlzLm9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBuZXcgU2xpbVNjcm9sbE9wdGlvbnModGhpcy5vcHRpb25zKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0eWxlKCk7XG4gICAgdGhpcy53cmFwQ29udGFpbmVyKCk7XG4gICAgdGhpcy5pbml0R3JpZCgpO1xuICAgIHRoaXMuaW5pdEJhcigpO1xuICAgIHRoaXMuZ2V0QmFySGVpZ2h0KCk7XG4gICAgdGhpcy5pbml0V2hlZWwoKTtcbiAgICB0aGlzLmluaXREcmFnKCk7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5hbHdheXNWaXNpYmxlKSB7XG4gICAgICB0aGlzLmhpZGVCYXJBbmRHcmlkKCk7XG4gICAgfVxuXG4gICAgaWYgKE11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIGlmICh0aGlzLm11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubXV0YXRpb25UaHJvdHRsZVRpbWVvdXQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5tdXRhdGlvblRocm90dGxlVGltZW91dCk7XG4gICAgICAgICAgdGhpcy5tdXRhdGlvblRocm90dGxlVGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5vbk11dGF0aW9uLmJpbmQodGhpcyksIDUwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsLCB7IHN1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zY3JvbGxFdmVudHMgJiYgdGhpcy5zY3JvbGxFdmVudHMgaW5zdGFuY2VvZiBFdmVudEVtaXR0ZXIpIHtcbiAgICAgIGNvbnN0IHNjcm9sbFN1YnNjcmlwdGlvbiA9IHRoaXMuc2Nyb2xsRXZlbnRzLnN1YnNjcmliZSgoZXZlbnQ6IFNsaW1TY3JvbGxFdmVudCkgPT4gdGhpcy5oYW5kbGVFdmVudChldmVudCkpO1xuICAgICAgdGhpcy5pbnRlcmFjdGlvblN1YnNjcmlwdGlvbnMuYWRkKHNjcm9sbFN1YnNjcmlwdGlvbik7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRXZlbnQoZTogU2xpbVNjcm9sbEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ3Njcm9sbFRvQm90dG9tJykge1xuICAgICAgY29uc3QgeSA9IHRoaXMuZWwuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5lbC5jbGllbnRIZWlnaHQ7XG4gICAgICB0aGlzLnNjcm9sbFRvKHksIGUuZHVyYXRpb24sIGUuZWFzaW5nKTtcbiAgICB9IGVsc2UgaWYgKGUudHlwZSA9PT0gJ3Njcm9sbFRvVG9wJykge1xuICAgICAgY29uc3QgeSA9IDA7XG4gICAgICB0aGlzLnNjcm9sbFRvKHksIGUuZHVyYXRpb24sIGUuZWFzaW5nKTtcbiAgICB9IGVsc2UgaWYgKGUudHlwZSA9PT0gJ3Njcm9sbFRvUGVyY2VudCcgJiYgKGUucGVyY2VudCA+PSAwICYmIGUucGVyY2VudCA8PSAxMDApKSB7XG4gICAgICBjb25zdCB5ID0gTWF0aC5yb3VuZCgoKHRoaXMuZWwuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5lbC5jbGllbnRIZWlnaHQpIC8gMTAwKSAqIGUucGVyY2VudCk7XG4gICAgICB0aGlzLnNjcm9sbFRvKHksIGUuZHVyYXRpb24sIGUuZWFzaW5nKTtcbiAgICB9IGVsc2UgaWYgKGUudHlwZSA9PT0gJ3Njcm9sbFRvJykge1xuICAgICAgY29uc3QgeSA9IGUueTtcbiAgICAgIGlmICh5IDw9IHRoaXMuZWwuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5lbC5jbGllbnRIZWlnaHQgJiYgeSA+PSAwKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVG8oeSwgZS5kdXJhdGlvbiwgZS5lYXNpbmcpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZS50eXBlID09PSAncmVjYWxjdWxhdGUnKSB7XG4gICAgICB0aGlzLmdldEJhckhlaWdodCgpO1xuICAgIH1cbiAgfVxuXG4gIHNldFN0eWxlKCk6IHZvaWQge1xuICAgIGNvbnN0IGVsID0gdGhpcy5lbDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsLCAnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbCwgJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgfVxuXG4gIG9uTXV0YXRpb24oKSB7XG4gICAgdGhpcy5nZXRCYXJIZWlnaHQoKTtcbiAgfVxuXG4gIHdyYXBDb250YWluZXIoKTogdm9pZCB7XG4gICAgdGhpcy53cmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB3cmFwcGVyID0gdGhpcy53cmFwcGVyO1xuICAgIGNvbnN0IGVsID0gdGhpcy5lbDtcblxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod3JhcHBlciwgJ3NsaW1zY3JvbGwtd3JhcHBlcicpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUod3JhcHBlciwgJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh3cmFwcGVyLCAnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh3cmFwcGVyLCAnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHdyYXBwZXIsICdtYXJnaW4nLCBnZXRDb21wdXRlZFN0eWxlKGVsKS5tYXJnaW4pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUod3JhcHBlciwgJ3dpZHRoJywgJzEwMCUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHdyYXBwZXIsICdoZWlnaHQnLCBnZXRDb21wdXRlZFN0eWxlKGVsKS5oZWlnaHQpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5pbnNlcnRCZWZvcmUoZWwucGFyZW50Tm9kZSwgd3JhcHBlciwgZWwpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQod3JhcHBlciwgZWwpO1xuICB9XG5cbiAgaW5pdEdyaWQoKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBncmlkID0gdGhpcy5ncmlkO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhncmlkLCAnc2xpbXNjcm9sbC1ncmlkJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdyaWQsICd0b3AnLCAnMCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgJ2JvdHRvbScsICcwJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCB0aGlzLm9wdGlvbnMucG9zaXRpb24sICcwJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAnd2lkdGgnLCBgJHt0aGlzLm9wdGlvbnMuZ3JpZFdpZHRofXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAnYmFja2dyb3VuZCcsIHRoaXMub3B0aW9ucy5ncmlkQmFja2dyb3VuZCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAnb3BhY2l0eScsIHRoaXMub3B0aW9ucy5ncmlkT3BhY2l0eSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAnZGlzcGxheScsICdibG9jaycpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAnei1pbmRleCcsICc5OScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgJ2JvcmRlci1yYWRpdXMnLCBgJHt0aGlzLm9wdGlvbnMuZ3JpZEJvcmRlclJhZGl1c31weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgJ21hcmdpbicsIHRoaXMub3B0aW9ucy5ncmlkTWFyZ2luKTtcblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyLCBncmlkKTtcbiAgfVxuXG4gIGluaXRCYXIoKTogdm9pZCB7XG4gICAgdGhpcy5iYXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJhciA9IHRoaXMuYmFyO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhiYXIsICdzbGltc2Nyb2xsLWJhcicpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYmFyLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgJ3RvcCcsICcwJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShiYXIsIHRoaXMub3B0aW9ucy5wb3NpdGlvbiwgJzAnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgJ3dpZHRoJywgYCR7dGhpcy5vcHRpb25zLmJhcldpZHRofXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShiYXIsICdiYWNrZ3JvdW5kJywgdGhpcy5vcHRpb25zLmJhckJhY2tncm91bmQpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYmFyLCAnb3BhY2l0eScsIHRoaXMub3B0aW9ucy5iYXJPcGFjaXR5KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShiYXIsICd6LWluZGV4JywgJzEwMCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYmFyLCAnYm9yZGVyLXJhZGl1cycsIGAke3RoaXMub3B0aW9ucy5iYXJCb3JkZXJSYWRpdXN9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgJ21hcmdpbicsIHRoaXMub3B0aW9ucy5iYXJNYXJnaW4pO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIsIGJhcik7XG4gICAgdGhpcy5iYXJWaXNpYmlsaXR5Q2hhbmdlLmVtaXQodHJ1ZSk7XG4gIH1cblxuICBnZXRCYXJIZWlnaHQoKTogdm9pZCB7XG4gICAgY29uc3QgZWxIZWlnaHQgPSB0aGlzLmVsLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBiYXJIZWlnaHQgPSBNYXRoLm1heCgoZWxIZWlnaHQgLyB0aGlzLmVsLnNjcm9sbEhlaWdodCkgKiBlbEhlaWdodCwgMzApICsgJ3B4JztcbiAgICBjb25zdCBkaXNwbGF5ID0gcGFyc2VJbnQoYmFySGVpZ2h0LCAxMCkgPT09IGVsSGVpZ2h0ID8gJ25vbmUnIDogJ2Jsb2NrJztcblxuICAgIGlmICh0aGlzLndyYXBwZXIub2Zmc2V0SGVpZ2h0ICE9PSBlbEhlaWdodCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLndyYXBwZXIsICdoZWlnaHQnLCBlbEhlaWdodCArICdweCcpO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5iYXIsICdoZWlnaHQnLCBiYXJIZWlnaHQpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5iYXIsICdkaXNwbGF5JywgZGlzcGxheSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmdyaWQsICdkaXNwbGF5JywgZGlzcGxheSk7XG4gICAgdGhpcy5iYXJWaXNpYmlsaXR5Q2hhbmdlLmVtaXQoZGlzcGxheSAhPT0gJ25vbmUnKTtcbiAgfVxuXG4gIHNjcm9sbFRvKHk6IG51bWJlciwgZHVyYXRpb246IG51bWJlciwgZWFzaW5nRnVuYzogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IGZyb20gPSB0aGlzLmVsLnNjcm9sbFRvcDtcbiAgICBjb25zdCBtYXhUb3AgPSB0aGlzLmVsLm9mZnNldEhlaWdodCAtIHRoaXMuYmFyLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBtYXhFbFNjcm9sbFRvcCA9IHRoaXMuZWwuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5lbC5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3QgYmFySGVpZ2h0ID0gTWF0aC5tYXgoKHRoaXMuZWwub2Zmc2V0SGVpZ2h0IC8gdGhpcy5lbC5zY3JvbGxIZWlnaHQpICogdGhpcy5lbC5vZmZzZXRIZWlnaHQsIDMwKTtcbiAgICBjb25zdCBwYWRkaW5nVG9wID0gcGFyc2VJbnQodGhpcy5lbC5zdHlsZS5wYWRkaW5nVG9wLCAxMCkgfHwgMDtcbiAgICBjb25zdCBwYWRkaW5nQm90dG9tID0gcGFyc2VJbnQodGhpcy5lbC5zdHlsZS5wYWRkaW5nQm90dG9tLCAxMCkgfHwgMDtcblxuICAgIGNvbnN0IHNjcm9sbCA9ICh0aW1lc3RhbXA6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgdGltZSA9IE1hdGgubWluKDEsICgoY3VycmVudFRpbWUgLSBzdGFydCkgLyBkdXJhdGlvbikpO1xuICAgICAgY29uc3QgZWFzZWRUaW1lID0gZWFzaW5nW2Vhc2luZ0Z1bmNdKHRpbWUpO1xuXG4gICAgICBpZiAocGFkZGluZ1RvcCA+IDAgfHwgcGFkZGluZ0JvdHRvbSA+IDApIHtcbiAgICAgICAgbGV0IGZyb21ZID0gbnVsbDtcblxuICAgICAgICBpZiAocGFkZGluZ1RvcCA+IDApIHtcbiAgICAgICAgICBmcm9tWSA9IC1wYWRkaW5nVG9wO1xuICAgICAgICAgIGZyb21ZID0gLSgoZWFzZWRUaW1lICogKHkgLSBmcm9tWSkpICsgZnJvbVkpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmdUb3AnLCBgJHtmcm9tWX1weGApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhZGRpbmdCb3R0b20gPiAwKSB7XG4gICAgICAgICAgZnJvbVkgPSBwYWRkaW5nQm90dG9tO1xuICAgICAgICAgIGZyb21ZID0gKChlYXNlZFRpbWUgKiAoeSAtIGZyb21ZKSkgKyBmcm9tWSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZ0JvdHRvbScsIGAke2Zyb21ZfXB4YCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZWwuc2Nyb2xsVG9wID0gKGVhc2VkVGltZSAqICh5IC0gZnJvbSkpICsgZnJvbTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGVyY2VudFNjcm9sbCA9IHRoaXMuZWwuc2Nyb2xsVG9wIC8gbWF4RWxTY3JvbGxUb3A7XG4gICAgICBpZiAocGFkZGluZ0JvdHRvbSA9PT0gMCkge1xuICAgICAgICBjb25zdCBkZWx0YSA9IE1hdGgucm91bmQoTWF0aC5yb3VuZCh0aGlzLmVsLmNsaWVudEhlaWdodCAqIHBlcmNlbnRTY3JvbGwpIC0gYmFySGVpZ2h0KTtcbiAgICAgICAgaWYgKGRlbHRhID4gMCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5iYXIsICd0b3AnLCBgJHtkZWx0YX1weGApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aW1lIDwgMSkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2Nyb2xsKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNjcm9sbCk7XG4gIH1cblxuICBzY3JvbGxDb250ZW50KHk6IG51bWJlciwgaXNXaGVlbDogYm9vbGVhbiwgaXNKdW1wOiBib29sZWFuKTogbnVsbCB8IG51bWJlciB7XG4gICAgbGV0IGRlbHRhID0geTtcbiAgICBjb25zdCBtYXhUb3AgPSB0aGlzLmVsLm9mZnNldEhlaWdodCAtIHRoaXMuYmFyLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBoaWRkZW5Db250ZW50ID0gdGhpcy5lbC5zY3JvbGxIZWlnaHQgLSB0aGlzLmVsLm9mZnNldEhlaWdodDtcbiAgICBsZXQgcGVyY2VudFNjcm9sbDogbnVtYmVyO1xuICAgIGxldCBvdmVyID0gbnVsbDtcblxuICAgIGlmIChpc1doZWVsKSB7XG4gICAgICBkZWx0YSA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy5iYXIpLnRvcCwgMTApICsgeSAqIDIwIC8gMTAwICogdGhpcy5iYXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICBpZiAoZGVsdGEgPCAwIHx8IGRlbHRhID4gbWF4VG9wKSB7XG4gICAgICAgIG92ZXIgPSBkZWx0YSA+IG1heFRvcCA/IGRlbHRhIC0gbWF4VG9wIDogZGVsdGE7XG4gICAgICB9XG5cbiAgICAgIGRlbHRhID0gTWF0aC5taW4oTWF0aC5tYXgoZGVsdGEsIDApLCBtYXhUb3ApO1xuICAgICAgZGVsdGEgPSAoeSA+IDApID8gTWF0aC5jZWlsKGRlbHRhKSA6IE1hdGguZmxvb3IoZGVsdGEpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJhciwgJ3RvcCcsIGRlbHRhICsgJ3B4Jyk7XG4gICAgfVxuXG4gICAgcGVyY2VudFNjcm9sbCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy5iYXIpLnRvcCwgMTApIC8gKHRoaXMuZWwub2Zmc2V0SGVpZ2h0IC0gdGhpcy5iYXIub2Zmc2V0SGVpZ2h0KTtcbiAgICBkZWx0YSA9IHBlcmNlbnRTY3JvbGwgKiBoaWRkZW5Db250ZW50O1xuXG4gICAgdGhpcy5lbC5zY3JvbGxUb3AgPSBkZWx0YTtcblxuICAgIHRoaXMuc2hvd0JhckFuZEdyaWQoKTtcblxuICAgIGlmICghdGhpcy5vcHRpb25zLmFsd2F5c1Zpc2libGUpIHtcbiAgICAgIGlmICh0aGlzLnZpc2libGVUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnZpc2libGVUaW1lb3V0KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy52aXNpYmxlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmhpZGVCYXJBbmRHcmlkKCk7XG4gICAgICB9LCB0aGlzLm9wdGlvbnMudmlzaWJsZVRpbWVvdXQpO1xuICAgIH1cbiAgICBjb25zdCBpc1Njcm9sbEF0U3RhcnQgPSBkZWx0YSA9PT0gMDtcbiAgICBjb25zdCBpc1Njcm9sbEF0RW5kID0gZGVsdGEgPT09IGhpZGRlbkNvbnRlbnQ7XG4gICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSBNYXRoLmNlaWwoZGVsdGEpO1xuICAgIGNvbnN0IHNjcm9sbFN0YXRlID0gbmV3IFNsaW1TY3JvbGxTdGF0ZSh7IHNjcm9sbFBvc2l0aW9uLCBpc1Njcm9sbEF0U3RhcnQsIGlzU2Nyb2xsQXRFbmQgfSk7XG4gICAgdGhpcy5zY3JvbGxDaGFuZ2VkLmVtaXQoc2Nyb2xsU3RhdGUpO1xuXG4gICAgcmV0dXJuIG92ZXI7XG4gIH1cblxuICBpbml0V2hlZWwgPSAoKSA9PiB7XG4gICAgY29uc3QgZG9tbW91c2VzY3JvbGwgPSBmcm9tRXZlbnQodGhpcy5lbCwgJ0RPTU1vdXNlU2Nyb2xsJyk7XG4gICAgY29uc3QgbW91c2V3aGVlbCA9IGZyb21FdmVudCh0aGlzLmVsLCAnbW91c2V3aGVlbCcpO1xuXG4gICAgY29uc3Qgd2hlZWxTdWJzY3JpcHRpb24gPSBtZXJnZSguLi5bZG9tbW91c2VzY3JvbGwsIG1vdXNld2hlZWxdKS5zdWJzY3JpYmUoKGU6IE1vdXNlV2hlZWxFdmVudCkgPT4ge1xuICAgICAgbGV0IGRlbHRhID0gMDtcblxuICAgICAgaWYgKGUud2hlZWxEZWx0YSkge1xuICAgICAgICBkZWx0YSA9IC1lLndoZWVsRGVsdGEgLyAxMjA7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLmRldGFpbCkge1xuICAgICAgICBkZWx0YSA9IGUuZGV0YWlsIC8gMztcbiAgICAgIH1cblxuICAgICAgdGhpcy5zY3JvbGxDb250ZW50KGRlbHRhLCB0cnVlLCBmYWxzZSk7XG5cbiAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuaW50ZXJhY3Rpb25TdWJzY3JpcHRpb25zLmFkZCh3aGVlbFN1YnNjcmlwdGlvbik7XG4gIH1cblxuICBpbml0RHJhZyA9ICgpID0+IHtcbiAgICBjb25zdCBiYXIgPSB0aGlzLmJhcjtcblxuICAgIGNvbnN0IG1vdXNlbW92ZSA9IGZyb21FdmVudCh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ21vdXNlbW92ZScpO1xuICAgIGNvbnN0IHRvdWNobW92ZSA9IGZyb21FdmVudCh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ3RvdWNobW92ZScpO1xuXG4gICAgY29uc3QgbW91c2Vkb3duID0gZnJvbUV2ZW50KGJhciwgJ21vdXNlZG93bicpO1xuICAgIGNvbnN0IHRvdWNoc3RhcnQgPSBmcm9tRXZlbnQodGhpcy5lbCwgJ3RvdWNoc3RhcnQnKTtcbiAgICBjb25zdCBtb3VzZXVwID0gZnJvbUV2ZW50KHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbW91c2V1cCcpO1xuICAgIGNvbnN0IHRvdWNoZW5kID0gZnJvbUV2ZW50KHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAndG91Y2hlbmQnKTtcblxuICAgIGNvbnN0IG1vdXNlZHJhZyA9IG1vdXNlZG93blxuICAgICAgLnBpcGUoXG4gICAgICAgIG1lcmdlTWFwKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5wYWdlWSA9IGUucGFnZVk7XG4gICAgICAgICAgdGhpcy50b3AgPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoYmFyKS50b3ApO1xuXG4gICAgICAgICAgcmV0dXJuIG1vdXNlbW92ZVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgoZW1vdmU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBlbW92ZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvcCArIGVtb3ZlLnBhZ2VZIC0gdGhpcy5wYWdlWTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIHRha2VVbnRpbChtb3VzZXVwKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBjb25zdCB0b3VjaGRyYWcgPSB0b3VjaHN0YXJ0XG4gICAgICAucGlwZShcbiAgICAgICAgbWVyZ2VNYXAoKGU6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnBhZ2VZID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgICAgIHRoaXMudG9wID0gLXBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShiYXIpLnRvcCk7XG5cbiAgICAgICAgICByZXR1cm4gdG91Y2htb3ZlXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKCh0bW92ZTogVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAtKHRoaXMudG9wICsgdG1vdmUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIHRoaXMucGFnZVkpO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgdGFrZVVudGlsKHRvdWNoZW5kKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBjb25zdCBkcmFnU3Vic2NyaXB0aW9uID0gbWVyZ2UoLi4uW21vdXNlZHJhZywgdG91Y2hkcmFnXSkuc3Vic2NyaWJlKCh0b3A6IG51bWJlcikgPT4ge1xuICAgICAgdGhpcy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3NlbGVjdHN0YXJ0JywgdGhpcy5wcmV2ZW50RGVmYXVsdEV2ZW50LCBmYWxzZSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm9keSwgJ3RvdWNoLWFjdGlvbicsICdwYW4teScpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHksICd1c2VyLXNlbGVjdCcsICdub25lJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYmFyLCAndG9wJywgYCR7dG9wfXB4YCk7XG4gICAgICBjb25zdCBvdmVyID0gdGhpcy5zY3JvbGxDb250ZW50KDAsIHRydWUsIGZhbHNlKTtcbiAgICAgIGNvbnN0IG1heFRvcCA9IHRoaXMuZWwub2Zmc2V0SGVpZ2h0IC0gdGhpcy5iYXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICBpZiAob3ZlciAmJiBvdmVyIDwgMCAmJiAtb3ZlciA8PSBtYXhUb3ApIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZ1RvcCcsIC1vdmVyICsgJ3B4Jyk7XG4gICAgICB9IGVsc2UgaWYgKG92ZXIgJiYgb3ZlciA+IDAgJiYgb3ZlciA8PSBtYXhUb3ApIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZ0JvdHRvbScsIG92ZXIgKyAncHgnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRyYWdFbmRTdWJzY3JpcHRpb24gPSBtZXJnZSguLi5bbW91c2V1cCwgdG91Y2hlbmRdKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3NlbGVjdHN0YXJ0JywgdGhpcy5wcmV2ZW50RGVmYXVsdEV2ZW50LCBmYWxzZSk7XG4gICAgICBjb25zdCBwYWRkaW5nVG9wID0gcGFyc2VJbnQodGhpcy5lbC5zdHlsZS5wYWRkaW5nVG9wLCAxMCk7XG4gICAgICBjb25zdCBwYWRkaW5nQm90dG9tID0gcGFyc2VJbnQodGhpcy5lbC5zdHlsZS5wYWRkaW5nQm90dG9tLCAxMCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm9keSwgJ3RvdWNoLWFjdGlvbicsICd1bnNldCcpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHksICd1c2VyLXNlbGVjdCcsICdkZWZhdWx0Jyk7XG5cbiAgICAgIGlmIChwYWRkaW5nVG9wID4gMCkge1xuICAgICAgICB0aGlzLnNjcm9sbFRvKDAsIDMwMCwgJ2xpbmVhcicpO1xuICAgICAgfSBlbHNlIGlmIChwYWRkaW5nQm90dG9tID4gMCkge1xuICAgICAgICB0aGlzLnNjcm9sbFRvKDAsIDMwMCwgJ2xpbmVhcicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5pbnRlcmFjdGlvblN1YnNjcmlwdGlvbnMuYWRkKGRyYWdTdWJzY3JpcHRpb24pO1xuICAgIHRoaXMuaW50ZXJhY3Rpb25TdWJzY3JpcHRpb25zLmFkZChkcmFnRW5kU3Vic2NyaXB0aW9uKTtcbiAgfVxuXG4gIHNob3dCYXJBbmRHcmlkKCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ncmlkLCAnYmFja2dyb3VuZCcsIHRoaXMub3B0aW9ucy5ncmlkQmFja2dyb3VuZCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJhciwgJ2JhY2tncm91bmQnLCB0aGlzLm9wdGlvbnMuYmFyQmFja2dyb3VuZCk7XG4gIH1cblxuICBoaWRlQmFyQW5kR3JpZCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ3JpZCwgJ2JhY2tncm91bmQnLCAndHJhbnNwYXJlbnQnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYmFyLCAnYmFja2dyb3VuZCcsICd0cmFuc3BhcmVudCcpO1xuICB9XG5cbiAgcHJldmVudERlZmF1bHRFdmVudCA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGltc2Nyb2xsLXdyYXBwZXInKSkge1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuZWwucGFyZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IGJhciA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcignLnNsaW1zY3JvbGwtYmFyJyk7XG4gICAgICB3cmFwcGVyLnJlbW92ZUNoaWxkKGJhcik7XG4gICAgICBjb25zdCBncmlkID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuc2xpbXNjcm9sbC1ncmlkJyk7XG4gICAgICB3cmFwcGVyLnJlbW92ZUNoaWxkKGdyaWQpO1xuICAgICAgdGhpcy51bndyYXAod3JhcHBlcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW50ZXJhY3Rpb25TdWJzY3JpcHRpb25zKSB7XG4gICAgICB0aGlzLmludGVyYWN0aW9uU3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHVud3JhcCh3cmFwcGVyOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgd2hpbGUgKHdyYXBwZXIuZmlyc3RDaGlsZCkge1xuICAgICAgY29uc3QgY2hpbGQgPSB3cmFwcGVyLnJlbW92ZUNoaWxkKHdyYXBwZXIuZmlyc3RDaGlsZCk7XG4gICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICB9XG4gICAgd3JhcHBlci5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChkb2NGcmFnLCB3cmFwcGVyKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBvblJlc2l6ZSgkZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuZ2V0QmFySGVpZ2h0KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTbGltU2Nyb2xsRGlyZWN0aXZlIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9zbGltc2Nyb2xsLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFNsaW1TY3JvbGxEaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFNsaW1TY3JvbGxEaXJlY3RpdmVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1NsaW1TY3JvbGxNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiSW5qZWN0aW9uVG9rZW4iLCJFdmVudEVtaXR0ZXIiLCJmcm9tRXZlbnQiLCJtZXJnZSIsIm1lcmdlTWFwIiwibWFwIiwidGFrZVVudGlsIiwiU3Vic2NyaXB0aW9uIiwiRGlyZWN0aXZlIiwiVmlld0NvbnRhaW5lclJlZiIsIkluamVjdCIsIlJlbmRlcmVyMiIsIkRPQ1VNRU5UIiwiT3B0aW9uYWwiLCJJbnB1dCIsIk91dHB1dCIsIkhvc3RMaXN0ZW5lciIsIk5nTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O1FBVUE7UUFTRSx5QkFBWSxHQUFzQjtZQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0s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VUFBVSxFQUFFLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUE7UUFDM0YsT0FBTyxFQUFFLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFBO1FBQ3JDLFFBQVEsRUFBRSxVQUFDLENBQVMsSUFBSyxPQUFBLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFBO1FBQzlDLFVBQVUsRUFBRSxVQUFDLENBQVMsSUFBSyxPQUFBLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUE7UUFDakYsT0FBTyxFQUFFLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBQTtRQUN6QyxRQUFRLEVBQUUsVUFBQyxDQUFTLElBQUssT0FBQSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUE7UUFDbEQsVUFBVSxFQUFFLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFBO0tBQzVGLENBQUM7O1FBMEJBLDZCQUNvQyxlQUNQLFVBQ0QsVUFDdUI7WUFKbkQsaUJBVUM7WUFUbUMsa0JBQWEsR0FBYixhQUFhO1lBQ3BCLGFBQVEsR0FBUixRQUFRO1lBQ1QsYUFBUSxHQUFSLFFBQVE7WUFDZSxvQkFBZSxHQUFmLGVBQWU7MkJBdkIvQyxJQUFJO2lDQUdrQixJQUFJQyxpQkFBWSxFQUFvQjt1Q0FDeEIsSUFBSUEsaUJBQVksRUFBVzs2QkE0UnBFO2dCQUNWLHFCQUFNLGNBQWMsR0FBR0MsY0FBUyxDQUFDLEtBQUksQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztnQkFDNUQscUJBQU0sVUFBVSxHQUFHQSxjQUFTLENBQUMsS0FBSSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFFcEQscUJBQU0saUJBQWlCLEdBQUdDLFVBQUssd0JBQUksQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLEdBQUUsU0FBUyxDQUFDLFVBQUMsQ0FBa0I7b0JBQzVGLHFCQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7b0JBRWQsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFO3dCQUNoQixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztxQkFDN0I7b0JBRUQsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFO3dCQUNaLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztxQkFDdEI7b0JBRUQsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUV2QyxJQUFJLENBQUMsQ0FBQyxjQUFjLEVBQUU7d0JBQ3BCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztxQkFDcEI7aUJBQ0YsQ0FBQyxDQUFDO2dCQUVILEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUN0RDs0QkFFVTtnQkFDVCxxQkFBTSxHQUFHLEdBQUcsS0FBSSxDQUFDLEdBQUcsQ0FBQztnQkFFckIscUJBQU0sU0FBUyxHQUFHRCxjQUFTLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3hFLHFCQUFNLFNBQVMsR0FBR0EsY0FBUyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUV4RSxxQkFBTSxTQUFTLEdBQUdBLGNBQVMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQzlDLHFCQUFNLFVBQVUsR0FBR0EsY0FBUyxDQUFDLEtBQUksQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3BELHFCQUFNLE9BQU8sR0FBR0EsY0FBUyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNwRSxxQkFBTSxRQUFRLEdBQUdBLGNBQVMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFFdEUscUJBQU0sU0FBUyxHQUFHLFNBQVM7cUJBQ3hCLElBQUksQ0FDSEUsa0JBQVEsQ0FBQyxVQUFDLENBQWE7b0JBQ3JCLEtBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDckIsS0FBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBRWpELE9BQU8sU0FBUzt5QkFDYixJQUFJLENBQ0hDLGFBQUcsQ0FBQyxVQUFDLEtBQWlCO3dCQUNwQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQ3ZCLE9BQU8sS0FBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUM7cUJBQzVDLENBQUMsRUFDRkMsbUJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FDbkIsQ0FBQztpQkFDTCxDQUFDLENBQ0gsQ0FBQztnQkFFSixxQkFBTSxTQUFTLEdBQUcsVUFBVTtxQkFDekIsSUFBSSxDQUNIRixrQkFBUSxDQUFDLFVBQUMsQ0FBYTtvQkFDckIsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDdEMsS0FBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFbEQsT0FBTyxTQUFTO3lCQUNiLElBQUksQ0FDSEMsYUFBRyxDQUFDLFVBQUMsS0FBaUI7d0JBQ3BCLE9BQU8sRUFBRSxLQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDaEUsQ0FBQyxFQUNGQyxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUNwQixDQUFDO2lCQUNMLENBQUMsQ0FDSCxDQUFDO2dCQUVKLHFCQUFNLGdCQUFnQixHQUFHSCxVQUFLLHdCQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFFLFNBQVMsQ0FBQyxVQUFDLEdBQVc7b0JBQzlFLEtBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDM0UsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQzNELEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUN6RCxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBSyxHQUFHLE9BQUksQ0FBQyxDQUFDO29CQUNwRCxxQkFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNoRCxxQkFBTSxNQUFNLEdBQUcsS0FBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7b0JBRTVELElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksTUFBTSxFQUFFO3dCQUN2QyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztxQkFDN0Q7eUJBQU0sSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksTUFBTSxFQUFFO3dCQUM3QyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsRUFBRSxFQUFFLGVBQWUsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7cUJBQy9EO2lCQUNGLENBQUMsQ0FBQztnQkFFSCxxQkFBTSxtQkFBbUIsR0FBR0EsVUFBSyx3QkFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRSxTQUFTLENBQUM7b0JBQ2xFLEtBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDOUUscUJBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzFELHFCQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNoRSxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDM0QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBRTVELElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTt3QkFDbEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3FCQUNqQzt5QkFBTSxJQUFJLGFBQWEsR0FBRyxDQUFDLEVBQUU7d0JBQzVCLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztxQkFDakM7aUJBQ0YsQ0FBQyxDQUFDO2dCQUVILEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDcEQsS0FBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ3hEO3VDQVlxQixVQUFDLENBQWE7Z0JBQ2xDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQ3JCO1lBMVhDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ25DLElBQUksQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDOUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxDQUFDO1NBQ25DOzs7O1FBRUQsc0NBQVE7OztZQUFSOztnQkFFRSxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2xELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDZDthQUNGOzs7OztRQUVELHlDQUFXOzs7O1lBQVgsVUFBWSxPQUFzQjtnQkFDaEMsSUFBSSxPQUFPLGFBQVU7b0JBQ25CLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTt3QkFDaEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO3FCQUNkO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDaEI7aUJBQ0Y7YUFDRjs7OztRQUVELHlDQUFXOzs7WUFBWDtnQkFDRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDaEI7Ozs7UUFFRCxtQ0FBSzs7O1lBQUw7Z0JBQUEsaUJBcUNDO2dCQXBDQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSUksaUJBQVksRUFBRSxDQUFDO2dCQUNuRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDaEY7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDcEQ7Z0JBRUQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNoQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNmLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBRWhCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtvQkFDL0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUN2QjtnQkFFRCxJQUFJLGdCQUFnQixFQUFFO29CQUNwQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO3FCQUNwQztvQkFDRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQzt3QkFDM0MsSUFBSSxLQUFJLENBQUMsdUJBQXVCLEVBQUU7NEJBQ2hDLFlBQVksQ0FBQyxLQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs0QkFDM0MsS0FBSSxDQUFDLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzt5QkFDM0U7cUJBQ0YsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQzVFO2dCQUVELElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxZQUFZTixpQkFBWSxFQUFFO29CQUNsRSxxQkFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQXNCLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFBLENBQUMsQ0FBQztvQkFDNUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUN2RDthQUNGOzs7OztRQUVELHlDQUFXOzs7O1lBQVgsVUFBWSxDQUFrQjtnQkFDNUIsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLGdCQUFnQixFQUFFO29CQUMvQixxQkFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN4QztxQkFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO29CQUNuQyxxQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN4QztxQkFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssaUJBQWlCLEtBQUssQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsRUFBRTtvQkFDL0UscUJBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hGLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN4QztxQkFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO29CQUNoQyxxQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDZCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUM5RCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDeEM7aUJBQ0Y7cUJBQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLGFBQWEsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNyQjthQUNGOzs7O1FBRUQsc0NBQVE7OztZQUFSO2dCQUNFLHFCQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ2hEOzs7O1FBRUQsd0NBQVU7OztZQUFWO2dCQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjs7OztRQUVELDJDQUFhOzs7WUFBYjtnQkFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsRCxxQkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDN0IscUJBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBRW5CLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN2RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUV2RSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3hDOzs7O1FBRUQsc0NBQVE7OztZQUFSO2dCQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9DLHFCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUV2QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxPQUFJLENBQUMsQ0FBQztnQkFDckUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2xFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsT0FBSSxDQUFDLENBQUM7Z0JBQ3BGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFaEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMvQzs7OztRQUVELHFDQUFPOzs7WUFBUDtnQkFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QyxxQkFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFFckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsT0FBSSxDQUFDLENBQUM7Z0JBQ25FLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsZUFBZSxFQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxPQUFJLENBQUMsQ0FBQztnQkFDbEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUU5RCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JDOzs7O1FBRUQsMENBQVk7OztZQUFaO2dCQUNFLHFCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdEMscUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLElBQUksUUFBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDcEYscUJBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEtBQUssUUFBUSxHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUM7Z0JBRXhFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssUUFBUSxFQUFFO29CQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7aUJBQ2pFO2dCQUVELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDO2FBQ25EOzs7Ozs7O1FBRUQsc0NBQVE7Ozs7OztZQUFSLFVBQVMsQ0FBUyxFQUFFLFFBQWdCLEVBQUUsVUFBa0I7Z0JBQXhELGlCQThDQztnQkE3Q0MscUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDekIscUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUMvQixxQkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7Z0JBQzVELHFCQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDbkUscUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDckcscUJBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvRCxxQkFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXJFLHFCQUFNLE1BQU0sR0FBRyxVQUFDLFNBQWlCO29CQUMvQixxQkFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUMvQixxQkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsS0FBSyxJQUFJLFFBQVEsRUFBRSxDQUFDO29CQUM3RCxxQkFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUUzQyxJQUFJLFVBQVUsR0FBRyxDQUFDLElBQUksYUFBYSxHQUFHLENBQUMsRUFBRTt3QkFDdkMscUJBQUksS0FBSyxHQUFHLElBQUksQ0FBQzt3QkFFakIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFOzRCQUNsQixLQUFLLEdBQUcsQ0FBQyxVQUFVLENBQUM7NEJBQ3BCLEtBQUssR0FBRyxFQUFFLENBQUMsU0FBUyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQzs0QkFDN0MsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUssS0FBSyxPQUFJLENBQUMsQ0FBQzt5QkFDN0Q7d0JBRUQsSUFBSSxhQUFhLEdBQUcsQ0FBQyxFQUFFOzRCQUNyQixLQUFLLEdBQUcsYUFBYSxDQUFDOzRCQUN0QixLQUFLLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDOzRCQUM1QyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsRUFBRSxFQUFFLGVBQWUsRUFBSyxLQUFLLE9BQUksQ0FBQyxDQUFDO3lCQUNoRTtxQkFDRjt5QkFBTTt3QkFDTCxLQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLFNBQVMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO3FCQUNyRDtvQkFFRCxxQkFBTSxhQUFhLEdBQUcsS0FBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO29CQUN6RCxJQUFJLGFBQWEsS0FBSyxDQUFDLEVBQUU7d0JBQ3ZCLHFCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7d0JBQ3ZGLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTs0QkFDYixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBSyxLQUFLLE9BQUksQ0FBQyxDQUFDO3lCQUN2RDtxQkFDRjtvQkFFRCxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7d0JBQ1oscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQy9CO2lCQUNGLENBQUM7Z0JBRUYscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDL0I7Ozs7Ozs7UUFFRCwyQ0FBYTs7Ozs7O1lBQWIsVUFBYyxDQUFTLEVBQUUsT0FBZ0IsRUFBRSxNQUFlO2dCQUExRCxpQkEwQ0M7Z0JBekNDLHFCQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2QscUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO2dCQUM1RCxxQkFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ2xFLHFCQUFJLGFBQXFCLENBQUM7Z0JBQzFCLHFCQUFJLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBRWhCLElBQUksT0FBTyxFQUFFO29CQUNYLEtBQUssR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztvQkFFNUYsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxNQUFNLEVBQUU7d0JBQy9CLElBQUksR0FBRyxLQUFLLEdBQUcsTUFBTSxHQUFHLEtBQUssR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDO3FCQUNoRDtvQkFFRCxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDN0MsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztpQkFDdkQ7Z0JBRUQsYUFBYSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzlHLEtBQUssR0FBRyxhQUFhLEdBQUcsYUFBYSxDQUFDO2dCQUV0QyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBRTFCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFO29CQUMvQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7d0JBQ3ZCLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7cUJBQ25DO29CQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDO3dCQUMvQixLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7cUJBQ3ZCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDakM7Z0JBQ0QscUJBQU0sZUFBZSxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUM7Z0JBQ3BDLHFCQUFNLGFBQWEsR0FBRyxLQUFLLEtBQUssYUFBYSxDQUFDO2dCQUM5QyxxQkFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEMscUJBQU0sV0FBVyxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsY0FBYyxnQkFBQSxFQUFFLGVBQWUsaUJBQUEsRUFBRSxhQUFhLGVBQUEsRUFBRSxDQUFDLENBQUM7Z0JBQzVGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUVyQyxPQUFPLElBQUksQ0FBQzthQUNiOzs7O1FBd0dELDRDQUFjOzs7WUFBZDtnQkFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM3RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzVFOzs7O1FBRUQsNENBQWM7OztZQUFkO2dCQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUMvRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQzthQUMvRDs7OztRQU9ELHFDQUFPOzs7WUFBUDtnQkFDRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2lCQUM5QjtnQkFFRCxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRTtvQkFDbEUscUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO29CQUN0QyxxQkFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUNyRCxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6QixxQkFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO29CQUN2RCxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUN0QjtnQkFFRCxJQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtvQkFDakMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUM3QzthQUNGOzs7OztRQUVELG9DQUFNOzs7O1lBQU4sVUFBTyxPQUFvQjtnQkFDekIscUJBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2dCQUNsRCxPQUFPLE9BQU8sQ0FBQyxVQUFVLEVBQUU7b0JBQ3pCLHFCQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDdEQsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDNUI7Z0JBQ0QsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ25EOzs7OztRQUdELHNDQUFROzs7O3NCQUFDLE1BQVc7Z0JBQ2xCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7O29CQXpidkJPLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsY0FBYzs7d0JBQ3hCLFFBQVEsRUFBRSxZQUFZO3FCQUN2Qjs7Ozs7d0JBdkNDQyxxQkFBZ0IsdUJBNkRiQyxXQUFNLFNBQUNELHFCQUFnQjt3QkF4RDFCRSxjQUFTLHVCQXlETkQsV0FBTSxTQUFDQyxjQUFTO3dEQUNoQkQsV0FBTSxTQUFDRSxlQUFRO3dEQUNmRixXQUFNLFNBQUMsbUJBQW1CLGNBQUdHLGFBQVE7Ozs7Z0NBdkJ2Q0MsVUFBSztnQ0FDTEEsVUFBSztxQ0FDTEEsVUFBSztzQ0FDTEMsV0FBTSxTQUFDLGVBQWU7NENBQ3RCQSxXQUFNLFNBQUMscUJBQXFCO2lDQThhNUJDLGlCQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOztrQ0E3ZDNDOzs7Ozs7O0FDQUE7Ozs7b0JBR0NDLGFBQVEsU0FBQzt3QkFDUixZQUFZLEVBQUU7NEJBQ1osbUJBQW1CO3lCQUNwQjt3QkFDRCxPQUFPLEVBQUU7NEJBQ1AsbUJBQW1CO3lCQUNwQjtxQkFDRjs7aUNBVkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=