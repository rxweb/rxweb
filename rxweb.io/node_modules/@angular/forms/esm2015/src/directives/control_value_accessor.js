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
import { InjectionToken } from '@angular/core';
/**
 * A `ControlValueAccessor` acts as a bridge between the Angular forms API and a
 * native element in the DOM.
 *
 * Implement this interface if you want to create a custom form control directive
 * that integrates with Angular forms.
 *
 *
 * @record
 */
export function ControlValueAccessor() { }
/**
 * Writes a new value to the element.
 *
 * This method will be called by the forms API to write to the view when programmatic
 * (model -> view) changes are requested.
 *
 * Example implementation of `writeValue`:
 *
 * ```ts
 * writeValue(value: any): void {
 *   this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
 * }
 * ```
 * @type {?}
 */
ControlValueAccessor.prototype.writeValue;
/**
 * Registers a callback function that should be called when the control's value
 * changes in the UI.
 *
 * This is called by the forms API on initialization so it can update the form
 * model when values propagate from the view (view -> model).
 *
 * If you are implementing `registerOnChange` in your own value accessor, you
 * will typically want to save the given function so your class can call it
 * at the appropriate time.
 *
 * ```ts
 * registerOnChange(fn: (_: any) => void): void {
 *   this._onChange = fn;
 * }
 * ```
 *
 * When the value changes in the UI, your class should call the registered
 * function to allow the forms API to update itself:
 *
 * ```ts
 * host: {
 *    (change): '_onChange($event.target.value)'
 * }
 * ```
 *
 * @type {?}
 */
ControlValueAccessor.prototype.registerOnChange;
/**
 * Registers a callback function that should be called when the control receives
 * a blur event.
 *
 * This is called by the forms API on initialization so it can update the form model
 * on blur.
 *
 * If you are implementing `registerOnTouched` in your own value accessor, you
 * will typically want to save the given function so your class can call it
 * when the control should be considered blurred (a.k.a. "touched").
 *
 * ```ts
 * registerOnTouched(fn: any): void {
 *   this._onTouched = fn;
 * }
 * ```
 *
 * On blur (or equivalent), your class should call the registered function to allow
 * the forms API to update itself:
 *
 * ```ts
 * host: {
 *    '(blur)': '_onTouched()'
 * }
 * ```
 * @type {?}
 */
ControlValueAccessor.prototype.registerOnTouched;
/**
 * This function is called by the forms API when the control status changes to
 * or from "DISABLED". Depending on the value, it should enable or disable the
 * appropriate DOM element.
 *
 * Example implementation of `setDisabledState`:
 *
 * ```ts
 * setDisabledState(isDisabled: boolean): void {
 *   this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
 * }
 * ```
 *
 * \@param isDisabled
 * @type {?|undefined}
 */
ControlValueAccessor.prototype.setDisabledState;
/** *
 * Used to provide a `ControlValueAccessor` for form controls.
 *
 * See `DefaultValueAccessor` for how to implement one.
 *
  @type {?} */
export const NG_VALUE_ACCESSOR = new InjectionToken('NgValueAccessor');

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbF92YWx1ZV9hY2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Zvcm1zL3NyYy9kaXJlY3RpdmVzL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2RzdDLGFBQWEsaUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQXVCLGlCQUFpQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0aW9uVG9rZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEEgYENvbnRyb2xWYWx1ZUFjY2Vzc29yYCBhY3RzIGFzIGEgYnJpZGdlIGJldHdlZW4gdGhlIEFuZ3VsYXIgZm9ybXMgQVBJIGFuZCBhXG4gKiBuYXRpdmUgZWxlbWVudCBpbiB0aGUgRE9NLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGludGVyZmFjZSBpZiB5b3Ugd2FudCB0byBjcmVhdGUgYSBjdXN0b20gZm9ybSBjb250cm9sIGRpcmVjdGl2ZVxuICogdGhhdCBpbnRlZ3JhdGVzIHdpdGggQW5ndWxhciBmb3Jtcy5cbiAqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLyoqXG4gICAqIFdyaXRlcyBhIG5ldyB2YWx1ZSB0byB0aGUgZWxlbWVudC5cbiAgICpcbiAgICogVGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgYnkgdGhlIGZvcm1zIEFQSSB0byB3cml0ZSB0byB0aGUgdmlldyB3aGVuIHByb2dyYW1tYXRpY1xuICAgKiAobW9kZWwgLT4gdmlldykgY2hhbmdlcyBhcmUgcmVxdWVzdGVkLlxuICAgKlxuICAgKiBFeGFtcGxlIGltcGxlbWVudGF0aW9uIG9mIGB3cml0ZVZhbHVlYDpcbiAgICpcbiAgICogYGBgdHNcbiAgICogd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAqICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB2YWx1ZSk7XG4gICAqIH1cbiAgICogYGBgXG4gICAqL1xuICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZDtcblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgY2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wncyB2YWx1ZVxuICAgKiBjaGFuZ2VzIGluIHRoZSBVSS5cbiAgICpcbiAgICogVGhpcyBpcyBjYWxsZWQgYnkgdGhlIGZvcm1zIEFQSSBvbiBpbml0aWFsaXphdGlvbiBzbyBpdCBjYW4gdXBkYXRlIHRoZSBmb3JtXG4gICAqIG1vZGVsIHdoZW4gdmFsdWVzIHByb3BhZ2F0ZSBmcm9tIHRoZSB2aWV3ICh2aWV3IC0+IG1vZGVsKS5cbiAgICpcbiAgICogSWYgeW91IGFyZSBpbXBsZW1lbnRpbmcgYHJlZ2lzdGVyT25DaGFuZ2VgIGluIHlvdXIgb3duIHZhbHVlIGFjY2Vzc29yLCB5b3VcbiAgICogd2lsbCB0eXBpY2FsbHkgd2FudCB0byBzYXZlIHRoZSBnaXZlbiBmdW5jdGlvbiBzbyB5b3VyIGNsYXNzIGNhbiBjYWxsIGl0XG4gICAqIGF0IHRoZSBhcHByb3ByaWF0ZSB0aW1lLlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAqICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogV2hlbiB0aGUgdmFsdWUgY2hhbmdlcyBpbiB0aGUgVUksIHlvdXIgY2xhc3Mgc2hvdWxkIGNhbGwgdGhlIHJlZ2lzdGVyZWRcbiAgICogZnVuY3Rpb24gdG8gYWxsb3cgdGhlIGZvcm1zIEFQSSB0byB1cGRhdGUgaXRzZWxmOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBob3N0OiB7XG4gICAqICAgIChjaGFuZ2UpOiAnX29uQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpJ1xuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZDtcblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgY2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgcmVjZWl2ZXNcbiAgICogYSBibHVyIGV2ZW50LlxuICAgKlxuICAgKiBUaGlzIGlzIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIG9uIGluaXRpYWxpemF0aW9uIHNvIGl0IGNhbiB1cGRhdGUgdGhlIGZvcm0gbW9kZWxcbiAgICogb24gYmx1ci5cbiAgICpcbiAgICogSWYgeW91IGFyZSBpbXBsZW1lbnRpbmcgYHJlZ2lzdGVyT25Ub3VjaGVkYCBpbiB5b3VyIG93biB2YWx1ZSBhY2Nlc3NvciwgeW91XG4gICAqIHdpbGwgdHlwaWNhbGx5IHdhbnQgdG8gc2F2ZSB0aGUgZ2l2ZW4gZnVuY3Rpb24gc28geW91ciBjbGFzcyBjYW4gY2FsbCBpdFxuICAgKiB3aGVuIHRoZSBjb250cm9sIHNob3VsZCBiZSBjb25zaWRlcmVkIGJsdXJyZWQgKGEuay5hLiBcInRvdWNoZWRcIikuXG4gICAqXG4gICAqIGBgYHRzXG4gICAqIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICogICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogT24gYmx1ciAob3IgZXF1aXZhbGVudCksIHlvdXIgY2xhc3Mgc2hvdWxkIGNhbGwgdGhlIHJlZ2lzdGVyZWQgZnVuY3Rpb24gdG8gYWxsb3dcbiAgICogdGhlIGZvcm1zIEFQSSB0byB1cGRhdGUgaXRzZWxmOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBob3N0OiB7XG4gICAqICAgICcoYmx1ciknOiAnX29uVG91Y2hlZCgpJ1xuICAgKiB9XG4gICAqIGBgYFxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgd2hlbiB0aGUgY29udHJvbCBzdGF0dXMgY2hhbmdlcyB0b1xuICAgKiBvciBmcm9tIFwiRElTQUJMRURcIi4gRGVwZW5kaW5nIG9uIHRoZSB2YWx1ZSwgaXQgc2hvdWxkIGVuYWJsZSBvciBkaXNhYmxlIHRoZVxuICAgKiBhcHByb3ByaWF0ZSBET00gZWxlbWVudC5cbiAgICpcbiAgICogRXhhbXBsZSBpbXBsZW1lbnRhdGlvbiBvZiBgc2V0RGlzYWJsZWRTdGF0ZWA6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgKiAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCk7XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkXG4gICAqL1xuICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZDtcbn1cblxuLyoqXG4gKiBVc2VkIHRvIHByb3ZpZGUgYSBgQ29udHJvbFZhbHVlQWNjZXNzb3JgIGZvciBmb3JtIGNvbnRyb2xzLlxuICpcbiAqIFNlZSBgRGVmYXVsdFZhbHVlQWNjZXNzb3JgIGZvciBob3cgdG8gaW1wbGVtZW50IG9uZS5cbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBOR19WQUxVRV9BQ0NFU1NPUiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDb250cm9sVmFsdWVBY2Nlc3Nvcj4oJ05nVmFsdWVBY2Nlc3NvcicpO1xuIl19