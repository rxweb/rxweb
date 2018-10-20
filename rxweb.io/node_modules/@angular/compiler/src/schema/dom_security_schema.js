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
        define("@angular/compiler/src/schema/dom_security_schema", ["require", "exports", "tslib", "@angular/compiler/src/core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var core_1 = require("@angular/compiler/src/core");
    // =================================================================================================
    // =================================================================================================
    // =========== S T O P   -  S T O P   -  S T O P   -  S T O P   -  S T O P   -  S T O P  ===========
    // =================================================================================================
    // =================================================================================================
    //
    //        DO NOT EDIT THIS LIST OF SECURITY SENSITIVE PROPERTIES WITHOUT A SECURITY REVIEW!
    //                               Reach out to mprobst for details.
    //
    // =================================================================================================
    /** Map from tagName|propertyName SecurityContext. Properties applying to all tags use '*'. */
    var _SECURITY_SCHEMA;
    function SECURITY_SCHEMA() {
        if (!_SECURITY_SCHEMA) {
            _SECURITY_SCHEMA = {};
            // Case is insignificant below, all element and attribute names are lower-cased for lookup.
            registerContext(core_1.SecurityContext.HTML, [
                'iframe|srcdoc',
                '*|innerHTML',
                '*|outerHTML',
            ]);
            registerContext(core_1.SecurityContext.STYLE, ['*|style']);
            // NB: no SCRIPT contexts here, they are never allowed due to the parser stripping them.
            registerContext(core_1.SecurityContext.URL, [
                '*|formAction', 'area|href', 'area|ping', 'audio|src', 'a|href',
                'a|ping', 'blockquote|cite', 'body|background', 'del|cite', 'form|action',
                'img|src', 'img|srcset', 'input|src', 'ins|cite', 'q|cite',
                'source|src', 'source|srcset', 'track|src', 'video|poster', 'video|src',
            ]);
            registerContext(core_1.SecurityContext.RESOURCE_URL, [
                'applet|code',
                'applet|codebase',
                'base|href',
                'embed|src',
                'frame|src',
                'head|profile',
                'html|manifest',
                'iframe|src',
                'link|href',
                'media|src',
                'object|codebase',
                'object|data',
                'script|src',
            ]);
        }
        return _SECURITY_SCHEMA;
    }
    exports.SECURITY_SCHEMA = SECURITY_SCHEMA;
    function registerContext(ctx, specs) {
        var e_1, _a;
        try {
            for (var specs_1 = tslib_1.__values(specs), specs_1_1 = specs_1.next(); !specs_1_1.done; specs_1_1 = specs_1.next()) {
                var spec = specs_1_1.value;
                _SECURITY_SCHEMA[spec.toLowerCase()] = ctx;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (specs_1_1 && !specs_1_1.done && (_a = specs_1.return)) _a.call(specs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3NlY3VyaXR5X3NjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9zY2hlbWEvZG9tX3NlY3VyaXR5X3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFFSCxtREFBd0M7SUFFeEMsb0dBQW9HO0lBQ3BHLG9HQUFvRztJQUNwRyxvR0FBb0c7SUFDcEcsb0dBQW9HO0lBQ3BHLG9HQUFvRztJQUNwRyxFQUFFO0lBQ0YsMkZBQTJGO0lBQzNGLGtFQUFrRTtJQUNsRSxFQUFFO0lBQ0Ysb0dBQW9HO0lBRXBHLDhGQUE4RjtJQUM5RixJQUFJLGdCQUFrRCxDQUFDO0lBRXZEO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3JCLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztZQUN0QiwyRkFBMkY7WUFFM0YsZUFBZSxDQUFDLHNCQUFlLENBQUMsSUFBSSxFQUFFO2dCQUNwQyxlQUFlO2dCQUNmLGFBQWE7Z0JBQ2IsYUFBYTthQUNkLENBQUMsQ0FBQztZQUNILGVBQWUsQ0FBQyxzQkFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsd0ZBQXdGO1lBQ3hGLGVBQWUsQ0FBQyxzQkFBZSxDQUFDLEdBQUcsRUFBRTtnQkFDbkMsY0FBYyxFQUFFLFdBQVcsRUFBUSxXQUFXLEVBQVEsV0FBVyxFQUFLLFFBQVE7Z0JBQzlFLFFBQVEsRUFBUSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQU0sYUFBYTtnQkFDbkYsU0FBUyxFQUFPLFlBQVksRUFBTyxXQUFXLEVBQVEsVUFBVSxFQUFNLFFBQVE7Z0JBQzlFLFlBQVksRUFBSSxlQUFlLEVBQUksV0FBVyxFQUFRLGNBQWMsRUFBRSxXQUFXO2FBQ2xGLENBQUMsQ0FBQztZQUNILGVBQWUsQ0FBQyxzQkFBZSxDQUFDLFlBQVksRUFBRTtnQkFDNUMsYUFBYTtnQkFDYixpQkFBaUI7Z0JBQ2pCLFdBQVc7Z0JBQ1gsV0FBVztnQkFDWCxXQUFXO2dCQUNYLGNBQWM7Z0JBQ2QsZUFBZTtnQkFDZixZQUFZO2dCQUNaLFdBQVc7Z0JBQ1gsV0FBVztnQkFDWCxpQkFBaUI7Z0JBQ2pCLGFBQWE7Z0JBQ2IsWUFBWTthQUNiLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0lBbkNELDBDQW1DQztJQUVELHlCQUF5QixHQUFvQixFQUFFLEtBQWU7OztZQUM1RCxLQUFtQixJQUFBLFVBQUEsaUJBQUEsS0FBSyxDQUFBLDRCQUFBO2dCQUFuQixJQUFNLElBQUksa0JBQUE7Z0JBQVcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQUE7Ozs7Ozs7OztJQUN2RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1NlY3VyaXR5Q29udGV4dH0gZnJvbSAnLi4vY29yZSc7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vID09PT09PT09PT09IFMgVCBPIFAgICAtICBTIFQgTyBQICAgLSAgUyBUIE8gUCAgIC0gIFMgVCBPIFAgICAtICBTIFQgTyBQICAgLSAgUyBUIE8gUCAgPT09PT09PT09PT1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vXG4vLyAgICAgICAgRE8gTk9UIEVESVQgVEhJUyBMSVNUIE9GIFNFQ1VSSVRZIFNFTlNJVElWRSBQUk9QRVJUSUVTIFdJVEhPVVQgQSBTRUNVUklUWSBSRVZJRVchXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjaCBvdXQgdG8gbXByb2JzdCBmb3IgZGV0YWlscy5cbi8vXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKiBNYXAgZnJvbSB0YWdOYW1lfHByb3BlcnR5TmFtZSBTZWN1cml0eUNvbnRleHQuIFByb3BlcnRpZXMgYXBwbHlpbmcgdG8gYWxsIHRhZ3MgdXNlICcqJy4gKi9cbmxldCBfU0VDVVJJVFlfU0NIRU1BICE6IHtbazogc3RyaW5nXTogU2VjdXJpdHlDb250ZXh0fTtcblxuZXhwb3J0IGZ1bmN0aW9uIFNFQ1VSSVRZX1NDSEVNQSgpOiB7W2s6IHN0cmluZ106IFNlY3VyaXR5Q29udGV4dH0ge1xuICBpZiAoIV9TRUNVUklUWV9TQ0hFTUEpIHtcbiAgICBfU0VDVVJJVFlfU0NIRU1BID0ge307XG4gICAgLy8gQ2FzZSBpcyBpbnNpZ25pZmljYW50IGJlbG93LCBhbGwgZWxlbWVudCBhbmQgYXR0cmlidXRlIG5hbWVzIGFyZSBsb3dlci1jYXNlZCBmb3IgbG9va3VwLlxuXG4gICAgcmVnaXN0ZXJDb250ZXh0KFNlY3VyaXR5Q29udGV4dC5IVE1MLCBbXG4gICAgICAnaWZyYW1lfHNyY2RvYycsXG4gICAgICAnKnxpbm5lckhUTUwnLFxuICAgICAgJyp8b3V0ZXJIVE1MJyxcbiAgICBdKTtcbiAgICByZWdpc3RlckNvbnRleHQoU2VjdXJpdHlDb250ZXh0LlNUWUxFLCBbJyp8c3R5bGUnXSk7XG4gICAgLy8gTkI6IG5vIFNDUklQVCBjb250ZXh0cyBoZXJlLCB0aGV5IGFyZSBuZXZlciBhbGxvd2VkIGR1ZSB0byB0aGUgcGFyc2VyIHN0cmlwcGluZyB0aGVtLlxuICAgIHJlZ2lzdGVyQ29udGV4dChTZWN1cml0eUNvbnRleHQuVVJMLCBbXG4gICAgICAnKnxmb3JtQWN0aW9uJywgJ2FyZWF8aHJlZicsICAgICAgICdhcmVhfHBpbmcnLCAgICAgICAnYXVkaW98c3JjJywgICAgJ2F8aHJlZicsXG4gICAgICAnYXxwaW5nJywgICAgICAgJ2Jsb2NrcXVvdGV8Y2l0ZScsICdib2R5fGJhY2tncm91bmQnLCAnZGVsfGNpdGUnLCAgICAgJ2Zvcm18YWN0aW9uJyxcbiAgICAgICdpbWd8c3JjJywgICAgICAnaW1nfHNyY3NldCcsICAgICAgJ2lucHV0fHNyYycsICAgICAgICdpbnN8Y2l0ZScsICAgICAncXxjaXRlJyxcbiAgICAgICdzb3VyY2V8c3JjJywgICAnc291cmNlfHNyY3NldCcsICAgJ3RyYWNrfHNyYycsICAgICAgICd2aWRlb3xwb3N0ZXInLCAndmlkZW98c3JjJyxcbiAgICBdKTtcbiAgICByZWdpc3RlckNvbnRleHQoU2VjdXJpdHlDb250ZXh0LlJFU09VUkNFX1VSTCwgW1xuICAgICAgJ2FwcGxldHxjb2RlJyxcbiAgICAgICdhcHBsZXR8Y29kZWJhc2UnLFxuICAgICAgJ2Jhc2V8aHJlZicsXG4gICAgICAnZW1iZWR8c3JjJyxcbiAgICAgICdmcmFtZXxzcmMnLFxuICAgICAgJ2hlYWR8cHJvZmlsZScsXG4gICAgICAnaHRtbHxtYW5pZmVzdCcsXG4gICAgICAnaWZyYW1lfHNyYycsXG4gICAgICAnbGlua3xocmVmJyxcbiAgICAgICdtZWRpYXxzcmMnLFxuICAgICAgJ29iamVjdHxjb2RlYmFzZScsXG4gICAgICAnb2JqZWN0fGRhdGEnLFxuICAgICAgJ3NjcmlwdHxzcmMnLFxuICAgIF0pO1xuICB9XG4gIHJldHVybiBfU0VDVVJJVFlfU0NIRU1BO1xufVxuXG5mdW5jdGlvbiByZWdpc3RlckNvbnRleHQoY3R4OiBTZWN1cml0eUNvbnRleHQsIHNwZWNzOiBzdHJpbmdbXSkge1xuICBmb3IgKGNvbnN0IHNwZWMgb2Ygc3BlY3MpIF9TRUNVUklUWV9TQ0hFTUFbc3BlYy50b0xvd2VyQ2FzZSgpXSA9IGN0eDtcbn1cbiJdfQ==