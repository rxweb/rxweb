import { InjectionToken, Directive, ViewContainerRef, HostListener, Renderer2, Inject, Optional, Input, EventEmitter, Output, NgModule } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription, fromEvent, merge } from 'rxjs';
import { mergeMap, map, takeUntil } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlimScrollEvent {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        this.type = obj.type;
        this.y = obj && obj.y ? obj.y : 0;
        this.percent = obj && obj.percent ? obj.percent : 0;
        this.duration = obj && obj.duration ? obj.duration : 0;
        this.easing = obj && obj.easing ? obj.easing : 'linear';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ SLIMSCROLL_DEFAULTS = new InjectionToken('NGX_SLIMSCROLL_DEFAULTS');
class SlimScrollOptions {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
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
    merge(obj) {
        const /** @type {?} */ result = new SlimScrollOptions();
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
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlimScrollState {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        this.scrollPosition = obj && obj.scrollPosition ? obj.scrollPosition : 0;
        this.isScrollAtStart = obj && typeof obj.isScrollAtStart !== 'undefined' ? obj.isScrollAtStart : true;
        this.isScrollAtEnd = obj && typeof obj.isScrollAtEnd !== 'undefined' ? obj.isScrollAtEnd : false;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ easing = {
    linear: (t) => t,
    inQuad: (t) => t * t,
    outQuad: (t) => t * (2 - t),
    inOutQuad: (t) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    inCubic: (t) => t * t * t,
    outCubic: (t) => (--t) * t * t + 1,
    inOutCubic: (t) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    inQuart: (t) => t * t * t * t,
    outQuart: (t) => 1 - (--t) * t * t * t,
    inOutQuart: (t) => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    inQuint: (t) => t * t * t * t * t,
    outQuint: (t) => 1 + (--t) * t * t * t * t,
    inOutQuint: (t) => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
};
class SlimScrollDirective {
    /**
     * @param {?} viewContainer
     * @param {?} renderer
     * @param {?} document
     * @param {?} optionsDefaults
     */
    constructor(viewContainer, renderer, document, optionsDefaults) {
        this.viewContainer = viewContainer;
        this.renderer = renderer;
        this.document = document;
        this.optionsDefaults = optionsDefaults;
        this.enabled = true;
        this.scrollChanged = new EventEmitter();
        this.barVisibilityChange = new EventEmitter();
        this.initWheel = () => {
            const /** @type {?} */ dommousescroll = fromEvent(this.el, 'DOMMouseScroll');
            const /** @type {?} */ mousewheel = fromEvent(this.el, 'mousewheel');
            const /** @type {?} */ wheelSubscription = merge(...[dommousescroll, mousewheel]).subscribe((e) => {
                let /** @type {?} */ delta = 0;
                if (e.wheelDelta) {
                    delta = -e.wheelDelta / 120;
                }
                if (e.detail) {
                    delta = e.detail / 3;
                }
                this.scrollContent(delta, true, false);
                if (e.preventDefault) {
                    e.preventDefault();
                }
            });
            this.interactionSubscriptions.add(wheelSubscription);
        };
        this.initDrag = () => {
            const /** @type {?} */ bar = this.bar;
            const /** @type {?} */ mousemove = fromEvent(this.document.documentElement, 'mousemove');
            const /** @type {?} */ touchmove = fromEvent(this.document.documentElement, 'touchmove');
            const /** @type {?} */ mousedown = fromEvent(bar, 'mousedown');
            const /** @type {?} */ touchstart = fromEvent(this.el, 'touchstart');
            const /** @type {?} */ mouseup = fromEvent(this.document.documentElement, 'mouseup');
            const /** @type {?} */ touchend = fromEvent(this.document.documentElement, 'touchend');
            const /** @type {?} */ mousedrag = mousedown
                .pipe(mergeMap((e) => {
                this.pageY = e.pageY;
                this.top = parseFloat(getComputedStyle(bar).top);
                return mousemove
                    .pipe(map((emove) => {
                    emove.preventDefault();
                    return this.top + emove.pageY - this.pageY;
                }), takeUntil(mouseup));
            }));
            const /** @type {?} */ touchdrag = touchstart
                .pipe(mergeMap((e) => {
                this.pageY = e.targetTouches[0].pageY;
                this.top = -parseFloat(getComputedStyle(bar).top);
                return touchmove
                    .pipe(map((tmove) => {
                    return -(this.top + tmove.targetTouches[0].pageY - this.pageY);
                }), takeUntil(touchend));
            }));
            const /** @type {?} */ dragSubscription = merge(...[mousedrag, touchdrag]).subscribe((top) => {
                this.body.addEventListener('selectstart', this.preventDefaultEvent, false);
                this.renderer.setStyle(this.body, 'touch-action', 'pan-y');
                this.renderer.setStyle(this.body, 'user-select', 'none');
                this.renderer.setStyle(this.bar, 'top', `${top}px`);
                const /** @type {?} */ over = this.scrollContent(0, true, false);
                const /** @type {?} */ maxTop = this.el.offsetHeight - this.bar.offsetHeight;
                if (over && over < 0 && -over <= maxTop) {
                    this.renderer.setStyle(this.el, 'paddingTop', -over + 'px');
                }
                else if (over && over > 0 && over <= maxTop) {
                    this.renderer.setStyle(this.el, 'paddingBottom', over + 'px');
                }
            });
            const /** @type {?} */ dragEndSubscription = merge(...[mouseup, touchend]).subscribe(() => {
                this.body.removeEventListener('selectstart', this.preventDefaultEvent, false);
                const /** @type {?} */ paddingTop = parseInt(this.el.style.paddingTop, 10);
                const /** @type {?} */ paddingBottom = parseInt(this.el.style.paddingBottom, 10);
                this.renderer.setStyle(this.body, 'touch-action', 'unset');
                this.renderer.setStyle(this.body, 'user-select', 'default');
                if (paddingTop > 0) {
                    this.scrollTo(0, 300, 'linear');
                }
                else if (paddingBottom > 0) {
                    this.scrollTo(0, 300, 'linear');
                }
            });
            this.interactionSubscriptions.add(dragSubscription);
            this.interactionSubscriptions.add(dragEndSubscription);
        };
        this.preventDefaultEvent = (e) => {
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
    ngOnInit() {
        // setup if no changes for enabled for the first time
        if (!this.interactionSubscriptions && this.enabled) {
            this.setup();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["enabled"]) {
            if (this.enabled) {
                this.setup();
            }
            else {
                this.destroy();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy();
    }
    /**
     * @return {?}
     */
    setup() {
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
            this.mutationObserver = new MutationObserver(() => {
                if (this.mutationThrottleTimeout) {
                    clearTimeout(this.mutationThrottleTimeout);
                    this.mutationThrottleTimeout = setTimeout(this.onMutation.bind(this), 50);
                }
            });
            this.mutationObserver.observe(this.el, { subtree: true, childList: true });
        }
        if (this.scrollEvents && this.scrollEvents instanceof EventEmitter) {
            const /** @type {?} */ scrollSubscription = this.scrollEvents.subscribe((event) => this.handleEvent(event));
            this.interactionSubscriptions.add(scrollSubscription);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleEvent(e) {
        if (e.type === 'scrollToBottom') {
            const /** @type {?} */ y = this.el.scrollHeight - this.el.clientHeight;
            this.scrollTo(y, e.duration, e.easing);
        }
        else if (e.type === 'scrollToTop') {
            const /** @type {?} */ y = 0;
            this.scrollTo(y, e.duration, e.easing);
        }
        else if (e.type === 'scrollToPercent' && (e.percent >= 0 && e.percent <= 100)) {
            const /** @type {?} */ y = Math.round(((this.el.scrollHeight - this.el.clientHeight) / 100) * e.percent);
            this.scrollTo(y, e.duration, e.easing);
        }
        else if (e.type === 'scrollTo') {
            const /** @type {?} */ y = e.y;
            if (y <= this.el.scrollHeight - this.el.clientHeight && y >= 0) {
                this.scrollTo(y, e.duration, e.easing);
            }
        }
        else if (e.type === 'recalculate') {
            this.getBarHeight();
        }
    }
    /**
     * @return {?}
     */
    setStyle() {
        const /** @type {?} */ el = this.el;
        this.renderer.setStyle(el, 'overflow', 'hidden');
        this.renderer.setStyle(el, 'position', 'relative');
        this.renderer.setStyle(el, 'display', 'block');
    }
    /**
     * @return {?}
     */
    onMutation() {
        this.getBarHeight();
    }
    /**
     * @return {?}
     */
    wrapContainer() {
        this.wrapper = this.renderer.createElement('div');
        const /** @type {?} */ wrapper = this.wrapper;
        const /** @type {?} */ el = this.el;
        this.renderer.addClass(wrapper, 'slimscroll-wrapper');
        this.renderer.setStyle(wrapper, 'position', 'relative');
        this.renderer.setStyle(wrapper, 'overflow', 'hidden');
        this.renderer.setStyle(wrapper, 'display', 'inline-block');
        this.renderer.setStyle(wrapper, 'margin', getComputedStyle(el).margin);
        this.renderer.setStyle(wrapper, 'width', '100%');
        this.renderer.setStyle(wrapper, 'height', getComputedStyle(el).height);
        this.renderer.insertBefore(el.parentNode, wrapper, el);
        this.renderer.appendChild(wrapper, el);
    }
    /**
     * @return {?}
     */
    initGrid() {
        this.grid = this.renderer.createElement('div');
        const /** @type {?} */ grid = this.grid;
        this.renderer.addClass(grid, 'slimscroll-grid');
        this.renderer.setStyle(grid, 'position', 'absolute');
        this.renderer.setStyle(grid, 'top', '0');
        this.renderer.setStyle(grid, 'bottom', '0');
        this.renderer.setStyle(grid, this.options.position, '0');
        this.renderer.setStyle(grid, 'width', `${this.options.gridWidth}px`);
        this.renderer.setStyle(grid, 'background', this.options.gridBackground);
        this.renderer.setStyle(grid, 'opacity', this.options.gridOpacity);
        this.renderer.setStyle(grid, 'display', 'block');
        this.renderer.setStyle(grid, 'cursor', 'pointer');
        this.renderer.setStyle(grid, 'z-index', '99');
        this.renderer.setStyle(grid, 'border-radius', `${this.options.gridBorderRadius}px`);
        this.renderer.setStyle(grid, 'margin', this.options.gridMargin);
        this.renderer.appendChild(this.wrapper, grid);
    }
    /**
     * @return {?}
     */
    initBar() {
        this.bar = this.renderer.createElement('div');
        const /** @type {?} */ bar = this.bar;
        this.renderer.addClass(bar, 'slimscroll-bar');
        this.renderer.setStyle(bar, 'position', 'absolute');
        this.renderer.setStyle(bar, 'top', '0');
        this.renderer.setStyle(bar, this.options.position, '0');
        this.renderer.setStyle(bar, 'width', `${this.options.barWidth}px`);
        this.renderer.setStyle(bar, 'background', this.options.barBackground);
        this.renderer.setStyle(bar, 'opacity', this.options.barOpacity);
        this.renderer.setStyle(bar, 'display', 'block');
        this.renderer.setStyle(bar, 'cursor', 'pointer');
        this.renderer.setStyle(bar, 'z-index', '100');
        this.renderer.setStyle(bar, 'border-radius', `${this.options.barBorderRadius}px`);
        this.renderer.setStyle(bar, 'margin', this.options.barMargin);
        this.renderer.appendChild(this.wrapper, bar);
        this.barVisibilityChange.emit(true);
    }
    /**
     * @return {?}
     */
    getBarHeight() {
        const /** @type {?} */ elHeight = this.el.offsetHeight;
        const /** @type {?} */ barHeight = Math.max((elHeight / this.el.scrollHeight) * elHeight, 30) + 'px';
        const /** @type {?} */ display = parseInt(barHeight, 10) === elHeight ? 'none' : 'block';
        if (this.wrapper.offsetHeight !== elHeight) {
            this.renderer.setStyle(this.wrapper, 'height', elHeight + 'px');
        }
        this.renderer.setStyle(this.bar, 'height', barHeight);
        this.renderer.setStyle(this.bar, 'display', display);
        this.renderer.setStyle(this.grid, 'display', display);
        this.barVisibilityChange.emit(display !== 'none');
    }
    /**
     * @param {?} y
     * @param {?} duration
     * @param {?} easingFunc
     * @return {?}
     */
    scrollTo(y, duration, easingFunc) {
        const /** @type {?} */ start = Date.now();
        const /** @type {?} */ from = this.el.scrollTop;
        const /** @type {?} */ maxTop = this.el.offsetHeight - this.bar.offsetHeight;
        const /** @type {?} */ maxElScrollTop = this.el.scrollHeight - this.el.clientHeight;
        const /** @type {?} */ barHeight = Math.max((this.el.offsetHeight / this.el.scrollHeight) * this.el.offsetHeight, 30);
        const /** @type {?} */ paddingTop = parseInt(this.el.style.paddingTop, 10) || 0;
        const /** @type {?} */ paddingBottom = parseInt(this.el.style.paddingBottom, 10) || 0;
        const /** @type {?} */ scroll = (timestamp) => {
            const /** @type {?} */ currentTime = Date.now();
            const /** @type {?} */ time = Math.min(1, ((currentTime - start) / duration));
            const /** @type {?} */ easedTime = easing[easingFunc](time);
            if (paddingTop > 0 || paddingBottom > 0) {
                let /** @type {?} */ fromY = null;
                if (paddingTop > 0) {
                    fromY = -paddingTop;
                    fromY = -((easedTime * (y - fromY)) + fromY);
                    this.renderer.setStyle(this.el, 'paddingTop', `${fromY}px`);
                }
                if (paddingBottom > 0) {
                    fromY = paddingBottom;
                    fromY = ((easedTime * (y - fromY)) + fromY);
                    this.renderer.setStyle(this.el, 'paddingBottom', `${fromY}px`);
                }
            }
            else {
                this.el.scrollTop = (easedTime * (y - from)) + from;
            }
            const /** @type {?} */ percentScroll = this.el.scrollTop / maxElScrollTop;
            if (paddingBottom === 0) {
                const /** @type {?} */ delta = Math.round(Math.round(this.el.clientHeight * percentScroll) - barHeight);
                if (delta > 0) {
                    this.renderer.setStyle(this.bar, 'top', `${delta}px`);
                }
            }
            if (time < 1) {
                requestAnimationFrame(scroll);
            }
        };
        requestAnimationFrame(scroll);
    }
    /**
     * @param {?} y
     * @param {?} isWheel
     * @param {?} isJump
     * @return {?}
     */
    scrollContent(y, isWheel, isJump) {
        let /** @type {?} */ delta = y;
        const /** @type {?} */ maxTop = this.el.offsetHeight - this.bar.offsetHeight;
        const /** @type {?} */ hiddenContent = this.el.scrollHeight - this.el.offsetHeight;
        let /** @type {?} */ percentScroll;
        let /** @type {?} */ over = null;
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
            this.visibleTimeout = setTimeout(() => {
                this.hideBarAndGrid();
            }, this.options.visibleTimeout);
        }
        const /** @type {?} */ isScrollAtStart = delta === 0;
        const /** @type {?} */ isScrollAtEnd = delta === hiddenContent;
        const /** @type {?} */ scrollPosition = Math.ceil(delta);
        const /** @type {?} */ scrollState = new SlimScrollState({ scrollPosition, isScrollAtStart, isScrollAtEnd });
        this.scrollChanged.emit(scrollState);
        return over;
    }
    /**
     * @return {?}
     */
    showBarAndGrid() {
        this.renderer.setStyle(this.grid, 'background', this.options.gridBackground);
        this.renderer.setStyle(this.bar, 'background', this.options.barBackground);
    }
    /**
     * @return {?}
     */
    hideBarAndGrid() {
        this.renderer.setStyle(this.grid, 'background', 'transparent');
        this.renderer.setStyle(this.bar, 'background', 'transparent');
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
            this.mutationObserver = null;
        }
        if (this.el.parentElement.classList.contains('slimscroll-wrapper')) {
            const /** @type {?} */ wrapper = this.el.parentElement;
            const /** @type {?} */ bar = wrapper.querySelector('.slimscroll-bar');
            wrapper.removeChild(bar);
            const /** @type {?} */ grid = wrapper.querySelector('.slimscroll-grid');
            wrapper.removeChild(grid);
            this.unwrap(wrapper);
        }
        if (this.interactionSubscriptions) {
            this.interactionSubscriptions.unsubscribe();
        }
    }
    /**
     * @param {?} wrapper
     * @return {?}
     */
    unwrap(wrapper) {
        const /** @type {?} */ docFrag = document.createDocumentFragment();
        while (wrapper.firstChild) {
            const /** @type {?} */ child = wrapper.removeChild(wrapper.firstChild);
            docFrag.appendChild(child);
        }
        wrapper.parentNode.replaceChild(docFrag, wrapper);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onResize($event) {
        this.getBarHeight();
    }
}
SlimScrollDirective.decorators = [
    { type: Directive, args: [{
                selector: '[slimScroll]',
                // tslint:disable-line
                exportAs: 'slimScroll'
            },] },
];
/** @nocollapse */
SlimScrollDirective.ctorParameters = () => [
    { type: ViewContainerRef, decorators: [{ type: Inject, args: [ViewContainerRef,] },] },
    { type: Renderer2, decorators: [{ type: Inject, args: [Renderer2,] },] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: undefined, decorators: [{ type: Inject, args: [SLIMSCROLL_DEFAULTS,] }, { type: Optional },] },
];
SlimScrollDirective.propDecorators = {
    "enabled": [{ type: Input },],
    "options": [{ type: Input },],
    "scrollEvents": [{ type: Input },],
    "scrollChanged": [{ type: Output, args: ['scrollChanged',] },],
    "barVisibilityChange": [{ type: Output, args: ['barVisibilityChange',] },],
    "onResize": [{ type: HostListener, args: ['window:resize', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgSlimScrollModule {
}
NgSlimScrollModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    SlimScrollDirective
                ],
                exports: [
                    SlimScrollDirective
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { SlimScrollEvent, SLIMSCROLL_DEFAULTS, SlimScrollOptions, easing, SlimScrollDirective, NgSlimScrollModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNsaW1zY3JvbGwuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1zbGltc2Nyb2xsL2FwcC9uZ3gtc2xpbXNjcm9sbC9jbGFzc2VzL3NsaW1zY3JvbGwtZXZlbnQuY2xhc3MudHMiLCJuZzovL25neC1zbGltc2Nyb2xsL2FwcC9uZ3gtc2xpbXNjcm9sbC9jbGFzc2VzL3NsaW1zY3JvbGwtb3B0aW9ucy5jbGFzcy50cyIsIm5nOi8vbmd4LXNsaW1zY3JvbGwvYXBwL25neC1zbGltc2Nyb2xsL2NsYXNzZXMvc2xpbXNjcm9sbC1zdGF0ZS5jbGFzcy50cyIsIm5nOi8vbmd4LXNsaW1zY3JvbGwvYXBwL25neC1zbGltc2Nyb2xsL2RpcmVjdGl2ZXMvc2xpbXNjcm9sbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1zbGltc2Nyb2xsL2FwcC9uZ3gtc2xpbXNjcm9sbC9tb2R1bGUvbmd4LXNsaW1zY3JvbGwubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSVNsaW1TY3JvbGxFdmVudCB7XG4gIHR5cGU6ICdzY3JvbGxUb0JvdHRvbScgfCAnc2Nyb2xsVG9Ub3AnIHwgJ3Njcm9sbFRvUGVyY2VudCcgfCAnc2Nyb2xsVG8nIHwgJ3JlY2FsY3VsYXRlJztcbiAgeT86IG51bWJlcjtcbiAgcGVyY2VudD86IG51bWJlcjtcbiAgZHVyYXRpb24/OiBudW1iZXI7XG4gIGVhc2luZz86ICdsaW5lYXInIHwgJ2luUXVhZCcgfCAnb3V0UXVhZCcgfCAnaW5PdXRRdWFkJyB8ICdpbkN1YmljJyB8XG4gICAgJ291dEN1YmljJyB8ICdpbk91dEN1YmljJyB8ICdpblF1YXJ0JyB8ICdvdXRRdWFydCcgfCAnaW5PdXRRdWFydCcgfFxuICAgICdpblF1aW50JyB8ICdvdXRRdWludCcgfCAnaW5PdXRRdWludCc7XG59XG5cbmV4cG9ydCBjbGFzcyBTbGltU2Nyb2xsRXZlbnQgaW1wbGVtZW50cyBJU2xpbVNjcm9sbEV2ZW50IHtcbiAgdHlwZTogJ3Njcm9sbFRvQm90dG9tJyB8ICdzY3JvbGxUb1RvcCcgfCAnc2Nyb2xsVG9QZXJjZW50JyB8ICdzY3JvbGxUbycgfCAncmVjYWxjdWxhdGUnO1xuICB5PzogbnVtYmVyO1xuICBwZXJjZW50PzogbnVtYmVyO1xuICBkdXJhdGlvbj86IG51bWJlcjtcbiAgZWFzaW5nOiAnbGluZWFyJyB8ICdpblF1YWQnIHwgJ291dFF1YWQnIHwgJ2luT3V0UXVhZCcgfCAnaW5DdWJpYycgfFxuICAgICdvdXRDdWJpYycgfCAnaW5PdXRDdWJpYycgfCAnaW5RdWFydCcgfCAnb3V0UXVhcnQnIHwgJ2luT3V0UXVhcnQnIHxcbiAgICAnaW5RdWludCcgfCAnb3V0UXVpbnQnIHwgJ2luT3V0UXVpbnQnO1xuXG4gIGNvbnN0cnVjdG9yKG9iaj86IElTbGltU2Nyb2xsRXZlbnQpIHtcbiAgICB0aGlzLnR5cGUgPSBvYmoudHlwZTtcbiAgICB0aGlzLnkgPSBvYmogJiYgb2JqLnkgPyBvYmoueSA6IDA7XG4gICAgdGhpcy5wZXJjZW50ID0gb2JqICYmIG9iai5wZXJjZW50ID8gb2JqLnBlcmNlbnQgOiAwO1xuICAgIHRoaXMuZHVyYXRpb24gPSBvYmogJiYgb2JqLmR1cmF0aW9uID8gb2JqLmR1cmF0aW9uIDogMDtcbiAgICB0aGlzLmVhc2luZyA9IG9iaiAmJiBvYmouZWFzaW5nID8gb2JqLmVhc2luZyA6ICdsaW5lYXInO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJU2xpbVNjcm9sbE9wdGlvbnMgfSBmcm9tICcuL3NsaW1zY3JvbGwtb3B0aW9ucy5jbGFzcyc7XG5pbXBvcnQgeyBJU2xpbVNjcm9sbEV2ZW50IH0gZnJvbSAnLi9zbGltc2Nyb2xsLWV2ZW50LmNsYXNzJztcbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNsaW1TY3JvbGxPcHRpb25zIHtcbiAgcG9zaXRpb24/OiBzdHJpbmc7XG4gIGJhckJhY2tncm91bmQ/OiBzdHJpbmc7XG4gIGJhck9wYWNpdHk/OiBzdHJpbmc7XG4gIGJhcldpZHRoPzogc3RyaW5nO1xuICBiYXJCb3JkZXJSYWRpdXM/OiBzdHJpbmc7XG4gIGJhck1hcmdpbj86IHN0cmluZztcbiAgZ3JpZEJhY2tncm91bmQ/OiBzdHJpbmc7XG4gIGdyaWRPcGFjaXR5Pzogc3RyaW5nO1xuICBncmlkV2lkdGg/OiBzdHJpbmc7XG4gIGdyaWRCb3JkZXJSYWRpdXM/OiBzdHJpbmc7XG4gIGdyaWRNYXJnaW4/OiBzdHJpbmc7XG4gIGFsd2F5c1Zpc2libGU/OiBib29sZWFuO1xuICB2aXNpYmxlVGltZW91dD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IFNMSU1TQ1JPTExfREVGQVVMVFM6IEluamVjdGlvblRva2VuPElTbGltU2Nyb2xsT3B0aW9ucz5cbiAgICA9IG5ldyBJbmplY3Rpb25Ub2tlbignTkdYX1NMSU1TQ1JPTExfREVGQVVMVFMnKTtcblxuZXhwb3J0IGNsYXNzIFNsaW1TY3JvbGxPcHRpb25zIGltcGxlbWVudHMgSVNsaW1TY3JvbGxPcHRpb25zIHtcbiAgcG9zaXRpb24/OiBzdHJpbmc7XG4gIGJhckJhY2tncm91bmQ/OiBzdHJpbmc7XG4gIGJhck9wYWNpdHk/OiBzdHJpbmc7XG4gIGJhcldpZHRoPzogc3RyaW5nO1xuICBiYXJCb3JkZXJSYWRpdXM/OiBzdHJpbmc7XG4gIGJhck1hcmdpbj86IHN0cmluZztcbiAgZ3JpZEJhY2tncm91bmQ/OiBzdHJpbmc7XG4gIGdyaWRPcGFjaXR5Pzogc3RyaW5nO1xuICBncmlkV2lkdGg/OiBzdHJpbmc7XG4gIGdyaWRCb3JkZXJSYWRpdXM/OiBzdHJpbmc7XG4gIGdyaWRNYXJnaW4/OiBzdHJpbmc7XG4gIGFsd2F5c1Zpc2libGU/OiBib29sZWFuO1xuICB2aXNpYmxlVGltZW91dD86IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihvYmo/OiBJU2xpbVNjcm9sbE9wdGlvbnMpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gb2JqICYmIG9iai5wb3NpdGlvbiA/IG9iai5wb3NpdGlvbiA6ICdyaWdodCc7XG4gICAgdGhpcy5iYXJCYWNrZ3JvdW5kID0gb2JqICYmIG9iai5iYXJCYWNrZ3JvdW5kID8gb2JqLmJhckJhY2tncm91bmQgOiAnIzM0M2E0MCc7XG4gICAgdGhpcy5iYXJPcGFjaXR5ID0gb2JqICYmIG9iai5iYXJPcGFjaXR5ID8gb2JqLmJhck9wYWNpdHkgOiAnMSc7XG4gICAgdGhpcy5iYXJXaWR0aCA9IG9iaiAmJiBvYmouYmFyV2lkdGggPyBvYmouYmFyV2lkdGggOiAnMTInO1xuICAgIHRoaXMuYmFyQm9yZGVyUmFkaXVzID0gb2JqICYmIG9iai5iYXJCb3JkZXJSYWRpdXMgPyBvYmouYmFyQm9yZGVyUmFkaXVzIDogJzUnO1xuICAgIHRoaXMuYmFyTWFyZ2luID0gb2JqICYmIG9iai5iYXJNYXJnaW4gPyBvYmouYmFyTWFyZ2luIDogJzFweCAwJztcbiAgICB0aGlzLmdyaWRCYWNrZ3JvdW5kID0gb2JqICYmIG9iai5ncmlkQmFja2dyb3VuZCA/IG9iai5ncmlkQmFja2dyb3VuZCA6ICcjYWRiNWJkJztcbiAgICB0aGlzLmdyaWRPcGFjaXR5ID0gb2JqICYmIG9iai5ncmlkT3BhY2l0eSA/IG9iai5ncmlkT3BhY2l0eSA6ICcxJztcbiAgICB0aGlzLmdyaWRXaWR0aCA9IG9iaiAmJiBvYmouZ3JpZFdpZHRoID8gb2JqLmdyaWRXaWR0aCA6ICc4JztcbiAgICB0aGlzLmdyaWRCb3JkZXJSYWRpdXMgPSBvYmogJiYgb2JqLmdyaWRCb3JkZXJSYWRpdXMgPyBvYmouZ3JpZEJvcmRlclJhZGl1cyA6ICcxMCc7XG4gICAgdGhpcy5ncmlkTWFyZ2luID0gb2JqICYmIG9iai5ncmlkTWFyZ2luID8gb2JqLmdyaWRNYXJnaW4gOiAnMXB4IDJweCc7XG4gICAgdGhpcy5hbHdheXNWaXNpYmxlID0gb2JqICYmIHR5cGVvZiBvYmouYWx3YXlzVmlzaWJsZSAhPT0gJ3VuZGVmaW5lZCcgPyBvYmouYWx3YXlzVmlzaWJsZSA6IHRydWU7XG4gICAgdGhpcy52aXNpYmxlVGltZW91dCA9IG9iaiAmJiBvYmoudmlzaWJsZVRpbWVvdXQgPyBvYmoudmlzaWJsZVRpbWVvdXQgOiAxMDAwO1xuICB9XG5cbiAgcHVibGljIG1lcmdlKG9iaj86IElTbGltU2Nyb2xsT3B0aW9ucyk6IFNsaW1TY3JvbGxPcHRpb25zIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgU2xpbVNjcm9sbE9wdGlvbnMoKTtcblxuICAgIHJlc3VsdC5wb3NpdGlvbiA9IG9iaiAmJiBvYmoucG9zaXRpb24gPyBvYmoucG9zaXRpb24gOiB0aGlzLnBvc2l0aW9uO1xuICAgIHJlc3VsdC5iYXJCYWNrZ3JvdW5kID0gb2JqICYmIG9iai5iYXJCYWNrZ3JvdW5kID8gb2JqLmJhckJhY2tncm91bmQgOiB0aGlzLmJhckJhY2tncm91bmQ7XG4gICAgcmVzdWx0LmJhck9wYWNpdHkgPSBvYmogJiYgb2JqLmJhck9wYWNpdHkgPyBvYmouYmFyT3BhY2l0eSA6IHRoaXMuYmFyT3BhY2l0eTtcbiAgICByZXN1bHQuYmFyV2lkdGggPSBvYmogJiYgb2JqLmJhcldpZHRoID8gb2JqLmJhcldpZHRoIDogdGhpcy5iYXJXaWR0aDtcbiAgICByZXN1bHQuYmFyQm9yZGVyUmFkaXVzID0gb2JqICYmIG9iai5iYXJCb3JkZXJSYWRpdXMgPyBvYmouYmFyQm9yZGVyUmFkaXVzIDogdGhpcy5iYXJCb3JkZXJSYWRpdXM7XG4gICAgcmVzdWx0LmJhck1hcmdpbiA9IG9iaiAmJiBvYmouYmFyTWFyZ2luID8gb2JqLmJhck1hcmdpbiA6IHRoaXMuYmFyTWFyZ2luO1xuICAgIHJlc3VsdC5ncmlkQmFja2dyb3VuZCA9IG9iaiAmJiBvYmouZ3JpZEJhY2tncm91bmQgPyBvYmouZ3JpZEJhY2tncm91bmQgOiB0aGlzLmdyaWRCYWNrZ3JvdW5kO1xuICAgIHJlc3VsdC5ncmlkT3BhY2l0eSA9IG9iaiAmJiBvYmouZ3JpZE9wYWNpdHkgPyBvYmouZ3JpZE9wYWNpdHkgOiB0aGlzLmdyaWRCYWNrZ3JvdW5kO1xuICAgIHJlc3VsdC5ncmlkV2lkdGggPSBvYmogJiYgb2JqLmdyaWRXaWR0aCA/IG9iai5ncmlkV2lkdGggOiB0aGlzLmdyaWRXaWR0aDtcbiAgICByZXN1bHQuZ3JpZEJvcmRlclJhZGl1cyA9IG9iaiAmJiBvYmouZ3JpZEJvcmRlclJhZGl1cyA/IG9iai5ncmlkQm9yZGVyUmFkaXVzIDogdGhpcy5ncmlkQm9yZGVyUmFkaXVzO1xuICAgIHJlc3VsdC5ncmlkTWFyZ2luID0gb2JqICYmIG9iai5ncmlkTWFyZ2luID8gb2JqLmdyaWRNYXJnaW4gOiB0aGlzLmdyaWRNYXJnaW47XG4gICAgcmVzdWx0LmFsd2F5c1Zpc2libGUgPSBvYmogJiYgdHlwZW9mIG9iai5hbHdheXNWaXNpYmxlICE9PSAndW5kZWZpbmVkJyA/IG9iai5hbHdheXNWaXNpYmxlIDogdGhpcy5hbHdheXNWaXNpYmxlO1xuICAgIHJlc3VsdC52aXNpYmxlVGltZW91dCA9IG9iaiAmJiBvYmoudmlzaWJsZVRpbWVvdXQgPyBvYmoudmlzaWJsZVRpbWVvdXQgOiB0aGlzLnZpc2libGVUaW1lb3V0O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBJU2xpbVNjcm9sbFN0YXRlIHtcbiAgICBzY3JvbGxQb3NpdGlvbjogbnVtYmVyO1xuICAgIGlzU2Nyb2xsQXRTdGFydDogYm9vbGVhbjtcbiAgICBpc1Njcm9sbEF0RW5kOiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgU2xpbVNjcm9sbFN0YXRlIGltcGxlbWVudHMgSVNsaW1TY3JvbGxTdGF0ZSB7XG4gICAgc2Nyb2xsUG9zaXRpb246IG51bWJlcjtcbiAgICBpc1Njcm9sbEF0U3RhcnQ6IGJvb2xlYW47XG4gICAgaXNTY3JvbGxBdEVuZDogYm9vbGVhbjtcbiAgICBjb25zdHJ1Y3RvcihvYmo/OiBJU2xpbVNjcm9sbFN0YXRlKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsUG9zaXRpb24gPSBvYmogJiYgb2JqLnNjcm9sbFBvc2l0aW9uID8gb2JqLnNjcm9sbFBvc2l0aW9uIDogMDtcbiAgICAgICAgdGhpcy5pc1Njcm9sbEF0U3RhcnQgPSBvYmogJiYgdHlwZW9mIG9iai5pc1Njcm9sbEF0U3RhcnQgIT09ICd1bmRlZmluZWQnID8gb2JqLmlzU2Nyb2xsQXRTdGFydCA6IHRydWU7XG4gICAgICAgIHRoaXMuaXNTY3JvbGxBdEVuZCA9IG9iaiAmJiB0eXBlb2Ygb2JqLmlzU2Nyb2xsQXRFbmQgIT09ICd1bmRlZmluZWQnID8gb2JqLmlzU2Nyb2xsQXRFbmQgOiBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBJbmplY3QsXG4gIE9wdGlvbmFsLFxuICBJbnB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTbGltU2Nyb2xsT3B0aW9ucywgSVNsaW1TY3JvbGxPcHRpb25zLCBTTElNU0NST0xMX0RFRkFVTFRTIH0gZnJvbSAnLi4vY2xhc3Nlcy9zbGltc2Nyb2xsLW9wdGlvbnMuY2xhc3MnO1xuaW1wb3J0IHsgSVNsaW1TY3JvbGxFdmVudCwgU2xpbVNjcm9sbEV2ZW50IH0gZnJvbSAnLi4vY2xhc3Nlcy9zbGltc2Nyb2xsLWV2ZW50LmNsYXNzJztcbmltcG9ydCB7IFNsaW1TY3JvbGxTdGF0ZSwgSVNsaW1TY3JvbGxTdGF0ZSB9IGZyb20gJy4uL2NsYXNzZXMvc2xpbXNjcm9sbC1zdGF0ZS5jbGFzcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIGZyb21FdmVudCwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwLCBtYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNvbnN0IGVhc2luZzogeyBba2V5OiBzdHJpbmddOiBGdW5jdGlvbiB9ID0ge1xuICBsaW5lYXI6ICh0OiBudW1iZXIpID0+IHQsXG4gIGluUXVhZDogKHQ6IG51bWJlcikgPT4gdCAqIHQsXG4gIG91dFF1YWQ6ICh0OiBudW1iZXIpID0+IHQgKiAoMiAtIHQpLFxuICBpbk91dFF1YWQ6ICh0OiBudW1iZXIpID0+IHQgPCAuNSA/IDIgKiB0ICogdCA6IC0xICsgKDQgLSAyICogdCkgKiB0LFxuICBpbkN1YmljOiAodDogbnVtYmVyKSA9PiB0ICogdCAqIHQsXG4gIG91dEN1YmljOiAodDogbnVtYmVyKSA9PiAoLS10KSAqIHQgKiB0ICsgMSxcbiAgaW5PdXRDdWJpYzogKHQ6IG51bWJlcikgPT4gdCA8IC41ID8gNCAqIHQgKiB0ICogdCA6ICh0IC0gMSkgKiAoMiAqIHQgLSAyKSAqICgyICogdCAtIDIpICsgMSxcbiAgaW5RdWFydDogKHQ6IG51bWJlcikgPT4gdCAqIHQgKiB0ICogdCxcbiAgb3V0UXVhcnQ6ICh0OiBudW1iZXIpID0+IDEgLSAoLS10KSAqIHQgKiB0ICogdCxcbiAgaW5PdXRRdWFydDogKHQ6IG51bWJlcikgPT4gdCA8IC41ID8gOCAqIHQgKiB0ICogdCAqIHQgOiAxIC0gOCAqICgtLXQpICogdCAqIHQgKiB0LFxuICBpblF1aW50OiAodDogbnVtYmVyKSA9PiB0ICogdCAqIHQgKiB0ICogdCxcbiAgb3V0UXVpbnQ6ICh0OiBudW1iZXIpID0+IDEgKyAoLS10KSAqIHQgKiB0ICogdCAqIHQsXG4gIGluT3V0UXVpbnQ6ICh0OiBudW1iZXIpID0+IHQgPCAuNSA/IDE2ICogdCAqIHQgKiB0ICogdCAqIHQgOiAxICsgMTYgKiAoLS10KSAqIHQgKiB0ICogdCAqIHRcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tzbGltU2Nyb2xsXScsIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgZXhwb3J0QXM6ICdzbGltU2Nyb2xsJ1xufSlcbmV4cG9ydCBjbGFzcyBTbGltU2Nyb2xsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGVuYWJsZWQgPSB0cnVlO1xuICBASW5wdXQoKSBvcHRpb25zOiBTbGltU2Nyb2xsT3B0aW9ucztcbiAgQElucHV0KCkgc2Nyb2xsRXZlbnRzOiBFdmVudEVtaXR0ZXI8SVNsaW1TY3JvbGxFdmVudD47XG4gIEBPdXRwdXQoJ3Njcm9sbENoYW5nZWQnKSBzY3JvbGxDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxJU2xpbVNjcm9sbFN0YXRlPigpO1xuICBAT3V0cHV0KCdiYXJWaXNpYmlsaXR5Q2hhbmdlJykgYmFyVmlzaWJpbGl0eUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBlbDogSFRNTEVsZW1lbnQ7XG4gIHdyYXBwZXI6IEhUTUxFbGVtZW50O1xuICBncmlkOiBIVE1MRWxlbWVudDtcbiAgYmFyOiBIVE1MRWxlbWVudDtcbiAgYm9keTogSFRNTEVsZW1lbnQ7XG4gIHBhZ2VZOiBudW1iZXI7XG4gIHRvcDogbnVtYmVyO1xuICBkcmFnZ2luZzogYm9vbGVhbjtcbiAgbXV0YXRpb25UaHJvdHRsZVRpbWVvdXQ6IG51bWJlcjtcbiAgbXV0YXRpb25PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjtcbiAgbGFzdFRvdWNoUG9zaXRpb25ZOiBudW1iZXI7XG4gIHZpc2libGVUaW1lb3V0OiBhbnk7XG4gIGludGVyYWN0aW9uU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uO1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFZpZXdDb250YWluZXJSZWYpIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBASW5qZWN0KFJlbmRlcmVyMikgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICBASW5qZWN0KFNMSU1TQ1JPTExfREVGQVVMVFMpIEBPcHRpb25hbCgpIHByaXZhdGUgb3B0aW9uc0RlZmF1bHRzOiBJU2xpbVNjcm9sbE9wdGlvbnNcbiAgKSB7XG4gICAgdGhpcy52aWV3Q29udGFpbmVyID0gdmlld0NvbnRhaW5lcjtcbiAgICB0aGlzLmVsID0gdmlld0NvbnRhaW5lci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5ib2R5ID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgdGhpcy5tdXRhdGlvblRocm90dGxlVGltZW91dCA9IDUwO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gc2V0dXAgaWYgbm8gY2hhbmdlcyBmb3IgZW5hYmxlZCBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICBpZiAoIXRoaXMuaW50ZXJhY3Rpb25TdWJzY3JpcHRpb25zICYmIHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5zZXR1cCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5lbmFibGVkKSB7XG4gICAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG5cbiAgc2V0dXAoKSB7XG4gICAgdGhpcy5pbnRlcmFjdGlvblN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgaWYgKHRoaXMub3B0aW9uc0RlZmF1bHRzKSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBuZXcgU2xpbVNjcm9sbE9wdGlvbnModGhpcy5vcHRpb25zRGVmYXVsdHMpLm1lcmdlKHRoaXMub3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBTbGltU2Nyb2xsT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3R5bGUoKTtcbiAgICB0aGlzLndyYXBDb250YWluZXIoKTtcbiAgICB0aGlzLmluaXRHcmlkKCk7XG4gICAgdGhpcy5pbml0QmFyKCk7XG4gICAgdGhpcy5nZXRCYXJIZWlnaHQoKTtcbiAgICB0aGlzLmluaXRXaGVlbCgpO1xuICAgIHRoaXMuaW5pdERyYWcoKTtcblxuICAgIGlmICghdGhpcy5vcHRpb25zLmFsd2F5c1Zpc2libGUpIHtcbiAgICAgIHRoaXMuaGlkZUJhckFuZEdyaWQoKTtcbiAgICB9XG5cbiAgICBpZiAoTXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgaWYgKHRoaXMubXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5tdXRhdGlvblRocm90dGxlVGltZW91dCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm11dGF0aW9uVGhyb3R0bGVUaW1lb3V0KTtcbiAgICAgICAgICB0aGlzLm11dGF0aW9uVGhyb3R0bGVUaW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLm9uTXV0YXRpb24uYmluZCh0aGlzKSwgNTApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZWwsIHsgc3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNjcm9sbEV2ZW50cyAmJiB0aGlzLnNjcm9sbEV2ZW50cyBpbnN0YW5jZW9mIEV2ZW50RW1pdHRlcikge1xuICAgICAgY29uc3Qgc2Nyb2xsU3Vic2NyaXB0aW9uID0gdGhpcy5zY3JvbGxFdmVudHMuc3Vic2NyaWJlKChldmVudDogU2xpbVNjcm9sbEV2ZW50KSA9PiB0aGlzLmhhbmRsZUV2ZW50KGV2ZW50KSk7XG4gICAgICB0aGlzLmludGVyYWN0aW9uU3Vic2NyaXB0aW9ucy5hZGQoc2Nyb2xsU3Vic2NyaXB0aW9uKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFdmVudChlOiBTbGltU2Nyb2xsRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZS50eXBlID09PSAnc2Nyb2xsVG9Cb3R0b20nKSB7XG4gICAgICBjb25zdCB5ID0gdGhpcy5lbC5zY3JvbGxIZWlnaHQgLSB0aGlzLmVsLmNsaWVudEhlaWdodDtcbiAgICAgIHRoaXMuc2Nyb2xsVG8oeSwgZS5kdXJhdGlvbiwgZS5lYXNpbmcpO1xuICAgIH0gZWxzZSBpZiAoZS50eXBlID09PSAnc2Nyb2xsVG9Ub3AnKSB7XG4gICAgICBjb25zdCB5ID0gMDtcbiAgICAgIHRoaXMuc2Nyb2xsVG8oeSwgZS5kdXJhdGlvbiwgZS5lYXNpbmcpO1xuICAgIH0gZWxzZSBpZiAoZS50eXBlID09PSAnc2Nyb2xsVG9QZXJjZW50JyAmJiAoZS5wZXJjZW50ID49IDAgJiYgZS5wZXJjZW50IDw9IDEwMCkpIHtcbiAgICAgIGNvbnN0IHkgPSBNYXRoLnJvdW5kKCgodGhpcy5lbC5zY3JvbGxIZWlnaHQgLSB0aGlzLmVsLmNsaWVudEhlaWdodCkgLyAxMDApICogZS5wZXJjZW50KTtcbiAgICAgIHRoaXMuc2Nyb2xsVG8oeSwgZS5kdXJhdGlvbiwgZS5lYXNpbmcpO1xuICAgIH0gZWxzZSBpZiAoZS50eXBlID09PSAnc2Nyb2xsVG8nKSB7XG4gICAgICBjb25zdCB5ID0gZS55O1xuICAgICAgaWYgKHkgPD0gdGhpcy5lbC5zY3JvbGxIZWlnaHQgLSB0aGlzLmVsLmNsaWVudEhlaWdodCAmJiB5ID49IDApIHtcbiAgICAgICAgdGhpcy5zY3JvbGxUbyh5LCBlLmR1cmF0aW9uLCBlLmVhc2luZyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlLnR5cGUgPT09ICdyZWNhbGN1bGF0ZScpIHtcbiAgICAgIHRoaXMuZ2V0QmFySGVpZ2h0KCk7XG4gICAgfVxuICB9XG5cbiAgc2V0U3R5bGUoKTogdm9pZCB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZWwsICdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsLCAncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsLCAnZGlzcGxheScsICdibG9jaycpO1xuICB9XG5cbiAgb25NdXRhdGlvbigpIHtcbiAgICB0aGlzLmdldEJhckhlaWdodCgpO1xuICB9XG5cbiAgd3JhcENvbnRhaW5lcigpOiB2b2lkIHtcbiAgICB0aGlzLndyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLndyYXBwZXI7XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3cmFwcGVyLCAnc2xpbXNjcm9sbC13cmFwcGVyJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh3cmFwcGVyLCAncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHdyYXBwZXIsICdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHdyYXBwZXIsICdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUod3JhcHBlciwgJ21hcmdpbicsIGdldENvbXB1dGVkU3R5bGUoZWwpLm1hcmdpbik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh3cmFwcGVyLCAnd2lkdGgnLCAnMTAwJScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUod3JhcHBlciwgJ2hlaWdodCcsIGdldENvbXB1dGVkU3R5bGUoZWwpLmhlaWdodCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmluc2VydEJlZm9yZShlbC5wYXJlbnROb2RlLCB3cmFwcGVyLCBlbCk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh3cmFwcGVyLCBlbCk7XG4gIH1cblxuICBpbml0R3JpZCgpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGdyaWQgPSB0aGlzLmdyaWQ7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGdyaWQsICdzbGltc2Nyb2xsLWdyaWQnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdyaWQsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgJ3RvcCcsICcwJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAnYm90dG9tJywgJzAnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdyaWQsIHRoaXMub3B0aW9ucy5wb3NpdGlvbiwgJzAnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdyaWQsICd3aWR0aCcsIGAke3RoaXMub3B0aW9ucy5ncmlkV2lkdGh9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdyaWQsICdiYWNrZ3JvdW5kJywgdGhpcy5vcHRpb25zLmdyaWRCYWNrZ3JvdW5kKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdyaWQsICdvcGFjaXR5JywgdGhpcy5vcHRpb25zLmdyaWRPcGFjaXR5KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdyaWQsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdyaWQsICd6LWluZGV4JywgJzk5Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAnYm9yZGVyLXJhZGl1cycsIGAke3RoaXMub3B0aW9ucy5ncmlkQm9yZGVyUmFkaXVzfXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAnbWFyZ2luJywgdGhpcy5vcHRpb25zLmdyaWRNYXJnaW4pO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIsIGdyaWQpO1xuICB9XG5cbiAgaW5pdEJhcigpOiB2b2lkIHtcbiAgICB0aGlzLmJhciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgYmFyID0gdGhpcy5iYXI7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGJhciwgJ3NsaW1zY3JvbGwtYmFyJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShiYXIsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYmFyLCAndG9wJywgJzAnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgdGhpcy5vcHRpb25zLnBvc2l0aW9uLCAnMCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYmFyLCAnd2lkdGgnLCBgJHt0aGlzLm9wdGlvbnMuYmFyV2lkdGh9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgJ2JhY2tncm91bmQnLCB0aGlzLm9wdGlvbnMuYmFyQmFja2dyb3VuZCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShiYXIsICdvcGFjaXR5JywgdGhpcy5vcHRpb25zLmJhck9wYWNpdHkpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYmFyLCAnZGlzcGxheScsICdibG9jaycpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYmFyLCAnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgJ3otaW5kZXgnLCAnMTAwJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShiYXIsICdib3JkZXItcmFkaXVzJywgYCR7dGhpcy5vcHRpb25zLmJhckJvcmRlclJhZGl1c31weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYmFyLCAnbWFyZ2luJywgdGhpcy5vcHRpb25zLmJhck1hcmdpbik7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMud3JhcHBlciwgYmFyKTtcbiAgICB0aGlzLmJhclZpc2liaWxpdHlDaGFuZ2UuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIGdldEJhckhlaWdodCgpOiB2b2lkIHtcbiAgICBjb25zdCBlbEhlaWdodCA9IHRoaXMuZWwub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGJhckhlaWdodCA9IE1hdGgubWF4KChlbEhlaWdodCAvIHRoaXMuZWwuc2Nyb2xsSGVpZ2h0KSAqIGVsSGVpZ2h0LCAzMCkgKyAncHgnO1xuICAgIGNvbnN0IGRpc3BsYXkgPSBwYXJzZUludChiYXJIZWlnaHQsIDEwKSA9PT0gZWxIZWlnaHQgPyAnbm9uZScgOiAnYmxvY2snO1xuXG4gICAgaWYgKHRoaXMud3JhcHBlci5vZmZzZXRIZWlnaHQgIT09IGVsSGVpZ2h0KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMud3JhcHBlciwgJ2hlaWdodCcsIGVsSGVpZ2h0ICsgJ3B4Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJhciwgJ2hlaWdodCcsIGJhckhlaWdodCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJhciwgJ2Rpc3BsYXknLCBkaXNwbGF5KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ3JpZCwgJ2Rpc3BsYXknLCBkaXNwbGF5KTtcbiAgICB0aGlzLmJhclZpc2liaWxpdHlDaGFuZ2UuZW1pdChkaXNwbGF5ICE9PSAnbm9uZScpO1xuICB9XG5cbiAgc2Nyb2xsVG8oeTogbnVtYmVyLCBkdXJhdGlvbjogbnVtYmVyLCBlYXNpbmdGdW5jOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgY29uc3QgZnJvbSA9IHRoaXMuZWwuc2Nyb2xsVG9wO1xuICAgIGNvbnN0IG1heFRvcCA9IHRoaXMuZWwub2Zmc2V0SGVpZ2h0IC0gdGhpcy5iYXIub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IG1heEVsU2Nyb2xsVG9wID0gdGhpcy5lbC5zY3JvbGxIZWlnaHQgLSB0aGlzLmVsLmNsaWVudEhlaWdodDtcbiAgICBjb25zdCBiYXJIZWlnaHQgPSBNYXRoLm1heCgodGhpcy5lbC5vZmZzZXRIZWlnaHQgLyB0aGlzLmVsLnNjcm9sbEhlaWdodCkgKiB0aGlzLmVsLm9mZnNldEhlaWdodCwgMzApO1xuICAgIGNvbnN0IHBhZGRpbmdUb3AgPSBwYXJzZUludCh0aGlzLmVsLnN0eWxlLnBhZGRpbmdUb3AsIDEwKSB8fCAwO1xuICAgIGNvbnN0IHBhZGRpbmdCb3R0b20gPSBwYXJzZUludCh0aGlzLmVsLnN0eWxlLnBhZGRpbmdCb3R0b20sIDEwKSB8fCAwO1xuXG4gICAgY29uc3Qgc2Nyb2xsID0gKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCB0aW1lID0gTWF0aC5taW4oMSwgKChjdXJyZW50VGltZSAtIHN0YXJ0KSAvIGR1cmF0aW9uKSk7XG4gICAgICBjb25zdCBlYXNlZFRpbWUgPSBlYXNpbmdbZWFzaW5nRnVuY10odGltZSk7XG5cbiAgICAgIGlmIChwYWRkaW5nVG9wID4gMCB8fCBwYWRkaW5nQm90dG9tID4gMCkge1xuICAgICAgICBsZXQgZnJvbVkgPSBudWxsO1xuXG4gICAgICAgIGlmIChwYWRkaW5nVG9wID4gMCkge1xuICAgICAgICAgIGZyb21ZID0gLXBhZGRpbmdUb3A7XG4gICAgICAgICAgZnJvbVkgPSAtKChlYXNlZFRpbWUgKiAoeSAtIGZyb21ZKSkgKyBmcm9tWSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZ1RvcCcsIGAke2Zyb21ZfXB4YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFkZGluZ0JvdHRvbSA+IDApIHtcbiAgICAgICAgICBmcm9tWSA9IHBhZGRpbmdCb3R0b207XG4gICAgICAgICAgZnJvbVkgPSAoKGVhc2VkVGltZSAqICh5IC0gZnJvbVkpKSArIGZyb21ZKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdwYWRkaW5nQm90dG9tJywgYCR7ZnJvbVl9cHhgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbC5zY3JvbGxUb3AgPSAoZWFzZWRUaW1lICogKHkgLSBmcm9tKSkgKyBmcm9tO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwZXJjZW50U2Nyb2xsID0gdGhpcy5lbC5zY3JvbGxUb3AgLyBtYXhFbFNjcm9sbFRvcDtcbiAgICAgIGlmIChwYWRkaW5nQm90dG9tID09PSAwKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gTWF0aC5yb3VuZChNYXRoLnJvdW5kKHRoaXMuZWwuY2xpZW50SGVpZ2h0ICogcGVyY2VudFNjcm9sbCkgLSBiYXJIZWlnaHQpO1xuICAgICAgICBpZiAoZGVsdGEgPiAwKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJhciwgJ3RvcCcsIGAke2RlbHRhfXB4YCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRpbWUgPCAxKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzY3JvbGwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2Nyb2xsKTtcbiAgfVxuXG4gIHNjcm9sbENvbnRlbnQoeTogbnVtYmVyLCBpc1doZWVsOiBib29sZWFuLCBpc0p1bXA6IGJvb2xlYW4pOiBudWxsIHwgbnVtYmVyIHtcbiAgICBsZXQgZGVsdGEgPSB5O1xuICAgIGNvbnN0IG1heFRvcCA9IHRoaXMuZWwub2Zmc2V0SGVpZ2h0IC0gdGhpcy5iYXIub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGhpZGRlbkNvbnRlbnQgPSB0aGlzLmVsLnNjcm9sbEhlaWdodCAtIHRoaXMuZWwub2Zmc2V0SGVpZ2h0O1xuICAgIGxldCBwZXJjZW50U2Nyb2xsOiBudW1iZXI7XG4gICAgbGV0IG92ZXIgPSBudWxsO1xuXG4gICAgaWYgKGlzV2hlZWwpIHtcbiAgICAgIGRlbHRhID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmJhcikudG9wLCAxMCkgKyB5ICogMjAgLyAxMDAgKiB0aGlzLmJhci5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgIGlmIChkZWx0YSA8IDAgfHwgZGVsdGEgPiBtYXhUb3ApIHtcbiAgICAgICAgb3ZlciA9IGRlbHRhID4gbWF4VG9wID8gZGVsdGEgLSBtYXhUb3AgOiBkZWx0YTtcbiAgICAgIH1cblxuICAgICAgZGVsdGEgPSBNYXRoLm1pbihNYXRoLm1heChkZWx0YSwgMCksIG1heFRvcCk7XG4gICAgICBkZWx0YSA9ICh5ID4gMCkgPyBNYXRoLmNlaWwoZGVsdGEpIDogTWF0aC5mbG9vcihkZWx0YSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYmFyLCAndG9wJywgZGVsdGEgKyAncHgnKTtcbiAgICB9XG5cbiAgICBwZXJjZW50U2Nyb2xsID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmJhcikudG9wLCAxMCkgLyAodGhpcy5lbC5vZmZzZXRIZWlnaHQgLSB0aGlzLmJhci5vZmZzZXRIZWlnaHQpO1xuICAgIGRlbHRhID0gcGVyY2VudFNjcm9sbCAqIGhpZGRlbkNvbnRlbnQ7XG5cbiAgICB0aGlzLmVsLnNjcm9sbFRvcCA9IGRlbHRhO1xuXG4gICAgdGhpcy5zaG93QmFyQW5kR3JpZCgpO1xuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuYWx3YXlzVmlzaWJsZSkge1xuICAgICAgaWYgKHRoaXMudmlzaWJsZVRpbWVvdXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudmlzaWJsZVRpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnZpc2libGVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaGlkZUJhckFuZEdyaWQoKTtcbiAgICAgIH0sIHRoaXMub3B0aW9ucy52aXNpYmxlVGltZW91dCk7XG4gICAgfVxuICAgIGNvbnN0IGlzU2Nyb2xsQXRTdGFydCA9IGRlbHRhID09PSAwO1xuICAgIGNvbnN0IGlzU2Nyb2xsQXRFbmQgPSBkZWx0YSA9PT0gaGlkZGVuQ29udGVudDtcbiAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IE1hdGguY2VpbChkZWx0YSk7XG4gICAgY29uc3Qgc2Nyb2xsU3RhdGUgPSBuZXcgU2xpbVNjcm9sbFN0YXRlKHsgc2Nyb2xsUG9zaXRpb24sIGlzU2Nyb2xsQXRTdGFydCwgaXNTY3JvbGxBdEVuZCB9KTtcbiAgICB0aGlzLnNjcm9sbENoYW5nZWQuZW1pdChzY3JvbGxTdGF0ZSk7XG5cbiAgICByZXR1cm4gb3ZlcjtcbiAgfVxuXG4gIGluaXRXaGVlbCA9ICgpID0+IHtcbiAgICBjb25zdCBkb21tb3VzZXNjcm9sbCA9IGZyb21FdmVudCh0aGlzLmVsLCAnRE9NTW91c2VTY3JvbGwnKTtcbiAgICBjb25zdCBtb3VzZXdoZWVsID0gZnJvbUV2ZW50KHRoaXMuZWwsICdtb3VzZXdoZWVsJyk7XG5cbiAgICBjb25zdCB3aGVlbFN1YnNjcmlwdGlvbiA9IG1lcmdlKC4uLltkb21tb3VzZXNjcm9sbCwgbW91c2V3aGVlbF0pLnN1YnNjcmliZSgoZTogTW91c2VXaGVlbEV2ZW50KSA9PiB7XG4gICAgICBsZXQgZGVsdGEgPSAwO1xuXG4gICAgICBpZiAoZS53aGVlbERlbHRhKSB7XG4gICAgICAgIGRlbHRhID0gLWUud2hlZWxEZWx0YSAvIDEyMDtcbiAgICAgIH1cblxuICAgICAgaWYgKGUuZGV0YWlsKSB7XG4gICAgICAgIGRlbHRhID0gZS5kZXRhaWwgLyAzO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNjcm9sbENvbnRlbnQoZGVsdGEsIHRydWUsIGZhbHNlKTtcblxuICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5pbnRlcmFjdGlvblN1YnNjcmlwdGlvbnMuYWRkKHdoZWVsU3Vic2NyaXB0aW9uKTtcbiAgfVxuXG4gIGluaXREcmFnID0gKCkgPT4ge1xuICAgIGNvbnN0IGJhciA9IHRoaXMuYmFyO1xuXG4gICAgY29uc3QgbW91c2Vtb3ZlID0gZnJvbUV2ZW50KHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbW91c2Vtb3ZlJyk7XG4gICAgY29uc3QgdG91Y2htb3ZlID0gZnJvbUV2ZW50KHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAndG91Y2htb3ZlJyk7XG5cbiAgICBjb25zdCBtb3VzZWRvd24gPSBmcm9tRXZlbnQoYmFyLCAnbW91c2Vkb3duJyk7XG4gICAgY29uc3QgdG91Y2hzdGFydCA9IGZyb21FdmVudCh0aGlzLmVsLCAndG91Y2hzdGFydCcpO1xuICAgIGNvbnN0IG1vdXNldXAgPSBmcm9tRXZlbnQodGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICdtb3VzZXVwJyk7XG4gICAgY29uc3QgdG91Y2hlbmQgPSBmcm9tRXZlbnQodGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICd0b3VjaGVuZCcpO1xuXG4gICAgY29uc3QgbW91c2VkcmFnID0gbW91c2Vkb3duXG4gICAgICAucGlwZShcbiAgICAgICAgbWVyZ2VNYXAoKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnBhZ2VZID0gZS5wYWdlWTtcbiAgICAgICAgICB0aGlzLnRvcCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShiYXIpLnRvcCk7XG5cbiAgICAgICAgICByZXR1cm4gbW91c2Vtb3ZlXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKChlbW92ZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGVtb3ZlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9wICsgZW1vdmUucGFnZVkgLSB0aGlzLnBhZ2VZO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgdGFrZVVudGlsKG1vdXNldXApXG4gICAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIGNvbnN0IHRvdWNoZHJhZyA9IHRvdWNoc3RhcnRcbiAgICAgIC5waXBlKFxuICAgICAgICBtZXJnZU1hcCgoZTogVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMucGFnZVkgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICAgICAgdGhpcy50b3AgPSAtcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGJhcikudG9wKTtcblxuICAgICAgICAgIHJldHVybiB0b3VjaG1vdmVcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoKHRtb3ZlOiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0odGhpcy50b3AgKyB0bW92ZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy5wYWdlWSk7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB0YWtlVW50aWwodG91Y2hlbmQpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIGNvbnN0IGRyYWdTdWJzY3JpcHRpb24gPSBtZXJnZSguLi5bbW91c2VkcmFnLCB0b3VjaGRyYWddKS5zdWJzY3JpYmUoKHRvcDogbnVtYmVyKSA9PiB7XG4gICAgICB0aGlzLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0c3RhcnQnLCB0aGlzLnByZXZlbnREZWZhdWx0RXZlbnQsIGZhbHNlKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib2R5LCAndG91Y2gtYWN0aW9uJywgJ3Bhbi15Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm9keSwgJ3VzZXItc2VsZWN0JywgJ25vbmUnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5iYXIsICd0b3AnLCBgJHt0b3B9cHhgKTtcbiAgICAgIGNvbnN0IG92ZXIgPSB0aGlzLnNjcm9sbENvbnRlbnQoMCwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgY29uc3QgbWF4VG9wID0gdGhpcy5lbC5vZmZzZXRIZWlnaHQgLSB0aGlzLmJhci5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgIGlmIChvdmVyICYmIG92ZXIgPCAwICYmIC1vdmVyIDw9IG1heFRvcCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdwYWRkaW5nVG9wJywgLW92ZXIgKyAncHgnKTtcbiAgICAgIH0gZWxzZSBpZiAob3ZlciAmJiBvdmVyID4gMCAmJiBvdmVyIDw9IG1heFRvcCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdwYWRkaW5nQm90dG9tJywgb3ZlciArICdweCcpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZHJhZ0VuZFN1YnNjcmlwdGlvbiA9IG1lcmdlKC4uLlttb3VzZXVwLCB0b3VjaGVuZF0pLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VsZWN0c3RhcnQnLCB0aGlzLnByZXZlbnREZWZhdWx0RXZlbnQsIGZhbHNlKTtcbiAgICAgIGNvbnN0IHBhZGRpbmdUb3AgPSBwYXJzZUludCh0aGlzLmVsLnN0eWxlLnBhZGRpbmdUb3AsIDEwKTtcbiAgICAgIGNvbnN0IHBhZGRpbmdCb3R0b20gPSBwYXJzZUludCh0aGlzLmVsLnN0eWxlLnBhZGRpbmdCb3R0b20sIDEwKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib2R5LCAndG91Y2gtYWN0aW9uJywgJ3Vuc2V0Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm9keSwgJ3VzZXItc2VsZWN0JywgJ2RlZmF1bHQnKTtcblxuICAgICAgaWYgKHBhZGRpbmdUb3AgPiAwKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVG8oMCwgMzAwLCAnbGluZWFyJyk7XG4gICAgICB9IGVsc2UgaWYgKHBhZGRpbmdCb3R0b20gPiAwKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVG8oMCwgMzAwLCAnbGluZWFyJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmludGVyYWN0aW9uU3Vic2NyaXB0aW9ucy5hZGQoZHJhZ1N1YnNjcmlwdGlvbik7XG4gICAgdGhpcy5pbnRlcmFjdGlvblN1YnNjcmlwdGlvbnMuYWRkKGRyYWdFbmRTdWJzY3JpcHRpb24pO1xuICB9XG5cbiAgc2hvd0JhckFuZEdyaWQoKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmdyaWQsICdiYWNrZ3JvdW5kJywgdGhpcy5vcHRpb25zLmdyaWRCYWNrZ3JvdW5kKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYmFyLCAnYmFja2dyb3VuZCcsIHRoaXMub3B0aW9ucy5iYXJCYWNrZ3JvdW5kKTtcbiAgfVxuXG4gIGhpZGVCYXJBbmRHcmlkKCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ncmlkLCAnYmFja2dyb3VuZCcsICd0cmFuc3BhcmVudCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5iYXIsICdiYWNrZ3JvdW5kJywgJ3RyYW5zcGFyZW50Jyk7XG4gIH1cblxuICBwcmV2ZW50RGVmYXVsdEV2ZW50ID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlciA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3NsaW1zY3JvbGwtd3JhcHBlcicpKSB7XG4gICAgICBjb25zdCB3cmFwcGVyID0gdGhpcy5lbC5wYXJlbnRFbGVtZW50O1xuICAgICAgY29uc3QgYmFyID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuc2xpbXNjcm9sbC1iYXInKTtcbiAgICAgIHdyYXBwZXIucmVtb3ZlQ2hpbGQoYmFyKTtcbiAgICAgIGNvbnN0IGdyaWQgPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5zbGltc2Nyb2xsLWdyaWQnKTtcbiAgICAgIHdyYXBwZXIucmVtb3ZlQ2hpbGQoZ3JpZCk7XG4gICAgICB0aGlzLnVud3JhcCh3cmFwcGVyKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbnRlcmFjdGlvblN1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHRoaXMuaW50ZXJhY3Rpb25TdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgdW53cmFwKHdyYXBwZXI6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB3aGlsZSAod3JhcHBlci5maXJzdENoaWxkKSB7XG4gICAgICBjb25zdCBjaGlsZCA9IHdyYXBwZXIucmVtb3ZlQ2hpbGQod3JhcHBlci5maXJzdENoaWxkKTtcbiAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgIH1cbiAgICB3cmFwcGVyLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGRvY0ZyYWcsIHdyYXBwZXIpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5nZXRCYXJIZWlnaHQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNsaW1TY3JvbGxEaXJlY3RpdmUgfSBmcm9tICcuLi9kaXJlY3RpdmVzL3NsaW1zY3JvbGwuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2xpbVNjcm9sbERpcmVjdGl2ZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgU2xpbVNjcm9sbERpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nU2xpbVNjcm9sbE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBbUJFLFlBQVksR0FBc0I7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7S0FD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