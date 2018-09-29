/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
/**
 * A backend for http that uses the `XMLHttpRequest` browser API.
 *
 * Take care not to evaluate this in non-browser contexts.
 *
 * @deprecated see https://angular.io/guide/http
 */
var BrowserXhr = /** @class */ (function () {
    function BrowserXhr() {
    }
    BrowserXhr.prototype.build = function () { return (new XMLHttpRequest()); };
    BrowserXhr.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    BrowserXhr.ctorParameters = function () { return []; };
    return BrowserXhr;
}());
export { BrowserXhr };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl94aHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy9iYWNrZW5kcy9icm93c2VyX3hoci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDOzs7Ozs7R0FNRztBQUNIO0lBRUU7SUFBZSxDQUFDO0lBQ2hCLDBCQUFLLEdBQUwsY0FBZSxPQUFZLENBQUMsSUFBSSxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBSHJELFVBQVU7Ozs7SUFJWCxpQkFBQztDQUFBLEFBSkQsSUFJQztTQUhZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQSBiYWNrZW5kIGZvciBodHRwIHRoYXQgdXNlcyB0aGUgYFhNTEh0dHBSZXF1ZXN0YCBicm93c2VyIEFQSS5cbiAqXG4gKiBUYWtlIGNhcmUgbm90IHRvIGV2YWx1YXRlIHRoaXMgaW4gbm9uLWJyb3dzZXIgY29udGV4dHMuXG4gKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCcm93c2VyWGhyIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBidWlsZCgpOiBhbnkgeyByZXR1cm4gPGFueT4obmV3IFhNTEh0dHBSZXF1ZXN0KCkpOyB9XG59XG4iXX0=