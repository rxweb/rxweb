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
import { Directive, EventEmitter, Inject, InjectionToken, Input, Optional, Output, Self, forwardRef } from '@angular/core';
import { FormControl } from '../../model';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS } from '../../validators';
import { NG_VALUE_ACCESSOR } from '../control_value_accessor';
import { NgControl } from '../ng_control';
import { ReactiveErrors } from '../reactive_errors';
import { _ngModelWarning, composeAsyncValidators, composeValidators, isPropertyUpdated, selectValueAccessor, setUpControl } from '../shared';
/** *
 * Token to provide to turn off the ngModel warning on formControl and formControlName.
  @type {?} */
export const NG_MODEL_WITH_FORM_CONTROL_WARNING = new InjectionToken('NgModelWithFormControlWarning');
/** @type {?} */
export const formControlBinding = {
    provide: NgControl,
    useExisting: forwardRef(() => FormControlDirective)
};
/**
 * \@description
 *
 * Syncs a standalone `FormControl` instance to a form control element.
 *
 * This directive ensures that any values written to the `FormControl`
 * instance programmatically will be written to the DOM element (model -> view). Conversely,
 * any values written to the DOM element through user input will be reflected in the
 * `FormControl` instance (view -> model).
 *
 * \@usageNotes
 * Use this directive if you'd like to create and manage a `FormControl` instance directly.
 * Simply create a `FormControl`, save it to your component class, and pass it into the
 * `FormControlDirective`.
 *
 * This directive is designed to be used as a standalone control.  Unlike `FormControlName`,
 * it does not require that your `FormControl` instance be part of any parent
 * `FormGroup`, and it won't be registered to any `FormGroupDirective` that
 * exists above it.
 *
 * **Get the value**: the `value` property is always synced and available on the
 * `FormControl` instance. See a full list of available properties in
 * `AbstractControl`.
 *
 * **Set the value**: You can pass in an initial value when instantiating the `FormControl`,
 * or you can set it programmatically later using {\@link AbstractControl#setValue setValue} or
 * {\@link AbstractControl#patchValue patchValue}.
 *
 * **Listen to value**: If you want to listen to changes in the value of the control, you can
 * subscribe to the {\@link AbstractControl#valueChanges valueChanges} event.  You can also listen to
 * {\@link AbstractControl#statusChanges statusChanges} to be notified when the validation status is
 * re-calculated.
 *
 * ### Example
 *
 * {\@example forms/ts/simpleFormControl/simple_form_control_example.ts region='Component'}
 *
 * ### Use with ngModel
 *
 * Support for using the `ngModel` input property and `ngModelChange` event with reactive
 * form directives has been deprecated in Angular v6 and will be removed in Angular v7.
 *
 * Now deprecated:
 *
 * ```html
 * <input [formControl]="control" [(ngModel)]="value">
 * ```
 *
 * ```ts
 * this.value = 'some value';
 * ```
 *
 * This has been deprecated for a few reasons. First, developers have found this pattern
 * confusing. It seems like the actual `ngModel` directive is being used, but in fact it's
 * an input/output property named `ngModel` on the reactive form directive that simply
 * approximates (some of) its behavior. Specifically, it allows getting/setting the value
 * and intercepting value events. However, some of `ngModel`'s other features - like
 * delaying updates with`ngModelOptions` or exporting the directive - simply don't work,
 * which has understandably caused some confusion.
 *
 * In addition, this pattern mixes template-driven and reactive forms strategies, which
 * we generally don't recommend because it doesn't take advantage of the full benefits of
 * either strategy. Setting the value in the template violates the template-agnostic
 * principles behind reactive forms, whereas adding a `FormControl`/`FormGroup` layer in
 * the class removes the convenience of defining forms in the template.
 *
 * To update your code before v7, you'll want to decide whether to stick with reactive form
 * directives (and get/set values using reactive forms patterns) or switch over to
 * template-driven directives.
 *
 * After (choice 1 - use reactive forms):
 *
 * ```html
 * <input [formControl]="control">
 * ```
 *
 * ```ts
 * this.control.setValue('some value');
 * ```
 *
 * After (choice 2 - use template-driven forms):
 *
 * ```html
 * <input [(ngModel)]="value">
 * ```
 *
 * ```ts
 * this.value = 'some value';
 * ```
 *
 * By default, when you use this pattern, you will see a deprecation warning once in dev
 * mode. You can choose to silence this warning by providing a config for
 * `ReactiveFormsModule` at import time:
 *
 * ```ts
 * imports: [
 *   ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'});
 * ]
 * ```
 *
 * Alternatively, you can choose to surface a separate warning for each instance of this
 * pattern with a config value of `"always"`. This may help to track down where in the code
 * the pattern is being used as the code is being updated.
 *
 * \@ngModule ReactiveFormsModule
 */
export class FormControlDirective extends NgControl {
    /**
     * @param {?} validators
     * @param {?} asyncValidators
     * @param {?} valueAccessors
     * @param {?} _ngModelWarningConfig
     */
    constructor(validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
        super();
        this._ngModelWarningConfig = _ngModelWarningConfig;
        /**
         * @deprecated as of v6
         */
        this.update = new EventEmitter();
        /**
         * Instance property used to track whether an ngModel warning has been sent out for this
         * particular FormControlDirective instance. Used to support warning config of "always".
         *
         * \@internal
         */
        this._ngModelWarningSent = false;
        this._rawValidators = validators || [];
        this._rawAsyncValidators = asyncValidators || [];
        this.valueAccessor = selectValueAccessor(this, valueAccessors);
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    set isDisabled(isDisabled) { ReactiveErrors.disabledAttrWarning(); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this._isControlChanged(changes)) {
            setUpControl(this.form, this);
            if (this.control.disabled && /** @type {?} */ ((this.valueAccessor)).setDisabledState) {
                /** @type {?} */ ((/** @type {?} */ ((this.valueAccessor)).setDisabledState))(true);
            }
            this.form.updateValueAndValidity({ emitEvent: false });
        }
        if (isPropertyUpdated(changes, this.viewModel)) {
            _ngModelWarning('formControl', FormControlDirective, this, this._ngModelWarningConfig);
            this.form.setValue(this.model);
            this.viewModel = this.model;
        }
    }
    /**
     * @return {?}
     */
    get path() { return []; }
    /**
     * @return {?}
     */
    get validator() { return composeValidators(this._rawValidators); }
    /**
     * @return {?}
     */
    get asyncValidator() {
        return composeAsyncValidators(this._rawAsyncValidators);
    }
    /**
     * @return {?}
     */
    get control() { return this.form; }
    /**
     * @param {?} newValue
     * @return {?}
     */
    viewToModelUpdate(newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _isControlChanged(changes) {
        return changes.hasOwnProperty('form');
    }
}
/**
 * Static property used to track whether any ngModel warnings have been sent across
 * all instances of FormControlDirective. Used to support warning config of "once".
 *
 * \@internal
 */
FormControlDirective._ngModelWarningSentOnce = false;
FormControlDirective.decorators = [
    { type: Directive, args: [{ selector: '[formControl]', providers: [formControlBinding], exportAs: 'ngForm' },] }
];
/** @nocollapse */
FormControlDirective.ctorParameters = () => [
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] }] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] }] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALUE_ACCESSOR,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NG_MODEL_WITH_FORM_CONTROL_WARNING,] }] }
];
FormControlDirective.propDecorators = {
    form: [{ type: Input, args: ['formControl',] }],
    isDisabled: [{ type: Input, args: ['disabled',] }],
    model: [{ type: Input, args: ['ngModel',] }],
    update: [{ type: Output, args: ['ngModelChange',] }]
};
if (false) {
    /**
     * Static property used to track whether any ngModel warnings have been sent across
     * all instances of FormControlDirective. Used to support warning config of "once".
     *
     * \@internal
     * @type {?}
     */
    FormControlDirective._ngModelWarningSentOnce;
    /** @type {?} */
    FormControlDirective.prototype.viewModel;
    /** @type {?} */
    FormControlDirective.prototype.form;
    /**
     * @deprecated as of v6
     * @type {?}
     */
    FormControlDirective.prototype.model;
    /**
     * @deprecated as of v6
     * @type {?}
     */
    FormControlDirective.prototype.update;
    /**
     * Instance property used to track whether an ngModel warning has been sent out for this
     * particular FormControlDirective instance. Used to support warning config of "always".
     *
     * \@internal
     * @type {?}
     */
    FormControlDirective.prototype._ngModelWarningSent;
    /** @type {?} */
    FormControlDirective.prototype._ngModelWarningConfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9jb250cm9sX2RpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Zvcm1zL3NyYy9kaXJlY3RpdmVzL3JlYWN0aXZlX2RpcmVjdGl2ZXMvZm9ybV9jb250cm9sX2RpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFhLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFpQixVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFbkosT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUUsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEUsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2xGLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxlQUFlLEVBQUUsc0JBQXNCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFDLE1BQU0sV0FBVyxDQUFDOzs7O0FBTzNJLGFBQWEsa0NBQWtDLEdBQzNDLElBQUksY0FBYyxDQUFDLCtCQUErQixDQUFDLENBQUM7O0FBRXhELGFBQWEsa0JBQWtCLEdBQVE7SUFDckMsT0FBTyxFQUFFLFNBQVM7SUFDbEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztDQUNwRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QixLQUFLLFNBQUMsVUFBVTtvQkFNaEIsS0FBSyxTQUFDLFNBQVM7cUJBR2YsTUFBTSxTQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0aW9uVG9rZW4sIElucHV0LCBPbkNoYW5nZXMsIE9wdGlvbmFsLCBPdXRwdXQsIFNlbGYsIFNpbXBsZUNoYW5nZXMsIGZvcndhcmRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0Zvcm1Db250cm9sfSBmcm9tICcuLi8uLi9tb2RlbCc7XG5pbXBvcnQge05HX0FTWU5DX1ZBTElEQVRPUlMsIE5HX1ZBTElEQVRPUlN9IGZyb20gJy4uLy4uL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJy4uL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJy4uL25nX2NvbnRyb2wnO1xuaW1wb3J0IHtSZWFjdGl2ZUVycm9yc30gZnJvbSAnLi4vcmVhY3RpdmVfZXJyb3JzJztcbmltcG9ydCB7X25nTW9kZWxXYXJuaW5nLCBjb21wb3NlQXN5bmNWYWxpZGF0b3JzLCBjb21wb3NlVmFsaWRhdG9ycywgaXNQcm9wZXJ0eVVwZGF0ZWQsIHNlbGVjdFZhbHVlQWNjZXNzb3IsIHNldFVwQ29udHJvbH0gZnJvbSAnLi4vc2hhcmVkJztcbmltcG9ydCB7QXN5bmNWYWxpZGF0b3IsIEFzeW5jVmFsaWRhdG9yRm4sIFZhbGlkYXRvciwgVmFsaWRhdG9yRm59IGZyb20gJy4uL3ZhbGlkYXRvcnMnO1xuXG5cbi8qKlxuICogVG9rZW4gdG8gcHJvdmlkZSB0byB0dXJuIG9mZiB0aGUgbmdNb2RlbCB3YXJuaW5nIG9uIGZvcm1Db250cm9sIGFuZCBmb3JtQ29udHJvbE5hbWUuXG4gKi9cbmV4cG9ydCBjb25zdCBOR19NT0RFTF9XSVRIX0ZPUk1fQ09OVFJPTF9XQVJOSU5HID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW4oJ05nTW9kZWxXaXRoRm9ybUNvbnRyb2xXYXJuaW5nJyk7XG5cbmV4cG9ydCBjb25zdCBmb3JtQ29udHJvbEJpbmRpbmc6IGFueSA9IHtcbiAgcHJvdmlkZTogTmdDb250cm9sLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBGb3JtQ29udHJvbERpcmVjdGl2ZSlcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogU3luY3MgYSBzdGFuZGFsb25lIGBGb3JtQ29udHJvbGAgaW5zdGFuY2UgdG8gYSBmb3JtIGNvbnRyb2wgZWxlbWVudC5cbiAqXG4gKiBUaGlzIGRpcmVjdGl2ZSBlbnN1cmVzIHRoYXQgYW55IHZhbHVlcyB3cml0dGVuIHRvIHRoZSBgRm9ybUNvbnRyb2xgXG4gKiBpbnN0YW5jZSBwcm9ncmFtbWF0aWNhbGx5IHdpbGwgYmUgd3JpdHRlbiB0byB0aGUgRE9NIGVsZW1lbnQgKG1vZGVsIC0+IHZpZXcpLiBDb252ZXJzZWx5LFxuICogYW55IHZhbHVlcyB3cml0dGVuIHRvIHRoZSBET00gZWxlbWVudCB0aHJvdWdoIHVzZXIgaW5wdXQgd2lsbCBiZSByZWZsZWN0ZWQgaW4gdGhlXG4gKiBgRm9ybUNvbnRyb2xgIGluc3RhbmNlICh2aWV3IC0+IG1vZGVsKS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogVXNlIHRoaXMgZGlyZWN0aXZlIGlmIHlvdSdkIGxpa2UgdG8gY3JlYXRlIGFuZCBtYW5hZ2UgYSBgRm9ybUNvbnRyb2xgIGluc3RhbmNlIGRpcmVjdGx5LlxuICogU2ltcGx5IGNyZWF0ZSBhIGBGb3JtQ29udHJvbGAsIHNhdmUgaXQgdG8geW91ciBjb21wb25lbnQgY2xhc3MsIGFuZCBwYXNzIGl0IGludG8gdGhlXG4gKiBgRm9ybUNvbnRyb2xEaXJlY3RpdmVgLlxuICpcbiAqIFRoaXMgZGlyZWN0aXZlIGlzIGRlc2lnbmVkIHRvIGJlIHVzZWQgYXMgYSBzdGFuZGFsb25lIGNvbnRyb2wuICBVbmxpa2UgYEZvcm1Db250cm9sTmFtZWAsXG4gKiBpdCBkb2VzIG5vdCByZXF1aXJlIHRoYXQgeW91ciBgRm9ybUNvbnRyb2xgIGluc3RhbmNlIGJlIHBhcnQgb2YgYW55IHBhcmVudFxuICogYEZvcm1Hcm91cGAsIGFuZCBpdCB3b24ndCBiZSByZWdpc3RlcmVkIHRvIGFueSBgRm9ybUdyb3VwRGlyZWN0aXZlYCB0aGF0XG4gKiBleGlzdHMgYWJvdmUgaXQuXG4gKlxuICogKipHZXQgdGhlIHZhbHVlKio6IHRoZSBgdmFsdWVgIHByb3BlcnR5IGlzIGFsd2F5cyBzeW5jZWQgYW5kIGF2YWlsYWJsZSBvbiB0aGVcbiAqIGBGb3JtQ29udHJvbGAgaW5zdGFuY2UuIFNlZSBhIGZ1bGwgbGlzdCBvZiBhdmFpbGFibGUgcHJvcGVydGllcyBpblxuICogYEFic3RyYWN0Q29udHJvbGAuXG4gKlxuICogKipTZXQgdGhlIHZhbHVlKio6IFlvdSBjYW4gcGFzcyBpbiBhbiBpbml0aWFsIHZhbHVlIHdoZW4gaW5zdGFudGlhdGluZyB0aGUgYEZvcm1Db250cm9sYCxcbiAqIG9yIHlvdSBjYW4gc2V0IGl0IHByb2dyYW1tYXRpY2FsbHkgbGF0ZXIgdXNpbmcge0BsaW5rIEFic3RyYWN0Q29udHJvbCNzZXRWYWx1ZSBzZXRWYWx1ZX0gb3JcbiAqIHtAbGluayBBYnN0cmFjdENvbnRyb2wjcGF0Y2hWYWx1ZSBwYXRjaFZhbHVlfS5cbiAqXG4gKiAqKkxpc3RlbiB0byB2YWx1ZSoqOiBJZiB5b3Ugd2FudCB0byBsaXN0ZW4gdG8gY2hhbmdlcyBpbiB0aGUgdmFsdWUgb2YgdGhlIGNvbnRyb2wsIHlvdSBjYW5cbiAqIHN1YnNjcmliZSB0byB0aGUge0BsaW5rIEFic3RyYWN0Q29udHJvbCN2YWx1ZUNoYW5nZXMgdmFsdWVDaGFuZ2VzfSBldmVudC4gIFlvdSBjYW4gYWxzbyBsaXN0ZW4gdG9cbiAqIHtAbGluayBBYnN0cmFjdENvbnRyb2wjc3RhdHVzQ2hhbmdlcyBzdGF0dXNDaGFuZ2VzfSB0byBiZSBub3RpZmllZCB3aGVuIHRoZSB2YWxpZGF0aW9uIHN0YXR1cyBpc1xuICogcmUtY2FsY3VsYXRlZC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBmb3Jtcy90cy9zaW1wbGVGb3JtQ29udHJvbC9zaW1wbGVfZm9ybV9jb250cm9sX2V4YW1wbGUudHMgcmVnaW9uPSdDb21wb25lbnQnfVxuICpcbiAqICMjIyBVc2Ugd2l0aCBuZ01vZGVsXG4gKlxuICogU3VwcG9ydCBmb3IgdXNpbmcgdGhlIGBuZ01vZGVsYCBpbnB1dCBwcm9wZXJ0eSBhbmQgYG5nTW9kZWxDaGFuZ2VgIGV2ZW50IHdpdGggcmVhY3RpdmVcbiAqIGZvcm0gZGlyZWN0aXZlcyBoYXMgYmVlbiBkZXByZWNhdGVkIGluIEFuZ3VsYXIgdjYgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBBbmd1bGFyIHY3LlxuICpcbiAqIE5vdyBkZXByZWNhdGVkOlxuICpcbiAqIGBgYGh0bWxcbiAqIDxpbnB1dCBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiIFsobmdNb2RlbCldPVwidmFsdWVcIj5cbiAqIGBgYFxuICpcbiAqIGBgYHRzXG4gKiB0aGlzLnZhbHVlID0gJ3NvbWUgdmFsdWUnO1xuICogYGBgXG4gKlxuICogVGhpcyBoYXMgYmVlbiBkZXByZWNhdGVkIGZvciBhIGZldyByZWFzb25zLiBGaXJzdCwgZGV2ZWxvcGVycyBoYXZlIGZvdW5kIHRoaXMgcGF0dGVyblxuICogY29uZnVzaW5nLiBJdCBzZWVtcyBsaWtlIHRoZSBhY3R1YWwgYG5nTW9kZWxgIGRpcmVjdGl2ZSBpcyBiZWluZyB1c2VkLCBidXQgaW4gZmFjdCBpdCdzXG4gKiBhbiBpbnB1dC9vdXRwdXQgcHJvcGVydHkgbmFtZWQgYG5nTW9kZWxgIG9uIHRoZSByZWFjdGl2ZSBmb3JtIGRpcmVjdGl2ZSB0aGF0IHNpbXBseVxuICogYXBwcm94aW1hdGVzIChzb21lIG9mKSBpdHMgYmVoYXZpb3IuIFNwZWNpZmljYWxseSwgaXQgYWxsb3dzIGdldHRpbmcvc2V0dGluZyB0aGUgdmFsdWVcbiAqIGFuZCBpbnRlcmNlcHRpbmcgdmFsdWUgZXZlbnRzLiBIb3dldmVyLCBzb21lIG9mIGBuZ01vZGVsYCdzIG90aGVyIGZlYXR1cmVzIC0gbGlrZVxuICogZGVsYXlpbmcgdXBkYXRlcyB3aXRoYG5nTW9kZWxPcHRpb25zYCBvciBleHBvcnRpbmcgdGhlIGRpcmVjdGl2ZSAtIHNpbXBseSBkb24ndCB3b3JrLFxuICogd2hpY2ggaGFzIHVuZGVyc3RhbmRhYmx5IGNhdXNlZCBzb21lIGNvbmZ1c2lvbi5cbiAqXG4gKiBJbiBhZGRpdGlvbiwgdGhpcyBwYXR0ZXJuIG1peGVzIHRlbXBsYXRlLWRyaXZlbiBhbmQgcmVhY3RpdmUgZm9ybXMgc3RyYXRlZ2llcywgd2hpY2hcbiAqIHdlIGdlbmVyYWxseSBkb24ndCByZWNvbW1lbmQgYmVjYXVzZSBpdCBkb2Vzbid0IHRha2UgYWR2YW50YWdlIG9mIHRoZSBmdWxsIGJlbmVmaXRzIG9mXG4gKiBlaXRoZXIgc3RyYXRlZ3kuIFNldHRpbmcgdGhlIHZhbHVlIGluIHRoZSB0ZW1wbGF0ZSB2aW9sYXRlcyB0aGUgdGVtcGxhdGUtYWdub3N0aWNcbiAqIHByaW5jaXBsZXMgYmVoaW5kIHJlYWN0aXZlIGZvcm1zLCB3aGVyZWFzIGFkZGluZyBhIGBGb3JtQ29udHJvbGAvYEZvcm1Hcm91cGAgbGF5ZXIgaW5cbiAqIHRoZSBjbGFzcyByZW1vdmVzIHRoZSBjb252ZW5pZW5jZSBvZiBkZWZpbmluZyBmb3JtcyBpbiB0aGUgdGVtcGxhdGUuXG4gKlxuICogVG8gdXBkYXRlIHlvdXIgY29kZSBiZWZvcmUgdjcsIHlvdSdsbCB3YW50IHRvIGRlY2lkZSB3aGV0aGVyIHRvIHN0aWNrIHdpdGggcmVhY3RpdmUgZm9ybVxuICogZGlyZWN0aXZlcyAoYW5kIGdldC9zZXQgdmFsdWVzIHVzaW5nIHJlYWN0aXZlIGZvcm1zIHBhdHRlcm5zKSBvciBzd2l0Y2ggb3ZlciB0b1xuICogdGVtcGxhdGUtZHJpdmVuIGRpcmVjdGl2ZXMuXG4gKlxuICogQWZ0ZXIgKGNob2ljZSAxIC0gdXNlIHJlYWN0aXZlIGZvcm1zKTpcbiAqXG4gKiBgYGBodG1sXG4gKiA8aW5wdXQgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIj5cbiAqIGBgYFxuICpcbiAqIGBgYHRzXG4gKiB0aGlzLmNvbnRyb2wuc2V0VmFsdWUoJ3NvbWUgdmFsdWUnKTtcbiAqIGBgYFxuICpcbiAqIEFmdGVyIChjaG9pY2UgMiAtIHVzZSB0ZW1wbGF0ZS1kcml2ZW4gZm9ybXMpOlxuICpcbiAqIGBgYGh0bWxcbiAqIDxpbnB1dCBbKG5nTW9kZWwpXT1cInZhbHVlXCI+XG4gKiBgYGBcbiAqXG4gKiBgYGB0c1xuICogdGhpcy52YWx1ZSA9ICdzb21lIHZhbHVlJztcbiAqIGBgYFxuICpcbiAqIEJ5IGRlZmF1bHQsIHdoZW4geW91IHVzZSB0aGlzIHBhdHRlcm4sIHlvdSB3aWxsIHNlZSBhIGRlcHJlY2F0aW9uIHdhcm5pbmcgb25jZSBpbiBkZXZcbiAqIG1vZGUuIFlvdSBjYW4gY2hvb3NlIHRvIHNpbGVuY2UgdGhpcyB3YXJuaW5nIGJ5IHByb3ZpZGluZyBhIGNvbmZpZyBmb3JcbiAqIGBSZWFjdGl2ZUZvcm1zTW9kdWxlYCBhdCBpbXBvcnQgdGltZTpcbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0czogW1xuICogICBSZWFjdGl2ZUZvcm1zTW9kdWxlLndpdGhDb25maWcoe3dhcm5Pbk5nTW9kZWxXaXRoRm9ybUNvbnRyb2w6ICduZXZlcid9KTtcbiAqIF1cbiAqIGBgYFxuICpcbiAqIEFsdGVybmF0aXZlbHksIHlvdSBjYW4gY2hvb3NlIHRvIHN1cmZhY2UgYSBzZXBhcmF0ZSB3YXJuaW5nIGZvciBlYWNoIGluc3RhbmNlIG9mIHRoaXNcbiAqIHBhdHRlcm4gd2l0aCBhIGNvbmZpZyB2YWx1ZSBvZiBgXCJhbHdheXNcImAuIFRoaXMgbWF5IGhlbHAgdG8gdHJhY2sgZG93biB3aGVyZSBpbiB0aGUgY29kZVxuICogdGhlIHBhdHRlcm4gaXMgYmVpbmcgdXNlZCBhcyB0aGUgY29kZSBpcyBiZWluZyB1cGRhdGVkLlxuICpcbiAqIEBuZ01vZHVsZSBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW2Zvcm1Db250cm9sXScsIHByb3ZpZGVyczogW2Zvcm1Db250cm9sQmluZGluZ10sIGV4cG9ydEFzOiAnbmdGb3JtJ30pXG5cbmV4cG9ydCBjbGFzcyBGb3JtQ29udHJvbERpcmVjdGl2ZSBleHRlbmRzIE5nQ29udHJvbCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHZpZXdNb2RlbDogYW55O1xuXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoJ2Zvcm1Db250cm9sJykgZm9ybSAhOiBGb3JtQ29udHJvbDtcblxuICBASW5wdXQoJ2Rpc2FibGVkJylcbiAgc2V0IGlzRGlzYWJsZWQoaXNEaXNhYmxlZDogYm9vbGVhbikgeyBSZWFjdGl2ZUVycm9ycy5kaXNhYmxlZEF0dHJXYXJuaW5nKCk7IH1cblxuICAvLyBUT0RPKGthcmEpOiByZW1vdmUgbmV4dCA0IHByb3BlcnRpZXMgb25jZSBkZXByZWNhdGlvbiBwZXJpb2QgaXMgb3ZlclxuXG4gIC8qKiBAZGVwcmVjYXRlZCBhcyBvZiB2NiAqL1xuICBASW5wdXQoJ25nTW9kZWwnKSBtb2RlbDogYW55O1xuXG4gIC8qKiBAZGVwcmVjYXRlZCBhcyBvZiB2NiAqL1xuICBAT3V0cHV0KCduZ01vZGVsQ2hhbmdlJykgdXBkYXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBTdGF0aWMgcHJvcGVydHkgdXNlZCB0byB0cmFjayB3aGV0aGVyIGFueSBuZ01vZGVsIHdhcm5pbmdzIGhhdmUgYmVlbiBzZW50IGFjcm9zc1xuICAgKiBhbGwgaW5zdGFuY2VzIG9mIEZvcm1Db250cm9sRGlyZWN0aXZlLiBVc2VkIHRvIHN1cHBvcnQgd2FybmluZyBjb25maWcgb2YgXCJvbmNlXCIuXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgc3RhdGljIF9uZ01vZGVsV2FybmluZ1NlbnRPbmNlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEluc3RhbmNlIHByb3BlcnR5IHVzZWQgdG8gdHJhY2sgd2hldGhlciBhbiBuZ01vZGVsIHdhcm5pbmcgaGFzIGJlZW4gc2VudCBvdXQgZm9yIHRoaXNcbiAgICogcGFydGljdWxhciBGb3JtQ29udHJvbERpcmVjdGl2ZSBpbnN0YW5jZS4gVXNlZCB0byBzdXBwb3J0IHdhcm5pbmcgY29uZmlnIG9mIFwiYWx3YXlzXCIuXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX25nTW9kZWxXYXJuaW5nU2VudCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19WQUxJREFUT1JTKSB2YWxpZGF0b3JzOiBBcnJheTxWYWxpZGF0b3J8VmFsaWRhdG9yRm4+LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIEBJbmplY3QoTkdfQVNZTkNfVkFMSURBVE9SUykgYXN5bmNWYWxpZGF0b3JzOiBBcnJheTxBc3luY1ZhbGlkYXRvcnxBc3luY1ZhbGlkYXRvckZuPixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX1ZBTFVFX0FDQ0VTU09SKVxuICAgICAgICAgICAgICB2YWx1ZUFjY2Vzc29yczogQ29udHJvbFZhbHVlQWNjZXNzb3JbXSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChOR19NT0RFTF9XSVRIX0ZPUk1fQ09OVFJPTF9XQVJOSU5HKSBwcml2YXRlIF9uZ01vZGVsV2FybmluZ0NvbmZpZzogc3RyaW5nfG51bGwpIHtcbiAgICAgICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jhd1ZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzIHx8IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jhd0FzeW5jVmFsaWRhdG9ycyA9IGFzeW5jVmFsaWRhdG9ycyB8fCBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlQWNjZXNzb3IgPSBzZWxlY3RWYWx1ZUFjY2Vzc29yKHRoaXMsIHZhbHVlQWNjZXNzb3JzKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNDb250cm9sQ2hhbmdlZChjaGFuZ2VzKSkge1xuICAgICAgICAgICAgICAgICAgc2V0VXBDb250cm9sKHRoaXMuZm9ybSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250cm9sLmRpc2FibGVkICYmIHRoaXMudmFsdWVBY2Nlc3NvciAhLnNldERpc2FibGVkU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZUFjY2Vzc29yICEuc2V0RGlzYWJsZWRTdGF0ZSAhKHRydWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe2VtaXRFdmVudDogZmFsc2V9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzUHJvcGVydHlVcGRhdGVkKGNoYW5nZXMsIHRoaXMudmlld01vZGVsKSkge1xuICAgICAgICAgICAgICAgICAgX25nTW9kZWxXYXJuaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICdmb3JtQ29udHJvbCcsIEZvcm1Db250cm9sRGlyZWN0aXZlLCB0aGlzLCB0aGlzLl9uZ01vZGVsV2FybmluZ0NvbmZpZyk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uc2V0VmFsdWUodGhpcy5tb2RlbCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbCA9IHRoaXMubW9kZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZ2V0IHBhdGgoKTogc3RyaW5nW10geyByZXR1cm4gW107IH1cblxuICAgICAgICAgICAgICBnZXQgdmFsaWRhdG9yKCk6IFZhbGlkYXRvckZufG51bGwgeyByZXR1cm4gY29tcG9zZVZhbGlkYXRvcnModGhpcy5fcmF3VmFsaWRhdG9ycyk7IH1cblxuICAgICAgICAgICAgICBnZXQgYXN5bmNWYWxpZGF0b3IoKTogQXN5bmNWYWxpZGF0b3JGbnxudWxsIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZUFzeW5jVmFsaWRhdG9ycyh0aGlzLl9yYXdBc3luY1ZhbGlkYXRvcnMpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZ2V0IGNvbnRyb2woKTogRm9ybUNvbnRyb2wgeyByZXR1cm4gdGhpcy5mb3JtOyB9XG5cbiAgICAgICAgICAgICAgdmlld1RvTW9kZWxVcGRhdGUobmV3VmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUuZW1pdChuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBwcml2YXRlIF9pc0NvbnRyb2xDaGFuZ2VkKGNoYW5nZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2Zvcm0nKTtcbiAgICAgICAgICAgICAgfVxufVxuIl19