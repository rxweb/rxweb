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
import { Pipe } from '@angular/core';
import { invalidPipeArgumentError } from './invalid_pipe_argument_error';
/**
 * \@ngModule CommonModule
 * \@description
 *
 * Creates a new `Array` or `String` containing a subset (slice) of the elements.
 *
 * \@usageNotes
 *
 * All behavior is based on the expected behavior of the JavaScript API `Array.prototype.slice()`
 * and `String.prototype.slice()`.
 *
 * When operating on an `Array`, the returned `Array` is always a copy even when all
 * the elements are being returned.
 *
 * When operating on a blank value, the pipe returns the blank value.
 *
 * ### List Example
 *
 * This `ngFor` example:
 *
 * {\@example common/pipes/ts/slice_pipe.ts region='SlicePipe_list'}
 *
 * produces the following:
 *
 * ```html
 * <li>b</li>
 * <li>c</li>
 * ```
 *
 * ### String Examples
 *
 * {\@example common/pipes/ts/slice_pipe.ts region='SlicePipe_string'}
 *
 */
export class SlicePipe {
    /**
     * @param {?} value a list or a string to be sliced.
     * @param {?} start the starting index of the subset to return:
     *   - **a positive integer**: return the item at `start` index and all items after
     *     in the list or string expression.
     *   - **a negative integer**: return the item at `start` index from the end and all items after
     *     in the list or string expression.
     *   - **if positive and greater than the size of the expression**: return an empty list or
     * string.
     *   - **if negative and greater than the size of the expression**: return entire list or string.
     * @param {?=} end the ending index of the subset to return:
     *   - **omitted**: return all items until the end.
     *   - **if positive**: return all items before `end` index of the list or string.
     *   - **if negative**: return all items before `end` index from the end of the list or string.
     * @return {?}
     */
    transform(value, start, end) {
        if (value == null)
            return value;
        if (!this.supports(value)) {
            throw invalidPipeArgumentError(SlicePipe, value);
        }
        return value.slice(start, end);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    supports(obj) { return typeof obj === 'string' || Array.isArray(obj); }
}
SlicePipe.decorators = [
    { type: Pipe, args: [{ name: 'slice', pure: false },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpY2VfcGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9zcmMvcGlwZXMvc2xpY2VfcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLCtCQUErQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNDdkUsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQkosU0FBUyxDQUFDLEtBQVUsRUFBRSxLQUFhLEVBQUUsR0FBWTtRQUMvQyxJQUFJLEtBQUssSUFBSSxJQUFJO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekIsTUFBTSx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDbEQ7UUFFRCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ2hDOzs7OztJQUVPLFFBQVEsQ0FBQyxHQUFRLElBQWEsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7O1lBM0I1RixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2ludmFsaWRQaXBlQXJndW1lbnRFcnJvcn0gZnJvbSAnLi9pbnZhbGlkX3BpcGVfYXJndW1lbnRfZXJyb3InO1xuXG4vKipcbiAqIEBuZ01vZHVsZSBDb21tb25Nb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIENyZWF0ZXMgYSBuZXcgYEFycmF5YCBvciBgU3RyaW5nYCBjb250YWluaW5nIGEgc3Vic2V0IChzbGljZSkgb2YgdGhlIGVsZW1lbnRzLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogQWxsIGJlaGF2aW9yIGlzIGJhc2VkIG9uIHRoZSBleHBlY3RlZCBiZWhhdmlvciBvZiB0aGUgSmF2YVNjcmlwdCBBUEkgYEFycmF5LnByb3RvdHlwZS5zbGljZSgpYFxuICogYW5kIGBTdHJpbmcucHJvdG90eXBlLnNsaWNlKClgLlxuICpcbiAqIFdoZW4gb3BlcmF0aW5nIG9uIGFuIGBBcnJheWAsIHRoZSByZXR1cm5lZCBgQXJyYXlgIGlzIGFsd2F5cyBhIGNvcHkgZXZlbiB3aGVuIGFsbFxuICogdGhlIGVsZW1lbnRzIGFyZSBiZWluZyByZXR1cm5lZC5cbiAqXG4gKiBXaGVuIG9wZXJhdGluZyBvbiBhIGJsYW5rIHZhbHVlLCB0aGUgcGlwZSByZXR1cm5zIHRoZSBibGFuayB2YWx1ZS5cbiAqXG4gKiAjIyMgTGlzdCBFeGFtcGxlXG4gKlxuICogVGhpcyBgbmdGb3JgIGV4YW1wbGU6XG4gKlxuICoge0BleGFtcGxlIGNvbW1vbi9waXBlcy90cy9zbGljZV9waXBlLnRzIHJlZ2lvbj0nU2xpY2VQaXBlX2xpc3QnfVxuICpcbiAqIHByb2R1Y2VzIHRoZSBmb2xsb3dpbmc6XG4gKlxuICogYGBgaHRtbFxuICogPGxpPmI8L2xpPlxuICogPGxpPmM8L2xpPlxuICogYGBgXG4gKlxuICogIyMjIFN0cmluZyBFeGFtcGxlc1xuICpcbiAqIHtAZXhhbXBsZSBjb21tb24vcGlwZXMvdHMvc2xpY2VfcGlwZS50cyByZWdpb249J1NsaWNlUGlwZV9zdHJpbmcnfVxuICpcbiAqL1xuXG5AUGlwZSh7bmFtZTogJ3NsaWNlJywgcHVyZTogZmFsc2V9KVxuZXhwb3J0IGNsYXNzIFNsaWNlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAvKipcbiAgICogQHBhcmFtIHZhbHVlIGEgbGlzdCBvciBhIHN0cmluZyB0byBiZSBzbGljZWQuXG4gICAqIEBwYXJhbSBzdGFydCB0aGUgc3RhcnRpbmcgaW5kZXggb2YgdGhlIHN1YnNldCB0byByZXR1cm46XG4gICAqICAgLSAqKmEgcG9zaXRpdmUgaW50ZWdlcioqOiByZXR1cm4gdGhlIGl0ZW0gYXQgYHN0YXJ0YCBpbmRleCBhbmQgYWxsIGl0ZW1zIGFmdGVyXG4gICAqICAgICBpbiB0aGUgbGlzdCBvciBzdHJpbmcgZXhwcmVzc2lvbi5cbiAgICogICAtICoqYSBuZWdhdGl2ZSBpbnRlZ2VyKio6IHJldHVybiB0aGUgaXRlbSBhdCBgc3RhcnRgIGluZGV4IGZyb20gdGhlIGVuZCBhbmQgYWxsIGl0ZW1zIGFmdGVyXG4gICAqICAgICBpbiB0aGUgbGlzdCBvciBzdHJpbmcgZXhwcmVzc2lvbi5cbiAgICogICAtICoqaWYgcG9zaXRpdmUgYW5kIGdyZWF0ZXIgdGhhbiB0aGUgc2l6ZSBvZiB0aGUgZXhwcmVzc2lvbioqOiByZXR1cm4gYW4gZW1wdHkgbGlzdCBvclxuICAgKiBzdHJpbmcuXG4gICAqICAgLSAqKmlmIG5lZ2F0aXZlIGFuZCBncmVhdGVyIHRoYW4gdGhlIHNpemUgb2YgdGhlIGV4cHJlc3Npb24qKjogcmV0dXJuIGVudGlyZSBsaXN0IG9yIHN0cmluZy5cbiAgICogQHBhcmFtIGVuZCB0aGUgZW5kaW5nIGluZGV4IG9mIHRoZSBzdWJzZXQgdG8gcmV0dXJuOlxuICAgKiAgIC0gKipvbWl0dGVkKio6IHJldHVybiBhbGwgaXRlbXMgdW50aWwgdGhlIGVuZC5cbiAgICogICAtICoqaWYgcG9zaXRpdmUqKjogcmV0dXJuIGFsbCBpdGVtcyBiZWZvcmUgYGVuZGAgaW5kZXggb2YgdGhlIGxpc3Qgb3Igc3RyaW5nLlxuICAgKiAgIC0gKippZiBuZWdhdGl2ZSoqOiByZXR1cm4gYWxsIGl0ZW1zIGJlZm9yZSBgZW5kYCBpbmRleCBmcm9tIHRoZSBlbmQgb2YgdGhlIGxpc3Qgb3Igc3RyaW5nLlxuICAgKi9cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIHN0YXJ0OiBudW1iZXIsIGVuZD86IG51bWJlcik6IGFueSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiB2YWx1ZTtcblxuICAgIGlmICghdGhpcy5zdXBwb3J0cyh2YWx1ZSkpIHtcbiAgICAgIHRocm93IGludmFsaWRQaXBlQXJndW1lbnRFcnJvcihTbGljZVBpcGUsIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWUuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gIH1cblxuICBwcml2YXRlIHN1cHBvcnRzKG9iajogYW55KTogYm9vbGVhbiB7IHJldHVybiB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fCBBcnJheS5pc0FycmF5KG9iaik7IH1cbn1cbiJdfQ==