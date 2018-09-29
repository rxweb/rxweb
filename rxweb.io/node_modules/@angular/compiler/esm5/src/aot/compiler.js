/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { componentFactoryName, flatten, identifierName, templateSourceUrl } from '../compile_metadata';
import { ConstantPool } from '../constant_pool';
import { ViewEncapsulation } from '../core';
import { MessageBundle } from '../i18n/message_bundle';
import { Identifiers, createTokenForExternalReference } from '../identifiers';
import { HtmlParser } from '../ml_parser/html_parser';
import { removeWhitespaces } from '../ml_parser/html_whitespaces';
import { DEFAULT_INTERPOLATION_CONFIG, InterpolationConfig } from '../ml_parser/interpolation_config';
import * as o from '../output/output_ast';
import { compileNgModuleFromRender2 as compileR3Module } from '../render3/r3_module_compiler';
import { compilePipeFromRender2 as compileR3Pipe } from '../render3/r3_pipe_compiler';
import { htmlAstToRender3Ast } from '../render3/r3_template_transform';
import { compileComponentFromRender2 as compileR3Component, compileDirectiveFromRender2 as compileR3Directive } from '../render3/view/compiler';
import { DomElementSchemaRegistry } from '../schema/dom_element_schema_registry';
import { BindingParser } from '../template_parser/binding_parser';
import { error, syntaxError, visitValue } from '../util';
import { GeneratedFile } from './generated_file';
import { listLazyRoutes, parseLazyRoute } from './lazy_routes';
import { StaticSymbol } from './static_symbol';
import { createForJitStub, serializeSummaries } from './summary_serializer';
import { ngfactoryFilePath, normalizeGenFileSuffix, splitTypescriptSuffix, summaryFileName, summaryForJitFileName } from './util';
var AotCompiler = /** @class */ (function () {
    function AotCompiler(_config, _options, _host, reflector, _metadataResolver, _templateParser, _styleCompiler, _viewCompiler, _typeCheckCompiler, _ngModuleCompiler, _injectableCompiler, _outputEmitter, _summaryResolver, _symbolResolver) {
        this._config = _config;
        this._options = _options;
        this._host = _host;
        this.reflector = reflector;
        this._metadataResolver = _metadataResolver;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._typeCheckCompiler = _typeCheckCompiler;
        this._ngModuleCompiler = _ngModuleCompiler;
        this._injectableCompiler = _injectableCompiler;
        this._outputEmitter = _outputEmitter;
        this._summaryResolver = _summaryResolver;
        this._symbolResolver = _symbolResolver;
        this._templateAstCache = new Map();
        this._analyzedFiles = new Map();
        this._analyzedFilesForInjectables = new Map();
    }
    AotCompiler.prototype.clearCache = function () { this._metadataResolver.clearCache(); };
    AotCompiler.prototype.analyzeModulesSync = function (rootFiles) {
        var _this = this;
        var analyzeResult = analyzeAndValidateNgModules(rootFiles, this._host, this._symbolResolver, this._metadataResolver);
        analyzeResult.ngModules.forEach(function (ngModule) { return _this._metadataResolver.loadNgModuleDirectiveAndPipeMetadata(ngModule.type.reference, true); });
        return analyzeResult;
    };
    AotCompiler.prototype.analyzeModulesAsync = function (rootFiles) {
        var _this = this;
        var analyzeResult = analyzeAndValidateNgModules(rootFiles, this._host, this._symbolResolver, this._metadataResolver);
        return Promise
            .all(analyzeResult.ngModules.map(function (ngModule) { return _this._metadataResolver.loadNgModuleDirectiveAndPipeMetadata(ngModule.type.reference, false); }))
            .then(function () { return analyzeResult; });
    };
    AotCompiler.prototype._analyzeFile = function (fileName) {
        var analyzedFile = this._analyzedFiles.get(fileName);
        if (!analyzedFile) {
            analyzedFile =
                analyzeFile(this._host, this._symbolResolver, this._metadataResolver, fileName);
            this._analyzedFiles.set(fileName, analyzedFile);
        }
        return analyzedFile;
    };
    AotCompiler.prototype._analyzeFileForInjectables = function (fileName) {
        var analyzedFile = this._analyzedFilesForInjectables.get(fileName);
        if (!analyzedFile) {
            analyzedFile = analyzeFileForInjectables(this._host, this._symbolResolver, this._metadataResolver, fileName);
            this._analyzedFilesForInjectables.set(fileName, analyzedFile);
        }
        return analyzedFile;
    };
    AotCompiler.prototype.findGeneratedFileNames = function (fileName) {
        var _this = this;
        var genFileNames = [];
        var file = this._analyzeFile(fileName);
        // Make sure we create a .ngfactory if we have a injectable/directive/pipe/NgModule
        // or a reference to a non source file.
        // Note: This is overestimating the required .ngfactory files as the real calculation is harder.
        // Only do this for StubEmitFlags.Basic, as adding a type check block
        // does not change this file (as we generate type check blocks based on NgModules).
        if (this._options.allowEmptyCodegenFiles || file.directives.length || file.pipes.length ||
            file.injectables.length || file.ngModules.length || file.exportsNonSourceFiles) {
            genFileNames.push(ngfactoryFilePath(file.fileName, true));
            if (this._options.enableSummariesForJit) {
                genFileNames.push(summaryForJitFileName(file.fileName, true));
            }
        }
        var fileSuffix = normalizeGenFileSuffix(splitTypescriptSuffix(file.fileName, true)[1]);
        file.directives.forEach(function (dirSymbol) {
            var compMeta = _this._metadataResolver.getNonNormalizedDirectiveMetadata(dirSymbol).metadata;
            if (!compMeta.isComponent) {
                return;
            }
            // Note: compMeta is a component and therefore template is non null.
            compMeta.template.styleUrls.forEach(function (styleUrl) {
                var normalizedUrl = _this._host.resourceNameToFileName(styleUrl, file.fileName);
                if (!normalizedUrl) {
                    throw syntaxError("Couldn't resolve resource " + styleUrl + " relative to " + file.fileName);
                }
                var needsShim = (compMeta.template.encapsulation ||
                    _this._config.defaultEncapsulation) === ViewEncapsulation.Emulated;
                genFileNames.push(_stylesModuleUrl(normalizedUrl, needsShim, fileSuffix));
                if (_this._options.allowEmptyCodegenFiles) {
                    genFileNames.push(_stylesModuleUrl(normalizedUrl, !needsShim, fileSuffix));
                }
            });
        });
        return genFileNames;
    };
    AotCompiler.prototype.emitBasicStub = function (genFileName, originalFileName) {
        var outputCtx = this._createOutputContext(genFileName);
        if (genFileName.endsWith('.ngfactory.ts')) {
            if (!originalFileName) {
                throw new Error("Assertion error: require the original file for .ngfactory.ts stubs. File: " + genFileName);
            }
            var originalFile = this._analyzeFile(originalFileName);
            this._createNgFactoryStub(outputCtx, originalFile, 1 /* Basic */);
        }
        else if (genFileName.endsWith('.ngsummary.ts')) {
            if (this._options.enableSummariesForJit) {
                if (!originalFileName) {
                    throw new Error("Assertion error: require the original file for .ngsummary.ts stubs. File: " + genFileName);
                }
                var originalFile = this._analyzeFile(originalFileName);
                _createEmptyStub(outputCtx);
                originalFile.ngModules.forEach(function (ngModule) {
                    // create exports that user code can reference
                    createForJitStub(outputCtx, ngModule.type.reference);
                });
            }
        }
        else if (genFileName.endsWith('.ngstyle.ts')) {
            _createEmptyStub(outputCtx);
        }
        // Note: for the stubs, we don't need a property srcFileUrl,
        // as later on in emitAllImpls we will create the proper GeneratedFiles with the
        // correct srcFileUrl.
        // This is good as e.g. for .ngstyle.ts files we can't derive
        // the url of components based on the genFileUrl.
        return this._codegenSourceModule('unknown', outputCtx);
    };
    AotCompiler.prototype.emitTypeCheckStub = function (genFileName, originalFileName) {
        var originalFile = this._analyzeFile(originalFileName);
        var outputCtx = this._createOutputContext(genFileName);
        if (genFileName.endsWith('.ngfactory.ts')) {
            this._createNgFactoryStub(outputCtx, originalFile, 2 /* TypeCheck */);
        }
        return outputCtx.statements.length > 0 ?
            this._codegenSourceModule(originalFile.fileName, outputCtx) :
            null;
    };
    AotCompiler.prototype.loadFilesAsync = function (fileNames, tsFiles) {
        var _this = this;
        var files = fileNames.map(function (fileName) { return _this._analyzeFile(fileName); });
        var loadingPromises = [];
        files.forEach(function (file) { return file.ngModules.forEach(function (ngModule) {
            return loadingPromises.push(_this._metadataResolver.loadNgModuleDirectiveAndPipeMetadata(ngModule.type.reference, false));
        }); });
        var analyzedInjectables = tsFiles.map(function (tsFile) { return _this._analyzeFileForInjectables(tsFile); });
        return Promise.all(loadingPromises).then(function (_) { return ({
            analyzedModules: mergeAndValidateNgFiles(files),
            analyzedInjectables: analyzedInjectables,
        }); });
    };
    AotCompiler.prototype.loadFilesSync = function (fileNames, tsFiles) {
        var _this = this;
        var files = fileNames.map(function (fileName) { return _this._analyzeFile(fileName); });
        files.forEach(function (file) { return file.ngModules.forEach(function (ngModule) { return _this._metadataResolver.loadNgModuleDirectiveAndPipeMetadata(ngModule.type.reference, true); }); });
        var analyzedInjectables = tsFiles.map(function (tsFile) { return _this._analyzeFileForInjectables(tsFile); });
        return {
            analyzedModules: mergeAndValidateNgFiles(files),
            analyzedInjectables: analyzedInjectables,
        };
    };
    AotCompiler.prototype._createNgFactoryStub = function (outputCtx, file, emitFlags) {
        var _this = this;
        var componentId = 0;
        file.ngModules.forEach(function (ngModuleMeta, ngModuleIndex) {
            // Note: the code below needs to executed for StubEmitFlags.Basic and StubEmitFlags.TypeCheck,
            // so we don't change the .ngfactory file too much when adding the type-check block.
            // create exports that user code can reference
            _this._ngModuleCompiler.createStub(outputCtx, ngModuleMeta.type.reference);
            // add references to the symbols from the metadata.
            // These can be used by the type check block for components,
            // and they also cause TypeScript to include these files into the program too,
            // which will make them part of the analyzedFiles.
            var externalReferences = tslib_1.__spread(ngModuleMeta.transitiveModule.directives.map(function (d) { return d.reference; }), ngModuleMeta.transitiveModule.pipes.map(function (d) { return d.reference; }), ngModuleMeta.importedModules.map(function (m) { return m.type.reference; }), ngModuleMeta.exportedModules.map(function (m) { return m.type.reference; }), _this._externalIdentifierReferences([Identifiers.TemplateRef, Identifiers.ElementRef]));
            var externalReferenceVars = new Map();
            externalReferences.forEach(function (ref, typeIndex) {
                externalReferenceVars.set(ref, "_decl" + ngModuleIndex + "_" + typeIndex);
            });
            externalReferenceVars.forEach(function (varName, reference) {
                outputCtx.statements.push(o.variable(varName)
                    .set(o.NULL_EXPR.cast(o.DYNAMIC_TYPE))
                    .toDeclStmt(o.expressionType(outputCtx.importExpr(reference, /* typeParams */ null, /* useSummaries */ false))));
            });
            if (emitFlags & 2 /* TypeCheck */) {
                // add the type-check block for all components of the NgModule
                ngModuleMeta.declaredDirectives.forEach(function (dirId) {
                    var compMeta = _this._metadataResolver.getDirectiveMetadata(dirId.reference);
                    if (!compMeta.isComponent) {
                        return;
                    }
                    componentId++;
                    _this._createTypeCheckBlock(outputCtx, compMeta.type.reference.name + "_Host_" + componentId, ngModuleMeta, _this._metadataResolver.getHostComponentMetadata(compMeta), [compMeta.type], externalReferenceVars);
                    _this._createTypeCheckBlock(outputCtx, compMeta.type.reference.name + "_" + componentId, ngModuleMeta, compMeta, ngModuleMeta.transitiveModule.directives, externalReferenceVars);
                });
            }
        });
        if (outputCtx.statements.length === 0) {
            _createEmptyStub(outputCtx);
        }
    };
    AotCompiler.prototype._externalIdentifierReferences = function (references) {
        var e_1, _a;
        var result = [];
        try {
            for (var references_1 = tslib_1.__values(references), references_1_1 = references_1.next(); !references_1_1.done; references_1_1 = references_1.next()) {
                var reference = references_1_1.value;
                var token = createTokenForExternalReference(this.reflector, reference);
                if (token.identifier) {
                    result.push(token.identifier.reference);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (references_1_1 && !references_1_1.done && (_a = references_1.return)) _a.call(references_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    };
    AotCompiler.prototype._createTypeCheckBlock = function (ctx, componentId, moduleMeta, compMeta, directives, externalReferenceVars) {
        var _a;
        var _b = this._parseTemplate(compMeta, moduleMeta, directives), parsedTemplate = _b.template, usedPipes = _b.pipes;
        (_a = ctx.statements).push.apply(_a, tslib_1.__spread(this._typeCheckCompiler.compileComponent(componentId, compMeta, parsedTemplate, usedPipes, externalReferenceVars, ctx)));
    };
    AotCompiler.prototype.emitMessageBundle = function (analyzeResult, locale) {
        var _this = this;
        var errors = [];
        var htmlParser = new HtmlParser();
        // TODO(vicb): implicit tags & attributes
        var messageBundle = new MessageBundle(htmlParser, [], {}, locale);
        analyzeResult.files.forEach(function (file) {
            var compMetas = [];
            file.directives.forEach(function (directiveType) {
                var dirMeta = _this._metadataResolver.getDirectiveMetadata(directiveType);
                if (dirMeta && dirMeta.isComponent) {
                    compMetas.push(dirMeta);
                }
            });
            compMetas.forEach(function (compMeta) {
                var html = compMeta.template.template;
                // Template URL points to either an HTML or TS file depending on whether
                // the file is used with `templateUrl:` or `template:`, respectively.
                var templateUrl = compMeta.template.templateUrl;
                var interpolationConfig = InterpolationConfig.fromArray(compMeta.template.interpolation);
                errors.push.apply(errors, tslib_1.__spread(messageBundle.updateFromTemplate(html, templateUrl, interpolationConfig)));
            });
        });
        if (errors.length) {
            throw new Error(errors.map(function (e) { return e.toString(); }).join('\n'));
        }
        return messageBundle;
    };
    AotCompiler.prototype.emitAllPartialModules = function (_a, r3Files) {
        var _this = this;
        var ngModuleByPipeOrDirective = _a.ngModuleByPipeOrDirective, files = _a.files;
        var contextMap = new Map();
        var getContext = function (fileName) {
            if (!contextMap.has(fileName)) {
                contextMap.set(fileName, _this._createOutputContext(fileName));
            }
            return contextMap.get(fileName);
        };
        files.forEach(function (file) { return _this._compilePartialModule(file.fileName, ngModuleByPipeOrDirective, file.directives, file.pipes, file.ngModules, file.injectables, getContext(file.fileName)); });
        r3Files.forEach(function (file) { return _this._compileShallowModules(file.fileName, file.shallowModules, getContext(file.fileName)); });
        return Array.from(contextMap.values())
            .map(function (context) { return ({
            fileName: context.genFilePath,
            statements: tslib_1.__spread(context.constantPool.statements, context.statements),
        }); });
    };
    AotCompiler.prototype._compileShallowModules = function (fileName, shallowModules, context) {
        var _this = this;
        shallowModules.forEach(function (module) { return compileR3Module(context, module, _this._injectableCompiler); });
    };
    AotCompiler.prototype._compilePartialModule = function (fileName, ngModuleByPipeOrDirective, directives, pipes, ngModules, injectables, context) {
        var _this = this;
        var errors = [];
        var schemaRegistry = new DomElementSchemaRegistry();
        var hostBindingParser = new BindingParser(this._templateParser.expressionParser, DEFAULT_INTERPOLATION_CONFIG, schemaRegistry, [], errors);
        // Process all components and directives
        directives.forEach(function (directiveType) {
            var directiveMetadata = _this._metadataResolver.getDirectiveMetadata(directiveType);
            if (directiveMetadata.isComponent) {
                var module = ngModuleByPipeOrDirective.get(directiveType);
                module ||
                    error("Cannot determine the module for component '" + identifierName(directiveMetadata.type) + "'");
                var htmlAst = directiveMetadata.template.htmlAst;
                var preserveWhitespaces = directiveMetadata.template.preserveWhitespaces;
                if (!preserveWhitespaces) {
                    htmlAst = removeWhitespaces(htmlAst);
                }
                var render3Ast = htmlAstToRender3Ast(htmlAst.rootNodes, hostBindingParser);
                // Map of StaticType by directive selectors
                var directiveTypeBySel_1 = new Map();
                var directives_1 = module.transitiveModule.directives.map(function (dir) { return _this._metadataResolver.getDirectiveSummary(dir.reference); });
                directives_1.forEach(function (directive) {
                    if (directive.selector) {
                        directiveTypeBySel_1.set(directive.selector, directive.type.reference);
                    }
                });
                // Map of StaticType by pipe names
                var pipeTypeByName_1 = new Map();
                var pipes_1 = module.transitiveModule.pipes.map(function (pipe) { return _this._metadataResolver.getPipeSummary(pipe.reference); });
                pipes_1.forEach(function (pipe) { pipeTypeByName_1.set(pipe.name, pipe.type.reference); });
                compileR3Component(context, directiveMetadata, render3Ast, _this.reflector, hostBindingParser, directiveTypeBySel_1, pipeTypeByName_1);
            }
            else {
                compileR3Directive(context, directiveMetadata, _this.reflector, hostBindingParser);
            }
        });
        pipes.forEach(function (pipeType) {
            var pipeMetadata = _this._metadataResolver.getPipeMetadata(pipeType);
            if (pipeMetadata) {
                compileR3Pipe(context, pipeMetadata, _this.reflector);
            }
        });
        injectables.forEach(function (injectable) { return _this._injectableCompiler.compile(injectable, context); });
    };
    AotCompiler.prototype.emitAllPartialModules2 = function (files) {
        var _this = this;
        // Using reduce like this is a select many pattern (where map is a select pattern)
        return files.reduce(function (r, file) {
            r.push.apply(r, tslib_1.__spread(_this._emitPartialModule2(file.fileName, file.injectables)));
            return r;
        }, []);
    };
    AotCompiler.prototype._emitPartialModule2 = function (fileName, injectables) {
        var _this = this;
        var context = this._createOutputContext(fileName);
        injectables.forEach(function (injectable) { return _this._injectableCompiler.compile(injectable, context); });
        if (context.statements && context.statements.length > 0) {
            return [{ fileName: fileName, statements: tslib_1.__spread(context.constantPool.statements, context.statements) }];
        }
        return [];
    };
    AotCompiler.prototype.emitAllImpls = function (analyzeResult) {
        var _this = this;
        var ngModuleByPipeOrDirective = analyzeResult.ngModuleByPipeOrDirective, files = analyzeResult.files;
        var sourceModules = files.map(function (file) { return _this._compileImplFile(file.fileName, ngModuleByPipeOrDirective, file.directives, file.pipes, file.ngModules, file.injectables); });
        return flatten(sourceModules);
    };
    AotCompiler.prototype._compileImplFile = function (srcFileUrl, ngModuleByPipeOrDirective, directives, pipes, ngModules, injectables) {
        var _this = this;
        var fileSuffix = normalizeGenFileSuffix(splitTypescriptSuffix(srcFileUrl, true)[1]);
        var generatedFiles = [];
        var outputCtx = this._createOutputContext(ngfactoryFilePath(srcFileUrl, true));
        generatedFiles.push.apply(generatedFiles, tslib_1.__spread(this._createSummary(srcFileUrl, directives, pipes, ngModules, injectables, outputCtx)));
        // compile all ng modules
        ngModules.forEach(function (ngModuleMeta) { return _this._compileModule(outputCtx, ngModuleMeta); });
        // compile components
        directives.forEach(function (dirType) {
            var compMeta = _this._metadataResolver.getDirectiveMetadata(dirType);
            if (!compMeta.isComponent) {
                return;
            }
            var ngModule = ngModuleByPipeOrDirective.get(dirType);
            if (!ngModule) {
                throw new Error("Internal Error: cannot determine the module for component " + identifierName(compMeta.type) + "!");
            }
            // compile styles
            var componentStylesheet = _this._styleCompiler.compileComponent(outputCtx, compMeta);
            // Note: compMeta is a component and therefore template is non null.
            compMeta.template.externalStylesheets.forEach(function (stylesheetMeta) {
                // Note: fill non shim and shim style files as they might
                // be shared by component with and without ViewEncapsulation.
                var shim = _this._styleCompiler.needsStyleShim(compMeta);
                generatedFiles.push(_this._codegenStyles(srcFileUrl, compMeta, stylesheetMeta, shim, fileSuffix));
                if (_this._options.allowEmptyCodegenFiles) {
                    generatedFiles.push(_this._codegenStyles(srcFileUrl, compMeta, stylesheetMeta, !shim, fileSuffix));
                }
            });
            // compile components
            var compViewVars = _this._compileComponent(outputCtx, compMeta, ngModule, ngModule.transitiveModule.directives, componentStylesheet, fileSuffix);
            _this._compileComponentFactory(outputCtx, compMeta, ngModule, fileSuffix);
        });
        if (outputCtx.statements.length > 0 || this._options.allowEmptyCodegenFiles) {
            var srcModule = this._codegenSourceModule(srcFileUrl, outputCtx);
            generatedFiles.unshift(srcModule);
        }
        return generatedFiles;
    };
    AotCompiler.prototype._createSummary = function (srcFileName, directives, pipes, ngModules, injectables, ngFactoryCtx) {
        var _this = this;
        var symbolSummaries = this._symbolResolver.getSymbolsOf(srcFileName)
            .map(function (symbol) { return _this._symbolResolver.resolveSymbol(symbol); });
        var typeData = tslib_1.__spread(ngModules.map(function (meta) { return ({
            summary: _this._metadataResolver.getNgModuleSummary(meta.type.reference),
            metadata: _this._metadataResolver.getNgModuleMetadata(meta.type.reference)
        }); }), directives.map(function (ref) { return ({
            summary: _this._metadataResolver.getDirectiveSummary(ref),
            metadata: _this._metadataResolver.getDirectiveMetadata(ref)
        }); }), pipes.map(function (ref) { return ({
            summary: _this._metadataResolver.getPipeSummary(ref),
            metadata: _this._metadataResolver.getPipeMetadata(ref)
        }); }), injectables.map(function (ref) { return ({
            summary: _this._metadataResolver.getInjectableSummary(ref.symbol),
            metadata: _this._metadataResolver.getInjectableSummary(ref.symbol).type
        }); }));
        var forJitOutputCtx = this._options.enableSummariesForJit ?
            this._createOutputContext(summaryForJitFileName(srcFileName, true)) :
            null;
        var _a = serializeSummaries(srcFileName, forJitOutputCtx, this._summaryResolver, this._symbolResolver, symbolSummaries, typeData), json = _a.json, exportAs = _a.exportAs;
        exportAs.forEach(function (entry) {
            ngFactoryCtx.statements.push(o.variable(entry.exportAs).set(ngFactoryCtx.importExpr(entry.symbol)).toDeclStmt(null, [
                o.StmtModifier.Exported
            ]));
        });
        var summaryJson = new GeneratedFile(srcFileName, summaryFileName(srcFileName), json);
        var result = [summaryJson];
        if (forJitOutputCtx) {
            result.push(this._codegenSourceModule(srcFileName, forJitOutputCtx));
        }
        return result;
    };
    AotCompiler.prototype._compileModule = function (outputCtx, ngModule) {
        var providers = [];
        if (this._options.locale) {
            var normalizedLocale = this._options.locale.replace(/_/g, '-');
            providers.push({
                token: createTokenForExternalReference(this.reflector, Identifiers.LOCALE_ID),
                useValue: normalizedLocale,
            });
        }
        if (this._options.i18nFormat) {
            providers.push({
                token: createTokenForExternalReference(this.reflector, Identifiers.TRANSLATIONS_FORMAT),
                useValue: this._options.i18nFormat
            });
        }
        this._ngModuleCompiler.compile(outputCtx, ngModule, providers);
    };
    AotCompiler.prototype._compileComponentFactory = function (outputCtx, compMeta, ngModule, fileSuffix) {
        var hostMeta = this._metadataResolver.getHostComponentMetadata(compMeta);
        var hostViewFactoryVar = this._compileComponent(outputCtx, hostMeta, ngModule, [compMeta.type], null, fileSuffix)
            .viewClassVar;
        var compFactoryVar = componentFactoryName(compMeta.type.reference);
        var inputsExprs = [];
        for (var propName in compMeta.inputs) {
            var templateName = compMeta.inputs[propName];
            // Don't quote so that the key gets minified...
            inputsExprs.push(new o.LiteralMapEntry(propName, o.literal(templateName), false));
        }
        var outputsExprs = [];
        for (var propName in compMeta.outputs) {
            var templateName = compMeta.outputs[propName];
            // Don't quote so that the key gets minified...
            outputsExprs.push(new o.LiteralMapEntry(propName, o.literal(templateName), false));
        }
        outputCtx.statements.push(o.variable(compFactoryVar)
            .set(o.importExpr(Identifiers.createComponentFactory).callFn([
            o.literal(compMeta.selector), outputCtx.importExpr(compMeta.type.reference),
            o.variable(hostViewFactoryVar), new o.LiteralMapExpr(inputsExprs),
            new o.LiteralMapExpr(outputsExprs),
            o.literalArr(compMeta.template.ngContentSelectors.map(function (selector) { return o.literal(selector); }))
        ]))
            .toDeclStmt(o.importType(Identifiers.ComponentFactory, [o.expressionType(outputCtx.importExpr(compMeta.type.reference))], [o.TypeModifier.Const]), [o.StmtModifier.Final, o.StmtModifier.Exported]));
    };
    AotCompiler.prototype._compileComponent = function (outputCtx, compMeta, ngModule, directiveIdentifiers, componentStyles, fileSuffix) {
        var _a = this._parseTemplate(compMeta, ngModule, directiveIdentifiers), parsedTemplate = _a.template, usedPipes = _a.pipes;
        var stylesExpr = componentStyles ? o.variable(componentStyles.stylesVar) : o.literalArr([]);
        var viewResult = this._viewCompiler.compileComponent(outputCtx, compMeta, parsedTemplate, stylesExpr, usedPipes);
        if (componentStyles) {
            _resolveStyleStatements(this._symbolResolver, componentStyles, this._styleCompiler.needsStyleShim(compMeta), fileSuffix);
        }
        return viewResult;
    };
    AotCompiler.prototype._parseTemplate = function (compMeta, ngModule, directiveIdentifiers) {
        var _this = this;
        if (this._templateAstCache.has(compMeta.type.reference)) {
            return this._templateAstCache.get(compMeta.type.reference);
        }
        var preserveWhitespaces = compMeta.template.preserveWhitespaces;
        var directives = directiveIdentifiers.map(function (dir) { return _this._metadataResolver.getDirectiveSummary(dir.reference); });
        var pipes = ngModule.transitiveModule.pipes.map(function (pipe) { return _this._metadataResolver.getPipeSummary(pipe.reference); });
        var result = this._templateParser.parse(compMeta, compMeta.template.htmlAst, directives, pipes, ngModule.schemas, templateSourceUrl(ngModule.type, compMeta, compMeta.template), preserveWhitespaces);
        this._templateAstCache.set(compMeta.type.reference, result);
        return result;
    };
    AotCompiler.prototype._createOutputContext = function (genFilePath) {
        var _this = this;
        var importExpr = function (symbol, typeParams, useSummaries) {
            if (typeParams === void 0) { typeParams = null; }
            if (useSummaries === void 0) { useSummaries = true; }
            if (!(symbol instanceof StaticSymbol)) {
                throw new Error("Internal error: unknown identifier " + JSON.stringify(symbol));
            }
            var arity = _this._symbolResolver.getTypeArity(symbol) || 0;
            var _a = _this._symbolResolver.getImportAs(symbol, useSummaries) || symbol, filePath = _a.filePath, name = _a.name, members = _a.members;
            var importModule = _this._fileNameToModuleName(filePath, genFilePath);
            // It should be good enough to compare filePath to genFilePath and if they are equal
            // there is a self reference. However, ngfactory files generate to .ts but their
            // symbols have .d.ts so a simple compare is insufficient. They should be canonical
            // and is tracked by #17705.
            var selfReference = _this._fileNameToModuleName(genFilePath, genFilePath);
            var moduleName = importModule === selfReference ? null : importModule;
            // If we are in a type expression that refers to a generic type then supply
            // the required type parameters. If there were not enough type parameters
            // supplied, supply any as the type. Outside a type expression the reference
            // should not supply type parameters and be treated as a simple value reference
            // to the constructor function itself.
            var suppliedTypeParams = typeParams || [];
            var missingTypeParamsCount = arity - suppliedTypeParams.length;
            var allTypeParams = suppliedTypeParams.concat(new Array(missingTypeParamsCount).fill(o.DYNAMIC_TYPE));
            return members.reduce(function (expr, memberName) { return expr.prop(memberName); }, o.importExpr(new o.ExternalReference(moduleName, name, null), allTypeParams));
        };
        return { statements: [], genFilePath: genFilePath, importExpr: importExpr, constantPool: new ConstantPool() };
    };
    AotCompiler.prototype._fileNameToModuleName = function (importedFilePath, containingFilePath) {
        return this._summaryResolver.getKnownModuleName(importedFilePath) ||
            this._symbolResolver.getKnownModuleName(importedFilePath) ||
            this._host.fileNameToModuleName(importedFilePath, containingFilePath);
    };
    AotCompiler.prototype._codegenStyles = function (srcFileUrl, compMeta, stylesheetMetadata, isShimmed, fileSuffix) {
        var outputCtx = this._createOutputContext(_stylesModuleUrl(stylesheetMetadata.moduleUrl, isShimmed, fileSuffix));
        var compiledStylesheet = this._styleCompiler.compileStyles(outputCtx, compMeta, stylesheetMetadata, isShimmed);
        _resolveStyleStatements(this._symbolResolver, compiledStylesheet, isShimmed, fileSuffix);
        return this._codegenSourceModule(srcFileUrl, outputCtx);
    };
    AotCompiler.prototype._codegenSourceModule = function (srcFileUrl, ctx) {
        return new GeneratedFile(srcFileUrl, ctx.genFilePath, ctx.statements);
    };
    AotCompiler.prototype.listLazyRoutes = function (entryRoute, analyzedModules) {
        var e_2, _a, e_3, _b;
        var self = this;
        if (entryRoute) {
            var symbol = parseLazyRoute(entryRoute, this.reflector).referencedModule;
            return visitLazyRoute(symbol);
        }
        else if (analyzedModules) {
            var allLazyRoutes = [];
            try {
                for (var _c = tslib_1.__values(analyzedModules.ngModules), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var ngModule = _d.value;
                    var lazyRoutes = listLazyRoutes(ngModule, this.reflector);
                    try {
                        for (var lazyRoutes_1 = tslib_1.__values(lazyRoutes), lazyRoutes_1_1 = lazyRoutes_1.next(); !lazyRoutes_1_1.done; lazyRoutes_1_1 = lazyRoutes_1.next()) {
                            var lazyRoute = lazyRoutes_1_1.value;
                            allLazyRoutes.push(lazyRoute);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (lazyRoutes_1_1 && !lazyRoutes_1_1.done && (_b = lazyRoutes_1.return)) _b.call(lazyRoutes_1);
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
            return allLazyRoutes;
        }
        else {
            throw new Error("Either route or analyzedModules has to be specified!");
        }
        function visitLazyRoute(symbol, seenRoutes, allLazyRoutes) {
            if (seenRoutes === void 0) { seenRoutes = new Set(); }
            if (allLazyRoutes === void 0) { allLazyRoutes = []; }
            var e_4, _a;
            // Support pointing to default exports, but stop recursing there,
            // as the StaticReflector does not yet support default exports.
            if (seenRoutes.has(symbol) || !symbol.name) {
                return allLazyRoutes;
            }
            seenRoutes.add(symbol);
            var lazyRoutes = listLazyRoutes(self._metadataResolver.getNgModuleMetadata(symbol, true), self.reflector);
            try {
                for (var lazyRoutes_2 = tslib_1.__values(lazyRoutes), lazyRoutes_2_1 = lazyRoutes_2.next(); !lazyRoutes_2_1.done; lazyRoutes_2_1 = lazyRoutes_2.next()) {
                    var lazyRoute = lazyRoutes_2_1.value;
                    allLazyRoutes.push(lazyRoute);
                    visitLazyRoute(lazyRoute.referencedModule, seenRoutes, allLazyRoutes);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (lazyRoutes_2_1 && !lazyRoutes_2_1.done && (_a = lazyRoutes_2.return)) _a.call(lazyRoutes_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return allLazyRoutes;
        }
    };
    return AotCompiler;
}());
export { AotCompiler };
function _createEmptyStub(outputCtx) {
    // Note: We need to produce at least one import statement so that
    // TypeScript knows that the file is an es6 module. Otherwise our generated
    // exports / imports won't be emitted properly by TypeScript.
    outputCtx.statements.push(o.importExpr(Identifiers.ComponentFactory).toStmt());
}
function _resolveStyleStatements(symbolResolver, compileResult, needsShim, fileSuffix) {
    compileResult.dependencies.forEach(function (dep) {
        dep.setValue(symbolResolver.getStaticSymbol(_stylesModuleUrl(dep.moduleUrl, needsShim, fileSuffix), dep.name));
    });
}
function _stylesModuleUrl(stylesheetUrl, shim, suffix) {
    return "" + stylesheetUrl + (shim ? '.shim' : '') + ".ngstyle" + suffix;
}
export function analyzeNgModules(fileNames, host, staticSymbolResolver, metadataResolver) {
    var files = _analyzeFilesIncludingNonProgramFiles(fileNames, host, staticSymbolResolver, metadataResolver);
    return mergeAnalyzedFiles(files);
}
export function analyzeAndValidateNgModules(fileNames, host, staticSymbolResolver, metadataResolver) {
    return validateAnalyzedModules(analyzeNgModules(fileNames, host, staticSymbolResolver, metadataResolver));
}
function validateAnalyzedModules(analyzedModules) {
    if (analyzedModules.symbolsMissingModule && analyzedModules.symbolsMissingModule.length) {
        var messages = analyzedModules.symbolsMissingModule.map(function (s) {
            return "Cannot determine the module for class " + s.name + " in " + s.filePath + "! Add " + s.name + " to the NgModule to fix it.";
        });
        throw syntaxError(messages.join('\n'));
    }
    return analyzedModules;
}
// Analyzes all of the program files,
// including files that are not part of the program
// but are referenced by an NgModule.
function _analyzeFilesIncludingNonProgramFiles(fileNames, host, staticSymbolResolver, metadataResolver) {
    var seenFiles = new Set();
    var files = [];
    var visitFile = function (fileName) {
        if (seenFiles.has(fileName) || !host.isSourceFile(fileName)) {
            return false;
        }
        seenFiles.add(fileName);
        var analyzedFile = analyzeFile(host, staticSymbolResolver, metadataResolver, fileName);
        files.push(analyzedFile);
        analyzedFile.ngModules.forEach(function (ngModule) {
            ngModule.transitiveModule.modules.forEach(function (modMeta) { return visitFile(modMeta.reference.filePath); });
        });
    };
    fileNames.forEach(function (fileName) { return visitFile(fileName); });
    return files;
}
export function analyzeFile(host, staticSymbolResolver, metadataResolver, fileName) {
    var directives = [];
    var pipes = [];
    var injectables = [];
    var ngModules = [];
    var hasDecorators = staticSymbolResolver.hasDecorators(fileName);
    var exportsNonSourceFiles = false;
    // Don't analyze .d.ts files that have no decorators as a shortcut
    // to speed up the analysis. This prevents us from
    // resolving the references in these files.
    // Note: exportsNonSourceFiles is only needed when compiling with summaries,
    // which is not the case when .d.ts files are treated as input files.
    if (!fileName.endsWith('.d.ts') || hasDecorators) {
        staticSymbolResolver.getSymbolsOf(fileName).forEach(function (symbol) {
            var resolvedSymbol = staticSymbolResolver.resolveSymbol(symbol);
            var symbolMeta = resolvedSymbol.metadata;
            if (!symbolMeta || symbolMeta.__symbolic === 'error') {
                return;
            }
            var isNgSymbol = false;
            if (symbolMeta.__symbolic === 'class') {
                if (metadataResolver.isDirective(symbol)) {
                    isNgSymbol = true;
                    directives.push(symbol);
                }
                else if (metadataResolver.isPipe(symbol)) {
                    isNgSymbol = true;
                    pipes.push(symbol);
                }
                else if (metadataResolver.isNgModule(symbol)) {
                    var ngModule = metadataResolver.getNgModuleMetadata(symbol, false);
                    if (ngModule) {
                        isNgSymbol = true;
                        ngModules.push(ngModule);
                    }
                }
                else if (metadataResolver.isInjectable(symbol)) {
                    isNgSymbol = true;
                    var injectable = metadataResolver.getInjectableMetadata(symbol, null, false);
                    if (injectable) {
                        injectables.push(injectable);
                    }
                }
            }
            if (!isNgSymbol) {
                exportsNonSourceFiles =
                    exportsNonSourceFiles || isValueExportingNonSourceFile(host, symbolMeta);
            }
        });
    }
    return {
        fileName: fileName, directives: directives, pipes: pipes, ngModules: ngModules, injectables: injectables, exportsNonSourceFiles: exportsNonSourceFiles,
    };
}
export function analyzeFileForInjectables(host, staticSymbolResolver, metadataResolver, fileName) {
    var injectables = [];
    var shallowModules = [];
    if (staticSymbolResolver.hasDecorators(fileName)) {
        staticSymbolResolver.getSymbolsOf(fileName).forEach(function (symbol) {
            var resolvedSymbol = staticSymbolResolver.resolveSymbol(symbol);
            var symbolMeta = resolvedSymbol.metadata;
            if (!symbolMeta || symbolMeta.__symbolic === 'error') {
                return;
            }
            if (symbolMeta.__symbolic === 'class') {
                if (metadataResolver.isInjectable(symbol)) {
                    var injectable = metadataResolver.getInjectableMetadata(symbol, null, false);
                    if (injectable) {
                        injectables.push(injectable);
                    }
                }
                else if (metadataResolver.isNgModule(symbol)) {
                    var module = metadataResolver.getShallowModuleMetadata(symbol);
                    if (module) {
                        shallowModules.push(module);
                    }
                }
            }
        });
    }
    return { fileName: fileName, injectables: injectables, shallowModules: shallowModules };
}
function isValueExportingNonSourceFile(host, metadata) {
    var exportsNonSourceFiles = false;
    var Visitor = /** @class */ (function () {
        function Visitor() {
        }
        Visitor.prototype.visitArray = function (arr, context) {
            var _this = this;
            arr.forEach(function (v) { return visitValue(v, _this, context); });
        };
        Visitor.prototype.visitStringMap = function (map, context) {
            var _this = this;
            Object.keys(map).forEach(function (key) { return visitValue(map[key], _this, context); });
        };
        Visitor.prototype.visitPrimitive = function (value, context) { };
        Visitor.prototype.visitOther = function (value, context) {
            if (value instanceof StaticSymbol && !host.isSourceFile(value.filePath)) {
                exportsNonSourceFiles = true;
            }
        };
        return Visitor;
    }());
    visitValue(metadata, new Visitor(), null);
    return exportsNonSourceFiles;
}
export function mergeAnalyzedFiles(analyzedFiles) {
    var allNgModules = [];
    var ngModuleByPipeOrDirective = new Map();
    var allPipesAndDirectives = new Set();
    analyzedFiles.forEach(function (af) {
        af.ngModules.forEach(function (ngModule) {
            allNgModules.push(ngModule);
            ngModule.declaredDirectives.forEach(function (d) { return ngModuleByPipeOrDirective.set(d.reference, ngModule); });
            ngModule.declaredPipes.forEach(function (p) { return ngModuleByPipeOrDirective.set(p.reference, ngModule); });
        });
        af.directives.forEach(function (d) { return allPipesAndDirectives.add(d); });
        af.pipes.forEach(function (p) { return allPipesAndDirectives.add(p); });
    });
    var symbolsMissingModule = [];
    allPipesAndDirectives.forEach(function (ref) {
        if (!ngModuleByPipeOrDirective.has(ref)) {
            symbolsMissingModule.push(ref);
        }
    });
    return {
        ngModules: allNgModules,
        ngModuleByPipeOrDirective: ngModuleByPipeOrDirective,
        symbolsMissingModule: symbolsMissingModule,
        files: analyzedFiles
    };
}
function mergeAndValidateNgFiles(files) {
    return validateAnalyzedModules(mergeAnalyzedFiles(files));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvYW90L2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQThRLG9CQUFvQixFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVsWCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsV0FBVyxFQUFFLCtCQUErQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFJNUUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyw0QkFBNEIsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBR3BHLE9BQU8sS0FBSyxDQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFMUMsT0FBTyxFQUFDLDBCQUEwQixJQUFJLGVBQWUsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzVGLE9BQU8sRUFBQyxzQkFBc0IsSUFBSSxhQUFhLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUMsMkJBQTJCLElBQUksa0JBQWtCLEVBQUUsMkJBQTJCLElBQUksa0JBQWtCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM5SSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUcv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QUM7SUFDSCxPQUFPO1FBQ0wsU0FBUyxFQUFFLFlBQVk7UUFDdkIseUJBQXlCLDJCQUFBO1FBQ3pCLG9CQUFvQixzQkFBQTtRQUNwQixLQUFLLEVBQUUsYUFBYTtLQUNyQixDQUFDO0FBQ0osQ0FBQztBQUVELGlDQUFpQyxLQUF1QjtJQUN0RCxPQUFPLHVCQUF1QixDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDNUQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEsIENvbXBpbGVJbmplY3RhYmxlTWV0YWRhdGEsIENvbXBpbGVOZ01vZHVsZU1ldGFkYXRhLCBDb21waWxlUGlwZU1ldGFkYXRhLCBDb21waWxlUGlwZVN1bW1hcnksIENvbXBpbGVQcm92aWRlck1ldGFkYXRhLCBDb21waWxlU2hhbGxvd01vZHVsZU1ldGFkYXRhLCBDb21waWxlU3R5bGVzaGVldE1ldGFkYXRhLCBDb21waWxlVHlwZU1ldGFkYXRhLCBDb21waWxlVHlwZVN1bW1hcnksIGNvbXBvbmVudEZhY3RvcnlOYW1lLCBmbGF0dGVuLCBpZGVudGlmaWVyTmFtZSwgdGVtcGxhdGVTb3VyY2VVcmx9IGZyb20gJy4uL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtDb21waWxlckNvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7Q29uc3RhbnRQb29sfSBmcm9tICcuLi9jb25zdGFudF9wb29sJztcbmltcG9ydCB7Vmlld0VuY2Fwc3VsYXRpb259IGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlQnVuZGxlfSBmcm9tICcuLi9pMThuL21lc3NhZ2VfYnVuZGxlJztcbmltcG9ydCB7SWRlbnRpZmllcnMsIGNyZWF0ZVRva2VuRm9yRXh0ZXJuYWxSZWZlcmVuY2V9IGZyb20gJy4uL2lkZW50aWZpZXJzJztcbmltcG9ydCB7SW5qZWN0YWJsZUNvbXBpbGVyfSBmcm9tICcuLi9pbmplY3RhYmxlX2NvbXBpbGVyJztcbmltcG9ydCB7Q29tcGlsZU1ldGFkYXRhUmVzb2x2ZXJ9IGZyb20gJy4uL21ldGFkYXRhX3Jlc29sdmVyJztcbmltcG9ydCAqIGFzIGh0bWwgZnJvbSAnLi4vbWxfcGFyc2VyL2FzdCc7XG5pbXBvcnQge0h0bWxQYXJzZXJ9IGZyb20gJy4uL21sX3BhcnNlci9odG1sX3BhcnNlcic7XG5pbXBvcnQge3JlbW92ZVdoaXRlc3BhY2VzfSBmcm9tICcuLi9tbF9wYXJzZXIvaHRtbF93aGl0ZXNwYWNlcyc7XG5pbXBvcnQge0RFRkFVTFRfSU5URVJQT0xBVElPTl9DT05GSUcsIEludGVycG9sYXRpb25Db25maWd9IGZyb20gJy4uL21sX3BhcnNlci9pbnRlcnBvbGF0aW9uX2NvbmZpZyc7XG5pbXBvcnQge05nTW9kdWxlQ29tcGlsZXJ9IGZyb20gJy4uL25nX21vZHVsZV9jb21waWxlcic7XG5pbXBvcnQge091dHB1dEVtaXR0ZXJ9IGZyb20gJy4uL291dHB1dC9hYnN0cmFjdF9lbWl0dGVyJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtQYXJzZUVycm9yfSBmcm9tICcuLi9wYXJzZV91dGlsJztcbmltcG9ydCB7Y29tcGlsZU5nTW9kdWxlRnJvbVJlbmRlcjIgYXMgY29tcGlsZVIzTW9kdWxlfSBmcm9tICcuLi9yZW5kZXIzL3IzX21vZHVsZV9jb21waWxlcic7XG5pbXBvcnQge2NvbXBpbGVQaXBlRnJvbVJlbmRlcjIgYXMgY29tcGlsZVIzUGlwZX0gZnJvbSAnLi4vcmVuZGVyMy9yM19waXBlX2NvbXBpbGVyJztcbmltcG9ydCB7aHRtbEFzdFRvUmVuZGVyM0FzdH0gZnJvbSAnLi4vcmVuZGVyMy9yM190ZW1wbGF0ZV90cmFuc2Zvcm0nO1xuaW1wb3J0IHtjb21waWxlQ29tcG9uZW50RnJvbVJlbmRlcjIgYXMgY29tcGlsZVIzQ29tcG9uZW50LCBjb21waWxlRGlyZWN0aXZlRnJvbVJlbmRlcjIgYXMgY29tcGlsZVIzRGlyZWN0aXZlfSBmcm9tICcuLi9yZW5kZXIzL3ZpZXcvY29tcGlsZXInO1xuaW1wb3J0IHtEb21FbGVtZW50U2NoZW1hUmVnaXN0cnl9IGZyb20gJy4uL3NjaGVtYS9kb21fZWxlbWVudF9zY2hlbWFfcmVnaXN0cnknO1xuaW1wb3J0IHtDb21waWxlZFN0eWxlc2hlZXQsIFN0eWxlQ29tcGlsZXJ9IGZyb20gJy4uL3N0eWxlX2NvbXBpbGVyJztcbmltcG9ydCB7U3VtbWFyeVJlc29sdmVyfSBmcm9tICcuLi9zdW1tYXJ5X3Jlc29sdmVyJztcbmltcG9ydCB7QmluZGluZ1BhcnNlcn0gZnJvbSAnLi4vdGVtcGxhdGVfcGFyc2VyL2JpbmRpbmdfcGFyc2VyJztcbmltcG9ydCB7VGVtcGxhdGVBc3R9IGZyb20gJy4uL3RlbXBsYXRlX3BhcnNlci90ZW1wbGF0ZV9hc3QnO1xuaW1wb3J0IHtUZW1wbGF0ZVBhcnNlcn0gZnJvbSAnLi4vdGVtcGxhdGVfcGFyc2VyL3RlbXBsYXRlX3BhcnNlcic7XG5pbXBvcnQge091dHB1dENvbnRleHQsIFZhbHVlVmlzaXRvciwgZXJyb3IsIHN5bnRheEVycm9yLCB2aXNpdFZhbHVlfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7VHlwZUNoZWNrQ29tcGlsZXJ9IGZyb20gJy4uL3ZpZXdfY29tcGlsZXIvdHlwZV9jaGVja19jb21waWxlcic7XG5pbXBvcnQge1ZpZXdDb21waWxlUmVzdWx0LCBWaWV3Q29tcGlsZXJ9IGZyb20gJy4uL3ZpZXdfY29tcGlsZXIvdmlld19jb21waWxlcic7XG5cbmltcG9ydCB7QW90Q29tcGlsZXJIb3N0fSBmcm9tICcuL2NvbXBpbGVyX2hvc3QnO1xuaW1wb3J0IHtBb3RDb21waWxlck9wdGlvbnN9IGZyb20gJy4vY29tcGlsZXJfb3B0aW9ucyc7XG5pbXBvcnQge0dlbmVyYXRlZEZpbGV9IGZyb20gJy4vZ2VuZXJhdGVkX2ZpbGUnO1xuaW1wb3J0IHtMYXp5Um91dGUsIGxpc3RMYXp5Um91dGVzLCBwYXJzZUxhenlSb3V0ZX0gZnJvbSAnLi9sYXp5X3JvdXRlcyc7XG5pbXBvcnQge1BhcnRpYWxNb2R1bGV9IGZyb20gJy4vcGFydGlhbF9tb2R1bGUnO1xuaW1wb3J0IHtTdGF0aWNSZWZsZWN0b3J9IGZyb20gJy4vc3RhdGljX3JlZmxlY3Rvcic7XG5pbXBvcnQge1N0YXRpY1N5bWJvbH0gZnJvbSAnLi9zdGF0aWNfc3ltYm9sJztcbmltcG9ydCB7U3RhdGljU3ltYm9sUmVzb2x2ZXJ9IGZyb20gJy4vc3RhdGljX3N5bWJvbF9yZXNvbHZlcic7XG5pbXBvcnQge2NyZWF0ZUZvckppdFN0dWIsIHNlcmlhbGl6ZVN1bW1hcmllc30gZnJvbSAnLi9zdW1tYXJ5X3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtuZ2ZhY3RvcnlGaWxlUGF0aCwgbm9ybWFsaXplR2VuRmlsZVN1ZmZpeCwgc3BsaXRUeXBlc2NyaXB0U3VmZml4LCBzdW1tYXJ5RmlsZU5hbWUsIHN1bW1hcnlGb3JKaXRGaWxlTmFtZX0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgZW51bSBTdHViRW1pdEZsYWdzIHsgQmFzaWMgPSAxIDw8IDAsIFR5cGVDaGVjayA9IDEgPDwgMSwgQWxsID0gVHlwZUNoZWNrIHwgQmFzaWMgfVxuXG5leHBvcnQgY2xhc3MgQW90Q29tcGlsZXIge1xuICBwcml2YXRlIF90ZW1wbGF0ZUFzdENhY2hlID1cbiAgICAgIG5ldyBNYXA8U3RhdGljU3ltYm9sLCB7dGVtcGxhdGU6IFRlbXBsYXRlQXN0W10sIHBpcGVzOiBDb21waWxlUGlwZVN1bW1hcnlbXX0+KCk7XG4gIHByaXZhdGUgX2FuYWx5emVkRmlsZXMgPSBuZXcgTWFwPHN0cmluZywgTmdBbmFseXplZEZpbGU+KCk7XG4gIHByaXZhdGUgX2FuYWx5emVkRmlsZXNGb3JJbmplY3RhYmxlcyA9IG5ldyBNYXA8c3RyaW5nLCBOZ0FuYWx5emVkRmlsZVdpdGhJbmplY3RhYmxlcz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2NvbmZpZzogQ29tcGlsZXJDb25maWcsIHByaXZhdGUgX29wdGlvbnM6IEFvdENvbXBpbGVyT3B0aW9ucyxcbiAgICAgIHByaXZhdGUgX2hvc3Q6IEFvdENvbXBpbGVySG9zdCwgcmVhZG9ubHkgcmVmbGVjdG9yOiBTdGF0aWNSZWZsZWN0b3IsXG4gICAgICBwcml2YXRlIF9tZXRhZGF0YVJlc29sdmVyOiBDb21waWxlTWV0YWRhdGFSZXNvbHZlciwgcHJpdmF0ZSBfdGVtcGxhdGVQYXJzZXI6IFRlbXBsYXRlUGFyc2VyLFxuICAgICAgcHJpdmF0ZSBfc3R5bGVDb21waWxlcjogU3R5bGVDb21waWxlciwgcHJpdmF0ZSBfdmlld0NvbXBpbGVyOiBWaWV3Q29tcGlsZXIsXG4gICAgICBwcml2YXRlIF90eXBlQ2hlY2tDb21waWxlcjogVHlwZUNoZWNrQ29tcGlsZXIsIHByaXZhdGUgX25nTW9kdWxlQ29tcGlsZXI6IE5nTW9kdWxlQ29tcGlsZXIsXG4gICAgICBwcml2YXRlIF9pbmplY3RhYmxlQ29tcGlsZXI6IEluamVjdGFibGVDb21waWxlciwgcHJpdmF0ZSBfb3V0cHV0RW1pdHRlcjogT3V0cHV0RW1pdHRlcixcbiAgICAgIHByaXZhdGUgX3N1bW1hcnlSZXNvbHZlcjogU3VtbWFyeVJlc29sdmVyPFN0YXRpY1N5bWJvbD4sXG4gICAgICBwcml2YXRlIF9zeW1ib2xSZXNvbHZlcjogU3RhdGljU3ltYm9sUmVzb2x2ZXIpIHt9XG5cbiAgY2xlYXJDYWNoZSgpIHsgdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5jbGVhckNhY2hlKCk7IH1cblxuICBhbmFseXplTW9kdWxlc1N5bmMocm9vdEZpbGVzOiBzdHJpbmdbXSk6IE5nQW5hbHl6ZWRNb2R1bGVzIHtcbiAgICBjb25zdCBhbmFseXplUmVzdWx0ID0gYW5hbHl6ZUFuZFZhbGlkYXRlTmdNb2R1bGVzKFxuICAgICAgICByb290RmlsZXMsIHRoaXMuX2hvc3QsIHRoaXMuX3N5bWJvbFJlc29sdmVyLCB0aGlzLl9tZXRhZGF0YVJlc29sdmVyKTtcbiAgICBhbmFseXplUmVzdWx0Lm5nTW9kdWxlcy5mb3JFYWNoKFxuICAgICAgICBuZ01vZHVsZSA9PiB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmxvYWROZ01vZHVsZURpcmVjdGl2ZUFuZFBpcGVNZXRhZGF0YShcbiAgICAgICAgICAgIG5nTW9kdWxlLnR5cGUucmVmZXJlbmNlLCB0cnVlKSk7XG4gICAgcmV0dXJuIGFuYWx5emVSZXN1bHQ7XG4gIH1cblxuICBhbmFseXplTW9kdWxlc0FzeW5jKHJvb3RGaWxlczogc3RyaW5nW10pOiBQcm9taXNlPE5nQW5hbHl6ZWRNb2R1bGVzPiB7XG4gICAgY29uc3QgYW5hbHl6ZVJlc3VsdCA9IGFuYWx5emVBbmRWYWxpZGF0ZU5nTW9kdWxlcyhcbiAgICAgICAgcm9vdEZpbGVzLCB0aGlzLl9ob3N0LCB0aGlzLl9zeW1ib2xSZXNvbHZlciwgdGhpcy5fbWV0YWRhdGFSZXNvbHZlcik7XG4gICAgcmV0dXJuIFByb21pc2VcbiAgICAgICAgLmFsbChhbmFseXplUmVzdWx0Lm5nTW9kdWxlcy5tYXAoXG4gICAgICAgICAgICBuZ01vZHVsZSA9PiB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmxvYWROZ01vZHVsZURpcmVjdGl2ZUFuZFBpcGVNZXRhZGF0YShcbiAgICAgICAgICAgICAgICBuZ01vZHVsZS50eXBlLnJlZmVyZW5jZSwgZmFsc2UpKSlcbiAgICAgICAgLnRoZW4oKCkgPT4gYW5hbHl6ZVJlc3VsdCk7XG4gIH1cblxuICBwcml2YXRlIF9hbmFseXplRmlsZShmaWxlTmFtZTogc3RyaW5nKTogTmdBbmFseXplZEZpbGUge1xuICAgIGxldCBhbmFseXplZEZpbGUgPSB0aGlzLl9hbmFseXplZEZpbGVzLmdldChmaWxlTmFtZSk7XG4gICAgaWYgKCFhbmFseXplZEZpbGUpIHtcbiAgICAgIGFuYWx5emVkRmlsZSA9XG4gICAgICAgICAgYW5hbHl6ZUZpbGUodGhpcy5faG9zdCwgdGhpcy5fc3ltYm9sUmVzb2x2ZXIsIHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIsIGZpbGVOYW1lKTtcbiAgICAgIHRoaXMuX2FuYWx5emVkRmlsZXMuc2V0KGZpbGVOYW1lLCBhbmFseXplZEZpbGUpO1xuICAgIH1cbiAgICByZXR1cm4gYW5hbHl6ZWRGaWxlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYW5hbHl6ZUZpbGVGb3JJbmplY3RhYmxlcyhmaWxlTmFtZTogc3RyaW5nKTogTmdBbmFseXplZEZpbGVXaXRoSW5qZWN0YWJsZXMge1xuICAgIGxldCBhbmFseXplZEZpbGUgPSB0aGlzLl9hbmFseXplZEZpbGVzRm9ySW5qZWN0YWJsZXMuZ2V0KGZpbGVOYW1lKTtcbiAgICBpZiAoIWFuYWx5emVkRmlsZSkge1xuICAgICAgYW5hbHl6ZWRGaWxlID0gYW5hbHl6ZUZpbGVGb3JJbmplY3RhYmxlcyhcbiAgICAgICAgICB0aGlzLl9ob3N0LCB0aGlzLl9zeW1ib2xSZXNvbHZlciwgdGhpcy5fbWV0YWRhdGFSZXNvbHZlciwgZmlsZU5hbWUpO1xuICAgICAgdGhpcy5fYW5hbHl6ZWRGaWxlc0ZvckluamVjdGFibGVzLnNldChmaWxlTmFtZSwgYW5hbHl6ZWRGaWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIGFuYWx5emVkRmlsZTtcbiAgfVxuXG4gIGZpbmRHZW5lcmF0ZWRGaWxlTmFtZXMoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBnZW5GaWxlTmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgZmlsZSA9IHRoaXMuX2FuYWx5emVGaWxlKGZpbGVOYW1lKTtcbiAgICAvLyBNYWtlIHN1cmUgd2UgY3JlYXRlIGEgLm5nZmFjdG9yeSBpZiB3ZSBoYXZlIGEgaW5qZWN0YWJsZS9kaXJlY3RpdmUvcGlwZS9OZ01vZHVsZVxuICAgIC8vIG9yIGEgcmVmZXJlbmNlIHRvIGEgbm9uIHNvdXJjZSBmaWxlLlxuICAgIC8vIE5vdGU6IFRoaXMgaXMgb3ZlcmVzdGltYXRpbmcgdGhlIHJlcXVpcmVkIC5uZ2ZhY3RvcnkgZmlsZXMgYXMgdGhlIHJlYWwgY2FsY3VsYXRpb24gaXMgaGFyZGVyLlxuICAgIC8vIE9ubHkgZG8gdGhpcyBmb3IgU3R1YkVtaXRGbGFncy5CYXNpYywgYXMgYWRkaW5nIGEgdHlwZSBjaGVjayBibG9ja1xuICAgIC8vIGRvZXMgbm90IGNoYW5nZSB0aGlzIGZpbGUgKGFzIHdlIGdlbmVyYXRlIHR5cGUgY2hlY2sgYmxvY2tzIGJhc2VkIG9uIE5nTW9kdWxlcykuXG4gICAgaWYgKHRoaXMuX29wdGlvbnMuYWxsb3dFbXB0eUNvZGVnZW5GaWxlcyB8fCBmaWxlLmRpcmVjdGl2ZXMubGVuZ3RoIHx8IGZpbGUucGlwZXMubGVuZ3RoIHx8XG4gICAgICAgIGZpbGUuaW5qZWN0YWJsZXMubGVuZ3RoIHx8IGZpbGUubmdNb2R1bGVzLmxlbmd0aCB8fCBmaWxlLmV4cG9ydHNOb25Tb3VyY2VGaWxlcykge1xuICAgICAgZ2VuRmlsZU5hbWVzLnB1c2gobmdmYWN0b3J5RmlsZVBhdGgoZmlsZS5maWxlTmFtZSwgdHJ1ZSkpO1xuICAgICAgaWYgKHRoaXMuX29wdGlvbnMuZW5hYmxlU3VtbWFyaWVzRm9ySml0KSB7XG4gICAgICAgIGdlbkZpbGVOYW1lcy5wdXNoKHN1bW1hcnlGb3JKaXRGaWxlTmFtZShmaWxlLmZpbGVOYW1lLCB0cnVlKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGZpbGVTdWZmaXggPSBub3JtYWxpemVHZW5GaWxlU3VmZml4KHNwbGl0VHlwZXNjcmlwdFN1ZmZpeChmaWxlLmZpbGVOYW1lLCB0cnVlKVsxXSk7XG4gICAgZmlsZS5kaXJlY3RpdmVzLmZvckVhY2goKGRpclN5bWJvbCkgPT4ge1xuICAgICAgY29uc3QgY29tcE1ldGEgPVxuICAgICAgICAgIHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0Tm9uTm9ybWFsaXplZERpcmVjdGl2ZU1ldGFkYXRhKGRpclN5bWJvbCkgIS5tZXRhZGF0YTtcbiAgICAgIGlmICghY29tcE1ldGEuaXNDb21wb25lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gTm90ZTogY29tcE1ldGEgaXMgYSBjb21wb25lbnQgYW5kIHRoZXJlZm9yZSB0ZW1wbGF0ZSBpcyBub24gbnVsbC5cbiAgICAgIGNvbXBNZXRhLnRlbXBsYXRlICEuc3R5bGVVcmxzLmZvckVhY2goKHN0eWxlVXJsKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRVcmwgPSB0aGlzLl9ob3N0LnJlc291cmNlTmFtZVRvRmlsZU5hbWUoc3R5bGVVcmwsIGZpbGUuZmlsZU5hbWUpO1xuICAgICAgICBpZiAoIW5vcm1hbGl6ZWRVcmwpIHtcbiAgICAgICAgICB0aHJvdyBzeW50YXhFcnJvcihgQ291bGRuJ3QgcmVzb2x2ZSByZXNvdXJjZSAke3N0eWxlVXJsfSByZWxhdGl2ZSB0byAke2ZpbGUuZmlsZU5hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmVlZHNTaGltID0gKGNvbXBNZXRhLnRlbXBsYXRlICEuZW5jYXBzdWxhdGlvbiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLmRlZmF1bHRFbmNhcHN1bGF0aW9uKSA9PT0gVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWQ7XG4gICAgICAgIGdlbkZpbGVOYW1lcy5wdXNoKF9zdHlsZXNNb2R1bGVVcmwobm9ybWFsaXplZFVybCwgbmVlZHNTaGltLCBmaWxlU3VmZml4KSk7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmFsbG93RW1wdHlDb2RlZ2VuRmlsZXMpIHtcbiAgICAgICAgICBnZW5GaWxlTmFtZXMucHVzaChfc3R5bGVzTW9kdWxlVXJsKG5vcm1hbGl6ZWRVcmwsICFuZWVkc1NoaW0sIGZpbGVTdWZmaXgpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGdlbkZpbGVOYW1lcztcbiAgfVxuXG4gIGVtaXRCYXNpY1N0dWIoZ2VuRmlsZU5hbWU6IHN0cmluZywgb3JpZ2luYWxGaWxlTmFtZT86IHN0cmluZyk6IEdlbmVyYXRlZEZpbGUge1xuICAgIGNvbnN0IG91dHB1dEN0eCA9IHRoaXMuX2NyZWF0ZU91dHB1dENvbnRleHQoZ2VuRmlsZU5hbWUpO1xuICAgIGlmIChnZW5GaWxlTmFtZS5lbmRzV2l0aCgnLm5nZmFjdG9yeS50cycpKSB7XG4gICAgICBpZiAoIW9yaWdpbmFsRmlsZU5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYEFzc2VydGlvbiBlcnJvcjogcmVxdWlyZSB0aGUgb3JpZ2luYWwgZmlsZSBmb3IgLm5nZmFjdG9yeS50cyBzdHVicy4gRmlsZTogJHtnZW5GaWxlTmFtZX1gKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9yaWdpbmFsRmlsZSA9IHRoaXMuX2FuYWx5emVGaWxlKG9yaWdpbmFsRmlsZU5hbWUpO1xuICAgICAgdGhpcy5fY3JlYXRlTmdGYWN0b3J5U3R1YihvdXRwdXRDdHgsIG9yaWdpbmFsRmlsZSwgU3R1YkVtaXRGbGFncy5CYXNpYyk7XG4gICAgfSBlbHNlIGlmIChnZW5GaWxlTmFtZS5lbmRzV2l0aCgnLm5nc3VtbWFyeS50cycpKSB7XG4gICAgICBpZiAodGhpcy5fb3B0aW9ucy5lbmFibGVTdW1tYXJpZXNGb3JKaXQpIHtcbiAgICAgICAgaWYgKCFvcmlnaW5hbEZpbGVOYW1lKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgQXNzZXJ0aW9uIGVycm9yOiByZXF1aXJlIHRoZSBvcmlnaW5hbCBmaWxlIGZvciAubmdzdW1tYXJ5LnRzIHN0dWJzLiBGaWxlOiAke2dlbkZpbGVOYW1lfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsRmlsZSA9IHRoaXMuX2FuYWx5emVGaWxlKG9yaWdpbmFsRmlsZU5hbWUpO1xuICAgICAgICBfY3JlYXRlRW1wdHlTdHViKG91dHB1dEN0eCk7XG4gICAgICAgIG9yaWdpbmFsRmlsZS5uZ01vZHVsZXMuZm9yRWFjaChuZ01vZHVsZSA9PiB7XG4gICAgICAgICAgLy8gY3JlYXRlIGV4cG9ydHMgdGhhdCB1c2VyIGNvZGUgY2FuIHJlZmVyZW5jZVxuICAgICAgICAgIGNyZWF0ZUZvckppdFN0dWIob3V0cHV0Q3R4LCBuZ01vZHVsZS50eXBlLnJlZmVyZW5jZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZ2VuRmlsZU5hbWUuZW5kc1dpdGgoJy5uZ3N0eWxlLnRzJykpIHtcbiAgICAgIF9jcmVhdGVFbXB0eVN0dWIob3V0cHV0Q3R4KTtcbiAgICB9XG4gICAgLy8gTm90ZTogZm9yIHRoZSBzdHVicywgd2UgZG9uJ3QgbmVlZCBhIHByb3BlcnR5IHNyY0ZpbGVVcmwsXG4gICAgLy8gYXMgbGF0ZXIgb24gaW4gZW1pdEFsbEltcGxzIHdlIHdpbGwgY3JlYXRlIHRoZSBwcm9wZXIgR2VuZXJhdGVkRmlsZXMgd2l0aCB0aGVcbiAgICAvLyBjb3JyZWN0IHNyY0ZpbGVVcmwuXG4gICAgLy8gVGhpcyBpcyBnb29kIGFzIGUuZy4gZm9yIC5uZ3N0eWxlLnRzIGZpbGVzIHdlIGNhbid0IGRlcml2ZVxuICAgIC8vIHRoZSB1cmwgb2YgY29tcG9uZW50cyBiYXNlZCBvbiB0aGUgZ2VuRmlsZVVybC5cbiAgICByZXR1cm4gdGhpcy5fY29kZWdlblNvdXJjZU1vZHVsZSgndW5rbm93bicsIG91dHB1dEN0eCk7XG4gIH1cblxuICBlbWl0VHlwZUNoZWNrU3R1YihnZW5GaWxlTmFtZTogc3RyaW5nLCBvcmlnaW5hbEZpbGVOYW1lOiBzdHJpbmcpOiBHZW5lcmF0ZWRGaWxlfG51bGwge1xuICAgIGNvbnN0IG9yaWdpbmFsRmlsZSA9IHRoaXMuX2FuYWx5emVGaWxlKG9yaWdpbmFsRmlsZU5hbWUpO1xuICAgIGNvbnN0IG91dHB1dEN0eCA9IHRoaXMuX2NyZWF0ZU91dHB1dENvbnRleHQoZ2VuRmlsZU5hbWUpO1xuICAgIGlmIChnZW5GaWxlTmFtZS5lbmRzV2l0aCgnLm5nZmFjdG9yeS50cycpKSB7XG4gICAgICB0aGlzLl9jcmVhdGVOZ0ZhY3RvcnlTdHViKG91dHB1dEN0eCwgb3JpZ2luYWxGaWxlLCBTdHViRW1pdEZsYWdzLlR5cGVDaGVjayk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXRDdHguc3RhdGVtZW50cy5sZW5ndGggPiAwID9cbiAgICAgICAgdGhpcy5fY29kZWdlblNvdXJjZU1vZHVsZShvcmlnaW5hbEZpbGUuZmlsZU5hbWUsIG91dHB1dEN0eCkgOlxuICAgICAgICBudWxsO1xuICB9XG5cbiAgbG9hZEZpbGVzQXN5bmMoZmlsZU5hbWVzOiBzdHJpbmdbXSwgdHNGaWxlczogc3RyaW5nW10pOiBQcm9taXNlPFxuICAgICAge2FuYWx5emVkTW9kdWxlczogTmdBbmFseXplZE1vZHVsZXMsIGFuYWx5emVkSW5qZWN0YWJsZXM6IE5nQW5hbHl6ZWRGaWxlV2l0aEluamVjdGFibGVzW119PiB7XG4gICAgY29uc3QgZmlsZXMgPSBmaWxlTmFtZXMubWFwKGZpbGVOYW1lID0+IHRoaXMuX2FuYWx5emVGaWxlKGZpbGVOYW1lKSk7XG4gICAgY29uc3QgbG9hZGluZ1Byb21pc2VzOiBQcm9taXNlPE5nQW5hbHl6ZWRNb2R1bGVzPltdID0gW107XG4gICAgZmlsZXMuZm9yRWFjaChcbiAgICAgICAgZmlsZSA9PiBmaWxlLm5nTW9kdWxlcy5mb3JFYWNoKFxuICAgICAgICAgICAgbmdNb2R1bGUgPT5cbiAgICAgICAgICAgICAgICBsb2FkaW5nUHJvbWlzZXMucHVzaCh0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmxvYWROZ01vZHVsZURpcmVjdGl2ZUFuZFBpcGVNZXRhZGF0YShcbiAgICAgICAgICAgICAgICAgICAgbmdNb2R1bGUudHlwZS5yZWZlcmVuY2UsIGZhbHNlKSkpKTtcbiAgICBjb25zdCBhbmFseXplZEluamVjdGFibGVzID0gdHNGaWxlcy5tYXAodHNGaWxlID0+IHRoaXMuX2FuYWx5emVGaWxlRm9ySW5qZWN0YWJsZXModHNGaWxlKSk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKGxvYWRpbmdQcm9taXNlcykudGhlbihfID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuYWx5emVkTW9kdWxlczogbWVyZ2VBbmRWYWxpZGF0ZU5nRmlsZXMoZmlsZXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmFseXplZEluamVjdGFibGVzOiBhbmFseXplZEluamVjdGFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICB9XG5cbiAgbG9hZEZpbGVzU3luYyhmaWxlTmFtZXM6IHN0cmluZ1tdLCB0c0ZpbGVzOiBzdHJpbmdbXSk6XG4gICAgICB7YW5hbHl6ZWRNb2R1bGVzOiBOZ0FuYWx5emVkTW9kdWxlcywgYW5hbHl6ZWRJbmplY3RhYmxlczogTmdBbmFseXplZEZpbGVXaXRoSW5qZWN0YWJsZXNbXX0ge1xuICAgIGNvbnN0IGZpbGVzID0gZmlsZU5hbWVzLm1hcChmaWxlTmFtZSA9PiB0aGlzLl9hbmFseXplRmlsZShmaWxlTmFtZSkpO1xuICAgIGZpbGVzLmZvckVhY2goXG4gICAgICAgIGZpbGUgPT4gZmlsZS5uZ01vZHVsZXMuZm9yRWFjaChcbiAgICAgICAgICAgIG5nTW9kdWxlID0+IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIubG9hZE5nTW9kdWxlRGlyZWN0aXZlQW5kUGlwZU1ldGFkYXRhKFxuICAgICAgICAgICAgICAgIG5nTW9kdWxlLnR5cGUucmVmZXJlbmNlLCB0cnVlKSkpO1xuICAgIGNvbnN0IGFuYWx5emVkSW5qZWN0YWJsZXMgPSB0c0ZpbGVzLm1hcCh0c0ZpbGUgPT4gdGhpcy5fYW5hbHl6ZUZpbGVGb3JJbmplY3RhYmxlcyh0c0ZpbGUpKTtcbiAgICByZXR1cm4ge1xuICAgICAgYW5hbHl6ZWRNb2R1bGVzOiBtZXJnZUFuZFZhbGlkYXRlTmdGaWxlcyhmaWxlcyksXG4gICAgICBhbmFseXplZEluamVjdGFibGVzOiBhbmFseXplZEluamVjdGFibGVzLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVOZ0ZhY3RvcnlTdHViKFxuICAgICAgb3V0cHV0Q3R4OiBPdXRwdXRDb250ZXh0LCBmaWxlOiBOZ0FuYWx5emVkRmlsZSwgZW1pdEZsYWdzOiBTdHViRW1pdEZsYWdzKSB7XG4gICAgbGV0IGNvbXBvbmVudElkID0gMDtcbiAgICBmaWxlLm5nTW9kdWxlcy5mb3JFYWNoKChuZ01vZHVsZU1ldGEsIG5nTW9kdWxlSW5kZXgpID0+IHtcbiAgICAgIC8vIE5vdGU6IHRoZSBjb2RlIGJlbG93IG5lZWRzIHRvIGV4ZWN1dGVkIGZvciBTdHViRW1pdEZsYWdzLkJhc2ljIGFuZCBTdHViRW1pdEZsYWdzLlR5cGVDaGVjayxcbiAgICAgIC8vIHNvIHdlIGRvbid0IGNoYW5nZSB0aGUgLm5nZmFjdG9yeSBmaWxlIHRvbyBtdWNoIHdoZW4gYWRkaW5nIHRoZSB0eXBlLWNoZWNrIGJsb2NrLlxuXG4gICAgICAvLyBjcmVhdGUgZXhwb3J0cyB0aGF0IHVzZXIgY29kZSBjYW4gcmVmZXJlbmNlXG4gICAgICB0aGlzLl9uZ01vZHVsZUNvbXBpbGVyLmNyZWF0ZVN0dWIob3V0cHV0Q3R4LCBuZ01vZHVsZU1ldGEudHlwZS5yZWZlcmVuY2UpO1xuXG4gICAgICAvLyBhZGQgcmVmZXJlbmNlcyB0byB0aGUgc3ltYm9scyBmcm9tIHRoZSBtZXRhZGF0YS5cbiAgICAgIC8vIFRoZXNlIGNhbiBiZSB1c2VkIGJ5IHRoZSB0eXBlIGNoZWNrIGJsb2NrIGZvciBjb21wb25lbnRzLFxuICAgICAgLy8gYW5kIHRoZXkgYWxzbyBjYXVzZSBUeXBlU2NyaXB0IHRvIGluY2x1ZGUgdGhlc2UgZmlsZXMgaW50byB0aGUgcHJvZ3JhbSB0b28sXG4gICAgICAvLyB3aGljaCB3aWxsIG1ha2UgdGhlbSBwYXJ0IG9mIHRoZSBhbmFseXplZEZpbGVzLlxuICAgICAgY29uc3QgZXh0ZXJuYWxSZWZlcmVuY2VzOiBTdGF0aWNTeW1ib2xbXSA9IFtcbiAgICAgICAgLy8gQWRkIHJlZmVyZW5jZXMgdGhhdCBhcmUgYXZhaWxhYmxlIGZyb20gYWxsIHRoZSBtb2R1bGVzIGFuZCBpbXBvcnRzLlxuICAgICAgICAuLi5uZ01vZHVsZU1ldGEudHJhbnNpdGl2ZU1vZHVsZS5kaXJlY3RpdmVzLm1hcChkID0+IGQucmVmZXJlbmNlKSxcbiAgICAgICAgLi4ubmdNb2R1bGVNZXRhLnRyYW5zaXRpdmVNb2R1bGUucGlwZXMubWFwKGQgPT4gZC5yZWZlcmVuY2UpLFxuICAgICAgICAuLi5uZ01vZHVsZU1ldGEuaW1wb3J0ZWRNb2R1bGVzLm1hcChtID0+IG0udHlwZS5yZWZlcmVuY2UpLFxuICAgICAgICAuLi5uZ01vZHVsZU1ldGEuZXhwb3J0ZWRNb2R1bGVzLm1hcChtID0+IG0udHlwZS5yZWZlcmVuY2UpLFxuXG4gICAgICAgIC8vIEFkZCByZWZlcmVuY2VzIHRoYXQgbWlnaHQgYmUgaW5zZXJ0ZWQgYnkgdGhlIHRlbXBsYXRlIGNvbXBpbGVyLlxuICAgICAgICAuLi50aGlzLl9leHRlcm5hbElkZW50aWZpZXJSZWZlcmVuY2VzKFtJZGVudGlmaWVycy5UZW1wbGF0ZVJlZiwgSWRlbnRpZmllcnMuRWxlbWVudFJlZl0pLFxuICAgICAgXTtcblxuICAgICAgY29uc3QgZXh0ZXJuYWxSZWZlcmVuY2VWYXJzID0gbmV3IE1hcDxhbnksIHN0cmluZz4oKTtcbiAgICAgIGV4dGVybmFsUmVmZXJlbmNlcy5mb3JFYWNoKChyZWYsIHR5cGVJbmRleCkgPT4ge1xuICAgICAgICBleHRlcm5hbFJlZmVyZW5jZVZhcnMuc2V0KHJlZiwgYF9kZWNsJHtuZ01vZHVsZUluZGV4fV8ke3R5cGVJbmRleH1gKTtcbiAgICAgIH0pO1xuICAgICAgZXh0ZXJuYWxSZWZlcmVuY2VWYXJzLmZvckVhY2goKHZhck5hbWUsIHJlZmVyZW5jZSkgPT4ge1xuICAgICAgICBvdXRwdXRDdHguc3RhdGVtZW50cy5wdXNoKFxuICAgICAgICAgICAgby52YXJpYWJsZSh2YXJOYW1lKVxuICAgICAgICAgICAgICAgIC5zZXQoby5OVUxMX0VYUFIuY2FzdChvLkRZTkFNSUNfVFlQRSkpXG4gICAgICAgICAgICAgICAgLnRvRGVjbFN0bXQoby5leHByZXNzaW9uVHlwZShvdXRwdXRDdHguaW1wb3J0RXhwcihcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJlbmNlLCAvKiB0eXBlUGFyYW1zICovIG51bGwsIC8qIHVzZVN1bW1hcmllcyAqLyBmYWxzZSkpKSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGVtaXRGbGFncyAmIFN0dWJFbWl0RmxhZ3MuVHlwZUNoZWNrKSB7XG4gICAgICAgIC8vIGFkZCB0aGUgdHlwZS1jaGVjayBibG9jayBmb3IgYWxsIGNvbXBvbmVudHMgb2YgdGhlIE5nTW9kdWxlXG4gICAgICAgIG5nTW9kdWxlTWV0YS5kZWNsYXJlZERpcmVjdGl2ZXMuZm9yRWFjaCgoZGlySWQpID0+IHtcbiAgICAgICAgICBjb25zdCBjb21wTWV0YSA9IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0RGlyZWN0aXZlTWV0YWRhdGEoZGlySWQucmVmZXJlbmNlKTtcbiAgICAgICAgICBpZiAoIWNvbXBNZXRhLmlzQ29tcG9uZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbXBvbmVudElkKys7XG4gICAgICAgICAgdGhpcy5fY3JlYXRlVHlwZUNoZWNrQmxvY2soXG4gICAgICAgICAgICAgIG91dHB1dEN0eCwgYCR7Y29tcE1ldGEudHlwZS5yZWZlcmVuY2UubmFtZX1fSG9zdF8ke2NvbXBvbmVudElkfWAsIG5nTW9kdWxlTWV0YSxcbiAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXRIb3N0Q29tcG9uZW50TWV0YWRhdGEoY29tcE1ldGEpLCBbY29tcE1ldGEudHlwZV0sXG4gICAgICAgICAgICAgIGV4dGVybmFsUmVmZXJlbmNlVmFycyk7XG4gICAgICAgICAgdGhpcy5fY3JlYXRlVHlwZUNoZWNrQmxvY2soXG4gICAgICAgICAgICAgIG91dHB1dEN0eCwgYCR7Y29tcE1ldGEudHlwZS5yZWZlcmVuY2UubmFtZX1fJHtjb21wb25lbnRJZH1gLCBuZ01vZHVsZU1ldGEsIGNvbXBNZXRhLFxuICAgICAgICAgICAgICBuZ01vZHVsZU1ldGEudHJhbnNpdGl2ZU1vZHVsZS5kaXJlY3RpdmVzLCBleHRlcm5hbFJlZmVyZW5jZVZhcnMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChvdXRwdXRDdHguc3RhdGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIF9jcmVhdGVFbXB0eVN0dWIob3V0cHV0Q3R4KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9leHRlcm5hbElkZW50aWZpZXJSZWZlcmVuY2VzKHJlZmVyZW5jZXM6IG8uRXh0ZXJuYWxSZWZlcmVuY2VbXSk6IFN0YXRpY1N5bWJvbFtdIHtcbiAgICBjb25zdCByZXN1bHQ6IFN0YXRpY1N5bWJvbFtdID0gW107XG4gICAgZm9yIChsZXQgcmVmZXJlbmNlIG9mIHJlZmVyZW5jZXMpIHtcbiAgICAgIGNvbnN0IHRva2VuID0gY3JlYXRlVG9rZW5Gb3JFeHRlcm5hbFJlZmVyZW5jZSh0aGlzLnJlZmxlY3RvciwgcmVmZXJlbmNlKTtcbiAgICAgIGlmICh0b2tlbi5pZGVudGlmaWVyKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRva2VuLmlkZW50aWZpZXIucmVmZXJlbmNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZVR5cGVDaGVja0Jsb2NrKFxuICAgICAgY3R4OiBPdXRwdXRDb250ZXh0LCBjb21wb25lbnRJZDogc3RyaW5nLCBtb2R1bGVNZXRhOiBDb21waWxlTmdNb2R1bGVNZXRhZGF0YSxcbiAgICAgIGNvbXBNZXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIGRpcmVjdGl2ZXM6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGFbXSxcbiAgICAgIGV4dGVybmFsUmVmZXJlbmNlVmFyczogTWFwPGFueSwgc3RyaW5nPikge1xuICAgIGNvbnN0IHt0ZW1wbGF0ZTogcGFyc2VkVGVtcGxhdGUsIHBpcGVzOiB1c2VkUGlwZXN9ID1cbiAgICAgICAgdGhpcy5fcGFyc2VUZW1wbGF0ZShjb21wTWV0YSwgbW9kdWxlTWV0YSwgZGlyZWN0aXZlcyk7XG4gICAgY3R4LnN0YXRlbWVudHMucHVzaCguLi50aGlzLl90eXBlQ2hlY2tDb21waWxlci5jb21waWxlQ29tcG9uZW50KFxuICAgICAgICBjb21wb25lbnRJZCwgY29tcE1ldGEsIHBhcnNlZFRlbXBsYXRlLCB1c2VkUGlwZXMsIGV4dGVybmFsUmVmZXJlbmNlVmFycywgY3R4KSk7XG4gIH1cblxuICBlbWl0TWVzc2FnZUJ1bmRsZShhbmFseXplUmVzdWx0OiBOZ0FuYWx5emVkTW9kdWxlcywgbG9jYWxlOiBzdHJpbmd8bnVsbCk6IE1lc3NhZ2VCdW5kbGUge1xuICAgIGNvbnN0IGVycm9yczogUGFyc2VFcnJvcltdID0gW107XG4gICAgY29uc3QgaHRtbFBhcnNlciA9IG5ldyBIdG1sUGFyc2VyKCk7XG5cbiAgICAvLyBUT0RPKHZpY2IpOiBpbXBsaWNpdCB0YWdzICYgYXR0cmlidXRlc1xuICAgIGNvbnN0IG1lc3NhZ2VCdW5kbGUgPSBuZXcgTWVzc2FnZUJ1bmRsZShodG1sUGFyc2VyLCBbXSwge30sIGxvY2FsZSk7XG5cbiAgICBhbmFseXplUmVzdWx0LmZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBjb25zdCBjb21wTWV0YXM6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YVtdID0gW107XG4gICAgICBmaWxlLmRpcmVjdGl2ZXMuZm9yRWFjaChkaXJlY3RpdmVUeXBlID0+IHtcbiAgICAgICAgY29uc3QgZGlyTWV0YSA9IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0RGlyZWN0aXZlTWV0YWRhdGEoZGlyZWN0aXZlVHlwZSk7XG4gICAgICAgIGlmIChkaXJNZXRhICYmIGRpck1ldGEuaXNDb21wb25lbnQpIHtcbiAgICAgICAgICBjb21wTWV0YXMucHVzaChkaXJNZXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjb21wTWV0YXMuZm9yRWFjaChjb21wTWV0YSA9PiB7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBjb21wTWV0YS50ZW1wbGF0ZSAhLnRlbXBsYXRlICE7XG4gICAgICAgIC8vIFRlbXBsYXRlIFVSTCBwb2ludHMgdG8gZWl0aGVyIGFuIEhUTUwgb3IgVFMgZmlsZSBkZXBlbmRpbmcgb24gd2hldGhlclxuICAgICAgICAvLyB0aGUgZmlsZSBpcyB1c2VkIHdpdGggYHRlbXBsYXRlVXJsOmAgb3IgYHRlbXBsYXRlOmAsIHJlc3BlY3RpdmVseS5cbiAgICAgICAgY29uc3QgdGVtcGxhdGVVcmwgPSBjb21wTWV0YS50ZW1wbGF0ZSAhLnRlbXBsYXRlVXJsICE7XG4gICAgICAgIGNvbnN0IGludGVycG9sYXRpb25Db25maWcgPVxuICAgICAgICAgICAgSW50ZXJwb2xhdGlvbkNvbmZpZy5mcm9tQXJyYXkoY29tcE1ldGEudGVtcGxhdGUgIS5pbnRlcnBvbGF0aW9uKTtcbiAgICAgICAgZXJyb3JzLnB1c2goLi4ubWVzc2FnZUJ1bmRsZS51cGRhdGVGcm9tVGVtcGxhdGUoaHRtbCwgdGVtcGxhdGVVcmwsIGludGVycG9sYXRpb25Db25maWcpICEpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5tYXAoZSA9PiBlLnRvU3RyaW5nKCkpLmpvaW4oJ1xcbicpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVzc2FnZUJ1bmRsZTtcbiAgfVxuXG4gIGVtaXRBbGxQYXJ0aWFsTW9kdWxlcyhcbiAgICAgIHtuZ01vZHVsZUJ5UGlwZU9yRGlyZWN0aXZlLCBmaWxlc306IE5nQW5hbHl6ZWRNb2R1bGVzLFxuICAgICAgcjNGaWxlczogTmdBbmFseXplZEZpbGVXaXRoSW5qZWN0YWJsZXNbXSk6IFBhcnRpYWxNb2R1bGVbXSB7XG4gICAgY29uc3QgY29udGV4dE1hcCA9IG5ldyBNYXA8c3RyaW5nLCBPdXRwdXRDb250ZXh0PigpO1xuXG4gICAgY29uc3QgZ2V0Q29udGV4dCA9IChmaWxlTmFtZTogc3RyaW5nKTogT3V0cHV0Q29udGV4dCA9PiB7XG4gICAgICBpZiAoIWNvbnRleHRNYXAuaGFzKGZpbGVOYW1lKSkge1xuICAgICAgICBjb250ZXh0TWFwLnNldChmaWxlTmFtZSwgdGhpcy5fY3JlYXRlT3V0cHV0Q29udGV4dChmaWxlTmFtZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRleHRNYXAuZ2V0KGZpbGVOYW1lKSAhO1xuICAgIH07XG5cbiAgICBmaWxlcy5mb3JFYWNoKFxuICAgICAgICBmaWxlID0+IHRoaXMuX2NvbXBpbGVQYXJ0aWFsTW9kdWxlKFxuICAgICAgICAgICAgZmlsZS5maWxlTmFtZSwgbmdNb2R1bGVCeVBpcGVPckRpcmVjdGl2ZSwgZmlsZS5kaXJlY3RpdmVzLCBmaWxlLnBpcGVzLCBmaWxlLm5nTW9kdWxlcyxcbiAgICAgICAgICAgIGZpbGUuaW5qZWN0YWJsZXMsIGdldENvbnRleHQoZmlsZS5maWxlTmFtZSkpKTtcbiAgICByM0ZpbGVzLmZvckVhY2goXG4gICAgICAgIGZpbGUgPT4gdGhpcy5fY29tcGlsZVNoYWxsb3dNb2R1bGVzKFxuICAgICAgICAgICAgZmlsZS5maWxlTmFtZSwgZmlsZS5zaGFsbG93TW9kdWxlcywgZ2V0Q29udGV4dChmaWxlLmZpbGVOYW1lKSkpO1xuXG4gICAgcmV0dXJuIEFycmF5LmZyb20oY29udGV4dE1hcC52YWx1ZXMoKSlcbiAgICAgICAgLm1hcChjb250ZXh0ID0+ICh7XG4gICAgICAgICAgICAgICBmaWxlTmFtZTogY29udGV4dC5nZW5GaWxlUGF0aCxcbiAgICAgICAgICAgICAgIHN0YXRlbWVudHM6IFsuLi5jb250ZXh0LmNvbnN0YW50UG9vbC5zdGF0ZW1lbnRzLCAuLi5jb250ZXh0LnN0YXRlbWVudHNdLFxuICAgICAgICAgICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBpbGVTaGFsbG93TW9kdWxlcyhcbiAgICAgIGZpbGVOYW1lOiBzdHJpbmcsIHNoYWxsb3dNb2R1bGVzOiBDb21waWxlU2hhbGxvd01vZHVsZU1ldGFkYXRhW10sXG4gICAgICBjb250ZXh0OiBPdXRwdXRDb250ZXh0KTogdm9pZCB7XG4gICAgc2hhbGxvd01vZHVsZXMuZm9yRWFjaChtb2R1bGUgPT4gY29tcGlsZVIzTW9kdWxlKGNvbnRleHQsIG1vZHVsZSwgdGhpcy5faW5qZWN0YWJsZUNvbXBpbGVyKSk7XG4gIH1cblxuICBwcml2YXRlIF9jb21waWxlUGFydGlhbE1vZHVsZShcbiAgICAgIGZpbGVOYW1lOiBzdHJpbmcsIG5nTW9kdWxlQnlQaXBlT3JEaXJlY3RpdmU6IE1hcDxTdGF0aWNTeW1ib2wsIENvbXBpbGVOZ01vZHVsZU1ldGFkYXRhPixcbiAgICAgIGRpcmVjdGl2ZXM6IFN0YXRpY1N5bWJvbFtdLCBwaXBlczogU3RhdGljU3ltYm9sW10sIG5nTW9kdWxlczogQ29tcGlsZU5nTW9kdWxlTWV0YWRhdGFbXSxcbiAgICAgIGluamVjdGFibGVzOiBDb21waWxlSW5qZWN0YWJsZU1ldGFkYXRhW10sIGNvbnRleHQ6IE91dHB1dENvbnRleHQpOiB2b2lkIHtcbiAgICBjb25zdCBlcnJvcnM6IFBhcnNlRXJyb3JbXSA9IFtdO1xuXG4gICAgY29uc3Qgc2NoZW1hUmVnaXN0cnkgPSBuZXcgRG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5KCk7XG4gICAgY29uc3QgaG9zdEJpbmRpbmdQYXJzZXIgPSBuZXcgQmluZGluZ1BhcnNlcihcbiAgICAgICAgdGhpcy5fdGVtcGxhdGVQYXJzZXIuZXhwcmVzc2lvblBhcnNlciwgREVGQVVMVF9JTlRFUlBPTEFUSU9OX0NPTkZJRywgc2NoZW1hUmVnaXN0cnksIFtdLFxuICAgICAgICBlcnJvcnMpO1xuXG4gICAgLy8gUHJvY2VzcyBhbGwgY29tcG9uZW50cyBhbmQgZGlyZWN0aXZlc1xuICAgIGRpcmVjdGl2ZXMuZm9yRWFjaChkaXJlY3RpdmVUeXBlID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdGl2ZU1ldGFkYXRhID0gdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXREaXJlY3RpdmVNZXRhZGF0YShkaXJlY3RpdmVUeXBlKTtcbiAgICAgIGlmIChkaXJlY3RpdmVNZXRhZGF0YS5pc0NvbXBvbmVudCkge1xuICAgICAgICBjb25zdCBtb2R1bGUgPSBuZ01vZHVsZUJ5UGlwZU9yRGlyZWN0aXZlLmdldChkaXJlY3RpdmVUeXBlKSAhO1xuICAgICAgICBtb2R1bGUgfHxcbiAgICAgICAgICAgIGVycm9yKFxuICAgICAgICAgICAgICAgIGBDYW5ub3QgZGV0ZXJtaW5lIHRoZSBtb2R1bGUgZm9yIGNvbXBvbmVudCAnJHtpZGVudGlmaWVyTmFtZShkaXJlY3RpdmVNZXRhZGF0YS50eXBlKX0nYCk7XG5cbiAgICAgICAgbGV0IGh0bWxBc3QgPSBkaXJlY3RpdmVNZXRhZGF0YS50ZW1wbGF0ZSAhLmh0bWxBc3QgITtcbiAgICAgICAgY29uc3QgcHJlc2VydmVXaGl0ZXNwYWNlcyA9IGRpcmVjdGl2ZU1ldGFkYXRhICEudGVtcGxhdGUgIS5wcmVzZXJ2ZVdoaXRlc3BhY2VzO1xuXG4gICAgICAgIGlmICghcHJlc2VydmVXaGl0ZXNwYWNlcykge1xuICAgICAgICAgIGh0bWxBc3QgPSByZW1vdmVXaGl0ZXNwYWNlcyhodG1sQXN0KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZW5kZXIzQXN0ID0gaHRtbEFzdFRvUmVuZGVyM0FzdChodG1sQXN0LnJvb3ROb2RlcywgaG9zdEJpbmRpbmdQYXJzZXIpO1xuXG4gICAgICAgIC8vIE1hcCBvZiBTdGF0aWNUeXBlIGJ5IGRpcmVjdGl2ZSBzZWxlY3RvcnNcbiAgICAgICAgY29uc3QgZGlyZWN0aXZlVHlwZUJ5U2VsID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuICAgICAgICBjb25zdCBkaXJlY3RpdmVzID0gbW9kdWxlLnRyYW5zaXRpdmVNb2R1bGUuZGlyZWN0aXZlcy5tYXAoXG4gICAgICAgICAgICBkaXIgPT4gdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXREaXJlY3RpdmVTdW1tYXJ5KGRpci5yZWZlcmVuY2UpKTtcblxuICAgICAgICBkaXJlY3RpdmVzLmZvckVhY2goZGlyZWN0aXZlID0+IHtcbiAgICAgICAgICBpZiAoZGlyZWN0aXZlLnNlbGVjdG9yKSB7XG4gICAgICAgICAgICBkaXJlY3RpdmVUeXBlQnlTZWwuc2V0KGRpcmVjdGl2ZS5zZWxlY3RvciwgZGlyZWN0aXZlLnR5cGUucmVmZXJlbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE1hcCBvZiBTdGF0aWNUeXBlIGJ5IHBpcGUgbmFtZXNcbiAgICAgICAgY29uc3QgcGlwZVR5cGVCeU5hbWUgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgICAgIGNvbnN0IHBpcGVzID0gbW9kdWxlLnRyYW5zaXRpdmVNb2R1bGUucGlwZXMubWFwKFxuICAgICAgICAgICAgcGlwZSA9PiB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmdldFBpcGVTdW1tYXJ5KHBpcGUucmVmZXJlbmNlKSk7XG5cbiAgICAgICAgcGlwZXMuZm9yRWFjaChwaXBlID0+IHsgcGlwZVR5cGVCeU5hbWUuc2V0KHBpcGUubmFtZSwgcGlwZS50eXBlLnJlZmVyZW5jZSk7IH0pO1xuXG4gICAgICAgIGNvbXBpbGVSM0NvbXBvbmVudChcbiAgICAgICAgICAgIGNvbnRleHQsIGRpcmVjdGl2ZU1ldGFkYXRhLCByZW5kZXIzQXN0LCB0aGlzLnJlZmxlY3RvciwgaG9zdEJpbmRpbmdQYXJzZXIsXG4gICAgICAgICAgICBkaXJlY3RpdmVUeXBlQnlTZWwsIHBpcGVUeXBlQnlOYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBpbGVSM0RpcmVjdGl2ZShjb250ZXh0LCBkaXJlY3RpdmVNZXRhZGF0YSwgdGhpcy5yZWZsZWN0b3IsIGhvc3RCaW5kaW5nUGFyc2VyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHBpcGVzLmZvckVhY2gocGlwZVR5cGUgPT4ge1xuICAgICAgY29uc3QgcGlwZU1ldGFkYXRhID0gdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXRQaXBlTWV0YWRhdGEocGlwZVR5cGUpO1xuICAgICAgaWYgKHBpcGVNZXRhZGF0YSkge1xuICAgICAgICBjb21waWxlUjNQaXBlKGNvbnRleHQsIHBpcGVNZXRhZGF0YSwgdGhpcy5yZWZsZWN0b3IpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaW5qZWN0YWJsZXMuZm9yRWFjaChpbmplY3RhYmxlID0+IHRoaXMuX2luamVjdGFibGVDb21waWxlci5jb21waWxlKGluamVjdGFibGUsIGNvbnRleHQpKTtcbiAgfVxuXG4gIGVtaXRBbGxQYXJ0aWFsTW9kdWxlczIoZmlsZXM6IE5nQW5hbHl6ZWRGaWxlV2l0aEluamVjdGFibGVzW10pOiBQYXJ0aWFsTW9kdWxlW10ge1xuICAgIC8vIFVzaW5nIHJlZHVjZSBsaWtlIHRoaXMgaXMgYSBzZWxlY3QgbWFueSBwYXR0ZXJuICh3aGVyZSBtYXAgaXMgYSBzZWxlY3QgcGF0dGVybilcbiAgICByZXR1cm4gZmlsZXMucmVkdWNlPFBhcnRpYWxNb2R1bGVbXT4oKHIsIGZpbGUpID0+IHtcbiAgICAgIHIucHVzaCguLi50aGlzLl9lbWl0UGFydGlhbE1vZHVsZTIoZmlsZS5maWxlTmFtZSwgZmlsZS5pbmplY3RhYmxlcykpO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZW1pdFBhcnRpYWxNb2R1bGUyKGZpbGVOYW1lOiBzdHJpbmcsIGluamVjdGFibGVzOiBDb21waWxlSW5qZWN0YWJsZU1ldGFkYXRhW10pOlxuICAgICAgUGFydGlhbE1vZHVsZVtdIHtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5fY3JlYXRlT3V0cHV0Q29udGV4dChmaWxlTmFtZSk7XG5cbiAgICBpbmplY3RhYmxlcy5mb3JFYWNoKGluamVjdGFibGUgPT4gdGhpcy5faW5qZWN0YWJsZUNvbXBpbGVyLmNvbXBpbGUoaW5qZWN0YWJsZSwgY29udGV4dCkpO1xuXG4gICAgaWYgKGNvbnRleHQuc3RhdGVtZW50cyAmJiBjb250ZXh0LnN0YXRlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIFt7ZmlsZU5hbWUsIHN0YXRlbWVudHM6IFsuLi5jb250ZXh0LmNvbnN0YW50UG9vbC5zdGF0ZW1lbnRzLCAuLi5jb250ZXh0LnN0YXRlbWVudHNdfV07XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGVtaXRBbGxJbXBscyhhbmFseXplUmVzdWx0OiBOZ0FuYWx5emVkTW9kdWxlcyk6IEdlbmVyYXRlZEZpbGVbXSB7XG4gICAgY29uc3Qge25nTW9kdWxlQnlQaXBlT3JEaXJlY3RpdmUsIGZpbGVzfSA9IGFuYWx5emVSZXN1bHQ7XG4gICAgY29uc3Qgc291cmNlTW9kdWxlcyA9IGZpbGVzLm1hcChcbiAgICAgICAgZmlsZSA9PiB0aGlzLl9jb21waWxlSW1wbEZpbGUoXG4gICAgICAgICAgICBmaWxlLmZpbGVOYW1lLCBuZ01vZHVsZUJ5UGlwZU9yRGlyZWN0aXZlLCBmaWxlLmRpcmVjdGl2ZXMsIGZpbGUucGlwZXMsIGZpbGUubmdNb2R1bGVzLFxuICAgICAgICAgICAgZmlsZS5pbmplY3RhYmxlcykpO1xuICAgIHJldHVybiBmbGF0dGVuKHNvdXJjZU1vZHVsZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tcGlsZUltcGxGaWxlKFxuICAgICAgc3JjRmlsZVVybDogc3RyaW5nLCBuZ01vZHVsZUJ5UGlwZU9yRGlyZWN0aXZlOiBNYXA8U3RhdGljU3ltYm9sLCBDb21waWxlTmdNb2R1bGVNZXRhZGF0YT4sXG4gICAgICBkaXJlY3RpdmVzOiBTdGF0aWNTeW1ib2xbXSwgcGlwZXM6IFN0YXRpY1N5bWJvbFtdLCBuZ01vZHVsZXM6IENvbXBpbGVOZ01vZHVsZU1ldGFkYXRhW10sXG4gICAgICBpbmplY3RhYmxlczogQ29tcGlsZUluamVjdGFibGVNZXRhZGF0YVtdKTogR2VuZXJhdGVkRmlsZVtdIHtcbiAgICBjb25zdCBmaWxlU3VmZml4ID0gbm9ybWFsaXplR2VuRmlsZVN1ZmZpeChzcGxpdFR5cGVzY3JpcHRTdWZmaXgoc3JjRmlsZVVybCwgdHJ1ZSlbMV0pO1xuICAgIGNvbnN0IGdlbmVyYXRlZEZpbGVzOiBHZW5lcmF0ZWRGaWxlW10gPSBbXTtcblxuICAgIGNvbnN0IG91dHB1dEN0eCA9IHRoaXMuX2NyZWF0ZU91dHB1dENvbnRleHQobmdmYWN0b3J5RmlsZVBhdGgoc3JjRmlsZVVybCwgdHJ1ZSkpO1xuXG4gICAgZ2VuZXJhdGVkRmlsZXMucHVzaChcbiAgICAgICAgLi4udGhpcy5fY3JlYXRlU3VtbWFyeShzcmNGaWxlVXJsLCBkaXJlY3RpdmVzLCBwaXBlcywgbmdNb2R1bGVzLCBpbmplY3RhYmxlcywgb3V0cHV0Q3R4KSk7XG5cbiAgICAvLyBjb21waWxlIGFsbCBuZyBtb2R1bGVzXG4gICAgbmdNb2R1bGVzLmZvckVhY2goKG5nTW9kdWxlTWV0YSkgPT4gdGhpcy5fY29tcGlsZU1vZHVsZShvdXRwdXRDdHgsIG5nTW9kdWxlTWV0YSkpO1xuXG4gICAgLy8gY29tcGlsZSBjb21wb25lbnRzXG4gICAgZGlyZWN0aXZlcy5mb3JFYWNoKChkaXJUeXBlKSA9PiB7XG4gICAgICBjb25zdCBjb21wTWV0YSA9IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0RGlyZWN0aXZlTWV0YWRhdGEoPGFueT5kaXJUeXBlKTtcbiAgICAgIGlmICghY29tcE1ldGEuaXNDb21wb25lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbmdNb2R1bGUgPSBuZ01vZHVsZUJ5UGlwZU9yRGlyZWN0aXZlLmdldChkaXJUeXBlKTtcbiAgICAgIGlmICghbmdNb2R1bGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYEludGVybmFsIEVycm9yOiBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBtb2R1bGUgZm9yIGNvbXBvbmVudCAke2lkZW50aWZpZXJOYW1lKGNvbXBNZXRhLnR5cGUpfSFgKTtcbiAgICAgIH1cblxuICAgICAgLy8gY29tcGlsZSBzdHlsZXNcbiAgICAgIGNvbnN0IGNvbXBvbmVudFN0eWxlc2hlZXQgPSB0aGlzLl9zdHlsZUNvbXBpbGVyLmNvbXBpbGVDb21wb25lbnQob3V0cHV0Q3R4LCBjb21wTWV0YSk7XG4gICAgICAvLyBOb3RlOiBjb21wTWV0YSBpcyBhIGNvbXBvbmVudCBhbmQgdGhlcmVmb3JlIHRlbXBsYXRlIGlzIG5vbiBudWxsLlxuICAgICAgY29tcE1ldGEudGVtcGxhdGUgIS5leHRlcm5hbFN0eWxlc2hlZXRzLmZvckVhY2goKHN0eWxlc2hlZXRNZXRhKSA9PiB7XG4gICAgICAgIC8vIE5vdGU6IGZpbGwgbm9uIHNoaW0gYW5kIHNoaW0gc3R5bGUgZmlsZXMgYXMgdGhleSBtaWdodFxuICAgICAgICAvLyBiZSBzaGFyZWQgYnkgY29tcG9uZW50IHdpdGggYW5kIHdpdGhvdXQgVmlld0VuY2Fwc3VsYXRpb24uXG4gICAgICAgIGNvbnN0IHNoaW0gPSB0aGlzLl9zdHlsZUNvbXBpbGVyLm5lZWRzU3R5bGVTaGltKGNvbXBNZXRhKTtcbiAgICAgICAgZ2VuZXJhdGVkRmlsZXMucHVzaChcbiAgICAgICAgICAgIHRoaXMuX2NvZGVnZW5TdHlsZXMoc3JjRmlsZVVybCwgY29tcE1ldGEsIHN0eWxlc2hlZXRNZXRhLCBzaGltLCBmaWxlU3VmZml4KSk7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmFsbG93RW1wdHlDb2RlZ2VuRmlsZXMpIHtcbiAgICAgICAgICBnZW5lcmF0ZWRGaWxlcy5wdXNoKFxuICAgICAgICAgICAgICB0aGlzLl9jb2RlZ2VuU3R5bGVzKHNyY0ZpbGVVcmwsIGNvbXBNZXRhLCBzdHlsZXNoZWV0TWV0YSwgIXNoaW0sIGZpbGVTdWZmaXgpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIGNvbXBpbGUgY29tcG9uZW50c1xuICAgICAgY29uc3QgY29tcFZpZXdWYXJzID0gdGhpcy5fY29tcGlsZUNvbXBvbmVudChcbiAgICAgICAgICBvdXRwdXRDdHgsIGNvbXBNZXRhLCBuZ01vZHVsZSwgbmdNb2R1bGUudHJhbnNpdGl2ZU1vZHVsZS5kaXJlY3RpdmVzLCBjb21wb25lbnRTdHlsZXNoZWV0LFxuICAgICAgICAgIGZpbGVTdWZmaXgpO1xuICAgICAgdGhpcy5fY29tcGlsZUNvbXBvbmVudEZhY3Rvcnkob3V0cHV0Q3R4LCBjb21wTWV0YSwgbmdNb2R1bGUsIGZpbGVTdWZmaXgpO1xuICAgIH0pO1xuICAgIGlmIChvdXRwdXRDdHguc3RhdGVtZW50cy5sZW5ndGggPiAwIHx8IHRoaXMuX29wdGlvbnMuYWxsb3dFbXB0eUNvZGVnZW5GaWxlcykge1xuICAgICAgY29uc3Qgc3JjTW9kdWxlID0gdGhpcy5fY29kZWdlblNvdXJjZU1vZHVsZShzcmNGaWxlVXJsLCBvdXRwdXRDdHgpO1xuICAgICAgZ2VuZXJhdGVkRmlsZXMudW5zaGlmdChzcmNNb2R1bGUpO1xuICAgIH1cbiAgICByZXR1cm4gZ2VuZXJhdGVkRmlsZXM7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVTdW1tYXJ5KFxuICAgICAgc3JjRmlsZU5hbWU6IHN0cmluZywgZGlyZWN0aXZlczogU3RhdGljU3ltYm9sW10sIHBpcGVzOiBTdGF0aWNTeW1ib2xbXSxcbiAgICAgIG5nTW9kdWxlczogQ29tcGlsZU5nTW9kdWxlTWV0YWRhdGFbXSwgaW5qZWN0YWJsZXM6IENvbXBpbGVJbmplY3RhYmxlTWV0YWRhdGFbXSxcbiAgICAgIG5nRmFjdG9yeUN0eDogT3V0cHV0Q29udGV4dCk6IEdlbmVyYXRlZEZpbGVbXSB7XG4gICAgY29uc3Qgc3ltYm9sU3VtbWFyaWVzID0gdGhpcy5fc3ltYm9sUmVzb2x2ZXIuZ2V0U3ltYm9sc09mKHNyY0ZpbGVOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKHN5bWJvbCA9PiB0aGlzLl9zeW1ib2xSZXNvbHZlci5yZXNvbHZlU3ltYm9sKHN5bWJvbCkpO1xuICAgIGNvbnN0IHR5cGVEYXRhOiB7XG4gICAgICBzdW1tYXJ5OiBDb21waWxlVHlwZVN1bW1hcnksXG4gICAgICBtZXRhZGF0YTogQ29tcGlsZU5nTW9kdWxlTWV0YWRhdGEgfCBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEgfCBDb21waWxlUGlwZU1ldGFkYXRhIHxcbiAgICAgICAgICBDb21waWxlVHlwZU1ldGFkYXRhXG4gICAgfVtdID1cbiAgICAgICAgW1xuICAgICAgICAgIC4uLm5nTW9kdWxlcy5tYXAoXG4gICAgICAgICAgICAgIG1ldGEgPT4gKHtcbiAgICAgICAgICAgICAgICBzdW1tYXJ5OiB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmdldE5nTW9kdWxlU3VtbWFyeShtZXRhLnR5cGUucmVmZXJlbmNlKSAhLFxuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmdldE5nTW9kdWxlTWV0YWRhdGEobWV0YS50eXBlLnJlZmVyZW5jZSkgIVxuICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgLi4uZGlyZWN0aXZlcy5tYXAocmVmID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5OiB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmdldERpcmVjdGl2ZVN1bW1hcnkocmVmKSAhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGE6IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0RGlyZWN0aXZlTWV0YWRhdGEocmVmKSAhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgIC4uLnBpcGVzLm1hcChyZWYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5OiB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmdldFBpcGVTdW1tYXJ5KHJlZikgISxcbiAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YTogdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXRQaXBlTWV0YWRhdGEocmVmKSAhXG4gICAgICAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAuLi5pbmplY3RhYmxlcy5tYXAoXG4gICAgICAgICAgICAgIHJlZiA9PiAoe1xuICAgICAgICAgICAgICAgIHN1bW1hcnk6IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0SW5qZWN0YWJsZVN1bW1hcnkocmVmLnN5bWJvbCkgISxcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXRJbmplY3RhYmxlU3VtbWFyeShyZWYuc3ltYm9sKSAhLnR5cGVcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgIF07XG4gICAgY29uc3QgZm9ySml0T3V0cHV0Q3R4ID0gdGhpcy5fb3B0aW9ucy5lbmFibGVTdW1tYXJpZXNGb3JKaXQgP1xuICAgICAgICB0aGlzLl9jcmVhdGVPdXRwdXRDb250ZXh0KHN1bW1hcnlGb3JKaXRGaWxlTmFtZShzcmNGaWxlTmFtZSwgdHJ1ZSkpIDpcbiAgICAgICAgbnVsbDtcbiAgICBjb25zdCB7anNvbiwgZXhwb3J0QXN9ID0gc2VyaWFsaXplU3VtbWFyaWVzKFxuICAgICAgICBzcmNGaWxlTmFtZSwgZm9ySml0T3V0cHV0Q3R4LCB0aGlzLl9zdW1tYXJ5UmVzb2x2ZXIsIHRoaXMuX3N5bWJvbFJlc29sdmVyLCBzeW1ib2xTdW1tYXJpZXMsXG4gICAgICAgIHR5cGVEYXRhKTtcbiAgICBleHBvcnRBcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgbmdGYWN0b3J5Q3R4LnN0YXRlbWVudHMucHVzaChcbiAgICAgICAgICBvLnZhcmlhYmxlKGVudHJ5LmV4cG9ydEFzKS5zZXQobmdGYWN0b3J5Q3R4LmltcG9ydEV4cHIoZW50cnkuc3ltYm9sKSkudG9EZWNsU3RtdChudWxsLCBbXG4gICAgICAgICAgICBvLlN0bXRNb2RpZmllci5FeHBvcnRlZFxuICAgICAgICAgIF0pKTtcbiAgICB9KTtcbiAgICBjb25zdCBzdW1tYXJ5SnNvbiA9IG5ldyBHZW5lcmF0ZWRGaWxlKHNyY0ZpbGVOYW1lLCBzdW1tYXJ5RmlsZU5hbWUoc3JjRmlsZU5hbWUpLCBqc29uKTtcbiAgICBjb25zdCByZXN1bHQgPSBbc3VtbWFyeUpzb25dO1xuICAgIGlmIChmb3JKaXRPdXRwdXRDdHgpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHRoaXMuX2NvZGVnZW5Tb3VyY2VNb2R1bGUoc3JjRmlsZU5hbWUsIGZvckppdE91dHB1dEN0eCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tcGlsZU1vZHVsZShvdXRwdXRDdHg6IE91dHB1dENvbnRleHQsIG5nTW9kdWxlOiBDb21waWxlTmdNb2R1bGVNZXRhZGF0YSk6IHZvaWQge1xuICAgIGNvbnN0IHByb3ZpZGVyczogQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGFbXSA9IFtdO1xuXG4gICAgaWYgKHRoaXMuX29wdGlvbnMubG9jYWxlKSB7XG4gICAgICBjb25zdCBub3JtYWxpemVkTG9jYWxlID0gdGhpcy5fb3B0aW9ucy5sb2NhbGUucmVwbGFjZSgvXy9nLCAnLScpO1xuICAgICAgcHJvdmlkZXJzLnB1c2goe1xuICAgICAgICB0b2tlbjogY3JlYXRlVG9rZW5Gb3JFeHRlcm5hbFJlZmVyZW5jZSh0aGlzLnJlZmxlY3RvciwgSWRlbnRpZmllcnMuTE9DQUxFX0lEKSxcbiAgICAgICAgdXNlVmFsdWU6IG5vcm1hbGl6ZWRMb2NhbGUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fb3B0aW9ucy5pMThuRm9ybWF0KSB7XG4gICAgICBwcm92aWRlcnMucHVzaCh7XG4gICAgICAgIHRva2VuOiBjcmVhdGVUb2tlbkZvckV4dGVybmFsUmVmZXJlbmNlKHRoaXMucmVmbGVjdG9yLCBJZGVudGlmaWVycy5UUkFOU0xBVElPTlNfRk9STUFUKSxcbiAgICAgICAgdXNlVmFsdWU6IHRoaXMuX29wdGlvbnMuaTE4bkZvcm1hdFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fbmdNb2R1bGVDb21waWxlci5jb21waWxlKG91dHB1dEN0eCwgbmdNb2R1bGUsIHByb3ZpZGVycyk7XG4gIH1cblxuICBwcml2YXRlIF9jb21waWxlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCwgY29tcE1ldGE6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgICAgIG5nTW9kdWxlOiBDb21waWxlTmdNb2R1bGVNZXRhZGF0YSwgZmlsZVN1ZmZpeDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgaG9zdE1ldGEgPSB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmdldEhvc3RDb21wb25lbnRNZXRhZGF0YShjb21wTWV0YSk7XG4gICAgY29uc3QgaG9zdFZpZXdGYWN0b3J5VmFyID1cbiAgICAgICAgdGhpcy5fY29tcGlsZUNvbXBvbmVudChvdXRwdXRDdHgsIGhvc3RNZXRhLCBuZ01vZHVsZSwgW2NvbXBNZXRhLnR5cGVdLCBudWxsLCBmaWxlU3VmZml4KVxuICAgICAgICAgICAgLnZpZXdDbGFzc1ZhcjtcbiAgICBjb25zdCBjb21wRmFjdG9yeVZhciA9IGNvbXBvbmVudEZhY3RvcnlOYW1lKGNvbXBNZXRhLnR5cGUucmVmZXJlbmNlKTtcbiAgICBjb25zdCBpbnB1dHNFeHByczogby5MaXRlcmFsTWFwRW50cnlbXSA9IFtdO1xuICAgIGZvciAobGV0IHByb3BOYW1lIGluIGNvbXBNZXRhLmlucHV0cykge1xuICAgICAgY29uc3QgdGVtcGxhdGVOYW1lID0gY29tcE1ldGEuaW5wdXRzW3Byb3BOYW1lXTtcbiAgICAgIC8vIERvbid0IHF1b3RlIHNvIHRoYXQgdGhlIGtleSBnZXRzIG1pbmlmaWVkLi4uXG4gICAgICBpbnB1dHNFeHBycy5wdXNoKG5ldyBvLkxpdGVyYWxNYXBFbnRyeShwcm9wTmFtZSwgby5saXRlcmFsKHRlbXBsYXRlTmFtZSksIGZhbHNlKSk7XG4gICAgfVxuICAgIGNvbnN0IG91dHB1dHNFeHByczogby5MaXRlcmFsTWFwRW50cnlbXSA9IFtdO1xuICAgIGZvciAobGV0IHByb3BOYW1lIGluIGNvbXBNZXRhLm91dHB1dHMpIHtcbiAgICAgIGNvbnN0IHRlbXBsYXRlTmFtZSA9IGNvbXBNZXRhLm91dHB1dHNbcHJvcE5hbWVdO1xuICAgICAgLy8gRG9uJ3QgcXVvdGUgc28gdGhhdCB0aGUga2V5IGdldHMgbWluaWZpZWQuLi5cbiAgICAgIG91dHB1dHNFeHBycy5wdXNoKG5ldyBvLkxpdGVyYWxNYXBFbnRyeShwcm9wTmFtZSwgby5saXRlcmFsKHRlbXBsYXRlTmFtZSksIGZhbHNlKSk7XG4gICAgfVxuXG4gICAgb3V0cHV0Q3R4LnN0YXRlbWVudHMucHVzaChcbiAgICAgICAgby52YXJpYWJsZShjb21wRmFjdG9yeVZhcilcbiAgICAgICAgICAgIC5zZXQoby5pbXBvcnRFeHByKElkZW50aWZpZXJzLmNyZWF0ZUNvbXBvbmVudEZhY3RvcnkpLmNhbGxGbihbXG4gICAgICAgICAgICAgIG8ubGl0ZXJhbChjb21wTWV0YS5zZWxlY3RvciksIG91dHB1dEN0eC5pbXBvcnRFeHByKGNvbXBNZXRhLnR5cGUucmVmZXJlbmNlKSxcbiAgICAgICAgICAgICAgby52YXJpYWJsZShob3N0Vmlld0ZhY3RvcnlWYXIpLCBuZXcgby5MaXRlcmFsTWFwRXhwcihpbnB1dHNFeHBycyksXG4gICAgICAgICAgICAgIG5ldyBvLkxpdGVyYWxNYXBFeHByKG91dHB1dHNFeHBycyksXG4gICAgICAgICAgICAgIG8ubGl0ZXJhbEFycihcbiAgICAgICAgICAgICAgICAgIGNvbXBNZXRhLnRlbXBsYXRlICEubmdDb250ZW50U2VsZWN0b3JzLm1hcChzZWxlY3RvciA9PiBvLmxpdGVyYWwoc2VsZWN0b3IpKSlcbiAgICAgICAgICAgIF0pKVxuICAgICAgICAgICAgLnRvRGVjbFN0bXQoXG4gICAgICAgICAgICAgICAgby5pbXBvcnRUeXBlKFxuICAgICAgICAgICAgICAgICAgICBJZGVudGlmaWVycy5Db21wb25lbnRGYWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICBbby5leHByZXNzaW9uVHlwZShvdXRwdXRDdHguaW1wb3J0RXhwcihjb21wTWV0YS50eXBlLnJlZmVyZW5jZSkpICFdLFxuICAgICAgICAgICAgICAgICAgICBbby5UeXBlTW9kaWZpZXIuQ29uc3RdKSxcbiAgICAgICAgICAgICAgICBbby5TdG10TW9kaWZpZXIuRmluYWwsIG8uU3RtdE1vZGlmaWVyLkV4cG9ydGVkXSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tcGlsZUNvbXBvbmVudChcbiAgICAgIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCwgY29tcE1ldGE6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgICAgIG5nTW9kdWxlOiBDb21waWxlTmdNb2R1bGVNZXRhZGF0YSwgZGlyZWN0aXZlSWRlbnRpZmllcnM6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGFbXSxcbiAgICAgIGNvbXBvbmVudFN0eWxlczogQ29tcGlsZWRTdHlsZXNoZWV0fG51bGwsIGZpbGVTdWZmaXg6IHN0cmluZyk6IFZpZXdDb21waWxlUmVzdWx0IHtcbiAgICBjb25zdCB7dGVtcGxhdGU6IHBhcnNlZFRlbXBsYXRlLCBwaXBlczogdXNlZFBpcGVzfSA9XG4gICAgICAgIHRoaXMuX3BhcnNlVGVtcGxhdGUoY29tcE1ldGEsIG5nTW9kdWxlLCBkaXJlY3RpdmVJZGVudGlmaWVycyk7XG4gICAgY29uc3Qgc3R5bGVzRXhwciA9IGNvbXBvbmVudFN0eWxlcyA/IG8udmFyaWFibGUoY29tcG9uZW50U3R5bGVzLnN0eWxlc1ZhcikgOiBvLmxpdGVyYWxBcnIoW10pO1xuICAgIGNvbnN0IHZpZXdSZXN1bHQgPSB0aGlzLl92aWV3Q29tcGlsZXIuY29tcGlsZUNvbXBvbmVudChcbiAgICAgICAgb3V0cHV0Q3R4LCBjb21wTWV0YSwgcGFyc2VkVGVtcGxhdGUsIHN0eWxlc0V4cHIsIHVzZWRQaXBlcyk7XG4gICAgaWYgKGNvbXBvbmVudFN0eWxlcykge1xuICAgICAgX3Jlc29sdmVTdHlsZVN0YXRlbWVudHMoXG4gICAgICAgICAgdGhpcy5fc3ltYm9sUmVzb2x2ZXIsIGNvbXBvbmVudFN0eWxlcywgdGhpcy5fc3R5bGVDb21waWxlci5uZWVkc1N0eWxlU2hpbShjb21wTWV0YSksXG4gICAgICAgICAgZmlsZVN1ZmZpeCk7XG4gICAgfVxuICAgIHJldHVybiB2aWV3UmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUZW1wbGF0ZShcbiAgICAgIGNvbXBNZXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIG5nTW9kdWxlOiBDb21waWxlTmdNb2R1bGVNZXRhZGF0YSxcbiAgICAgIGRpcmVjdGl2ZUlkZW50aWZpZXJzOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhW10pOlxuICAgICAge3RlbXBsYXRlOiBUZW1wbGF0ZUFzdFtdLCBwaXBlczogQ29tcGlsZVBpcGVTdW1tYXJ5W119IHtcbiAgICBpZiAodGhpcy5fdGVtcGxhdGVBc3RDYWNoZS5oYXMoY29tcE1ldGEudHlwZS5yZWZlcmVuY2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGVBc3RDYWNoZS5nZXQoY29tcE1ldGEudHlwZS5yZWZlcmVuY2UpICE7XG4gICAgfVxuICAgIGNvbnN0IHByZXNlcnZlV2hpdGVzcGFjZXMgPSBjb21wTWV0YSAhLnRlbXBsYXRlICEucHJlc2VydmVXaGl0ZXNwYWNlcztcbiAgICBjb25zdCBkaXJlY3RpdmVzID1cbiAgICAgICAgZGlyZWN0aXZlSWRlbnRpZmllcnMubWFwKGRpciA9PiB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmdldERpcmVjdGl2ZVN1bW1hcnkoZGlyLnJlZmVyZW5jZSkpO1xuICAgIGNvbnN0IHBpcGVzID0gbmdNb2R1bGUudHJhbnNpdGl2ZU1vZHVsZS5waXBlcy5tYXAoXG4gICAgICAgIHBpcGUgPT4gdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXRQaXBlU3VtbWFyeShwaXBlLnJlZmVyZW5jZSkpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3RlbXBsYXRlUGFyc2VyLnBhcnNlKFxuICAgICAgICBjb21wTWV0YSwgY29tcE1ldGEudGVtcGxhdGUgIS5odG1sQXN0ICEsIGRpcmVjdGl2ZXMsIHBpcGVzLCBuZ01vZHVsZS5zY2hlbWFzLFxuICAgICAgICB0ZW1wbGF0ZVNvdXJjZVVybChuZ01vZHVsZS50eXBlLCBjb21wTWV0YSwgY29tcE1ldGEudGVtcGxhdGUgISksIHByZXNlcnZlV2hpdGVzcGFjZXMpO1xuICAgIHRoaXMuX3RlbXBsYXRlQXN0Q2FjaGUuc2V0KGNvbXBNZXRhLnR5cGUucmVmZXJlbmNlLCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVPdXRwdXRDb250ZXh0KGdlbkZpbGVQYXRoOiBzdHJpbmcpOiBPdXRwdXRDb250ZXh0IHtcbiAgICBjb25zdCBpbXBvcnRFeHByID1cbiAgICAgICAgKHN5bWJvbDogU3RhdGljU3ltYm9sLCB0eXBlUGFyYW1zOiBvLlR5cGVbXSB8IG51bGwgPSBudWxsLFxuICAgICAgICAgdXNlU3VtbWFyaWVzOiBib29sZWFuID0gdHJ1ZSkgPT4ge1xuICAgICAgICAgIGlmICghKHN5bWJvbCBpbnN0YW5jZW9mIFN0YXRpY1N5bWJvbCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW50ZXJuYWwgZXJyb3I6IHVua25vd24gaWRlbnRpZmllciAke0pTT04uc3RyaW5naWZ5KHN5bWJvbCl9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGFyaXR5ID0gdGhpcy5fc3ltYm9sUmVzb2x2ZXIuZ2V0VHlwZUFyaXR5KHN5bWJvbCkgfHwgMDtcbiAgICAgICAgICBjb25zdCB7ZmlsZVBhdGgsIG5hbWUsIG1lbWJlcnN9ID1cbiAgICAgICAgICAgICAgdGhpcy5fc3ltYm9sUmVzb2x2ZXIuZ2V0SW1wb3J0QXMoc3ltYm9sLCB1c2VTdW1tYXJpZXMpIHx8IHN5bWJvbDtcbiAgICAgICAgICBjb25zdCBpbXBvcnRNb2R1bGUgPSB0aGlzLl9maWxlTmFtZVRvTW9kdWxlTmFtZShmaWxlUGF0aCwgZ2VuRmlsZVBhdGgpO1xuXG4gICAgICAgICAgLy8gSXQgc2hvdWxkIGJlIGdvb2QgZW5vdWdoIHRvIGNvbXBhcmUgZmlsZVBhdGggdG8gZ2VuRmlsZVBhdGggYW5kIGlmIHRoZXkgYXJlIGVxdWFsXG4gICAgICAgICAgLy8gdGhlcmUgaXMgYSBzZWxmIHJlZmVyZW5jZS4gSG93ZXZlciwgbmdmYWN0b3J5IGZpbGVzIGdlbmVyYXRlIHRvIC50cyBidXQgdGhlaXJcbiAgICAgICAgICAvLyBzeW1ib2xzIGhhdmUgLmQudHMgc28gYSBzaW1wbGUgY29tcGFyZSBpcyBpbnN1ZmZpY2llbnQuIFRoZXkgc2hvdWxkIGJlIGNhbm9uaWNhbFxuICAgICAgICAgIC8vIGFuZCBpcyB0cmFja2VkIGJ5ICMxNzcwNS5cbiAgICAgICAgICBjb25zdCBzZWxmUmVmZXJlbmNlID0gdGhpcy5fZmlsZU5hbWVUb01vZHVsZU5hbWUoZ2VuRmlsZVBhdGgsIGdlbkZpbGVQYXRoKTtcbiAgICAgICAgICBjb25zdCBtb2R1bGVOYW1lID0gaW1wb3J0TW9kdWxlID09PSBzZWxmUmVmZXJlbmNlID8gbnVsbCA6IGltcG9ydE1vZHVsZTtcblxuICAgICAgICAgIC8vIElmIHdlIGFyZSBpbiBhIHR5cGUgZXhwcmVzc2lvbiB0aGF0IHJlZmVycyB0byBhIGdlbmVyaWMgdHlwZSB0aGVuIHN1cHBseVxuICAgICAgICAgIC8vIHRoZSByZXF1aXJlZCB0eXBlIHBhcmFtZXRlcnMuIElmIHRoZXJlIHdlcmUgbm90IGVub3VnaCB0eXBlIHBhcmFtZXRlcnNcbiAgICAgICAgICAvLyBzdXBwbGllZCwgc3VwcGx5IGFueSBhcyB0aGUgdHlwZS4gT3V0c2lkZSBhIHR5cGUgZXhwcmVzc2lvbiB0aGUgcmVmZXJlbmNlXG4gICAgICAgICAgLy8gc2hvdWxkIG5vdCBzdXBwbHkgdHlwZSBwYXJhbWV0ZXJzIGFuZCBiZSB0cmVhdGVkIGFzIGEgc2ltcGxlIHZhbHVlIHJlZmVyZW5jZVxuICAgICAgICAgIC8vIHRvIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBpdHNlbGYuXG4gICAgICAgICAgY29uc3Qgc3VwcGxpZWRUeXBlUGFyYW1zID0gdHlwZVBhcmFtcyB8fCBbXTtcbiAgICAgICAgICBjb25zdCBtaXNzaW5nVHlwZVBhcmFtc0NvdW50ID0gYXJpdHkgLSBzdXBwbGllZFR5cGVQYXJhbXMubGVuZ3RoO1xuICAgICAgICAgIGNvbnN0IGFsbFR5cGVQYXJhbXMgPVxuICAgICAgICAgICAgICBzdXBwbGllZFR5cGVQYXJhbXMuY29uY2F0KG5ldyBBcnJheShtaXNzaW5nVHlwZVBhcmFtc0NvdW50KS5maWxsKG8uRFlOQU1JQ19UWVBFKSk7XG4gICAgICAgICAgcmV0dXJuIG1lbWJlcnMucmVkdWNlKFxuICAgICAgICAgICAgICAoZXhwciwgbWVtYmVyTmFtZSkgPT4gZXhwci5wcm9wKG1lbWJlck5hbWUpLFxuICAgICAgICAgICAgICA8by5FeHByZXNzaW9uPm8uaW1wb3J0RXhwcihcbiAgICAgICAgICAgICAgICAgIG5ldyBvLkV4dGVybmFsUmVmZXJlbmNlKG1vZHVsZU5hbWUsIG5hbWUsIG51bGwpLCBhbGxUeXBlUGFyYW1zKSk7XG4gICAgICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXRlbWVudHM6IFtdLCBnZW5GaWxlUGF0aCwgaW1wb3J0RXhwciwgY29uc3RhbnRQb29sOiBuZXcgQ29uc3RhbnRQb29sKCl9O1xuICB9XG5cbiAgcHJpdmF0ZSBfZmlsZU5hbWVUb01vZHVsZU5hbWUoaW1wb3J0ZWRGaWxlUGF0aDogc3RyaW5nLCBjb250YWluaW5nRmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3N1bW1hcnlSZXNvbHZlci5nZXRLbm93bk1vZHVsZU5hbWUoaW1wb3J0ZWRGaWxlUGF0aCkgfHxcbiAgICAgICAgdGhpcy5fc3ltYm9sUmVzb2x2ZXIuZ2V0S25vd25Nb2R1bGVOYW1lKGltcG9ydGVkRmlsZVBhdGgpIHx8XG4gICAgICAgIHRoaXMuX2hvc3QuZmlsZU5hbWVUb01vZHVsZU5hbWUoaW1wb3J0ZWRGaWxlUGF0aCwgY29udGFpbmluZ0ZpbGVQYXRoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvZGVnZW5TdHlsZXMoXG4gICAgICBzcmNGaWxlVXJsOiBzdHJpbmcsIGNvbXBNZXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICBzdHlsZXNoZWV0TWV0YWRhdGE6IENvbXBpbGVTdHlsZXNoZWV0TWV0YWRhdGEsIGlzU2hpbW1lZDogYm9vbGVhbixcbiAgICAgIGZpbGVTdWZmaXg6IHN0cmluZyk6IEdlbmVyYXRlZEZpbGUge1xuICAgIGNvbnN0IG91dHB1dEN0eCA9IHRoaXMuX2NyZWF0ZU91dHB1dENvbnRleHQoXG4gICAgICAgIF9zdHlsZXNNb2R1bGVVcmwoc3R5bGVzaGVldE1ldGFkYXRhLm1vZHVsZVVybCAhLCBpc1NoaW1tZWQsIGZpbGVTdWZmaXgpKTtcbiAgICBjb25zdCBjb21waWxlZFN0eWxlc2hlZXQgPVxuICAgICAgICB0aGlzLl9zdHlsZUNvbXBpbGVyLmNvbXBpbGVTdHlsZXMob3V0cHV0Q3R4LCBjb21wTWV0YSwgc3R5bGVzaGVldE1ldGFkYXRhLCBpc1NoaW1tZWQpO1xuICAgIF9yZXNvbHZlU3R5bGVTdGF0ZW1lbnRzKHRoaXMuX3N5bWJvbFJlc29sdmVyLCBjb21waWxlZFN0eWxlc2hlZXQsIGlzU2hpbW1lZCwgZmlsZVN1ZmZpeCk7XG4gICAgcmV0dXJuIHRoaXMuX2NvZGVnZW5Tb3VyY2VNb2R1bGUoc3JjRmlsZVVybCwgb3V0cHV0Q3R4KTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvZGVnZW5Tb3VyY2VNb2R1bGUoc3JjRmlsZVVybDogc3RyaW5nLCBjdHg6IE91dHB1dENvbnRleHQpOiBHZW5lcmF0ZWRGaWxlIHtcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRlZEZpbGUoc3JjRmlsZVVybCwgY3R4LmdlbkZpbGVQYXRoLCBjdHguc3RhdGVtZW50cyk7XG4gIH1cblxuICBsaXN0TGF6eVJvdXRlcyhlbnRyeVJvdXRlPzogc3RyaW5nLCBhbmFseXplZE1vZHVsZXM/OiBOZ0FuYWx5emVkTW9kdWxlcyk6IExhenlSb3V0ZVtdIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBpZiAoZW50cnlSb3V0ZSkge1xuICAgICAgY29uc3Qgc3ltYm9sID0gcGFyc2VMYXp5Um91dGUoZW50cnlSb3V0ZSwgdGhpcy5yZWZsZWN0b3IpLnJlZmVyZW5jZWRNb2R1bGU7XG4gICAgICByZXR1cm4gdmlzaXRMYXp5Um91dGUoc3ltYm9sKTtcbiAgICB9IGVsc2UgaWYgKGFuYWx5emVkTW9kdWxlcykge1xuICAgICAgY29uc3QgYWxsTGF6eVJvdXRlczogTGF6eVJvdXRlW10gPSBbXTtcbiAgICAgIGZvciAoY29uc3QgbmdNb2R1bGUgb2YgYW5hbHl6ZWRNb2R1bGVzLm5nTW9kdWxlcykge1xuICAgICAgICBjb25zdCBsYXp5Um91dGVzID0gbGlzdExhenlSb3V0ZXMobmdNb2R1bGUsIHRoaXMucmVmbGVjdG9yKTtcbiAgICAgICAgZm9yIChjb25zdCBsYXp5Um91dGUgb2YgbGF6eVJvdXRlcykge1xuICAgICAgICAgIGFsbExhenlSb3V0ZXMucHVzaChsYXp5Um91dGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYWxsTGF6eVJvdXRlcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFaXRoZXIgcm91dGUgb3IgYW5hbHl6ZWRNb2R1bGVzIGhhcyB0byBiZSBzcGVjaWZpZWQhYCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmlzaXRMYXp5Um91dGUoXG4gICAgICAgIHN5bWJvbDogU3RhdGljU3ltYm9sLCBzZWVuUm91dGVzID0gbmV3IFNldDxTdGF0aWNTeW1ib2w+KCksXG4gICAgICAgIGFsbExhenlSb3V0ZXM6IExhenlSb3V0ZVtdID0gW10pOiBMYXp5Um91dGVbXSB7XG4gICAgICAvLyBTdXBwb3J0IHBvaW50aW5nIHRvIGRlZmF1bHQgZXhwb3J0cywgYnV0IHN0b3AgcmVjdXJzaW5nIHRoZXJlLFxuICAgICAgLy8gYXMgdGhlIFN0YXRpY1JlZmxlY3RvciBkb2VzIG5vdCB5ZXQgc3VwcG9ydCBkZWZhdWx0IGV4cG9ydHMuXG4gICAgICBpZiAoc2VlblJvdXRlcy5oYXMoc3ltYm9sKSB8fCAhc3ltYm9sLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGFsbExhenlSb3V0ZXM7XG4gICAgICB9XG4gICAgICBzZWVuUm91dGVzLmFkZChzeW1ib2wpO1xuICAgICAgY29uc3QgbGF6eVJvdXRlcyA9IGxpc3RMYXp5Um91dGVzKFxuICAgICAgICAgIHNlbGYuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0TmdNb2R1bGVNZXRhZGF0YShzeW1ib2wsIHRydWUpICEsIHNlbGYucmVmbGVjdG9yKTtcbiAgICAgIGZvciAoY29uc3QgbGF6eVJvdXRlIG9mIGxhenlSb3V0ZXMpIHtcbiAgICAgICAgYWxsTGF6eVJvdXRlcy5wdXNoKGxhenlSb3V0ZSk7XG4gICAgICAgIHZpc2l0TGF6eVJvdXRlKGxhenlSb3V0ZS5yZWZlcmVuY2VkTW9kdWxlLCBzZWVuUm91dGVzLCBhbGxMYXp5Um91dGVzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhbGxMYXp5Um91dGVzO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlRW1wdHlTdHViKG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCkge1xuICAvLyBOb3RlOiBXZSBuZWVkIHRvIHByb2R1Y2UgYXQgbGVhc3Qgb25lIGltcG9ydCBzdGF0ZW1lbnQgc28gdGhhdFxuICAvLyBUeXBlU2NyaXB0IGtub3dzIHRoYXQgdGhlIGZpbGUgaXMgYW4gZXM2IG1vZHVsZS4gT3RoZXJ3aXNlIG91ciBnZW5lcmF0ZWRcbiAgLy8gZXhwb3J0cyAvIGltcG9ydHMgd29uJ3QgYmUgZW1pdHRlZCBwcm9wZXJseSBieSBUeXBlU2NyaXB0LlxuICBvdXRwdXRDdHguc3RhdGVtZW50cy5wdXNoKG8uaW1wb3J0RXhwcihJZGVudGlmaWVycy5Db21wb25lbnRGYWN0b3J5KS50b1N0bXQoKSk7XG59XG5cblxuZnVuY3Rpb24gX3Jlc29sdmVTdHlsZVN0YXRlbWVudHMoXG4gICAgc3ltYm9sUmVzb2x2ZXI6IFN0YXRpY1N5bWJvbFJlc29sdmVyLCBjb21waWxlUmVzdWx0OiBDb21waWxlZFN0eWxlc2hlZXQsIG5lZWRzU2hpbTogYm9vbGVhbixcbiAgICBmaWxlU3VmZml4OiBzdHJpbmcpOiB2b2lkIHtcbiAgY29tcGlsZVJlc3VsdC5kZXBlbmRlbmNpZXMuZm9yRWFjaCgoZGVwKSA9PiB7XG4gICAgZGVwLnNldFZhbHVlKHN5bWJvbFJlc29sdmVyLmdldFN0YXRpY1N5bWJvbChcbiAgICAgICAgX3N0eWxlc01vZHVsZVVybChkZXAubW9kdWxlVXJsLCBuZWVkc1NoaW0sIGZpbGVTdWZmaXgpLCBkZXAubmFtZSkpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX3N0eWxlc01vZHVsZVVybChzdHlsZXNoZWV0VXJsOiBzdHJpbmcsIHNoaW06IGJvb2xlYW4sIHN1ZmZpeDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3N0eWxlc2hlZXRVcmx9JHtzaGltID8gJy5zaGltJyA6ICcnfS5uZ3N0eWxlJHtzdWZmaXh9YDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOZ0FuYWx5emVkTW9kdWxlcyB7XG4gIG5nTW9kdWxlczogQ29tcGlsZU5nTW9kdWxlTWV0YWRhdGFbXTtcbiAgbmdNb2R1bGVCeVBpcGVPckRpcmVjdGl2ZTogTWFwPFN0YXRpY1N5bWJvbCwgQ29tcGlsZU5nTW9kdWxlTWV0YWRhdGE+O1xuICBmaWxlczogTmdBbmFseXplZEZpbGVbXTtcbiAgc3ltYm9sc01pc3NpbmdNb2R1bGU/OiBTdGF0aWNTeW1ib2xbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOZ0FuYWx5emVkRmlsZVdpdGhJbmplY3RhYmxlcyB7XG4gIGZpbGVOYW1lOiBzdHJpbmc7XG4gIGluamVjdGFibGVzOiBDb21waWxlSW5qZWN0YWJsZU1ldGFkYXRhW107XG4gIHNoYWxsb3dNb2R1bGVzOiBDb21waWxlU2hhbGxvd01vZHVsZU1ldGFkYXRhW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmdBbmFseXplZEZpbGUge1xuICBmaWxlTmFtZTogc3RyaW5nO1xuICBkaXJlY3RpdmVzOiBTdGF0aWNTeW1ib2xbXTtcbiAgcGlwZXM6IFN0YXRpY1N5bWJvbFtdO1xuICBuZ01vZHVsZXM6IENvbXBpbGVOZ01vZHVsZU1ldGFkYXRhW107XG4gIGluamVjdGFibGVzOiBDb21waWxlSW5qZWN0YWJsZU1ldGFkYXRhW107XG4gIGV4cG9ydHNOb25Tb3VyY2VGaWxlczogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOZ0FuYWx5emVNb2R1bGVzSG9zdCB7IGlzU291cmNlRmlsZShmaWxlUGF0aDogc3RyaW5nKTogYm9vbGVhbjsgfVxuXG5leHBvcnQgZnVuY3Rpb24gYW5hbHl6ZU5nTW9kdWxlcyhcbiAgICBmaWxlTmFtZXM6IHN0cmluZ1tdLCBob3N0OiBOZ0FuYWx5emVNb2R1bGVzSG9zdCwgc3RhdGljU3ltYm9sUmVzb2x2ZXI6IFN0YXRpY1N5bWJvbFJlc29sdmVyLFxuICAgIG1ldGFkYXRhUmVzb2x2ZXI6IENvbXBpbGVNZXRhZGF0YVJlc29sdmVyKTogTmdBbmFseXplZE1vZHVsZXMge1xuICBjb25zdCBmaWxlcyA9IF9hbmFseXplRmlsZXNJbmNsdWRpbmdOb25Qcm9ncmFtRmlsZXMoXG4gICAgICBmaWxlTmFtZXMsIGhvc3QsIHN0YXRpY1N5bWJvbFJlc29sdmVyLCBtZXRhZGF0YVJlc29sdmVyKTtcbiAgcmV0dXJuIG1lcmdlQW5hbHl6ZWRGaWxlcyhmaWxlcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmFseXplQW5kVmFsaWRhdGVOZ01vZHVsZXMoXG4gICAgZmlsZU5hbWVzOiBzdHJpbmdbXSwgaG9zdDogTmdBbmFseXplTW9kdWxlc0hvc3QsIHN0YXRpY1N5bWJvbFJlc29sdmVyOiBTdGF0aWNTeW1ib2xSZXNvbHZlcixcbiAgICBtZXRhZGF0YVJlc29sdmVyOiBDb21waWxlTWV0YWRhdGFSZXNvbHZlcik6IE5nQW5hbHl6ZWRNb2R1bGVzIHtcbiAgcmV0dXJuIHZhbGlkYXRlQW5hbHl6ZWRNb2R1bGVzKFxuICAgICAgYW5hbHl6ZU5nTW9kdWxlcyhmaWxlTmFtZXMsIGhvc3QsIHN0YXRpY1N5bWJvbFJlc29sdmVyLCBtZXRhZGF0YVJlc29sdmVyKSk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQW5hbHl6ZWRNb2R1bGVzKGFuYWx5emVkTW9kdWxlczogTmdBbmFseXplZE1vZHVsZXMpOiBOZ0FuYWx5emVkTW9kdWxlcyB7XG4gIGlmIChhbmFseXplZE1vZHVsZXMuc3ltYm9sc01pc3NpbmdNb2R1bGUgJiYgYW5hbHl6ZWRNb2R1bGVzLnN5bWJvbHNNaXNzaW5nTW9kdWxlLmxlbmd0aCkge1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gYW5hbHl6ZWRNb2R1bGVzLnN5bWJvbHNNaXNzaW5nTW9kdWxlLm1hcChcbiAgICAgICAgcyA9PlxuICAgICAgICAgICAgYENhbm5vdCBkZXRlcm1pbmUgdGhlIG1vZHVsZSBmb3IgY2xhc3MgJHtzLm5hbWV9IGluICR7cy5maWxlUGF0aH0hIEFkZCAke3MubmFtZX0gdG8gdGhlIE5nTW9kdWxlIHRvIGZpeCBpdC5gKTtcbiAgICB0aHJvdyBzeW50YXhFcnJvcihtZXNzYWdlcy5qb2luKCdcXG4nKSk7XG4gIH1cbiAgcmV0dXJuIGFuYWx5emVkTW9kdWxlcztcbn1cblxuLy8gQW5hbHl6ZXMgYWxsIG9mIHRoZSBwcm9ncmFtIGZpbGVzLFxuLy8gaW5jbHVkaW5nIGZpbGVzIHRoYXQgYXJlIG5vdCBwYXJ0IG9mIHRoZSBwcm9ncmFtXG4vLyBidXQgYXJlIHJlZmVyZW5jZWQgYnkgYW4gTmdNb2R1bGUuXG5mdW5jdGlvbiBfYW5hbHl6ZUZpbGVzSW5jbHVkaW5nTm9uUHJvZ3JhbUZpbGVzKFxuICAgIGZpbGVOYW1lczogc3RyaW5nW10sIGhvc3Q6IE5nQW5hbHl6ZU1vZHVsZXNIb3N0LCBzdGF0aWNTeW1ib2xSZXNvbHZlcjogU3RhdGljU3ltYm9sUmVzb2x2ZXIsXG4gICAgbWV0YWRhdGFSZXNvbHZlcjogQ29tcGlsZU1ldGFkYXRhUmVzb2x2ZXIpOiBOZ0FuYWx5emVkRmlsZVtdIHtcbiAgY29uc3Qgc2VlbkZpbGVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGNvbnN0IGZpbGVzOiBOZ0FuYWx5emVkRmlsZVtdID0gW107XG5cbiAgY29uc3QgdmlzaXRGaWxlID0gKGZpbGVOYW1lOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoc2VlbkZpbGVzLmhhcyhmaWxlTmFtZSkgfHwgIWhvc3QuaXNTb3VyY2VGaWxlKGZpbGVOYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzZWVuRmlsZXMuYWRkKGZpbGVOYW1lKTtcbiAgICBjb25zdCBhbmFseXplZEZpbGUgPSBhbmFseXplRmlsZShob3N0LCBzdGF0aWNTeW1ib2xSZXNvbHZlciwgbWV0YWRhdGFSZXNvbHZlciwgZmlsZU5hbWUpO1xuICAgIGZpbGVzLnB1c2goYW5hbHl6ZWRGaWxlKTtcbiAgICBhbmFseXplZEZpbGUubmdNb2R1bGVzLmZvckVhY2gobmdNb2R1bGUgPT4ge1xuICAgICAgbmdNb2R1bGUudHJhbnNpdGl2ZU1vZHVsZS5tb2R1bGVzLmZvckVhY2gobW9kTWV0YSA9PiB2aXNpdEZpbGUobW9kTWV0YS5yZWZlcmVuY2UuZmlsZVBhdGgpKTtcbiAgICB9KTtcbiAgfTtcbiAgZmlsZU5hbWVzLmZvckVhY2goKGZpbGVOYW1lKSA9PiB2aXNpdEZpbGUoZmlsZU5hbWUpKTtcbiAgcmV0dXJuIGZpbGVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYW5hbHl6ZUZpbGUoXG4gICAgaG9zdDogTmdBbmFseXplTW9kdWxlc0hvc3QsIHN0YXRpY1N5bWJvbFJlc29sdmVyOiBTdGF0aWNTeW1ib2xSZXNvbHZlcixcbiAgICBtZXRhZGF0YVJlc29sdmVyOiBDb21waWxlTWV0YWRhdGFSZXNvbHZlciwgZmlsZU5hbWU6IHN0cmluZyk6IE5nQW5hbHl6ZWRGaWxlIHtcbiAgY29uc3QgZGlyZWN0aXZlczogU3RhdGljU3ltYm9sW10gPSBbXTtcbiAgY29uc3QgcGlwZXM6IFN0YXRpY1N5bWJvbFtdID0gW107XG4gIGNvbnN0IGluamVjdGFibGVzOiBDb21waWxlSW5qZWN0YWJsZU1ldGFkYXRhW10gPSBbXTtcbiAgY29uc3QgbmdNb2R1bGVzOiBDb21waWxlTmdNb2R1bGVNZXRhZGF0YVtdID0gW107XG4gIGNvbnN0IGhhc0RlY29yYXRvcnMgPSBzdGF0aWNTeW1ib2xSZXNvbHZlci5oYXNEZWNvcmF0b3JzKGZpbGVOYW1lKTtcbiAgbGV0IGV4cG9ydHNOb25Tb3VyY2VGaWxlcyA9IGZhbHNlO1xuICAvLyBEb24ndCBhbmFseXplIC5kLnRzIGZpbGVzIHRoYXQgaGF2ZSBubyBkZWNvcmF0b3JzIGFzIGEgc2hvcnRjdXRcbiAgLy8gdG8gc3BlZWQgdXAgdGhlIGFuYWx5c2lzLiBUaGlzIHByZXZlbnRzIHVzIGZyb21cbiAgLy8gcmVzb2x2aW5nIHRoZSByZWZlcmVuY2VzIGluIHRoZXNlIGZpbGVzLlxuICAvLyBOb3RlOiBleHBvcnRzTm9uU291cmNlRmlsZXMgaXMgb25seSBuZWVkZWQgd2hlbiBjb21waWxpbmcgd2l0aCBzdW1tYXJpZXMsXG4gIC8vIHdoaWNoIGlzIG5vdCB0aGUgY2FzZSB3aGVuIC5kLnRzIGZpbGVzIGFyZSB0cmVhdGVkIGFzIGlucHV0IGZpbGVzLlxuICBpZiAoIWZpbGVOYW1lLmVuZHNXaXRoKCcuZC50cycpIHx8IGhhc0RlY29yYXRvcnMpIHtcbiAgICBzdGF0aWNTeW1ib2xSZXNvbHZlci5nZXRTeW1ib2xzT2YoZmlsZU5hbWUpLmZvckVhY2goKHN5bWJvbCkgPT4ge1xuICAgICAgY29uc3QgcmVzb2x2ZWRTeW1ib2wgPSBzdGF0aWNTeW1ib2xSZXNvbHZlci5yZXNvbHZlU3ltYm9sKHN5bWJvbCk7XG4gICAgICBjb25zdCBzeW1ib2xNZXRhID0gcmVzb2x2ZWRTeW1ib2wubWV0YWRhdGE7XG4gICAgICBpZiAoIXN5bWJvbE1ldGEgfHwgc3ltYm9sTWV0YS5fX3N5bWJvbGljID09PSAnZXJyb3InKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxldCBpc05nU3ltYm9sID0gZmFsc2U7XG4gICAgICBpZiAoc3ltYm9sTWV0YS5fX3N5bWJvbGljID09PSAnY2xhc3MnKSB7XG4gICAgICAgIGlmIChtZXRhZGF0YVJlc29sdmVyLmlzRGlyZWN0aXZlKHN5bWJvbCkpIHtcbiAgICAgICAgICBpc05nU3ltYm9sID0gdHJ1ZTtcbiAgICAgICAgICBkaXJlY3RpdmVzLnB1c2goc3ltYm9sKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRhZGF0YVJlc29sdmVyLmlzUGlwZShzeW1ib2wpKSB7XG4gICAgICAgICAgaXNOZ1N5bWJvbCA9IHRydWU7XG4gICAgICAgICAgcGlwZXMucHVzaChzeW1ib2wpO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhUmVzb2x2ZXIuaXNOZ01vZHVsZShzeW1ib2wpKSB7XG4gICAgICAgICAgY29uc3QgbmdNb2R1bGUgPSBtZXRhZGF0YVJlc29sdmVyLmdldE5nTW9kdWxlTWV0YWRhdGEoc3ltYm9sLCBmYWxzZSk7XG4gICAgICAgICAgaWYgKG5nTW9kdWxlKSB7XG4gICAgICAgICAgICBpc05nU3ltYm9sID0gdHJ1ZTtcbiAgICAgICAgICAgIG5nTW9kdWxlcy5wdXNoKG5nTW9kdWxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobWV0YWRhdGFSZXNvbHZlci5pc0luamVjdGFibGUoc3ltYm9sKSkge1xuICAgICAgICAgIGlzTmdTeW1ib2wgPSB0cnVlO1xuICAgICAgICAgIGNvbnN0IGluamVjdGFibGUgPSBtZXRhZGF0YVJlc29sdmVyLmdldEluamVjdGFibGVNZXRhZGF0YShzeW1ib2wsIG51bGwsIGZhbHNlKTtcbiAgICAgICAgICBpZiAoaW5qZWN0YWJsZSkge1xuICAgICAgICAgICAgaW5qZWN0YWJsZXMucHVzaChpbmplY3RhYmxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghaXNOZ1N5bWJvbCkge1xuICAgICAgICBleHBvcnRzTm9uU291cmNlRmlsZXMgPVxuICAgICAgICAgICAgZXhwb3J0c05vblNvdXJjZUZpbGVzIHx8IGlzVmFsdWVFeHBvcnRpbmdOb25Tb3VyY2VGaWxlKGhvc3QsIHN5bWJvbE1ldGEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiB7XG4gICAgICBmaWxlTmFtZSwgZGlyZWN0aXZlcywgcGlwZXMsIG5nTW9kdWxlcywgaW5qZWN0YWJsZXMsIGV4cG9ydHNOb25Tb3VyY2VGaWxlcyxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuYWx5emVGaWxlRm9ySW5qZWN0YWJsZXMoXG4gICAgaG9zdDogTmdBbmFseXplTW9kdWxlc0hvc3QsIHN0YXRpY1N5bWJvbFJlc29sdmVyOiBTdGF0aWNTeW1ib2xSZXNvbHZlcixcbiAgICBtZXRhZGF0YVJlc29sdmVyOiBDb21waWxlTWV0YWRhdGFSZXNvbHZlciwgZmlsZU5hbWU6IHN0cmluZyk6IE5nQW5hbHl6ZWRGaWxlV2l0aEluamVjdGFibGVzIHtcbiAgY29uc3QgaW5qZWN0YWJsZXM6IENvbXBpbGVJbmplY3RhYmxlTWV0YWRhdGFbXSA9IFtdO1xuICBjb25zdCBzaGFsbG93TW9kdWxlczogQ29tcGlsZVNoYWxsb3dNb2R1bGVNZXRhZGF0YVtdID0gW107XG4gIGlmIChzdGF0aWNTeW1ib2xSZXNvbHZlci5oYXNEZWNvcmF0b3JzKGZpbGVOYW1lKSkge1xuICAgIHN0YXRpY1N5bWJvbFJlc29sdmVyLmdldFN5bWJvbHNPZihmaWxlTmFtZSkuZm9yRWFjaCgoc3ltYm9sKSA9PiB7XG4gICAgICBjb25zdCByZXNvbHZlZFN5bWJvbCA9IHN0YXRpY1N5bWJvbFJlc29sdmVyLnJlc29sdmVTeW1ib2woc3ltYm9sKTtcbiAgICAgIGNvbnN0IHN5bWJvbE1ldGEgPSByZXNvbHZlZFN5bWJvbC5tZXRhZGF0YTtcbiAgICAgIGlmICghc3ltYm9sTWV0YSB8fCBzeW1ib2xNZXRhLl9fc3ltYm9saWMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHN5bWJvbE1ldGEuX19zeW1ib2xpYyA9PT0gJ2NsYXNzJykge1xuICAgICAgICBpZiAobWV0YWRhdGFSZXNvbHZlci5pc0luamVjdGFibGUoc3ltYm9sKSkge1xuICAgICAgICAgIGNvbnN0IGluamVjdGFibGUgPSBtZXRhZGF0YVJlc29sdmVyLmdldEluamVjdGFibGVNZXRhZGF0YShzeW1ib2wsIG51bGwsIGZhbHNlKTtcbiAgICAgICAgICBpZiAoaW5qZWN0YWJsZSkge1xuICAgICAgICAgICAgaW5qZWN0YWJsZXMucHVzaChpbmplY3RhYmxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobWV0YWRhdGFSZXNvbHZlci5pc05nTW9kdWxlKHN5bWJvbCkpIHtcbiAgICAgICAgICBjb25zdCBtb2R1bGUgPSBtZXRhZGF0YVJlc29sdmVyLmdldFNoYWxsb3dNb2R1bGVNZXRhZGF0YShzeW1ib2wpO1xuICAgICAgICAgIGlmIChtb2R1bGUpIHtcbiAgICAgICAgICAgIHNoYWxsb3dNb2R1bGVzLnB1c2gobW9kdWxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4ge2ZpbGVOYW1lLCBpbmplY3RhYmxlcywgc2hhbGxvd01vZHVsZXN9O1xufVxuXG5mdW5jdGlvbiBpc1ZhbHVlRXhwb3J0aW5nTm9uU291cmNlRmlsZShob3N0OiBOZ0FuYWx5emVNb2R1bGVzSG9zdCwgbWV0YWRhdGE6IGFueSk6IGJvb2xlYW4ge1xuICBsZXQgZXhwb3J0c05vblNvdXJjZUZpbGVzID0gZmFsc2U7XG5cbiAgY2xhc3MgVmlzaXRvciBpbXBsZW1lbnRzIFZhbHVlVmlzaXRvciB7XG4gICAgdmlzaXRBcnJheShhcnI6IGFueVtdLCBjb250ZXh0OiBhbnkpOiBhbnkgeyBhcnIuZm9yRWFjaCh2ID0+IHZpc2l0VmFsdWUodiwgdGhpcywgY29udGV4dCkpOyB9XG4gICAgdmlzaXRTdHJpbmdNYXAobWFwOiB7W2tleTogc3RyaW5nXTogYW55fSwgY29udGV4dDogYW55KTogYW55IHtcbiAgICAgIE9iamVjdC5rZXlzKG1hcCkuZm9yRWFjaCgoa2V5KSA9PiB2aXNpdFZhbHVlKG1hcFtrZXldLCB0aGlzLCBjb250ZXh0KSk7XG4gICAgfVxuICAgIHZpc2l0UHJpbWl0aXZlKHZhbHVlOiBhbnksIGNvbnRleHQ6IGFueSk6IGFueSB7fVxuICAgIHZpc2l0T3RoZXIodmFsdWU6IGFueSwgY29udGV4dDogYW55KTogYW55IHtcbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFN0YXRpY1N5bWJvbCAmJiAhaG9zdC5pc1NvdXJjZUZpbGUodmFsdWUuZmlsZVBhdGgpKSB7XG4gICAgICAgIGV4cG9ydHNOb25Tb3VyY2VGaWxlcyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmlzaXRWYWx1ZShtZXRhZGF0YSwgbmV3IFZpc2l0b3IoKSwgbnVsbCk7XG4gIHJldHVybiBleHBvcnRzTm9uU291cmNlRmlsZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUFuYWx5emVkRmlsZXMoYW5hbHl6ZWRGaWxlczogTmdBbmFseXplZEZpbGVbXSk6IE5nQW5hbHl6ZWRNb2R1bGVzIHtcbiAgY29uc3QgYWxsTmdNb2R1bGVzOiBDb21waWxlTmdNb2R1bGVNZXRhZGF0YVtdID0gW107XG4gIGNvbnN0IG5nTW9kdWxlQnlQaXBlT3JEaXJlY3RpdmUgPSBuZXcgTWFwPFN0YXRpY1N5bWJvbCwgQ29tcGlsZU5nTW9kdWxlTWV0YWRhdGE+KCk7XG4gIGNvbnN0IGFsbFBpcGVzQW5kRGlyZWN0aXZlcyA9IG5ldyBTZXQ8U3RhdGljU3ltYm9sPigpO1xuXG4gIGFuYWx5emVkRmlsZXMuZm9yRWFjaChhZiA9PiB7XG4gICAgYWYubmdNb2R1bGVzLmZvckVhY2gobmdNb2R1bGUgPT4ge1xuICAgICAgYWxsTmdNb2R1bGVzLnB1c2gobmdNb2R1bGUpO1xuICAgICAgbmdNb2R1bGUuZGVjbGFyZWREaXJlY3RpdmVzLmZvckVhY2goXG4gICAgICAgICAgZCA9PiBuZ01vZHVsZUJ5UGlwZU9yRGlyZWN0aXZlLnNldChkLnJlZmVyZW5jZSwgbmdNb2R1bGUpKTtcbiAgICAgIG5nTW9kdWxlLmRlY2xhcmVkUGlwZXMuZm9yRWFjaChwID0+IG5nTW9kdWxlQnlQaXBlT3JEaXJlY3RpdmUuc2V0KHAucmVmZXJlbmNlLCBuZ01vZHVsZSkpO1xuICAgIH0pO1xuICAgIGFmLmRpcmVjdGl2ZXMuZm9yRWFjaChkID0+IGFsbFBpcGVzQW5kRGlyZWN0aXZlcy5hZGQoZCkpO1xuICAgIGFmLnBpcGVzLmZvckVhY2gocCA9PiBhbGxQaXBlc0FuZERpcmVjdGl2ZXMuYWRkKHApKTtcbiAgfSk7XG5cbiAgY29uc3Qgc3ltYm9sc01pc3NpbmdNb2R1bGU6IFN0YXRpY1N5bWJvbFtdID0gW107XG4gIGFsbFBpcGVzQW5kRGlyZWN0aXZlcy5mb3JFYWNoKHJlZiA9PiB7XG4gICAgaWYgKCFuZ01vZHVsZUJ5UGlwZU9yRGlyZWN0aXZlLmhhcyhyZWYpKSB7XG4gICAgICBzeW1ib2xzTWlzc2luZ01vZHVsZS5wdXNoKHJlZik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHtcbiAgICBuZ01vZHVsZXM6IGFsbE5nTW9kdWxlcyxcbiAgICBuZ01vZHVsZUJ5UGlwZU9yRGlyZWN0aXZlLFxuICAgIHN5bWJvbHNNaXNzaW5nTW9kdWxlLFxuICAgIGZpbGVzOiBhbmFseXplZEZpbGVzXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1lcmdlQW5kVmFsaWRhdGVOZ0ZpbGVzKGZpbGVzOiBOZ0FuYWx5emVkRmlsZVtdKTogTmdBbmFseXplZE1vZHVsZXMge1xuICByZXR1cm4gdmFsaWRhdGVBbmFseXplZE1vZHVsZXMobWVyZ2VBbmFseXplZEZpbGVzKGZpbGVzKSk7XG59XG4iXX0=