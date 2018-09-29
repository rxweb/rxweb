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
 * Used for tracking queries (e.g. ViewChild, ContentChild).
 * @record
 */
export function LQueries() { }
/**
 * Ask queries to prepare copy of itself. This assures that tracking new queries on child nodes
 * doesn't mutate list of queries tracked on a parent node. We will clone LQueries before
 * constructing content queries.
 * @type {?}
 */
LQueries.prototype.clone;
/**
 * Used to ask queries if those should be cloned to the child element.
 *
 * For example in the case of deep queries the `child()` returns
 * queries for the child node. In case of shallow queries it returns
 * `null`.
 * @type {?}
 */
LQueries.prototype.child;
/**
 * Notify `LQueries` that a new `LNode` has been created and needs to be added to query results
 * if matching query predicate.
 * @type {?}
 */
LQueries.prototype.addNode;
/**
 * Notify `LQueries` that a new LContainer was added to ivy data structures. As a result we need
 * to prepare room for views that might be inserted into this container.
 * @type {?}
 */
LQueries.prototype.container;
/**
 * Notify `LQueries` that a new `LView` has been created. As a result we need to prepare room
 * and collect nodes that match query predicate.
 * @type {?}
 */
LQueries.prototype.createView;
/**
 * Notify `LQueries` that a new `LView` has been added to `LContainer`. As a result all
 * the matching nodes from this view should be added to container's queries.
 * @type {?}
 */
LQueries.prototype.insertView;
/**
 * Notify `LQueries` that an `LView` has been removed from `LContainer`. As a result all
 * the matching nodes from this view should be removed from container's queries.
 * @type {?}
 */
LQueries.prototype.removeView;
/**
 * Add additional `QueryList` to track.
 *
 * \@param queryList `QueryList` to update with changes.
 * \@param predicate Either `Type` or selector array of [key, value] predicates.
 * \@param descend If true the query will recursively apply to the children.
 * \@param read Indicates which token should be read from DI for this query.
 * @type {?}
 */
LQueries.prototype.track;
/**
 * @template T
 */
export class QueryReadType {
}
if (false) {
    /** @type {?} */
    QueryReadType.prototype.defeatStructuralTyping;
}
/** @type {?} */
export const unusedValueExportToPlacateAjd = 1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ludGVyZmFjZXMvcXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUVBLE1BQU07Q0FBZ0U7Ozs7OztBQUl0RSxhQUFhLDZCQUE2QixHQUFHLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtRdWVyeUxpc3R9IGZyb20gJy4uLy4uL2xpbmtlcic7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uLy4uL3R5cGUnO1xuaW1wb3J0IHtMTm9kZX0gZnJvbSAnLi9ub2RlJztcblxuLyoqIFVzZWQgZm9yIHRyYWNraW5nIHF1ZXJpZXMgKGUuZy4gVmlld0NoaWxkLCBDb250ZW50Q2hpbGQpLiAqL1xuZXhwb3J0IGludGVyZmFjZSBMUXVlcmllcyB7XG4gIC8qKlxuICAgKiBBc2sgcXVlcmllcyB0byBwcmVwYXJlIGNvcHkgb2YgaXRzZWxmLiBUaGlzIGFzc3VyZXMgdGhhdCB0cmFja2luZyBuZXcgcXVlcmllcyBvbiBjaGlsZCBub2Rlc1xuICAgKiBkb2Vzbid0IG11dGF0ZSBsaXN0IG9mIHF1ZXJpZXMgdHJhY2tlZCBvbiBhIHBhcmVudCBub2RlLiBXZSB3aWxsIGNsb25lIExRdWVyaWVzIGJlZm9yZVxuICAgKiBjb25zdHJ1Y3RpbmcgY29udGVudCBxdWVyaWVzLlxuICAgKi9cbiAgY2xvbmUoKTogTFF1ZXJpZXN8bnVsbDtcblxuICAvKipcbiAgICogVXNlZCB0byBhc2sgcXVlcmllcyBpZiB0aG9zZSBzaG91bGQgYmUgY2xvbmVkIHRvIHRoZSBjaGlsZCBlbGVtZW50LlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSBpbiB0aGUgY2FzZSBvZiBkZWVwIHF1ZXJpZXMgdGhlIGBjaGlsZCgpYCByZXR1cm5zXG4gICAqIHF1ZXJpZXMgZm9yIHRoZSBjaGlsZCBub2RlLiBJbiBjYXNlIG9mIHNoYWxsb3cgcXVlcmllcyBpdCByZXR1cm5zXG4gICAqIGBudWxsYC5cbiAgICovXG4gIGNoaWxkKCk6IExRdWVyaWVzfG51bGw7XG5cbiAgLyoqXG4gICAqIE5vdGlmeSBgTFF1ZXJpZXNgIHRoYXQgYSBuZXcgYExOb2RlYCBoYXMgYmVlbiBjcmVhdGVkIGFuZCBuZWVkcyB0byBiZSBhZGRlZCB0byBxdWVyeSByZXN1bHRzXG4gICAqIGlmIG1hdGNoaW5nIHF1ZXJ5IHByZWRpY2F0ZS5cbiAgICovXG4gIGFkZE5vZGUobm9kZTogTE5vZGUpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBOb3RpZnkgYExRdWVyaWVzYCB0aGF0IGEgbmV3IExDb250YWluZXIgd2FzIGFkZGVkIHRvIGl2eSBkYXRhIHN0cnVjdHVyZXMuIEFzIGEgcmVzdWx0IHdlIG5lZWRcbiAgICogdG8gcHJlcGFyZSByb29tIGZvciB2aWV3cyB0aGF0IG1pZ2h0IGJlIGluc2VydGVkIGludG8gdGhpcyBjb250YWluZXIuXG4gICAqL1xuICBjb250YWluZXIoKTogTFF1ZXJpZXN8bnVsbDtcblxuICAvKipcbiAgICogTm90aWZ5IGBMUXVlcmllc2AgdGhhdCBhIG5ldyBgTFZpZXdgIGhhcyBiZWVuIGNyZWF0ZWQuIEFzIGEgcmVzdWx0IHdlIG5lZWQgdG8gcHJlcGFyZSByb29tXG4gICAqIGFuZCBjb2xsZWN0IG5vZGVzIHRoYXQgbWF0Y2ggcXVlcnkgcHJlZGljYXRlLlxuICAgKi9cbiAgY3JlYXRlVmlldygpOiBMUXVlcmllc3xudWxsO1xuXG4gIC8qKlxuICAgKiBOb3RpZnkgYExRdWVyaWVzYCB0aGF0IGEgbmV3IGBMVmlld2AgaGFzIGJlZW4gYWRkZWQgdG8gYExDb250YWluZXJgLiBBcyBhIHJlc3VsdCBhbGxcbiAgICogdGhlIG1hdGNoaW5nIG5vZGVzIGZyb20gdGhpcyB2aWV3IHNob3VsZCBiZSBhZGRlZCB0byBjb250YWluZXIncyBxdWVyaWVzLlxuICAgKi9cbiAgaW5zZXJ0VmlldyhuZXdWaWV3SW5kZXg6IG51bWJlcik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIE5vdGlmeSBgTFF1ZXJpZXNgIHRoYXQgYW4gYExWaWV3YCBoYXMgYmVlbiByZW1vdmVkIGZyb20gYExDb250YWluZXJgLiBBcyBhIHJlc3VsdCBhbGxcbiAgICogdGhlIG1hdGNoaW5nIG5vZGVzIGZyb20gdGhpcyB2aWV3IHNob3VsZCBiZSByZW1vdmVkIGZyb20gY29udGFpbmVyJ3MgcXVlcmllcy5cbiAgICovXG4gIHJlbW92ZVZpZXcoKTogdm9pZDtcblxuICAvKipcbiAgICogQWRkIGFkZGl0aW9uYWwgYFF1ZXJ5TGlzdGAgdG8gdHJhY2suXG4gICAqXG4gICAqIEBwYXJhbSBxdWVyeUxpc3QgYFF1ZXJ5TGlzdGAgdG8gdXBkYXRlIHdpdGggY2hhbmdlcy5cbiAgICogQHBhcmFtIHByZWRpY2F0ZSBFaXRoZXIgYFR5cGVgIG9yIHNlbGVjdG9yIGFycmF5IG9mIFtrZXksIHZhbHVlXSBwcmVkaWNhdGVzLlxuICAgKiBAcGFyYW0gZGVzY2VuZCBJZiB0cnVlIHRoZSBxdWVyeSB3aWxsIHJlY3Vyc2l2ZWx5IGFwcGx5IHRvIHRoZSBjaGlsZHJlbi5cbiAgICogQHBhcmFtIHJlYWQgSW5kaWNhdGVzIHdoaWNoIHRva2VuIHNob3VsZCBiZSByZWFkIGZyb20gREkgZm9yIHRoaXMgcXVlcnkuXG4gICAqL1xuICB0cmFjazxUPihcbiAgICAgIHF1ZXJ5TGlzdDogUXVlcnlMaXN0PFQ+LCBwcmVkaWNhdGU6IFR5cGU8YW55PnxzdHJpbmdbXSwgZGVzY2VuZD86IGJvb2xlYW4sXG4gICAgICByZWFkPzogUXVlcnlSZWFkVHlwZTxUPnxUeXBlPFQ+KTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFF1ZXJ5UmVhZFR5cGU8VD4geyBwcml2YXRlIGRlZmVhdFN0cnVjdHVyYWxUeXBpbmc6IGFueTsgfVxuXG4vLyBOb3RlOiBUaGlzIGhhY2sgaXMgbmVjZXNzYXJ5IHNvIHdlIGRvbid0IGVycm9uZW91c2x5IGdldCBhIGNpcmN1bGFyIGRlcGVuZGVuY3lcbi8vIGZhaWx1cmUgYmFzZWQgb24gdHlwZXMuXG5leHBvcnQgY29uc3QgdW51c2VkVmFsdWVFeHBvcnRUb1BsYWNhdGVBamQgPSAxO1xuIl19