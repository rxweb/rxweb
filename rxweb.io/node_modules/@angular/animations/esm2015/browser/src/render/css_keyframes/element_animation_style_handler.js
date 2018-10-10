/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
  @type {?} */
const ELAPSED_TIME_MAX_DECIMAL_PLACES = 3;
/** @type {?} */
const ANIMATION_PROP = 'animation';
/** @type {?} */
const ANIMATIONEND_EVENT = 'animationend';
/** @type {?} */
const ONE_SECOND = 1000;
export class ElementAnimationStyleHandler {
    /**
     * @param {?} _element
     * @param {?} _name
     * @param {?} _duration
     * @param {?} _delay
     * @param {?} _easing
     * @param {?} _fillMode
     * @param {?} _onDoneFn
     */
    constructor(_element, _name, _duration, _delay, _easing, _fillMode, _onDoneFn) {
        this._element = _element;
        this._name = _name;
        this._duration = _duration;
        this._delay = _delay;
        this._easing = _easing;
        this._fillMode = _fillMode;
        this._onDoneFn = _onDoneFn;
        this._finished = false;
        this._destroyed = false;
        this._startTime = 0;
        this._position = 0;
        this._eventFn = (e) => this._handleCallback(e);
    }
    /**
     * @return {?}
     */
    apply() {
        applyKeyframeAnimation(this._element, `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`);
        addRemoveAnimationEvent(this._element, this._eventFn, false);
        this._startTime = Date.now();
    }
    /**
     * @return {?}
     */
    pause() { playPauseAnimation(this._element, this._name, 'paused'); }
    /**
     * @return {?}
     */
    resume() { playPauseAnimation(this._element, this._name, 'running'); }
    /**
     * @param {?} position
     * @return {?}
     */
    setPosition(position) {
        /** @type {?} */
        const index = findIndexForAnimation(this._element, this._name);
        this._position = position * this._duration;
        setAnimationStyle(this._element, 'Delay', `-${this._position}ms`, index);
    }
    /**
     * @return {?}
     */
    getPosition() { return this._position; }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleCallback(event) {
        /** @type {?} */
        const timestamp = event._ngTestManualTimestamp || Date.now();
        /** @type {?} */
        const elapsedTime = parseFloat(event.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES)) * ONE_SECOND;
        if (event.animationName == this._name &&
            Math.max(timestamp - this._startTime, 0) >= this._delay && elapsedTime >= this._duration) {
            this.finish();
        }
    }
    /**
     * @return {?}
     */
    finish() {
        if (this._finished)
            return;
        this._finished = true;
        this._onDoneFn();
        addRemoveAnimationEvent(this._element, this._eventFn, true);
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this._destroyed)
            return;
        this._destroyed = true;
        this.finish();
        removeKeyframeAnimation(this._element, this._name);
    }
}
if (false) {
    /** @type {?} */
    ElementAnimationStyleHandler.prototype._eventFn;
    /** @type {?} */
    ElementAnimationStyleHandler.prototype._finished;
    /** @type {?} */
    ElementAnimationStyleHandler.prototype._destroyed;
    /** @type {?} */
    ElementAnimationStyleHandler.prototype._startTime;
    /** @type {?} */
    ElementAnimationStyleHandler.prototype._position;
    /** @type {?} */
    ElementAnimationStyleHandler.prototype._element;
    /** @type {?} */
    ElementAnimationStyleHandler.prototype._name;
    /** @type {?} */
    ElementAnimationStyleHandler.prototype._duration;
    /** @type {?} */
    ElementAnimationStyleHandler.prototype._delay;
    /** @type {?} */
    ElementAnimationStyleHandler.prototype._easing;
    /** @type {?} */
    ElementAnimationStyleHandler.prototype._fillMode;
    /** @type {?} */
    ElementAnimationStyleHandler.prototype._onDoneFn;
}
/**
 * @param {?} element
 * @param {?} name
 * @param {?} status
 * @return {?}
 */
function playPauseAnimation(element, name, status) {
    /** @type {?} */
    const index = findIndexForAnimation(element, name);
    setAnimationStyle(element, 'PlayState', status, index);
}
/**
 * @param {?} element
 * @param {?} value
 * @return {?}
 */
function applyKeyframeAnimation(element, value) {
    /** @type {?} */
    const anim = getAnimationStyle(element, '').trim();
    /** @type {?} */
    let index = 0;
    if (anim.length) {
        index = countChars(anim, ',') + 1;
        value = `${anim}, ${value}`;
    }
    setAnimationStyle(element, '', value);
    return index;
}
/**
 * @param {?} element
 * @param {?} name
 * @return {?}
 */
function removeKeyframeAnimation(element, name) {
    /** @type {?} */
    const anim = getAnimationStyle(element, '');
    /** @type {?} */
    const tokens = anim.split(',');
    /** @type {?} */
    const index = findMatchingTokenIndex(tokens, name);
    if (index >= 0) {
        tokens.splice(index, 1);
        /** @type {?} */
        const newValue = tokens.join(',');
        setAnimationStyle(element, '', newValue);
    }
}
/**
 * @param {?} element
 * @param {?} value
 * @return {?}
 */
function findIndexForAnimation(element, value) {
    /** @type {?} */
    const anim = getAnimationStyle(element, '');
    if (anim.indexOf(',') > 0) {
        /** @type {?} */
        const tokens = anim.split(',');
        return findMatchingTokenIndex(tokens, value);
    }
    return findMatchingTokenIndex([anim], value);
}
/**
 * @param {?} tokens
 * @param {?} searchToken
 * @return {?}
 */
function findMatchingTokenIndex(tokens, searchToken) {
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].indexOf(searchToken) >= 0) {
            return i;
        }
    }
    return -1;
}
/**
 * @param {?} element
 * @param {?} fn
 * @param {?} doRemove
 * @return {?}
 */
function addRemoveAnimationEvent(element, fn, doRemove) {
    doRemove ? element.removeEventListener(ANIMATIONEND_EVENT, fn) :
        element.addEventListener(ANIMATIONEND_EVENT, fn);
}
/**
 * @param {?} element
 * @param {?} name
 * @param {?} value
 * @param {?=} index
 * @return {?}
 */
function setAnimationStyle(element, name, value, index) {
    /** @type {?} */
    const prop = ANIMATION_PROP + name;
    if (index != null) {
        /** @type {?} */
        const oldValue = element.style[prop];
        if (oldValue.length) {
            /** @type {?} */
            const tokens = oldValue.split(',');
            tokens[index] = value;
            value = tokens.join(',');
        }
    }
    element.style[prop] = value;
}
/**
 * @param {?} element
 * @param {?} name
 * @return {?}
 */
function getAnimationStyle(element, name) {
    return element.style[ANIMATION_PROP + name];
}
/**
 * @param {?} value
 * @param {?} char
 * @return {?}
 */
function countChars(value, char) {
    /** @type {?} */
    let count = 0;
    for (let i = 0; i < value.length; i++) {
        /** @type {?} */
        const c = value.charAt(i);
        if (c === char)
            count++;
    }
    return count;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudF9hbmltYXRpb25fc3R5bGVfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuaW1hdGlvbnMvYnJvd3Nlci9zcmMvcmVuZGVyL2Nzc19rZXlmcmFtZXMvZWxlbWVudF9hbmltYXRpb25fc3R5bGVfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQU9BLE1BQU0sK0JBQStCLEdBQUcsQ0FBQyxDQUFDOztBQUMxQyxNQUFNLGNBQWMsR0FBRyxXQUFXLENBQUM7O0FBQ25DLE1BQU0sa0JBQWtCLEdBQUcsY0FBYyxDQUFDOztBQUMxQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFFeEIsTUFBTTs7Ozs7Ozs7OztJQU9KLFlBQ3FCLFVBQWdDLEtBQWEsRUFDN0MsV0FBb0MsTUFBYyxFQUNsRCxTQUFrQyxTQUErQixFQUNqRTtRQUhBLGFBQVEsR0FBUixRQUFRO1FBQXdCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDN0MsY0FBUyxHQUFULFNBQVM7UUFBMkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNsRCxZQUFPLEdBQVAsT0FBTztRQUEyQixjQUFTLEdBQVQsU0FBUyxDQUFzQjtRQUNqRSxjQUFTLEdBQVQsU0FBUzt5QkFUVixLQUFLOzBCQUNKLEtBQUs7MEJBQ0wsQ0FBQzt5QkFDRixDQUFDO1FBT25CLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDaEQ7Ozs7SUFFRCxLQUFLO1FBQ0gsc0JBQXNCLENBQ2xCLElBQUksQ0FBQyxRQUFRLEVBQ2IsR0FBRyxJQUFJLENBQUMsU0FBUyxNQUFNLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sZUFBZSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLEVB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QUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQztDQUM3Qzs7Ozs7O0FBRUQsb0JBQW9CLEtBQWEsRUFBRSxJQUFZOztJQUM3QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7UUFDckMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxJQUFJO1lBQUUsS0FBSyxFQUFFLENBQUM7S0FDekI7SUFDRCxPQUFPLEtBQUssQ0FBQztDQUNkIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuY29uc3QgRUxBUFNFRF9USU1FX01BWF9ERUNJTUFMX1BMQUNFUyA9IDM7XG5jb25zdCBBTklNQVRJT05fUFJPUCA9ICdhbmltYXRpb24nO1xuY29uc3QgQU5JTUFUSU9ORU5EX0VWRU5UID0gJ2FuaW1hdGlvbmVuZCc7XG5jb25zdCBPTkVfU0VDT05EID0gMTAwMDtcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnRBbmltYXRpb25TdHlsZUhhbmRsZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IF9ldmVudEZuOiAoZTogYW55KSA9PiBhbnk7XG4gIHByaXZhdGUgX2ZpbmlzaGVkID0gZmFsc2U7XG4gIHByaXZhdGUgX2Rlc3Ryb3llZCA9IGZhbHNlO1xuICBwcml2YXRlIF9zdGFydFRpbWUgPSAwO1xuICBwcml2YXRlIF9wb3NpdGlvbiA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IF9lbGVtZW50OiBhbnksIHByaXZhdGUgcmVhZG9ubHkgX25hbWU6IHN0cmluZyxcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2R1cmF0aW9uOiBudW1iZXIsIHByaXZhdGUgcmVhZG9ubHkgX2RlbGF5OiBudW1iZXIsXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IF9lYXNpbmc6IHN0cmluZywgcHJpdmF0ZSByZWFkb25seSBfZmlsbE1vZGU6ICcnfCdib3RoJ3wnZm9yd2FyZHMnLFxuICAgICAgcHJpdmF0ZSByZWFkb25seSBfb25Eb25lRm46ICgpID0+IGFueSkge1xuICAgIHRoaXMuX2V2ZW50Rm4gPSAoZSkgPT4gdGhpcy5faGFuZGxlQ2FsbGJhY2soZSk7XG4gIH1cblxuICBhcHBseSgpIHtcbiAgICBhcHBseUtleWZyYW1lQW5pbWF0aW9uKFxuICAgICAgICB0aGlzLl9lbGVtZW50LFxuICAgICAgICBgJHt0aGlzLl9kdXJhdGlvbn1tcyAke3RoaXMuX2Vhc2luZ30gJHt0aGlzLl9kZWxheX1tcyAxIG5vcm1hbCAke3RoaXMuX2ZpbGxNb2RlfSAke3RoaXMuX25hbWV9YCk7XG4gICAgYWRkUmVtb3ZlQW5pbWF0aW9uRXZlbnQodGhpcy5fZWxlbWVudCwgdGhpcy5fZXZlbnRGbiwgZmFsc2UpO1xuICAgIHRoaXMuX3N0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIH1cblxuICBwYXVzZSgpIHsgcGxheVBhdXNlQW5pbWF0aW9uKHRoaXMuX2VsZW1lbnQsIHRoaXMuX25hbWUsICdwYXVzZWQnKTsgfVxuXG4gIHJlc3VtZSgpIHsgcGxheVBhdXNlQW5pbWF0aW9uKHRoaXMuX2VsZW1lbnQsIHRoaXMuX25hbWUsICdydW5uaW5nJyk7IH1cblxuICBzZXRQb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgY29uc3QgaW5kZXggPSBmaW5kSW5kZXhGb3JBbmltYXRpb24odGhpcy5fZWxlbWVudCwgdGhpcy5fbmFtZSk7XG4gICAgdGhpcy5fcG9zaXRpb24gPSBwb3NpdGlvbiAqIHRoaXMuX2R1cmF0aW9uO1xuICAgIHNldEFuaW1hdGlvblN0eWxlKHRoaXMuX2VsZW1lbnQsICdEZWxheScsIGAtJHt0aGlzLl9wb3NpdGlvbn1tc2AsIGluZGV4KTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkgeyByZXR1cm4gdGhpcy5fcG9zaXRpb247IH1cblxuICBwcml2YXRlIF9oYW5kbGVDYWxsYmFjayhldmVudDogYW55KSB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gZXZlbnQuX25nVGVzdE1hbnVhbFRpbWVzdGFtcCB8fCBEYXRlLm5vdygpO1xuICAgIGNvbnN0IGVsYXBzZWRUaW1lID1cbiAgICAgICAgcGFyc2VGbG9hdChldmVudC5lbGFwc2VkVGltZS50b0ZpeGVkKEVMQVBTRURfVElNRV9NQVhfREVDSU1BTF9QTEFDRVMpKSAqIE9ORV9TRUNPTkQ7XG4gICAgaWYgKGV2ZW50LmFuaW1hdGlvbk5hbWUgPT0gdGhpcy5fbmFtZSAmJlxuICAgICAgICBNYXRoLm1heCh0aW1lc3RhbXAgLSB0aGlzLl9zdGFydFRpbWUsIDApID49IHRoaXMuX2RlbGF5ICYmIGVsYXBzZWRUaW1lID49IHRoaXMuX2R1cmF0aW9uKSB7XG4gICAgICB0aGlzLmZpbmlzaCgpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmlzaCgpIHtcbiAgICBpZiAodGhpcy5fZmluaXNoZWQpIHJldHVybjtcbiAgICB0aGlzLl9maW5pc2hlZCA9IHRydWU7XG4gICAgdGhpcy5fb25Eb25lRm4oKTtcbiAgICBhZGRSZW1vdmVBbmltYXRpb25FdmVudCh0aGlzLl9lbGVtZW50LCB0aGlzLl9ldmVudEZuLCB0cnVlKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2Rlc3Ryb3llZCkgcmV0dXJuO1xuICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWU7XG4gICAgdGhpcy5maW5pc2goKTtcbiAgICByZW1vdmVLZXlmcmFtZUFuaW1hdGlvbih0aGlzLl9lbGVtZW50LCB0aGlzLl9uYW1lKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwbGF5UGF1c2VBbmltYXRpb24oZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIHN0YXR1czogJ3J1bm5pbmcnIHwgJ3BhdXNlZCcpIHtcbiAgY29uc3QgaW5kZXggPSBmaW5kSW5kZXhGb3JBbmltYXRpb24oZWxlbWVudCwgbmFtZSk7XG4gIHNldEFuaW1hdGlvblN0eWxlKGVsZW1lbnQsICdQbGF5U3RhdGUnLCBzdGF0dXMsIGluZGV4KTtcbn1cblxuZnVuY3Rpb24gYXBwbHlLZXlmcmFtZUFuaW1hdGlvbihlbGVtZW50OiBhbnksIHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBhbmltID0gZ2V0QW5pbWF0aW9uU3R5bGUoZWxlbWVudCwgJycpLnRyaW0oKTtcbiAgbGV0IGluZGV4ID0gMDtcbiAgaWYgKGFuaW0ubGVuZ3RoKSB7XG4gICAgaW5kZXggPSBjb3VudENoYXJzKGFuaW0sICcsJykgKyAxO1xuICAgIHZhbHVlID0gYCR7YW5pbX0sICR7dmFsdWV9YDtcbiAgfVxuICBzZXRBbmltYXRpb25TdHlsZShlbGVtZW50LCAnJywgdmFsdWUpO1xuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUtleWZyYW1lQW5pbWF0aW9uKGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGFuaW0gPSBnZXRBbmltYXRpb25TdHlsZShlbGVtZW50LCAnJyk7XG4gIGNvbnN0IHRva2VucyA9IGFuaW0uc3BsaXQoJywnKTtcbiAgY29uc3QgaW5kZXggPSBmaW5kTWF0Y2hpbmdUb2tlbkluZGV4KHRva2VucywgbmFtZSk7XG4gIGlmIChpbmRleCA+PSAwKSB7XG4gICAgdG9rZW5zLnNwbGljZShpbmRleCwgMSk7XG4gICAgY29uc3QgbmV3VmFsdWUgPSB0b2tlbnMuam9pbignLCcpO1xuICAgIHNldEFuaW1hdGlvblN0eWxlKGVsZW1lbnQsICcnLCBuZXdWYWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEluZGV4Rm9yQW5pbWF0aW9uKGVsZW1lbnQ6IGFueSwgdmFsdWU6IHN0cmluZykge1xuICBjb25zdCBhbmltID0gZ2V0QW5pbWF0aW9uU3R5bGUoZWxlbWVudCwgJycpO1xuICBpZiAoYW5pbS5pbmRleE9mKCcsJykgPiAwKSB7XG4gICAgY29uc3QgdG9rZW5zID0gYW5pbS5zcGxpdCgnLCcpO1xuICAgIHJldHVybiBmaW5kTWF0Y2hpbmdUb2tlbkluZGV4KHRva2VucywgdmFsdWUpO1xuICB9XG4gIHJldHVybiBmaW5kTWF0Y2hpbmdUb2tlbkluZGV4KFthbmltXSwgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBmaW5kTWF0Y2hpbmdUb2tlbkluZGV4KHRva2Vuczogc3RyaW5nW10sIHNlYXJjaFRva2VuOiBzdHJpbmcpOiBudW1iZXIge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0b2tlbnNbaV0uaW5kZXhPZihzZWFyY2hUb2tlbikgPj0gMCkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gYWRkUmVtb3ZlQW5pbWF0aW9uRXZlbnQoZWxlbWVudDogYW55LCBmbjogKGU6IGFueSkgPT4gYW55LCBkb1JlbW92ZTogYm9vbGVhbikge1xuICBkb1JlbW92ZSA/IGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihBTklNQVRJT05FTkRfRVZFTlQsIGZuKSA6XG4gICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKEFOSU1BVElPTkVORF9FVkVOVCwgZm4pO1xufVxuXG5mdW5jdGlvbiBzZXRBbmltYXRpb25TdHlsZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgaW5kZXg/OiBudW1iZXIpIHtcbiAgY29uc3QgcHJvcCA9IEFOSU1BVElPTl9QUk9QICsgbmFtZTtcbiAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICBjb25zdCBvbGRWYWx1ZSA9IGVsZW1lbnQuc3R5bGVbcHJvcF07XG4gICAgaWYgKG9sZFZhbHVlLmxlbmd0aCkge1xuICAgICAgY29uc3QgdG9rZW5zID0gb2xkVmFsdWUuc3BsaXQoJywnKTtcbiAgICAgIHRva2Vuc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgIHZhbHVlID0gdG9rZW5zLmpvaW4oJywnKTtcbiAgICB9XG4gIH1cbiAgZWxlbWVudC5zdHlsZVtwcm9wXSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRBbmltYXRpb25TdHlsZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZykge1xuICByZXR1cm4gZWxlbWVudC5zdHlsZVtBTklNQVRJT05fUFJPUCArIG5hbWVdO1xufVxuXG5mdW5jdGlvbiBjb3VudENoYXJzKHZhbHVlOiBzdHJpbmcsIGNoYXI6IHN0cmluZyk6IG51bWJlciB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjID0gdmFsdWUuY2hhckF0KGkpO1xuICAgIGlmIChjID09PSBjaGFyKSBjb3VudCsrO1xuICB9XG4gIHJldHVybiBjb3VudDtcbn1cbiJdfQ==