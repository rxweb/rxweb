/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { buildAnimationAst } from '../dsl/animation_ast_builder';
import { buildTrigger } from '../dsl/animation_trigger';
import { parseTimelineCommand } from './shared';
import { TimelineAnimationEngine } from './timeline_animation_engine';
import { TransitionAnimationEngine } from './transition_animation_engine';
export class AnimationEngine {
    /**
     * @param {?} bodyNode
     * @param {?} _driver
     * @param {?} normalizer
     */
    constructor(bodyNode, _driver, normalizer) {
        this.bodyNode = bodyNode;
        this._driver = _driver;
        this._triggerCache = {};
        this.onRemovalComplete = (element, context) => { };
        this._transitionEngine = new TransitionAnimationEngine(bodyNode, _driver, normalizer);
        this._timelineEngine = new TimelineAnimationEngine(bodyNode, _driver, normalizer);
        this._transitionEngine.onRemovalComplete = (element, context) => this.onRemovalComplete(element, context);
    }
    /**
     * @param {?} componentId
     * @param {?} namespaceId
     * @param {?} hostElement
     * @param {?} name
     * @param {?} metadata
     * @return {?}
     */
    registerTrigger(componentId, namespaceId, hostElement, name, metadata) {
        /** @type {?} */
        const cacheKey = componentId + '-' + name;
        /** @type {?} */
        let trigger = this._triggerCache[cacheKey];
        if (!trigger) {
            /** @type {?} */
            const errors = [];
            /** @type {?} */
            const ast = /** @type {?} */ (buildAnimationAst(this._driver, /** @type {?} */ (metadata), errors));
            if (errors.length) {
                throw new Error(`The animation trigger "${name}" has failed to build due to the following errors:\n - ${errors.join("\n - ")}`);
            }
            trigger = buildTrigger(name, ast);
            this._triggerCache[cacheKey] = trigger;
        }
        this._transitionEngine.registerTrigger(namespaceId, name, trigger);
    }
    /**
     * @param {?} namespaceId
     * @param {?} hostElement
     * @return {?}
     */
    register(namespaceId, hostElement) {
        this._transitionEngine.register(namespaceId, hostElement);
    }
    /**
     * @param {?} namespaceId
     * @param {?} context
     * @return {?}
     */
    destroy(namespaceId, context) {
        this._transitionEngine.destroy(namespaceId, context);
    }
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} parent
     * @param {?} insertBefore
     * @return {?}
     */
    onInsert(namespaceId, element, parent, insertBefore) {
        this._transitionEngine.insertNode(namespaceId, element, parent, insertBefore);
    }
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} context
     * @return {?}
     */
    onRemove(namespaceId, element, context) {
        this._transitionEngine.removeNode(namespaceId, element, context);
    }
    /**
     * @param {?} element
     * @param {?} disable
     * @return {?}
     */
    disableAnimations(element, disable) {
        this._transitionEngine.markElementAsDisabled(element, disable);
    }
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    process(namespaceId, element, property, value) {
        if (property.charAt(0) == '@') {
            const [id, action] = parseTimelineCommand(property);
            /** @type {?} */
            const args = /** @type {?} */ (value);
            this._timelineEngine.command(id, element, action, args);
        }
        else {
            this._transitionEngine.trigger(namespaceId, element, property, value);
        }
    }
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} eventName
     * @param {?} eventPhase
     * @param {?} callback
     * @return {?}
     */
    listen(namespaceId, element, eventName, eventPhase, callback) {
        // @@listen
        if (eventName.charAt(0) == '@') {
            const [id, action] = parseTimelineCommand(eventName);
            return this._timelineEngine.listen(id, element, action, callback);
        }
        return this._transitionEngine.listen(namespaceId, element, eventName, eventPhase, callback);
    }
    /**
     * @param {?=} microtaskId
     * @return {?}
     */
    flush(microtaskId = -1) { this._transitionEngine.flush(microtaskId); }
    /**
     * @return {?}
     */
    get players() {
        return (/** @type {?} */ (this._transitionEngine.players))
            .concat(/** @type {?} */ (this._timelineEngine.players));
    }
    /**
     * @return {?}
     */
    whenRenderingDone() { return this._transitionEngine.whenRenderingDone(); }
}
if (false) {
    /** @type {?} */
    AnimationEngine.prototype._transitionEngine;
    /** @type {?} */
    AnimationEngine.prototype._timelineEngine;
    /** @type {?} */
    AnimationEngine.prototype._triggerCache;
    /** @type {?} */
    AnimationEngine.prototype.onRemovalComplete;
    /** @type {?} */
    AnimationEngine.prototype.bodyNode;
    /** @type {?} */
    AnimationEngine.prototype._driver;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2VuZ2luZV9uZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5pbWF0aW9ucy9icm93c2VyL3NyYy9yZW5kZXIvYW5pbWF0aW9uX2VuZ2luZV9uZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFTQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQW1CLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBSXhFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUM5QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUV4RSxNQUFNOzs7Ozs7SUFTSixZQUNZLFVBQXVCLE9BQXdCLEVBQ3ZELFVBQW9DO1FBRDVCLGFBQVEsR0FBUixRQUFRO1FBQWUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7NkJBTkEsRUFBRTtpQ0FHbEMsQ0FBQyxPQUFZLEVBQUUsT0FBWSxFQUFFLEVBQUUsSUFBRztRQUszRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSx1QkFBdUIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRWxGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLE9BQVksRUFBRSxPQUFZLEVBQUUsRUFBRSxDQUN0RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzlDOzs7Ozs7Ozs7SUFFRCxlQUFlLENBQ1gsV0FBbUIsRUFBRSxXQUFtQixFQUFFLFdBQWdC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QWUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDbkU7UUFDRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzdGOzs7OztJQUVELEtBQUssQ0FBQyxjQUFzQixDQUFDLENBQUMsSUFBVSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFcEYsSUFBSSxPQUFPO1FBQ1QsT0FBTyxtQkFBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBNEIsRUFBQzthQUN2RCxNQUFNLG1CQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBNEIsRUFBQyxDQUFDO0tBQ2hFOzs7O0lBRUQsaUJBQWlCLEtBQW1CLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRTtDQUN6RiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QW5pbWF0aW9uTWV0YWRhdGEsIEFuaW1hdGlvblBsYXllciwgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7VHJpZ2dlckFzdH0gZnJvbSAnLi4vZHNsL2FuaW1hdGlvbl9hc3QnO1xuaW1wb3J0IHtidWlsZEFuaW1hdGlvbkFzdH0gZnJvbSAnLi4vZHNsL2FuaW1hdGlvbl9hc3RfYnVpbGRlcic7XG5pbXBvcnQge0FuaW1hdGlvblRyaWdnZXIsIGJ1aWxkVHJpZ2dlcn0gZnJvbSAnLi4vZHNsL2FuaW1hdGlvbl90cmlnZ2VyJztcbmltcG9ydCB7QW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyfSBmcm9tICcuLi9kc2wvc3R5bGVfbm9ybWFsaXphdGlvbi9hbmltYXRpb25fc3R5bGVfbm9ybWFsaXplcic7XG5cbmltcG9ydCB7QW5pbWF0aW9uRHJpdmVyfSBmcm9tICcuL2FuaW1hdGlvbl9kcml2ZXInO1xuaW1wb3J0IHtwYXJzZVRpbWVsaW5lQ29tbWFuZH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtUaW1lbGluZUFuaW1hdGlvbkVuZ2luZX0gZnJvbSAnLi90aW1lbGluZV9hbmltYXRpb25fZW5naW5lJztcbmltcG9ydCB7VHJhbnNpdGlvbkFuaW1hdGlvbkVuZ2luZX0gZnJvbSAnLi90cmFuc2l0aW9uX2FuaW1hdGlvbl9lbmdpbmUnO1xuXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uRW5naW5lIHtcbiAgcHJpdmF0ZSBfdHJhbnNpdGlvbkVuZ2luZTogVHJhbnNpdGlvbkFuaW1hdGlvbkVuZ2luZTtcbiAgcHJpdmF0ZSBfdGltZWxpbmVFbmdpbmU6IFRpbWVsaW5lQW5pbWF0aW9uRW5naW5lO1xuXG4gIHByaXZhdGUgX3RyaWdnZXJDYWNoZToge1trZXk6IHN0cmluZ106IEFuaW1hdGlvblRyaWdnZXJ9ID0ge307XG5cbiAgLy8gdGhpcyBtZXRob2QgaXMgZGVzaWduZWQgdG8gYmUgb3ZlcnJpZGRlbiBieSB0aGUgY29kZSB0aGF0IHVzZXMgdGhpcyBlbmdpbmVcbiAgcHVibGljIG9uUmVtb3ZhbENvbXBsZXRlID0gKGVsZW1lbnQ6IGFueSwgY29udGV4dDogYW55KSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgYm9keU5vZGU6IGFueSwgcHJpdmF0ZSBfZHJpdmVyOiBBbmltYXRpb25Ecml2ZXIsXG4gICAgICBub3JtYWxpemVyOiBBbmltYXRpb25TdHlsZU5vcm1hbGl6ZXIpIHtcbiAgICB0aGlzLl90cmFuc2l0aW9uRW5naW5lID0gbmV3IFRyYW5zaXRpb25BbmltYXRpb25FbmdpbmUoYm9keU5vZGUsIF9kcml2ZXIsIG5vcm1hbGl6ZXIpO1xuICAgIHRoaXMuX3RpbWVsaW5lRW5naW5lID0gbmV3IFRpbWVsaW5lQW5pbWF0aW9uRW5naW5lKGJvZHlOb2RlLCBfZHJpdmVyLCBub3JtYWxpemVyKTtcblxuICAgIHRoaXMuX3RyYW5zaXRpb25FbmdpbmUub25SZW1vdmFsQ29tcGxldGUgPSAoZWxlbWVudDogYW55LCBjb250ZXh0OiBhbnkpID0+XG4gICAgICAgIHRoaXMub25SZW1vdmFsQ29tcGxldGUoZWxlbWVudCwgY29udGV4dCk7XG4gIH1cblxuICByZWdpc3RlclRyaWdnZXIoXG4gICAgICBjb21wb25lbnRJZDogc3RyaW5nLCBuYW1lc3BhY2VJZDogc3RyaW5nLCBob3N0RWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsXG4gICAgICBtZXRhZGF0YTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhKTogdm9pZCB7XG4gICAgY29uc3QgY2FjaGVLZXkgPSBjb21wb25lbnRJZCArICctJyArIG5hbWU7XG4gICAgbGV0IHRyaWdnZXIgPSB0aGlzLl90cmlnZ2VyQ2FjaGVbY2FjaGVLZXldO1xuICAgIGlmICghdHJpZ2dlcikge1xuICAgICAgY29uc3QgZXJyb3JzOiBhbnlbXSA9IFtdO1xuICAgICAgY29uc3QgYXN0ID1cbiAgICAgICAgICBidWlsZEFuaW1hdGlvbkFzdCh0aGlzLl9kcml2ZXIsIG1ldGFkYXRhIGFzIEFuaW1hdGlvbk1ldGFkYXRhLCBlcnJvcnMpIGFzIFRyaWdnZXJBc3Q7XG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgVGhlIGFuaW1hdGlvbiB0cmlnZ2VyIFwiJHtuYW1lfVwiIGhhcyBmYWlsZWQgdG8gYnVpbGQgZHVlIHRvIHRoZSBmb2xsb3dpbmcgZXJyb3JzOlxcbiAtICR7ZXJyb3JzLmpvaW4oXCJcXG4gLSBcIil9YCk7XG4gICAgICB9XG4gICAgICB0cmlnZ2VyID0gYnVpbGRUcmlnZ2VyKG5hbWUsIGFzdCk7XG4gICAgICB0aGlzLl90cmlnZ2VyQ2FjaGVbY2FjaGVLZXldID0gdHJpZ2dlcjtcbiAgICB9XG4gICAgdGhpcy5fdHJhbnNpdGlvbkVuZ2luZS5yZWdpc3RlclRyaWdnZXIobmFtZXNwYWNlSWQsIG5hbWUsIHRyaWdnZXIpO1xuICB9XG5cbiAgcmVnaXN0ZXIobmFtZXNwYWNlSWQ6IHN0cmluZywgaG9zdEVsZW1lbnQ6IGFueSkge1xuICAgIHRoaXMuX3RyYW5zaXRpb25FbmdpbmUucmVnaXN0ZXIobmFtZXNwYWNlSWQsIGhvc3RFbGVtZW50KTtcbiAgfVxuXG4gIGRlc3Ryb3kobmFtZXNwYWNlSWQ6IHN0cmluZywgY29udGV4dDogYW55KSB7XG4gICAgdGhpcy5fdHJhbnNpdGlvbkVuZ2luZS5kZXN0cm95KG5hbWVzcGFjZUlkLCBjb250ZXh0KTtcbiAgfVxuXG4gIG9uSW5zZXJ0KG5hbWVzcGFjZUlkOiBzdHJpbmcsIGVsZW1lbnQ6IGFueSwgcGFyZW50OiBhbnksIGluc2VydEJlZm9yZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX3RyYW5zaXRpb25FbmdpbmUuaW5zZXJ0Tm9kZShuYW1lc3BhY2VJZCwgZWxlbWVudCwgcGFyZW50LCBpbnNlcnRCZWZvcmUpO1xuICB9XG5cbiAgb25SZW1vdmUobmFtZXNwYWNlSWQ6IHN0cmluZywgZWxlbWVudDogYW55LCBjb250ZXh0OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl90cmFuc2l0aW9uRW5naW5lLnJlbW92ZU5vZGUobmFtZXNwYWNlSWQsIGVsZW1lbnQsIGNvbnRleHQpO1xuICB9XG5cbiAgZGlzYWJsZUFuaW1hdGlvbnMoZWxlbWVudDogYW55LCBkaXNhYmxlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdHJhbnNpdGlvbkVuZ2luZS5tYXJrRWxlbWVudEFzRGlzYWJsZWQoZWxlbWVudCwgZGlzYWJsZSk7XG4gIH1cblxuICBwcm9jZXNzKG5hbWVzcGFjZUlkOiBzdHJpbmcsIGVsZW1lbnQ6IGFueSwgcHJvcGVydHk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmIChwcm9wZXJ0eS5jaGFyQXQoMCkgPT0gJ0AnKSB7XG4gICAgICBjb25zdCBbaWQsIGFjdGlvbl0gPSBwYXJzZVRpbWVsaW5lQ29tbWFuZChwcm9wZXJ0eSk7XG4gICAgICBjb25zdCBhcmdzID0gdmFsdWUgYXMgYW55W107XG4gICAgICB0aGlzLl90aW1lbGluZUVuZ2luZS5jb21tYW5kKGlkLCBlbGVtZW50LCBhY3Rpb24sIGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90cmFuc2l0aW9uRW5naW5lLnRyaWdnZXIobmFtZXNwYWNlSWQsIGVsZW1lbnQsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgbGlzdGVuKFxuICAgICAgbmFtZXNwYWNlSWQ6IHN0cmluZywgZWxlbWVudDogYW55LCBldmVudE5hbWU6IHN0cmluZywgZXZlbnRQaGFzZTogc3RyaW5nLFxuICAgICAgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBhbnkpOiAoKSA9PiBhbnkge1xuICAgIC8vIEBAbGlzdGVuXG4gICAgaWYgKGV2ZW50TmFtZS5jaGFyQXQoMCkgPT0gJ0AnKSB7XG4gICAgICBjb25zdCBbaWQsIGFjdGlvbl0gPSBwYXJzZVRpbWVsaW5lQ29tbWFuZChldmVudE5hbWUpO1xuICAgICAgcmV0dXJuIHRoaXMuX3RpbWVsaW5lRW5naW5lLmxpc3RlbihpZCwgZWxlbWVudCwgYWN0aW9uLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl90cmFuc2l0aW9uRW5naW5lLmxpc3RlbihuYW1lc3BhY2VJZCwgZWxlbWVudCwgZXZlbnROYW1lLCBldmVudFBoYXNlLCBjYWxsYmFjayk7XG4gIH1cblxuICBmbHVzaChtaWNyb3Rhc2tJZDogbnVtYmVyID0gLTEpOiB2b2lkIHsgdGhpcy5fdHJhbnNpdGlvbkVuZ2luZS5mbHVzaChtaWNyb3Rhc2tJZCk7IH1cblxuICBnZXQgcGxheWVycygpOiBBbmltYXRpb25QbGF5ZXJbXSB7XG4gICAgcmV0dXJuICh0aGlzLl90cmFuc2l0aW9uRW5naW5lLnBsYXllcnMgYXMgQW5pbWF0aW9uUGxheWVyW10pXG4gICAgICAgIC5jb25jYXQodGhpcy5fdGltZWxpbmVFbmdpbmUucGxheWVycyBhcyBBbmltYXRpb25QbGF5ZXJbXSk7XG4gIH1cblxuICB3aGVuUmVuZGVyaW5nRG9uZSgpOiBQcm9taXNlPGFueT4geyByZXR1cm4gdGhpcy5fdHJhbnNpdGlvbkVuZ2luZS53aGVuUmVuZGVyaW5nRG9uZSgpOyB9XG59XG4iXX0=