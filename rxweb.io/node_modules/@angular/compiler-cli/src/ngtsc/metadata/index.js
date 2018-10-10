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
        define("@angular/compiler-cli/src/ngtsc/metadata", ["require", "exports", "@angular/compiler-cli/src/ngtsc/metadata/src/reflector", "@angular/compiler-cli/src/ngtsc/metadata/src/resolver"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var reflector_1 = require("@angular/compiler-cli/src/ngtsc/metadata/src/reflector");
    exports.TypeScriptReflectionHost = reflector_1.TypeScriptReflectionHost;
    exports.filterToMembersWithDecorator = reflector_1.filterToMembersWithDecorator;
    exports.findMember = reflector_1.findMember;
    exports.reflectObjectLiteral = reflector_1.reflectObjectLiteral;
    exports.reflectTypeEntityToDeclaration = reflector_1.reflectTypeEntityToDeclaration;
    var resolver_1 = require("@angular/compiler-cli/src/ngtsc/metadata/src/resolver");
    exports.AbsoluteReference = resolver_1.AbsoluteReference;
    exports.Reference = resolver_1.Reference;
    exports.isDynamicValue = resolver_1.isDynamicValue;
    exports.staticallyResolve = resolver_1.staticallyResolve;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvc3JjL25ndHNjL21ldGFkYXRhL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7O0lBRUgsb0ZBQXlKO0lBQWpKLCtDQUFBLHdCQUF3QixDQUFBO0lBQUUsbURBQUEsNEJBQTRCLENBQUE7SUFBRSxpQ0FBQSxVQUFVLENBQUE7SUFBRSwyQ0FBQSxvQkFBb0IsQ0FBQTtJQUFFLHFEQUFBLDhCQUE4QixDQUFBO0lBQ2hJLGtGQUE4RztJQUF0Ryx1Q0FBQSxpQkFBaUIsQ0FBQTtJQUFFLCtCQUFBLFNBQVMsQ0FBQTtJQUFpQixvQ0FBQSxjQUFjLENBQUE7SUFBRSx1Q0FBQSxpQkFBaUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuZXhwb3J0IHtUeXBlU2NyaXB0UmVmbGVjdGlvbkhvc3QsIGZpbHRlclRvTWVtYmVyc1dpdGhEZWNvcmF0b3IsIGZpbmRNZW1iZXIsIHJlZmxlY3RPYmplY3RMaXRlcmFsLCByZWZsZWN0VHlwZUVudGl0eVRvRGVjbGFyYXRpb259IGZyb20gJy4vc3JjL3JlZmxlY3Rvcic7XG5leHBvcnQge0Fic29sdXRlUmVmZXJlbmNlLCBSZWZlcmVuY2UsIFJlc29sdmVkVmFsdWUsIGlzRHluYW1pY1ZhbHVlLCBzdGF0aWNhbGx5UmVzb2x2ZX0gZnJvbSAnLi9zcmMvcmVzb2x2ZXInO1xuIl19