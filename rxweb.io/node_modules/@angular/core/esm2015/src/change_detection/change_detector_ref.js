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
 * Base class for Angular Views, provides change detection functionality.
 * A change-detection tree collects all views that are to be checked for changes.
 * Use the methods to add and remove views from the tree, initiate change-detection,
 * and explicitly mark views as _dirty_, meaning that they have changed and need to be rerendered.
 *
 * \@usageNotes
 *
 * The following examples demonstrate how to modify default change-detection behavior
 * to perform explicit detection when needed.
 *
 * ### Use `markForCheck()` with `CheckOnce` strategy
 *
 * The following example sets the `OnPush` change-detection strategy for a component
 * (`CheckOnce`, rather than the default `CheckAlways`), then forces a second check
 * after an interval. See [live demo](http://plnkr.co/edit/GC512b?p=preview).
 *
 * <code-example path="core/ts/change_detect/change-detection.ts"
 * region="mark-for-check"></code-example>
 *
 * ### Detach change detector to limit how often check occurs
 *
 * The following example defines a component with a large list of read-only data
 * that is expected to change constantly, many times per second.
 * To improve performance, we want to check and update the list
 * less often than the changes actually occur. To do that, we detach
 * the component's change detector and perform an explicit local check every five seconds.
 *
 * <code-example path="core/ts/change_detect/change-detection.ts" region="detach"></code-example>
 *
 *
 * ### Reattaching a detached component
 *
 * The following example creates a component displaying live data.
 * The component detaches its change detector from the main change detector tree
 * when the `live` property is set to false, and reattaches it when the property
 * becomes true.
 *
 * <code-example path="core/ts/change_detect/change-detection.ts" region="detach"></code-example>
 *
 * @abstract
 */
export class ChangeDetectorRef {
}
if (false) {
    /**
     * When a view uses the {\@link ChangeDetectionStrategy#OnPush OnPush} (checkOnce)
     * change detection strategy, explicitly marks the view as changed so that
     * it can be checked again.
     *
     * Components are normally marked as dirty (in need of rerendering) when inputs
     * have changed or events have fired in the view. Call this method to ensure that
     * a component is checked even if these triggers have not occured.
     *
     * <!-- TODO: Add a link to a chapter on OnPush components -->
     *
     * @abstract
     * @return {?}
     */
    ChangeDetectorRef.prototype.markForCheck = function () { };
    /**
     * Detaches this view from the change-detection tree.
     * A detached view is  not checked until it is reattached.
     * Use in combination with `detectChanges()` to implement local change detection checks.
     *
     * Detached views are not checked during change detection runs until they are
     * re-attached, even if they are marked as dirty.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * @abstract
     * @return {?}
     */
    ChangeDetectorRef.prototype.detach = function () { };
    /**
     * Checks this view and its children. Use in combination with {\@link ChangeDetectorRef#detach
     * detach}
     * to implement local change detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * @abstract
     * @return {?}
     */
    ChangeDetectorRef.prototype.detectChanges = function () { };
    /**
     * Checks the change detector and its children, and throws if any changes are detected.
     *
     * Use in development mode to verify that running change detection doesn't introduce
     * other changes.
     * @abstract
     * @return {?}
     */
    ChangeDetectorRef.prototype.checkNoChanges = function () { };
    /**
     * Re-attaches the previously detached view to the change detection tree.
     * Views are attached to the tree by default.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     *
     * @abstract
     * @return {?}
     */
    ChangeDetectorRef.prototype.reattach = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdG9yX3JlZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdG9yX3JlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlEQSxNQUFNO0NBd0RMIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIEFuZ3VsYXIgVmlld3MsIHByb3ZpZGVzIGNoYW5nZSBkZXRlY3Rpb24gZnVuY3Rpb25hbGl0eS5cbiAqIEEgY2hhbmdlLWRldGVjdGlvbiB0cmVlIGNvbGxlY3RzIGFsbCB2aWV3cyB0aGF0IGFyZSB0byBiZSBjaGVja2VkIGZvciBjaGFuZ2VzLlxuICogVXNlIHRoZSBtZXRob2RzIHRvIGFkZCBhbmQgcmVtb3ZlIHZpZXdzIGZyb20gdGhlIHRyZWUsIGluaXRpYXRlIGNoYW5nZS1kZXRlY3Rpb24sXG4gKiBhbmQgZXhwbGljaXRseSBtYXJrIHZpZXdzIGFzIF9kaXJ0eV8sIG1lYW5pbmcgdGhhdCB0aGV5IGhhdmUgY2hhbmdlZCBhbmQgbmVlZCB0byBiZSByZXJlbmRlcmVkLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlcyBkZW1vbnN0cmF0ZSBob3cgdG8gbW9kaWZ5IGRlZmF1bHQgY2hhbmdlLWRldGVjdGlvbiBiZWhhdmlvclxuICogdG8gcGVyZm9ybSBleHBsaWNpdCBkZXRlY3Rpb24gd2hlbiBuZWVkZWQuXG4gKlxuICogIyMjIFVzZSBgbWFya0ZvckNoZWNrKClgIHdpdGggYENoZWNrT25jZWAgc3RyYXRlZ3lcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgc2V0cyB0aGUgYE9uUHVzaGAgY2hhbmdlLWRldGVjdGlvbiBzdHJhdGVneSBmb3IgYSBjb21wb25lbnRcbiAqIChgQ2hlY2tPbmNlYCwgcmF0aGVyIHRoYW4gdGhlIGRlZmF1bHQgYENoZWNrQWx3YXlzYCksIHRoZW4gZm9yY2VzIGEgc2Vjb25kIGNoZWNrXG4gKiBhZnRlciBhbiBpbnRlcnZhbC4gU2VlIFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L0dDNTEyYj9wPXByZXZpZXcpLlxuICpcbiAqIDxjb2RlLWV4YW1wbGUgcGF0aD1cImNvcmUvdHMvY2hhbmdlX2RldGVjdC9jaGFuZ2UtZGV0ZWN0aW9uLnRzXCJcbiAqIHJlZ2lvbj1cIm1hcmstZm9yLWNoZWNrXCI+PC9jb2RlLWV4YW1wbGU+XG4gKlxuICogIyMjIERldGFjaCBjaGFuZ2UgZGV0ZWN0b3IgdG8gbGltaXQgaG93IG9mdGVuIGNoZWNrIG9jY3Vyc1xuICpcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBkZWZpbmVzIGEgY29tcG9uZW50IHdpdGggYSBsYXJnZSBsaXN0IG9mIHJlYWQtb25seSBkYXRhXG4gKiB0aGF0IGlzIGV4cGVjdGVkIHRvIGNoYW5nZSBjb25zdGFudGx5LCBtYW55IHRpbWVzIHBlciBzZWNvbmQuXG4gKiBUbyBpbXByb3ZlIHBlcmZvcm1hbmNlLCB3ZSB3YW50IHRvIGNoZWNrIGFuZCB1cGRhdGUgdGhlIGxpc3RcbiAqIGxlc3Mgb2Z0ZW4gdGhhbiB0aGUgY2hhbmdlcyBhY3R1YWxseSBvY2N1ci4gVG8gZG8gdGhhdCwgd2UgZGV0YWNoXG4gKiB0aGUgY29tcG9uZW50J3MgY2hhbmdlIGRldGVjdG9yIGFuZCBwZXJmb3JtIGFuIGV4cGxpY2l0IGxvY2FsIGNoZWNrIGV2ZXJ5IGZpdmUgc2Vjb25kcy5cbiAqXG4gKiA8Y29kZS1leGFtcGxlIHBhdGg9XCJjb3JlL3RzL2NoYW5nZV9kZXRlY3QvY2hhbmdlLWRldGVjdGlvbi50c1wiIHJlZ2lvbj1cImRldGFjaFwiPjwvY29kZS1leGFtcGxlPlxuICpcbiAqXG4gKiAjIyMgUmVhdHRhY2hpbmcgYSBkZXRhY2hlZCBjb21wb25lbnRcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgY3JlYXRlcyBhIGNvbXBvbmVudCBkaXNwbGF5aW5nIGxpdmUgZGF0YS5cbiAqIFRoZSBjb21wb25lbnQgZGV0YWNoZXMgaXRzIGNoYW5nZSBkZXRlY3RvciBmcm9tIHRoZSBtYWluIGNoYW5nZSBkZXRlY3RvciB0cmVlXG4gKiB3aGVuIHRoZSBgbGl2ZWAgcHJvcGVydHkgaXMgc2V0IHRvIGZhbHNlLCBhbmQgcmVhdHRhY2hlcyBpdCB3aGVuIHRoZSBwcm9wZXJ0eVxuICogYmVjb21lcyB0cnVlLlxuICpcbiAqIDxjb2RlLWV4YW1wbGUgcGF0aD1cImNvcmUvdHMvY2hhbmdlX2RldGVjdC9jaGFuZ2UtZGV0ZWN0aW9uLnRzXCIgcmVnaW9uPVwiZGV0YWNoXCI+PC9jb2RlLWV4YW1wbGU+XG4gKlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2hhbmdlRGV0ZWN0b3JSZWYge1xuICAvKipcbiAgICogV2hlbiBhIHZpZXcgdXNlcyB0aGUge0BsaW5rIENoYW5nZURldGVjdGlvblN0cmF0ZWd5I09uUHVzaCBPblB1c2h9IChjaGVja09uY2UpXG4gICAqIGNoYW5nZSBkZXRlY3Rpb24gc3RyYXRlZ3ksIGV4cGxpY2l0bHkgbWFya3MgdGhlIHZpZXcgYXMgY2hhbmdlZCBzbyB0aGF0XG4gICAqIGl0IGNhbiBiZSBjaGVja2VkIGFnYWluLlxuICAgKlxuICAgKiBDb21wb25lbnRzIGFyZSBub3JtYWxseSBtYXJrZWQgYXMgZGlydHkgKGluIG5lZWQgb2YgcmVyZW5kZXJpbmcpIHdoZW4gaW5wdXRzXG4gICAqIGhhdmUgY2hhbmdlZCBvciBldmVudHMgaGF2ZSBmaXJlZCBpbiB0aGUgdmlldy4gQ2FsbCB0aGlzIG1ldGhvZCB0byBlbnN1cmUgdGhhdFxuICAgKiBhIGNvbXBvbmVudCBpcyBjaGVja2VkIGV2ZW4gaWYgdGhlc2UgdHJpZ2dlcnMgaGF2ZSBub3Qgb2NjdXJlZC5cbiAgICpcbiAgICogPCEtLSBUT0RPOiBBZGQgYSBsaW5rIHRvIGEgY2hhcHRlciBvbiBPblB1c2ggY29tcG9uZW50cyAtLT5cbiAgICpcbiAgICovXG4gIGFic3RyYWN0IG1hcmtGb3JDaGVjaygpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBEZXRhY2hlcyB0aGlzIHZpZXcgZnJvbSB0aGUgY2hhbmdlLWRldGVjdGlvbiB0cmVlLlxuICAgKiBBIGRldGFjaGVkIHZpZXcgaXMgIG5vdCBjaGVja2VkIHVudGlsIGl0IGlzIHJlYXR0YWNoZWQuXG4gICAqIFVzZSBpbiBjb21iaW5hdGlvbiB3aXRoIGBkZXRlY3RDaGFuZ2VzKClgIHRvIGltcGxlbWVudCBsb2NhbCBjaGFuZ2UgZGV0ZWN0aW9uIGNoZWNrcy5cbiAgICpcbiAgICogRGV0YWNoZWQgdmlld3MgYXJlIG5vdCBjaGVja2VkIGR1cmluZyBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnMgdW50aWwgdGhleSBhcmVcbiAgICogcmUtYXR0YWNoZWQsIGV2ZW4gaWYgdGhleSBhcmUgbWFya2VkIGFzIGRpcnR5LlxuICAgKlxuICAgKiA8IS0tIFRPRE86IEFkZCBhIGxpbmsgdG8gYSBjaGFwdGVyIG9uIGRldGFjaC9yZWF0dGFjaC9sb2NhbCBkaWdlc3QgLS0+XG4gICAqIDwhLS0gVE9ETzogQWRkIGEgbGl2ZSBkZW1vIG9uY2UgcmVmLmRldGVjdENoYW5nZXMgaXMgbWVyZ2VkIGludG8gbWFzdGVyIC0tPlxuICAgKlxuICAgKi9cbiAgYWJzdHJhY3QgZGV0YWNoKCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGlzIHZpZXcgYW5kIGl0cyBjaGlsZHJlbi4gVXNlIGluIGNvbWJpbmF0aW9uIHdpdGgge0BsaW5rIENoYW5nZURldGVjdG9yUmVmI2RldGFjaFxuICAgKiBkZXRhY2h9XG4gICAqIHRvIGltcGxlbWVudCBsb2NhbCBjaGFuZ2UgZGV0ZWN0aW9uIGNoZWNrcy5cbiAgICpcbiAgICogPCEtLSBUT0RPOiBBZGQgYSBsaW5rIHRvIGEgY2hhcHRlciBvbiBkZXRhY2gvcmVhdHRhY2gvbG9jYWwgZGlnZXN0IC0tPlxuICAgKiA8IS0tIFRPRE86IEFkZCBhIGxpdmUgZGVtbyBvbmNlIHJlZi5kZXRlY3RDaGFuZ2VzIGlzIG1lcmdlZCBpbnRvIG1hc3RlciAtLT5cbiAgICpcbiAgICovXG4gIGFic3RyYWN0IGRldGVjdENoYW5nZXMoKTogdm9pZDtcblxuICAvKipcbiAgICogQ2hlY2tzIHRoZSBjaGFuZ2UgZGV0ZWN0b3IgYW5kIGl0cyBjaGlsZHJlbiwgYW5kIHRocm93cyBpZiBhbnkgY2hhbmdlcyBhcmUgZGV0ZWN0ZWQuXG4gICAqXG4gICAqIFVzZSBpbiBkZXZlbG9wbWVudCBtb2RlIHRvIHZlcmlmeSB0aGF0IHJ1bm5pbmcgY2hhbmdlIGRldGVjdGlvbiBkb2Vzbid0IGludHJvZHVjZVxuICAgKiBvdGhlciBjaGFuZ2VzLlxuICAgKi9cbiAgYWJzdHJhY3QgY2hlY2tOb0NoYW5nZXMoKTogdm9pZDtcblxuICAvKipcbiAgICogUmUtYXR0YWNoZXMgdGhlIHByZXZpb3VzbHkgZGV0YWNoZWQgdmlldyB0byB0aGUgY2hhbmdlIGRldGVjdGlvbiB0cmVlLlxuICAgKiBWaWV3cyBhcmUgYXR0YWNoZWQgdG8gdGhlIHRyZWUgYnkgZGVmYXVsdC5cbiAgICpcbiAgICogPCEtLSBUT0RPOiBBZGQgYSBsaW5rIHRvIGEgY2hhcHRlciBvbiBkZXRhY2gvcmVhdHRhY2gvbG9jYWwgZGlnZXN0IC0tPlxuICAgKlxuICAgKi9cbiAgYWJzdHJhY3QgcmVhdHRhY2goKTogdm9pZDtcbn1cbiJdfQ==