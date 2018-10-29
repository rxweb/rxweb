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
        define("@angular/compiler/src/aot/static_symbol_resolver", ["require", "exports", "tslib", "@angular/compiler/src/util", "@angular/compiler/src/aot/static_symbol", "@angular/compiler/src/aot/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var util_1 = require("@angular/compiler/src/util");
    var static_symbol_1 = require("@angular/compiler/src/aot/static_symbol");
    var util_2 = require("@angular/compiler/src/aot/util");
    var TS = /^(?!.*\.d\.ts$).*\.ts$/;
    var ResolvedStaticSymbol = /** @class */ (function () {
        function ResolvedStaticSymbol(symbol, metadata) {
            this.symbol = symbol;
            this.metadata = metadata;
        }
        return ResolvedStaticSymbol;
    }());
    exports.ResolvedStaticSymbol = ResolvedStaticSymbol;
    var SUPPORTED_SCHEMA_VERSION = 4;
    /**
     * This class is responsible for loading metadata per symbol,
     * and normalizing references between symbols.
     *
     * Internally, it only uses symbols without members,
     * and deduces the values for symbols with members based
     * on these symbols.
     */
    var StaticSymbolResolver = /** @class */ (function () {
        function StaticSymbolResolver(host, staticSymbolCache, summaryResolver, errorRecorder) {
            this.host = host;
            this.staticSymbolCache = staticSymbolCache;
            this.summaryResolver = summaryResolver;
            this.errorRecorder = errorRecorder;
            this.metadataCache = new Map();
            // Note: this will only contain StaticSymbols without members!
            this.resolvedSymbols = new Map();
            this.resolvedFilePaths = new Set();
            // Note: this will only contain StaticSymbols without members!
            this.importAs = new Map();
            this.symbolResourcePaths = new Map();
            this.symbolFromFile = new Map();
            this.knownFileNameToModuleNames = new Map();
        }
        StaticSymbolResolver.prototype.resolveSymbol = function (staticSymbol) {
            if (staticSymbol.members.length > 0) {
                return this._resolveSymbolMembers(staticSymbol);
            }
            // Note: always ask for a summary first,
            // as we might have read shallow metadata via a .d.ts file
            // for the symbol.
            var resultFromSummary = this._resolveSymbolFromSummary(staticSymbol);
            if (resultFromSummary) {
                return resultFromSummary;
            }
            var resultFromCache = this.resolvedSymbols.get(staticSymbol);
            if (resultFromCache) {
                return resultFromCache;
            }
            // Note: Some users use libraries that were not compiled with ngc, i.e. they don't
            // have summaries, only .d.ts files. So we always need to check both, the summary
            // and metadata.
            this._createSymbolsOf(staticSymbol.filePath);
            return this.resolvedSymbols.get(staticSymbol);
        };
        /**
         * getImportAs produces a symbol that can be used to import the given symbol.
         * The import might be different than the symbol if the symbol is exported from
         * a library with a summary; in which case we want to import the symbol from the
         * ngfactory re-export instead of directly to avoid introducing a direct dependency
         * on an otherwise indirect dependency.
         *
         * @param staticSymbol the symbol for which to generate a import symbol
         */
        StaticSymbolResolver.prototype.getImportAs = function (staticSymbol, useSummaries) {
            if (useSummaries === void 0) { useSummaries = true; }
            if (staticSymbol.members.length) {
                var baseSymbol = this.getStaticSymbol(staticSymbol.filePath, staticSymbol.name);
                var baseImportAs = this.getImportAs(baseSymbol, useSummaries);
                return baseImportAs ?
                    this.getStaticSymbol(baseImportAs.filePath, baseImportAs.name, staticSymbol.members) :
                    null;
            }
            var summarizedFileName = util_2.stripSummaryForJitFileSuffix(staticSymbol.filePath);
            if (summarizedFileName !== staticSymbol.filePath) {
                var summarizedName = util_2.stripSummaryForJitNameSuffix(staticSymbol.name);
                var baseSymbol = this.getStaticSymbol(summarizedFileName, summarizedName, staticSymbol.members);
                var baseImportAs = this.getImportAs(baseSymbol, useSummaries);
                return baseImportAs ?
                    this.getStaticSymbol(util_2.summaryForJitFileName(baseImportAs.filePath), util_2.summaryForJitName(baseImportAs.name), baseSymbol.members) :
                    null;
            }
            var result = (useSummaries && this.summaryResolver.getImportAs(staticSymbol)) || null;
            if (!result) {
                result = this.importAs.get(staticSymbol);
            }
            return result;
        };
        /**
         * getResourcePath produces the path to the original location of the symbol and should
         * be used to determine the relative location of resource references recorded in
         * symbol metadata.
         */
        StaticSymbolResolver.prototype.getResourcePath = function (staticSymbol) {
            return this.symbolResourcePaths.get(staticSymbol) || staticSymbol.filePath;
        };
        /**
         * getTypeArity returns the number of generic type parameters the given symbol
         * has. If the symbol is not a type the result is null.
         */
        StaticSymbolResolver.prototype.getTypeArity = function (staticSymbol) {
            // If the file is a factory/ngsummary file, don't resolve the symbol as doing so would
            // cause the metadata for an factory/ngsummary file to be loaded which doesn't exist.
            // All references to generated classes must include the correct arity whenever
            // generating code.
            if (util_2.isGeneratedFile(staticSymbol.filePath)) {
                return null;
            }
            var resolvedSymbol = unwrapResolvedMetadata(this.resolveSymbol(staticSymbol));
            while (resolvedSymbol && resolvedSymbol.metadata instanceof static_symbol_1.StaticSymbol) {
                resolvedSymbol = unwrapResolvedMetadata(this.resolveSymbol(resolvedSymbol.metadata));
            }
            return (resolvedSymbol && resolvedSymbol.metadata && resolvedSymbol.metadata.arity) || null;
        };
        StaticSymbolResolver.prototype.getKnownModuleName = function (filePath) {
            return this.knownFileNameToModuleNames.get(filePath) || null;
        };
        StaticSymbolResolver.prototype.recordImportAs = function (sourceSymbol, targetSymbol) {
            sourceSymbol.assertNoMembers();
            targetSymbol.assertNoMembers();
            this.importAs.set(sourceSymbol, targetSymbol);
        };
        StaticSymbolResolver.prototype.recordModuleNameForFileName = function (fileName, moduleName) {
            this.knownFileNameToModuleNames.set(fileName, moduleName);
        };
        /**
         * Invalidate all information derived from the given file.
         *
         * @param fileName the file to invalidate
         */
        StaticSymbolResolver.prototype.invalidateFile = function (fileName) {
            var e_1, _a;
            this.metadataCache.delete(fileName);
            this.resolvedFilePaths.delete(fileName);
            var symbols = this.symbolFromFile.get(fileName);
            if (symbols) {
                this.symbolFromFile.delete(fileName);
                try {
                    for (var symbols_1 = tslib_1.__values(symbols), symbols_1_1 = symbols_1.next(); !symbols_1_1.done; symbols_1_1 = symbols_1.next()) {
                        var symbol = symbols_1_1.value;
                        this.resolvedSymbols.delete(symbol);
                        this.importAs.delete(symbol);
                        this.symbolResourcePaths.delete(symbol);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (symbols_1_1 && !symbols_1_1.done && (_a = symbols_1.return)) _a.call(symbols_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        /** @internal */
        StaticSymbolResolver.prototype.ignoreErrorsFor = function (cb) {
            var recorder = this.errorRecorder;
            this.errorRecorder = function () { };
            try {
                return cb();
            }
            finally {
                this.errorRecorder = recorder;
            }
        };
        StaticSymbolResolver.prototype._resolveSymbolMembers = function (staticSymbol) {
            var members = staticSymbol.members;
            var baseResolvedSymbol = this.resolveSymbol(this.getStaticSymbol(staticSymbol.filePath, staticSymbol.name));
            if (!baseResolvedSymbol) {
                return null;
            }
            var baseMetadata = unwrapResolvedMetadata(baseResolvedSymbol.metadata);
            if (baseMetadata instanceof static_symbol_1.StaticSymbol) {
                return new ResolvedStaticSymbol(staticSymbol, this.getStaticSymbol(baseMetadata.filePath, baseMetadata.name, members));
            }
            else if (baseMetadata && baseMetadata.__symbolic === 'class') {
                if (baseMetadata.statics && members.length === 1) {
                    return new ResolvedStaticSymbol(staticSymbol, baseMetadata.statics[members[0]]);
                }
            }
            else {
                var value = baseMetadata;
                for (var i = 0; i < members.length && value; i++) {
                    value = value[members[i]];
                }
                return new ResolvedStaticSymbol(staticSymbol, value);
            }
            return null;
        };
        StaticSymbolResolver.prototype._resolveSymbolFromSummary = function (staticSymbol) {
            var summary = this.summaryResolver.resolveSummary(staticSymbol);
            return summary ? new ResolvedStaticSymbol(staticSymbol, summary.metadata) : null;
        };
        /**
         * getStaticSymbol produces a Type whose metadata is known but whose implementation is not loaded.
         * All types passed to the StaticResolver should be pseudo-types returned by this method.
         *
         * @param declarationFile the absolute path of the file where the symbol is declared
         * @param name the name of the type.
         * @param members a symbol for a static member of the named type
         */
        StaticSymbolResolver.prototype.getStaticSymbol = function (declarationFile, name, members) {
            return this.staticSymbolCache.get(declarationFile, name, members);
        };
        /**
         * hasDecorators checks a file's metadata for the presence of decorators without evaluating the
         * metadata.
         *
         * @param filePath the absolute path to examine for decorators.
         * @returns true if any class in the file has a decorator.
         */
        StaticSymbolResolver.prototype.hasDecorators = function (filePath) {
            var metadata = this.getModuleMetadata(filePath);
            if (metadata['metadata']) {
                return Object.keys(metadata['metadata']).some(function (metadataKey) {
                    var entry = metadata['metadata'][metadataKey];
                    return entry && entry.__symbolic === 'class' && entry.decorators;
                });
            }
            return false;
        };
        StaticSymbolResolver.prototype.getSymbolsOf = function (filePath) {
            var summarySymbols = this.summaryResolver.getSymbolsOf(filePath);
            if (summarySymbols) {
                return summarySymbols;
            }
            // Note: Some users use libraries that were not compiled with ngc, i.e. they don't
            // have summaries, only .d.ts files, but `summaryResolver.isLibraryFile` returns true.
            this._createSymbolsOf(filePath);
            var metadataSymbols = [];
            this.resolvedSymbols.forEach(function (resolvedSymbol) {
                if (resolvedSymbol.symbol.filePath === filePath) {
                    metadataSymbols.push(resolvedSymbol.symbol);
                }
            });
            return metadataSymbols;
        };
        StaticSymbolResolver.prototype._createSymbolsOf = function (filePath) {
            var _this = this;
            var e_2, _a;
            if (this.resolvedFilePaths.has(filePath)) {
                return;
            }
            this.resolvedFilePaths.add(filePath);
            var resolvedSymbols = [];
            var metadata = this.getModuleMetadata(filePath);
            if (metadata['importAs']) {
                // Index bundle indices should use the importAs module name defined
                // in the bundle.
                this.knownFileNameToModuleNames.set(filePath, metadata['importAs']);
            }
            // handle the symbols in one of the re-export location
            if (metadata['exports']) {
                var _loop_1 = function (moduleExport) {
                    // handle the symbols in the list of explicitly re-exported symbols.
                    if (moduleExport.export) {
                        moduleExport.export.forEach(function (exportSymbol) {
                            var symbolName;
                            if (typeof exportSymbol === 'string') {
                                symbolName = exportSymbol;
                            }
                            else {
                                symbolName = exportSymbol.as;
                            }
                            symbolName = unescapeIdentifier(symbolName);
                            var symName = symbolName;
                            if (typeof exportSymbol !== 'string') {
                                symName = unescapeIdentifier(exportSymbol.name);
                            }
                            var resolvedModule = _this.resolveModule(moduleExport.from, filePath);
                            if (resolvedModule) {
                                var targetSymbol = _this.getStaticSymbol(resolvedModule, symName);
                                var sourceSymbol = _this.getStaticSymbol(filePath, symbolName);
                                resolvedSymbols.push(_this.createExport(sourceSymbol, targetSymbol));
                            }
                        });
                    }
                    else {
                        // handle the symbols via export * directives.
                        var resolvedModule = this_1.resolveModule(moduleExport.from, filePath);
                        if (resolvedModule) {
                            var nestedExports = this_1.getSymbolsOf(resolvedModule);
                            nestedExports.forEach(function (targetSymbol) {
                                var sourceSymbol = _this.getStaticSymbol(filePath, targetSymbol.name);
                                resolvedSymbols.push(_this.createExport(sourceSymbol, targetSymbol));
                            });
                        }
                    }
                };
                var this_1 = this;
                try {
                    for (var _b = tslib_1.__values(metadata['exports']), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var moduleExport = _c.value;
                        _loop_1(moduleExport);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            // handle the actual metadata. Has to be after the exports
            // as there might be collisions in the names, and we want the symbols
            // of the current module to win ofter reexports.
            if (metadata['metadata']) {
                // handle direct declarations of the symbol
                var topLevelSymbolNames_1 = new Set(Object.keys(metadata['metadata']).map(unescapeIdentifier));
                var origins_1 = metadata['origins'] || {};
                Object.keys(metadata['metadata']).forEach(function (metadataKey) {
                    var symbolMeta = metadata['metadata'][metadataKey];
                    var name = unescapeIdentifier(metadataKey);
                    var symbol = _this.getStaticSymbol(filePath, name);
                    var origin = origins_1.hasOwnProperty(metadataKey) && origins_1[metadataKey];
                    if (origin) {
                        // If the symbol is from a bundled index, use the declaration location of the
                        // symbol so relative references (such as './my.html') will be calculated
                        // correctly.
                        var originFilePath = _this.resolveModule(origin, filePath);
                        if (!originFilePath) {
                            _this.reportError(new Error("Couldn't resolve original symbol for " + origin + " from " + filePath));
                        }
                        else {
                            _this.symbolResourcePaths.set(symbol, originFilePath);
                        }
                    }
                    resolvedSymbols.push(_this.createResolvedSymbol(symbol, filePath, topLevelSymbolNames_1, symbolMeta));
                });
            }
            resolvedSymbols.forEach(function (resolvedSymbol) { return _this.resolvedSymbols.set(resolvedSymbol.symbol, resolvedSymbol); });
            this.symbolFromFile.set(filePath, resolvedSymbols.map(function (resolvedSymbol) { return resolvedSymbol.symbol; }));
        };
        StaticSymbolResolver.prototype.createResolvedSymbol = function (sourceSymbol, topLevelPath, topLevelSymbolNames, metadata) {
            var _this = this;
            // For classes that don't have Angular summaries / metadata,
            // we only keep their arity, but nothing else
            // (e.g. their constructor parameters).
            // We do this to prevent introducing deep imports
            // as we didn't generate .ngfactory.ts files with proper reexports.
            var isTsFile = TS.test(sourceSymbol.filePath);
            if (this.summaryResolver.isLibraryFile(sourceSymbol.filePath) && !isTsFile && metadata &&
                metadata['__symbolic'] === 'class') {
                var transformedMeta_1 = { __symbolic: 'class', arity: metadata.arity };
                return new ResolvedStaticSymbol(sourceSymbol, transformedMeta_1);
            }
            var _originalFileMemo;
            var getOriginalName = function () {
                if (!_originalFileMemo) {
                    // Guess what the original file name is from the reference. If it has a `.d.ts` extension
                    // replace it with `.ts`. If it already has `.ts` just leave it in place. If it doesn't have
                    // .ts or .d.ts, append `.ts'. Also, if it is in `node_modules`, trim the `node_module`
                    // location as it is not important to finding the file.
                    _originalFileMemo =
                        _this.host.getOutputName(topLevelPath.replace(/((\.ts)|(\.d\.ts)|)$/, '.ts')
                            .replace(/^.*node_modules[/\\]/, ''));
                }
                return _originalFileMemo;
            };
            var self = this;
            var ReferenceTransformer = /** @class */ (function (_super) {
                tslib_1.__extends(ReferenceTransformer, _super);
                function ReferenceTransformer() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ReferenceTransformer.prototype.visitStringMap = function (map, functionParams) {
                    var symbolic = map['__symbolic'];
                    if (symbolic === 'function') {
                        var oldLen = functionParams.length;
                        functionParams.push.apply(functionParams, tslib_1.__spread((map['parameters'] || [])));
                        var result = _super.prototype.visitStringMap.call(this, map, functionParams);
                        functionParams.length = oldLen;
                        return result;
                    }
                    else if (symbolic === 'reference') {
                        var module = map['module'];
                        var name_1 = map['name'] ? unescapeIdentifier(map['name']) : map['name'];
                        if (!name_1) {
                            return null;
                        }
                        var filePath = void 0;
                        if (module) {
                            filePath = self.resolveModule(module, sourceSymbol.filePath);
                            if (!filePath) {
                                return {
                                    __symbolic: 'error',
                                    message: "Could not resolve " + module + " relative to " + sourceSymbol.filePath + ".",
                                    line: map.line,
                                    character: map.character,
                                    fileName: getOriginalName()
                                };
                            }
                            return {
                                __symbolic: 'resolved',
                                symbol: self.getStaticSymbol(filePath, name_1),
                                line: map.line,
                                character: map.character,
                                fileName: getOriginalName()
                            };
                        }
                        else if (functionParams.indexOf(name_1) >= 0) {
                            // reference to a function parameter
                            return { __symbolic: 'reference', name: name_1 };
                        }
                        else {
                            if (topLevelSymbolNames.has(name_1)) {
                                return self.getStaticSymbol(topLevelPath, name_1);
                            }
                            // ambient value
                            null;
                        }
                    }
                    else if (symbolic === 'error') {
                        return tslib_1.__assign({}, map, { fileName: getOriginalName() });
                    }
                    else {
                        return _super.prototype.visitStringMap.call(this, map, functionParams);
                    }
                };
                return ReferenceTransformer;
            }(util_1.ValueTransformer));
            var transformedMeta = util_1.visitValue(metadata, new ReferenceTransformer(), []);
            var unwrappedTransformedMeta = unwrapResolvedMetadata(transformedMeta);
            if (unwrappedTransformedMeta instanceof static_symbol_1.StaticSymbol) {
                return this.createExport(sourceSymbol, unwrappedTransformedMeta);
            }
            return new ResolvedStaticSymbol(sourceSymbol, transformedMeta);
        };
        StaticSymbolResolver.prototype.createExport = function (sourceSymbol, targetSymbol) {
            sourceSymbol.assertNoMembers();
            targetSymbol.assertNoMembers();
            if (this.summaryResolver.isLibraryFile(sourceSymbol.filePath) &&
                this.summaryResolver.isLibraryFile(targetSymbol.filePath)) {
                // This case is for an ng library importing symbols from a plain ts library
                // transitively.
                // Note: We rely on the fact that we discover symbols in the direction
                // from source files to library files
                this.importAs.set(targetSymbol, this.getImportAs(sourceSymbol) || sourceSymbol);
            }
            return new ResolvedStaticSymbol(sourceSymbol, targetSymbol);
        };
        StaticSymbolResolver.prototype.reportError = function (error, context, path) {
            if (this.errorRecorder) {
                this.errorRecorder(error, (context && context.filePath) || path);
            }
            else {
                throw error;
            }
        };
        /**
         * @param module an absolute path to a module file.
         */
        StaticSymbolResolver.prototype.getModuleMetadata = function (module) {
            var moduleMetadata = this.metadataCache.get(module);
            if (!moduleMetadata) {
                var moduleMetadatas = this.host.getMetadataFor(module);
                if (moduleMetadatas) {
                    var maxVersion_1 = -1;
                    moduleMetadatas.forEach(function (md) {
                        if (md && md['version'] > maxVersion_1) {
                            maxVersion_1 = md['version'];
                            moduleMetadata = md;
                        }
                    });
                }
                if (!moduleMetadata) {
                    moduleMetadata =
                        { __symbolic: 'module', version: SUPPORTED_SCHEMA_VERSION, module: module, metadata: {} };
                }
                if (moduleMetadata['version'] != SUPPORTED_SCHEMA_VERSION) {
                    var errorMessage = moduleMetadata['version'] == 2 ?
                        "Unsupported metadata version " + moduleMetadata['version'] + " for module " + module + ". This module should be compiled with a newer version of ngc" :
                        "Metadata version mismatch for module " + module + ", found version " + moduleMetadata['version'] + ", expected " + SUPPORTED_SCHEMA_VERSION;
                    this.reportError(new Error(errorMessage));
                }
                this.metadataCache.set(module, moduleMetadata);
            }
            return moduleMetadata;
        };
        StaticSymbolResolver.prototype.getSymbolByModule = function (module, symbolName, containingFile) {
            var filePath = this.resolveModule(module, containingFile);
            if (!filePath) {
                this.reportError(new Error("Could not resolve module " + module + (containingFile ? ' relative to ' +
                    containingFile : '')));
                return this.getStaticSymbol("ERROR:" + module, symbolName);
            }
            return this.getStaticSymbol(filePath, symbolName);
        };
        StaticSymbolResolver.prototype.resolveModule = function (module, containingFile) {
            try {
                return this.host.moduleNameToFileName(module, containingFile);
            }
            catch (e) {
                console.error("Could not resolve module '" + module + "' relative to file " + containingFile);
                this.reportError(e, undefined, containingFile);
            }
            return null;
        };
        return StaticSymbolResolver;
    }());
    exports.StaticSymbolResolver = StaticSymbolResolver;
    // Remove extra underscore from escaped identifier.
    // See https://github.com/Microsoft/TypeScript/blob/master/src/compiler/utilities.ts
    function unescapeIdentifier(identifier) {
        return identifier.startsWith('___') ? identifier.substr(1) : identifier;
    }
    exports.unescapeIdentifier = unescapeIdentifier;
    function unwrapResolvedMetadata(metadata) {
        if (metadata && metadata.__symbolic === 'resolved') {
            return metadata.symbol;
        }
        return metadata;
    }
    exports.unwrapResolvedMetadata = unwrapResolvedMetadata;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3N5bWJvbF9yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9hb3Qvc3RhdGljX3N5bWJvbF9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFHSCxtREFBcUQ7SUFFckQseUVBQWdFO0lBQ2hFLHVEQUE2STtJQUU3SSxJQUFNLEVBQUUsR0FBRyx3QkFBd0IsQ0FBQztJQUVwQztRQUNFLDhCQUFtQixNQUFvQixFQUFTLFFBQWE7WUFBMUMsV0FBTSxHQUFOLE1BQU0sQ0FBYztZQUFTLGFBQVEsR0FBUixRQUFRLENBQUs7UUFBRyxDQUFDO1FBQ25FLDJCQUFDO0lBQUQsQ0FBQyxBQUZELElBRUM7SUFGWSxvREFBb0I7SUFtQ2pDLElBQU0sd0JBQXdCLEdBQUcsQ0FBQyxDQUFDO0lBRW5DOzs7Ozs7O09BT0c7SUFDSDtRQVdFLDhCQUNZLElBQThCLEVBQVUsaUJBQW9DLEVBQzVFLGVBQThDLEVBQzlDLGFBQXVEO1lBRnZELFNBQUksR0FBSixJQUFJLENBQTBCO1lBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtZQUM1RSxvQkFBZSxHQUFmLGVBQWUsQ0FBK0I7WUFDOUMsa0JBQWEsR0FBYixhQUFhLENBQTBDO1lBYjNELGtCQUFhLEdBQUcsSUFBSSxHQUFHLEVBQWdDLENBQUM7WUFDaEUsOERBQThEO1lBQ3RELG9CQUFlLEdBQUcsSUFBSSxHQUFHLEVBQXNDLENBQUM7WUFDaEUsc0JBQWlCLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztZQUM5Qyw4REFBOEQ7WUFDdEQsYUFBUSxHQUFHLElBQUksR0FBRyxFQUE4QixDQUFDO1lBQ2pELHdCQUFtQixHQUFHLElBQUksR0FBRyxFQUF3QixDQUFDO1lBQ3RELG1CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQTBCLENBQUM7WUFDbkQsK0JBQTBC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LiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtTdW1tYXJ5UmVzb2x2ZXJ9IGZyb20gJy4uL3N1bW1hcnlfcmVzb2x2ZXInO1xuaW1wb3J0IHtWYWx1ZVRyYW5zZm9ybWVyLCB2aXNpdFZhbHVlfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHtTdGF0aWNTeW1ib2wsIFN0YXRpY1N5bWJvbENhY2hlfSBmcm9tICcuL3N0YXRpY19zeW1ib2wnO1xuaW1wb3J0IHtpc0dlbmVyYXRlZEZpbGUsIHN0cmlwU3VtbWFyeUZvckppdEZpbGVTdWZmaXgsIHN0cmlwU3VtbWFyeUZvckppdE5hbWVTdWZmaXgsIHN1bW1hcnlGb3JKaXRGaWxlTmFtZSwgc3VtbWFyeUZvckppdE5hbWV9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IFRTID0gL14oPyEuKlxcLmRcXC50cyQpLipcXC50cyQvO1xuXG5leHBvcnQgY2xhc3MgUmVzb2x2ZWRTdGF0aWNTeW1ib2wge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3ltYm9sOiBTdGF0aWNTeW1ib2wsIHB1YmxpYyBtZXRhZGF0YTogYW55KSB7fVxufVxuXG4vKipcbiAqIFRoZSBob3N0IG9mIHRoZSBTeW1ib2xSZXNvbHZlckhvc3QgZGlzY29ubmVjdHMgdGhlIGltcGxlbWVudGF0aW9uIGZyb20gVHlwZVNjcmlwdCAvIG90aGVyXG4gKiBsYW5ndWFnZVxuICogc2VydmljZXMgYW5kIGZyb20gdW5kZXJseWluZyBmaWxlIHN5c3RlbXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGljU3ltYm9sUmVzb2x2ZXJIb3N0IHtcbiAgLyoqXG4gICAqIFJldHVybiBhIE1vZHVsZU1ldGFkYXRhIGZvciB0aGUgZ2l2ZW4gbW9kdWxlLlxuICAgKiBBbmd1bGFyIENMSSB3aWxsIHByb2R1Y2UgdGhpcyBtZXRhZGF0YSBmb3IgYSBtb2R1bGUgd2hlbmV2ZXIgYSAuZC50cyBmaWxlcyBpc1xuICAgKiBwcm9kdWNlZCBhbmQgdGhlIG1vZHVsZSBoYXMgZXhwb3J0ZWQgdmFyaWFibGVzIG9yIGNsYXNzZXMgd2l0aCBkZWNvcmF0b3JzLiBNb2R1bGUgbWV0YWRhdGEgY2FuXG4gICAqIGFsc28gYmUgcHJvZHVjZWQgZGlyZWN0bHkgZnJvbSBUeXBlU2NyaXB0IHNvdXJjZXMgYnkgdXNpbmcgTWV0YWRhdGFDb2xsZWN0b3IgaW4gdG9vbHMvbWV0YWRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSBtb2R1bGVQYXRoIGlzIGEgc3RyaW5nIGlkZW50aWZpZXIgZm9yIGEgbW9kdWxlIGFzIGFuIGFic29sdXRlIHBhdGguXG4gICAqIEByZXR1cm5zIHRoZSBtZXRhZGF0YSBmb3IgdGhlIGdpdmVuIG1vZHVsZS5cbiAgICovXG4gIGdldE1ldGFkYXRhRm9yKG1vZHVsZVBhdGg6IHN0cmluZyk6IHtba2V5OiBzdHJpbmddOiBhbnl9W118dW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIG1vZHVsZSBuYW1lIHRoYXQgaXMgdXNlZCBpbiBhbiBgaW1wb3J0YCB0byBhIGZpbGUgcGF0aC5cbiAgICogSS5lLlxuICAgKiBgcGF0aC90by9jb250YWluaW5nRmlsZS50c2AgY29udGFpbmluZyBgaW1wb3J0IHsuLi59IGZyb20gJ21vZHVsZS1uYW1lJ2AuXG4gICAqL1xuICBtb2R1bGVOYW1lVG9GaWxlTmFtZShtb2R1bGVOYW1lOiBzdHJpbmcsIGNvbnRhaW5pbmdGaWxlPzogc3RyaW5nKTogc3RyaW5nfG51bGw7XG5cbiAgLyoqXG4gICAqIEdldCBhIGZpbGUgc3VpdGFibGUgZm9yIGRpc3BsYXkgdG8gdGhlIHVzZXIgdGhhdCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIHByb2plY3QgZGlyZWN0b3J5XG4gICAqIG9yIHRoZSBjdXJyZW50IGRpcmVjdG9yeS5cbiAgICovXG4gIGdldE91dHB1dE5hbWUoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZztcbn1cblxuY29uc3QgU1VQUE9SVEVEX1NDSEVNQV9WRVJTSU9OID0gNDtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBsb2FkaW5nIG1ldGFkYXRhIHBlciBzeW1ib2wsXG4gKiBhbmQgbm9ybWFsaXppbmcgcmVmZXJlbmNlcyBiZXR3ZWVuIHN5bWJvbHMuXG4gKlxuICogSW50ZXJuYWxseSwgaXQgb25seSB1c2VzIHN5bWJvbHMgd2l0aG91dCBtZW1iZXJzLFxuICogYW5kIGRlZHVjZXMgdGhlIHZhbHVlcyBmb3Igc3ltYm9scyB3aXRoIG1lbWJlcnMgYmFzZWRcbiAqIG9uIHRoZXNlIHN5bWJvbHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0aWNTeW1ib2xSZXNvbHZlciB7XG4gIHByaXZhdGUgbWV0YWRhdGFDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCB7W2tleTogc3RyaW5nXTogYW55fT4oKTtcbiAgLy8gTm90ZTogdGhpcyB3aWxsIG9ubHkgY29udGFpbiBTdGF0aWNTeW1ib2xzIHdpdGhvdXQgbWVtYmVycyFcbiAgcHJpdmF0ZSByZXNvbHZlZFN5bWJvbHMgPSBuZXcgTWFwPFN0YXRpY1N5bWJvbCwgUmVzb2x2ZWRTdGF0aWNTeW1ib2w+KCk7XG4gIHByaXZhdGUgcmVzb2x2ZWRGaWxlUGF0aHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgLy8gTm90ZTogdGhpcyB3aWxsIG9ubHkgY29udGFpbiBTdGF0aWNTeW1ib2xzIHdpdGhvdXQgbWVtYmVycyFcbiAgcHJpdmF0ZSBpbXBvcnRBcyA9IG5ldyBNYXA8U3RhdGljU3ltYm9sLCBTdGF0aWNTeW1ib2w+KCk7XG4gIHByaXZhdGUgc3ltYm9sUmVzb3VyY2VQYXRocyA9IG5ldyBNYXA8U3RhdGljU3ltYm9sLCBzdHJpbmc+KCk7XG4gIHByaXZhdGUgc3ltYm9sRnJvbUZpbGUgPSBuZXcgTWFwPHN0cmluZywgU3RhdGljU3ltYm9sW10+KCk7XG4gIHByaXZhdGUga25vd25GaWxlTmFtZVRvTW9kdWxlTmFtZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBob3N0OiBTdGF0aWNTeW1ib2xSZXNvbHZlckhvc3QsIHByaXZhdGUgc3RhdGljU3ltYm9sQ2FjaGU6IFN0YXRpY1N5bWJvbENhY2hlLFxuICAgICAgcHJpdmF0ZSBzdW1tYXJ5UmVzb2x2ZXI6IFN1bW1hcnlSZXNvbHZlcjxTdGF0aWNTeW1ib2w+LFxuICAgICAgcHJpdmF0ZSBlcnJvclJlY29yZGVyPzogKGVycm9yOiBhbnksIGZpbGVOYW1lPzogc3RyaW5nKSA9PiB2b2lkKSB7fVxuXG4gIHJlc29sdmVTeW1ib2woc3RhdGljU3ltYm9sOiBTdGF0aWNTeW1ib2wpOiBSZXNvbHZlZFN0YXRpY1N5bWJvbCB7XG4gICAgaWYgKHN0YXRpY1N5bWJvbC5tZW1iZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXNvbHZlU3ltYm9sTWVtYmVycyhzdGF0aWNTeW1ib2wpICE7XG4gICAgfVxuICAgIC8vIE5vdGU6IGFsd2F5cyBhc2sgZm9yIGEgc3VtbWFyeSBmaXJzdCxcbiAgICAvLyBhcyB3ZSBtaWdodCBoYXZlIHJlYWQgc2hhbGxvdyBtZXRhZGF0YSB2aWEgYSAuZC50cyBmaWxlXG4gICAgLy8gZm9yIHRoZSBzeW1ib2wuXG4gICAgY29uc3QgcmVzdWx0RnJvbVN1bW1hcnkgPSB0aGlzLl9yZXNvbHZlU3ltYm9sRnJvbVN1bW1hcnkoc3RhdGljU3ltYm9sKSAhO1xuICAgIGlmIChyZXN1bHRGcm9tU3VtbWFyeSkge1xuICAgICAgcmV0dXJuIHJlc3VsdEZyb21TdW1tYXJ5O1xuICAgIH1cbiAgICBjb25zdCByZXN1bHRGcm9tQ2FjaGUgPSB0aGlzLnJlc29sdmVkU3ltYm9scy5nZXQoc3RhdGljU3ltYm9sKTtcbiAgICBpZiAocmVzdWx0RnJvbUNhY2hlKSB7XG4gICAgICByZXR1cm4gcmVzdWx0RnJvbUNhY2hlO1xuICAgIH1cbiAgICAvLyBOb3RlOiBTb21lIHVzZXJzIHVzZSBsaWJyYXJpZXMgdGhhdCB3ZXJlIG5vdCBjb21waWxlZCB3aXRoIG5nYywgaS5lLiB0aGV5IGRvbid0XG4gICAgLy8gaGF2ZSBzdW1tYXJpZXMsIG9ubHkgLmQudHMgZmlsZXMuIFNvIHdlIGFsd2F5cyBuZWVkIHRvIGNoZWNrIGJvdGgsIHRoZSBzdW1tYXJ5XG4gICAgLy8gYW5kIG1ldGFkYXRhLlxuICAgIHRoaXMuX2NyZWF0ZVN5bWJvbHNPZihzdGF0aWNTeW1ib2wuZmlsZVBhdGgpO1xuICAgIHJldHVybiB0aGlzLnJlc29sdmVkU3ltYm9scy5nZXQoc3RhdGljU3ltYm9sKSAhO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldEltcG9ydEFzIHByb2R1Y2VzIGEgc3ltYm9sIHRoYXQgY2FuIGJlIHVzZWQgdG8gaW1wb3J0IHRoZSBnaXZlbiBzeW1ib2wuXG4gICAqIFRoZSBpbXBvcnQgbWlnaHQgYmUgZGlmZmVyZW50IHRoYW4gdGhlIHN5bWJvbCBpZiB0aGUgc3ltYm9sIGlzIGV4cG9ydGVkIGZyb21cbiAgICogYSBsaWJyYXJ5IHdpdGggYSBzdW1tYXJ5OyBpbiB3aGljaCBjYXNlIHdlIHdhbnQgdG8gaW1wb3J0IHRoZSBzeW1ib2wgZnJvbSB0aGVcbiAgICogbmdmYWN0b3J5IHJlLWV4cG9ydCBpbnN0ZWFkIG9mIGRpcmVjdGx5IHRvIGF2b2lkIGludHJvZHVjaW5nIGEgZGlyZWN0IGRlcGVuZGVuY3lcbiAgICogb24gYW4gb3RoZXJ3aXNlIGluZGlyZWN0IGRlcGVuZGVuY3kuXG4gICAqXG4gICAqIEBwYXJhbSBzdGF0aWNTeW1ib2wgdGhlIHN5bWJvbCBmb3Igd2hpY2ggdG8gZ2VuZXJhdGUgYSBpbXBvcnQgc3ltYm9sXG4gICAqL1xuICBnZXRJbXBvcnRBcyhzdGF0aWNTeW1ib2w6IFN0YXRpY1N5bWJvbCwgdXNlU3VtbWFyaWVzOiBib29sZWFuID0gdHJ1ZSk6IFN0YXRpY1N5bWJvbHxudWxsIHtcbiAgICBpZiAoc3RhdGljU3ltYm9sLm1lbWJlcnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBiYXNlU3ltYm9sID0gdGhpcy5nZXRTdGF0aWNTeW1ib2woc3RhdGljU3ltYm9sLmZpbGVQYXRoLCBzdGF0aWNTeW1ib2wubmFtZSk7XG4gICAgICBjb25zdCBiYXNlSW1wb3J0QXMgPSB0aGlzLmdldEltcG9ydEFzKGJhc2VTeW1ib2wsIHVzZVN1bW1hcmllcyk7XG4gICAgICByZXR1cm4gYmFzZUltcG9ydEFzID9cbiAgICAgICAgICB0aGlzLmdldFN0YXRpY1N5bWJvbChiYXNlSW1wb3J0QXMuZmlsZVBhdGgsIGJhc2VJbXBvcnRBcy5uYW1lLCBzdGF0aWNTeW1ib2wubWVtYmVycykgOlxuICAgICAgICAgIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHN1bW1hcml6ZWRGaWxlTmFtZSA9IHN0cmlwU3VtbWFyeUZvckppdEZpbGVTdWZmaXgoc3RhdGljU3ltYm9sLmZpbGVQYXRoKTtcbiAgICBpZiAoc3VtbWFyaXplZEZpbGVOYW1lICE9PSBzdGF0aWNTeW1ib2wuZmlsZVBhdGgpIHtcbiAgICAgIGNvbnN0IHN1bW1hcml6ZWROYW1lID0gc3RyaXBTdW1tYXJ5Rm9ySml0TmFtZVN1ZmZpeChzdGF0aWNTeW1ib2wubmFtZSk7XG4gICAgICBjb25zdCBiYXNlU3ltYm9sID1cbiAgICAgICAgICB0aGlzLmdldFN0YXRpY1N5bWJvbChzdW1tYXJpemVkRmlsZU5hbWUsIHN1bW1hcml6ZWROYW1lLCBzdGF0aWNTeW1ib2wubWVtYmVycyk7XG4gICAgICBjb25zdCBiYXNlSW1wb3J0QXMgPSB0aGlzLmdldEltcG9ydEFzKGJhc2VTeW1ib2wsIHVzZVN1bW1hcmllcyk7XG4gICAgICByZXR1cm4gYmFzZUltcG9ydEFzID9cbiAgICAgICAgICB0aGlzLmdldFN0YXRpY1N5bWJvbChcbiAgICAgICAgICAgICAgc3VtbWFyeUZvckppdEZpbGVOYW1lKGJhc2VJbXBvcnRBcy5maWxlUGF0aCksIHN1bW1hcnlGb3JKaXROYW1lKGJhc2VJbXBvcnRBcy5uYW1lKSxcbiAgICAgICAgICAgICAgYmFzZVN5bWJvbC5tZW1iZXJzKSA6XG4gICAgICAgICAgbnVsbDtcbiAgICB9XG4gICAgbGV0IHJlc3VsdCA9ICh1c2VTdW1tYXJpZXMgJiYgdGhpcy5zdW1tYXJ5UmVzb2x2ZXIuZ2V0SW1wb3J0QXMoc3RhdGljU3ltYm9sKSkgfHwgbnVsbDtcbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5pbXBvcnRBcy5nZXQoc3RhdGljU3ltYm9sKSAhO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIGdldFJlc291cmNlUGF0aCBwcm9kdWNlcyB0aGUgcGF0aCB0byB0aGUgb3JpZ2luYWwgbG9jYXRpb24gb2YgdGhlIHN5bWJvbCBhbmQgc2hvdWxkXG4gICAqIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSByZWxhdGl2ZSBsb2NhdGlvbiBvZiByZXNvdXJjZSByZWZlcmVuY2VzIHJlY29yZGVkIGluXG4gICAqIHN5bWJvbCBtZXRhZGF0YS5cbiAgICovXG4gIGdldFJlc291cmNlUGF0aChzdGF0aWNTeW1ib2w6IFN0YXRpY1N5bWJvbCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3ltYm9sUmVzb3VyY2VQYXRocy5nZXQoc3RhdGljU3ltYm9sKSB8fCBzdGF0aWNTeW1ib2wuZmlsZVBhdGg7XG4gIH1cblxuICAvKipcbiAgICogZ2V0VHlwZUFyaXR5IHJldHVybnMgdGhlIG51bWJlciBvZiBnZW5lcmljIHR5cGUgcGFyYW1ldGVycyB0aGUgZ2l2ZW4gc3ltYm9sXG4gICAqIGhhcy4gSWYgdGhlIHN5bWJvbCBpcyBub3QgYSB0eXBlIHRoZSByZXN1bHQgaXMgbnVsbC5cbiAgICovXG4gIGdldFR5cGVBcml0eShzdGF0aWNTeW1ib2w6IFN0YXRpY1N5bWJvbCk6IG51bWJlcnxudWxsIHtcbiAgICAvLyBJZiB0aGUgZmlsZSBpcyBhIGZhY3RvcnkvbmdzdW1tYXJ5IGZpbGUsIGRvbid0IHJlc29sdmUgdGhlIHN5bWJvbCBhcyBkb2luZyBzbyB3b3VsZFxuICAgIC8vIGNhdXNlIHRoZSBtZXRhZGF0YSBmb3IgYW4gZmFjdG9yeS9uZ3N1bW1hcnkgZmlsZSB0byBiZSBsb2FkZWQgd2hpY2ggZG9lc24ndCBleGlzdC5cbiAgICAvLyBBbGwgcmVmZXJlbmNlcyB0byBnZW5lcmF0ZWQgY2xhc3NlcyBtdXN0IGluY2x1ZGUgdGhlIGNvcnJlY3QgYXJpdHkgd2hlbmV2ZXJcbiAgICAvLyBnZW5lcmF0aW5nIGNvZGUuXG4gICAgaWYgKGlzR2VuZXJhdGVkRmlsZShzdGF0aWNTeW1ib2wuZmlsZVBhdGgpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgbGV0IHJlc29sdmVkU3ltYm9sID0gdW53cmFwUmVzb2x2ZWRNZXRhZGF0YSh0aGlzLnJlc29sdmVTeW1ib2woc3RhdGljU3ltYm9sKSk7XG4gICAgd2hpbGUgKHJlc29sdmVkU3ltYm9sICYmIHJlc29sdmVkU3ltYm9sLm1ldGFkYXRhIGluc3RhbmNlb2YgU3RhdGljU3ltYm9sKSB7XG4gICAgICByZXNvbHZlZFN5bWJvbCA9IHVud3JhcFJlc29sdmVkTWV0YWRhdGEodGhpcy5yZXNvbHZlU3ltYm9sKHJlc29sdmVkU3ltYm9sLm1ldGFkYXRhKSk7XG4gICAgfVxuICAgIHJldHVybiAocmVzb2x2ZWRTeW1ib2wgJiYgcmVzb2x2ZWRTeW1ib2wubWV0YWRhdGEgJiYgcmVzb2x2ZWRTeW1ib2wubWV0YWRhdGEuYXJpdHkpIHx8IG51bGw7XG4gIH1cblxuICBnZXRLbm93bk1vZHVsZU5hbWUoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gdGhpcy5rbm93bkZpbGVOYW1lVG9Nb2R1bGVOYW1lcy5nZXQoZmlsZVBhdGgpIHx8IG51bGw7XG4gIH1cblxuICByZWNvcmRJbXBvcnRBcyhzb3VyY2VTeW1ib2w6IFN0YXRpY1N5bWJvbCwgdGFyZ2V0U3ltYm9sOiBTdGF0aWNTeW1ib2wpIHtcbiAgICBzb3VyY2VTeW1ib2wuYXNzZXJ0Tm9NZW1iZXJzKCk7XG4gICAgdGFyZ2V0U3ltYm9sLmFzc2VydE5vTWVtYmVycygpO1xuICAgIHRoaXMuaW1wb3J0QXMuc2V0KHNvdXJjZVN5bWJvbCwgdGFyZ2V0U3ltYm9sKTtcbiAgfVxuXG4gIHJlY29yZE1vZHVsZU5hbWVGb3JGaWxlTmFtZShmaWxlTmFtZTogc3RyaW5nLCBtb2R1bGVOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmtub3duRmlsZU5hbWVUb01vZHVsZU5hbWVzLnNldChmaWxlTmFtZSwgbW9kdWxlTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogSW52YWxpZGF0ZSBhbGwgaW5mb3JtYXRpb24gZGVyaXZlZCBmcm9tIHRoZSBnaXZlbiBmaWxlLlxuICAgKlxuICAgKiBAcGFyYW0gZmlsZU5hbWUgdGhlIGZpbGUgdG8gaW52YWxpZGF0ZVxuICAgKi9cbiAgaW52YWxpZGF0ZUZpbGUoZmlsZU5hbWU6IHN0cmluZykge1xuICAgIHRoaXMubWV0YWRhdGFDYWNoZS5kZWxldGUoZmlsZU5hbWUpO1xuICAgIHRoaXMucmVzb2x2ZWRGaWxlUGF0aHMuZGVsZXRlKGZpbGVOYW1lKTtcbiAgICBjb25zdCBzeW1ib2xzID0gdGhpcy5zeW1ib2xGcm9tRmlsZS5nZXQoZmlsZU5hbWUpO1xuICAgIGlmIChzeW1ib2xzKSB7XG4gICAgICB0aGlzLnN5bWJvbEZyb21GaWxlLmRlbGV0ZShmaWxlTmFtZSk7XG4gICAgICBmb3IgKGNvbnN0IHN5bWJvbCBvZiBzeW1ib2xzKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZWRTeW1ib2xzLmRlbGV0ZShzeW1ib2wpO1xuICAgICAgICB0aGlzLmltcG9ydEFzLmRlbGV0ZShzeW1ib2wpO1xuICAgICAgICB0aGlzLnN5bWJvbFJlc291cmNlUGF0aHMuZGVsZXRlKHN5bWJvbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBpZ25vcmVFcnJvcnNGb3I8VD4oY2I6ICgpID0+IFQpIHtcbiAgICBjb25zdCByZWNvcmRlciA9IHRoaXMuZXJyb3JSZWNvcmRlcjtcbiAgICB0aGlzLmVycm9yUmVjb3JkZXIgPSAoKSA9PiB7fTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGNiKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuZXJyb3JSZWNvcmRlciA9IHJlY29yZGVyO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Jlc29sdmVTeW1ib2xNZW1iZXJzKHN0YXRpY1N5bWJvbDogU3RhdGljU3ltYm9sKTogUmVzb2x2ZWRTdGF0aWNTeW1ib2x8bnVsbCB7XG4gICAgY29uc3QgbWVtYmVycyA9IHN0YXRpY1N5bWJvbC5tZW1iZXJzO1xuICAgIGNvbnN0IGJhc2VSZXNvbHZlZFN5bWJvbCA9XG4gICAgICAgIHRoaXMucmVzb2x2ZVN5bWJvbCh0aGlzLmdldFN0YXRpY1N5bWJvbChzdGF0aWNTeW1ib2wuZmlsZVBhdGgsIHN0YXRpY1N5bWJvbC5uYW1lKSk7XG4gICAgaWYgKCFiYXNlUmVzb2x2ZWRTeW1ib2wpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBsZXQgYmFzZU1ldGFkYXRhID0gdW53cmFwUmVzb2x2ZWRNZXRhZGF0YShiYXNlUmVzb2x2ZWRTeW1ib2wubWV0YWRhdGEpO1xuICAgIGlmIChiYXNlTWV0YWRhdGEgaW5zdGFuY2VvZiBTdGF0aWNTeW1ib2wpIHtcbiAgICAgIHJldHVybiBuZXcgUmVzb2x2ZWRTdGF0aWNTeW1ib2woXG4gICAgICAgICAgc3RhdGljU3ltYm9sLCB0aGlzLmdldFN0YXRpY1N5bWJvbChiYXNlTWV0YWRhdGEuZmlsZVBhdGgsIGJhc2VNZXRhZGF0YS5uYW1lLCBtZW1iZXJzKSk7XG4gICAgfSBlbHNlIGlmIChiYXNlTWV0YWRhdGEgJiYgYmFzZU1ldGFkYXRhLl9fc3ltYm9saWMgPT09ICdjbGFzcycpIHtcbiAgICAgIGlmIChiYXNlTWV0YWRhdGEuc3RhdGljcyAmJiBtZW1iZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gbmV3IFJlc29sdmVkU3RhdGljU3ltYm9sKHN0YXRpY1N5bWJvbCwgYmFzZU1ldGFkYXRhLnN0YXRpY3NbbWVtYmVyc1swXV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdmFsdWUgPSBiYXNlTWV0YWRhdGE7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbWJlcnMubGVuZ3RoICYmIHZhbHVlOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVttZW1iZXJzW2ldXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUmVzb2x2ZWRTdGF0aWNTeW1ib2woc3RhdGljU3ltYm9sLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzb2x2ZVN5bWJvbEZyb21TdW1tYXJ5KHN0YXRpY1N5bWJvbDogU3RhdGljU3ltYm9sKTogUmVzb2x2ZWRTdGF0aWNTeW1ib2x8bnVsbCB7XG4gICAgY29uc3Qgc3VtbWFyeSA9IHRoaXMuc3VtbWFyeVJlc29sdmVyLnJlc29sdmVTdW1tYXJ5KHN0YXRpY1N5bWJvbCk7XG4gICAgcmV0dXJuIHN1bW1hcnkgPyBuZXcgUmVzb2x2ZWRTdGF0aWNTeW1ib2woc3RhdGljU3ltYm9sLCBzdW1tYXJ5Lm1ldGFkYXRhKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogZ2V0U3RhdGljU3ltYm9sIHByb2R1Y2VzIGEgVHlwZSB3aG9zZSBtZXRhZGF0YSBpcyBrbm93biBidXQgd2hvc2UgaW1wbGVtZW50YXRpb24gaXMgbm90IGxvYWRlZC5cbiAgICogQWxsIHR5cGVzIHBhc3NlZCB0byB0aGUgU3RhdGljUmVzb2x2ZXIgc2hvdWxkIGJlIHBzZXVkby10eXBlcyByZXR1cm5lZCBieSB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIGRlY2xhcmF0aW9uRmlsZSB0aGUgYWJzb2x1dGUgcGF0aCBvZiB0aGUgZmlsZSB3aGVyZSB0aGUgc3ltYm9sIGlzIGRlY2xhcmVkXG4gICAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIG9mIHRoZSB0eXBlLlxuICAgKiBAcGFyYW0gbWVtYmVycyBhIHN5bWJvbCBmb3IgYSBzdGF0aWMgbWVtYmVyIG9mIHRoZSBuYW1lZCB0eXBlXG4gICAqL1xuICBnZXRTdGF0aWNTeW1ib2woZGVjbGFyYXRpb25GaWxlOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgbWVtYmVycz86IHN0cmluZ1tdKTogU3RhdGljU3ltYm9sIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0aWNTeW1ib2xDYWNoZS5nZXQoZGVjbGFyYXRpb25GaWxlLCBuYW1lLCBtZW1iZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYXNEZWNvcmF0b3JzIGNoZWNrcyBhIGZpbGUncyBtZXRhZGF0YSBmb3IgdGhlIHByZXNlbmNlIG9mIGRlY29yYXRvcnMgd2l0aG91dCBldmFsdWF0aW5nIHRoZVxuICAgKiBtZXRhZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIGZpbGVQYXRoIHRoZSBhYnNvbHV0ZSBwYXRoIHRvIGV4YW1pbmUgZm9yIGRlY29yYXRvcnMuXG4gICAqIEByZXR1cm5zIHRydWUgaWYgYW55IGNsYXNzIGluIHRoZSBmaWxlIGhhcyBhIGRlY29yYXRvci5cbiAgICovXG4gIGhhc0RlY29yYXRvcnMoZmlsZVBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5nZXRNb2R1bGVNZXRhZGF0YShmaWxlUGF0aCk7XG4gICAgaWYgKG1ldGFkYXRhWydtZXRhZGF0YSddKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMobWV0YWRhdGFbJ21ldGFkYXRhJ10pLnNvbWUoKG1ldGFkYXRhS2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IGVudHJ5ID0gbWV0YWRhdGFbJ21ldGFkYXRhJ11bbWV0YWRhdGFLZXldO1xuICAgICAgICByZXR1cm4gZW50cnkgJiYgZW50cnkuX19zeW1ib2xpYyA9PT0gJ2NsYXNzJyAmJiBlbnRyeS5kZWNvcmF0b3JzO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldFN5bWJvbHNPZihmaWxlUGF0aDogc3RyaW5nKTogU3RhdGljU3ltYm9sW10ge1xuICAgIGNvbnN0IHN1bW1hcnlTeW1ib2xzID0gdGhpcy5zdW1tYXJ5UmVzb2x2ZXIuZ2V0U3ltYm9sc09mKGZpbGVQYXRoKTtcbiAgICBpZiAoc3VtbWFyeVN5bWJvbHMpIHtcbiAgICAgIHJldHVybiBzdW1tYXJ5U3ltYm9scztcbiAgICB9XG4gICAgLy8gTm90ZTogU29tZSB1c2VycyB1c2UgbGlicmFyaWVzIHRoYXQgd2VyZSBub3QgY29tcGlsZWQgd2l0aCBuZ2MsIGkuZS4gdGhleSBkb24ndFxuICAgIC8vIGhhdmUgc3VtbWFyaWVzLCBvbmx5IC5kLnRzIGZpbGVzLCBidXQgYHN1bW1hcnlSZXNvbHZlci5pc0xpYnJhcnlGaWxlYCByZXR1cm5zIHRydWUuXG4gICAgdGhpcy5fY3JlYXRlU3ltYm9sc09mKGZpbGVQYXRoKTtcbiAgICBjb25zdCBtZXRhZGF0YVN5bWJvbHM6IFN0YXRpY1N5bWJvbFtdID0gW107XG4gICAgdGhpcy5yZXNvbHZlZFN5bWJvbHMuZm9yRWFjaCgocmVzb2x2ZWRTeW1ib2wpID0+IHtcbiAgICAgIGlmIChyZXNvbHZlZFN5bWJvbC5zeW1ib2wuZmlsZVBhdGggPT09IGZpbGVQYXRoKSB7XG4gICAgICAgIG1ldGFkYXRhU3ltYm9scy5wdXNoKHJlc29sdmVkU3ltYm9sLnN5bWJvbCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhU3ltYm9scztcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZVN5bWJvbHNPZihmaWxlUGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMucmVzb2x2ZWRGaWxlUGF0aHMuaGFzKGZpbGVQYXRoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlc29sdmVkRmlsZVBhdGhzLmFkZChmaWxlUGF0aCk7XG4gICAgY29uc3QgcmVzb2x2ZWRTeW1ib2xzOiBSZXNvbHZlZFN0YXRpY1N5bWJvbFtdID0gW107XG4gICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzLmdldE1vZHVsZU1ldGFkYXRhKGZpbGVQYXRoKTtcbiAgICBpZiAobWV0YWRhdGFbJ2ltcG9ydEFzJ10pIHtcbiAgICAgIC8vIEluZGV4IGJ1bmRsZSBpbmRpY2VzIHNob3VsZCB1c2UgdGhlIGltcG9ydEFzIG1vZHVsZSBuYW1lIGRlZmluZWRcbiAgICAgIC8vIGluIHRoZSBidW5kbGUuXG4gICAgICB0aGlzLmtub3duRmlsZU5hbWVUb01vZHVsZU5hbWVzLnNldChmaWxlUGF0aCwgbWV0YWRhdGFbJ2ltcG9ydEFzJ10pO1xuICAgIH1cbiAgICAvLyBoYW5kbGUgdGhlIHN5bWJvbHMgaW4gb25lIG9mIHRoZSByZS1leHBvcnQgbG9jYXRpb25cbiAgICBpZiAobWV0YWRhdGFbJ2V4cG9ydHMnXSkge1xuICAgICAgZm9yIChjb25zdCBtb2R1bGVFeHBvcnQgb2YgbWV0YWRhdGFbJ2V4cG9ydHMnXSkge1xuICAgICAgICAvLyBoYW5kbGUgdGhlIHN5bWJvbHMgaW4gdGhlIGxpc3Qgb2YgZXhwbGljaXRseSByZS1leHBvcnRlZCBzeW1ib2xzLlxuICAgICAgICBpZiAobW9kdWxlRXhwb3J0LmV4cG9ydCkge1xuICAgICAgICAgIG1vZHVsZUV4cG9ydC5leHBvcnQuZm9yRWFjaCgoZXhwb3J0U3ltYm9sOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBzeW1ib2xOYW1lOiBzdHJpbmc7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGV4cG9ydFN5bWJvbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgc3ltYm9sTmFtZSA9IGV4cG9ydFN5bWJvbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN5bWJvbE5hbWUgPSBleHBvcnRTeW1ib2wuYXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzeW1ib2xOYW1lID0gdW5lc2NhcGVJZGVudGlmaWVyKHN5bWJvbE5hbWUpO1xuICAgICAgICAgICAgbGV0IHN5bU5hbWUgPSBzeW1ib2xOYW1lO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBleHBvcnRTeW1ib2wgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHN5bU5hbWUgPSB1bmVzY2FwZUlkZW50aWZpZXIoZXhwb3J0U3ltYm9sLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRNb2R1bGUgPSB0aGlzLnJlc29sdmVNb2R1bGUobW9kdWxlRXhwb3J0LmZyb20sIGZpbGVQYXRoKTtcbiAgICAgICAgICAgIGlmIChyZXNvbHZlZE1vZHVsZSkge1xuICAgICAgICAgICAgICBjb25zdCB0YXJnZXRTeW1ib2wgPSB0aGlzLmdldFN0YXRpY1N5bWJvbChyZXNvbHZlZE1vZHVsZSwgc3ltTmFtZSk7XG4gICAgICAgICAgICAgIGNvbnN0IHNvdXJjZVN5bWJvbCA9IHRoaXMuZ2V0U3RhdGljU3ltYm9sKGZpbGVQYXRoLCBzeW1ib2xOYW1lKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZWRTeW1ib2xzLnB1c2godGhpcy5jcmVhdGVFeHBvcnQoc291cmNlU3ltYm9sLCB0YXJnZXRTeW1ib2wpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBoYW5kbGUgdGhlIHN5bWJvbHMgdmlhIGV4cG9ydCAqIGRpcmVjdGl2ZXMuXG4gICAgICAgICAgY29uc3QgcmVzb2x2ZWRNb2R1bGUgPSB0aGlzLnJlc29sdmVNb2R1bGUobW9kdWxlRXhwb3J0LmZyb20sIGZpbGVQYXRoKTtcbiAgICAgICAgICBpZiAocmVzb2x2ZWRNb2R1bGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5lc3RlZEV4cG9ydHMgPSB0aGlzLmdldFN5bWJvbHNPZihyZXNvbHZlZE1vZHVsZSk7XG4gICAgICAgICAgICBuZXN0ZWRFeHBvcnRzLmZvckVhY2goKHRhcmdldFN5bWJvbCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzb3VyY2VTeW1ib2wgPSB0aGlzLmdldFN0YXRpY1N5bWJvbChmaWxlUGF0aCwgdGFyZ2V0U3ltYm9sLm5hbWUpO1xuICAgICAgICAgICAgICByZXNvbHZlZFN5bWJvbHMucHVzaCh0aGlzLmNyZWF0ZUV4cG9ydChzb3VyY2VTeW1ib2wsIHRhcmdldFN5bWJvbCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIHRoZSBhY3R1YWwgbWV0YWRhdGEuIEhhcyB0byBiZSBhZnRlciB0aGUgZXhwb3J0c1xuICAgIC8vIGFzIHRoZXJlIG1pZ2h0IGJlIGNvbGxpc2lvbnMgaW4gdGhlIG5hbWVzLCBhbmQgd2Ugd2FudCB0aGUgc3ltYm9sc1xuICAgIC8vIG9mIHRoZSBjdXJyZW50IG1vZHVsZSB0byB3aW4gb2Z0ZXIgcmVleHBvcnRzLlxuICAgIGlmIChtZXRhZGF0YVsnbWV0YWRhdGEnXSkge1xuICAgICAgLy8gaGFuZGxlIGRpcmVjdCBkZWNsYXJhdGlvbnMgb2YgdGhlIHN5bWJvbFxuICAgICAgY29uc3QgdG9wTGV2ZWxTeW1ib2xOYW1lcyA9XG4gICAgICAgICAgbmV3IFNldDxzdHJpbmc+KE9iamVjdC5rZXlzKG1ldGFkYXRhWydtZXRhZGF0YSddKS5tYXAodW5lc2NhcGVJZGVudGlmaWVyKSk7XG4gICAgICBjb25zdCBvcmlnaW5zOiB7W2luZGV4OiBzdHJpbmddOiBzdHJpbmd9ID0gbWV0YWRhdGFbJ29yaWdpbnMnXSB8fCB7fTtcbiAgICAgIE9iamVjdC5rZXlzKG1ldGFkYXRhWydtZXRhZGF0YSddKS5mb3JFYWNoKChtZXRhZGF0YUtleSkgPT4ge1xuICAgICAgICBjb25zdCBzeW1ib2xNZXRhID0gbWV0YWRhdGFbJ21ldGFkYXRhJ11bbWV0YWRhdGFLZXldO1xuICAgICAgICBjb25zdCBuYW1lID0gdW5lc2NhcGVJZGVudGlmaWVyKG1ldGFkYXRhS2V5KTtcblxuICAgICAgICBjb25zdCBzeW1ib2wgPSB0aGlzLmdldFN0YXRpY1N5bWJvbChmaWxlUGF0aCwgbmFtZSk7XG5cbiAgICAgICAgY29uc3Qgb3JpZ2luID0gb3JpZ2lucy5oYXNPd25Qcm9wZXJ0eShtZXRhZGF0YUtleSkgJiYgb3JpZ2luc1ttZXRhZGF0YUtleV07XG4gICAgICAgIGlmIChvcmlnaW4pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgc3ltYm9sIGlzIGZyb20gYSBidW5kbGVkIGluZGV4LCB1c2UgdGhlIGRlY2xhcmF0aW9uIGxvY2F0aW9uIG9mIHRoZVxuICAgICAgICAgIC8vIHN5bWJvbCBzbyByZWxhdGl2ZSByZWZlcmVuY2VzIChzdWNoIGFzICcuL215Lmh0bWwnKSB3aWxsIGJlIGNhbGN1bGF0ZWRcbiAgICAgICAgICAvLyBjb3JyZWN0bHkuXG4gICAgICAgICAgY29uc3Qgb3JpZ2luRmlsZVBhdGggPSB0aGlzLnJlc29sdmVNb2R1bGUob3JpZ2luLCBmaWxlUGF0aCk7XG4gICAgICAgICAgaWYgKCFvcmlnaW5GaWxlUGF0aCkge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnRFcnJvcihcbiAgICAgICAgICAgICAgICBuZXcgRXJyb3IoYENvdWxkbid0IHJlc29sdmUgb3JpZ2luYWwgc3ltYm9sIGZvciAke29yaWdpbn0gZnJvbSAke2ZpbGVQYXRofWApKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zeW1ib2xSZXNvdXJjZVBhdGhzLnNldChzeW1ib2wsIG9yaWdpbkZpbGVQYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZWRTeW1ib2xzLnB1c2goXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVJlc29sdmVkU3ltYm9sKHN5bWJvbCwgZmlsZVBhdGgsIHRvcExldmVsU3ltYm9sTmFtZXMsIHN5bWJvbE1ldGEpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXNvbHZlZFN5bWJvbHMuZm9yRWFjaChcbiAgICAgICAgKHJlc29sdmVkU3ltYm9sKSA9PiB0aGlzLnJlc29sdmVkU3ltYm9scy5zZXQocmVzb2x2ZWRTeW1ib2wuc3ltYm9sLCByZXNvbHZlZFN5bWJvbCkpO1xuICAgIHRoaXMuc3ltYm9sRnJvbUZpbGUuc2V0KGZpbGVQYXRoLCByZXNvbHZlZFN5bWJvbHMubWFwKHJlc29sdmVkU3ltYm9sID0+IHJlc29sdmVkU3ltYm9sLnN5bWJvbCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVSZXNvbHZlZFN5bWJvbChcbiAgICAgIHNvdXJjZVN5bWJvbDogU3RhdGljU3ltYm9sLCB0b3BMZXZlbFBhdGg6IHN0cmluZywgdG9wTGV2ZWxTeW1ib2xOYW1lczogU2V0PHN0cmluZz4sXG4gICAgICBtZXRhZGF0YTogYW55KTogUmVzb2x2ZWRTdGF0aWNTeW1ib2wge1xuICAgIC8vIEZvciBjbGFzc2VzIHRoYXQgZG9uJ3QgaGF2ZSBBbmd1bGFyIHN1bW1hcmllcyAvIG1ldGFkYXRhLFxuICAgIC8vIHdlIG9ubHkga2VlcCB0aGVpciBhcml0eSwgYnV0IG5vdGhpbmcgZWxzZVxuICAgIC8vIChlLmcuIHRoZWlyIGNvbnN0cnVjdG9yIHBhcmFtZXRlcnMpLlxuICAgIC8vIFdlIGRvIHRoaXMgdG8gcHJldmVudCBpbnRyb2R1Y2luZyBkZWVwIGltcG9ydHNcbiAgICAvLyBhcyB3ZSBkaWRuJ3QgZ2VuZXJhdGUgLm5nZmFjdG9yeS50cyBmaWxlcyB3aXRoIHByb3BlciByZWV4cG9ydHMuXG4gICAgY29uc3QgaXNUc0ZpbGUgPSBUUy50ZXN0KHNvdXJjZVN5bWJvbC5maWxlUGF0aCk7XG4gICAgaWYgKHRoaXMuc3VtbWFyeVJlc29sdmVyLmlzTGlicmFyeUZpbGUoc291cmNlU3ltYm9sLmZpbGVQYXRoKSAmJiAhaXNUc0ZpbGUgJiYgbWV0YWRhdGEgJiZcbiAgICAgICAgbWV0YWRhdGFbJ19fc3ltYm9saWMnXSA9PT0gJ2NsYXNzJykge1xuICAgICAgY29uc3QgdHJhbnNmb3JtZWRNZXRhID0ge19fc3ltYm9saWM6ICdjbGFzcycsIGFyaXR5OiBtZXRhZGF0YS5hcml0eX07XG4gICAgICByZXR1cm4gbmV3IFJlc29sdmVkU3RhdGljU3ltYm9sKHNvdXJjZVN5bWJvbCwgdHJhbnNmb3JtZWRNZXRhKTtcbiAgICB9XG5cbiAgICBsZXQgX29yaWdpbmFsRmlsZU1lbW86IHN0cmluZ3x1bmRlZmluZWQ7XG4gICAgY29uc3QgZ2V0T3JpZ2luYWxOYW1lOiAoKSA9PiBzdHJpbmcgPSAoKSA9PiB7XG4gICAgICBpZiAoIV9vcmlnaW5hbEZpbGVNZW1vKSB7XG4gICAgICAgIC8vIEd1ZXNzIHdoYXQgdGhlIG9yaWdpbmFsIGZpbGUgbmFtZSBpcyBmcm9tIHRoZSByZWZlcmVuY2UuIElmIGl0IGhhcyBhIGAuZC50c2AgZXh0ZW5zaW9uXG4gICAgICAgIC8vIHJlcGxhY2UgaXQgd2l0aCBgLnRzYC4gSWYgaXQgYWxyZWFkeSBoYXMgYC50c2AganVzdCBsZWF2ZSBpdCBpbiBwbGFjZS4gSWYgaXQgZG9lc24ndCBoYXZlXG4gICAgICAgIC8vIC50cyBvciAuZC50cywgYXBwZW5kIGAudHMnLiBBbHNvLCBpZiBpdCBpcyBpbiBgbm9kZV9tb2R1bGVzYCwgdHJpbSB0aGUgYG5vZGVfbW9kdWxlYFxuICAgICAgICAvLyBsb2NhdGlvbiBhcyBpdCBpcyBub3QgaW1wb3J0YW50IHRvIGZpbmRpbmcgdGhlIGZpbGUuXG4gICAgICAgIF9vcmlnaW5hbEZpbGVNZW1vID1cbiAgICAgICAgICAgIHRoaXMuaG9zdC5nZXRPdXRwdXROYW1lKHRvcExldmVsUGF0aC5yZXBsYWNlKC8oKFxcLnRzKXwoXFwuZFxcLnRzKXwpJC8sICcudHMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eLipub2RlX21vZHVsZXNbL1xcXFxdLywgJycpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfb3JpZ2luYWxGaWxlTWVtbztcbiAgICB9O1xuXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICBjbGFzcyBSZWZlcmVuY2VUcmFuc2Zvcm1lciBleHRlbmRzIFZhbHVlVHJhbnNmb3JtZXIge1xuICAgICAgdmlzaXRTdHJpbmdNYXAobWFwOiB7W2tleTogc3RyaW5nXTogYW55fSwgZnVuY3Rpb25QYXJhbXM6IHN0cmluZ1tdKTogYW55IHtcbiAgICAgICAgY29uc3Qgc3ltYm9saWMgPSBtYXBbJ19fc3ltYm9saWMnXTtcbiAgICAgICAgaWYgKHN5bWJvbGljID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY29uc3Qgb2xkTGVuID0gZnVuY3Rpb25QYXJhbXMubGVuZ3RoO1xuICAgICAgICAgIGZ1bmN0aW9uUGFyYW1zLnB1c2goLi4uKG1hcFsncGFyYW1ldGVycyddIHx8IFtdKSk7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gc3VwZXIudmlzaXRTdHJpbmdNYXAobWFwLCBmdW5jdGlvblBhcmFtcyk7XG4gICAgICAgICAgZnVuY3Rpb25QYXJhbXMubGVuZ3RoID0gb2xkTGVuO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoc3ltYm9saWMgPT09ICdyZWZlcmVuY2UnKSB7XG4gICAgICAgICAgY29uc3QgbW9kdWxlID0gbWFwWydtb2R1bGUnXTtcbiAgICAgICAgICBjb25zdCBuYW1lID0gbWFwWyduYW1lJ10gPyB1bmVzY2FwZUlkZW50aWZpZXIobWFwWyduYW1lJ10pIDogbWFwWyduYW1lJ107XG4gICAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IGZpbGVQYXRoOiBzdHJpbmc7XG4gICAgICAgICAgaWYgKG1vZHVsZSkge1xuICAgICAgICAgICAgZmlsZVBhdGggPSBzZWxmLnJlc29sdmVNb2R1bGUobW9kdWxlLCBzb3VyY2VTeW1ib2wuZmlsZVBhdGgpICE7XG4gICAgICAgICAgICBpZiAoIWZpbGVQYXRoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgX19zeW1ib2xpYzogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgQ291bGQgbm90IHJlc29sdmUgJHttb2R1bGV9IHJlbGF0aXZlIHRvICR7c291cmNlU3ltYm9sLmZpbGVQYXRofS5gLFxuICAgICAgICAgICAgICAgIGxpbmU6IG1hcC5saW5lLFxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcjogbWFwLmNoYXJhY3RlcixcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogZ2V0T3JpZ2luYWxOYW1lKClcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIF9fc3ltYm9saWM6ICdyZXNvbHZlZCcsXG4gICAgICAgICAgICAgIHN5bWJvbDogc2VsZi5nZXRTdGF0aWNTeW1ib2woZmlsZVBhdGgsIG5hbWUpLFxuICAgICAgICAgICAgICBsaW5lOiBtYXAubGluZSxcbiAgICAgICAgICAgICAgY2hhcmFjdGVyOiBtYXAuY2hhcmFjdGVyLFxuICAgICAgICAgICAgICBmaWxlTmFtZTogZ2V0T3JpZ2luYWxOYW1lKClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChmdW5jdGlvblBhcmFtcy5pbmRleE9mKG5hbWUpID49IDApIHtcbiAgICAgICAgICAgIC8vIHJlZmVyZW5jZSB0byBhIGZ1bmN0aW9uIHBhcmFtZXRlclxuICAgICAgICAgICAgcmV0dXJuIHtfX3N5bWJvbGljOiAncmVmZXJlbmNlJywgbmFtZTogbmFtZX07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0b3BMZXZlbFN5bWJvbE5hbWVzLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2VsZi5nZXRTdGF0aWNTeW1ib2wodG9wTGV2ZWxQYXRoLCBuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFtYmllbnQgdmFsdWVcbiAgICAgICAgICAgIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHN5bWJvbGljID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgcmV0dXJuIHsuLi5tYXAsIGZpbGVOYW1lOiBnZXRPcmlnaW5hbE5hbWUoKX07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHN1cGVyLnZpc2l0U3RyaW5nTWFwKG1hcCwgZnVuY3Rpb25QYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHRyYW5zZm9ybWVkTWV0YSA9IHZpc2l0VmFsdWUobWV0YWRhdGEsIG5ldyBSZWZlcmVuY2VUcmFuc2Zvcm1lcigpLCBbXSk7XG4gICAgbGV0IHVud3JhcHBlZFRyYW5zZm9ybWVkTWV0YSA9IHVud3JhcFJlc29sdmVkTWV0YWRhdGEodHJhbnNmb3JtZWRNZXRhKTtcbiAgICBpZiAodW53cmFwcGVkVHJhbnNmb3JtZWRNZXRhIGluc3RhbmNlb2YgU3RhdGljU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVFeHBvcnQoc291cmNlU3ltYm9sLCB1bndyYXBwZWRUcmFuc2Zvcm1lZE1ldGEpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJlc29sdmVkU3RhdGljU3ltYm9sKHNvdXJjZVN5bWJvbCwgdHJhbnNmb3JtZWRNZXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRXhwb3J0KHNvdXJjZVN5bWJvbDogU3RhdGljU3ltYm9sLCB0YXJnZXRTeW1ib2w6IFN0YXRpY1N5bWJvbCk6XG4gICAgICBSZXNvbHZlZFN0YXRpY1N5bWJvbCB7XG4gICAgc291cmNlU3ltYm9sLmFzc2VydE5vTWVtYmVycygpO1xuICAgIHRhcmdldFN5bWJvbC5hc3NlcnROb01lbWJlcnMoKTtcbiAgICBpZiAodGhpcy5zdW1tYXJ5UmVzb2x2ZXIuaXNMaWJyYXJ5RmlsZShzb3VyY2VTeW1ib2wuZmlsZVBhdGgpICYmXG4gICAgICAgIHRoaXMuc3VtbWFyeVJlc29sdmVyLmlzTGlicmFyeUZpbGUodGFyZ2V0U3ltYm9sLmZpbGVQYXRoKSkge1xuICAgICAgLy8gVGhpcyBjYXNlIGlzIGZvciBhbiBuZyBsaWJyYXJ5IGltcG9ydGluZyBzeW1ib2xzIGZyb20gYSBwbGFpbiB0cyBsaWJyYXJ5XG4gICAgICAvLyB0cmFuc2l0aXZlbHkuXG4gICAgICAvLyBOb3RlOiBXZSByZWx5IG9uIHRoZSBmYWN0IHRoYXQgd2UgZGlzY292ZXIgc3ltYm9scyBpbiB0aGUgZGlyZWN0aW9uXG4gICAgICAvLyBmcm9tIHNvdXJjZSBmaWxlcyB0byBsaWJyYXJ5IGZpbGVzXG4gICAgICB0aGlzLmltcG9ydEFzLnNldCh0YXJnZXRTeW1ib2wsIHRoaXMuZ2V0SW1wb3J0QXMoc291cmNlU3ltYm9sKSB8fCBzb3VyY2VTeW1ib2wpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJlc29sdmVkU3RhdGljU3ltYm9sKHNvdXJjZVN5bWJvbCwgdGFyZ2V0U3ltYm9sKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVwb3J0RXJyb3IoZXJyb3I6IEVycm9yLCBjb250ZXh0PzogU3RhdGljU3ltYm9sLCBwYXRoPzogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuZXJyb3JSZWNvcmRlcikge1xuICAgICAgdGhpcy5lcnJvclJlY29yZGVyKGVycm9yLCAoY29udGV4dCAmJiBjb250ZXh0LmZpbGVQYXRoKSB8fCBwYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBtb2R1bGUgYW4gYWJzb2x1dGUgcGF0aCB0byBhIG1vZHVsZSBmaWxlLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRNb2R1bGVNZXRhZGF0YShtb2R1bGU6IHN0cmluZyk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICBsZXQgbW9kdWxlTWV0YWRhdGEgPSB0aGlzLm1ldGFkYXRhQ2FjaGUuZ2V0KG1vZHVsZSk7XG4gICAgaWYgKCFtb2R1bGVNZXRhZGF0YSkge1xuICAgICAgY29uc3QgbW9kdWxlTWV0YWRhdGFzID0gdGhpcy5ob3N0LmdldE1ldGFkYXRhRm9yKG1vZHVsZSk7XG4gICAgICBpZiAobW9kdWxlTWV0YWRhdGFzKSB7XG4gICAgICAgIGxldCBtYXhWZXJzaW9uID0gLTE7XG4gICAgICAgIG1vZHVsZU1ldGFkYXRhcy5mb3JFYWNoKChtZCkgPT4ge1xuICAgICAgICAgIGlmIChtZCAmJiBtZFsndmVyc2lvbiddID4gbWF4VmVyc2lvbikge1xuICAgICAgICAgICAgbWF4VmVyc2lvbiA9IG1kWyd2ZXJzaW9uJ107XG4gICAgICAgICAgICBtb2R1bGVNZXRhZGF0YSA9IG1kO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoIW1vZHVsZU1ldGFkYXRhKSB7XG4gICAgICAgIG1vZHVsZU1ldGFkYXRhID1cbiAgICAgICAgICAgIHtfX3N5bWJvbGljOiAnbW9kdWxlJywgdmVyc2lvbjogU1VQUE9SVEVEX1NDSEVNQV9WRVJTSU9OLCBtb2R1bGU6IG1vZHVsZSwgbWV0YWRhdGE6IHt9fTtcbiAgICAgIH1cbiAgICAgIGlmIChtb2R1bGVNZXRhZGF0YVsndmVyc2lvbiddICE9IFNVUFBPUlRFRF9TQ0hFTUFfVkVSU0lPTikge1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBtb2R1bGVNZXRhZGF0YVsndmVyc2lvbiddID09IDIgP1xuICAgICAgICAgICAgYFVuc3VwcG9ydGVkIG1ldGFkYXRhIHZlcnNpb24gJHttb2R1bGVNZXRhZGF0YVsndmVyc2lvbiddfSBmb3IgbW9kdWxlICR7bW9kdWxlfS4gVGhpcyBtb2R1bGUgc2hvdWxkIGJlIGNvbXBpbGVkIHdpdGggYSBuZXdlciB2ZXJzaW9uIG9mIG5nY2AgOlxuICAgICAgICAgICAgYE1ldGFkYXRhIHZlcnNpb24gbWlzbWF0Y2ggZm9yIG1vZHVsZSAke21vZHVsZX0sIGZvdW5kIHZlcnNpb24gJHttb2R1bGVNZXRhZGF0YVsndmVyc2lvbiddfSwgZXhwZWN0ZWQgJHtTVVBQT1JURURfU0NIRU1BX1ZFUlNJT059YDtcbiAgICAgICAgdGhpcy5yZXBvcnRFcnJvcihuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKSk7XG4gICAgICB9XG4gICAgICB0aGlzLm1ldGFkYXRhQ2FjaGUuc2V0KG1vZHVsZSwgbW9kdWxlTWV0YWRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gbW9kdWxlTWV0YWRhdGE7XG4gIH1cblxuXG4gIGdldFN5bWJvbEJ5TW9kdWxlKG1vZHVsZTogc3RyaW5nLCBzeW1ib2xOYW1lOiBzdHJpbmcsIGNvbnRhaW5pbmdGaWxlPzogc3RyaW5nKTogU3RhdGljU3ltYm9sIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMucmVzb2x2ZU1vZHVsZShtb2R1bGUsIGNvbnRhaW5pbmdGaWxlKTtcbiAgICBpZiAoIWZpbGVQYXRoKSB7XG4gICAgICB0aGlzLnJlcG9ydEVycm9yKFxuICAgICAgICAgIG5ldyBFcnJvcihgQ291bGQgbm90IHJlc29sdmUgbW9kdWxlICR7bW9kdWxlfSR7Y29udGFpbmluZ0ZpbGUgPyAnIHJlbGF0aXZlIHRvICcgK1xuICAgICAgICAgICAgY29udGFpbmluZ0ZpbGUgOiAnJ31gKSk7XG4gICAgICByZXR1cm4gdGhpcy5nZXRTdGF0aWNTeW1ib2woYEVSUk9SOiR7bW9kdWxlfWAsIHN5bWJvbE5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRTdGF0aWNTeW1ib2woZmlsZVBhdGgsIHN5bWJvbE5hbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlTW9kdWxlKG1vZHVsZTogc3RyaW5nLCBjb250YWluaW5nRmlsZT86IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuaG9zdC5tb2R1bGVOYW1lVG9GaWxlTmFtZShtb2R1bGUsIGNvbnRhaW5pbmdGaWxlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBDb3VsZCBub3QgcmVzb2x2ZSBtb2R1bGUgJyR7bW9kdWxlfScgcmVsYXRpdmUgdG8gZmlsZSAke2NvbnRhaW5pbmdGaWxlfWApO1xuICAgICAgdGhpcy5yZXBvcnRFcnJvcihlLCB1bmRlZmluZWQsIGNvbnRhaW5pbmdGaWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLy8gUmVtb3ZlIGV4dHJhIHVuZGVyc2NvcmUgZnJvbSBlc2NhcGVkIGlkZW50aWZpZXIuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2Jsb2IvbWFzdGVyL3NyYy9jb21waWxlci91dGlsaXRpZXMudHNcbmV4cG9ydCBmdW5jdGlvbiB1bmVzY2FwZUlkZW50aWZpZXIoaWRlbnRpZmllcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGlkZW50aWZpZXIuc3RhcnRzV2l0aCgnX19fJykgPyBpZGVudGlmaWVyLnN1YnN0cigxKSA6IGlkZW50aWZpZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bndyYXBSZXNvbHZlZE1ldGFkYXRhKG1ldGFkYXRhOiBhbnkpOiBhbnkge1xuICBpZiAobWV0YWRhdGEgJiYgbWV0YWRhdGEuX19zeW1ib2xpYyA9PT0gJ3Jlc29sdmVkJykge1xuICAgIHJldHVybiBtZXRhZGF0YS5zeW1ib2w7XG4gIH1cbiAgcmV0dXJuIG1ldGFkYXRhO1xufVxuIl19