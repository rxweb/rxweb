/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { allowPreviousPlayerStylesMerge, balancePreviousStylesIntoKeyframes, copyStyles } from '../../util';
import { CssKeyframesDriver } from '../css_keyframes/css_keyframes_driver';
import { containsElement, invokeQuery, isBrowser, matchesElement, validateStyleProperty } from '../shared';
import { WebAnimationsPlayer } from './web_animations_player';
export class WebAnimationsDriver {
    constructor() {
        this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(getElementAnimateFn().toString());
        this._cssKeyframesDriver = new CssKeyframesDriver();
    }
    /**
     * @param {?} prop
     * @return {?}
     */
    validateStyleProperty(prop) { return validateStyleProperty(prop); }
    /**
     * @param {?} element
     * @param {?} selector
     * @return {?}
     */
    matchesElement(element, selector) {
        return matchesElement(element, selector);
    }
    /**
     * @param {?} elm1
     * @param {?} elm2
     * @return {?}
     */
    containsElement(elm1, elm2) { return containsElement(elm1, elm2); }
    /**
     * @param {?} element
     * @param {?} selector
     * @param {?} multi
     * @return {?}
     */
    query(element, selector, multi) {
        return invokeQuery(element, selector, multi);
    }
    /**
     * @param {?} element
     * @param {?} prop
     * @param {?=} defaultValue
     * @return {?}
     */
    computeStyle(element, prop, defaultValue) {
        return /** @type {?} */ ((/** @type {?} */ (window.getComputedStyle(element)))[prop]);
    }
    /**
     * @param {?} supported
     * @return {?}
     */
    overrideWebAnimationsSupport(supported) { this._isNativeImpl = supported; }
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @param {?=} scrubberAccessRequested
     * @return {?}
     */
    animate(element, keyframes, duration, delay, easing, previousPlayers = [], scrubberAccessRequested) {
        /** @type {?} */
        const useKeyframes = !scrubberAccessRequested && !this._isNativeImpl;
        if (useKeyframes) {
            return this._cssKeyframesDriver.animate(element, keyframes, duration, delay, easing, previousPlayers);
        }
        /** @type {?} */
        const fill = delay == 0 ? 'both' : 'forwards';
        /** @type {?} */
        const playerOptions = { duration, delay, fill };
        // we check for this to avoid having a null|undefined value be present
        // for the easing (which results in an error for certain browsers #9752)
        if (easing) {
            playerOptions['easing'] = easing;
        }
        /** @type {?} */
        const previousStyles = {};
        /** @type {?} */
        const previousWebAnimationPlayers = /** @type {?} */ (previousPlayers.filter(player => player instanceof WebAnimationsPlayer));
        if (allowPreviousPlayerStylesMerge(duration, delay)) {
            previousWebAnimationPlayers.forEach(player => {
                /** @type {?} */
                let styles = player.currentSnapshot;
                Object.keys(styles).forEach(prop => previousStyles[prop] = styles[prop]);
            });
        }
        keyframes = keyframes.map(styles => copyStyles(styles, false));
        keyframes = balancePreviousStylesIntoKeyframes(element, keyframes, previousStyles);
        return new WebAnimationsPlayer(element, keyframes, playerOptions);
    }
}
if (false) {
    /** @type {?} */
    WebAnimationsDriver.prototype._isNativeImpl;
    /** @type {?} */
    WebAnimationsDriver.prototype._cssKeyframesDriver;
}
/**
 * @return {?}
 */
export function supportsWebAnimations() {
    return typeof getElementAnimateFn() === 'function';
}
/**
 * @return {?}
 */
function getElementAnimateFn() {
    return (isBrowser() && (/** @type {?} */ (Element)).prototype['animate']) || {};
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViX2FuaW1hdGlvbnNfZHJpdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5pbWF0aW9ucy9icm93c2VyL3NyYy9yZW5kZXIvd2ViX2FuaW1hdGlvbnMvd2ViX2FuaW1hdGlvbnNfZHJpdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFTQSxPQUFPLEVBQUMsOEJBQThCLEVBQUUsa0NBQWtDLEVBQUUsVUFBVSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBRTFHLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxlQUFlLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFekcsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFNUQsTUFBTTs7NkJBQ29CLDZCQUE2QixDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO21DQUM5RCxJQUFJLGtCQUFrQixFQUFFOzs7Ozs7SUFFdEQscUJBQXFCLENBQUMsSUFBWSxJQUFhLE9BQU8scUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTs7Ozs7O0lBRXBGLGNBQWMsQ0FBQyxPQUFZLEVBQUUsUUFBZ0I7UUFDM0MsT0FBTyxjQUFjLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzFDOzs7Ozs7SUFFRCxlQUFlLENBQUMsSUFBUyxFQUFFLElBQVMsSUFBYSxPQUFPLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRTs7Ozs7OztJQUV0RixLQUFLLENBQUMsT0FBWSxFQUFFLFFBQWdCLEVBQUUsS0FBYztRQUNsRCxPQUFPLFdBQVcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzlDOzs7Ozs7O0lBRUQsWUFBWSxDQUFDLE9BQVksRUFBRSxJQUFZLEVBQUUsWUFBcUI7UUFDNUQseUJBQU8sbUJBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBUSxFQUFDLENBQUMsSUFBSSxDQUFXLEVBQUM7S0FDbEU7Ozs7O0lBRUQsNEJBQTRCLENBQUMsU0FBa0IsSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFOzs7Ozs7Ozs7OztJQUVwRixPQUFPLENBQ0gsT0FBWSxFQUFFLFNBQXVCLEVBQUUsUUFBZ0IsRUFBRSxLQUFhLEVBQUUsTUFBYyxFQUN0RixrQkFBcUMsRUFBRSxFQUFFLHVCQUFpQzs7UUFDNUUsTUFBTSxZQUFZLEdBQUcsQ0FBQyx1QkFBdUIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDckUsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUNuQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQ25FOztRQUVELE1BQU0sSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDOztRQUM5QyxNQUFNLGFBQWEsR0FBcUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDOzs7UUFHaEYsSUFBSSxNQUFNLEVBQUU7WUFDVixhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDO1NBQ2xDOztRQUVELE1BQU0sY0FBYyxHQUF5QixFQUFFLENBQUM7O1FBQ2hELE1BQU0sMkJBQTJCLHFCQUEwQixlQUFlLENBQUMsTUFBTSxDQUM3RSxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sWUFBWSxtQkFBbUIsQ0FBQyxFQUFDO1FBRXJELElBQUksOEJBQThCLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ25ELDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTs7Z0JBQzNDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7Z0JBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzFFLENBQUMsQ0FBQztTQUNKO1FBRUQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDL0QsU0FBUyxHQUFHLGtDQUFrQyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDbkYsT0FBTyxJQUFJLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7S0FDbkU7Q0FDRjs7Ozs7Ozs7OztBQUVELE1BQU07SUFDSixPQUFPLE9BQU8sbUJBQW1CLEVBQUUsS0FBSyxVQUFVLENBQUM7Q0FDcEQ7Ozs7QUFFRDtJQUNFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxtQkFBTSxPQUFPLEVBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FDbkUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0FuaW1hdGlvblBsYXllciwgybVTdHlsZURhdGF9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge2FsbG93UHJldmlvdXNQbGF5ZXJTdHlsZXNNZXJnZSwgYmFsYW5jZVByZXZpb3VzU3R5bGVzSW50b0tleWZyYW1lcywgY29weVN0eWxlc30gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge0FuaW1hdGlvbkRyaXZlcn0gZnJvbSAnLi4vYW5pbWF0aW9uX2RyaXZlcic7XG5pbXBvcnQge0Nzc0tleWZyYW1lc0RyaXZlcn0gZnJvbSAnLi4vY3NzX2tleWZyYW1lcy9jc3Nfa2V5ZnJhbWVzX2RyaXZlcic7XG5pbXBvcnQge2NvbnRhaW5zRWxlbWVudCwgaW52b2tlUXVlcnksIGlzQnJvd3NlciwgbWF0Y2hlc0VsZW1lbnQsIHZhbGlkYXRlU3R5bGVQcm9wZXJ0eX0gZnJvbSAnLi4vc2hhcmVkJztcblxuaW1wb3J0IHtXZWJBbmltYXRpb25zUGxheWVyfSBmcm9tICcuL3dlYl9hbmltYXRpb25zX3BsYXllcic7XG5cbmV4cG9ydCBjbGFzcyBXZWJBbmltYXRpb25zRHJpdmVyIGltcGxlbWVudHMgQW5pbWF0aW9uRHJpdmVyIHtcbiAgcHJpdmF0ZSBfaXNOYXRpdmVJbXBsID0gL1xce1xccypcXFtuYXRpdmVcXHMrY29kZVxcXVxccypcXH0vLnRlc3QoZ2V0RWxlbWVudEFuaW1hdGVGbigpLnRvU3RyaW5nKCkpO1xuICBwcml2YXRlIF9jc3NLZXlmcmFtZXNEcml2ZXIgPSBuZXcgQ3NzS2V5ZnJhbWVzRHJpdmVyKCk7XG5cbiAgdmFsaWRhdGVTdHlsZVByb3BlcnR5KHByb3A6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdmFsaWRhdGVTdHlsZVByb3BlcnR5KHByb3ApOyB9XG5cbiAgbWF0Y2hlc0VsZW1lbnQoZWxlbWVudDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1hdGNoZXNFbGVtZW50KGVsZW1lbnQsIHNlbGVjdG9yKTtcbiAgfVxuXG4gIGNvbnRhaW5zRWxlbWVudChlbG0xOiBhbnksIGVsbTI6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gY29udGFpbnNFbGVtZW50KGVsbTEsIGVsbTIpOyB9XG5cbiAgcXVlcnkoZWxlbWVudDogYW55LCBzZWxlY3Rvcjogc3RyaW5nLCBtdWx0aTogYm9vbGVhbik6IGFueVtdIHtcbiAgICByZXR1cm4gaW52b2tlUXVlcnkoZWxlbWVudCwgc2VsZWN0b3IsIG11bHRpKTtcbiAgfVxuXG4gIGNvbXB1dGVTdHlsZShlbGVtZW50OiBhbnksIHByb3A6IHN0cmluZywgZGVmYXVsdFZhbHVlPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIGFzIGFueSlbcHJvcF0gYXMgc3RyaW5nO1xuICB9XG5cbiAgb3ZlcnJpZGVXZWJBbmltYXRpb25zU3VwcG9ydChzdXBwb3J0ZWQ6IGJvb2xlYW4pIHsgdGhpcy5faXNOYXRpdmVJbXBsID0gc3VwcG9ydGVkOyB9XG5cbiAgYW5pbWF0ZShcbiAgICAgIGVsZW1lbnQ6IGFueSwga2V5ZnJhbWVzOiDJtVN0eWxlRGF0YVtdLCBkdXJhdGlvbjogbnVtYmVyLCBkZWxheTogbnVtYmVyLCBlYXNpbmc6IHN0cmluZyxcbiAgICAgIHByZXZpb3VzUGxheWVyczogQW5pbWF0aW9uUGxheWVyW10gPSBbXSwgc2NydWJiZXJBY2Nlc3NSZXF1ZXN0ZWQ/OiBib29sZWFuKTogQW5pbWF0aW9uUGxheWVyIHtcbiAgICBjb25zdCB1c2VLZXlmcmFtZXMgPSAhc2NydWJiZXJBY2Nlc3NSZXF1ZXN0ZWQgJiYgIXRoaXMuX2lzTmF0aXZlSW1wbDtcbiAgICBpZiAodXNlS2V5ZnJhbWVzKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY3NzS2V5ZnJhbWVzRHJpdmVyLmFuaW1hdGUoXG4gICAgICAgICAgZWxlbWVudCwga2V5ZnJhbWVzLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgcHJldmlvdXNQbGF5ZXJzKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaWxsID0gZGVsYXkgPT0gMCA/ICdib3RoJyA6ICdmb3J3YXJkcyc7XG4gICAgY29uc3QgcGxheWVyT3B0aW9uczoge1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcn0gPSB7ZHVyYXRpb24sIGRlbGF5LCBmaWxsfTtcbiAgICAvLyB3ZSBjaGVjayBmb3IgdGhpcyB0byBhdm9pZCBoYXZpbmcgYSBudWxsfHVuZGVmaW5lZCB2YWx1ZSBiZSBwcmVzZW50XG4gICAgLy8gZm9yIHRoZSBlYXNpbmcgKHdoaWNoIHJlc3VsdHMgaW4gYW4gZXJyb3IgZm9yIGNlcnRhaW4gYnJvd3NlcnMgIzk3NTIpXG4gICAgaWYgKGVhc2luZykge1xuICAgICAgcGxheWVyT3B0aW9uc1snZWFzaW5nJ10gPSBlYXNpbmc7XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlvdXNTdHlsZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgY29uc3QgcHJldmlvdXNXZWJBbmltYXRpb25QbGF5ZXJzID0gPFdlYkFuaW1hdGlvbnNQbGF5ZXJbXT5wcmV2aW91c1BsYXllcnMuZmlsdGVyKFxuICAgICAgICBwbGF5ZXIgPT4gcGxheWVyIGluc3RhbmNlb2YgV2ViQW5pbWF0aW9uc1BsYXllcik7XG5cbiAgICBpZiAoYWxsb3dQcmV2aW91c1BsYXllclN0eWxlc01lcmdlKGR1cmF0aW9uLCBkZWxheSkpIHtcbiAgICAgIHByZXZpb3VzV2ViQW5pbWF0aW9uUGxheWVycy5mb3JFYWNoKHBsYXllciA9PiB7XG4gICAgICAgIGxldCBzdHlsZXMgPSBwbGF5ZXIuY3VycmVudFNuYXBzaG90O1xuICAgICAgICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2gocHJvcCA9PiBwcmV2aW91c1N0eWxlc1twcm9wXSA9IHN0eWxlc1twcm9wXSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBrZXlmcmFtZXMgPSBrZXlmcmFtZXMubWFwKHN0eWxlcyA9PiBjb3B5U3R5bGVzKHN0eWxlcywgZmFsc2UpKTtcbiAgICBrZXlmcmFtZXMgPSBiYWxhbmNlUHJldmlvdXNTdHlsZXNJbnRvS2V5ZnJhbWVzKGVsZW1lbnQsIGtleWZyYW1lcywgcHJldmlvdXNTdHlsZXMpO1xuICAgIHJldHVybiBuZXcgV2ViQW5pbWF0aW9uc1BsYXllcihlbGVtZW50LCBrZXlmcmFtZXMsIHBsYXllck9wdGlvbnMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdXBwb3J0c1dlYkFuaW1hdGlvbnMoKSB7XG4gIHJldHVybiB0eXBlb2YgZ2V0RWxlbWVudEFuaW1hdGVGbigpID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBnZXRFbGVtZW50QW5pbWF0ZUZuKCk6IGFueSB7XG4gIHJldHVybiAoaXNCcm93c2VyKCkgJiYgKDxhbnk+RWxlbWVudCkucHJvdG90eXBlWydhbmltYXRlJ10pIHx8IHt9O1xufVxuIl19