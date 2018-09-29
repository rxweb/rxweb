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
import { Directive, EventEmitter, Inject, Input, Optional, Self, forwardRef } from '@angular/core';
import { FormGroup } from '../model';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS } from '../validators';
import { ControlContainer } from './control_container';
import { composeAsyncValidators, composeValidators, removeDir, setUpControl, setUpFormContainer, syncPendingControls } from './shared';
/** @type {?} */
export const formDirectiveProvider = {
    provide: ControlContainer,
    useExisting: forwardRef(() => NgForm)
};
/** @type {?} */
const resolvedPromise = Promise.resolve(null);
/**
 * \@description
 *
 * Creates a top-level `FormGroup` instance and binds it to a form
 * to track aggregate form value and validation status.
 *
 * As soon as you import the `FormsModule`, this directive becomes active by default on
 * all `<form>` tags.  You don't need to add a special selector.
 *
 * You can export the directive into a local template variable using `ngForm` as the key
 * (ex: `#myForm="ngForm"`). This is optional, but useful.  Many properties from the underlying
 * `FormGroup` instance are duplicated on the directive itself, so a reference to it
 * will give you access to the aggregate value and validity status of the form, as well as
 * user interaction properties like `dirty` and `touched`.
 *
 * To register child controls with the form, you'll want to use `NgModel` with a
 * `name` attribute.  You can also use `NgModelGroup` if you'd like to create
 * sub-groups within the form.
 *
 * You can listen to the directive's `ngSubmit` event to be notified when the user has
 * triggered a form submission. The `ngSubmit` event will be emitted with the original form
 * submission event.
 *
 * In template driven forms, all `<form>` tags are automatically tagged as `NgForm`.
 * If you want to import the `FormsModule` but skip its usage in some forms,
 * for example, to use native HTML5 validation, you can add `ngNoForm` and the `<form>`
 * tags won't create an `NgForm` directive. In reactive forms, using `ngNoForm` is
 * unnecessary because the `<form>` tags are inert. In that case, you would
 * refrain from using the `formGroup` directive.
 *
 * {\@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * * **npm package**: `\@angular/forms`
 *
 * * **NgModule**: `FormsModule`
 *
 *
 */
export class NgForm extends ControlContainer {
    /**
     * @param {?} validators
     * @param {?} asyncValidators
     */
    constructor(validators, asyncValidators) {
        super();
        this.submitted = false;
        this._directives = [];
        this.ngSubmit = new EventEmitter();
        this.form =
            new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() { this._setUpdateStrategy(); }
    /**
     * @return {?}
     */
    get formDirective() { return this; }
    /**
     * @return {?}
     */
    get control() { return this.form; }
    /**
     * @return {?}
     */
    get path() { return []; }
    /**
     * @return {?}
     */
    get controls() { return this.form.controls; }
    /**
     * @param {?} dir
     * @return {?}
     */
    addControl(dir) {
        resolvedPromise.then(() => {
            /** @type {?} */
            const container = this._findContainer(dir.path);
            (/** @type {?} */ (dir)).control = /** @type {?} */ (container.registerControl(dir.name, dir.control));
            setUpControl(dir.control, dir);
            dir.control.updateValueAndValidity({ emitEvent: false });
            this._directives.push(dir);
        });
    }
    /**
     * @param {?} dir
     * @return {?}
     */
    getControl(dir) { return /** @type {?} */ (this.form.get(dir.path)); }
    /**
     * @param {?} dir
     * @return {?}
     */
    removeControl(dir) {
        resolvedPromise.then(() => {
            /** @type {?} */
            const container = this._findContainer(dir.path);
            if (container) {
                container.removeControl(dir.name);
            }
            removeDir(this._directives, dir);
        });
    }
    /**
     * @param {?} dir
     * @return {?}
     */
    addFormGroup(dir) {
        resolvedPromise.then(() => {
            /** @type {?} */
            const container = this._findContainer(dir.path);
            /** @type {?} */
            const group = new FormGroup({});
            setUpFormContainer(group, dir);
            container.registerControl(dir.name, group);
            group.updateValueAndValidity({ emitEvent: false });
        });
    }
    /**
     * @param {?} dir
     * @return {?}
     */
    removeFormGroup(dir) {
        resolvedPromise.then(() => {
            /** @type {?} */
            const container = this._findContainer(dir.path);
            if (container) {
                container.removeControl(dir.name);
            }
        });
    }
    /**
     * @param {?} dir
     * @return {?}
     */
    getFormGroup(dir) { return /** @type {?} */ (this.form.get(dir.path)); }
    /**
     * @param {?} dir
     * @param {?} value
     * @return {?}
     */
    updateModel(dir, value) {
        resolvedPromise.then(() => {
            /** @type {?} */
            const ctrl = /** @type {?} */ (this.form.get(/** @type {?} */ ((dir.path))));
            ctrl.setValue(value);
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setValue(value) { this.control.setValue(value); }
    /**
     * @param {?} $event
     * @return {?}
     */
    onSubmit($event) {
        (/** @type {?} */ (this)).submitted = true;
        syncPendingControls(this.form, this._directives);
        this.ngSubmit.emit($event);
        return false;
    }
    /**
     * @return {?}
     */
    onReset() { this.resetForm(); }
    /**
     * @param {?=} value
     * @return {?}
     */
    resetForm(value = undefined) {
        this.form.reset(value);
        (/** @type {?} */ (this)).submitted = false;
    }
    /**
     * @return {?}
     */
    _setUpdateStrategy() {
        if (this.options && this.options.updateOn != null) {
            this.form._updateOn = this.options.updateOn;
        }
    }
    /**
     * \@internal
     * @param {?} path
     * @return {?}
     */
    _findContainer(path) {
        path.pop();
        return path.length ? /** @type {?} */ (this.form.get(path)) : this.form;
    }
}
NgForm.decorators = [
    { type: Directive, args: [{
                selector: 'form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]',
                providers: [formDirectiveProvider],
                host: { '(submit)': 'onSubmit($event)', '(reset)': 'onReset()' },
                outputs: ['ngSubmit'],
                exportAs: 'ngForm'
            },] }
];
/** @nocollapse */
NgForm.ctorParameters = () => [
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] }] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] }] }
];
NgForm.propDecorators = {
    options: [{ type: Input, args: ['ngFormOptions',] }]
};
if (false) {
    /** @type {?} */
    NgForm.prototype.submitted;
    /** @type {?} */
    NgForm.prototype._directives;
    /** @type {?} */
    NgForm.prototype.form;
    /** @type {?} */
    NgForm.prototype.ngSubmit;
    /**
     * Options for the `NgForm` instance. Accepts the following properties:
     *
     * **updateOn**: Serves as the default `updateOn` value for all child `NgModels` below it
     * (unless a child has explicitly set its own value for this in `ngModelOptions`).
     * Potential values: `'change'` | `'blur'` | `'submit'`
     *
     * ```html
     * <form [ngFormOptions]="{updateOn: 'blur'}">
     *    <input name="one" ngModel>  <!-- this ngModel will update on blur -->
     * </form>
     * ```
     *
     * @type {?}
     */
    NgForm.prototype.options;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Zvcm1zL3NyYy9kaXJlY3RpdmVzL25nX2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQWdCLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVoSCxPQUFPLEVBQStCLFNBQVMsRUFBWSxNQUFNLFVBQVUsQ0FBQztBQUM1RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUUsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBS3JELE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFDLE1BQU0sVUFBVSxDQUFDOztBQUVySSxhQUFhLHFCQUFxQixHQUFRO0lBQ3hDLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7Q0FDdEMsQ0FBQzs7QUFFRixNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQzlDLE1BQU0sYUFBYyxTQUFRLGdCQUFnQjs7Ozs7SUEwQjFDLFlBQytDLFVBQWlCLEVBQ1gsZUFBc0I7UUFDekUsS0FBSyxFQUFFLENBQUM7eUJBM0IyQixLQUFLOzJCQUVULEVBQUU7d0JBR3hCLElBQUksWUFBWSxFQUFFO1FBdUIzQixJQUFJLENBQUMsSUFBSTtZQUNMLElBQUksU0FBUyxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxVQUFV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LEVBQUUsQ0FBQztRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLG1CQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ2pFOzs7WUFoSUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1REFBdUQ7Z0JBQ2pFLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUNsQyxJQUFJLEVBQUUsRUFBQyxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBQztnQkFDOUQsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNyQixRQUFRLEVBQUUsUUFBUTthQUNuQjs7Ozt3Q0E0Qk0sUUFBUSxZQUFJLElBQUksWUFBSSxNQUFNLFNBQUMsYUFBYTt3Q0FDeEMsUUFBUSxZQUFJLElBQUksWUFBSSxNQUFNLFNBQUMsbUJBQW1COzs7c0JBSmxELEtBQUssU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgU2VsZiwgZm9yd2FyZFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBGb3JtSG9va3N9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7TkdfQVNZTkNfVkFMSURBVE9SUywgTkdfVkFMSURBVE9SU30gZnJvbSAnLi4vdmFsaWRhdG9ycyc7XG5cbmltcG9ydCB7Q29udHJvbENvbnRhaW5lcn0gZnJvbSAnLi9jb250cm9sX2NvbnRhaW5lcic7XG5pbXBvcnQge0Zvcm19IGZyb20gJy4vZm9ybV9pbnRlcmZhY2UnO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJy4vbmdfY29udHJvbCc7XG5pbXBvcnQge05nTW9kZWx9IGZyb20gJy4vbmdfbW9kZWwnO1xuaW1wb3J0IHtOZ01vZGVsR3JvdXB9IGZyb20gJy4vbmdfbW9kZWxfZ3JvdXAnO1xuaW1wb3J0IHtjb21wb3NlQXN5bmNWYWxpZGF0b3JzLCBjb21wb3NlVmFsaWRhdG9ycywgcmVtb3ZlRGlyLCBzZXRVcENvbnRyb2wsIHNldFVwRm9ybUNvbnRhaW5lciwgc3luY1BlbmRpbmdDb250cm9sc30gZnJvbSAnLi9zaGFyZWQnO1xuXG5leHBvcnQgY29uc3QgZm9ybURpcmVjdGl2ZVByb3ZpZGVyOiBhbnkgPSB7XG4gIHByb3ZpZGU6IENvbnRyb2xDb250YWluZXIsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nRm9ybSlcbn07XG5cbmNvbnN0IHJlc29sdmVkUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBDcmVhdGVzIGEgdG9wLWxldmVsIGBGb3JtR3JvdXBgIGluc3RhbmNlIGFuZCBiaW5kcyBpdCB0byBhIGZvcm1cbiAqIHRvIHRyYWNrIGFnZ3JlZ2F0ZSBmb3JtIHZhbHVlIGFuZCB2YWxpZGF0aW9uIHN0YXR1cy5cbiAqXG4gKiBBcyBzb29uIGFzIHlvdSBpbXBvcnQgdGhlIGBGb3Jtc01vZHVsZWAsIHRoaXMgZGlyZWN0aXZlIGJlY29tZXMgYWN0aXZlIGJ5IGRlZmF1bHQgb25cbiAqIGFsbCBgPGZvcm0+YCB0YWdzLiAgWW91IGRvbid0IG5lZWQgdG8gYWRkIGEgc3BlY2lhbCBzZWxlY3Rvci5cbiAqXG4gKiBZb3UgY2FuIGV4cG9ydCB0aGUgZGlyZWN0aXZlIGludG8gYSBsb2NhbCB0ZW1wbGF0ZSB2YXJpYWJsZSB1c2luZyBgbmdGb3JtYCBhcyB0aGUga2V5XG4gKiAoZXg6IGAjbXlGb3JtPVwibmdGb3JtXCJgKS4gVGhpcyBpcyBvcHRpb25hbCwgYnV0IHVzZWZ1bC4gIE1hbnkgcHJvcGVydGllcyBmcm9tIHRoZSB1bmRlcmx5aW5nXG4gKiBgRm9ybUdyb3VwYCBpbnN0YW5jZSBhcmUgZHVwbGljYXRlZCBvbiB0aGUgZGlyZWN0aXZlIGl0c2VsZiwgc28gYSByZWZlcmVuY2UgdG8gaXRcbiAqIHdpbGwgZ2l2ZSB5b3UgYWNjZXNzIHRvIHRoZSBhZ2dyZWdhdGUgdmFsdWUgYW5kIHZhbGlkaXR5IHN0YXR1cyBvZiB0aGUgZm9ybSwgYXMgd2VsbCBhc1xuICogdXNlciBpbnRlcmFjdGlvbiBwcm9wZXJ0aWVzIGxpa2UgYGRpcnR5YCBhbmQgYHRvdWNoZWRgLlxuICpcbiAqIFRvIHJlZ2lzdGVyIGNoaWxkIGNvbnRyb2xzIHdpdGggdGhlIGZvcm0sIHlvdSdsbCB3YW50IHRvIHVzZSBgTmdNb2RlbGAgd2l0aCBhXG4gKiBgbmFtZWAgYXR0cmlidXRlLiAgWW91IGNhbiBhbHNvIHVzZSBgTmdNb2RlbEdyb3VwYCBpZiB5b3UnZCBsaWtlIHRvIGNyZWF0ZVxuICogc3ViLWdyb3VwcyB3aXRoaW4gdGhlIGZvcm0uXG4gKlxuICogWW91IGNhbiBsaXN0ZW4gdG8gdGhlIGRpcmVjdGl2ZSdzIGBuZ1N1Ym1pdGAgZXZlbnQgdG8gYmUgbm90aWZpZWQgd2hlbiB0aGUgdXNlciBoYXNcbiAqIHRyaWdnZXJlZCBhIGZvcm0gc3VibWlzc2lvbi4gVGhlIGBuZ1N1Ym1pdGAgZXZlbnQgd2lsbCBiZSBlbWl0dGVkIHdpdGggdGhlIG9yaWdpbmFsIGZvcm1cbiAqIHN1Ym1pc3Npb24gZXZlbnQuXG4gKlxuICogSW4gdGVtcGxhdGUgZHJpdmVuIGZvcm1zLCBhbGwgYDxmb3JtPmAgdGFncyBhcmUgYXV0b21hdGljYWxseSB0YWdnZWQgYXMgYE5nRm9ybWAuXG4gKiBJZiB5b3Ugd2FudCB0byBpbXBvcnQgdGhlIGBGb3Jtc01vZHVsZWAgYnV0IHNraXAgaXRzIHVzYWdlIGluIHNvbWUgZm9ybXMsXG4gKiBmb3IgZXhhbXBsZSwgdG8gdXNlIG5hdGl2ZSBIVE1MNSB2YWxpZGF0aW9uLCB5b3UgY2FuIGFkZCBgbmdOb0Zvcm1gIGFuZCB0aGUgYDxmb3JtPmBcbiAqIHRhZ3Mgd29uJ3QgY3JlYXRlIGFuIGBOZ0Zvcm1gIGRpcmVjdGl2ZS4gSW4gcmVhY3RpdmUgZm9ybXMsIHVzaW5nIGBuZ05vRm9ybWAgaXNcbiAqIHVubmVjZXNzYXJ5IGJlY2F1c2UgdGhlIGA8Zm9ybT5gIHRhZ3MgYXJlIGluZXJ0LiBJbiB0aGF0IGNhc2UsIHlvdSB3b3VsZFxuICogcmVmcmFpbiBmcm9tIHVzaW5nIHRoZSBgZm9ybUdyb3VwYCBkaXJlY3RpdmUuXG4gKlxuICoge0BleGFtcGxlIGZvcm1zL3RzL3NpbXBsZUZvcm0vc2ltcGxlX2Zvcm1fZXhhbXBsZS50cyByZWdpb249J0NvbXBvbmVudCd9XG4gKlxuICogKiAqKm5wbSBwYWNrYWdlKio6IGBAYW5ndWxhci9mb3Jtc2BcbiAqXG4gKiAqICoqTmdNb2R1bGUqKjogYEZvcm1zTW9kdWxlYFxuICpcbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2Zvcm06bm90KFtuZ05vRm9ybV0pOm5vdChbZm9ybUdyb3VwXSksbmdGb3JtLFtuZ0Zvcm1dJyxcbiAgcHJvdmlkZXJzOiBbZm9ybURpcmVjdGl2ZVByb3ZpZGVyXSxcbiAgaG9zdDogeycoc3VibWl0KSc6ICdvblN1Ym1pdCgkZXZlbnQpJywgJyhyZXNldCknOiAnb25SZXNldCgpJ30sXG4gIG91dHB1dHM6IFsnbmdTdWJtaXQnXSxcbiAgZXhwb3J0QXM6ICduZ0Zvcm0nXG59KVxuZXhwb3J0IGNsYXNzIE5nRm9ybSBleHRlbmRzIENvbnRyb2xDb250YWluZXIgaW1wbGVtZW50cyBGb3JtLFxuICAgIEFmdGVyVmlld0luaXQge1xuICBwdWJsaWMgcmVhZG9ubHkgc3VibWl0dGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfZGlyZWN0aXZlczogTmdNb2RlbFtdID0gW107XG5cbiAgZm9ybTogRm9ybUdyb3VwO1xuICBuZ1N1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogT3B0aW9ucyBmb3IgdGhlIGBOZ0Zvcm1gIGluc3RhbmNlLiBBY2NlcHRzIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAgICpcbiAgICogKip1cGRhdGVPbioqOiBTZXJ2ZXMgYXMgdGhlIGRlZmF1bHQgYHVwZGF0ZU9uYCB2YWx1ZSBmb3IgYWxsIGNoaWxkIGBOZ01vZGVsc2AgYmVsb3cgaXRcbiAgICogKHVubGVzcyBhIGNoaWxkIGhhcyBleHBsaWNpdGx5IHNldCBpdHMgb3duIHZhbHVlIGZvciB0aGlzIGluIGBuZ01vZGVsT3B0aW9uc2ApLlxuICAgKiBQb3RlbnRpYWwgdmFsdWVzOiBgJ2NoYW5nZSdgIHwgYCdibHVyJ2AgfCBgJ3N1Ym1pdCdgXG4gICAqXG4gICAqIGBgYGh0bWxcbiAgICogPGZvcm0gW25nRm9ybU9wdGlvbnNdPVwie3VwZGF0ZU9uOiAnYmx1cid9XCI+XG4gICAqICAgIDxpbnB1dCBuYW1lPVwib25lXCIgbmdNb2RlbD4gIDwhLS0gdGhpcyBuZ01vZGVsIHdpbGwgdXBkYXRlIG9uIGJsdXIgLS0+XG4gICAqIDwvZm9ybT5cbiAgICogYGBgXG4gICAqXG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCduZ0Zvcm1PcHRpb25zJykgb3B0aW9ucyAhOiB7dXBkYXRlT24/OiBGb3JtSG9va3N9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX1ZBTElEQVRPUlMpIHZhbGlkYXRvcnM6IGFueVtdLFxuICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX0FTWU5DX1ZBTElEQVRPUlMpIGFzeW5jVmFsaWRhdG9yczogYW55W10pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZm9ybSA9XG4gICAgICAgIG5ldyBGb3JtR3JvdXAoe30sIGNvbXBvc2VWYWxpZGF0b3JzKHZhbGlkYXRvcnMpLCBjb21wb3NlQXN5bmNWYWxpZGF0b3JzKGFzeW5jVmFsaWRhdG9ycykpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkgeyB0aGlzLl9zZXRVcGRhdGVTdHJhdGVneSgpOyB9XG5cbiAgZ2V0IGZvcm1EaXJlY3RpdmUoKTogRm9ybSB7IHJldHVybiB0aGlzOyB9XG5cbiAgZ2V0IGNvbnRyb2woKTogRm9ybUdyb3VwIHsgcmV0dXJuIHRoaXMuZm9ybTsgfVxuXG4gIGdldCBwYXRoKCk6IHN0cmluZ1tdIHsgcmV0dXJuIFtdOyB9XG5cbiAgZ2V0IGNvbnRyb2xzKCk6IHtba2V5OiBzdHJpbmddOiBBYnN0cmFjdENvbnRyb2x9IHsgcmV0dXJuIHRoaXMuZm9ybS5jb250cm9sczsgfVxuXG4gIGFkZENvbnRyb2woZGlyOiBOZ01vZGVsKTogdm9pZCB7XG4gICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5fZmluZENvbnRhaW5lcihkaXIucGF0aCk7XG4gICAgICAoZGlyIGFze2NvbnRyb2w6IEZvcm1Db250cm9sfSkuY29udHJvbCA9XG4gICAgICAgICAgPEZvcm1Db250cm9sPmNvbnRhaW5lci5yZWdpc3RlckNvbnRyb2woZGlyLm5hbWUsIGRpci5jb250cm9sKTtcbiAgICAgIHNldFVwQ29udHJvbChkaXIuY29udHJvbCwgZGlyKTtcbiAgICAgIGRpci5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe2VtaXRFdmVudDogZmFsc2V9KTtcbiAgICAgIHRoaXMuX2RpcmVjdGl2ZXMucHVzaChkaXIpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29udHJvbChkaXI6IE5nTW9kZWwpOiBGb3JtQ29udHJvbCB7IHJldHVybiA8Rm9ybUNvbnRyb2w+dGhpcy5mb3JtLmdldChkaXIucGF0aCk7IH1cblxuICByZW1vdmVDb250cm9sKGRpcjogTmdNb2RlbCk6IHZvaWQge1xuICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2ZpbmRDb250YWluZXIoZGlyLnBhdGgpO1xuICAgICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICBjb250YWluZXIucmVtb3ZlQ29udHJvbChkaXIubmFtZSk7XG4gICAgICB9XG4gICAgICByZW1vdmVEaXI8TmdNb2RlbD4odGhpcy5fZGlyZWN0aXZlcywgZGlyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEZvcm1Hcm91cChkaXI6IE5nTW9kZWxHcm91cCk6IHZvaWQge1xuICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2ZpbmRDb250YWluZXIoZGlyLnBhdGgpO1xuICAgICAgY29uc3QgZ3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICAgIHNldFVwRm9ybUNvbnRhaW5lcihncm91cCwgZGlyKTtcbiAgICAgIGNvbnRhaW5lci5yZWdpc3RlckNvbnRyb2woZGlyLm5hbWUsIGdyb3VwKTtcbiAgICAgIGdyb3VwLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe2VtaXRFdmVudDogZmFsc2V9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUZvcm1Hcm91cChkaXI6IE5nTW9kZWxHcm91cCk6IHZvaWQge1xuICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2ZpbmRDb250YWluZXIoZGlyLnBhdGgpO1xuICAgICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICBjb250YWluZXIucmVtb3ZlQ29udHJvbChkaXIubmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRGb3JtR3JvdXAoZGlyOiBOZ01vZGVsR3JvdXApOiBGb3JtR3JvdXAgeyByZXR1cm4gPEZvcm1Hcm91cD50aGlzLmZvcm0uZ2V0KGRpci5wYXRoKTsgfVxuXG4gIHVwZGF0ZU1vZGVsKGRpcjogTmdDb250cm9sLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgY3RybCA9IDxGb3JtQ29udHJvbD50aGlzLmZvcm0uZ2V0KGRpci5wYXRoICEpO1xuICAgICAgY3RybC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRWYWx1ZSh2YWx1ZToge1trZXk6IHN0cmluZ106IGFueX0pOiB2b2lkIHsgdGhpcy5jb250cm9sLnNldFZhbHVlKHZhbHVlKTsgfVxuXG4gIG9uU3VibWl0KCRldmVudDogRXZlbnQpOiBib29sZWFuIHtcbiAgICAodGhpcyBhc3tzdWJtaXR0ZWQ6IGJvb2xlYW59KS5zdWJtaXR0ZWQgPSB0cnVlO1xuICAgIHN5bmNQZW5kaW5nQ29udHJvbHModGhpcy5mb3JtLCB0aGlzLl9kaXJlY3RpdmVzKTtcbiAgICB0aGlzLm5nU3VibWl0LmVtaXQoJGV2ZW50KTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBvblJlc2V0KCk6IHZvaWQgeyB0aGlzLnJlc2V0Rm9ybSgpOyB9XG5cbiAgcmVzZXRGb3JtKHZhbHVlOiBhbnkgPSB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmZvcm0ucmVzZXQodmFsdWUpO1xuICAgICh0aGlzIGFze3N1Ym1pdHRlZDogYm9vbGVhbn0pLnN1Ym1pdHRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0VXBkYXRlU3RyYXRlZ3koKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMudXBkYXRlT24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5mb3JtLl91cGRhdGVPbiA9IHRoaXMub3B0aW9ucy51cGRhdGVPbjtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9maW5kQ29udGFpbmVyKHBhdGg6IHN0cmluZ1tdKTogRm9ybUdyb3VwIHtcbiAgICBwYXRoLnBvcCgpO1xuICAgIHJldHVybiBwYXRoLmxlbmd0aCA/IDxGb3JtR3JvdXA+dGhpcy5mb3JtLmdldChwYXRoKSA6IHRoaXMuZm9ybTtcbiAgfVxufVxuIl19