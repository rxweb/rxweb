/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { computeStyle } from '../../util';
export class WebAnimationsPlayer {
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} options
     */
    constructor(element, keyframes, options) {
        this.element = element;
        this.keyframes = keyframes;
        this.options = options;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._onDestroyFns = [];
        this._initialized = false;
        this._finished = false;
        this._started = false;
        this._destroyed = false;
        this.time = 0;
        this.parentPlayer = null;
        this.currentSnapshot = {};
        this._duration = /** @type {?} */ (options['duration']);
        this._delay = /** @type {?} */ (options['delay']) || 0;
        this.time = this._duration + this._delay;
    }
    /**
     * @return {?}
     */
    _onFinish() {
        if (!this._finished) {
            this._finished = true;
            this._onDoneFns.forEach(fn => fn());
            this._onDoneFns = [];
        }
    }
    /**
     * @return {?}
     */
    init() {
        this._buildPlayer();
        this._preparePlayerBeforeStart();
    }
    /**
     * @return {?}
     */
    _buildPlayer() {
        if (this._initialized)
            return;
        this._initialized = true;
        /** @type {?} */
        const keyframes = this.keyframes;
        (/** @type {?} */ (this)).domPlayer =
            this._triggerWebAnimation(this.element, keyframes, this.options);
        this._finalKeyframe = keyframes.length ? keyframes[keyframes.length - 1] : {};
        this.domPlayer.addEventListener('finish', () => this._onFinish());
    }
    /**
     * @return {?}
     */
    _preparePlayerBeforeStart() {
        // this is required so that the player doesn't start to animate right away
        if (this._delay) {
            this._resetDomPlayerState();
        }
        else {
            this.domPlayer.pause();
        }
    }
    /**
     * \@internal
     * @param {?} element
     * @param {?} keyframes
     * @param {?} options
     * @return {?}
     */
    _triggerWebAnimation(element, keyframes, options) {
        // jscompiler doesn't seem to know animate is a native property because it's not fully
        // supported yet across common browsers (we polyfill it for Edge/Safari) [CL #143630929]
        return /** @type {?} */ (element['animate'](keyframes, options));
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
    play() {
        this._buildPlayer();
        if (!this.hasStarted()) {
            this._onStartFns.forEach(fn => fn());
            this._onStartFns = [];
            this._started = true;
        }
        this.domPlayer.play();
    }
    /**
     * @return {?}
     */
    pause() {
        this.init();
        this.domPlayer.pause();
    }
    /**
     * @return {?}
     */
    finish() {
        this.init();
        this._onFinish();
        this.domPlayer.finish();
    }
    /**
     * @return {?}
     */
    reset() {
        this._resetDomPlayerState();
        this._destroyed = false;
        this._finished = false;
        this._started = false;
    }
    /**
     * @return {?}
     */
    _resetDomPlayerState() {
        if (this.domPlayer) {
            this.domPlayer.cancel();
        }
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
    hasStarted() { return this._started; }
    /**
     * @return {?}
     */
    destroy() {
        if (!this._destroyed) {
            this._destroyed = true;
            this._resetDomPlayerState();
            this._onFinish();
            this._onDestroyFns.forEach(fn => fn());
            this._onDestroyFns = [];
        }
    }
    /**
     * @param {?} p
     * @return {?}
     */
    setPosition(p) { this.domPlayer.currentTime = p * this.time; }
    /**
     * @return {?}
     */
    getPosition() { return this.domPlayer.currentTime / this.time; }
    /**
     * @return {?}
     */
    get totalTime() { return this._delay + this._duration; }
    /**
     * @return {?}
     */
    beforeDestroy() {
        /** @type {?} */
        const styles = {};
        if (this.hasStarted()) {
            Object.keys(this._finalKeyframe).forEach(prop => {
                if (prop != 'offset') {
                    styles[prop] =
                        this._finished ? this._finalKeyframe[prop] : computeStyle(this.element, prop);
                }
            });
        }
        this.currentSnapshot = styles;
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
}
if (false) {
    /** @type {?} */
    WebAnimationsPlayer.prototype._onDoneFns;
    /** @type {?} */
    WebAnimationsPlayer.prototype._onStartFns;
    /** @type {?} */
    WebAnimationsPlayer.prototype._onDestroyFns;
    /** @type {?} */
    WebAnimationsPlayer.prototype._duration;
    /** @type {?} */
    WebAnimationsPlayer.prototype._delay;
    /** @type {?} */
    WebAnimationsPlayer.prototype._initialized;
    /** @type {?} */
    WebAnimationsPlayer.prototype._finished;
    /** @type {?} */
    WebAnimationsPlayer.prototype._started;
    /** @type {?} */
    WebAnimationsPlayer.prototype._destroyed;
    /** @type {?} */
    WebAnimationsPlayer.prototype._finalKeyframe;
    /** @type {?} */
    WebAnimationsPlayer.prototype.domPlayer;
    /** @type {?} */
    WebAnimationsPlayer.prototype.time;
    /** @type {?} */
    WebAnimationsPlayer.prototype.parentPlayer;
    /** @type {?} */
    WebAnimationsPlayer.prototype.currentSnapshot;
    /** @type {?} */
    WebAnimationsPlayer.prototype.element;
    /** @type {?} */
    WebAnimationsPlayer.prototype.keyframes;
    /** @type {?} */
    WebAnimationsPlayer.prototype.options;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViX2FuaW1hdGlvbnNfcGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5pbWF0aW9ucy9icm93c2VyL3NyYy9yZW5kZXIvd2ViX2FuaW1hdGlvbnMvd2ViX2FuaW1hdGlvbnNfcGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFTQSxPQUFPLEVBQXFFLFlBQVksRUFBYSxNQUFNLFlBQVksQ0FBQztBQUl4SCxNQUFNOzs7Ozs7SUFvQkosWUFDVyxTQUFxQixTQUE2QyxFQUNsRTtRQURBLFlBQU8sR0FBUCxPQUFPO1FBQWMsY0FBUyxHQUFULFNBQVMsQ0FBb0M7UUFDbEUsWUFBTyxHQUFQLE9BQU87MEJBckJlLEVBQUU7MkJBQ0QsRUFBRTs2QkFDQSxFQUFFOzRCQUdmLEtBQUs7eUJBQ1IsS0FBSzt3QkFDTixLQUFLOzBCQUNILEtBQUs7b0JBTVosQ0FBQzs0QkFFNkIsSUFBSTsrQkFDaUIsRUFBRTtRQUtqRSxJQUFJLENBQUMsU0FBUyxxQkFBVyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUEsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxxQkFBVyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQzFDOzs7O0lBRU8sU0FBUztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztTQUN0Qjs7Ozs7SUFHSCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFlB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QVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNuRjthQUNGLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7S0FDL0I7Ozs7OztJQUdELGVBQWUsQ0FBQyxTQUFpQjs7UUFDL0IsTUFBTSxPQUFPLEdBQUcsU0FBUyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMxRSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QixPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUNwQjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBbmltYXRpb25QbGF5ZXJ9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge2FsbG93UHJldmlvdXNQbGF5ZXJTdHlsZXNNZXJnZSwgYmFsYW5jZVByZXZpb3VzU3R5bGVzSW50b0tleWZyYW1lcywgY29tcHV0ZVN0eWxlLCBjb3B5U3R5bGVzfSBmcm9tICcuLi8uLi91dGlsJztcblxuaW1wb3J0IHtET01BbmltYXRpb259IGZyb20gJy4vZG9tX2FuaW1hdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBXZWJBbmltYXRpb25zUGxheWVyIGltcGxlbWVudHMgQW5pbWF0aW9uUGxheWVyIHtcbiAgcHJpdmF0ZSBfb25Eb25lRm5zOiBGdW5jdGlvbltdID0gW107XG4gIHByaXZhdGUgX29uU3RhcnRGbnM6IEZ1bmN0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBfb25EZXN0cm95Rm5zOiBGdW5jdGlvbltdID0gW107XG4gIHByaXZhdGUgX2R1cmF0aW9uOiBudW1iZXI7XG4gIHByaXZhdGUgX2RlbGF5OiBudW1iZXI7XG4gIHByaXZhdGUgX2luaXRpYWxpemVkID0gZmFsc2U7XG4gIHByaXZhdGUgX2ZpbmlzaGVkID0gZmFsc2U7XG4gIHByaXZhdGUgX3N0YXJ0ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZGVzdHJveWVkID0gZmFsc2U7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9maW5hbEtleWZyYW1lICE6IHtba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXJ9O1xuXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwdWJsaWMgcmVhZG9ubHkgZG9tUGxheWVyICE6IERPTUFuaW1hdGlvbjtcbiAgcHVibGljIHRpbWUgPSAwO1xuXG4gIHB1YmxpYyBwYXJlbnRQbGF5ZXI6IEFuaW1hdGlvblBsYXllcnxudWxsID0gbnVsbDtcbiAgcHVibGljIGN1cnJlbnRTbmFwc2hvdDoge1tzdHlsZU5hbWU6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcn0gPSB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBlbGVtZW50OiBhbnksIHB1YmxpYyBrZXlmcmFtZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXJ9W10sXG4gICAgICBwdWJsaWMgb3B0aW9uczoge1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcn0pIHtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IDxudW1iZXI+b3B0aW9uc1snZHVyYXRpb24nXTtcbiAgICB0aGlzLl9kZWxheSA9IDxudW1iZXI+b3B0aW9uc1snZGVsYXknXSB8fCAwO1xuICAgIHRoaXMudGltZSA9IHRoaXMuX2R1cmF0aW9uICsgdGhpcy5fZGVsYXk7XG4gIH1cblxuICBwcml2YXRlIF9vbkZpbmlzaCgpIHtcbiAgICBpZiAoIXRoaXMuX2ZpbmlzaGVkKSB7XG4gICAgICB0aGlzLl9maW5pc2hlZCA9IHRydWU7XG4gICAgICB0aGlzLl9vbkRvbmVGbnMuZm9yRWFjaChmbiA9PiBmbigpKTtcbiAgICAgIHRoaXMuX29uRG9uZUZucyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fYnVpbGRQbGF5ZXIoKTtcbiAgICB0aGlzLl9wcmVwYXJlUGxheWVyQmVmb3JlU3RhcnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkUGxheWVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkgcmV0dXJuO1xuICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGtleWZyYW1lcyA9IHRoaXMua2V5ZnJhbWVzO1xuICAgICh0aGlzIGFze2RvbVBsYXllcjogRE9NQW5pbWF0aW9ufSkuZG9tUGxheWVyID1cbiAgICAgICAgdGhpcy5fdHJpZ2dlcldlYkFuaW1hdGlvbih0aGlzLmVsZW1lbnQsIGtleWZyYW1lcywgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLl9maW5hbEtleWZyYW1lID0ga2V5ZnJhbWVzLmxlbmd0aCA/IGtleWZyYW1lc1trZXlmcmFtZXMubGVuZ3RoIC0gMV0gOiB7fTtcbiAgICB0aGlzLmRvbVBsYXllci5hZGRFdmVudExpc3RlbmVyKCdmaW5pc2gnLCAoKSA9PiB0aGlzLl9vbkZpbmlzaCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3ByZXBhcmVQbGF5ZXJCZWZvcmVTdGFydCgpIHtcbiAgICAvLyB0aGlzIGlzIHJlcXVpcmVkIHNvIHRoYXQgdGhlIHBsYXllciBkb2Vzbid0IHN0YXJ0IHRvIGFuaW1hdGUgcmlnaHQgYXdheVxuICAgIGlmICh0aGlzLl9kZWxheSkge1xuICAgICAgdGhpcy5fcmVzZXREb21QbGF5ZXJTdGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvbVBsYXllci5wYXVzZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3RyaWdnZXJXZWJBbmltYXRpb24oZWxlbWVudDogYW55LCBrZXlmcmFtZXM6IGFueVtdLCBvcHRpb25zOiBhbnkpOiBET01BbmltYXRpb24ge1xuICAgIC8vIGpzY29tcGlsZXIgZG9lc24ndCBzZWVtIHRvIGtub3cgYW5pbWF0ZSBpcyBhIG5hdGl2ZSBwcm9wZXJ0eSBiZWNhdXNlIGl0J3Mgbm90IGZ1bGx5XG4gICAgLy8gc3VwcG9ydGVkIHlldCBhY3Jvc3MgY29tbW9uIGJyb3dzZXJzICh3ZSBwb2x5ZmlsbCBpdCBmb3IgRWRnZS9TYWZhcmkpIFtDTCAjMTQzNjMwOTI5XVxuICAgIHJldHVybiBlbGVtZW50WydhbmltYXRlJ10oa2V5ZnJhbWVzLCBvcHRpb25zKSBhcyBET01BbmltYXRpb247XG4gIH1cblxuICBvblN0YXJ0KGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX29uU3RhcnRGbnMucHVzaChmbik7IH1cblxuICBvbkRvbmUoZm46ICgpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fb25Eb25lRm5zLnB1c2goZm4pOyB9XG5cbiAgb25EZXN0cm95KGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX29uRGVzdHJveUZucy5wdXNoKGZuKTsgfVxuXG4gIHBsYXkoKTogdm9pZCB7XG4gICAgdGhpcy5fYnVpbGRQbGF5ZXIoKTtcbiAgICBpZiAoIXRoaXMuaGFzU3RhcnRlZCgpKSB7XG4gICAgICB0aGlzLl9vblN0YXJ0Rm5zLmZvckVhY2goZm4gPT4gZm4oKSk7XG4gICAgICB0aGlzLl9vblN0YXJ0Rm5zID0gW107XG4gICAgICB0aGlzLl9zdGFydGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5kb21QbGF5ZXIucGxheSgpO1xuICB9XG5cbiAgcGF1c2UoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5kb21QbGF5ZXIucGF1c2UoKTtcbiAgfVxuXG4gIGZpbmlzaCgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLl9vbkZpbmlzaCgpO1xuICAgIHRoaXMuZG9tUGxheWVyLmZpbmlzaCgpO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzZXREb21QbGF5ZXJTdGF0ZSgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZCA9IGZhbHNlO1xuICAgIHRoaXMuX2ZpbmlzaGVkID0gZmFsc2U7XG4gICAgdGhpcy5fc3RhcnRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXREb21QbGF5ZXJTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5kb21QbGF5ZXIpIHtcbiAgICAgIHRoaXMuZG9tUGxheWVyLmNhbmNlbCgpO1xuICAgIH1cbiAgfVxuXG4gIHJlc3RhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIHRoaXMucGxheSgpO1xuICB9XG5cbiAgaGFzU3RhcnRlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3N0YXJ0ZWQ7IH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fcmVzZXREb21QbGF5ZXJTdGF0ZSgpO1xuICAgICAgdGhpcy5fb25GaW5pc2goKTtcbiAgICAgIHRoaXMuX29uRGVzdHJveUZucy5mb3JFYWNoKGZuID0+IGZuKCkpO1xuICAgICAgdGhpcy5fb25EZXN0cm95Rm5zID0gW107XG4gICAgfVxuICB9XG5cbiAgc2V0UG9zaXRpb24ocDogbnVtYmVyKTogdm9pZCB7IHRoaXMuZG9tUGxheWVyLmN1cnJlbnRUaW1lID0gcCAqIHRoaXMudGltZTsgfVxuXG4gIGdldFBvc2l0aW9uKCk6IG51bWJlciB7IHJldHVybiB0aGlzLmRvbVBsYXllci5jdXJyZW50VGltZSAvIHRoaXMudGltZTsgfVxuXG4gIGdldCB0b3RhbFRpbWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2RlbGF5ICsgdGhpcy5fZHVyYXRpb247IH1cblxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIGNvbnN0IHN0eWxlczoge1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcn0gPSB7fTtcbiAgICBpZiAodGhpcy5oYXNTdGFydGVkKCkpIHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuX2ZpbmFsS2V5ZnJhbWUpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgIGlmIChwcm9wICE9ICdvZmZzZXQnKSB7XG4gICAgICAgICAgc3R5bGVzW3Byb3BdID1cbiAgICAgICAgICAgICAgdGhpcy5fZmluaXNoZWQgPyB0aGlzLl9maW5hbEtleWZyYW1lW3Byb3BdIDogY29tcHV0ZVN0eWxlKHRoaXMuZWxlbWVudCwgcHJvcCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRTbmFwc2hvdCA9IHN0eWxlcztcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgdHJpZ2dlckNhbGxiYWNrKHBoYXNlTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbWV0aG9kcyA9IHBoYXNlTmFtZSA9PSAnc3RhcnQnID8gdGhpcy5fb25TdGFydEZucyA6IHRoaXMuX29uRG9uZUZucztcbiAgICBtZXRob2RzLmZvckVhY2goZm4gPT4gZm4oKSk7XG4gICAgbWV0aG9kcy5sZW5ndGggPSAwO1xuICB9XG59XG4iXX0=