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
        define("@angular/compiler-cli/src/transformers/compiler_host", ["require", "exports", "tslib", "@angular/compiler", "path", "typescript", "@angular/compiler-cli/src/ngtsc/compiler_host", "@angular/compiler-cli/src/transformers/metadata_reader", "@angular/compiler-cli/src/transformers/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var compiler_1 = require("@angular/compiler");
    var path = require("path");
    var ts = require("typescript");
    var compiler_host_1 = require("@angular/compiler-cli/src/ngtsc/compiler_host");
    var metadata_reader_1 = require("@angular/compiler-cli/src/transformers/metadata_reader");
    var util_1 = require("@angular/compiler-cli/src/transformers/util");
    var NODE_MODULES_PACKAGE_NAME = /node_modules\/((\w|-|\.)+|(@(\w|-|\.)+\/(\w|-|\.)+))/;
    var EXT = /(\.ts|\.d\.ts|\.js|\.jsx|\.tsx)$/;
    function createCompilerHost(_a) {
        var options = _a.options, _b = _a.tsHost, tsHost = _b === void 0 ? ts.createCompilerHost(options, true) : _b;
        if (options.enableIvy === 'ngtsc' || options.enableIvy === 'tsc') {
            return new compiler_host_1.NgtscCompilerHost(tsHost);
        }
        return tsHost;
    }
    exports.createCompilerHost = createCompilerHost;
    function assert(condition) {
        if (!condition) {
            // TODO(chuckjaz): do the right thing
        }
        return condition;
    }
    /**
     * Implements the following hosts based on an api.CompilerHost:
     * - ts.CompilerHost to be consumed by a ts.Program
     * - AotCompilerHost for @angular/compiler
     * - TypeCheckHost for mapping ts errors to ng errors (via translateDiagnostics)
     */
    var TsCompilerAotCompilerTypeCheckHostAdapter = /** @class */ (function () {
        function TsCompilerAotCompilerTypeCheckHostAdapter(rootFiles, options, context, metadataProvider, codeGenerator, librarySummaries) {
            if (librarySummaries === void 0) { librarySummaries = new Map(); }
            var _this = this;
            this.rootFiles = rootFiles;
            this.options = options;
            this.context = context;
            this.metadataProvider = metadataProvider;
            this.codeGenerator = codeGenerator;
            this.librarySummaries = librarySummaries;
            this.metadataReaderCache = metadata_reader_1.createMetadataReaderCache();
            this.fileNameToModuleNameCache = new Map();
            this.flatModuleIndexCache = new Map();
            this.flatModuleIndexNames = new Set();
            this.flatModuleIndexRedirectNames = new Set();
            this.originalSourceFiles = new Map();
            this.originalFileExistsCache = new Map();
            this.generatedSourceFiles = new Map();
            this.generatedCodeFor = new Map();
            this.emitter = new compiler_1.TypeScriptEmitter();
            this.getDefaultLibFileName = function (options) {
                return _this.context.getDefaultLibFileName(options);
            };
            this.getCurrentDirectory = function () { return _this.context.getCurrentDirectory(); };
            this.getCanonicalFileName = function (fileName) { return _this.context.getCanonicalFileName(fileName); };
            this.useCaseSensitiveFileNames = function () { return _this.context.useCaseSensitiveFileNames(); };
            this.getNewLine = function () { return _this.context.getNewLine(); };
            // Make sure we do not `host.realpath()` from TS as we do not want to resolve symlinks.
            // https://github.com/Microsoft/TypeScript/issues/9552
            this.realPath = function (p) { return p; };
            this.writeFile = this.context.writeFile.bind(this.context);
            this.moduleResolutionCache = ts.createModuleResolutionCache(this.context.getCurrentDirectory(), this.context.getCanonicalFileName.bind(this.context));
            var basePath = this.options.basePath;
            this.rootDirs =
                (this.options.rootDirs || [this.options.basePath]).map(function (p) { return path.resolve(basePath, p); });
            if (context.getDirectories) {
                this.getDirectories = function (path) { return context.getDirectories(path); };
            }
            if (context.directoryExists) {
                this.directoryExists = function (directoryName) { return context.directoryExists(directoryName); };
            }
            if (context.getCancellationToken) {
                this.getCancellationToken = function () { return context.getCancellationToken(); };
            }
            if (context.getDefaultLibLocation) {
                this.getDefaultLibLocation = function () { return context.getDefaultLibLocation(); };
            }
            if (context.trace) {
                this.trace = function (s) { return context.trace(s); };
            }
            if (context.fileNameToModuleName) {
                this.fileNameToModuleName = context.fileNameToModuleName.bind(context);
            }
            // Note: don't copy over context.moduleNameToFileName as we first
            // normalize undefined containingFile to a filled containingFile.
            if (context.resourceNameToFileName) {
                this.resourceNameToFileName = context.resourceNameToFileName.bind(context);
            }
            if (context.toSummaryFileName) {
                this.toSummaryFileName = context.toSummaryFileName.bind(context);
            }
            if (context.fromSummaryFileName) {
                this.fromSummaryFileName = context.fromSummaryFileName.bind(context);
            }
            this.metadataReaderHost = {
                cacheMetadata: function () { return true; },
                getSourceFileMetadata: function (filePath) {
                    var sf = _this.getOriginalSourceFile(filePath);
                    return sf ? _this.metadataProvider.getMetadata(sf) : undefined;
                },
                fileExists: function (filePath) { return _this.originalFileExists(filePath); },
                readFile: function (filePath) { return assert(_this.context.readFile(filePath)); },
            };
        }
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.resolveModuleName = function (moduleName, containingFile) {
            var rm = ts.resolveModuleName(moduleName, containingFile.replace(/\\/g, '/'), this.options, this, this.moduleResolutionCache)
                .resolvedModule;
            if (rm && this.isSourceFile(rm.resolvedFileName) && util_1.DTS.test(rm.resolvedFileName)) {
                // Case: generateCodeForLibraries = true and moduleName is
                // a .d.ts file in a node_modules folder.
                // Need to set isExternalLibraryImport to false so that generated files for that file
                // are emitted.
                rm.isExternalLibraryImport = false;
            }
            return rm;
        };
        // Note: We implement this method so that TypeScript and Angular share the same
        // ts.ModuleResolutionCache
        // and that we can tell ts.Program about our different opinion about
        // ResolvedModule.isExternalLibraryImport
        // (see our isSourceFile method).
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.resolveModuleNames = function (moduleNames, containingFile) {
            var _this = this;
            // TODO(tbosch): this seems to be a typing error in TypeScript,
            // as it contains assertions that the result contains the same number of entries
            // as the given module names.
            return moduleNames.map(function (moduleName) { return _this.resolveModuleName(moduleName, containingFile); });
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.moduleNameToFileName = function (m, containingFile) {
            if (!containingFile) {
                if (m.indexOf('.') === 0) {
                    throw new Error('Resolution of relative paths requires a containing file.');
                }
                // Any containing file gives the same result for absolute imports
                containingFile = this.rootFiles[0];
            }
            if (this.context.moduleNameToFileName) {
                return this.context.moduleNameToFileName(m, containingFile);
            }
            var resolved = this.resolveModuleName(m, containingFile);
            return resolved ? resolved.resolvedFileName : null;
        };
        /**
         * We want a moduleId that will appear in import statements in the generated code
         * which will be written to `containingFile`.
         *
         * Note that we also generate files for files in node_modules, as libraries
         * only ship .metadata.json files but not the generated code.
         *
         * Logic:
         * 1. if the importedFile and the containingFile are from the project sources
         *    or from the same node_modules package, use a relative path
         * 2. if the importedFile is in a node_modules package,
         *    use a path that starts with the package name.
         * 3. Error if the containingFile is in the node_modules package
         *    and the importedFile is in the project soures,
         *    as that is a violation of the principle that node_modules packages cannot
         *    import project sources.
         */
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.fileNameToModuleName = function (importedFile, containingFile) {
            var cacheKey = importedFile + ":" + containingFile;
            var moduleName = this.fileNameToModuleNameCache.get(cacheKey);
            if (moduleName != null) {
                return moduleName;
            }
            var originalImportedFile = importedFile;
            if (this.options.traceResolution) {
                console.error('fileNameToModuleName from containingFile', containingFile, 'to importedFile', importedFile);
            }
            // drop extension
            importedFile = importedFile.replace(EXT, '');
            var importedFilePackageName = getPackageName(importedFile);
            var containingFilePackageName = getPackageName(containingFile);
            if (importedFilePackageName === containingFilePackageName ||
                util_1.GENERATED_FILES.test(originalImportedFile)) {
                var rootedContainingFile = util_1.relativeToRootDirs(containingFile, this.rootDirs);
                var rootedImportedFile = util_1.relativeToRootDirs(importedFile, this.rootDirs);
                if (rootedContainingFile !== containingFile && rootedImportedFile !== importedFile) {
                    // if both files are contained in the `rootDirs`, then strip the rootDirs
                    containingFile = rootedContainingFile;
                    importedFile = rootedImportedFile;
                }
                moduleName = dotRelative(path.dirname(containingFile), importedFile);
            }
            else if (importedFilePackageName) {
                moduleName = stripNodeModulesPrefix(importedFile);
                if (originalImportedFile.endsWith('.d.ts')) {
                    // the moduleName for these typings could be shortented to the npm package name
                    // if the npm package typings matches the importedFile
                    try {
                        var modulePath = importedFile.substring(0, importedFile.length - moduleName.length) +
                            importedFilePackageName;
                        var packageJson = require(modulePath + '/package.json');
                        var packageTypings = path.posix.join(modulePath, packageJson.typings);
                        if (packageTypings === originalImportedFile) {
                            moduleName = importedFilePackageName;
                        }
                    }
                    catch (e) {
                        // the above require() will throw if there is no package.json file
                        // and this is safe to ignore and correct to keep the longer
                        // moduleName in this case
                    }
                }
            }
            else {
                throw new Error("Trying to import a source file from a node_modules package: import " + originalImportedFile + " from " + containingFile);
            }
            this.fileNameToModuleNameCache.set(cacheKey, moduleName);
            return moduleName;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.resourceNameToFileName = function (resourceName, containingFile) {
            // Note: we convert package paths into relative paths to be compatible with the the
            // previous implementation of UrlResolver.
            var firstChar = resourceName[0];
            if (firstChar === '/') {
                resourceName = resourceName.slice(1);
            }
            else if (firstChar !== '.') {
                resourceName = "./" + resourceName;
            }
            var filePathWithNgResource = this.moduleNameToFileName(addNgResourceSuffix(resourceName), containingFile);
            var result = filePathWithNgResource ? stripNgResourceSuffix(filePathWithNgResource) : null;
            // Used under Bazel to report more specific error with remediation advice
            if (!result && this.context.reportMissingResource) {
                this.context.reportMissingResource(resourceName);
            }
            return result;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.toSummaryFileName = function (fileName, referringSrcFileName) {
            return this.fileNameToModuleName(fileName, referringSrcFileName);
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.fromSummaryFileName = function (fileName, referringLibFileName) {
            var resolved = this.moduleNameToFileName(fileName, referringLibFileName);
            if (!resolved) {
                throw new Error("Could not resolve " + fileName + " from " + referringLibFileName);
            }
            return resolved;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.parseSourceSpanOf = function (fileName, line, character) {
            var data = this.generatedSourceFiles.get(fileName);
            if (data && data.emitCtx) {
                return data.emitCtx.spanOf(line, character);
            }
            return null;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.getOriginalSourceFile = function (filePath, languageVersion, onError) {
            // Note: we need the explicit check via `has` as we also cache results
            // that were null / undefined.
            if (this.originalSourceFiles.has(filePath)) {
                return this.originalSourceFiles.get(filePath);
            }
            if (!languageVersion) {
                languageVersion = this.options.target || ts.ScriptTarget.Latest;
            }
            // Note: This can also return undefined,
            // as the TS typings are not correct!
            var sf = this.context.getSourceFile(filePath, languageVersion, onError) || null;
            this.originalSourceFiles.set(filePath, sf);
            return sf;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.updateGeneratedFile = function (genFile) {
            if (!genFile.stmts) {
                throw new Error("Invalid Argument: Expected a GenerateFile with statements. " + genFile.genFileUrl);
            }
            var oldGenFile = this.generatedSourceFiles.get(genFile.genFileUrl);
            if (!oldGenFile) {
                throw new Error("Illegal State: previous GeneratedFile not found for " + genFile.genFileUrl + ".");
            }
            var newRefs = genFileExternalReferences(genFile);
            var oldRefs = oldGenFile.externalReferences;
            var refsAreEqual = oldRefs.size === newRefs.size;
            if (refsAreEqual) {
                newRefs.forEach(function (r) { return refsAreEqual = refsAreEqual && oldRefs.has(r); });
            }
            if (!refsAreEqual) {
                throw new Error("Illegal State: external references changed in " + genFile.genFileUrl + ".\nOld: " + Array.from(oldRefs) + ".\nNew: " + Array.from(newRefs));
            }
            return this.addGeneratedFile(genFile, newRefs);
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.addGeneratedFile = function (genFile, externalReferences) {
            if (!genFile.stmts) {
                throw new Error("Invalid Argument: Expected a GenerateFile with statements. " + genFile.genFileUrl);
            }
            var _a = this.emitter.emitStatementsAndContext(genFile.genFileUrl, genFile.stmts, /* preamble */ '', 
            /* emitSourceMaps */ false), sourceText = _a.sourceText, context = _a.context;
            var sf = ts.createSourceFile(genFile.genFileUrl, sourceText, this.options.target || ts.ScriptTarget.Latest);
            if ((this.options.module === ts.ModuleKind.AMD || this.options.module === ts.ModuleKind.UMD) &&
                this.context.amdModuleName) {
                var moduleName = this.context.amdModuleName(sf);
                if (moduleName)
                    sf.moduleName = moduleName;
            }
            this.generatedSourceFiles.set(genFile.genFileUrl, {
                sourceFile: sf,
                emitCtx: context, externalReferences: externalReferences,
            });
            return sf;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.shouldGenerateFile = function (fileName) {
            var _this = this;
            // TODO(tbosch): allow generating files that are not in the rootDir
            // See https://github.com/angular/angular/issues/19337
            if (!util_1.isInRootDir(fileName, this.options)) {
                return { generate: false };
            }
            var genMatch = util_1.GENERATED_FILES.exec(fileName);
            if (!genMatch) {
                return { generate: false };
            }
            var _a = tslib_1.__read(genMatch, 4), base = _a[1], genSuffix = _a[2], suffix = _a[3];
            if (suffix !== 'ts' && suffix !== 'tsx') {
                return { generate: false };
            }
            var baseFileName;
            if (genSuffix.indexOf('ngstyle') >= 0) {
                // Note: ngstyle files have names like `afile.css.ngstyle.ts`
                if (!this.originalFileExists(base)) {
                    return { generate: false };
                }
            }
            else {
                // Note: on-the-fly generated files always have a `.ts` suffix,
                // but the file from which we generated it can be a `.ts`/ `.tsx`/ `.d.ts`
                // (see options.generateCodeForLibraries).
                baseFileName = [base + ".ts", base + ".tsx", base + ".d.ts"].find(function (baseFileName) { return _this.isSourceFile(baseFileName) && _this.originalFileExists(baseFileName); });
                if (!baseFileName) {
                    return { generate: false };
                }
            }
            return { generate: true, baseFileName: baseFileName };
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.shouldGenerateFilesFor = function (fileName) {
            // TODO(tbosch): allow generating files that are not in the rootDir
            // See https://github.com/angular/angular/issues/19337
            return !util_1.GENERATED_FILES.test(fileName) && this.isSourceFile(fileName) &&
                util_1.isInRootDir(fileName, this.options);
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.getSourceFile = function (fileName, languageVersion, onError) {
            var _this = this;
            // Note: Don't exit early in this method to make sure
            // we always have up to date references on the file!
            var genFileNames = [];
            var sf = this.getGeneratedFile(fileName);
            if (!sf) {
                var summary = this.librarySummaries.get(fileName);
                if (summary) {
                    if (!summary.sourceFile) {
                        summary.sourceFile = ts.createSourceFile(fileName, summary.text, this.options.target || ts.ScriptTarget.Latest);
                    }
                    sf = summary.sourceFile;
                    genFileNames = [];
                }
            }
            if (!sf) {
                sf = this.getOriginalSourceFile(fileName);
                var cachedGenFiles = this.generatedCodeFor.get(fileName);
                if (cachedGenFiles) {
                    genFileNames = cachedGenFiles;
                }
                else {
                    if (!this.options.noResolve && this.shouldGenerateFilesFor(fileName)) {
                        genFileNames = this.codeGenerator.findGeneratedFileNames(fileName).filter(function (fileName) { return _this.shouldGenerateFile(fileName).generate; });
                    }
                    this.generatedCodeFor.set(fileName, genFileNames);
                }
            }
            if (sf) {
                addReferencesToSourceFile(sf, genFileNames);
            }
            // TODO(tbosch): TypeScript's typings for getSourceFile are incorrect,
            // as it can very well return undefined.
            return sf;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.getGeneratedFile = function (fileName) {
            var genSrcFile = this.generatedSourceFiles.get(fileName);
            if (genSrcFile) {
                return genSrcFile.sourceFile;
            }
            var _a = this.shouldGenerateFile(fileName), generate = _a.generate, baseFileName = _a.baseFileName;
            if (generate) {
                var genFile = this.codeGenerator.generateFile(fileName, baseFileName);
                return this.addGeneratedFile(genFile, genFileExternalReferences(genFile));
            }
            return null;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.originalFileExists = function (fileName) {
            var fileExists = this.originalFileExistsCache.get(fileName);
            if (fileExists == null) {
                fileExists = this.context.fileExists(fileName);
                this.originalFileExistsCache.set(fileName, fileExists);
            }
            return fileExists;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.fileExists = function (fileName) {
            fileName = stripNgResourceSuffix(fileName);
            if (this.librarySummaries.has(fileName) || this.generatedSourceFiles.has(fileName)) {
                return true;
            }
            if (this.shouldGenerateFile(fileName).generate) {
                return true;
            }
            return this.originalFileExists(fileName);
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.loadSummary = function (filePath) {
            var summary = this.librarySummaries.get(filePath);
            if (summary) {
                return summary.text;
            }
            if (this.originalFileExists(filePath)) {
                return assert(this.context.readFile(filePath));
            }
            return null;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.isSourceFile = function (filePath) {
            // Don't generate any files nor typecheck them
            // if skipTemplateCodegen is set and fullTemplateTypeCheck is not yet set,
            // for backwards compatibility.
            if (this.options.skipTemplateCodegen && !this.options.fullTemplateTypeCheck) {
                return false;
            }
            // If we have a summary from a previous compilation,
            // treat the file never as a source file.
            if (this.librarySummaries.has(filePath)) {
                return false;
            }
            if (util_1.GENERATED_FILES.test(filePath)) {
                return false;
            }
            if (this.options.generateCodeForLibraries === false && util_1.DTS.test(filePath)) {
                return false;
            }
            if (util_1.DTS.test(filePath)) {
                // Check for a bundle index.
                if (this.hasBundleIndex(filePath)) {
                    var normalFilePath = path.normalize(filePath);
                    return this.flatModuleIndexNames.has(normalFilePath) ||
                        this.flatModuleIndexRedirectNames.has(normalFilePath);
                }
            }
            return true;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.readFile = function (fileName) {
            var summary = this.librarySummaries.get(fileName);
            if (summary) {
                return summary.text;
            }
            return this.context.readFile(fileName);
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.getMetadataFor = function (filePath) {
            return metadata_reader_1.readMetadata(filePath, this.metadataReaderHost, this.metadataReaderCache);
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.loadResource = function (filePath) {
            if (this.context.readResource)
                return this.context.readResource(filePath);
            if (!this.originalFileExists(filePath)) {
                throw compiler_1.syntaxError("Error: Resource file not found: " + filePath);
            }
            return assert(this.context.readFile(filePath));
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.getOutputName = function (filePath) {
            return path.relative(this.getCurrentDirectory(), filePath);
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.hasBundleIndex = function (filePath) {
            var _this = this;
            var checkBundleIndex = function (directory) {
                var result = _this.flatModuleIndexCache.get(directory);
                if (result == null) {
                    if (path.basename(directory) == 'node_module') {
                        // Don't look outside the node_modules this package is installed in.
                        result = false;
                    }
                    else {
                        // A bundle index exists if the typings .d.ts file has a metadata.json that has an
                        // importAs.
                        try {
                            var packageFile = path.join(directory, 'package.json');
                            if (_this.originalFileExists(packageFile)) {
                                // Once we see a package.json file, assume false until it we find the bundle index.
                                result = false;
                                var packageContent = JSON.parse(assert(_this.context.readFile(packageFile)));
                                if (packageContent.typings) {
                                    var typings = path.normalize(path.join(directory, packageContent.typings));
                                    if (util_1.DTS.test(typings)) {
                                        var metadataFile = typings.replace(util_1.DTS, '.metadata.json');
                                        if (_this.originalFileExists(metadataFile)) {
                                            var metadata = JSON.parse(assert(_this.context.readFile(metadataFile)));
                                            if (metadata.flatModuleIndexRedirect) {
                                                _this.flatModuleIndexRedirectNames.add(typings);
                                                // Note: don't set result = true,
                                                // as this would mark this folder
                                                // as having a bundleIndex too early without
                                                // filling the bundleIndexNames.
                                            }
                                            else if (metadata.importAs) {
                                                _this.flatModuleIndexNames.add(typings);
                                                result = true;
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                var parent = path.dirname(directory);
                                if (parent != directory) {
                                    // Try the parent directory.
                                    result = checkBundleIndex(parent);
                                }
                                else {
                                    result = false;
                                }
                            }
                        }
                        catch (e) {
                            // If we encounter any errors assume we this isn't a bundle index.
                            result = false;
                        }
                    }
                    _this.flatModuleIndexCache.set(directory, result);
                }
                return result;
            };
            return checkBundleIndex(path.dirname(filePath));
        };
        return TsCompilerAotCompilerTypeCheckHostAdapter;
    }());
    exports.TsCompilerAotCompilerTypeCheckHostAdapter = TsCompilerAotCompilerTypeCheckHostAdapter;
    function genFileExternalReferences(genFile) {
        return new Set(compiler_1.collectExternalReferences(genFile.stmts).map(function (er) { return er.moduleName; }));
    }
    function addReferencesToSourceFile(sf, genFileNames) {
        // Note: as we modify ts.SourceFiles we need to keep the original
        // value for `referencedFiles` around in cache the original host is caching ts.SourceFiles.
        // Note: cloning the ts.SourceFile is expensive as the nodes in have parent pointers,
        // i.e. we would also need to clone and adjust all nodes.
        var originalReferencedFiles = sf.originalReferencedFiles;
        if (!originalReferencedFiles) {
            originalReferencedFiles = sf.referencedFiles;
            sf.originalReferencedFiles = originalReferencedFiles;
        }
        var newReferencedFiles = tslib_1.__spread(originalReferencedFiles);
        genFileNames.forEach(function (gf) { return newReferencedFiles.push({ fileName: gf, pos: 0, end: 0 }); });
        sf.referencedFiles = newReferencedFiles;
    }
    function getOriginalReferences(sourceFile) {
        return sourceFile && sourceFile.originalReferencedFiles;
    }
    exports.getOriginalReferences = getOriginalReferences;
    function dotRelative(from, to) {
        var rPath = path.relative(from, to).replace(/\\/g, '/');
        return rPath.startsWith('.') ? rPath : './' + rPath;
    }
    /**
     * Moves the path into `genDir` folder while preserving the `node_modules` directory.
     */
    function getPackageName(filePath) {
        var match = NODE_MODULES_PACKAGE_NAME.exec(filePath);
        return match ? match[1] : null;
    }
    function stripNodeModulesPrefix(filePath) {
        return filePath.replace(/.*node_modules\//, '');
    }
    function getNodeModulesPrefix(filePath) {
        var match = /.*node_modules\//.exec(filePath);
        return match ? match[1] : null;
    }
    function stripNgResourceSuffix(fileName) {
        return fileName.replace(/\.\$ngresource\$.*/, '');
    }
    function addNgResourceSuffix(fileName) {
        return fileName + ".$ngresource$";
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXJfaG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvdHJhbnNmb3JtZXJzL2NvbXBpbGVyX2hvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7O0lBRUgsOENBQXVMO0lBQ3ZMLDJCQUE2QjtJQUM3QiwrQkFBaUM7SUFJakMsK0VBQXlEO0lBR3pELDBGQUE4RjtJQUM5RixvRUFBNkU7SUFFN0UsSUFBTSx5QkFBeUIsR0FBRyxzREFBc0QsQ0FBQztJQUN6RixJQUFNLEdBQUcsR0FBRyxrQ0FBa0MsQ0FBQztJQUUvQyw0QkFDSSxFQUN3RDtZQUR2RCxvQkFBTyxFQUFFLGNBQTZDLEVBQTdDLGtFQUE2QztRQUV6RCxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSyxFQUFFO1lBQ2hFLE9BQU8sSUFBSSxpQ0FBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN0QztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFQRCxnREFPQztJQWlCRCxnQkFBbUIsU0FBK0I7UUFDaEQsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLHFDQUFxQztTQUN0QztRQUNELE9BQU8sU0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNIO1FBMEJFLG1EQUNZLFNBQWdDLEVBQVUsT0FBd0IsRUFDbEUsT0FBcUIsRUFBVSxnQkFBa0MsRUFDakUsYUFBNEIsRUFDNUIsZ0JBQW9EO1lBQXBELGlDQUFBLEVBQUEsdUJBQXVCLEdBQUcsRUFBMEI7WUFKaEUsaUJBZ0RDO1lBL0NXLGNBQVMsR0FBVCxTQUFTLENBQXVCO1lBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7WUFDbEUsWUFBTyxHQUFQLE9BQU8sQ0FBYztZQUFVLHFCQUFnQixHQUFoQixnQkFBZ0Is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Q3BELENBQUM7SUFFRCw2QkFBNkIsUUFBZ0I7UUFDM0MsT0FBVSxRQUFRLGtCQUFlLENBQUM7SUFDcEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBb3RDb21waWxlckhvc3QsIEVtaXR0ZXJWaXNpdG9yQ29udGV4dCwgRXh0ZXJuYWxSZWZlcmVuY2UsIEdlbmVyYXRlZEZpbGUsIFBhcnNlU291cmNlU3BhbiwgVHlwZVNjcmlwdEVtaXR0ZXIsIGNvbGxlY3RFeHRlcm5hbFJlZmVyZW5jZXMsIHN5bnRheEVycm9yfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7VHlwZUNoZWNrSG9zdH0gZnJvbSAnLi4vZGlhZ25vc3RpY3MvdHJhbnNsYXRlX2RpYWdub3N0aWNzJztcbmltcG9ydCB7TUVUQURBVEFfVkVSU0lPTiwgTW9kdWxlTWV0YWRhdGF9IGZyb20gJy4uL21ldGFkYXRhL2luZGV4JztcbmltcG9ydCB7Tmd0c2NDb21waWxlckhvc3R9IGZyb20gJy4uL25ndHNjL2NvbXBpbGVyX2hvc3QnO1xuXG5pbXBvcnQge0NvbXBpbGVySG9zdCwgQ29tcGlsZXJPcHRpb25zLCBMaWJyYXJ5U3VtbWFyeX0gZnJvbSAnLi9hcGknO1xuaW1wb3J0IHtNZXRhZGF0YVJlYWRlckhvc3QsIGNyZWF0ZU1ldGFkYXRhUmVhZGVyQ2FjaGUsIHJlYWRNZXRhZGF0YX0gZnJvbSAnLi9tZXRhZGF0YV9yZWFkZXInO1xuaW1wb3J0IHtEVFMsIEdFTkVSQVRFRF9GSUxFUywgaXNJblJvb3REaXIsIHJlbGF0aXZlVG9Sb290RGlyc30gZnJvbSAnLi91dGlsJztcblxuY29uc3QgTk9ERV9NT0RVTEVTX1BBQ0tBR0VfTkFNRSA9IC9ub2RlX21vZHVsZXNcXC8oKFxcd3wtfFxcLikrfChAKFxcd3wtfFxcLikrXFwvKFxcd3wtfFxcLikrKSkvO1xuY29uc3QgRVhUID0gLyhcXC50c3xcXC5kXFwudHN8XFwuanN8XFwuanN4fFxcLnRzeCkkLztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbXBpbGVySG9zdChcbiAgICB7b3B0aW9ucywgdHNIb3N0ID0gdHMuY3JlYXRlQ29tcGlsZXJIb3N0KG9wdGlvbnMsIHRydWUpfTpcbiAgICAgICAge29wdGlvbnM6IENvbXBpbGVyT3B0aW9ucywgdHNIb3N0PzogdHMuQ29tcGlsZXJIb3N0fSk6IENvbXBpbGVySG9zdCB7XG4gIGlmIChvcHRpb25zLmVuYWJsZUl2eSA9PT0gJ25ndHNjJyB8fCBvcHRpb25zLmVuYWJsZUl2eSA9PT0gJ3RzYycpIHtcbiAgICByZXR1cm4gbmV3IE5ndHNjQ29tcGlsZXJIb3N0KHRzSG9zdCk7XG4gIH1cbiAgcmV0dXJuIHRzSG9zdDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZXRhZGF0YVByb3ZpZGVyIHtcbiAgZ2V0TWV0YWRhdGEoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSk6IE1vZHVsZU1ldGFkYXRhfHVuZGVmaW5lZDtcbn1cblxuaW50ZXJmYWNlIEdlblNvdXJjZUZpbGUge1xuICBleHRlcm5hbFJlZmVyZW5jZXM6IFNldDxzdHJpbmc+O1xuICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlO1xuICBlbWl0Q3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29kZUdlbmVyYXRvciB7XG4gIGdlbmVyYXRlRmlsZShnZW5GaWxlTmFtZTogc3RyaW5nLCBiYXNlRmlsZU5hbWU/OiBzdHJpbmcpOiBHZW5lcmF0ZWRGaWxlO1xuICBmaW5kR2VuZXJhdGVkRmlsZU5hbWVzKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmdbXTtcbn1cblxuZnVuY3Rpb24gYXNzZXJ0PFQ+KGNvbmRpdGlvbjogVCB8IG51bGwgfCB1bmRlZmluZWQpIHtcbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAvLyBUT0RPKGNodWNramF6KTogZG8gdGhlIHJpZ2h0IHRoaW5nXG4gIH1cbiAgcmV0dXJuIGNvbmRpdGlvbiAhO1xufVxuXG4vKipcbiAqIEltcGxlbWVudHMgdGhlIGZvbGxvd2luZyBob3N0cyBiYXNlZCBvbiBhbiBhcGkuQ29tcGlsZXJIb3N0OlxuICogLSB0cy5Db21waWxlckhvc3QgdG8gYmUgY29uc3VtZWQgYnkgYSB0cy5Qcm9ncmFtXG4gKiAtIEFvdENvbXBpbGVySG9zdCBmb3IgQGFuZ3VsYXIvY29tcGlsZXJcbiAqIC0gVHlwZUNoZWNrSG9zdCBmb3IgbWFwcGluZyB0cyBlcnJvcnMgdG8gbmcgZXJyb3JzICh2aWEgdHJhbnNsYXRlRGlhZ25vc3RpY3MpXG4gKi9cbmV4cG9ydCBjbGFzcyBUc0NvbXBpbGVyQW90Q29tcGlsZXJUeXBlQ2hlY2tIb3N0QWRhcHRlciBpbXBsZW1lbnRzIHRzLkNvbXBpbGVySG9zdCwgQW90Q29tcGlsZXJIb3N0LFxuICAgIFR5cGVDaGVja0hvc3Qge1xuICBwcml2YXRlIG1ldGFkYXRhUmVhZGVyQ2FjaGUgPSBjcmVhdGVNZXRhZGF0YVJlYWRlckNhY2hlKCk7XG4gIHByaXZhdGUgZmlsZU5hbWVUb01vZHVsZU5hbWVDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gIHByaXZhdGUgZmxhdE1vZHVsZUluZGV4Q2FjaGUgPSBuZXcgTWFwPHN0cmluZywgYm9vbGVhbj4oKTtcbiAgcHJpdmF0ZSBmbGF0TW9kdWxlSW5kZXhOYW1lcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBwcml2YXRlIGZsYXRNb2R1bGVJbmRleFJlZGlyZWN0TmFtZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgcHJpdmF0ZSByb290RGlyczogc3RyaW5nW107XG4gIHByaXZhdGUgbW9kdWxlUmVzb2x1dGlvbkNhY2hlOiB0cy5Nb2R1bGVSZXNvbHV0aW9uQ2FjaGU7XG4gIHByaXZhdGUgb3JpZ2luYWxTb3VyY2VGaWxlcyA9IG5ldyBNYXA8c3RyaW5nLCB0cy5Tb3VyY2VGaWxlfG51bGw+KCk7XG4gIHByaXZhdGUgb3JpZ2luYWxGaWxlRXhpc3RzQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywgYm9vbGVhbj4oKTtcbiAgcHJpdmF0ZSBnZW5lcmF0ZWRTb3VyY2VGaWxlcyA9IG5ldyBNYXA8c3RyaW5nLCBHZW5Tb3VyY2VGaWxlPigpO1xuICBwcml2YXRlIGdlbmVyYXRlZENvZGVGb3IgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nW10+KCk7XG4gIHByaXZhdGUgZW1pdHRlciA9IG5ldyBUeXBlU2NyaXB0RW1pdHRlcigpO1xuICBwcml2YXRlIG1ldGFkYXRhUmVhZGVySG9zdDogTWV0YWRhdGFSZWFkZXJIb3N0O1xuXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBnZXRDYW5jZWxsYXRpb25Ub2tlbiAhOiAoKSA9PiB0cy5DYW5jZWxsYXRpb25Ub2tlbjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIGdldERlZmF1bHRMaWJMb2NhdGlvbiAhOiAoKSA9PiBzdHJpbmc7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICB0cmFjZSAhOiAoczogc3RyaW5nKSA9PiB2b2lkO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgZ2V0RGlyZWN0b3JpZXMgITogKHBhdGg6IHN0cmluZykgPT4gc3RyaW5nW107XG4gIGRpcmVjdG9yeUV4aXN0cz86IChkaXJlY3RvcnlOYW1lOiBzdHJpbmcpID0+IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvb3RGaWxlczogUmVhZG9ubHlBcnJheTxzdHJpbmc+LCBwcml2YXRlIG9wdGlvbnM6IENvbXBpbGVyT3B0aW9ucyxcbiAgICAgIHByaXZhdGUgY29udGV4dDogQ29tcGlsZXJIb3N0LCBwcml2YXRlIG1ldGFkYXRhUHJvdmlkZXI6IE1ldGFkYXRhUHJvdmlkZXIsXG4gICAgICBwcml2YXRlIGNvZGVHZW5lcmF0b3I6IENvZGVHZW5lcmF0b3IsXG4gICAgICBwcml2YXRlIGxpYnJhcnlTdW1tYXJpZXMgPSBuZXcgTWFwPHN0cmluZywgTGlicmFyeVN1bW1hcnk+KCkpIHtcbiAgICB0aGlzLm1vZHVsZVJlc29sdXRpb25DYWNoZSA9IHRzLmNyZWF0ZU1vZHVsZVJlc29sdXRpb25DYWNoZShcbiAgICAgICAgdGhpcy5jb250ZXh0LmdldEN1cnJlbnREaXJlY3RvcnkgISgpLCB0aGlzLmNvbnRleHQuZ2V0Q2Fub25pY2FsRmlsZU5hbWUuYmluZCh0aGlzLmNvbnRleHQpKTtcbiAgICBjb25zdCBiYXNlUGF0aCA9IHRoaXMub3B0aW9ucy5iYXNlUGF0aCAhO1xuICAgIHRoaXMucm9vdERpcnMgPVxuICAgICAgICAodGhpcy5vcHRpb25zLnJvb3REaXJzIHx8IFt0aGlzLm9wdGlvbnMuYmFzZVBhdGggIV0pLm1hcChwID0+IHBhdGgucmVzb2x2ZShiYXNlUGF0aCwgcCkpO1xuICAgIGlmIChjb250ZXh0LmdldERpcmVjdG9yaWVzKSB7XG4gICAgICB0aGlzLmdldERpcmVjdG9yaWVzID0gcGF0aCA9PiBjb250ZXh0LmdldERpcmVjdG9yaWVzICEocGF0aCk7XG4gICAgfVxuICAgIGlmIChjb250ZXh0LmRpcmVjdG9yeUV4aXN0cykge1xuICAgICAgdGhpcy5kaXJlY3RvcnlFeGlzdHMgPSBkaXJlY3RvcnlOYW1lID0+IGNvbnRleHQuZGlyZWN0b3J5RXhpc3RzICEoZGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICAgIGlmIChjb250ZXh0LmdldENhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICB0aGlzLmdldENhbmNlbGxhdGlvblRva2VuID0gKCkgPT4gY29udGV4dC5nZXRDYW5jZWxsYXRpb25Ub2tlbiAhKCk7XG4gICAgfVxuICAgIGlmIChjb250ZXh0LmdldERlZmF1bHRMaWJMb2NhdGlvbikge1xuICAgICAgdGhpcy5nZXREZWZhdWx0TGliTG9jYXRpb24gPSAoKSA9PiBjb250ZXh0LmdldERlZmF1bHRMaWJMb2NhdGlvbiAhKCk7XG4gICAgfVxuICAgIGlmIChjb250ZXh0LnRyYWNlKSB7XG4gICAgICB0aGlzLnRyYWNlID0gcyA9PiBjb250ZXh0LnRyYWNlICEocyk7XG4gICAgfVxuICAgIGlmIChjb250ZXh0LmZpbGVOYW1lVG9Nb2R1bGVOYW1lKSB7XG4gICAgICB0aGlzLmZpbGVOYW1lVG9Nb2R1bGVOYW1lID0gY29udGV4dC5maWxlTmFtZVRvTW9kdWxlTmFtZS5iaW5kKGNvbnRleHQpO1xuICAgIH1cbiAgICAvLyBOb3RlOiBkb24ndCBjb3B5IG92ZXIgY29udGV4dC5tb2R1bGVOYW1lVG9GaWxlTmFtZSBhcyB3ZSBmaXJzdFxuICAgIC8vIG5vcm1hbGl6ZSB1bmRlZmluZWQgY29udGFpbmluZ0ZpbGUgdG8gYSBmaWxsZWQgY29udGFpbmluZ0ZpbGUuXG4gICAgaWYgKGNvbnRleHQucmVzb3VyY2VOYW1lVG9GaWxlTmFtZSkge1xuICAgICAgdGhpcy5yZXNvdXJjZU5hbWVUb0ZpbGVOYW1lID0gY29udGV4dC5yZXNvdXJjZU5hbWVUb0ZpbGVOYW1lLmJpbmQoY29udGV4dCk7XG4gICAgfVxuICAgIGlmIChjb250ZXh0LnRvU3VtbWFyeUZpbGVOYW1lKSB7XG4gICAgICB0aGlzLnRvU3VtbWFyeUZpbGVOYW1lID0gY29udGV4dC50b1N1bW1hcnlGaWxlTmFtZS5iaW5kKGNvbnRleHQpO1xuICAgIH1cbiAgICBpZiAoY29udGV4dC5mcm9tU3VtbWFyeUZpbGVOYW1lKSB7XG4gICAgICB0aGlzLmZyb21TdW1tYXJ5RmlsZU5hbWUgPSBjb250ZXh0LmZyb21TdW1tYXJ5RmlsZU5hbWUuYmluZChjb250ZXh0KTtcbiAgICB9XG4gICAgdGhpcy5tZXRhZGF0YVJlYWRlckhvc3QgPSB7XG4gICAgICBjYWNoZU1ldGFkYXRhOiAoKSA9PiB0cnVlLFxuICAgICAgZ2V0U291cmNlRmlsZU1ldGFkYXRhOiAoZmlsZVBhdGgpID0+IHtcbiAgICAgICAgY29uc3Qgc2YgPSB0aGlzLmdldE9yaWdpbmFsU291cmNlRmlsZShmaWxlUGF0aCk7XG4gICAgICAgIHJldHVybiBzZiA/IHRoaXMubWV0YWRhdGFQcm92aWRlci5nZXRNZXRhZGF0YShzZikgOiB1bmRlZmluZWQ7XG4gICAgICB9LFxuICAgICAgZmlsZUV4aXN0czogKGZpbGVQYXRoKSA9PiB0aGlzLm9yaWdpbmFsRmlsZUV4aXN0cyhmaWxlUGF0aCksXG4gICAgICByZWFkRmlsZTogKGZpbGVQYXRoKSA9PiBhc3NlcnQodGhpcy5jb250ZXh0LnJlYWRGaWxlKGZpbGVQYXRoKSksXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZU1vZHVsZU5hbWUobW9kdWxlTmFtZTogc3RyaW5nLCBjb250YWluaW5nRmlsZTogc3RyaW5nKTogdHMuUmVzb2x2ZWRNb2R1bGVcbiAgICAgIHx1bmRlZmluZWQge1xuICAgIGNvbnN0IHJtID0gdHMucmVzb2x2ZU1vZHVsZU5hbWUoXG4gICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lLCBjb250YWluaW5nRmlsZS5yZXBsYWNlKC9cXFxcL2csICcvJyksIHRoaXMub3B0aW9ucywgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlUmVzb2x1dGlvbkNhY2hlKVxuICAgICAgICAgICAgICAgICAgIC5yZXNvbHZlZE1vZHVsZTtcbiAgICBpZiAocm0gJiYgdGhpcy5pc1NvdXJjZUZpbGUocm0ucmVzb2x2ZWRGaWxlTmFtZSkgJiYgRFRTLnRlc3Qocm0ucmVzb2x2ZWRGaWxlTmFtZSkpIHtcbiAgICAgIC8vIENhc2U6IGdlbmVyYXRlQ29kZUZvckxpYnJhcmllcyA9IHRydWUgYW5kIG1vZHVsZU5hbWUgaXNcbiAgICAgIC8vIGEgLmQudHMgZmlsZSBpbiBhIG5vZGVfbW9kdWxlcyBmb2xkZXIuXG4gICAgICAvLyBOZWVkIHRvIHNldCBpc0V4dGVybmFsTGlicmFyeUltcG9ydCB0byBmYWxzZSBzbyB0aGF0IGdlbmVyYXRlZCBmaWxlcyBmb3IgdGhhdCBmaWxlXG4gICAgICAvLyBhcmUgZW1pdHRlZC5cbiAgICAgIHJtLmlzRXh0ZXJuYWxMaWJyYXJ5SW1wb3J0ID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBybTtcbiAgfVxuXG4gIC8vIE5vdGU6IFdlIGltcGxlbWVudCB0aGlzIG1ldGhvZCBzbyB0aGF0IFR5cGVTY3JpcHQgYW5kIEFuZ3VsYXIgc2hhcmUgdGhlIHNhbWVcbiAgLy8gdHMuTW9kdWxlUmVzb2x1dGlvbkNhY2hlXG4gIC8vIGFuZCB0aGF0IHdlIGNhbiB0ZWxsIHRzLlByb2dyYW0gYWJvdXQgb3VyIGRpZmZlcmVudCBvcGluaW9uIGFib3V0XG4gIC8vIFJlc29sdmVkTW9kdWxlLmlzRXh0ZXJuYWxMaWJyYXJ5SW1wb3J0XG4gIC8vIChzZWUgb3VyIGlzU291cmNlRmlsZSBtZXRob2QpLlxuICByZXNvbHZlTW9kdWxlTmFtZXMobW9kdWxlTmFtZXM6IHN0cmluZ1tdLCBjb250YWluaW5nRmlsZTogc3RyaW5nKTogdHMuUmVzb2x2ZWRNb2R1bGVbXSB7XG4gICAgLy8gVE9ETyh0Ym9zY2gpOiB0aGlzIHNlZW1zIHRvIGJlIGEgdHlwaW5nIGVycm9yIGluIFR5cGVTY3JpcHQsXG4gICAgLy8gYXMgaXQgY29udGFpbnMgYXNzZXJ0aW9ucyB0aGF0IHRoZSByZXN1bHQgY29udGFpbnMgdGhlIHNhbWUgbnVtYmVyIG9mIGVudHJpZXNcbiAgICAvLyBhcyB0aGUgZ2l2ZW4gbW9kdWxlIG5hbWVzLlxuICAgIHJldHVybiA8dHMuUmVzb2x2ZWRNb2R1bGVbXT5tb2R1bGVOYW1lcy5tYXAoXG4gICAgICAgIG1vZHVsZU5hbWUgPT4gdGhpcy5yZXNvbHZlTW9kdWxlTmFtZShtb2R1bGVOYW1lLCBjb250YWluaW5nRmlsZSkpO1xuICB9XG5cbiAgbW9kdWxlTmFtZVRvRmlsZU5hbWUobTogc3RyaW5nLCBjb250YWluaW5nRmlsZT86IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICBpZiAoIWNvbnRhaW5pbmdGaWxlKSB7XG4gICAgICBpZiAobS5pbmRleE9mKCcuJykgPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXNvbHV0aW9uIG9mIHJlbGF0aXZlIHBhdGhzIHJlcXVpcmVzIGEgY29udGFpbmluZyBmaWxlLicpO1xuICAgICAgfVxuICAgICAgLy8gQW55IGNvbnRhaW5pbmcgZmlsZSBnaXZlcyB0aGUgc2FtZSByZXN1bHQgZm9yIGFic29sdXRlIGltcG9ydHNcbiAgICAgIGNvbnRhaW5pbmdGaWxlID0gdGhpcy5yb290RmlsZXNbMF07XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbnRleHQubW9kdWxlTmFtZVRvRmlsZU5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQubW9kdWxlTmFtZVRvRmlsZU5hbWUobSwgY29udGFpbmluZ0ZpbGUpO1xuICAgIH1cbiAgICBjb25zdCByZXNvbHZlZCA9IHRoaXMucmVzb2x2ZU1vZHVsZU5hbWUobSwgY29udGFpbmluZ0ZpbGUpO1xuICAgIHJldHVybiByZXNvbHZlZCA/IHJlc29sdmVkLnJlc29sdmVkRmlsZU5hbWUgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIHdhbnQgYSBtb2R1bGVJZCB0aGF0IHdpbGwgYXBwZWFyIGluIGltcG9ydCBzdGF0ZW1lbnRzIGluIHRoZSBnZW5lcmF0ZWQgY29kZVxuICAgKiB3aGljaCB3aWxsIGJlIHdyaXR0ZW4gdG8gYGNvbnRhaW5pbmdGaWxlYC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHdlIGFsc28gZ2VuZXJhdGUgZmlsZXMgZm9yIGZpbGVzIGluIG5vZGVfbW9kdWxlcywgYXMgbGlicmFyaWVzXG4gICAqIG9ubHkgc2hpcCAubWV0YWRhdGEuanNvbiBmaWxlcyBidXQgbm90IHRoZSBnZW5lcmF0ZWQgY29kZS5cbiAgICpcbiAgICogTG9naWM6XG4gICAqIDEuIGlmIHRoZSBpbXBvcnRlZEZpbGUgYW5kIHRoZSBjb250YWluaW5nRmlsZSBhcmUgZnJvbSB0aGUgcHJvamVjdCBzb3VyY2VzXG4gICAqICAgIG9yIGZyb20gdGhlIHNhbWUgbm9kZV9tb2R1bGVzIHBhY2thZ2UsIHVzZSBhIHJlbGF0aXZlIHBhdGhcbiAgICogMi4gaWYgdGhlIGltcG9ydGVkRmlsZSBpcyBpbiBhIG5vZGVfbW9kdWxlcyBwYWNrYWdlLFxuICAgKiAgICB1c2UgYSBwYXRoIHRoYXQgc3RhcnRzIHdpdGggdGhlIHBhY2thZ2UgbmFtZS5cbiAgICogMy4gRXJyb3IgaWYgdGhlIGNvbnRhaW5pbmdGaWxlIGlzIGluIHRoZSBub2RlX21vZHVsZXMgcGFja2FnZVxuICAgKiAgICBhbmQgdGhlIGltcG9ydGVkRmlsZSBpcyBpbiB0aGUgcHJvamVjdCBzb3VyZXMsXG4gICAqICAgIGFzIHRoYXQgaXMgYSB2aW9sYXRpb24gb2YgdGhlIHByaW5jaXBsZSB0aGF0IG5vZGVfbW9kdWxlcyBwYWNrYWdlcyBjYW5ub3RcbiAgICogICAgaW1wb3J0IHByb2plY3Qgc291cmNlcy5cbiAgICovXG4gIGZpbGVOYW1lVG9Nb2R1bGVOYW1lKGltcG9ydGVkRmlsZTogc3RyaW5nLCBjb250YWluaW5nRmlsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBjYWNoZUtleSA9IGAke2ltcG9ydGVkRmlsZX06JHtjb250YWluaW5nRmlsZX1gO1xuICAgIGxldCBtb2R1bGVOYW1lID0gdGhpcy5maWxlTmFtZVRvTW9kdWxlTmFtZUNhY2hlLmdldChjYWNoZUtleSk7XG4gICAgaWYgKG1vZHVsZU5hbWUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG1vZHVsZU5hbWU7XG4gICAgfVxuXG4gICAgY29uc3Qgb3JpZ2luYWxJbXBvcnRlZEZpbGUgPSBpbXBvcnRlZEZpbGU7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmFjZVJlc29sdXRpb24pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgJ2ZpbGVOYW1lVG9Nb2R1bGVOYW1lIGZyb20gY29udGFpbmluZ0ZpbGUnLCBjb250YWluaW5nRmlsZSwgJ3RvIGltcG9ydGVkRmlsZScsXG4gICAgICAgICAgaW1wb3J0ZWRGaWxlKTtcbiAgICB9XG5cbiAgICAvLyBkcm9wIGV4dGVuc2lvblxuICAgIGltcG9ydGVkRmlsZSA9IGltcG9ydGVkRmlsZS5yZXBsYWNlKEVYVCwgJycpO1xuICAgIGNvbnN0IGltcG9ydGVkRmlsZVBhY2thZ2VOYW1lID0gZ2V0UGFja2FnZU5hbWUoaW1wb3J0ZWRGaWxlKTtcbiAgICBjb25zdCBjb250YWluaW5nRmlsZVBhY2thZ2VOYW1lID0gZ2V0UGFja2FnZU5hbWUoY29udGFpbmluZ0ZpbGUpO1xuXG4gICAgaWYgKGltcG9ydGVkRmlsZVBhY2thZ2VOYW1lID09PSBjb250YWluaW5nRmlsZVBhY2thZ2VOYW1lIHx8XG4gICAgICAgIEdFTkVSQVRFRF9GSUxFUy50ZXN0KG9yaWdpbmFsSW1wb3J0ZWRGaWxlKSkge1xuICAgICAgY29uc3Qgcm9vdGVkQ29udGFpbmluZ0ZpbGUgPSByZWxhdGl2ZVRvUm9vdERpcnMoY29udGFpbmluZ0ZpbGUsIHRoaXMucm9vdERpcnMpO1xuICAgICAgY29uc3Qgcm9vdGVkSW1wb3J0ZWRGaWxlID0gcmVsYXRpdmVUb1Jvb3REaXJzKGltcG9ydGVkRmlsZSwgdGhpcy5yb290RGlycyk7XG5cbiAgICAgIGlmIChyb290ZWRDb250YWluaW5nRmlsZSAhPT0gY29udGFpbmluZ0ZpbGUgJiYgcm9vdGVkSW1wb3J0ZWRGaWxlICE9PSBpbXBvcnRlZEZpbGUpIHtcbiAgICAgICAgLy8gaWYgYm90aCBmaWxlcyBhcmUgY29udGFpbmVkIGluIHRoZSBgcm9vdERpcnNgLCB0aGVuIHN0cmlwIHRoZSByb290RGlyc1xuICAgICAgICBjb250YWluaW5nRmlsZSA9IHJvb3RlZENvbnRhaW5pbmdGaWxlO1xuICAgICAgICBpbXBvcnRlZEZpbGUgPSByb290ZWRJbXBvcnRlZEZpbGU7XG4gICAgICB9XG4gICAgICBtb2R1bGVOYW1lID0gZG90UmVsYXRpdmUocGF0aC5kaXJuYW1lKGNvbnRhaW5pbmdGaWxlKSwgaW1wb3J0ZWRGaWxlKTtcbiAgICB9IGVsc2UgaWYgKGltcG9ydGVkRmlsZVBhY2thZ2VOYW1lKSB7XG4gICAgICBtb2R1bGVOYW1lID0gc3RyaXBOb2RlTW9kdWxlc1ByZWZpeChpbXBvcnRlZEZpbGUpO1xuICAgICAgaWYgKG9yaWdpbmFsSW1wb3J0ZWRGaWxlLmVuZHNXaXRoKCcuZC50cycpKSB7XG4gICAgICAgIC8vIHRoZSBtb2R1bGVOYW1lIGZvciB0aGVzZSB0eXBpbmdzIGNvdWxkIGJlIHNob3J0ZW50ZWQgdG8gdGhlIG5wbSBwYWNrYWdlIG5hbWVcbiAgICAgICAgLy8gaWYgdGhlIG5wbSBwYWNrYWdlIHR5cGluZ3MgbWF0Y2hlcyB0aGUgaW1wb3J0ZWRGaWxlXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgbW9kdWxlUGF0aCA9IGltcG9ydGVkRmlsZS5zdWJzdHJpbmcoMCwgaW1wb3J0ZWRGaWxlLmxlbmd0aCAtIG1vZHVsZU5hbWUubGVuZ3RoKSArXG4gICAgICAgICAgICAgIGltcG9ydGVkRmlsZVBhY2thZ2VOYW1lO1xuICAgICAgICAgIGNvbnN0IHBhY2thZ2VKc29uID0gcmVxdWlyZShtb2R1bGVQYXRoICsgJy9wYWNrYWdlLmpzb24nKTtcbiAgICAgICAgICBjb25zdCBwYWNrYWdlVHlwaW5ncyA9IHBhdGgucG9zaXguam9pbihtb2R1bGVQYXRoLCBwYWNrYWdlSnNvbi50eXBpbmdzKTtcbiAgICAgICAgICBpZiAocGFja2FnZVR5cGluZ3MgPT09IG9yaWdpbmFsSW1wb3J0ZWRGaWxlKSB7XG4gICAgICAgICAgICBtb2R1bGVOYW1lID0gaW1wb3J0ZWRGaWxlUGFja2FnZU5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gdGhlIGFib3ZlIHJlcXVpcmUoKSB3aWxsIHRocm93IGlmIHRoZXJlIGlzIG5vIHBhY2thZ2UuanNvbiBmaWxlXG4gICAgICAgICAgLy8gYW5kIHRoaXMgaXMgc2FmZSB0byBpZ25vcmUgYW5kIGNvcnJlY3QgdG8ga2VlcCB0aGUgbG9uZ2VyXG4gICAgICAgICAgLy8gbW9kdWxlTmFtZSBpbiB0aGlzIGNhc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYFRyeWluZyB0byBpbXBvcnQgYSBzb3VyY2UgZmlsZSBmcm9tIGEgbm9kZV9tb2R1bGVzIHBhY2thZ2U6IGltcG9ydCAke29yaWdpbmFsSW1wb3J0ZWRGaWxlfSBmcm9tICR7Y29udGFpbmluZ0ZpbGV9YCk7XG4gICAgfVxuXG4gICAgdGhpcy5maWxlTmFtZVRvTW9kdWxlTmFtZUNhY2hlLnNldChjYWNoZUtleSwgbW9kdWxlTmFtZSk7XG4gICAgcmV0dXJuIG1vZHVsZU5hbWU7XG4gIH1cblxuICByZXNvdXJjZU5hbWVUb0ZpbGVOYW1lKHJlc291cmNlTmFtZTogc3RyaW5nLCBjb250YWluaW5nRmlsZTogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICAgIC8vIE5vdGU6IHdlIGNvbnZlcnQgcGFja2FnZSBwYXRocyBpbnRvIHJlbGF0aXZlIHBhdGhzIHRvIGJlIGNvbXBhdGlibGUgd2l0aCB0aGUgdGhlXG4gICAgLy8gcHJldmlvdXMgaW1wbGVtZW50YXRpb24gb2YgVXJsUmVzb2x2ZXIuXG4gICAgY29uc3QgZmlyc3RDaGFyID0gcmVzb3VyY2VOYW1lWzBdO1xuICAgIGlmIChmaXJzdENoYXIgPT09ICcvJykge1xuICAgICAgcmVzb3VyY2VOYW1lID0gcmVzb3VyY2VOYW1lLnNsaWNlKDEpO1xuICAgIH0gZWxzZSBpZiAoZmlyc3RDaGFyICE9PSAnLicpIHtcbiAgICAgIHJlc291cmNlTmFtZSA9IGAuLyR7cmVzb3VyY2VOYW1lfWA7XG4gICAgfVxuICAgIGNvbnN0IGZpbGVQYXRoV2l0aE5nUmVzb3VyY2UgPVxuICAgICAgICB0aGlzLm1vZHVsZU5hbWVUb0ZpbGVOYW1lKGFkZE5nUmVzb3VyY2VTdWZmaXgocmVzb3VyY2VOYW1lKSwgY29udGFpbmluZ0ZpbGUpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGZpbGVQYXRoV2l0aE5nUmVzb3VyY2UgPyBzdHJpcE5nUmVzb3VyY2VTdWZmaXgoZmlsZVBhdGhXaXRoTmdSZXNvdXJjZSkgOiBudWxsO1xuICAgIC8vIFVzZWQgdW5kZXIgQmF6ZWwgdG8gcmVwb3J0IG1vcmUgc3BlY2lmaWMgZXJyb3Igd2l0aCByZW1lZGlhdGlvbiBhZHZpY2VcbiAgICBpZiAoIXJlc3VsdCAmJiAodGhpcy5jb250ZXh0IGFzIGFueSkucmVwb3J0TWlzc2luZ1Jlc291cmNlKSB7XG4gICAgICAodGhpcy5jb250ZXh0IGFzIGFueSkucmVwb3J0TWlzc2luZ1Jlc291cmNlKHJlc291cmNlTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB0b1N1bW1hcnlGaWxlTmFtZShmaWxlTmFtZTogc3RyaW5nLCByZWZlcnJpbmdTcmNGaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5maWxlTmFtZVRvTW9kdWxlTmFtZShmaWxlTmFtZSwgcmVmZXJyaW5nU3JjRmlsZU5hbWUpO1xuICB9XG5cbiAgZnJvbVN1bW1hcnlGaWxlTmFtZShmaWxlTmFtZTogc3RyaW5nLCByZWZlcnJpbmdMaWJGaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCByZXNvbHZlZCA9IHRoaXMubW9kdWxlTmFtZVRvRmlsZU5hbWUoZmlsZU5hbWUsIHJlZmVycmluZ0xpYkZpbGVOYW1lKTtcbiAgICBpZiAoIXJlc29sdmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCByZXNvbHZlICR7ZmlsZU5hbWV9IGZyb20gJHtyZWZlcnJpbmdMaWJGaWxlTmFtZX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc29sdmVkO1xuICB9XG5cbiAgcGFyc2VTb3VyY2VTcGFuT2YoZmlsZU5hbWU6IHN0cmluZywgbGluZTogbnVtYmVyLCBjaGFyYWN0ZXI6IG51bWJlcik6IFBhcnNlU291cmNlU3BhbnxudWxsIHtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5nZW5lcmF0ZWRTb3VyY2VGaWxlcy5nZXQoZmlsZU5hbWUpO1xuICAgIGlmIChkYXRhICYmIGRhdGEuZW1pdEN0eCkge1xuICAgICAgcmV0dXJuIGRhdGEuZW1pdEN0eC5zcGFuT2YobGluZSwgY2hhcmFjdGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGdldE9yaWdpbmFsU291cmNlRmlsZShcbiAgICAgIGZpbGVQYXRoOiBzdHJpbmcsIGxhbmd1YWdlVmVyc2lvbj86IHRzLlNjcmlwdFRhcmdldCxcbiAgICAgIG9uRXJyb3I/OiAoKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCl8dW5kZWZpbmVkKTogdHMuU291cmNlRmlsZXxudWxsIHtcbiAgICAvLyBOb3RlOiB3ZSBuZWVkIHRoZSBleHBsaWNpdCBjaGVjayB2aWEgYGhhc2AgYXMgd2UgYWxzbyBjYWNoZSByZXN1bHRzXG4gICAgLy8gdGhhdCB3ZXJlIG51bGwgLyB1bmRlZmluZWQuXG4gICAgaWYgKHRoaXMub3JpZ2luYWxTb3VyY2VGaWxlcy5oYXMoZmlsZVBhdGgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbFNvdXJjZUZpbGVzLmdldChmaWxlUGF0aCkgITtcbiAgICB9XG4gICAgaWYgKCFsYW5ndWFnZVZlcnNpb24pIHtcbiAgICAgIGxhbmd1YWdlVmVyc2lvbiA9IHRoaXMub3B0aW9ucy50YXJnZXQgfHwgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdDtcbiAgICB9XG4gICAgLy8gTm90ZTogVGhpcyBjYW4gYWxzbyByZXR1cm4gdW5kZWZpbmVkLFxuICAgIC8vIGFzIHRoZSBUUyB0eXBpbmdzIGFyZSBub3QgY29ycmVjdCFcbiAgICBjb25zdCBzZiA9IHRoaXMuY29udGV4dC5nZXRTb3VyY2VGaWxlKGZpbGVQYXRoLCBsYW5ndWFnZVZlcnNpb24sIG9uRXJyb3IpIHx8IG51bGw7XG4gICAgdGhpcy5vcmlnaW5hbFNvdXJjZUZpbGVzLnNldChmaWxlUGF0aCwgc2YpO1xuICAgIHJldHVybiBzZjtcbiAgfVxuXG4gIHVwZGF0ZUdlbmVyYXRlZEZpbGUoZ2VuRmlsZTogR2VuZXJhdGVkRmlsZSk6IHRzLlNvdXJjZUZpbGUge1xuICAgIGlmICghZ2VuRmlsZS5zdG10cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBJbnZhbGlkIEFyZ3VtZW50OiBFeHBlY3RlZCBhIEdlbmVyYXRlRmlsZSB3aXRoIHN0YXRlbWVudHMuICR7Z2VuRmlsZS5nZW5GaWxlVXJsfWApO1xuICAgIH1cbiAgICBjb25zdCBvbGRHZW5GaWxlID0gdGhpcy5nZW5lcmF0ZWRTb3VyY2VGaWxlcy5nZXQoZ2VuRmlsZS5nZW5GaWxlVXJsKTtcbiAgICBpZiAoIW9sZEdlbkZpbGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSWxsZWdhbCBTdGF0ZTogcHJldmlvdXMgR2VuZXJhdGVkRmlsZSBub3QgZm91bmQgZm9yICR7Z2VuRmlsZS5nZW5GaWxlVXJsfS5gKTtcbiAgICB9XG4gICAgY29uc3QgbmV3UmVmcyA9IGdlbkZpbGVFeHRlcm5hbFJlZmVyZW5jZXMoZ2VuRmlsZSk7XG4gICAgY29uc3Qgb2xkUmVmcyA9IG9sZEdlbkZpbGUuZXh0ZXJuYWxSZWZlcmVuY2VzO1xuICAgIGxldCByZWZzQXJlRXF1YWwgPSBvbGRSZWZzLnNpemUgPT09IG5ld1JlZnMuc2l6ZTtcbiAgICBpZiAocmVmc0FyZUVxdWFsKSB7XG4gICAgICBuZXdSZWZzLmZvckVhY2gociA9PiByZWZzQXJlRXF1YWwgPSByZWZzQXJlRXF1YWwgJiYgb2xkUmVmcy5oYXMocikpO1xuICAgIH1cbiAgICBpZiAoIXJlZnNBcmVFcXVhbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBJbGxlZ2FsIFN0YXRlOiBleHRlcm5hbCByZWZlcmVuY2VzIGNoYW5nZWQgaW4gJHtnZW5GaWxlLmdlbkZpbGVVcmx9Llxcbk9sZDogJHtBcnJheS5mcm9tKG9sZFJlZnMpfS5cXG5OZXc6ICR7QXJyYXkuZnJvbShuZXdSZWZzKX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWRkR2VuZXJhdGVkRmlsZShnZW5GaWxlLCBuZXdSZWZzKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkR2VuZXJhdGVkRmlsZShnZW5GaWxlOiBHZW5lcmF0ZWRGaWxlLCBleHRlcm5hbFJlZmVyZW5jZXM6IFNldDxzdHJpbmc+KTogdHMuU291cmNlRmlsZSB7XG4gICAgaWYgKCFnZW5GaWxlLnN0bXRzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYEludmFsaWQgQXJndW1lbnQ6IEV4cGVjdGVkIGEgR2VuZXJhdGVGaWxlIHdpdGggc3RhdGVtZW50cy4gJHtnZW5GaWxlLmdlbkZpbGVVcmx9YCk7XG4gICAgfVxuICAgIGNvbnN0IHtzb3VyY2VUZXh0LCBjb250ZXh0fSA9IHRoaXMuZW1pdHRlci5lbWl0U3RhdGVtZW50c0FuZENvbnRleHQoXG4gICAgICAgIGdlbkZpbGUuZ2VuRmlsZVVybCwgZ2VuRmlsZS5zdG10cywgLyogcHJlYW1ibGUgKi8gJycsXG4gICAgICAgIC8qIGVtaXRTb3VyY2VNYXBzICovIGZhbHNlKTtcbiAgICBjb25zdCBzZiA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICAgIGdlbkZpbGUuZ2VuRmlsZVVybCwgc291cmNlVGV4dCwgdGhpcy5vcHRpb25zLnRhcmdldCB8fCB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0KTtcbiAgICBpZiAoKHRoaXMub3B0aW9ucy5tb2R1bGUgPT09IHRzLk1vZHVsZUtpbmQuQU1EIHx8IHRoaXMub3B0aW9ucy5tb2R1bGUgPT09IHRzLk1vZHVsZUtpbmQuVU1EKSAmJlxuICAgICAgICB0aGlzLmNvbnRleHQuYW1kTW9kdWxlTmFtZSkge1xuICAgICAgY29uc3QgbW9kdWxlTmFtZSA9IHRoaXMuY29udGV4dC5hbWRNb2R1bGVOYW1lKHNmKTtcbiAgICAgIGlmIChtb2R1bGVOYW1lKSBzZi5tb2R1bGVOYW1lID0gbW9kdWxlTmFtZTtcbiAgICB9XG4gICAgdGhpcy5nZW5lcmF0ZWRTb3VyY2VGaWxlcy5zZXQoZ2VuRmlsZS5nZW5GaWxlVXJsLCB7XG4gICAgICBzb3VyY2VGaWxlOiBzZixcbiAgICAgIGVtaXRDdHg6IGNvbnRleHQsIGV4dGVybmFsUmVmZXJlbmNlcyxcbiAgICB9KTtcbiAgICByZXR1cm4gc2Y7XG4gIH1cblxuICBzaG91bGRHZW5lcmF0ZUZpbGUoZmlsZU5hbWU6IHN0cmluZyk6IHtnZW5lcmF0ZTogYm9vbGVhbiwgYmFzZUZpbGVOYW1lPzogc3RyaW5nfSB7XG4gICAgLy8gVE9ETyh0Ym9zY2gpOiBhbGxvdyBnZW5lcmF0aW5nIGZpbGVzIHRoYXQgYXJlIG5vdCBpbiB0aGUgcm9vdERpclxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xOTMzN1xuICAgIGlmICghaXNJblJvb3REaXIoZmlsZU5hbWUsIHRoaXMub3B0aW9ucykpIHtcbiAgICAgIHJldHVybiB7Z2VuZXJhdGU6IGZhbHNlfTtcbiAgICB9XG4gICAgY29uc3QgZ2VuTWF0Y2ggPSBHRU5FUkFURURfRklMRVMuZXhlYyhmaWxlTmFtZSk7XG4gICAgaWYgKCFnZW5NYXRjaCkge1xuICAgICAgcmV0dXJuIHtnZW5lcmF0ZTogZmFsc2V9O1xuICAgIH1cbiAgICBjb25zdCBbLCBiYXNlLCBnZW5TdWZmaXgsIHN1ZmZpeF0gPSBnZW5NYXRjaDtcbiAgICBpZiAoc3VmZml4ICE9PSAndHMnICYmIHN1ZmZpeCAhPT0gJ3RzeCcpIHtcbiAgICAgIHJldHVybiB7Z2VuZXJhdGU6IGZhbHNlfTtcbiAgICB9XG4gICAgbGV0IGJhc2VGaWxlTmFtZTogc3RyaW5nfHVuZGVmaW5lZDtcbiAgICBpZiAoZ2VuU3VmZml4LmluZGV4T2YoJ25nc3R5bGUnKSA+PSAwKSB7XG4gICAgICAvLyBOb3RlOiBuZ3N0eWxlIGZpbGVzIGhhdmUgbmFtZXMgbGlrZSBgYWZpbGUuY3NzLm5nc3R5bGUudHNgXG4gICAgICBpZiAoIXRoaXMub3JpZ2luYWxGaWxlRXhpc3RzKGJhc2UpKSB7XG4gICAgICAgIHJldHVybiB7Z2VuZXJhdGU6IGZhbHNlfTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm90ZTogb24tdGhlLWZseSBnZW5lcmF0ZWQgZmlsZXMgYWx3YXlzIGhhdmUgYSBgLnRzYCBzdWZmaXgsXG4gICAgICAvLyBidXQgdGhlIGZpbGUgZnJvbSB3aGljaCB3ZSBnZW5lcmF0ZWQgaXQgY2FuIGJlIGEgYC50c2AvIGAudHN4YC8gYC5kLnRzYFxuICAgICAgLy8gKHNlZSBvcHRpb25zLmdlbmVyYXRlQ29kZUZvckxpYnJhcmllcykuXG4gICAgICBiYXNlRmlsZU5hbWUgPSBbYCR7YmFzZX0udHNgLCBgJHtiYXNlfS50c3hgLCBgJHtiYXNlfS5kLnRzYF0uZmluZChcbiAgICAgICAgICBiYXNlRmlsZU5hbWUgPT4gdGhpcy5pc1NvdXJjZUZpbGUoYmFzZUZpbGVOYW1lKSAmJiB0aGlzLm9yaWdpbmFsRmlsZUV4aXN0cyhiYXNlRmlsZU5hbWUpKTtcbiAgICAgIGlmICghYmFzZUZpbGVOYW1lKSB7XG4gICAgICAgIHJldHVybiB7Z2VuZXJhdGU6IGZhbHNlfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtnZW5lcmF0ZTogdHJ1ZSwgYmFzZUZpbGVOYW1lfTtcbiAgfVxuXG4gIHNob3VsZEdlbmVyYXRlRmlsZXNGb3IoZmlsZU5hbWU6IHN0cmluZykge1xuICAgIC8vIFRPRE8odGJvc2NoKTogYWxsb3cgZ2VuZXJhdGluZyBmaWxlcyB0aGF0IGFyZSBub3QgaW4gdGhlIHJvb3REaXJcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTkzMzdcbiAgICByZXR1cm4gIUdFTkVSQVRFRF9GSUxFUy50ZXN0KGZpbGVOYW1lKSAmJiB0aGlzLmlzU291cmNlRmlsZShmaWxlTmFtZSkgJiZcbiAgICAgICAgaXNJblJvb3REaXIoZmlsZU5hbWUsIHRoaXMub3B0aW9ucyk7XG4gIH1cblxuICBnZXRTb3VyY2VGaWxlKFxuICAgICAgZmlsZU5hbWU6IHN0cmluZywgbGFuZ3VhZ2VWZXJzaW9uOiB0cy5TY3JpcHRUYXJnZXQsXG4gICAgICBvbkVycm9yPzogKChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQpfHVuZGVmaW5lZCk6IHRzLlNvdXJjZUZpbGUge1xuICAgIC8vIE5vdGU6IERvbid0IGV4aXQgZWFybHkgaW4gdGhpcyBtZXRob2QgdG8gbWFrZSBzdXJlXG4gICAgLy8gd2UgYWx3YXlzIGhhdmUgdXAgdG8gZGF0ZSByZWZlcmVuY2VzIG9uIHRoZSBmaWxlIVxuICAgIGxldCBnZW5GaWxlTmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IHNmID0gdGhpcy5nZXRHZW5lcmF0ZWRGaWxlKGZpbGVOYW1lKTtcbiAgICBpZiAoIXNmKSB7XG4gICAgICBjb25zdCBzdW1tYXJ5ID0gdGhpcy5saWJyYXJ5U3VtbWFyaWVzLmdldChmaWxlTmFtZSk7XG4gICAgICBpZiAoc3VtbWFyeSkge1xuICAgICAgICBpZiAoIXN1bW1hcnkuc291cmNlRmlsZSkge1xuICAgICAgICAgIHN1bW1hcnkuc291cmNlRmlsZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICAgICAgICAgIGZpbGVOYW1lLCBzdW1tYXJ5LnRleHQsIHRoaXMub3B0aW9ucy50YXJnZXQgfHwgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgc2YgPSBzdW1tYXJ5LnNvdXJjZUZpbGU7XG4gICAgICAgIGdlbkZpbGVOYW1lcyA9IFtdO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXNmKSB7XG4gICAgICBzZiA9IHRoaXMuZ2V0T3JpZ2luYWxTb3VyY2VGaWxlKGZpbGVOYW1lKTtcbiAgICAgIGNvbnN0IGNhY2hlZEdlbkZpbGVzID0gdGhpcy5nZW5lcmF0ZWRDb2RlRm9yLmdldChmaWxlTmFtZSk7XG4gICAgICBpZiAoY2FjaGVkR2VuRmlsZXMpIHtcbiAgICAgICAgZ2VuRmlsZU5hbWVzID0gY2FjaGVkR2VuRmlsZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5ub1Jlc29sdmUgJiYgdGhpcy5zaG91bGRHZW5lcmF0ZUZpbGVzRm9yKGZpbGVOYW1lKSkge1xuICAgICAgICAgIGdlbkZpbGVOYW1lcyA9IHRoaXMuY29kZUdlbmVyYXRvci5maW5kR2VuZXJhdGVkRmlsZU5hbWVzKGZpbGVOYW1lKS5maWx0ZXIoXG4gICAgICAgICAgICAgIGZpbGVOYW1lID0+IHRoaXMuc2hvdWxkR2VuZXJhdGVGaWxlKGZpbGVOYW1lKS5nZW5lcmF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZW5lcmF0ZWRDb2RlRm9yLnNldChmaWxlTmFtZSwgZ2VuRmlsZU5hbWVzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNmKSB7XG4gICAgICBhZGRSZWZlcmVuY2VzVG9Tb3VyY2VGaWxlKHNmLCBnZW5GaWxlTmFtZXMpO1xuICAgIH1cbiAgICAvLyBUT0RPKHRib3NjaCk6IFR5cGVTY3JpcHQncyB0eXBpbmdzIGZvciBnZXRTb3VyY2VGaWxlIGFyZSBpbmNvcnJlY3QsXG4gICAgLy8gYXMgaXQgY2FuIHZlcnkgd2VsbCByZXR1cm4gdW5kZWZpbmVkLlxuICAgIHJldHVybiBzZiAhO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRHZW5lcmF0ZWRGaWxlKGZpbGVOYW1lOiBzdHJpbmcpOiB0cy5Tb3VyY2VGaWxlfG51bGwge1xuICAgIGNvbnN0IGdlblNyY0ZpbGUgPSB0aGlzLmdlbmVyYXRlZFNvdXJjZUZpbGVzLmdldChmaWxlTmFtZSk7XG4gICAgaWYgKGdlblNyY0ZpbGUpIHtcbiAgICAgIHJldHVybiBnZW5TcmNGaWxlLnNvdXJjZUZpbGU7XG4gICAgfVxuICAgIGNvbnN0IHtnZW5lcmF0ZSwgYmFzZUZpbGVOYW1lfSA9IHRoaXMuc2hvdWxkR2VuZXJhdGVGaWxlKGZpbGVOYW1lKTtcbiAgICBpZiAoZ2VuZXJhdGUpIHtcbiAgICAgIGNvbnN0IGdlbkZpbGUgPSB0aGlzLmNvZGVHZW5lcmF0b3IuZ2VuZXJhdGVGaWxlKGZpbGVOYW1lLCBiYXNlRmlsZU5hbWUpO1xuICAgICAgcmV0dXJuIHRoaXMuYWRkR2VuZXJhdGVkRmlsZShnZW5GaWxlLCBnZW5GaWxlRXh0ZXJuYWxSZWZlcmVuY2VzKGdlbkZpbGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIG9yaWdpbmFsRmlsZUV4aXN0cyhmaWxlTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgbGV0IGZpbGVFeGlzdHMgPSB0aGlzLm9yaWdpbmFsRmlsZUV4aXN0c0NhY2hlLmdldChmaWxlTmFtZSk7XG4gICAgaWYgKGZpbGVFeGlzdHMgPT0gbnVsbCkge1xuICAgICAgZmlsZUV4aXN0cyA9IHRoaXMuY29udGV4dC5maWxlRXhpc3RzKGZpbGVOYW1lKTtcbiAgICAgIHRoaXMub3JpZ2luYWxGaWxlRXhpc3RzQ2FjaGUuc2V0KGZpbGVOYW1lLCBmaWxlRXhpc3RzKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGVFeGlzdHM7XG4gIH1cblxuICBmaWxlRXhpc3RzKGZpbGVOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBmaWxlTmFtZSA9IHN0cmlwTmdSZXNvdXJjZVN1ZmZpeChmaWxlTmFtZSk7XG4gICAgaWYgKHRoaXMubGlicmFyeVN1bW1hcmllcy5oYXMoZmlsZU5hbWUpIHx8IHRoaXMuZ2VuZXJhdGVkU291cmNlRmlsZXMuaGFzKGZpbGVOYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLnNob3VsZEdlbmVyYXRlRmlsZShmaWxlTmFtZSkuZ2VuZXJhdGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5vcmlnaW5hbEZpbGVFeGlzdHMoZmlsZU5hbWUpO1xuICB9XG5cbiAgbG9hZFN1bW1hcnkoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICBjb25zdCBzdW1tYXJ5ID0gdGhpcy5saWJyYXJ5U3VtbWFyaWVzLmdldChmaWxlUGF0aCk7XG4gICAgaWYgKHN1bW1hcnkpIHtcbiAgICAgIHJldHVybiBzdW1tYXJ5LnRleHQ7XG4gICAgfVxuICAgIGlmICh0aGlzLm9yaWdpbmFsRmlsZUV4aXN0cyhmaWxlUGF0aCkpIHtcbiAgICAgIHJldHVybiBhc3NlcnQodGhpcy5jb250ZXh0LnJlYWRGaWxlKGZpbGVQYXRoKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaXNTb3VyY2VGaWxlKGZpbGVQYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAvLyBEb24ndCBnZW5lcmF0ZSBhbnkgZmlsZXMgbm9yIHR5cGVjaGVjayB0aGVtXG4gICAgLy8gaWYgc2tpcFRlbXBsYXRlQ29kZWdlbiBpcyBzZXQgYW5kIGZ1bGxUZW1wbGF0ZVR5cGVDaGVjayBpcyBub3QgeWV0IHNldCxcbiAgICAvLyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5za2lwVGVtcGxhdGVDb2RlZ2VuICYmICF0aGlzLm9wdGlvbnMuZnVsbFRlbXBsYXRlVHlwZUNoZWNrKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIElmIHdlIGhhdmUgYSBzdW1tYXJ5IGZyb20gYSBwcmV2aW91cyBjb21waWxhdGlvbixcbiAgICAvLyB0cmVhdCB0aGUgZmlsZSBuZXZlciBhcyBhIHNvdXJjZSBmaWxlLlxuICAgIGlmICh0aGlzLmxpYnJhcnlTdW1tYXJpZXMuaGFzKGZpbGVQYXRoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoR0VORVJBVEVEX0ZJTEVTLnRlc3QoZmlsZVBhdGgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZ2VuZXJhdGVDb2RlRm9yTGlicmFyaWVzID09PSBmYWxzZSAmJiBEVFMudGVzdChmaWxlUGF0aCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKERUUy50ZXN0KGZpbGVQYXRoKSkge1xuICAgICAgLy8gQ2hlY2sgZm9yIGEgYnVuZGxlIGluZGV4LlxuICAgICAgaWYgKHRoaXMuaGFzQnVuZGxlSW5kZXgoZmlsZVBhdGgpKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbEZpbGVQYXRoID0gcGF0aC5ub3JtYWxpemUoZmlsZVBhdGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5mbGF0TW9kdWxlSW5kZXhOYW1lcy5oYXMobm9ybWFsRmlsZVBhdGgpIHx8XG4gICAgICAgICAgICB0aGlzLmZsYXRNb2R1bGVJbmRleFJlZGlyZWN0TmFtZXMuaGFzKG5vcm1hbEZpbGVQYXRoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZWFkRmlsZShmaWxlTmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc3VtbWFyeSA9IHRoaXMubGlicmFyeVN1bW1hcmllcy5nZXQoZmlsZU5hbWUpO1xuICAgIGlmIChzdW1tYXJ5KSB7XG4gICAgICByZXR1cm4gc3VtbWFyeS50ZXh0O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LnJlYWRGaWxlKGZpbGVOYW1lKTtcbiAgfVxuXG4gIGdldE1ldGFkYXRhRm9yKGZpbGVQYXRoOiBzdHJpbmcpOiBNb2R1bGVNZXRhZGF0YVtdfHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHJlYWRNZXRhZGF0YShmaWxlUGF0aCwgdGhpcy5tZXRhZGF0YVJlYWRlckhvc3QsIHRoaXMubWV0YWRhdGFSZWFkZXJDYWNoZSk7XG4gIH1cblxuICBsb2FkUmVzb3VyY2UoZmlsZVBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPnxzdHJpbmcge1xuICAgIGlmICh0aGlzLmNvbnRleHQucmVhZFJlc291cmNlKSByZXR1cm4gdGhpcy5jb250ZXh0LnJlYWRSZXNvdXJjZShmaWxlUGF0aCk7XG4gICAgaWYgKCF0aGlzLm9yaWdpbmFsRmlsZUV4aXN0cyhmaWxlUGF0aCkpIHtcbiAgICAgIHRocm93IHN5bnRheEVycm9yKGBFcnJvcjogUmVzb3VyY2UgZmlsZSBub3QgZm91bmQ6ICR7ZmlsZVBhdGh9YCk7XG4gICAgfVxuICAgIHJldHVybiBhc3NlcnQodGhpcy5jb250ZXh0LnJlYWRGaWxlKGZpbGVQYXRoKSk7XG4gIH1cblxuICBnZXRPdXRwdXROYW1lKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBwYXRoLnJlbGF0aXZlKHRoaXMuZ2V0Q3VycmVudERpcmVjdG9yeSgpLCBmaWxlUGF0aCk7XG4gIH1cblxuICBwcml2YXRlIGhhc0J1bmRsZUluZGV4KGZpbGVQYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBjaGVja0J1bmRsZUluZGV4ID0gKGRpcmVjdG9yeTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gdGhpcy5mbGF0TW9kdWxlSW5kZXhDYWNoZS5nZXQoZGlyZWN0b3J5KTtcbiAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICBpZiAocGF0aC5iYXNlbmFtZShkaXJlY3RvcnkpID09ICdub2RlX21vZHVsZScpIHtcbiAgICAgICAgICAvLyBEb24ndCBsb29rIG91dHNpZGUgdGhlIG5vZGVfbW9kdWxlcyB0aGlzIHBhY2thZ2UgaXMgaW5zdGFsbGVkIGluLlxuICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEEgYnVuZGxlIGluZGV4IGV4aXN0cyBpZiB0aGUgdHlwaW5ncyAuZC50cyBmaWxlIGhhcyBhIG1ldGFkYXRhLmpzb24gdGhhdCBoYXMgYW5cbiAgICAgICAgICAvLyBpbXBvcnRBcy5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGFja2FnZUZpbGUgPSBwYXRoLmpvaW4oZGlyZWN0b3J5LCAncGFja2FnZS5qc29uJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcmlnaW5hbEZpbGVFeGlzdHMocGFja2FnZUZpbGUpKSB7XG4gICAgICAgICAgICAgIC8vIE9uY2Ugd2Ugc2VlIGEgcGFja2FnZS5qc29uIGZpbGUsIGFzc3VtZSBmYWxzZSB1bnRpbCBpdCB3ZSBmaW5kIHRoZSBidW5kbGUgaW5kZXguXG4gICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICBjb25zdCBwYWNrYWdlQ29udGVudDogYW55ID0gSlNPTi5wYXJzZShhc3NlcnQodGhpcy5jb250ZXh0LnJlYWRGaWxlKHBhY2thZ2VGaWxlKSkpO1xuICAgICAgICAgICAgICBpZiAocGFja2FnZUNvbnRlbnQudHlwaW5ncykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGluZ3MgPSBwYXRoLm5vcm1hbGl6ZShwYXRoLmpvaW4oZGlyZWN0b3J5LCBwYWNrYWdlQ29udGVudC50eXBpbmdzKSk7XG4gICAgICAgICAgICAgICAgaWYgKERUUy50ZXN0KHR5cGluZ3MpKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBtZXRhZGF0YUZpbGUgPSB0eXBpbmdzLnJlcGxhY2UoRFRTLCAnLm1ldGFkYXRhLmpzb24nKTtcbiAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9yaWdpbmFsRmlsZUV4aXN0cyhtZXRhZGF0YUZpbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1ldGFkYXRhID0gSlNPTi5wYXJzZShhc3NlcnQodGhpcy5jb250ZXh0LnJlYWRGaWxlKG1ldGFkYXRhRmlsZSkpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGFkYXRhLmZsYXRNb2R1bGVJbmRleFJlZGlyZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGF0TW9kdWxlSW5kZXhSZWRpcmVjdE5hbWVzLmFkZCh0eXBpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RlOiBkb24ndCBzZXQgcmVzdWx0ID0gdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAvLyBhcyB0aGlzIHdvdWxkIG1hcmsgdGhpcyBmb2xkZXJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBhcyBoYXZpbmcgYSBidW5kbGVJbmRleCB0b28gZWFybHkgd2l0aG91dFxuICAgICAgICAgICAgICAgICAgICAgIC8vIGZpbGxpbmcgdGhlIGJ1bmRsZUluZGV4TmFtZXMuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWV0YWRhdGEuaW1wb3J0QXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZsYXRNb2R1bGVJbmRleE5hbWVzLmFkZCh0eXBpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBwYXRoLmRpcm5hbWUoZGlyZWN0b3J5KTtcbiAgICAgICAgICAgICAgaWYgKHBhcmVudCAhPSBkaXJlY3RvcnkpIHtcbiAgICAgICAgICAgICAgICAvLyBUcnkgdGhlIHBhcmVudCBkaXJlY3RvcnkuXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gY2hlY2tCdW5kbGVJbmRleChwYXJlbnQpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gSWYgd2UgZW5jb3VudGVyIGFueSBlcnJvcnMgYXNzdW1lIHdlIHRoaXMgaXNuJ3QgYSBidW5kbGUgaW5kZXguXG4gICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mbGF0TW9kdWxlSW5kZXhDYWNoZS5zZXQoZGlyZWN0b3J5LCByZXN1bHQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGNoZWNrQnVuZGxlSW5kZXgocGF0aC5kaXJuYW1lKGZpbGVQYXRoKSk7XG4gIH1cblxuICBnZXREZWZhdWx0TGliRmlsZU5hbWUgPSAob3B0aW9uczogdHMuQ29tcGlsZXJPcHRpb25zKSA9PlxuICAgICAgdGhpcy5jb250ZXh0LmdldERlZmF1bHRMaWJGaWxlTmFtZShvcHRpb25zKVxuICBnZXRDdXJyZW50RGlyZWN0b3J5ID0gKCkgPT4gdGhpcy5jb250ZXh0LmdldEN1cnJlbnREaXJlY3RvcnkoKTtcbiAgZ2V0Q2Fub25pY2FsRmlsZU5hbWUgPSAoZmlsZU5hbWU6IHN0cmluZykgPT4gdGhpcy5jb250ZXh0LmdldENhbm9uaWNhbEZpbGVOYW1lKGZpbGVOYW1lKTtcbiAgdXNlQ2FzZVNlbnNpdGl2ZUZpbGVOYW1lcyA9ICgpID0+IHRoaXMuY29udGV4dC51c2VDYXNlU2Vuc2l0aXZlRmlsZU5hbWVzKCk7XG4gIGdldE5ld0xpbmUgPSAoKSA9PiB0aGlzLmNvbnRleHQuZ2V0TmV3TGluZSgpO1xuICAvLyBNYWtlIHN1cmUgd2UgZG8gbm90IGBob3N0LnJlYWxwYXRoKClgIGZyb20gVFMgYXMgd2UgZG8gbm90IHdhbnQgdG8gcmVzb2x2ZSBzeW1saW5rcy5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy85NTUyXG4gIHJlYWxQYXRoID0gKHA6IHN0cmluZykgPT4gcDtcbiAgd3JpdGVGaWxlID0gdGhpcy5jb250ZXh0LndyaXRlRmlsZS5iaW5kKHRoaXMuY29udGV4dCk7XG59XG5cbmZ1bmN0aW9uIGdlbkZpbGVFeHRlcm5hbFJlZmVyZW5jZXMoZ2VuRmlsZTogR2VuZXJhdGVkRmlsZSk6IFNldDxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBTZXQoY29sbGVjdEV4dGVybmFsUmVmZXJlbmNlcyhnZW5GaWxlLnN0bXRzICEpLm1hcChlciA9PiBlci5tb2R1bGVOYW1lICEpKTtcbn1cblxuZnVuY3Rpb24gYWRkUmVmZXJlbmNlc1RvU291cmNlRmlsZShzZjogdHMuU291cmNlRmlsZSwgZ2VuRmlsZU5hbWVzOiBzdHJpbmdbXSkge1xuICAvLyBOb3RlOiBhcyB3ZSBtb2RpZnkgdHMuU291cmNlRmlsZXMgd2UgbmVlZCB0byBrZWVwIHRoZSBvcmlnaW5hbFxuICAvLyB2YWx1ZSBmb3IgYHJlZmVyZW5jZWRGaWxlc2AgYXJvdW5kIGluIGNhY2hlIHRoZSBvcmlnaW5hbCBob3N0IGlzIGNhY2hpbmcgdHMuU291cmNlRmlsZXMuXG4gIC8vIE5vdGU6IGNsb25pbmcgdGhlIHRzLlNvdXJjZUZpbGUgaXMgZXhwZW5zaXZlIGFzIHRoZSBub2RlcyBpbiBoYXZlIHBhcmVudCBwb2ludGVycyxcbiAgLy8gaS5lLiB3ZSB3b3VsZCBhbHNvIG5lZWQgdG8gY2xvbmUgYW5kIGFkanVzdCBhbGwgbm9kZXMuXG4gIGxldCBvcmlnaW5hbFJlZmVyZW5jZWRGaWxlczogUmVhZG9ubHlBcnJheTx0cy5GaWxlUmVmZXJlbmNlPiA9XG4gICAgICAoc2YgYXMgYW55KS5vcmlnaW5hbFJlZmVyZW5jZWRGaWxlcztcbiAgaWYgKCFvcmlnaW5hbFJlZmVyZW5jZWRGaWxlcykge1xuICAgIG9yaWdpbmFsUmVmZXJlbmNlZEZpbGVzID0gc2YucmVmZXJlbmNlZEZpbGVzO1xuICAgIChzZiBhcyBhbnkpLm9yaWdpbmFsUmVmZXJlbmNlZEZpbGVzID0gb3JpZ2luYWxSZWZlcmVuY2VkRmlsZXM7XG4gIH1cbiAgY29uc3QgbmV3UmVmZXJlbmNlZEZpbGVzID0gWy4uLm9yaWdpbmFsUmVmZXJlbmNlZEZpbGVzXTtcbiAgZ2VuRmlsZU5hbWVzLmZvckVhY2goZ2YgPT4gbmV3UmVmZXJlbmNlZEZpbGVzLnB1c2goe2ZpbGVOYW1lOiBnZiwgcG9zOiAwLCBlbmQ6IDB9KSk7XG4gIHNmLnJlZmVyZW5jZWRGaWxlcyA9IG5ld1JlZmVyZW5jZWRGaWxlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9yaWdpbmFsUmVmZXJlbmNlcyhzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKTogdHMuRmlsZVJlZmVyZW5jZVtdfHVuZGVmaW5lZCB7XG4gIHJldHVybiBzb3VyY2VGaWxlICYmIChzb3VyY2VGaWxlIGFzIGFueSkub3JpZ2luYWxSZWZlcmVuY2VkRmlsZXM7XG59XG5cbmZ1bmN0aW9uIGRvdFJlbGF0aXZlKGZyb206IHN0cmluZywgdG86IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJQYXRoOiBzdHJpbmcgPSBwYXRoLnJlbGF0aXZlKGZyb20sIHRvKS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XG4gIHJldHVybiByUGF0aC5zdGFydHNXaXRoKCcuJykgPyByUGF0aCA6ICcuLycgKyByUGF0aDtcbn1cblxuLyoqXG4gKiBNb3ZlcyB0aGUgcGF0aCBpbnRvIGBnZW5EaXJgIGZvbGRlciB3aGlsZSBwcmVzZXJ2aW5nIHRoZSBgbm9kZV9tb2R1bGVzYCBkaXJlY3RvcnkuXG4gKi9cbmZ1bmN0aW9uIGdldFBhY2thZ2VOYW1lKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gIGNvbnN0IG1hdGNoID0gTk9ERV9NT0RVTEVTX1BBQ0tBR0VfTkFNRS5leGVjKGZpbGVQYXRoKTtcbiAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiBudWxsO1xufVxuXG5mdW5jdGlvbiBzdHJpcE5vZGVNb2R1bGVzUHJlZml4KGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gZmlsZVBhdGgucmVwbGFjZSgvLipub2RlX21vZHVsZXNcXC8vLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGdldE5vZGVNb2R1bGVzUHJlZml4KGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gIGNvbnN0IG1hdGNoID0gLy4qbm9kZV9tb2R1bGVzXFwvLy5leGVjKGZpbGVQYXRoKTtcbiAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiBudWxsO1xufVxuXG5mdW5jdGlvbiBzdHJpcE5nUmVzb3VyY2VTdWZmaXgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBmaWxlTmFtZS5yZXBsYWNlKC9cXC5cXCRuZ3Jlc291cmNlXFwkLiovLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGFkZE5nUmVzb3VyY2VTdWZmaXgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgJHtmaWxlTmFtZX0uJG5ncmVzb3VyY2UkYDtcbn1cbiJdfQ==