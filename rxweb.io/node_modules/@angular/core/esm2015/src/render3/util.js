/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { assertLessThan } from './assert';
import { HEADER_OFFSET } from './interfaces/view';
/**
 * Must use this method for CD (instead of === ) since NaN !== NaN
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function isDifferent(a, b) {
    // NaN is the only value that is not equal to itself so the first
    // test checks if both a and b are not NaN
    return !(a !== a && b !== b) && a !== b;
}
/**
 * @param {?} value
 * @return {?}
 */
export function stringify(value) {
    if (typeof value == 'function')
        return value.name || value;
    if (typeof value == 'string')
        return value;
    if (value == null)
        return '';
    return '' + value;
}
/**
 *  Function that throws a "not implemented" error so it's clear certain
 *  behaviors/methods aren't yet ready.
 *
 * @return {?} Not implemented error
 */
export function notImplemented() {
    return new Error('NotImplemented');
}
/**
 * Flattens an array in non-recursive way. Input arrays are not modified.
 * @param {?} list
 * @return {?}
 */
export function flatten(list) {
    /** @type {?} */
    const result = [];
    /** @type {?} */
    let i = 0;
    while (i < list.length) {
        /** @type {?} */
        const item = list[i];
        if (Array.isArray(item)) {
            if (item.length > 0) {
                list = item.concat(list.slice(i + 1));
                i = 0;
            }
            else {
                i++;
            }
        }
        else {
            result.push(item);
            i++;
        }
    }
    return result;
}
/**
 * Retrieves a value from any `LViewData`.
 * @template T
 * @param {?} index
 * @param {?} arr
 * @return {?}
 */
export function loadInternal(index, arr) {
    ngDevMode && assertDataInRangeInternal(index + HEADER_OFFSET, arr);
    return arr[index + HEADER_OFFSET];
}
/**
 * @param {?} index
 * @param {?} arr
 * @return {?}
 */
export function assertDataInRangeInternal(index, arr) {
    assertLessThan(index, arr ? arr.length : 0, 'index expected to be a valid data index');
}
/**
 * Retrieves an element value from the provided `viewData`.
 *
 * Elements that are read may be wrapped in a style context,
 * therefore reading the value may involve unwrapping that.
 * @param {?} index
 * @param {?} arr
 * @return {?}
 */
export function loadElementInternal(index, arr) {
    /** @type {?} */
    const value = loadInternal(index, arr);
    return readElementValue(value);
}
/**
 * @param {?} value
 * @return {?}
 */
export function readElementValue(value) {
    return /** @type {?} */ ((Array.isArray(value) ? (/** @type {?} */ ((value)))[0] : value));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBT0EsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUV4QyxPQUFPLEVBQUMsYUFBYSxFQUFZLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7QUFNM0QsTUFBTSxzQkFBc0IsQ0FBTSxFQUFFLENBQU07OztJQUd4QyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3pDOzs7OztBQUVELE1BQU0sb0JBQW9CLEtBQVU7SUFDbEMsSUFBSSxPQUFPLEtBQUssSUFBSSxVQUFVO1FBQUUsT0FBTyxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQztJQUMzRCxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUMzQyxJQUFJLEtBQUssSUFBSSxJQUFJO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFDN0IsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDO0NBQ25COzs7Ozs7O0FBUUQsTUFBTTtJQUNKLE9BQU8sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztDQUNwQzs7Ozs7O0FBS0QsTUFBTSxrQkFBa0IsSUFBVzs7SUFDakMsTUFBTSxNQUFNLEdBQVUsRUFBRSxDQUFDOztJQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFVixPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFOztRQUN0QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ25CLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDUDtpQkFBTTtnQkFDTCxDQUFDLEVBQUUsQ0FBQzthQUNMO1NBQ0Y7YUFBTTtZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsQ0FBQyxFQUFFLENBQUM7U0FDTDtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUM7Q0FDZjs7Ozs7Ozs7QUFHRCxNQUFNLHVCQUEwQixLQUFhLEVBQUUsR0FBYztJQUMzRCxTQUFTLElBQUkseUJBQXlCLENBQUMsS0FBSyxHQUFHLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuRSxPQUFPLEdBQUcsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUM7Q0FDbkM7Ozs7OztBQUVELE1BQU0sb0NBQW9DLEtBQWEsRUFBRSxHQUFVO0lBQ2pFLGNBQWMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUseUNBQXlDLENBQUMsQ0FBQztDQUN4Rjs7Ozs7Ozs7OztBQU9ELE1BQU0sOEJBQThCLEtBQWEsRUFBRSxHQUFjOztJQUMvRCxNQUFNLEtBQUssR0FBRyxZQUFZLENBQWUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDaEM7Ozs7O0FBRUQsTUFBTSwyQkFBMkIsS0FBMkI7SUFDMUQseUJBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBQyxLQUFZLEdBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFpQixFQUFDO0NBQ3BGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHthc3NlcnRMZXNzVGhhbn0gZnJvbSAnLi9hc3NlcnQnO1xuaW1wb3J0IHtMRWxlbWVudE5vZGV9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7SEVBREVSX09GRlNFVCwgTFZpZXdEYXRhfSBmcm9tICcuL2ludGVyZmFjZXMvdmlldyc7XG5cblxuLyoqXG4qIE11c3QgdXNlIHRoaXMgbWV0aG9kIGZvciBDRCAoaW5zdGVhZCBvZiA9PT0gKSBzaW5jZSBOYU4gIT09IE5hTlxuKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RpZmZlcmVudChhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICAvLyBOYU4gaXMgdGhlIG9ubHkgdmFsdWUgdGhhdCBpcyBub3QgZXF1YWwgdG8gaXRzZWxmIHNvIHRoZSBmaXJzdFxuICAvLyB0ZXN0IGNoZWNrcyBpZiBib3RoIGEgYW5kIGIgYXJlIG5vdCBOYU5cbiAgcmV0dXJuICEoYSAhPT0gYSAmJiBiICE9PSBiKSAmJiBhICE9PSBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHJldHVybiB2YWx1ZS5uYW1lIHx8IHZhbHVlO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSByZXR1cm4gdmFsdWU7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gJyc7XG4gIHJldHVybiAnJyArIHZhbHVlO1xufVxuXG4vKipcbiAqICBGdW5jdGlvbiB0aGF0IHRocm93cyBhIFwibm90IGltcGxlbWVudGVkXCIgZXJyb3Igc28gaXQncyBjbGVhciBjZXJ0YWluXG4gKiAgYmVoYXZpb3JzL21ldGhvZHMgYXJlbid0IHlldCByZWFkeS5cbiAqXG4gKiBAcmV0dXJucyBOb3QgaW1wbGVtZW50ZWQgZXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vdEltcGxlbWVudGVkKCk6IEVycm9yIHtcbiAgcmV0dXJuIG5ldyBFcnJvcignTm90SW1wbGVtZW50ZWQnKTtcbn1cblxuLyoqXG4gKiBGbGF0dGVucyBhbiBhcnJheSBpbiBub24tcmVjdXJzaXZlIHdheS4gSW5wdXQgYXJyYXlzIGFyZSBub3QgbW9kaWZpZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGxpc3Q6IGFueVtdKTogYW55W10ge1xuICBjb25zdCByZXN1bHQ6IGFueVtdID0gW107XG4gIGxldCBpID0gMDtcblxuICB3aGlsZSAoaSA8IGxpc3QubGVuZ3RoKSB7XG4gICAgY29uc3QgaXRlbSA9IGxpc3RbaV07XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgIGlmIChpdGVtLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGlzdCA9IGl0ZW0uY29uY2F0KGxpc3Quc2xpY2UoaSArIDEpKTtcbiAgICAgICAgaSA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgICAgaSsrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBSZXRyaWV2ZXMgYSB2YWx1ZSBmcm9tIGFueSBgTFZpZXdEYXRhYC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkSW50ZXJuYWw8VD4oaW5kZXg6IG51bWJlciwgYXJyOiBMVmlld0RhdGEpOiBUIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERhdGFJblJhbmdlSW50ZXJuYWwoaW5kZXggKyBIRUFERVJfT0ZGU0VULCBhcnIpO1xuICByZXR1cm4gYXJyW2luZGV4ICsgSEVBREVSX09GRlNFVF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnREYXRhSW5SYW5nZUludGVybmFsKGluZGV4OiBudW1iZXIsIGFycjogYW55W10pIHtcbiAgYXNzZXJ0TGVzc1RoYW4oaW5kZXgsIGFyciA/IGFyci5sZW5ndGggOiAwLCAnaW5kZXggZXhwZWN0ZWQgdG8gYmUgYSB2YWxpZCBkYXRhIGluZGV4Jyk7XG59XG5cbi8qKiBSZXRyaWV2ZXMgYW4gZWxlbWVudCB2YWx1ZSBmcm9tIHRoZSBwcm92aWRlZCBgdmlld0RhdGFgLlxuICAqXG4gICogRWxlbWVudHMgdGhhdCBhcmUgcmVhZCBtYXkgYmUgd3JhcHBlZCBpbiBhIHN0eWxlIGNvbnRleHQsXG4gICogdGhlcmVmb3JlIHJlYWRpbmcgdGhlIHZhbHVlIG1heSBpbnZvbHZlIHVud3JhcHBpbmcgdGhhdC5cbiAgKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkRWxlbWVudEludGVybmFsKGluZGV4OiBudW1iZXIsIGFycjogTFZpZXdEYXRhKTogTEVsZW1lbnROb2RlIHtcbiAgY29uc3QgdmFsdWUgPSBsb2FkSW50ZXJuYWw8TEVsZW1lbnROb2RlPihpbmRleCwgYXJyKTtcbiAgcmV0dXJuIHJlYWRFbGVtZW50VmFsdWUodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZEVsZW1lbnRWYWx1ZSh2YWx1ZTogTEVsZW1lbnROb2RlIHwgYW55W10pOiBMRWxlbWVudE5vZGUge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsdWUpID8gKHZhbHVlIGFzIGFueSBhcyBhbnlbXSlbMF0gOiB2YWx1ZSkgYXMgTEVsZW1lbnROb2RlO1xufVxuIl19