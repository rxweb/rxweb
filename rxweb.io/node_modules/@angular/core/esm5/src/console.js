/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from './di';
var Console = /** @class */ (function () {
    function Console() {
    }
    Console.prototype.log = function (message) {
        // tslint:disable-next-line:no-console
        console.log(message);
    };
    // Note: for reporting errors use `DOM.logError()` as it is platform specific
    Console.prototype.warn = function (message) {
        // tslint:disable-next-line:no-console
        console.warn(message);
    };
    Console.decorators = [
        { type: Injectable }
    ];
    return Console;
}());
export { Console };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2NvbnNvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVoQztJQUFBO0lBV0EsQ0FBQztJQVRDLHFCQUFHLEdBQUgsVUFBSSxPQUFlO1FBQ2pCLHNDQUFzQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCw2RUFBNkU7SUFDN0Usc0JBQUksR0FBSixVQUFLLE9BQWU7UUFDbEIsc0NBQXNDO1FBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7Z0JBVkYsVUFBVTs7SUFXWCxjQUFDO0NBQUEsQUFYRCxJQVdDO1NBVlksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICcuL2RpJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbnNvbGUge1xuICBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgfVxuICAvLyBOb3RlOiBmb3IgcmVwb3J0aW5nIGVycm9ycyB1c2UgYERPTS5sb2dFcnJvcigpYCBhcyBpdCBpcyBwbGF0Zm9ybSBzcGVjaWZpY1xuICB3YXJuKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICB9XG59XG4iXX0=