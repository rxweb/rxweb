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
import { Inject, Injectable, inject } from '@angular/core';
import { getDOM } from '../dom/dom_adapter';
import { DOCUMENT } from '../dom/dom_tokens';
import * as i0 from "@angular/core";
/**
 * Factory to create Title service.
 * @return {?}
 */
export function createTitle() {
    return new Title(inject(DOCUMENT));
}
/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * \@experimental
 */
export class Title {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        this._doc = _doc;
    }
    /**
     * Get the title of the current HTML document.
     * @return {?}
     */
    getTitle() { return getDOM().getTitle(this._doc); }
    /**
     * Set the title of the current HTML document.
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(newTitle) { getDOM().setTitle(this._doc, newTitle); }
}
Title.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: createTitle, deps: [] },] }
];
/** @nocollapse */
Title.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ Title.ngInjectableDef = i0.defineInjectable({ factory: createTitle, token: Title, providedIn: "root" });
if (false) {
    /** @type {?} */
    Title.prototype._doc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3RpdGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUMxQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7OztBQUszQyxNQUFNO0lBQ0osT0FBTyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztDQUNwQzs7Ozs7Ozs7Ozs7QUFhRCxNQUFNOzs7O0lBQ0osWUFBc0MsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7S0FBSTs7Ozs7SUFJbkQsUUFBUSxLQUFhLE9BQU8sTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFOzs7Ozs7SUFNM0QsUUFBUSxDQUFDLFFBQWdCLElBQUksTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTs7O1lBWnZFLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDOzs7OzRDQUVwRCxNQUFNLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIGluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Z2V0RE9NfSBmcm9tICcuLi9kb20vZG9tX2FkYXB0ZXInO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnLi4vZG9tL2RvbV90b2tlbnMnO1xuXG4vKipcbiAqIEZhY3RvcnkgdG8gY3JlYXRlIFRpdGxlIHNlcnZpY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUaXRsZSgpIHtcbiAgcmV0dXJuIG5ldyBUaXRsZShpbmplY3QoRE9DVU1FTlQpKTtcbn1cblxuLyoqXG4gKiBBIHNlcnZpY2UgdGhhdCBjYW4gYmUgdXNlZCB0byBnZXQgYW5kIHNldCB0aGUgdGl0bGUgb2YgYSBjdXJyZW50IEhUTUwgZG9jdW1lbnQuXG4gKlxuICogU2luY2UgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBjYW4ndCBiZSBib290c3RyYXBwZWQgb24gdGhlIGVudGlyZSBIVE1MIGRvY3VtZW50IChgPGh0bWw+YCB0YWcpXG4gKiBpdCBpcyBub3QgcG9zc2libGUgdG8gYmluZCB0byB0aGUgYHRleHRgIHByb3BlcnR5IG9mIHRoZSBgSFRNTFRpdGxlRWxlbWVudGAgZWxlbWVudHNcbiAqIChyZXByZXNlbnRpbmcgdGhlIGA8dGl0bGU+YCB0YWcpLiBJbnN0ZWFkLCB0aGlzIHNlcnZpY2UgY2FuIGJlIHVzZWQgdG8gc2V0IGFuZCBnZXQgdGhlIGN1cnJlbnRcbiAqIHRpdGxlIHZhbHVlLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogY3JlYXRlVGl0bGUsIGRlcHM6IFtdfSlcbmV4cG9ydCBjbGFzcyBUaXRsZSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55KSB7fVxuICAvKipcbiAgICogR2V0IHRoZSB0aXRsZSBvZiB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKi9cbiAgZ2V0VGl0bGUoKTogc3RyaW5nIHsgcmV0dXJuIGdldERPTSgpLmdldFRpdGxlKHRoaXMuX2RvYyk7IH1cblxuICAvKipcbiAgICogU2V0IHRoZSB0aXRsZSBvZiB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKiBAcGFyYW0gbmV3VGl0bGVcbiAgICovXG4gIHNldFRpdGxlKG5ld1RpdGxlOiBzdHJpbmcpIHsgZ2V0RE9NKCkuc2V0VGl0bGUodGhpcy5fZG9jLCBuZXdUaXRsZSk7IH1cbn1cbiJdfQ==