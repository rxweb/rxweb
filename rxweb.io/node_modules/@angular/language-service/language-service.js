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
        define("@angular/language-service/language-service", ["require", "exports", "tslib", "@angular/language-service/src/language_service", "@angular/language-service/src/ts_plugin", "@angular/language-service/src/typescript_host", "@angular/language-service/src/version"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    /**
     * @module
     * @description
     * Entry point for all public APIs of the language service package.
     */
    var language_service_1 = require("@angular/language-service/src/language_service");
    exports.createLanguageService = language_service_1.createLanguageService;
    tslib_1.__exportStar(require("@angular/language-service/src/ts_plugin"), exports);
    var typescript_host_1 = require("@angular/language-service/src/typescript_host");
    exports.TypeScriptServiceHost = typescript_host_1.TypeScriptServiceHost;
    exports.createLanguageServiceFromTypescript = typescript_host_1.createLanguageServiceFromTypescript;
    var version_1 = require("@angular/language-service/src/version");
    exports.VERSION = version_1.VERSION;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2Utc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xhbmd1YWdlLXNlcnZpY2UvbGFuZ3VhZ2Utc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFFSDs7OztPQUlHO0lBQ0gsbUZBQTZEO0lBQXJELG1EQUFBLHFCQUFxQixDQUFBO0lBQzdCLGtGQUFnQztJQUVoQyxpRkFBaUc7SUFBekYsa0RBQUEscUJBQXFCLENBQUE7SUFBRSxnRUFBQSxtQ0FBbUMsQ0FBQTtJQUNsRSxpRUFBc0M7SUFBOUIsNEJBQUEsT0FBTyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIEBtb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICogRW50cnkgcG9pbnQgZm9yIGFsbCBwdWJsaWMgQVBJcyBvZiB0aGUgbGFuZ3VhZ2Ugc2VydmljZSBwYWNrYWdlLlxuICovXG5leHBvcnQge2NyZWF0ZUxhbmd1YWdlU2VydmljZX0gZnJvbSAnLi9zcmMvbGFuZ3VhZ2Vfc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy90c19wbHVnaW4nO1xuZXhwb3J0IHtDb21wbGV0aW9uLCBDb21wbGV0aW9ucywgRGVjbGFyYXRpb24sIERlY2xhcmF0aW9ucywgRGVmaW5pdGlvbiwgRGlhZ25vc3RpYywgRGlhZ25vc3RpY3MsIEhvdmVyLCBIb3ZlclRleHRTZWN0aW9uLCBMYW5ndWFnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZUhvc3QsIExvY2F0aW9uLCBTcGFuLCBUZW1wbGF0ZVNvdXJjZSwgVGVtcGxhdGVTb3VyY2VzfSBmcm9tICcuL3NyYy90eXBlcyc7XG5leHBvcnQge1R5cGVTY3JpcHRTZXJ2aWNlSG9zdCwgY3JlYXRlTGFuZ3VhZ2VTZXJ2aWNlRnJvbVR5cGVzY3JpcHR9IGZyb20gJy4vc3JjL3R5cGVzY3JpcHRfaG9zdCc7XG5leHBvcnQge1ZFUlNJT059IGZyb20gJy4vc3JjL3ZlcnNpb24nO1xuIl19