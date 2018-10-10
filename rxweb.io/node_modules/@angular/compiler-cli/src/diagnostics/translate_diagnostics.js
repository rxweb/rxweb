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
        define("@angular/compiler-cli/src/diagnostics/translate_diagnostics", ["require", "exports", "typescript", "@angular/compiler-cli/src/transformers/api", "@angular/compiler-cli/src/transformers/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ts = require("typescript");
    var api_1 = require("@angular/compiler-cli/src/transformers/api");
    var util_1 = require("@angular/compiler-cli/src/transformers/util");
    function translateDiagnostics(host, untranslatedDiagnostics) {
        var ts = [];
        var ng = [];
        untranslatedDiagnostics.forEach(function (diagnostic) {
            if (diagnostic.file && diagnostic.start && util_1.GENERATED_FILES.test(diagnostic.file.fileName)) {
                // We need to filter out diagnostics about unused functions as
                // they are in fact referenced by nobody and only serve to surface
                // type check errors.
                if (diagnostic.code === /* ... is declared but never used */ 6133) {
                    return;
                }
                var span = sourceSpanOf(host, diagnostic.file, diagnostic.start);
                if (span) {
                    var fileName = span.start.file.url;
                    ng.push({
                        messageText: diagnosticMessageToString(diagnostic.messageText),
                        category: diagnostic.category, span: span,
                        source: api_1.SOURCE,
                        code: api_1.DEFAULT_ERROR_CODE
                    });
                }
            }
            else {
                ts.push(diagnostic);
            }
        });
        return { ts: ts, ng: ng };
    }
    exports.translateDiagnostics = translateDiagnostics;
    function sourceSpanOf(host, source, start) {
        var _a = ts.getLineAndCharacterOfPosition(source, start), line = _a.line, character = _a.character;
        return host.parseSourceSpanOf(source.fileName, line, character);
    }
    function diagnosticMessageToString(message) {
        return ts.flattenDiagnosticMessageText(message, '\n');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlX2RpYWdub3N0aWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL3NyYy9kaWFnbm9zdGljcy90cmFuc2xhdGVfZGlhZ25vc3RpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFHSCwrQkFBaUM7SUFFakMsa0VBQTJFO0lBQzNFLG9FQUFxRDtJQU1yRCw4QkFDSSxJQUFtQixFQUFFLHVCQUFxRDtRQUU1RSxJQUFNLEVBQUUsR0FBb0IsRUFBRSxDQUFDO1FBQy9CLElBQU0sRUFBRSxHQUFpQixFQUFFLENBQUM7UUFFNUIsdUJBQXVCLENBQUMsT0FBTyxDQUFDLFVBQUMsVUFBVTtZQUN6QyxJQUFJLFVBQVUsQ0FBQyxJQUFJLElBQUksVUFBVSxDQUFDLEtBQUssSUFBSSxzQkFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN6Riw4REFBOEQ7Z0JBQzlELGtFQUFrRTtnQkFDbEUscUJBQXFCO2dCQUNyQixJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssb0NBQW9DLENBQUMsSUFBSSxFQUFFO29CQUNqRSxPQUFPO2lCQUNSO2dCQUNELElBQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25FLElBQUksSUFBSSxFQUFFO29CQUNSLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDckMsRUFBRSxDQUFDLElBQUksQ0FBQzt3QkFDTixXQUFXLEVBQUUseUJBQXlCLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQzt3QkFDOUQsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxNQUFBO3dCQUNuQyxNQUFNLEVBQUUsWUFBTTt3QkFDZCxJQUFJLEVBQUUsd0JBQWtCO3FCQUN6QixDQUFDLENBQUM7aUJBQ0o7YUFDRjtpQkFBTTtnQkFDTCxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3JCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEVBQUMsRUFBRSxJQUFBLEVBQUUsRUFBRSxJQUFBLEVBQUMsQ0FBQztJQUNsQixDQUFDO0lBN0JELG9EQTZCQztJQUVELHNCQUFzQixJQUFtQixFQUFFLE1BQXFCLEVBQUUsS0FBYTtRQUV2RSxJQUFBLG9EQUFtRSxFQUFsRSxjQUFJLEVBQUUsd0JBQVMsQ0FBb0Q7UUFDMUUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELG1DQUFtQyxPQUEyQztRQUM1RSxPQUFPLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQYXJzZVNvdXJjZVNwYW59IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge0RFRkFVTFRfRVJST1JfQ09ERSwgRGlhZ25vc3RpYywgU09VUkNFfSBmcm9tICcuLi90cmFuc2Zvcm1lcnMvYXBpJztcbmltcG9ydCB7R0VORVJBVEVEX0ZJTEVTfSBmcm9tICcuLi90cmFuc2Zvcm1lcnMvdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZUNoZWNrSG9zdCB7XG4gIHBhcnNlU291cmNlU3Bhbk9mKGZpbGVOYW1lOiBzdHJpbmcsIGxpbmU6IG51bWJlciwgY2hhcmFjdGVyOiBudW1iZXIpOiBQYXJzZVNvdXJjZVNwYW58bnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZURpYWdub3N0aWNzKFxuICAgIGhvc3Q6IFR5cGVDaGVja0hvc3QsIHVudHJhbnNsYXRlZERpYWdub3N0aWNzOiBSZWFkb25seUFycmF5PHRzLkRpYWdub3N0aWM+KTpcbiAgICB7dHM6IHRzLkRpYWdub3N0aWNbXSwgbmc6IERpYWdub3N0aWNbXX0ge1xuICBjb25zdCB0czogdHMuRGlhZ25vc3RpY1tdID0gW107XG4gIGNvbnN0IG5nOiBEaWFnbm9zdGljW10gPSBbXTtcblxuICB1bnRyYW5zbGF0ZWREaWFnbm9zdGljcy5mb3JFYWNoKChkaWFnbm9zdGljKSA9PiB7XG4gICAgaWYgKGRpYWdub3N0aWMuZmlsZSAmJiBkaWFnbm9zdGljLnN0YXJ0ICYmIEdFTkVSQVRFRF9GSUxFUy50ZXN0KGRpYWdub3N0aWMuZmlsZS5maWxlTmFtZSkpIHtcbiAgICAgIC8vIFdlIG5lZWQgdG8gZmlsdGVyIG91dCBkaWFnbm9zdGljcyBhYm91dCB1bnVzZWQgZnVuY3Rpb25zIGFzXG4gICAgICAvLyB0aGV5IGFyZSBpbiBmYWN0IHJlZmVyZW5jZWQgYnkgbm9ib2R5IGFuZCBvbmx5IHNlcnZlIHRvIHN1cmZhY2VcbiAgICAgIC8vIHR5cGUgY2hlY2sgZXJyb3JzLlxuICAgICAgaWYgKGRpYWdub3N0aWMuY29kZSA9PT0gLyogLi4uIGlzIGRlY2xhcmVkIGJ1dCBuZXZlciB1c2VkICovIDYxMzMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgc3BhbiA9IHNvdXJjZVNwYW5PZihob3N0LCBkaWFnbm9zdGljLmZpbGUsIGRpYWdub3N0aWMuc3RhcnQpO1xuICAgICAgaWYgKHNwYW4pIHtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBzcGFuLnN0YXJ0LmZpbGUudXJsO1xuICAgICAgICBuZy5wdXNoKHtcbiAgICAgICAgICBtZXNzYWdlVGV4dDogZGlhZ25vc3RpY01lc3NhZ2VUb1N0cmluZyhkaWFnbm9zdGljLm1lc3NhZ2VUZXh0KSxcbiAgICAgICAgICBjYXRlZ29yeTogZGlhZ25vc3RpYy5jYXRlZ29yeSwgc3BhbixcbiAgICAgICAgICBzb3VyY2U6IFNPVVJDRSxcbiAgICAgICAgICBjb2RlOiBERUZBVUxUX0VSUk9SX0NPREVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRzLnB1c2goZGlhZ25vc3RpYyk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHt0cywgbmd9O1xufVxuXG5mdW5jdGlvbiBzb3VyY2VTcGFuT2YoaG9zdDogVHlwZUNoZWNrSG9zdCwgc291cmNlOiB0cy5Tb3VyY2VGaWxlLCBzdGFydDogbnVtYmVyKTogUGFyc2VTb3VyY2VTcGFufFxuICAgIG51bGwge1xuICBjb25zdCB7bGluZSwgY2hhcmFjdGVyfSA9IHRzLmdldExpbmVBbmRDaGFyYWN0ZXJPZlBvc2l0aW9uKHNvdXJjZSwgc3RhcnQpO1xuICByZXR1cm4gaG9zdC5wYXJzZVNvdXJjZVNwYW5PZihzb3VyY2UuZmlsZU5hbWUsIGxpbmUsIGNoYXJhY3Rlcik7XG59XG5cbmZ1bmN0aW9uIGRpYWdub3N0aWNNZXNzYWdlVG9TdHJpbmcobWVzc2FnZTogdHMuRGlhZ25vc3RpY01lc3NhZ2VDaGFpbiB8IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiB0cy5mbGF0dGVuRGlhZ25vc3RpY01lc3NhZ2VUZXh0KG1lc3NhZ2UsICdcXG4nKTtcbn1cbiJdfQ==