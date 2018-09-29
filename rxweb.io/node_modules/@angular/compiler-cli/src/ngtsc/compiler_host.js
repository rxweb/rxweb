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
        define("@angular/compiler-cli/src/ngtsc/compiler_host", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implementation of `CompilerHost` which delegates to a native TypeScript host in most cases.
     */
    var NgtscCompilerHost = /** @class */ (function () {
        function NgtscCompilerHost(delegate) {
            this.delegate = delegate;
        }
        NgtscCompilerHost.prototype.getSourceFile = function (fileName, languageVersion, onError, shouldCreateNewSourceFile) {
            return this.delegate.getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile);
        };
        NgtscCompilerHost.prototype.getDefaultLibFileName = function (options) {
            return this.delegate.getDefaultLibFileName(options);
        };
        NgtscCompilerHost.prototype.writeFile = function (fileName, data, writeByteOrderMark, onError, sourceFiles) {
            return this.delegate.writeFile(fileName, data, writeByteOrderMark, onError, sourceFiles);
        };
        NgtscCompilerHost.prototype.getCurrentDirectory = function () { return this.delegate.getCurrentDirectory(); };
        NgtscCompilerHost.prototype.getDirectories = function (path) { return this.delegate.getDirectories(path); };
        NgtscCompilerHost.prototype.getCanonicalFileName = function (fileName) {
            return this.delegate.getCanonicalFileName(fileName);
        };
        NgtscCompilerHost.prototype.useCaseSensitiveFileNames = function () { return this.delegate.useCaseSensitiveFileNames(); };
        NgtscCompilerHost.prototype.getNewLine = function () { return this.delegate.getNewLine(); };
        NgtscCompilerHost.prototype.fileExists = function (fileName) { return this.delegate.fileExists(fileName); };
        NgtscCompilerHost.prototype.readFile = function (fileName) { return this.delegate.readFile(fileName); };
        NgtscCompilerHost.prototype.loadResource = function (file) { throw new Error('Method not implemented.'); };
        NgtscCompilerHost.prototype.preloadResource = function (file) { throw new Error('Method not implemented.'); };
        return NgtscCompilerHost;
    }());
    exports.NgtscCompilerHost = NgtscCompilerHost;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXJfaG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvY29tcGlsZXJfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQTBCSDs7T0FFRztJQUNIO1FBQ0UsMkJBQW9CLFFBQXlCO1lBQXpCLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBQUcsQ0FBQztRQUVqRCx5Q0FBYSxHQUFiLFVBQ0ksUUFBZ0IsRUFBRSxlQUFnQyxFQUNsRCxPQUErQyxFQUMvQyx5QkFBNkM7WUFDL0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FDOUIsUUFBUSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBRUQsaURBQXFCLEdBQXJCLFVBQXNCLE9BQTJCO1lBQy9DLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBRUQscUNBQVMsR0FBVCxVQUNJLFFBQWdCLEVBQUUsSUFBWSxFQUFFLGtCQUEyQixFQUMzRCxPQUE4QyxFQUM5QyxXQUF5QztZQUMzQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzNGLENBQUM7UUFFRCwrQ0FBbUIsR0FBbkIsY0FBZ0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTdFLDBDQUFjLEdBQWQsVUFBZSxJQUFZLElBQWMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckYsZ0RBQW9CLEdBQXBCLFVBQXFCLFFBQWdCO1lBQ25DLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBRUQscURBQXlCLEdBQXpCLGNBQXVDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUxRixzQ0FBVSxHQUFWLGNBQXVCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFM0Qsc0NBQVUsR0FBVixVQUFXLFFBQWdCLElBQWEsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEYsb0NBQVEsR0FBUixVQUFTLFFBQWdCLElBQXNCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpGLHdDQUFZLEdBQVosVUFBYSxJQUFZLElBQXNCLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUYsMkNBQWUsR0FBZixVQUFnQixJQUFZLElBQW1CLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUYsd0JBQUM7SUFBRCxDQUFDLEFBekNELElBeUNDO0lBekNZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbi8qKlxuICogVGhlIFR5cGVTY3JpcHQgY29tcGlsZXIgaG9zdCB1c2VkIGJ5IGBuZ3RzY2AuXG4gKlxuICogSXQncyBtb3N0bHkgaWRlbnRpY2FsIHRvIHRoZSBuYXRpdmUgYENvbXBpbGVySG9zdGAsIGJ1dCBhbHNvIGluY2x1ZGVzIHRoZSBhYmlsaXR5IHRvXG4gKiBhc3luY2hyb25vdXNseSByZXNvbHZlIHJlc291cmNlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21waWxlckhvc3QgZXh0ZW5kcyB0cy5Db21waWxlckhvc3Qge1xuICAvKipcbiAgICogQmVnaW4gcHJvY2Vzc2luZyBhIHJlc291cmNlIGZpbGUuXG4gICAqXG4gICAqIFdoZW4gdGhlIHJldHVybmVkIFByb21pc2UgcmVzb2x2ZXMsIGBsb2FkUmVzb3VyY2VgIHNob3VsZCBiZSBhYmxlIHRvIHN5bmNocm9ub3VzbHkgcHJvZHVjZSBhXG4gICAqIGBzdHJpbmdgIGZvciB0aGUgZ2l2ZW4gZmlsZS5cbiAgICovXG4gIHByZWxvYWRSZXNvdXJjZShmaWxlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBMaWtlIGByZWFkRmlsZWAsIGJ1dCByZWFkcyB0aGUgY29udGVudHMgb2YgYSByZXNvdXJjZSBmaWxlIHdoaWNoIG1heSBoYXZlIGJlZW4gcHJlLXByb2Nlc3NlZFxuICAgKiBieSBgcHJlbG9hZFJlc291cmNlYC5cbiAgICovXG4gIGxvYWRSZXNvdXJjZShmaWxlOiBzdHJpbmcpOiBzdHJpbmd8dW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIGBDb21waWxlckhvc3RgIHdoaWNoIGRlbGVnYXRlcyB0byBhIG5hdGl2ZSBUeXBlU2NyaXB0IGhvc3QgaW4gbW9zdCBjYXNlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIE5ndHNjQ29tcGlsZXJIb3N0IGltcGxlbWVudHMgQ29tcGlsZXJIb3N0IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWxlZ2F0ZTogdHMuQ29tcGlsZXJIb3N0KSB7fVxuXG4gIGdldFNvdXJjZUZpbGUoXG4gICAgICBmaWxlTmFtZTogc3RyaW5nLCBsYW5ndWFnZVZlcnNpb246IHRzLlNjcmlwdFRhcmdldCxcbiAgICAgIG9uRXJyb3I/OiAoKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCl8dW5kZWZpbmVkLFxuICAgICAgc2hvdWxkQ3JlYXRlTmV3U291cmNlRmlsZT86IGJvb2xlYW58dW5kZWZpbmVkKTogdHMuU291cmNlRmlsZXx1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmdldFNvdXJjZUZpbGUoXG4gICAgICAgIGZpbGVOYW1lLCBsYW5ndWFnZVZlcnNpb24sIG9uRXJyb3IsIHNob3VsZENyZWF0ZU5ld1NvdXJjZUZpbGUpO1xuICB9XG5cbiAgZ2V0RGVmYXVsdExpYkZpbGVOYW1lKG9wdGlvbnM6IHRzLkNvbXBpbGVyT3B0aW9ucyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuZ2V0RGVmYXVsdExpYkZpbGVOYW1lKG9wdGlvbnMpO1xuICB9XG5cbiAgd3JpdGVGaWxlKFxuICAgICAgZmlsZU5hbWU6IHN0cmluZywgZGF0YTogc3RyaW5nLCB3cml0ZUJ5dGVPcmRlck1hcms6IGJvb2xlYW4sXG4gICAgICBvbkVycm9yOiAoKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCl8dW5kZWZpbmVkLFxuICAgICAgc291cmNlRmlsZXM6IFJlYWRvbmx5QXJyYXk8dHMuU291cmNlRmlsZT4pOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS53cml0ZUZpbGUoZmlsZU5hbWUsIGRhdGEsIHdyaXRlQnl0ZU9yZGVyTWFyaywgb25FcnJvciwgc291cmNlRmlsZXMpO1xuICB9XG5cbiAgZ2V0Q3VycmVudERpcmVjdG9yeSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5nZXRDdXJyZW50RGlyZWN0b3J5KCk7IH1cblxuICBnZXREaXJlY3RvcmllcyhwYXRoOiBzdHJpbmcpOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLmRlbGVnYXRlLmdldERpcmVjdG9yaWVzKHBhdGgpOyB9XG5cbiAgZ2V0Q2Fub25pY2FsRmlsZU5hbWUoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuZ2V0Q2Fub25pY2FsRmlsZU5hbWUoZmlsZU5hbWUpO1xuICB9XG5cbiAgdXNlQ2FzZVNlbnNpdGl2ZUZpbGVOYW1lcygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuZGVsZWdhdGUudXNlQ2FzZVNlbnNpdGl2ZUZpbGVOYW1lcygpOyB9XG5cbiAgZ2V0TmV3TGluZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5nZXROZXdMaW5lKCk7IH1cblxuICBmaWxlRXhpc3RzKGZpbGVOYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuZGVsZWdhdGUuZmlsZUV4aXN0cyhmaWxlTmFtZSk7IH1cblxuICByZWFkRmlsZShmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nfHVuZGVmaW5lZCB7IHJldHVybiB0aGlzLmRlbGVnYXRlLnJlYWRGaWxlKGZpbGVOYW1lKTsgfVxuXG4gIGxvYWRSZXNvdXJjZShmaWxlOiBzdHJpbmcpOiBzdHJpbmd8dW5kZWZpbmVkIHsgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpOyB9XG5cbiAgcHJlbG9hZFJlc291cmNlKGZpbGU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4geyB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7IH1cbn1cbiJdfQ==