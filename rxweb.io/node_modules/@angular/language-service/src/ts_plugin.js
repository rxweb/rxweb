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
        define("@angular/language-service/src/ts_plugin", ["require", "exports", "tslib", "typescript", "@angular/language-service/src/language_service", "@angular/language-service/src/typescript_host"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var ts = require("typescript");
    var language_service_1 = require("@angular/language-service/src/language_service");
    var typescript_host_1 = require("@angular/language-service/src/typescript_host");
    var projectHostMap = new WeakMap();
    function getExternalFiles(project) {
        var host = projectHostMap.get(project);
        if (host) {
            return host.getTemplateReferences();
        }
    }
    exports.getExternalFiles = getExternalFiles;
    function create(info /* ts.server.PluginCreateInfo */) {
        // Create the proxy
        var proxy = Object.create(null);
        var oldLS = info.languageService;
        function tryCall(fileName, callback) {
            if (fileName && !oldLS.getProgram().getSourceFile(fileName)) {
                return undefined;
            }
            try {
                return callback();
            }
            catch (e) {
                return undefined;
            }
        }
        function tryFilenameCall(m) {
            return function (fileName) { return tryCall(fileName, function () { return (m.call(ls, fileName)); }); };
        }
        function tryFilenameOneCall(m) {
            return function (fileName, p) { return tryCall(fileName, function () { return (m.call(ls, fileName, p)); }); };
        }
        function tryFilenameTwoCall(m) {
            return function (fileName, p1, p2) { return tryCall(fileName, function () { return (m.call(ls, fileName, p1, p2)); }); };
        }
        function tryFilenameThreeCall(m) {
            return function (fileName, p1, p2, p3) { return tryCall(fileName, function () { return (m.call(ls, fileName, p1, p2, p3)); }); };
        }
        function tryFilenameFourCall(m) {
            return function (fileName, p1, p2, p3, p4) {
                return tryCall(fileName, function () { return (m.call(ls, fileName, p1, p2, p3, p4)); });
            };
        }
        function tryFilenameFiveCall(m) {
            return function (fileName, p1, p2, p3, p4, p5) {
                return tryCall(fileName, function () { return (m.call(ls, fileName, p1, p2, p3, p4, p5)); });
            };
        }
        function typescriptOnly(ls) {
            var languageService = {
                cleanupSemanticCache: function () { return ls.cleanupSemanticCache(); },
                getSyntacticDiagnostics: tryFilenameCall(ls.getSyntacticDiagnostics),
                getSemanticDiagnostics: tryFilenameCall(ls.getSemanticDiagnostics),
                getCompilerOptionsDiagnostics: function () { return ls.getCompilerOptionsDiagnostics(); },
                getSyntacticClassifications: tryFilenameOneCall(ls.getSemanticClassifications),
                getSemanticClassifications: tryFilenameOneCall(ls.getSemanticClassifications),
                getEncodedSyntacticClassifications: tryFilenameOneCall(ls.getEncodedSyntacticClassifications),
                getEncodedSemanticClassifications: tryFilenameOneCall(ls.getEncodedSemanticClassifications),
                getCompletionsAtPosition: tryFilenameTwoCall(ls.getCompletionsAtPosition),
                getCompletionEntryDetails: tryFilenameFiveCall(ls.getCompletionEntryDetails),
                getCompletionEntrySymbol: tryFilenameThreeCall(ls.getCompletionEntrySymbol),
                getQuickInfoAtPosition: tryFilenameOneCall(ls.getQuickInfoAtPosition),
                getNameOrDottedNameSpan: tryFilenameTwoCall(ls.getNameOrDottedNameSpan),
                getBreakpointStatementAtPosition: tryFilenameOneCall(ls.getBreakpointStatementAtPosition),
                getSignatureHelpItems: tryFilenameOneCall(ls.getSignatureHelpItems),
                getRenameInfo: tryFilenameOneCall(ls.getRenameInfo),
                findRenameLocations: tryFilenameThreeCall(ls.findRenameLocations),
                getDefinitionAtPosition: tryFilenameOneCall(ls.getDefinitionAtPosition),
                getTypeDefinitionAtPosition: tryFilenameOneCall(ls.getTypeDefinitionAtPosition),
                getImplementationAtPosition: tryFilenameOneCall(ls.getImplementationAtPosition),
                getReferencesAtPosition: tryFilenameOneCall(ls.getReferencesAtPosition),
                findReferences: tryFilenameOneCall(ls.findReferences),
                getDocumentHighlights: tryFilenameTwoCall(ls.getDocumentHighlights),
                /** @deprecated */
                getOccurrencesAtPosition: tryFilenameOneCall(ls.getOccurrencesAtPosition),
                getNavigateToItems: function (searchValue, maxResultCount, fileName, excludeDtsFiles) { return tryCall(fileName, function () { return ls.getNavigateToItems(searchValue, maxResultCount, fileName, excludeDtsFiles); }); },
                getNavigationBarItems: tryFilenameCall(ls.getNavigationBarItems),
                getNavigationTree: tryFilenameCall(ls.getNavigationTree),
                getOutliningSpans: tryFilenameCall(ls.getOutliningSpans),
                getTodoComments: tryFilenameOneCall(ls.getTodoComments),
                getBraceMatchingAtPosition: tryFilenameOneCall(ls.getBraceMatchingAtPosition),
                getIndentationAtPosition: tryFilenameTwoCall(ls.getIndentationAtPosition),
                getFormattingEditsForRange: tryFilenameThreeCall(ls.getFormattingEditsForRange),
                getFormattingEditsForDocument: tryFilenameOneCall(ls.getFormattingEditsForDocument),
                getFormattingEditsAfterKeystroke: tryFilenameThreeCall(ls.getFormattingEditsAfterKeystroke),
                getDocCommentTemplateAtPosition: tryFilenameOneCall(ls.getDocCommentTemplateAtPosition),
                isValidBraceCompletionAtPosition: tryFilenameTwoCall(ls.isValidBraceCompletionAtPosition),
                getSpanOfEnclosingComment: tryFilenameTwoCall(ls.getSpanOfEnclosingComment),
                getCodeFixesAtPosition: tryFilenameFiveCall(ls.getCodeFixesAtPosition),
                applyCodeActionCommand: (function (action) { return tryCall(undefined, function () { return ls.applyCodeActionCommand(action); }); }),
                getEmitOutput: tryFilenameCall(ls.getEmitOutput),
                getProgram: function () { return ls.getProgram(); },
                dispose: function () { return ls.dispose(); },
                getApplicableRefactors: tryFilenameTwoCall(ls.getApplicableRefactors),
                getEditsForRefactor: tryFilenameFiveCall(ls.getEditsForRefactor),
                getDefinitionAndBoundSpan: tryFilenameOneCall(ls.getDefinitionAndBoundSpan),
                getCombinedCodeFix: function (scope, fixId, formatOptions, preferences) {
                    return tryCall(undefined, function () { return ls.getCombinedCodeFix(scope, fixId, formatOptions, preferences); });
                },
                // TODO(kyliau): dummy implementation to compile with ts 2.8, create real one
                getSuggestionDiagnostics: function (fileName) { return []; },
                // TODO(kyliau): dummy implementation to compile with ts 2.8, create real one
                organizeImports: function (scope, formatOptions) { return []; },
                // TODO: dummy implementation to compile with ts 2.9, create a real one
                getEditsForFileRename: function (oldFilePath, newFilePath, formatOptions, preferences) { return []; }
            };
            return languageService;
        }
        oldLS = typescriptOnly(oldLS);
        var _loop_1 = function (k) {
            proxy[k] = function () { return oldLS[k].apply(oldLS, arguments); };
        };
        for (var k in oldLS) {
            _loop_1(k);
        }
        function completionToEntry(c) {
            return {
                // TODO: remove any and fix type error.
                kind: c.kind,
                name: c.name,
                sortText: c.sort,
                kindModifiers: ''
            };
        }
        function diagnosticChainToDiagnosticChain(chain) {
            return {
                messageText: chain.message,
                category: ts.DiagnosticCategory.Error,
                code: 0,
                next: chain.next ? diagnosticChainToDiagnosticChain(chain.next) : undefined
            };
        }
        function diagnosticMessageToDiagnosticMessageText(message) {
            if (typeof message === 'string') {
                return message;
            }
            return diagnosticChainToDiagnosticChain(message);
        }
        function diagnosticToDiagnostic(d, file) {
            var result = {
                file: file,
                start: d.span.start,
                length: d.span.end - d.span.start,
                messageText: diagnosticMessageToDiagnosticMessageText(d.message),
                category: ts.DiagnosticCategory.Error,
                code: 0,
                source: 'ng'
            };
            return result;
        }
        function tryOperation(attempting, callback) {
            try {
                return callback();
            }
            catch (e) {
                info.project.projectService.logger.info("Failed to " + attempting + ": " + e.toString());
                info.project.projectService.logger.info("Stack trace: " + e.stack);
                return null;
            }
        }
        var serviceHost = new typescript_host_1.TypeScriptServiceHost(info.languageServiceHost, info.languageService);
        var ls = language_service_1.createLanguageService(serviceHost);
        serviceHost.setSite(ls);
        projectHostMap.set(info.project, serviceHost);
        proxy.getCompletionsAtPosition = function (fileName, position, options) {
            var base = oldLS.getCompletionsAtPosition(fileName, position, options) || {
                isGlobalCompletion: false,
                isMemberCompletion: false,
                isNewIdentifierLocation: false,
                entries: []
            };
            tryOperation('get completions', function () {
                var e_1, _a;
                var results = ls.getCompletionsAt(fileName, position);
                if (results && results.length) {
                    if (base === undefined) {
                        base = {
                            isGlobalCompletion: false,
                            isMemberCompletion: false,
                            isNewIdentifierLocation: false,
                            entries: []
                        };
                    }
                    try {
                        for (var results_1 = tslib_1.__values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
                            var entry = results_1_1.value;
                            base.entries.push(completionToEntry(entry));
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            });
            return base;
        };
        proxy.getQuickInfoAtPosition = function (fileName, position) {
            var base = oldLS.getQuickInfoAtPosition(fileName, position);
            // TODO(vicb): the tags property has been removed in TS 2.2
            tryOperation('get quick info', function () {
                var e_2, _a;
                var ours = ls.getHoverAt(fileName, position);
                if (ours) {
                    var displayParts = [];
                    try {
                        for (var _b = tslib_1.__values(ours.text), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var part = _c.value;
                            displayParts.push({ kind: part.language || 'angular', text: part.text });
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    var tags = base && base.tags;
                    base = {
                        displayParts: displayParts,
                        documentation: [],
                        kind: 'angular',
                        kindModifiers: 'what does this do?',
                        textSpan: { start: ours.span.start, length: ours.span.end - ours.span.start },
                    };
                    if (tags) {
                        base.tags = tags;
                    }
                }
            });
            return base;
        };
        proxy.getSemanticDiagnostics = function (fileName) {
            var result = oldLS.getSemanticDiagnostics(fileName);
            var base = result || [];
            tryOperation('get diagnostics', function () {
                info.project.projectService.logger.info("Computing Angular semantic diagnostics...");
                var ours = ls.getDiagnostics(fileName);
                if (ours && ours.length) {
                    var file_1 = oldLS.getProgram().getSourceFile(fileName);
                    if (file_1) {
                        base.push.apply(base, ours.map(function (d) { return diagnosticToDiagnostic(d, file_1); }));
                    }
                }
            });
            return base;
        };
        proxy.getDefinitionAtPosition = function (fileName, position) {
            var base = oldLS.getDefinitionAtPosition(fileName, position);
            if (base && base.length) {
                return base;
            }
            return tryOperation('get definition', function () {
                var e_3, _a;
                var ours = ls.getDefinitionAt(fileName, position);
                if (ours && ours.length) {
                    base = base || [];
                    try {
                        for (var ours_1 = tslib_1.__values(ours), ours_1_1 = ours_1.next(); !ours_1_1.done; ours_1_1 = ours_1.next()) {
                            var loc = ours_1_1.value;
                            base.push({
                                fileName: loc.fileName,
                                textSpan: { start: loc.span.start, length: loc.span.end - loc.span.start },
                                name: '',
                                // TODO: remove any and fix type error.
                                kind: 'definition',
                                containerName: loc.fileName,
                                containerKind: 'file',
                            });
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (ours_1_1 && !ours_1_1.done && (_a = ours_1.return)) _a.call(ours_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
                return base;
            }) || [];
        };
        return proxy;
    }
    exports.create = create;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNfcGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbGFuZ3VhZ2Utc2VydmljZS9zcmMvdHNfcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7OztJQUVILCtCQUFpQztJQUVqQyxtRkFBeUQ7SUFFekQsaUZBQXdEO0lBRXhELElBQU0sY0FBYyxHQUFHLElBQUksT0FBTyxFQUE4QixDQUFDO0lBRWpFLDBCQUFpQyxPQUFZO1FBQzNDLElBQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLEVBQUU7WUFDUixPQUFPLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUxELDRDQUtDO0lBRUQsZ0JBQXVCLElBQVMsQ0FBQyxnQ0FBZ0M7UUFDL0QsbUJBQW1CO1FBQ25CLElBQU0sS0FBSyxHQUF1QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELElBQUksS0FBSyxHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDO1FBRXJELGlCQUFvQixRQUE0QixFQUFFLFFBQWlCO1lBQ2pFLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDM0QsT0FBTyxTQUFxQixDQUFDO2FBQzlCO1lBQ0QsSUFBSTtnQkFDRixPQUFPLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxTQUFxQixDQUFDO2FBQzlCO1FBQ0gsQ0FBQztRQUVELHlCQUE0QixDQUEwQjtZQUNwRCxPQUFPLFVBQUEsUUFBUSxJQUFJLE9BQUEsT0FBTyxDQUFDLFFBQVEsRUFBRSxjQUFNLE9BQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUs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SSxDQUFDLEtBQUssRUFBQztnQ0FDeEUsSUFBSSxFQUFFLEVBQUU7Z0NBQ1IsdUNBQXVDO2dDQUN2QyxJQUFJLEVBQUUsWUFBbUI7Z0NBQ3pCLGFBQWEsRUFBRSxHQUFHLENBQUMsUUFBUTtnQ0FDM0IsYUFBYSxFQUFFLE1BQWE7NkJBQzdCLENBQUMsQ0FBQzt5QkFDSjs7Ozs7Ozs7O2lCQUNGO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xCLENBQUMsQ0FBQztRQUVGLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQXhSRCx3QkF3UkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge2NyZWF0ZUxhbmd1YWdlU2VydmljZX0gZnJvbSAnLi9sYW5ndWFnZV9zZXJ2aWNlJztcbmltcG9ydCB7Q29tcGxldGlvbiwgRGlhZ25vc3RpYywgRGlhZ25vc3RpY01lc3NhZ2VDaGFpbiwgTGFuZ3VhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2VIb3N0fSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7VHlwZVNjcmlwdFNlcnZpY2VIb3N0fSBmcm9tICcuL3R5cGVzY3JpcHRfaG9zdCc7XG5cbmNvbnN0IHByb2plY3RIb3N0TWFwID0gbmV3IFdlYWtNYXA8YW55LCBUeXBlU2NyaXB0U2VydmljZUhvc3Q+KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFeHRlcm5hbEZpbGVzKHByb2plY3Q6IGFueSk6IHN0cmluZ1tdfHVuZGVmaW5lZCB7XG4gIGNvbnN0IGhvc3QgPSBwcm9qZWN0SG9zdE1hcC5nZXQocHJvamVjdCk7XG4gIGlmIChob3N0KSB7XG4gICAgcmV0dXJuIGhvc3QuZ2V0VGVtcGxhdGVSZWZlcmVuY2VzKCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShpbmZvOiBhbnkgLyogdHMuc2VydmVyLlBsdWdpbkNyZWF0ZUluZm8gKi8pOiB0cy5MYW5ndWFnZVNlcnZpY2Uge1xuICAvLyBDcmVhdGUgdGhlIHByb3h5XG4gIGNvbnN0IHByb3h5OiB0cy5MYW5ndWFnZVNlcnZpY2UgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBsZXQgb2xkTFM6IHRzLkxhbmd1YWdlU2VydmljZSA9IGluZm8ubGFuZ3VhZ2VTZXJ2aWNlO1xuXG4gIGZ1bmN0aW9uIHRyeUNhbGw8VD4oZmlsZU5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCwgY2FsbGJhY2s6ICgpID0+IFQpOiBUIHtcbiAgICBpZiAoZmlsZU5hbWUgJiYgIW9sZExTLmdldFByb2dyYW0oKS5nZXRTb3VyY2VGaWxlKGZpbGVOYW1lKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZCBhcyBhbnkgYXMgVDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQgYXMgYW55IGFzIFQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdHJ5RmlsZW5hbWVDYWxsPFQ+KG06IChmaWxlTmFtZTogc3RyaW5nKSA9PiBUKTogKGZpbGVOYW1lOiBzdHJpbmcpID0+IFQge1xuICAgIHJldHVybiBmaWxlTmFtZSA9PiB0cnlDYWxsKGZpbGVOYW1lLCAoKSA9PiA8VD4obS5jYWxsKGxzLCBmaWxlTmFtZSkpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyeUZpbGVuYW1lT25lQ2FsbDxULCBQPihtOiAoZmlsZU5hbWU6IHN0cmluZywgcDogUCkgPT4gVCk6IChmaWxlbmFtZTogc3RyaW5nLCBwOiBQKSA9PlxuICAgICAgVCB7XG4gICAgcmV0dXJuIChmaWxlTmFtZSwgcCkgPT4gdHJ5Q2FsbChmaWxlTmFtZSwgKCkgPT4gPFQ+KG0uY2FsbChscywgZmlsZU5hbWUsIHApKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cnlGaWxlbmFtZVR3b0NhbGw8VCwgUDEsIFAyPihtOiAoZmlsZU5hbWU6IHN0cmluZywgcDE6IFAxLCBwMjogUDIpID0+IFQpOiAoXG4gICAgICBmaWxlbmFtZTogc3RyaW5nLCBwMTogUDEsIHAyOiBQMikgPT4gVCB7XG4gICAgcmV0dXJuIChmaWxlTmFtZSwgcDEsIHAyKSA9PiB0cnlDYWxsKGZpbGVOYW1lLCAoKSA9PiA8VD4obS5jYWxsKGxzLCBmaWxlTmFtZSwgcDEsIHAyKSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJ5RmlsZW5hbWVUaHJlZUNhbGw8VCwgUDEsIFAyLCBQMz4obTogKGZpbGVOYW1lOiBzdHJpbmcsIHAxOiBQMSwgcDI6IFAyLCBwMzogUDMpID0+IFQpOlxuICAgICAgKGZpbGVuYW1lOiBzdHJpbmcsIHAxOiBQMSwgcDI6IFAyLCBwMzogUDMpID0+IFQge1xuICAgIHJldHVybiAoZmlsZU5hbWUsIHAxLCBwMiwgcDMpID0+IHRyeUNhbGwoZmlsZU5hbWUsICgpID0+IDxUPihtLmNhbGwobHMsIGZpbGVOYW1lLCBwMSwgcDIsIHAzKSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJ5RmlsZW5hbWVGb3VyQ2FsbDxULCBQMSwgUDIsIFAzLCBQND4oXG4gICAgICBtOiAoZmlsZU5hbWU6IHN0cmluZywgcDE6IFAxLCBwMjogUDIsIHAzOiBQMywgcDQ6IFA0KSA9PlxuICAgICAgICAgIFQpOiAoZmlsZU5hbWU6IHN0cmluZywgcDE6IFAxLCBwMjogUDIsIHAzOiBQMywgcDQ6IFA0KSA9PiBUIHtcbiAgICByZXR1cm4gKGZpbGVOYW1lLCBwMSwgcDIsIHAzLCBwNCkgPT5cbiAgICAgICAgICAgICAgIHRyeUNhbGwoZmlsZU5hbWUsICgpID0+IDxUPihtLmNhbGwobHMsIGZpbGVOYW1lLCBwMSwgcDIsIHAzLCBwNCkpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyeUZpbGVuYW1lRml2ZUNhbGw8VCwgUDEsIFAyLCBQMywgUDQsIFA1PihcbiAgICAgIG06IChmaWxlTmFtZTogc3RyaW5nLCBwMTogUDEsIHAyOiBQMiwgcDM6IFAzLCBwNDogUDQsIHA1OiBQNSkgPT5cbiAgICAgICAgICBUKTogKGZpbGVOYW1lOiBzdHJpbmcsIHAxOiBQMSwgcDI6IFAyLCBwMzogUDMsIHA0OiBQNCwgcDU6IFA1KSA9PiBUIHtcbiAgICByZXR1cm4gKGZpbGVOYW1lLCBwMSwgcDIsIHAzLCBwNCwgcDUpID0+XG4gICAgICAgICAgICAgICB0cnlDYWxsKGZpbGVOYW1lLCAoKSA9PiA8VD4obS5jYWxsKGxzLCBmaWxlTmFtZSwgcDEsIHAyLCBwMywgcDQsIHA1KSkpO1xuICB9XG5cblxuICBmdW5jdGlvbiB0eXBlc2NyaXB0T25seShsczogdHMuTGFuZ3VhZ2VTZXJ2aWNlKTogdHMuTGFuZ3VhZ2VTZXJ2aWNlIHtcbiAgICBjb25zdCBsYW5ndWFnZVNlcnZpY2U6IHRzLkxhbmd1YWdlU2VydmljZSA9IHtcbiAgICAgIGNsZWFudXBTZW1hbnRpY0NhY2hlOiAoKSA9PiBscy5jbGVhbnVwU2VtYW50aWNDYWNoZSgpLFxuICAgICAgZ2V0U3ludGFjdGljRGlhZ25vc3RpY3M6IHRyeUZpbGVuYW1lQ2FsbChscy5nZXRTeW50YWN0aWNEaWFnbm9zdGljcyksXG4gICAgICBnZXRTZW1hbnRpY0RpYWdub3N0aWNzOiB0cnlGaWxlbmFtZUNhbGwobHMuZ2V0U2VtYW50aWNEaWFnbm9zdGljcyksXG4gICAgICBnZXRDb21waWxlck9wdGlvbnNEaWFnbm9zdGljczogKCkgPT4gbHMuZ2V0Q29tcGlsZXJPcHRpb25zRGlhZ25vc3RpY3MoKSxcbiAgICAgIGdldFN5bnRhY3RpY0NsYXNzaWZpY2F0aW9uczogdHJ5RmlsZW5hbWVPbmVDYWxsKGxzLmdldFNlbWFudGljQ2xhc3NpZmljYXRpb25zKSxcbiAgICAgIGdldFNlbWFudGljQ2xhc3NpZmljYXRpb25zOiB0cnlGaWxlbmFtZU9uZUNhbGwobHMuZ2V0U2VtYW50aWNDbGFzc2lmaWNhdGlvbnMpLFxuICAgICAgZ2V0RW5jb2RlZFN5bnRhY3RpY0NsYXNzaWZpY2F0aW9uczogdHJ5RmlsZW5hbWVPbmVDYWxsKGxzLmdldEVuY29kZWRTeW50YWN0aWNDbGFzc2lmaWNhdGlvbnMpLFxuICAgICAgZ2V0RW5jb2RlZFNlbWFudGljQ2xhc3NpZmljYXRpb25zOiB0cnlGaWxlbmFtZU9uZUNhbGwobHMuZ2V0RW5jb2RlZFNlbWFudGljQ2xhc3NpZmljYXRpb25zKSxcbiAgICAgIGdldENvbXBsZXRpb25zQXRQb3NpdGlvbjogdHJ5RmlsZW5hbWVUd29DYWxsKGxzLmdldENvbXBsZXRpb25zQXRQb3NpdGlvbiksXG4gICAgICBnZXRDb21wbGV0aW9uRW50cnlEZXRhaWxzOiB0cnlGaWxlbmFtZUZpdmVDYWxsKGxzLmdldENvbXBsZXRpb25FbnRyeURldGFpbHMpLFxuICAgICAgZ2V0Q29tcGxldGlvbkVudHJ5U3ltYm9sOiB0cnlGaWxlbmFtZVRocmVlQ2FsbChscy5nZXRDb21wbGV0aW9uRW50cnlTeW1ib2wpLFxuICAgICAgZ2V0UXVpY2tJbmZvQXRQb3NpdGlvbjogdHJ5RmlsZW5hbWVPbmVDYWxsKGxzLmdldFF1aWNrSW5mb0F0UG9zaXRpb24pLFxuICAgICAgZ2V0TmFtZU9yRG90dGVkTmFtZVNwYW46IHRyeUZpbGVuYW1lVHdvQ2FsbChscy5nZXROYW1lT3JEb3R0ZWROYW1lU3BhbiksXG4gICAgICBnZXRCcmVha3BvaW50U3RhdGVtZW50QXRQb3NpdGlvbjogdHJ5RmlsZW5hbWVPbmVDYWxsKGxzLmdldEJyZWFrcG9pbnRTdGF0ZW1lbnRBdFBvc2l0aW9uKSxcbiAgICAgIGdldFNpZ25hdHVyZUhlbHBJdGVtczogdHJ5RmlsZW5hbWVPbmVDYWxsKGxzLmdldFNpZ25hdHVyZUhlbHBJdGVtcyksXG4gICAgICBnZXRSZW5hbWVJbmZvOiB0cnlGaWxlbmFtZU9uZUNhbGwobHMuZ2V0UmVuYW1lSW5mbyksXG4gICAgICBmaW5kUmVuYW1lTG9jYXRpb25zOiB0cnlGaWxlbmFtZVRocmVlQ2FsbChscy5maW5kUmVuYW1lTG9jYXRpb25zKSxcbiAgICAgIGdldERlZmluaXRpb25BdFBvc2l0aW9uOiB0cnlGaWxlbmFtZU9uZUNhbGwobHMuZ2V0RGVmaW5pdGlvbkF0UG9zaXRpb24pLFxuICAgICAgZ2V0VHlwZURlZmluaXRpb25BdFBvc2l0aW9uOiB0cnlGaWxlbmFtZU9uZUNhbGwobHMuZ2V0VHlwZURlZmluaXRpb25BdFBvc2l0aW9uKSxcbiAgICAgIGdldEltcGxlbWVudGF0aW9uQXRQb3NpdGlvbjogdHJ5RmlsZW5hbWVPbmVDYWxsKGxzLmdldEltcGxlbWVudGF0aW9uQXRQb3NpdGlvbiksXG4gICAgICBnZXRSZWZlcmVuY2VzQXRQb3NpdGlvbjogdHJ5RmlsZW5hbWVPbmVDYWxsKGxzLmdldFJlZmVyZW5jZXNBdFBvc2l0aW9uKSxcbiAgICAgIGZpbmRSZWZlcmVuY2VzOiB0cnlGaWxlbmFtZU9uZUNhbGwobHMuZmluZFJlZmVyZW5jZXMpLFxuICAgICAgZ2V0RG9jdW1lbnRIaWdobGlnaHRzOiB0cnlGaWxlbmFtZVR3b0NhbGwobHMuZ2V0RG9jdW1lbnRIaWdobGlnaHRzKSxcbiAgICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgICAgZ2V0T2NjdXJyZW5jZXNBdFBvc2l0aW9uOiB0cnlGaWxlbmFtZU9uZUNhbGwobHMuZ2V0T2NjdXJyZW5jZXNBdFBvc2l0aW9uKSxcbiAgICAgIGdldE5hdmlnYXRlVG9JdGVtczpcbiAgICAgICAgICAoc2VhcmNoVmFsdWUsIG1heFJlc3VsdENvdW50LCBmaWxlTmFtZSwgZXhjbHVkZUR0c0ZpbGVzKSA9PiB0cnlDYWxsKFxuICAgICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgICAgKCkgPT4gbHMuZ2V0TmF2aWdhdGVUb0l0ZW1zKHNlYXJjaFZhbHVlLCBtYXhSZXN1bHRDb3VudCwgZmlsZU5hbWUsIGV4Y2x1ZGVEdHNGaWxlcykpLFxuICAgICAgZ2V0TmF2aWdhdGlvbkJhckl0ZW1zOiB0cnlGaWxlbmFtZUNhbGwobHMuZ2V0TmF2aWdhdGlvbkJhckl0ZW1zKSxcbiAgICAgIGdldE5hdmlnYXRpb25UcmVlOiB0cnlGaWxlbmFtZUNhbGwobHMuZ2V0TmF2aWdhdGlvblRyZWUpLFxuICAgICAgZ2V0T3V0bGluaW5nU3BhbnM6IHRyeUZpbGVuYW1lQ2FsbChscy5nZXRPdXRsaW5pbmdTcGFucyksXG4gICAgICBnZXRUb2RvQ29tbWVudHM6IHRyeUZpbGVuYW1lT25lQ2FsbChscy5nZXRUb2RvQ29tbWVudHMpLFxuICAgICAgZ2V0QnJhY2VNYXRjaGluZ0F0UG9zaXRpb246IHRyeUZpbGVuYW1lT25lQ2FsbChscy5nZXRCcmFjZU1hdGNoaW5nQXRQb3NpdGlvbiksXG4gICAgICBnZXRJbmRlbnRhdGlvbkF0UG9zaXRpb246IHRyeUZpbGVuYW1lVHdvQ2FsbChscy5nZXRJbmRlbnRhdGlvbkF0UG9zaXRpb24pLFxuICAgICAgZ2V0Rm9ybWF0dGluZ0VkaXRzRm9yUmFuZ2U6IHRyeUZpbGVuYW1lVGhyZWVDYWxsKGxzLmdldEZvcm1hdHRpbmdFZGl0c0ZvclJhbmdlKSxcbiAgICAgIGdldEZvcm1hdHRpbmdFZGl0c0ZvckRvY3VtZW50OiB0cnlGaWxlbmFtZU9uZUNhbGwobHMuZ2V0Rm9ybWF0dGluZ0VkaXRzRm9yRG9jdW1lbnQpLFxuICAgICAgZ2V0Rm9ybWF0dGluZ0VkaXRzQWZ0ZXJLZXlzdHJva2U6IHRyeUZpbGVuYW1lVGhyZWVDYWxsKGxzLmdldEZvcm1hdHRpbmdFZGl0c0FmdGVyS2V5c3Ryb2tlKSxcbiAgICAgIGdldERvY0NvbW1lbnRUZW1wbGF0ZUF0UG9zaXRpb246IHRyeUZpbGVuYW1lT25lQ2FsbChscy5nZXREb2NDb21tZW50VGVtcGxhdGVBdFBvc2l0aW9uKSxcbiAgICAgIGlzVmFsaWRCcmFjZUNvbXBsZXRpb25BdFBvc2l0aW9uOiB0cnlGaWxlbmFtZVR3b0NhbGwobHMuaXNWYWxpZEJyYWNlQ29tcGxldGlvbkF0UG9zaXRpb24pLFxuICAgICAgZ2V0U3Bhbk9mRW5jbG9zaW5nQ29tbWVudDogdHJ5RmlsZW5hbWVUd29DYWxsKGxzLmdldFNwYW5PZkVuY2xvc2luZ0NvbW1lbnQpLFxuICAgICAgZ2V0Q29kZUZpeGVzQXRQb3NpdGlvbjogdHJ5RmlsZW5hbWVGaXZlQ2FsbChscy5nZXRDb2RlRml4ZXNBdFBvc2l0aW9uKSxcbiAgICAgIGFwcGx5Q29kZUFjdGlvbkNvbW1hbmQ6XG4gICAgICAgICAgPGFueT4oKGFjdGlvbjogYW55KSA9PiB0cnlDYWxsKHVuZGVmaW5lZCwgKCkgPT4gbHMuYXBwbHlDb2RlQWN0aW9uQ29tbWFuZChhY3Rpb24pKSksXG4gICAgICBnZXRFbWl0T3V0cHV0OiB0cnlGaWxlbmFtZUNhbGwobHMuZ2V0RW1pdE91dHB1dCksXG4gICAgICBnZXRQcm9ncmFtOiAoKSA9PiBscy5nZXRQcm9ncmFtKCksXG4gICAgICBkaXNwb3NlOiAoKSA9PiBscy5kaXNwb3NlKCksXG4gICAgICBnZXRBcHBsaWNhYmxlUmVmYWN0b3JzOiB0cnlGaWxlbmFtZVR3b0NhbGwobHMuZ2V0QXBwbGljYWJsZVJlZmFjdG9ycyksXG4gICAgICBnZXRFZGl0c0ZvclJlZmFjdG9yOiB0cnlGaWxlbmFtZUZpdmVDYWxsKGxzLmdldEVkaXRzRm9yUmVmYWN0b3IpLFxuICAgICAgZ2V0RGVmaW5pdGlvbkFuZEJvdW5kU3BhbjogdHJ5RmlsZW5hbWVPbmVDYWxsKGxzLmdldERlZmluaXRpb25BbmRCb3VuZFNwYW4pLFxuICAgICAgZ2V0Q29tYmluZWRDb2RlRml4OlxuICAgICAgICAgIChzY29wZTogdHMuQ29tYmluZWRDb2RlRml4U2NvcGUsIGZpeElkOiB7fSwgZm9ybWF0T3B0aW9uczogdHMuRm9ybWF0Q29kZVNldHRpbmdzLFxuICAgICAgICAgICBwcmVmZXJlbmNlczogdHMuVXNlclByZWZlcmVuY2VzKSA9PlxuICAgICAgICAgICAgICB0cnlDYWxsKFxuICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLCAoKSA9PiBscy5nZXRDb21iaW5lZENvZGVGaXgoc2NvcGUsIGZpeElkLCBmb3JtYXRPcHRpb25zLCBwcmVmZXJlbmNlcykpLFxuICAgICAgLy8gVE9ETyhreWxpYXUpOiBkdW1teSBpbXBsZW1lbnRhdGlvbiB0byBjb21waWxlIHdpdGggdHMgMi44LCBjcmVhdGUgcmVhbCBvbmVcbiAgICAgIGdldFN1Z2dlc3Rpb25EaWFnbm9zdGljczogKGZpbGVOYW1lOiBzdHJpbmcpID0+IFtdLFxuICAgICAgLy8gVE9ETyhreWxpYXUpOiBkdW1teSBpbXBsZW1lbnRhdGlvbiB0byBjb21waWxlIHdpdGggdHMgMi44LCBjcmVhdGUgcmVhbCBvbmVcbiAgICAgIG9yZ2FuaXplSW1wb3J0czogKHNjb3BlOiB0cy5Db21iaW5lZENvZGVGaXhTY29wZSwgZm9ybWF0T3B0aW9uczogdHMuRm9ybWF0Q29kZVNldHRpbmdzKSA9PiBbXSxcbiAgICAgIC8vIFRPRE86IGR1bW15IGltcGxlbWVudGF0aW9uIHRvIGNvbXBpbGUgd2l0aCB0cyAyLjksIGNyZWF0ZSBhIHJlYWwgb25lXG4gICAgICBnZXRFZGl0c0ZvckZpbGVSZW5hbWU6XG4gICAgICAgICAgKG9sZEZpbGVQYXRoOiBzdHJpbmcsIG5ld0ZpbGVQYXRoOiBzdHJpbmcsIGZvcm1hdE9wdGlvbnM6IHRzLkZvcm1hdENvZGVTZXR0aW5ncyxcbiAgICAgICAgICAgcHJlZmVyZW5jZXM6IHRzLlVzZXJQcmVmZXJlbmNlcyB8IHVuZGVmaW5lZCkgPT4gW11cbiAgICB9IGFzIHRzLkxhbmd1YWdlU2VydmljZTtcbiAgICByZXR1cm4gbGFuZ3VhZ2VTZXJ2aWNlO1xuICB9XG5cbiAgb2xkTFMgPSB0eXBlc2NyaXB0T25seShvbGRMUyk7XG5cbiAgZm9yIChjb25zdCBrIGluIG9sZExTKSB7XG4gICAgKDxhbnk+cHJveHkpW2tdID0gZnVuY3Rpb24oKSB7IHJldHVybiAob2xkTFMgYXMgYW55KVtrXS5hcHBseShvbGRMUywgYXJndW1lbnRzKTsgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBsZXRpb25Ub0VudHJ5KGM6IENvbXBsZXRpb24pOiB0cy5Db21wbGV0aW9uRW50cnkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBUT0RPOiByZW1vdmUgYW55IGFuZCBmaXggdHlwZSBlcnJvci5cbiAgICAgIGtpbmQ6IGMua2luZCBhcyBhbnksXG4gICAgICBuYW1lOiBjLm5hbWUsXG4gICAgICBzb3J0VGV4dDogYy5zb3J0LFxuICAgICAga2luZE1vZGlmaWVyczogJydcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZGlhZ25vc3RpY0NoYWluVG9EaWFnbm9zdGljQ2hhaW4oY2hhaW46IERpYWdub3N0aWNNZXNzYWdlQ2hhaW4pOlxuICAgICAgdHMuRGlhZ25vc3RpY01lc3NhZ2VDaGFpbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2VUZXh0OiBjaGFpbi5tZXNzYWdlLFxuICAgICAgY2F0ZWdvcnk6IHRzLkRpYWdub3N0aWNDYXRlZ29yeS5FcnJvcixcbiAgICAgIGNvZGU6IDAsXG4gICAgICBuZXh0OiBjaGFpbi5uZXh0ID8gZGlhZ25vc3RpY0NoYWluVG9EaWFnbm9zdGljQ2hhaW4oY2hhaW4ubmV4dCkgOiB1bmRlZmluZWRcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZGlhZ25vc3RpY01lc3NhZ2VUb0RpYWdub3N0aWNNZXNzYWdlVGV4dChtZXNzYWdlOiBzdHJpbmcgfCBEaWFnbm9zdGljTWVzc2FnZUNoYWluKTpcbiAgICAgIHN0cmluZ3x0cy5EaWFnbm9zdGljTWVzc2FnZUNoYWluIHtcbiAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIGRpYWdub3N0aWNDaGFpblRvRGlhZ25vc3RpY0NoYWluKG1lc3NhZ2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlhZ25vc3RpY1RvRGlhZ25vc3RpYyhkOiBEaWFnbm9zdGljLCBmaWxlOiB0cy5Tb3VyY2VGaWxlKTogdHMuRGlhZ25vc3RpYyB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgZmlsZSxcbiAgICAgIHN0YXJ0OiBkLnNwYW4uc3RhcnQsXG4gICAgICBsZW5ndGg6IGQuc3Bhbi5lbmQgLSBkLnNwYW4uc3RhcnQsXG4gICAgICBtZXNzYWdlVGV4dDogZGlhZ25vc3RpY01lc3NhZ2VUb0RpYWdub3N0aWNNZXNzYWdlVGV4dChkLm1lc3NhZ2UpLFxuICAgICAgY2F0ZWdvcnk6IHRzLkRpYWdub3N0aWNDYXRlZ29yeS5FcnJvcixcbiAgICAgIGNvZGU6IDAsXG4gICAgICBzb3VyY2U6ICduZydcbiAgICB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiB0cnlPcGVyYXRpb248VD4oYXR0ZW1wdGluZzogc3RyaW5nLCBjYWxsYmFjazogKCkgPT4gVCk6IFR8bnVsbCB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGluZm8ucHJvamVjdC5wcm9qZWN0U2VydmljZS5sb2dnZXIuaW5mbyhgRmFpbGVkIHRvICR7YXR0ZW1wdGluZ306ICR7ZS50b1N0cmluZygpfWApO1xuICAgICAgaW5mby5wcm9qZWN0LnByb2plY3RTZXJ2aWNlLmxvZ2dlci5pbmZvKGBTdGFjayB0cmFjZTogJHtlLnN0YWNrfWApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc2VydmljZUhvc3QgPSBuZXcgVHlwZVNjcmlwdFNlcnZpY2VIb3N0KGluZm8ubGFuZ3VhZ2VTZXJ2aWNlSG9zdCwgaW5mby5sYW5ndWFnZVNlcnZpY2UpO1xuICBjb25zdCBscyA9IGNyZWF0ZUxhbmd1YWdlU2VydmljZShzZXJ2aWNlSG9zdCBhcyBhbnkpO1xuICBzZXJ2aWNlSG9zdC5zZXRTaXRlKGxzKTtcbiAgcHJvamVjdEhvc3RNYXAuc2V0KGluZm8ucHJvamVjdCwgc2VydmljZUhvc3QpO1xuXG4gIHByb3h5LmdldENvbXBsZXRpb25zQXRQb3NpdGlvbiA9IGZ1bmN0aW9uKFxuICAgICAgZmlsZU5hbWU6IHN0cmluZywgcG9zaXRpb246IG51bWJlciwgb3B0aW9uczogdHMuR2V0Q29tcGxldGlvbnNBdFBvc2l0aW9uT3B0aW9uc3x1bmRlZmluZWQpIHtcbiAgICBsZXQgYmFzZSA9IG9sZExTLmdldENvbXBsZXRpb25zQXRQb3NpdGlvbihmaWxlTmFtZSwgcG9zaXRpb24sIG9wdGlvbnMpIHx8IHtcbiAgICAgIGlzR2xvYmFsQ29tcGxldGlvbjogZmFsc2UsXG4gICAgICBpc01lbWJlckNvbXBsZXRpb246IGZhbHNlLFxuICAgICAgaXNOZXdJZGVudGlmaWVyTG9jYXRpb246IGZhbHNlLFxuICAgICAgZW50cmllczogW11cbiAgICB9O1xuICAgIHRyeU9wZXJhdGlvbignZ2V0IGNvbXBsZXRpb25zJywgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0cyA9IGxzLmdldENvbXBsZXRpb25zQXQoZmlsZU5hbWUsIHBvc2l0aW9uKTtcbiAgICAgIGlmIChyZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgIGlmIChiYXNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBiYXNlID0ge1xuICAgICAgICAgICAgaXNHbG9iYWxDb21wbGV0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIGlzTWVtYmVyQ29tcGxldGlvbjogZmFsc2UsXG4gICAgICAgICAgICBpc05ld0lkZW50aWZpZXJMb2NhdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBlbnRyaWVzOiBbXVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiByZXN1bHRzKSB7XG4gICAgICAgICAgYmFzZS5lbnRyaWVzLnB1c2goY29tcGxldGlvblRvRW50cnkoZW50cnkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBiYXNlO1xuICB9O1xuXG4gIHByb3h5LmdldFF1aWNrSW5mb0F0UG9zaXRpb24gPSBmdW5jdGlvbihmaWxlTmFtZTogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyKTogdHMuUXVpY2tJbmZvIHtcbiAgICBsZXQgYmFzZSA9IG9sZExTLmdldFF1aWNrSW5mb0F0UG9zaXRpb24oZmlsZU5hbWUsIHBvc2l0aW9uKTtcbiAgICAvLyBUT0RPKHZpY2IpOiB0aGUgdGFncyBwcm9wZXJ0eSBoYXMgYmVlbiByZW1vdmVkIGluIFRTIDIuMlxuICAgIHRyeU9wZXJhdGlvbignZ2V0IHF1aWNrIGluZm8nLCAoKSA9PiB7XG4gICAgICBjb25zdCBvdXJzID0gbHMuZ2V0SG92ZXJBdChmaWxlTmFtZSwgcG9zaXRpb24pO1xuICAgICAgaWYgKG91cnMpIHtcbiAgICAgICAgY29uc3QgZGlzcGxheVBhcnRzOiB0cy5TeW1ib2xEaXNwbGF5UGFydFtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcGFydCBvZiBvdXJzLnRleHQpIHtcbiAgICAgICAgICBkaXNwbGF5UGFydHMucHVzaCh7a2luZDogcGFydC5sYW5ndWFnZSB8fCAnYW5ndWxhcicsIHRleHQ6IHBhcnQudGV4dH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhZ3MgPSBiYXNlICYmICg8YW55PmJhc2UpLnRhZ3M7XG4gICAgICAgIGJhc2UgPSA8YW55PntcbiAgICAgICAgICBkaXNwbGF5UGFydHMsXG4gICAgICAgICAgZG9jdW1lbnRhdGlvbjogW10sXG4gICAgICAgICAga2luZDogJ2FuZ3VsYXInLFxuICAgICAgICAgIGtpbmRNb2RpZmllcnM6ICd3aGF0IGRvZXMgdGhpcyBkbz8nLFxuICAgICAgICAgIHRleHRTcGFuOiB7c3RhcnQ6IG91cnMuc3Bhbi5zdGFydCwgbGVuZ3RoOiBvdXJzLnNwYW4uZW5kIC0gb3Vycy5zcGFuLnN0YXJ0fSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRhZ3MpIHtcbiAgICAgICAgICAoPGFueT5iYXNlKS50YWdzID0gdGFncztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJhc2U7XG4gIH07XG5cbiAgcHJveHkuZ2V0U2VtYW50aWNEaWFnbm9zdGljcyA9IGZ1bmN0aW9uKGZpbGVOYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzdWx0ID0gb2xkTFMuZ2V0U2VtYW50aWNEaWFnbm9zdGljcyhmaWxlTmFtZSk7XG4gICAgY29uc3QgYmFzZSA9IHJlc3VsdCB8fCBbXTtcbiAgICB0cnlPcGVyYXRpb24oJ2dldCBkaWFnbm9zdGljcycsICgpID0+IHtcbiAgICAgIGluZm8ucHJvamVjdC5wcm9qZWN0U2VydmljZS5sb2dnZXIuaW5mbyhgQ29tcHV0aW5nIEFuZ3VsYXIgc2VtYW50aWMgZGlhZ25vc3RpY3MuLi5gKTtcbiAgICAgIGNvbnN0IG91cnMgPSBscy5nZXREaWFnbm9zdGljcyhmaWxlTmFtZSk7XG4gICAgICBpZiAob3VycyAmJiBvdXJzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBmaWxlID0gb2xkTFMuZ2V0UHJvZ3JhbSgpLmdldFNvdXJjZUZpbGUoZmlsZU5hbWUpO1xuICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgIGJhc2UucHVzaC5hcHBseShiYXNlLCBvdXJzLm1hcChkID0+IGRpYWdub3N0aWNUb0RpYWdub3N0aWMoZCwgZmlsZSkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJhc2U7XG4gIH07XG5cbiAgcHJveHkuZ2V0RGVmaW5pdGlvbkF0UG9zaXRpb24gPSBmdW5jdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IHN0cmluZywgcG9zaXRpb246IG51bWJlcik6IHRzLkRlZmluaXRpb25JbmZvW10ge1xuICAgIGxldCBiYXNlID0gb2xkTFMuZ2V0RGVmaW5pdGlvbkF0UG9zaXRpb24oZmlsZU5hbWUsIHBvc2l0aW9uKTtcbiAgICBpZiAoYmFzZSAmJiBiYXNlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGJhc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyeU9wZXJhdGlvbignZ2V0IGRlZmluaXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICAgY29uc3Qgb3VycyA9IGxzLmdldERlZmluaXRpb25BdChmaWxlTmFtZSwgcG9zaXRpb24pO1xuICAgICAgICAgICAgIGlmIChvdXJzICYmIG91cnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICBiYXNlID0gYmFzZSB8fCBbXTtcbiAgICAgICAgICAgICAgIGZvciAoY29uc3QgbG9jIG9mIG91cnMpIHtcbiAgICAgICAgICAgICAgICAgYmFzZS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogbG9jLmZpbGVOYW1lLFxuICAgICAgICAgICAgICAgICAgIHRleHRTcGFuOiB7c3RhcnQ6IGxvYy5zcGFuLnN0YXJ0LCBsZW5ndGg6IGxvYy5zcGFuLmVuZCAtIGxvYy5zcGFuLnN0YXJ0fSxcbiAgICAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiByZW1vdmUgYW55IGFuZCBmaXggdHlwZSBlcnJvci5cbiAgICAgICAgICAgICAgICAgICBraW5kOiAnZGVmaW5pdGlvbicgYXMgYW55LFxuICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lck5hbWU6IGxvYy5maWxlTmFtZSxcbiAgICAgICAgICAgICAgICAgICBjb250YWluZXJLaW5kOiAnZmlsZScgYXMgYW55LFxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgcmV0dXJuIGJhc2U7XG4gICAgICAgICAgIH0pIHx8IFtdO1xuICB9O1xuXG4gIHJldHVybiBwcm94eTtcbn1cbiJdfQ==