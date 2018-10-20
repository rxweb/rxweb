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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcGVkLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9jb3JlL3NyYy92aXJ0dWFsLWZzL2hvc3Qvc2NvcGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsa0NBQXFEO0FBRXJELHlDQUEwQztBQUUxQyxnQkFBMEMsU0FBUSx1QkFBZTtJQUMvRCxZQUFZLFFBQWlCLEVBQVksUUFBYyxxQkFBYztRQUNuRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFEdUIsVUFBSyxHQUFMLEtBQUssQ0FBdUI7SUFFckUsQ0FBQztJQUVTLFFBQVEsQ0FBQyxJQUFVO1FBQzNCLE9BQU8sV0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNGO0FBUkQsZ0NBUUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBOb3JtYWxpemVkUm9vdCwgUGF0aCwgam9pbiB9IGZyb20gJy4uL3BhdGgnO1xuaW1wb3J0IHsgSG9zdCB9IGZyb20gJy4vaW50ZXJmYWNlJztcbmltcG9ydCB7IFJlc29sdmVySG9zdCB9IGZyb20gJy4vcmVzb2x2ZXInO1xuXG5leHBvcnQgY2xhc3MgU2NvcGVkSG9zdDxUIGV4dGVuZHMgb2JqZWN0PiBleHRlbmRzIFJlc29sdmVySG9zdDxUPiB7XG4gIGNvbnN0cnVjdG9yKGRlbGVnYXRlOiBIb3N0PFQ+LCBwcm90ZWN0ZWQgX3Jvb3Q6IFBhdGggPSBOb3JtYWxpemVkUm9vdCkge1xuICAgIHN1cGVyKGRlbGVnYXRlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfcmVzb2x2ZShwYXRoOiBQYXRoKTogUGF0aCB7XG4gICAgcmV0dXJuIGpvaW4odGhpcy5fcm9vdCwgcGF0aCk7XG4gIH1cbn1cbiJdfQ==