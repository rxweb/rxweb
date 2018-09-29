/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { computeStyle } from '../../util';
import { ElementAnimationStyleHandler } from './element_animation_style_handler';
/** @type {?} */
const DEFAULT_FILL_MODE = 'forwards';
/** @type {?} */
const DEFAULT_EASING = 'linear';
/** @type {?} */
const ANIMATION_END_EVENT = 'animationend';
/** @enum {number} */
const AnimatorControlState = {
    INITIALIZED: 1, STARTED: 2, FINISHED: 3, DESTROYED: 4,
};
export { AnimatorControlState };
export class CssKeyframesPlayer {
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} animationName
     * @param {?} _duration
     * @param {?} _delay
     * @param {?} easing
     * @param {?} _finalStyles
     */
    constructor(element, keyframes, animationName, _duration, _delay, easing, _finalStyles) {
        this.element = element;
        this.keyframes = keyframes;
        this.animationName = animationName;
        this._duration = _duration;
        this._delay = _delay;
        this._finalStyles = _finalStyles;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._onDestroyFns = [];
        this._started = false;
        this.currentSnapshot = {};
        this._state = 0;
        this.easing = easing || DEFAULT_EASING;
        this.totalTime = _duration + _delay;
        this._buildStyler();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onStart(fn) { this._onStartFns.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDone(fn) { this._onDoneFns.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDestroy(fn) { this._onDestroyFns.push(fn); }
    /**
     * @return {?}
     */
    destroy() {
        this.init();
        if (this._state >= 4 /* DESTROYED */)
            return;
        this._state = 4 /* DESTROYED */;
        this._styler.destroy();
        this._flushStartFns();
        this._flushDoneFns();
        this._onDestroyFns.forEach(fn => fn());
        this._onDestroyFns = [];
    }
    /**
     * @return {?}
     */
    _flushDoneFns() {
        this._onDoneFns.forEach(fn => fn());
        this._onDoneFns = [];
    }
    /**
     * @return {?}
     */
    _flushStartFns() {
        this._onStartFns.forEach(fn => fn());
        this._onStartFns = [];
    }
    /**
     * @return {?}
     */
    finish() {
        this.init();
        if (this._state >= 3 /* FINISHED */)
            return;
        this._state = 3 /* FINISHED */;
        this._styler.finish();
        this._flushStartFns();
        this._flushDoneFns();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setPosition(value) { this._styler.setPosition(value); }
    /**
     * @return {?}
     */
    getPosition() { return this._styler.getPosition(); }
    /**
     * @return {?}
     */
    hasStarted() { return this._state >= 2 /* STARTED */; }
    /**
     * @return {?}
     */
    init() {
        if (this._state >= 1 /* INITIALIZED */)
            return;
        this._state = 1 /* INITIALIZED */;
        /** @type {?} */
        const elm = this.element;
        this._styler.apply();
        if (this._delay) {
            this._styler.pause();
        }
    }
    /**
     * @return {?}
     */
    play() {
        this.init();
        if (!this.hasStarted()) {
            this._flushStartFns();
            this._state = 2 /* STARTED */;
        }
        this._styler.resume();
    }
    /**
     * @return {?}
     */
    pause() {
        this.init();
        this._styler.pause();
    }
    /**
     * @return {?}
     */
    restart() {
        this.reset();
        this.play();
    }
    /**
     * @return {?}
     */
    reset() {
        this._styler.destroy();
        this._buildStyler();
        this._styler.apply();
    }
    /**
     * @return {?}
     */
    _buildStyler() {
        this._styler = new ElementAnimationStyleHandler(this.element, this.animationName, this._duration, this._delay, this.easing, DEFAULT_FILL_MODE, () => this.finish());
    }
    /**
     * \@internal
     * @param {?} phaseName
     * @return {?}
     */
    triggerCallback(phaseName) {
        /** @type {?} */
        const methods = phaseName == 'start' ? this._onStartFns : this._onDoneFns;
        methods.forEach(fn => fn());
        methods.length = 0;
    }
    /**
     * @return {?}
     */
    beforeDestroy() {
        this.init();
        /** @type {?} */
        const styles = {};
        if (this.hasStarted()) {
            /** @type {?} */
            const finished = this._state >= 3 /* FINISHED */;
            Object.keys(this._finalStyles).forEach(prop => {
                if (prop != 'offset') {
                    styles[prop] = finished ? this._finalStyles[prop] : computeStyle(this.element, prop);
                }
            });
        }
        this.currentSnapshot = styles;
    }
}
if (false) {
    /** @type {?} */
    CssKeyframesPlayer.prototype._onDoneFns;
    /** @type {?} */
    CssKeyframesPlayer.prototype._onStartFns;
    /** @type {?} */
    CssKeyframesPlayer.prototype._onDestroyFns;
    /** @type {?} */
    CssKeyframesPlayer.prototype._started;
    /** @type {?} */
    CssKeyframesPlayer.prototype._styler;
    /** @type {?} */
    CssKeyframesPlayer.prototype.parentPlayer;
    /** @type {?} */
    CssKeyframesPlayer.prototype.totalTime;
    /** @type {?} */
    CssKeyframesPlayer.prototype.easing;
    /** @type {?} */
    CssKeyframesPlayer.prototype.currentSnapshot;
    /** @type {?} */
    CssKeyframesPlayer.prototype._state;
    /** @type {?} */
    CssKeyframesPlayer.prototype.element;
    /** @type {?} */
    CssKeyframesPlayer.prototype.keyframes;
    /** @type {?} */
    CssKeyframesPlayer.prototype.animationName;
    /** @type {?} */
    CssKeyframesPlayer.prototype._duration;
    /** @type {?} */
    CssKeyframesPlayer.prototype._delay;
    /** @type {?} */
    CssKeyframesPlayer.prototype._finalStyles;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzX2tleWZyYW1lc19wbGF5ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmltYXRpb25zL2Jyb3dzZXIvc3JjL3JlbmRlci9jc3Nfa2V5ZnJhbWVzL2Nzc19rZXlmcmFtZXNfcGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFTQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBRXhDLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDOztBQUUvRSxNQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQzs7QUFDckMsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDOztBQUNoQyxNQUFNLG1CQUFtQixHQUFHLGNBQWMsQ0FBQzs7O0lBRUgsY0FBZSxFQUFFLFVBQVcsRUFBRSxXQUFZLEVBQUUsWUFBYTs7O0FBRWpHLE1BQU07Ozs7Ozs7Ozs7SUFpQkosWUFDb0IsU0FBOEIsU0FBNkMsRUFDM0UsZUFBd0MsU0FBaUIsRUFDeEQsUUFBZ0IsTUFBYyxFQUM5QjtRQUhELFlBQU8sR0FBUCxPQUFPO1FBQXVCLGNBQVMsR0FBVCxTQUFTLENBQW9DO1FBQzNFLGtCQUFhLEdBQWIsYUFBYTtRQUEyQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ3hELFdBQU0sR0FBTixNQUFNO1FBQ04saUJBQVksR0FBWixZQUFZOzBCQXBCQSxFQUFFOzJCQUNELEVBQUU7NkJBQ0EsRUFBRTt3QkFFbkIsS0FBSzsrQkFRMEIsRUFBRTtzQkFFYixDQUFDO1FBT3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLGNBQWMsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFDcEMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3JCOzs7OztJQUVELE9BQU8sQ0FBQyxFQUFjLElBQVUsSUFBSSxDQUFDLFdBQVcs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QUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDdEY7YUFDRixDQUFDLENBQUM7U0FDSjtRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO0tBQy9CO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0FuaW1hdGlvblBsYXllcn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7Y29tcHV0ZVN0eWxlfSBmcm9tICcuLi8uLi91dGlsJztcblxuaW1wb3J0IHtFbGVtZW50QW5pbWF0aW9uU3R5bGVIYW5kbGVyfSBmcm9tICcuL2VsZW1lbnRfYW5pbWF0aW9uX3N0eWxlX2hhbmRsZXInO1xuXG5jb25zdCBERUZBVUxUX0ZJTExfTU9ERSA9ICdmb3J3YXJkcyc7XG5jb25zdCBERUZBVUxUX0VBU0lORyA9ICdsaW5lYXInO1xuY29uc3QgQU5JTUFUSU9OX0VORF9FVkVOVCA9ICdhbmltYXRpb25lbmQnO1xuXG5leHBvcnQgY29uc3QgZW51bSBBbmltYXRvckNvbnRyb2xTdGF0ZSB7SU5JVElBTElaRUQgPSAxLCBTVEFSVEVEID0gMiwgRklOSVNIRUQgPSAzLCBERVNUUk9ZRUQgPSA0fVxuXG5leHBvcnQgY2xhc3MgQ3NzS2V5ZnJhbWVzUGxheWVyIGltcGxlbWVudHMgQW5pbWF0aW9uUGxheWVyIHtcbiAgcHJpdmF0ZSBfb25Eb25lRm5zOiBGdW5jdGlvbltdID0gW107XG4gIHByaXZhdGUgX29uU3RhcnRGbnM6IEZ1bmN0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBfb25EZXN0cm95Rm5zOiBGdW5jdGlvbltdID0gW107XG5cbiAgcHJpdmF0ZSBfc3RhcnRlZCA9IGZhbHNlO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfc3R5bGVyICE6IEVsZW1lbnRBbmltYXRpb25TdHlsZUhhbmRsZXI7XG5cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHB1YmxpYyBwYXJlbnRQbGF5ZXIgITogQW5pbWF0aW9uUGxheWVyO1xuICBwdWJsaWMgcmVhZG9ubHkgdG90YWxUaW1lOiBudW1iZXI7XG4gIHB1YmxpYyByZWFkb25seSBlYXNpbmc6IHN0cmluZztcbiAgcHVibGljIGN1cnJlbnRTbmFwc2hvdDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcblxuICBwcml2YXRlIF9zdGF0ZTogQW5pbWF0b3JDb250cm9sU3RhdGUgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHJlYWRvbmx5IGVsZW1lbnQ6IGFueSwgcHVibGljIHJlYWRvbmx5IGtleWZyYW1lczoge1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcn1bXSxcbiAgICAgIHB1YmxpYyByZWFkb25seSBhbmltYXRpb25OYW1lOiBzdHJpbmcsIHByaXZhdGUgcmVhZG9ubHkgX2R1cmF0aW9uOiBudW1iZXIsXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWxheTogbnVtYmVyLCBlYXNpbmc6IHN0cmluZyxcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2ZpbmFsU3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSkge1xuICAgIHRoaXMuZWFzaW5nID0gZWFzaW5nIHx8IERFRkFVTFRfRUFTSU5HO1xuICAgIHRoaXMudG90YWxUaW1lID0gX2R1cmF0aW9uICsgX2RlbGF5O1xuICAgIHRoaXMuX2J1aWxkU3R5bGVyKCk7XG4gIH1cblxuICBvblN0YXJ0KGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX29uU3RhcnRGbnMucHVzaChmbik7IH1cblxuICBvbkRvbmUoZm46ICgpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fb25Eb25lRm5zLnB1c2goZm4pOyB9XG5cbiAgb25EZXN0cm95KGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX29uRGVzdHJveUZucy5wdXNoKGZuKTsgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgaWYgKHRoaXMuX3N0YXRlID49IEFuaW1hdG9yQ29udHJvbFN0YXRlLkRFU1RST1lFRCkgcmV0dXJuO1xuICAgIHRoaXMuX3N0YXRlID0gQW5pbWF0b3JDb250cm9sU3RhdGUuREVTVFJPWUVEO1xuICAgIHRoaXMuX3N0eWxlci5kZXN0cm95KCk7XG4gICAgdGhpcy5fZmx1c2hTdGFydEZucygpO1xuICAgIHRoaXMuX2ZsdXNoRG9uZUZucygpO1xuICAgIHRoaXMuX29uRGVzdHJveUZucy5mb3JFYWNoKGZuID0+IGZuKCkpO1xuICAgIHRoaXMuX29uRGVzdHJveUZucyA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmx1c2hEb25lRm5zKCkge1xuICAgIHRoaXMuX29uRG9uZUZucy5mb3JFYWNoKGZuID0+IGZuKCkpO1xuICAgIHRoaXMuX29uRG9uZUZucyA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmx1c2hTdGFydEZucygpIHtcbiAgICB0aGlzLl9vblN0YXJ0Rm5zLmZvckVhY2goZm4gPT4gZm4oKSk7XG4gICAgdGhpcy5fb25TdGFydEZucyA9IFtdO1xuICB9XG5cbiAgZmluaXNoKCkge1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIGlmICh0aGlzLl9zdGF0ZSA+PSBBbmltYXRvckNvbnRyb2xTdGF0ZS5GSU5JU0hFRCkgcmV0dXJuO1xuICAgIHRoaXMuX3N0YXRlID0gQW5pbWF0b3JDb250cm9sU3RhdGUuRklOSVNIRUQ7XG4gICAgdGhpcy5fc3R5bGVyLmZpbmlzaCgpO1xuICAgIHRoaXMuX2ZsdXNoU3RhcnRGbnMoKTtcbiAgICB0aGlzLl9mbHVzaERvbmVGbnMoKTtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKHZhbHVlOiBudW1iZXIpIHsgdGhpcy5fc3R5bGVyLnNldFBvc2l0aW9uKHZhbHVlKTsgfVxuXG4gIGdldFBvc2l0aW9uKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9zdHlsZXIuZ2V0UG9zaXRpb24oKTsgfVxuXG4gIGhhc1N0YXJ0ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zdGF0ZSA+PSBBbmltYXRvckNvbnRyb2xTdGF0ZS5TVEFSVEVEOyB9XG4gIGluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3N0YXRlID49IEFuaW1hdG9yQ29udHJvbFN0YXRlLklOSVRJQUxJWkVEKSByZXR1cm47XG4gICAgdGhpcy5fc3RhdGUgPSBBbmltYXRvckNvbnRyb2xTdGF0ZS5JTklUSUFMSVpFRDtcbiAgICBjb25zdCBlbG0gPSB0aGlzLmVsZW1lbnQ7XG4gICAgdGhpcy5fc3R5bGVyLmFwcGx5KCk7XG4gICAgaWYgKHRoaXMuX2RlbGF5KSB7XG4gICAgICB0aGlzLl9zdHlsZXIucGF1c2UoKTtcbiAgICB9XG4gIH1cblxuICBwbGF5KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIGlmICghdGhpcy5oYXNTdGFydGVkKCkpIHtcbiAgICAgIHRoaXMuX2ZsdXNoU3RhcnRGbnMoKTtcbiAgICAgIHRoaXMuX3N0YXRlID0gQW5pbWF0b3JDb250cm9sU3RhdGUuU1RBUlRFRDtcbiAgICB9XG4gICAgdGhpcy5fc3R5bGVyLnJlc3VtZSgpO1xuICB9XG5cbiAgcGF1c2UoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5fc3R5bGVyLnBhdXNlKCk7XG4gIH1cbiAgcmVzdGFydCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgdGhpcy5wbGF5KCk7XG4gIH1cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc3R5bGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLl9idWlsZFN0eWxlcigpO1xuICAgIHRoaXMuX3N0eWxlci5hcHBseSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRTdHlsZXIoKSB7XG4gICAgdGhpcy5fc3R5bGVyID0gbmV3IEVsZW1lbnRBbmltYXRpb25TdHlsZUhhbmRsZXIoXG4gICAgICAgIHRoaXMuZWxlbWVudCwgdGhpcy5hbmltYXRpb25OYW1lLCB0aGlzLl9kdXJhdGlvbiwgdGhpcy5fZGVsYXksIHRoaXMuZWFzaW5nLFxuICAgICAgICBERUZBVUxUX0ZJTExfTU9ERSwgKCkgPT4gdGhpcy5maW5pc2goKSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIHRyaWdnZXJDYWxsYmFjayhwaGFzZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG1ldGhvZHMgPSBwaGFzZU5hbWUgPT0gJ3N0YXJ0JyA/IHRoaXMuX29uU3RhcnRGbnMgOiB0aGlzLl9vbkRvbmVGbnM7XG4gICAgbWV0aG9kcy5mb3JFYWNoKGZuID0+IGZuKCkpO1xuICAgIG1ldGhvZHMubGVuZ3RoID0gMDtcbiAgfVxuXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgY29uc3Qgc3R5bGVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIGlmICh0aGlzLmhhc1N0YXJ0ZWQoKSkge1xuICAgICAgY29uc3QgZmluaXNoZWQgPSB0aGlzLl9zdGF0ZSA+PSBBbmltYXRvckNvbnRyb2xTdGF0ZS5GSU5JU0hFRDtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuX2ZpbmFsU3R5bGVzKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBpZiAocHJvcCAhPSAnb2Zmc2V0Jykge1xuICAgICAgICAgIHN0eWxlc1twcm9wXSA9IGZpbmlzaGVkID8gdGhpcy5fZmluYWxTdHlsZXNbcHJvcF0gOiBjb21wdXRlU3R5bGUodGhpcy5lbGVtZW50LCBwcm9wKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFNuYXBzaG90ID0gc3R5bGVzO1xuICB9XG59XG4iXX0=