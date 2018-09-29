/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ViewContainerRef, HostListener, Renderer2, Inject, Optional, Input, EventEmitter, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SlimScrollOptions, SLIMSCROLL_DEFAULTS } from '../classes/slimscroll-options.class';
import { SlimScrollState } from '../classes/slimscroll-state.class';
import { Subscription, fromEvent, merge } from 'rxjs';
import { mergeMap, map, takeUntil } from 'rxjs/operators';
export var /** @type {?} */ easing = {
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
var SlimScrollDirective = /** @class */ (function () {
    function SlimScrollDirective(viewContainer, renderer, document, optionsDefaults) {
        var _this = this;
        this.viewContainer = viewContainer;
        this.renderer = renderer;
        this.document = document;
        this.optionsDefaults = optionsDefaults;
        this.enabled = true;
        this.scrollChanged = new EventEmitter();
        this.barVisibilityChange = new EventEmitter();
        this.initWheel = function () {
            var /** @type {?} */ dommousescroll = fromEvent(_this.el, 'DOMMouseScroll');
            var /** @type {?} */ mousewheel = fromEvent(_this.el, 'mousewheel');
            var /** @type {?} */ wheelSubscription = merge.apply(void 0, tslib_1.__spread([dommousescroll, mousewheel])).subscribe(function (e) {
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
            var /** @type {?} */ mousemove = fromEvent(_this.document.documentElement, 'mousemove');
            var /** @type {?} */ touchmove = fromEvent(_this.document.documentElement, 'touchmove');
            var /** @type {?} */ mousedown = fromEvent(bar, 'mousedown');
            var /** @type {?} */ touchstart = fromEvent(_this.el, 'touchstart');
            var /** @type {?} */ mouseup = fromEvent(_this.document.documentElement, 'mouseup');
            var /** @type {?} */ touchend = fromEvent(_this.document.documentElement, 'touchend');
            var /** @type {?} */ mousedrag = mousedown
                .pipe(mergeMap(function (e) {
                _this.pageY = e.pageY;
                _this.top = parseFloat(getComputedStyle(bar).top);
                return mousemove
                    .pipe(map(function (emove) {
                    emove.preventDefault();
                    return _this.top + emove.pageY - _this.pageY;
                }), takeUntil(mouseup));
            }));
            var /** @type {?} */ touchdrag = touchstart
                .pipe(mergeMap(function (e) {
                _this.pageY = e.targetTouches[0].pageY;
                _this.top = -parseFloat(getComputedStyle(bar).top);
                return touchmove
                    .pipe(map(function (tmove) {
                    return -(_this.top + tmove.targetTouches[0].pageY - _this.pageY);
                }), takeUntil(touchend));
            }));
            var /** @type {?} */ dragSubscription = merge.apply(void 0, tslib_1.__spread([mousedrag, touchdrag])).subscribe(function (top) {
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
            var /** @type {?} */ dragEndSubscription = merge.apply(void 0, tslib_1.__spread([mouseup, touchend])).subscribe(function () {
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
        this.interactionSubscriptions = new Subscription();
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
        if (this.scrollEvents && this.scrollEvents instanceof EventEmitter) {
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
        { type: Directive, args: [{
                    selector: '[slimScroll]',
                    // tslint:disable-line
                    exportAs: 'slimScroll'
                },] },
    ];
    /** @nocollapse */
    SlimScrollDirective.ctorParameters = function () { return [
        { type: ViewContainerRef, decorators: [{ type: Inject, args: [ViewContainerRef,] },] },
        { type: Renderer2, decorators: [{ type: Inject, args: [Renderer2,] },] },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: undefined, decorators: [{ type: Inject, args: [SLIMSCROLL_DEFAULTS,] }, { type: Optional },] },
    ]; };
    SlimScrollDirective.propDecorators = {
        "enabled": [{ type: Input },],
        "options": [{ type: Input },],
        "scrollEvents": [{ type: Input },],
        "scrollChanged": [{ type: Output, args: ['scrollChanged',] },],
        "barVisibilityChange": [{ type: Output, args: ['barVisibilityChange',] },],
        "onResize": [{ type: HostListener, args: ['window:resize', ['$event'],] },],
    };
    return SlimScrollDirective;
}());
export { SlimScrollDirective };
function SlimScrollDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SlimScrollDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SlimScrollDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SlimScrollDirective.propDecorators;
    /** @type {?} */
    SlimScrollDirective.prototype.enabled;
    /** @type {?} */
    SlimScrollDirective.prototype.options;
    /** @type {?} */
    SlimScrollDirective.prototype.scrollEvents;
    /** @type {?} */
    SlimScrollDirective.prototype.scrollChanged;
    /** @type {?} */
    SlimScrollDirective.prototype.barVisibilityChange;
    /** @type {?} */
    SlimScrollDirective.prototype.el;
    /** @type {?} */
    SlimScrollDirective.prototype.wrapper;
    /** @type {?} */
    SlimScrollDirective.prototype.grid;
    /** @type {?} */
    SlimScrollDirective.prototype.bar;
    /** @type {?} */
    SlimScrollDirective.prototype.body;
    /** @type {?} */
    SlimScrollDirective.prototype.pageY;
    /** @type {?} */
    SlimScrollDirective.prototype.top;
    /** @type {?} */
    SlimScrollDirective.prototype.dragging;
    /** @type {?} */
    SlimScrollDirective.prototype.mutationThrottleTimeout;
    /** @type {?} */
    SlimScrollDirective.prototype.mutationObserver;
    /** @type {?} */
    SlimScrollDirective.prototype.lastTouchPositionY;
    /** @type {?} */
    SlimScrollDirective.prototype.visibleTimeout;
    /** @type {?} */
    SlimScrollDirective.prototype.interactionSubscriptions;
    /** @type {?} */
    SlimScrollDirective.prototype.initWheel;
    /** @type {?} */
    SlimScrollDirective.prototype.initDrag;
    /** @type {?} */
    SlimScrollDirective.prototype.preventDefaultEvent;
    /** @type {?} */
    SlimScrollDirective.prototype.viewContainer;
    /** @type {?} */
    SlimScrollDirective.prototype.renderer;
    /** @type {?} */
    SlimScrollDirective.prototype.document;
    /** @type {?} */
    SlimScrollDirective.prototype.optionsDefaults;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpbXNjcm9sbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2xpbXNjcm9sbC8iLCJzb3VyY2VzIjpbImFwcC9uZ3gtc2xpbXNjcm9sbC9kaXJlY3RpdmVzL3NsaW1zY3JvbGwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsWUFBWSxFQUlaLFNBQVMsRUFDVCxNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFDTCxZQUFZLEVBQ1osTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQXNCLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFakgsT0FBTyxFQUFFLGVBQWUsRUFBb0IsTUFBTSxtQ0FBbUMsQ0FBQztBQUN0RixPQUFPLEVBQWMsWUFBWSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUQsTUFBTSxDQUFDLHFCQUFNLE1BQU0sR0FBZ0M7SUFDakQsTUFBTSxFQUFFLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxFQUFELENBQUM7SUFDeEIsTUFBTSxFQUFFLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsRUFBTCxDQUFLO0lBQzVCLE9BQU8sRUFBRSxVQUFDLENBQVMsSUFBSyxPQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBWCxDQUFXO0lBQ25DLFNBQVMsRUFBRSxVQUFDLENBQVMsSUFBSyxPQUFBLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FB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Qzs7O2dCQXpidkIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjOztvQkFDeEIsUUFBUSxFQUFFLFlBQVk7aUJBQ3ZCOzs7O2dCQXZDQyxnQkFBZ0IsdUJBNkRiLE1BQU0sU0FBQyxnQkFBZ0I7Z0JBeEQxQixTQUFTLHVCQXlETixNQUFNLFNBQUMsU0FBUztnREFDaEIsTUFBTSxTQUFDLFFBQVE7Z0RBQ2YsTUFBTSxTQUFDLG1CQUFtQixjQUFHLFFBQVE7Ozs0QkF2QnZDLEtBQUs7NEJBQ0wsS0FBSztpQ0FDTCxLQUFLO2tDQUNMLE1BQU0sU0FBQyxlQUFlO3dDQUN0QixNQUFNLFNBQUMscUJBQXFCOzZCQThhNUIsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7OEJBN2QzQzs7U0EwQ2EsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgSW5qZWN0LFxuICBPcHRpb25hbCxcbiAgSW5wdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU2xpbVNjcm9sbE9wdGlvbnMsIElTbGltU2Nyb2xsT3B0aW9ucywgU0xJTVNDUk9MTF9ERUZBVUxUUyB9IGZyb20gJy4uL2NsYXNzZXMvc2xpbXNjcm9sbC1vcHRpb25zLmNsYXNzJztcbmltcG9ydCB7IElTbGltU2Nyb2xsRXZlbnQsIFNsaW1TY3JvbGxFdmVudCB9IGZyb20gJy4uL2NsYXNzZXMvc2xpbXNjcm9sbC1ldmVudC5jbGFzcyc7XG5pbXBvcnQgeyBTbGltU2Nyb2xsU3RhdGUsIElTbGltU2Nyb2xsU3RhdGUgfSBmcm9tICcuLi9jbGFzc2VzL3NsaW1zY3JvbGwtc3RhdGUuY2xhc3MnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCwgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBlYXNpbmc6IHsgW2tleTogc3RyaW5nXTogRnVuY3Rpb24gfSA9IHtcbiAgbGluZWFyOiAodDogbnVtYmVyKSA9PiB0LFxuICBpblF1YWQ6ICh0OiBudW1iZXIpID0+IHQgKiB0LFxuICBvdXRRdWFkOiAodDogbnVtYmVyKSA9PiB0ICogKDIgLSB0KSxcbiAgaW5PdXRRdWFkOiAodDogbnVtYmVyKSA9PiB0IDwgLjUgPyAyICogdCAqIHQgOiAtMSArICg0IC0gMiAqIHQpICogdCxcbiAgaW5DdWJpYzogKHQ6IG51bWJlcikgPT4gdCAqIHQgKiB0LFxuICBvdXRDdWJpYzogKHQ6IG51bWJlcikgPT4gKC0tdCkgKiB0ICogdCArIDEsXG4gIGluT3V0Q3ViaWM6ICh0OiBudW1iZXIpID0+IHQgPCAuNSA/IDQgKiB0ICogdCAqIHQgOiAodCAtIDEpICogKDIgKiB0IC0gMikgKiAoMiAqIHQgLSAyKSArIDEsXG4gIGluUXVhcnQ6ICh0OiBudW1iZXIpID0+IHQgKiB0ICogdCAqIHQsXG4gIG91dFF1YXJ0OiAodDogbnVtYmVyKSA9PiAxIC0gKC0tdCkgKiB0ICogdCAqIHQsXG4gIGluT3V0UXVhcnQ6ICh0OiBudW1iZXIpID0+IHQgPCAuNSA/IDggKiB0ICogdCAqIHQgKiB0IDogMSAtIDggKiAoLS10KSAqIHQgKiB0ICogdCxcbiAgaW5RdWludDogKHQ6IG51bWJlcikgPT4gdCAqIHQgKiB0ICogdCAqIHQsXG4gIG91dFF1aW50OiAodDogbnVtYmVyKSA9PiAxICsgKC0tdCkgKiB0ICogdCAqIHQgKiB0LFxuICBpbk91dFF1aW50OiAodDogbnVtYmVyKSA9PiB0IDwgLjUgPyAxNiAqIHQgKiB0ICogdCAqIHQgKiB0IDogMSArIDE2ICogKC0tdCkgKiB0ICogdCAqIHQgKiB0XG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbc2xpbVNjcm9sbF0nLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gIGV4cG9ydEFzOiAnc2xpbVNjcm9sbCdcbn0pXG5leHBvcnQgY2xhc3MgU2xpbVNjcm9sbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBlbmFibGVkID0gdHJ1ZTtcbiAgQElucHV0KCkgb3B0aW9uczogU2xpbVNjcm9sbE9wdGlvbnM7XG4gIEBJbnB1dCgpIHNjcm9sbEV2ZW50czogRXZlbnRFbWl0dGVyPElTbGltU2Nyb2xsRXZlbnQ+O1xuICBAT3V0cHV0KCdzY3JvbGxDaGFuZ2VkJykgc2Nyb2xsQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SVNsaW1TY3JvbGxTdGF0ZT4oKTtcbiAgQE91dHB1dCgnYmFyVmlzaWJpbGl0eUNoYW5nZScpIGJhclZpc2liaWxpdHlDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgZWw6IEhUTUxFbGVtZW50O1xuICB3cmFwcGVyOiBIVE1MRWxlbWVudDtcbiAgZ3JpZDogSFRNTEVsZW1lbnQ7XG4gIGJhcjogSFRNTEVsZW1lbnQ7XG4gIGJvZHk6IEhUTUxFbGVtZW50O1xuICBwYWdlWTogbnVtYmVyO1xuICB0b3A6IG51bWJlcjtcbiAgZHJhZ2dpbmc6IGJvb2xlYW47XG4gIG11dGF0aW9uVGhyb3R0bGVUaW1lb3V0OiBudW1iZXI7XG4gIG11dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gIGxhc3RUb3VjaFBvc2l0aW9uWTogbnVtYmVyO1xuICB2aXNpYmxlVGltZW91dDogYW55O1xuICBpbnRlcmFjdGlvblN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbjtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChWaWV3Q29udGFpbmVyUmVmKSBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQEluamVjdChSZW5kZXJlcjIpIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgQEluamVjdChTTElNU0NST0xMX0RFRkFVTFRTKSBAT3B0aW9uYWwoKSBwcml2YXRlIG9wdGlvbnNEZWZhdWx0czogSVNsaW1TY3JvbGxPcHRpb25zXG4gICkge1xuICAgIHRoaXMudmlld0NvbnRhaW5lciA9IHZpZXdDb250YWluZXI7XG4gICAgdGhpcy5lbCA9IHZpZXdDb250YWluZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuYm9keSA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIHRoaXMubXV0YXRpb25UaHJvdHRsZVRpbWVvdXQgPSA1MDtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIHNldHVwIGlmIG5vIGNoYW5nZXMgZm9yIGVuYWJsZWQgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgaWYgKCF0aGlzLmludGVyYWN0aW9uU3Vic2NyaXB0aW9ucyAmJiB0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuZW5hYmxlZCkge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgICB0aGlzLnNldHVwKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHNldHVwKCkge1xuICAgIHRoaXMuaW50ZXJhY3Rpb25TdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIGlmICh0aGlzLm9wdGlvbnNEZWZhdWx0cykge1xuICAgICAgdGhpcy5vcHRpb25zID0gbmV3IFNsaW1TY3JvbGxPcHRpb25zKHRoaXMub3B0aW9uc0RlZmF1bHRzKS5tZXJnZSh0aGlzLm9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBuZXcgU2xpbVNjcm9sbE9wdGlvbnModGhpcy5vcHRpb25zKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0eWxlKCk7XG4gICAgdGhpcy53cmFwQ29udGFpbmVyKCk7XG4gICAgdGhpcy5pbml0R3JpZCgpO1xuICAgIHRoaXMuaW5pdEJhcigpO1xuICAgIHRoaXMuZ2V0QmFySGVpZ2h0KCk7XG4gICAgdGhpcy5pbml0V2hlZWwoKTtcbiAgICB0aGlzLmluaXREcmFnKCk7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5hbHdheXNWaXNpYmxlKSB7XG4gICAgICB0aGlzLmhpZGVCYXJBbmRHcmlkKCk7XG4gICAgfVxuXG4gICAgaWYgKE11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIGlmICh0aGlzLm11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubXV0YXRpb25UaHJvdHRsZVRpbWVvdXQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5tdXRhdGlvblRocm90dGxlVGltZW91dCk7XG4gICAgICAgICAgdGhpcy5tdXRhdGlvblRocm90dGxlVGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5vbk11dGF0aW9uLmJpbmQodGhpcyksIDUwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsLCB7IHN1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zY3JvbGxFdmVudHMgJiYgdGhpcy5zY3JvbGxFdmVudHMgaW5zdGFuY2VvZiBFdmVudEVtaXR0ZXIpIHtcbiAgICAgIGNvbnN0IHNjcm9sbFN1YnNjcmlwdGlvbiA9IHRoaXMuc2Nyb2xsRXZlbnRzLnN1YnNjcmliZSgoZXZlbnQ6IFNsaW1TY3JvbGxFdmVudCkgPT4gdGhpcy5oYW5kbGVFdmVudChldmVudCkpO1xuICAgICAgdGhpcy5pbnRlcmFjdGlvblN1YnNjcmlwdGlvbnMuYWRkKHNjcm9sbFN1YnNjcmlwdGlvbik7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRXZlbnQoZTogU2xpbVNjcm9sbEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ3Njcm9sbFRvQm90dG9tJykge1xuICAgICAgY29uc3QgeSA9IHRoaXMuZWwuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5lbC5jbGllbnRIZWlnaHQ7XG4gICAgICB0aGlzLnNjcm9sbFRvKHksIGUuZHVyYXRpb24sIGUuZWFzaW5nKTtcbiAgICB9IGVsc2UgaWYgKGUudHlwZSA9PT0gJ3Njcm9sbFRvVG9wJykge1xuICAgICAgY29uc3QgeSA9IDA7XG4gICAgICB0aGlzLnNjcm9sbFRvKHksIGUuZHVyYXRpb24sIGUuZWFzaW5nKTtcbiAgICB9IGVsc2UgaWYgKGUudHlwZSA9PT0gJ3Njcm9sbFRvUGVyY2VudCcgJiYgKGUucGVyY2VudCA+PSAwICYmIGUucGVyY2VudCA8PSAxMDApKSB7XG4gICAgICBjb25zdCB5ID0gTWF0aC5yb3VuZCgoKHRoaXMuZWwuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5lbC5jbGllbnRIZWlnaHQpIC8gMTAwKSAqIGUucGVyY2VudCk7XG4gICAgICB0aGlzLnNjcm9sbFRvKHksIGUuZHVyYXRpb24sIGUuZWFzaW5nKTtcbiAgICB9IGVsc2UgaWYgKGUudHlwZSA9PT0gJ3Njcm9sbFRvJykge1xuICAgICAgY29uc3QgeSA9IGUueTtcbiAgICAgIGlmICh5IDw9IHRoaXMuZWwuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5lbC5jbGllbnRIZWlnaHQgJiYgeSA+PSAwKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVG8oeSwgZS5kdXJhdGlvbiwgZS5lYXNpbmcpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZS50eXBlID09PSAncmVjYWxjdWxhdGUnKSB7XG4gICAgICB0aGlzLmdldEJhckhlaWdodCgpO1xuICAgIH1cbiAgfVxuXG4gIHNldFN0eWxlKCk6IHZvaWQge1xuICAgIGNvbnN0IGVsID0gdGhpcy5lbDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsLCAnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbCwgJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgfVxuXG4gIG9uTXV0YXRpb24oKSB7XG4gICAgdGhpcy5nZXRCYXJIZWlnaHQoKTtcbiAgfVxuXG4gIHdyYXBDb250YWluZXIoKTogdm9pZCB7XG4gICAgdGhpcy53cmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB3cmFwcGVyID0gdGhpcy53cmFwcGVyO1xuICAgIGNvbnN0IGVsID0gdGhpcy5lbDtcblxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod3JhcHBlciwgJ3NsaW1zY3JvbGwtd3JhcHBlcicpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUod3JhcHBlciwgJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh3cmFwcGVyLCAnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh3cmFwcGVyLCAnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHdyYXBwZXIsICdtYXJnaW4nLCBnZXRDb21wdXRlZFN0eWxlKGVsKS5tYXJnaW4pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUod3JhcHBlciwgJ3dpZHRoJywgJzEwMCUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHdyYXBwZXIsICdoZWlnaHQnLCBnZXRDb21wdXRlZFN0eWxlKGVsKS5oZWlnaHQpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5pbnNlcnRCZWZvcmUoZWwucGFyZW50Tm9kZSwgd3JhcHBlciwgZWwpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQod3JhcHBlciwgZWwpO1xuICB9XG5cbiAgaW5pdEdyaWQoKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBncmlkID0gdGhpcy5ncmlkO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhncmlkLCAnc2xpbXNjcm9sbC1ncmlkJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdyaWQsICd0b3AnLCAnMCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgJ2JvdHRvbScsICcwJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCB0aGlzLm9wdGlvbnMucG9zaXRpb24sICcwJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAnd2lkdGgnLCBgJHt0aGlzLm9wdGlvbnMuZ3JpZFdpZHRofXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAnYmFja2dyb3VuZCcsIHRoaXMub3B0aW9ucy5ncmlkQmFja2dyb3VuZCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAnb3BhY2l0eScsIHRoaXMub3B0aW9ucy5ncmlkT3BhY2l0eSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAnZGlzcGxheScsICdibG9jaycpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAnei1pbmRleCcsICc5OScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgJ2JvcmRlci1yYWRpdXMnLCBgJHt0aGlzLm9wdGlvbnMuZ3JpZEJvcmRlclJhZGl1c31weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgJ21hcmdpbicsIHRoaXMub3B0aW9ucy5ncmlkTWFyZ2luKTtcblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyLCBncmlkKTtcbiAgfVxuXG4gIGluaXRCYXIoKTogdm9pZCB7XG4gICAgdGhpcy5iYXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJhciA9IHRoaXMuYmFyO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhiYXIsICdzbGltc2Nyb2xsLWJhcicpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYmFyLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgJ3RvcCcsICcwJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShiYXIsIHRoaXMub3B0aW9ucy5wb3NpdGlvbiwgJzAnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgJ3dpZHRoJywgYCR7dGhpcy5vcHRpb25zLmJhcldpZHRofXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShiYXIsICdiYWNrZ3JvdW5kJywgdGhpcy5vcHRpb25zLmJhckJhY2tncm91bmQpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYmFyLCAnb3BhY2l0eScsIHRoaXMub3B0aW9ucy5iYXJPcGFjaXR5KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShiYXIsICd6LWluZGV4JywgJzEwMCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYmFyLCAnYm9yZGVyLXJhZGl1cycsIGAke3RoaXMub3B0aW9ucy5iYXJCb3JkZXJSYWRpdXN9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgJ21hcmdpbicsIHRoaXMub3B0aW9ucy5iYXJNYXJnaW4pO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIsIGJhcik7XG4gICAgdGhpcy5iYXJWaXNpYmlsaXR5Q2hhbmdlLmVtaXQodHJ1ZSk7XG4gIH1cblxuICBnZXRCYXJIZWlnaHQoKTogdm9pZCB7XG4gICAgY29uc3QgZWxIZWlnaHQgPSB0aGlzLmVsLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBiYXJIZWlnaHQgPSBNYXRoLm1heCgoZWxIZWlnaHQgLyB0aGlzLmVsLnNjcm9sbEhlaWdodCkgKiBlbEhlaWdodCwgMzApICsgJ3B4JztcbiAgICBjb25zdCBkaXNwbGF5ID0gcGFyc2VJbnQoYmFySGVpZ2h0LCAxMCkgPT09IGVsSGVpZ2h0ID8gJ25vbmUnIDogJ2Jsb2NrJztcblxuICAgIGlmICh0aGlzLndyYXBwZXIub2Zmc2V0SGVpZ2h0ICE9PSBlbEhlaWdodCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLndyYXBwZXIsICdoZWlnaHQnLCBlbEhlaWdodCArICdweCcpO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5iYXIsICdoZWlnaHQnLCBiYXJIZWlnaHQpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5iYXIsICdkaXNwbGF5JywgZGlzcGxheSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmdyaWQsICdkaXNwbGF5JywgZGlzcGxheSk7XG4gICAgdGhpcy5iYXJWaXNpYmlsaXR5Q2hhbmdlLmVtaXQoZGlzcGxheSAhPT0gJ25vbmUnKTtcbiAgfVxuXG4gIHNjcm9sbFRvKHk6IG51bWJlciwgZHVyYXRpb246IG51bWJlciwgZWFzaW5nRnVuYzogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IGZyb20gPSB0aGlzLmVsLnNjcm9sbFRvcDtcbiAgICBjb25zdCBtYXhUb3AgPSB0aGlzLmVsLm9mZnNldEhlaWdodCAtIHRoaXMuYmFyLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBtYXhFbFNjcm9sbFRvcCA9IHRoaXMuZWwuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5lbC5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3QgYmFySGVpZ2h0ID0gTWF0aC5tYXgoKHRoaXMuZWwub2Zmc2V0SGVpZ2h0IC8gdGhpcy5lbC5zY3JvbGxIZWlnaHQpICogdGhpcy5lbC5vZmZzZXRIZWlnaHQsIDMwKTtcbiAgICBjb25zdCBwYWRkaW5nVG9wID0gcGFyc2VJbnQodGhpcy5lbC5zdHlsZS5wYWRkaW5nVG9wLCAxMCkgfHwgMDtcbiAgICBjb25zdCBwYWRkaW5nQm90dG9tID0gcGFyc2VJbnQodGhpcy5lbC5zdHlsZS5wYWRkaW5nQm90dG9tLCAxMCkgfHwgMDtcblxuICAgIGNvbnN0IHNjcm9sbCA9ICh0aW1lc3RhbXA6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgdGltZSA9IE1hdGgubWluKDEsICgoY3VycmVudFRpbWUgLSBzdGFydCkgLyBkdXJhdGlvbikpO1xuICAgICAgY29uc3QgZWFzZWRUaW1lID0gZWFzaW5nW2Vhc2luZ0Z1bmNdKHRpbWUpO1xuXG4gICAgICBpZiAocGFkZGluZ1RvcCA+IDAgfHwgcGFkZGluZ0JvdHRvbSA+IDApIHtcbiAgICAgICAgbGV0IGZyb21ZID0gbnVsbDtcblxuICAgICAgICBpZiAocGFkZGluZ1RvcCA+IDApIHtcbiAgICAgICAgICBmcm9tWSA9IC1wYWRkaW5nVG9wO1xuICAgICAgICAgIGZyb21ZID0gLSgoZWFzZWRUaW1lICogKHkgLSBmcm9tWSkpICsgZnJvbVkpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmdUb3AnLCBgJHtmcm9tWX1weGApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhZGRpbmdCb3R0b20gPiAwKSB7XG4gICAgICAgICAgZnJvbVkgPSBwYWRkaW5nQm90dG9tO1xuICAgICAgICAgIGZyb21ZID0gKChlYXNlZFRpbWUgKiAoeSAtIGZyb21ZKSkgKyBmcm9tWSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZ0JvdHRvbScsIGAke2Zyb21ZfXB4YCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZWwuc2Nyb2xsVG9wID0gKGVhc2VkVGltZSAqICh5IC0gZnJvbSkpICsgZnJvbTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGVyY2VudFNjcm9sbCA9IHRoaXMuZWwuc2Nyb2xsVG9wIC8gbWF4RWxTY3JvbGxUb3A7XG4gICAgICBpZiAocGFkZGluZ0JvdHRvbSA9PT0gMCkge1xuICAgICAgICBjb25zdCBkZWx0YSA9IE1hdGgucm91bmQoTWF0aC5yb3VuZCh0aGlzLmVsLmNsaWVudEhlaWdodCAqIHBlcmNlbnRTY3JvbGwpIC0gYmFySGVpZ2h0KTtcbiAgICAgICAgaWYgKGRlbHRhID4gMCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5iYXIsICd0b3AnLCBgJHtkZWx0YX1weGApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aW1lIDwgMSkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2Nyb2xsKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNjcm9sbCk7XG4gIH1cblxuICBzY3JvbGxDb250ZW50KHk6IG51bWJlciwgaXNXaGVlbDogYm9vbGVhbiwgaXNKdW1wOiBib29sZWFuKTogbnVsbCB8IG51bWJlciB7XG4gICAgbGV0IGRlbHRhID0geTtcbiAgICBjb25zdCBtYXhUb3AgPSB0aGlzLmVsLm9mZnNldEhlaWdodCAtIHRoaXMuYmFyLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBoaWRkZW5Db250ZW50ID0gdGhpcy5lbC5zY3JvbGxIZWlnaHQgLSB0aGlzLmVsLm9mZnNldEhlaWdodDtcbiAgICBsZXQgcGVyY2VudFNjcm9sbDogbnVtYmVyO1xuICAgIGxldCBvdmVyID0gbnVsbDtcblxuICAgIGlmIChpc1doZWVsKSB7XG4gICAgICBkZWx0YSA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy5iYXIpLnRvcCwgMTApICsgeSAqIDIwIC8gMTAwICogdGhpcy5iYXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICBpZiAoZGVsdGEgPCAwIHx8IGRlbHRhID4gbWF4VG9wKSB7XG4gICAgICAgIG92ZXIgPSBkZWx0YSA+IG1heFRvcCA/IGRlbHRhIC0gbWF4VG9wIDogZGVsdGE7XG4gICAgICB9XG5cbiAgICAgIGRlbHRhID0gTWF0aC5taW4oTWF0aC5tYXgoZGVsdGEsIDApLCBtYXhUb3ApO1xuICAgICAgZGVsdGEgPSAoeSA+IDApID8gTWF0aC5jZWlsKGRlbHRhKSA6IE1hdGguZmxvb3IoZGVsdGEpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJhciwgJ3RvcCcsIGRlbHRhICsgJ3B4Jyk7XG4gICAgfVxuXG4gICAgcGVyY2VudFNjcm9sbCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy5iYXIpLnRvcCwgMTApIC8gKHRoaXMuZWwub2Zmc2V0SGVpZ2h0IC0gdGhpcy5iYXIub2Zmc2V0SGVpZ2h0KTtcbiAgICBkZWx0YSA9IHBlcmNlbnRTY3JvbGwgKiBoaWRkZW5Db250ZW50O1xuXG4gICAgdGhpcy5lbC5zY3JvbGxUb3AgPSBkZWx0YTtcblxuICAgIHRoaXMuc2hvd0JhckFuZEdyaWQoKTtcblxuICAgIGlmICghdGhpcy5vcHRpb25zLmFsd2F5c1Zpc2libGUpIHtcbiAgICAgIGlmICh0aGlzLnZpc2libGVUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnZpc2libGVUaW1lb3V0KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy52aXNpYmxlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmhpZGVCYXJBbmRHcmlkKCk7XG4gICAgICB9LCB0aGlzLm9wdGlvbnMudmlzaWJsZVRpbWVvdXQpO1xuICAgIH1cbiAgICBjb25zdCBpc1Njcm9sbEF0U3RhcnQgPSBkZWx0YSA9PT0gMDtcbiAgICBjb25zdCBpc1Njcm9sbEF0RW5kID0gZGVsdGEgPT09IGhpZGRlbkNvbnRlbnQ7XG4gICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSBNYXRoLmNlaWwoZGVsdGEpO1xuICAgIGNvbnN0IHNjcm9sbFN0YXRlID0gbmV3IFNsaW1TY3JvbGxTdGF0ZSh7IHNjcm9sbFBvc2l0aW9uLCBpc1Njcm9sbEF0U3RhcnQsIGlzU2Nyb2xsQXRFbmQgfSk7XG4gICAgdGhpcy5zY3JvbGxDaGFuZ2VkLmVtaXQoc2Nyb2xsU3RhdGUpO1xuXG4gICAgcmV0dXJuIG92ZXI7XG4gIH1cblxuICBpbml0V2hlZWwgPSAoKSA9PiB7XG4gICAgY29uc3QgZG9tbW91c2VzY3JvbGwgPSBmcm9tRXZlbnQodGhpcy5lbCwgJ0RPTU1vdXNlU2Nyb2xsJyk7XG4gICAgY29uc3QgbW91c2V3aGVlbCA9IGZyb21FdmVudCh0aGlzLmVsLCAnbW91c2V3aGVlbCcpO1xuXG4gICAgY29uc3Qgd2hlZWxTdWJzY3JpcHRpb24gPSBtZXJnZSguLi5bZG9tbW91c2VzY3JvbGwsIG1vdXNld2hlZWxdKS5zdWJzY3JpYmUoKGU6IE1vdXNlV2hlZWxFdmVudCkgPT4ge1xuICAgICAgbGV0IGRlbHRhID0gMDtcblxuICAgICAgaWYgKGUud2hlZWxEZWx0YSkge1xuICAgICAgICBkZWx0YSA9IC1lLndoZWVsRGVsdGEgLyAxMjA7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLmRldGFpbCkge1xuICAgICAgICBkZWx0YSA9IGUuZGV0YWlsIC8gMztcbiAgICAgIH1cblxuICAgICAgdGhpcy5zY3JvbGxDb250ZW50KGRlbHRhLCB0cnVlLCBmYWxzZSk7XG5cbiAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuaW50ZXJhY3Rpb25TdWJzY3JpcHRpb25zLmFkZCh3aGVlbFN1YnNjcmlwdGlvbik7XG4gIH1cblxuICBpbml0RHJhZyA9ICgpID0+IHtcbiAgICBjb25zdCBiYXIgPSB0aGlzLmJhcjtcblxuICAgIGNvbnN0IG1vdXNlbW92ZSA9IGZyb21FdmVudCh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ21vdXNlbW92ZScpO1xuICAgIGNvbnN0IHRvdWNobW92ZSA9IGZyb21FdmVudCh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ3RvdWNobW92ZScpO1xuXG4gICAgY29uc3QgbW91c2Vkb3duID0gZnJvbUV2ZW50KGJhciwgJ21vdXNlZG93bicpO1xuICAgIGNvbnN0IHRvdWNoc3RhcnQgPSBmcm9tRXZlbnQodGhpcy5lbCwgJ3RvdWNoc3RhcnQnKTtcbiAgICBjb25zdCBtb3VzZXVwID0gZnJvbUV2ZW50KHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbW91c2V1cCcpO1xuICAgIGNvbnN0IHRvdWNoZW5kID0gZnJvbUV2ZW50KHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAndG91Y2hlbmQnKTtcblxuICAgIGNvbnN0IG1vdXNlZHJhZyA9IG1vdXNlZG93blxuICAgICAgLnBpcGUoXG4gICAgICAgIG1lcmdlTWFwKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5wYWdlWSA9IGUucGFnZVk7XG4gICAgICAgICAgdGhpcy50b3AgPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoYmFyKS50b3ApO1xuXG4gICAgICAgICAgcmV0dXJuIG1vdXNlbW92ZVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgoZW1vdmU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBlbW92ZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvcCArIGVtb3ZlLnBhZ2VZIC0gdGhpcy5wYWdlWTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIHRha2VVbnRpbChtb3VzZXVwKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBjb25zdCB0b3VjaGRyYWcgPSB0b3VjaHN0YXJ0XG4gICAgICAucGlwZShcbiAgICAgICAgbWVyZ2VNYXAoKGU6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnBhZ2VZID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgICAgIHRoaXMudG9wID0gLXBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShiYXIpLnRvcCk7XG5cbiAgICAgICAgICByZXR1cm4gdG91Y2htb3ZlXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKCh0bW92ZTogVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAtKHRoaXMudG9wICsgdG1vdmUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIHRoaXMucGFnZVkpO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgdGFrZVVudGlsKHRvdWNoZW5kKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBjb25zdCBkcmFnU3Vic2NyaXB0aW9uID0gbWVyZ2UoLi4uW21vdXNlZHJhZywgdG91Y2hkcmFnXSkuc3Vic2NyaWJlKCh0b3A6IG51bWJlcikgPT4ge1xuICAgICAgdGhpcy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3NlbGVjdHN0YXJ0JywgdGhpcy5wcmV2ZW50RGVmYXVsdEV2ZW50LCBmYWxzZSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm9keSwgJ3RvdWNoLWFjdGlvbicsICdwYW4teScpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHksICd1c2VyLXNlbGVjdCcsICdub25lJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYmFyLCAndG9wJywgYCR7dG9wfXB4YCk7XG4gICAgICBjb25zdCBvdmVyID0gdGhpcy5zY3JvbGxDb250ZW50KDAsIHRydWUsIGZhbHNlKTtcbiAgICAgIGNvbnN0IG1heFRvcCA9IHRoaXMuZWwub2Zmc2V0SGVpZ2h0IC0gdGhpcy5iYXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICBpZiAob3ZlciAmJiBvdmVyIDwgMCAmJiAtb3ZlciA8PSBtYXhUb3ApIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZ1RvcCcsIC1vdmVyICsgJ3B4Jyk7XG4gICAgICB9IGVsc2UgaWYgKG92ZXIgJiYgb3ZlciA+IDAgJiYgb3ZlciA8PSBtYXhUb3ApIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZ0JvdHRvbScsIG92ZXIgKyAncHgnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRyYWdFbmRTdWJzY3JpcHRpb24gPSBtZXJnZSguLi5bbW91c2V1cCwgdG91Y2hlbmRdKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3NlbGVjdHN0YXJ0JywgdGhpcy5wcmV2ZW50RGVmYXVsdEV2ZW50LCBmYWxzZSk7XG4gICAgICBjb25zdCBwYWRkaW5nVG9wID0gcGFyc2VJbnQodGhpcy5lbC5zdHlsZS5wYWRkaW5nVG9wLCAxMCk7XG4gICAgICBjb25zdCBwYWRkaW5nQm90dG9tID0gcGFyc2VJbnQodGhpcy5lbC5zdHlsZS5wYWRkaW5nQm90dG9tLCAxMCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm9keSwgJ3RvdWNoLWFjdGlvbicsICd1bnNldCcpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHksICd1c2VyLXNlbGVjdCcsICdkZWZhdWx0Jyk7XG5cbiAgICAgIGlmIChwYWRkaW5nVG9wID4gMCkge1xuICAgICAgICB0aGlzLnNjcm9sbFRvKDAsIDMwMCwgJ2xpbmVhcicpO1xuICAgICAgfSBlbHNlIGlmIChwYWRkaW5nQm90dG9tID4gMCkge1xuICAgICAgICB0aGlzLnNjcm9sbFRvKDAsIDMwMCwgJ2xpbmVhcicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5pbnRlcmFjdGlvblN1YnNjcmlwdGlvbnMuYWRkKGRyYWdTdWJzY3JpcHRpb24pO1xuICAgIHRoaXMuaW50ZXJhY3Rpb25TdWJzY3JpcHRpb25zLmFkZChkcmFnRW5kU3Vic2NyaXB0aW9uKTtcbiAgfVxuXG4gIHNob3dCYXJBbmRHcmlkKCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ncmlkLCAnYmFja2dyb3VuZCcsIHRoaXMub3B0aW9ucy5ncmlkQmFja2dyb3VuZCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJhciwgJ2JhY2tncm91bmQnLCB0aGlzLm9wdGlvbnMuYmFyQmFja2dyb3VuZCk7XG4gIH1cblxuICBoaWRlQmFyQW5kR3JpZCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ3JpZCwgJ2JhY2tncm91bmQnLCAndHJhbnNwYXJlbnQnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYmFyLCAnYmFja2dyb3VuZCcsICd0cmFuc3BhcmVudCcpO1xuICB9XG5cbiAgcHJldmVudERlZmF1bHRFdmVudCA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGltc2Nyb2xsLXdyYXBwZXInKSkge1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuZWwucGFyZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IGJhciA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcignLnNsaW1zY3JvbGwtYmFyJyk7XG4gICAgICB3cmFwcGVyLnJlbW92ZUNoaWxkKGJhcik7XG4gICAgICBjb25zdCBncmlkID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuc2xpbXNjcm9sbC1ncmlkJyk7XG4gICAgICB3cmFwcGVyLnJlbW92ZUNoaWxkKGdyaWQpO1xuICAgICAgdGhpcy51bndyYXAod3JhcHBlcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW50ZXJhY3Rpb25TdWJzY3JpcHRpb25zKSB7XG4gICAgICB0aGlzLmludGVyYWN0aW9uU3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHVud3JhcCh3cmFwcGVyOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgd2hpbGUgKHdyYXBwZXIuZmlyc3RDaGlsZCkge1xuICAgICAgY29uc3QgY2hpbGQgPSB3cmFwcGVyLnJlbW92ZUNoaWxkKHdyYXBwZXIuZmlyc3RDaGlsZCk7XG4gICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICB9XG4gICAgd3JhcHBlci5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChkb2NGcmFnLCB3cmFwcGVyKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBvblJlc2l6ZSgkZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuZ2V0QmFySGVpZ2h0KCk7XG4gIH1cbn1cbiJdfQ==