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
/**
 * @return {?}
 */
export function ngDevModeResetPerfCounters() {
    /** @type {?} */
    const newCounters = {
        firstTemplatePass: 0,
        tNode: 0,
        tView: 0,
        rendererCreateTextNode: 0,
        rendererSetText: 0,
        rendererCreateElement: 0,
        rendererAddEventListener: 0,
        rendererSetAttribute: 0,
        rendererRemoveAttribute: 0,
        rendererSetProperty: 0,
        rendererSetClassName: 0,
        rendererAddClass: 0,
        rendererRemoveClass: 0,
        rendererSetStyle: 0,
        rendererRemoveStyle: 0,
        rendererDestroy: 0,
        rendererDestroyNode: 0,
        rendererMoveNode: 0,
        rendererRemoveNode: 0,
    };
    // NOTE: Under Ivy we may have both window & global defined in the Node
    //    environment since ensureDocument() in render3.ts sets global.window.
    if (typeof window != 'undefined') {
        // Make sure to refer to ngDevMode as ['ngDevMode'] for closure.
        (/** @type {?} */ (window))['ngDevMode'] = newCounters;
    }
    if (typeof global != 'undefined') {
        // Make sure to refer to ngDevMode as ['ngDevMode'] for closure.
        (/** @type {?} */ (global))['ngDevMode'] = newCounters;
    }
    if (typeof self != 'undefined') {
        // Make sure to refer to ngDevMode as ['ngDevMode'] for closure.
        (/** @type {?} */ (self))['ngDevMode'] = newCounters;
    }
    return newCounters;
}
/**
 * This checks to see if the `ngDevMode` has been set. If yes,
 * than we honor it, otherwise we default to dev mode with additional checks.
 *
 * The idea is that unless we are doing production build where we explicitly
 * set `ngDevMode == false` we should be helping the developer by providing
 * as much early warning and errors as possible.
 */
if (typeof ngDevMode === 'undefined' || ngDevMode) {
    ngDevModeResetPerfCounters();
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfZGV2X21vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL25nX2Rldl9tb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBb0NBLE1BQU07O0lBQ0osTUFBTSxXQUFXLEdBQTBCO1FBQ3pDLGlCQUFpQixFQUFFLENBQUM7UUFDcEIsS0FBSyxFQUFFLENBQUM7UUFDUixLQUFLLEVBQUUsQ0FBQztRQUNSLHNCQUFzQixFQUFFLENBQUM7UUFDekIsZUFBZSxFQUFFLENBQUM7UUFDbEIscUJBQXFCLEVBQUUsQ0FBQztRQUN4Qix3QkFBd0IsRUFBRSxDQUFDO1FBQzNCLG9CQUFvQixFQUFFLENBQUM7UUFDdkIsdUJBQXVCLEVBQUUsQ0FBQztRQUMxQixtQkFBbUIsRUFBRSxDQUFDO1FBQ3RCLG9CQUFvQixFQUFFLENBQUM7UUFDdkIsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQixtQkFBbUIsRUFBRSxDQUFDO1FBQ3RCLGdCQUFnQixFQUFFLENBQUM7UUFDbkIsbUJBQW1CLEVBQUUsQ0FBQztRQUN0QixlQUFlLEVBQUUsQ0FBQztRQUNsQixtQkFBbUIsRUFBRSxDQUFDO1FBQ3RCLGdCQUFnQixFQUFFLENBQUM7UUFDbkIsa0JBQWtCLEVBQUUsQ0FBQztLQUN0QixDQUFDOzs7SUFHRixJQUFJLE9BQU8sTUFBTSxJQUFJLFdBQVcsRUFBRTs7UUFFaEMsbUJBQUMsTUFBYSxFQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsV0FBVyxDQUFDO0tBQzVDO0lBQ0QsSUFBSSxPQUFPLE1BQU0sSUFBSSxXQUFXLEVBQUU7O1FBRWhDLG1CQUFDLE1BQWEsRUFBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLFdBQVcsQ0FBQztLQUM1QztJQUNELElBQUksT0FBTyxJQUFJLElBQUksV0FBVyxFQUFFOztRQUU5QixtQkFBQyxJQUFXLEVBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxXQUFXLENBQUM7S0FDMUM7SUFDRCxPQUFPLFdBQVcsQ0FBQztDQUNwQjs7Ozs7Ozs7O0FBVUQsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxFQUFFO0lBQ2pELDBCQUEwQixFQUFFLENBQUM7Q0FDOUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuZGVjbGFyZSBnbG9iYWwge1xuICBjb25zdCBuZ0Rldk1vZGU6IG51bGx8TmdEZXZNb2RlUGVyZkNvdW50ZXJzO1xuICBpbnRlcmZhY2UgTmdEZXZNb2RlUGVyZkNvdW50ZXJzIHtcbiAgICBmaXJzdFRlbXBsYXRlUGFzczogbnVtYmVyO1xuICAgIHROb2RlOiBudW1iZXI7XG4gICAgdFZpZXc6IG51bWJlcjtcbiAgICByZW5kZXJlckNyZWF0ZVRleHROb2RlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJTZXRUZXh0OiBudW1iZXI7XG4gICAgcmVuZGVyZXJDcmVhdGVFbGVtZW50OiBudW1iZXI7XG4gICAgcmVuZGVyZXJBZGRFdmVudExpc3RlbmVyOiBudW1iZXI7XG4gICAgcmVuZGVyZXJTZXRBdHRyaWJ1dGU6IG51bWJlcjtcbiAgICByZW5kZXJlclJlbW92ZUF0dHJpYnV0ZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyU2V0UHJvcGVydHk6IG51bWJlcjtcbiAgICByZW5kZXJlclNldENsYXNzTmFtZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyQWRkQ2xhc3M6IG51bWJlcjtcbiAgICByZW5kZXJlclJlbW92ZUNsYXNzOiBudW1iZXI7XG4gICAgcmVuZGVyZXJTZXRTdHlsZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyUmVtb3ZlU3R5bGU6IG51bWJlcjtcbiAgICByZW5kZXJlckRlc3Ryb3k6IG51bWJlcjtcbiAgICByZW5kZXJlckRlc3Ryb3lOb2RlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJNb3ZlTm9kZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyUmVtb3ZlTm9kZTogbnVtYmVyO1xuICB9XG59XG5cbmRlY2xhcmUgbGV0IGdsb2JhbDogYW55O1xuXG5leHBvcnQgZnVuY3Rpb24gbmdEZXZNb2RlUmVzZXRQZXJmQ291bnRlcnMoKTogTmdEZXZNb2RlUGVyZkNvdW50ZXJzIHtcbiAgY29uc3QgbmV3Q291bnRlcnM6IE5nRGV2TW9kZVBlcmZDb3VudGVycyA9IHtcbiAgICBmaXJzdFRlbXBsYXRlUGFzczogMCxcbiAgICB0Tm9kZTogMCxcbiAgICB0VmlldzogMCxcbiAgICByZW5kZXJlckNyZWF0ZVRleHROb2RlOiAwLFxuICAgIHJlbmRlcmVyU2V0VGV4dDogMCxcbiAgICByZW5kZXJlckNyZWF0ZUVsZW1lbnQ6IDAsXG4gICAgcmVuZGVyZXJBZGRFdmVudExpc3RlbmVyOiAwLFxuICAgIHJlbmRlcmVyU2V0QXR0cmlidXRlOiAwLFxuICAgIHJlbmRlcmVyUmVtb3ZlQXR0cmlidXRlOiAwLFxuICAgIHJlbmRlcmVyU2V0UHJvcGVydHk6IDAsXG4gICAgcmVuZGVyZXJTZXRDbGFzc05hbWU6IDAsXG4gICAgcmVuZGVyZXJBZGRDbGFzczogMCxcbiAgICByZW5kZXJlclJlbW92ZUNsYXNzOiAwLFxuICAgIHJlbmRlcmVyU2V0U3R5bGU6IDAsXG4gICAgcmVuZGVyZXJSZW1vdmVTdHlsZTogMCxcbiAgICByZW5kZXJlckRlc3Ryb3k6IDAsXG4gICAgcmVuZGVyZXJEZXN0cm95Tm9kZTogMCxcbiAgICByZW5kZXJlck1vdmVOb2RlOiAwLFxuICAgIHJlbmRlcmVyUmVtb3ZlTm9kZTogMCxcbiAgfTtcbiAgLy8gTk9URTogVW5kZXIgSXZ5IHdlIG1heSBoYXZlIGJvdGggd2luZG93ICYgZ2xvYmFsIGRlZmluZWQgaW4gdGhlIE5vZGVcbiAgLy8gICAgZW52aXJvbm1lbnQgc2luY2UgZW5zdXJlRG9jdW1lbnQoKSBpbiByZW5kZXIzLnRzIHNldHMgZ2xvYmFsLndpbmRvdy5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBNYWtlIHN1cmUgdG8gcmVmZXIgdG8gbmdEZXZNb2RlIGFzIFsnbmdEZXZNb2RlJ10gZm9yIGNsb3N1cmUuXG4gICAgKHdpbmRvdyBhcyBhbnkpWyduZ0Rldk1vZGUnXSA9IG5ld0NvdW50ZXJzO1xuICB9XG4gIGlmICh0eXBlb2YgZ2xvYmFsICE9ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gTWFrZSBzdXJlIHRvIHJlZmVyIHRvIG5nRGV2TW9kZSBhcyBbJ25nRGV2TW9kZSddIGZvciBjbG9zdXJlLlxuICAgIChnbG9iYWwgYXMgYW55KVsnbmdEZXZNb2RlJ10gPSBuZXdDb3VudGVycztcbiAgfVxuICBpZiAodHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBNYWtlIHN1cmUgdG8gcmVmZXIgdG8gbmdEZXZNb2RlIGFzIFsnbmdEZXZNb2RlJ10gZm9yIGNsb3N1cmUuXG4gICAgKHNlbGYgYXMgYW55KVsnbmdEZXZNb2RlJ10gPSBuZXdDb3VudGVycztcbiAgfVxuICByZXR1cm4gbmV3Q291bnRlcnM7XG59XG5cbi8qKlxuICogVGhpcyBjaGVja3MgdG8gc2VlIGlmIHRoZSBgbmdEZXZNb2RlYCBoYXMgYmVlbiBzZXQuIElmIHllcyxcbiAqIHRoYW4gd2UgaG9ub3IgaXQsIG90aGVyd2lzZSB3ZSBkZWZhdWx0IHRvIGRldiBtb2RlIHdpdGggYWRkaXRpb25hbCBjaGVja3MuXG4gKlxuICogVGhlIGlkZWEgaXMgdGhhdCB1bmxlc3Mgd2UgYXJlIGRvaW5nIHByb2R1Y3Rpb24gYnVpbGQgd2hlcmUgd2UgZXhwbGljaXRseVxuICogc2V0IGBuZ0Rldk1vZGUgPT0gZmFsc2VgIHdlIHNob3VsZCBiZSBoZWxwaW5nIHRoZSBkZXZlbG9wZXIgYnkgcHJvdmlkaW5nXG4gKiBhcyBtdWNoIGVhcmx5IHdhcm5pbmcgYW5kIGVycm9ycyBhcyBwb3NzaWJsZS5cbiAqL1xuaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICBuZ0Rldk1vZGVSZXNldFBlcmZDb3VudGVycygpO1xufVxuIl19