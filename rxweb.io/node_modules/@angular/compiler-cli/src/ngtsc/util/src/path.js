/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngtsc/util/src/path", ["require", "exports", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference types="node" />
    var path = require("path");
    var TS_DTS_EXTENSION = /(\.d)?\.ts$/;
    function relativePathBetween(from, to) {
        var relative = path.posix.relative(path.dirname(from), to).replace(TS_DTS_EXTENSION, '');
        if (relative === '') {
            return null;
        }
        // path.relative() does not include the leading './'.
        if (!relative.startsWith('.')) {
            relative = "./" + relative;
        }
        return relative;
    }
    exports.relativePathBetween = relativePathBetween;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvdXRpbC9zcmMvcGF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILDhCQUE4QjtJQUU5QiwyQkFBNkI7SUFFN0IsSUFBTSxnQkFBZ0IsR0FBRyxhQUFhLENBQUM7SUFFdkMsNkJBQW9DLElBQVksRUFBRSxFQUFVO1FBQzFELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXpGLElBQUksUUFBUSxLQUFLLEVBQUUsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQscURBQXFEO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLFFBQVEsR0FBRyxPQUFLLFFBQVUsQ0FBQztTQUM1QjtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFiRCxrREFhQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJub2RlXCIgLz5cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuY29uc3QgVFNfRFRTX0VYVEVOU0lPTiA9IC8oXFwuZCk/XFwudHMkLztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbGF0aXZlUGF0aEJldHdlZW4oZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICBsZXQgcmVsYXRpdmUgPSBwYXRoLnBvc2l4LnJlbGF0aXZlKHBhdGguZGlybmFtZShmcm9tKSwgdG8pLnJlcGxhY2UoVFNfRFRTX0VYVEVOU0lPTiwgJycpO1xuXG4gIGlmIChyZWxhdGl2ZSA9PT0gJycpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIHBhdGgucmVsYXRpdmUoKSBkb2VzIG5vdCBpbmNsdWRlIHRoZSBsZWFkaW5nICcuLycuXG4gIGlmICghcmVsYXRpdmUuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgcmVsYXRpdmUgPSBgLi8ke3JlbGF0aXZlfWA7XG4gIH1cblxuICByZXR1cm4gcmVsYXRpdmU7XG59Il19