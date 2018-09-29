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
        define("@angular/compiler-cli/src/ngtsc/transform", ["require", "exports", "@angular/compiler-cli/src/ngtsc/transform/src/compilation", "@angular/compiler-cli/src/ngtsc/transform/src/transform"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var compilation_1 = require("@angular/compiler-cli/src/ngtsc/transform/src/compilation");
    exports.IvyCompilation = compilation_1.IvyCompilation;
    var transform_1 = require("@angular/compiler-cli/src/ngtsc/transform/src/transform");
    exports.ivyTransformFactory = transform_1.ivyTransformFactory;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvc3JjL25ndHNjL3RyYW5zZm9ybS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUdILHlGQUFpRDtJQUF6Qyx1Q0FBQSxjQUFjLENBQUE7SUFDdEIscUZBQW9EO0lBQTVDLDBDQUFBLG1CQUFtQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL3NyYy9hcGknO1xuZXhwb3J0IHtJdnlDb21waWxhdGlvbn0gZnJvbSAnLi9zcmMvY29tcGlsYXRpb24nO1xuZXhwb3J0IHtpdnlUcmFuc2Zvcm1GYWN0b3J5fSBmcm9tICcuL3NyYy90cmFuc2Zvcm0nO1xuIl19