/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { identifierName, ngModuleJitUrl, sharedStylesheetJitUrl, templateJitUrl, templateSourceUrl } from '../compile_metadata';
import { ConstantPool } from '../constant_pool';
import * as ir from '../output/output_ast';
import { interpretStatements } from '../output/output_interpreter';
import { jitStatements } from '../output/output_jit';
import { SyncAsync, stringify } from '../util';
/**
 * An internal module of the Angular compiler that begins with component types,
 * extracts templates, and eventually produces a compiled version of the component
 * ready for linking into an application.
 *
 * @security  When compiling templates at runtime, you must ensure that the entire template comes
 * from a trusted source. Attacker-controlled data introduced by a template could expose your
 * application to XSS risks.  For more detail, see the [Security Guide](http://g.co/ng/security).
 */
var JitCompiler = /** @class */ (function () {
    function JitCompiler(_metadataResolver, _templateParser, _styleCompiler, _viewCompiler, _ngModuleCompiler, _summaryResolver, _reflector, _compilerConfig, _console, getExtraNgModuleProviders) {
        this._metadataResolver = _metadataResolver;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._ngModuleCompiler = _ngModuleCompiler;
        this._summaryResolver = _summaryResolver;
        this._reflector = _reflector;
        this._compilerConfig = _compilerConfig;
        this._console = _console;
        this.getExtraNgModuleProviders = getExtraNgModuleProviders;
        this._compiledTemplateCache = new Map();
        this._compiledHostTemplateCache = new Map();
        this._compiledDirectiveWrapperCache = new Map();
        this._compiledNgModuleCache = new Map();
        this._sharedStylesheetCount = 0;
        this._addedAotSummaries = new Set();
    }
    JitCompiler.prototype.compileModuleSync = function (moduleType) {
        return SyncAsync.assertSync(this._compileModuleAndComponents(moduleType, true));
    };
    JitCompiler.prototype.compileModuleAsync = function (moduleType) {
        return Promise.resolve(this._compileModuleAndComponents(moduleType, false));
    };
    JitCompiler.prototype.compileModuleAndAllComponentsSync = function (moduleType) {
        return SyncAsync.assertSync(this._compileModuleAndAllComponents(moduleType, true));
    };
    JitCompiler.prototype.compileModuleAndAllComponentsAsync = function (moduleType) {
        return Promise.resolve(this._compileModuleAndAllComponents(moduleType, false));
    };
    JitCompiler.prototype.getComponentFactory = function (component) {
        var summary = this._metadataResolver.getDirectiveSummary(component);
        return summary.componentFactory;
    };
    JitCompiler.prototype.loadAotSummaries = function (summaries) {
        this.clearCache();
        this._addAotSummaries(summaries);
    };
    JitCompiler.prototype._addAotSummaries = function (fn) {
        if (this._addedAotSummaries.has(fn)) {
            return;
        }
        this._addedAotSummaries.add(fn);
        var summaries = fn();
        for (var i = 0; i < summaries.length; i++) {
            var entry = summaries[i];
            if (typeof entry === 'function') {
                this._addAotSummaries(entry);
            }
            else {
                var summary = entry;
                this._summaryResolver.addSummary({ symbol: summary.type.reference, metadata: null, type: summary });
            }
        }
    };
    JitCompiler.prototype.hasAotSummary = function (ref) { return !!this._summaryResolver.resolveSummary(ref); };
    JitCompiler.prototype._filterJitIdentifiers = function (ids) {
        var _this = this;
        return ids.map(function (mod) { return mod.reference; }).filter(function (ref) { return !_this.hasAotSummary(ref); });
    };
    JitCompiler.prototype._compileModuleAndComponents = function (moduleType, isSync) {
        var _this = this;
        return SyncAsync.then(this._loadModules(moduleType, isSync), function () {
            _this._compileComponents(moduleType, null);
            return _this._compileModule(moduleType);
        });
    };
    JitCompiler.prototype._compileModuleAndAllComponents = function (moduleType, isSync) {
        var _this = this;
        return SyncAsync.then(this._loadModules(moduleType, isSync), function () {
            var componentFactories = [];
            _this._compileComponents(moduleType, componentFactories);
            return {
                ngModuleFactory: _this._compileModule(moduleType),
                componentFactories: componentFactories
            };
        });
    };
    JitCompiler.prototype._loadModules = function (mainModule, isSync) {
        var _this = this;
        var loading = [];
        var mainNgModule = this._metadataResolver.getNgModuleMetadata(mainModule);
        // Note: for runtime compilation, we want to transitively compile all modules,
        // so we also need to load the declared directives / pipes for all nested modules.
        this._filterJitIdentifiers(mainNgModule.transitiveModule.modules).forEach(function (nestedNgModule) {
            // getNgModuleMetadata only returns null if the value passed in is not an NgModule
            var moduleMeta = _this._metadataResolver.getNgModuleMetadata(nestedNgModule);
            _this._filterJitIdentifiers(moduleMeta.declaredDirectives).forEach(function (ref) {
                var promise = _this._metadataResolver.loadDirectiveMetadata(moduleMeta.type.reference, ref, isSync);
                if (promise) {
                    loading.push(promise);
                }
            });
            _this._filterJitIdentifiers(moduleMeta.declaredPipes)
                .forEach(function (ref) { return _this._metadataResolver.getOrLoadPipeMetadata(ref); });
        });
        return SyncAsync.all(loading);
    };
    JitCompiler.prototype._compileModule = function (moduleType) {
        var ngModuleFactory = this._compiledNgModuleCache.get(moduleType);
        if (!ngModuleFactory) {
            var moduleMeta = this._metadataResolver.getNgModuleMetadata(moduleType);
            // Always provide a bound Compiler
            var extraProviders = this.getExtraNgModuleProviders(moduleMeta.type.reference);
            var outputCtx = createOutputContext();
            var compileResult = this._ngModuleCompiler.compile(outputCtx, moduleMeta, extraProviders);
            ngModuleFactory = this._interpretOrJit(ngModuleJitUrl(moduleMeta), outputCtx.statements)[compileResult.ngModuleFactoryVar];
            this._compiledNgModuleCache.set(moduleMeta.type.reference, ngModuleFactory);
        }
        return ngModuleFactory;
    };
    /**
     * @internal
     */
    JitCompiler.prototype._compileComponents = function (mainModule, allComponentFactories) {
        var _this = this;
        var ngModule = this._metadataResolver.getNgModuleMetadata(mainModule);
        var moduleByJitDirective = new Map();
        var templates = new Set();
        var transJitModules = this._filterJitIdentifiers(ngModule.transitiveModule.modules);
        transJitModules.forEach(function (localMod) {
            var localModuleMeta = _this._metadataResolver.getNgModuleMetadata(localMod);
            _this._filterJitIdentifiers(localModuleMeta.declaredDirectives).forEach(function (dirRef) {
                moduleByJitDirective.set(dirRef, localModuleMeta);
                var dirMeta = _this._metadataResolver.getDirectiveMetadata(dirRef);
                if (dirMeta.isComponent) {
                    templates.add(_this._createCompiledTemplate(dirMeta, localModuleMeta));
                    if (allComponentFactories) {
                        var template = _this._createCompiledHostTemplate(dirMeta.type.reference, localModuleMeta);
                        templates.add(template);
                        allComponentFactories.push(dirMeta.componentFactory);
                    }
                }
            });
        });
        transJitModules.forEach(function (localMod) {
            var localModuleMeta = _this._metadataResolver.getNgModuleMetadata(localMod);
            _this._filterJitIdentifiers(localModuleMeta.declaredDirectives).forEach(function (dirRef) {
                var dirMeta = _this._metadataResolver.getDirectiveMetadata(dirRef);
                if (dirMeta.isComponent) {
                    dirMeta.entryComponents.forEach(function (entryComponentType) {
                        var moduleMeta = moduleByJitDirective.get(entryComponentType.componentType);
                        templates.add(_this._createCompiledHostTemplate(entryComponentType.componentType, moduleMeta));
                    });
                }
            });
            localModuleMeta.entryComponents.forEach(function (entryComponentType) {
                if (!_this.hasAotSummary(entryComponentType.componentType.reference)) {
                    var moduleMeta = moduleByJitDirective.get(entryComponentType.componentType);
                    templates.add(_this._createCompiledHostTemplate(entryComponentType.componentType, moduleMeta));
                }
            });
        });
        templates.forEach(function (template) { return _this._compileTemplate(template); });
    };
    JitCompiler.prototype.clearCacheFor = function (type) {
        this._compiledNgModuleCache.delete(type);
        this._metadataResolver.clearCacheFor(type);
        this._compiledHostTemplateCache.delete(type);
        var compiledTemplate = this._compiledTemplateCache.get(type);
        if (compiledTemplate) {
            this._compiledTemplateCache.delete(type);
        }
    };
    JitCompiler.prototype.clearCache = function () {
        // Note: don't clear the _addedAotSummaries, as they don't change!
        this._metadataResolver.clearCache();
        this._compiledTemplateCache.clear();
        this._compiledHostTemplateCache.clear();
        this._compiledNgModuleCache.clear();
    };
    JitCompiler.prototype._createCompiledHostTemplate = function (compType, ngModule) {
        if (!ngModule) {
            throw new Error("Component " + stringify(compType) + " is not part of any NgModule or the module has not been imported into your module.");
        }
        var compiledTemplate = this._compiledHostTemplateCache.get(compType);
        if (!compiledTemplate) {
            var compMeta = this._metadataResolver.getDirectiveMetadata(compType);
            assertComponent(compMeta);
            var hostMeta = this._metadataResolver.getHostComponentMetadata(compMeta, compMeta.componentFactory.viewDefFactory);
            compiledTemplate =
                new CompiledTemplate(true, compMeta.type, hostMeta, ngModule, [compMeta.type]);
            this._compiledHostTemplateCache.set(compType, compiledTemplate);
        }
        return compiledTemplate;
    };
    JitCompiler.prototype._createCompiledTemplate = function (compMeta, ngModule) {
        var compiledTemplate = this._compiledTemplateCache.get(compMeta.type.reference);
        if (!compiledTemplate) {
            assertComponent(compMeta);
            compiledTemplate = new CompiledTemplate(false, compMeta.type, compMeta, ngModule, ngModule.transitiveModule.directives);
            this._compiledTemplateCache.set(compMeta.type.reference, compiledTemplate);
        }
        return compiledTemplate;
    };
    JitCompiler.prototype._compileTemplate = function (template) {
        var _this = this;
        if (template.isCompiled) {
            return;
        }
        var compMeta = template.compMeta;
        var externalStylesheetsByModuleUrl = new Map();
        var outputContext = createOutputContext();
        var componentStylesheet = this._styleCompiler.compileComponent(outputContext, compMeta);
        compMeta.template.externalStylesheets.forEach(function (stylesheetMeta) {
            var compiledStylesheet = _this._styleCompiler.compileStyles(createOutputContext(), compMeta, stylesheetMeta);
            externalStylesheetsByModuleUrl.set(stylesheetMeta.moduleUrl, compiledStylesheet);
        });
        this._resolveStylesCompileResult(componentStylesheet, externalStylesheetsByModuleUrl);
        var pipes = template.ngModule.transitiveModule.pipes.map(function (pipe) { return _this._metadataResolver.getPipeSummary(pipe.reference); });
        var _a = this._parseTemplate(compMeta, template.ngModule, template.directives), parsedTemplate = _a.template, usedPipes = _a.pipes;
        var compileResult = this._viewCompiler.compileComponent(outputContext, compMeta, parsedTemplate, ir.variable(componentStylesheet.stylesVar), usedPipes);
        var evalResult = this._interpretOrJit(templateJitUrl(template.ngModule.type, template.compMeta), outputContext.statements);
        var viewClass = evalResult[compileResult.viewClassVar];
        var rendererType = evalResult[compileResult.rendererTypeVar];
        template.compiled(viewClass, rendererType);
    };
    JitCompiler.prototype._parseTemplate = function (compMeta, ngModule, directiveIdentifiers) {
        var _this = this;
        // Note: ! is ok here as components always have a template.
        var preserveWhitespaces = compMeta.template.preserveWhitespaces;
        var directives = directiveIdentifiers.map(function (dir) { return _this._metadataResolver.getDirectiveSummary(dir.reference); });
        var pipes = ngModule.transitiveModule.pipes.map(function (pipe) { return _this._metadataResolver.getPipeSummary(pipe.reference); });
        return this._templateParser.parse(compMeta, compMeta.template.htmlAst, directives, pipes, ngModule.schemas, templateSourceUrl(ngModule.type, compMeta, compMeta.template), preserveWhitespaces);
    };
    JitCompiler.prototype._resolveStylesCompileResult = function (result, externalStylesheetsByModuleUrl) {
        var _this = this;
        result.dependencies.forEach(function (dep, i) {
            var nestedCompileResult = externalStylesheetsByModuleUrl.get(dep.moduleUrl);
            var nestedStylesArr = _this._resolveAndEvalStylesCompileResult(nestedCompileResult, externalStylesheetsByModuleUrl);
            dep.setValue(nestedStylesArr);
        });
    };
    JitCompiler.prototype._resolveAndEvalStylesCompileResult = function (result, externalStylesheetsByModuleUrl) {
        this._resolveStylesCompileResult(result, externalStylesheetsByModuleUrl);
        return this._interpretOrJit(sharedStylesheetJitUrl(result.meta, this._sharedStylesheetCount++), result.outputCtx.statements)[result.stylesVar];
    };
    JitCompiler.prototype._interpretOrJit = function (sourceUrl, statements) {
        if (!this._compilerConfig.useJit) {
            return interpretStatements(statements, this._reflector);
        }
        else {
            return jitStatements(sourceUrl, statements, this._reflector, this._compilerConfig.jitDevMode);
        }
    };
    return JitCompiler;
}());
export { JitCompiler };
var CompiledTemplate = /** @class */ (function () {
    function CompiledTemplate(isHost, compType, compMeta, ngModule, directives) {
        this.isHost = isHost;
        this.compType = compType;
        this.compMeta = compMeta;
        this.ngModule = ngModule;
        this.directives = directives;
        this._viewClass = null;
        this.isCompiled = false;
    }
    CompiledTemplate.prototype.compiled = function (viewClass, rendererType) {
        this._viewClass = viewClass;
        this.compMeta.componentViewType.setDelegate(viewClass);
        for (var prop in rendererType) {
            this.compMeta.rendererType[prop] = rendererType[prop];
        }
        this.isCompiled = true;
    };
    return CompiledTemplate;
}());
function assertComponent(meta) {
    if (!meta.isComponent) {
        throw new Error("Could not compile '" + identifierName(meta.type) + "' because it is not a component.");
    }
}
function createOutputContext() {
    var importExpr = function (symbol) {
        return ir.importExpr({ name: identifierName(symbol), moduleName: null, runtime: symbol });
    };
    return { statements: [], genFilePath: '', importExpr: importExpr, constantPool: new ConstantPool() };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvaml0L2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBcU0sY0FBYyxFQUFFLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUdsVSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFJOUMsT0FBTyxLQUFLLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFLbkQsT0FBTyxFQUF5QixTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBUXJFOzs7Ozs7OztHQVFHO0FBQ0g7SUFRRSxxQkFDWSxpQkFBMEMsRUFBVSxlQUErQixFQUNuRixjQUE2QixFQUFVLGFBQTJCLEVBQ2xFLGlCQUFtQyxFQUFVLGdCQUF1QyxFQUNwRixVQUE0QixFQUFVLGVBQStCLEVBQ3JFLFFBQWlCLEVBQ2pCLHlCQUF1RTtRQUx2RSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXlCO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQ25GLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDbEUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBdUI7UUFDcEYsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDckUsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQiw4QkFBeUIsR0FBekIs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LENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JFLEtBQUssSUFBSSxJQUFJLElBQUksWUFBWSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5RDtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFFRCx5QkFBeUIsSUFBOEI7SUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDckIsTUFBTSxJQUFJLEtBQUssQ0FDWCx3QkFBc0IsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUNBQWtDLENBQUMsQ0FBQztLQUN4RjtBQUNILENBQUM7QUFFRDtJQUNFLElBQU0sVUFBVSxHQUFHLFVBQUMsTUFBVztRQUMzQixPQUFBLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBQyxDQUFDO0lBQWhGLENBQWdGLENBQUM7SUFDckYsT0FBTyxFQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxVQUFVLFlBQUEsRUFBRSxZQUFZLEVBQUUsSUFBSSxZQUFZLEVBQUUsRUFBQyxDQUFDO0FBQ3pGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLCBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhLCBDb21waWxlTmdNb2R1bGVNZXRhZGF0YSwgQ29tcGlsZVBpcGVTdW1tYXJ5LCBDb21waWxlUHJvdmlkZXJNZXRhZGF0YSwgQ29tcGlsZVN0eWxlc2hlZXRNZXRhZGF0YSwgQ29tcGlsZVR5cGVTdW1tYXJ5LCBQcm92aWRlck1ldGEsIFByb3h5Q2xhc3MsIGlkZW50aWZpZXJOYW1lLCBuZ01vZHVsZUppdFVybCwgc2hhcmVkU3R5bGVzaGVldEppdFVybCwgdGVtcGxhdGVKaXRVcmwsIHRlbXBsYXRlU291cmNlVXJsfSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCB7Q29tcGlsZVJlZmxlY3Rvcn0gZnJvbSAnLi4vY29tcGlsZV9yZWZsZWN0b3InO1xuaW1wb3J0IHtDb21waWxlckNvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7Q29uc3RhbnRQb29sfSBmcm9tICcuLi9jb25zdGFudF9wb29sJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vY29yZSc7XG5pbXBvcnQge0NvbXBpbGVNZXRhZGF0YVJlc29sdmVyfSBmcm9tICcuLi9tZXRhZGF0YV9yZXNvbHZlcic7XG5pbXBvcnQge05nTW9kdWxlQ29tcGlsZXJ9IGZyb20gJy4uL25nX21vZHVsZV9jb21waWxlcic7XG5pbXBvcnQgKiBhcyBpciBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge2ludGVycHJldFN0YXRlbWVudHN9IGZyb20gJy4uL291dHB1dC9vdXRwdXRfaW50ZXJwcmV0ZXInO1xuaW1wb3J0IHtqaXRTdGF0ZW1lbnRzfSBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2ppdCc7XG5pbXBvcnQge0NvbXBpbGVkU3R5bGVzaGVldCwgU3R5bGVDb21waWxlcn0gZnJvbSAnLi4vc3R5bGVfY29tcGlsZXInO1xuaW1wb3J0IHtTdW1tYXJ5UmVzb2x2ZXJ9IGZyb20gJy4uL3N1bW1hcnlfcmVzb2x2ZXInO1xuaW1wb3J0IHtUZW1wbGF0ZUFzdH0gZnJvbSAnLi4vdGVtcGxhdGVfcGFyc2VyL3RlbXBsYXRlX2FzdCc7XG5pbXBvcnQge1RlbXBsYXRlUGFyc2VyfSBmcm9tICcuLi90ZW1wbGF0ZV9wYXJzZXIvdGVtcGxhdGVfcGFyc2VyJztcbmltcG9ydCB7Q29uc29sZSwgT3V0cHV0Q29udGV4dCwgU3luY0FzeW5jLCBzdHJpbmdpZnl9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtWaWV3Q29tcGlsZXJ9IGZyb20gJy4uL3ZpZXdfY29tcGlsZXIvdmlld19jb21waWxlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kdWxlV2l0aENvbXBvbmVudEZhY3RvcmllcyB7XG4gIG5nTW9kdWxlRmFjdG9yeTogb2JqZWN0O1xuICBjb21wb25lbnRGYWN0b3JpZXM6IG9iamVjdFtdO1xufVxuXG4vKipcbiAqIEFuIGludGVybmFsIG1vZHVsZSBvZiB0aGUgQW5ndWxhciBjb21waWxlciB0aGF0IGJlZ2lucyB3aXRoIGNvbXBvbmVudCB0eXBlcyxcbiAqIGV4dHJhY3RzIHRlbXBsYXRlcywgYW5kIGV2ZW50dWFsbHkgcHJvZHVjZXMgYSBjb21waWxlZCB2ZXJzaW9uIG9mIHRoZSBjb21wb25lbnRcbiAqIHJlYWR5IGZvciBsaW5raW5nIGludG8gYW4gYXBwbGljYXRpb24uXG4gKlxuICogQHNlY3VyaXR5ICBXaGVuIGNvbXBpbGluZyB0ZW1wbGF0ZXMgYXQgcnVudGltZSwgeW91IG11c3QgZW5zdXJlIHRoYXQgdGhlIGVudGlyZSB0ZW1wbGF0ZSBjb21lc1xuICogZnJvbSBhIHRydXN0ZWQgc291cmNlLiBBdHRhY2tlci1jb250cm9sbGVkIGRhdGEgaW50cm9kdWNlZCBieSBhIHRlbXBsYXRlIGNvdWxkIGV4cG9zZSB5b3VyXG4gKiBhcHBsaWNhdGlvbiB0byBYU1Mgcmlza3MuICBGb3IgbW9yZSBkZXRhaWwsIHNlZSB0aGUgW1NlY3VyaXR5IEd1aWRlXShodHRwOi8vZy5jby9uZy9zZWN1cml0eSkuXG4gKi9cbmV4cG9ydCBjbGFzcyBKaXRDb21waWxlciB7XG4gIHByaXZhdGUgX2NvbXBpbGVkVGVtcGxhdGVDYWNoZSA9IG5ldyBNYXA8VHlwZSwgQ29tcGlsZWRUZW1wbGF0ZT4oKTtcbiAgcHJpdmF0ZSBfY29tcGlsZWRIb3N0VGVtcGxhdGVDYWNoZSA9IG5ldyBNYXA8VHlwZSwgQ29tcGlsZWRUZW1wbGF0ZT4oKTtcbiAgcHJpdmF0ZSBfY29tcGlsZWREaXJlY3RpdmVXcmFwcGVyQ2FjaGUgPSBuZXcgTWFwPFR5cGUsIFR5cGU+KCk7XG4gIHByaXZhdGUgX2NvbXBpbGVkTmdNb2R1bGVDYWNoZSA9IG5ldyBNYXA8VHlwZSwgb2JqZWN0PigpO1xuICBwcml2YXRlIF9zaGFyZWRTdHlsZXNoZWV0Q291bnQgPSAwO1xuICBwcml2YXRlIF9hZGRlZEFvdFN1bW1hcmllcyA9IG5ldyBTZXQ8KCkgPT4gYW55W10+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9tZXRhZGF0YVJlc29sdmVyOiBDb21waWxlTWV0YWRhdGFSZXNvbHZlciwgcHJpdmF0ZSBfdGVtcGxhdGVQYXJzZXI6IFRlbXBsYXRlUGFyc2VyLFxuICAgICAgcHJpdmF0ZSBfc3R5bGVDb21waWxlcjogU3R5bGVDb21waWxlciwgcHJpdmF0ZSBfdmlld0NvbXBpbGVyOiBWaWV3Q29tcGlsZXIsXG4gICAgICBwcml2YXRlIF9uZ01vZHVsZUNvbXBpbGVyOiBOZ01vZHVsZUNvbXBpbGVyLCBwcml2YXRlIF9zdW1tYXJ5UmVzb2x2ZXI6IFN1bW1hcnlSZXNvbHZlcjxUeXBlPixcbiAgICAgIHByaXZhdGUgX3JlZmxlY3RvcjogQ29tcGlsZVJlZmxlY3RvciwgcHJpdmF0ZSBfY29tcGlsZXJDb25maWc6IENvbXBpbGVyQ29uZmlnLFxuICAgICAgcHJpdmF0ZSBfY29uc29sZTogQ29uc29sZSxcbiAgICAgIHByaXZhdGUgZ2V0RXh0cmFOZ01vZHVsZVByb3ZpZGVyczogKG5nTW9kdWxlOiBhbnkpID0+IENvbXBpbGVQcm92aWRlck1ldGFkYXRhW10pIHt9XG5cbiAgY29tcGlsZU1vZHVsZVN5bmMobW9kdWxlVHlwZTogVHlwZSk6IG9iamVjdCB7XG4gICAgcmV0dXJuIFN5bmNBc3luYy5hc3NlcnRTeW5jKHRoaXMuX2NvbXBpbGVNb2R1bGVBbmRDb21wb25lbnRzKG1vZHVsZVR5cGUsIHRydWUpKTtcbiAgfVxuXG4gIGNvbXBpbGVNb2R1bGVBc3luYyhtb2R1bGVUeXBlOiBUeXBlKTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2NvbXBpbGVNb2R1bGVBbmRDb21wb25lbnRzKG1vZHVsZVR5cGUsIGZhbHNlKSk7XG4gIH1cblxuICBjb21waWxlTW9kdWxlQW5kQWxsQ29tcG9uZW50c1N5bmMobW9kdWxlVHlwZTogVHlwZSk6IE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXMge1xuICAgIHJldHVybiBTeW5jQXN5bmMuYXNzZXJ0U3luYyh0aGlzLl9jb21waWxlTW9kdWxlQW5kQWxsQ29tcG9uZW50cyhtb2R1bGVUeXBlLCB0cnVlKSk7XG4gIH1cblxuICBjb21waWxlTW9kdWxlQW5kQWxsQ29tcG9uZW50c0FzeW5jKG1vZHVsZVR5cGU6IFR5cGUpOiBQcm9taXNlPE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXM+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2NvbXBpbGVNb2R1bGVBbmRBbGxDb21wb25lbnRzKG1vZHVsZVR5cGUsIGZhbHNlKSk7XG4gIH1cblxuICBnZXRDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudDogVHlwZSk6IG9iamVjdCB7XG4gICAgY29uc3Qgc3VtbWFyeSA9IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0RGlyZWN0aXZlU3VtbWFyeShjb21wb25lbnQpO1xuICAgIHJldHVybiBzdW1tYXJ5LmNvbXBvbmVudEZhY3RvcnkgYXMgb2JqZWN0O1xuICB9XG5cbiAgbG9hZEFvdFN1bW1hcmllcyhzdW1tYXJpZXM6ICgpID0+IGFueVtdKSB7XG4gICAgdGhpcy5jbGVhckNhY2hlKCk7XG4gICAgdGhpcy5fYWRkQW90U3VtbWFyaWVzKHN1bW1hcmllcyk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRBb3RTdW1tYXJpZXMoZm46ICgpID0+IGFueVtdKSB7XG4gICAgaWYgKHRoaXMuX2FkZGVkQW90U3VtbWFyaWVzLmhhcyhmbikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fYWRkZWRBb3RTdW1tYXJpZXMuYWRkKGZuKTtcbiAgICBjb25zdCBzdW1tYXJpZXMgPSBmbigpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3VtbWFyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlbnRyeSA9IHN1bW1hcmllc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgZW50cnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5fYWRkQW90U3VtbWFyaWVzKGVudHJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHN1bW1hcnkgPSBlbnRyeSBhcyBDb21waWxlVHlwZVN1bW1hcnk7XG4gICAgICAgIHRoaXMuX3N1bW1hcnlSZXNvbHZlci5hZGRTdW1tYXJ5KFxuICAgICAgICAgICAge3N5bWJvbDogc3VtbWFyeS50eXBlLnJlZmVyZW5jZSwgbWV0YWRhdGE6IG51bGwsIHR5cGU6IHN1bW1hcnl9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXNBb3RTdW1tYXJ5KHJlZjogVHlwZSkgeyByZXR1cm4gISF0aGlzLl9zdW1tYXJ5UmVzb2x2ZXIucmVzb2x2ZVN1bW1hcnkocmVmKTsgfVxuXG4gIHByaXZhdGUgX2ZpbHRlckppdElkZW50aWZpZXJzKGlkczogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YVtdKTogYW55W10ge1xuICAgIHJldHVybiBpZHMubWFwKG1vZCA9PiBtb2QucmVmZXJlbmNlKS5maWx0ZXIoKHJlZikgPT4gIXRoaXMuaGFzQW90U3VtbWFyeShyZWYpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBpbGVNb2R1bGVBbmRDb21wb25lbnRzKG1vZHVsZVR5cGU6IFR5cGUsIGlzU3luYzogYm9vbGVhbik6IFN5bmNBc3luYzxvYmplY3Q+IHtcbiAgICByZXR1cm4gU3luY0FzeW5jLnRoZW4odGhpcy5fbG9hZE1vZHVsZXMobW9kdWxlVHlwZSwgaXNTeW5jKSwgKCkgPT4ge1xuICAgICAgdGhpcy5fY29tcGlsZUNvbXBvbmVudHMobW9kdWxlVHlwZSwgbnVsbCk7XG4gICAgICByZXR1cm4gdGhpcy5fY29tcGlsZU1vZHVsZShtb2R1bGVUeXBlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBpbGVNb2R1bGVBbmRBbGxDb21wb25lbnRzKG1vZHVsZVR5cGU6IFR5cGUsIGlzU3luYzogYm9vbGVhbik6XG4gICAgICBTeW5jQXN5bmM8TW9kdWxlV2l0aENvbXBvbmVudEZhY3Rvcmllcz4ge1xuICAgIHJldHVybiBTeW5jQXN5bmMudGhlbih0aGlzLl9sb2FkTW9kdWxlcyhtb2R1bGVUeXBlLCBpc1N5bmMpLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb21wb25lbnRGYWN0b3JpZXM6IG9iamVjdFtdID0gW107XG4gICAgICB0aGlzLl9jb21waWxlQ29tcG9uZW50cyhtb2R1bGVUeXBlLCBjb21wb25lbnRGYWN0b3JpZXMpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmdNb2R1bGVGYWN0b3J5OiB0aGlzLl9jb21waWxlTW9kdWxlKG1vZHVsZVR5cGUpLFxuICAgICAgICBjb21wb25lbnRGYWN0b3JpZXM6IGNvbXBvbmVudEZhY3Rvcmllc1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2xvYWRNb2R1bGVzKG1haW5Nb2R1bGU6IGFueSwgaXNTeW5jOiBib29sZWFuKTogU3luY0FzeW5jPGFueT4ge1xuICAgIGNvbnN0IGxvYWRpbmc6IFByb21pc2U8YW55PltdID0gW107XG4gICAgY29uc3QgbWFpbk5nTW9kdWxlID0gdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXROZ01vZHVsZU1ldGFkYXRhKG1haW5Nb2R1bGUpICE7XG4gICAgLy8gTm90ZTogZm9yIHJ1bnRpbWUgY29tcGlsYXRpb24sIHdlIHdhbnQgdG8gdHJhbnNpdGl2ZWx5IGNvbXBpbGUgYWxsIG1vZHVsZXMsXG4gICAgLy8gc28gd2UgYWxzbyBuZWVkIHRvIGxvYWQgdGhlIGRlY2xhcmVkIGRpcmVjdGl2ZXMgLyBwaXBlcyBmb3IgYWxsIG5lc3RlZCBtb2R1bGVzLlxuICAgIHRoaXMuX2ZpbHRlckppdElkZW50aWZpZXJzKG1haW5OZ01vZHVsZS50cmFuc2l0aXZlTW9kdWxlLm1vZHVsZXMpLmZvckVhY2goKG5lc3RlZE5nTW9kdWxlKSA9PiB7XG4gICAgICAvLyBnZXROZ01vZHVsZU1ldGFkYXRhIG9ubHkgcmV0dXJucyBudWxsIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaW4gaXMgbm90IGFuIE5nTW9kdWxlXG4gICAgICBjb25zdCBtb2R1bGVNZXRhID0gdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXROZ01vZHVsZU1ldGFkYXRhKG5lc3RlZE5nTW9kdWxlKSAhO1xuICAgICAgdGhpcy5fZmlsdGVySml0SWRlbnRpZmllcnMobW9kdWxlTWV0YS5kZWNsYXJlZERpcmVjdGl2ZXMpLmZvckVhY2goKHJlZikgPT4ge1xuICAgICAgICBjb25zdCBwcm9taXNlID1cbiAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIubG9hZERpcmVjdGl2ZU1ldGFkYXRhKG1vZHVsZU1ldGEudHlwZS5yZWZlcmVuY2UsIHJlZiwgaXNTeW5jKTtcbiAgICAgICAgaWYgKHByb21pc2UpIHtcbiAgICAgICAgICBsb2FkaW5nLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZmlsdGVySml0SWRlbnRpZmllcnMobW9kdWxlTWV0YS5kZWNsYXJlZFBpcGVzKVxuICAgICAgICAgIC5mb3JFYWNoKChyZWYpID0+IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0T3JMb2FkUGlwZU1ldGFkYXRhKHJlZikpO1xuICAgIH0pO1xuICAgIHJldHVybiBTeW5jQXN5bmMuYWxsKGxvYWRpbmcpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tcGlsZU1vZHVsZShtb2R1bGVUeXBlOiBUeXBlKTogb2JqZWN0IHtcbiAgICBsZXQgbmdNb2R1bGVGYWN0b3J5ID0gdGhpcy5fY29tcGlsZWROZ01vZHVsZUNhY2hlLmdldChtb2R1bGVUeXBlKSAhO1xuICAgIGlmICghbmdNb2R1bGVGYWN0b3J5KSB7XG4gICAgICBjb25zdCBtb2R1bGVNZXRhID0gdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXROZ01vZHVsZU1ldGFkYXRhKG1vZHVsZVR5cGUpICE7XG4gICAgICAvLyBBbHdheXMgcHJvdmlkZSBhIGJvdW5kIENvbXBpbGVyXG4gICAgICBjb25zdCBleHRyYVByb3ZpZGVycyA9IHRoaXMuZ2V0RXh0cmFOZ01vZHVsZVByb3ZpZGVycyhtb2R1bGVNZXRhLnR5cGUucmVmZXJlbmNlKTtcbiAgICAgIGNvbnN0IG91dHB1dEN0eCA9IGNyZWF0ZU91dHB1dENvbnRleHQoKTtcbiAgICAgIGNvbnN0IGNvbXBpbGVSZXN1bHQgPSB0aGlzLl9uZ01vZHVsZUNvbXBpbGVyLmNvbXBpbGUob3V0cHV0Q3R4LCBtb2R1bGVNZXRhLCBleHRyYVByb3ZpZGVycyk7XG4gICAgICBuZ01vZHVsZUZhY3RvcnkgPSB0aGlzLl9pbnRlcnByZXRPckppdChcbiAgICAgICAgICBuZ01vZHVsZUppdFVybChtb2R1bGVNZXRhKSwgb3V0cHV0Q3R4LnN0YXRlbWVudHMpW2NvbXBpbGVSZXN1bHQubmdNb2R1bGVGYWN0b3J5VmFyXTtcbiAgICAgIHRoaXMuX2NvbXBpbGVkTmdNb2R1bGVDYWNoZS5zZXQobW9kdWxlTWV0YS50eXBlLnJlZmVyZW5jZSwgbmdNb2R1bGVGYWN0b3J5KTtcbiAgICB9XG4gICAgcmV0dXJuIG5nTW9kdWxlRmFjdG9yeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF9jb21waWxlQ29tcG9uZW50cyhtYWluTW9kdWxlOiBUeXBlLCBhbGxDb21wb25lbnRGYWN0b3JpZXM6IG9iamVjdFtdfG51bGwpIHtcbiAgICBjb25zdCBuZ01vZHVsZSA9IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0TmdNb2R1bGVNZXRhZGF0YShtYWluTW9kdWxlKSAhO1xuICAgIGNvbnN0IG1vZHVsZUJ5Sml0RGlyZWN0aXZlID0gbmV3IE1hcDxhbnksIENvbXBpbGVOZ01vZHVsZU1ldGFkYXRhPigpO1xuICAgIGNvbnN0IHRlbXBsYXRlcyA9IG5ldyBTZXQ8Q29tcGlsZWRUZW1wbGF0ZT4oKTtcblxuICAgIGNvbnN0IHRyYW5zSml0TW9kdWxlcyA9IHRoaXMuX2ZpbHRlckppdElkZW50aWZpZXJzKG5nTW9kdWxlLnRyYW5zaXRpdmVNb2R1bGUubW9kdWxlcyk7XG4gICAgdHJhbnNKaXRNb2R1bGVzLmZvckVhY2goKGxvY2FsTW9kKSA9PiB7XG4gICAgICBjb25zdCBsb2NhbE1vZHVsZU1ldGEgPSB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmdldE5nTW9kdWxlTWV0YWRhdGEobG9jYWxNb2QpICE7XG4gICAgICB0aGlzLl9maWx0ZXJKaXRJZGVudGlmaWVycyhsb2NhbE1vZHVsZU1ldGEuZGVjbGFyZWREaXJlY3RpdmVzKS5mb3JFYWNoKChkaXJSZWYpID0+IHtcbiAgICAgICAgbW9kdWxlQnlKaXREaXJlY3RpdmUuc2V0KGRpclJlZiwgbG9jYWxNb2R1bGVNZXRhKTtcbiAgICAgICAgY29uc3QgZGlyTWV0YSA9IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0RGlyZWN0aXZlTWV0YWRhdGEoZGlyUmVmKTtcbiAgICAgICAgaWYgKGRpck1ldGEuaXNDb21wb25lbnQpIHtcbiAgICAgICAgICB0ZW1wbGF0ZXMuYWRkKHRoaXMuX2NyZWF0ZUNvbXBpbGVkVGVtcGxhdGUoZGlyTWV0YSwgbG9jYWxNb2R1bGVNZXRhKSk7XG4gICAgICAgICAgaWYgKGFsbENvbXBvbmVudEZhY3Rvcmllcykge1xuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPVxuICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUNvbXBpbGVkSG9zdFRlbXBsYXRlKGRpck1ldGEudHlwZS5yZWZlcmVuY2UsIGxvY2FsTW9kdWxlTWV0YSk7XG4gICAgICAgICAgICB0ZW1wbGF0ZXMuYWRkKHRlbXBsYXRlKTtcbiAgICAgICAgICAgIGFsbENvbXBvbmVudEZhY3Rvcmllcy5wdXNoKGRpck1ldGEuY29tcG9uZW50RmFjdG9yeSBhcyBvYmplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdHJhbnNKaXRNb2R1bGVzLmZvckVhY2goKGxvY2FsTW9kKSA9PiB7XG4gICAgICBjb25zdCBsb2NhbE1vZHVsZU1ldGEgPSB0aGlzLl9tZXRhZGF0YVJlc29sdmVyLmdldE5nTW9kdWxlTWV0YWRhdGEobG9jYWxNb2QpICE7XG4gICAgICB0aGlzLl9maWx0ZXJKaXRJZGVudGlmaWVycyhsb2NhbE1vZHVsZU1ldGEuZGVjbGFyZWREaXJlY3RpdmVzKS5mb3JFYWNoKChkaXJSZWYpID0+IHtcbiAgICAgICAgY29uc3QgZGlyTWV0YSA9IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0RGlyZWN0aXZlTWV0YWRhdGEoZGlyUmVmKTtcbiAgICAgICAgaWYgKGRpck1ldGEuaXNDb21wb25lbnQpIHtcbiAgICAgICAgICBkaXJNZXRhLmVudHJ5Q29tcG9uZW50cy5mb3JFYWNoKChlbnRyeUNvbXBvbmVudFR5cGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1vZHVsZU1ldGEgPSBtb2R1bGVCeUppdERpcmVjdGl2ZS5nZXQoZW50cnlDb21wb25lbnRUeXBlLmNvbXBvbmVudFR5cGUpICE7XG4gICAgICAgICAgICB0ZW1wbGF0ZXMuYWRkKFxuICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUNvbXBpbGVkSG9zdFRlbXBsYXRlKGVudHJ5Q29tcG9uZW50VHlwZS5jb21wb25lbnRUeXBlLCBtb2R1bGVNZXRhKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbG9jYWxNb2R1bGVNZXRhLmVudHJ5Q29tcG9uZW50cy5mb3JFYWNoKChlbnRyeUNvbXBvbmVudFR5cGUpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0FvdFN1bW1hcnkoZW50cnlDb21wb25lbnRUeXBlLmNvbXBvbmVudFR5cGUucmVmZXJlbmNlKSkge1xuICAgICAgICAgIGNvbnN0IG1vZHVsZU1ldGEgPSBtb2R1bGVCeUppdERpcmVjdGl2ZS5nZXQoZW50cnlDb21wb25lbnRUeXBlLmNvbXBvbmVudFR5cGUpICE7XG4gICAgICAgICAgdGVtcGxhdGVzLmFkZChcbiAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlQ29tcGlsZWRIb3N0VGVtcGxhdGUoZW50cnlDb21wb25lbnRUeXBlLmNvbXBvbmVudFR5cGUsIG1vZHVsZU1ldGEpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGVtcGxhdGVzLmZvckVhY2goKHRlbXBsYXRlKSA9PiB0aGlzLl9jb21waWxlVGVtcGxhdGUodGVtcGxhdGUpKTtcbiAgfVxuXG4gIGNsZWFyQ2FjaGVGb3IodHlwZTogVHlwZSkge1xuICAgIHRoaXMuX2NvbXBpbGVkTmdNb2R1bGVDYWNoZS5kZWxldGUodHlwZSk7XG4gICAgdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5jbGVhckNhY2hlRm9yKHR5cGUpO1xuICAgIHRoaXMuX2NvbXBpbGVkSG9zdFRlbXBsYXRlQ2FjaGUuZGVsZXRlKHR5cGUpO1xuICAgIGNvbnN0IGNvbXBpbGVkVGVtcGxhdGUgPSB0aGlzLl9jb21waWxlZFRlbXBsYXRlQ2FjaGUuZ2V0KHR5cGUpO1xuICAgIGlmIChjb21waWxlZFRlbXBsYXRlKSB7XG4gICAgICB0aGlzLl9jb21waWxlZFRlbXBsYXRlQ2FjaGUuZGVsZXRlKHR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyQ2FjaGUoKTogdm9pZCB7XG4gICAgLy8gTm90ZTogZG9uJ3QgY2xlYXIgdGhlIF9hZGRlZEFvdFN1bW1hcmllcywgYXMgdGhleSBkb24ndCBjaGFuZ2UhXG4gICAgdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5jbGVhckNhY2hlKCk7XG4gICAgdGhpcy5fY29tcGlsZWRUZW1wbGF0ZUNhY2hlLmNsZWFyKCk7XG4gICAgdGhpcy5fY29tcGlsZWRIb3N0VGVtcGxhdGVDYWNoZS5jbGVhcigpO1xuICAgIHRoaXMuX2NvbXBpbGVkTmdNb2R1bGVDYWNoZS5jbGVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlQ29tcGlsZWRIb3N0VGVtcGxhdGUoY29tcFR5cGU6IFR5cGUsIG5nTW9kdWxlOiBDb21waWxlTmdNb2R1bGVNZXRhZGF0YSk6XG4gICAgICBDb21waWxlZFRlbXBsYXRlIHtcbiAgICBpZiAoIW5nTW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYENvbXBvbmVudCAke3N0cmluZ2lmeShjb21wVHlwZSl9IGlzIG5vdCBwYXJ0IG9mIGFueSBOZ01vZHVsZSBvciB0aGUgbW9kdWxlIGhhcyBub3QgYmVlbiBpbXBvcnRlZCBpbnRvIHlvdXIgbW9kdWxlLmApO1xuICAgIH1cbiAgICBsZXQgY29tcGlsZWRUZW1wbGF0ZSA9IHRoaXMuX2NvbXBpbGVkSG9zdFRlbXBsYXRlQ2FjaGUuZ2V0KGNvbXBUeXBlKTtcbiAgICBpZiAoIWNvbXBpbGVkVGVtcGxhdGUpIHtcbiAgICAgIGNvbnN0IGNvbXBNZXRhID0gdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXREaXJlY3RpdmVNZXRhZGF0YShjb21wVHlwZSk7XG4gICAgICBhc3NlcnRDb21wb25lbnQoY29tcE1ldGEpO1xuXG4gICAgICBjb25zdCBob3N0TWV0YSA9IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0SG9zdENvbXBvbmVudE1ldGFkYXRhKFxuICAgICAgICAgIGNvbXBNZXRhLCAoY29tcE1ldGEuY29tcG9uZW50RmFjdG9yeSBhcyBhbnkpLnZpZXdEZWZGYWN0b3J5KTtcbiAgICAgIGNvbXBpbGVkVGVtcGxhdGUgPVxuICAgICAgICAgIG5ldyBDb21waWxlZFRlbXBsYXRlKHRydWUsIGNvbXBNZXRhLnR5cGUsIGhvc3RNZXRhLCBuZ01vZHVsZSwgW2NvbXBNZXRhLnR5cGVdKTtcbiAgICAgIHRoaXMuX2NvbXBpbGVkSG9zdFRlbXBsYXRlQ2FjaGUuc2V0KGNvbXBUeXBlLCBjb21waWxlZFRlbXBsYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBpbGVkVGVtcGxhdGU7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVDb21waWxlZFRlbXBsYXRlKFxuICAgICAgY29tcE1ldGE6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgbmdNb2R1bGU6IENvbXBpbGVOZ01vZHVsZU1ldGFkYXRhKTogQ29tcGlsZWRUZW1wbGF0ZSB7XG4gICAgbGV0IGNvbXBpbGVkVGVtcGxhdGUgPSB0aGlzLl9jb21waWxlZFRlbXBsYXRlQ2FjaGUuZ2V0KGNvbXBNZXRhLnR5cGUucmVmZXJlbmNlKTtcbiAgICBpZiAoIWNvbXBpbGVkVGVtcGxhdGUpIHtcbiAgICAgIGFzc2VydENvbXBvbmVudChjb21wTWV0YSk7XG4gICAgICBjb21waWxlZFRlbXBsYXRlID0gbmV3IENvbXBpbGVkVGVtcGxhdGUoXG4gICAgICAgICAgZmFsc2UsIGNvbXBNZXRhLnR5cGUsIGNvbXBNZXRhLCBuZ01vZHVsZSwgbmdNb2R1bGUudHJhbnNpdGl2ZU1vZHVsZS5kaXJlY3RpdmVzKTtcbiAgICAgIHRoaXMuX2NvbXBpbGVkVGVtcGxhdGVDYWNoZS5zZXQoY29tcE1ldGEudHlwZS5yZWZlcmVuY2UsIGNvbXBpbGVkVGVtcGxhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gY29tcGlsZWRUZW1wbGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBpbGVUZW1wbGF0ZSh0ZW1wbGF0ZTogQ29tcGlsZWRUZW1wbGF0ZSkge1xuICAgIGlmICh0ZW1wbGF0ZS5pc0NvbXBpbGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNvbXBNZXRhID0gdGVtcGxhdGUuY29tcE1ldGE7XG4gICAgY29uc3QgZXh0ZXJuYWxTdHlsZXNoZWV0c0J5TW9kdWxlVXJsID0gbmV3IE1hcDxzdHJpbmcsIENvbXBpbGVkU3R5bGVzaGVldD4oKTtcbiAgICBjb25zdCBvdXRwdXRDb250ZXh0ID0gY3JlYXRlT3V0cHV0Q29udGV4dCgpO1xuICAgIGNvbnN0IGNvbXBvbmVudFN0eWxlc2hlZXQgPSB0aGlzLl9zdHlsZUNvbXBpbGVyLmNvbXBpbGVDb21wb25lbnQob3V0cHV0Q29udGV4dCwgY29tcE1ldGEpO1xuICAgIGNvbXBNZXRhLnRlbXBsYXRlICEuZXh0ZXJuYWxTdHlsZXNoZWV0cy5mb3JFYWNoKChzdHlsZXNoZWV0TWV0YSkgPT4ge1xuICAgICAgY29uc3QgY29tcGlsZWRTdHlsZXNoZWV0ID1cbiAgICAgICAgICB0aGlzLl9zdHlsZUNvbXBpbGVyLmNvbXBpbGVTdHlsZXMoY3JlYXRlT3V0cHV0Q29udGV4dCgpLCBjb21wTWV0YSwgc3R5bGVzaGVldE1ldGEpO1xuICAgICAgZXh0ZXJuYWxTdHlsZXNoZWV0c0J5TW9kdWxlVXJsLnNldChzdHlsZXNoZWV0TWV0YS5tb2R1bGVVcmwgISwgY29tcGlsZWRTdHlsZXNoZWV0KTtcbiAgICB9KTtcbiAgICB0aGlzLl9yZXNvbHZlU3R5bGVzQ29tcGlsZVJlc3VsdChjb21wb25lbnRTdHlsZXNoZWV0LCBleHRlcm5hbFN0eWxlc2hlZXRzQnlNb2R1bGVVcmwpO1xuICAgIGNvbnN0IHBpcGVzID0gdGVtcGxhdGUubmdNb2R1bGUudHJhbnNpdGl2ZU1vZHVsZS5waXBlcy5tYXAoXG4gICAgICAgIHBpcGUgPT4gdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXRQaXBlU3VtbWFyeShwaXBlLnJlZmVyZW5jZSkpO1xuICAgIGNvbnN0IHt0ZW1wbGF0ZTogcGFyc2VkVGVtcGxhdGUsIHBpcGVzOiB1c2VkUGlwZXN9ID1cbiAgICAgICAgdGhpcy5fcGFyc2VUZW1wbGF0ZShjb21wTWV0YSwgdGVtcGxhdGUubmdNb2R1bGUsIHRlbXBsYXRlLmRpcmVjdGl2ZXMpO1xuICAgIGNvbnN0IGNvbXBpbGVSZXN1bHQgPSB0aGlzLl92aWV3Q29tcGlsZXIuY29tcGlsZUNvbXBvbmVudChcbiAgICAgICAgb3V0cHV0Q29udGV4dCwgY29tcE1ldGEsIHBhcnNlZFRlbXBsYXRlLCBpci52YXJpYWJsZShjb21wb25lbnRTdHlsZXNoZWV0LnN0eWxlc1ZhciksXG4gICAgICAgIHVzZWRQaXBlcyk7XG4gICAgY29uc3QgZXZhbFJlc3VsdCA9IHRoaXMuX2ludGVycHJldE9ySml0KFxuICAgICAgICB0ZW1wbGF0ZUppdFVybCh0ZW1wbGF0ZS5uZ01vZHVsZS50eXBlLCB0ZW1wbGF0ZS5jb21wTWV0YSksIG91dHB1dENvbnRleHQuc3RhdGVtZW50cyk7XG4gICAgY29uc3Qgdmlld0NsYXNzID0gZXZhbFJlc3VsdFtjb21waWxlUmVzdWx0LnZpZXdDbGFzc1Zhcl07XG4gICAgY29uc3QgcmVuZGVyZXJUeXBlID0gZXZhbFJlc3VsdFtjb21waWxlUmVzdWx0LnJlbmRlcmVyVHlwZVZhcl07XG4gICAgdGVtcGxhdGUuY29tcGlsZWQodmlld0NsYXNzLCByZW5kZXJlclR5cGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUZW1wbGF0ZShcbiAgICAgIGNvbXBNZXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIG5nTW9kdWxlOiBDb21waWxlTmdNb2R1bGVNZXRhZGF0YSxcbiAgICAgIGRpcmVjdGl2ZUlkZW50aWZpZXJzOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhW10pOlxuICAgICAge3RlbXBsYXRlOiBUZW1wbGF0ZUFzdFtdLCBwaXBlczogQ29tcGlsZVBpcGVTdW1tYXJ5W119IHtcbiAgICAvLyBOb3RlOiAhIGlzIG9rIGhlcmUgYXMgY29tcG9uZW50cyBhbHdheXMgaGF2ZSBhIHRlbXBsYXRlLlxuICAgIGNvbnN0IHByZXNlcnZlV2hpdGVzcGFjZXMgPSBjb21wTWV0YS50ZW1wbGF0ZSAhLnByZXNlcnZlV2hpdGVzcGFjZXM7XG4gICAgY29uc3QgZGlyZWN0aXZlcyA9XG4gICAgICAgIGRpcmVjdGl2ZUlkZW50aWZpZXJzLm1hcChkaXIgPT4gdGhpcy5fbWV0YWRhdGFSZXNvbHZlci5nZXREaXJlY3RpdmVTdW1tYXJ5KGRpci5yZWZlcmVuY2UpKTtcbiAgICBjb25zdCBwaXBlcyA9IG5nTW9kdWxlLnRyYW5zaXRpdmVNb2R1bGUucGlwZXMubWFwKFxuICAgICAgICBwaXBlID0+IHRoaXMuX21ldGFkYXRhUmVzb2x2ZXIuZ2V0UGlwZVN1bW1hcnkocGlwZS5yZWZlcmVuY2UpKTtcbiAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGVQYXJzZXIucGFyc2UoXG4gICAgICAgIGNvbXBNZXRhLCBjb21wTWV0YS50ZW1wbGF0ZSAhLmh0bWxBc3QgISwgZGlyZWN0aXZlcywgcGlwZXMsIG5nTW9kdWxlLnNjaGVtYXMsXG4gICAgICAgIHRlbXBsYXRlU291cmNlVXJsKG5nTW9kdWxlLnR5cGUsIGNvbXBNZXRhLCBjb21wTWV0YS50ZW1wbGF0ZSAhKSwgcHJlc2VydmVXaGl0ZXNwYWNlcyk7XG4gIH1cblxuICBwcml2YXRlIF9yZXNvbHZlU3R5bGVzQ29tcGlsZVJlc3VsdChcbiAgICAgIHJlc3VsdDogQ29tcGlsZWRTdHlsZXNoZWV0LCBleHRlcm5hbFN0eWxlc2hlZXRzQnlNb2R1bGVVcmw6IE1hcDxzdHJpbmcsIENvbXBpbGVkU3R5bGVzaGVldD4pIHtcbiAgICByZXN1bHQuZGVwZW5kZW5jaWVzLmZvckVhY2goKGRlcCwgaSkgPT4ge1xuICAgICAgY29uc3QgbmVzdGVkQ29tcGlsZVJlc3VsdCA9IGV4dGVybmFsU3R5bGVzaGVldHNCeU1vZHVsZVVybC5nZXQoZGVwLm1vZHVsZVVybCkgITtcbiAgICAgIGNvbnN0IG5lc3RlZFN0eWxlc0FyciA9IHRoaXMuX3Jlc29sdmVBbmRFdmFsU3R5bGVzQ29tcGlsZVJlc3VsdChcbiAgICAgICAgICBuZXN0ZWRDb21waWxlUmVzdWx0LCBleHRlcm5hbFN0eWxlc2hlZXRzQnlNb2R1bGVVcmwpO1xuICAgICAgZGVwLnNldFZhbHVlKG5lc3RlZFN0eWxlc0Fycik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9yZXNvbHZlQW5kRXZhbFN0eWxlc0NvbXBpbGVSZXN1bHQoXG4gICAgICByZXN1bHQ6IENvbXBpbGVkU3R5bGVzaGVldCxcbiAgICAgIGV4dGVybmFsU3R5bGVzaGVldHNCeU1vZHVsZVVybDogTWFwPHN0cmluZywgQ29tcGlsZWRTdHlsZXNoZWV0Pik6IHN0cmluZ1tdIHtcbiAgICB0aGlzLl9yZXNvbHZlU3R5bGVzQ29tcGlsZVJlc3VsdChyZXN1bHQsIGV4dGVybmFsU3R5bGVzaGVldHNCeU1vZHVsZVVybCk7XG4gICAgcmV0dXJuIHRoaXMuX2ludGVycHJldE9ySml0KFxuICAgICAgICBzaGFyZWRTdHlsZXNoZWV0Sml0VXJsKHJlc3VsdC5tZXRhLCB0aGlzLl9zaGFyZWRTdHlsZXNoZWV0Q291bnQrKyksXG4gICAgICAgIHJlc3VsdC5vdXRwdXRDdHguc3RhdGVtZW50cylbcmVzdWx0LnN0eWxlc1Zhcl07XG4gIH1cblxuICBwcml2YXRlIF9pbnRlcnByZXRPckppdChzb3VyY2VVcmw6IHN0cmluZywgc3RhdGVtZW50czogaXIuU3RhdGVtZW50W10pOiBhbnkge1xuICAgIGlmICghdGhpcy5fY29tcGlsZXJDb25maWcudXNlSml0KSB7XG4gICAgICByZXR1cm4gaW50ZXJwcmV0U3RhdGVtZW50cyhzdGF0ZW1lbnRzLCB0aGlzLl9yZWZsZWN0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaml0U3RhdGVtZW50cyhzb3VyY2VVcmwsIHN0YXRlbWVudHMsIHRoaXMuX3JlZmxlY3RvciwgdGhpcy5fY29tcGlsZXJDb25maWcuaml0RGV2TW9kZSk7XG4gICAgfVxuICB9XG59XG5cbmNsYXNzIENvbXBpbGVkVGVtcGxhdGUge1xuICBwcml2YXRlIF92aWV3Q2xhc3M6IEZ1bmN0aW9uID0gbnVsbCAhO1xuICBpc0NvbXBpbGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgaXNIb3N0OiBib29sZWFuLCBwdWJsaWMgY29tcFR5cGU6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEsXG4gICAgICBwdWJsaWMgY29tcE1ldGE6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgcHVibGljIG5nTW9kdWxlOiBDb21waWxlTmdNb2R1bGVNZXRhZGF0YSxcbiAgICAgIHB1YmxpYyBkaXJlY3RpdmVzOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhW10pIHt9XG5cbiAgY29tcGlsZWQodmlld0NsYXNzOiBGdW5jdGlvbiwgcmVuZGVyZXJUeXBlOiBhbnkpIHtcbiAgICB0aGlzLl92aWV3Q2xhc3MgPSB2aWV3Q2xhc3M7XG4gICAgKDxQcm94eUNsYXNzPnRoaXMuY29tcE1ldGEuY29tcG9uZW50Vmlld1R5cGUpLnNldERlbGVnYXRlKHZpZXdDbGFzcyk7XG4gICAgZm9yIChsZXQgcHJvcCBpbiByZW5kZXJlclR5cGUpIHtcbiAgICAgICg8YW55PnRoaXMuY29tcE1ldGEucmVuZGVyZXJUeXBlKVtwcm9wXSA9IHJlbmRlcmVyVHlwZVtwcm9wXTtcbiAgICB9XG4gICAgdGhpcy5pc0NvbXBpbGVkID0gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRDb21wb25lbnQobWV0YTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhKSB7XG4gIGlmICghbWV0YS5pc0NvbXBvbmVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYENvdWxkIG5vdCBjb21waWxlICcke2lkZW50aWZpZXJOYW1lKG1ldGEudHlwZSl9JyBiZWNhdXNlIGl0IGlzIG5vdCBhIGNvbXBvbmVudC5gKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVPdXRwdXRDb250ZXh0KCk6IE91dHB1dENvbnRleHQge1xuICBjb25zdCBpbXBvcnRFeHByID0gKHN5bWJvbDogYW55KSA9PlxuICAgICAgaXIuaW1wb3J0RXhwcih7bmFtZTogaWRlbnRpZmllck5hbWUoc3ltYm9sKSwgbW9kdWxlTmFtZTogbnVsbCwgcnVudGltZTogc3ltYm9sfSk7XG4gIHJldHVybiB7c3RhdGVtZW50czogW10sIGdlbkZpbGVQYXRoOiAnJywgaW1wb3J0RXhwciwgY29uc3RhbnRQb29sOiBuZXcgQ29uc3RhbnRQb29sKCl9O1xufVxuIl19