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
 * @record
 */
export function LInjector() { }
/**
 * We need to store a reference to the injector's parent so DI can keep looking up
 * the injector tree until it finds the dependency it's looking for.
 * @type {?}
 */
LInjector.prototype.parent;
/**
 * Allows access to the directives array in that node's static data and to
 * the node's flags (for starting directive index and directive size). Necessary
 * for DI to retrieve a directive from the data array if injector indicates
 * it is there.
 * @type {?}
 */
LInjector.prototype.node;
/**
 * The following bloom filter determines whether a directive is available
 * on the associated node or not. This prevents us from searching the directives
 * array at this level unless it's probable the directive is in it.
 *
 * - bf0: Check directive IDs 0-31  (IDs are % 128)
 * - bf1: Check directive IDs 32-63
 * - bf2: Check directive IDs 64-95
 * - bf3: Check directive IDs 96-127
 * - bf4: Check directive IDs 128-159
 * - bf5: Check directive IDs 160 - 191
 * - bf6: Check directive IDs 192 - 223
 * - bf7: Check directive IDs 224 - 255
 *
 * See: https://en.wikipedia.org/wiki/Bloom_filter for more about bloom filters.
 * @type {?}
 */
LInjector.prototype.bf0;
/** @type {?} */
LInjector.prototype.bf1;
/** @type {?} */
LInjector.prototype.bf2;
/** @type {?} */
LInjector.prototype.bf3;
/** @type {?} */
LInjector.prototype.bf4;
/** @type {?} */
LInjector.prototype.bf5;
/** @type {?} */
LInjector.prototype.bf6;
/** @type {?} */
LInjector.prototype.bf7;
/**
 * cbf0 - cbf7 properties determine whether a directive is available through a
 * parent injector. They refer to the merged values of parent bloom filters. This
 * allows us to skip looking up the chain unless it's probable that directive exists
 * up the chain.
 * @type {?}
 */
LInjector.prototype.cbf0;
/** @type {?} */
LInjector.prototype.cbf1;
/** @type {?} */
LInjector.prototype.cbf2;
/** @type {?} */
LInjector.prototype.cbf3;
/** @type {?} */
LInjector.prototype.cbf4;
/** @type {?} */
LInjector.prototype.cbf5;
/** @type {?} */
LInjector.prototype.cbf6;
/** @type {?} */
LInjector.prototype.cbf7;
/**
 * Stores the TemplateRef so subsequent injections of the TemplateRef get the same instance.
 * @type {?}
 */
LInjector.prototype.templateRef;
/**
 * Stores the ViewContainerRef so subsequent injections of the ViewContainerRef get the same
 * instance.
 * @type {?}
 */
LInjector.prototype.viewContainerRef;
/**
 * Stores the ElementRef so subsequent injections of the ElementRef get the same instance.
 * @type {?}
 */
LInjector.prototype.elementRef;
/**
 * Stores the ChangeDetectorRef so subsequent injections of the ChangeDetectorRef get the
 * same instance.
 * @type {?}
 */
LInjector.prototype.changeDetectorRef;
/** @type {?} */
export const unusedValueExportToPlacateAjd = 1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ludGVyZmFjZXMvaW5qZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlGQSxhQUFhLDZCQUE2QixHQUFHLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnLi4vLi4vY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0b3JfcmVmJztcbmltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSAnLi4vLi4vbGlua2VyL2VsZW1lbnRfcmVmJztcbmltcG9ydCB7VGVtcGxhdGVSZWZ9IGZyb20gJy4uLy4uL2xpbmtlci90ZW1wbGF0ZV9yZWYnO1xuaW1wb3J0IHtWaWV3Q29udGFpbmVyUmVmfSBmcm9tICcuLi8uLi9saW5rZXIvdmlld19jb250YWluZXJfcmVmJztcblxuaW1wb3J0IHtMQ29udGFpbmVyTm9kZSwgTEVsZW1lbnROb2RlfSBmcm9tICcuL25vZGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExJbmplY3RvciB7XG4gIC8qKlxuICAgKiBXZSBuZWVkIHRvIHN0b3JlIGEgcmVmZXJlbmNlIHRvIHRoZSBpbmplY3RvcidzIHBhcmVudCBzbyBESSBjYW4ga2VlcCBsb29raW5nIHVwXG4gICAqIHRoZSBpbmplY3RvciB0cmVlIHVudGlsIGl0IGZpbmRzIHRoZSBkZXBlbmRlbmN5IGl0J3MgbG9va2luZyBmb3IuXG4gICAqL1xuICByZWFkb25seSBwYXJlbnQ6IExJbmplY3RvcnxudWxsO1xuXG4gIC8qKlxuICAgKiBBbGxvd3MgYWNjZXNzIHRvIHRoZSBkaXJlY3RpdmVzIGFycmF5IGluIHRoYXQgbm9kZSdzIHN0YXRpYyBkYXRhIGFuZCB0b1xuICAgKiB0aGUgbm9kZSdzIGZsYWdzIChmb3Igc3RhcnRpbmcgZGlyZWN0aXZlIGluZGV4IGFuZCBkaXJlY3RpdmUgc2l6ZSkuIE5lY2Vzc2FyeVxuICAgKiBmb3IgREkgdG8gcmV0cmlldmUgYSBkaXJlY3RpdmUgZnJvbSB0aGUgZGF0YSBhcnJheSBpZiBpbmplY3RvciBpbmRpY2F0ZXNcbiAgICogaXQgaXMgdGhlcmUuXG4gICAqL1xuICByZWFkb25seSBub2RlOiBMRWxlbWVudE5vZGV8TENvbnRhaW5lck5vZGU7XG5cbiAgLyoqXG4gICAqIFRoZSBmb2xsb3dpbmcgYmxvb20gZmlsdGVyIGRldGVybWluZXMgd2hldGhlciBhIGRpcmVjdGl2ZSBpcyBhdmFpbGFibGVcbiAgICogb24gdGhlIGFzc29jaWF0ZWQgbm9kZSBvciBub3QuIFRoaXMgcHJldmVudHMgdXMgZnJvbSBzZWFyY2hpbmcgdGhlIGRpcmVjdGl2ZXNcbiAgICogYXJyYXkgYXQgdGhpcyBsZXZlbCB1bmxlc3MgaXQncyBwcm9iYWJsZSB0aGUgZGlyZWN0aXZlIGlzIGluIGl0LlxuICAgKlxuICAgKiAtIGJmMDogQ2hlY2sgZGlyZWN0aXZlIElEcyAwLTMxICAoSURzIGFyZSAlIDEyOClcbiAgICogLSBiZjE6IENoZWNrIGRpcmVjdGl2ZSBJRHMgMzItNjNcbiAgICogLSBiZjI6IENoZWNrIGRpcmVjdGl2ZSBJRHMgNjQtOTVcbiAgICogLSBiZjM6IENoZWNrIGRpcmVjdGl2ZSBJRHMgOTYtMTI3XG4gICAqIC0gYmY0OiBDaGVjayBkaXJlY3RpdmUgSURzIDEyOC0xNTlcbiAgICogLSBiZjU6IENoZWNrIGRpcmVjdGl2ZSBJRHMgMTYwIC0gMTkxXG4gICAqIC0gYmY2OiBDaGVjayBkaXJlY3RpdmUgSURzIDE5MiAtIDIyM1xuICAgKiAtIGJmNzogQ2hlY2sgZGlyZWN0aXZlIElEcyAyMjQgLSAyNTVcbiAgICpcbiAgICogU2VlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CbG9vbV9maWx0ZXIgZm9yIG1vcmUgYWJvdXQgYmxvb20gZmlsdGVycy5cbiAgICovXG4gIGJmMDogbnVtYmVyO1xuICBiZjE6IG51bWJlcjtcbiAgYmYyOiBudW1iZXI7XG4gIGJmMzogbnVtYmVyO1xuICBiZjQ6IG51bWJlcjtcbiAgYmY1OiBudW1iZXI7XG4gIGJmNjogbnVtYmVyO1xuICBiZjc6IG51bWJlcjtcblxuICAvKipcbiAgICogY2JmMCAtIGNiZjcgcHJvcGVydGllcyBkZXRlcm1pbmUgd2hldGhlciBhIGRpcmVjdGl2ZSBpcyBhdmFpbGFibGUgdGhyb3VnaCBhXG4gICAqIHBhcmVudCBpbmplY3Rvci4gVGhleSByZWZlciB0byB0aGUgbWVyZ2VkIHZhbHVlcyBvZiBwYXJlbnQgYmxvb20gZmlsdGVycy4gVGhpc1xuICAgKiBhbGxvd3MgdXMgdG8gc2tpcCBsb29raW5nIHVwIHRoZSBjaGFpbiB1bmxlc3MgaXQncyBwcm9iYWJsZSB0aGF0IGRpcmVjdGl2ZSBleGlzdHNcbiAgICogdXAgdGhlIGNoYWluLlxuICAgKi9cbiAgY2JmMDogbnVtYmVyO1xuICBjYmYxOiBudW1iZXI7XG4gIGNiZjI6IG51bWJlcjtcbiAgY2JmMzogbnVtYmVyO1xuICBjYmY0OiBudW1iZXI7XG4gIGNiZjU6IG51bWJlcjtcbiAgY2JmNjogbnVtYmVyO1xuICBjYmY3OiBudW1iZXI7XG5cbiAgLyoqIFN0b3JlcyB0aGUgVGVtcGxhdGVSZWYgc28gc3Vic2VxdWVudCBpbmplY3Rpb25zIG9mIHRoZSBUZW1wbGF0ZVJlZiBnZXQgdGhlIHNhbWUgaW5zdGFuY2UuICovXG4gIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+fG51bGw7XG5cbiAgLyoqIFN0b3JlcyB0aGUgVmlld0NvbnRhaW5lclJlZiBzbyBzdWJzZXF1ZW50IGluamVjdGlvbnMgb2YgdGhlIFZpZXdDb250YWluZXJSZWYgZ2V0IHRoZSBzYW1lXG4gICAqIGluc3RhbmNlLiAqL1xuICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmfG51bGw7XG5cbiAgLyoqIFN0b3JlcyB0aGUgRWxlbWVudFJlZiBzbyBzdWJzZXF1ZW50IGluamVjdGlvbnMgb2YgdGhlIEVsZW1lbnRSZWYgZ2V0IHRoZSBzYW1lIGluc3RhbmNlLiAqL1xuICBlbGVtZW50UmVmOiBFbGVtZW50UmVmfG51bGw7XG5cbiAgLyoqXG4gICAqIFN0b3JlcyB0aGUgQ2hhbmdlRGV0ZWN0b3JSZWYgc28gc3Vic2VxdWVudCBpbmplY3Rpb25zIG9mIHRoZSBDaGFuZ2VEZXRlY3RvclJlZiBnZXQgdGhlXG4gICAqIHNhbWUgaW5zdGFuY2UuXG4gICAqL1xuICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZ8bnVsbDtcbn1cblxuLy8gTm90ZTogVGhpcyBoYWNrIGlzIG5lY2Vzc2FyeSBzbyB3ZSBkb24ndCBlcnJvbmVvdXNseSBnZXQgYSBjaXJjdWxhciBkZXBlbmRlbmN5XG4vLyBmYWlsdXJlIGJhc2VkIG9uIHR5cGVzLlxuZXhwb3J0IGNvbnN0IHVudXNlZFZhbHVlRXhwb3J0VG9QbGFjYXRlQWpkID0gMTtcbiJdfQ==