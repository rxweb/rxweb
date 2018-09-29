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
        define("@angular/language-service/src/typescript_host", ["require", "exports", "tslib", "@angular/compiler", "@angular/compiler-cli/src/language_services", "@angular/core", "fs", "path", "typescript", "@angular/language-service/src/language_service", "@angular/language-service/src/reflector_host"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var compiler_1 = require("@angular/compiler");
    var language_services_1 = require("@angular/compiler-cli/src/language_services");
    var core_1 = require("@angular/core");
    var fs = require("fs");
    var path = require("path");
    var ts = require("typescript");
    var language_service_1 = require("@angular/language-service/src/language_service");
    var reflector_host_1 = require("@angular/language-service/src/reflector_host");
    /**
     * Create a `LanguageServiceHost`
     */
    function createLanguageServiceFromTypescript(host, service) {
        var ngHost = new TypeScriptServiceHost(host, service);
        var ngServer = language_service_1.createLanguageService(ngHost);
        ngHost.setSite(ngServer);
        return ngServer;
    }
    exports.createLanguageServiceFromTypescript = createLanguageServiceFromTypescript;
    /**
     * The language service never needs the normalized versions of the metadata. To avoid parsing
     * the content and resolving references, return an empty file. This also allows normalizing
     * template that are syntatically incorrect which is required to provide completions in
     * syntactically incorrect templates.
     */
    var DummyHtmlParser = /** @class */ (function (_super) {
        tslib_1.__extends(DummyHtmlParser, _super);
        function DummyHtmlParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DummyHtmlParser.prototype.parse = function (source, url, parseExpansionForms, interpolationConfig) {
            if (parseExpansionForms === void 0) { parseExpansionForms = false; }
            if (interpolationConfig === void 0) { interpolationConfig = compiler_1.DEFAULT_INTERPOLATION_CONFIG; }
            return new compiler_1.ParseTreeResult([], []);
        };
        return DummyHtmlParser;
    }(compiler_1.HtmlParser));
    exports.DummyHtmlParser = DummyHtmlParser;
    /**
     * Avoid loading resources in the language servcie by using a dummy loader.
     */
    var DummyResourceLoader = /** @class */ (function (_super) {
        tslib_1.__extends(DummyResourceLoader, _super);
        function DummyResourceLoader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DummyResourceLoader.prototype.get = function (url) { return Promise.resolve(''); };
        return DummyResourceLoader;
    }(compiler_1.ResourceLoader));
    exports.DummyResourceLoader = DummyResourceLoader;
    /**
     * An implementation of a `LanguageServiceHost` for a TypeScript project.
     *
     * The `TypeScriptServiceHost` implements the Angular `LanguageServiceHost` using
     * the TypeScript language services.
     *
     * @experimental
     */
    var TypeScriptServiceHost = /** @class */ (function () {
        function TypeScriptServiceHost(host, tsService) {
            this.host = host;
            this.tsService = tsService;
            this._staticSymbolCache = new compiler_1.StaticSymbolCache();
            this._typeCache = [];
            this.modulesOutOfDate = true;
            this.fileVersions = new Map();
        }
        TypeScriptServiceHost.prototype.setSite = function (service) { this.service = service; };
        Object.defineProperty(TypeScriptServiceHost.prototype, "resolver", {
            /**
             * Angular LanguageServiceHost implementation
             */
            get: function () {
                var _this = this;
                this.validate();
                var result = this._resolver;
                if (!result) {
                    var moduleResolver = new compiler_1.NgModuleResolver(this.reflector);
                    var directiveResolver = new compiler_1.DirectiveResolver(this.reflector);
                    var pipeResolver = new compiler_1.PipeResolver(this.reflector);
                    var elementSchemaRegistry = new compiler_1.DomElementSchemaRegistry();
                    var resourceLoader = new DummyResourceLoader();
                    var urlResolver = compiler_1.createOfflineCompileUrlResolver();
                    var htmlParser = new DummyHtmlParser();
                    // This tracks the CompileConfig in codegen.ts. Currently these options
                    // are hard-coded.
                    var config = new compiler_1.CompilerConfig({ defaultEncapsulation: core_1.ViewEncapsulation.Emulated, useJit: false });
                    var directiveNormalizer = new compiler_1.DirectiveNormalizer(resourceLoader, urlResolver, htmlParser, config);
                    result = this._resolver = new compiler_1.CompileMetadataResolver(config, htmlParser, moduleResolver, directiveResolver, pipeResolver, new compiler_1.JitSummaryResolver(), elementSchemaRegistry, directiveNormalizer, new core_1.ɵConsole(), this._staticSymbolCache, this.reflector, function (error, type) { return _this.collectError(error, type && type.filePath); });
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        TypeScriptServiceHost.prototype.getTemplateReferences = function () {
            this.ensureTemplateMap();
            return this.templateReferences || [];
        };
        TypeScriptServiceHost.prototype.getTemplateAt = function (fileName, position) {
            var sourceFile = this.getSourceFile(fileName);
            if (sourceFile) {
                this.context = sourceFile.fileName;
                var node = this.findNode(sourceFile, position);
                if (node) {
                    return this.getSourceFromNode(fileName, this.host.getScriptVersion(sourceFile.fileName), node);
                }
            }
            else {
                this.ensureTemplateMap();
                // TODO: Cannocalize the file?
                var componentType = this.fileToComponent.get(fileName);
                if (componentType) {
                    return this.getSourceFromType(fileName, this.host.getScriptVersion(fileName), componentType);
                }
            }
            return undefined;
        };
        TypeScriptServiceHost.prototype.getAnalyzedModules = function () {
            this.updateAnalyzedModules();
            return this.ensureAnalyzedModules();
        };
        TypeScriptServiceHost.prototype.ensureAnalyzedModules = function () {
            var analyzedModules = this.analyzedModules;
            if (!analyzedModules) {
                if (this.host.getScriptFileNames().length === 0) {
                    analyzedModules = {
                        files: [],
                        ngModuleByPipeOrDirective: new Map(),
                        ngModules: [],
                    };
                }
                else {
                    var analyzeHost = { isSourceFile: function (filePath) { return true; } };
                    var programFiles = this.program.getSourceFiles().map(function (sf) { return sf.fileName; });
                    analyzedModules =
                        compiler_1.analyzeNgModules(programFiles, analyzeHost, this.staticSymbolResolver, this.resolver);
                }
                this.analyzedModules = analyzedModules;
            }
            return analyzedModules;
        };
        TypeScriptServiceHost.prototype.getTemplates = function (fileName) {
            var _this = this;
            this.ensureTemplateMap();
            var componentType = this.fileToComponent.get(fileName);
            if (componentType) {
                var templateSource = this.getTemplateAt(fileName, 0);
                if (templateSource) {
                    return [templateSource];
                }
            }
            else {
                var version_1 = this.host.getScriptVersion(fileName);
                var result_1 = [];
                // Find each template string in the file
                var visit_1 = function (child) {
                    var templateSource = _this.getSourceFromNode(fileName, version_1, child);
                    if (templateSource) {
                        result_1.push(templateSource);
                    }
                    else {
                        ts.forEachChild(child, visit_1);
                    }
                };
                var sourceFile = this.getSourceFile(fileName);
                if (sourceFile) {
                    this.context = sourceFile.path || sourceFile.fileName;
                    ts.forEachChild(sourceFile, visit_1);
                }
                return result_1.length ? result_1 : undefined;
            }
        };
        TypeScriptServiceHost.prototype.getDeclarations = function (fileName) {
            var _this = this;
            var result = [];
            var sourceFile = this.getSourceFile(fileName);
            if (sourceFile) {
                var visit_2 = function (child) {
                    var declaration = _this.getDeclarationFromNode(sourceFile, child);
                    if (declaration) {
                        result.push(declaration);
                    }
                    else {
                        ts.forEachChild(child, visit_2);
                    }
                };
                ts.forEachChild(sourceFile, visit_2);
            }
            return result;
        };
        TypeScriptServiceHost.prototype.getSourceFile = function (fileName) {
            return this.tsService.getProgram().getSourceFile(fileName);
        };
        TypeScriptServiceHost.prototype.updateAnalyzedModules = function () {
            this.validate();
            if (this.modulesOutOfDate) {
                this.analyzedModules = null;
                this._reflector = null;
                this.templateReferences = null;
                this.fileToComponent = null;
                this.ensureAnalyzedModules();
                this.modulesOutOfDate = false;
            }
        };
        Object.defineProperty(TypeScriptServiceHost.prototype, "program", {
            get: function () { return this.tsService.getProgram(); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeScriptServiceHost.prototype, "checker", {
            get: function () {
                var checker = this._checker;
                if (!checker) {
                    checker = this._checker = this.program.getTypeChecker();
                }
                return checker;
            },
            enumerable: true,
            configurable: true
        });
        TypeScriptServiceHost.prototype.validate = function () {
            var _this = this;
            var e_1, _a;
            var program = this.program;
            if (this.lastProgram !== program) {
                // Invalidate file that have changed in the static symbol resolver
                var invalidateFile = function (fileName) {
                    return _this._staticSymbolResolver.invalidateFile(fileName);
                };
                this.clearCaches();
                var seen_1 = new Set();
                try {
                    for (var _b = tslib_1.__values(this.program.getSourceFiles()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var sourceFile = _c.value;
                        var fileName = sourceFile.fileName;
                        seen_1.add(fileName);
                        var version = this.host.getScriptVersion(fileName);
                        var lastVersion = this.fileVersions.get(fileName);
                        if (version != lastVersion) {
                            this.fileVersions.set(fileName, version);
                            if (this._staticSymbolResolver) {
                                invalidateFile(fileName);
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                // Remove file versions that are no longer in the file and invalidate them.
                var missing = Array.from(this.fileVersions.keys()).filter(function (f) { return !seen_1.has(f); });
                missing.forEach(function (f) { return _this.fileVersions.delete(f); });
                if (this._staticSymbolResolver) {
                    missing.forEach(invalidateFile);
                }
                this.lastProgram = program;
            }
        };
        TypeScriptServiceHost.prototype.clearCaches = function () {
            this._checker = null;
            this._typeCache = [];
            this._resolver = null;
            this.collectedErrors = null;
            this.modulesOutOfDate = true;
        };
        TypeScriptServiceHost.prototype.ensureTemplateMap = function () {
            var e_2, _a, e_3, _b;
            if (!this.fileToComponent || !this.templateReferences) {
                var fileToComponent = new Map();
                var templateReference = [];
                var ngModuleSummary = this.getAnalyzedModules();
                var urlResolver = compiler_1.createOfflineCompileUrlResolver();
                try {
                    for (var _c = tslib_1.__values(ngModuleSummary.ngModules), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var module_1 = _d.value;
                        try {
                            for (var _e = tslib_1.__values(module_1.declaredDirectives), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var directive = _f.value;
                                var metadata = this.resolver.getNonNormalizedDirectiveMetadata(directive.reference).metadata;
                                if (metadata.isComponent && metadata.template && metadata.template.templateUrl) {
                                    var templateName = urlResolver.resolve(this.reflector.componentModuleUrl(directive.reference), metadata.template.templateUrl);
                                    fileToComponent.set(templateName, directive.reference);
                                    templateReference.push(templateName);
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                this.fileToComponent = fileToComponent;
                this.templateReferences = templateReference;
            }
        };
        TypeScriptServiceHost.prototype.getSourceFromDeclaration = function (fileName, version, source, span, type, declaration, node, sourceFile) {
            var queryCache = undefined;
            var t = this;
            if (declaration) {
                return {
                    version: version,
                    source: source,
                    span: span,
                    type: type,
                    get members() {
                        return language_services_1.getClassMembersFromDeclaration(t.program, t.checker, sourceFile, declaration);
                    },
                    get query() {
                        if (!queryCache) {
                            var pipes_1 = t.service.getPipesAt(fileName, node.getStart());
                            queryCache = language_services_1.getSymbolQuery(t.program, t.checker, sourceFile, function () { return language_services_1.getPipesTable(sourceFile, t.program, t.checker, pipes_1); });
                        }
                        return queryCache;
                    }
                };
            }
        };
        TypeScriptServiceHost.prototype.getSourceFromNode = function (fileName, version, node) {
            var result = undefined;
            var t = this;
            switch (node.kind) {
                case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                case ts.SyntaxKind.StringLiteral:
                    var _a = tslib_1.__read(this.getTemplateClassDeclFromNode(node), 2), declaration = _a[0], decorator = _a[1];
                    if (declaration && declaration.name) {
                        var sourceFile = this.getSourceFile(fileName);
                        if (sourceFile) {
                            return this.getSourceFromDeclaration(fileName, version, this.stringOf(node) || '', shrink(spanOf(node)), this.reflector.getStaticSymbol(sourceFile.fileName, declaration.name.text), declaration, node, sourceFile);
                        }
                    }
                    break;
            }
            return result;
        };
        TypeScriptServiceHost.prototype.getSourceFromType = function (fileName, version, type) {
            var result = undefined;
            var declaration = this.getTemplateClassFromStaticSymbol(type);
            if (declaration) {
                var snapshot = this.host.getScriptSnapshot(fileName);
                if (snapshot) {
                    var source = snapshot.getText(0, snapshot.getLength());
                    result = this.getSourceFromDeclaration(fileName, version, source, { start: 0, end: source.length }, type, declaration, declaration, declaration.getSourceFile());
                }
            }
            return result;
        };
        Object.defineProperty(TypeScriptServiceHost.prototype, "reflectorHost", {
            get: function () {
                var _this = this;
                var result = this._reflectorHost;
                if (!result) {
                    if (!this.context) {
                        // Make up a context by finding the first script and using that as the base dir.
                        var scriptFileNames = this.host.getScriptFileNames();
                        if (0 === scriptFileNames.length) {
                            throw new Error('Internal error: no script file names found');
                        }
                        this.context = scriptFileNames[0];
                    }
                    // Use the file context's directory as the base directory.
                    // The host's getCurrentDirectory() is not reliable as it is always "" in
                    // tsserver. We don't need the exact base directory, just one that contains
                    // a source file.
                    var source = this.tsService.getProgram().getSourceFile(this.context);
                    if (!source) {
                        throw new Error('Internal error: no context could be determined');
                    }
                    var tsConfigPath = findTsConfig(source.fileName);
                    var basePath = path.dirname(tsConfigPath || this.context);
                    var options = { basePath: basePath, genDir: basePath };
                    var compilerOptions = this.host.getCompilationSettings();
                    if (compilerOptions && compilerOptions.baseUrl) {
                        options.baseUrl = compilerOptions.baseUrl;
                    }
                    if (compilerOptions && compilerOptions.paths) {
                        options.paths = compilerOptions.paths;
                    }
                    result = this._reflectorHost =
                        new reflector_host_1.ReflectorHost(function () { return _this.tsService.getProgram(); }, this.host, options);
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        TypeScriptServiceHost.prototype.collectError = function (error, filePath) {
            if (filePath) {
                var errorMap = this.collectedErrors;
                if (!errorMap || !this.collectedErrors) {
                    errorMap = this.collectedErrors = new Map();
                }
                var errors = errorMap.get(filePath);
                if (!errors) {
                    errors = [];
                    this.collectedErrors.set(filePath, errors);
                }
                errors.push(error);
            }
        };
        Object.defineProperty(TypeScriptServiceHost.prototype, "staticSymbolResolver", {
            get: function () {
                var _this = this;
                var result = this._staticSymbolResolver;
                if (!result) {
                    this._summaryResolver = new compiler_1.AotSummaryResolver({
                        loadSummary: function (filePath) { return null; },
                        isSourceFile: function (sourceFilePath) { return true; },
                        toSummaryFileName: function (sourceFilePath) { return sourceFilePath; },
                        fromSummaryFileName: function (filePath) { return filePath; },
                    }, this._staticSymbolCache);
                    result = this._staticSymbolResolver = new compiler_1.StaticSymbolResolver(this.reflectorHost, this._staticSymbolCache, this._summaryResolver, function (e, filePath) { return _this.collectError(e, filePath); });
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeScriptServiceHost.prototype, "reflector", {
            get: function () {
                var _this = this;
                var result = this._reflector;
                if (!result) {
                    var ssr = this.staticSymbolResolver;
                    result = this._reflector = new compiler_1.StaticReflector(this._summaryResolver, ssr, [], [], function (e, filePath) { return _this.collectError(e, filePath); });
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        TypeScriptServiceHost.prototype.getTemplateClassFromStaticSymbol = function (type) {
            var source = this.getSourceFile(type.filePath);
            if (source) {
                var declarationNode = ts.forEachChild(source, function (child) {
                    if (child.kind === ts.SyntaxKind.ClassDeclaration) {
                        var classDeclaration = child;
                        if (classDeclaration.name != null && classDeclaration.name.text === type.name) {
                            return classDeclaration;
                        }
                    }
                });
                return declarationNode;
            }
            return undefined;
        };
        /**
         * Given a template string node, see if it is an Angular template string, and if so return the
         * containing class.
         */
        TypeScriptServiceHost.prototype.getTemplateClassDeclFromNode = function (currentToken) {
            // Verify we are in a 'template' property assignment, in an object literal, which is an call
            // arg, in a decorator
            var parentNode = currentToken.parent; // PropertyAssignment
            if (!parentNode) {
                return TypeScriptServiceHost.missingTemplate;
            }
            if (parentNode.kind !== ts.SyntaxKind.PropertyAssignment) {
                return TypeScriptServiceHost.missingTemplate;
            }
            else {
                // TODO: Is this different for a literal, i.e. a quoted property name like "template"?
                if (parentNode.name.text !== 'template') {
                    return TypeScriptServiceHost.missingTemplate;
                }
            }
            parentNode = parentNode.parent; // ObjectLiteralExpression
            if (!parentNode || parentNode.kind !== ts.SyntaxKind.ObjectLiteralExpression) {
                return TypeScriptServiceHost.missingTemplate;
            }
            parentNode = parentNode.parent; // CallExpression
            if (!parentNode || parentNode.kind !== ts.SyntaxKind.CallExpression) {
                return TypeScriptServiceHost.missingTemplate;
            }
            var callTarget = parentNode.expression;
            var decorator = parentNode.parent; // Decorator
            if (!decorator || decorator.kind !== ts.SyntaxKind.Decorator) {
                return TypeScriptServiceHost.missingTemplate;
            }
            var declaration = decorator.parent; // ClassDeclaration
            if (!declaration || declaration.kind !== ts.SyntaxKind.ClassDeclaration) {
                return TypeScriptServiceHost.missingTemplate;
            }
            return [declaration, callTarget];
        };
        TypeScriptServiceHost.prototype.getCollectedErrors = function (defaultSpan, sourceFile) {
            var errors = (this.collectedErrors && this.collectedErrors.get(sourceFile.fileName));
            return (errors && errors.map(function (e) {
                var line = e.line || (e.position && e.position.line);
                var column = e.column || (e.position && e.position.column);
                var span = spanAt(sourceFile, line, column) || defaultSpan;
                if (compiler_1.isFormattedError(e)) {
                    return errorToDiagnosticWithChain(e, span);
                }
                return { message: e.message, span: span };
            })) ||
                [];
        };
        TypeScriptServiceHost.prototype.getDeclarationFromNode = function (sourceFile, node) {
            var e_4, _a;
            if (node.kind == ts.SyntaxKind.ClassDeclaration && node.decorators &&
                node.name) {
                try {
                    for (var _b = tslib_1.__values(node.decorators), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var decorator = _c.value;
                        if (decorator.expression && decorator.expression.kind == ts.SyntaxKind.CallExpression) {
                            var classDeclaration = node;
                            if (classDeclaration.name) {
                                var call = decorator.expression;
                                var target = call.expression;
                                var type = this.checker.getTypeAtLocation(target);
                                if (type) {
                                    var staticSymbol = this.reflector.getStaticSymbol(sourceFile.fileName, classDeclaration.name.text);
                                    try {
                                        if (this.resolver.isDirective(staticSymbol)) {
                                            var metadata = this.resolver.getNonNormalizedDirectiveMetadata(staticSymbol).metadata;
                                            var declarationSpan = spanOf(target);
                                            return {
                                                type: staticSymbol,
                                                declarationSpan: declarationSpan,
                                                metadata: metadata,
                                                errors: this.getCollectedErrors(declarationSpan, sourceFile)
                                            };
                                        }
                                    }
                                    catch (e) {
                                        if (e.message) {
                                            this.collectError(e, sourceFile.fileName);
                                            var declarationSpan = spanOf(target);
                                            return {
                                                type: staticSymbol,
                                                declarationSpan: declarationSpan,
                                                errors: this.getCollectedErrors(declarationSpan, sourceFile)
                                            };
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        };
        TypeScriptServiceHost.prototype.stringOf = function (node) {
            switch (node.kind) {
                case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                    return node.text;
                case ts.SyntaxKind.StringLiteral:
                    return node.text;
            }
        };
        TypeScriptServiceHost.prototype.findNode = function (sourceFile, position) {
            function find(node) {
                if (position >= node.getStart() && position < node.getEnd()) {
                    return ts.forEachChild(node, find) || node;
                }
            }
            return find(sourceFile);
        };
        TypeScriptServiceHost.missingTemplate = [undefined, undefined];
        return TypeScriptServiceHost;
    }());
    exports.TypeScriptServiceHost = TypeScriptServiceHost;
    function findTsConfig(fileName) {
        var dir = path.dirname(fileName);
        while (fs.existsSync(dir)) {
            var candidate = path.join(dir, 'tsconfig.json');
            if (fs.existsSync(candidate))
                return candidate;
            var parentDir = path.dirname(dir);
            if (parentDir === dir)
                break;
            dir = parentDir;
        }
    }
    function spanOf(node) {
        return { start: node.getStart(), end: node.getEnd() };
    }
    function shrink(span, offset) {
        if (offset == null)
            offset = 1;
        return { start: span.start + offset, end: span.end - offset };
    }
    function spanAt(sourceFile, line, column) {
        if (line != null && column != null) {
            var position_1 = ts.getPositionOfLineAndCharacter(sourceFile, line, column);
            var findChild = function findChild(node) {
                if (node.kind > ts.SyntaxKind.LastToken && node.pos <= position_1 && node.end > position_1) {
                    var betterNode = ts.forEachChild(node, findChild);
                    return betterNode || node;
                }
            };
            var node = ts.forEachChild(sourceFile, findChild);
            if (node) {
                return { start: node.getStart(), end: node.getEnd() };
            }
        }
    }
    function chainedMessage(chain, indent) {
        if (indent === void 0) { indent = ''; }
        return indent + chain.message + (chain.next ? chainedMessage(chain.next, indent + '  ') : '');
    }
    var DiagnosticMessageChainImpl = /** @class */ (function () {
        function DiagnosticMessageChainImpl(message, next) {
            this.message = message;
            this.next = next;
        }
        DiagnosticMessageChainImpl.prototype.toString = function () { return chainedMessage(this); };
        return DiagnosticMessageChainImpl;
    }());
    function convertChain(chain) {
        return { message: chain.message, next: chain.next ? convertChain(chain.next) : undefined };
    }
    function errorToDiagnosticWithChain(error, span) {
        return { message: error.chain ? convertChain(error.chain) : error.message, span: span };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXNjcmlwdF9ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbGFuZ3VhZ2Utc2VydmljZS9zcmMvdHlwZXNjcmlwdF9ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7OztJQUVILDhDQUE0Z0I7SUFDNWdCLGlGQUEySTtJQUMzSSxzQ0FBcUU7SUFDckUsdUJBQXlCO0lBQ3pCLDJCQUE2QjtJQUM3QiwrQkFBaUM7SUFFakMsbUZBQXlEO0lBQ3pELCtFQUErQztJQU0vQzs7T0FFRztJQUNILDZDQUNJLElBQTRCLEVBQUUsT0FBMkI7UUFDM0QsSUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDeEQsSUFBTSxRQUFRLEdBQUcsd0NBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBTkQsa0ZBTUM7SUFFRDs7Ozs7T0FLRztJQUNIO1FBQXFDLDJDQUFVO1FBQS9DOztRQU1BLENBQUM7UUFMQywrQkFBSyxHQUFMLFVBQ0ksTUFBYyxFQUFFLEdBQVcsRUFBRSxtQkFBb0MsRUFDakUsbUJBQXVFO1lBRDFDLG9DQUFBLEVBQUEsMkJBQW9DO1lBQ2pFLG9DQUFBLEVBQUEsc0JBQTJDLHVDQUE0QjtZQUN6RSxPQUFPLElBQUksMEJBQWUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUNILHNCQUFDO0lBQUQsQ0FBQyxBQU5ELENBQXFDLHFCQUFVLEdBTTlDO0lBTlksMENBQWU7SUFRNUI7O09BRUc7SUFDSDtRQUF5QywrQ0FBYztRQUF2RDs7UUFFQSxDQUFDO1FBREMsaUNBQUcsR0FBSCxVQUFJLEdBQVcsSUFBcUIsT0FBTyxPQUFPLENB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QUMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRUQ7UUFDRSxvQ0FBbUIsT0FBZSxFQUFTLElBQTZCO1lBQXJELFlBQU8sR0FBUCxPQUFPLENBQVE7WUFBUyxTQUFJLEdBQUosSUFBSSxDQUF5QjtRQUFHLENBQUM7UUFDNUUsNkNBQVEsR0FBUixjQUFxQixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsaUNBQUM7SUFBRCxDQUFDLEFBSEQsSUFHQztJQUVELHNCQUFzQixLQUE0QjtRQUNoRCxPQUFPLEVBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQyxDQUFDO0lBQzNGLENBQUM7SUFFRCxvQ0FBb0MsS0FBcUIsRUFBRSxJQUFVO1FBQ25FLE9BQU8sRUFBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLE1BQUEsRUFBQyxDQUFDO0lBQ2xGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QW90U3VtbWFyeVJlc29sdmVyLCBDb21waWxlTWV0YWRhdGFSZXNvbHZlciwgQ29tcGlsZXJDb25maWcsIERFRkFVTFRfSU5URVJQT0xBVElPTl9DT05GSUcsIERpcmVjdGl2ZU5vcm1hbGl6ZXIsIERpcmVjdGl2ZVJlc29sdmVyLCBEb21FbGVtZW50U2NoZW1hUmVnaXN0cnksIEZvcm1hdHRlZEVycm9yLCBGb3JtYXR0ZWRNZXNzYWdlQ2hhaW4sIEh0bWxQYXJzZXIsIEludGVycG9sYXRpb25Db25maWcsIEppdFN1bW1hcnlSZXNvbHZlciwgTmdBbmFseXplZE1vZHVsZXMsIE5nTW9kdWxlUmVzb2x2ZXIsIFBhcnNlVHJlZVJlc3VsdCwgUGlwZVJlc29sdmVyLCBSZXNvdXJjZUxvYWRlciwgU3RhdGljUmVmbGVjdG9yLCBTdGF0aWNTeW1ib2wsIFN0YXRpY1N5bWJvbENhY2hlLCBTdGF0aWNTeW1ib2xSZXNvbHZlciwgU3VtbWFyeVJlc29sdmVyLCBhbmFseXplTmdNb2R1bGVzLCBjcmVhdGVPZmZsaW5lQ29tcGlsZVVybFJlc29sdmVyLCBpc0Zvcm1hdHRlZEVycm9yfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQge0NvbXBpbGVyT3B0aW9ucywgZ2V0Q2xhc3NNZW1iZXJzRnJvbURlY2xhcmF0aW9uLCBnZXRQaXBlc1RhYmxlLCBnZXRTeW1ib2xRdWVyeX0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXItY2xpL3NyYy9sYW5ndWFnZV9zZXJ2aWNlcyc7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9uLCDJtUNvbnNvbGUgYXMgQ29uc29sZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7Y3JlYXRlTGFuZ3VhZ2VTZXJ2aWNlfSBmcm9tICcuL2xhbmd1YWdlX3NlcnZpY2UnO1xuaW1wb3J0IHtSZWZsZWN0b3JIb3N0fSBmcm9tICcuL3JlZmxlY3Rvcl9ob3N0JztcbmltcG9ydCB7QnVpbHRpblR5cGUsIERlY2xhcmF0aW9uLCBEZWNsYXJhdGlvbkVycm9yLCBEZWNsYXJhdGlvbktpbmQsIERlY2xhcmF0aW9ucywgRGVmaW5pdGlvbiwgRGlhZ25vc3RpY01lc3NhZ2VDaGFpbiwgTGFuZ3VhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2VIb3N0LCBQaXBlSW5mbywgUGlwZXMsIFNpZ25hdHVyZSwgU3BhbiwgU3ltYm9sLCBTeW1ib2xEZWNsYXJhdGlvbiwgU3ltYm9sUXVlcnksIFN5bWJvbFRhYmxlLCBUZW1wbGF0ZVNvdXJjZSwgVGVtcGxhdGVTb3VyY2VzfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7aXNUeXBlc2NyaXB0VmVyc2lvbn0gZnJvbSAnLi91dGlscyc7XG5cblxuXG4vKipcbiAqIENyZWF0ZSBhIGBMYW5ndWFnZVNlcnZpY2VIb3N0YFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGFuZ3VhZ2VTZXJ2aWNlRnJvbVR5cGVzY3JpcHQoXG4gICAgaG9zdDogdHMuTGFuZ3VhZ2VTZXJ2aWNlSG9zdCwgc2VydmljZTogdHMuTGFuZ3VhZ2VTZXJ2aWNlKTogTGFuZ3VhZ2VTZXJ2aWNlIHtcbiAgY29uc3QgbmdIb3N0ID0gbmV3IFR5cGVTY3JpcHRTZXJ2aWNlSG9zdChob3N0LCBzZXJ2aWNlKTtcbiAgY29uc3QgbmdTZXJ2ZXIgPSBjcmVhdGVMYW5ndWFnZVNlcnZpY2UobmdIb3N0KTtcbiAgbmdIb3N0LnNldFNpdGUobmdTZXJ2ZXIpO1xuICByZXR1cm4gbmdTZXJ2ZXI7XG59XG5cbi8qKlxuICogVGhlIGxhbmd1YWdlIHNlcnZpY2UgbmV2ZXIgbmVlZHMgdGhlIG5vcm1hbGl6ZWQgdmVyc2lvbnMgb2YgdGhlIG1ldGFkYXRhLiBUbyBhdm9pZCBwYXJzaW5nXG4gKiB0aGUgY29udGVudCBhbmQgcmVzb2x2aW5nIHJlZmVyZW5jZXMsIHJldHVybiBhbiBlbXB0eSBmaWxlLiBUaGlzIGFsc28gYWxsb3dzIG5vcm1hbGl6aW5nXG4gKiB0ZW1wbGF0ZSB0aGF0IGFyZSBzeW50YXRpY2FsbHkgaW5jb3JyZWN0IHdoaWNoIGlzIHJlcXVpcmVkIHRvIHByb3ZpZGUgY29tcGxldGlvbnMgaW5cbiAqIHN5bnRhY3RpY2FsbHkgaW5jb3JyZWN0IHRlbXBsYXRlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIER1bW15SHRtbFBhcnNlciBleHRlbmRzIEh0bWxQYXJzZXIge1xuICBwYXJzZShcbiAgICAgIHNvdXJjZTogc3RyaW5nLCB1cmw6IHN0cmluZywgcGFyc2VFeHBhbnNpb25Gb3JtczogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgaW50ZXJwb2xhdGlvbkNvbmZpZzogSW50ZXJwb2xhdGlvbkNvbmZpZyA9IERFRkFVTFRfSU5URVJQT0xBVElPTl9DT05GSUcpOiBQYXJzZVRyZWVSZXN1bHQge1xuICAgIHJldHVybiBuZXcgUGFyc2VUcmVlUmVzdWx0KFtdLCBbXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBdm9pZCBsb2FkaW5nIHJlc291cmNlcyBpbiB0aGUgbGFuZ3VhZ2Ugc2VydmNpZSBieSB1c2luZyBhIGR1bW15IGxvYWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIER1bW15UmVzb3VyY2VMb2FkZXIgZXh0ZW5kcyBSZXNvdXJjZUxvYWRlciB7XG4gIGdldCh1cmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7IHJldHVybiBQcm9taXNlLnJlc29sdmUoJycpOyB9XG59XG5cbi8qKlxuICogQW4gaW1wbGVtZW50YXRpb24gb2YgYSBgTGFuZ3VhZ2VTZXJ2aWNlSG9zdGAgZm9yIGEgVHlwZVNjcmlwdCBwcm9qZWN0LlxuICpcbiAqIFRoZSBgVHlwZVNjcmlwdFNlcnZpY2VIb3N0YCBpbXBsZW1lbnRzIHRoZSBBbmd1bGFyIGBMYW5ndWFnZVNlcnZpY2VIb3N0YCB1c2luZ1xuICogdGhlIFR5cGVTY3JpcHQgbGFuZ3VhZ2Ugc2VydmljZXMuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgY2xhc3MgVHlwZVNjcmlwdFNlcnZpY2VIb3N0IGltcGxlbWVudHMgTGFuZ3VhZ2VTZXJ2aWNlSG9zdCB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9yZXNvbHZlciAhOiBDb21waWxlTWV0YWRhdGFSZXNvbHZlciB8IG51bGw7XG4gIHByaXZhdGUgX3N0YXRpY1N5bWJvbENhY2hlID0gbmV3IFN0YXRpY1N5bWJvbENhY2hlKCk7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9zdW1tYXJ5UmVzb2x2ZXIgITogQW90U3VtbWFyeVJlc29sdmVyO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfc3RhdGljU3ltYm9sUmVzb2x2ZXIgITogU3RhdGljU3ltYm9sUmVzb2x2ZXI7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9yZWZsZWN0b3IgITogU3RhdGljUmVmbGVjdG9yIHwgbnVsbDtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgX3JlZmxlY3Rvckhvc3QgITogUmVmbGVjdG9ySG9zdDtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgX2NoZWNrZXIgITogdHMuVHlwZUNoZWNrZXIgfCBudWxsO1xuICBwcml2YXRlIF90eXBlQ2FjaGU6IFN5bWJvbFtdID0gW107XG4gIHByaXZhdGUgY29udGV4dDogc3RyaW5nfHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBsYXN0UHJvZ3JhbTogdHMuUHJvZ3JhbXx1bmRlZmluZWQ7XG4gIHByaXZhdGUgbW9kdWxlc091dE9mRGF0ZTogYm9vbGVhbiA9IHRydWU7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIGFuYWx5emVkTW9kdWxlcyAhOiBOZ0FuYWx5emVkTW9kdWxlcyB8IG51bGw7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIHNlcnZpY2UgITogTGFuZ3VhZ2VTZXJ2aWNlO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBmaWxlVG9Db21wb25lbnQgITogTWFwPHN0cmluZywgU3RhdGljU3ltYm9sPnwgbnVsbDtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgdGVtcGxhdGVSZWZlcmVuY2VzICE6IHN0cmluZ1tdIHwgbnVsbDtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgY29sbGVjdGVkRXJyb3JzICE6IE1hcDxzdHJpbmcsIGFueVtdPnwgbnVsbDtcbiAgcHJpdmF0ZSBmaWxlVmVyc2lvbnMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaG9zdDogdHMuTGFuZ3VhZ2VTZXJ2aWNlSG9zdCwgcHJpdmF0ZSB0c1NlcnZpY2U6IHRzLkxhbmd1YWdlU2VydmljZSkge31cblxuICBzZXRTaXRlKHNlcnZpY2U6IExhbmd1YWdlU2VydmljZSkgeyB0aGlzLnNlcnZpY2UgPSBzZXJ2aWNlOyB9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIgTGFuZ3VhZ2VTZXJ2aWNlSG9zdCBpbXBsZW1lbnRhdGlvblxuICAgKi9cbiAgZ2V0IHJlc29sdmVyKCk6IENvbXBpbGVNZXRhZGF0YVJlc29sdmVyIHtcbiAgICB0aGlzLnZhbGlkYXRlKCk7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuX3Jlc29sdmVyO1xuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICBjb25zdCBtb2R1bGVSZXNvbHZlciA9IG5ldyBOZ01vZHVsZVJlc29sdmVyKHRoaXMucmVmbGVjdG9yKTtcbiAgICAgIGNvbnN0IGRpcmVjdGl2ZVJlc29sdmVyID0gbmV3IERpcmVjdGl2ZVJlc29sdmVyKHRoaXMucmVmbGVjdG9yKTtcbiAgICAgIGNvbnN0IHBpcGVSZXNvbHZlciA9IG5ldyBQaXBlUmVzb2x2ZXIodGhpcy5yZWZsZWN0b3IpO1xuICAgICAgY29uc3QgZWxlbWVudFNjaGVtYVJlZ2lzdHJ5ID0gbmV3IERvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeSgpO1xuICAgICAgY29uc3QgcmVzb3VyY2VMb2FkZXIgPSBuZXcgRHVtbXlSZXNvdXJjZUxvYWRlcigpO1xuICAgICAgY29uc3QgdXJsUmVzb2x2ZXIgPSBjcmVhdGVPZmZsaW5lQ29tcGlsZVVybFJlc29sdmVyKCk7XG4gICAgICBjb25zdCBodG1sUGFyc2VyID0gbmV3IER1bW15SHRtbFBhcnNlcigpO1xuICAgICAgLy8gVGhpcyB0cmFja3MgdGhlIENvbXBpbGVDb25maWcgaW4gY29kZWdlbi50cy4gQ3VycmVudGx5IHRoZXNlIG9wdGlvbnNcbiAgICAgIC8vIGFyZSBoYXJkLWNvZGVkLlxuICAgICAgY29uc3QgY29uZmlnID1cbiAgICAgICAgICBuZXcgQ29tcGlsZXJDb25maWcoe2RlZmF1bHRFbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZCwgdXNlSml0OiBmYWxzZX0pO1xuICAgICAgY29uc3QgZGlyZWN0aXZlTm9ybWFsaXplciA9XG4gICAgICAgICAgbmV3IERpcmVjdGl2ZU5vcm1hbGl6ZXIocmVzb3VyY2VMb2FkZXIsIHVybFJlc29sdmVyLCBodG1sUGFyc2VyLCBjb25maWcpO1xuXG4gICAgICByZXN1bHQgPSB0aGlzLl9yZXNvbHZlciA9IG5ldyBDb21waWxlTWV0YWRhdGFSZXNvbHZlcihcbiAgICAgICAgICBjb25maWcsIGh0bWxQYXJzZXIsIG1vZHVsZVJlc29sdmVyLCBkaXJlY3RpdmVSZXNvbHZlciwgcGlwZVJlc29sdmVyLFxuICAgICAgICAgIG5ldyBKaXRTdW1tYXJ5UmVzb2x2ZXIoKSwgZWxlbWVudFNjaGVtYVJlZ2lzdHJ5LCBkaXJlY3RpdmVOb3JtYWxpemVyLCBuZXcgQ29uc29sZSgpLFxuICAgICAgICAgIHRoaXMuX3N0YXRpY1N5bWJvbENhY2hlLCB0aGlzLnJlZmxlY3RvcixcbiAgICAgICAgICAoZXJyb3IsIHR5cGUpID0+IHRoaXMuY29sbGVjdEVycm9yKGVycm9yLCB0eXBlICYmIHR5cGUuZmlsZVBhdGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldFRlbXBsYXRlUmVmZXJlbmNlcygpOiBzdHJpbmdbXSB7XG4gICAgdGhpcy5lbnN1cmVUZW1wbGF0ZU1hcCgpO1xuICAgIHJldHVybiB0aGlzLnRlbXBsYXRlUmVmZXJlbmNlcyB8fCBbXTtcbiAgfVxuXG4gIGdldFRlbXBsYXRlQXQoZmlsZU5hbWU6IHN0cmluZywgcG9zaXRpb246IG51bWJlcik6IFRlbXBsYXRlU291cmNlfHVuZGVmaW5lZCB7XG4gICAgbGV0IHNvdXJjZUZpbGUgPSB0aGlzLmdldFNvdXJjZUZpbGUoZmlsZU5hbWUpO1xuICAgIGlmIChzb3VyY2VGaWxlKSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSBzb3VyY2VGaWxlLmZpbGVOYW1lO1xuICAgICAgbGV0IG5vZGUgPSB0aGlzLmZpbmROb2RlKHNvdXJjZUZpbGUsIHBvc2l0aW9uKTtcbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNvdXJjZUZyb21Ob2RlKFxuICAgICAgICAgICAgZmlsZU5hbWUsIHRoaXMuaG9zdC5nZXRTY3JpcHRWZXJzaW9uKHNvdXJjZUZpbGUuZmlsZU5hbWUpLCBub2RlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbnN1cmVUZW1wbGF0ZU1hcCgpO1xuICAgICAgLy8gVE9ETzogQ2Fubm9jYWxpemUgdGhlIGZpbGU/XG4gICAgICBjb25zdCBjb21wb25lbnRUeXBlID0gdGhpcy5maWxlVG9Db21wb25lbnQgIS5nZXQoZmlsZU5hbWUpO1xuICAgICAgaWYgKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U291cmNlRnJvbVR5cGUoXG4gICAgICAgICAgICBmaWxlTmFtZSwgdGhpcy5ob3N0LmdldFNjcmlwdFZlcnNpb24oZmlsZU5hbWUpLCBjb21wb25lbnRUeXBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldEFuYWx5emVkTW9kdWxlcygpOiBOZ0FuYWx5emVkTW9kdWxlcyB7XG4gICAgdGhpcy51cGRhdGVBbmFseXplZE1vZHVsZXMoKTtcbiAgICByZXR1cm4gdGhpcy5lbnN1cmVBbmFseXplZE1vZHVsZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZW5zdXJlQW5hbHl6ZWRNb2R1bGVzKCk6IE5nQW5hbHl6ZWRNb2R1bGVzIHtcbiAgICBsZXQgYW5hbHl6ZWRNb2R1bGVzID0gdGhpcy5hbmFseXplZE1vZHVsZXM7XG4gICAgaWYgKCFhbmFseXplZE1vZHVsZXMpIHtcbiAgICAgIGlmICh0aGlzLmhvc3QuZ2V0U2NyaXB0RmlsZU5hbWVzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGFuYWx5emVkTW9kdWxlcyA9IHtcbiAgICAgICAgICBmaWxlczogW10sXG4gICAgICAgICAgbmdNb2R1bGVCeVBpcGVPckRpcmVjdGl2ZTogbmV3IE1hcCgpLFxuICAgICAgICAgIG5nTW9kdWxlczogW10sXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBhbmFseXplSG9zdCA9IHtpc1NvdXJjZUZpbGUoZmlsZVBhdGg6IHN0cmluZykgeyByZXR1cm4gdHJ1ZTsgfX07XG4gICAgICAgIGNvbnN0IHByb2dyYW1GaWxlcyA9IHRoaXMucHJvZ3JhbS5nZXRTb3VyY2VGaWxlcygpLm1hcChzZiA9PiBzZi5maWxlTmFtZSk7XG4gICAgICAgIGFuYWx5emVkTW9kdWxlcyA9XG4gICAgICAgICAgICBhbmFseXplTmdNb2R1bGVzKHByb2dyYW1GaWxlcywgYW5hbHl6ZUhvc3QsIHRoaXMuc3RhdGljU3ltYm9sUmVzb2x2ZXIsIHRoaXMucmVzb2x2ZXIpO1xuICAgICAgfVxuICAgICAgdGhpcy5hbmFseXplZE1vZHVsZXMgPSBhbmFseXplZE1vZHVsZXM7XG4gICAgfVxuICAgIHJldHVybiBhbmFseXplZE1vZHVsZXM7XG4gIH1cblxuICBnZXRUZW1wbGF0ZXMoZmlsZU5hbWU6IHN0cmluZyk6IFRlbXBsYXRlU291cmNlcyB7XG4gICAgdGhpcy5lbnN1cmVUZW1wbGF0ZU1hcCgpO1xuICAgIGNvbnN0IGNvbXBvbmVudFR5cGUgPSB0aGlzLmZpbGVUb0NvbXBvbmVudCAhLmdldChmaWxlTmFtZSk7XG4gICAgaWYgKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNvbnN0IHRlbXBsYXRlU291cmNlID0gdGhpcy5nZXRUZW1wbGF0ZUF0KGZpbGVOYW1lLCAwKTtcbiAgICAgIGlmICh0ZW1wbGF0ZVNvdXJjZSkge1xuICAgICAgICByZXR1cm4gW3RlbXBsYXRlU291cmNlXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHZlcnNpb24gPSB0aGlzLmhvc3QuZ2V0U2NyaXB0VmVyc2lvbihmaWxlTmFtZSk7XG4gICAgICBsZXQgcmVzdWx0OiBUZW1wbGF0ZVNvdXJjZVtdID0gW107XG5cbiAgICAgIC8vIEZpbmQgZWFjaCB0ZW1wbGF0ZSBzdHJpbmcgaW4gdGhlIGZpbGVcbiAgICAgIGxldCB2aXNpdCA9IChjaGlsZDogdHMuTm9kZSkgPT4ge1xuICAgICAgICBsZXQgdGVtcGxhdGVTb3VyY2UgPSB0aGlzLmdldFNvdXJjZUZyb21Ob2RlKGZpbGVOYW1lLCB2ZXJzaW9uLCBjaGlsZCk7XG4gICAgICAgIGlmICh0ZW1wbGF0ZVNvdXJjZSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHRlbXBsYXRlU291cmNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cy5mb3JFYWNoQ2hpbGQoY2hpbGQsIHZpc2l0KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgbGV0IHNvdXJjZUZpbGUgPSB0aGlzLmdldFNvdXJjZUZpbGUoZmlsZU5hbWUpO1xuICAgICAgaWYgKHNvdXJjZUZpbGUpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gKHNvdXJjZUZpbGUgYXMgYW55KS5wYXRoIHx8IHNvdXJjZUZpbGUuZmlsZU5hbWU7XG4gICAgICAgIHRzLmZvckVhY2hDaGlsZChzb3VyY2VGaWxlLCB2aXNpdCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdCA6IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBnZXREZWNsYXJhdGlvbnMoZmlsZU5hbWU6IHN0cmluZyk6IERlY2xhcmF0aW9ucyB7XG4gICAgY29uc3QgcmVzdWx0OiBEZWNsYXJhdGlvbnMgPSBbXTtcbiAgICBjb25zdCBzb3VyY2VGaWxlID0gdGhpcy5nZXRTb3VyY2VGaWxlKGZpbGVOYW1lKTtcbiAgICBpZiAoc291cmNlRmlsZSkge1xuICAgICAgbGV0IHZpc2l0ID0gKGNoaWxkOiB0cy5Ob2RlKSA9PiB7XG4gICAgICAgIGxldCBkZWNsYXJhdGlvbiA9IHRoaXMuZ2V0RGVjbGFyYXRpb25Gcm9tTm9kZShzb3VyY2VGaWxlLCBjaGlsZCk7XG4gICAgICAgIGlmIChkZWNsYXJhdGlvbikge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGRlY2xhcmF0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cy5mb3JFYWNoQ2hpbGQoY2hpbGQsIHZpc2l0KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHRzLmZvckVhY2hDaGlsZChzb3VyY2VGaWxlLCB2aXNpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRTb3VyY2VGaWxlKGZpbGVOYW1lOiBzdHJpbmcpOiB0cy5Tb3VyY2VGaWxlfHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMudHNTZXJ2aWNlLmdldFByb2dyYW0oKS5nZXRTb3VyY2VGaWxlKGZpbGVOYW1lKTtcbiAgfVxuXG4gIHVwZGF0ZUFuYWx5emVkTW9kdWxlcygpIHtcbiAgICB0aGlzLnZhbGlkYXRlKCk7XG4gICAgaWYgKHRoaXMubW9kdWxlc091dE9mRGF0ZSkge1xuICAgICAgdGhpcy5hbmFseXplZE1vZHVsZXMgPSBudWxsO1xuICAgICAgdGhpcy5fcmVmbGVjdG9yID0gbnVsbDtcbiAgICAgIHRoaXMudGVtcGxhdGVSZWZlcmVuY2VzID0gbnVsbDtcbiAgICAgIHRoaXMuZmlsZVRvQ29tcG9uZW50ID0gbnVsbDtcbiAgICAgIHRoaXMuZW5zdXJlQW5hbHl6ZWRNb2R1bGVzKCk7XG4gICAgICB0aGlzLm1vZHVsZXNPdXRPZkRhdGUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCBwcm9ncmFtKCkgeyByZXR1cm4gdGhpcy50c1NlcnZpY2UuZ2V0UHJvZ3JhbSgpOyB9XG5cbiAgcHJpdmF0ZSBnZXQgY2hlY2tlcigpIHtcbiAgICBsZXQgY2hlY2tlciA9IHRoaXMuX2NoZWNrZXI7XG4gICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICBjaGVja2VyID0gdGhpcy5fY2hlY2tlciA9IHRoaXMucHJvZ3JhbS5nZXRUeXBlQ2hlY2tlcigpO1xuICAgIH1cbiAgICByZXR1cm4gY2hlY2tlcjtcbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGUoKSB7XG4gICAgY29uc3QgcHJvZ3JhbSA9IHRoaXMucHJvZ3JhbTtcbiAgICBpZiAodGhpcy5sYXN0UHJvZ3JhbSAhPT0gcHJvZ3JhbSkge1xuICAgICAgLy8gSW52YWxpZGF0ZSBmaWxlIHRoYXQgaGF2ZSBjaGFuZ2VkIGluIHRoZSBzdGF0aWMgc3ltYm9sIHJlc29sdmVyXG4gICAgICBjb25zdCBpbnZhbGlkYXRlRmlsZSA9IChmaWxlTmFtZTogc3RyaW5nKSA9PlxuICAgICAgICAgIHRoaXMuX3N0YXRpY1N5bWJvbFJlc29sdmVyLmludmFsaWRhdGVGaWxlKGZpbGVOYW1lKTtcbiAgICAgIHRoaXMuY2xlYXJDYWNoZXMoKTtcbiAgICAgIGNvbnN0IHNlZW4gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgIGZvciAobGV0IHNvdXJjZUZpbGUgb2YgdGhpcy5wcm9ncmFtLmdldFNvdXJjZUZpbGVzKCkpIHtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBzb3VyY2VGaWxlLmZpbGVOYW1lO1xuICAgICAgICBzZWVuLmFkZChmaWxlTmFtZSk7XG4gICAgICAgIGNvbnN0IHZlcnNpb24gPSB0aGlzLmhvc3QuZ2V0U2NyaXB0VmVyc2lvbihmaWxlTmFtZSk7XG4gICAgICAgIGNvbnN0IGxhc3RWZXJzaW9uID0gdGhpcy5maWxlVmVyc2lvbnMuZ2V0KGZpbGVOYW1lKTtcbiAgICAgICAgaWYgKHZlcnNpb24gIT0gbGFzdFZlcnNpb24pIHtcbiAgICAgICAgICB0aGlzLmZpbGVWZXJzaW9ucy5zZXQoZmlsZU5hbWUsIHZlcnNpb24pO1xuICAgICAgICAgIGlmICh0aGlzLl9zdGF0aWNTeW1ib2xSZXNvbHZlcikge1xuICAgICAgICAgICAgaW52YWxpZGF0ZUZpbGUoZmlsZU5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgZmlsZSB2ZXJzaW9ucyB0aGF0IGFyZSBubyBsb25nZXIgaW4gdGhlIGZpbGUgYW5kIGludmFsaWRhdGUgdGhlbS5cbiAgICAgIGNvbnN0IG1pc3NpbmcgPSBBcnJheS5mcm9tKHRoaXMuZmlsZVZlcnNpb25zLmtleXMoKSkuZmlsdGVyKGYgPT4gIXNlZW4uaGFzKGYpKTtcbiAgICAgIG1pc3NpbmcuZm9yRWFjaChmID0+IHRoaXMuZmlsZVZlcnNpb25zLmRlbGV0ZShmKSk7XG4gICAgICBpZiAodGhpcy5fc3RhdGljU3ltYm9sUmVzb2x2ZXIpIHtcbiAgICAgICAgbWlzc2luZy5mb3JFYWNoKGludmFsaWRhdGVGaWxlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sYXN0UHJvZ3JhbSA9IHByb2dyYW07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckNhY2hlcygpIHtcbiAgICB0aGlzLl9jaGVja2VyID0gbnVsbDtcbiAgICB0aGlzLl90eXBlQ2FjaGUgPSBbXTtcbiAgICB0aGlzLl9yZXNvbHZlciA9IG51bGw7XG4gICAgdGhpcy5jb2xsZWN0ZWRFcnJvcnMgPSBudWxsO1xuICAgIHRoaXMubW9kdWxlc091dE9mRGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIGVuc3VyZVRlbXBsYXRlTWFwKCkge1xuICAgIGlmICghdGhpcy5maWxlVG9Db21wb25lbnQgfHwgIXRoaXMudGVtcGxhdGVSZWZlcmVuY2VzKSB7XG4gICAgICBjb25zdCBmaWxlVG9Db21wb25lbnQgPSBuZXcgTWFwPHN0cmluZywgU3RhdGljU3ltYm9sPigpO1xuICAgICAgY29uc3QgdGVtcGxhdGVSZWZlcmVuY2U6IHN0cmluZ1tdID0gW107XG4gICAgICBjb25zdCBuZ01vZHVsZVN1bW1hcnkgPSB0aGlzLmdldEFuYWx5emVkTW9kdWxlcygpO1xuICAgICAgY29uc3QgdXJsUmVzb2x2ZXIgPSBjcmVhdGVPZmZsaW5lQ29tcGlsZVVybFJlc29sdmVyKCk7XG4gICAgICBmb3IgKGNvbnN0IG1vZHVsZSBvZiBuZ01vZHVsZVN1bW1hcnkubmdNb2R1bGVzKSB7XG4gICAgICAgIGZvciAoY29uc3QgZGlyZWN0aXZlIG9mIG1vZHVsZS5kZWNsYXJlZERpcmVjdGl2ZXMpIHtcbiAgICAgICAgICBjb25zdCB7bWV0YWRhdGF9ID0gdGhpcy5yZXNvbHZlci5nZXROb25Ob3JtYWxpemVkRGlyZWN0aXZlTWV0YWRhdGEoZGlyZWN0aXZlLnJlZmVyZW5jZSkgITtcbiAgICAgICAgICBpZiAobWV0YWRhdGEuaXNDb21wb25lbnQgJiYgbWV0YWRhdGEudGVtcGxhdGUgJiYgbWV0YWRhdGEudGVtcGxhdGUudGVtcGxhdGVVcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlTmFtZSA9IHVybFJlc29sdmVyLnJlc29sdmUoXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZsZWN0b3IuY29tcG9uZW50TW9kdWxlVXJsKGRpcmVjdGl2ZS5yZWZlcmVuY2UpLFxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLnRlbXBsYXRlLnRlbXBsYXRlVXJsKTtcbiAgICAgICAgICAgIGZpbGVUb0NvbXBvbmVudC5zZXQodGVtcGxhdGVOYW1lLCBkaXJlY3RpdmUucmVmZXJlbmNlKTtcbiAgICAgICAgICAgIHRlbXBsYXRlUmVmZXJlbmNlLnB1c2godGVtcGxhdGVOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZmlsZVRvQ29tcG9uZW50ID0gZmlsZVRvQ29tcG9uZW50O1xuICAgICAgdGhpcy50ZW1wbGF0ZVJlZmVyZW5jZXMgPSB0ZW1wbGF0ZVJlZmVyZW5jZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFNvdXJjZUZyb21EZWNsYXJhdGlvbihcbiAgICAgIGZpbGVOYW1lOiBzdHJpbmcsIHZlcnNpb246IHN0cmluZywgc291cmNlOiBzdHJpbmcsIHNwYW46IFNwYW4sIHR5cGU6IFN0YXRpY1N5bWJvbCxcbiAgICAgIGRlY2xhcmF0aW9uOiB0cy5DbGFzc0RlY2xhcmF0aW9uLCBub2RlOiB0cy5Ob2RlLCBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKTogVGVtcGxhdGVTb3VyY2VcbiAgICAgIHx1bmRlZmluZWQge1xuICAgIGxldCBxdWVyeUNhY2hlOiBTeW1ib2xRdWVyeXx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgY29uc3QgdCA9IHRoaXM7XG4gICAgaWYgKGRlY2xhcmF0aW9uKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2ZXJzaW9uLFxuICAgICAgICBzb3VyY2UsXG4gICAgICAgIHNwYW4sXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGdldCBtZW1iZXJzKCkge1xuICAgICAgICAgIHJldHVybiBnZXRDbGFzc01lbWJlcnNGcm9tRGVjbGFyYXRpb24odC5wcm9ncmFtLCB0LmNoZWNrZXIsIHNvdXJjZUZpbGUsIGRlY2xhcmF0aW9uKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IHF1ZXJ5KCkge1xuICAgICAgICAgIGlmICghcXVlcnlDYWNoZSkge1xuICAgICAgICAgICAgY29uc3QgcGlwZXMgPSB0LnNlcnZpY2UuZ2V0UGlwZXNBdChmaWxlTmFtZSwgbm9kZS5nZXRTdGFydCgpKTtcbiAgICAgICAgICAgIHF1ZXJ5Q2FjaGUgPSBnZXRTeW1ib2xRdWVyeShcbiAgICAgICAgICAgICAgICB0LnByb2dyYW0sIHQuY2hlY2tlciwgc291cmNlRmlsZSxcbiAgICAgICAgICAgICAgICAoKSA9PiBnZXRQaXBlc1RhYmxlKHNvdXJjZUZpbGUsIHQucHJvZ3JhbSwgdC5jaGVja2VyLCBwaXBlcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcXVlcnlDYWNoZTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFNvdXJjZUZyb21Ob2RlKGZpbGVOYW1lOiBzdHJpbmcsIHZlcnNpb246IHN0cmluZywgbm9kZTogdHMuTm9kZSk6IFRlbXBsYXRlU291cmNlXG4gICAgICB8dW5kZWZpbmVkIHtcbiAgICBsZXQgcmVzdWx0OiBUZW1wbGF0ZVNvdXJjZXx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgY29uc3QgdCA9IHRoaXM7XG4gICAgc3dpdGNoIChub2RlLmtpbmQpIHtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5Ob1N1YnN0aXR1dGlvblRlbXBsYXRlTGl0ZXJhbDpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsOlxuICAgICAgICBsZXQgW2RlY2xhcmF0aW9uLCBkZWNvcmF0b3JdID0gdGhpcy5nZXRUZW1wbGF0ZUNsYXNzRGVjbEZyb21Ob2RlKG5vZGUpO1xuICAgICAgICBpZiAoZGVjbGFyYXRpb24gJiYgZGVjbGFyYXRpb24ubmFtZSkge1xuICAgICAgICAgIGNvbnN0IHNvdXJjZUZpbGUgPSB0aGlzLmdldFNvdXJjZUZpbGUoZmlsZU5hbWUpO1xuICAgICAgICAgIGlmIChzb3VyY2VGaWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTb3VyY2VGcm9tRGVjbGFyYXRpb24oXG4gICAgICAgICAgICAgICAgZmlsZU5hbWUsIHZlcnNpb24sIHRoaXMuc3RyaW5nT2Yobm9kZSkgfHwgJycsIHNocmluayhzcGFuT2Yobm9kZSkpLFxuICAgICAgICAgICAgICAgIHRoaXMucmVmbGVjdG9yLmdldFN0YXRpY1N5bWJvbChzb3VyY2VGaWxlLmZpbGVOYW1lLCBkZWNsYXJhdGlvbi5uYW1lLnRleHQpLFxuICAgICAgICAgICAgICAgIGRlY2xhcmF0aW9uLCBub2RlLCBzb3VyY2VGaWxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIGdldFNvdXJjZUZyb21UeXBlKGZpbGVOYW1lOiBzdHJpbmcsIHZlcnNpb246IHN0cmluZywgdHlwZTogU3RhdGljU3ltYm9sKTogVGVtcGxhdGVTb3VyY2VcbiAgICAgIHx1bmRlZmluZWQge1xuICAgIGxldCByZXN1bHQ6IFRlbXBsYXRlU291cmNlfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBjb25zdCBkZWNsYXJhdGlvbiA9IHRoaXMuZ2V0VGVtcGxhdGVDbGFzc0Zyb21TdGF0aWNTeW1ib2wodHlwZSk7XG4gICAgaWYgKGRlY2xhcmF0aW9uKSB7XG4gICAgICBjb25zdCBzbmFwc2hvdCA9IHRoaXMuaG9zdC5nZXRTY3JpcHRTbmFwc2hvdChmaWxlTmFtZSk7XG4gICAgICBpZiAoc25hcHNob3QpIHtcbiAgICAgICAgY29uc3Qgc291cmNlID0gc25hcHNob3QuZ2V0VGV4dCgwLCBzbmFwc2hvdC5nZXRMZW5ndGgoKSk7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuZ2V0U291cmNlRnJvbURlY2xhcmF0aW9uKFxuICAgICAgICAgICAgZmlsZU5hbWUsIHZlcnNpb24sIHNvdXJjZSwge3N0YXJ0OiAwLCBlbmQ6IHNvdXJjZS5sZW5ndGh9LCB0eXBlLCBkZWNsYXJhdGlvbixcbiAgICAgICAgICAgIGRlY2xhcmF0aW9uLCBkZWNsYXJhdGlvbi5nZXRTb3VyY2VGaWxlKCkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgcmVmbGVjdG9ySG9zdCgpOiBSZWZsZWN0b3JIb3N0IHtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5fcmVmbGVjdG9ySG9zdDtcbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgaWYgKCF0aGlzLmNvbnRleHQpIHtcbiAgICAgICAgLy8gTWFrZSB1cCBhIGNvbnRleHQgYnkgZmluZGluZyB0aGUgZmlyc3Qgc2NyaXB0IGFuZCB1c2luZyB0aGF0IGFzIHRoZSBiYXNlIGRpci5cbiAgICAgICAgY29uc3Qgc2NyaXB0RmlsZU5hbWVzID0gdGhpcy5ob3N0LmdldFNjcmlwdEZpbGVOYW1lcygpO1xuICAgICAgICBpZiAoMCA9PT0gc2NyaXB0RmlsZU5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW50ZXJuYWwgZXJyb3I6IG5vIHNjcmlwdCBmaWxlIG5hbWVzIGZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250ZXh0ID0gc2NyaXB0RmlsZU5hbWVzWzBdO1xuICAgICAgfVxuXG4gICAgICAvLyBVc2UgdGhlIGZpbGUgY29udGV4dCdzIGRpcmVjdG9yeSBhcyB0aGUgYmFzZSBkaXJlY3RvcnkuXG4gICAgICAvLyBUaGUgaG9zdCdzIGdldEN1cnJlbnREaXJlY3RvcnkoKSBpcyBub3QgcmVsaWFibGUgYXMgaXQgaXMgYWx3YXlzIFwiXCIgaW5cbiAgICAgIC8vIHRzc2VydmVyLiBXZSBkb24ndCBuZWVkIHRoZSBleGFjdCBiYXNlIGRpcmVjdG9yeSwganVzdCBvbmUgdGhhdCBjb250YWluc1xuICAgICAgLy8gYSBzb3VyY2UgZmlsZS5cbiAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMudHNTZXJ2aWNlLmdldFByb2dyYW0oKS5nZXRTb3VyY2VGaWxlKHRoaXMuY29udGV4dCk7XG4gICAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludGVybmFsIGVycm9yOiBubyBjb250ZXh0IGNvdWxkIGJlIGRldGVybWluZWQnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdHNDb25maWdQYXRoID0gZmluZFRzQ29uZmlnKHNvdXJjZS5maWxlTmFtZSk7XG4gICAgICBjb25zdCBiYXNlUGF0aCA9IHBhdGguZGlybmFtZSh0c0NvbmZpZ1BhdGggfHwgdGhpcy5jb250ZXh0KTtcbiAgICAgIGNvbnN0IG9wdGlvbnM6IENvbXBpbGVyT3B0aW9ucyA9IHtiYXNlUGF0aCwgZ2VuRGlyOiBiYXNlUGF0aH07XG4gICAgICBjb25zdCBjb21waWxlck9wdGlvbnMgPSB0aGlzLmhvc3QuZ2V0Q29tcGlsYXRpb25TZXR0aW5ncygpO1xuICAgICAgaWYgKGNvbXBpbGVyT3B0aW9ucyAmJiBjb21waWxlck9wdGlvbnMuYmFzZVVybCkge1xuICAgICAgICBvcHRpb25zLmJhc2VVcmwgPSBjb21waWxlck9wdGlvbnMuYmFzZVVybDtcbiAgICAgIH1cbiAgICAgIGlmIChjb21waWxlck9wdGlvbnMgJiYgY29tcGlsZXJPcHRpb25zLnBhdGhzKSB7XG4gICAgICAgIG9wdGlvbnMucGF0aHMgPSBjb21waWxlck9wdGlvbnMucGF0aHM7XG4gICAgICB9XG4gICAgICByZXN1bHQgPSB0aGlzLl9yZWZsZWN0b3JIb3N0ID1cbiAgICAgICAgICBuZXcgUmVmbGVjdG9ySG9zdCgoKSA9PiB0aGlzLnRzU2VydmljZS5nZXRQcm9ncmFtKCksIHRoaXMuaG9zdCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIGNvbGxlY3RFcnJvcihlcnJvcjogYW55LCBmaWxlUGF0aDogc3RyaW5nfG51bGwpIHtcbiAgICBpZiAoZmlsZVBhdGgpIHtcbiAgICAgIGxldCBlcnJvck1hcCA9IHRoaXMuY29sbGVjdGVkRXJyb3JzO1xuICAgICAgaWYgKCFlcnJvck1hcCB8fCAhdGhpcy5jb2xsZWN0ZWRFcnJvcnMpIHtcbiAgICAgICAgZXJyb3JNYXAgPSB0aGlzLmNvbGxlY3RlZEVycm9ycyA9IG5ldyBNYXAoKTtcbiAgICAgIH1cbiAgICAgIGxldCBlcnJvcnMgPSBlcnJvck1hcC5nZXQoZmlsZVBhdGgpO1xuICAgICAgaWYgKCFlcnJvcnMpIHtcbiAgICAgICAgZXJyb3JzID0gW107XG4gICAgICAgIHRoaXMuY29sbGVjdGVkRXJyb3JzLnNldChmaWxlUGF0aCwgZXJyb3JzKTtcbiAgICAgIH1cbiAgICAgIGVycm9ycy5wdXNoKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCBzdGF0aWNTeW1ib2xSZXNvbHZlcigpOiBTdGF0aWNTeW1ib2xSZXNvbHZlciB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuX3N0YXRpY1N5bWJvbFJlc29sdmVyO1xuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICB0aGlzLl9zdW1tYXJ5UmVzb2x2ZXIgPSBuZXcgQW90U3VtbWFyeVJlc29sdmVyKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxvYWRTdW1tYXJ5KGZpbGVQYXRoOiBzdHJpbmcpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgICAgICBpc1NvdXJjZUZpbGUoc291cmNlRmlsZVBhdGg6IHN0cmluZykgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICAgICAgICAgIHRvU3VtbWFyeUZpbGVOYW1lKHNvdXJjZUZpbGVQYXRoOiBzdHJpbmcpIHsgcmV0dXJuIHNvdXJjZUZpbGVQYXRoOyB9LFxuICAgICAgICAgICAgZnJvbVN1bW1hcnlGaWxlTmFtZShmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5ne3JldHVybiBmaWxlUGF0aDt9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGhpcy5fc3RhdGljU3ltYm9sQ2FjaGUpO1xuICAgICAgcmVzdWx0ID0gdGhpcy5fc3RhdGljU3ltYm9sUmVzb2x2ZXIgPSBuZXcgU3RhdGljU3ltYm9sUmVzb2x2ZXIoXG4gICAgICAgICAgdGhpcy5yZWZsZWN0b3JIb3N0IGFzIGFueSwgdGhpcy5fc3RhdGljU3ltYm9sQ2FjaGUsIHRoaXMuX3N1bW1hcnlSZXNvbHZlcixcbiAgICAgICAgICAoZSwgZmlsZVBhdGgpID0+IHRoaXMuY29sbGVjdEVycm9yKGUsIGZpbGVQYXRoICEpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHJlZmxlY3RvcigpOiBTdGF0aWNSZWZsZWN0b3Ige1xuICAgIGxldCByZXN1bHQgPSB0aGlzLl9yZWZsZWN0b3I7XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIGNvbnN0IHNzciA9IHRoaXMuc3RhdGljU3ltYm9sUmVzb2x2ZXI7XG4gICAgICByZXN1bHQgPSB0aGlzLl9yZWZsZWN0b3IgPSBuZXcgU3RhdGljUmVmbGVjdG9yKFxuICAgICAgICAgIHRoaXMuX3N1bW1hcnlSZXNvbHZlciwgc3NyLCBbXSwgW10sIChlLCBmaWxlUGF0aCkgPT4gdGhpcy5jb2xsZWN0RXJyb3IoZSwgZmlsZVBhdGggISkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUZW1wbGF0ZUNsYXNzRnJvbVN0YXRpY1N5bWJvbCh0eXBlOiBTdGF0aWNTeW1ib2wpOiB0cy5DbGFzc0RlY2xhcmF0aW9ufHVuZGVmaW5lZCB7XG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5nZXRTb3VyY2VGaWxlKHR5cGUuZmlsZVBhdGgpO1xuICAgIGlmIChzb3VyY2UpIHtcbiAgICAgIGNvbnN0IGRlY2xhcmF0aW9uTm9kZSA9IHRzLmZvckVhY2hDaGlsZChzb3VyY2UsIGNoaWxkID0+IHtcbiAgICAgICAgaWYgKGNoaWxkLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ2xhc3NEZWNsYXJhdGlvbikge1xuICAgICAgICAgIGNvbnN0IGNsYXNzRGVjbGFyYXRpb24gPSBjaGlsZCBhcyB0cy5DbGFzc0RlY2xhcmF0aW9uO1xuICAgICAgICAgIGlmIChjbGFzc0RlY2xhcmF0aW9uLm5hbWUgIT0gbnVsbCAmJiBjbGFzc0RlY2xhcmF0aW9uLm5hbWUudGV4dCA9PT0gdHlwZS5uYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gY2xhc3NEZWNsYXJhdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRlY2xhcmF0aW9uTm9kZSBhcyB0cy5DbGFzc0RlY2xhcmF0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBtaXNzaW5nVGVtcGxhdGU6IFt0cy5DbGFzc0RlY2xhcmF0aW9uIHwgdW5kZWZpbmVkLCB0cy5FeHByZXNzaW9ufHVuZGVmaW5lZF0gPVxuICAgICAgW3VuZGVmaW5lZCwgdW5kZWZpbmVkXTtcblxuICAvKipcbiAgICogR2l2ZW4gYSB0ZW1wbGF0ZSBzdHJpbmcgbm9kZSwgc2VlIGlmIGl0IGlzIGFuIEFuZ3VsYXIgdGVtcGxhdGUgc3RyaW5nLCBhbmQgaWYgc28gcmV0dXJuIHRoZVxuICAgKiBjb250YWluaW5nIGNsYXNzLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRUZW1wbGF0ZUNsYXNzRGVjbEZyb21Ob2RlKGN1cnJlbnRUb2tlbjogdHMuTm9kZSk6XG4gICAgICBbdHMuQ2xhc3NEZWNsYXJhdGlvbiB8IHVuZGVmaW5lZCwgdHMuRXhwcmVzc2lvbnx1bmRlZmluZWRdIHtcbiAgICAvLyBWZXJpZnkgd2UgYXJlIGluIGEgJ3RlbXBsYXRlJyBwcm9wZXJ0eSBhc3NpZ25tZW50LCBpbiBhbiBvYmplY3QgbGl0ZXJhbCwgd2hpY2ggaXMgYW4gY2FsbFxuICAgIC8vIGFyZywgaW4gYSBkZWNvcmF0b3JcbiAgICBsZXQgcGFyZW50Tm9kZSA9IGN1cnJlbnRUb2tlbi5wYXJlbnQ7ICAvLyBQcm9wZXJ0eUFzc2lnbm1lbnRcbiAgICBpZiAoIXBhcmVudE5vZGUpIHtcbiAgICAgIHJldHVybiBUeXBlU2NyaXB0U2VydmljZUhvc3QubWlzc2luZ1RlbXBsYXRlO1xuICAgIH1cbiAgICBpZiAocGFyZW50Tm9kZS5raW5kICE9PSB0cy5TeW50YXhLaW5kLlByb3BlcnR5QXNzaWdubWVudCkge1xuICAgICAgcmV0dXJuIFR5cGVTY3JpcHRTZXJ2aWNlSG9zdC5taXNzaW5nVGVtcGxhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE86IElzIHRoaXMgZGlmZmVyZW50IGZvciBhIGxpdGVyYWwsIGkuZS4gYSBxdW90ZWQgcHJvcGVydHkgbmFtZSBsaWtlIFwidGVtcGxhdGVcIj9cbiAgICAgIGlmICgocGFyZW50Tm9kZSBhcyBhbnkpLm5hbWUudGV4dCAhPT0gJ3RlbXBsYXRlJykge1xuICAgICAgICByZXR1cm4gVHlwZVNjcmlwdFNlcnZpY2VIb3N0Lm1pc3NpbmdUZW1wbGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50OyAgLy8gT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb25cbiAgICBpZiAoIXBhcmVudE5vZGUgfHwgcGFyZW50Tm9kZS5raW5kICE9PSB0cy5TeW50YXhLaW5kLk9iamVjdExpdGVyYWxFeHByZXNzaW9uKSB7XG4gICAgICByZXR1cm4gVHlwZVNjcmlwdFNlcnZpY2VIb3N0Lm1pc3NpbmdUZW1wbGF0ZTtcbiAgICB9XG5cbiAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnQ7ICAvLyBDYWxsRXhwcmVzc2lvblxuICAgIGlmICghcGFyZW50Tm9kZSB8fCBwYXJlbnROb2RlLmtpbmQgIT09IHRzLlN5bnRheEtpbmQuQ2FsbEV4cHJlc3Npb24pIHtcbiAgICAgIHJldHVybiBUeXBlU2NyaXB0U2VydmljZUhvc3QubWlzc2luZ1RlbXBsYXRlO1xuICAgIH1cbiAgICBjb25zdCBjYWxsVGFyZ2V0ID0gKDx0cy5DYWxsRXhwcmVzc2lvbj5wYXJlbnROb2RlKS5leHByZXNzaW9uO1xuXG4gICAgbGV0IGRlY29yYXRvciA9IHBhcmVudE5vZGUucGFyZW50OyAgLy8gRGVjb3JhdG9yXG4gICAgaWYgKCFkZWNvcmF0b3IgfHwgZGVjb3JhdG9yLmtpbmQgIT09IHRzLlN5bnRheEtpbmQuRGVjb3JhdG9yKSB7XG4gICAgICByZXR1cm4gVHlwZVNjcmlwdFNlcnZpY2VIb3N0Lm1pc3NpbmdUZW1wbGF0ZTtcbiAgICB9XG5cbiAgICBsZXQgZGVjbGFyYXRpb24gPSA8dHMuQ2xhc3NEZWNsYXJhdGlvbj5kZWNvcmF0b3IucGFyZW50OyAgLy8gQ2xhc3NEZWNsYXJhdGlvblxuICAgIGlmICghZGVjbGFyYXRpb24gfHwgZGVjbGFyYXRpb24ua2luZCAhPT0gdHMuU3ludGF4S2luZC5DbGFzc0RlY2xhcmF0aW9uKSB7XG4gICAgICByZXR1cm4gVHlwZVNjcmlwdFNlcnZpY2VIb3N0Lm1pc3NpbmdUZW1wbGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIFtkZWNsYXJhdGlvbiwgY2FsbFRhcmdldF07XG4gIH1cblxuICBwcml2YXRlIGdldENvbGxlY3RlZEVycm9ycyhkZWZhdWx0U3BhbjogU3Bhbiwgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSk6IERlY2xhcmF0aW9uRXJyb3JbXSB7XG4gICAgY29uc3QgZXJyb3JzID0gKHRoaXMuY29sbGVjdGVkRXJyb3JzICYmIHRoaXMuY29sbGVjdGVkRXJyb3JzLmdldChzb3VyY2VGaWxlLmZpbGVOYW1lKSk7XG4gICAgcmV0dXJuIChlcnJvcnMgJiYgZXJyb3JzLm1hcCgoZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgY29uc3QgbGluZSA9IGUubGluZSB8fCAoZS5wb3NpdGlvbiAmJiBlLnBvc2l0aW9uLmxpbmUpO1xuICAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGUuY29sdW1uIHx8IChlLnBvc2l0aW9uICYmIGUucG9zaXRpb24uY29sdW1uKTtcbiAgICAgICAgICAgICBjb25zdCBzcGFuID0gc3BhbkF0KHNvdXJjZUZpbGUsIGxpbmUsIGNvbHVtbikgfHwgZGVmYXVsdFNwYW47XG4gICAgICAgICAgICAgaWYgKGlzRm9ybWF0dGVkRXJyb3IoZSkpIHtcbiAgICAgICAgICAgICAgIHJldHVybiBlcnJvclRvRGlhZ25vc3RpY1dpdGhDaGFpbihlLCBzcGFuKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgcmV0dXJuIHttZXNzYWdlOiBlLm1lc3NhZ2UsIHNwYW59O1xuICAgICAgICAgICB9KSkgfHxcbiAgICAgICAgW107XG4gIH1cblxuICBwcml2YXRlIGdldERlY2xhcmF0aW9uRnJvbU5vZGUoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSwgbm9kZTogdHMuTm9kZSk6IERlY2xhcmF0aW9ufHVuZGVmaW5lZCB7XG4gICAgaWYgKG5vZGUua2luZCA9PSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb24gJiYgbm9kZS5kZWNvcmF0b3JzICYmXG4gICAgICAgIChub2RlIGFzIHRzLkNsYXNzRGVjbGFyYXRpb24pLm5hbWUpIHtcbiAgICAgIGZvciAoY29uc3QgZGVjb3JhdG9yIG9mIG5vZGUuZGVjb3JhdG9ycykge1xuICAgICAgICBpZiAoZGVjb3JhdG9yLmV4cHJlc3Npb24gJiYgZGVjb3JhdG9yLmV4cHJlc3Npb24ua2luZCA9PSB0cy5TeW50YXhLaW5kLkNhbGxFeHByZXNzaW9uKSB7XG4gICAgICAgICAgY29uc3QgY2xhc3NEZWNsYXJhdGlvbiA9IG5vZGUgYXMgdHMuQ2xhc3NEZWNsYXJhdGlvbjtcbiAgICAgICAgICBpZiAoY2xhc3NEZWNsYXJhdGlvbi5uYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsID0gZGVjb3JhdG9yLmV4cHJlc3Npb24gYXMgdHMuQ2FsbEV4cHJlc3Npb247XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBjYWxsLmV4cHJlc3Npb247XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdGhpcy5jaGVja2VyLmdldFR5cGVBdExvY2F0aW9uKHRhcmdldCk7XG4gICAgICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgICAgICBjb25zdCBzdGF0aWNTeW1ib2wgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5yZWZsZWN0b3IuZ2V0U3RhdGljU3ltYm9sKHNvdXJjZUZpbGUuZmlsZU5hbWUsIGNsYXNzRGVjbGFyYXRpb24ubmFtZS50ZXh0KTtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXNvbHZlci5pc0RpcmVjdGl2ZShzdGF0aWNTeW1ib2wgYXMgYW55KSkge1xuICAgICAgICAgICAgICAgICAgY29uc3Qge21ldGFkYXRhfSA9XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlci5nZXROb25Ob3JtYWxpemVkRGlyZWN0aXZlTWV0YWRhdGEoc3RhdGljU3ltYm9sIGFzIGFueSkgITtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGRlY2xhcmF0aW9uU3BhbiA9IHNwYW5PZih0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RhdGljU3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICBkZWNsYXJhdGlvblNwYW4sXG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcnM6IHRoaXMuZ2V0Q29sbGVjdGVkRXJyb3JzKGRlY2xhcmF0aW9uU3Bhbiwgc291cmNlRmlsZSlcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0RXJyb3IoZSwgc291cmNlRmlsZS5maWxlTmFtZSk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBkZWNsYXJhdGlvblNwYW4gPSBzcGFuT2YodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0YXRpY1N5bWJvbCxcbiAgICAgICAgICAgICAgICAgICAgZGVjbGFyYXRpb25TcGFuLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcnM6IHRoaXMuZ2V0Q29sbGVjdGVkRXJyb3JzKGRlY2xhcmF0aW9uU3Bhbiwgc291cmNlRmlsZSlcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdHJpbmdPZihub2RlOiB0cy5Ob2RlKTogc3RyaW5nfHVuZGVmaW5lZCB7XG4gICAgc3dpdGNoIChub2RlLmtpbmQpIHtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5Ob1N1YnN0aXR1dGlvblRlbXBsYXRlTGl0ZXJhbDpcbiAgICAgICAgcmV0dXJuICg8dHMuTGl0ZXJhbEV4cHJlc3Npb24+bm9kZSkudGV4dDtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsOlxuICAgICAgICByZXR1cm4gKDx0cy5TdHJpbmdMaXRlcmFsPm5vZGUpLnRleHQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmaW5kTm9kZShzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLCBwb3NpdGlvbjogbnVtYmVyKTogdHMuTm9kZXx1bmRlZmluZWQge1xuICAgIGZ1bmN0aW9uIGZpbmQobm9kZTogdHMuTm9kZSk6IHRzLk5vZGV8dW5kZWZpbmVkIHtcbiAgICAgIGlmIChwb3NpdGlvbiA+PSBub2RlLmdldFN0YXJ0KCkgJiYgcG9zaXRpb24gPCBub2RlLmdldEVuZCgpKSB7XG4gICAgICAgIHJldHVybiB0cy5mb3JFYWNoQ2hpbGQobm9kZSwgZmluZCkgfHwgbm9kZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmluZChzb3VyY2VGaWxlKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGZpbmRUc0NvbmZpZyhmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nfHVuZGVmaW5lZCB7XG4gIGxldCBkaXIgPSBwYXRoLmRpcm5hbWUoZmlsZU5hbWUpO1xuICB3aGlsZSAoZnMuZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgY29uc3QgY2FuZGlkYXRlID0gcGF0aC5qb2luKGRpciwgJ3RzY29uZmlnLmpzb24nKTtcbiAgICBpZiAoZnMuZXhpc3RzU3luYyhjYW5kaWRhdGUpKSByZXR1cm4gY2FuZGlkYXRlO1xuICAgIGNvbnN0IHBhcmVudERpciA9IHBhdGguZGlybmFtZShkaXIpO1xuICAgIGlmIChwYXJlbnREaXIgPT09IGRpcikgYnJlYWs7XG4gICAgZGlyID0gcGFyZW50RGlyO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNwYW5PZihub2RlOiB0cy5Ob2RlKTogU3BhbiB7XG4gIHJldHVybiB7c3RhcnQ6IG5vZGUuZ2V0U3RhcnQoKSwgZW5kOiBub2RlLmdldEVuZCgpfTtcbn1cblxuZnVuY3Rpb24gc2hyaW5rKHNwYW46IFNwYW4sIG9mZnNldD86IG51bWJlcikge1xuICBpZiAob2Zmc2V0ID09IG51bGwpIG9mZnNldCA9IDE7XG4gIHJldHVybiB7c3RhcnQ6IHNwYW4uc3RhcnQgKyBvZmZzZXQsIGVuZDogc3Bhbi5lbmQgLSBvZmZzZXR9O1xufVxuXG5mdW5jdGlvbiBzcGFuQXQoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSwgbGluZTogbnVtYmVyLCBjb2x1bW46IG51bWJlcik6IFNwYW58dW5kZWZpbmVkIHtcbiAgaWYgKGxpbmUgIT0gbnVsbCAmJiBjb2x1bW4gIT0gbnVsbCkge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdHMuZ2V0UG9zaXRpb25PZkxpbmVBbmRDaGFyYWN0ZXIoc291cmNlRmlsZSwgbGluZSwgY29sdW1uKTtcbiAgICBjb25zdCBmaW5kQ2hpbGQgPSBmdW5jdGlvbiBmaW5kQ2hpbGQobm9kZTogdHMuTm9kZSk6IHRzLk5vZGUgfCB1bmRlZmluZWQge1xuICAgICAgaWYgKG5vZGUua2luZCA+IHRzLlN5bnRheEtpbmQuTGFzdFRva2VuICYmIG5vZGUucG9zIDw9IHBvc2l0aW9uICYmIG5vZGUuZW5kID4gcG9zaXRpb24pIHtcbiAgICAgICAgY29uc3QgYmV0dGVyTm9kZSA9IHRzLmZvckVhY2hDaGlsZChub2RlLCBmaW5kQ2hpbGQpO1xuICAgICAgICByZXR1cm4gYmV0dGVyTm9kZSB8fCBub2RlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBub2RlID0gdHMuZm9yRWFjaENoaWxkKHNvdXJjZUZpbGUsIGZpbmRDaGlsZCk7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHJldHVybiB7c3RhcnQ6IG5vZGUuZ2V0U3RhcnQoKSwgZW5kOiBub2RlLmdldEVuZCgpfTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hhaW5lZE1lc3NhZ2UoY2hhaW46IERpYWdub3N0aWNNZXNzYWdlQ2hhaW4sIGluZGVudCA9ICcnKTogc3RyaW5nIHtcbiAgcmV0dXJuIGluZGVudCArIGNoYWluLm1lc3NhZ2UgKyAoY2hhaW4ubmV4dCA/IGNoYWluZWRNZXNzYWdlKGNoYWluLm5leHQsIGluZGVudCArICcgICcpIDogJycpO1xufVxuXG5jbGFzcyBEaWFnbm9zdGljTWVzc2FnZUNoYWluSW1wbCBpbXBsZW1lbnRzIERpYWdub3N0aWNNZXNzYWdlQ2hhaW4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVzc2FnZTogc3RyaW5nLCBwdWJsaWMgbmV4dD86IERpYWdub3N0aWNNZXNzYWdlQ2hhaW4pIHt9XG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBjaGFpbmVkTWVzc2FnZSh0aGlzKTsgfVxufVxuXG5mdW5jdGlvbiBjb252ZXJ0Q2hhaW4oY2hhaW46IEZvcm1hdHRlZE1lc3NhZ2VDaGFpbik6IERpYWdub3N0aWNNZXNzYWdlQ2hhaW4ge1xuICByZXR1cm4ge21lc3NhZ2U6IGNoYWluLm1lc3NhZ2UsIG5leHQ6IGNoYWluLm5leHQgPyBjb252ZXJ0Q2hhaW4oY2hhaW4ubmV4dCkgOiB1bmRlZmluZWR9O1xufVxuXG5mdW5jdGlvbiBlcnJvclRvRGlhZ25vc3RpY1dpdGhDaGFpbihlcnJvcjogRm9ybWF0dGVkRXJyb3IsIHNwYW46IFNwYW4pOiBEZWNsYXJhdGlvbkVycm9yIHtcbiAgcmV0dXJuIHttZXNzYWdlOiBlcnJvci5jaGFpbiA/IGNvbnZlcnRDaGFpbihlcnJvci5jaGFpbikgOiBlcnJvci5tZXNzYWdlLCBzcGFufTtcbn1cbiJdfQ==