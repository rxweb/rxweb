"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const path_1 = require("../path");
const resolver_1 = require("./resolver");
class ScopedHost extends resolver_1.ResolverHost {
    constructor(delegate, _root = path_1.NormalizedRoot) {
        super(delegate);
        this._root = _root;
    }
    _resolve(path) {
        return path_1.join(this._root, path);
    }
}
exports.ScopedHost = ScopedHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcGVkLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9jb3JlL3NyYy92aXJ0dWFsLWZzL2hvc3Qvc2NvcGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsa0NBQXFEO0FBRXJELHlDQUEwQztBQUUxQyxnQkFBMEMsU0FBUSx1QkFBZTtJQUMvRCxZQUFZLFFBQWlCLEVBQVksUUFBYyxxQkFBYztRQUNuRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFEdUIsVUFBSyxHQUFMLEtBQUssQ0FBdUI7SUFFckUsQ0FBQztJQUVTLFFBQVEsQ0FBQyxJQUFVO1FBQzNCLE1BQU0sQ0FBQyxXQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0Y7QUFSRCxnQ0FRQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IE5vcm1hbGl6ZWRSb290LCBQYXRoLCBqb2luIH0gZnJvbSAnLi4vcGF0aCc7XG5pbXBvcnQgeyBIb3N0IH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUmVzb2x2ZXJIb3N0IH0gZnJvbSAnLi9yZXNvbHZlcic7XG5cbmV4cG9ydCBjbGFzcyBTY29wZWRIb3N0PFQgZXh0ZW5kcyBvYmplY3Q+IGV4dGVuZHMgUmVzb2x2ZXJIb3N0PFQ+IHtcbiAgY29uc3RydWN0b3IoZGVsZWdhdGU6IEhvc3Q8VD4sIHByb3RlY3RlZCBfcm9vdDogUGF0aCA9IE5vcm1hbGl6ZWRSb290KSB7XG4gICAgc3VwZXIoZGVsZWdhdGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9yZXNvbHZlKHBhdGg6IFBhdGgpOiBQYXRoIHtcbiAgICByZXR1cm4gam9pbih0aGlzLl9yb290LCBwYXRoKTtcbiAgfVxufVxuIl19