/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { global } from '../util';
/**
 * A scope function for the Web Tracing Framework (WTF).
 *
 * \@experimental
 * @record
 */
export function WtfScopeFn() { }
/**
 * @record
 */
function WTF() { }
/** @type {?} */
WTF.prototype.trace;
/**
 * @record
 */
function Trace() { }
/** @type {?} */
Trace.prototype.events;
/** @type {?} */
Trace.prototype.leaveScope;
/** @type {?} */
Trace.prototype.beginTimeRange;
/** @type {?} */
Trace.prototype.endTimeRange;
/**
 * @record
 */
export function Range() { }
/**
 * @record
 */
function Events() { }
/** @type {?} */
Events.prototype.createScope;
/**
 * @record
 */
export function Scope() { }
/** @type {?} */
let trace;
/** @type {?} */
let events;
/**
 * @return {?}
 */
export function detectWTF() {
    /** @type {?} */
    const wtf = (/** @type {?} */ (global /** TODO #9100 */) /** TODO #9100 */)['wtf'];
    if (wtf) {
        trace = wtf['trace'];
        if (trace) {
            events = trace['events'];
            return true;
        }
    }
    return false;
}
/**
 * @param {?} signature
 * @param {?=} flags
 * @return {?}
 */
export function createScope(signature, flags = null) {
    return events.createScope(signature, flags);
}
/**
 * @template T
 * @param {?} scope
 * @param {?=} returnValue
 * @return {?}
 */
export function leave(scope, returnValue) {
    trace.leaveScope(scope, returnValue);
    return returnValue;
}
/**
 * @param {?} rangeType
 * @param {?} action
 * @return {?}
 */
export function startTimeRange(rangeType, action) {
    return trace.beginTimeRange(rangeType, action);
}
/**
 * @param {?} range
 * @return {?}
 */
export function endTimeRange(range) {
    trace.endTimeRange(range);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3RmX2ltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9wcm9maWxlL3d0Zl9pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0Qi9CLElBQUksS0FBSyxDQUFROztBQUNqQixJQUFJLE1BQU0sQ0FBUzs7OztBQUVuQixNQUFNOztJQUNKLE1BQU0sR0FBRyxHQUFRLG1CQUFDLE1BQWEsQ0FBQyxpQkFBaUIsb0JBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxJQUFJLEdBQUcsRUFBRTtRQUNQLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsSUFBSSxLQUFLLEVBQUU7WUFDVCxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFDO0NBQ2Q7Ozs7OztBQUVELE1BQU0sc0JBQXNCLFNBQWlCLEVBQUUsUUFBYSxJQUFJO0lBQzlELE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDN0M7Ozs7Ozs7QUFJRCxNQUFNLGdCQUFtQixLQUFZLEVBQUUsV0FBaUI7SUFDdEQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDckMsT0FBTyxXQUFXLENBQUM7Q0FDcEI7Ozs7OztBQUVELE1BQU0seUJBQXlCLFNBQWlCLEVBQUUsTUFBYztJQUM5RCxPQUFPLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQ2hEOzs7OztBQUVELE1BQU0sdUJBQXVCLEtBQVk7SUFDdkMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtnbG9iYWx9IGZyb20gJy4uL3V0aWwnO1xuXG4vKipcbiAqIEEgc2NvcGUgZnVuY3Rpb24gZm9yIHRoZSBXZWIgVHJhY2luZyBGcmFtZXdvcmsgKFdURikuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIFd0ZlNjb3BlRm4geyAoYXJnMD86IGFueSwgYXJnMT86IGFueSk6IGFueTsgfVxuXG5pbnRlcmZhY2UgV1RGIHtcbiAgdHJhY2U6IFRyYWNlO1xufVxuXG5pbnRlcmZhY2UgVHJhY2Uge1xuICBldmVudHM6IEV2ZW50cztcbiAgbGVhdmVTY29wZShzY29wZTogU2NvcGUsIHJldHVyblZhbHVlOiBhbnkpOiBhbnkgLyoqIFRPRE8gIzkxMDAgKi87XG4gIGJlZ2luVGltZVJhbmdlKHJhbmdlVHlwZTogc3RyaW5nLCBhY3Rpb246IHN0cmluZyk6IFJhbmdlO1xuICBlbmRUaW1lUmFuZ2UocmFuZ2U6IFJhbmdlKTogYW55IC8qKiBUT0RPICM5MTAwICovO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlIHt9XG5cbmludGVyZmFjZSBFdmVudHMge1xuICBjcmVhdGVTY29wZShzaWduYXR1cmU6IHN0cmluZywgZmxhZ3M6IGFueSk6IFNjb3BlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNjb3BlIHsgKC4uLmFyZ3M6IGFueVtdIC8qKiBUT0RPICM5MTAwICovKTogYW55OyB9XG5cbmxldCB0cmFjZTogVHJhY2U7XG5sZXQgZXZlbnRzOiBFdmVudHM7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RXVEYoKTogYm9vbGVhbiB7XG4gIGNvbnN0IHd0ZjogV1RGID0gKGdsb2JhbCBhcyBhbnkgLyoqIFRPRE8gIzkxMDAgKi8pWyd3dGYnXTtcbiAgaWYgKHd0Zikge1xuICAgIHRyYWNlID0gd3RmWyd0cmFjZSddO1xuICAgIGlmICh0cmFjZSkge1xuICAgICAgZXZlbnRzID0gdHJhY2VbJ2V2ZW50cyddO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNjb3BlKHNpZ25hdHVyZTogc3RyaW5nLCBmbGFnczogYW55ID0gbnVsbCk6IGFueSB7XG4gIHJldHVybiBldmVudHMuY3JlYXRlU2NvcGUoc2lnbmF0dXJlLCBmbGFncyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsZWF2ZTxUPihzY29wZTogU2NvcGUpOiB2b2lkO1xuZXhwb3J0IGZ1bmN0aW9uIGxlYXZlPFQ+KHNjb3BlOiBTY29wZSwgcmV0dXJuVmFsdWU/OiBUKTogVDtcbmV4cG9ydCBmdW5jdGlvbiBsZWF2ZTxUPihzY29wZTogU2NvcGUsIHJldHVyblZhbHVlPzogYW55KTogYW55IHtcbiAgdHJhY2UubGVhdmVTY29wZShzY29wZSwgcmV0dXJuVmFsdWUpO1xuICByZXR1cm4gcmV0dXJuVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydFRpbWVSYW5nZShyYW5nZVR5cGU6IHN0cmluZywgYWN0aW9uOiBzdHJpbmcpOiBSYW5nZSB7XG4gIHJldHVybiB0cmFjZS5iZWdpblRpbWVSYW5nZShyYW5nZVR5cGUsIGFjdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmRUaW1lUmFuZ2UocmFuZ2U6IFJhbmdlKTogdm9pZCB7XG4gIHRyYWNlLmVuZFRpbWVSYW5nZShyYW5nZSk7XG59XG4iXX0=