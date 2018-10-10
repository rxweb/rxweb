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
import { assertReservedSlotInitialized, bindingUpdated, bindingUpdated2, bindingUpdated4, checkAndUpdateBinding, consumeBinding, getCreationMode, moveBindingIndexToReservedSlot, restoreBindingIndex } from './instructions';
/**
 * If the value hasn't been saved, calls the pure function to store and return the
 * value. If it has been saved, returns the saved value.
 *
 * @template T
 * @param {?} slotOffset the offset in the reserved slot space {\@link reserveSlots}
 * @param {?} pureFn Function that returns a value
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} value
 */
export function pureFunction0(slotOffset, pureFn, thisArg) {
    ngDevMode && assertReservedSlotInitialized(slotOffset, 1);
    /** @type {?} */
    const index = moveBindingIndexToReservedSlot(slotOffset);
    /** @type {?} */
    const value = getCreationMode() ?
        checkAndUpdateBinding(thisArg ? pureFn.call(thisArg) : pureFn()) :
        consumeBinding();
    restoreBindingIndex(index);
    return value;
}
/**
 * If the value of the provided exp has changed, calls the pure function to return
 * an updated value. Or if the value has not changed, returns cached value.
 *
 * @param {?} slotOffset the offset in the reserved slot space {\@link reserveSlots}
 * @param {?} pureFn Function that returns an updated value
 * @param {?} exp Updated expression value
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction1(slotOffset, pureFn, exp, thisArg) {
    ngDevMode && assertReservedSlotInitialized(slotOffset, 2);
    /** @type {?} */
    const index = moveBindingIndexToReservedSlot(slotOffset);
    /** @type {?} */
    const value = bindingUpdated(exp) ?
        checkAndUpdateBinding(thisArg ? pureFn.call(thisArg, exp) : pureFn(exp)) :
        consumeBinding();
    restoreBindingIndex(index);
    return value;
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset in the reserved slot space {\@link reserveSlots}
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction2(slotOffset, pureFn, exp1, exp2, thisArg) {
    ngDevMode && assertReservedSlotInitialized(slotOffset, 3);
    /** @type {?} */
    const index = moveBindingIndexToReservedSlot(slotOffset);
    /** @type {?} */
    const value = bindingUpdated2(exp1, exp2) ?
        checkAndUpdateBinding(thisArg ? pureFn.call(thisArg, exp1, exp2) : pureFn(exp1, exp2)) :
        consumeBinding();
    restoreBindingIndex(index);
    return value;
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset in the reserved slot space {\@link reserveSlots}
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction3(slotOffset, pureFn, exp1, exp2, exp3, thisArg) {
    ngDevMode && assertReservedSlotInitialized(slotOffset, 4);
    /** @type {?} */
    const index = moveBindingIndexToReservedSlot(slotOffset);
    /** @type {?} */
    const different = bindingUpdated2(exp1, exp2);
    /** @type {?} */
    const value = bindingUpdated(exp3) || different ?
        checkAndUpdateBinding(thisArg ? pureFn.call(thisArg, exp1, exp2, exp3) : pureFn(exp1, exp2, exp3)) :
        consumeBinding();
    restoreBindingIndex(index);
    return value;
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset in the reserved slot space {\@link reserveSlots}
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?} exp4
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction4(slotOffset, pureFn, exp1, exp2, exp3, exp4, thisArg) {
    ngDevMode && assertReservedSlotInitialized(slotOffset, 5);
    /** @type {?} */
    const index = moveBindingIndexToReservedSlot(slotOffset);
    /** @type {?} */
    const value = bindingUpdated4(exp1, exp2, exp3, exp4) ?
        checkAndUpdateBinding(thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4) : pureFn(exp1, exp2, exp3, exp4)) :
        consumeBinding();
    restoreBindingIndex(index);
    return value;
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset in the reserved slot space {\@link reserveSlots}
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?} exp4
 * @param {?} exp5
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction5(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, thisArg) {
    ngDevMode && assertReservedSlotInitialized(slotOffset, 6);
    /** @type {?} */
    const index = moveBindingIndexToReservedSlot(slotOffset);
    /** @type {?} */
    const different = bindingUpdated4(exp1, exp2, exp3, exp4);
    /** @type {?} */
    const value = bindingUpdated(exp5) || different ?
        checkAndUpdateBinding(thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5) :
            pureFn(exp1, exp2, exp3, exp4, exp5)) :
        consumeBinding();
    restoreBindingIndex(index);
    return value;
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset in the reserved slot space {\@link reserveSlots}
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?} exp4
 * @param {?} exp5
 * @param {?} exp6
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction6(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, thisArg) {
    ngDevMode && assertReservedSlotInitialized(slotOffset, 7);
    /** @type {?} */
    const index = moveBindingIndexToReservedSlot(slotOffset);
    /** @type {?} */
    const different = bindingUpdated4(exp1, exp2, exp3, exp4);
    /** @type {?} */
    const value = bindingUpdated2(exp5, exp6) || different ?
        checkAndUpdateBinding(thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6) :
            pureFn(exp1, exp2, exp3, exp4, exp5, exp6)) :
        consumeBinding();
    restoreBindingIndex(index);
    return value;
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset in the reserved slot space {\@link reserveSlots}
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?} exp4
 * @param {?} exp5
 * @param {?} exp6
 * @param {?} exp7
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction7(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, exp7, thisArg) {
    ngDevMode && assertReservedSlotInitialized(slotOffset, 8);
    /** @type {?} */
    const index = moveBindingIndexToReservedSlot(slotOffset);
    /** @type {?} */
    let different = bindingUpdated4(exp1, exp2, exp3, exp4);
    different = bindingUpdated2(exp5, exp6) || different;
    /** @type {?} */
    const value = bindingUpdated(exp7) || different ?
        checkAndUpdateBinding(thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6, exp7) :
            pureFn(exp1, exp2, exp3, exp4, exp5, exp6, exp7)) :
        consumeBinding();
    restoreBindingIndex(index);
    return value;
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset in the reserved slot space {\@link reserveSlots}
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?} exp4
 * @param {?} exp5
 * @param {?} exp6
 * @param {?} exp7
 * @param {?} exp8
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction8(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8, thisArg) {
    ngDevMode && assertReservedSlotInitialized(slotOffset, 9);
    /** @type {?} */
    const index = moveBindingIndexToReservedSlot(slotOffset);
    /** @type {?} */
    const different = bindingUpdated4(exp1, exp2, exp3, exp4);
    /** @type {?} */
    const value = bindingUpdated4(exp5, exp6, exp7, exp8) || different ?
        checkAndUpdateBinding(thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8) :
            pureFn(exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8)) :
        consumeBinding();
    restoreBindingIndex(index);
    return value;
}
/**
 * pureFunction instruction that can support any number of bindings.
 *
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset in the reserved slot space {\@link reserveSlots}
 * @param {?} pureFn A pure function that takes binding values and builds an object or array
 * containing those values.
 * @param {?} exps An array of binding values
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunctionV(slotOffset, pureFn, exps, thisArg) {
    ngDevMode && assertReservedSlotInitialized(slotOffset, exps.length + 1);
    /** @type {?} */
    const index = moveBindingIndexToReservedSlot(slotOffset);
    /** @type {?} */
    let different = false;
    for (let i = 0; i < exps.length; i++) {
        bindingUpdated(exps[i]) && (different = true);
    }
    /** @type {?} */
    const value = different ? checkAndUpdateBinding(pureFn.apply(thisArg, exps)) : consumeBinding();
    restoreBindingIndex(index);
    return value;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyZV9mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvcHVyZV9mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyw2QkFBNkIsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxxQkFBcUIsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLDhCQUE4QixFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7O0FBYTVOLE1BQU0sd0JBQTJCLFVBQWtCLEVBQUUsTUFBZSxFQUFFLE9BQWE7SUFDakYsU0FBUyxJQUFJLDZCQUE2QixDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQzs7SUFDMUQsTUFBTSxLQUFLLEdBQUcsOEJBQThCLENBQUMsVUFBVSxDQUFDLENBQUM7O0lBQ3pELE1BQU0sS0FBSyxHQUFHLGVBQWUsRUFBRSxDQUFDLENBQUM7UUFDN0IscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEUsY0FBYyxFQUFFLENBQUM7SUFDckIsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsT0FBTyxLQUFLLENBQUM7Q0FDZDs7Ozs7Ozs7Ozs7QUFZRCxNQUFNLHdCQUNGLFVBQWtCLEVBQUUsTUFBdUIsRUFBRSxHQUFRLEVBQUUsT0FBYTtJQUN0RSxTQUFTLElBQUksNkJBQTZCLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDOztJQUMxRCxNQUFNLEtBQUssR0FBRyw4QkFBOEIsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7SUFDekQsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7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QUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsY0FBYyxFQUFFLENBQUM7SUFDckIsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsT0FBTyxLQUFLLENBQUM7Q0FDZDs7Ozs7Ozs7Ozs7Ozs7QUFlRCxNQUFNLHdCQUNGLFVBQWtCLEVBQUUsTUFBNEIsRUFBRSxJQUFXLEVBQUUsT0FBYTtJQUM5RSxTQUFTLElBQUksNkJBQTZCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0lBQ3hFLE1BQU0sS0FBSyxHQUFHLDhCQUE4QixDQUFDLFVBQVUsQ0FBQyxDQUFDOztJQUV6RCxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQy9DOztJQUNELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDaEcsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsT0FBTyxLQUFLLENBQUM7Q0FDZCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHthc3NlcnRSZXNlcnZlZFNsb3RJbml0aWFsaXplZCwgYmluZGluZ1VwZGF0ZWQsIGJpbmRpbmdVcGRhdGVkMiwgYmluZGluZ1VwZGF0ZWQ0LCBjaGVja0FuZFVwZGF0ZUJpbmRpbmcsIGNvbnN1bWVCaW5kaW5nLCBnZXRDcmVhdGlvbk1vZGUsIG1vdmVCaW5kaW5nSW5kZXhUb1Jlc2VydmVkU2xvdCwgcmVzdG9yZUJpbmRpbmdJbmRleH0gZnJvbSAnLi9pbnN0cnVjdGlvbnMnO1xuXG5cblxuLyoqXG4gKiBJZiB0aGUgdmFsdWUgaGFzbid0IGJlZW4gc2F2ZWQsIGNhbGxzIHRoZSBwdXJlIGZ1bmN0aW9uIHRvIHN0b3JlIGFuZCByZXR1cm4gdGhlXG4gKiB2YWx1ZS4gSWYgaXQgaGFzIGJlZW4gc2F2ZWQsIHJldHVybnMgdGhlIHNhdmVkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSBwdXJlRm4gRnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgdmFsdWVcbiAqIEBwYXJhbSBzbG90T2Zmc2V0IHRoZSBvZmZzZXQgaW4gdGhlIHJlc2VydmVkIHNsb3Qgc3BhY2Uge0BsaW5rIHJlc2VydmVTbG90c31cbiAqIEBwYXJhbSB0aGlzQXJnIE9wdGlvbmFsIGNhbGxpbmcgY29udGV4dCBvZiBwdXJlRm5cbiAqIEByZXR1cm5zIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwdXJlRnVuY3Rpb24wPFQ+KHNsb3RPZmZzZXQ6IG51bWJlciwgcHVyZUZuOiAoKSA9PiBULCB0aGlzQXJnPzogYW55KTogVCB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRSZXNlcnZlZFNsb3RJbml0aWFsaXplZChzbG90T2Zmc2V0LCAxKTtcbiAgY29uc3QgaW5kZXggPSBtb3ZlQmluZGluZ0luZGV4VG9SZXNlcnZlZFNsb3Qoc2xvdE9mZnNldCk7XG4gIGNvbnN0IHZhbHVlID0gZ2V0Q3JlYXRpb25Nb2RlKCkgP1xuICAgICAgY2hlY2tBbmRVcGRhdGVCaW5kaW5nKHRoaXNBcmcgPyBwdXJlRm4uY2FsbCh0aGlzQXJnKSA6IHB1cmVGbigpKSA6XG4gICAgICBjb25zdW1lQmluZGluZygpO1xuICByZXN0b3JlQmluZGluZ0luZGV4KGluZGV4KTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIElmIHRoZSB2YWx1ZSBvZiB0aGUgcHJvdmlkZWQgZXhwIGhhcyBjaGFuZ2VkLCBjYWxscyB0aGUgcHVyZSBmdW5jdGlvbiB0byByZXR1cm5cbiAqIGFuIHVwZGF0ZWQgdmFsdWUuIE9yIGlmIHRoZSB2YWx1ZSBoYXMgbm90IGNoYW5nZWQsIHJldHVybnMgY2FjaGVkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSBzbG90T2Zmc2V0IHRoZSBvZmZzZXQgaW4gdGhlIHJlc2VydmVkIHNsb3Qgc3BhY2Uge0BsaW5rIHJlc2VydmVTbG90c31cbiAqIEBwYXJhbSBwdXJlRm4gRnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIHVwZGF0ZWQgdmFsdWVcbiAqIEBwYXJhbSBleHAgVXBkYXRlZCBleHByZXNzaW9uIHZhbHVlXG4gKiBAcGFyYW0gdGhpc0FyZyBPcHRpb25hbCBjYWxsaW5nIGNvbnRleHQgb2YgcHVyZUZuXG4gKiBAcmV0dXJucyBVcGRhdGVkIG9yIGNhY2hlZCB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHVyZUZ1bmN0aW9uMShcbiAgICBzbG90T2Zmc2V0OiBudW1iZXIsIHB1cmVGbjogKHY6IGFueSkgPT4gYW55LCBleHA6IGFueSwgdGhpc0FyZz86IGFueSk6IGFueSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRSZXNlcnZlZFNsb3RJbml0aWFsaXplZChzbG90T2Zmc2V0LCAyKTtcbiAgY29uc3QgaW5kZXggPSBtb3ZlQmluZGluZ0luZGV4VG9SZXNlcnZlZFNsb3Qoc2xvdE9mZnNldCk7XG4gIGNvbnN0IHZhbHVlID0gYmluZGluZ1VwZGF0ZWQoZXhwKSA/XG4gICAgICBjaGVja0FuZFVwZGF0ZUJpbmRpbmcodGhpc0FyZyA/IHB1cmVGbi5jYWxsKHRoaXNBcmcsIGV4cCkgOiBwdXJlRm4oZXhwKSkgOlxuICAgICAgY29uc3VtZUJpbmRpbmcoKTtcbiAgcmVzdG9yZUJpbmRpbmdJbmRleChpbmRleCk7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBJZiB0aGUgdmFsdWUgb2YgYW55IHByb3ZpZGVkIGV4cCBoYXMgY2hhbmdlZCwgY2FsbHMgdGhlIHB1cmUgZnVuY3Rpb24gdG8gcmV0dXJuXG4gKiBhbiB1cGRhdGVkIHZhbHVlLiBPciBpZiBubyB2YWx1ZXMgaGF2ZSBjaGFuZ2VkLCByZXR1cm5zIGNhY2hlZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGluIHRoZSByZXNlcnZlZCBzbG90IHNwYWNlIHtAbGluayByZXNlcnZlU2xvdHN9XG4gKiBAcGFyYW0gcHVyZUZuXG4gKiBAcGFyYW0gZXhwMVxuICogQHBhcmFtIGV4cDJcbiAqIEBwYXJhbSB0aGlzQXJnIE9wdGlvbmFsIGNhbGxpbmcgY29udGV4dCBvZiBwdXJlRm5cbiAqIEByZXR1cm5zIFVwZGF0ZWQgb3IgY2FjaGVkIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwdXJlRnVuY3Rpb24yKFxuICAgIHNsb3RPZmZzZXQ6IG51bWJlciwgcHVyZUZuOiAodjE6IGFueSwgdjI6IGFueSkgPT4gYW55LCBleHAxOiBhbnksIGV4cDI6IGFueSxcbiAgICB0aGlzQXJnPzogYW55KTogYW55IHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydFJlc2VydmVkU2xvdEluaXRpYWxpemVkKHNsb3RPZmZzZXQsIDMpO1xuICBjb25zdCBpbmRleCA9IG1vdmVCaW5kaW5nSW5kZXhUb1Jlc2VydmVkU2xvdChzbG90T2Zmc2V0KTtcbiAgY29uc3QgdmFsdWUgPSBiaW5kaW5nVXBkYXRlZDIoZXhwMSwgZXhwMikgP1xuICAgICAgY2hlY2tBbmRVcGRhdGVCaW5kaW5nKHRoaXNBcmcgPyBwdXJlRm4uY2FsbCh0aGlzQXJnLCBleHAxLCBleHAyKSA6IHB1cmVGbihleHAxLCBleHAyKSkgOlxuICAgICAgY29uc3VtZUJpbmRpbmcoKTtcbiAgcmVzdG9yZUJpbmRpbmdJbmRleChpbmRleCk7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBJZiB0aGUgdmFsdWUgb2YgYW55IHByb3ZpZGVkIGV4cCBoYXMgY2hhbmdlZCwgY2FsbHMgdGhlIHB1cmUgZnVuY3Rpb24gdG8gcmV0dXJuXG4gKiBhbiB1cGRhdGVkIHZhbHVlLiBPciBpZiBubyB2YWx1ZXMgaGF2ZSBjaGFuZ2VkLCByZXR1cm5zIGNhY2hlZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGluIHRoZSByZXNlcnZlZCBzbG90IHNwYWNlIHtAbGluayByZXNlcnZlU2xvdHN9XG4gKiBAcGFyYW0gcHVyZUZuXG4gKiBAcGFyYW0gZXhwMVxuICogQHBhcmFtIGV4cDJcbiAqIEBwYXJhbSBleHAzXG4gKiBAcGFyYW0gdGhpc0FyZyBPcHRpb25hbCBjYWxsaW5nIGNvbnRleHQgb2YgcHVyZUZuXG4gKiBAcmV0dXJucyBVcGRhdGVkIG9yIGNhY2hlZCB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHVyZUZ1bmN0aW9uMyhcbiAgICBzbG90T2Zmc2V0OiBudW1iZXIsIHB1cmVGbjogKHYxOiBhbnksIHYyOiBhbnksIHYzOiBhbnkpID0+IGFueSwgZXhwMTogYW55LCBleHAyOiBhbnksIGV4cDM6IGFueSxcbiAgICB0aGlzQXJnPzogYW55KTogYW55IHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydFJlc2VydmVkU2xvdEluaXRpYWxpemVkKHNsb3RPZmZzZXQsIDQpO1xuICBjb25zdCBpbmRleCA9IG1vdmVCaW5kaW5nSW5kZXhUb1Jlc2VydmVkU2xvdChzbG90T2Zmc2V0KTtcbiAgY29uc3QgZGlmZmVyZW50ID0gYmluZGluZ1VwZGF0ZWQyKGV4cDEsIGV4cDIpO1xuICBjb25zdCB2YWx1ZSA9IGJpbmRpbmdVcGRhdGVkKGV4cDMpIHx8IGRpZmZlcmVudCA/XG4gICAgICBjaGVja0FuZFVwZGF0ZUJpbmRpbmcoXG4gICAgICAgICAgdGhpc0FyZyA/IHB1cmVGbi5jYWxsKHRoaXNBcmcsIGV4cDEsIGV4cDIsIGV4cDMpIDogcHVyZUZuKGV4cDEsIGV4cDIsIGV4cDMpKSA6XG4gICAgICBjb25zdW1lQmluZGluZygpO1xuICByZXN0b3JlQmluZGluZ0luZGV4KGluZGV4KTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIElmIHRoZSB2YWx1ZSBvZiBhbnkgcHJvdmlkZWQgZXhwIGhhcyBjaGFuZ2VkLCBjYWxscyB0aGUgcHVyZSBmdW5jdGlvbiB0byByZXR1cm5cbiAqIGFuIHVwZGF0ZWQgdmFsdWUuIE9yIGlmIG5vIHZhbHVlcyBoYXZlIGNoYW5nZWQsIHJldHVybnMgY2FjaGVkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSBzbG90T2Zmc2V0IHRoZSBvZmZzZXQgaW4gdGhlIHJlc2VydmVkIHNsb3Qgc3BhY2Uge0BsaW5rIHJlc2VydmVTbG90c31cbiAqIEBwYXJhbSBwdXJlRm5cbiAqIEBwYXJhbSBleHAxXG4gKiBAcGFyYW0gZXhwMlxuICogQHBhcmFtIGV4cDNcbiAqIEBwYXJhbSBleHA0XG4gKiBAcGFyYW0gdGhpc0FyZyBPcHRpb25hbCBjYWxsaW5nIGNvbnRleHQgb2YgcHVyZUZuXG4gKiBAcmV0dXJucyBVcGRhdGVkIG9yIGNhY2hlZCB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHVyZUZ1bmN0aW9uNChcbiAgICBzbG90T2Zmc2V0OiBudW1iZXIsIHB1cmVGbjogKHYxOiBhbnksIHYyOiBhbnksIHYzOiBhbnksIHY0OiBhbnkpID0+IGFueSwgZXhwMTogYW55LCBleHAyOiBhbnksXG4gICAgZXhwMzogYW55LCBleHA0OiBhbnksIHRoaXNBcmc/OiBhbnkpOiBhbnkge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0UmVzZXJ2ZWRTbG90SW5pdGlhbGl6ZWQoc2xvdE9mZnNldCwgNSk7XG4gIGNvbnN0IGluZGV4ID0gbW92ZUJpbmRpbmdJbmRleFRvUmVzZXJ2ZWRTbG90KHNsb3RPZmZzZXQpO1xuICBjb25zdCB2YWx1ZSA9IGJpbmRpbmdVcGRhdGVkNChleHAxLCBleHAyLCBleHAzLCBleHA0KSA/XG4gICAgICBjaGVja0FuZFVwZGF0ZUJpbmRpbmcoXG4gICAgICAgICAgdGhpc0FyZyA/IHB1cmVGbi5jYWxsKHRoaXNBcmcsIGV4cDEsIGV4cDIsIGV4cDMsIGV4cDQpIDogcHVyZUZuKGV4cDEsIGV4cDIsIGV4cDMsIGV4cDQpKSA6XG4gICAgICBjb25zdW1lQmluZGluZygpO1xuICByZXN0b3JlQmluZGluZ0luZGV4KGluZGV4KTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIElmIHRoZSB2YWx1ZSBvZiBhbnkgcHJvdmlkZWQgZXhwIGhhcyBjaGFuZ2VkLCBjYWxscyB0aGUgcHVyZSBmdW5jdGlvbiB0byByZXR1cm5cbiAqIGFuIHVwZGF0ZWQgdmFsdWUuIE9yIGlmIG5vIHZhbHVlcyBoYXZlIGNoYW5nZWQsIHJldHVybnMgY2FjaGVkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSBzbG90T2Zmc2V0IHRoZSBvZmZzZXQgaW4gdGhlIHJlc2VydmVkIHNsb3Qgc3BhY2Uge0BsaW5rIHJlc2VydmVTbG90c31cbiAqIEBwYXJhbSBwdXJlRm5cbiAqIEBwYXJhbSBleHAxXG4gKiBAcGFyYW0gZXhwMlxuICogQHBhcmFtIGV4cDNcbiAqIEBwYXJhbSBleHA0XG4gKiBAcGFyYW0gZXhwNVxuICogQHBhcmFtIHRoaXNBcmcgT3B0aW9uYWwgY2FsbGluZyBjb250ZXh0IG9mIHB1cmVGblxuICogQHJldHVybnMgVXBkYXRlZCBvciBjYWNoZWQgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHB1cmVGdW5jdGlvbjUoXG4gICAgc2xvdE9mZnNldDogbnVtYmVyLCBwdXJlRm46ICh2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55LCB2NTogYW55KSA9PiBhbnksIGV4cDE6IGFueSxcbiAgICBleHAyOiBhbnksIGV4cDM6IGFueSwgZXhwNDogYW55LCBleHA1OiBhbnksIHRoaXNBcmc/OiBhbnkpOiBhbnkge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0UmVzZXJ2ZWRTbG90SW5pdGlhbGl6ZWQoc2xvdE9mZnNldCwgNik7XG4gIGNvbnN0IGluZGV4ID0gbW92ZUJpbmRpbmdJbmRleFRvUmVzZXJ2ZWRTbG90KHNsb3RPZmZzZXQpO1xuICBjb25zdCBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZDQoZXhwMSwgZXhwMiwgZXhwMywgZXhwNCk7XG4gIGNvbnN0IHZhbHVlID0gYmluZGluZ1VwZGF0ZWQoZXhwNSkgfHwgZGlmZmVyZW50ID9cbiAgICAgIGNoZWNrQW5kVXBkYXRlQmluZGluZyhcbiAgICAgICAgICB0aGlzQXJnID8gcHVyZUZuLmNhbGwodGhpc0FyZywgZXhwMSwgZXhwMiwgZXhwMywgZXhwNCwgZXhwNSkgOlxuICAgICAgICAgICAgICAgICAgICBwdXJlRm4oZXhwMSwgZXhwMiwgZXhwMywgZXhwNCwgZXhwNSkpIDpcbiAgICAgIGNvbnN1bWVCaW5kaW5nKCk7XG4gIHJlc3RvcmVCaW5kaW5nSW5kZXgoaW5kZXgpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogSWYgdGhlIHZhbHVlIG9mIGFueSBwcm92aWRlZCBleHAgaGFzIGNoYW5nZWQsIGNhbGxzIHRoZSBwdXJlIGZ1bmN0aW9uIHRvIHJldHVyblxuICogYW4gdXBkYXRlZCB2YWx1ZS4gT3IgaWYgbm8gdmFsdWVzIGhhdmUgY2hhbmdlZCwgcmV0dXJucyBjYWNoZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBpbiB0aGUgcmVzZXJ2ZWQgc2xvdCBzcGFjZSB7QGxpbmsgcmVzZXJ2ZVNsb3RzfVxuICogQHBhcmFtIHB1cmVGblxuICogQHBhcmFtIGV4cDFcbiAqIEBwYXJhbSBleHAyXG4gKiBAcGFyYW0gZXhwM1xuICogQHBhcmFtIGV4cDRcbiAqIEBwYXJhbSBleHA1XG4gKiBAcGFyYW0gZXhwNlxuICogQHBhcmFtIHRoaXNBcmcgT3B0aW9uYWwgY2FsbGluZyBjb250ZXh0IG9mIHB1cmVGblxuICogQHJldHVybnMgVXBkYXRlZCBvciBjYWNoZWQgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHB1cmVGdW5jdGlvbjYoXG4gICAgc2xvdE9mZnNldDogbnVtYmVyLCBwdXJlRm46ICh2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55LCB2NTogYW55LCB2NjogYW55KSA9PiBhbnksXG4gICAgZXhwMTogYW55LCBleHAyOiBhbnksIGV4cDM6IGFueSwgZXhwNDogYW55LCBleHA1OiBhbnksIGV4cDY6IGFueSwgdGhpc0FyZz86IGFueSk6IGFueSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRSZXNlcnZlZFNsb3RJbml0aWFsaXplZChzbG90T2Zmc2V0LCA3KTtcbiAgY29uc3QgaW5kZXggPSBtb3ZlQmluZGluZ0luZGV4VG9SZXNlcnZlZFNsb3Qoc2xvdE9mZnNldCk7XG4gIGNvbnN0IGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkNChleHAxLCBleHAyLCBleHAzLCBleHA0KTtcbiAgY29uc3QgdmFsdWUgPSBiaW5kaW5nVXBkYXRlZDIoZXhwNSwgZXhwNikgfHwgZGlmZmVyZW50ID9cbiAgICAgIGNoZWNrQW5kVXBkYXRlQmluZGluZyhcbiAgICAgICAgICB0aGlzQXJnID8gcHVyZUZuLmNhbGwodGhpc0FyZywgZXhwMSwgZXhwMiwgZXhwMywgZXhwNCwgZXhwNSwgZXhwNikgOlxuICAgICAgICAgICAgICAgICAgICBwdXJlRm4oZXhwMSwgZXhwMiwgZXhwMywgZXhwNCwgZXhwNSwgZXhwNikpIDpcbiAgICAgIGNvbnN1bWVCaW5kaW5nKCk7XG4gIHJlc3RvcmVCaW5kaW5nSW5kZXgoaW5kZXgpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogSWYgdGhlIHZhbHVlIG9mIGFueSBwcm92aWRlZCBleHAgaGFzIGNoYW5nZWQsIGNhbGxzIHRoZSBwdXJlIGZ1bmN0aW9uIHRvIHJldHVyblxuICogYW4gdXBkYXRlZCB2YWx1ZS4gT3IgaWYgbm8gdmFsdWVzIGhhdmUgY2hhbmdlZCwgcmV0dXJucyBjYWNoZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBpbiB0aGUgcmVzZXJ2ZWQgc2xvdCBzcGFjZSB7QGxpbmsgcmVzZXJ2ZVNsb3RzfVxuICogQHBhcmFtIHB1cmVGblxuICogQHBhcmFtIGV4cDFcbiAqIEBwYXJhbSBleHAyXG4gKiBAcGFyYW0gZXhwM1xuICogQHBhcmFtIGV4cDRcbiAqIEBwYXJhbSBleHA1XG4gKiBAcGFyYW0gZXhwNlxuICogQHBhcmFtIGV4cDdcbiAqIEBwYXJhbSB0aGlzQXJnIE9wdGlvbmFsIGNhbGxpbmcgY29udGV4dCBvZiBwdXJlRm5cbiAqIEByZXR1cm5zIFVwZGF0ZWQgb3IgY2FjaGVkIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwdXJlRnVuY3Rpb243KFxuICAgIHNsb3RPZmZzZXQ6IG51bWJlcixcbiAgICBwdXJlRm46ICh2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55LCB2NTogYW55LCB2NjogYW55LCB2NzogYW55KSA9PiBhbnksIGV4cDE6IGFueSxcbiAgICBleHAyOiBhbnksIGV4cDM6IGFueSwgZXhwNDogYW55LCBleHA1OiBhbnksIGV4cDY6IGFueSwgZXhwNzogYW55LCB0aGlzQXJnPzogYW55KTogYW55IHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydFJlc2VydmVkU2xvdEluaXRpYWxpemVkKHNsb3RPZmZzZXQsIDgpO1xuICBjb25zdCBpbmRleCA9IG1vdmVCaW5kaW5nSW5kZXhUb1Jlc2VydmVkU2xvdChzbG90T2Zmc2V0KTtcbiAgbGV0IGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkNChleHAxLCBleHAyLCBleHAzLCBleHA0KTtcbiAgZGlmZmVyZW50ID0gYmluZGluZ1VwZGF0ZWQyKGV4cDUsIGV4cDYpIHx8IGRpZmZlcmVudDtcbiAgY29uc3QgdmFsdWUgPSBiaW5kaW5nVXBkYXRlZChleHA3KSB8fCBkaWZmZXJlbnQgP1xuICAgICAgY2hlY2tBbmRVcGRhdGVCaW5kaW5nKFxuICAgICAgICAgIHRoaXNBcmcgPyBwdXJlRm4uY2FsbCh0aGlzQXJnLCBleHAxLCBleHAyLCBleHAzLCBleHA0LCBleHA1LCBleHA2LCBleHA3KSA6XG4gICAgICAgICAgICAgICAgICAgIHB1cmVGbihleHAxLCBleHAyLCBleHAzLCBleHA0LCBleHA1LCBleHA2LCBleHA3KSkgOlxuICAgICAgY29uc3VtZUJpbmRpbmcoKTtcbiAgcmVzdG9yZUJpbmRpbmdJbmRleChpbmRleCk7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBJZiB0aGUgdmFsdWUgb2YgYW55IHByb3ZpZGVkIGV4cCBoYXMgY2hhbmdlZCwgY2FsbHMgdGhlIHB1cmUgZnVuY3Rpb24gdG8gcmV0dXJuXG4gKiBhbiB1cGRhdGVkIHZhbHVlLiBPciBpZiBubyB2YWx1ZXMgaGF2ZSBjaGFuZ2VkLCByZXR1cm5zIGNhY2hlZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGluIHRoZSByZXNlcnZlZCBzbG90IHNwYWNlIHtAbGluayByZXNlcnZlU2xvdHN9XG4gKiBAcGFyYW0gcHVyZUZuXG4gKiBAcGFyYW0gZXhwMVxuICogQHBhcmFtIGV4cDJcbiAqIEBwYXJhbSBleHAzXG4gKiBAcGFyYW0gZXhwNFxuICogQHBhcmFtIGV4cDVcbiAqIEBwYXJhbSBleHA2XG4gKiBAcGFyYW0gZXhwN1xuICogQHBhcmFtIGV4cDhcbiAqIEBwYXJhbSB0aGlzQXJnIE9wdGlvbmFsIGNhbGxpbmcgY29udGV4dCBvZiBwdXJlRm5cbiAqIEByZXR1cm5zIFVwZGF0ZWQgb3IgY2FjaGVkIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwdXJlRnVuY3Rpb244KFxuICAgIHNsb3RPZmZzZXQ6IG51bWJlcixcbiAgICBwdXJlRm46ICh2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55LCB2NTogYW55LCB2NjogYW55LCB2NzogYW55LCB2ODogYW55KSA9PiBhbnksXG4gICAgZXhwMTogYW55LCBleHAyOiBhbnksIGV4cDM6IGFueSwgZXhwNDogYW55LCBleHA1OiBhbnksIGV4cDY6IGFueSwgZXhwNzogYW55LCBleHA4OiBhbnksXG4gICAgdGhpc0FyZz86IGFueSk6IGFueSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRSZXNlcnZlZFNsb3RJbml0aWFsaXplZChzbG90T2Zmc2V0LCA5KTtcbiAgY29uc3QgaW5kZXggPSBtb3ZlQmluZGluZ0luZGV4VG9SZXNlcnZlZFNsb3Qoc2xvdE9mZnNldCk7XG4gIGNvbnN0IGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkNChleHAxLCBleHAyLCBleHAzLCBleHA0KTtcbiAgY29uc3QgdmFsdWUgPSBiaW5kaW5nVXBkYXRlZDQoZXhwNSwgZXhwNiwgZXhwNywgZXhwOCkgfHwgZGlmZmVyZW50ID9cbiAgICAgIGNoZWNrQW5kVXBkYXRlQmluZGluZyhcbiAgICAgICAgICB0aGlzQXJnID8gcHVyZUZuLmNhbGwodGhpc0FyZywgZXhwMSwgZXhwMiwgZXhwMywgZXhwNCwgZXhwNSwgZXhwNiwgZXhwNywgZXhwOCkgOlxuICAgICAgICAgICAgICAgICAgICBwdXJlRm4oZXhwMSwgZXhwMiwgZXhwMywgZXhwNCwgZXhwNSwgZXhwNiwgZXhwNywgZXhwOCkpIDpcbiAgICAgIGNvbnN1bWVCaW5kaW5nKCk7XG4gIHJlc3RvcmVCaW5kaW5nSW5kZXgoaW5kZXgpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogcHVyZUZ1bmN0aW9uIGluc3RydWN0aW9uIHRoYXQgY2FuIHN1cHBvcnQgYW55IG51bWJlciBvZiBiaW5kaW5ncy5cbiAqXG4gKiBJZiB0aGUgdmFsdWUgb2YgYW55IHByb3ZpZGVkIGV4cCBoYXMgY2hhbmdlZCwgY2FsbHMgdGhlIHB1cmUgZnVuY3Rpb24gdG8gcmV0dXJuXG4gKiBhbiB1cGRhdGVkIHZhbHVlLiBPciBpZiBubyB2YWx1ZXMgaGF2ZSBjaGFuZ2VkLCByZXR1cm5zIGNhY2hlZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGluIHRoZSByZXNlcnZlZCBzbG90IHNwYWNlIHtAbGluayByZXNlcnZlU2xvdHN9XG4gKiBAcGFyYW0gcHVyZUZuIEEgcHVyZSBmdW5jdGlvbiB0aGF0IHRha2VzIGJpbmRpbmcgdmFsdWVzIGFuZCBidWlsZHMgYW4gb2JqZWN0IG9yIGFycmF5XG4gKiBjb250YWluaW5nIHRob3NlIHZhbHVlcy5cbiAqIEBwYXJhbSBleHBzIEFuIGFycmF5IG9mIGJpbmRpbmcgdmFsdWVzXG4gKiBAcGFyYW0gdGhpc0FyZyBPcHRpb25hbCBjYWxsaW5nIGNvbnRleHQgb2YgcHVyZUZuXG4gKiBAcmV0dXJucyBVcGRhdGVkIG9yIGNhY2hlZCB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHVyZUZ1bmN0aW9uVihcbiAgICBzbG90T2Zmc2V0OiBudW1iZXIsIHB1cmVGbjogKC4uLnY6IGFueVtdKSA9PiBhbnksIGV4cHM6IGFueVtdLCB0aGlzQXJnPzogYW55KTogYW55IHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydFJlc2VydmVkU2xvdEluaXRpYWxpemVkKHNsb3RPZmZzZXQsIGV4cHMubGVuZ3RoICsgMSk7XG4gIGNvbnN0IGluZGV4ID0gbW92ZUJpbmRpbmdJbmRleFRvUmVzZXJ2ZWRTbG90KHNsb3RPZmZzZXQpO1xuXG4gIGxldCBkaWZmZXJlbnQgPSBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBleHBzLmxlbmd0aDsgaSsrKSB7XG4gICAgYmluZGluZ1VwZGF0ZWQoZXhwc1tpXSkgJiYgKGRpZmZlcmVudCA9IHRydWUpO1xuICB9XG4gIGNvbnN0IHZhbHVlID0gZGlmZmVyZW50ID8gY2hlY2tBbmRVcGRhdGVCaW5kaW5nKHB1cmVGbi5hcHBseSh0aGlzQXJnLCBleHBzKSkgOiBjb25zdW1lQmluZGluZygpO1xuICByZXN0b3JlQmluZGluZ0luZGV4KGluZGV4KTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuIl19