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
 * \@description
 * An interface implemented by `FormGroupDirective` and `NgForm` directives.
 *
 * Only used by the `ReactiveFormsModule` and `FormsModule`.
 * @record
 */
export function Form() { }
/**
 * \@description
 * Add a control to this form.
 *
 * \@param dir The control directive to add to the form.
 * @type {?}
 */
Form.prototype.addControl;
/**
 * \@description
 * Remove a control from this form.
 *
 * \@param dir: The control directive to remove from the form.
 * @type {?}
 */
Form.prototype.removeControl;
/**
 * \@description
 * The control directive from which to get the `FormControl`.
 *
 * \@param dir: The control directive.
 * @type {?}
 */
Form.prototype.getControl;
/**
 * \@description
 * Add a group of controls to this form.
 *
 * \@param dir: The control group directive to add.
 * @type {?}
 */
Form.prototype.addFormGroup;
/**
 * \@description
 * Remove a group of controls to this form.
 *
 * \@param dir: The control group directive to remove.
 * @type {?}
 */
Form.prototype.removeFormGroup;
/**
 * \@description
 * The `FormGroup` associated with a particular `AbstractFormGroupDirective`.
 *
 * \@param dir: The form group directive from which to get the `FormGroup`.
 * @type {?}
 */
Form.prototype.getFormGroup;
/**
 * \@description
 * Update the model for a particular control with a new value.
 *
 * \@param dir: The control directive to update.
 * \@param value: The new value for the control.
 * @type {?}
 */
Form.prototype.updateModel;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9mb3Jtcy9zcmMvZGlyZWN0aXZlcy9mb3JtX2ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Zvcm1Db250cm9sLCBGb3JtR3JvdXB9IGZyb20gJy4uL21vZGVsJztcblxuaW1wb3J0IHtBYnN0cmFjdEZvcm1Hcm91cERpcmVjdGl2ZX0gZnJvbSAnLi9hYnN0cmFjdF9mb3JtX2dyb3VwX2RpcmVjdGl2ZSc7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnLi9uZ19jb250cm9sJztcblxuXG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBbiBpbnRlcmZhY2UgaW1wbGVtZW50ZWQgYnkgYEZvcm1Hcm91cERpcmVjdGl2ZWAgYW5kIGBOZ0Zvcm1gIGRpcmVjdGl2ZXMuXG4gKlxuICogT25seSB1c2VkIGJ5IHRoZSBgUmVhY3RpdmVGb3Jtc01vZHVsZWAgYW5kIGBGb3Jtc01vZHVsZWAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybSB7XG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQWRkIGEgY29udHJvbCB0byB0aGlzIGZvcm0uXG4gICAqXG4gICAqIEBwYXJhbSBkaXIgVGhlIGNvbnRyb2wgZGlyZWN0aXZlIHRvIGFkZCB0byB0aGUgZm9ybS5cbiAgICovXG4gIGFkZENvbnRyb2woZGlyOiBOZ0NvbnRyb2wpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogUmVtb3ZlIGEgY29udHJvbCBmcm9tIHRoaXMgZm9ybS5cbiAgICpcbiAgICogQHBhcmFtIGRpcjogVGhlIGNvbnRyb2wgZGlyZWN0aXZlIHRvIHJlbW92ZSBmcm9tIHRoZSBmb3JtLlxuICAgKi9cbiAgcmVtb3ZlQ29udHJvbChkaXI6IE5nQ29udHJvbCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGUgY29udHJvbCBkaXJlY3RpdmUgZnJvbSB3aGljaCB0byBnZXQgdGhlIGBGb3JtQ29udHJvbGAuXG4gICAqXG4gICAqIEBwYXJhbSBkaXI6IFRoZSBjb250cm9sIGRpcmVjdGl2ZS5cbiAgICovXG4gIGdldENvbnRyb2woZGlyOiBOZ0NvbnRyb2wpOiBGb3JtQ29udHJvbDtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEFkZCBhIGdyb3VwIG9mIGNvbnRyb2xzIHRvIHRoaXMgZm9ybS5cbiAgICpcbiAgICogQHBhcmFtIGRpcjogVGhlIGNvbnRyb2wgZ3JvdXAgZGlyZWN0aXZlIHRvIGFkZC5cbiAgICovXG4gIGFkZEZvcm1Hcm91cChkaXI6IEFic3RyYWN0Rm9ybUdyb3VwRGlyZWN0aXZlKTogdm9pZDtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFJlbW92ZSBhIGdyb3VwIG9mIGNvbnRyb2xzIHRvIHRoaXMgZm9ybS5cbiAgICpcbiAgICogQHBhcmFtIGRpcjogVGhlIGNvbnRyb2wgZ3JvdXAgZGlyZWN0aXZlIHRvIHJlbW92ZS5cbiAgICovXG4gIHJlbW92ZUZvcm1Hcm91cChkaXI6IEFic3RyYWN0Rm9ybUdyb3VwRGlyZWN0aXZlKTogdm9pZDtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoZSBgRm9ybUdyb3VwYCBhc3NvY2lhdGVkIHdpdGggYSBwYXJ0aWN1bGFyIGBBYnN0cmFjdEZvcm1Hcm91cERpcmVjdGl2ZWAuXG4gICAqXG4gICAqIEBwYXJhbSBkaXI6IFRoZSBmb3JtIGdyb3VwIGRpcmVjdGl2ZSBmcm9tIHdoaWNoIHRvIGdldCB0aGUgYEZvcm1Hcm91cGAuXG4gICAqL1xuICBnZXRGb3JtR3JvdXAoZGlyOiBBYnN0cmFjdEZvcm1Hcm91cERpcmVjdGl2ZSk6IEZvcm1Hcm91cDtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFVwZGF0ZSB0aGUgbW9kZWwgZm9yIGEgcGFydGljdWxhciBjb250cm9sIHdpdGggYSBuZXcgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSBkaXI6IFRoZSBjb250cm9sIGRpcmVjdGl2ZSB0byB1cGRhdGUuXG4gICAqIEBwYXJhbSB2YWx1ZTogVGhlIG5ldyB2YWx1ZSBmb3IgdGhlIGNvbnRyb2wuXG4gICAqL1xuICB1cGRhdGVNb2RlbChkaXI6IE5nQ29udHJvbCwgdmFsdWU6IGFueSk6IHZvaWQ7XG59XG4iXX0=