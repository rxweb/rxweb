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
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * \@ngModule CommonModule
 *
 * \@description
 *
 * Inserts an embedded view from a prepared `TemplateRef`.
 *
 * You can attach a context object to the `EmbeddedViewRef` by setting `[ngTemplateOutletContext]`.
 * `[ngTemplateOutletContext]` should be an object, the object's keys will be available for binding
 * by the local template `let` declarations.
 *
 * \@usageNotes
 * ```
 * <ng-container *ngTemplateOutlet="templateRefExp; context: contextExp"></ng-container>
 * ```
 *
 * Using the key `$implicit` in the context object will set its value as default.
 *
 * ### Example
 *
 * {\@example common/ngTemplateOutlet/ts/module.ts region='NgTemplateOutlet'}
 *
 */
export class NgTemplateOutlet {
    /**
     * @param {?} _viewContainerRef
     */
    constructor(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const recreateView = this._shouldRecreateView(changes);
        if (recreateView) {
            if (this._viewRef) {
                this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._viewRef));
            }
            if (this.ngTemplateOutlet) {
                this._viewRef = this._viewContainerRef.createEmbeddedView(this.ngTemplateOutlet, this.ngTemplateOutletContext);
            }
        }
        else {
            if (this._viewRef && this.ngTemplateOutletContext) {
                this._updateExistingContext(this.ngTemplateOutletContext);
            }
        }
    }
    /**
     * We need to re-create existing embedded view if:
     * - templateRef has changed
     * - context has changes
     *
     * We mark context object as changed when the corresponding object
     * shape changes (new properties are added or existing properties are removed).
     * In other words we consider context with the same properties as "the same" even
     * if object reference changes (see https://github.com/angular/angular/issues/13407).
     * @param {?} changes
     * @return {?}
     */
    _shouldRecreateView(changes) {
        /** @type {?} */
        const ctxChange = changes['ngTemplateOutletContext'];
        return !!changes['ngTemplateOutlet'] || (ctxChange && this._hasContextShapeChanged(ctxChange));
    }
    /**
     * @param {?} ctxChange
     * @return {?}
     */
    _hasContextShapeChanged(ctxChange) {
        /** @type {?} */
        const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
        /** @type {?} */
        const currCtxKeys = Object.keys(ctxChange.currentValue || {});
        if (prevCtxKeys.length === currCtxKeys.length) {
            for (let propName of currCtxKeys) {
                if (prevCtxKeys.indexOf(propName) === -1) {
                    return true;
                }
            }
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    _updateExistingContext(ctx) {
        for (let propName of Object.keys(ctx)) {
            (/** @type {?} */ (this._viewRef.context))[propName] = (/** @type {?} */ (this.ngTemplateOutletContext))[propName];
        }
    }
}
NgTemplateOutlet.decorators = [
    { type: Directive, args: [{ selector: '[ngTemplateOutlet]' },] }
];
/** @nocollapse */
NgTemplateOutlet.ctorParameters = () => [
    { type: ViewContainerRef }
];
NgTemplateOutlet.propDecorators = {
    ngTemplateOutletContext: [{ type: Input }],
    ngTemplateOutlet: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgTemplateOutlet.prototype._viewRef;
    /** @type {?} */
    NgTemplateOutlet.prototype.ngTemplateOutletContext;
    /** @type {?} */
    NgTemplateOutlet.prototype.ngTemplateOutlet;
    /** @type {?} */
    NgTemplateOutlet.prototype._viewContainerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfdGVtcGxhdGVfb3V0bGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tbW9uL3NyYy9kaXJlY3RpdmVzL25nX3RlbXBsYXRlX291dGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxTQUFTLEVBQW1CLEtBQUssRUFBMEMsV0FBVyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQnZJLE1BQU07Ozs7SUFVSixZQUFvQixpQkFBbUM7UUFBbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtLQUFJOzs7OztJQUUzRCxXQUFXLENBQUMsT0FBc0I7O1FBQ2hDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV2RCxJQUFJLFlBQVksRUFBRTtZQUNoQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUM5RTtZQUVELElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FDckQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2FBQzFEO1NBQ0Y7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQzthQUMzRDtTQUNGO0tBQ0Y7Ozs7Ozs7Ozs7Ozs7SUFZTyxtQkFBbUIsQ0FBQyxPQUFzQjs7UUFDaEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDckQsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUd6Rix1QkFBdUIsQ0FBQyxTQUF1Qjs7UUFDckQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxDQUFDOztRQUMvRCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLENBQUM7UUFFOUQsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDN0MsS0FBSyxJQUFJLFFBQVEsSUFBSSxXQUFXLEVBQUU7Z0JBQ2hDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDeEMsT0FBTyxJQUFJLENBQUM7aUJBQ2I7YUFDRjtZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7Ozs7OztJQUdLLHNCQUFzQixDQUFDLEdBQVc7UUFDeEMsS0FBSyxJQUFJLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JDLG1CQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsbUJBQU0sSUFBSSxDQUFDLHVCQUF1QixFQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDeEY7Ozs7WUFsRUosU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLG9CQUFvQixFQUFDOzs7O1lBekJxRCxnQkFBZ0I7OztzQ0ErQjdHLEtBQUs7K0JBR0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVtYmVkZGVkVmlld1JlZiwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIEluc2VydHMgYW4gZW1iZWRkZWQgdmlldyBmcm9tIGEgcHJlcGFyZWQgYFRlbXBsYXRlUmVmYC5cbiAqXG4gKiBZb3UgY2FuIGF0dGFjaCBhIGNvbnRleHQgb2JqZWN0IHRvIHRoZSBgRW1iZWRkZWRWaWV3UmVmYCBieSBzZXR0aW5nIGBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdYC5cbiAqIGBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdYCBzaG91bGQgYmUgYW4gb2JqZWN0LCB0aGUgb2JqZWN0J3Mga2V5cyB3aWxsIGJlIGF2YWlsYWJsZSBmb3IgYmluZGluZ1xuICogYnkgdGhlIGxvY2FsIHRlbXBsYXRlIGBsZXRgIGRlY2xhcmF0aW9ucy5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogYGBgXG4gKiA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVSZWZFeHA7IGNvbnRleHQ6IGNvbnRleHRFeHBcIj48L25nLWNvbnRhaW5lcj5cbiAqIGBgYFxuICpcbiAqIFVzaW5nIHRoZSBrZXkgYCRpbXBsaWNpdGAgaW4gdGhlIGNvbnRleHQgb2JqZWN0IHdpbGwgc2V0IGl0cyB2YWx1ZSBhcyBkZWZhdWx0LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvbW1vbi9uZ1RlbXBsYXRlT3V0bGV0L3RzL21vZHVsZS50cyByZWdpb249J05nVGVtcGxhdGVPdXRsZXQnfVxuICpcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdUZW1wbGF0ZU91dGxldF0nfSlcbmV4cG9ydCBjbGFzcyBOZ1RlbXBsYXRlT3V0bGV0IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgX3ZpZXdSZWYgITogRW1iZWRkZWRWaWV3UmVmPGFueT47XG5cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHB1YmxpYyBuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dCAhOiBPYmplY3Q7XG5cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHB1YmxpYyBuZ1RlbXBsYXRlT3V0bGV0ICE6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgY29uc3QgcmVjcmVhdGVWaWV3ID0gdGhpcy5fc2hvdWxkUmVjcmVhdGVWaWV3KGNoYW5nZXMpO1xuXG4gICAgaWYgKHJlY3JlYXRlVmlldykge1xuICAgICAgaWYgKHRoaXMuX3ZpZXdSZWYpIHtcbiAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZi5yZW1vdmUodGhpcy5fdmlld0NvbnRhaW5lclJlZi5pbmRleE9mKHRoaXMuX3ZpZXdSZWYpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubmdUZW1wbGF0ZU91dGxldCkge1xuICAgICAgICB0aGlzLl92aWV3UmVmID0gdGhpcy5fdmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcoXG4gICAgICAgICAgICB0aGlzLm5nVGVtcGxhdGVPdXRsZXQsIHRoaXMubmdUZW1wbGF0ZU91dGxldENvbnRleHQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fdmlld1JlZiAmJiB0aGlzLm5nVGVtcGxhdGVPdXRsZXRDb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUV4aXN0aW5nQ29udGV4dCh0aGlzLm5nVGVtcGxhdGVPdXRsZXRDb250ZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV2UgbmVlZCB0byByZS1jcmVhdGUgZXhpc3RpbmcgZW1iZWRkZWQgdmlldyBpZjpcbiAgICogLSB0ZW1wbGF0ZVJlZiBoYXMgY2hhbmdlZFxuICAgKiAtIGNvbnRleHQgaGFzIGNoYW5nZXNcbiAgICpcbiAgICogV2UgbWFyayBjb250ZXh0IG9iamVjdCBhcyBjaGFuZ2VkIHdoZW4gdGhlIGNvcnJlc3BvbmRpbmcgb2JqZWN0XG4gICAqIHNoYXBlIGNoYW5nZXMgKG5ldyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCBvciBleGlzdGluZyBwcm9wZXJ0aWVzIGFyZSByZW1vdmVkKS5cbiAgICogSW4gb3RoZXIgd29yZHMgd2UgY29uc2lkZXIgY29udGV4dCB3aXRoIHRoZSBzYW1lIHByb3BlcnRpZXMgYXMgXCJ0aGUgc2FtZVwiIGV2ZW5cbiAgICogaWYgb2JqZWN0IHJlZmVyZW5jZSBjaGFuZ2VzIChzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTM0MDcpLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2hvdWxkUmVjcmVhdGVWaWV3KGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBib29sZWFuIHtcbiAgICBjb25zdCBjdHhDaGFuZ2UgPSBjaGFuZ2VzWyduZ1RlbXBsYXRlT3V0bGV0Q29udGV4dCddO1xuICAgIHJldHVybiAhIWNoYW5nZXNbJ25nVGVtcGxhdGVPdXRsZXQnXSB8fCAoY3R4Q2hhbmdlICYmIHRoaXMuX2hhc0NvbnRleHRTaGFwZUNoYW5nZWQoY3R4Q2hhbmdlKSk7XG4gIH1cblxuICBwcml2YXRlIF9oYXNDb250ZXh0U2hhcGVDaGFuZ2VkKGN0eENoYW5nZTogU2ltcGxlQ2hhbmdlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcHJldkN0eEtleXMgPSBPYmplY3Qua2V5cyhjdHhDaGFuZ2UucHJldmlvdXNWYWx1ZSB8fCB7fSk7XG4gICAgY29uc3QgY3VyckN0eEtleXMgPSBPYmplY3Qua2V5cyhjdHhDaGFuZ2UuY3VycmVudFZhbHVlIHx8IHt9KTtcblxuICAgIGlmIChwcmV2Q3R4S2V5cy5sZW5ndGggPT09IGN1cnJDdHhLZXlzLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgcHJvcE5hbWUgb2YgY3VyckN0eEtleXMpIHtcbiAgICAgICAgaWYgKHByZXZDdHhLZXlzLmluZGV4T2YocHJvcE5hbWUpID09PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUV4aXN0aW5nQ29udGV4dChjdHg6IE9iamVjdCk6IHZvaWQge1xuICAgIGZvciAobGV0IHByb3BOYW1lIG9mIE9iamVjdC5rZXlzKGN0eCkpIHtcbiAgICAgICg8YW55PnRoaXMuX3ZpZXdSZWYuY29udGV4dClbcHJvcE5hbWVdID0gKDxhbnk+dGhpcy5uZ1RlbXBsYXRlT3V0bGV0Q29udGV4dClbcHJvcE5hbWVdO1xuICAgIH1cbiAgfVxufVxuIl19