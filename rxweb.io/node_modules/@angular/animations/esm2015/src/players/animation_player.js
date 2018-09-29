/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { scheduleMicroTask } from '../util';
/**
 * AnimationPlayer controls an animation sequence that was produced from a programmatic animation.
 * (see {\@link AnimationBuilder AnimationBuilder} for more information on how to create programmatic
 * animations.)
 *
 * \@experimental Animation support is experimental.
 * @record
 */
export function AnimationPlayer() { }
/** @type {?} */
AnimationPlayer.prototype.onDone;
/** @type {?} */
AnimationPlayer.prototype.onStart;
/** @type {?} */
AnimationPlayer.prototype.onDestroy;
/** @type {?} */
AnimationPlayer.prototype.init;
/** @type {?} */
AnimationPlayer.prototype.hasStarted;
/** @type {?} */
AnimationPlayer.prototype.play;
/** @type {?} */
AnimationPlayer.prototype.pause;
/** @type {?} */
AnimationPlayer.prototype.restart;
/** @type {?} */
AnimationPlayer.prototype.finish;
/** @type {?} */
AnimationPlayer.prototype.destroy;
/** @type {?} */
AnimationPlayer.prototype.reset;
/** @type {?} */
AnimationPlayer.prototype.setPosition;
/** @type {?} */
AnimationPlayer.prototype.getPosition;
/** @type {?} */
AnimationPlayer.prototype.parentPlayer;
/** @type {?} */
AnimationPlayer.prototype.totalTime;
/** @type {?|undefined} */
AnimationPlayer.prototype.beforeDestroy;
/**
 * \@internal
 * @type {?|undefined}
 */
AnimationPlayer.prototype.triggerCallback;
/**
 * \@internal
 * @type {?|undefined}
 */
AnimationPlayer.prototype.disabled;
/**
 * \@experimental Animation support is experimental.
 */
export class NoopAnimationPlayer {
    /**
     * @param {?=} duration
     * @param {?=} delay
     */
    constructor(duration = 0, delay = 0) {
        this._onDoneFns = [];
        this._onStartFns = [];
        this._onDestroyFns = [];
        this._started = false;
        this._destroyed = false;
        this._finished = false;
        this.parentPlayer = null;
        this.totalTime = duration + delay;
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
    hasStarted() { return this._started; }
    /**
     * @return {?}
     */
    init() { }
    /**
     * @return {?}
     */
    play() {
        if (!this.hasStarted()) {
            this._onStart();
            this.triggerMicrotask();
        }
        this._started = true;
    }
    /**
     * \@internal
     * @return {?}
     */
    triggerMicrotask() { scheduleMicroTask(() => this._onFinish()); }
    /**
     * @return {?}
     */
    _onStart() {
        this._onStartFns.forEach(fn => fn());
        this._onStartFns = [];
    }
    /**
     * @return {?}
     */
    pause() { }
    /**
     * @return {?}
     */
    restart() { }
    /**
     * @return {?}
     */
    finish() { this._onFinish(); }
    /**
     * @return {?}
     */
    destroy() {
        if (!this._destroyed) {
            this._destroyed = true;
            if (!this.hasStarted()) {
                this._onStart();
            }
            this.finish();
            this._onDestroyFns.forEach(fn => fn());
            this._onDestroyFns = [];
        }
    }
    /**
     * @return {?}
     */
    reset() { }
    /**
     * @param {?} position
     * @return {?}
     */
    setPosition(position) { }
    /**
     * @return {?}
     */
    getPosition() { return 0; }
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
    NoopAnimationPlayer.prototype._onDoneFns;
    /** @type {?} */
    NoopAnimationPlayer.prototype._onStartFns;
    /** @type {?} */
    NoopAnimationPlayer.prototype._onDestroyFns;
    /** @type {?} */
    NoopAnimationPlayer.prototype._started;
    /** @type {?} */
    NoopAnimationPlayer.prototype._destroyed;
    /** @type {?} */
    NoopAnimationPlayer.prototype._finished;
    /** @type {?} */
    NoopAnimationPlayer.prototype.parentPlayer;
    /** @type {?} */
    NoopAnimationPlayer.prototype.totalTime;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3BsYXllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuaW1hdGlvbnMvc3JjL3BsYXllcnMvYW5pbWF0aW9uX3BsYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBT0EsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUMxQyxNQUFNOzs7OztJQVNKLFlBQVksV0FBbUIsQ0FBQyxFQUFFLFFBQWdCLENBQUM7MEJBUmxCLEVBQUU7MkJBQ0QsRUFBRTs2QkFDQSxFQUFFO3dCQUNuQixLQUFLOzBCQUNILEtBQUs7eUJBQ04sS0FBSzs0QkFDbUIsSUFBSTtRQUVPLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUFFOzs7O0lBQ25GLFNBQVM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7U0FDdEI7Ozs7OztJQUVILE9BQU8sQ0FBQyxFQUFjLElBQVUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTs7Ozs7SUFDNUQsTUFBTSxDQUFDLEVBQWMsSUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFOzs7OztJQUMxRCxTQUFTLENBQUMsRUFBYyxJQUFVLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Ozs7SUFDaEUsVUFBVSxLQUFjLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFOzs7O0lBQy9DLElBQUksTUFBVzs7OztJQUNmLElBQUk7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QjtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0tBQ3RCOzs7OztJQUdELGdCQUFnQixLQUFLLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFekQsUUFBUTtRQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQzs7Ozs7SUFHeEIsS0FBSyxNQUFXOzs7O0lBQ2hCLE9BQU8sTUFBVzs7OztJQUNsQixNQUFNLEtBQVcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUU7Ozs7SUFDcEMsT0FBTztRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNqQjtZQUNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztTQUN6QjtLQUNGOzs7O0lBQ0QsS0FBSyxNQUFXOzs7OztJQUNoQixXQUFXLENBQUMsUUFBZ0IsS0FBVTs7OztJQUN0QyxXQUFXLEtBQWEsT0FBTyxDQUFDLENBQUMsRUFBRTs7Ozs7O0lBR25DLGVBQWUsQ0FBQyxTQUFpQjs7UUFDL0IsTUFBTSxPQUFPLEdBQUcsU0FBUyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMxRSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QixPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUNwQjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtzY2hlZHVsZU1pY3JvVGFza30gZnJvbSAnLi4vdXRpbCc7XG5cbi8qKlxuICogQW5pbWF0aW9uUGxheWVyIGNvbnRyb2xzIGFuIGFuaW1hdGlvbiBzZXF1ZW5jZSB0aGF0IHdhcyBwcm9kdWNlZCBmcm9tIGEgcHJvZ3JhbW1hdGljIGFuaW1hdGlvbi5cbiAqIChzZWUge0BsaW5rIEFuaW1hdGlvbkJ1aWxkZXIgQW5pbWF0aW9uQnVpbGRlcn0gZm9yIG1vcmUgaW5mb3JtYXRpb24gb24gaG93IHRvIGNyZWF0ZSBwcm9ncmFtbWF0aWNcbiAqIGFuaW1hdGlvbnMuKVxuICpcbiAqIEBleHBlcmltZW50YWwgQW5pbWF0aW9uIHN1cHBvcnQgaXMgZXhwZXJpbWVudGFsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvblBsYXllciB7XG4gIG9uRG9uZShmbjogKCkgPT4gdm9pZCk6IHZvaWQ7XG4gIG9uU3RhcnQoZm46ICgpID0+IHZvaWQpOiB2b2lkO1xuICBvbkRlc3Ryb3koZm46ICgpID0+IHZvaWQpOiB2b2lkO1xuICBpbml0KCk6IHZvaWQ7XG4gIGhhc1N0YXJ0ZWQoKTogYm9vbGVhbjtcbiAgcGxheSgpOiB2b2lkO1xuICBwYXVzZSgpOiB2b2lkO1xuICByZXN0YXJ0KCk6IHZvaWQ7XG4gIGZpbmlzaCgpOiB2b2lkO1xuICBkZXN0cm95KCk6IHZvaWQ7XG4gIHJlc2V0KCk6IHZvaWQ7XG4gIHNldFBvc2l0aW9uKHBvc2l0aW9uOiBhbnkgLyoqIFRPRE8gIzkxMDAgKi8pOiB2b2lkO1xuICBnZXRQb3NpdGlvbigpOiBudW1iZXI7XG4gIHBhcmVudFBsYXllcjogQW5pbWF0aW9uUGxheWVyfG51bGw7XG4gIHJlYWRvbmx5IHRvdGFsVGltZTogbnVtYmVyO1xuICBiZWZvcmVEZXN0cm95PzogKCkgPT4gYW55O1xuICAvKiogQGludGVybmFsICovXG4gIHRyaWdnZXJDYWxsYmFjaz86IChwaGFzZU5hbWU6IHN0cmluZykgPT4gdm9pZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQGV4cGVyaW1lbnRhbCBBbmltYXRpb24gc3VwcG9ydCBpcyBleHBlcmltZW50YWwuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb29wQW5pbWF0aW9uUGxheWVyIGltcGxlbWVudHMgQW5pbWF0aW9uUGxheWVyIHtcbiAgcHJpdmF0ZSBfb25Eb25lRm5zOiBGdW5jdGlvbltdID0gW107XG4gIHByaXZhdGUgX29uU3RhcnRGbnM6IEZ1bmN0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBfb25EZXN0cm95Rm5zOiBGdW5jdGlvbltdID0gW107XG4gIHByaXZhdGUgX3N0YXJ0ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZGVzdHJveWVkID0gZmFsc2U7XG4gIHByaXZhdGUgX2ZpbmlzaGVkID0gZmFsc2U7XG4gIHB1YmxpYyBwYXJlbnRQbGF5ZXI6IEFuaW1hdGlvblBsYXllcnxudWxsID0gbnVsbDtcbiAgcHVibGljIHJlYWRvbmx5IHRvdGFsVGltZTogbnVtYmVyO1xuICBjb25zdHJ1Y3RvcihkdXJhdGlvbjogbnVtYmVyID0gMCwgZGVsYXk6IG51bWJlciA9IDApIHsgdGhpcy50b3RhbFRpbWUgPSBkdXJhdGlvbiArIGRlbGF5OyB9XG4gIHByaXZhdGUgX29uRmluaXNoKCkge1xuICAgIGlmICghdGhpcy5fZmluaXNoZWQpIHtcbiAgICAgIHRoaXMuX2ZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX29uRG9uZUZucy5mb3JFYWNoKGZuID0+IGZuKCkpO1xuICAgICAgdGhpcy5fb25Eb25lRm5zID0gW107XG4gICAgfVxuICB9XG4gIG9uU3RhcnQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fb25TdGFydEZucy5wdXNoKGZuKTsgfVxuICBvbkRvbmUoZm46ICgpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fb25Eb25lRm5zLnB1c2goZm4pOyB9XG4gIG9uRGVzdHJveShmbjogKCkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLl9vbkRlc3Ryb3lGbnMucHVzaChmbik7IH1cbiAgaGFzU3RhcnRlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3N0YXJ0ZWQ7IH1cbiAgaW5pdCgpOiB2b2lkIHt9XG4gIHBsYXkoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmhhc1N0YXJ0ZWQoKSkge1xuICAgICAgdGhpcy5fb25TdGFydCgpO1xuICAgICAgdGhpcy50cmlnZ2VyTWljcm90YXNrKCk7XG4gICAgfVxuICAgIHRoaXMuX3N0YXJ0ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICB0cmlnZ2VyTWljcm90YXNrKCkgeyBzY2hlZHVsZU1pY3JvVGFzaygoKSA9PiB0aGlzLl9vbkZpbmlzaCgpKTsgfVxuXG4gIHByaXZhdGUgX29uU3RhcnQoKSB7XG4gICAgdGhpcy5fb25TdGFydEZucy5mb3JFYWNoKGZuID0+IGZuKCkpO1xuICAgIHRoaXMuX29uU3RhcnRGbnMgPSBbXTtcbiAgfVxuXG4gIHBhdXNlKCk6IHZvaWQge31cbiAgcmVzdGFydCgpOiB2b2lkIHt9XG4gIGZpbmlzaCgpOiB2b2lkIHsgdGhpcy5fb25GaW5pc2goKTsgfVxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgaWYgKCF0aGlzLmhhc1N0YXJ0ZWQoKSkge1xuICAgICAgICB0aGlzLl9vblN0YXJ0KCk7XG4gICAgICB9XG4gICAgICB0aGlzLmZpbmlzaCgpO1xuICAgICAgdGhpcy5fb25EZXN0cm95Rm5zLmZvckVhY2goZm4gPT4gZm4oKSk7XG4gICAgICB0aGlzLl9vbkRlc3Ryb3lGbnMgPSBbXTtcbiAgICB9XG4gIH1cbiAgcmVzZXQoKTogdm9pZCB7fVxuICBzZXRQb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyKTogdm9pZCB7fVxuICBnZXRQb3NpdGlvbigpOiBudW1iZXIgeyByZXR1cm4gMDsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgdHJpZ2dlckNhbGxiYWNrKHBoYXNlTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbWV0aG9kcyA9IHBoYXNlTmFtZSA9PSAnc3RhcnQnID8gdGhpcy5fb25TdGFydEZucyA6IHRoaXMuX29uRG9uZUZucztcbiAgICBtZXRob2RzLmZvckVhY2goZm4gPT4gZm4oKSk7XG4gICAgbWV0aG9kcy5sZW5ndGggPSAwO1xuICB9XG59XG4iXX0=