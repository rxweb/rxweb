/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ValueTransformer, visitValue } from '../util';
import { StaticSymbol } from './static_symbol';
import { isGeneratedFile, stripSummaryForJitFileSuffix, stripSummaryForJitNameSuffix, summaryForJitFileName, summaryForJitName } from './util';
var TS = /^(?!.*\.d\.ts$).*\.ts$/;
var ResolvedStaticSymbol = /** @class */ (function () {
    function ResolvedStaticSymbol(symbol, metadata) {
        this.symbol = symbol;
        this.metadata = metadata;
    }
    return ResolvedStaticSymbol;
}());
export { ResolvedStaticSymbol };
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
        var summarizedFileName = stripSummaryForJitFileSuffix(staticSymbol.filePath);
        if (summarizedFileName !== staticSymbol.filePath) {
            var summarizedName = stripSummaryForJitNameSuffix(staticSymbol.name);
            var baseSymbol = this.getStaticSymbol(summarizedFileName, summarizedName, staticSymbol.members);
            var baseImportAs = this.getImportAs(baseSymbol, useSummaries);
            return baseImportAs ?
                this.getStaticSymbol(summaryForJitFileName(baseImportAs.filePath), summaryForJitName(baseImportAs.name), baseSymbol.members) :
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
        if (isGeneratedFile(staticSymbol.filePath)) {
            return null;
        }
        var resolvedSymbol = unwrapResolvedMetadata(this.resolveSymbol(staticSymbol));
        while (resolvedSymbol && resolvedSymbol.metadata instanceof StaticSymbol) {
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
    /* @internal */
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
        if (baseMetadata instanceof StaticSymbol) {
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
        }(ValueTransformer));
        var transformedMeta = visitValue(metadata, new ReferenceTransformer(), []);
        var unwrappedTransformedMeta = unwrapResolvedMetadata(transformedMeta);
        if (unwrappedTransformedMeta instanceof StaticSymbol) {
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
export { StaticSymbolResolver };
// Remove extra underscore from escaped identifier.
// See https://github.com/Microsoft/TypeScript/blob/master/src/compiler/utilities.ts
export function unescapeIdentifier(identifier) {
    return identifier.startsWith('___') ? identifier.substr(1) : identifier;
}
export function unwrapResolvedMetadata(metadata) {
    if (metadata && metadata.__symbolic === 'resolved') {
        return metadata.symbol;
    }
    return metadata;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3N5bWJvbF9yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9hb3Qvc3RhdGljX3N5bWJvbF9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBR0gsT0FBTyxFQUFDLGdCQUFnQixFQUFFLFVBQVUsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUVyRCxPQUFPLEVBQUMsWUFBWSxFQUFvQixNQUFNLGlCQUFpQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxlQUFlLEVBQUUsNEJBQTRCLEVBQUUsNEJBQTRCLEVBQUUscUJBQXFCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFFN0ksSUFBTSxFQUFFLEdBQUcsd0JBQXdCLENBQUM7QUFFcEM7SUFDRSw4QkFBbUIsTUFBb0IsRUFBUyxRQUFhO1FBQTFDLFdBQU0sR0FBTixNQUFNLENBQWM7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFLO0lBQUcsQ0FBQztJQUNuRSwyQkFBQztBQUFELENBQUMsQUFGRCxJQUVDOztBQWlDRCxJQUFNLHdCQUF3QixHQUFHLENBQUMsQ0FBQztBQUVuQzs7Ozs7OztHQU9HO0FBQ0g7SUFXRSw4QkFDWSxJQUE4QixFQUFVLGlCQUFvQyxFQUM1RSxlQUE4QyxFQUM5QyxhQUF1RDtRQUZ2RCxTQUFJLEdBQUosSUFBSSxDQUEwQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDNUUsb0JBQWUsR0FBZixlQUFlLENBQStCO1FBQzlDLGtCQUFhLEdBQWIsYUFBYSxDQUEwQztRQWIzRCxrQkFBYSxHQUFHLElBQUksR0FBRyxFQUFnQyxDQUFDO1FBQ2hFLDhEQUE4RDtRQUN0RCxvQkFBZSxHQUFHLElBQUksR0FBRyxFQUFzQyxDQUFDO1FBQ2hFLHNCQUFpQixHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFDOUMs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ICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1N1bW1hcnlSZXNvbHZlcn0gZnJvbSAnLi4vc3VtbWFyeV9yZXNvbHZlcic7XG5pbXBvcnQge1ZhbHVlVHJhbnNmb3JtZXIsIHZpc2l0VmFsdWV9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge1N0YXRpY1N5bWJvbCwgU3RhdGljU3ltYm9sQ2FjaGV9IGZyb20gJy4vc3RhdGljX3N5bWJvbCc7XG5pbXBvcnQge2lzR2VuZXJhdGVkRmlsZSwgc3RyaXBTdW1tYXJ5Rm9ySml0RmlsZVN1ZmZpeCwgc3RyaXBTdW1tYXJ5Rm9ySml0TmFtZVN1ZmZpeCwgc3VtbWFyeUZvckppdEZpbGVOYW1lLCBzdW1tYXJ5Rm9ySml0TmFtZX0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgVFMgPSAvXig/IS4qXFwuZFxcLnRzJCkuKlxcLnRzJC87XG5cbmV4cG9ydCBjbGFzcyBSZXNvbHZlZFN0YXRpY1N5bWJvbCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzeW1ib2w6IFN0YXRpY1N5bWJvbCwgcHVibGljIG1ldGFkYXRhOiBhbnkpIHt9XG59XG5cbi8qKlxuICogVGhlIGhvc3Qgb2YgdGhlIFN5bWJvbFJlc29sdmVySG9zdCBkaXNjb25uZWN0cyB0aGUgaW1wbGVtZW50YXRpb24gZnJvbSBUeXBlU2NyaXB0IC8gb3RoZXJcbiAqIGxhbmd1YWdlXG4gKiBzZXJ2aWNlcyBhbmQgZnJvbSB1bmRlcmx5aW5nIGZpbGUgc3lzdGVtcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdGF0aWNTeW1ib2xSZXNvbHZlckhvc3Qge1xuICAvKipcbiAgICogUmV0dXJuIGEgTW9kdWxlTWV0YWRhdGEgZm9yIHRoZSBnaXZlbiBtb2R1bGUuXG4gICAqIEFuZ3VsYXIgQ0xJIHdpbGwgcHJvZHVjZSB0aGlzIG1ldGFkYXRhIGZvciBhIG1vZHVsZSB3aGVuZXZlciBhIC5kLnRzIGZpbGVzIGlzXG4gICAqIHByb2R1Y2VkIGFuZCB0aGUgbW9kdWxlIGhhcyBleHBvcnRlZCB2YXJpYWJsZXMgb3IgY2xhc3NlcyB3aXRoIGRlY29yYXRvcnMuIE1vZHVsZSBtZXRhZGF0YSBjYW5cbiAgICogYWxzbyBiZSBwcm9kdWNlZCBkaXJlY3RseSBmcm9tIFR5cGVTY3JpcHQgc291cmNlcyBieSB1c2luZyBNZXRhZGF0YUNvbGxlY3RvciBpbiB0b29scy9tZXRhZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIG1vZHVsZVBhdGggaXMgYSBzdHJpbmcgaWRlbnRpZmllciBmb3IgYSBtb2R1bGUgYXMgYW4gYWJzb2x1dGUgcGF0aC5cbiAgICogQHJldHVybnMgdGhlIG1ldGFkYXRhIGZvciB0aGUgZ2l2ZW4gbW9kdWxlLlxuICAgKi9cbiAgZ2V0TWV0YWRhdGFGb3IobW9kdWxlUGF0aDogc3RyaW5nKToge1trZXk6IHN0cmluZ106IGFueX1bXXx1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgbW9kdWxlIG5hbWUgdGhhdCBpcyB1c2VkIGluIGFuIGBpbXBvcnRgIHRvIGEgZmlsZSBwYXRoLlxuICAgKiBJLmUuXG4gICAqIGBwYXRoL3RvL2NvbnRhaW5pbmdGaWxlLnRzYCBjb250YWluaW5nIGBpbXBvcnQgey4uLn0gZnJvbSAnbW9kdWxlLW5hbWUnYC5cbiAgICovXG4gIG1vZHVsZU5hbWVUb0ZpbGVOYW1lKG1vZHVsZU5hbWU6IHN0cmluZywgY29udGFpbmluZ0ZpbGU/OiBzdHJpbmcpOiBzdHJpbmd8bnVsbDtcblxuICAvKipcbiAgICogR2V0IGEgZmlsZSBzdWl0YWJsZSBmb3IgZGlzcGxheSB0byB0aGUgdXNlciB0aGF0IHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgcHJvamVjdCBkaXJlY3RvcnlcbiAgICogb3IgdGhlIGN1cnJlbnQgZGlyZWN0b3J5LlxuICAgKi9cbiAgZ2V0T3V0cHV0TmFtZShmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nO1xufVxuXG5jb25zdCBTVVBQT1JURURfU0NIRU1BX1ZFUlNJT04gPSA0O1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIGxvYWRpbmcgbWV0YWRhdGEgcGVyIHN5bWJvbCxcbiAqIGFuZCBub3JtYWxpemluZyByZWZlcmVuY2VzIGJldHdlZW4gc3ltYm9scy5cbiAqXG4gKiBJbnRlcm5hbGx5LCBpdCBvbmx5IHVzZXMgc3ltYm9scyB3aXRob3V0IG1lbWJlcnMsXG4gKiBhbmQgZGVkdWNlcyB0aGUgdmFsdWVzIGZvciBzeW1ib2xzIHdpdGggbWVtYmVycyBiYXNlZFxuICogb24gdGhlc2Ugc3ltYm9scy5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRpY1N5bWJvbFJlc29sdmVyIHtcbiAgcHJpdmF0ZSBtZXRhZGF0YUNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIHtba2V5OiBzdHJpbmddOiBhbnl9PigpO1xuICAvLyBOb3RlOiB0aGlzIHdpbGwgb25seSBjb250YWluIFN0YXRpY1N5bWJvbHMgd2l0aG91dCBtZW1iZXJzIVxuICBwcml2YXRlIHJlc29sdmVkU3ltYm9scyA9IG5ldyBNYXA8U3RhdGljU3ltYm9sLCBSZXNvbHZlZFN0YXRpY1N5bWJvbD4oKTtcbiAgcHJpdmF0ZSByZXNvbHZlZEZpbGVQYXRocyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAvLyBOb3RlOiB0aGlzIHdpbGwgb25seSBjb250YWluIFN0YXRpY1N5bWJvbHMgd2l0aG91dCBtZW1iZXJzIVxuICBwcml2YXRlIGltcG9ydEFzID0gbmV3IE1hcDxTdGF0aWNTeW1ib2wsIFN0YXRpY1N5bWJvbD4oKTtcbiAgcHJpdmF0ZSBzeW1ib2xSZXNvdXJjZVBhdGhzID0gbmV3IE1hcDxTdGF0aWNTeW1ib2wsIHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBzeW1ib2xGcm9tRmlsZSA9IG5ldyBNYXA8c3RyaW5nLCBTdGF0aWNTeW1ib2xbXT4oKTtcbiAgcHJpdmF0ZSBrbm93bkZpbGVOYW1lVG9Nb2R1bGVOYW1lcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGhvc3Q6IFN0YXRpY1N5bWJvbFJlc29sdmVySG9zdCwgcHJpdmF0ZSBzdGF0aWNTeW1ib2xDYWNoZTogU3RhdGljU3ltYm9sQ2FjaGUsXG4gICAgICBwcml2YXRlIHN1bW1hcnlSZXNvbHZlcjogU3VtbWFyeVJlc29sdmVyPFN0YXRpY1N5bWJvbD4sXG4gICAgICBwcml2YXRlIGVycm9yUmVjb3JkZXI/OiAoZXJyb3I6IGFueSwgZmlsZU5hbWU/OiBzdHJpbmcpID0+IHZvaWQpIHt9XG5cbiAgcmVzb2x2ZVN5bWJvbChzdGF0aWNTeW1ib2w6IFN0YXRpY1N5bWJvbCk6IFJlc29sdmVkU3RhdGljU3ltYm9sIHtcbiAgICBpZiAoc3RhdGljU3ltYm9sLm1lbWJlcnMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Jlc29sdmVTeW1ib2xNZW1iZXJzKHN0YXRpY1N5bWJvbCkgITtcbiAgICB9XG4gICAgLy8gTm90ZTogYWx3YXlzIGFzayBmb3IgYSBzdW1tYXJ5IGZpcnN0LFxuICAgIC8vIGFzIHdlIG1pZ2h0IGhhdmUgcmVhZCBzaGFsbG93IG1ldGFkYXRhIHZpYSBhIC5kLnRzIGZpbGVcbiAgICAvLyBmb3IgdGhlIHN5bWJvbC5cbiAgICBjb25zdCByZXN1bHRGcm9tU3VtbWFyeSA9IHRoaXMuX3Jlc29sdmVTeW1ib2xGcm9tU3VtbWFyeShzdGF0aWNTeW1ib2wpICE7XG4gICAgaWYgKHJlc3VsdEZyb21TdW1tYXJ5KSB7XG4gICAgICByZXR1cm4gcmVzdWx0RnJvbVN1bW1hcnk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdEZyb21DYWNoZSA9IHRoaXMucmVzb2x2ZWRTeW1ib2xzLmdldChzdGF0aWNTeW1ib2wpO1xuICAgIGlmIChyZXN1bHRGcm9tQ2FjaGUpIHtcbiAgICAgIHJldHVybiByZXN1bHRGcm9tQ2FjaGU7XG4gICAgfVxuICAgIC8vIE5vdGU6IFNvbWUgdXNlcnMgdXNlIGxpYnJhcmllcyB0aGF0IHdlcmUgbm90IGNvbXBpbGVkIHdpdGggbmdjLCBpLmUuIHRoZXkgZG9uJ3RcbiAgICAvLyBoYXZlIHN1bW1hcmllcywgb25seSAuZC50cyBmaWxlcy4gU28gd2UgYWx3YXlzIG5lZWQgdG8gY2hlY2sgYm90aCwgdGhlIHN1bW1hcnlcbiAgICAvLyBhbmQgbWV0YWRhdGEuXG4gICAgdGhpcy5fY3JlYXRlU3ltYm9sc09mKHN0YXRpY1N5bWJvbC5maWxlUGF0aCk7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZWRTeW1ib2xzLmdldChzdGF0aWNTeW1ib2wpICE7XG4gIH1cblxuICAvKipcbiAgICogZ2V0SW1wb3J0QXMgcHJvZHVjZXMgYSBzeW1ib2wgdGhhdCBjYW4gYmUgdXNlZCB0byBpbXBvcnQgdGhlIGdpdmVuIHN5bWJvbC5cbiAgICogVGhlIGltcG9ydCBtaWdodCBiZSBkaWZmZXJlbnQgdGhhbiB0aGUgc3ltYm9sIGlmIHRoZSBzeW1ib2wgaXMgZXhwb3J0ZWQgZnJvbVxuICAgKiBhIGxpYnJhcnkgd2l0aCBhIHN1bW1hcnk7IGluIHdoaWNoIGNhc2Ugd2Ugd2FudCB0byBpbXBvcnQgdGhlIHN5bWJvbCBmcm9tIHRoZVxuICAgKiBuZ2ZhY3RvcnkgcmUtZXhwb3J0IGluc3RlYWQgb2YgZGlyZWN0bHkgdG8gYXZvaWQgaW50cm9kdWNpbmcgYSBkaXJlY3QgZGVwZW5kZW5jeVxuICAgKiBvbiBhbiBvdGhlcndpc2UgaW5kaXJlY3QgZGVwZW5kZW5jeS5cbiAgICpcbiAgICogQHBhcmFtIHN0YXRpY1N5bWJvbCB0aGUgc3ltYm9sIGZvciB3aGljaCB0byBnZW5lcmF0ZSBhIGltcG9ydCBzeW1ib2xcbiAgICovXG4gIGdldEltcG9ydEFzKHN0YXRpY1N5bWJvbDogU3RhdGljU3ltYm9sLCB1c2VTdW1tYXJpZXM6IGJvb2xlYW4gPSB0cnVlKTogU3RhdGljU3ltYm9sfG51bGwge1xuICAgIGlmIChzdGF0aWNTeW1ib2wubWVtYmVycy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGJhc2VTeW1ib2wgPSB0aGlzLmdldFN0YXRpY1N5bWJvbChzdGF0aWNTeW1ib2wuZmlsZVBhdGgsIHN0YXRpY1N5bWJvbC5uYW1lKTtcbiAgICAgIGNvbnN0IGJhc2VJbXBvcnRBcyA9IHRoaXMuZ2V0SW1wb3J0QXMoYmFzZVN5bWJvbCwgdXNlU3VtbWFyaWVzKTtcbiAgICAgIHJldHVybiBiYXNlSW1wb3J0QXMgP1xuICAgICAgICAgIHRoaXMuZ2V0U3RhdGljU3ltYm9sKGJhc2VJbXBvcnRBcy5maWxlUGF0aCwgYmFzZUltcG9ydEFzLm5hbWUsIHN0YXRpY1N5bWJvbC5tZW1iZXJzKSA6XG4gICAgICAgICAgbnVsbDtcbiAgICB9XG4gICAgY29uc3Qgc3VtbWFyaXplZEZpbGVOYW1lID0gc3RyaXBTdW1tYXJ5Rm9ySml0RmlsZVN1ZmZpeChzdGF0aWNTeW1ib2wuZmlsZVBhdGgpO1xuICAgIGlmIChzdW1tYXJpemVkRmlsZU5hbWUgIT09IHN0YXRpY1N5bWJvbC5maWxlUGF0aCkge1xuICAgICAgY29uc3Qgc3VtbWFyaXplZE5hbWUgPSBzdHJpcFN1bW1hcnlGb3JKaXROYW1lU3VmZml4KHN0YXRpY1N5bWJvbC5uYW1lKTtcbiAgICAgIGNvbnN0IGJhc2VTeW1ib2wgPVxuICAgICAgICAgIHRoaXMuZ2V0U3RhdGljU3ltYm9sKHN1bW1hcml6ZWRGaWxlTmFtZSwgc3VtbWFyaXplZE5hbWUsIHN0YXRpY1N5bWJvbC5tZW1iZXJzKTtcbiAgICAgIGNvbnN0IGJhc2VJbXBvcnRBcyA9IHRoaXMuZ2V0SW1wb3J0QXMoYmFzZVN5bWJvbCwgdXNlU3VtbWFyaWVzKTtcbiAgICAgIHJldHVybiBiYXNlSW1wb3J0QXMgP1xuICAgICAgICAgIHRoaXMuZ2V0U3RhdGljU3ltYm9sKFxuICAgICAgICAgICAgICBzdW1tYXJ5Rm9ySml0RmlsZU5hbWUoYmFzZUltcG9ydEFzLmZpbGVQYXRoKSwgc3VtbWFyeUZvckppdE5hbWUoYmFzZUltcG9ydEFzLm5hbWUpLFxuICAgICAgICAgICAgICBiYXNlU3ltYm9sLm1lbWJlcnMpIDpcbiAgICAgICAgICBudWxsO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0ID0gKHVzZVN1bW1hcmllcyAmJiB0aGlzLnN1bW1hcnlSZXNvbHZlci5nZXRJbXBvcnRBcyhzdGF0aWNTeW1ib2wpKSB8fCBudWxsO1xuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXN1bHQgPSB0aGlzLmltcG9ydEFzLmdldChzdGF0aWNTeW1ib2wpICE7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogZ2V0UmVzb3VyY2VQYXRoIHByb2R1Y2VzIHRoZSBwYXRoIHRvIHRoZSBvcmlnaW5hbCBsb2NhdGlvbiBvZiB0aGUgc3ltYm9sIGFuZCBzaG91bGRcbiAgICogYmUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHJlbGF0aXZlIGxvY2F0aW9uIG9mIHJlc291cmNlIHJlZmVyZW5jZXMgcmVjb3JkZWQgaW5cbiAgICogc3ltYm9sIG1ldGFkYXRhLlxuICAgKi9cbiAgZ2V0UmVzb3VyY2VQYXRoKHN0YXRpY1N5bWJvbDogU3RhdGljU3ltYm9sKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zeW1ib2xSZXNvdXJjZVBhdGhzLmdldChzdGF0aWNTeW1ib2wpIHx8IHN0YXRpY1N5bWJvbC5maWxlUGF0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXRUeXBlQXJpdHkgcmV0dXJucyB0aGUgbnVtYmVyIG9mIGdlbmVyaWMgdHlwZSBwYXJhbWV0ZXJzIHRoZSBnaXZlbiBzeW1ib2xcbiAgICogaGFzLiBJZiB0aGUgc3ltYm9sIGlzIG5vdCBhIHR5cGUgdGhlIHJlc3VsdCBpcyBudWxsLlxuICAgKi9cbiAgZ2V0VHlwZUFyaXR5KHN0YXRpY1N5bWJvbDogU3RhdGljU3ltYm9sKTogbnVtYmVyfG51bGwge1xuICAgIC8vIElmIHRoZSBmaWxlIGlzIGEgZmFjdG9yeS9uZ3N1bW1hcnkgZmlsZSwgZG9uJ3QgcmVzb2x2ZSB0aGUgc3ltYm9sIGFzIGRvaW5nIHNvIHdvdWxkXG4gICAgLy8gY2F1c2UgdGhlIG1ldGFkYXRhIGZvciBhbiBmYWN0b3J5L25nc3VtbWFyeSBmaWxlIHRvIGJlIGxvYWRlZCB3aGljaCBkb2Vzbid0IGV4aXN0LlxuICAgIC8vIEFsbCByZWZlcmVuY2VzIHRvIGdlbmVyYXRlZCBjbGFzc2VzIG11c3QgaW5jbHVkZSB0aGUgY29ycmVjdCBhcml0eSB3aGVuZXZlclxuICAgIC8vIGdlbmVyYXRpbmcgY29kZS5cbiAgICBpZiAoaXNHZW5lcmF0ZWRGaWxlKHN0YXRpY1N5bWJvbC5maWxlUGF0aCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBsZXQgcmVzb2x2ZWRTeW1ib2wgPSB1bndyYXBSZXNvbHZlZE1ldGFkYXRhKHRoaXMucmVzb2x2ZVN5bWJvbChzdGF0aWNTeW1ib2wpKTtcbiAgICB3aGlsZSAocmVzb2x2ZWRTeW1ib2wgJiYgcmVzb2x2ZWRTeW1ib2wubWV0YWRhdGEgaW5zdGFuY2VvZiBTdGF0aWNTeW1ib2wpIHtcbiAgICAgIHJlc29sdmVkU3ltYm9sID0gdW53cmFwUmVzb2x2ZWRNZXRhZGF0YSh0aGlzLnJlc29sdmVTeW1ib2wocmVzb2x2ZWRTeW1ib2wubWV0YWRhdGEpKTtcbiAgICB9XG4gICAgcmV0dXJuIChyZXNvbHZlZFN5bWJvbCAmJiByZXNvbHZlZFN5bWJvbC5tZXRhZGF0YSAmJiByZXNvbHZlZFN5bWJvbC5tZXRhZGF0YS5hcml0eSkgfHwgbnVsbDtcbiAgfVxuXG4gIGdldEtub3duTW9kdWxlTmFtZShmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiB0aGlzLmtub3duRmlsZU5hbWVUb01vZHVsZU5hbWVzLmdldChmaWxlUGF0aCkgfHwgbnVsbDtcbiAgfVxuXG4gIHJlY29yZEltcG9ydEFzKHNvdXJjZVN5bWJvbDogU3RhdGljU3ltYm9sLCB0YXJnZXRTeW1ib2w6IFN0YXRpY1N5bWJvbCkge1xuICAgIHNvdXJjZVN5bWJvbC5hc3NlcnROb01lbWJlcnMoKTtcbiAgICB0YXJnZXRTeW1ib2wuYXNzZXJ0Tm9NZW1iZXJzKCk7XG4gICAgdGhpcy5pbXBvcnRBcy5zZXQoc291cmNlU3ltYm9sLCB0YXJnZXRTeW1ib2wpO1xuICB9XG5cbiAgcmVjb3JkTW9kdWxlTmFtZUZvckZpbGVOYW1lKGZpbGVOYW1lOiBzdHJpbmcsIG1vZHVsZU5hbWU6IHN0cmluZykge1xuICAgIHRoaXMua25vd25GaWxlTmFtZVRvTW9kdWxlTmFtZXMuc2V0KGZpbGVOYW1lLCBtb2R1bGVOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZhbGlkYXRlIGFsbCBpbmZvcm1hdGlvbiBkZXJpdmVkIGZyb20gdGhlIGdpdmVuIGZpbGUuXG4gICAqXG4gICAqIEBwYXJhbSBmaWxlTmFtZSB0aGUgZmlsZSB0byBpbnZhbGlkYXRlXG4gICAqL1xuICBpbnZhbGlkYXRlRmlsZShmaWxlTmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5tZXRhZGF0YUNhY2hlLmRlbGV0ZShmaWxlTmFtZSk7XG4gICAgdGhpcy5yZXNvbHZlZEZpbGVQYXRocy5kZWxldGUoZmlsZU5hbWUpO1xuICAgIGNvbnN0IHN5bWJvbHMgPSB0aGlzLnN5bWJvbEZyb21GaWxlLmdldChmaWxlTmFtZSk7XG4gICAgaWYgKHN5bWJvbHMpIHtcbiAgICAgIHRoaXMuc3ltYm9sRnJvbUZpbGUuZGVsZXRlKGZpbGVOYW1lKTtcbiAgICAgIGZvciAoY29uc3Qgc3ltYm9sIG9mIHN5bWJvbHMpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlZFN5bWJvbHMuZGVsZXRlKHN5bWJvbCk7XG4gICAgICAgIHRoaXMuaW1wb3J0QXMuZGVsZXRlKHN5bWJvbCk7XG4gICAgICAgIHRoaXMuc3ltYm9sUmVzb3VyY2VQYXRocy5kZWxldGUoc3ltYm9sKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiBAaW50ZXJuYWwgKi9cbiAgaWdub3JlRXJyb3JzRm9yPFQ+KGNiOiAoKSA9PiBUKSB7XG4gICAgY29uc3QgcmVjb3JkZXIgPSB0aGlzLmVycm9yUmVjb3JkZXI7XG4gICAgdGhpcy5lcnJvclJlY29yZGVyID0gKCkgPT4ge307XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBjYigpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLmVycm9yUmVjb3JkZXIgPSByZWNvcmRlcjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZXNvbHZlU3ltYm9sTWVtYmVycyhzdGF0aWNTeW1ib2w6IFN0YXRpY1N5bWJvbCk6IFJlc29sdmVkU3RhdGljU3ltYm9sfG51bGwge1xuICAgIGNvbnN0IG1lbWJlcnMgPSBzdGF0aWNTeW1ib2wubWVtYmVycztcbiAgICBjb25zdCBiYXNlUmVzb2x2ZWRTeW1ib2wgPVxuICAgICAgICB0aGlzLnJlc29sdmVTeW1ib2wodGhpcy5nZXRTdGF0aWNTeW1ib2woc3RhdGljU3ltYm9sLmZpbGVQYXRoLCBzdGF0aWNTeW1ib2wubmFtZSkpO1xuICAgIGlmICghYmFzZVJlc29sdmVkU3ltYm9sKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgbGV0IGJhc2VNZXRhZGF0YSA9IHVud3JhcFJlc29sdmVkTWV0YWRhdGEoYmFzZVJlc29sdmVkU3ltYm9sLm1ldGFkYXRhKTtcbiAgICBpZiAoYmFzZU1ldGFkYXRhIGluc3RhbmNlb2YgU3RhdGljU3ltYm9sKSB7XG4gICAgICByZXR1cm4gbmV3IFJlc29sdmVkU3RhdGljU3ltYm9sKFxuICAgICAgICAgIHN0YXRpY1N5bWJvbCwgdGhpcy5nZXRTdGF0aWNTeW1ib2woYmFzZU1ldGFkYXRhLmZpbGVQYXRoLCBiYXNlTWV0YWRhdGEubmFtZSwgbWVtYmVycykpO1xuICAgIH0gZWxzZSBpZiAoYmFzZU1ldGFkYXRhICYmIGJhc2VNZXRhZGF0YS5fX3N5bWJvbGljID09PSAnY2xhc3MnKSB7XG4gICAgICBpZiAoYmFzZU1ldGFkYXRhLnN0YXRpY3MgJiYgbWVtYmVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXNvbHZlZFN0YXRpY1N5bWJvbChzdGF0aWNTeW1ib2wsIGJhc2VNZXRhZGF0YS5zdGF0aWNzW21lbWJlcnNbMF1dKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHZhbHVlID0gYmFzZU1ldGFkYXRhO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW1iZXJzLmxlbmd0aCAmJiB2YWx1ZTsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVbbWVtYmVyc1tpXV07XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFJlc29sdmVkU3RhdGljU3ltYm9sKHN0YXRpY1N5bWJvbCwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc29sdmVTeW1ib2xGcm9tU3VtbWFyeShzdGF0aWNTeW1ib2w6IFN0YXRpY1N5bWJvbCk6IFJlc29sdmVkU3RhdGljU3ltYm9sfG51bGwge1xuICAgIGNvbnN0IHN1bW1hcnkgPSB0aGlzLnN1bW1hcnlSZXNvbHZlci5yZXNvbHZlU3VtbWFyeShzdGF0aWNTeW1ib2wpO1xuICAgIHJldHVybiBzdW1tYXJ5ID8gbmV3IFJlc29sdmVkU3RhdGljU3ltYm9sKHN0YXRpY1N5bWJvbCwgc3VtbWFyeS5tZXRhZGF0YSkgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldFN0YXRpY1N5bWJvbCBwcm9kdWNlcyBhIFR5cGUgd2hvc2UgbWV0YWRhdGEgaXMga25vd24gYnV0IHdob3NlIGltcGxlbWVudGF0aW9uIGlzIG5vdCBsb2FkZWQuXG4gICAqIEFsbCB0eXBlcyBwYXNzZWQgdG8gdGhlIFN0YXRpY1Jlc29sdmVyIHNob3VsZCBiZSBwc2V1ZG8tdHlwZXMgcmV0dXJuZWQgYnkgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSBkZWNsYXJhdGlvbkZpbGUgdGhlIGFic29sdXRlIHBhdGggb2YgdGhlIGZpbGUgd2hlcmUgdGhlIHN5bWJvbCBpcyBkZWNsYXJlZFxuICAgKiBAcGFyYW0gbmFtZSB0aGUgbmFtZSBvZiB0aGUgdHlwZS5cbiAgICogQHBhcmFtIG1lbWJlcnMgYSBzeW1ib2wgZm9yIGEgc3RhdGljIG1lbWJlciBvZiB0aGUgbmFtZWQgdHlwZVxuICAgKi9cbiAgZ2V0U3RhdGljU3ltYm9sKGRlY2xhcmF0aW9uRmlsZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIG1lbWJlcnM/OiBzdHJpbmdbXSk6IFN0YXRpY1N5bWJvbCB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGljU3ltYm9sQ2FjaGUuZ2V0KGRlY2xhcmF0aW9uRmlsZSwgbmFtZSwgbWVtYmVycyk7XG4gIH1cblxuICAvKipcbiAgICogaGFzRGVjb3JhdG9ycyBjaGVja3MgYSBmaWxlJ3MgbWV0YWRhdGEgZm9yIHRoZSBwcmVzZW5jZSBvZiBkZWNvcmF0b3JzIHdpdGhvdXQgZXZhbHVhdGluZyB0aGVcbiAgICogbWV0YWRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSBmaWxlUGF0aCB0aGUgYWJzb2x1dGUgcGF0aCB0byBleGFtaW5lIGZvciBkZWNvcmF0b3JzLlxuICAgKiBAcmV0dXJucyB0cnVlIGlmIGFueSBjbGFzcyBpbiB0aGUgZmlsZSBoYXMgYSBkZWNvcmF0b3IuXG4gICAqL1xuICBoYXNEZWNvcmF0b3JzKGZpbGVQYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBtZXRhZGF0YSA9IHRoaXMuZ2V0TW9kdWxlTWV0YWRhdGEoZmlsZVBhdGgpO1xuICAgIGlmIChtZXRhZGF0YVsnbWV0YWRhdGEnXSkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG1ldGFkYXRhWydtZXRhZGF0YSddKS5zb21lKChtZXRhZGF0YUtleSkgPT4ge1xuICAgICAgICBjb25zdCBlbnRyeSA9IG1ldGFkYXRhWydtZXRhZGF0YSddW21ldGFkYXRhS2V5XTtcbiAgICAgICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5Ll9fc3ltYm9saWMgPT09ICdjbGFzcycgJiYgZW50cnkuZGVjb3JhdG9ycztcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRTeW1ib2xzT2YoZmlsZVBhdGg6IHN0cmluZyk6IFN0YXRpY1N5bWJvbFtdIHtcbiAgICBjb25zdCBzdW1tYXJ5U3ltYm9scyA9IHRoaXMuc3VtbWFyeVJlc29sdmVyLmdldFN5bWJvbHNPZihmaWxlUGF0aCk7XG4gICAgaWYgKHN1bW1hcnlTeW1ib2xzKSB7XG4gICAgICByZXR1cm4gc3VtbWFyeVN5bWJvbHM7XG4gICAgfVxuICAgIC8vIE5vdGU6IFNvbWUgdXNlcnMgdXNlIGxpYnJhcmllcyB0aGF0IHdlcmUgbm90IGNvbXBpbGVkIHdpdGggbmdjLCBpLmUuIHRoZXkgZG9uJ3RcbiAgICAvLyBoYXZlIHN1bW1hcmllcywgb25seSAuZC50cyBmaWxlcywgYnV0IGBzdW1tYXJ5UmVzb2x2ZXIuaXNMaWJyYXJ5RmlsZWAgcmV0dXJucyB0cnVlLlxuICAgIHRoaXMuX2NyZWF0ZVN5bWJvbHNPZihmaWxlUGF0aCk7XG4gICAgY29uc3QgbWV0YWRhdGFTeW1ib2xzOiBTdGF0aWNTeW1ib2xbXSA9IFtdO1xuICAgIHRoaXMucmVzb2x2ZWRTeW1ib2xzLmZvckVhY2goKHJlc29sdmVkU3ltYm9sKSA9PiB7XG4gICAgICBpZiAocmVzb2x2ZWRTeW1ib2wuc3ltYm9sLmZpbGVQYXRoID09PSBmaWxlUGF0aCkge1xuICAgICAgICBtZXRhZGF0YVN5bWJvbHMucHVzaChyZXNvbHZlZFN5bWJvbC5zeW1ib2wpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtZXRhZGF0YVN5bWJvbHM7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVTeW1ib2xzT2YoZmlsZVBhdGg6IHN0cmluZykge1xuICAgIGlmICh0aGlzLnJlc29sdmVkRmlsZVBhdGhzLmhhcyhmaWxlUGF0aCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZXNvbHZlZEZpbGVQYXRocy5hZGQoZmlsZVBhdGgpO1xuICAgIGNvbnN0IHJlc29sdmVkU3ltYm9sczogUmVzb2x2ZWRTdGF0aWNTeW1ib2xbXSA9IFtdO1xuICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5nZXRNb2R1bGVNZXRhZGF0YShmaWxlUGF0aCk7XG4gICAgaWYgKG1ldGFkYXRhWydpbXBvcnRBcyddKSB7XG4gICAgICAvLyBJbmRleCBidW5kbGUgaW5kaWNlcyBzaG91bGQgdXNlIHRoZSBpbXBvcnRBcyBtb2R1bGUgbmFtZSBkZWZpbmVkXG4gICAgICAvLyBpbiB0aGUgYnVuZGxlLlxuICAgICAgdGhpcy5rbm93bkZpbGVOYW1lVG9Nb2R1bGVOYW1lcy5zZXQoZmlsZVBhdGgsIG1ldGFkYXRhWydpbXBvcnRBcyddKTtcbiAgICB9XG4gICAgLy8gaGFuZGxlIHRoZSBzeW1ib2xzIGluIG9uZSBvZiB0aGUgcmUtZXhwb3J0IGxvY2F0aW9uXG4gICAgaWYgKG1ldGFkYXRhWydleHBvcnRzJ10pIHtcbiAgICAgIGZvciAoY29uc3QgbW9kdWxlRXhwb3J0IG9mIG1ldGFkYXRhWydleHBvcnRzJ10pIHtcbiAgICAgICAgLy8gaGFuZGxlIHRoZSBzeW1ib2xzIGluIHRoZSBsaXN0IG9mIGV4cGxpY2l0bHkgcmUtZXhwb3J0ZWQgc3ltYm9scy5cbiAgICAgICAgaWYgKG1vZHVsZUV4cG9ydC5leHBvcnQpIHtcbiAgICAgICAgICBtb2R1bGVFeHBvcnQuZXhwb3J0LmZvckVhY2goKGV4cG9ydFN5bWJvbDogYW55KSA9PiB7XG4gICAgICAgICAgICBsZXQgc3ltYm9sTmFtZTogc3RyaW5nO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBleHBvcnRTeW1ib2wgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHN5bWJvbE5hbWUgPSBleHBvcnRTeW1ib2w7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzeW1ib2xOYW1lID0gZXhwb3J0U3ltYm9sLmFzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3ltYm9sTmFtZSA9IHVuZXNjYXBlSWRlbnRpZmllcihzeW1ib2xOYW1lKTtcbiAgICAgICAgICAgIGxldCBzeW1OYW1lID0gc3ltYm9sTmFtZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXhwb3J0U3ltYm9sICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBzeW1OYW1lID0gdW5lc2NhcGVJZGVudGlmaWVyKGV4cG9ydFN5bWJvbC5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkTW9kdWxlID0gdGhpcy5yZXNvbHZlTW9kdWxlKG1vZHVsZUV4cG9ydC5mcm9tLCBmaWxlUGF0aCk7XG4gICAgICAgICAgICBpZiAocmVzb2x2ZWRNb2R1bGUpIHtcbiAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0U3ltYm9sID0gdGhpcy5nZXRTdGF0aWNTeW1ib2wocmVzb2x2ZWRNb2R1bGUsIHN5bU5hbWUpO1xuICAgICAgICAgICAgICBjb25zdCBzb3VyY2VTeW1ib2wgPSB0aGlzLmdldFN0YXRpY1N5bWJvbChmaWxlUGF0aCwgc3ltYm9sTmFtZSk7XG4gICAgICAgICAgICAgIHJlc29sdmVkU3ltYm9scy5wdXNoKHRoaXMuY3JlYXRlRXhwb3J0KHNvdXJjZVN5bWJvbCwgdGFyZ2V0U3ltYm9sKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaGFuZGxlIHRoZSBzeW1ib2xzIHZpYSBleHBvcnQgKiBkaXJlY3RpdmVzLlxuICAgICAgICAgIGNvbnN0IHJlc29sdmVkTW9kdWxlID0gdGhpcy5yZXNvbHZlTW9kdWxlKG1vZHVsZUV4cG9ydC5mcm9tLCBmaWxlUGF0aCk7XG4gICAgICAgICAgaWYgKHJlc29sdmVkTW9kdWxlKSB7XG4gICAgICAgICAgICBjb25zdCBuZXN0ZWRFeHBvcnRzID0gdGhpcy5nZXRTeW1ib2xzT2YocmVzb2x2ZWRNb2R1bGUpO1xuICAgICAgICAgICAgbmVzdGVkRXhwb3J0cy5mb3JFYWNoKCh0YXJnZXRTeW1ib2wpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc291cmNlU3ltYm9sID0gdGhpcy5nZXRTdGF0aWNTeW1ib2woZmlsZVBhdGgsIHRhcmdldFN5bWJvbC5uYW1lKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZWRTeW1ib2xzLnB1c2godGhpcy5jcmVhdGVFeHBvcnQoc291cmNlU3ltYm9sLCB0YXJnZXRTeW1ib2wpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGhhbmRsZSB0aGUgYWN0dWFsIG1ldGFkYXRhLiBIYXMgdG8gYmUgYWZ0ZXIgdGhlIGV4cG9ydHNcbiAgICAvLyBhcyB0aGVyZSBtaWdodCBiZSBjb2xsaXNpb25zIGluIHRoZSBuYW1lcywgYW5kIHdlIHdhbnQgdGhlIHN5bWJvbHNcbiAgICAvLyBvZiB0aGUgY3VycmVudCBtb2R1bGUgdG8gd2luIG9mdGVyIHJlZXhwb3J0cy5cbiAgICBpZiAobWV0YWRhdGFbJ21ldGFkYXRhJ10pIHtcbiAgICAgIC8vIGhhbmRsZSBkaXJlY3QgZGVjbGFyYXRpb25zIG9mIHRoZSBzeW1ib2xcbiAgICAgIGNvbnN0IHRvcExldmVsU3ltYm9sTmFtZXMgPVxuICAgICAgICAgIG5ldyBTZXQ8c3RyaW5nPihPYmplY3Qua2V5cyhtZXRhZGF0YVsnbWV0YWRhdGEnXSkubWFwKHVuZXNjYXBlSWRlbnRpZmllcikpO1xuICAgICAgY29uc3Qgb3JpZ2luczoge1tpbmRleDogc3RyaW5nXTogc3RyaW5nfSA9IG1ldGFkYXRhWydvcmlnaW5zJ10gfHwge307XG4gICAgICBPYmplY3Qua2V5cyhtZXRhZGF0YVsnbWV0YWRhdGEnXSkuZm9yRWFjaCgobWV0YWRhdGFLZXkpID0+IHtcbiAgICAgICAgY29uc3Qgc3ltYm9sTWV0YSA9IG1ldGFkYXRhWydtZXRhZGF0YSddW21ldGFkYXRhS2V5XTtcbiAgICAgICAgY29uc3QgbmFtZSA9IHVuZXNjYXBlSWRlbnRpZmllcihtZXRhZGF0YUtleSk7XG5cbiAgICAgICAgY29uc3Qgc3ltYm9sID0gdGhpcy5nZXRTdGF0aWNTeW1ib2woZmlsZVBhdGgsIG5hbWUpO1xuXG4gICAgICAgIGNvbnN0IG9yaWdpbiA9IG9yaWdpbnMuaGFzT3duUHJvcGVydHkobWV0YWRhdGFLZXkpICYmIG9yaWdpbnNbbWV0YWRhdGFLZXldO1xuICAgICAgICBpZiAob3JpZ2luKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIHN5bWJvbCBpcyBmcm9tIGEgYnVuZGxlZCBpbmRleCwgdXNlIHRoZSBkZWNsYXJhdGlvbiBsb2NhdGlvbiBvZiB0aGVcbiAgICAgICAgICAvLyBzeW1ib2wgc28gcmVsYXRpdmUgcmVmZXJlbmNlcyAoc3VjaCBhcyAnLi9teS5odG1sJykgd2lsbCBiZSBjYWxjdWxhdGVkXG4gICAgICAgICAgLy8gY29ycmVjdGx5LlxuICAgICAgICAgIGNvbnN0IG9yaWdpbkZpbGVQYXRoID0gdGhpcy5yZXNvbHZlTW9kdWxlKG9yaWdpbiwgZmlsZVBhdGgpO1xuICAgICAgICAgIGlmICghb3JpZ2luRmlsZVBhdGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0RXJyb3IoXG4gICAgICAgICAgICAgICAgbmV3IEVycm9yKGBDb3VsZG4ndCByZXNvbHZlIG9yaWdpbmFsIHN5bWJvbCBmb3IgJHtvcmlnaW59IGZyb20gJHtmaWxlUGF0aH1gKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3ltYm9sUmVzb3VyY2VQYXRocy5zZXQoc3ltYm9sLCBvcmlnaW5GaWxlUGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlc29sdmVkU3ltYm9scy5wdXNoKFxuICAgICAgICAgICAgdGhpcy5jcmVhdGVSZXNvbHZlZFN5bWJvbChzeW1ib2wsIGZpbGVQYXRoLCB0b3BMZXZlbFN5bWJvbE5hbWVzLCBzeW1ib2xNZXRhKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVzb2x2ZWRTeW1ib2xzLmZvckVhY2goXG4gICAgICAgIChyZXNvbHZlZFN5bWJvbCkgPT4gdGhpcy5yZXNvbHZlZFN5bWJvbHMuc2V0KHJlc29sdmVkU3ltYm9sLnN5bWJvbCwgcmVzb2x2ZWRTeW1ib2wpKTtcbiAgICB0aGlzLnN5bWJvbEZyb21GaWxlLnNldChmaWxlUGF0aCwgcmVzb2x2ZWRTeW1ib2xzLm1hcChyZXNvbHZlZFN5bWJvbCA9PiByZXNvbHZlZFN5bWJvbC5zeW1ib2wpKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUmVzb2x2ZWRTeW1ib2woXG4gICAgICBzb3VyY2VTeW1ib2w6IFN0YXRpY1N5bWJvbCwgdG9wTGV2ZWxQYXRoOiBzdHJpbmcsIHRvcExldmVsU3ltYm9sTmFtZXM6IFNldDxzdHJpbmc+LFxuICAgICAgbWV0YWRhdGE6IGFueSk6IFJlc29sdmVkU3RhdGljU3ltYm9sIHtcbiAgICAvLyBGb3IgY2xhc3NlcyB0aGF0IGRvbid0IGhhdmUgQW5ndWxhciBzdW1tYXJpZXMgLyBtZXRhZGF0YSxcbiAgICAvLyB3ZSBvbmx5IGtlZXAgdGhlaXIgYXJpdHksIGJ1dCBub3RoaW5nIGVsc2VcbiAgICAvLyAoZS5nLiB0aGVpciBjb25zdHJ1Y3RvciBwYXJhbWV0ZXJzKS5cbiAgICAvLyBXZSBkbyB0aGlzIHRvIHByZXZlbnQgaW50cm9kdWNpbmcgZGVlcCBpbXBvcnRzXG4gICAgLy8gYXMgd2UgZGlkbid0IGdlbmVyYXRlIC5uZ2ZhY3RvcnkudHMgZmlsZXMgd2l0aCBwcm9wZXIgcmVleHBvcnRzLlxuICAgIGNvbnN0IGlzVHNGaWxlID0gVFMudGVzdChzb3VyY2VTeW1ib2wuZmlsZVBhdGgpO1xuICAgIGlmICh0aGlzLnN1bW1hcnlSZXNvbHZlci5pc0xpYnJhcnlGaWxlKHNvdXJjZVN5bWJvbC5maWxlUGF0aCkgJiYgIWlzVHNGaWxlICYmIG1ldGFkYXRhICYmXG4gICAgICAgIG1ldGFkYXRhWydfX3N5bWJvbGljJ10gPT09ICdjbGFzcycpIHtcbiAgICAgIGNvbnN0IHRyYW5zZm9ybWVkTWV0YSA9IHtfX3N5bWJvbGljOiAnY2xhc3MnLCBhcml0eTogbWV0YWRhdGEuYXJpdHl9O1xuICAgICAgcmV0dXJuIG5ldyBSZXNvbHZlZFN0YXRpY1N5bWJvbChzb3VyY2VTeW1ib2wsIHRyYW5zZm9ybWVkTWV0YSk7XG4gICAgfVxuXG4gICAgbGV0IF9vcmlnaW5hbEZpbGVNZW1vOiBzdHJpbmd8dW5kZWZpbmVkO1xuICAgIGNvbnN0IGdldE9yaWdpbmFsTmFtZTogKCkgPT4gc3RyaW5nID0gKCkgPT4ge1xuICAgICAgaWYgKCFfb3JpZ2luYWxGaWxlTWVtbykge1xuICAgICAgICAvLyBHdWVzcyB3aGF0IHRoZSBvcmlnaW5hbCBmaWxlIG5hbWUgaXMgZnJvbSB0aGUgcmVmZXJlbmNlLiBJZiBpdCBoYXMgYSBgLmQudHNgIGV4dGVuc2lvblxuICAgICAgICAvLyByZXBsYWNlIGl0IHdpdGggYC50c2AuIElmIGl0IGFscmVhZHkgaGFzIGAudHNgIGp1c3QgbGVhdmUgaXQgaW4gcGxhY2UuIElmIGl0IGRvZXNuJ3QgaGF2ZVxuICAgICAgICAvLyAudHMgb3IgLmQudHMsIGFwcGVuZCBgLnRzJy4gQWxzbywgaWYgaXQgaXMgaW4gYG5vZGVfbW9kdWxlc2AsIHRyaW0gdGhlIGBub2RlX21vZHVsZWBcbiAgICAgICAgLy8gbG9jYXRpb24gYXMgaXQgaXMgbm90IGltcG9ydGFudCB0byBmaW5kaW5nIHRoZSBmaWxlLlxuICAgICAgICBfb3JpZ2luYWxGaWxlTWVtbyA9XG4gICAgICAgICAgICB0aGlzLmhvc3QuZ2V0T3V0cHV0TmFtZSh0b3BMZXZlbFBhdGgucmVwbGFjZSgvKChcXC50cyl8KFxcLmRcXC50cyl8KSQvLCAnLnRzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXi4qbm9kZV9tb2R1bGVzWy9cXFxcXS8sICcnKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX29yaWdpbmFsRmlsZU1lbW87XG4gICAgfTtcblxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgY2xhc3MgUmVmZXJlbmNlVHJhbnNmb3JtZXIgZXh0ZW5kcyBWYWx1ZVRyYW5zZm9ybWVyIHtcbiAgICAgIHZpc2l0U3RyaW5nTWFwKG1hcDoge1trZXk6IHN0cmluZ106IGFueX0sIGZ1bmN0aW9uUGFyYW1zOiBzdHJpbmdbXSk6IGFueSB7XG4gICAgICAgIGNvbnN0IHN5bWJvbGljID0gbWFwWydfX3N5bWJvbGljJ107XG4gICAgICAgIGlmIChzeW1ib2xpYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNvbnN0IG9sZExlbiA9IGZ1bmN0aW9uUGFyYW1zLmxlbmd0aDtcbiAgICAgICAgICBmdW5jdGlvblBhcmFtcy5wdXNoKC4uLihtYXBbJ3BhcmFtZXRlcnMnXSB8fCBbXSkpO1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHN1cGVyLnZpc2l0U3RyaW5nTWFwKG1hcCwgZnVuY3Rpb25QYXJhbXMpO1xuICAgICAgICAgIGZ1bmN0aW9uUGFyYW1zLmxlbmd0aCA9IG9sZExlbjtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9IGVsc2UgaWYgKHN5bWJvbGljID09PSAncmVmZXJlbmNlJykge1xuICAgICAgICAgIGNvbnN0IG1vZHVsZSA9IG1hcFsnbW9kdWxlJ107XG4gICAgICAgICAgY29uc3QgbmFtZSA9IG1hcFsnbmFtZSddID8gdW5lc2NhcGVJZGVudGlmaWVyKG1hcFsnbmFtZSddKSA6IG1hcFsnbmFtZSddO1xuICAgICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBmaWxlUGF0aDogc3RyaW5nO1xuICAgICAgICAgIGlmIChtb2R1bGUpIHtcbiAgICAgICAgICAgIGZpbGVQYXRoID0gc2VsZi5yZXNvbHZlTW9kdWxlKG1vZHVsZSwgc291cmNlU3ltYm9sLmZpbGVQYXRoKSAhO1xuICAgICAgICAgICAgaWYgKCFmaWxlUGF0aCkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIF9fc3ltYm9saWM6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYENvdWxkIG5vdCByZXNvbHZlICR7bW9kdWxlfSByZWxhdGl2ZSB0byAke3NvdXJjZVN5bWJvbC5maWxlUGF0aH0uYCxcbiAgICAgICAgICAgICAgICBsaW5lOiBtYXAubGluZSxcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXI6IG1hcC5jaGFyYWN0ZXIsXG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IGdldE9yaWdpbmFsTmFtZSgpXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBfX3N5bWJvbGljOiAncmVzb2x2ZWQnLFxuICAgICAgICAgICAgICBzeW1ib2w6IHNlbGYuZ2V0U3RhdGljU3ltYm9sKGZpbGVQYXRoLCBuYW1lKSxcbiAgICAgICAgICAgICAgbGluZTogbWFwLmxpbmUsXG4gICAgICAgICAgICAgIGNoYXJhY3RlcjogbWFwLmNoYXJhY3RlcixcbiAgICAgICAgICAgICAgZmlsZU5hbWU6IGdldE9yaWdpbmFsTmFtZSgpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSBpZiAoZnVuY3Rpb25QYXJhbXMuaW5kZXhPZihuYW1lKSA+PSAwKSB7XG4gICAgICAgICAgICAvLyByZWZlcmVuY2UgdG8gYSBmdW5jdGlvbiBwYXJhbWV0ZXJcbiAgICAgICAgICAgIHJldHVybiB7X19zeW1ib2xpYzogJ3JlZmVyZW5jZScsIG5hbWU6IG5hbWV9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodG9wTGV2ZWxTeW1ib2xOYW1lcy5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuZ2V0U3RhdGljU3ltYm9sKHRvcExldmVsUGF0aCwgbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBhbWJpZW50IHZhbHVlXG4gICAgICAgICAgICBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzeW1ib2xpYyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgIHJldHVybiB7Li4ubWFwLCBmaWxlTmFtZTogZ2V0T3JpZ2luYWxOYW1lKCl9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBzdXBlci52aXNpdFN0cmluZ01hcChtYXAsIGZ1bmN0aW9uUGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB0cmFuc2Zvcm1lZE1ldGEgPSB2aXNpdFZhbHVlKG1ldGFkYXRhLCBuZXcgUmVmZXJlbmNlVHJhbnNmb3JtZXIoKSwgW10pO1xuICAgIGxldCB1bndyYXBwZWRUcmFuc2Zvcm1lZE1ldGEgPSB1bndyYXBSZXNvbHZlZE1ldGFkYXRhKHRyYW5zZm9ybWVkTWV0YSk7XG4gICAgaWYgKHVud3JhcHBlZFRyYW5zZm9ybWVkTWV0YSBpbnN0YW5jZW9mIFN0YXRpY1N5bWJvbCkge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRXhwb3J0KHNvdXJjZVN5bWJvbCwgdW53cmFwcGVkVHJhbnNmb3JtZWRNZXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSZXNvbHZlZFN0YXRpY1N5bWJvbChzb3VyY2VTeW1ib2wsIHRyYW5zZm9ybWVkTWV0YSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUV4cG9ydChzb3VyY2VTeW1ib2w6IFN0YXRpY1N5bWJvbCwgdGFyZ2V0U3ltYm9sOiBTdGF0aWNTeW1ib2wpOlxuICAgICAgUmVzb2x2ZWRTdGF0aWNTeW1ib2wge1xuICAgIHNvdXJjZVN5bWJvbC5hc3NlcnROb01lbWJlcnMoKTtcbiAgICB0YXJnZXRTeW1ib2wuYXNzZXJ0Tm9NZW1iZXJzKCk7XG4gICAgaWYgKHRoaXMuc3VtbWFyeVJlc29sdmVyLmlzTGlicmFyeUZpbGUoc291cmNlU3ltYm9sLmZpbGVQYXRoKSAmJlxuICAgICAgICB0aGlzLnN1bW1hcnlSZXNvbHZlci5pc0xpYnJhcnlGaWxlKHRhcmdldFN5bWJvbC5maWxlUGF0aCkpIHtcbiAgICAgIC8vIFRoaXMgY2FzZSBpcyBmb3IgYW4gbmcgbGlicmFyeSBpbXBvcnRpbmcgc3ltYm9scyBmcm9tIGEgcGxhaW4gdHMgbGlicmFyeVxuICAgICAgLy8gdHJhbnNpdGl2ZWx5LlxuICAgICAgLy8gTm90ZTogV2UgcmVseSBvbiB0aGUgZmFjdCB0aGF0IHdlIGRpc2NvdmVyIHN5bWJvbHMgaW4gdGhlIGRpcmVjdGlvblxuICAgICAgLy8gZnJvbSBzb3VyY2UgZmlsZXMgdG8gbGlicmFyeSBmaWxlc1xuICAgICAgdGhpcy5pbXBvcnRBcy5zZXQodGFyZ2V0U3ltYm9sLCB0aGlzLmdldEltcG9ydEFzKHNvdXJjZVN5bWJvbCkgfHwgc291cmNlU3ltYm9sKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSZXNvbHZlZFN0YXRpY1N5bWJvbChzb3VyY2VTeW1ib2wsIHRhcmdldFN5bWJvbCk7XG4gIH1cblxuICBwcml2YXRlIHJlcG9ydEVycm9yKGVycm9yOiBFcnJvciwgY29udGV4dD86IFN0YXRpY1N5bWJvbCwgcGF0aD86IHN0cmluZykge1xuICAgIGlmICh0aGlzLmVycm9yUmVjb3JkZXIpIHtcbiAgICAgIHRoaXMuZXJyb3JSZWNvcmRlcihlcnJvciwgKGNvbnRleHQgJiYgY29udGV4dC5maWxlUGF0aCkgfHwgcGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gbW9kdWxlIGFuIGFic29sdXRlIHBhdGggdG8gYSBtb2R1bGUgZmlsZS5cbiAgICovXG4gIHByaXZhdGUgZ2V0TW9kdWxlTWV0YWRhdGEobW9kdWxlOiBzdHJpbmcpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgbGV0IG1vZHVsZU1ldGFkYXRhID0gdGhpcy5tZXRhZGF0YUNhY2hlLmdldChtb2R1bGUpO1xuICAgIGlmICghbW9kdWxlTWV0YWRhdGEpIHtcbiAgICAgIGNvbnN0IG1vZHVsZU1ldGFkYXRhcyA9IHRoaXMuaG9zdC5nZXRNZXRhZGF0YUZvcihtb2R1bGUpO1xuICAgICAgaWYgKG1vZHVsZU1ldGFkYXRhcykge1xuICAgICAgICBsZXQgbWF4VmVyc2lvbiA9IC0xO1xuICAgICAgICBtb2R1bGVNZXRhZGF0YXMuZm9yRWFjaCgobWQpID0+IHtcbiAgICAgICAgICBpZiAobWQgJiYgbWRbJ3ZlcnNpb24nXSA+IG1heFZlcnNpb24pIHtcbiAgICAgICAgICAgIG1heFZlcnNpb24gPSBtZFsndmVyc2lvbiddO1xuICAgICAgICAgICAgbW9kdWxlTWV0YWRhdGEgPSBtZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCFtb2R1bGVNZXRhZGF0YSkge1xuICAgICAgICBtb2R1bGVNZXRhZGF0YSA9XG4gICAgICAgICAgICB7X19zeW1ib2xpYzogJ21vZHVsZScsIHZlcnNpb246IFNVUFBPUlRFRF9TQ0hFTUFfVkVSU0lPTiwgbW9kdWxlOiBtb2R1bGUsIG1ldGFkYXRhOiB7fX07XG4gICAgICB9XG4gICAgICBpZiAobW9kdWxlTWV0YWRhdGFbJ3ZlcnNpb24nXSAhPSBTVVBQT1JURURfU0NIRU1BX1ZFUlNJT04pIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gbW9kdWxlTWV0YWRhdGFbJ3ZlcnNpb24nXSA9PSAyID9cbiAgICAgICAgICAgIGBVbnN1cHBvcnRlZCBtZXRhZGF0YSB2ZXJzaW9uICR7bW9kdWxlTWV0YWRhdGFbJ3ZlcnNpb24nXX0gZm9yIG1vZHVsZSAke21vZHVsZX0uIFRoaXMgbW9kdWxlIHNob3VsZCBiZSBjb21waWxlZCB3aXRoIGEgbmV3ZXIgdmVyc2lvbiBvZiBuZ2NgIDpcbiAgICAgICAgICAgIGBNZXRhZGF0YSB2ZXJzaW9uIG1pc21hdGNoIGZvciBtb2R1bGUgJHttb2R1bGV9LCBmb3VuZCB2ZXJzaW9uICR7bW9kdWxlTWV0YWRhdGFbJ3ZlcnNpb24nXX0sIGV4cGVjdGVkICR7U1VQUE9SVEVEX1NDSEVNQV9WRVJTSU9OfWA7XG4gICAgICAgIHRoaXMucmVwb3J0RXJyb3IobmV3IEVycm9yKGVycm9yTWVzc2FnZSkpO1xuICAgICAgfVxuICAgICAgdGhpcy5tZXRhZGF0YUNhY2hlLnNldChtb2R1bGUsIG1vZHVsZU1ldGFkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIG1vZHVsZU1ldGFkYXRhO1xuICB9XG5cblxuICBnZXRTeW1ib2xCeU1vZHVsZShtb2R1bGU6IHN0cmluZywgc3ltYm9sTmFtZTogc3RyaW5nLCBjb250YWluaW5nRmlsZT86IHN0cmluZyk6IFN0YXRpY1N5bWJvbCB7XG4gICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLnJlc29sdmVNb2R1bGUobW9kdWxlLCBjb250YWluaW5nRmlsZSk7XG4gICAgaWYgKCFmaWxlUGF0aCkge1xuICAgICAgdGhpcy5yZXBvcnRFcnJvcihcbiAgICAgICAgICBuZXcgRXJyb3IoYENvdWxkIG5vdCByZXNvbHZlIG1vZHVsZSAke21vZHVsZX0ke2NvbnRhaW5pbmdGaWxlID8gJyByZWxhdGl2ZSB0byAnICtcbiAgICAgICAgICAgIGNvbnRhaW5pbmdGaWxlIDogJyd9YCkpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhdGljU3ltYm9sKGBFUlJPUjoke21vZHVsZX1gLCBzeW1ib2xOYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0U3RhdGljU3ltYm9sKGZpbGVQYXRoLCBzeW1ib2xOYW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZU1vZHVsZShtb2R1bGU6IHN0cmluZywgY29udGFpbmluZ0ZpbGU/OiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLmhvc3QubW9kdWxlTmFtZVRvRmlsZU5hbWUobW9kdWxlLCBjb250YWluaW5nRmlsZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgQ291bGQgbm90IHJlc29sdmUgbW9kdWxlICcke21vZHVsZX0nIHJlbGF0aXZlIHRvIGZpbGUgJHtjb250YWluaW5nRmlsZX1gKTtcbiAgICAgIHRoaXMucmVwb3J0RXJyb3IoZSwgdW5kZWZpbmVkLCBjb250YWluaW5nRmlsZSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8vIFJlbW92ZSBleHRyYSB1bmRlcnNjb3JlIGZyb20gZXNjYXBlZCBpZGVudGlmaWVyLlxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9ibG9iL21hc3Rlci9zcmMvY29tcGlsZXIvdXRpbGl0aWVzLnRzXG5leHBvcnQgZnVuY3Rpb24gdW5lc2NhcGVJZGVudGlmaWVyKGlkZW50aWZpZXI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBpZGVudGlmaWVyLnN0YXJ0c1dpdGgoJ19fXycpID8gaWRlbnRpZmllci5zdWJzdHIoMSkgOiBpZGVudGlmaWVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW53cmFwUmVzb2x2ZWRNZXRhZGF0YShtZXRhZGF0YTogYW55KTogYW55IHtcbiAgaWYgKG1ldGFkYXRhICYmIG1ldGFkYXRhLl9fc3ltYm9saWMgPT09ICdyZXNvbHZlZCcpIHtcbiAgICByZXR1cm4gbWV0YWRhdGEuc3ltYm9sO1xuICB9XG4gIHJldHVybiBtZXRhZGF0YTtcbn0iXX0=