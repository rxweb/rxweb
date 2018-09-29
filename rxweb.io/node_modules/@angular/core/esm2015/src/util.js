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
/** @type {?} */
const __window = typeof window !== 'undefined' && window;
/** @type {?} */
const __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
/** @type {?} */
const __global = typeof global !== 'undefined' && global;
/** @type {?} */
const _global = __global || __window || __self;
/** @type {?} */
const promise = Promise.resolve(0);
export { _global as global };
/** @type {?} */
let _symbolIterator = null;
/**
 * @return {?}
 */
export function getSymbolIterator() {
    if (!_symbolIterator) {
        /** @type {?} */
        const Symbol = _global['Symbol'];
        if (Symbol && Symbol.iterator) {
            _symbolIterator = Symbol.iterator;
        }
        else {
            /** @type {?} */
            const keys = Object.getOwnPropertyNames(Map.prototype);
            for (let i = 0; i < keys.length; ++i) {
                /** @type {?} */
                const key = keys[i];
                if (key !== 'entries' && key !== 'size' &&
                    (/** @type {?} */ (Map)).prototype[key] === Map.prototype['entries']) {
                    _symbolIterator = key;
                }
            }
        }
    }
    return _symbolIterator;
}
/**
 * @param {?} fn
 * @return {?}
 */
export function scheduleMicroTask(fn) {
    if (typeof Zone === 'undefined') {
        // use promise to schedule microTask instead of use Zone
        promise.then(() => { fn && fn.apply(null, null); });
    }
    else {
        Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
    }
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function looseIdentical(a, b) {
    return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
}
/**
 * @param {?} token
 * @return {?}
 */
export function stringify(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (token instanceof Array) {
        return '[' + token.map(stringify).join(', ') + ']';
    }
    if (token == null) {
        return '' + token;
    }
    if (token.overriddenName) {
        return `${token.overriddenName}`;
    }
    if (token.name) {
        return `${token.name}`;
    }
    /** @type {?} */
    const res = token.toString();
    if (res == null) {
        return '' + res;
    }
    /** @type {?} */
    const newLineIndex = res.indexOf('\n');
    return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBY0EsTUFBTSxRQUFRLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQzs7QUFDekQsTUFBTSxNQUFNLEdBQUcsT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLE9BQU8saUJBQWlCLEtBQUssV0FBVztJQUNsRixJQUFJLFlBQVksaUJBQWlCLElBQUksSUFBSSxDQUFDOztBQUM5QyxNQUFNLFFBQVEsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDOztBQUl6RCxNQUFNLE9BQU8sR0FBMEIsUUFBUSxJQUFJLFFBQVEsSUFBSSxNQUFNLENBQUM7O0FBRXRFLE1BQU0sT0FBTyxHQUFpQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBTWpELE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLENBQUM7O0FBSTNCLElBQUksZUFBZSxHQUFRLElBQUksQ0FBQzs7OztBQUNoQyxNQUFNO0lBQ0osSUFBSSxDQUFDLGVBQWUsRUFBRTs7UUFDcEIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDN0IsZUFBZSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDbkM7YUFBTTs7WUFFTCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFOztnQkFDcEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFLLE1BQU07b0JBQ25DLG1CQUFDLEdBQVUsRUFBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUM1RCxlQUFlLEdBQUcsR0FBRyxDQUFDO2lCQUN2QjthQUNGO1NBQ0Y7S0FDRjtJQUNELE9BQU8sZUFBZSxDQUFDO0NBQ3hCOzs7OztBQUVELE1BQU0sNEJBQTRCLEVBQVk7SUFDNUMsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7O1FBRS9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3JEO1NBQU07UUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3pEO0NBQ0Y7Ozs7OztBQUdELE1BQU0seUJBQXlCLENBQU0sRUFBRSxDQUFNO0lBQzNDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDMUY7Ozs7O0FBRUQsTUFBTSxvQkFBb0IsS0FBVTtJQUNsQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUM3QixPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsSUFBSSxLQUFLLFlBQVksS0FBSyxFQUFFO1FBQzFCLE9BQU8sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztLQUNwRDtJQUVELElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtRQUNqQixPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUM7S0FDbkI7SUFFRCxJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUU7UUFDeEIsT0FBTyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNsQztJQUVELElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtRQUNkLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7O0lBRUQsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRTdCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtRQUNmLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQztLQUNqQjs7SUFFRCxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLE9BQU8sWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO0NBQ25FIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBUT0RPKGp0ZXBsaXR6NjAyKTogTG9hZCBXb3JrZXJHbG9iYWxTY29wZSBmcm9tIGxpYi53ZWJ3b3JrZXIuZC50cyBmaWxlICMzNDkyXG5kZWNsYXJlIHZhciBXb3JrZXJHbG9iYWxTY29wZTogYW55IC8qKiBUT0RPICM5MTAwICovO1xuLy8gQ29tbW9uSlMgLyBOb2RlIGhhdmUgZ2xvYmFsIGNvbnRleHQgZXhwb3NlZCBhcyBcImdsb2JhbFwiIHZhcmlhYmxlLlxuLy8gV2UgZG9uJ3Qgd2FudCB0byBpbmNsdWRlIHRoZSB3aG9sZSBub2RlLmQudHMgdGhpcyB0aGlzIGNvbXBpbGF0aW9uIHVuaXQgc28gd2UnbGwganVzdCBmYWtlXG4vLyB0aGUgZ2xvYmFsIFwiZ2xvYmFsXCIgdmFyIGZvciBub3cuXG5kZWNsYXJlIHZhciBnbG9iYWw6IGFueSAvKiogVE9ETyAjOTEwMCAqLztcbmNvbnN0IF9fd2luZG93ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93O1xuY29uc3QgX19zZWxmID0gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiYgc2VsZjtcbmNvbnN0IF9fZ2xvYmFsID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsO1xuXG4vLyBDaGVjayBfX2dsb2JhbCBmaXJzdCwgYmVjYXVzZSBpbiBOb2RlIHRlc3RzIGJvdGggX19nbG9iYWwgYW5kIF9fd2luZG93IG1heSBiZSBkZWZpbmVkIGFuZCBfZ2xvYmFsXG4vLyBzaG91bGQgYmUgX19nbG9iYWwgaW4gdGhhdCBjYXNlLlxuY29uc3QgX2dsb2JhbDoge1tuYW1lOiBzdHJpbmddOiBhbnl9ID0gX19nbG9iYWwgfHwgX193aW5kb3cgfHwgX19zZWxmO1xuXG5jb25zdCBwcm9taXNlOiBQcm9taXNlPGFueT4gPSBQcm9taXNlLnJlc29sdmUoMCk7XG4vKipcbiAqIEF0dGVudGlvbjogd2hlbmV2ZXIgcHJvdmlkaW5nIGEgbmV3IHZhbHVlLCBiZSBzdXJlIHRvIGFkZCBhblxuICogZW50cnkgaW50byB0aGUgY29ycmVzcG9uZGluZyBgLi4uLmV4dGVybnMuanNgIGZpbGUsXG4gKiBzbyB0aGF0IGNsb3N1cmUgd29uJ3QgdXNlIHRoYXQgZ2xvYmFsIGZvciBpdHMgcHVycG9zZXMuXG4gKi9cbmV4cG9ydCB7X2dsb2JhbCBhcyBnbG9iYWx9O1xuXG4vLyBXaGVuIFN5bWJvbC5pdGVyYXRvciBkb2Vzbid0IGV4aXN0LCByZXRyaWV2ZXMgdGhlIGtleSB1c2VkIGluIGVzNi1zaGltXG5kZWNsYXJlIGNvbnN0IFN5bWJvbDogYW55O1xubGV0IF9zeW1ib2xJdGVyYXRvcjogYW55ID0gbnVsbDtcbmV4cG9ydCBmdW5jdGlvbiBnZXRTeW1ib2xJdGVyYXRvcigpOiBzdHJpbmd8c3ltYm9sIHtcbiAgaWYgKCFfc3ltYm9sSXRlcmF0b3IpIHtcbiAgICBjb25zdCBTeW1ib2wgPSBfZ2xvYmFsWydTeW1ib2wnXTtcbiAgICBpZiAoU3ltYm9sICYmIFN5bWJvbC5pdGVyYXRvcikge1xuICAgICAgX3N5bWJvbEl0ZXJhdG9yID0gU3ltYm9sLml0ZXJhdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlczYtc2hpbSBzcGVjaWZpYyBsb2dpY1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE1hcC5wcm90b3R5cGUpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICAgIGlmIChrZXkgIT09ICdlbnRyaWVzJyAmJiBrZXkgIT09ICdzaXplJyAmJlxuICAgICAgICAgICAgKE1hcCBhcyBhbnkpLnByb3RvdHlwZVtrZXldID09PSBNYXAucHJvdG90eXBlWydlbnRyaWVzJ10pIHtcbiAgICAgICAgICBfc3ltYm9sSXRlcmF0b3IgPSBrZXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIF9zeW1ib2xJdGVyYXRvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlTWljcm9UYXNrKGZuOiBGdW5jdGlvbikge1xuICBpZiAodHlwZW9mIFpvbmUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gdXNlIHByb21pc2UgdG8gc2NoZWR1bGUgbWljcm9UYXNrIGluc3RlYWQgb2YgdXNlIFpvbmVcbiAgICBwcm9taXNlLnRoZW4oKCkgPT4geyBmbiAmJiBmbi5hcHBseShudWxsLCBudWxsKTsgfSk7XG4gIH0gZWxzZSB7XG4gICAgWm9uZS5jdXJyZW50LnNjaGVkdWxlTWljcm9UYXNrKCdzY2hlZHVsZU1pY3JvdGFzaycsIGZuKTtcbiAgfVxufVxuXG4vLyBKUyBoYXMgTmFOICE9PSBOYU5cbmV4cG9ydCBmdW5jdGlvbiBsb29zZUlkZW50aWNhbChhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gYSA9PT0gYiB8fCB0eXBlb2YgYSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGIgPT09ICdudW1iZXInICYmIGlzTmFOKGEpICYmIGlzTmFOKGIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KHRva2VuOiBhbnkpOiBzdHJpbmcge1xuICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIGlmICh0b2tlbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuICdbJyArIHRva2VuLm1hcChzdHJpbmdpZnkpLmpvaW4oJywgJykgKyAnXSc7XG4gIH1cblxuICBpZiAodG9rZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiAnJyArIHRva2VuO1xuICB9XG5cbiAgaWYgKHRva2VuLm92ZXJyaWRkZW5OYW1lKSB7XG4gICAgcmV0dXJuIGAke3Rva2VuLm92ZXJyaWRkZW5OYW1lfWA7XG4gIH1cblxuICBpZiAodG9rZW4ubmFtZSkge1xuICAgIHJldHVybiBgJHt0b2tlbi5uYW1lfWA7XG4gIH1cblxuICBjb25zdCByZXMgPSB0b2tlbi50b1N0cmluZygpO1xuXG4gIGlmIChyZXMgPT0gbnVsbCkge1xuICAgIHJldHVybiAnJyArIHJlcztcbiAgfVxuXG4gIGNvbnN0IG5ld0xpbmVJbmRleCA9IHJlcy5pbmRleE9mKCdcXG4nKTtcbiAgcmV0dXJuIG5ld0xpbmVJbmRleCA9PT0gLTEgPyByZXMgOiByZXMuc3Vic3RyaW5nKDAsIG5ld0xpbmVJbmRleCk7XG59XG4iXX0=