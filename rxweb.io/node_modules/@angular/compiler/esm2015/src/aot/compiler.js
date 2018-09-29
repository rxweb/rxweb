/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
export class AotCompiler {
    constructor(_config, _options, _host, reflector, _metadataResolver, _templateParser, _styleCompiler, _viewCompiler, _typeCheckCompiler, _ngModuleCompiler, _injectableCompiler, _outputEmitter, _summaryResolver, _symbolResolver) {
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
    clearCache() { this._metadataResolver.clearCache(); }
    analyzeModulesSync(rootFiles) {
        const analyzeResult = analyzeAndValidateNgModules(rootFiles, this._host, this._symbolResolver, this._metadataResolver);
        analyzeResult.ngModules.forEach(ngModule => this._metadataResolver.loadNgModuleDirectiveAndPipeMetadata(ngModule.type.reference, true));
        return analyzeResult;
    }
    analyzeModulesAsync(rootFiles) {
        const analyzeResult = analyzeAndValidateNgModules(rootFiles, this._host, this._symbolResolver, this._metadataResolver);
        return Promise
            .all(analyzeResult.ngModules.map(ngModule => this._metadataResolver.loadNgModuleDirectiveAndPipeMetadata(ngModule.type.reference, false)))
            .then(() => analyzeResult);
    }
    _analyzeFile(fileName) {
        let analyzedFile = this._analyzedFiles.get(fileName);
        if (!analyzedFile) {
            analyzedFile =
                analyzeFile(this._host, this._symbolResolver, this._metadataResolver, fileName);
            this._analyzedFiles.set(fileName, analyzedFile);
        }
        return analyzedFile;
    }
    _analyzeFileForInjectables(fileName) {
        let analyzedFile = this._analyzedFilesForInjectables.get(fileName);
        if (!analyzedFile) {
            analyzedFile = analyzeFileForInjectables(this._host, this._symbolResolver, this._metadataResolver, fileName);
            this._analyzedFilesForInjectables.set(fileName, analyzedFile);
        }
        return analyzedFile;
    }
    findGeneratedFileNames(fileName) {
        const genFileNames = [];
        const file = this._analyzeFile(fileName);
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
        const fileSuffix = normalizeGenFileSuffix(splitTypescriptSuffix(file.fileName, true)[1]);
        file.directives.forEach((dirSymbol) => {
            const compMeta = this._metadataResolver.getNonNormalizedDirectiveMetadata(dirSymbol).metadata;
            if (!compMeta.isComponent) {
                return;
            }
            // Note: compMeta is a component and therefore template is non null.
            compMeta.template.styleUrls.forEach((styleUrl) => {
                const normalizedUrl = this._host.resourceNameToFileName(styleUrl, file.fileName);
                if (!normalizedUrl) {
                    throw syntaxError(`Couldn't resolve resource ${styleUrl} relative to ${file.fileName}`);
                }
                const needsShim = (compMeta.template.encapsulation ||
                    this._config.defaultEncapsulation) === ViewEncapsulation.Emulated;
                genFileNames.push(_stylesModuleUrl(normalizedUrl, needsShim, fileSuffix));
                if (this._options.allowEmptyCodegenFiles) {
                    genFileNames.push(_stylesModuleUrl(normalizedUrl, !needsShim, fileSuffix));
                }
            });
        });
        return genFileNames;
    }
    emitBasicStub(genFileName, originalFileName) {
        const outputCtx = this._createOutputContext(genFileName);
        if (genFileName.endsWith('.ngfactory.ts')) {
            if (!originalFileName) {
                throw new Error(`Assertion error: require the original file for .ngfactory.ts stubs. File: ${genFileName}`);
            }
            const originalFile = this._analyzeFile(originalFileName);
            this._createNgFactoryStub(outputCtx, originalFile, 1 /* Basic */);
        }
        else if (genFileName.endsWith('.ngsummary.ts')) {
            if (this._options.enableSummariesForJit) {
                if (!originalFileName) {
                    throw new Error(`Assertion error: require the original file for .ngsummary.ts stubs. File: ${genFileName}`);
                }
                const originalFile = this._analyzeFile(originalFileName);
                _createEmptyStub(outputCtx);
                originalFile.ngModules.forEach(ngModule => {
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
    }
    emitTypeCheckStub(genFileName, originalFileName) {
        const originalFile = this._analyzeFile(originalFileName);
        const outputCtx = this._createOutputContext(genFileName);
        if (genFileName.endsWith('.ngfactory.ts')) {
            this._createNgFactoryStub(outputCtx, originalFile, 2 /* TypeCheck */);
        }
        return outputCtx.statements.length > 0 ?
            this._codegenSourceModule(originalFile.fileName, outputCtx) :
            null;
    }
    loadFilesAsync(fileNames, tsFiles) {
        const files = fileNames.map(fileName => this._analyzeFile(fileName));
        const loadingPromises = [];
        files.forEach(file => file.ngModules.forEach(ngModule => loadingPromises.push(this._metadataResolver.loadNgModuleDirectiveAndPipeMetadata(ngModule.type.reference, false))));
        const analyzedInjectables = tsFiles.map(tsFile => this._analyzeFileForInjectables(tsFile));
        return Promise.all(loadingPromises).then(_ => ({
            analyzedModules: mergeAndValidateNgFiles(files),
            analyzedInjectables: analyzedInjectables,
        }));
    }
    loadFilesSync(fileNames, tsFiles) {
        const files = fileNames.map(fileName => this._analyzeFile(fileName));
        files.forEach(file => file.ngModules.forEach(ngModule => this._metadataResolver.loadNgModuleDirectiveAndPipeMetadata(ngModule.type.reference, true)));
        const analyzedInjectables = tsFiles.map(tsFile => this._analyzeFileForInjectables(tsFile));
        return {
            analyzedModules: mergeAndValidateNgFiles(files),
            analyzedInjectables: analyzedInjectables,
        };
    }
    _createNgFactoryStub(outputCtx, file, emitFlags) {
        let componentId = 0;
        file.ngModules.forEach((ngModuleMeta, ngModuleIndex) => {
            // Note: the code below needs to executed for StubEmitFlags.Basic and StubEmitFlags.TypeCheck,
            // so we don't change the .ngfactory file too much when adding the type-check block.
            // create exports that user code can reference
            this._ngModuleCompiler.createStub(outputCtx, ngModuleMeta.type.reference);
            // add references to the symbols from the metadata.
            // These can be used by the type check block for components,
            // and they also cause TypeScript to include these files into the program too,
            // which will make them part of the analyzedFiles.
            const externalReferences = [
                // Add references that are available from all the modules and imports.
                ...ngModuleMeta.transitiveModule.directives.map(d => d.reference),
                ...ngModuleMeta.transitiveModule.pipes.map(d => d.reference),
                ...ngModuleMeta.importedModules.map(m => m.type.reference),
                ...ngModuleMeta.exportedModules.map(m => m.type.reference),
                // Add references that might be inserted by the template compiler.
                ...this._externalIdentifierReferences([Identifiers.TemplateRef, Identifiers.ElementRef]),
            ];
            const externalReferenceVars = new Map();
            externalReferences.forEach((ref, typeIndex) => {
                externalReferenceVars.set(ref, `_decl${ngModuleIndex}_${typeIndex}`);
            });
            externalReferenceVars.forEach((varName, reference) => {
                outputCtx.statements.push(o.variable(varName)
                    .set(o.NULL_EXPR.cast(o.DYNAMIC_TYPE))
                    .toDeclStmt(o.expressionType(outputCtx.importExpr(reference, /* typeParams */ null, /* useSummaries */ false))));
            });
            if (emitFlags & 2 /* TypeCheck */) {
                // add the type-check block for all components of the NgModule
                ngModuleMeta.declaredDirectives.forEach((dirId) => {
                    const compMeta = this._metadataResolver.getDirectiveMetadata(dirId.reference);
                    if (!compMeta.isComponent) {
                        return;
                    }
                    componentId++;
                    this._createTypeCheckBlock(outputCtx, `${compMeta.type.reference.name}_Host_${componentId}`, ngModuleMeta, this._metadataResolver.getHostComponentMetadata(compMeta), [compMeta.type], externalReferenceVars);
                    this._createTypeCheckBlock(outputCtx, `${compMeta.type.reference.name}_${componentId}`, ngModuleMeta, compMeta, ngModuleMeta.transitiveModule.directives, externalReferenceVars);
                });
            }
        });
        if (outputCtx.statements.length === 0) {
            _createEmptyStub(outputCtx);
        }
    }
    _externalIdentifierReferences(references) {
        const result = [];
        for (let reference of references) {
            const token = createTokenForExternalReference(this.reflector, reference);
            if (token.identifier) {
                result.push(token.identifier.reference);
            }
        }
        return result;
    }
    _createTypeCheckBlock(ctx, componentId, moduleMeta, compMeta, directives, externalReferenceVars) {
        const { template: parsedTemplate, pipes: usedPipes } = this._parseTemplate(compMeta, moduleMeta, directives);
        ctx.statements.push(...this._typeCheckCompiler.compileComponent(componentId, compMeta, parsedTemplate, usedPipes, externalReferenceVars, ctx));
    }
    emitMessageBundle(analyzeResult, locale) {
        const errors = [];
        const htmlParser = new HtmlParser();
        // TODO(vicb): implicit tags & attributes
        const messageBundle = new MessageBundle(htmlParser, [], {}, locale);
        analyzeResult.files.forEach(file => {
            const compMetas = [];
            file.directives.forEach(directiveType => {
                const dirMeta = this._metadataResolver.getDirectiveMetadata(directiveType);
                if (dirMeta && dirMeta.isComponent) {
                    compMetas.push(dirMeta);
                }
            });
            compMetas.forEach(compMeta => {
                const html = compMeta.template.template;
                // Template URL points to either an HTML or TS file depending on whether
                // the file is used with `templateUrl:` or `template:`, respectively.
                const templateUrl = compMeta.template.templateUrl;
                const interpolationConfig = InterpolationConfig.fromArray(compMeta.template.interpolation);
                errors.push(...messageBundle.updateFromTemplate(html, templateUrl, interpolationConfig));
            });
        });
        if (errors.length) {
            throw new Error(errors.map(e => e.toString()).join('\n'));
        }
        return messageBundle;
    }
    emitAllPartialModules({ ngModuleByPipeOrDirective, files }, r3Files) {
        const contextMap = new Map();
        const getContext = (fileName) => {
            if (!contextMap.has(fileName)) {
                contextMap.set(fileName, this._createOutputContext(fileName));
            }
            return contextMap.get(fileName);
        };
        files.forEach(file => this._compilePartialModule(file.fileName, ngModuleByPipeOrDirective, file.directives, file.pipes, file.ngModules, file.injectables, getContext(file.fileName)));
        r3Files.forEach(file => this._compileShallowModules(file.fileName, file.shallowModules, getContext(file.fileName)));
        return Array.from(contextMap.values())
            .map(context => ({
            fileName: context.genFilePath,
            statements: [...context.constantPool.statements, ...context.statements],
        }));
    }
    _compileShallowModules(fileName, shallowModules, context) {
        shallowModules.forEach(module => compileR3Module(context, module, this._injectableCompiler));
    }
    _compilePartialModule(fileName, ngModuleByPipeOrDirective, directives, pipes, ngModules, injectables, context) {
        const errors = [];
        const schemaRegistry = new DomElementSchemaRegistry();
        const hostBindingParser = new BindingParser(this._templateParser.expressionParser, DEFAULT_INTERPOLATION_CONFIG, schemaRegistry, [], errors);
        // Process all components and directives
        directives.forEach(directiveType => {
            const directiveMetadata = this._metadataResolver.getDirectiveMetadata(directiveType);
            if (directiveMetadata.isComponent) {
                const module = ngModuleByPipeOrDirective.get(directiveType);
                module ||
                    error(`Cannot determine the module for component '${identifierName(directiveMetadata.type)}'`);
                let htmlAst = directiveMetadata.template.htmlAst;
                const preserveWhitespaces = directiveMetadata.template.preserveWhitespaces;
                if (!preserveWhitespaces) {
                    htmlAst = removeWhitespaces(htmlAst);
                }
                const render3Ast = htmlAstToRender3Ast(htmlAst.rootNodes, hostBindingParser);
                // Map of StaticType by directive selectors
                const directiveTypeBySel = new Map();
                const directives = module.transitiveModule.directives.map(dir => this._metadataResolver.getDirectiveSummary(dir.reference));
                directives.forEach(directive => {
                    if (directive.selector) {
                        directiveTypeBySel.set(directive.selector, directive.type.reference);
                    }
                });
                // Map of StaticType by pipe names
                const pipeTypeByName = new Map();
                const pipes = module.transitiveModule.pipes.map(pipe => this._metadataResolver.getPipeSummary(pipe.reference));
                pipes.forEach(pipe => { pipeTypeByName.set(pipe.name, pipe.type.reference); });
                compileR3Component(context, directiveMetadata, render3Ast, this.reflector, hostBindingParser, directiveTypeBySel, pipeTypeByName);
            }
            else {
                compileR3Directive(context, directiveMetadata, this.reflector, hostBindingParser);
            }
        });
        pipes.forEach(pipeType => {
            const pipeMetadata = this._metadataResolver.getPipeMetadata(pipeType);
            if (pipeMetadata) {
                compileR3Pipe(context, pipeMetadata, this.reflector);
            }
        });
        injectables.forEach(injectable => this._injectableCompiler.compile(injectable, context));
    }
    emitAllPartialModules2(files) {
        // Using reduce like this is a select many pattern (where map is a select pattern)
        return files.reduce((r, file) => {
            r.push(...this._emitPartialModule2(file.fileName, file.injectables));
            return r;
        }, []);
    }
    _emitPartialModule2(fileName, injectables) {
        const context = this._createOutputContext(fileName);
        injectables.forEach(injectable => this._injectableCompiler.compile(injectable, context));
        if (context.statements && context.statements.length > 0) {
            return [{ fileName, statements: [...context.constantPool.statements, ...context.statements] }];
        }
        return [];
    }
    emitAllImpls(analyzeResult) {
        const { ngModuleByPipeOrDirective, files } = analyzeResult;
        const sourceModules = files.map(file => this._compileImplFile(file.fileName, ngModuleByPipeOrDirective, file.directives, file.pipes, file.ngModules, file.injectables));
        return flatten(sourceModules);
    }
    _compileImplFile(srcFileUrl, ngModuleByPipeOrDirective, directives, pipes, ngModules, injectables) {
        const fileSuffix = normalizeGenFileSuffix(splitTypescriptSuffix(srcFileUrl, true)[1]);
        const generatedFiles = [];
        const outputCtx = this._createOutputContext(ngfactoryFilePath(srcFileUrl, true));
        generatedFiles.push(...this._createSummary(srcFileUrl, directives, pipes, ngModules, injectables, outputCtx));
        // compile all ng modules
        ngModules.forEach((ngModuleMeta) => this._compileModule(outputCtx, ngModuleMeta));
        // compile components
        directives.forEach((dirType) => {
            const compMeta = this._metadataResolver.getDirectiveMetadata(dirType);
            if (!compMeta.isComponent) {
                return;
            }
            const ngModule = ngModuleByPipeOrDirective.get(dirType);
            if (!ngModule) {
                throw new Error(`Internal Error: cannot determine the module for component ${identifierName(compMeta.type)}!`);
            }
            // compile styles
            const componentStylesheet = this._styleCompiler.compileComponent(outputCtx, compMeta);
            // Note: compMeta is a component and therefore template is non null.
            compMeta.template.externalStylesheets.forEach((stylesheetMeta) => {
                // Note: fill non shim and shim style files as they might
                // be shared by component with and without ViewEncapsulation.
                const shim = this._styleCompiler.needsStyleShim(compMeta);
                generatedFiles.push(this._codegenStyles(srcFileUrl, compMeta, stylesheetMeta, shim, fileSuffix));
                if (this._options.allowEmptyCodegenFiles) {
                    generatedFiles.push(this._codegenStyles(srcFileUrl, compMeta, stylesheetMeta, !shim, fileSuffix));
                }
            });
            // compile components
            const compViewVars = this._compileComponent(outputCtx, compMeta, ngModule, ngModule.transitiveModule.directives, componentStylesheet, fileSuffix);
            this._compileComponentFactory(outputCtx, compMeta, ngModule, fileSuffix);
        });
        if (outputCtx.statements.length > 0 || this._options.allowEmptyCodegenFiles) {
            const srcModule = this._codegenSourceModule(srcFileUrl, outputCtx);
            generatedFiles.unshift(srcModule);
        }
        return generatedFiles;
    }
    _createSummary(srcFileName, directives, pipes, ngModules, injectables, ngFactoryCtx) {
        const symbolSummaries = this._symbolResolver.getSymbolsOf(srcFileName)
            .map(symbol => this._symbolResolver.resolveSymbol(symbol));
        const typeData = [
            ...ngModules.map(meta => ({
                summary: this._metadataResolver.getNgModuleSummary(meta.type.reference),
                metadata: this._metadataResolver.getNgModuleMetadata(meta.type.reference)
            })),
            ...directives.map(ref => ({
                summary: this._metadataResolver.getDirectiveSummary(ref),
                metadata: this._metadataResolver.getDirectiveMetadata(ref)
            })),
            ...pipes.map(ref => ({
                summary: this._metadataResolver.getPipeSummary(ref),
                metadata: this._metadataResolver.getPipeMetadata(ref)
            })),
            ...injectables.map(ref => ({
                summary: this._metadataResolver.getInjectableSummary(ref.symbol),
                metadata: this._metadataResolver.getInjectableSummary(ref.symbol).type
            }))
        ];
        const forJitOutputCtx = this._options.enableSummariesForJit ?
            this._createOutputContext(summaryForJitFileName(srcFileName, true)) :
            null;
        const { json, exportAs } = serializeSummaries(srcFileName, forJitOutputCtx, this._summaryResolver, this._symbolResolver, symbolSummaries, typeData);
        exportAs.forEach((entry) => {
            ngFactoryCtx.statements.push(o.variable(entry.exportAs).set(ngFactoryCtx.importExpr(entry.symbol)).toDeclStmt(null, [
                o.StmtModifier.Exported
            ]));
        });
        const summaryJson = new GeneratedFile(srcFileName, summaryFileName(srcFileName), json);
        const result = [summaryJson];
        if (forJitOutputCtx) {
            result.push(this._codegenSourceModule(srcFileName, forJitOutputCtx));
        }
        return result;
    }
    _compileModule(outputCtx, ngModule) {
        const providers = [];
        if (this._options.locale) {
            const normalizedLocale = this._options.locale.replace(/_/g, '-');
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
    }
    _compileComponentFactory(outputCtx, compMeta, ngModule, fileSuffix) {
        const hostMeta = this._metadataResolver.getHostComponentMetadata(compMeta);
        const hostViewFactoryVar = this._compileComponent(outputCtx, hostMeta, ngModule, [compMeta.type], null, fileSuffix)
            .viewClassVar;
        const compFactoryVar = componentFactoryName(compMeta.type.reference);
        const inputsExprs = [];
        for (let propName in compMeta.inputs) {
            const templateName = compMeta.inputs[propName];
            // Don't quote so that the key gets minified...
            inputsExprs.push(new o.LiteralMapEntry(propName, o.literal(templateName), false));
        }
        const outputsExprs = [];
        for (let propName in compMeta.outputs) {
            const templateName = compMeta.outputs[propName];
            // Don't quote so that the key gets minified...
            outputsExprs.push(new o.LiteralMapEntry(propName, o.literal(templateName), false));
        }
        outputCtx.statements.push(o.variable(compFactoryVar)
            .set(o.importExpr(Identifiers.createComponentFactory).callFn([
            o.literal(compMeta.selector), outputCtx.importExpr(compMeta.type.reference),
            o.variable(hostViewFactoryVar), new o.LiteralMapExpr(inputsExprs),
            new o.LiteralMapExpr(outputsExprs),
            o.literalArr(compMeta.template.ngContentSelectors.map(selector => o.literal(selector)))
        ]))
            .toDeclStmt(o.importType(Identifiers.ComponentFactory, [o.expressionType(outputCtx.importExpr(compMeta.type.reference))], [o.TypeModifier.Const]), [o.StmtModifier.Final, o.StmtModifier.Exported]));
    }
    _compileComponent(outputCtx, compMeta, ngModule, directiveIdentifiers, componentStyles, fileSuffix) {
        const { template: parsedTemplate, pipes: usedPipes } = this._parseTemplate(compMeta, ngModule, directiveIdentifiers);
        const stylesExpr = componentStyles ? o.variable(componentStyles.stylesVar) : o.literalArr([]);
        const viewResult = this._viewCompiler.compileComponent(outputCtx, compMeta, parsedTemplate, stylesExpr, usedPipes);
        if (componentStyles) {
            _resolveStyleStatements(this._symbolResolver, componentStyles, this._styleCompiler.needsStyleShim(compMeta), fileSuffix);
        }
        return viewResult;
    }
    _parseTemplate(compMeta, ngModule, directiveIdentifiers) {
        if (this._templateAstCache.has(compMeta.type.reference)) {
            return this._templateAstCache.get(compMeta.type.reference);
        }
        const preserveWhitespaces = compMeta.template.preserveWhitespaces;
        const directives = directiveIdentifiers.map(dir => this._metadataResolver.getDirectiveSummary(dir.reference));
        const pipes = ngModule.transitiveModule.pipes.map(pipe => this._metadataResolver.getPipeSummary(pipe.reference));
        const result = this._templateParser.parse(compMeta, compMeta.template.htmlAst, directives, pipes, ngModule.schemas, templateSourceUrl(ngModule.type, compMeta, compMeta.template), preserveWhitespaces);
        this._templateAstCache.set(compMeta.type.reference, result);
        return result;
    }
    _createOutputContext(genFilePath) {
        const importExpr = (symbol, typeParams = null, useSummaries = true) => {
            if (!(symbol instanceof StaticSymbol)) {
                throw new Error(`Internal error: unknown identifier ${JSON.stringify(symbol)}`);
            }
            const arity = this._symbolResolver.getTypeArity(symbol) || 0;
            const { filePath, name, members } = this._symbolResolver.getImportAs(symbol, useSummaries) || symbol;
            const importModule = this._fileNameToModuleName(filePath, genFilePath);
            // It should be good enough to compare filePath to genFilePath and if they are equal
            // there is a self reference. However, ngfactory files generate to .ts but their
            // symbols have .d.ts so a simple compare is insufficient. They should be canonical
            // and is tracked by #17705.
            const selfReference = this._fileNameToModuleName(genFilePath, genFilePath);
            const moduleName = importModule === selfReference ? null : importModule;
            // If we are in a type expression that refers to a generic type then supply
            // the required type parameters. If there were not enough type parameters
            // supplied, supply any as the type. Outside a type expression the reference
            // should not supply type parameters and be treated as a simple value reference
            // to the constructor function itself.
            const suppliedTypeParams = typeParams || [];
            const missingTypeParamsCount = arity - suppliedTypeParams.length;
            const allTypeParams = suppliedTypeParams.concat(new Array(missingTypeParamsCount).fill(o.DYNAMIC_TYPE));
            return members.reduce((expr, memberName) => expr.prop(memberName), o.importExpr(new o.ExternalReference(moduleName, name, null), allTypeParams));
        };
        return { statements: [], genFilePath, importExpr, constantPool: new ConstantPool() };
    }
    _fileNameToModuleName(importedFilePath, containingFilePath) {
        return this._summaryResolver.getKnownModuleName(importedFilePath) ||
            this._symbolResolver.getKnownModuleName(importedFilePath) ||
            this._host.fileNameToModuleName(importedFilePath, containingFilePath);
    }
    _codegenStyles(srcFileUrl, compMeta, stylesheetMetadata, isShimmed, fileSuffix) {
        const outputCtx = this._createOutputContext(_stylesModuleUrl(stylesheetMetadata.moduleUrl, isShimmed, fileSuffix));
        const compiledStylesheet = this._styleCompiler.compileStyles(outputCtx, compMeta, stylesheetMetadata, isShimmed);
        _resolveStyleStatements(this._symbolResolver, compiledStylesheet, isShimmed, fileSuffix);
        return this._codegenSourceModule(srcFileUrl, outputCtx);
    }
    _codegenSourceModule(srcFileUrl, ctx) {
        return new GeneratedFile(srcFileUrl, ctx.genFilePath, ctx.statements);
    }
    listLazyRoutes(entryRoute, analyzedModules) {
        const self = this;
        if (entryRoute) {
            const symbol = parseLazyRoute(entryRoute, this.reflector).referencedModule;
            return visitLazyRoute(symbol);
        }
        else if (analyzedModules) {
            const allLazyRoutes = [];
            for (const ngModule of analyzedModules.ngModules) {
                const lazyRoutes = listLazyRoutes(ngModule, this.reflector);
                for (const lazyRoute of lazyRoutes) {
                    allLazyRoutes.push(lazyRoute);
                }
            }
            return allLazyRoutes;
        }
        else {
            throw new Error(`Either route or analyzedModules has to be specified!`);
        }
        function visitLazyRoute(symbol, seenRoutes = new Set(), allLazyRoutes = []) {
            // Support pointing to default exports, but stop recursing there,
            // as the StaticReflector does not yet support default exports.
            if (seenRoutes.has(symbol) || !symbol.name) {
                return allLazyRoutes;
            }
            seenRoutes.add(symbol);
            const lazyRoutes = listLazyRoutes(self._metadataResolver.getNgModuleMetadata(symbol, true), self.reflector);
            for (const lazyRoute of lazyRoutes) {
                allLazyRoutes.push(lazyRoute);
                visitLazyRoute(lazyRoute.referencedModule, seenRoutes, allLazyRoutes);
            }
            return allLazyRoutes;
        }
    }
}
function _createEmptyStub(outputCtx) {
    // Note: We need to produce at least one import statement so that
    // TypeScript knows that the file is an es6 module. Otherwise our generated
    // exports / imports won't be emitted properly by TypeScript.
    outputCtx.statements.push(o.importExpr(Identifiers.ComponentFactory).toStmt());
}
function _resolveStyleStatements(symbolResolver, compileResult, needsShim, fileSuffix) {
    compileResult.dependencies.forEach((dep) => {
        dep.setValue(symbolResolver.getStaticSymbol(_stylesModuleUrl(dep.moduleUrl, needsShim, fileSuffix), dep.name));
    });
}
function _stylesModuleUrl(stylesheetUrl, shim, suffix) {
    return `${stylesheetUrl}${shim ? '.shim' : ''}.ngstyle${suffix}`;
}
export function analyzeNgModules(fileNames, host, staticSymbolResolver, metadataResolver) {
    const files = _analyzeFilesIncludingNonProgramFiles(fileNames, host, staticSymbolResolver, metadataResolver);
    return mergeAnalyzedFiles(files);
}
export function analyzeAndValidateNgModules(fileNames, host, staticSymbolResolver, metadataResolver) {
    return validateAnalyzedModules(analyzeNgModules(fileNames, host, staticSymbolResolver, metadataResolver));
}
function validateAnalyzedModules(analyzedModules) {
    if (analyzedModules.symbolsMissingModule && analyzedModules.symbolsMissingModule.length) {
        const messages = analyzedModules.symbolsMissingModule.map(s => `Cannot determine the module for class ${s.name} in ${s.filePath}! Add ${s.name} to the NgModule to fix it.`);
        throw syntaxError(messages.join('\n'));
    }
    return analyzedModules;
}
// Analyzes all of the program files,
// including files that are not part of the program
// but are referenced by an NgModule.
function _analyzeFilesIncludingNonProgramFiles(fileNames, host, staticSymbolResolver, metadataResolver) {
    const seenFiles = new Set();
    const files = [];
    const visitFile = (fileName) => {
        if (seenFiles.has(fileName) || !host.isSourceFile(fileName)) {
            return false;
        }
        seenFiles.add(fileName);
        const analyzedFile = analyzeFile(host, staticSymbolResolver, metadataResolver, fileName);
        files.push(analyzedFile);
        analyzedFile.ngModules.forEach(ngModule => {
            ngModule.transitiveModule.modules.forEach(modMeta => visitFile(modMeta.reference.filePath));
        });
    };
    fileNames.forEach((fileName) => visitFile(fileName));
    return files;
}
export function analyzeFile(host, staticSymbolResolver, metadataResolver, fileName) {
    const directives = [];
    const pipes = [];
    const injectables = [];
    const ngModules = [];
    const hasDecorators = staticSymbolResolver.hasDecorators(fileName);
    let exportsNonSourceFiles = false;
    // Don't analyze .d.ts files that have no decorators as a shortcut
    // to speed up the analysis. This prevents us from
    // resolving the references in these files.
    // Note: exportsNonSourceFiles is only needed when compiling with summaries,
    // which is not the case when .d.ts files are treated as input files.
    if (!fileName.endsWith('.d.ts') || hasDecorators) {
        staticSymbolResolver.getSymbolsOf(fileName).forEach((symbol) => {
            const resolvedSymbol = staticSymbolResolver.resolveSymbol(symbol);
            const symbolMeta = resolvedSymbol.metadata;
            if (!symbolMeta || symbolMeta.__symbolic === 'error') {
                return;
            }
            let isNgSymbol = false;
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
                    const ngModule = metadataResolver.getNgModuleMetadata(symbol, false);
                    if (ngModule) {
                        isNgSymbol = true;
                        ngModules.push(ngModule);
                    }
                }
                else if (metadataResolver.isInjectable(symbol)) {
                    isNgSymbol = true;
                    const injectable = metadataResolver.getInjectableMetadata(symbol, null, false);
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
        fileName, directives, pipes, ngModules, injectables, exportsNonSourceFiles,
    };
}
export function analyzeFileForInjectables(host, staticSymbolResolver, metadataResolver, fileName) {
    const injectables = [];
    const shallowModules = [];
    if (staticSymbolResolver.hasDecorators(fileName)) {
        staticSymbolResolver.getSymbolsOf(fileName).forEach((symbol) => {
            const resolvedSymbol = staticSymbolResolver.resolveSymbol(symbol);
            const symbolMeta = resolvedSymbol.metadata;
            if (!symbolMeta || symbolMeta.__symbolic === 'error') {
                return;
            }
            if (symbolMeta.__symbolic === 'class') {
                if (metadataResolver.isInjectable(symbol)) {
                    const injectable = metadataResolver.getInjectableMetadata(symbol, null, false);
                    if (injectable) {
                        injectables.push(injectable);
                    }
                }
                else if (metadataResolver.isNgModule(symbol)) {
                    const module = metadataResolver.getShallowModuleMetadata(symbol);
                    if (module) {
                        shallowModules.push(module);
                    }
                }
            }
        });
    }
    return { fileName, injectables, shallowModules };
}
function isValueExportingNonSourceFile(host, metadata) {
    let exportsNonSourceFiles = false;
    class Visitor {
        visitArray(arr, context) { arr.forEach(v => visitValue(v, this, context)); }
        visitStringMap(map, context) {
            Object.keys(map).forEach((key) => visitValue(map[key], this, context));
        }
        visitPrimitive(value, context) { }
        visitOther(value, context) {
            if (value instanceof StaticSymbol && !host.isSourceFile(value.filePath)) {
                exportsNonSourceFiles = true;
            }
        }
    }
    visitValue(metadata, new Visitor(), null);
    return exportsNonSourceFiles;
}
export function mergeAnalyzedFiles(analyzedFiles) {
    const allNgModules = [];
    const ngModuleByPipeOrDirective = new Map();
    const allPipesAndDirectives = new Set();
    analyzedFiles.forEach(af => {
        af.ngModules.forEach(ngModule => {
            allNgModules.push(ngModule);
            ngModule.declaredDirectives.forEach(d => ngModuleByPipeOrDirective.set(d.reference, ngModule));
            ngModule.declaredPipes.forEach(p => ngModuleByPipeOrDirective.set(p.reference, ngModule));
        });
        af.directives.forEach(d => allPipesAndDirectives.add(d));
        af.pipes.forEach(p => allPipesAndDirectives.add(p));
    });
    const symbolsMissingModule = [];
    allPipesAndDirectives.forEach(ref => {
        if (!ngModuleByPipeOrDirective.has(ref)) {
            symbolsMissingModule.push(ref);
        }
    });
    return {
        ngModules: allNgModules,
        ngModuleByPipeOrDirective,
        symbolsMissingModule,
        files: analyzedFiles
    };
}
function mergeAndValidateNgFiles(files) {
    return validateAnalyzedModules(mergeAnalyzedFiles(files));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvYW90L2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBOFEsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRWxYLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDMUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxXQUFXLEVBQUUsK0JBQStCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUk1RSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFDLDRCQUE0QixFQUFFLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFHcEcsT0FBTyxLQUFLLENBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUUxQyxPQUFPLEVBQUMsMEJBQTBCLElBQUksZUFBZSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDNUYsT0FBTyxFQUFDLHNCQUFzQixJQUFJLGFBQWEsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3BGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQywyQkFBMkIsSUFBSSxrQkFBa0IsRUFBRSwyQkFBMkIsSUFBSSxrQkFBa0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzlJLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBRy9FLE9BQU8sRUFB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QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxvQkFBb0IsR0FBbUIsRUFBRSxDQUFDO0lBQ2hELHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNsQyxJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTztRQUNMLFNBQVMsRUFBRSxZQUFZO1FBQ3ZCLHlCQUF5QjtRQUN6QixvQkFBb0I7UUFDcEIsS0FBSyxFQUFFLGFBQWE7S0FDckIsQ0FBQztBQUNKLENBQUM7QUFFRCxpQ0FBaUMsS0FBdUI7SUFDdEQsT0FBTyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzVELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLCBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhLCBDb21waWxlSW5qZWN0YWJsZU1ldGFkYXRhLCBDb21waWxlTmdNb2R1bGVNZXRhZGF0YSwgQ29tcGlsZVBpcGVNZXRhZGF0YSwgQ29tcGlsZVBpcGVTdW1tYXJ5LCBDb21waWxlUHJvdmlkZXJNZXRhZGF0YSwgQ29tcGlsZVNoYWxsb3dNb2R1bGVNZXRhZGF0YSwgQ29tcGlsZVN0eWxlc2hlZXRNZXRhZGF0YSwgQ29tcGlsZVR5cGVNZXRhZGF0YSwgQ29tcGlsZVR5cGVTdW1tYXJ5LCBjb21wb25lbnRGYWN0b3J5TmFtZSwgZmxhdHRlbiwgaWRlbnRpZmllck5hbWUsIHRlbXBsYXRlU291cmNlVXJsfSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCB7Q29tcGlsZXJDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge0NvbnN0YW50UG9vbH0gZnJvbSAnLi4vY29uc3RhbnRfcG9vbCc7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICcuLi9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUJ1bmRsZX0gZnJvbSAnLi4vaTE4bi9tZXNzYWdlX2J1bmRsZSc7XG5pbXBvcnQge0lkZW50aWZpZXJzLCBjcmVhdGVUb2tlbkZvckV4dGVybmFsUmVmZXJlbmNlfSBmcm9tICcuLi9pZGVudGlmaWVycyc7XG5pbXBvcnQge0luamVjdGFibGVDb21waWxlcn0gZnJvbSAnLi4vaW5qZWN0YWJsZV9jb21waWxlcic7XG5pbXBvcnQge0NvbXBpbGVNZXRhZGF0YVJlc29sdmVyfSBmcm9tICcuLi9tZXRhZGF0YV9yZXNvbHZlcic7XG5pbXBvcnQgKiBhcyBodG1sIGZyb20gJy4uL21sX3BhcnNlci9hc3QnO1xuaW1wb3J0IHtIdG1sUGFyc2VyfSBmcm9tICcuLi9tbF9wYXJzZXIvaHRtbF9wYXJzZXInO1xuaW1wb3J0IHtyZW1vdmVXaGl0ZXNwYWNlc30gZnJvbSAnLi4vbWxfcGFyc2VyL2h0bWxfd2hpdGVzcGFjZXMnO1xuaW1wb3J0IHtERUZBVUxUX0lOVEVSUE9MQVRJT05fQ09ORklHLCBJbnRlcnBvbGF0aW9uQ29uZmlnfSBmcm9tICcuLi9tbF9wYXJzZXIvaW50ZXJwb2xhdGlvbl9jb25maWcnO1xuaW1wb3J0IHtOZ01vZHVsZUNvbXBpbGVyfSBmcm9tICcuLi9uZ19tb2R1bGVfY29tcGlsZXInO1xuaW1wb3J0IHtPdXRwdXRFbWl0dGVyfSBmcm9tICcuLi9vdXRwdXQvYWJzdHJhY3RfZW1pdHRlcic7XG5pbXBvcnQgKiBhcyBvIGZyb20gJy4uL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7UGFyc2VFcnJvcn0gZnJvbSAnLi4vcGFyc2VfdXRpbCc7XG5pbXBvcnQge2NvbXBpbGVOZ01vZHVsZUZyb21SZW5kZXIyIGFzIGNvbXBpbGVSM01vZHVsZX0gZnJvbSAnLi4vcmVuZGVyMy9yM19tb2R1bGVfY29tcGlsZXInO1xuaW1wb3J0IHtjb21waWxlUGlwZUZyb21SZW5kZXIyIGFzIGNvbXBpbGVSM1BpcGV9IGZyb20gJy4uL3JlbmRlcjMvcjNfcGlwZV9jb21waWxlcic7XG5pbXBvcnQge2h0bWxBc3RUb1JlbmRlcjNBc3R9IGZyb20gJy4uL3JlbmRlcjMvcjNfdGVtcGxhdGVfdHJhbnNmb3JtJztcbmltcG9ydCB7Y29tcGlsZUNvbXBvbmVudEZyb21SZW5kZXIyIGFzIGNvbXBpbGVSM0NvbXBvbmVudCwgY29tcGlsZURpcmVjdGl2ZUZyb21SZW5kZXIyIGFzIGNvbXBpbGVSM0RpcmVjdGl2ZX0gZnJvbSAnLi4vcmVuZGVyMy92aWV3L2NvbXBpbGVyJztcbmltcG9ydCB7RG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5fSBmcm9tICcuLi9zY2hlbWEvZG9tX2VsZW1lbnRfc2NoZW1hX3JlZ2lzdHJ5JztcbmltcG9ydCB7Q29tcGlsZWRTdHlsZXNoZWV0LCBTdHlsZUNvbXBpbGVyfSBmcm9tICcuLi9zdHlsZV9jb21waWxlcic7XG5pbXBvcnQge1N1bW1hcnlSZXNvbHZlcn0gZnJvbSAnLi4vc3VtbWFyeV9yZXNvbHZlcic7XG5pbXBvcnQge0JpbmRpbmdQYXJzZXJ9IGZyb20gJy4uL3RlbXBsYXRlX3BhcnNlci9iaW5kaW5nX3BhcnNlcic7XG5pbXBvcnQge1RlbXBsYXRlQXN0fSBmcm9tICcuLi90ZW1wbGF0ZV9wYXJzZXIvdGVtcGxhdGVfYXN0JztcbmltcG9ydCB7VGVtcGxhdGVQYXJzZXJ9IGZyb20gJy4uL3RlbXBsYXRlX3BhcnNlci90ZW1wbGF0ZV9wYXJzZXInO1xuaW1wb3J0IHtPdXRwdXRDb250ZXh0LCBWYWx1ZVZpc2l0b3IsIGVycm9yLCBzeW50YXhFcnJvciwgdmlzaXRWYWx1ZX0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge1R5cGVDaGVja0NvbXBpbGVyfSBmcm9tICcuLi92aWV3X2NvbXBpbGVyL3R5cGVfY2hlY2tfY29tcGlsZXInO1xuaW1wb3J0IHtWaWV3Q29tcGlsZVJlc3VsdCwgVmlld0NvbXBpbGVyfSBmcm9tICcuLi92aWV3X2NvbXBpbGVyL3ZpZXdfY29tcGlsZXInO1xuXG5pbXBvcnQge0FvdENvbXBpbGVySG9zdH0gZnJvbSAnLi9jb21waWxlcl9ob3N0JztcbmltcG9ydCB7QW90Q29tcGlsZXJPcHRpb25zfSBmcm9tICcuL2NvbXBpbGVyX29wdGlvbnMnO1xuaW1wb3J0IHtHZW5lcmF0ZWRGaWxlfSBmcm9tICcuL2dlbmVyYXRlZF9maWxlJztcbmltcG9ydCB7TGF6eVJvdXRlLCBsaXN0TGF6eVJvdXRlcywgcGFyc2VMYXp5Um91dGV9IGZyb20gJy4vbGF6eV9yb3V0ZXMnO1xuaW1wb3J0IHtQYXJ0aWFsTW9kdWxlfSBmcm9tICcuL3BhcnRpYWxfbW9kdWxlJztcbmltcG9ydCB7U3RhdGljUmVmbGVjdG9yfSBmcm9tICcuL3N0YXRpY19yZWZsZWN0b3InO1xuaW1wb3J0IHtTdGF0aWNTeW1ib2x9IGZyb20gJy4vc3RhdGljX3N5bWJvbCc7XG5pbXBvcnQge1N0YXRpY1N5bWJvbFJlc29sdmVyfSBmcm9tICcuL3N0YXRpY19zeW1ib2xfcmVzb2x2ZXInO1xuaW1wb3J0IHtjcmVhdGVGb3JKaXRTdHViLCBzZXJpYWxpemVTdW1tYXJpZXN9IGZyb20gJy4vc3VtbWFyeV9zZXJpYWxpemVyJztcbmltcG9ydCB7bmdmYWN0b3J5RmlsZVBhdGgsIG5vcm1hbGl6ZUdlbkZpbGVTdWZmaXgsIHNwbGl0VHlwZXNjcmlwdFN1ZmZpeCwgc3VtbWFyeUZpbGVOYW1lLCBzdW1tYXJ5Rm9ySml0RmlsZU5hbWV9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IGVudW0gU3R1YkVtaXRGbGFncyB7IEJhc2ljID0gMSA8PCAwLCBUeXBlQ2hlY2sgPSAxIDw8IDEsIEFsbCA9IFR5cGVDaGVjayB8IEJhc2ljIH1cblxuZXhwb3J0IGNsYXNzIEFvdENvbXBpbGVyIHtcbiAgcHJpdmF0ZSBfdGVtcGxhdGVBc3RDYWNoZSA9XG4gICAgICBuZXcgTWFwPFN0YXRpY1N5bWJvbCwge3RlbXBsYXRlOiBUZW1wbGF0ZUFzdFtdLCBwaXBlczogQ29tcGlsZVBpcGVTdW1tYXJ5W119PigpO1xuICBwcml2YXRlIF9hbmFseXplZEZpbGVzID0gbmV3IE1hcDxzdHJpbmcsIE5nQW5hbHl6ZWRGaWxlPigpO1xuICBwcml2YXRlIF9hbmFseXplZEZpbGVzRm9ySW5qZWN0YWJsZXMgPSBuZXcgTWFwPHN0cmluZywgTmdBbmFseXplZEZpbGVXaXRoSW5qZWN0YWJsZXM+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9jb25maWc6IENvbXBpbGVyQ29uZmlnLCBwcml2YXRlIF9vcHRpb25zOiBBb3RDb21waWxlck9wdGlvbnMsXG4gICAgICBwcml2YXRlIF9ob3N0OiBBb3RDb21waWxlckhvc3QsIHJlYWRvbmx5IHJlZmxlY3RvcjogU3RhdGljUmVmbGVjdG9yLFxuICAgICAgcHJpdmF0ZSBfbWV0YWRhdGFSZXNvbHZlcjogQ29tcGlsZU1ldGFkYXRhUmVzb2x2ZXIsIHByaXZhdGUgX3RlbXBsYXRlUGFyc2VyOiBUZW1wbGF0ZVBhcnNlcixcbiAgICAgIHByaXZhdGUgX3N0eWxlQ29tcGlsZXI6IFN0eWxlQ29tcGlsZXIsIHByaXZhdGUgX3ZpZXdDb21waWxlcjogVmlld0NvbXBpbGVyLFxuICAgICAgcHJpdmF0ZSBfdHlwZUNoZWNrQ29tcGlsZXI6IFR5cGVDaGVja0NvbXBpbGVyLCBwcml2YXRlIF9uZ01vZHVsZUNvbXBpbGVyOiBOZ01vZHVsZUNvbXBpbGVyLFxuICAgICAgcHJpdmF0ZSBfaW5qZWN0YWJsZUNvbXBpbGVyOiBJbmplY3RhYmxlQ29tcGlsZXIsIHByaXZhdGUgX291dHB1dEVtaXR0ZXI6IE91dHB1dEVtaXR0ZXIsXG4gICAgICBwcml2YXRlIF9zdW1tYXJ5UmVzb2x2ZXI6IFN1bW1hcnlSZXNvbHZlcjxTdGF0aWNTeW1ib2w+LFxuICAgICAgcHJpdmF0ZSBfc3ltYm9sUmVzb2x2ZXI6IFN0YXRpY1N5bWJvbFJlc29sdmVyKSB7fVxuXG4gIGNsZWFyQ2FjaGUoKSB7IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuY2xlYXJDYWNoZSgpOyB9XG5cbiAgYW5hbHl6ZU1vZHVsZXNTeW5jKHJvb3RGaWxlczogc3RyaW5nW10pOiBOZ0FuYWx5emVkTW9kdWxlcyB7XG4gICAgY29uc3QgYW5hbHl6ZVJlc3VsdCA9IGFuYWx5emVBbmRWYWxpZGF0ZU5nTW9kdWxlcyhcbiAgICAgICAgcm9vdEZpbGVzLCB0aGlzLl9ob3N0LCB0aGlzLl9zeW1ib2xSZXNvbHZlciwgdGhpcy5fbWV0YWRhdGFSZXNvbHZlcik7XG4gICAgYW5hbHl6ZVJlc3VsdC5uZ01vZHVsZXMuZm9yRWFjaChcbiAgICAgICAgbmdNb2R1bGUgPT4gdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5sb2FkTmdNb2R1bGVEaXJlY3RpdmVBbmRQaXBlTWV0YWRhdGEoXG4gICAgICAgICAgICBuZ01vZHVsZS50eXBlLnJlZmVyZW5jZSwgdHJ1ZSkpO1xuICAgIHJldHVybiBhbmFseXplUmVzdWx0O1xuICB9XG5cbiAgYW5hbHl6ZU1vZHVsZXNBc3luYyhyb290RmlsZXM6IHN0cmluZ1tdKTogUHJvbWlzZTxOZ0FuYWx5emVkTW9kdWxlcz4ge1xuICAgIGNvbnN0IGFuYWx5emVSZXN1bHQgPSBhbmFseXplQW5kVmFsaWRhdGVOZ01vZHVsZXMoXG4gICAgICAgIHJvb3RGaWxlcywgdGhpcy5faG9zdCwgdGhpcy5fc3ltYm9sUmVzb2x2ZXIsIHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIpO1xuICAgIHJldHVybiBQcm9taXNlXG4gICAgICAgIC5hbGwoYW5hbHl6ZVJlc3VsdC5uZ01vZHVsZXMubWFwKFxuICAgICAgICAgICAgbmdNb2R1bGUgPT4gdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5sb2FkTmdNb2R1bGVEaXJlY3RpdmVBbmRQaXBlTWV0YWRhdGEoXG4gICAgICAgICAgICAgICAgbmdNb2R1bGUudHlwZS5yZWZlcmVuY2UsIGZhbHNlKSkpXG4gICAgICAgIC50aGVuKCgpID0+IGFuYWx5emVSZXN1bHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYW5hbHl6ZUZpbGUoZmlsZU5hbWU6IHN0cmluZyk6IE5nQW5hbHl6ZWRGaWxlIHtcbiAgICBsZXQgYW5hbHl6ZWRGaWxlID0gdGhpcy5fYW5hbHl6ZWRGaWxlcy5nZXQoZmlsZU5hbWUpO1xuICAgIGlmICghYW5hbHl6ZWRGaWxlKSB7XG4gICAgICBhbmFseXplZEZpbGUgPVxuICAgICAgICAgIGFuYWx5emVGaWxlKHRoaXMuX2hvc3QsIHRoaXMuX3N5bWJvbFJlc29sdmVyLCB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLCBmaWxlTmFtZSk7XG4gICAgICB0aGlzLl9hbmFseXplZEZpbGVzLnNldChmaWxlTmFtZSwgYW5hbHl6ZWRGaWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIGFuYWx5emVkRmlsZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FuYWx5emVGaWxlRm9ySW5qZWN0YWJsZXMoZmlsZU5hbWU6IHN0cmluZyk6IE5nQW5hbHl6ZWRGaWxlV2l0aEluamVjdGFibGVzIHtcbiAgICBsZXQgYW5hbHl6ZWRGaWxlID0gdGhpcy5fYW5hbHl6ZWRGaWxlc0ZvckluamVjdGFibGVzLmdldChmaWxlTmFtZSk7XG4gICAgaWYgKCFhbmFseXplZEZpbGUpIHtcbiAgICAgIGFuYWx5emVkRmlsZSA9IGFuYWx5emVGaWxlRm9ySW5qZWN0YWJsZXMoXG4gICAgICAgICAgdGhpcy5faG9zdCwgdGhpcy5fc3ltYm9sUmVzb2x2ZXIsIHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIsIGZpbGVOYW1lKTtcbiAgICAgIHRoaXMuX2FuYWx5emVkRmlsZXNGb3JJbmplY3RhYmxlcy5zZXQoZmlsZU5hbWUsIGFuYWx5emVkRmlsZSk7XG4gICAgfVxuICAgIHJldHVybiBhbmFseXplZEZpbGU7XG4gIH1cblxuICBmaW5kR2VuZXJhdGVkRmlsZU5hbWVzKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgZ2VuRmlsZU5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IGZpbGUgPSB0aGlzLl9hbmFseXplRmlsZShmaWxlTmFtZSk7XG4gICAgLy8gTWFrZSBzdXJlIHdlIGNyZWF0ZSBhIC5uZ2ZhY3RvcnkgaWYgd2UgaGF2ZSBhIGluamVjdGFibGUvZGlyZWN0aXZlL3BpcGUvTmdNb2R1bGVcbiAgICAvLyBvciBhIHJlZmVyZW5jZSB0byBhIG5vbiBzb3VyY2UgZmlsZS5cbiAgICAvLyBOb3RlOiBUaGlzIGlzIG92ZXJlc3RpbWF0aW5nIHRoZSByZXF1aXJlZCAubmdmYWN0b3J5IGZpbGVzIGFzIHRoZSByZWFsIGNhbGN1bGF0aW9uIGlzIGhhcmRlci5cbiAgICAvLyBPbmx5IGRvIHRoaXMgZm9yIFN0dWJFbWl0RmxhZ3MuQmFzaWMsIGFzIGFkZGluZyBhIHR5cGUgY2hlY2sgYmxvY2tcbiAgICAvLyBkb2VzIG5vdCBjaGFuZ2UgdGhpcyBmaWxlIChhcyB3ZSBnZW5lcmF0ZSB0eXBlIGNoZWNrIGJsb2NrcyBiYXNlZCBvbiBOZ01vZHVsZXMpLlxuICAgIGlmICh0aGlzLl9vcHRpb25zLmFsbG93RW1wdHlDb2RlZ2VuRmlsZXMgfHwgZmlsZS5kaXJlY3RpdmVzLmxlbmd0aCB8fCBmaWxlLnBpcGVzLmxlbmd0aCB8fFxuICAgICAgICBmaWxlLmluamVjdGFibGVzLmxlbmd0aCB8fCBmaWxlLm5nTW9kdWxlcy5sZW5ndGggfHwgZmlsZS5leHBvcnRzTm9uU291cmNlRmlsZXMpIHtcbiAgICAgIGdlbkZpbGVOYW1lcy5wdXNoKG5nZmFjdG9yeUZpbGVQYXRoKGZpbGUuZmlsZU5hbWUsIHRydWUpKTtcbiAgICAgIGlmICh0aGlzLl9vcHRpb25zLmVuYWJsZVN1bW1hcmllc0ZvckppdCkge1xuICAgICAgICBnZW5GaWxlTmFtZXMucHVzaChzdW1tYXJ5Rm9ySml0RmlsZU5hbWUoZmlsZS5maWxlTmFtZSwgdHJ1ZSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBmaWxlU3VmZml4ID0gbm9ybWFsaXplR2VuRmlsZVN1ZmZpeChzcGxpdFR5cGVzY3JpcHRTdWZmaXgoZmlsZS5maWxlTmFtZSwgdHJ1ZSlbMV0pO1xuICAgIGZpbGUuZGlyZWN0aXZlcy5mb3JFYWNoKChkaXJTeW1ib2wpID0+IHtcbiAgICAgIGNvbnN0IGNvbXBNZXRhID1cbiAgICAgICAgICB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmdldE5vbk5vcm1hbGl6ZWREaXJlY3RpdmVNZXRhZGF0YShkaXJTeW1ib2wpICEubWV0YWRhdGE7XG4gICAgICBpZiAoIWNvbXBNZXRhLmlzQ29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIE5vdGU6IGNvbXBNZXRhIGlzIGEgY29tcG9uZW50IGFuZCB0aGVyZWZvcmUgdGVtcGxhdGUgaXMgbm9uIG51bGwuXG4gICAgICBjb21wTWV0YS50ZW1wbGF0ZSAhLnN0eWxlVXJscy5mb3JFYWNoKChzdHlsZVVybCkgPT4ge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkVXJsID0gdGhpcy5faG9zdC5yZXNvdXJjZU5hbWVUb0ZpbGVOYW1lKHN0eWxlVXJsLCBmaWxlLmZpbGVOYW1lKTtcbiAgICAgICAgaWYgKCFub3JtYWxpemVkVXJsKSB7XG4gICAgICAgICAgdGhyb3cgc3ludGF4RXJyb3IoYENvdWxkbid0IHJlc29sdmUgcmVzb3VyY2UgJHtzdHlsZVVybH0gcmVsYXRpdmUgdG8gJHtmaWxlLmZpbGVOYW1lfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5lZWRzU2hpbSA9IChjb21wTWV0YS50ZW1wbGF0ZSAhLmVuY2Fwc3VsYXRpb24gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5kZWZhdWx0RW5jYXBzdWxhdGlvbikgPT09IFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkO1xuICAgICAgICBnZW5GaWxlTmFtZXMucHVzaChfc3R5bGVzTW9kdWxlVXJsKG5vcm1hbGl6ZWRVcmwsIG5lZWRzU2hpbSwgZmlsZVN1ZmZpeCkpO1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5hbGxvd0VtcHR5Q29kZWdlbkZpbGVzKSB7XG4gICAgICAgICAgZ2VuRmlsZU5hbWVzLnB1c2goX3N0eWxlc01vZHVsZVVybChub3JtYWxpemVkVXJsLCAhbmVlZHNTaGltLCBmaWxlU3VmZml4KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBnZW5GaWxlTmFtZXM7XG4gIH1cblxuICBlbWl0QmFzaWNTdHViKGdlbkZpbGVOYW1lOiBzdHJpbmcsIG9yaWdpbmFsRmlsZU5hbWU/OiBzdHJpbmcpOiBHZW5lcmF0ZWRGaWxlIHtcbiAgICBjb25zdCBvdXRwdXRDdHggPSB0aGlzLl9jcmVhdGVPdXRwdXRDb250ZXh0KGdlbkZpbGVOYW1lKTtcbiAgICBpZiAoZ2VuRmlsZU5hbWUuZW5kc1dpdGgoJy5uZ2ZhY3RvcnkudHMnKSkge1xuICAgICAgaWYgKCFvcmlnaW5hbEZpbGVOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBBc3NlcnRpb24gZXJyb3I6IHJlcXVpcmUgdGhlIG9yaWdpbmFsIGZpbGUgZm9yIC5uZ2ZhY3RvcnkudHMgc3R1YnMuIEZpbGU6ICR7Z2VuRmlsZU5hbWV9YCk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcmlnaW5hbEZpbGUgPSB0aGlzLl9hbmFseXplRmlsZShvcmlnaW5hbEZpbGVOYW1lKTtcbiAgICAgIHRoaXMuX2NyZWF0ZU5nRmFjdG9yeVN0dWIob3V0cHV0Q3R4LCBvcmlnaW5hbEZpbGUsIFN0dWJFbWl0RmxhZ3MuQmFzaWMpO1xuICAgIH0gZWxzZSBpZiAoZ2VuRmlsZU5hbWUuZW5kc1dpdGgoJy5uZ3N1bW1hcnkudHMnKSkge1xuICAgICAgaWYgKHRoaXMuX29wdGlvbnMuZW5hYmxlU3VtbWFyaWVzRm9ySml0KSB7XG4gICAgICAgIGlmICghb3JpZ2luYWxGaWxlTmFtZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYEFzc2VydGlvbiBlcnJvcjogcmVxdWlyZSB0aGUgb3JpZ2luYWwgZmlsZSBmb3IgLm5nc3VtbWFyeS50cyBzdHVicy4gRmlsZTogJHtnZW5GaWxlTmFtZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcmlnaW5hbEZpbGUgPSB0aGlzLl9hbmFseXplRmlsZShvcmlnaW5hbEZpbGVOYW1lKTtcbiAgICAgICAgX2NyZWF0ZUVtcHR5U3R1YihvdXRwdXRDdHgpO1xuICAgICAgICBvcmlnaW5hbEZpbGUubmdNb2R1bGVzLmZvckVhY2gobmdNb2R1bGUgPT4ge1xuICAgICAgICAgIC8vIGNyZWF0ZSBleHBvcnRzIHRoYXQgdXNlciBjb2RlIGNhbiByZWZlcmVuY2VcbiAgICAgICAgICBjcmVhdGVGb3JKaXRTdHViKG91dHB1dEN0eCwgbmdNb2R1bGUudHlwZS5yZWZlcmVuY2UpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGdlbkZpbGVOYW1lLmVuZHNXaXRoKCcubmdzdHlsZS50cycpKSB7XG4gICAgICBfY3JlYXRlRW1wdHlTdHViKG91dHB1dEN0eCk7XG4gICAgfVxuICAgIC8vIE5vdGU6IGZvciB0aGUgc3R1YnMsIHdlIGRvbid0IG5lZWQgYSBwcm9wZXJ0eSBzcmNGaWxlVXJsLFxuICAgIC8vIGFzIGxhdGVyIG9uIGluIGVtaXRBbGxJbXBscyB3ZSB3aWxsIGNyZWF0ZSB0aGUgcHJvcGVyIEdlbmVyYXRlZEZpbGVzIHdpdGggdGhlXG4gICAgLy8gY29ycmVjdCBzcmNGaWxlVXJsLlxuICAgIC8vIFRoaXMgaXMgZ29vZCBhcyBlLmcuIGZvciAubmdzdHlsZS50cyBmaWxlcyB3ZSBjYW4ndCBkZXJpdmVcbiAgICAvLyB0aGUgdXJsIG9mIGNvbXBvbmVudHMgYmFzZWQgb24gdGhlIGdlbkZpbGVVcmwuXG4gICAgcmV0dXJuIHRoaXMuX2NvZGVnZW5Tb3VyY2VNb2R1bGUoJ3Vua25vd24nLCBvdXRwdXRDdHgpO1xuICB9XG5cbiAgZW1pdFR5cGVDaGVja1N0dWIoZ2VuRmlsZU5hbWU6IHN0cmluZywgb3JpZ2luYWxGaWxlTmFtZTogc3RyaW5nKTogR2VuZXJhdGVkRmlsZXxudWxsIHtcbiAgICBjb25zdCBvcmlnaW5hbEZpbGUgPSB0aGlzLl9hbmFseXplRmlsZShvcmlnaW5hbEZpbGVOYW1lKTtcbiAgICBjb25zdCBvdXRwdXRDdHggPSB0aGlzLl9jcmVhdGVPdXRwdXRDb250ZXh0KGdlbkZpbGVOYW1lKTtcbiAgICBpZiAoZ2VuRmlsZU5hbWUuZW5kc1dpdGgoJy5uZ2ZhY3RvcnkudHMnKSkge1xuICAgICAgdGhpcy5fY3JlYXRlTmdGYWN0b3J5U3R1YihvdXRwdXRDdHgsIG9yaWdpbmFsRmlsZSwgU3R1YkVtaXRGbGFncy5UeXBlQ2hlY2spO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0Q3R4LnN0YXRlbWVudHMubGVuZ3RoID4gMCA/XG4gICAgICAgIHRoaXMuX2NvZGVnZW5Tb3VyY2VNb2R1bGUob3JpZ2luYWxGaWxlLmZpbGVOYW1lLCBvdXRwdXRDdHgpIDpcbiAgICAgICAgbnVsbDtcbiAgfVxuXG4gIGxvYWRGaWxlc0FzeW5jKGZpbGVOYW1lczogc3RyaW5nW10sIHRzRmlsZXM6IHN0cmluZ1tdKTogUHJvbWlzZTxcbiAgICAgIHthbmFseXplZE1vZHVsZXM6IE5nQW5hbHl6ZWRNb2R1bGVzLCBhbmFseXplZEluamVjdGFibGVzOiBOZ0FuYWx5emVkRmlsZVdpdGhJbmplY3RhYmxlc1tdfT4ge1xuICAgIGNvbnN0IGZpbGVzID0gZmlsZU5hbWVzLm1hcChmaWxlTmFtZSA9PiB0aGlzLl9hbmFseXplRmlsZShmaWxlTmFtZSkpO1xuICAgIGNvbnN0IGxvYWRpbmdQcm9taXNlczogUHJvbWlzZTxOZ0FuYWx5emVkTW9kdWxlcz5bXSA9IFtdO1xuICAgIGZpbGVzLmZvckVhY2goXG4gICAgICAgIGZpbGUgPT4gZmlsZS5uZ01vZHVsZXMuZm9yRWFjaChcbiAgICAgICAgICAgIG5nTW9kdWxlID0+XG4gICAgICAgICAgICAgICAgbG9hZGluZ1Byb21pc2VzLnB1c2godGhpcy5fbWV0YWRhdGFSZXNvbHZlci5sb2FkTmdNb2R1bGVEaXJlY3RpdmVBbmRQaXBlTWV0YWRhdGEoXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kdWxlLnR5cGUucmVmZXJlbmNlLCBmYWxzZSkpKSk7XG4gICAgY29uc3QgYW5hbHl6ZWRJbmplY3RhYmxlcyA9IHRzRmlsZXMubWFwKHRzRmlsZSA9PiB0aGlzLl9hbmFseXplRmlsZUZvckluamVjdGFibGVzKHRzRmlsZSkpO1xuICAgIHJldHVybiBQcm9taXNlLmFsbChsb2FkaW5nUHJvbWlzZXMpLnRoZW4oXyA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmFseXplZE1vZHVsZXM6IG1lcmdlQW5kVmFsaWRhdGVOZ0ZpbGVzKGZpbGVzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5hbHl6ZWRJbmplY3RhYmxlczogYW5hbHl6ZWRJbmplY3RhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgfVxuXG4gIGxvYWRGaWxlc1N5bmMoZmlsZU5hbWVzOiBzdHJpbmdbXSwgdHNGaWxlczogc3RyaW5nW10pOlxuICAgICAge2FuYWx5emVkTW9kdWxlczogTmdBbmFseXplZE1vZHVsZXMsIGFuYWx5emVkSW5qZWN0YWJsZXM6IE5nQW5hbHl6ZWRGaWxlV2l0aEluamVjdGFibGVzW119IHtcbiAgICBjb25zdCBmaWxlcyA9IGZpbGVOYW1lcy5tYXAoZmlsZU5hbWUgPT4gdGhpcy5fYW5hbHl6ZUZpbGUoZmlsZU5hbWUpKTtcbiAgICBmaWxlcy5mb3JFYWNoKFxuICAgICAgICBmaWxlID0+IGZpbGUubmdNb2R1bGVzLmZvckVhY2goXG4gICAgICAgICAgICBuZ01vZHVsZSA9PiB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmxvYWROZ01vZHVsZURpcmVjdGl2ZUFuZFBpcGVNZXRhZGF0YShcbiAgICAgICAgICAgICAgICBuZ01vZHVsZS50eXBlLnJlZmVyZW5jZSwgdHJ1ZSkpKTtcbiAgICBjb25zdCBhbmFseXplZEluamVjdGFibGVzID0gdHNGaWxlcy5tYXAodHNGaWxlID0+IHRoaXMuX2FuYWx5emVGaWxlRm9ySW5qZWN0YWJsZXModHNGaWxlKSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFuYWx5emVkTW9kdWxlczogbWVyZ2VBbmRWYWxpZGF0ZU5nRmlsZXMoZmlsZXMpLFxuICAgICAgYW5hbHl6ZWRJbmplY3RhYmxlczogYW5hbHl6ZWRJbmplY3RhYmxlcyxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlTmdGYWN0b3J5U3R1YihcbiAgICAgIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCwgZmlsZTogTmdBbmFseXplZEZpbGUsIGVtaXRGbGFnczogU3R1YkVtaXRGbGFncykge1xuICAgIGxldCBjb21wb25lbnRJZCA9IDA7XG4gICAgZmlsZS5uZ01vZHVsZXMuZm9yRWFjaCgobmdNb2R1bGVNZXRhLCBuZ01vZHVsZUluZGV4KSA9PiB7XG4gICAgICAvLyBOb3RlOiB0aGUgY29kZSBiZWxvdyBuZWVkcyB0byBleGVjdXRlZCBmb3IgU3R1YkVtaXRGbGFncy5CYXNpYyBhbmQgU3R1YkVtaXRGbGFncy5UeXBlQ2hlY2ssXG4gICAgICAvLyBzbyB3ZSBkb24ndCBjaGFuZ2UgdGhlIC5uZ2ZhY3RvcnkgZmlsZSB0b28gbXVjaCB3aGVuIGFkZGluZyB0aGUgdHlwZS1jaGVjayBibG9jay5cblxuICAgICAgLy8gY3JlYXRlIGV4cG9ydHMgdGhhdCB1c2VyIGNvZGUgY2FuIHJlZmVyZW5jZVxuICAgICAgdGhpcy5fbmdNb2R1bGVDb21waWxlci5jcmVhdGVTdHViKG91dHB1dEN0eCwgbmdNb2R1bGVNZXRhLnR5cGUucmVmZXJlbmNlKTtcblxuICAgICAgLy8gYWRkIHJlZmVyZW5jZXMgdG8gdGhlIHN5bWJvbHMgZnJvbSB0aGUgbWV0YWRhdGEuXG4gICAgICAvLyBUaGVzZSBjYW4gYmUgdXNlZCBieSB0aGUgdHlwZSBjaGVjayBibG9jayBmb3IgY29tcG9uZW50cyxcbiAgICAgIC8vIGFuZCB0aGV5IGFsc28gY2F1c2UgVHlwZVNjcmlwdCB0byBpbmNsdWRlIHRoZXNlIGZpbGVzIGludG8gdGhlIHByb2dyYW0gdG9vLFxuICAgICAgLy8gd2hpY2ggd2lsbCBtYWtlIHRoZW0gcGFydCBvZiB0aGUgYW5hbHl6ZWRGaWxlcy5cbiAgICAgIGNvbnN0IGV4dGVybmFsUmVmZXJlbmNlczogU3RhdGljU3ltYm9sW10gPSBbXG4gICAgICAgIC8vIEFkZCByZWZlcmVuY2VzIHRoYXQgYXJlIGF2YWlsYWJsZSBmcm9tIGFsbCB0aGUgbW9kdWxlcyBhbmQgaW1wb3J0cy5cbiAgICAgICAgLi4ubmdNb2R1bGVNZXRhLnRyYW5zaXRpdmVNb2R1bGUuZGlyZWN0aXZlcy5tYXAoZCA9PiBkLnJlZmVyZW5jZSksXG4gICAgICAgIC4uLm5nTW9kdWxlTWV0YS50cmFuc2l0aXZlTW9kdWxlLnBpcGVzLm1hcChkID0+IGQucmVmZXJlbmNlKSxcbiAgICAgICAgLi4ubmdNb2R1bGVNZXRhLmltcG9ydGVkTW9kdWxlcy5tYXAobSA9PiBtLnR5cGUucmVmZXJlbmNlKSxcbiAgICAgICAgLi4ubmdNb2R1bGVNZXRhLmV4cG9ydGVkTW9kdWxlcy5tYXAobSA9PiBtLnR5cGUucmVmZXJlbmNlKSxcblxuICAgICAgICAvLyBBZGQgcmVmZXJlbmNlcyB0aGF0IG1pZ2h0IGJlIGluc2VydGVkIGJ5IHRoZSB0ZW1wbGF0ZSBjb21waWxlci5cbiAgICAgICAgLi4udGhpcy5fZXh0ZXJuYWxJZGVudGlmaWVyUmVmZXJlbmNlcyhbSWRlbnRpZmllcnMuVGVtcGxhdGVSZWYsIElkZW50aWZpZXJzLkVsZW1lbnRSZWZdKSxcbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IGV4dGVybmFsUmVmZXJlbmNlVmFycyA9IG5ldyBNYXA8YW55LCBzdHJpbmc+KCk7XG4gICAgICBleHRlcm5hbFJlZmVyZW5jZXMuZm9yRWFjaCgocmVmLCB0eXBlSW5kZXgpID0+IHtcbiAgICAgICAgZXh0ZXJuYWxSZWZlcmVuY2VWYXJzLnNldChyZWYsIGBfZGVjbCR7bmdNb2R1bGVJbmRleH1fJHt0eXBlSW5kZXh9YCk7XG4gICAgICB9KTtcbiAgICAgIGV4dGVybmFsUmVmZXJlbmNlVmFycy5mb3JFYWNoKCh2YXJOYW1lLCByZWZlcmVuY2UpID0+IHtcbiAgICAgICAgb3V0cHV0Q3R4LnN0YXRlbWVudHMucHVzaChcbiAgICAgICAgICAgIG8udmFyaWFibGUodmFyTmFtZSlcbiAgICAgICAgICAgICAgICAuc2V0KG8uTlVMTF9FWFBSLmNhc3Qoby5EWU5BTUlDX1RZUEUpKVxuICAgICAgICAgICAgICAgIC50b0RlY2xTdG10KG8uZXhwcmVzc2lvblR5cGUob3V0cHV0Q3R4LmltcG9ydEV4cHIoXG4gICAgICAgICAgICAgICAgICAgIHJlZmVyZW5jZSwgLyogdHlwZVBhcmFtcyAqLyBudWxsLCAvKiB1c2VTdW1tYXJpZXMgKi8gZmFsc2UpKSkpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChlbWl0RmxhZ3MgJiBTdHViRW1pdEZsYWdzLlR5cGVDaGVjaykge1xuICAgICAgICAvLyBhZGQgdGhlIHR5cGUtY2hlY2sgYmxvY2sgZm9yIGFsbCBjb21wb25lbnRzIG9mIHRoZSBOZ01vZHVsZVxuICAgICAgICBuZ01vZHVsZU1ldGEuZGVjbGFyZWREaXJlY3RpdmVzLmZvckVhY2goKGRpcklkKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29tcE1ldGEgPSB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmdldERpcmVjdGl2ZU1ldGFkYXRhKGRpcklkLnJlZmVyZW5jZSk7XG4gICAgICAgICAgaWYgKCFjb21wTWV0YS5pc0NvbXBvbmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb21wb25lbnRJZCsrO1xuICAgICAgICAgIHRoaXMuX2NyZWF0ZVR5cGVDaGVja0Jsb2NrKFxuICAgICAgICAgICAgICBvdXRwdXRDdHgsIGAke2NvbXBNZXRhLnR5cGUucmVmZXJlbmNlLm5hbWV9X0hvc3RfJHtjb21wb25lbnRJZH1gLCBuZ01vZHVsZU1ldGEsXG4gICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0SG9zdENvbXBvbmVudE1ldGFkYXRhKGNvbXBNZXRhKSwgW2NvbXBNZXRhLnR5cGVdLFxuICAgICAgICAgICAgICBleHRlcm5hbFJlZmVyZW5jZVZhcnMpO1xuICAgICAgICAgIHRoaXMuX2NyZWF0ZVR5cGVDaGVja0Jsb2NrKFxuICAgICAgICAgICAgICBvdXRwdXRDdHgsIGAke2NvbXBNZXRhLnR5cGUucmVmZXJlbmNlLm5hbWV9XyR7Y29tcG9uZW50SWR9YCwgbmdNb2R1bGVNZXRhLCBjb21wTWV0YSxcbiAgICAgICAgICAgICAgbmdNb2R1bGVNZXRhLnRyYW5zaXRpdmVNb2R1bGUuZGlyZWN0aXZlcywgZXh0ZXJuYWxSZWZlcmVuY2VWYXJzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAob3V0cHV0Q3R4LnN0YXRlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBfY3JlYXRlRW1wdHlTdHViKG91dHB1dEN0eCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZXh0ZXJuYWxJZGVudGlmaWVyUmVmZXJlbmNlcyhyZWZlcmVuY2VzOiBvLkV4dGVybmFsUmVmZXJlbmNlW10pOiBTdGF0aWNTeW1ib2xbXSB7XG4gICAgY29uc3QgcmVzdWx0OiBTdGF0aWNTeW1ib2xbXSA9IFtdO1xuICAgIGZvciAobGV0IHJlZmVyZW5jZSBvZiByZWZlcmVuY2VzKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IGNyZWF0ZVRva2VuRm9yRXh0ZXJuYWxSZWZlcmVuY2UodGhpcy5yZWZsZWN0b3IsIHJlZmVyZW5jZSk7XG4gICAgICBpZiAodG9rZW4uaWRlbnRpZmllcikge1xuICAgICAgICByZXN1bHQucHVzaCh0b2tlbi5pZGVudGlmaWVyLnJlZmVyZW5jZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVUeXBlQ2hlY2tCbG9jayhcbiAgICAgIGN0eDogT3V0cHV0Q29udGV4dCwgY29tcG9uZW50SWQ6IHN0cmluZywgbW9kdWxlTWV0YTogQ29tcGlsZU5nTW9kdWxlTWV0YWRhdGEsXG4gICAgICBjb21wTWV0YTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLCBkaXJlY3RpdmVzOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhW10sXG4gICAgICBleHRlcm5hbFJlZmVyZW5jZVZhcnM6IE1hcDxhbnksIHN0cmluZz4pIHtcbiAgICBjb25zdCB7dGVtcGxhdGU6IHBhcnNlZFRlbXBsYXRlLCBwaXBlczogdXNlZFBpcGVzfSA9XG4gICAgICAgIHRoaXMuX3BhcnNlVGVtcGxhdGUoY29tcE1ldGEsIG1vZHVsZU1ldGEsIGRpcmVjdGl2ZXMpO1xuICAgIGN0eC5zdGF0ZW1lbnRzLnB1c2goLi4udGhpcy5fdHlwZUNoZWNrQ29tcGlsZXIuY29tcGlsZUNvbXBvbmVudChcbiAgICAgICAgY29tcG9uZW50SWQsIGNvbXBNZXRhLCBwYXJzZWRUZW1wbGF0ZSwgdXNlZFBpcGVzLCBleHRlcm5hbFJlZmVyZW5jZVZhcnMsIGN0eCkpO1xuICB9XG5cbiAgZW1pdE1lc3NhZ2VCdW5kbGUoYW5hbHl6ZVJlc3VsdDogTmdBbmFseXplZE1vZHVsZXMsIGxvY2FsZTogc3RyaW5nfG51bGwpOiBNZXNzYWdlQnVuZGxlIHtcbiAgICBjb25zdCBlcnJvcnM6IFBhcnNlRXJyb3JbXSA9IFtdO1xuICAgIGNvbnN0IGh0bWxQYXJzZXIgPSBuZXcgSHRtbFBhcnNlcigpO1xuXG4gICAgLy8gVE9ETyh2aWNiKTogaW1wbGljaXQgdGFncyAmIGF0dHJpYnV0ZXNcbiAgICBjb25zdCBtZXNzYWdlQnVuZGxlID0gbmV3IE1lc3NhZ2VCdW5kbGUoaHRtbFBhcnNlciwgW10sIHt9LCBsb2NhbGUpO1xuXG4gICAgYW5hbHl6ZVJlc3VsdC5maWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgY29uc3QgY29tcE1ldGFzOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGFbXSA9IFtdO1xuICAgICAgZmlsZS5kaXJlY3RpdmVzLmZvckVhY2goZGlyZWN0aXZlVHlwZSA9PiB7XG4gICAgICAgIGNvbnN0IGRpck1ldGEgPSB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmdldERpcmVjdGl2ZU1ldGFkYXRhKGRpcmVjdGl2ZVR5cGUpO1xuICAgICAgICBpZiAoZGlyTWV0YSAmJiBkaXJNZXRhLmlzQ29tcG9uZW50KSB7XG4gICAgICAgICAgY29tcE1ldGFzLnB1c2goZGlyTWV0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgY29tcE1ldGFzLmZvckVhY2goY29tcE1ldGEgPT4ge1xuICAgICAgICBjb25zdCBodG1sID0gY29tcE1ldGEudGVtcGxhdGUgIS50ZW1wbGF0ZSAhO1xuICAgICAgICAvLyBUZW1wbGF0ZSBVUkwgcG9pbnRzIHRvIGVpdGhlciBhbiBIVE1MIG9yIFRTIGZpbGUgZGVwZW5kaW5nIG9uIHdoZXRoZXJcbiAgICAgICAgLy8gdGhlIGZpbGUgaXMgdXNlZCB3aXRoIGB0ZW1wbGF0ZVVybDpgIG9yIGB0ZW1wbGF0ZTpgLCByZXNwZWN0aXZlbHkuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlVXJsID0gY29tcE1ldGEudGVtcGxhdGUgIS50ZW1wbGF0ZVVybCAhO1xuICAgICAgICBjb25zdCBpbnRlcnBvbGF0aW9uQ29uZmlnID1cbiAgICAgICAgICAgIEludGVycG9sYXRpb25Db25maWcuZnJvbUFycmF5KGNvbXBNZXRhLnRlbXBsYXRlICEuaW50ZXJwb2xhdGlvbik7XG4gICAgICAgIGVycm9ycy5wdXNoKC4uLm1lc3NhZ2VCdW5kbGUudXBkYXRlRnJvbVRlbXBsYXRlKGh0bWwsIHRlbXBsYXRlVXJsLCBpbnRlcnBvbGF0aW9uQ29uZmlnKSAhKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMubWFwKGUgPT4gZS50b1N0cmluZygpKS5qb2luKCdcXG4nKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc3NhZ2VCdW5kbGU7XG4gIH1cblxuICBlbWl0QWxsUGFydGlhbE1vZHVsZXMoXG4gICAgICB7bmdNb2R1bGVCeVBpcGVPckRpcmVjdGl2ZSwgZmlsZXN9OiBOZ0FuYWx5emVkTW9kdWxlcyxcbiAgICAgIHIzRmlsZXM6IE5nQW5hbHl6ZWRGaWxlV2l0aEluamVjdGFibGVzW10pOiBQYXJ0aWFsTW9kdWxlW10ge1xuICAgIGNvbnN0IGNvbnRleHRNYXAgPSBuZXcgTWFwPHN0cmluZywgT3V0cHV0Q29udGV4dD4oKTtcblxuICAgIGNvbnN0IGdldENvbnRleHQgPSAoZmlsZU5hbWU6IHN0cmluZyk6IE91dHB1dENvbnRleHQgPT4ge1xuICAgICAgaWYgKCFjb250ZXh0TWFwLmhhcyhmaWxlTmFtZSkpIHtcbiAgICAgICAgY29udGV4dE1hcC5zZXQoZmlsZU5hbWUsIHRoaXMuX2NyZWF0ZU91dHB1dENvbnRleHQoZmlsZU5hbWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZXh0TWFwLmdldChmaWxlTmFtZSkgITtcbiAgICB9O1xuXG4gICAgZmlsZXMuZm9yRWFjaChcbiAgICAgICAgZmlsZSA9PiB0aGlzLl9jb21waWxlUGFydGlhbE1vZHVsZShcbiAgICAgICAgICAgIGZpbGUuZmlsZU5hbWUsIG5nTW9kdWxlQnlQaXBlT3JEaXJlY3RpdmUsIGZpbGUuZGlyZWN0aXZlcywgZmlsZS5waXBlcywgZmlsZS5uZ01vZHVsZXMsXG4gICAgICAgICAgICBmaWxlLmluamVjdGFibGVzLCBnZXRDb250ZXh0KGZpbGUuZmlsZU5hbWUpKSk7XG4gICAgcjNGaWxlcy5mb3JFYWNoKFxuICAgICAgICBmaWxlID0+IHRoaXMuX2NvbXBpbGVTaGFsbG93TW9kdWxlcyhcbiAgICAgICAgICAgIGZpbGUuZmlsZU5hbWUsIGZpbGUuc2hhbGxvd01vZHVsZXMsIGdldENvbnRleHQoZmlsZS5maWxlTmFtZSkpKTtcblxuICAgIHJldHVybiBBcnJheS5mcm9tKGNvbnRleHRNYXAudmFsdWVzKCkpXG4gICAgICAgIC5tYXAoY29udGV4dCA9PiAoe1xuICAgICAgICAgICAgICAgZmlsZU5hbWU6IGNvbnRleHQuZ2VuRmlsZVBhdGgsXG4gICAgICAgICAgICAgICBzdGF0ZW1lbnRzOiBbLi4uY29udGV4dC5jb25zdGFudFBvb2wuc3RhdGVtZW50cywgLi4uY29udGV4dC5zdGF0ZW1lbnRzXSxcbiAgICAgICAgICAgICB9KSk7XG4gIH1cblxuICBwcml2YXRlIF9jb21waWxlU2hhbGxvd01vZHVsZXMoXG4gICAgICBmaWxlTmFtZTogc3RyaW5nLCBzaGFsbG93TW9kdWxlczogQ29tcGlsZVNoYWxsb3dNb2R1bGVNZXRhZGF0YVtdLFxuICAgICAgY29udGV4dDogT3V0cHV0Q29udGV4dCk6IHZvaWQge1xuICAgIHNoYWxsb3dNb2R1bGVzLmZvckVhY2gobW9kdWxlID0+IGNvbXBpbGVSM01vZHVsZShjb250ZXh0LCBtb2R1bGUsIHRoaXMuX2luamVjdGFibGVDb21waWxlcikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tcGlsZVBhcnRpYWxNb2R1bGUoXG4gICAgICBmaWxlTmFtZTogc3RyaW5nLCBuZ01vZHVsZUJ5UGlwZU9yRGlyZWN0aXZlOiBNYXA8U3RhdGljU3ltYm9sLCBDb21waWxlTmdNb2R1bGVNZXRhZGF0YT4sXG4gICAgICBkaXJlY3RpdmVzOiBTdGF0aWNTeW1ib2xbXSwgcGlwZXM6IFN0YXRpY1N5bWJvbFtdLCBuZ01vZHVsZXM6IENvbXBpbGVOZ01vZHVsZU1ldGFkYXRhW10sXG4gICAgICBpbmplY3RhYmxlczogQ29tcGlsZUluamVjdGFibGVNZXRhZGF0YVtdLCBjb250ZXh0OiBPdXRwdXRDb250ZXh0KTogdm9pZCB7XG4gICAgY29uc3QgZXJyb3JzOiBQYXJzZUVycm9yW10gPSBbXTtcblxuICAgIGNvbnN0IHNjaGVtYVJlZ2lzdHJ5ID0gbmV3IERvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeSgpO1xuICAgIGNvbnN0IGhvc3RCaW5kaW5nUGFyc2VyID0gbmV3IEJpbmRpbmdQYXJzZXIoXG4gICAgICAgIHRoaXMuX3RlbXBsYXRlUGFyc2VyLmV4cHJlc3Npb25QYXJzZXIsIERFRkFVTFRfSU5URVJQT0xBVElPTl9DT05GSUcsIHNjaGVtYVJlZ2lzdHJ5LCBbXSxcbiAgICAgICAgZXJyb3JzKTtcblxuICAgIC8vIFByb2Nlc3MgYWxsIGNvbXBvbmVudHMgYW5kIGRpcmVjdGl2ZXNcbiAgICBkaXJlY3RpdmVzLmZvckVhY2goZGlyZWN0aXZlVHlwZSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RpdmVNZXRhZGF0YSA9IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0RGlyZWN0aXZlTWV0YWRhdGEoZGlyZWN0aXZlVHlwZSk7XG4gICAgICBpZiAoZGlyZWN0aXZlTWV0YWRhdGEuaXNDb21wb25lbnQpIHtcbiAgICAgICAgY29uc3QgbW9kdWxlID0gbmdNb2R1bGVCeVBpcGVPckRpcmVjdGl2ZS5nZXQoZGlyZWN0aXZlVHlwZSkgITtcbiAgICAgICAgbW9kdWxlIHx8XG4gICAgICAgICAgICBlcnJvcihcbiAgICAgICAgICAgICAgICBgQ2Fubm90IGRldGVybWluZSB0aGUgbW9kdWxlIGZvciBjb21wb25lbnQgJyR7aWRlbnRpZmllck5hbWUoZGlyZWN0aXZlTWV0YWRhdGEudHlwZSl9J2ApO1xuXG4gICAgICAgIGxldCBodG1sQXN0ID0gZGlyZWN0aXZlTWV0YWRhdGEudGVtcGxhdGUgIS5odG1sQXN0ICE7XG4gICAgICAgIGNvbnN0IHByZXNlcnZlV2hpdGVzcGFjZXMgPSBkaXJlY3RpdmVNZXRhZGF0YSAhLnRlbXBsYXRlICEucHJlc2VydmVXaGl0ZXNwYWNlcztcblxuICAgICAgICBpZiAoIXByZXNlcnZlV2hpdGVzcGFjZXMpIHtcbiAgICAgICAgICBodG1sQXN0ID0gcmVtb3ZlV2hpdGVzcGFjZXMoaHRtbEFzdCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVuZGVyM0FzdCA9IGh0bWxBc3RUb1JlbmRlcjNBc3QoaHRtbEFzdC5yb290Tm9kZXMsIGhvc3RCaW5kaW5nUGFyc2VyKTtcblxuICAgICAgICAvLyBNYXAgb2YgU3RhdGljVHlwZSBieSBkaXJlY3RpdmUgc2VsZWN0b3JzXG4gICAgICAgIGNvbnN0IGRpcmVjdGl2ZVR5cGVCeVNlbCA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgICAgICAgY29uc3QgZGlyZWN0aXZlcyA9IG1vZHVsZS50cmFuc2l0aXZlTW9kdWxlLmRpcmVjdGl2ZXMubWFwKFxuICAgICAgICAgICAgZGlyID0+IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0RGlyZWN0aXZlU3VtbWFyeShkaXIucmVmZXJlbmNlKSk7XG5cbiAgICAgICAgZGlyZWN0aXZlcy5mb3JFYWNoKGRpcmVjdGl2ZSA9PiB7XG4gICAgICAgICAgaWYgKGRpcmVjdGl2ZS5zZWxlY3Rvcikge1xuICAgICAgICAgICAgZGlyZWN0aXZlVHlwZUJ5U2VsLnNldChkaXJlY3RpdmUuc2VsZWN0b3IsIGRpcmVjdGl2ZS50eXBlLnJlZmVyZW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBNYXAgb2YgU3RhdGljVHlwZSBieSBwaXBlIG5hbWVzXG4gICAgICAgIGNvbnN0IHBpcGVUeXBlQnlOYW1lID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuICAgICAgICBjb25zdCBwaXBlcyA9IG1vZHVsZS50cmFuc2l0aXZlTW9kdWxlLnBpcGVzLm1hcChcbiAgICAgICAgICAgIHBpcGUgPT4gdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXRQaXBlU3VtbWFyeShwaXBlLnJlZmVyZW5jZSkpO1xuXG4gICAgICAgIHBpcGVzLmZvckVhY2gocGlwZSA9PiB7IHBpcGVUeXBlQnlOYW1lLnNldChwaXBlLm5hbWUsIHBpcGUudHlwZS5yZWZlcmVuY2UpOyB9KTtcblxuICAgICAgICBjb21waWxlUjNDb21wb25lbnQoXG4gICAgICAgICAgICBjb250ZXh0LCBkaXJlY3RpdmVNZXRhZGF0YSwgcmVuZGVyM0FzdCwgdGhpcy5yZWZsZWN0b3IsIGhvc3RCaW5kaW5nUGFyc2VyLFxuICAgICAgICAgICAgZGlyZWN0aXZlVHlwZUJ5U2VsLCBwaXBlVHlwZUJ5TmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21waWxlUjNEaXJlY3RpdmUoY29udGV4dCwgZGlyZWN0aXZlTWV0YWRhdGEsIHRoaXMucmVmbGVjdG9yLCBob3N0QmluZGluZ1BhcnNlcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBwaXBlcy5mb3JFYWNoKHBpcGVUeXBlID0+IHtcbiAgICAgIGNvbnN0IHBpcGVNZXRhZGF0YSA9IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0UGlwZU1ldGFkYXRhKHBpcGVUeXBlKTtcbiAgICAgIGlmIChwaXBlTWV0YWRhdGEpIHtcbiAgICAgICAgY29tcGlsZVIzUGlwZShjb250ZXh0LCBwaXBlTWV0YWRhdGEsIHRoaXMucmVmbGVjdG9yKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGluamVjdGFibGVzLmZvckVhY2goaW5qZWN0YWJsZSA9PiB0aGlzLl9pbmplY3RhYmxlQ29tcGlsZXIuY29tcGlsZShpbmplY3RhYmxlLCBjb250ZXh0KSk7XG4gIH1cblxuICBlbWl0QWxsUGFydGlhbE1vZHVsZXMyKGZpbGVzOiBOZ0FuYWx5emVkRmlsZVdpdGhJbmplY3RhYmxlc1tdKTogUGFydGlhbE1vZHVsZVtdIHtcbiAgICAvLyBVc2luZyByZWR1Y2UgbGlrZSB0aGlzIGlzIGEgc2VsZWN0IG1hbnkgcGF0dGVybiAod2hlcmUgbWFwIGlzIGEgc2VsZWN0IHBhdHRlcm4pXG4gICAgcmV0dXJuIGZpbGVzLnJlZHVjZTxQYXJ0aWFsTW9kdWxlW10+KChyLCBmaWxlKSA9PiB7XG4gICAgICByLnB1c2goLi4udGhpcy5fZW1pdFBhcnRpYWxNb2R1bGUyKGZpbGUuZmlsZU5hbWUsIGZpbGUuaW5qZWN0YWJsZXMpKTtcbiAgICAgIHJldHVybiByO1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2VtaXRQYXJ0aWFsTW9kdWxlMihmaWxlTmFtZTogc3RyaW5nLCBpbmplY3RhYmxlczogQ29tcGlsZUluamVjdGFibGVNZXRhZGF0YVtdKTpcbiAgICAgIFBhcnRpYWxNb2R1bGVbXSB7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuX2NyZWF0ZU91dHB1dENvbnRleHQoZmlsZU5hbWUpO1xuXG4gICAgaW5qZWN0YWJsZXMuZm9yRWFjaChpbmplY3RhYmxlID0+IHRoaXMuX2luamVjdGFibGVDb21waWxlci5jb21waWxlKGluamVjdGFibGUsIGNvbnRleHQpKTtcblxuICAgIGlmIChjb250ZXh0LnN0YXRlbWVudHMgJiYgY29udGV4dC5zdGF0ZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBbe2ZpbGVOYW1lLCBzdGF0ZW1lbnRzOiBbLi4uY29udGV4dC5jb25zdGFudFBvb2wuc3RhdGVtZW50cywgLi4uY29udGV4dC5zdGF0ZW1lbnRzXX1dO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBlbWl0QWxsSW1wbHMoYW5hbHl6ZVJlc3VsdDogTmdBbmFseXplZE1vZHVsZXMpOiBHZW5lcmF0ZWRGaWxlW10ge1xuICAgIGNvbnN0IHtuZ01vZHVsZUJ5UGlwZU9yRGlyZWN0aXZlLCBmaWxlc30gPSBhbmFseXplUmVzdWx0O1xuICAgIGNvbnN0IHNvdXJjZU1vZHVsZXMgPSBmaWxlcy5tYXAoXG4gICAgICAgIGZpbGUgPT4gdGhpcy5fY29tcGlsZUltcGxGaWxlKFxuICAgICAgICAgICAgZmlsZS5maWxlTmFtZSwgbmdNb2R1bGVCeVBpcGVPckRpcmVjdGl2ZSwgZmlsZS5kaXJlY3RpdmVzLCBmaWxlLnBpcGVzLCBmaWxlLm5nTW9kdWxlcyxcbiAgICAgICAgICAgIGZpbGUuaW5qZWN0YWJsZXMpKTtcbiAgICByZXR1cm4gZmxhdHRlbihzb3VyY2VNb2R1bGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBpbGVJbXBsRmlsZShcbiAgICAgIHNyY0ZpbGVVcmw6IHN0cmluZywgbmdNb2R1bGVCeVBpcGVPckRpcmVjdGl2ZTogTWFwPFN0YXRpY1N5bWJvbCwgQ29tcGlsZU5nTW9kdWxlTWV0YWRhdGE+LFxuICAgICAgZGlyZWN0aXZlczogU3RhdGljU3ltYm9sW10sIHBpcGVzOiBTdGF0aWNTeW1ib2xbXSwgbmdNb2R1bGVzOiBDb21waWxlTmdNb2R1bGVNZXRhZGF0YVtdLFxuICAgICAgaW5qZWN0YWJsZXM6IENvbXBpbGVJbmplY3RhYmxlTWV0YWRhdGFbXSk6IEdlbmVyYXRlZEZpbGVbXSB7XG4gICAgY29uc3QgZmlsZVN1ZmZpeCA9IG5vcm1hbGl6ZUdlbkZpbGVTdWZmaXgoc3BsaXRUeXBlc2NyaXB0U3VmZml4KHNyY0ZpbGVVcmwsIHRydWUpWzFdKTtcbiAgICBjb25zdCBnZW5lcmF0ZWRGaWxlczogR2VuZXJhdGVkRmlsZVtdID0gW107XG5cbiAgICBjb25zdCBvdXRwdXRDdHggPSB0aGlzLl9jcmVhdGVPdXRwdXRDb250ZXh0KG5nZmFjdG9yeUZpbGVQYXRoKHNyY0ZpbGVVcmwsIHRydWUpKTtcblxuICAgIGdlbmVyYXRlZEZpbGVzLnB1c2goXG4gICAgICAgIC4uLnRoaXMuX2NyZWF0ZVN1bW1hcnkoc3JjRmlsZVVybCwgZGlyZWN0aXZlcywgcGlwZXMsIG5nTW9kdWxlcywgaW5qZWN0YWJsZXMsIG91dHB1dEN0eCkpO1xuXG4gICAgLy8gY29tcGlsZSBhbGwgbmcgbW9kdWxlc1xuICAgIG5nTW9kdWxlcy5mb3JFYWNoKChuZ01vZHVsZU1ldGEpID0+IHRoaXMuX2NvbXBpbGVNb2R1bGUob3V0cHV0Q3R4LCBuZ01vZHVsZU1ldGEpKTtcblxuICAgIC8vIGNvbXBpbGUgY29tcG9uZW50c1xuICAgIGRpcmVjdGl2ZXMuZm9yRWFjaCgoZGlyVHlwZSkgPT4ge1xuICAgICAgY29uc3QgY29tcE1ldGEgPSB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmdldERpcmVjdGl2ZU1ldGFkYXRhKDxhbnk+ZGlyVHlwZSk7XG4gICAgICBpZiAoIWNvbXBNZXRhLmlzQ29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5nTW9kdWxlID0gbmdNb2R1bGVCeVBpcGVPckRpcmVjdGl2ZS5nZXQoZGlyVHlwZSk7XG4gICAgICBpZiAoIW5nTW9kdWxlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBJbnRlcm5hbCBFcnJvcjogY2Fubm90IGRldGVybWluZSB0aGUgbW9kdWxlIGZvciBjb21wb25lbnQgJHtpZGVudGlmaWVyTmFtZShjb21wTWV0YS50eXBlKX0hYCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbXBpbGUgc3R5bGVzXG4gICAgICBjb25zdCBjb21wb25lbnRTdHlsZXNoZWV0ID0gdGhpcy5fc3R5bGVDb21waWxlci5jb21waWxlQ29tcG9uZW50KG91dHB1dEN0eCwgY29tcE1ldGEpO1xuICAgICAgLy8gTm90ZTogY29tcE1ldGEgaXMgYSBjb21wb25lbnQgYW5kIHRoZXJlZm9yZSB0ZW1wbGF0ZSBpcyBub24gbnVsbC5cbiAgICAgIGNvbXBNZXRhLnRlbXBsYXRlICEuZXh0ZXJuYWxTdHlsZXNoZWV0cy5mb3JFYWNoKChzdHlsZXNoZWV0TWV0YSkgPT4ge1xuICAgICAgICAvLyBOb3RlOiBmaWxsIG5vbiBzaGltIGFuZCBzaGltIHN0eWxlIGZpbGVzIGFzIHRoZXkgbWlnaHRcbiAgICAgICAgLy8gYmUgc2hhcmVkIGJ5IGNvbXBvbmVudCB3aXRoIGFuZCB3aXRob3V0IFZpZXdFbmNhcHN1bGF0aW9uLlxuICAgICAgICBjb25zdCBzaGltID0gdGhpcy5fc3R5bGVDb21waWxlci5uZWVkc1N0eWxlU2hpbShjb21wTWV0YSk7XG4gICAgICAgIGdlbmVyYXRlZEZpbGVzLnB1c2goXG4gICAgICAgICAgICB0aGlzLl9jb2RlZ2VuU3R5bGVzKHNyY0ZpbGVVcmwsIGNvbXBNZXRhLCBzdHlsZXNoZWV0TWV0YSwgc2hpbSwgZmlsZVN1ZmZpeCkpO1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5hbGxvd0VtcHR5Q29kZWdlbkZpbGVzKSB7XG4gICAgICAgICAgZ2VuZXJhdGVkRmlsZXMucHVzaChcbiAgICAgICAgICAgICAgdGhpcy5fY29kZWdlblN0eWxlcyhzcmNGaWxlVXJsLCBjb21wTWV0YSwgc3R5bGVzaGVldE1ldGEsICFzaGltLCBmaWxlU3VmZml4KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBjb21waWxlIGNvbXBvbmVudHNcbiAgICAgIGNvbnN0IGNvbXBWaWV3VmFycyA9IHRoaXMuX2NvbXBpbGVDb21wb25lbnQoXG4gICAgICAgICAgb3V0cHV0Q3R4LCBjb21wTWV0YSwgbmdNb2R1bGUsIG5nTW9kdWxlLnRyYW5zaXRpdmVNb2R1bGUuZGlyZWN0aXZlcywgY29tcG9uZW50U3R5bGVzaGVldCxcbiAgICAgICAgICBmaWxlU3VmZml4KTtcbiAgICAgIHRoaXMuX2NvbXBpbGVDb21wb25lbnRGYWN0b3J5KG91dHB1dEN0eCwgY29tcE1ldGEsIG5nTW9kdWxlLCBmaWxlU3VmZml4KTtcbiAgICB9KTtcbiAgICBpZiAob3V0cHV0Q3R4LnN0YXRlbWVudHMubGVuZ3RoID4gMCB8fCB0aGlzLl9vcHRpb25zLmFsbG93RW1wdHlDb2RlZ2VuRmlsZXMpIHtcbiAgICAgIGNvbnN0IHNyY01vZHVsZSA9IHRoaXMuX2NvZGVnZW5Tb3VyY2VNb2R1bGUoc3JjRmlsZVVybCwgb3V0cHV0Q3R4KTtcbiAgICAgIGdlbmVyYXRlZEZpbGVzLnVuc2hpZnQoc3JjTW9kdWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIGdlbmVyYXRlZEZpbGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlU3VtbWFyeShcbiAgICAgIHNyY0ZpbGVOYW1lOiBzdHJpbmcsIGRpcmVjdGl2ZXM6IFN0YXRpY1N5bWJvbFtdLCBwaXBlczogU3RhdGljU3ltYm9sW10sXG4gICAgICBuZ01vZHVsZXM6IENvbXBpbGVOZ01vZHVsZU1ldGFkYXRhW10sIGluamVjdGFibGVzOiBDb21waWxlSW5qZWN0YWJsZU1ldGFkYXRhW10sXG4gICAgICBuZ0ZhY3RvcnlDdHg6IE91dHB1dENvbnRleHQpOiBHZW5lcmF0ZWRGaWxlW10ge1xuICAgIGNvbnN0IHN5bWJvbFN1bW1hcmllcyA9IHRoaXMuX3N5bWJvbFJlc29sdmVyLmdldFN5bWJvbHNPZihzcmNGaWxlTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChzeW1ib2wgPT4gdGhpcy5fc3ltYm9sUmVzb2x2ZXIucmVzb2x2ZVN5bWJvbChzeW1ib2wpKTtcbiAgICBjb25zdCB0eXBlRGF0YToge1xuICAgICAgc3VtbWFyeTogQ29tcGlsZVR5cGVTdW1tYXJ5LFxuICAgICAgbWV0YWRhdGE6IENvbXBpbGVOZ01vZHVsZU1ldGFkYXRhIHwgQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhIHwgQ29tcGlsZVBpcGVNZXRhZGF0YSB8XG4gICAgICAgICAgQ29tcGlsZVR5cGVNZXRhZGF0YVxuICAgIH1bXSA9XG4gICAgICAgIFtcbiAgICAgICAgICAuLi5uZ01vZHVsZXMubWFwKFxuICAgICAgICAgICAgICBtZXRhID0+ICh7XG4gICAgICAgICAgICAgICAgc3VtbWFyeTogdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXROZ01vZHVsZVN1bW1hcnkobWV0YS50eXBlLnJlZmVyZW5jZSkgISxcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXROZ01vZHVsZU1ldGFkYXRhKG1ldGEudHlwZS5yZWZlcmVuY2UpICFcbiAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgIC4uLmRpcmVjdGl2ZXMubWFwKHJlZiA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeTogdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXREaXJlY3RpdmVTdW1tYXJ5KHJlZikgISxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmdldERpcmVjdGl2ZU1ldGFkYXRhKHJlZikgIVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAuLi5waXBlcy5tYXAocmVmID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeTogdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXRQaXBlU3VtbWFyeShyZWYpICEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGE6IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0UGlwZU1ldGFkYXRhKHJlZikgIVxuICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgLi4uaW5qZWN0YWJsZXMubWFwKFxuICAgICAgICAgICAgICByZWYgPT4gKHtcbiAgICAgICAgICAgICAgICBzdW1tYXJ5OiB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmdldEluamVjdGFibGVTdW1tYXJ5KHJlZi5zeW1ib2wpICEsXG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0SW5qZWN0YWJsZVN1bW1hcnkocmVmLnN5bWJvbCkgIS50eXBlXG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICBdO1xuICAgIGNvbnN0IGZvckppdE91dHB1dEN0eCA9IHRoaXMuX29wdGlvbnMuZW5hYmxlU3VtbWFyaWVzRm9ySml0ID9cbiAgICAgICAgdGhpcy5fY3JlYXRlT3V0cHV0Q29udGV4dChzdW1tYXJ5Rm9ySml0RmlsZU5hbWUoc3JjRmlsZU5hbWUsIHRydWUpKSA6XG4gICAgICAgIG51bGw7XG4gICAgY29uc3Qge2pzb24sIGV4cG9ydEFzfSA9IHNlcmlhbGl6ZVN1bW1hcmllcyhcbiAgICAgICAgc3JjRmlsZU5hbWUsIGZvckppdE91dHB1dEN0eCwgdGhpcy5fc3VtbWFyeVJlc29sdmVyLCB0aGlzLl9zeW1ib2xSZXNvbHZlciwgc3ltYm9sU3VtbWFyaWVzLFxuICAgICAgICB0eXBlRGF0YSk7XG4gICAgZXhwb3J0QXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIG5nRmFjdG9yeUN0eC5zdGF0ZW1lbnRzLnB1c2goXG4gICAgICAgICAgby52YXJpYWJsZShlbnRyeS5leHBvcnRBcykuc2V0KG5nRmFjdG9yeUN0eC5pbXBvcnRFeHByKGVudHJ5LnN5bWJvbCkpLnRvRGVjbFN0bXQobnVsbCwgW1xuICAgICAgICAgICAgby5TdG10TW9kaWZpZXIuRXhwb3J0ZWRcbiAgICAgICAgICBdKSk7XG4gICAgfSk7XG4gICAgY29uc3Qgc3VtbWFyeUpzb24gPSBuZXcgR2VuZXJhdGVkRmlsZShzcmNGaWxlTmFtZSwgc3VtbWFyeUZpbGVOYW1lKHNyY0ZpbGVOYW1lKSwganNvbik7XG4gICAgY29uc3QgcmVzdWx0ID0gW3N1bW1hcnlKc29uXTtcbiAgICBpZiAoZm9ySml0T3V0cHV0Q3R4KSB7XG4gICAgICByZXN1bHQucHVzaCh0aGlzLl9jb2RlZ2VuU291cmNlTW9kdWxlKHNyY0ZpbGVOYW1lLCBmb3JKaXRPdXRwdXRDdHgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBpbGVNb2R1bGUob3V0cHV0Q3R4OiBPdXRwdXRDb250ZXh0LCBuZ01vZHVsZTogQ29tcGlsZU5nTW9kdWxlTWV0YWRhdGEpOiB2b2lkIHtcbiAgICBjb25zdCBwcm92aWRlcnM6IENvbXBpbGVQcm92aWRlck1ldGFkYXRhW10gPSBbXTtcblxuICAgIGlmICh0aGlzLl9vcHRpb25zLmxvY2FsZSkge1xuICAgICAgY29uc3Qgbm9ybWFsaXplZExvY2FsZSA9IHRoaXMuX29wdGlvbnMubG9jYWxlLnJlcGxhY2UoL18vZywgJy0nKTtcbiAgICAgIHByb3ZpZGVycy5wdXNoKHtcbiAgICAgICAgdG9rZW46IGNyZWF0ZVRva2VuRm9yRXh0ZXJuYWxSZWZlcmVuY2UodGhpcy5yZWZsZWN0b3IsIElkZW50aWZpZXJzLkxPQ0FMRV9JRCksXG4gICAgICAgIHVzZVZhbHVlOiBub3JtYWxpemVkTG9jYWxlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX29wdGlvbnMuaTE4bkZvcm1hdCkge1xuICAgICAgcHJvdmlkZXJzLnB1c2goe1xuICAgICAgICB0b2tlbjogY3JlYXRlVG9rZW5Gb3JFeHRlcm5hbFJlZmVyZW5jZSh0aGlzLnJlZmxlY3RvciwgSWRlbnRpZmllcnMuVFJBTlNMQVRJT05TX0ZPUk1BVCksXG4gICAgICAgIHVzZVZhbHVlOiB0aGlzLl9vcHRpb25zLmkxOG5Gb3JtYXRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX25nTW9kdWxlQ29tcGlsZXIuY29tcGlsZShvdXRwdXRDdHgsIG5nTW9kdWxlLCBwcm92aWRlcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tcGlsZUNvbXBvbmVudEZhY3RvcnkoXG4gICAgICBvdXRwdXRDdHg6IE91dHB1dENvbnRleHQsIGNvbXBNZXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICBuZ01vZHVsZTogQ29tcGlsZU5nTW9kdWxlTWV0YWRhdGEsIGZpbGVTdWZmaXg6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGhvc3RNZXRhID0gdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXRIb3N0Q29tcG9uZW50TWV0YWRhdGEoY29tcE1ldGEpO1xuICAgIGNvbnN0IGhvc3RWaWV3RmFjdG9yeVZhciA9XG4gICAgICAgIHRoaXMuX2NvbXBpbGVDb21wb25lbnQob3V0cHV0Q3R4LCBob3N0TWV0YSwgbmdNb2R1bGUsIFtjb21wTWV0YS50eXBlXSwgbnVsbCwgZmlsZVN1ZmZpeClcbiAgICAgICAgICAgIC52aWV3Q2xhc3NWYXI7XG4gICAgY29uc3QgY29tcEZhY3RvcnlWYXIgPSBjb21wb25lbnRGYWN0b3J5TmFtZShjb21wTWV0YS50eXBlLnJlZmVyZW5jZSk7XG4gICAgY29uc3QgaW5wdXRzRXhwcnM6IG8uTGl0ZXJhbE1hcEVudHJ5W10gPSBbXTtcbiAgICBmb3IgKGxldCBwcm9wTmFtZSBpbiBjb21wTWV0YS5pbnB1dHMpIHtcbiAgICAgIGNvbnN0IHRlbXBsYXRlTmFtZSA9IGNvbXBNZXRhLmlucHV0c1twcm9wTmFtZV07XG4gICAgICAvLyBEb24ndCBxdW90ZSBzbyB0aGF0IHRoZSBrZXkgZ2V0cyBtaW5pZmllZC4uLlxuICAgICAgaW5wdXRzRXhwcnMucHVzaChuZXcgby5MaXRlcmFsTWFwRW50cnkocHJvcE5hbWUsIG8ubGl0ZXJhbCh0ZW1wbGF0ZU5hbWUpLCBmYWxzZSkpO1xuICAgIH1cbiAgICBjb25zdCBvdXRwdXRzRXhwcnM6IG8uTGl0ZXJhbE1hcEVudHJ5W10gPSBbXTtcbiAgICBmb3IgKGxldCBwcm9wTmFtZSBpbiBjb21wTWV0YS5vdXRwdXRzKSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZU5hbWUgPSBjb21wTWV0YS5vdXRwdXRzW3Byb3BOYW1lXTtcbiAgICAgIC8vIERvbid0IHF1b3RlIHNvIHRoYXQgdGhlIGtleSBnZXRzIG1pbmlmaWVkLi4uXG4gICAgICBvdXRwdXRzRXhwcnMucHVzaChuZXcgby5MaXRlcmFsTWFwRW50cnkocHJvcE5hbWUsIG8ubGl0ZXJhbCh0ZW1wbGF0ZU5hbWUpLCBmYWxzZSkpO1xuICAgIH1cblxuICAgIG91dHB1dEN0eC5zdGF0ZW1lbnRzLnB1c2goXG4gICAgICAgIG8udmFyaWFibGUoY29tcEZhY3RvcnlWYXIpXG4gICAgICAgICAgICAuc2V0KG8uaW1wb3J0RXhwcihJZGVudGlmaWVycy5jcmVhdGVDb21wb25lbnRGYWN0b3J5KS5jYWxsRm4oW1xuICAgICAgICAgICAgICBvLmxpdGVyYWwoY29tcE1ldGEuc2VsZWN0b3IpLCBvdXRwdXRDdHguaW1wb3J0RXhwcihjb21wTWV0YS50eXBlLnJlZmVyZW5jZSksXG4gICAgICAgICAgICAgIG8udmFyaWFibGUoaG9zdFZpZXdGYWN0b3J5VmFyKSwgbmV3IG8uTGl0ZXJhbE1hcEV4cHIoaW5wdXRzRXhwcnMpLFxuICAgICAgICAgICAgICBuZXcgby5MaXRlcmFsTWFwRXhwcihvdXRwdXRzRXhwcnMpLFxuICAgICAgICAgICAgICBvLmxpdGVyYWxBcnIoXG4gICAgICAgICAgICAgICAgICBjb21wTWV0YS50ZW1wbGF0ZSAhLm5nQ29udGVudFNlbGVjdG9ycy5tYXAoc2VsZWN0b3IgPT4gby5saXRlcmFsKHNlbGVjdG9yKSkpXG4gICAgICAgICAgICBdKSlcbiAgICAgICAgICAgIC50b0RlY2xTdG10KFxuICAgICAgICAgICAgICAgIG8uaW1wb3J0VHlwZShcbiAgICAgICAgICAgICAgICAgICAgSWRlbnRpZmllcnMuQ29tcG9uZW50RmFjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgW28uZXhwcmVzc2lvblR5cGUob3V0cHV0Q3R4LmltcG9ydEV4cHIoY29tcE1ldGEudHlwZS5yZWZlcmVuY2UpKSAhXSxcbiAgICAgICAgICAgICAgICAgICAgW28uVHlwZU1vZGlmaWVyLkNvbnN0XSksXG4gICAgICAgICAgICAgICAgW28uU3RtdE1vZGlmaWVyLkZpbmFsLCBvLlN0bXRNb2RpZmllci5FeHBvcnRlZF0pKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBpbGVDb21wb25lbnQoXG4gICAgICBvdXRwdXRDdHg6IE91dHB1dENvbnRleHQsIGNvbXBNZXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICBuZ01vZHVsZTogQ29tcGlsZU5nTW9kdWxlTWV0YWRhdGEsIGRpcmVjdGl2ZUlkZW50aWZpZXJzOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhW10sXG4gICAgICBjb21wb25lbnRTdHlsZXM6IENvbXBpbGVkU3R5bGVzaGVldHxudWxsLCBmaWxlU3VmZml4OiBzdHJpbmcpOiBWaWV3Q29tcGlsZVJlc3VsdCB7XG4gICAgY29uc3Qge3RlbXBsYXRlOiBwYXJzZWRUZW1wbGF0ZSwgcGlwZXM6IHVzZWRQaXBlc30gPVxuICAgICAgICB0aGlzLl9wYXJzZVRlbXBsYXRlKGNvbXBNZXRhLCBuZ01vZHVsZSwgZGlyZWN0aXZlSWRlbnRpZmllcnMpO1xuICAgIGNvbnN0IHN0eWxlc0V4cHIgPSBjb21wb25lbnRTdHlsZXMgPyBvLnZhcmlhYmxlKGNvbXBvbmVudFN0eWxlcy5zdHlsZXNWYXIpIDogby5saXRlcmFsQXJyKFtdKTtcbiAgICBjb25zdCB2aWV3UmVzdWx0ID0gdGhpcy5fdmlld0NvbXBpbGVyLmNvbXBpbGVDb21wb25lbnQoXG4gICAgICAgIG91dHB1dEN0eCwgY29tcE1ldGEsIHBhcnNlZFRlbXBsYXRlLCBzdHlsZXNFeHByLCB1c2VkUGlwZXMpO1xuICAgIGlmIChjb21wb25lbnRTdHlsZXMpIHtcbiAgICAgIF9yZXNvbHZlU3R5bGVTdGF0ZW1lbnRzKFxuICAgICAgICAgIHRoaXMuX3N5bWJvbFJlc29sdmVyLCBjb21wb25lbnRTdHlsZXMsIHRoaXMuX3N0eWxlQ29tcGlsZXIubmVlZHNTdHlsZVNoaW0oY29tcE1ldGEpLFxuICAgICAgICAgIGZpbGVTdWZmaXgpO1xuICAgIH1cbiAgICByZXR1cm4gdmlld1Jlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVGVtcGxhdGUoXG4gICAgICBjb21wTWV0YTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLCBuZ01vZHVsZTogQ29tcGlsZU5nTW9kdWxlTWV0YWRhdGEsXG4gICAgICBkaXJlY3RpdmVJZGVudGlmaWVyczogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YVtdKTpcbiAgICAgIHt0ZW1wbGF0ZTogVGVtcGxhdGVBc3RbXSwgcGlwZXM6IENvbXBpbGVQaXBlU3VtbWFyeVtdfSB7XG4gICAgaWYgKHRoaXMuX3RlbXBsYXRlQXN0Q2FjaGUuaGFzKGNvbXBNZXRhLnR5cGUucmVmZXJlbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlQXN0Q2FjaGUuZ2V0KGNvbXBNZXRhLnR5cGUucmVmZXJlbmNlKSAhO1xuICAgIH1cbiAgICBjb25zdCBwcmVzZXJ2ZVdoaXRlc3BhY2VzID0gY29tcE1ldGEgIS50ZW1wbGF0ZSAhLnByZXNlcnZlV2hpdGVzcGFjZXM7XG4gICAgY29uc3QgZGlyZWN0aXZlcyA9XG4gICAgICAgIGRpcmVjdGl2ZUlkZW50aWZpZXJzLm1hcChkaXIgPT4gdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXREaXJlY3RpdmVTdW1tYXJ5KGRpci5yZWZlcmVuY2UpKTtcbiAgICBjb25zdCBwaXBlcyA9IG5nTW9kdWxlLnRyYW5zaXRpdmVNb2R1bGUucGlwZXMubWFwKFxuICAgICAgICBwaXBlID0+IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0UGlwZVN1bW1hcnkocGlwZS5yZWZlcmVuY2UpKTtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl90ZW1wbGF0ZVBhcnNlci5wYXJzZShcbiAgICAgICAgY29tcE1ldGEsIGNvbXBNZXRhLnRlbXBsYXRlICEuaHRtbEFzdCAhLCBkaXJlY3RpdmVzLCBwaXBlcywgbmdNb2R1bGUuc2NoZW1hcyxcbiAgICAgICAgdGVtcGxhdGVTb3VyY2VVcmwobmdNb2R1bGUudHlwZSwgY29tcE1ldGEsIGNvbXBNZXRhLnRlbXBsYXRlICEpLCBwcmVzZXJ2ZVdoaXRlc3BhY2VzKTtcbiAgICB0aGlzLl90ZW1wbGF0ZUFzdENhY2hlLnNldChjb21wTWV0YS50eXBlLnJlZmVyZW5jZSwgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlT3V0cHV0Q29udGV4dChnZW5GaWxlUGF0aDogc3RyaW5nKTogT3V0cHV0Q29udGV4dCB7XG4gICAgY29uc3QgaW1wb3J0RXhwciA9XG4gICAgICAgIChzeW1ib2w6IFN0YXRpY1N5bWJvbCwgdHlwZVBhcmFtczogby5UeXBlW10gfCBudWxsID0gbnVsbCxcbiAgICAgICAgIHVzZVN1bW1hcmllczogYm9vbGVhbiA9IHRydWUpID0+IHtcbiAgICAgICAgICBpZiAoIShzeW1ib2wgaW5zdGFuY2VvZiBTdGF0aWNTeW1ib2wpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludGVybmFsIGVycm9yOiB1bmtub3duIGlkZW50aWZpZXIgJHtKU09OLnN0cmluZ2lmeShzeW1ib2wpfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBhcml0eSA9IHRoaXMuX3N5bWJvbFJlc29sdmVyLmdldFR5cGVBcml0eShzeW1ib2wpIHx8IDA7XG4gICAgICAgICAgY29uc3Qge2ZpbGVQYXRoLCBuYW1lLCBtZW1iZXJzfSA9XG4gICAgICAgICAgICAgIHRoaXMuX3N5bWJvbFJlc29sdmVyLmdldEltcG9ydEFzKHN5bWJvbCwgdXNlU3VtbWFyaWVzKSB8fCBzeW1ib2w7XG4gICAgICAgICAgY29uc3QgaW1wb3J0TW9kdWxlID0gdGhpcy5fZmlsZU5hbWVUb01vZHVsZU5hbWUoZmlsZVBhdGgsIGdlbkZpbGVQYXRoKTtcblxuICAgICAgICAgIC8vIEl0IHNob3VsZCBiZSBnb29kIGVub3VnaCB0byBjb21wYXJlIGZpbGVQYXRoIHRvIGdlbkZpbGVQYXRoIGFuZCBpZiB0aGV5IGFyZSBlcXVhbFxuICAgICAgICAgIC8vIHRoZXJlIGlzIGEgc2VsZiByZWZlcmVuY2UuIEhvd2V2ZXIsIG5nZmFjdG9yeSBmaWxlcyBnZW5lcmF0ZSB0byAudHMgYnV0IHRoZWlyXG4gICAgICAgICAgLy8gc3ltYm9scyBoYXZlIC5kLnRzIHNvIGEgc2ltcGxlIGNvbXBhcmUgaXMgaW5zdWZmaWNpZW50LiBUaGV5IHNob3VsZCBiZSBjYW5vbmljYWxcbiAgICAgICAgICAvLyBhbmQgaXMgdHJhY2tlZCBieSAjMTc3MDUuXG4gICAgICAgICAgY29uc3Qgc2VsZlJlZmVyZW5jZSA9IHRoaXMuX2ZpbGVOYW1lVG9Nb2R1bGVOYW1lKGdlbkZpbGVQYXRoLCBnZW5GaWxlUGF0aCk7XG4gICAgICAgICAgY29uc3QgbW9kdWxlTmFtZSA9IGltcG9ydE1vZHVsZSA9PT0gc2VsZlJlZmVyZW5jZSA/IG51bGwgOiBpbXBvcnRNb2R1bGU7XG5cbiAgICAgICAgICAvLyBJZiB3ZSBhcmUgaW4gYSB0eXBlIGV4cHJlc3Npb24gdGhhdCByZWZlcnMgdG8gYSBnZW5lcmljIHR5cGUgdGhlbiBzdXBwbHlcbiAgICAgICAgICAvLyB0aGUgcmVxdWlyZWQgdHlwZSBwYXJhbWV0ZXJzLiBJZiB0aGVyZSB3ZXJlIG5vdCBlbm91Z2ggdHlwZSBwYXJhbWV0ZXJzXG4gICAgICAgICAgLy8gc3VwcGxpZWQsIHN1cHBseSBhbnkgYXMgdGhlIHR5cGUuIE91dHNpZGUgYSB0eXBlIGV4cHJlc3Npb24gdGhlIHJlZmVyZW5jZVxuICAgICAgICAgIC8vIHNob3VsZCBub3Qgc3VwcGx5IHR5cGUgcGFyYW1ldGVycyBhbmQgYmUgdHJlYXRlZCBhcyBhIHNpbXBsZSB2YWx1ZSByZWZlcmVuY2VcbiAgICAgICAgICAvLyB0byB0aGUgY29uc3RydWN0b3IgZnVuY3Rpb24gaXRzZWxmLlxuICAgICAgICAgIGNvbnN0IHN1cHBsaWVkVHlwZVBhcmFtcyA9IHR5cGVQYXJhbXMgfHwgW107XG4gICAgICAgICAgY29uc3QgbWlzc2luZ1R5cGVQYXJhbXNDb3VudCA9IGFyaXR5IC0gc3VwcGxpZWRUeXBlUGFyYW1zLmxlbmd0aDtcbiAgICAgICAgICBjb25zdCBhbGxUeXBlUGFyYW1zID1cbiAgICAgICAgICAgICAgc3VwcGxpZWRUeXBlUGFyYW1zLmNvbmNhdChuZXcgQXJyYXkobWlzc2luZ1R5cGVQYXJhbXNDb3VudCkuZmlsbChvLkRZTkFNSUNfVFlQRSkpO1xuICAgICAgICAgIHJldHVybiBtZW1iZXJzLnJlZHVjZShcbiAgICAgICAgICAgICAgKGV4cHIsIG1lbWJlck5hbWUpID0+IGV4cHIucHJvcChtZW1iZXJOYW1lKSxcbiAgICAgICAgICAgICAgPG8uRXhwcmVzc2lvbj5vLmltcG9ydEV4cHIoXG4gICAgICAgICAgICAgICAgICBuZXcgby5FeHRlcm5hbFJlZmVyZW5jZShtb2R1bGVOYW1lLCBuYW1lLCBudWxsKSwgYWxsVHlwZVBhcmFtcykpO1xuICAgICAgICB9O1xuXG4gICAgcmV0dXJuIHtzdGF0ZW1lbnRzOiBbXSwgZ2VuRmlsZVBhdGgsIGltcG9ydEV4cHIsIGNvbnN0YW50UG9vbDogbmV3IENvbnN0YW50UG9vbCgpfTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbGVOYW1lVG9Nb2R1bGVOYW1lKGltcG9ydGVkRmlsZVBhdGg6IHN0cmluZywgY29udGFpbmluZ0ZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zdW1tYXJ5UmVzb2x2ZXIuZ2V0S25vd25Nb2R1bGVOYW1lKGltcG9ydGVkRmlsZVBhdGgpIHx8XG4gICAgICAgIHRoaXMuX3N5bWJvbFJlc29sdmVyLmdldEtub3duTW9kdWxlTmFtZShpbXBvcnRlZEZpbGVQYXRoKSB8fFxuICAgICAgICB0aGlzLl9ob3N0LmZpbGVOYW1lVG9Nb2R1bGVOYW1lKGltcG9ydGVkRmlsZVBhdGgsIGNvbnRhaW5pbmdGaWxlUGF0aCk7XG4gIH1cblxuICBwcml2YXRlIF9jb2RlZ2VuU3R5bGVzKFxuICAgICAgc3JjRmlsZVVybDogc3RyaW5nLCBjb21wTWV0YTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgc3R5bGVzaGVldE1ldGFkYXRhOiBDb21waWxlU3R5bGVzaGVldE1ldGFkYXRhLCBpc1NoaW1tZWQ6IGJvb2xlYW4sXG4gICAgICBmaWxlU3VmZml4OiBzdHJpbmcpOiBHZW5lcmF0ZWRGaWxlIHtcbiAgICBjb25zdCBvdXRwdXRDdHggPSB0aGlzLl9jcmVhdGVPdXRwdXRDb250ZXh0KFxuICAgICAgICBfc3R5bGVzTW9kdWxlVXJsKHN0eWxlc2hlZXRNZXRhZGF0YS5tb2R1bGVVcmwgISwgaXNTaGltbWVkLCBmaWxlU3VmZml4KSk7XG4gICAgY29uc3QgY29tcGlsZWRTdHlsZXNoZWV0ID1cbiAgICAgICAgdGhpcy5fc3R5bGVDb21waWxlci5jb21waWxlU3R5bGVzKG91dHB1dEN0eCwgY29tcE1ldGEsIHN0eWxlc2hlZXRNZXRhZGF0YSwgaXNTaGltbWVkKTtcbiAgICBfcmVzb2x2ZVN0eWxlU3RhdGVtZW50cyh0aGlzLl9zeW1ib2xSZXNvbHZlciwgY29tcGlsZWRTdHlsZXNoZWV0LCBpc1NoaW1tZWQsIGZpbGVTdWZmaXgpO1xuICAgIHJldHVybiB0aGlzLl9jb2RlZ2VuU291cmNlTW9kdWxlKHNyY0ZpbGVVcmwsIG91dHB1dEN0eCk7XG4gIH1cblxuICBwcml2YXRlIF9jb2RlZ2VuU291cmNlTW9kdWxlKHNyY0ZpbGVVcmw6IHN0cmluZywgY3R4OiBPdXRwdXRDb250ZXh0KTogR2VuZXJhdGVkRmlsZSB7XG4gICAgcmV0dXJuIG5ldyBHZW5lcmF0ZWRGaWxlKHNyY0ZpbGVVcmwsIGN0eC5nZW5GaWxlUGF0aCwgY3R4LnN0YXRlbWVudHMpO1xuICB9XG5cbiAgbGlzdExhenlSb3V0ZXMoZW50cnlSb3V0ZT86IHN0cmluZywgYW5hbHl6ZWRNb2R1bGVzPzogTmdBbmFseXplZE1vZHVsZXMpOiBMYXp5Um91dGVbXSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgaWYgKGVudHJ5Um91dGUpIHtcbiAgICAgIGNvbnN0IHN5bWJvbCA9IHBhcnNlTGF6eVJvdXRlKGVudHJ5Um91dGUsIHRoaXMucmVmbGVjdG9yKS5yZWZlcmVuY2VkTW9kdWxlO1xuICAgICAgcmV0dXJuIHZpc2l0TGF6eVJvdXRlKHN5bWJvbCk7XG4gICAgfSBlbHNlIGlmIChhbmFseXplZE1vZHVsZXMpIHtcbiAgICAgIGNvbnN0IGFsbExhenlSb3V0ZXM6IExhenlSb3V0ZVtdID0gW107XG4gICAgICBmb3IgKGNvbnN0IG5nTW9kdWxlIG9mIGFuYWx5emVkTW9kdWxlcy5uZ01vZHVsZXMpIHtcbiAgICAgICAgY29uc3QgbGF6eVJvdXRlcyA9IGxpc3RMYXp5Um91dGVzKG5nTW9kdWxlLCB0aGlzLnJlZmxlY3Rvcik7XG4gICAgICAgIGZvciAoY29uc3QgbGF6eVJvdXRlIG9mIGxhenlSb3V0ZXMpIHtcbiAgICAgICAgICBhbGxMYXp5Um91dGVzLnB1c2gobGF6eVJvdXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFsbExhenlSb3V0ZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRWl0aGVyIHJvdXRlIG9yIGFuYWx5emVkTW9kdWxlcyBoYXMgdG8gYmUgc3BlY2lmaWVkIWApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZpc2l0TGF6eVJvdXRlKFxuICAgICAgICBzeW1ib2w6IFN0YXRpY1N5bWJvbCwgc2VlblJvdXRlcyA9IG5ldyBTZXQ8U3RhdGljU3ltYm9sPigpLFxuICAgICAgICBhbGxMYXp5Um91dGVzOiBMYXp5Um91dGVbXSA9IFtdKTogTGF6eVJvdXRlW10ge1xuICAgICAgLy8gU3VwcG9ydCBwb2ludGluZyB0byBkZWZhdWx0IGV4cG9ydHMsIGJ1dCBzdG9wIHJlY3Vyc2luZyB0aGVyZSxcbiAgICAgIC8vIGFzIHRoZSBTdGF0aWNSZWZsZWN0b3IgZG9lcyBub3QgeWV0IHN1cHBvcnQgZGVmYXVsdCBleHBvcnRzLlxuICAgICAgaWYgKHNlZW5Sb3V0ZXMuaGFzKHN5bWJvbCkgfHwgIXN5bWJvbC5uYW1lKSB7XG4gICAgICAgIHJldHVybiBhbGxMYXp5Um91dGVzO1xuICAgICAgfVxuICAgICAgc2VlblJvdXRlcy5hZGQoc3ltYm9sKTtcbiAgICAgIGNvbnN0IGxhenlSb3V0ZXMgPSBsaXN0TGF6eVJvdXRlcyhcbiAgICAgICAgICBzZWxmLl9tZXRhZGF0YVJlc29sdmVyLmdldE5nTW9kdWxlTWV0YWRhdGEoc3ltYm9sLCB0cnVlKSAhLCBzZWxmLnJlZmxlY3Rvcik7XG4gICAgICBmb3IgKGNvbnN0IGxhenlSb3V0ZSBvZiBsYXp5Um91dGVzKSB7XG4gICAgICAgIGFsbExhenlSb3V0ZXMucHVzaChsYXp5Um91dGUpO1xuICAgICAgICB2aXNpdExhenlSb3V0ZShsYXp5Um91dGUucmVmZXJlbmNlZE1vZHVsZSwgc2VlblJvdXRlcywgYWxsTGF6eVJvdXRlcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWxsTGF6eVJvdXRlcztcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUVtcHR5U3R1YihvdXRwdXRDdHg6IE91dHB1dENvbnRleHQpIHtcbiAgLy8gTm90ZTogV2UgbmVlZCB0byBwcm9kdWNlIGF0IGxlYXN0IG9uZSBpbXBvcnQgc3RhdGVtZW50IHNvIHRoYXRcbiAgLy8gVHlwZVNjcmlwdCBrbm93cyB0aGF0IHRoZSBmaWxlIGlzIGFuIGVzNiBtb2R1bGUuIE90aGVyd2lzZSBvdXIgZ2VuZXJhdGVkXG4gIC8vIGV4cG9ydHMgLyBpbXBvcnRzIHdvbid0IGJlIGVtaXR0ZWQgcHJvcGVybHkgYnkgVHlwZVNjcmlwdC5cbiAgb3V0cHV0Q3R4LnN0YXRlbWVudHMucHVzaChvLmltcG9ydEV4cHIoSWRlbnRpZmllcnMuQ29tcG9uZW50RmFjdG9yeSkudG9TdG10KCkpO1xufVxuXG5cbmZ1bmN0aW9uIF9yZXNvbHZlU3R5bGVTdGF0ZW1lbnRzKFxuICAgIHN5bWJvbFJlc29sdmVyOiBTdGF0aWNTeW1ib2xSZXNvbHZlciwgY29tcGlsZVJlc3VsdDogQ29tcGlsZWRTdHlsZXNoZWV0LCBuZWVkc1NoaW06IGJvb2xlYW4sXG4gICAgZmlsZVN1ZmZpeDogc3RyaW5nKTogdm9pZCB7XG4gIGNvbXBpbGVSZXN1bHQuZGVwZW5kZW5jaWVzLmZvckVhY2goKGRlcCkgPT4ge1xuICAgIGRlcC5zZXRWYWx1ZShzeW1ib2xSZXNvbHZlci5nZXRTdGF0aWNTeW1ib2woXG4gICAgICAgIF9zdHlsZXNNb2R1bGVVcmwoZGVwLm1vZHVsZVVybCwgbmVlZHNTaGltLCBmaWxlU3VmZml4KSwgZGVwLm5hbWUpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9zdHlsZXNNb2R1bGVVcmwoc3R5bGVzaGVldFVybDogc3RyaW5nLCBzaGltOiBib29sZWFuLCBzdWZmaXg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgJHtzdHlsZXNoZWV0VXJsfSR7c2hpbSA/ICcuc2hpbScgOiAnJ30ubmdzdHlsZSR7c3VmZml4fWA7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmdBbmFseXplZE1vZHVsZXMge1xuICBuZ01vZHVsZXM6IENvbXBpbGVOZ01vZHVsZU1ldGFkYXRhW107XG4gIG5nTW9kdWxlQnlQaXBlT3JEaXJlY3RpdmU6IE1hcDxTdGF0aWNTeW1ib2wsIENvbXBpbGVOZ01vZHVsZU1ldGFkYXRhPjtcbiAgZmlsZXM6IE5nQW5hbHl6ZWRGaWxlW107XG4gIHN5bWJvbHNNaXNzaW5nTW9kdWxlPzogU3RhdGljU3ltYm9sW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmdBbmFseXplZEZpbGVXaXRoSW5qZWN0YWJsZXMge1xuICBmaWxlTmFtZTogc3RyaW5nO1xuICBpbmplY3RhYmxlczogQ29tcGlsZUluamVjdGFibGVNZXRhZGF0YVtdO1xuICBzaGFsbG93TW9kdWxlczogQ29tcGlsZVNoYWxsb3dNb2R1bGVNZXRhZGF0YVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5nQW5hbHl6ZWRGaWxlIHtcbiAgZmlsZU5hbWU6IHN0cmluZztcbiAgZGlyZWN0aXZlczogU3RhdGljU3ltYm9sW107XG4gIHBpcGVzOiBTdGF0aWNTeW1ib2xbXTtcbiAgbmdNb2R1bGVzOiBDb21waWxlTmdNb2R1bGVNZXRhZGF0YVtdO1xuICBpbmplY3RhYmxlczogQ29tcGlsZUluamVjdGFibGVNZXRhZGF0YVtdO1xuICBleHBvcnRzTm9uU291cmNlRmlsZXM6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmdBbmFseXplTW9kdWxlc0hvc3QgeyBpc1NvdXJjZUZpbGUoZmlsZVBhdGg6IHN0cmluZyk6IGJvb2xlYW47IH1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuYWx5emVOZ01vZHVsZXMoXG4gICAgZmlsZU5hbWVzOiBzdHJpbmdbXSwgaG9zdDogTmdBbmFseXplTW9kdWxlc0hvc3QsIHN0YXRpY1N5bWJvbFJlc29sdmVyOiBTdGF0aWNTeW1ib2xSZXNvbHZlcixcbiAgICBtZXRhZGF0YVJlc29sdmVyOiBDb21waWxlTWV0YWRhdGFSZXNvbHZlcik6IE5nQW5hbHl6ZWRNb2R1bGVzIHtcbiAgY29uc3QgZmlsZXMgPSBfYW5hbHl6ZUZpbGVzSW5jbHVkaW5nTm9uUHJvZ3JhbUZpbGVzKFxuICAgICAgZmlsZU5hbWVzLCBob3N0LCBzdGF0aWNTeW1ib2xSZXNvbHZlciwgbWV0YWRhdGFSZXNvbHZlcik7XG4gIHJldHVybiBtZXJnZUFuYWx5emVkRmlsZXMoZmlsZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYW5hbHl6ZUFuZFZhbGlkYXRlTmdNb2R1bGVzKFxuICAgIGZpbGVOYW1lczogc3RyaW5nW10sIGhvc3Q6IE5nQW5hbHl6ZU1vZHVsZXNIb3N0LCBzdGF0aWNTeW1ib2xSZXNvbHZlcjogU3RhdGljU3ltYm9sUmVzb2x2ZXIsXG4gICAgbWV0YWRhdGFSZXNvbHZlcjogQ29tcGlsZU1ldGFkYXRhUmVzb2x2ZXIpOiBOZ0FuYWx5emVkTW9kdWxlcyB7XG4gIHJldHVybiB2YWxpZGF0ZUFuYWx5emVkTW9kdWxlcyhcbiAgICAgIGFuYWx5emVOZ01vZHVsZXMoZmlsZU5hbWVzLCBob3N0LCBzdGF0aWNTeW1ib2xSZXNvbHZlciwgbWV0YWRhdGFSZXNvbHZlcikpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUFuYWx5emVkTW9kdWxlcyhhbmFseXplZE1vZHVsZXM6IE5nQW5hbHl6ZWRNb2R1bGVzKTogTmdBbmFseXplZE1vZHVsZXMge1xuICBpZiAoYW5hbHl6ZWRNb2R1bGVzLnN5bWJvbHNNaXNzaW5nTW9kdWxlICYmIGFuYWx5emVkTW9kdWxlcy5zeW1ib2xzTWlzc2luZ01vZHVsZS5sZW5ndGgpIHtcbiAgICBjb25zdCBtZXNzYWdlcyA9IGFuYWx5emVkTW9kdWxlcy5zeW1ib2xzTWlzc2luZ01vZHVsZS5tYXAoXG4gICAgICAgIHMgPT5cbiAgICAgICAgICAgIGBDYW5ub3QgZGV0ZXJtaW5lIHRoZSBtb2R1bGUgZm9yIGNsYXNzICR7cy5uYW1lfSBpbiAke3MuZmlsZVBhdGh9ISBBZGQgJHtzLm5hbWV9IHRvIHRoZSBOZ01vZHVsZSB0byBmaXggaXQuYCk7XG4gICAgdGhyb3cgc3ludGF4RXJyb3IobWVzc2FnZXMuam9pbignXFxuJykpO1xuICB9XG4gIHJldHVybiBhbmFseXplZE1vZHVsZXM7XG59XG5cbi8vIEFuYWx5emVzIGFsbCBvZiB0aGUgcHJvZ3JhbSBmaWxlcyxcbi8vIGluY2x1ZGluZyBmaWxlcyB0aGF0IGFyZSBub3QgcGFydCBvZiB0aGUgcHJvZ3JhbVxuLy8gYnV0IGFyZSByZWZlcmVuY2VkIGJ5IGFuIE5nTW9kdWxlLlxuZnVuY3Rpb24gX2FuYWx5emVGaWxlc0luY2x1ZGluZ05vblByb2dyYW1GaWxlcyhcbiAgICBmaWxlTmFtZXM6IHN0cmluZ1tdLCBob3N0OiBOZ0FuYWx5emVNb2R1bGVzSG9zdCwgc3RhdGljU3ltYm9sUmVzb2x2ZXI6IFN0YXRpY1N5bWJvbFJlc29sdmVyLFxuICAgIG1ldGFkYXRhUmVzb2x2ZXI6IENvbXBpbGVNZXRhZGF0YVJlc29sdmVyKTogTmdBbmFseXplZEZpbGVbXSB7XG4gIGNvbnN0IHNlZW5GaWxlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBjb25zdCBmaWxlczogTmdBbmFseXplZEZpbGVbXSA9IFtdO1xuXG4gIGNvbnN0IHZpc2l0RmlsZSA9IChmaWxlTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHNlZW5GaWxlcy5oYXMoZmlsZU5hbWUpIHx8ICFob3N0LmlzU291cmNlRmlsZShmaWxlTmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc2VlbkZpbGVzLmFkZChmaWxlTmFtZSk7XG4gICAgY29uc3QgYW5hbHl6ZWRGaWxlID0gYW5hbHl6ZUZpbGUoaG9zdCwgc3RhdGljU3ltYm9sUmVzb2x2ZXIsIG1ldGFkYXRhUmVzb2x2ZXIsIGZpbGVOYW1lKTtcbiAgICBmaWxlcy5wdXNoKGFuYWx5emVkRmlsZSk7XG4gICAgYW5hbHl6ZWRGaWxlLm5nTW9kdWxlcy5mb3JFYWNoKG5nTW9kdWxlID0+IHtcbiAgICAgIG5nTW9kdWxlLnRyYW5zaXRpdmVNb2R1bGUubW9kdWxlcy5mb3JFYWNoKG1vZE1ldGEgPT4gdmlzaXRGaWxlKG1vZE1ldGEucmVmZXJlbmNlLmZpbGVQYXRoKSk7XG4gICAgfSk7XG4gIH07XG4gIGZpbGVOYW1lcy5mb3JFYWNoKChmaWxlTmFtZSkgPT4gdmlzaXRGaWxlKGZpbGVOYW1lKSk7XG4gIHJldHVybiBmaWxlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuYWx5emVGaWxlKFxuICAgIGhvc3Q6IE5nQW5hbHl6ZU1vZHVsZXNIb3N0LCBzdGF0aWNTeW1ib2xSZXNvbHZlcjogU3RhdGljU3ltYm9sUmVzb2x2ZXIsXG4gICAgbWV0YWRhdGFSZXNvbHZlcjogQ29tcGlsZU1ldGFkYXRhUmVzb2x2ZXIsIGZpbGVOYW1lOiBzdHJpbmcpOiBOZ0FuYWx5emVkRmlsZSB7XG4gIGNvbnN0IGRpcmVjdGl2ZXM6IFN0YXRpY1N5bWJvbFtdID0gW107XG4gIGNvbnN0IHBpcGVzOiBTdGF0aWNTeW1ib2xbXSA9IFtdO1xuICBjb25zdCBpbmplY3RhYmxlczogQ29tcGlsZUluamVjdGFibGVNZXRhZGF0YVtdID0gW107XG4gIGNvbnN0IG5nTW9kdWxlczogQ29tcGlsZU5nTW9kdWxlTWV0YWRhdGFbXSA9IFtdO1xuICBjb25zdCBoYXNEZWNvcmF0b3JzID0gc3RhdGljU3ltYm9sUmVzb2x2ZXIuaGFzRGVjb3JhdG9ycyhmaWxlTmFtZSk7XG4gIGxldCBleHBvcnRzTm9uU291cmNlRmlsZXMgPSBmYWxzZTtcbiAgLy8gRG9uJ3QgYW5hbHl6ZSAuZC50cyBmaWxlcyB0aGF0IGhhdmUgbm8gZGVjb3JhdG9ycyBhcyBhIHNob3J0Y3V0XG4gIC8vIHRvIHNwZWVkIHVwIHRoZSBhbmFseXNpcy4gVGhpcyBwcmV2ZW50cyB1cyBmcm9tXG4gIC8vIHJlc29sdmluZyB0aGUgcmVmZXJlbmNlcyBpbiB0aGVzZSBmaWxlcy5cbiAgLy8gTm90ZTogZXhwb3J0c05vblNvdXJjZUZpbGVzIGlzIG9ubHkgbmVlZGVkIHdoZW4gY29tcGlsaW5nIHdpdGggc3VtbWFyaWVzLFxuICAvLyB3aGljaCBpcyBub3QgdGhlIGNhc2Ugd2hlbiAuZC50cyBmaWxlcyBhcmUgdHJlYXRlZCBhcyBpbnB1dCBmaWxlcy5cbiAgaWYgKCFmaWxlTmFtZS5lbmRzV2l0aCgnLmQudHMnKSB8fCBoYXNEZWNvcmF0b3JzKSB7XG4gICAgc3RhdGljU3ltYm9sUmVzb2x2ZXIuZ2V0U3ltYm9sc09mKGZpbGVOYW1lKS5mb3JFYWNoKChzeW1ib2wpID0+IHtcbiAgICAgIGNvbnN0IHJlc29sdmVkU3ltYm9sID0gc3RhdGljU3ltYm9sUmVzb2x2ZXIucmVzb2x2ZVN5bWJvbChzeW1ib2wpO1xuICAgICAgY29uc3Qgc3ltYm9sTWV0YSA9IHJlc29sdmVkU3ltYm9sLm1ldGFkYXRhO1xuICAgICAgaWYgKCFzeW1ib2xNZXRhIHx8IHN5bWJvbE1ldGEuX19zeW1ib2xpYyA9PT0gJ2Vycm9yJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBsZXQgaXNOZ1N5bWJvbCA9IGZhbHNlO1xuICAgICAgaWYgKHN5bWJvbE1ldGEuX19zeW1ib2xpYyA9PT0gJ2NsYXNzJykge1xuICAgICAgICBpZiAobWV0YWRhdGFSZXNvbHZlci5pc0RpcmVjdGl2ZShzeW1ib2wpKSB7XG4gICAgICAgICAgaXNOZ1N5bWJvbCA9IHRydWU7XG4gICAgICAgICAgZGlyZWN0aXZlcy5wdXNoKHN5bWJvbCk7XG4gICAgICAgIH0gZWxzZSBpZiAobWV0YWRhdGFSZXNvbHZlci5pc1BpcGUoc3ltYm9sKSkge1xuICAgICAgICAgIGlzTmdTeW1ib2wgPSB0cnVlO1xuICAgICAgICAgIHBpcGVzLnB1c2goc3ltYm9sKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRhZGF0YVJlc29sdmVyLmlzTmdNb2R1bGUoc3ltYm9sKSkge1xuICAgICAgICAgIGNvbnN0IG5nTW9kdWxlID0gbWV0YWRhdGFSZXNvbHZlci5nZXROZ01vZHVsZU1ldGFkYXRhKHN5bWJvbCwgZmFsc2UpO1xuICAgICAgICAgIGlmIChuZ01vZHVsZSkge1xuICAgICAgICAgICAgaXNOZ1N5bWJvbCA9IHRydWU7XG4gICAgICAgICAgICBuZ01vZHVsZXMucHVzaChuZ01vZHVsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhUmVzb2x2ZXIuaXNJbmplY3RhYmxlKHN5bWJvbCkpIHtcbiAgICAgICAgICBpc05nU3ltYm9sID0gdHJ1ZTtcbiAgICAgICAgICBjb25zdCBpbmplY3RhYmxlID0gbWV0YWRhdGFSZXNvbHZlci5nZXRJbmplY3RhYmxlTWV0YWRhdGEoc3ltYm9sLCBudWxsLCBmYWxzZSk7XG4gICAgICAgICAgaWYgKGluamVjdGFibGUpIHtcbiAgICAgICAgICAgIGluamVjdGFibGVzLnB1c2goaW5qZWN0YWJsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWlzTmdTeW1ib2wpIHtcbiAgICAgICAgZXhwb3J0c05vblNvdXJjZUZpbGVzID1cbiAgICAgICAgICAgIGV4cG9ydHNOb25Tb3VyY2VGaWxlcyB8fCBpc1ZhbHVlRXhwb3J0aW5nTm9uU291cmNlRmlsZShob3N0LCBzeW1ib2xNZXRhKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4ge1xuICAgICAgZmlsZU5hbWUsIGRpcmVjdGl2ZXMsIHBpcGVzLCBuZ01vZHVsZXMsIGluamVjdGFibGVzLCBleHBvcnRzTm9uU291cmNlRmlsZXMsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmFseXplRmlsZUZvckluamVjdGFibGVzKFxuICAgIGhvc3Q6IE5nQW5hbHl6ZU1vZHVsZXNIb3N0LCBzdGF0aWNTeW1ib2xSZXNvbHZlcjogU3RhdGljU3ltYm9sUmVzb2x2ZXIsXG4gICAgbWV0YWRhdGFSZXNvbHZlcjogQ29tcGlsZU1ldGFkYXRhUmVzb2x2ZXIsIGZpbGVOYW1lOiBzdHJpbmcpOiBOZ0FuYWx5emVkRmlsZVdpdGhJbmplY3RhYmxlcyB7XG4gIGNvbnN0IGluamVjdGFibGVzOiBDb21waWxlSW5qZWN0YWJsZU1ldGFkYXRhW10gPSBbXTtcbiAgY29uc3Qgc2hhbGxvd01vZHVsZXM6IENvbXBpbGVTaGFsbG93TW9kdWxlTWV0YWRhdGFbXSA9IFtdO1xuICBpZiAoc3RhdGljU3ltYm9sUmVzb2x2ZXIuaGFzRGVjb3JhdG9ycyhmaWxlTmFtZSkpIHtcbiAgICBzdGF0aWNTeW1ib2xSZXNvbHZlci5nZXRTeW1ib2xzT2YoZmlsZU5hbWUpLmZvckVhY2goKHN5bWJvbCkgPT4ge1xuICAgICAgY29uc3QgcmVzb2x2ZWRTeW1ib2wgPSBzdGF0aWNTeW1ib2xSZXNvbHZlci5yZXNvbHZlU3ltYm9sKHN5bWJvbCk7XG4gICAgICBjb25zdCBzeW1ib2xNZXRhID0gcmVzb2x2ZWRTeW1ib2wubWV0YWRhdGE7XG4gICAgICBpZiAoIXN5bWJvbE1ldGEgfHwgc3ltYm9sTWV0YS5fX3N5bWJvbGljID09PSAnZXJyb3InKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChzeW1ib2xNZXRhLl9fc3ltYm9saWMgPT09ICdjbGFzcycpIHtcbiAgICAgICAgaWYgKG1ldGFkYXRhUmVzb2x2ZXIuaXNJbmplY3RhYmxlKHN5bWJvbCkpIHtcbiAgICAgICAgICBjb25zdCBpbmplY3RhYmxlID0gbWV0YWRhdGFSZXNvbHZlci5nZXRJbmplY3RhYmxlTWV0YWRhdGEoc3ltYm9sLCBudWxsLCBmYWxzZSk7XG4gICAgICAgICAgaWYgKGluamVjdGFibGUpIHtcbiAgICAgICAgICAgIGluamVjdGFibGVzLnB1c2goaW5qZWN0YWJsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhUmVzb2x2ZXIuaXNOZ01vZHVsZShzeW1ib2wpKSB7XG4gICAgICAgICAgY29uc3QgbW9kdWxlID0gbWV0YWRhdGFSZXNvbHZlci5nZXRTaGFsbG93TW9kdWxlTWV0YWRhdGEoc3ltYm9sKTtcbiAgICAgICAgICBpZiAobW9kdWxlKSB7XG4gICAgICAgICAgICBzaGFsbG93TW9kdWxlcy5wdXNoKG1vZHVsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHtmaWxlTmFtZSwgaW5qZWN0YWJsZXMsIHNoYWxsb3dNb2R1bGVzfTtcbn1cblxuZnVuY3Rpb24gaXNWYWx1ZUV4cG9ydGluZ05vblNvdXJjZUZpbGUoaG9zdDogTmdBbmFseXplTW9kdWxlc0hvc3QsIG1ldGFkYXRhOiBhbnkpOiBib29sZWFuIHtcbiAgbGV0IGV4cG9ydHNOb25Tb3VyY2VGaWxlcyA9IGZhbHNlO1xuXG4gIGNsYXNzIFZpc2l0b3IgaW1wbGVtZW50cyBWYWx1ZVZpc2l0b3Ige1xuICAgIHZpc2l0QXJyYXkoYXJyOiBhbnlbXSwgY29udGV4dDogYW55KTogYW55IHsgYXJyLmZvckVhY2godiA9PiB2aXNpdFZhbHVlKHYsIHRoaXMsIGNvbnRleHQpKTsgfVxuICAgIHZpc2l0U3RyaW5nTWFwKG1hcDoge1trZXk6IHN0cmluZ106IGFueX0sIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgICBPYmplY3Qua2V5cyhtYXApLmZvckVhY2goKGtleSkgPT4gdmlzaXRWYWx1ZShtYXBba2V5XSwgdGhpcywgY29udGV4dCkpO1xuICAgIH1cbiAgICB2aXNpdFByaW1pdGl2ZSh2YWx1ZTogYW55LCBjb250ZXh0OiBhbnkpOiBhbnkge31cbiAgICB2aXNpdE90aGVyKHZhbHVlOiBhbnksIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBTdGF0aWNTeW1ib2wgJiYgIWhvc3QuaXNTb3VyY2VGaWxlKHZhbHVlLmZpbGVQYXRoKSkge1xuICAgICAgICBleHBvcnRzTm9uU291cmNlRmlsZXMgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZpc2l0VmFsdWUobWV0YWRhdGEsIG5ldyBWaXNpdG9yKCksIG51bGwpO1xuICByZXR1cm4gZXhwb3J0c05vblNvdXJjZUZpbGVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VBbmFseXplZEZpbGVzKGFuYWx5emVkRmlsZXM6IE5nQW5hbHl6ZWRGaWxlW10pOiBOZ0FuYWx5emVkTW9kdWxlcyB7XG4gIGNvbnN0IGFsbE5nTW9kdWxlczogQ29tcGlsZU5nTW9kdWxlTWV0YWRhdGFbXSA9IFtdO1xuICBjb25zdCBuZ01vZHVsZUJ5UGlwZU9yRGlyZWN0aXZlID0gbmV3IE1hcDxTdGF0aWNTeW1ib2wsIENvbXBpbGVOZ01vZHVsZU1ldGFkYXRhPigpO1xuICBjb25zdCBhbGxQaXBlc0FuZERpcmVjdGl2ZXMgPSBuZXcgU2V0PFN0YXRpY1N5bWJvbD4oKTtcblxuICBhbmFseXplZEZpbGVzLmZvckVhY2goYWYgPT4ge1xuICAgIGFmLm5nTW9kdWxlcy5mb3JFYWNoKG5nTW9kdWxlID0+IHtcbiAgICAgIGFsbE5nTW9kdWxlcy5wdXNoKG5nTW9kdWxlKTtcbiAgICAgIG5nTW9kdWxlLmRlY2xhcmVkRGlyZWN0aXZlcy5mb3JFYWNoKFxuICAgICAgICAgIGQgPT4gbmdNb2R1bGVCeVBpcGVPckRpcmVjdGl2ZS5zZXQoZC5yZWZlcmVuY2UsIG5nTW9kdWxlKSk7XG4gICAgICBuZ01vZHVsZS5kZWNsYXJlZFBpcGVzLmZvckVhY2gocCA9PiBuZ01vZHVsZUJ5UGlwZU9yRGlyZWN0aXZlLnNldChwLnJlZmVyZW5jZSwgbmdNb2R1bGUpKTtcbiAgICB9KTtcbiAgICBhZi5kaXJlY3RpdmVzLmZvckVhY2goZCA9PiBhbGxQaXBlc0FuZERpcmVjdGl2ZXMuYWRkKGQpKTtcbiAgICBhZi5waXBlcy5mb3JFYWNoKHAgPT4gYWxsUGlwZXNBbmREaXJlY3RpdmVzLmFkZChwKSk7XG4gIH0pO1xuXG4gIGNvbnN0IHN5bWJvbHNNaXNzaW5nTW9kdWxlOiBTdGF0aWNTeW1ib2xbXSA9IFtdO1xuICBhbGxQaXBlc0FuZERpcmVjdGl2ZXMuZm9yRWFjaChyZWYgPT4ge1xuICAgIGlmICghbmdNb2R1bGVCeVBpcGVPckRpcmVjdGl2ZS5oYXMocmVmKSkge1xuICAgICAgc3ltYm9sc01pc3NpbmdNb2R1bGUucHVzaChyZWYpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB7XG4gICAgbmdNb2R1bGVzOiBhbGxOZ01vZHVsZXMsXG4gICAgbmdNb2R1bGVCeVBpcGVPckRpcmVjdGl2ZSxcbiAgICBzeW1ib2xzTWlzc2luZ01vZHVsZSxcbiAgICBmaWxlczogYW5hbHl6ZWRGaWxlc1xuICB9O1xufVxuXG5mdW5jdGlvbiBtZXJnZUFuZFZhbGlkYXRlTmdGaWxlcyhmaWxlczogTmdBbmFseXplZEZpbGVbXSk6IE5nQW5hbHl6ZWRNb2R1bGVzIHtcbiAgcmV0dXJuIHZhbGlkYXRlQW5hbHl6ZWRNb2R1bGVzKG1lcmdlQW5hbHl6ZWRGaWxlcyhmaWxlcykpO1xufVxuIl19