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
import { Directive, Input, TemplateRef, ViewContainerRef, ɵstringify as stringify } from '@angular/core';
/**
 * Conditionally includes a template based on the value of an `expression`.
 *
 * `ngIf` evaluates the `expression` and then renders the `then` or `else` template in its place
 * when expression is truthy or falsy respectively. Typically the:
 *  - `then` template is the inline template of `ngIf` unless bound to a different value.
 *  - `else` template is blank unless it is bound.
 *
 *
 * \@usageNotes
 *
 * ### Most common usage
 *
 * The most common usage of the `ngIf` directive is to conditionally show the inline template as
 * seen in this example:
 * {\@example common/ngIf/ts/module.ts region='NgIfSimple'}
 *
 * ### Showing an alternative template using `else`
 *
 * If it is necessary to display a template when the `expression` is falsy use the `else` template
 * binding as shown. Note that the `else` binding points to a `<ng-template>` labeled `#elseBlock`.
 * The template can be defined anywhere in the component view but is typically placed right after
 * `ngIf` for readability.
 *
 * {\@example common/ngIf/ts/module.ts region='NgIfElse'}
 *
 * ### Using non-inlined `then` template
 *
 * Usually the `then` template is the inlined template of the `ngIf`, but it can be changed using
 * a binding (just like `else`). Because `then` and `else` are bindings, the template references can
 * change at runtime as shown in this example.
 *
 * {\@example common/ngIf/ts/module.ts region='NgIfThenElse'}
 *
 * ### Storing conditional result in a variable
 *
 * A common pattern is that we need to show a set of properties from the same object. If the
 * object is undefined, then we have to use the safe-traversal-operator `?.` to guard against
 * dereferencing a `null` value. This is especially the case when waiting on async data such as
 * when using the `async` pipe as shown in following example:
 *
 * ```
 * Hello {{ (userStream|async)?.last }}, {{ (userStream|async)?.first }}!
 * ```
 *
 * There are several inefficiencies in the above example:
 *  - We create multiple subscriptions on `userStream`. One for each `async` pipe, or two in the
 *    example above.
 *  - We cannot display an alternative screen while waiting for the data to arrive asynchronously.
 *  - We have to use the safe-traversal-operator `?.` to access properties, which is cumbersome.
 *  - We have to place the `async` pipe in parenthesis.
 *
 * A better way to do this is to use `ngIf` and store the result of the condition in a local
 * variable as shown in the the example below:
 *
 * {\@example common/ngIf/ts/module.ts region='NgIfAs'}
 *
 * Notice that:
 *  - We use only one `async` pipe and hence only one subscription gets created.
 *  - `ngIf` stores the result of the `userStream|async` in the local variable `user`.
 *  - The local `user` can then be bound repeatedly in a more efficient way.
 *  - No need to use the safe-traversal-operator `?.` to access properties as `ngIf` will only
 *    display the data if `userStream` returns a value.
 *  - We can display an alternative template while waiting for the data.
 *
 * ### Syntax
 *
 * Simple form:
 * - `<div *ngIf="condition">...</div>`
 * - `<ng-template [ngIf]="condition"><div>...</div></ng-template>`
 *
 * Form with an else block:
 * ```
 * <div *ngIf="condition; else elseBlock">...</div>
 * <ng-template #elseBlock>...</ng-template>
 * ```
 *
 * Form with a `then` and `else` block:
 * ```
 * <div *ngIf="condition; then thenBlock else elseBlock"></div>
 * <ng-template #thenBlock>...</ng-template>
 * <ng-template #elseBlock>...</ng-template>
 * ```
 *
 * Form with storing the value locally:
 * ```
 * <div *ngIf="condition as value; else elseBlock">{{value}}</div>
 * <ng-template #elseBlock>...</ng-template>
 * ```
 *
 *
 */
export class NgIf {
    /**
     * @param {?} _viewContainer
     * @param {?} templateRef
     */
    constructor(_viewContainer, templateRef) {
        this._viewContainer = _viewContainer;
        this._context = new NgIfContext();
        this._thenTemplateRef = null;
        this._elseTemplateRef = null;
        this._thenViewRef = null;
        this._elseViewRef = null;
        this._thenTemplateRef = templateRef;
    }
    /**
     * @param {?} condition
     * @return {?}
     */
    set ngIf(condition) {
        this._context.$implicit = this._context.ngIf = condition;
        this._updateView();
    }
    /**
     * @param {?} templateRef
     * @return {?}
     */
    set ngIfThen(templateRef) {
        assertTemplate('ngIfThen', templateRef);
        this._thenTemplateRef = templateRef;
        this._thenViewRef = null; // clear previous view if any.
        this._updateView();
    }
    /**
     * @param {?} templateRef
     * @return {?}
     */
    set ngIfElse(templateRef) {
        assertTemplate('ngIfElse', templateRef);
        this._elseTemplateRef = templateRef;
        this._elseViewRef = null; // clear previous view if any.
        this._updateView();
    }
    /**
     * @return {?}
     */
    _updateView() {
        if (this._context.$implicit) {
            if (!this._thenViewRef) {
                this._viewContainer.clear();
                this._elseViewRef = null;
                if (this._thenTemplateRef) {
                    this._thenViewRef =
                        this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
                }
            }
        }
        else {
            if (!this._elseViewRef) {
                this._viewContainer.clear();
                this._thenViewRef = null;
                if (this._elseTemplateRef) {
                    this._elseViewRef =
                        this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
                }
            }
        }
    }
}
NgIf.decorators = [
    { type: Directive, args: [{ selector: '[ngIf]' },] }
];
/** @nocollapse */
NgIf.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef }
];
NgIf.propDecorators = {
    ngIf: [{ type: Input }],
    ngIfThen: [{ type: Input }],
    ngIfElse: [{ type: Input }]
};
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    NgIf.ngIfUseIfTypeGuard;
    /** @type {?} */
    NgIf.prototype._context;
    /** @type {?} */
    NgIf.prototype._thenTemplateRef;
    /** @type {?} */
    NgIf.prototype._elseTemplateRef;
    /** @type {?} */
    NgIf.prototype._thenViewRef;
    /** @type {?} */
    NgIf.prototype._elseViewRef;
    /** @type {?} */
    NgIf.prototype._viewContainer;
}
export class NgIfContext {
    constructor() {
        this.$implicit = null;
        this.ngIf = null;
    }
}
if (false) {
    /** @type {?} */
    NgIfContext.prototype.$implicit;
    /** @type {?} */
    NgIfContext.prototype.ngIf;
}
/**
 * @param {?} property
 * @param {?} templateRef
 * @return {?}
 */
function assertTemplate(property, templateRef) {
    /** @type {?} */
    const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
    if (!isTemplateRefOrNull) {
        throw new Error(`${property} must be a TemplateRef, but received '${stringify(templateRef)}'.`);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfaWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vc3JjL2RpcmVjdGl2ZXMvbmdfaWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsU0FBUyxFQUFtQixLQUFLLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsSUFBSSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdHeEgsTUFBTTs7Ozs7SUFPSixZQUFvQixjQUFnQyxFQUFFLFdBQXFDO1FBQXZFLG1CQUFjLEdBQWQsY0FBYyxDQUFrQjt3QkFOcEIsSUFBSSxXQUFXLEVBQUU7Z0NBQ1MsSUFBSTtnQ0FDSixJQUFJOzRCQUNKLElBQUk7NEJBQ0osSUFBSTtRQUc1RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO0tBQ3JDOzs7OztJQUVELElBQ0ksSUFBSSxDQUFDLFNBQWM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3pELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQjs7Ozs7SUFFRCxJQUNJLFFBQVEsQ0FBQyxXQUEwQztRQUNyRCxjQUFjLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7UUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BCOzs7OztJQUVELElBQ0ksUUFBUSxDQUFDLFdBQTBDO1FBQ3JELGNBQWMsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFdBQVcsQ0FBQztRQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEI7Ozs7SUFFTyxXQUFXO1FBQ2pCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUN6QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDekIsSUFBSSxDQUFDLFlBQVk7d0JBQ2IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUNsRjthQUNGO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDekIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxZQUFZO3dCQUNiLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDbEY7YUFDRjtTQUNGOzs7O1lBckRKLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUM7Ozs7WUEvRnlCLGdCQUFnQjtZQUE3QixXQUFXOzs7bUJBMkduRCxLQUFLO3VCQU1MLEtBQUs7dUJBUUwsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0NSLE1BQU07O3lCQUNvQixJQUFJO29CQUNULElBQUk7O0NBQ3hCOzs7Ozs7Ozs7Ozs7QUFFRCx3QkFBd0IsUUFBZ0IsRUFBRSxXQUFtQzs7SUFDM0UsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMvRSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7UUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLFFBQVEseUNBQXlDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakc7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVtYmVkZGVkVmlld1JlZiwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmLCDJtXN0cmluZ2lmeSBhcyBzdHJpbmdpZnl9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKlxuICogQ29uZGl0aW9uYWxseSBpbmNsdWRlcyBhIHRlbXBsYXRlIGJhc2VkIG9uIHRoZSB2YWx1ZSBvZiBhbiBgZXhwcmVzc2lvbmAuXG4gKlxuICogYG5nSWZgIGV2YWx1YXRlcyB0aGUgYGV4cHJlc3Npb25gIGFuZCB0aGVuIHJlbmRlcnMgdGhlIGB0aGVuYCBvciBgZWxzZWAgdGVtcGxhdGUgaW4gaXRzIHBsYWNlXG4gKiB3aGVuIGV4cHJlc3Npb24gaXMgdHJ1dGh5IG9yIGZhbHN5IHJlc3BlY3RpdmVseS4gVHlwaWNhbGx5IHRoZTpcbiAqICAtIGB0aGVuYCB0ZW1wbGF0ZSBpcyB0aGUgaW5saW5lIHRlbXBsYXRlIG9mIGBuZ0lmYCB1bmxlc3MgYm91bmQgdG8gYSBkaWZmZXJlbnQgdmFsdWUuXG4gKiAgLSBgZWxzZWAgdGVtcGxhdGUgaXMgYmxhbmsgdW5sZXNzIGl0IGlzIGJvdW5kLlxuICpcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqICMjIyBNb3N0IGNvbW1vbiB1c2FnZVxuICpcbiAqIFRoZSBtb3N0IGNvbW1vbiB1c2FnZSBvZiB0aGUgYG5nSWZgIGRpcmVjdGl2ZSBpcyB0byBjb25kaXRpb25hbGx5IHNob3cgdGhlIGlubGluZSB0ZW1wbGF0ZSBhc1xuICogc2VlbiBpbiB0aGlzIGV4YW1wbGU6XG4gKiB7QGV4YW1wbGUgY29tbW9uL25nSWYvdHMvbW9kdWxlLnRzIHJlZ2lvbj0nTmdJZlNpbXBsZSd9XG4gKlxuICogIyMjIFNob3dpbmcgYW4gYWx0ZXJuYXRpdmUgdGVtcGxhdGUgdXNpbmcgYGVsc2VgXG4gKlxuICogSWYgaXQgaXMgbmVjZXNzYXJ5IHRvIGRpc3BsYXkgYSB0ZW1wbGF0ZSB3aGVuIHRoZSBgZXhwcmVzc2lvbmAgaXMgZmFsc3kgdXNlIHRoZSBgZWxzZWAgdGVtcGxhdGVcbiAqIGJpbmRpbmcgYXMgc2hvd24uIE5vdGUgdGhhdCB0aGUgYGVsc2VgIGJpbmRpbmcgcG9pbnRzIHRvIGEgYDxuZy10ZW1wbGF0ZT5gIGxhYmVsZWQgYCNlbHNlQmxvY2tgLlxuICogVGhlIHRlbXBsYXRlIGNhbiBiZSBkZWZpbmVkIGFueXdoZXJlIGluIHRoZSBjb21wb25lbnQgdmlldyBidXQgaXMgdHlwaWNhbGx5IHBsYWNlZCByaWdodCBhZnRlclxuICogYG5nSWZgIGZvciByZWFkYWJpbGl0eS5cbiAqXG4gKiB7QGV4YW1wbGUgY29tbW9uL25nSWYvdHMvbW9kdWxlLnRzIHJlZ2lvbj0nTmdJZkVsc2UnfVxuICpcbiAqICMjIyBVc2luZyBub24taW5saW5lZCBgdGhlbmAgdGVtcGxhdGVcbiAqXG4gKiBVc3VhbGx5IHRoZSBgdGhlbmAgdGVtcGxhdGUgaXMgdGhlIGlubGluZWQgdGVtcGxhdGUgb2YgdGhlIGBuZ0lmYCwgYnV0IGl0IGNhbiBiZSBjaGFuZ2VkIHVzaW5nXG4gKiBhIGJpbmRpbmcgKGp1c3QgbGlrZSBgZWxzZWApLiBCZWNhdXNlIGB0aGVuYCBhbmQgYGVsc2VgIGFyZSBiaW5kaW5ncywgdGhlIHRlbXBsYXRlIHJlZmVyZW5jZXMgY2FuXG4gKiBjaGFuZ2UgYXQgcnVudGltZSBhcyBzaG93biBpbiB0aGlzIGV4YW1wbGUuXG4gKlxuICoge0BleGFtcGxlIGNvbW1vbi9uZ0lmL3RzL21vZHVsZS50cyByZWdpb249J05nSWZUaGVuRWxzZSd9XG4gKlxuICogIyMjIFN0b3JpbmcgY29uZGl0aW9uYWwgcmVzdWx0IGluIGEgdmFyaWFibGVcbiAqXG4gKiBBIGNvbW1vbiBwYXR0ZXJuIGlzIHRoYXQgd2UgbmVlZCB0byBzaG93IGEgc2V0IG9mIHByb3BlcnRpZXMgZnJvbSB0aGUgc2FtZSBvYmplY3QuIElmIHRoZVxuICogb2JqZWN0IGlzIHVuZGVmaW5lZCwgdGhlbiB3ZSBoYXZlIHRvIHVzZSB0aGUgc2FmZS10cmF2ZXJzYWwtb3BlcmF0b3IgYD8uYCB0byBndWFyZCBhZ2FpbnN0XG4gKiBkZXJlZmVyZW5jaW5nIGEgYG51bGxgIHZhbHVlLiBUaGlzIGlzIGVzcGVjaWFsbHkgdGhlIGNhc2Ugd2hlbiB3YWl0aW5nIG9uIGFzeW5jIGRhdGEgc3VjaCBhc1xuICogd2hlbiB1c2luZyB0aGUgYGFzeW5jYCBwaXBlIGFzIHNob3duIGluIGZvbGxvd2luZyBleGFtcGxlOlxuICpcbiAqIGBgYFxuICogSGVsbG8ge3sgKHVzZXJTdHJlYW18YXN5bmMpPy5sYXN0IH19LCB7eyAodXNlclN0cmVhbXxhc3luYyk/LmZpcnN0IH19IVxuICogYGBgXG4gKlxuICogVGhlcmUgYXJlIHNldmVyYWwgaW5lZmZpY2llbmNpZXMgaW4gdGhlIGFib3ZlIGV4YW1wbGU6XG4gKiAgLSBXZSBjcmVhdGUgbXVsdGlwbGUgc3Vic2NyaXB0aW9ucyBvbiBgdXNlclN0cmVhbWAuIE9uZSBmb3IgZWFjaCBgYXN5bmNgIHBpcGUsIG9yIHR3byBpbiB0aGVcbiAqICAgIGV4YW1wbGUgYWJvdmUuXG4gKiAgLSBXZSBjYW5ub3QgZGlzcGxheSBhbiBhbHRlcm5hdGl2ZSBzY3JlZW4gd2hpbGUgd2FpdGluZyBmb3IgdGhlIGRhdGEgdG8gYXJyaXZlIGFzeW5jaHJvbm91c2x5LlxuICogIC0gV2UgaGF2ZSB0byB1c2UgdGhlIHNhZmUtdHJhdmVyc2FsLW9wZXJhdG9yIGA/LmAgdG8gYWNjZXNzIHByb3BlcnRpZXMsIHdoaWNoIGlzIGN1bWJlcnNvbWUuXG4gKiAgLSBXZSBoYXZlIHRvIHBsYWNlIHRoZSBgYXN5bmNgIHBpcGUgaW4gcGFyZW50aGVzaXMuXG4gKlxuICogQSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMgaXMgdG8gdXNlIGBuZ0lmYCBhbmQgc3RvcmUgdGhlIHJlc3VsdCBvZiB0aGUgY29uZGl0aW9uIGluIGEgbG9jYWxcbiAqIHZhcmlhYmxlIGFzIHNob3duIGluIHRoZSB0aGUgZXhhbXBsZSBiZWxvdzpcbiAqXG4gKiB7QGV4YW1wbGUgY29tbW9uL25nSWYvdHMvbW9kdWxlLnRzIHJlZ2lvbj0nTmdJZkFzJ31cbiAqXG4gKiBOb3RpY2UgdGhhdDpcbiAqICAtIFdlIHVzZSBvbmx5IG9uZSBgYXN5bmNgIHBpcGUgYW5kIGhlbmNlIG9ubHkgb25lIHN1YnNjcmlwdGlvbiBnZXRzIGNyZWF0ZWQuXG4gKiAgLSBgbmdJZmAgc3RvcmVzIHRoZSByZXN1bHQgb2YgdGhlIGB1c2VyU3RyZWFtfGFzeW5jYCBpbiB0aGUgbG9jYWwgdmFyaWFibGUgYHVzZXJgLlxuICogIC0gVGhlIGxvY2FsIGB1c2VyYCBjYW4gdGhlbiBiZSBib3VuZCByZXBlYXRlZGx5IGluIGEgbW9yZSBlZmZpY2llbnQgd2F5LlxuICogIC0gTm8gbmVlZCB0byB1c2UgdGhlIHNhZmUtdHJhdmVyc2FsLW9wZXJhdG9yIGA/LmAgdG8gYWNjZXNzIHByb3BlcnRpZXMgYXMgYG5nSWZgIHdpbGwgb25seVxuICogICAgZGlzcGxheSB0aGUgZGF0YSBpZiBgdXNlclN0cmVhbWAgcmV0dXJucyBhIHZhbHVlLlxuICogIC0gV2UgY2FuIGRpc3BsYXkgYW4gYWx0ZXJuYXRpdmUgdGVtcGxhdGUgd2hpbGUgd2FpdGluZyBmb3IgdGhlIGRhdGEuXG4gKlxuICogIyMjIFN5bnRheFxuICpcbiAqIFNpbXBsZSBmb3JtOlxuICogLSBgPGRpdiAqbmdJZj1cImNvbmRpdGlvblwiPi4uLjwvZGl2PmBcbiAqIC0gYDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJjb25kaXRpb25cIj48ZGl2Pi4uLjwvZGl2PjwvbmctdGVtcGxhdGU+YFxuICpcbiAqIEZvcm0gd2l0aCBhbiBlbHNlIGJsb2NrOlxuICogYGBgXG4gKiA8ZGl2ICpuZ0lmPVwiY29uZGl0aW9uOyBlbHNlIGVsc2VCbG9ja1wiPi4uLjwvZGl2PlxuICogPG5nLXRlbXBsYXRlICNlbHNlQmxvY2s+Li4uPC9uZy10ZW1wbGF0ZT5cbiAqIGBgYFxuICpcbiAqIEZvcm0gd2l0aCBhIGB0aGVuYCBhbmQgYGVsc2VgIGJsb2NrOlxuICogYGBgXG4gKiA8ZGl2ICpuZ0lmPVwiY29uZGl0aW9uOyB0aGVuIHRoZW5CbG9jayBlbHNlIGVsc2VCbG9ja1wiPjwvZGl2PlxuICogPG5nLXRlbXBsYXRlICN0aGVuQmxvY2s+Li4uPC9uZy10ZW1wbGF0ZT5cbiAqIDxuZy10ZW1wbGF0ZSAjZWxzZUJsb2NrPi4uLjwvbmctdGVtcGxhdGU+XG4gKiBgYGBcbiAqXG4gKiBGb3JtIHdpdGggc3RvcmluZyB0aGUgdmFsdWUgbG9jYWxseTpcbiAqIGBgYFxuICogPGRpdiAqbmdJZj1cImNvbmRpdGlvbiBhcyB2YWx1ZTsgZWxzZSBlbHNlQmxvY2tcIj57e3ZhbHVlfX08L2Rpdj5cbiAqIDxuZy10ZW1wbGF0ZSAjZWxzZUJsb2NrPi4uLjwvbmctdGVtcGxhdGU+XG4gKiBgYGBcbiAqXG4gKlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ0lmXSd9KVxuZXhwb3J0IGNsYXNzIE5nSWYge1xuICBwcml2YXRlIF9jb250ZXh0OiBOZ0lmQ29udGV4dCA9IG5ldyBOZ0lmQ29udGV4dCgpO1xuICBwcml2YXRlIF90aGVuVGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPE5nSWZDb250ZXh0PnxudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfZWxzZVRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ0lmQ29udGV4dD58bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX3RoZW5WaWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8TmdJZkNvbnRleHQ+fG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9lbHNlVmlld1JlZjogRW1iZWRkZWRWaWV3UmVmPE5nSWZDb250ZXh0PnxudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF92aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdJZkNvbnRleHQ+KSB7XG4gICAgdGhpcy5fdGhlblRlbXBsYXRlUmVmID0gdGVtcGxhdGVSZWY7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbmdJZihjb25kaXRpb246IGFueSkge1xuICAgIHRoaXMuX2NvbnRleHQuJGltcGxpY2l0ID0gdGhpcy5fY29udGV4dC5uZ0lmID0gY29uZGl0aW9uO1xuICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuZ0lmVGhlbih0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdJZkNvbnRleHQ+fG51bGwpIHtcbiAgICBhc3NlcnRUZW1wbGF0ZSgnbmdJZlRoZW4nLCB0ZW1wbGF0ZVJlZik7XG4gICAgdGhpcy5fdGhlblRlbXBsYXRlUmVmID0gdGVtcGxhdGVSZWY7XG4gICAgdGhpcy5fdGhlblZpZXdSZWYgPSBudWxsOyAgLy8gY2xlYXIgcHJldmlvdXMgdmlldyBpZiBhbnkuXG4gICAgdGhpcy5fdXBkYXRlVmlldygpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG5nSWZFbHNlKHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ0lmQ29udGV4dD58bnVsbCkge1xuICAgIGFzc2VydFRlbXBsYXRlKCduZ0lmRWxzZScsIHRlbXBsYXRlUmVmKTtcbiAgICB0aGlzLl9lbHNlVGVtcGxhdGVSZWYgPSB0ZW1wbGF0ZVJlZjtcbiAgICB0aGlzLl9lbHNlVmlld1JlZiA9IG51bGw7ICAvLyBjbGVhciBwcmV2aW91cyB2aWV3IGlmIGFueS5cbiAgICB0aGlzLl91cGRhdGVWaWV3KCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVWaWV3KCkge1xuICAgIGlmICh0aGlzLl9jb250ZXh0LiRpbXBsaWNpdCkge1xuICAgICAgaWYgKCF0aGlzLl90aGVuVmlld1JlZikge1xuICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuX2Vsc2VWaWV3UmVmID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX3RoZW5UZW1wbGF0ZVJlZikge1xuICAgICAgICAgIHRoaXMuX3RoZW5WaWV3UmVmID1cbiAgICAgICAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5fdGhlblRlbXBsYXRlUmVmLCB0aGlzLl9jb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuX2Vsc2VWaWV3UmVmKSB7XG4gICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fdGhlblZpZXdSZWYgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5fZWxzZVRlbXBsYXRlUmVmKSB7XG4gICAgICAgICAgdGhpcy5fZWxzZVZpZXdSZWYgPVxuICAgICAgICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLl9lbHNlVGVtcGxhdGVSZWYsIHRoaXMuX2NvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgc3RhdGljIG5nSWZVc2VJZlR5cGVHdWFyZDogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIE5nSWZDb250ZXh0IHtcbiAgcHVibGljICRpbXBsaWNpdDogYW55ID0gbnVsbDtcbiAgcHVibGljIG5nSWY6IGFueSA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGFzc2VydFRlbXBsYXRlKHByb3BlcnR5OiBzdHJpbmcsIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+fCBudWxsKTogdm9pZCB7XG4gIGNvbnN0IGlzVGVtcGxhdGVSZWZPck51bGwgPSAhISghdGVtcGxhdGVSZWYgfHwgdGVtcGxhdGVSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KTtcbiAgaWYgKCFpc1RlbXBsYXRlUmVmT3JOdWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke3Byb3BlcnR5fSBtdXN0IGJlIGEgVGVtcGxhdGVSZWYsIGJ1dCByZWNlaXZlZCAnJHtzdHJpbmdpZnkodGVtcGxhdGVSZWYpfScuYCk7XG4gIH1cbn1cbiJdfQ==