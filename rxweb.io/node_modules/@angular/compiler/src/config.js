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
        define("@angular/compiler/src/config", ["require", "exports", "@angular/compiler/src/core", "@angular/compiler/src/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/compiler/src/core");
    var util_1 = require("@angular/compiler/src/util");
    var CompilerConfig = /** @class */ (function () {
        function CompilerConfig(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.defaultEncapsulation, defaultEncapsulation = _c === void 0 ? core_1.ViewEncapsulation.Emulated : _c, _d = _b.useJit, useJit = _d === void 0 ? true : _d, _e = _b.jitDevMode, jitDevMode = _e === void 0 ? false : _e, _f = _b.missingTranslation, missingTranslation = _f === void 0 ? null : _f, preserveWhitespaces = _b.preserveWhitespaces, strictInjectionParameters = _b.strictInjectionParameters;
            this.defaultEncapsulation = defaultEncapsulation;
            this.useJit = !!useJit;
            this.jitDevMode = !!jitDevMode;
            this.missingTranslation = missingTranslation;
            this.preserveWhitespaces = preserveWhitespacesDefault(util_1.noUndefined(preserveWhitespaces));
            this.strictInjectionParameters = strictInjectionParameters === true;
        }
        return CompilerConfig;
    }());
    exports.CompilerConfig = CompilerConfig;
    function preserveWhitespacesDefault(preserveWhitespacesOption, defaultSetting) {
        if (defaultSetting === void 0) { defaultSetting = false; }
        return preserveWhitespacesOption === null ? defaultSetting : preserveWhitespacesOption;
    }
    exports.preserveWhitespacesDefault = preserveWhitespacesDefault;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUdILG1EQUFxRTtJQUdyRSxtREFBbUM7SUFFbkM7UUFRRSx3QkFDSSxFQVFNO2dCQVJOLDRCQVFNLEVBUkwsNEJBQWlELEVBQWpELDZFQUFpRCxFQUFFLGNBQWEsRUFBYixrQ0FBYSxFQUFFLGtCQUFrQixFQUFsQix1Q0FBa0IsRUFDcEYsMEJBQXlCLEVBQXpCLDhDQUF5QixFQUFFLDRDQUFtQixFQUFFLHdEQUF5QjtZQVE1RSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7WUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUMvQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7WUFDN0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLDBCQUEwQixDQUFDLGtCQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyx5QkFBeUIsR0FBRyx5QkFBeUIsS0FBSyxJQUFJLENBQUM7UUFDdEUsQ0FBQztRQUNILHFCQUFDO0lBQUQsQ0FBQyxBQXpCRCxJQXlCQztJQXpCWSx3Q0FBYztJQTJCM0Isb0NBQ0kseUJBQXlDLEVBQUUsY0FBc0I7UUFBdEIsK0JBQUEsRUFBQSxzQkFBc0I7UUFDbkUsT0FBTyx5QkFBeUIsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMseUJBQXlCLENBQUM7SUFDekYsQ0FBQztJQUhELGdFQUdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGF9IGZyb20gJy4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge01pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7SWRlbnRpZmllcnN9IGZyb20gJy4vaWRlbnRpZmllcnMnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7bm9VbmRlZmluZWR9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlckNvbmZpZyB7XG4gIHB1YmxpYyBkZWZhdWx0RW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb258bnVsbDtcbiAgcHVibGljIHVzZUppdDogYm9vbGVhbjtcbiAgcHVibGljIGppdERldk1vZGU6IGJvb2xlYW47XG4gIHB1YmxpYyBtaXNzaW5nVHJhbnNsYXRpb246IE1pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5fG51bGw7XG4gIHB1YmxpYyBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBib29sZWFuO1xuICBwdWJsaWMgc3RyaWN0SW5qZWN0aW9uUGFyYW1ldGVyczogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHtkZWZhdWx0RW5jYXBzdWxhdGlvbiA9IFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkLCB1c2VKaXQgPSB0cnVlLCBqaXREZXZNb2RlID0gZmFsc2UsXG4gICAgICAgbWlzc2luZ1RyYW5zbGF0aW9uID0gbnVsbCwgcHJlc2VydmVXaGl0ZXNwYWNlcywgc3RyaWN0SW5qZWN0aW9uUGFyYW1ldGVyc306IHtcbiAgICAgICAgZGVmYXVsdEVuY2Fwc3VsYXRpb24/OiBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICAgICAgdXNlSml0PzogYm9vbGVhbixcbiAgICAgICAgaml0RGV2TW9kZT86IGJvb2xlYW4sXG4gICAgICAgIG1pc3NpbmdUcmFuc2xhdGlvbj86IE1pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5LFxuICAgICAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzPzogYm9vbGVhbixcbiAgICAgICAgc3RyaWN0SW5qZWN0aW9uUGFyYW1ldGVycz86IGJvb2xlYW4sXG4gICAgICB9ID0ge30pIHtcbiAgICB0aGlzLmRlZmF1bHRFbmNhcHN1bGF0aW9uID0gZGVmYXVsdEVuY2Fwc3VsYXRpb247XG4gICAgdGhpcy51c2VKaXQgPSAhIXVzZUppdDtcbiAgICB0aGlzLmppdERldk1vZGUgPSAhIWppdERldk1vZGU7XG4gICAgdGhpcy5taXNzaW5nVHJhbnNsYXRpb24gPSBtaXNzaW5nVHJhbnNsYXRpb247XG4gICAgdGhpcy5wcmVzZXJ2ZVdoaXRlc3BhY2VzID0gcHJlc2VydmVXaGl0ZXNwYWNlc0RlZmF1bHQobm9VbmRlZmluZWQocHJlc2VydmVXaGl0ZXNwYWNlcykpO1xuICAgIHRoaXMuc3RyaWN0SW5qZWN0aW9uUGFyYW1ldGVycyA9IHN0cmljdEluamVjdGlvblBhcmFtZXRlcnMgPT09IHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZXNlcnZlV2hpdGVzcGFjZXNEZWZhdWx0KFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXNPcHRpb246IGJvb2xlYW4gfCBudWxsLCBkZWZhdWx0U2V0dGluZyA9IGZhbHNlKTogYm9vbGVhbiB7XG4gIHJldHVybiBwcmVzZXJ2ZVdoaXRlc3BhY2VzT3B0aW9uID09PSBudWxsID8gZGVmYXVsdFNldHRpbmcgOiBwcmVzZXJ2ZVdoaXRlc3BhY2VzT3B0aW9uO1xufVxuIl19