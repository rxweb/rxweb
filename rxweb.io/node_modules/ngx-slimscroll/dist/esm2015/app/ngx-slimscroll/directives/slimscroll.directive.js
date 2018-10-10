/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ViewContainerRef, HostListener, Renderer2, Inject, Optional, Input, EventEmitter, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SlimScrollOptions, SLIMSCROLL_DEFAULTS } from '../classes/slimscroll-options.class';
import { SlimScrollState } from '../classes/slimscroll-state.class';
import { Subscription, fromEvent, merge } from 'rxjs';
import { mergeMap, map, takeUntil } from 'rxjs/operators';
export const /** @type {?} */ easing = {
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
export class SlimScrollDirective {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpbXNjcm9sbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2xpbXNjcm9sbC8iLCJzb3VyY2VzIjpbImFwcC9uZ3gtc2xpbXNjcm9sbC9kaXJlY3RpdmVzL3NsaW1zY3JvbGwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGdCQUFnQixFQUNoQixZQUFZLEVBSVosU0FBUyxFQUNULE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLFlBQVksRUFDWixNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBc0IsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUVqSCxPQUFPLEVBQUUsZUFBZSxFQUFvQixNQUFNLG1DQUFtQyxDQUFDO0FBQ3RGLE9BQU8sRUFBYyxZQUFZLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxRCxNQUFNLENBQUMsdUJBQU0sTUFBTSxHQUFnQztJQUNqRCxNQUFNLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEIsTUFBTSxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUM1QixPQUFPLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsU0FBUyxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDbkUsT0FBTyxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDakMsUUFBUSxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0lBQzFDLFVBQVUsRUFBRSxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDM0YsT0FBTyxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0lBQ3JDLFFBQVEsRUFBRSxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDOUMsVUFBVSxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDakYsT0FBTyxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdB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QUFNLFNBQUMsZ0JBQWdCO1lBeEQxQixTQUFTLHVCQXlETixNQUFNLFNBQUMsU0FBUzs0Q0FDaEIsTUFBTSxTQUFDLFFBQVE7NENBQ2YsTUFBTSxTQUFDLG1CQUFtQixjQUFHLFFBQVE7Ozt3QkF2QnZDLEtBQUs7d0JBQ0wsS0FBSzs2QkFDTCxLQUFLOzhCQUNMLE1BQU0sU0FBQyxlQUFlO29DQUN0QixNQUFNLFNBQUMscUJBQXFCO3lCQThhNUIsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIEluamVjdCxcbiAgT3B0aW9uYWwsXG4gIElucHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNsaW1TY3JvbGxPcHRpb25zLCBJU2xpbVNjcm9sbE9wdGlvbnMsIFNMSU1TQ1JPTExfREVGQVVMVFMgfSBmcm9tICcuLi9jbGFzc2VzL3NsaW1zY3JvbGwtb3B0aW9ucy5jbGFzcyc7XG5pbXBvcnQgeyBJU2xpbVNjcm9sbEV2ZW50LCBTbGltU2Nyb2xsRXZlbnQgfSBmcm9tICcuLi9jbGFzc2VzL3NsaW1zY3JvbGwtZXZlbnQuY2xhc3MnO1xuaW1wb3J0IHsgU2xpbVNjcm9sbFN0YXRlLCBJU2xpbVNjcm9sbFN0YXRlIH0gZnJvbSAnLi4vY2xhc3Nlcy9zbGltc2Nyb2xsLXN0YXRlLmNsYXNzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50LCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAsIG1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY29uc3QgZWFzaW5nOiB7IFtrZXk6IHN0cmluZ106IEZ1bmN0aW9uIH0gPSB7XG4gIGxpbmVhcjogKHQ6IG51bWJlcikgPT4gdCxcbiAgaW5RdWFkOiAodDogbnVtYmVyKSA9PiB0ICogdCxcbiAgb3V0UXVhZDogKHQ6IG51bWJlcikgPT4gdCAqICgyIC0gdCksXG4gIGluT3V0UXVhZDogKHQ6IG51bWJlcikgPT4gdCA8IC41ID8gMiAqIHQgKiB0IDogLTEgKyAoNCAtIDIgKiB0KSAqIHQsXG4gIGluQ3ViaWM6ICh0OiBudW1iZXIpID0+IHQgKiB0ICogdCxcbiAgb3V0Q3ViaWM6ICh0OiBudW1iZXIpID0+ICgtLXQpICogdCAqIHQgKyAxLFxuICBpbk91dEN1YmljOiAodDogbnVtYmVyKSA9PiB0IDwgLjUgPyA0ICogdCAqIHQgKiB0IDogKHQgLSAxKSAqICgyICogdCAtIDIpICogKDIgKiB0IC0gMikgKyAxLFxuICBpblF1YXJ0OiAodDogbnVtYmVyKSA9PiB0ICogdCAqIHQgKiB0LFxuICBvdXRRdWFydDogKHQ6IG51bWJlcikgPT4gMSAtICgtLXQpICogdCAqIHQgKiB0LFxuICBpbk91dFF1YXJ0OiAodDogbnVtYmVyKSA9PiB0IDwgLjUgPyA4ICogdCAqIHQgKiB0ICogdCA6IDEgLSA4ICogKC0tdCkgKiB0ICogdCAqIHQsXG4gIGluUXVpbnQ6ICh0OiBudW1iZXIpID0+IHQgKiB0ICogdCAqIHQgKiB0LFxuICBvdXRRdWludDogKHQ6IG51bWJlcikgPT4gMSArICgtLXQpICogdCAqIHQgKiB0ICogdCxcbiAgaW5PdXRRdWludDogKHQ6IG51bWJlcikgPT4gdCA8IC41ID8gMTYgKiB0ICogdCAqIHQgKiB0ICogdCA6IDEgKyAxNiAqICgtLXQpICogdCAqIHQgKiB0ICogdFxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3NsaW1TY3JvbGxdJywgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICBleHBvcnRBczogJ3NsaW1TY3JvbGwnXG59KVxuZXhwb3J0IGNsYXNzIFNsaW1TY3JvbGxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCkgZW5hYmxlZCA9IHRydWU7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IFNsaW1TY3JvbGxPcHRpb25zO1xuICBASW5wdXQoKSBzY3JvbGxFdmVudHM6IEV2ZW50RW1pdHRlcjxJU2xpbVNjcm9sbEV2ZW50PjtcbiAgQE91dHB1dCgnc2Nyb2xsQ2hhbmdlZCcpIHNjcm9sbENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPElTbGltU2Nyb2xsU3RhdGU+KCk7XG4gIEBPdXRwdXQoJ2JhclZpc2liaWxpdHlDaGFuZ2UnKSBiYXJWaXNpYmlsaXR5Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIGVsOiBIVE1MRWxlbWVudDtcbiAgd3JhcHBlcjogSFRNTEVsZW1lbnQ7XG4gIGdyaWQ6IEhUTUxFbGVtZW50O1xuICBiYXI6IEhUTUxFbGVtZW50O1xuICBib2R5OiBIVE1MRWxlbWVudDtcbiAgcGFnZVk6IG51bWJlcjtcbiAgdG9wOiBudW1iZXI7XG4gIGRyYWdnaW5nOiBib29sZWFuO1xuICBtdXRhdGlvblRocm90dGxlVGltZW91dDogbnVtYmVyO1xuICBtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuICBsYXN0VG91Y2hQb3NpdGlvblk6IG51bWJlcjtcbiAgdmlzaWJsZVRpbWVvdXQ6IGFueTtcbiAgaW50ZXJhY3Rpb25TdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb247XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoVmlld0NvbnRhaW5lclJlZikgcHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIEBJbmplY3QoUmVuZGVyZXIyKSBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgIEBJbmplY3QoU0xJTVNDUk9MTF9ERUZBVUxUUykgQE9wdGlvbmFsKCkgcHJpdmF0ZSBvcHRpb25zRGVmYXVsdHM6IElTbGltU2Nyb2xsT3B0aW9uc1xuICApIHtcbiAgICB0aGlzLnZpZXdDb250YWluZXIgPSB2aWV3Q29udGFpbmVyO1xuICAgIHRoaXMuZWwgPSB2aWV3Q29udGFpbmVyLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICB0aGlzLm11dGF0aW9uVGhyb3R0bGVUaW1lb3V0ID0gNTA7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBzZXR1cCBpZiBubyBjaGFuZ2VzIGZvciBlbmFibGVkIGZvciB0aGUgZmlyc3QgdGltZVxuICAgIGlmICghdGhpcy5pbnRlcmFjdGlvblN1YnNjcmlwdGlvbnMgJiYgdGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLnNldHVwKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmVuYWJsZWQpIHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gIH1cblxuICBzZXR1cCgpIHtcbiAgICB0aGlzLmludGVyYWN0aW9uU3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICBpZiAodGhpcy5vcHRpb25zRGVmYXVsdHMpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBTbGltU2Nyb2xsT3B0aW9ucyh0aGlzLm9wdGlvbnNEZWZhdWx0cykubWVyZ2UodGhpcy5vcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcHRpb25zID0gbmV3IFNsaW1TY3JvbGxPcHRpb25zKHRoaXMub3B0aW9ucyk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdHlsZSgpO1xuICAgIHRoaXMud3JhcENvbnRhaW5lcigpO1xuICAgIHRoaXMuaW5pdEdyaWQoKTtcbiAgICB0aGlzLmluaXRCYXIoKTtcbiAgICB0aGlzLmdldEJhckhlaWdodCgpO1xuICAgIHRoaXMuaW5pdFdoZWVsKCk7XG4gICAgdGhpcy5pbml0RHJhZygpO1xuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuYWx3YXlzVmlzaWJsZSkge1xuICAgICAgdGhpcy5oaWRlQmFyQW5kR3JpZCgpO1xuICAgIH1cblxuICAgIGlmIChNdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICBpZiAodGhpcy5tdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9XG4gICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uVGhyb3R0bGVUaW1lb3V0KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubXV0YXRpb25UaHJvdHRsZVRpbWVvdXQpO1xuICAgICAgICAgIHRoaXMubXV0YXRpb25UaHJvdHRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMub25NdXRhdGlvbi5iaW5kKHRoaXMpLCA1MCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5lbCwgeyBzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2Nyb2xsRXZlbnRzICYmIHRoaXMuc2Nyb2xsRXZlbnRzIGluc3RhbmNlb2YgRXZlbnRFbWl0dGVyKSB7XG4gICAgICBjb25zdCBzY3JvbGxTdWJzY3JpcHRpb24gPSB0aGlzLnNjcm9sbEV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50OiBTbGltU2Nyb2xsRXZlbnQpID0+IHRoaXMuaGFuZGxlRXZlbnQoZXZlbnQpKTtcbiAgICAgIHRoaXMuaW50ZXJhY3Rpb25TdWJzY3JpcHRpb25zLmFkZChzY3JvbGxTdWJzY3JpcHRpb24pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUV2ZW50KGU6IFNsaW1TY3JvbGxFdmVudCk6IHZvaWQge1xuICAgIGlmIChlLnR5cGUgPT09ICdzY3JvbGxUb0JvdHRvbScpIHtcbiAgICAgIGNvbnN0IHkgPSB0aGlzLmVsLnNjcm9sbEhlaWdodCAtIHRoaXMuZWwuY2xpZW50SGVpZ2h0O1xuICAgICAgdGhpcy5zY3JvbGxUbyh5LCBlLmR1cmF0aW9uLCBlLmVhc2luZyk7XG4gICAgfSBlbHNlIGlmIChlLnR5cGUgPT09ICdzY3JvbGxUb1RvcCcpIHtcbiAgICAgIGNvbnN0IHkgPSAwO1xuICAgICAgdGhpcy5zY3JvbGxUbyh5LCBlLmR1cmF0aW9uLCBlLmVhc2luZyk7XG4gICAgfSBlbHNlIGlmIChlLnR5cGUgPT09ICdzY3JvbGxUb1BlcmNlbnQnICYmIChlLnBlcmNlbnQgPj0gMCAmJiBlLnBlcmNlbnQgPD0gMTAwKSkge1xuICAgICAgY29uc3QgeSA9IE1hdGgucm91bmQoKCh0aGlzLmVsLnNjcm9sbEhlaWdodCAtIHRoaXMuZWwuY2xpZW50SGVpZ2h0KSAvIDEwMCkgKiBlLnBlcmNlbnQpO1xuICAgICAgdGhpcy5zY3JvbGxUbyh5LCBlLmR1cmF0aW9uLCBlLmVhc2luZyk7XG4gICAgfSBlbHNlIGlmIChlLnR5cGUgPT09ICdzY3JvbGxUbycpIHtcbiAgICAgIGNvbnN0IHkgPSBlLnk7XG4gICAgICBpZiAoeSA8PSB0aGlzLmVsLnNjcm9sbEhlaWdodCAtIHRoaXMuZWwuY2xpZW50SGVpZ2h0ICYmIHkgPj0gMCkge1xuICAgICAgICB0aGlzLnNjcm9sbFRvKHksIGUuZHVyYXRpb24sIGUuZWFzaW5nKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGUudHlwZSA9PT0gJ3JlY2FsY3VsYXRlJykge1xuICAgICAgdGhpcy5nZXRCYXJIZWlnaHQoKTtcbiAgICB9XG4gIH1cblxuICBzZXRTdHlsZSgpOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZWw7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbCwgJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZWwsICdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZWwsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gIH1cblxuICBvbk11dGF0aW9uKCkge1xuICAgIHRoaXMuZ2V0QmFySGVpZ2h0KCk7XG4gIH1cblxuICB3cmFwQ29udGFpbmVyKCk6IHZvaWQge1xuICAgIHRoaXMud3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3Qgd3JhcHBlciA9IHRoaXMud3JhcHBlcjtcbiAgICBjb25zdCBlbCA9IHRoaXMuZWw7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdyYXBwZXIsICdzbGltc2Nyb2xsLXdyYXBwZXInKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHdyYXBwZXIsICdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUod3JhcHBlciwgJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUod3JhcHBlciwgJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh3cmFwcGVyLCAnbWFyZ2luJywgZ2V0Q29tcHV0ZWRTdHlsZShlbCkubWFyZ2luKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHdyYXBwZXIsICd3aWR0aCcsICcxMDAlJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh3cmFwcGVyLCAnaGVpZ2h0JywgZ2V0Q29tcHV0ZWRTdHlsZShlbCkuaGVpZ2h0KTtcblxuICAgIHRoaXMucmVuZGVyZXIuaW5zZXJ0QmVmb3JlKGVsLnBhcmVudE5vZGUsIHdyYXBwZXIsIGVsKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHdyYXBwZXIsIGVsKTtcbiAgfVxuXG4gIGluaXRHcmlkKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgZ3JpZCA9IHRoaXMuZ3JpZDtcblxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZ3JpZCwgJ3NsaW1zY3JvbGwtZ3JpZCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShncmlkLCAndG9wJywgJzAnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdyaWQsICdib3R0b20nLCAnMCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgdGhpcy5vcHRpb25zLnBvc2l0aW9uLCAnMCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgJ3dpZHRoJywgYCR7dGhpcy5vcHRpb25zLmdyaWRXaWR0aH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgJ2JhY2tncm91bmQnLCB0aGlzLm9wdGlvbnMuZ3JpZEJhY2tncm91bmQpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgJ29wYWNpdHknLCB0aGlzLm9wdGlvbnMuZ3JpZE9wYWNpdHkpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdyaWQsICdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ3JpZCwgJ3otaW5kZXgnLCAnOTknKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdyaWQsICdib3JkZXItcmFkaXVzJywgYCR7dGhpcy5vcHRpb25zLmdyaWRCb3JkZXJSYWRpdXN9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdyaWQsICdtYXJnaW4nLCB0aGlzLm9wdGlvbnMuZ3JpZE1hcmdpbik7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMud3JhcHBlciwgZ3JpZCk7XG4gIH1cblxuICBpbml0QmFyKCk6IHZvaWQge1xuICAgIHRoaXMuYmFyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBiYXIgPSB0aGlzLmJhcjtcblxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYmFyLCAnc2xpbXNjcm9sbC1iYXInKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShiYXIsICd0b3AnLCAnMCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYmFyLCB0aGlzLm9wdGlvbnMucG9zaXRpb24sICcwJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShiYXIsICd3aWR0aCcsIGAke3RoaXMub3B0aW9ucy5iYXJXaWR0aH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYmFyLCAnYmFja2dyb3VuZCcsIHRoaXMub3B0aW9ucy5iYXJCYWNrZ3JvdW5kKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgJ29wYWNpdHknLCB0aGlzLm9wdGlvbnMuYmFyT3BhY2l0eSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShiYXIsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShiYXIsICdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYmFyLCAnei1pbmRleCcsICcxMDAnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhciwgJ2JvcmRlci1yYWRpdXMnLCBgJHt0aGlzLm9wdGlvbnMuYmFyQm9yZGVyUmFkaXVzfXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShiYXIsICdtYXJnaW4nLCB0aGlzLm9wdGlvbnMuYmFyTWFyZ2luKTtcblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyLCBiYXIpO1xuICAgIHRoaXMuYmFyVmlzaWJpbGl0eUNoYW5nZS5lbWl0KHRydWUpO1xuICB9XG5cbiAgZ2V0QmFySGVpZ2h0KCk6IHZvaWQge1xuICAgIGNvbnN0IGVsSGVpZ2h0ID0gdGhpcy5lbC5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgYmFySGVpZ2h0ID0gTWF0aC5tYXgoKGVsSGVpZ2h0IC8gdGhpcy5lbC5zY3JvbGxIZWlnaHQpICogZWxIZWlnaHQsIDMwKSArICdweCc7XG4gICAgY29uc3QgZGlzcGxheSA9IHBhcnNlSW50KGJhckhlaWdodCwgMTApID09PSBlbEhlaWdodCA/ICdub25lJyA6ICdibG9jayc7XG5cbiAgICBpZiAodGhpcy53cmFwcGVyLm9mZnNldEhlaWdodCAhPT0gZWxIZWlnaHQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy53cmFwcGVyLCAnaGVpZ2h0JywgZWxIZWlnaHQgKyAncHgnKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYmFyLCAnaGVpZ2h0JywgYmFySGVpZ2h0KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYmFyLCAnZGlzcGxheScsIGRpc3BsYXkpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ncmlkLCAnZGlzcGxheScsIGRpc3BsYXkpO1xuICAgIHRoaXMuYmFyVmlzaWJpbGl0eUNoYW5nZS5lbWl0KGRpc3BsYXkgIT09ICdub25lJyk7XG4gIH1cblxuICBzY3JvbGxUbyh5OiBudW1iZXIsIGR1cmF0aW9uOiBudW1iZXIsIGVhc2luZ0Z1bmM6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBmcm9tID0gdGhpcy5lbC5zY3JvbGxUb3A7XG4gICAgY29uc3QgbWF4VG9wID0gdGhpcy5lbC5vZmZzZXRIZWlnaHQgLSB0aGlzLmJhci5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgbWF4RWxTY3JvbGxUb3AgPSB0aGlzLmVsLnNjcm9sbEhlaWdodCAtIHRoaXMuZWwuY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IGJhckhlaWdodCA9IE1hdGgubWF4KCh0aGlzLmVsLm9mZnNldEhlaWdodCAvIHRoaXMuZWwuc2Nyb2xsSGVpZ2h0KSAqIHRoaXMuZWwub2Zmc2V0SGVpZ2h0LCAzMCk7XG4gICAgY29uc3QgcGFkZGluZ1RvcCA9IHBhcnNlSW50KHRoaXMuZWwuc3R5bGUucGFkZGluZ1RvcCwgMTApIHx8IDA7XG4gICAgY29uc3QgcGFkZGluZ0JvdHRvbSA9IHBhcnNlSW50KHRoaXMuZWwuc3R5bGUucGFkZGluZ0JvdHRvbSwgMTApIHx8IDA7XG5cbiAgICBjb25zdCBzY3JvbGwgPSAodGltZXN0YW1wOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IHRpbWUgPSBNYXRoLm1pbigxLCAoKGN1cnJlbnRUaW1lIC0gc3RhcnQpIC8gZHVyYXRpb24pKTtcbiAgICAgIGNvbnN0IGVhc2VkVGltZSA9IGVhc2luZ1tlYXNpbmdGdW5jXSh0aW1lKTtcblxuICAgICAgaWYgKHBhZGRpbmdUb3AgPiAwIHx8IHBhZGRpbmdCb3R0b20gPiAwKSB7XG4gICAgICAgIGxldCBmcm9tWSA9IG51bGw7XG5cbiAgICAgICAgaWYgKHBhZGRpbmdUb3AgPiAwKSB7XG4gICAgICAgICAgZnJvbVkgPSAtcGFkZGluZ1RvcDtcbiAgICAgICAgICBmcm9tWSA9IC0oKGVhc2VkVGltZSAqICh5IC0gZnJvbVkpKSArIGZyb21ZKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdwYWRkaW5nVG9wJywgYCR7ZnJvbVl9cHhgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYWRkaW5nQm90dG9tID4gMCkge1xuICAgICAgICAgIGZyb21ZID0gcGFkZGluZ0JvdHRvbTtcbiAgICAgICAgICBmcm9tWSA9ICgoZWFzZWRUaW1lICogKHkgLSBmcm9tWSkpICsgZnJvbVkpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmdCb3R0b20nLCBgJHtmcm9tWX1weGApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVsLnNjcm9sbFRvcCA9IChlYXNlZFRpbWUgKiAoeSAtIGZyb20pKSArIGZyb207XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBlcmNlbnRTY3JvbGwgPSB0aGlzLmVsLnNjcm9sbFRvcCAvIG1heEVsU2Nyb2xsVG9wO1xuICAgICAgaWYgKHBhZGRpbmdCb3R0b20gPT09IDApIHtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBNYXRoLnJvdW5kKE1hdGgucm91bmQodGhpcy5lbC5jbGllbnRIZWlnaHQgKiBwZXJjZW50U2Nyb2xsKSAtIGJhckhlaWdodCk7XG4gICAgICAgIGlmIChkZWx0YSA+IDApIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuYmFyLCAndG9wJywgYCR7ZGVsdGF9cHhgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGltZSA8IDEpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNjcm9sbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzY3JvbGwpO1xuICB9XG5cbiAgc2Nyb2xsQ29udGVudCh5OiBudW1iZXIsIGlzV2hlZWw6IGJvb2xlYW4sIGlzSnVtcDogYm9vbGVhbik6IG51bGwgfCBudW1iZXIge1xuICAgIGxldCBkZWx0YSA9IHk7XG4gICAgY29uc3QgbWF4VG9wID0gdGhpcy5lbC5vZmZzZXRIZWlnaHQgLSB0aGlzLmJhci5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgaGlkZGVuQ29udGVudCA9IHRoaXMuZWwuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5lbC5vZmZzZXRIZWlnaHQ7XG4gICAgbGV0IHBlcmNlbnRTY3JvbGw6IG51bWJlcjtcbiAgICBsZXQgb3ZlciA9IG51bGw7XG5cbiAgICBpZiAoaXNXaGVlbCkge1xuICAgICAgZGVsdGEgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRoaXMuYmFyKS50b3AsIDEwKSArIHkgKiAyMCAvIDEwMCAqIHRoaXMuYmFyLm9mZnNldEhlaWdodDtcblxuICAgICAgaWYgKGRlbHRhIDwgMCB8fCBkZWx0YSA+IG1heFRvcCkge1xuICAgICAgICBvdmVyID0gZGVsdGEgPiBtYXhUb3AgPyBkZWx0YSAtIG1heFRvcCA6IGRlbHRhO1xuICAgICAgfVxuXG4gICAgICBkZWx0YSA9IE1hdGgubWluKE1hdGgubWF4KGRlbHRhLCAwKSwgbWF4VG9wKTtcbiAgICAgIGRlbHRhID0gKHkgPiAwKSA/IE1hdGguY2VpbChkZWx0YSkgOiBNYXRoLmZsb29yKGRlbHRhKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5iYXIsICd0b3AnLCBkZWx0YSArICdweCcpO1xuICAgIH1cblxuICAgIHBlcmNlbnRTY3JvbGwgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRoaXMuYmFyKS50b3AsIDEwKSAvICh0aGlzLmVsLm9mZnNldEhlaWdodCAtIHRoaXMuYmFyLm9mZnNldEhlaWdodCk7XG4gICAgZGVsdGEgPSBwZXJjZW50U2Nyb2xsICogaGlkZGVuQ29udGVudDtcblxuICAgIHRoaXMuZWwuc2Nyb2xsVG9wID0gZGVsdGE7XG5cbiAgICB0aGlzLnNob3dCYXJBbmRHcmlkKCk7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5hbHdheXNWaXNpYmxlKSB7XG4gICAgICBpZiAodGhpcy52aXNpYmxlVGltZW91dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy52aXNpYmxlVGltZW91dCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudmlzaWJsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5oaWRlQmFyQW5kR3JpZCgpO1xuICAgICAgfSwgdGhpcy5vcHRpb25zLnZpc2libGVUaW1lb3V0KTtcbiAgICB9XG4gICAgY29uc3QgaXNTY3JvbGxBdFN0YXJ0ID0gZGVsdGEgPT09IDA7XG4gICAgY29uc3QgaXNTY3JvbGxBdEVuZCA9IGRlbHRhID09PSBoaWRkZW5Db250ZW50O1xuICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gTWF0aC5jZWlsKGRlbHRhKTtcbiAgICBjb25zdCBzY3JvbGxTdGF0ZSA9IG5ldyBTbGltU2Nyb2xsU3RhdGUoeyBzY3JvbGxQb3NpdGlvbiwgaXNTY3JvbGxBdFN0YXJ0LCBpc1Njcm9sbEF0RW5kIH0pO1xuICAgIHRoaXMuc2Nyb2xsQ2hhbmdlZC5lbWl0KHNjcm9sbFN0YXRlKTtcblxuICAgIHJldHVybiBvdmVyO1xuICB9XG5cbiAgaW5pdFdoZWVsID0gKCkgPT4ge1xuICAgIGNvbnN0IGRvbW1vdXNlc2Nyb2xsID0gZnJvbUV2ZW50KHRoaXMuZWwsICdET01Nb3VzZVNjcm9sbCcpO1xuICAgIGNvbnN0IG1vdXNld2hlZWwgPSBmcm9tRXZlbnQodGhpcy5lbCwgJ21vdXNld2hlZWwnKTtcblxuICAgIGNvbnN0IHdoZWVsU3Vic2NyaXB0aW9uID0gbWVyZ2UoLi4uW2RvbW1vdXNlc2Nyb2xsLCBtb3VzZXdoZWVsXSkuc3Vic2NyaWJlKChlOiBNb3VzZVdoZWVsRXZlbnQpID0+IHtcbiAgICAgIGxldCBkZWx0YSA9IDA7XG5cbiAgICAgIGlmIChlLndoZWVsRGVsdGEpIHtcbiAgICAgICAgZGVsdGEgPSAtZS53aGVlbERlbHRhIC8gMTIwO1xuICAgICAgfVxuXG4gICAgICBpZiAoZS5kZXRhaWwpIHtcbiAgICAgICAgZGVsdGEgPSBlLmRldGFpbCAvIDM7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2Nyb2xsQ29udGVudChkZWx0YSwgdHJ1ZSwgZmFsc2UpO1xuXG4gICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmludGVyYWN0aW9uU3Vic2NyaXB0aW9ucy5hZGQod2hlZWxTdWJzY3JpcHRpb24pO1xuICB9XG5cbiAgaW5pdERyYWcgPSAoKSA9PiB7XG4gICAgY29uc3QgYmFyID0gdGhpcy5iYXI7XG5cbiAgICBjb25zdCBtb3VzZW1vdmUgPSBmcm9tRXZlbnQodGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICdtb3VzZW1vdmUnKTtcbiAgICBjb25zdCB0b3VjaG1vdmUgPSBmcm9tRXZlbnQodGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICd0b3VjaG1vdmUnKTtcblxuICAgIGNvbnN0IG1vdXNlZG93biA9IGZyb21FdmVudChiYXIsICdtb3VzZWRvd24nKTtcbiAgICBjb25zdCB0b3VjaHN0YXJ0ID0gZnJvbUV2ZW50KHRoaXMuZWwsICd0b3VjaHN0YXJ0Jyk7XG4gICAgY29uc3QgbW91c2V1cCA9IGZyb21FdmVudCh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ21vdXNldXAnKTtcbiAgICBjb25zdCB0b3VjaGVuZCA9IGZyb21FdmVudCh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ3RvdWNoZW5kJyk7XG5cbiAgICBjb25zdCBtb3VzZWRyYWcgPSBtb3VzZWRvd25cbiAgICAgIC5waXBlKFxuICAgICAgICBtZXJnZU1hcCgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMucGFnZVkgPSBlLnBhZ2VZO1xuICAgICAgICAgIHRoaXMudG9wID0gcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGJhcikudG9wKTtcblxuICAgICAgICAgIHJldHVybiBtb3VzZW1vdmVcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoKGVtb3ZlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZW1vdmUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b3AgKyBlbW92ZS5wYWdlWSAtIHRoaXMucGFnZVk7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB0YWtlVW50aWwobW91c2V1cClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgY29uc3QgdG91Y2hkcmFnID0gdG91Y2hzdGFydFxuICAgICAgLnBpcGUoXG4gICAgICAgIG1lcmdlTWFwKChlOiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5wYWdlWSA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWTtcbiAgICAgICAgICB0aGlzLnRvcCA9IC1wYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoYmFyKS50b3ApO1xuXG4gICAgICAgICAgcmV0dXJuIHRvdWNobW92ZVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgodG1vdmU6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLSh0aGlzLnRvcCArIHRtb3ZlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLnBhZ2VZKTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIHRha2VVbnRpbCh0b3VjaGVuZClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgY29uc3QgZHJhZ1N1YnNjcmlwdGlvbiA9IG1lcmdlKC4uLlttb3VzZWRyYWcsIHRvdWNoZHJhZ10pLnN1YnNjcmliZSgodG9wOiBudW1iZXIpID0+IHtcbiAgICAgIHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKCdzZWxlY3RzdGFydCcsIHRoaXMucHJldmVudERlZmF1bHRFdmVudCwgZmFsc2UpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHksICd0b3VjaC1hY3Rpb24nLCAncGFuLXknKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib2R5LCAndXNlci1zZWxlY3QnLCAnbm9uZScpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJhciwgJ3RvcCcsIGAke3RvcH1weGApO1xuICAgICAgY29uc3Qgb3ZlciA9IHRoaXMuc2Nyb2xsQ29udGVudCgwLCB0cnVlLCBmYWxzZSk7XG4gICAgICBjb25zdCBtYXhUb3AgPSB0aGlzLmVsLm9mZnNldEhlaWdodCAtIHRoaXMuYmFyLm9mZnNldEhlaWdodDtcblxuICAgICAgaWYgKG92ZXIgJiYgb3ZlciA8IDAgJiYgLW92ZXIgPD0gbWF4VG9wKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmdUb3AnLCAtb3ZlciArICdweCcpO1xuICAgICAgfSBlbHNlIGlmIChvdmVyICYmIG92ZXIgPiAwICYmIG92ZXIgPD0gbWF4VG9wKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmdCb3R0b20nLCBvdmVyICsgJ3B4Jyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBkcmFnRW5kU3Vic2NyaXB0aW9uID0gbWVyZ2UoLi4uW21vdXNldXAsIHRvdWNoZW5kXSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdzZWxlY3RzdGFydCcsIHRoaXMucHJldmVudERlZmF1bHRFdmVudCwgZmFsc2UpO1xuICAgICAgY29uc3QgcGFkZGluZ1RvcCA9IHBhcnNlSW50KHRoaXMuZWwuc3R5bGUucGFkZGluZ1RvcCwgMTApO1xuICAgICAgY29uc3QgcGFkZGluZ0JvdHRvbSA9IHBhcnNlSW50KHRoaXMuZWwuc3R5bGUucGFkZGluZ0JvdHRvbSwgMTApO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHksICd0b3VjaC1hY3Rpb24nLCAndW5zZXQnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib2R5LCAndXNlci1zZWxlY3QnLCAnZGVmYXVsdCcpO1xuXG4gICAgICBpZiAocGFkZGluZ1RvcCA+IDApIHtcbiAgICAgICAgdGhpcy5zY3JvbGxUbygwLCAzMDAsICdsaW5lYXInKTtcbiAgICAgIH0gZWxzZSBpZiAocGFkZGluZ0JvdHRvbSA+IDApIHtcbiAgICAgICAgdGhpcy5zY3JvbGxUbygwLCAzMDAsICdsaW5lYXInKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuaW50ZXJhY3Rpb25TdWJzY3JpcHRpb25zLmFkZChkcmFnU3Vic2NyaXB0aW9uKTtcbiAgICB0aGlzLmludGVyYWN0aW9uU3Vic2NyaXB0aW9ucy5hZGQoZHJhZ0VuZFN1YnNjcmlwdGlvbik7XG4gIH1cblxuICBzaG93QmFyQW5kR3JpZCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ3JpZCwgJ2JhY2tncm91bmQnLCB0aGlzLm9wdGlvbnMuZ3JpZEJhY2tncm91bmQpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5iYXIsICdiYWNrZ3JvdW5kJywgdGhpcy5vcHRpb25zLmJhckJhY2tncm91bmQpO1xuICB9XG5cbiAgaGlkZUJhckFuZEdyaWQoKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmdyaWQsICdiYWNrZ3JvdW5kJywgJ3RyYW5zcGFyZW50Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJhciwgJ2JhY2tncm91bmQnLCAndHJhbnNwYXJlbnQnKTtcbiAgfVxuXG4gIHByZXZlbnREZWZhdWx0RXZlbnQgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnc2xpbXNjcm9sbC13cmFwcGVyJykpIHtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLmVsLnBhcmVudEVsZW1lbnQ7XG4gICAgICBjb25zdCBiYXIgPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5zbGltc2Nyb2xsLWJhcicpO1xuICAgICAgd3JhcHBlci5yZW1vdmVDaGlsZChiYXIpO1xuICAgICAgY29uc3QgZ3JpZCA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcignLnNsaW1zY3JvbGwtZ3JpZCcpO1xuICAgICAgd3JhcHBlci5yZW1vdmVDaGlsZChncmlkKTtcbiAgICAgIHRoaXMudW53cmFwKHdyYXBwZXIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmludGVyYWN0aW9uU3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5pbnRlcmFjdGlvblN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICB1bndyYXAod3JhcHBlcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBkb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHdoaWxlICh3cmFwcGVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gd3JhcHBlci5yZW1vdmVDaGlsZCh3cmFwcGVyLmZpcnN0Q2hpbGQpO1xuICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgfVxuICAgIHdyYXBwZXIucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZG9jRnJhZywgd3JhcHBlcik7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmdldEJhckhlaWdodCgpO1xuICB9XG59XG4iXX0=