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
import { ChangeDetectorRef } from '../change_detection/change_detector_ref';
/**
 * Represents an Angular [view](guide/glossary#view),
 * specifically the [host view](guide/glossary#view-tree) that is defined by a component.
 * Also serves as the base class
 * that adds destroy methods for [embedded views](guide/glossary#view-tree).
 *
 * @see `EmbeddedViewRef`
 * @abstract
 */
export class ViewRef extends ChangeDetectorRef {
}
if (false) {
    /**
     * Destroys this view and all of the data structures associated with it.
     * @abstract
     * @return {?}
     */
    ViewRef.prototype.destroy = function () { };
    /**
     * Reports whether this view has been destroyed.
     * @abstract
     * @return {?} True after the `destroy()` method has been called, false otherwise.
     */
    ViewRef.prototype.destroyed = function () { };
    /**
     * A lifecycle hook that provides additional developer-defined cleanup
     * functionality for views.
     * @abstract
     * @param {?} callback A handler function that cleans up developer-defined data
     * associated with a view. Called when the `destroy()` method is invoked.
     * @return {?}
     */
    ViewRef.prototype.onDestroy = function (callback) { };
}
/**
 * Represents an Angular [view](guide/glossary#view) in a view container.
 * An [embedded view](guide/glossary#view-tree) can be referenced from a component
 * other than the hosting component whose template defines it, or it can be defined
 * independently by a `TemplateRef`.
 *
 * Properties of elements in a view can change, but the structure (number and order) of elements in
 * a view cannot. Change the structure of elements by inserting, moving, or
 * removing nested views in a view container.
 *
 * @see `ViewContainerRef`
 *
 * \@usageNotes
 *
 * The following template breaks down into two separate `TemplateRef` instances,
 * an outer one and an inner one.
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="let  item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * This is the outer `TemplateRef`:
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <ng-template ngFor let-item [ngForOf]="items"></ng-template>
 * </ul>
 * ```
 *
 * This is the inner `TemplateRef`:
 *
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * The outer and inner `TemplateRef` instances are assembled into views as follows:
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <ng-template view-container-ref></ng-template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 * \@experimental
 * @abstract
 * @template C
 */
export class EmbeddedViewRef extends ViewRef {
}
if (false) {
    /**
     * The context for this view, inherited from the anchor element.
     * @abstract
     * @return {?}
     */
    EmbeddedViewRef.prototype.context = function () { };
    /**
     * The root nodes for this embedded view.
     * @abstract
     * @return {?}
     */
    EmbeddedViewRef.prototype.rootNodes = function () { };
}
/**
 * @record
 */
export function InternalViewRef() { }
/** @type {?} */
InternalViewRef.prototype.detachFromAppRef;
/** @type {?} */
InternalViewRef.prototype.attachToAppRef;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld19yZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9saW5rZXIvdmlld19yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFTQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQzs7Ozs7Ozs7OztBQVUxRSxNQUFNLGNBQXdCLFNBQVEsaUJBQWlCO0NBbUJ0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVERCxNQUFNLHNCQUFtQyxTQUFRLE9BQU87Q0FVdkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QXBwbGljYXRpb25SZWZ9IGZyb20gJy4uL2FwcGxpY2F0aW9uX3JlZic7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmfSBmcm9tICcuLi9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rvcl9yZWYnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gQW5ndWxhciBbdmlld10oZ3VpZGUvZ2xvc3NhcnkjdmlldyksXG4gKiBzcGVjaWZpY2FsbHkgdGhlIFtob3N0IHZpZXddKGd1aWRlL2dsb3NzYXJ5I3ZpZXctdHJlZSkgdGhhdCBpcyBkZWZpbmVkIGJ5IGEgY29tcG9uZW50LlxuICogQWxzbyBzZXJ2ZXMgYXMgdGhlIGJhc2UgY2xhc3NcbiAqIHRoYXQgYWRkcyBkZXN0cm95IG1ldGhvZHMgZm9yIFtlbWJlZGRlZCB2aWV3c10oZ3VpZGUvZ2xvc3Nhcnkjdmlldy10cmVlKS4gXG4gKiBcbiAqIEBzZWUgYEVtYmVkZGVkVmlld1JlZmAgXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWaWV3UmVmIGV4dGVuZHMgQ2hhbmdlRGV0ZWN0b3JSZWYge1xuICAvKipcbiAgICogRGVzdHJveXMgdGhpcyB2aWV3IGFuZCBhbGwgb2YgdGhlIGRhdGEgc3RydWN0dXJlcyBhc3NvY2lhdGVkIHdpdGggaXQuXG4gICAqL1xuICBhYnN0cmFjdCBkZXN0cm95KCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJlcG9ydHMgd2hldGhlciB0aGlzIHZpZXcgaGFzIGJlZW4gZGVzdHJveWVkLlxuICAgKiBAcmV0dXJucyBUcnVlIGFmdGVyIHRoZSBgZGVzdHJveSgpYCBtZXRob2QgaGFzIGJlZW4gY2FsbGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBhYnN0cmFjdCBnZXQgZGVzdHJveWVkKCk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgbGlmZWN5Y2xlIGhvb2sgdGhhdCBwcm92aWRlcyBhZGRpdGlvbmFsIGRldmVsb3Blci1kZWZpbmVkIGNsZWFudXBcbiAgICogZnVuY3Rpb25hbGl0eSBmb3Igdmlld3MuXG4gICAqIEBwYXJhbSBjYWxsYmFjayBBIGhhbmRsZXIgZnVuY3Rpb24gdGhhdCBjbGVhbnMgdXAgZGV2ZWxvcGVyLWRlZmluZWQgZGF0YVxuICAgKiBhc3NvY2lhdGVkIHdpdGggYSB2aWV3LiBDYWxsZWQgd2hlbiB0aGUgYGRlc3Ryb3koKWAgbWV0aG9kIGlzIGludm9rZWQuXG4gICAqL1xuICBhYnN0cmFjdCBvbkRlc3Ryb3koY2FsbGJhY2s6IEZ1bmN0aW9uKTogYW55IC8qKiBUT0RPICM5MTAwICovO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gQW5ndWxhciBbdmlld10oZ3VpZGUvZ2xvc3NhcnkjdmlldykgaW4gYSB2aWV3IGNvbnRhaW5lci5cbiAqIEFuIFtlbWJlZGRlZCB2aWV3XShndWlkZS9nbG9zc2FyeSN2aWV3LXRyZWUpIGNhbiBiZSByZWZlcmVuY2VkIGZyb20gYSBjb21wb25lbnRcbiAqIG90aGVyIHRoYW4gdGhlIGhvc3RpbmcgY29tcG9uZW50IHdob3NlIHRlbXBsYXRlIGRlZmluZXMgaXQsIG9yIGl0IGNhbiBiZSBkZWZpbmVkXG4gKiBpbmRlcGVuZGVudGx5IGJ5IGEgYFRlbXBsYXRlUmVmYC5cbiAqXG4gKiBQcm9wZXJ0aWVzIG9mIGVsZW1lbnRzIGluIGEgdmlldyBjYW4gY2hhbmdlLCBidXQgdGhlIHN0cnVjdHVyZSAobnVtYmVyIGFuZCBvcmRlcikgb2YgZWxlbWVudHMgaW5cbiAqIGEgdmlldyBjYW5ub3QuIENoYW5nZSB0aGUgc3RydWN0dXJlIG9mIGVsZW1lbnRzIGJ5IGluc2VydGluZywgbW92aW5nLCBvclxuICogcmVtb3ZpbmcgbmVzdGVkIHZpZXdzIGluIGEgdmlldyBjb250YWluZXIuXG4gKlxuICogQHNlZSBgVmlld0NvbnRhaW5lclJlZmBcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIFRoZSBmb2xsb3dpbmcgdGVtcGxhdGUgYnJlYWtzIGRvd24gaW50byB0d28gc2VwYXJhdGUgYFRlbXBsYXRlUmVmYCBpbnN0YW5jZXMsXG4gKiBhbiBvdXRlciBvbmUgYW5kIGFuIGlubmVyIG9uZS5cbiAqXG4gKiBgYGBcbiAqIENvdW50OiB7e2l0ZW1zLmxlbmd0aH19XG4gKiA8dWw+XG4gKiAgIDxsaSAqbmdGb3I9XCJsZXQgIGl0ZW0gb2YgaXRlbXNcIj57e2l0ZW19fTwvbGk+XG4gKiA8L3VsPlxuICogYGBgXG4gKlxuICogVGhpcyBpcyB0aGUgb3V0ZXIgYFRlbXBsYXRlUmVmYDpcbiAqXG4gKiBgYGBcbiAqIENvdW50OiB7e2l0ZW1zLmxlbmd0aH19XG4gKiA8dWw+XG4gKiAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtaXRlbSBbbmdGb3JPZl09XCJpdGVtc1wiPjwvbmctdGVtcGxhdGU+XG4gKiA8L3VsPlxuICogYGBgXG4gKlxuICogVGhpcyBpcyB0aGUgaW5uZXIgYFRlbXBsYXRlUmVmYDpcbiAqXG4gKiBgYGBcbiAqICAgPGxpPnt7aXRlbX19PC9saT5cbiAqIGBgYFxuICpcbiAqIFRoZSBvdXRlciBhbmQgaW5uZXIgYFRlbXBsYXRlUmVmYCBpbnN0YW5jZXMgYXJlIGFzc2VtYmxlZCBpbnRvIHZpZXdzIGFzIGZvbGxvd3M6XG4gKlxuICogYGBgXG4gKiA8IS0tIFZpZXdSZWY6IG91dGVyLTAgLS0+XG4gKiBDb3VudDogMlxuICogPHVsPlxuICogICA8bmctdGVtcGxhdGUgdmlldy1jb250YWluZXItcmVmPjwvbmctdGVtcGxhdGU+XG4gKiAgIDwhLS0gVmlld1JlZjogaW5uZXItMSAtLT48bGk+Zmlyc3Q8L2xpPjwhLS0gL1ZpZXdSZWY6IGlubmVyLTEgLS0+XG4gKiAgIDwhLS0gVmlld1JlZjogaW5uZXItMiAtLT48bGk+c2Vjb25kPC9saT48IS0tIC9WaWV3UmVmOiBpbm5lci0yIC0tPlxuICogPC91bD5cbiAqIDwhLS0gL1ZpZXdSZWY6IG91dGVyLTAgLS0+XG4gKiBgYGBcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEVtYmVkZGVkVmlld1JlZjxDPiBleHRlbmRzIFZpZXdSZWYge1xuICAvKipcbiAgICogVGhlIGNvbnRleHQgZm9yIHRoaXMgdmlldywgaW5oZXJpdGVkIGZyb20gdGhlIGFuY2hvciBlbGVtZW50LlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0IGNvbnRleHQoKTogQztcblxuICAvKipcbiAgICogVGhlIHJvb3Qgbm9kZXMgZm9yIHRoaXMgZW1iZWRkZWQgdmlldy5cbiAgICovXG4gIGFic3RyYWN0IGdldCByb290Tm9kZXMoKTogYW55W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJuYWxWaWV3UmVmIGV4dGVuZHMgVmlld1JlZiB7XG4gIGRldGFjaEZyb21BcHBSZWYoKTogdm9pZDtcbiAgYXR0YWNoVG9BcHBSZWYoYXBwUmVmOiBBcHBsaWNhdGlvblJlZik6IHZvaWQ7XG59XG4iXX0=