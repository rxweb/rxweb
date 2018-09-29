"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const child_process_1 = require("child_process");
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const benchmark_1 = require("./benchmark");
const compiler_host_1 = require("./compiler_host");
const entry_resolver_1 = require("./entry_resolver");
const gather_diagnostics_1 = require("./gather_diagnostics");
const lazy_routes_1 = require("./lazy_routes");
const ngtools_api_1 = require("./ngtools_api");
const paths_plugin_1 = require("./paths-plugin");
const resource_loader_1 = require("./resource_loader");
const transformers_1 = require("./transformers");
const ast_helpers_1 = require("./transformers/ast_helpers");
const type_checker_1 = require("./type_checker");
const virtual_file_system_decorator_1 = require("./virtual_file_system_decorator");
const webpack_input_host_1 = require("./webpack-input-host");
const treeKill = require('tree-kill');
var PLATFORM;
(function (PLATFORM) {
    PLATFORM[PLATFORM["Browser"] = 0] = "Browser";
    PLATFORM[PLATFORM["Server"] = 1] = "Server";
})(PLATFORM = exports.PLATFORM || (exports.PLATFORM = {}));
class AngularCompilerPlugin {
    constructor(options) {
        this._singleFileIncludes = [];
        // Contains `moduleImportPath#exportName` => `fullModulePath`.
        this._lazyRoutes = Object.create(null);
        this._transformers = [];
        this._platformTransformers = null;
        this._JitMode = false;
        this._emitSkipped = true;
        this._changedFileExtensions = new Set(['ts', 'html', 'css']);
        // Webpack plugin.
        this._firstRun = true;
        this._warnings = [];
        this._errors = [];
        // TypeChecker process.
        this._forkTypeChecker = true;
        this._forkedTypeCheckerInitialized = false;
        ngtools_api_1.CompilerCliIsSupported();
        this._options = Object.assign({}, options);
        this._setupOptions(this._options);
    }
    get _ngCompilerSupportsNewApi() {
        if (this._JitMode) {
            return false;
        }
        else {
            return !!this._program.listLazyRoutes;
        }
    }
    get options() { return this._options; }
    get done() { return this._donePromise; }
    get entryModule() {
        if (!this._entryModule) {
            return null;
        }
        const splitted = this._entryModule.split(/(#[a-zA-Z_]([\w]+))$/);
        const path = splitted[0];
        const className = !!splitted[1] ? splitted[1].substring(1) : 'default';
        return { path, className };
    }
    static isSupported() {
        return ngtools_api_1.VERSION && parseInt(ngtools_api_1.VERSION.major) >= 5;
    }
    _setupOptions(options) {
        benchmark_1.time('AngularCompilerPlugin._setupOptions');
        // Fill in the missing options.
        if (!options.hasOwnProperty('tsConfigPath')) {
            throw new Error('Must specify "tsConfigPath" in the configuration of @ngtools/webpack.');
        }
        // TS represents paths internally with '/' and expects the tsconfig path to be in this format
        this._tsConfigPath = options.tsConfigPath.replace(/\\/g, '/');
        // Check the base path.
        const maybeBasePath = path.resolve(process.cwd(), this._tsConfigPath);
        let basePath = maybeBasePath;
        if (fs.statSync(maybeBasePath).isFile()) {
            basePath = path.dirname(basePath);
        }
        if (options.basePath !== undefined) {
            basePath = path.resolve(process.cwd(), options.basePath);
        }
        if (options.singleFileIncludes !== undefined) {
            this._singleFileIncludes.push(...options.singleFileIncludes);
        }
        // Parse the tsconfig contents.
        const config = ngtools_api_1.readConfiguration(this._tsConfigPath);
        if (config.errors && config.errors.length) {
            throw new Error(ngtools_api_1.formatDiagnostics(config.errors));
        }
        this._rootNames = config.rootNames.concat(...this._singleFileIncludes);
        this._compilerOptions = Object.assign({}, config.options, options.compilerOptions);
        this._basePath = config.options.basePath || basePath || '';
        // Overwrite outDir so we can find generated files next to their .ts origin in compilerHost.
        this._compilerOptions.outDir = '';
        this._compilerOptions.suppressOutputPathCheck = true;
        // Default plugin sourceMap to compiler options setting.
        if (!options.hasOwnProperty('sourceMap')) {
            options.sourceMap = this._compilerOptions.sourceMap || false;
        }
        // Force the right sourcemap options.
        if (options.sourceMap) {
            this._compilerOptions.sourceMap = true;
            this._compilerOptions.inlineSources = true;
            this._compilerOptions.inlineSourceMap = false;
            this._compilerOptions.mapRoot = undefined;
            // We will set the source to the full path of the file in the loader, so we don't
            // need sourceRoot here.
            this._compilerOptions.sourceRoot = undefined;
        }
        else {
            this._compilerOptions.sourceMap = false;
            this._compilerOptions.sourceRoot = undefined;
            this._compilerOptions.inlineSources = undefined;
            this._compilerOptions.inlineSourceMap = undefined;
            this._compilerOptions.mapRoot = undefined;
            this._compilerOptions.sourceRoot = undefined;
        }
        // We want to allow emitting with errors so that imports can be added
        // to the webpack dependency tree and rebuilds triggered by file edits.
        this._compilerOptions.noEmitOnError = false;
        // Set JIT (no code generation) or AOT mode.
        if (options.skipCodeGeneration !== undefined) {
            this._JitMode = options.skipCodeGeneration;
        }
        // Process i18n options.
        if (options.i18nInFile !== undefined) {
            this._compilerOptions.i18nInFile = options.i18nInFile;
        }
        if (options.i18nInFormat !== undefined) {
            this._compilerOptions.i18nInFormat = options.i18nInFormat;
        }
        if (options.i18nOutFile !== undefined) {
            this._compilerOptions.i18nOutFile = options.i18nOutFile;
        }
        if (options.i18nOutFormat !== undefined) {
            this._compilerOptions.i18nOutFormat = options.i18nOutFormat;
        }
        if (options.locale !== undefined) {
            this._compilerOptions.i18nInLocale = options.locale;
            this._compilerOptions.i18nOutLocale = options.locale;
            this._normalizedLocale = this._validateLocale(options.locale);
        }
        if (options.missingTranslation !== undefined) {
            this._compilerOptions.i18nInMissingTranslations =
                options.missingTranslation;
        }
        // Process forked type checker options.
        if (options.forkTypeChecker !== undefined) {
            this._forkTypeChecker = options.forkTypeChecker;
        }
        // Add custom platform transformers.
        if (options.platformTransformers !== undefined) {
            this._platformTransformers = options.platformTransformers;
        }
        // Default ContextElementDependency to the one we can import from here.
        // Failing to use the right ContextElementDependency will throw the error below:
        // "No module factory available for dependency type: ContextElementDependency"
        // Hoisting together with peer dependencies can make it so the imported
        // ContextElementDependency does not come from the same Webpack instance that is used
        // in the compilation. In that case, we can pass the right one as an option to the plugin.
        this._contextElementDependencyConstructor = options.contextElementDependencyConstructor
            || require('webpack/lib/dependencies/ContextElementDependency');
        // Use entryModule if available in options, otherwise resolve it from mainPath after program
        // creation.
        if (this._options.entryModule) {
            this._entryModule = this._options.entryModule;
        }
        else if (this._compilerOptions.entryModule) {
            this._entryModule = path.resolve(this._basePath, this._compilerOptions.entryModule); // temporary cast for type issue
        }
        // Set platform.
        this._platform = options.platform || PLATFORM.Browser;
        // Make transformers.
        this._makeTransformers();
        benchmark_1.timeEnd('AngularCompilerPlugin._setupOptions');
    }
    _getTsProgram() {
        return this._JitMode ? this._program : this._program.getTsProgram();
    }
    _getChangedTsFiles() {
        return this._compilerHost.getChangedFilePaths()
            .filter(k => (k.endsWith('.ts') || k.endsWith('.tsx')) && !k.endsWith('.d.ts'))
            .filter(k => this._compilerHost.fileExists(k));
    }
    updateChangedFileExtensions(extension) {
        if (extension) {
            this._changedFileExtensions.add(extension);
        }
    }
    _getChangedCompilationFiles() {
        return this._compilerHost.getChangedFilePaths()
            .filter(k => {
            for (const ext of this._changedFileExtensions) {
                if (k.endsWith(ext)) {
                    return true;
                }
            }
            return false;
        });
    }
    _createOrUpdateProgram() {
        return Promise.resolve()
            .then(() => {
            // Get the root files from the ts config.
            // When a new root name (like a lazy route) is added, it won't be available from
            // following imports on the existing files, so we need to get the new list of root files.
            const config = ngtools_api_1.readConfiguration(this._tsConfigPath);
            this._rootNames = config.rootNames.concat(...this._singleFileIncludes);
            // Update the forked type checker with all changed compilation files.
            // This includes templates, that also need to be reloaded on the type checker.
            if (this._forkTypeChecker && this._typeCheckerProcess && !this._firstRun) {
                this._updateForkedTypeChecker(this._rootNames, this._getChangedCompilationFiles());
            }
            // Use an identity function as all our paths are absolute already.
            this._moduleResolutionCache = ts.createModuleResolutionCache(this._basePath, x => x);
            if (this._JitMode) {
                // Create the TypeScript program.
                benchmark_1.time('AngularCompilerPlugin._createOrUpdateProgram.ts.createProgram');
                this._program = ts.createProgram(this._rootNames, this._compilerOptions, this._compilerHost, this._program);
                benchmark_1.timeEnd('AngularCompilerPlugin._createOrUpdateProgram.ts.createProgram');
                return Promise.resolve();
            }
            else {
                benchmark_1.time('AngularCompilerPlugin._createOrUpdateProgram.ng.createProgram');
                // Create the Angular program.
                this._program = ngtools_api_1.createProgram({
                    rootNames: this._rootNames,
                    options: this._compilerOptions,
                    host: this._compilerHost,
                    oldProgram: this._program,
                });
                benchmark_1.timeEnd('AngularCompilerPlugin._createOrUpdateProgram.ng.createProgram');
                benchmark_1.time('AngularCompilerPlugin._createOrUpdateProgram.ng.loadNgStructureAsync');
                return this._program.loadNgStructureAsync()
                    .then(() => {
                    benchmark_1.timeEnd('AngularCompilerPlugin._createOrUpdateProgram.ng.loadNgStructureAsync');
                });
            }
        })
            .then(() => {
            // If there's still no entryModule try to resolve from mainPath.
            if (!this._entryModule && this._mainPath) {
                benchmark_1.time('AngularCompilerPlugin._make.resolveEntryModuleFromMain');
                this._entryModule = entry_resolver_1.resolveEntryModuleFromMain(this._mainPath, this._compilerHost, this._getTsProgram());
                benchmark_1.timeEnd('AngularCompilerPlugin._make.resolveEntryModuleFromMain');
            }
        });
    }
    _getLazyRoutesFromNgtools() {
        try {
            benchmark_1.time('AngularCompilerPlugin._getLazyRoutesFromNgtools');
            const result = ngtools_api_1.__NGTOOLS_PRIVATE_API_2.listLazyRoutes({
                program: this._getTsProgram(),
                host: this._compilerHost,
                angularCompilerOptions: Object.assign({}, this._compilerOptions, {
                    // genDir seems to still be needed in @angular\compiler-cli\src\compiler_host.js:226.
                    genDir: '',
                }),
                // TODO: fix compiler-cli typings; entryModule should not be string, but also optional.
                // tslint:disable-next-line:non-null-operator
                entryModule: this._entryModule,
            });
            benchmark_1.timeEnd('AngularCompilerPlugin._getLazyRoutesFromNgtools');
            return result;
        }
        catch (err) {
            // We silence the error that the @angular/router could not be found. In that case, there is
            // basically no route supported by the app itself.
            if (err.message.startsWith('Could not resolve module @angular/router')) {
                return {};
            }
            else {
                throw err;
            }
        }
    }
    _findLazyRoutesInAst(changedFilePaths) {
        benchmark_1.time('AngularCompilerPlugin._findLazyRoutesInAst');
        const result = Object.create(null);
        for (const filePath of changedFilePaths) {
            const fileLazyRoutes = lazy_routes_1.findLazyRoutes(filePath, this._compilerHost, undefined, this._compilerOptions);
            for (const routeKey of Object.keys(fileLazyRoutes)) {
                const route = fileLazyRoutes[routeKey];
                result[routeKey] = route;
            }
        }
        benchmark_1.timeEnd('AngularCompilerPlugin._findLazyRoutesInAst');
        return result;
    }
    _listLazyRoutesFromProgram() {
        const ngProgram = this._program;
        if (!ngProgram.listLazyRoutes) {
            throw new Error('_listLazyRoutesFromProgram was called with an old program.');
        }
        const lazyRoutes = ngProgram.listLazyRoutes();
        return lazyRoutes.reduce((acc, curr) => {
            const ref = curr.route;
            if (ref in acc && acc[ref] !== curr.referencedModule.filePath) {
                throw new Error(+`Duplicated path in loadChildren detected: "${ref}" is used in 2 loadChildren, `
                    + `but they point to different modules "(${acc[ref]} and `
                    + `"${curr.referencedModule.filePath}"). Webpack cannot distinguish on context and `
                    + 'would fail to load the proper one.');
            }
            acc[ref] = curr.referencedModule.filePath;
            return acc;
        }, {});
    }
    // Process the lazy routes discovered, adding then to _lazyRoutes.
    // TODO: find a way to remove lazy routes that don't exist anymore.
    // This will require a registry of known references to a lazy route, removing it when no
    // module references it anymore.
    _processLazyRoutes(discoveredLazyRoutes) {
        Object.keys(discoveredLazyRoutes)
            .forEach(lazyRouteKey => {
            const [lazyRouteModule, moduleName] = lazyRouteKey.split('#');
            if (!lazyRouteModule) {
                return;
            }
            const lazyRouteTSFile = discoveredLazyRoutes[lazyRouteKey].replace(/\\/g, '/');
            let modulePath, moduleKey;
            if (this._JitMode) {
                modulePath = lazyRouteTSFile;
                moduleKey = `${lazyRouteModule}${moduleName ? '#' + moduleName : ''}`;
            }
            else {
                modulePath = lazyRouteTSFile.replace(/(\.d)?\.tsx?$/, '');
                modulePath += '.ngfactory.js';
                const factoryModuleName = moduleName ? `#${moduleName}NgFactory` : '';
                moduleKey = `${lazyRouteModule}.ngfactory${factoryModuleName}`;
            }
            modulePath = compiler_host_1.workaroundResolve(modulePath);
            if (moduleKey in this._lazyRoutes) {
                if (this._lazyRoutes[moduleKey] !== modulePath) {
                    // Found a duplicate, this is an error.
                    this._warnings.push(new Error(`Duplicated path in loadChildren detected during a rebuild. `
                        + `We will take the latest version detected and override it to save rebuild time. `
                        + `You should perform a full build to validate that your routes don't overlap.`));
                }
            }
            else {
                // Found a new route, add it to the map.
                this._lazyRoutes[moduleKey] = modulePath;
            }
        });
    }
    _createForkedTypeChecker() {
        // Bootstrap type checker is using local CLI.
        const g = typeof global !== 'undefined' ? global : {}; // tslint:disable-line:no-any
        const typeCheckerFile = g['_DevKitIsLocal']
            ? './type_checker_bootstrap.js'
            : './type_checker_worker.js';
        const debugArgRegex = /--inspect(?:-brk|-port)?|--debug(?:-brk|-port)/;
        const execArgv = process.execArgv.filter((arg) => {
            // Remove debug args.
            // Workaround for https://github.com/nodejs/node/issues/9435
            return !debugArgRegex.test(arg);
        });
        // Signal the process to start listening for messages
        // Solves https://github.com/angular/angular-cli/issues/9071
        const forkArgs = [type_checker_1.AUTO_START_ARG];
        const forkOptions = { execArgv };
        this._typeCheckerProcess = child_process_1.fork(path.resolve(__dirname, typeCheckerFile), forkArgs, forkOptions);
        // Handle child process exit.
        this._typeCheckerProcess.once('exit', (_, signal) => {
            this._typeCheckerProcess = null;
            // If process exited not because of SIGTERM (see _killForkedTypeChecker), than something
            // went wrong and it should fallback to type checking on the main thread.
            if (signal !== 'SIGTERM') {
                this._forkTypeChecker = false;
                const msg = 'AngularCompilerPlugin: Forked Type Checker exited unexpectedly. ' +
                    'Falling back to type checking on main thread.';
                this._warnings.push(msg);
            }
        });
    }
    _killForkedTypeChecker() {
        if (this._typeCheckerProcess && this._typeCheckerProcess.pid) {
            treeKill(this._typeCheckerProcess.pid, 'SIGTERM');
            this._typeCheckerProcess = null;
        }
    }
    _updateForkedTypeChecker(rootNames, changedCompilationFiles) {
        if (this._typeCheckerProcess) {
            if (!this._forkedTypeCheckerInitialized) {
                this._typeCheckerProcess.send(new type_checker_1.InitMessage(this._compilerOptions, this._basePath, this._JitMode, this._rootNames));
                this._forkedTypeCheckerInitialized = true;
            }
            this._typeCheckerProcess.send(new type_checker_1.UpdateMessage(rootNames, changedCompilationFiles));
        }
    }
    // Registration hook for webpack plugin.
    apply(compiler) {
        // Decorate inputFileSystem to serve contents of CompilerHost.
        // Use decorated inputFileSystem in watchFileSystem.
        compiler.hooks.environment.tap('angular-compiler', () => {
            // The webpack types currently do not include these
            const compilerWithFileSystems = compiler;
            let host = this._options.host || new webpack_input_host_1.WebpackInputHost(compilerWithFileSystems.inputFileSystem);
            let replacements;
            if (this._options.hostReplacementPaths) {
                if (typeof this._options.hostReplacementPaths == 'function') {
                    const replacementResolver = this._options.hostReplacementPaths;
                    replacements = path => core_1.normalize(replacementResolver(core_1.getSystemPath(path)));
                    host = new class extends core_1.virtualFs.ResolverHost {
                        _resolve(path) {
                            return core_1.normalize(replacementResolver(core_1.getSystemPath(path)));
                        }
                    }(host);
                }
                else {
                    replacements = new Map();
                    const aliasHost = new core_1.virtualFs.AliasHost(host);
                    for (const from in this._options.hostReplacementPaths) {
                        const normalizedFrom = core_1.normalize(from);
                        const normalizedWith = core_1.normalize(this._options.hostReplacementPaths[from]);
                        aliasHost.aliases.set(normalizedFrom, normalizedWith);
                        replacements.set(normalizedFrom, normalizedWith);
                    }
                    host = aliasHost;
                }
            }
            // Create the webpack compiler host.
            const webpackCompilerHost = new compiler_host_1.WebpackCompilerHost(this._compilerOptions, this._basePath, host);
            webpackCompilerHost.enableCaching();
            // Create and set a new WebpackResourceLoader.
            this._resourceLoader = new resource_loader_1.WebpackResourceLoader();
            webpackCompilerHost.setResourceLoader(this._resourceLoader);
            // Use the WebpackCompilerHost with a resource loader to create an AngularCompilerHost.
            this._compilerHost = ngtools_api_1.createCompilerHost({
                options: this._compilerOptions,
                tsHost: webpackCompilerHost,
            });
            // Resolve mainPath if provided.
            if (this._options.mainPath) {
                this._mainPath = this._compilerHost.resolve(this._options.mainPath);
            }
            const inputDecorator = new virtual_file_system_decorator_1.VirtualFileSystemDecorator(compilerWithFileSystems.inputFileSystem, this._compilerHost);
            compilerWithFileSystems.inputFileSystem = inputDecorator;
            compilerWithFileSystems.watchFileSystem = new virtual_file_system_decorator_1.VirtualWatchFileSystemDecorator(inputDecorator, replacements);
        });
        // Add lazy modules to the context module for @angular/core
        compiler.hooks.contextModuleFactory.tap('angular-compiler', cmf => {
            const angularCorePackagePath = require.resolve('@angular/core/package.json');
            // APFv6 does not have single FESM anymore. Instead of verifying if we're pointing to
            // FESMs, we resolve the `@angular/core` path and verify that the path for the
            // module starts with it.
            // This may be slower but it will be compatible with both APF5, 6 and potential future
            // versions (until the dynamic import appears outside of core I suppose).
            // We resolve any symbolic links in order to get the real path that would be used in webpack.
            const angularCoreDirname = fs.realpathSync(path.dirname(angularCorePackagePath));
            cmf.hooks.afterResolve.tapPromise('angular-compiler', (result) => __awaiter(this, void 0, void 0, function* () {
                // Alter only request from Angular.
                if (!result || !this.done || !result.resource.startsWith(angularCoreDirname)) {
                    return result;
                }
                return this.done.then(() => {
                    // This folder does not exist, but we need to give webpack a resource.
                    // TODO: check if we can't just leave it as is (angularCoreModuleDir).
                    result.resource = path.join(this._basePath, '$$_lazy_route_resource');
                    // tslint:disable-next-line:no-any
                    result.dependencies.forEach((d) => d.critical = false);
                    // tslint:disable-next-line:no-any
                    result.resolveDependencies = (_fs, options, callback) => {
                        const dependencies = Object.keys(this._lazyRoutes)
                            .map((key) => {
                            const modulePath = this._lazyRoutes[key];
                            const importPath = key.split('#')[0];
                            if (modulePath !== null) {
                                const name = importPath.replace(/(\.ngfactory)?\.(js|ts)$/, '');
                                return new this._contextElementDependencyConstructor(modulePath, name);
                            }
                            else {
                                return null;
                            }
                        })
                            .filter(x => !!x);
                        if (this._options.nameLazyFiles) {
                            options.chunkName = '[request]';
                        }
                        callback(null, dependencies);
                    };
                    return result;
                }, () => undefined);
            }));
        });
        // Create and destroy forked type checker on watch mode.
        compiler.hooks.watchRun.tap('angular-compiler', () => {
            if (this._forkTypeChecker && !this._typeCheckerProcess) {
                this._createForkedTypeChecker();
            }
        });
        compiler.hooks.watchClose.tap('angular-compiler', () => this._killForkedTypeChecker());
        // Remake the plugin on each compilation.
        compiler.hooks.make.tapPromise('angular-compiler', compilation => this._make(compilation));
        compiler.hooks.invalid.tap('angular-compiler', () => this._firstRun = false);
        compiler.hooks.afterEmit.tap('angular-compiler', compilation => {
            // tslint:disable-next-line:no-any
            compilation._ngToolsWebpackPluginInstance = null;
        });
        compiler.hooks.done.tap('angular-compiler', () => {
            this._donePromise = null;
        });
        compiler.hooks.afterResolvers.tap('angular-compiler', compiler => {
            compiler.hooks.normalModuleFactory.tap('angular-compiler', nmf => {
                // Virtual file system.
                // TODO: consider if it's better to remove this plugin and instead make it wait on the
                // VirtualFileSystemDecorator.
                // Wait for the plugin to be done when requesting `.ts` files directly (entry points), or
                // when the issuer is a `.ts` or `.ngfactory.js` file.
                nmf.hooks.beforeResolve.tapPromise('angular-compiler', (request) => __awaiter(this, void 0, void 0, function* () {
                    if (this.done && request) {
                        const name = request.request;
                        const issuer = request.contextInfo.issuer;
                        if (name.endsWith('.ts') || name.endsWith('.tsx')
                            || (issuer && /\.ts|ngfactory\.js$/.test(issuer))) {
                            try {
                                yield this.done;
                            }
                            catch (_a) { }
                        }
                    }
                    return request;
                }));
            });
        });
        compiler.hooks.normalModuleFactory.tap('angular-compiler', nmf => {
            nmf.hooks.beforeResolve.tapAsync('angular-compiler', (request, callback) => {
                paths_plugin_1.resolveWithPaths(request, callback, this._compilerOptions, this._compilerHost, this._moduleResolutionCache);
            });
        });
    }
    _make(compilation) {
        return __awaiter(this, void 0, void 0, function* () {
            benchmark_1.time('AngularCompilerPlugin._make');
            this._emitSkipped = true;
            // tslint:disable-next-line:no-any
            if (compilation._ngToolsWebpackPluginInstance) {
                throw new Error('An @ngtools/webpack plugin already exist for this compilation.');
            }
            // Set a private variable for this plugin instance.
            // tslint:disable-next-line:no-any
            compilation._ngToolsWebpackPluginInstance = this;
            // Update the resource loader with the new webpack compilation.
            this._resourceLoader.update(compilation);
            return this._donePromise = Promise.resolve()
                .then(() => this._update())
                .then(() => {
                this.pushCompilationErrors(compilation);
                benchmark_1.timeEnd('AngularCompilerPlugin._make');
            }, err => {
                compilation.errors.push(err);
                this.pushCompilationErrors(compilation);
                benchmark_1.timeEnd('AngularCompilerPlugin._make');
            });
        });
    }
    pushCompilationErrors(compilation) {
        compilation.errors.push(...this._errors);
        compilation.warnings.push(...this._warnings);
        this._errors = [];
        this._warnings = [];
    }
    _makeTransformers() {
        const isAppPath = (fileName) => !fileName.endsWith('.ngfactory.ts') && !fileName.endsWith('.ngstyle.ts');
        const isMainPath = (fileName) => fileName === (this._mainPath ? compiler_host_1.workaroundResolve(this._mainPath) : this._mainPath);
        const getEntryModule = () => this.entryModule
            ? { path: compiler_host_1.workaroundResolve(this.entryModule.path), className: this.entryModule.className }
            : this.entryModule;
        const getLazyRoutes = () => this._lazyRoutes;
        const getTypeChecker = () => this._getTsProgram().getTypeChecker();
        if (this._JitMode) {
            // Replace resources in JIT.
            this._transformers.push(transformers_1.replaceResources(isAppPath));
        }
        else {
            // Remove unneeded angular decorators.
            this._transformers.push(transformers_1.removeDecorators(isAppPath, getTypeChecker));
        }
        if (this._platformTransformers !== null) {
            this._transformers.push(...this._platformTransformers);
        }
        else {
            if (this._platform === PLATFORM.Browser) {
                // If we have a locale, auto import the locale data file.
                // This transform must go before replaceBootstrap because it looks for the entry module
                // import, which will be replaced.
                if (this._normalizedLocale) {
                    this._transformers.push(transformers_1.registerLocaleData(isAppPath, getEntryModule, this._normalizedLocale));
                }
                if (!this._JitMode) {
                    // Replace bootstrap in browser AOT.
                    this._transformers.push(transformers_1.replaceBootstrap(isAppPath, getEntryModule, getTypeChecker));
                }
            }
            else if (this._platform === PLATFORM.Server) {
                this._transformers.push(transformers_1.exportLazyModuleMap(isMainPath, getLazyRoutes));
                if (!this._JitMode) {
                    this._transformers.push(transformers_1.exportNgFactory(isMainPath, getEntryModule), transformers_1.replaceServerBootstrap(isMainPath, getEntryModule, getTypeChecker));
                }
            }
        }
    }
    _update() {
        benchmark_1.time('AngularCompilerPlugin._update');
        // We only want to update on TS and template changes, but all kinds of files are on this
        // list, like package.json and .ngsummary.json files.
        const changedFiles = this._getChangedCompilationFiles();
        // If nothing we care about changed and it isn't the first run, don't do anything.
        if (changedFiles.length === 0 && !this._firstRun) {
            return Promise.resolve();
        }
        return Promise.resolve()
            .then(() => this._createOrUpdateProgram())
            .then(() => {
            if (this.entryModule) {
                // Try to find lazy routes if we have an entry module.
                // We need to run the `listLazyRoutes` the first time because it also navigates libraries
                // and other things that we might miss using the (faster) findLazyRoutesInAst.
                // Lazy routes modules will be read with compilerHost and added to the changed files.
                const changedTsFiles = this._getChangedTsFiles();
                if (this._ngCompilerSupportsNewApi) {
                    this._processLazyRoutes(this._listLazyRoutesFromProgram());
                }
                else if (this._firstRun) {
                    this._processLazyRoutes(this._getLazyRoutesFromNgtools());
                }
                else if (changedTsFiles.length > 0) {
                    this._processLazyRoutes(this._findLazyRoutesInAst(changedTsFiles));
                }
                if (this._options.additionalLazyModules) {
                    this._processLazyRoutes(this._options.additionalLazyModules);
                }
            }
        })
            .then(() => {
            // Emit and report errors.
            // We now have the final list of changed TS files.
            // Go through each changed file and add transforms as needed.
            const sourceFiles = this._getChangedTsFiles()
                .map((fileName) => this._getTsProgram().getSourceFile(fileName))
                .filter((x) => !!x);
            // Emit files.
            benchmark_1.time('AngularCompilerPlugin._update._emit');
            const { emitResult, diagnostics } = this._emit(sourceFiles);
            benchmark_1.timeEnd('AngularCompilerPlugin._update._emit');
            // Report diagnostics.
            const errors = diagnostics
                .filter((diag) => diag.category === ts.DiagnosticCategory.Error);
            const warnings = diagnostics
                .filter((diag) => diag.category === ts.DiagnosticCategory.Warning);
            if (errors.length > 0) {
                const message = ngtools_api_1.formatDiagnostics(errors);
                this._errors.push(new Error(message));
            }
            if (warnings.length > 0) {
                const message = ngtools_api_1.formatDiagnostics(warnings);
                this._warnings.push(message);
            }
            this._emitSkipped = !emitResult || emitResult.emitSkipped;
            // Reset changed files on successful compilation.
            if (!this._emitSkipped && this._errors.length === 0) {
                this._compilerHost.resetChangedFileTracker();
            }
            benchmark_1.timeEnd('AngularCompilerPlugin._update');
        });
    }
    writeI18nOutFile() {
        function _recursiveMkDir(p) {
            if (!fs.existsSync(p)) {
                _recursiveMkDir(path.dirname(p));
                fs.mkdirSync(p);
            }
        }
        // Write the extracted messages to disk.
        if (this._compilerOptions.i18nOutFile) {
            const i18nOutFilePath = path.resolve(this._basePath, this._compilerOptions.i18nOutFile);
            const i18nOutFileContent = this._compilerHost.readFile(i18nOutFilePath);
            if (i18nOutFileContent) {
                _recursiveMkDir(path.dirname(i18nOutFilePath));
                fs.writeFileSync(i18nOutFilePath, i18nOutFileContent);
            }
        }
    }
    getCompiledFile(fileName) {
        const outputFile = fileName.replace(/.tsx?$/, '.js');
        let outputText;
        let sourceMap;
        let errorDependencies = [];
        if (this._emitSkipped) {
            const text = this._compilerHost.readFile(outputFile);
            if (text) {
                // If the compilation didn't emit files this time, try to return the cached files from the
                // last compilation and let the compilation errors show what's wrong.
                outputText = text;
                sourceMap = this._compilerHost.readFile(outputFile + '.map');
            }
            else {
                // There's nothing we can serve. Return an empty string to prevent lenghty webpack errors,
                // add the rebuild warning if it's not there yet.
                // We also need to all changed files as dependencies of this file, so that all of them
                // will be watched and trigger a rebuild next time.
                outputText = '';
                errorDependencies = this._getChangedCompilationFiles()
                    .map((p) => this._compilerHost.denormalizePath(p));
            }
        }
        else {
            // Check if the TS input file and the JS output file exist.
            if (((fileName.endsWith('.ts') || fileName.endsWith('.tsx'))
                && !this._compilerHost.fileExists(fileName, false))
                || !this._compilerHost.fileExists(outputFile, false)) {
                let msg = `${fileName} is missing from the TypeScript compilation. `
                    + `Please make sure it is in your tsconfig via the 'files' or 'include' property.`;
                if (/(\\|\/)node_modules(\\|\/)/.test(fileName)) {
                    msg += '\nThe missing file seems to be part of a third party library. '
                        + 'TS files in published libraries are often a sign of a badly packaged library. '
                        + 'Please open an issue in the library repository to alert its author and ask them '
                        + 'to package the library using the Angular Package Format (https://goo.gl/jB3GVv).';
                }
                throw new Error(msg);
            }
            outputText = this._compilerHost.readFile(outputFile) || '';
            sourceMap = this._compilerHost.readFile(outputFile + '.map');
        }
        return { outputText, sourceMap, errorDependencies };
    }
    getDependencies(fileName) {
        const resolvedFileName = this._compilerHost.resolve(fileName);
        const sourceFile = this._compilerHost.getSourceFile(resolvedFileName, ts.ScriptTarget.Latest);
        if (!sourceFile) {
            return [];
        }
        const options = this._compilerOptions;
        const host = this._compilerHost;
        const cache = this._moduleResolutionCache;
        const esImports = ast_helpers_1.collectDeepNodes(sourceFile, ts.SyntaxKind.ImportDeclaration)
            .map(decl => {
            const moduleName = decl.moduleSpecifier.text;
            const resolved = ts.resolveModuleName(moduleName, resolvedFileName, options, host, cache);
            if (resolved.resolvedModule) {
                return resolved.resolvedModule.resolvedFileName;
            }
            else {
                return null;
            }
        })
            .filter(x => x);
        const resourceImports = transformers_1.findResources(sourceFile)
            .map((resourceReplacement) => resourceReplacement.resourcePaths)
            .reduce((prev, curr) => prev.concat(curr), [])
            .map((resourcePath) => core_1.resolve(core_1.dirname(resolvedFileName), core_1.normalize(resourcePath)));
        // These paths are meant to be used by the loader so we must denormalize them.
        const uniqueDependencies = new Set([
            ...esImports,
            ...resourceImports,
            ...this.getResourceDependencies(this._compilerHost.denormalizePath(resolvedFileName)),
        ].map((p) => p && this._compilerHost.denormalizePath(p)));
        return [...uniqueDependencies]
            .filter(x => !!x);
    }
    getResourceDependencies(fileName) {
        return this._resourceLoader.getResourceDependencies(fileName);
    }
    // This code mostly comes from `performCompilation` in `@angular/compiler-cli`.
    // It skips the program creation because we need to use `loadNgStructureAsync()`,
    // and uses CustomTransformers.
    _emit(sourceFiles) {
        benchmark_1.time('AngularCompilerPlugin._emit');
        const program = this._program;
        const allDiagnostics = [];
        let emitResult;
        try {
            if (this._JitMode) {
                const tsProgram = program;
                if (this._firstRun) {
                    // Check parameter diagnostics.
                    benchmark_1.time('AngularCompilerPlugin._emit.ts.getOptionsDiagnostics');
                    allDiagnostics.push(...tsProgram.getOptionsDiagnostics());
                    benchmark_1.timeEnd('AngularCompilerPlugin._emit.ts.getOptionsDiagnostics');
                }
                if ((this._firstRun || !this._forkTypeChecker) && this._program) {
                    allDiagnostics.push(...gather_diagnostics_1.gatherDiagnostics(this._program, this._JitMode, 'AngularCompilerPlugin._emit.ts'));
                }
                if (!gather_diagnostics_1.hasErrors(allDiagnostics)) {
                    sourceFiles.forEach((sf) => {
                        const timeLabel = `AngularCompilerPlugin._emit.ts+${sf.fileName}+.emit`;
                        benchmark_1.time(timeLabel);
                        emitResult = tsProgram.emit(sf, undefined, undefined, undefined, { before: this._transformers });
                        allDiagnostics.push(...emitResult.diagnostics);
                        benchmark_1.timeEnd(timeLabel);
                    });
                }
            }
            else {
                const angularProgram = program;
                // Check Angular structural diagnostics.
                benchmark_1.time('AngularCompilerPlugin._emit.ng.getNgStructuralDiagnostics');
                allDiagnostics.push(...angularProgram.getNgStructuralDiagnostics());
                benchmark_1.timeEnd('AngularCompilerPlugin._emit.ng.getNgStructuralDiagnostics');
                if (this._firstRun) {
                    // Check TypeScript parameter diagnostics.
                    benchmark_1.time('AngularCompilerPlugin._emit.ng.getTsOptionDiagnostics');
                    allDiagnostics.push(...angularProgram.getTsOptionDiagnostics());
                    benchmark_1.timeEnd('AngularCompilerPlugin._emit.ng.getTsOptionDiagnostics');
                    // Check Angular parameter diagnostics.
                    benchmark_1.time('AngularCompilerPlugin._emit.ng.getNgOptionDiagnostics');
                    allDiagnostics.push(...angularProgram.getNgOptionDiagnostics());
                    benchmark_1.timeEnd('AngularCompilerPlugin._emit.ng.getNgOptionDiagnostics');
                }
                if ((this._firstRun || !this._forkTypeChecker) && this._program) {
                    allDiagnostics.push(...gather_diagnostics_1.gatherDiagnostics(this._program, this._JitMode, 'AngularCompilerPlugin._emit.ng'));
                }
                if (!gather_diagnostics_1.hasErrors(allDiagnostics)) {
                    benchmark_1.time('AngularCompilerPlugin._emit.ng.emit');
                    const extractI18n = !!this._compilerOptions.i18nOutFile;
                    const emitFlags = extractI18n ? ngtools_api_1.EmitFlags.I18nBundle : ngtools_api_1.EmitFlags.Default;
                    emitResult = angularProgram.emit({
                        emitFlags, customTransformers: {
                            beforeTs: this._transformers,
                        },
                    });
                    allDiagnostics.push(...emitResult.diagnostics);
                    if (extractI18n) {
                        this.writeI18nOutFile();
                    }
                    benchmark_1.timeEnd('AngularCompilerPlugin._emit.ng.emit');
                }
            }
        }
        catch (e) {
            benchmark_1.time('AngularCompilerPlugin._emit.catch');
            // This function is available in the import below, but this way we avoid the dependency.
            // import { isSyntaxError } from '@angular/compiler';
            function isSyntaxError(error) {
                return error['ngSyntaxError']; // tslint:disable-line:no-any
            }
            let errMsg;
            let code;
            if (isSyntaxError(e)) {
                // don't report the stack for syntax errors as they are well known errors.
                errMsg = e.message;
                code = ngtools_api_1.DEFAULT_ERROR_CODE;
            }
            else {
                errMsg = e.stack;
                // It is not a syntax error we might have a program with unknown state, discard it.
                this._program = null;
                code = ngtools_api_1.UNKNOWN_ERROR_CODE;
            }
            allDiagnostics.push({ category: ts.DiagnosticCategory.Error, messageText: errMsg, code, source: ngtools_api_1.SOURCE });
            benchmark_1.timeEnd('AngularCompilerPlugin._emit.catch');
        }
        benchmark_1.timeEnd('AngularCompilerPlugin._emit');
        return { program, emitResult, diagnostics: allDiagnostics };
    }
    _validateLocale(locale) {
        // Get the path of the common module.
        const commonPath = path.dirname(require.resolve('@angular/common/package.json'));
        // Check if the locale file exists
        if (!fs.existsSync(path.resolve(commonPath, 'locales', `${locale}.js`))) {
            // Check for an alternative locale (if the locale id was badly formatted).
            const locales = fs.readdirSync(path.resolve(commonPath, 'locales'))
                .filter(file => file.endsWith('.js'))
                .map(file => file.replace('.js', ''));
            let newLocale;
            const normalizedLocale = locale.toLowerCase().replace(/_/g, '-');
            for (const l of locales) {
                if (l.toLowerCase() === normalizedLocale) {
                    newLocale = l;
                    break;
                }
            }
            if (newLocale) {
                locale = newLocale;
            }
            else {
                // Check for a parent locale
                const parentLocale = normalizedLocale.split('-')[0];
                if (locales.indexOf(parentLocale) !== -1) {
                    locale = parentLocale;
                }
                else {
                    this._warnings.push(`AngularCompilerPlugin: Unable to load the locale data file ` +
                        `"@angular/common/locales/${locale}", ` +
                        `please check that "${locale}" is a valid locale id.
            If needed, you can use "registerLocaleData" manually.`);
                    return null;
                }
            }
        }
        return locale;
    }
}
exports.AngularCompilerPlugin = AngularCompilerPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcl9jb21waWxlcl9wbHVnaW4uanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL25ndG9vbHMvd2VicGFjay9zcmMvYW5ndWxhcl9jb21waWxlcl9wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7R0FNRztBQUNILCtDQUFtRztBQUNuRyxpREFBZ0U7QUFDaEUseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFFakMsMkNBQTRDO0FBQzVDLG1EQUF5RTtBQUN6RSxxREFBOEQ7QUFDOUQsNkRBQW9FO0FBQ3BFLCtDQUE2RDtBQUM3RCwrQ0FnQnVCO0FBQ3ZCLGlEQUFrRDtBQUNsRCx1REFBMEQ7QUFDMUQsaURBU3dCO0FBQ3hCLDREQUE4RDtBQUM5RCxpREFBNEU7QUFDNUUsbUZBR3lDO0FBT3pDLDZEQUF3RDtBQUV4RCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUE4Q3RDLElBQVksUUFHWDtBQUhELFdBQVksUUFBUTtJQUNsQiw2Q0FBTyxDQUFBO0lBQ1AsMkNBQU0sQ0FBQTtBQUNSLENBQUMsRUFIVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUduQjtBQUVEO0lBNkNFLFlBQVksT0FBcUM7UUF2Q3pDLHdCQUFtQixHQUFhLEVBQUUsQ0FBQztRQUszQyw4REFBOEQ7UUFDdEQsZ0JBQVcsR0FBaUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUtoRCxrQkFBYSxHQUEyQyxFQUFFLENBQUM7UUFDM0QsMEJBQXFCLEdBQWtELElBQUksQ0FBQztRQUU1RSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLDJCQUFzQixHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRWhFLGtCQUFrQjtRQUNW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QUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekMsTUFBTSxHQUFHLFlBQVksQ0FBQztnQkFDeEIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw2REFBNkQ7d0JBQy9FLDRCQUE0QixNQUFNLEtBQUs7d0JBQ3ZDLHNCQUFzQixNQUFNO2tFQUMwQixDQUFDLENBQUM7b0JBRTFELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0Y7QUExaUNELHNEQTBpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBQYXRoLCBkaXJuYW1lLCBnZXRTeXN0ZW1QYXRoLCBub3JtYWxpemUsIHJlc29sdmUsIHZpcnR1YWxGcyB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IENoaWxkUHJvY2VzcywgRm9ya09wdGlvbnMsIGZvcmsgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7IENvbXBpbGVyLCBjb21waWxhdGlvbiB9IGZyb20gJ3dlYnBhY2snO1xuaW1wb3J0IHsgdGltZSwgdGltZUVuZCB9IGZyb20gJy4vYmVuY2htYXJrJztcbmltcG9ydCB7IFdlYnBhY2tDb21waWxlckhvc3QsIHdvcmthcm91bmRSZXNvbHZlIH0gZnJvbSAnLi9jb21waWxlcl9ob3N0JztcbmltcG9ydCB7IHJlc29sdmVFbnRyeU1vZHVsZUZyb21NYWluIH0gZnJvbSAnLi9lbnRyeV9yZXNvbHZlcic7XG5pbXBvcnQgeyBnYXRoZXJEaWFnbm9zdGljcywgaGFzRXJyb3JzIH0gZnJvbSAnLi9nYXRoZXJfZGlhZ25vc3RpY3MnO1xuaW1wb3J0IHsgTGF6eVJvdXRlTWFwLCBmaW5kTGF6eVJvdXRlcyB9IGZyb20gJy4vbGF6eV9yb3V0ZXMnO1xuaW1wb3J0IHtcbiAgQ29tcGlsZXJDbGlJc1N1cHBvcnRlZCxcbiAgQ29tcGlsZXJIb3N0LFxuICBDb21waWxlck9wdGlvbnMsXG4gIERFRkFVTFRfRVJST1JfQ09ERSxcbiAgRGlhZ25vc3RpYyxcbiAgRW1pdEZsYWdzLFxuICBQcm9ncmFtLFxuICBTT1VSQ0UsXG4gIFVOS05PV05fRVJST1JfQ09ERSxcbiAgVkVSU0lPTixcbiAgX19OR1RPT0xTX1BSSVZBVEVfQVBJXzIsXG4gIGNyZWF0ZUNvbXBpbGVySG9zdCxcbiAgY3JlYXRlUHJvZ3JhbSxcbiAgZm9ybWF0RGlhZ25vc3RpY3MsXG4gIHJlYWRDb25maWd1cmF0aW9uLFxufSBmcm9tICcuL25ndG9vbHNfYXBpJztcbmltcG9ydCB7IHJlc29sdmVXaXRoUGF0aHMgfSBmcm9tICcuL3BhdGhzLXBsdWdpbic7XG5pbXBvcnQgeyBXZWJwYWNrUmVzb3VyY2VMb2FkZXIgfSBmcm9tICcuL3Jlc291cmNlX2xvYWRlcic7XG5pbXBvcnQge1xuICBleHBvcnRMYXp5TW9kdWxlTWFwLFxuICBleHBvcnROZ0ZhY3RvcnksXG4gIGZpbmRSZXNvdXJjZXMsXG4gIHJlZ2lzdGVyTG9jYWxlRGF0YSxcbiAgcmVtb3ZlRGVjb3JhdG9ycyxcbiAgcmVwbGFjZUJvb3RzdHJhcCxcbiAgcmVwbGFjZVJlc291cmNlcyxcbiAgcmVwbGFjZVNlcnZlckJvb3RzdHJhcCxcbn0gZnJvbSAnLi90cmFuc2Zvcm1lcnMnO1xuaW1wb3J0IHsgY29sbGVjdERlZXBOb2RlcyB9IGZyb20gJy4vdHJhbnNmb3JtZXJzL2FzdF9oZWxwZXJzJztcbmltcG9ydCB7IEFVVE9fU1RBUlRfQVJHLCBJbml0TWVzc2FnZSwgVXBkYXRlTWVzc2FnZSB9IGZyb20gJy4vdHlwZV9jaGVja2VyJztcbmltcG9ydCB7XG4gIFZpcnR1YWxGaWxlU3lzdGVtRGVjb3JhdG9yLFxuICBWaXJ0dWFsV2F0Y2hGaWxlU3lzdGVtRGVjb3JhdG9yLFxufSBmcm9tICcuL3ZpcnR1YWxfZmlsZV9zeXN0ZW1fZGVjb3JhdG9yJztcbmltcG9ydCB7XG4gIENhbGxiYWNrLFxuICBJbnB1dEZpbGVTeXN0ZW0sXG4gIE5vZGVXYXRjaEZpbGVTeXN0ZW1JbnRlcmZhY2UsXG4gIE5vcm1hbE1vZHVsZUZhY3RvcnlSZXF1ZXN0LFxufSBmcm9tICcuL3dlYnBhY2snO1xuaW1wb3J0IHsgV2VicGFja0lucHV0SG9zdCB9IGZyb20gJy4vd2VicGFjay1pbnB1dC1ob3N0JztcblxuY29uc3QgdHJlZUtpbGwgPSByZXF1aXJlKCd0cmVlLWtpbGwnKTtcblxuZXhwb3J0IGludGVyZmFjZSBDb250ZXh0RWxlbWVudERlcGVuZGVuY3kge31cblxuZXhwb3J0IGludGVyZmFjZSBDb250ZXh0RWxlbWVudERlcGVuZGVuY3lDb25zdHJ1Y3RvciB7XG4gIG5ldyhtb2R1bGVQYXRoOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IENvbnRleHRFbGVtZW50RGVwZW5kZW5jeTtcbn1cblxuLyoqXG4gKiBPcHRpb24gQ29uc3RhbnRzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhckNvbXBpbGVyUGx1Z2luT3B0aW9ucyB7XG4gIHNvdXJjZU1hcD86IGJvb2xlYW47XG4gIHRzQ29uZmlnUGF0aDogc3RyaW5nO1xuICBiYXNlUGF0aD86IHN0cmluZztcbiAgZW50cnlNb2R1bGU/OiBzdHJpbmc7XG4gIG1haW5QYXRoPzogc3RyaW5nO1xuICBza2lwQ29kZUdlbmVyYXRpb24/OiBib29sZWFuO1xuICBob3N0UmVwbGFjZW1lbnRQYXRocz86IHsgW3BhdGg6IHN0cmluZ106IHN0cmluZyB9IHwgKChwYXRoOiBzdHJpbmcpID0+IHN0cmluZyk7XG4gIGZvcmtUeXBlQ2hlY2tlcj86IGJvb2xlYW47XG4gIC8vIFRPRE86IHJlbW92ZSBzaW5nbGVGaWxlSW5jbHVkZXMgZm9yIDIuMCwgdGhpcyBpcyBqdXN0IHRvIHN1cHBvcnQgb2xkIHByb2plY3RzIHRoYXQgZGlkIG5vdFxuICAvLyBpbmNsdWRlICdwb2x5ZmlsbHMudHMnIGluIGB0c2NvbmZpZy5zcGVjLmpzb24nLlxuICBzaW5nbGVGaWxlSW5jbHVkZXM/OiBzdHJpbmdbXTtcbiAgaTE4bkluRmlsZT86IHN0cmluZztcbiAgaTE4bkluRm9ybWF0Pzogc3RyaW5nO1xuICBpMThuT3V0RmlsZT86IHN0cmluZztcbiAgaTE4bk91dEZvcm1hdD86IHN0cmluZztcbiAgbG9jYWxlPzogc3RyaW5nO1xuICBtaXNzaW5nVHJhbnNsYXRpb24/OiBzdHJpbmc7XG4gIHBsYXRmb3JtPzogUExBVEZPUk07XG4gIG5hbWVMYXp5RmlsZXM/OiBib29sZWFuO1xuXG4gIC8vIGFkZGVkIHRvIHRoZSBsaXN0IG9mIGxhenkgcm91dGVzXG4gIGFkZGl0aW9uYWxMYXp5TW9kdWxlcz86IHsgW21vZHVsZTogc3RyaW5nXTogc3RyaW5nIH07XG5cbiAgLy8gVGhlIENvbnRleHRFbGVtZW50RGVwZW5kZW5jeSBvZiBjb3JyZWN0IFdlYnBhY2sgY29tcGlsYXRpb24uXG4gIC8vIFRoaXMgaXMgbmVlZGVkIHdoZW4gdGhlcmUgYXJlIG11bHRpcGxlIFdlYnBhY2sgaW5zdGFsbHMuXG4gIGNvbnRleHRFbGVtZW50RGVwZW5kZW5jeUNvbnN0cnVjdG9yPzogQ29udGV4dEVsZW1lbnREZXBlbmRlbmN5Q29uc3RydWN0b3I7XG5cbiAgLy8gVXNlIHRzY29uZmlnIHRvIGluY2x1ZGUgcGF0aCBnbG9icy5cbiAgY29tcGlsZXJPcHRpb25zPzogdHMuQ29tcGlsZXJPcHRpb25zO1xuXG4gIGhvc3Q/OiB2aXJ0dWFsRnMuSG9zdDxmcy5TdGF0cz47XG4gIHBsYXRmb3JtVHJhbnNmb3JtZXJzPzogdHMuVHJhbnNmb3JtZXJGYWN0b3J5PHRzLlNvdXJjZUZpbGU+W107XG59XG5cbmV4cG9ydCBlbnVtIFBMQVRGT1JNIHtcbiAgQnJvd3NlcixcbiAgU2VydmVyLFxufVxuXG5leHBvcnQgY2xhc3MgQW5ndWxhckNvbXBpbGVyUGx1Z2luIHtcbiAgcHJpdmF0ZSBfb3B0aW9uczogQW5ndWxhckNvbXBpbGVyUGx1Z2luT3B0aW9ucztcblxuICAvLyBUUyBjb21waWxhdGlvbi5cbiAgcHJpdmF0ZSBfY29tcGlsZXJPcHRpb25zOiBDb21waWxlck9wdGlvbnM7XG4gIHByaXZhdGUgX3Jvb3ROYW1lczogc3RyaW5nW107XG4gIHByaXZhdGUgX3NpbmdsZUZpbGVJbmNsdWRlczogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBfcHJvZ3JhbTogKHRzLlByb2dyYW0gfCBQcm9ncmFtKSB8IG51bGw7XG4gIHByaXZhdGUgX2NvbXBpbGVySG9zdDogV2VicGFja0NvbXBpbGVySG9zdCAmIENvbXBpbGVySG9zdDtcbiAgcHJpdmF0ZSBfbW9kdWxlUmVzb2x1dGlvbkNhY2hlOiB0cy5Nb2R1bGVSZXNvbHV0aW9uQ2FjaGU7XG4gIHByaXZhdGUgX3Jlc291cmNlTG9hZGVyOiBXZWJwYWNrUmVzb3VyY2VMb2FkZXI7XG4gIC8vIENvbnRhaW5zIGBtb2R1bGVJbXBvcnRQYXRoI2V4cG9ydE5hbWVgID0+IGBmdWxsTW9kdWxlUGF0aGAuXG4gIHByaXZhdGUgX2xhenlSb3V0ZXM6IExhenlSb3V0ZU1hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHByaXZhdGUgX3RzQ29uZmlnUGF0aDogc3RyaW5nO1xuICBwcml2YXRlIF9lbnRyeU1vZHVsZTogc3RyaW5nIHwgbnVsbDtcbiAgcHJpdmF0ZSBfbWFpblBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfYmFzZVBhdGg6IHN0cmluZztcbiAgcHJpdmF0ZSBfdHJhbnNmb3JtZXJzOiB0cy5UcmFuc2Zvcm1lckZhY3Rvcnk8dHMuU291cmNlRmlsZT5bXSA9IFtdO1xuICBwcml2YXRlIF9wbGF0Zm9ybVRyYW5zZm9ybWVyczogdHMuVHJhbnNmb3JtZXJGYWN0b3J5PHRzLlNvdXJjZUZpbGU+W10gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfcGxhdGZvcm06IFBMQVRGT1JNO1xuICBwcml2YXRlIF9KaXRNb2RlID0gZmFsc2U7XG4gIHByaXZhdGUgX2VtaXRTa2lwcGVkID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfY2hhbmdlZEZpbGVFeHRlbnNpb25zID0gbmV3IFNldChbJ3RzJywgJ2h0bWwnLCAnY3NzJ10pO1xuXG4gIC8vIFdlYnBhY2sgcGx1Z2luLlxuICBwcml2YXRlIF9maXJzdFJ1biA9IHRydWU7XG4gIHByaXZhdGUgX2RvbmVQcm9taXNlOiBQcm9taXNlPHZvaWQ+IHwgbnVsbDtcbiAgcHJpdmF0ZSBfbm9ybWFsaXplZExvY2FsZTogc3RyaW5nIHwgbnVsbDtcbiAgcHJpdmF0ZSBfd2FybmluZ3M6IChzdHJpbmcgfCBFcnJvcilbXSA9IFtdO1xuICBwcml2YXRlIF9lcnJvcnM6IChzdHJpbmcgfCBFcnJvcilbXSA9IFtdO1xuICBwcml2YXRlIF9jb250ZXh0RWxlbWVudERlcGVuZGVuY3lDb25zdHJ1Y3RvcjogQ29udGV4dEVsZW1lbnREZXBlbmRlbmN5Q29uc3RydWN0b3I7XG5cbiAgLy8gVHlwZUNoZWNrZXIgcHJvY2Vzcy5cbiAgcHJpdmF0ZSBfZm9ya1R5cGVDaGVja2VyID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfdHlwZUNoZWNrZXJQcm9jZXNzOiBDaGlsZFByb2Nlc3MgfCBudWxsO1xuICBwcml2YXRlIF9mb3JrZWRUeXBlQ2hlY2tlckluaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBnZXQgX25nQ29tcGlsZXJTdXBwb3J0c05ld0FwaSgpIHtcbiAgICBpZiAodGhpcy5fSml0TW9kZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gISEodGhpcy5fcHJvZ3JhbSBhcyBQcm9ncmFtKS5saXN0TGF6eVJvdXRlcztcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBBbmd1bGFyQ29tcGlsZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgQ29tcGlsZXJDbGlJc1N1cHBvcnRlZCgpO1xuICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgICB0aGlzLl9zZXR1cE9wdGlvbnModGhpcy5fb3B0aW9ucyk7XG4gIH1cblxuICBnZXQgb3B0aW9ucygpIHsgcmV0dXJuIHRoaXMuX29wdGlvbnM7IH1cbiAgZ2V0IGRvbmUoKSB7IHJldHVybiB0aGlzLl9kb25lUHJvbWlzZTsgfVxuICBnZXQgZW50cnlNb2R1bGUoKSB7XG4gICAgaWYgKCF0aGlzLl9lbnRyeU1vZHVsZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHNwbGl0dGVkID0gdGhpcy5fZW50cnlNb2R1bGUuc3BsaXQoLygjW2EtekEtWl9dKFtcXHddKykpJC8pO1xuICAgIGNvbnN0IHBhdGggPSBzcGxpdHRlZFswXTtcbiAgICBjb25zdCBjbGFzc05hbWUgPSAhIXNwbGl0dGVkWzFdID8gc3BsaXR0ZWRbMV0uc3Vic3RyaW5nKDEpIDogJ2RlZmF1bHQnO1xuXG4gICAgcmV0dXJuIHsgcGF0aCwgY2xhc3NOYW1lIH07XG4gIH1cblxuICBzdGF0aWMgaXNTdXBwb3J0ZWQoKSB7XG4gICAgcmV0dXJuIFZFUlNJT04gJiYgcGFyc2VJbnQoVkVSU0lPTi5tYWpvcikgPj0gNTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldHVwT3B0aW9ucyhvcHRpb25zOiBBbmd1bGFyQ29tcGlsZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGltZSgnQW5ndWxhckNvbXBpbGVyUGx1Z2luLl9zZXR1cE9wdGlvbnMnKTtcbiAgICAvLyBGaWxsIGluIHRoZSBtaXNzaW5nIG9wdGlvbnMuXG4gICAgaWYgKCFvcHRpb25zLmhhc093blByb3BlcnR5KCd0c0NvbmZpZ1BhdGgnKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHNwZWNpZnkgXCJ0c0NvbmZpZ1BhdGhcIiBpbiB0aGUgY29uZmlndXJhdGlvbiBvZiBAbmd0b29scy93ZWJwYWNrLicpO1xuICAgIH1cbiAgICAvLyBUUyByZXByZXNlbnRzIHBhdGhzIGludGVybmFsbHkgd2l0aCAnLycgYW5kIGV4cGVjdHMgdGhlIHRzY29uZmlnIHBhdGggdG8gYmUgaW4gdGhpcyBmb3JtYXRcbiAgICB0aGlzLl90c0NvbmZpZ1BhdGggPSBvcHRpb25zLnRzQ29uZmlnUGF0aC5yZXBsYWNlKC9cXFxcL2csICcvJyk7XG5cbiAgICAvLyBDaGVjayB0aGUgYmFzZSBwYXRoLlxuICAgIGNvbnN0IG1heWJlQmFzZVBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgdGhpcy5fdHNDb25maWdQYXRoKTtcbiAgICBsZXQgYmFzZVBhdGggPSBtYXliZUJhc2VQYXRoO1xuICAgIGlmIChmcy5zdGF0U3luYyhtYXliZUJhc2VQYXRoKS5pc0ZpbGUoKSkge1xuICAgICAgYmFzZVBhdGggPSBwYXRoLmRpcm5hbWUoYmFzZVBhdGgpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5iYXNlUGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBiYXNlUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBvcHRpb25zLmJhc2VQYXRoKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zaW5nbGVGaWxlSW5jbHVkZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fc2luZ2xlRmlsZUluY2x1ZGVzLnB1c2goLi4ub3B0aW9ucy5zaW5nbGVGaWxlSW5jbHVkZXMpO1xuICAgIH1cblxuICAgIC8vIFBhcnNlIHRoZSB0c2NvbmZpZyBjb250ZW50cy5cbiAgICBjb25zdCBjb25maWcgPSByZWFkQ29uZmlndXJhdGlvbih0aGlzLl90c0NvbmZpZ1BhdGgpO1xuICAgIGlmIChjb25maWcuZXJyb3JzICYmIGNvbmZpZy5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZm9ybWF0RGlhZ25vc3RpY3MoY29uZmlnLmVycm9ycykpO1xuICAgIH1cblxuICAgIHRoaXMuX3Jvb3ROYW1lcyA9IGNvbmZpZy5yb290TmFtZXMuY29uY2F0KC4uLnRoaXMuX3NpbmdsZUZpbGVJbmNsdWRlcyk7XG4gICAgdGhpcy5fY29tcGlsZXJPcHRpb25zID0geyAuLi5jb25maWcub3B0aW9ucywgLi4ub3B0aW9ucy5jb21waWxlck9wdGlvbnMgfTtcbiAgICB0aGlzLl9iYXNlUGF0aCA9IGNvbmZpZy5vcHRpb25zLmJhc2VQYXRoIHx8IGJhc2VQYXRoIHx8ICcnO1xuXG4gICAgLy8gT3ZlcndyaXRlIG91dERpciBzbyB3ZSBjYW4gZmluZCBnZW5lcmF0ZWQgZmlsZXMgbmV4dCB0byB0aGVpciAudHMgb3JpZ2luIGluIGNvbXBpbGVySG9zdC5cbiAgICB0aGlzLl9jb21waWxlck9wdGlvbnMub3V0RGlyID0gJyc7XG4gICAgdGhpcy5fY29tcGlsZXJPcHRpb25zLnN1cHByZXNzT3V0cHV0UGF0aENoZWNrID0gdHJ1ZTtcblxuICAgIC8vIERlZmF1bHQgcGx1Z2luIHNvdXJjZU1hcCB0byBjb21waWxlciBvcHRpb25zIHNldHRpbmcuXG4gICAgaWYgKCFvcHRpb25zLmhhc093blByb3BlcnR5KCdzb3VyY2VNYXAnKSkge1xuICAgICAgb3B0aW9ucy5zb3VyY2VNYXAgPSB0aGlzLl9jb21waWxlck9wdGlvbnMuc291cmNlTWFwIHx8IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEZvcmNlIHRoZSByaWdodCBzb3VyY2VtYXAgb3B0aW9ucy5cbiAgICBpZiAob3B0aW9ucy5zb3VyY2VNYXApIHtcbiAgICAgIHRoaXMuX2NvbXBpbGVyT3B0aW9ucy5zb3VyY2VNYXAgPSB0cnVlO1xuICAgICAgdGhpcy5fY29tcGlsZXJPcHRpb25zLmlubGluZVNvdXJjZXMgPSB0cnVlO1xuICAgICAgdGhpcy5fY29tcGlsZXJPcHRpb25zLmlubGluZVNvdXJjZU1hcCA9IGZhbHNlO1xuICAgICAgdGhpcy5fY29tcGlsZXJPcHRpb25zLm1hcFJvb3QgPSB1bmRlZmluZWQ7XG4gICAgICAvLyBXZSB3aWxsIHNldCB0aGUgc291cmNlIHRvIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgaW4gdGhlIGxvYWRlciwgc28gd2UgZG9uJ3RcbiAgICAgIC8vIG5lZWQgc291cmNlUm9vdCBoZXJlLlxuICAgICAgdGhpcy5fY29tcGlsZXJPcHRpb25zLnNvdXJjZVJvb3QgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NvbXBpbGVyT3B0aW9ucy5zb3VyY2VNYXAgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2NvbXBpbGVyT3B0aW9ucy5zb3VyY2VSb290ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fY29tcGlsZXJPcHRpb25zLmlubGluZVNvdXJjZXMgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jb21waWxlck9wdGlvbnMuaW5saW5lU291cmNlTWFwID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fY29tcGlsZXJPcHRpb25zLm1hcFJvb3QgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jb21waWxlck9wdGlvbnMuc291cmNlUm9vdCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvLyBXZSB3YW50IHRvIGFsbG93IGVtaXR0aW5nIHdpdGggZXJyb3JzIHNvIHRoYXQgaW1wb3J0cyBjYW4gYmUgYWRkZWRcbiAgICAvLyB0byB0aGUgd2VicGFjayBkZXBlbmRlbmN5IHRyZWUgYW5kIHJlYnVpbGRzIHRyaWdnZXJlZCBieSBmaWxlIGVkaXRzLlxuICAgIHRoaXMuX2NvbXBpbGVyT3B0aW9ucy5ub0VtaXRPbkVycm9yID0gZmFsc2U7XG5cbiAgICAvLyBTZXQgSklUIChubyBjb2RlIGdlbmVyYXRpb24pIG9yIEFPVCBtb2RlLlxuICAgIGlmIChvcHRpb25zLnNraXBDb2RlR2VuZXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9KaXRNb2RlID0gb3B0aW9ucy5za2lwQ29kZUdlbmVyYXRpb247XG4gICAgfVxuXG4gICAgLy8gUHJvY2VzcyBpMThuIG9wdGlvbnMuXG4gICAgaWYgKG9wdGlvbnMuaTE4bkluRmlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9jb21waWxlck9wdGlvbnMuaTE4bkluRmlsZSA9IG9wdGlvbnMuaTE4bkluRmlsZTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuaTE4bkluRm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX2NvbXBpbGVyT3B0aW9ucy5pMThuSW5Gb3JtYXQgPSBvcHRpb25zLmkxOG5JbkZvcm1hdDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuaTE4bk91dEZpbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fY29tcGlsZXJPcHRpb25zLmkxOG5PdXRGaWxlID0gb3B0aW9ucy5pMThuT3V0RmlsZTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuaTE4bk91dEZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9jb21waWxlck9wdGlvbnMuaTE4bk91dEZvcm1hdCA9IG9wdGlvbnMuaTE4bk91dEZvcm1hdDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubG9jYWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX2NvbXBpbGVyT3B0aW9ucy5pMThuSW5Mb2NhbGUgPSBvcHRpb25zLmxvY2FsZTtcbiAgICAgIHRoaXMuX2NvbXBpbGVyT3B0aW9ucy5pMThuT3V0TG9jYWxlID0gb3B0aW9ucy5sb2NhbGU7XG4gICAgICB0aGlzLl9ub3JtYWxpemVkTG9jYWxlID0gdGhpcy5fdmFsaWRhdGVMb2NhbGUob3B0aW9ucy5sb2NhbGUpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5taXNzaW5nVHJhbnNsYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fY29tcGlsZXJPcHRpb25zLmkxOG5Jbk1pc3NpbmdUcmFuc2xhdGlvbnMgPVxuICAgICAgICBvcHRpb25zLm1pc3NpbmdUcmFuc2xhdGlvbiBhcyAnZXJyb3InIHwgJ3dhcm5pbmcnIHwgJ2lnbm9yZSc7XG4gICAgfVxuXG4gICAgLy8gUHJvY2VzcyBmb3JrZWQgdHlwZSBjaGVja2VyIG9wdGlvbnMuXG4gICAgaWYgKG9wdGlvbnMuZm9ya1R5cGVDaGVja2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX2ZvcmtUeXBlQ2hlY2tlciA9IG9wdGlvbnMuZm9ya1R5cGVDaGVja2VyO1xuICAgIH1cblxuICAgIC8vIEFkZCBjdXN0b20gcGxhdGZvcm0gdHJhbnNmb3JtZXJzLlxuICAgIGlmIChvcHRpb25zLnBsYXRmb3JtVHJhbnNmb3JtZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3BsYXRmb3JtVHJhbnNmb3JtZXJzID0gb3B0aW9ucy5wbGF0Zm9ybVRyYW5zZm9ybWVycztcbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IENvbnRleHRFbGVtZW50RGVwZW5kZW5jeSB0byB0aGUgb25lIHdlIGNhbiBpbXBvcnQgZnJvbSBoZXJlLlxuICAgIC8vIEZhaWxpbmcgdG8gdXNlIHRoZSByaWdodCBDb250ZXh0RWxlbWVudERlcGVuZGVuY3kgd2lsbCB0aHJvdyB0aGUgZXJyb3IgYmVsb3c6XG4gICAgLy8gXCJObyBtb2R1bGUgZmFjdG9yeSBhdmFpbGFibGUgZm9yIGRlcGVuZGVuY3kgdHlwZTogQ29udGV4dEVsZW1lbnREZXBlbmRlbmN5XCJcbiAgICAvLyBIb2lzdGluZyB0b2dldGhlciB3aXRoIHBlZXIgZGVwZW5kZW5jaWVzIGNhbiBtYWtlIGl0IHNvIHRoZSBpbXBvcnRlZFxuICAgIC8vIENvbnRleHRFbGVtZW50RGVwZW5kZW5jeSBkb2VzIG5vdCBjb21lIGZyb20gdGhlIHNhbWUgV2VicGFjayBpbnN0YW5jZSB0aGF0IGlzIHVzZWRcbiAgICAvLyBpbiB0aGUgY29tcGlsYXRpb24uIEluIHRoYXQgY2FzZSwgd2UgY2FuIHBhc3MgdGhlIHJpZ2h0IG9uZSBhcyBhbiBvcHRpb24gdG8gdGhlIHBsdWdpbi5cbiAgICB0aGlzLl9jb250ZXh0RWxlbWVudERlcGVuZGVuY3lDb25zdHJ1Y3RvciA9IG9wdGlvbnMuY29udGV4dEVsZW1lbnREZXBlbmRlbmN5Q29uc3RydWN0b3JcbiAgICAgIHx8IHJlcXVpcmUoJ3dlYnBhY2svbGliL2RlcGVuZGVuY2llcy9Db250ZXh0RWxlbWVudERlcGVuZGVuY3knKTtcblxuICAgIC8vIFVzZSBlbnRyeU1vZHVsZSBpZiBhdmFpbGFibGUgaW4gb3B0aW9ucywgb3RoZXJ3aXNlIHJlc29sdmUgaXQgZnJvbSBtYWluUGF0aCBhZnRlciBwcm9ncmFtXG4gICAgLy8gY3JlYXRpb24uXG4gICAgaWYgKHRoaXMuX29wdGlvbnMuZW50cnlNb2R1bGUpIHtcbiAgICAgIHRoaXMuX2VudHJ5TW9kdWxlID0gdGhpcy5fb3B0aW9ucy5lbnRyeU1vZHVsZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2NvbXBpbGVyT3B0aW9ucy5lbnRyeU1vZHVsZSkge1xuICAgICAgdGhpcy5fZW50cnlNb2R1bGUgPSBwYXRoLnJlc29sdmUodGhpcy5fYmFzZVBhdGgsXG4gICAgICAgIHRoaXMuX2NvbXBpbGVyT3B0aW9ucy5lbnRyeU1vZHVsZSBhcyBzdHJpbmcpOyAvLyB0ZW1wb3JhcnkgY2FzdCBmb3IgdHlwZSBpc3N1ZVxuICAgIH1cblxuICAgIC8vIFNldCBwbGF0Zm9ybS5cbiAgICB0aGlzLl9wbGF0Zm9ybSA9IG9wdGlvbnMucGxhdGZvcm0gfHwgUExBVEZPUk0uQnJvd3NlcjtcblxuICAgIC8vIE1ha2UgdHJhbnNmb3JtZXJzLlxuICAgIHRoaXMuX21ha2VUcmFuc2Zvcm1lcnMoKTtcblxuICAgIHRpbWVFbmQoJ0FuZ3VsYXJDb21waWxlclBsdWdpbi5fc2V0dXBPcHRpb25zJyk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRUc1Byb2dyYW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX0ppdE1vZGUgPyB0aGlzLl9wcm9ncmFtIGFzIHRzLlByb2dyYW0gOiAodGhpcy5fcHJvZ3JhbSBhcyBQcm9ncmFtKS5nZXRUc1Byb2dyYW0oKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldENoYW5nZWRUc0ZpbGVzKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlckhvc3QuZ2V0Q2hhbmdlZEZpbGVQYXRocygpXG4gICAgICAuZmlsdGVyKGsgPT4gKGsuZW5kc1dpdGgoJy50cycpIHx8IGsuZW5kc1dpdGgoJy50c3gnKSkgJiYgIWsuZW5kc1dpdGgoJy5kLnRzJykpXG4gICAgICAuZmlsdGVyKGsgPT4gdGhpcy5fY29tcGlsZXJIb3N0LmZpbGVFeGlzdHMoaykpO1xuICB9XG5cbiAgdXBkYXRlQ2hhbmdlZEZpbGVFeHRlbnNpb25zKGV4dGVuc2lvbjogc3RyaW5nKSB7XG4gICAgaWYgKGV4dGVuc2lvbikge1xuICAgICAgdGhpcy5fY2hhbmdlZEZpbGVFeHRlbnNpb25zLmFkZChleHRlbnNpb24pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldENoYW5nZWRDb21waWxhdGlvbkZpbGVzKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlckhvc3QuZ2V0Q2hhbmdlZEZpbGVQYXRocygpXG4gICAgICAuZmlsdGVyKGsgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGV4dCBvZiB0aGlzLl9jaGFuZ2VkRmlsZUV4dGVuc2lvbnMpIHtcbiAgICAgICAgICBpZiAoay5lbmRzV2l0aChleHQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZU9yVXBkYXRlUHJvZ3JhbSgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gR2V0IHRoZSByb290IGZpbGVzIGZyb20gdGhlIHRzIGNvbmZpZy5cbiAgICAgICAgLy8gV2hlbiBhIG5ldyByb290IG5hbWUgKGxpa2UgYSBsYXp5IHJvdXRlKSBpcyBhZGRlZCwgaXQgd29uJ3QgYmUgYXZhaWxhYmxlIGZyb21cbiAgICAgICAgLy8gZm9sbG93aW5nIGltcG9ydHMgb24gdGhlIGV4aXN0aW5nIGZpbGVzLCBzbyB3ZSBuZWVkIHRvIGdldCB0aGUgbmV3IGxpc3Qgb2Ygcm9vdCBmaWxlcy5cbiAgICAgICAgY29uc3QgY29uZmlnID0gcmVhZENvbmZpZ3VyYXRpb24odGhpcy5fdHNDb25maWdQYXRoKTtcbiAgICAgICAgdGhpcy5fcm9vdE5hbWVzID0gY29uZmlnLnJvb3ROYW1lcy5jb25jYXQoLi4udGhpcy5fc2luZ2xlRmlsZUluY2x1ZGVzKTtcblxuICAgICAgICAvLyBVcGRhdGUgdGhlIGZvcmtlZCB0eXBlIGNoZWNrZXIgd2l0aCBhbGwgY2hhbmdlZCBjb21waWxhdGlvbiBmaWxlcy5cbiAgICAgICAgLy8gVGhpcyBpbmNsdWRlcyB0ZW1wbGF0ZXMsIHRoYXQgYWxzbyBuZWVkIHRvIGJlIHJlbG9hZGVkIG9uIHRoZSB0eXBlIGNoZWNrZXIuXG4gICAgICAgIGlmICh0aGlzLl9mb3JrVHlwZUNoZWNrZXIgJiYgdGhpcy5fdHlwZUNoZWNrZXJQcm9jZXNzICYmICF0aGlzLl9maXJzdFJ1bikge1xuICAgICAgICAgIHRoaXMuX3VwZGF0ZUZvcmtlZFR5cGVDaGVja2VyKHRoaXMuX3Jvb3ROYW1lcywgdGhpcy5fZ2V0Q2hhbmdlZENvbXBpbGF0aW9uRmlsZXMoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAgLy8gVXNlIGFuIGlkZW50aXR5IGZ1bmN0aW9uIGFzIGFsbCBvdXIgcGF0aHMgYXJlIGFic29sdXRlIGFscmVhZHkuXG4gICAgICAgIHRoaXMuX21vZHVsZVJlc29sdXRpb25DYWNoZSA9IHRzLmNyZWF0ZU1vZHVsZVJlc29sdXRpb25DYWNoZSh0aGlzLl9iYXNlUGF0aCwgeCA9PiB4KTtcblxuICAgICAgICBpZiAodGhpcy5fSml0TW9kZSkge1xuICAgICAgICAgIC8vIENyZWF0ZSB0aGUgVHlwZVNjcmlwdCBwcm9ncmFtLlxuICAgICAgICAgIHRpbWUoJ0FuZ3VsYXJDb21waWxlclBsdWdpbi5fY3JlYXRlT3JVcGRhdGVQcm9ncmFtLnRzLmNyZWF0ZVByb2dyYW0nKTtcbiAgICAgICAgICB0aGlzLl9wcm9ncmFtID0gdHMuY3JlYXRlUHJvZ3JhbShcbiAgICAgICAgICAgIHRoaXMuX3Jvb3ROYW1lcyxcbiAgICAgICAgICAgIHRoaXMuX2NvbXBpbGVyT3B0aW9ucyxcbiAgICAgICAgICAgIHRoaXMuX2NvbXBpbGVySG9zdCxcbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0gYXMgdHMuUHJvZ3JhbSxcbiAgICAgICAgICApO1xuICAgICAgICAgIHRpbWVFbmQoJ0FuZ3VsYXJDb21waWxlclBsdWdpbi5fY3JlYXRlT3JVcGRhdGVQcm9ncmFtLnRzLmNyZWF0ZVByb2dyYW0nKTtcblxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aW1lKCdBbmd1bGFyQ29tcGlsZXJQbHVnaW4uX2NyZWF0ZU9yVXBkYXRlUHJvZ3JhbS5uZy5jcmVhdGVQcm9ncmFtJyk7XG4gICAgICAgICAgLy8gQ3JlYXRlIHRoZSBBbmd1bGFyIHByb2dyYW0uXG4gICAgICAgICAgdGhpcy5fcHJvZ3JhbSA9IGNyZWF0ZVByb2dyYW0oe1xuICAgICAgICAgICAgcm9vdE5hbWVzOiB0aGlzLl9yb290TmFtZXMsXG4gICAgICAgICAgICBvcHRpb25zOiB0aGlzLl9jb21waWxlck9wdGlvbnMsXG4gICAgICAgICAgICBob3N0OiB0aGlzLl9jb21waWxlckhvc3QsXG4gICAgICAgICAgICBvbGRQcm9ncmFtOiB0aGlzLl9wcm9ncmFtIGFzIFByb2dyYW0sXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGltZUVuZCgnQW5ndWxhckNvbXBpbGVyUGx1Z2luLl9jcmVhdGVPclVwZGF0ZVByb2dyYW0ubmcuY3JlYXRlUHJvZ3JhbScpO1xuXG4gICAgICAgICAgdGltZSgnQW5ndWxhckNvbXBpbGVyUGx1Z2luLl9jcmVhdGVPclVwZGF0ZVByb2dyYW0ubmcubG9hZE5nU3RydWN0dXJlQXN5bmMnKTtcblxuICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9ncmFtLmxvYWROZ1N0cnVjdHVyZUFzeW5jKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGltZUVuZCgnQW5ndWxhckNvbXBpbGVyUGx1Z2luLl9jcmVhdGVPclVwZGF0ZVByb2dyYW0ubmcubG9hZE5nU3RydWN0dXJlQXN5bmMnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBJZiB0aGVyZSdzIHN0aWxsIG5vIGVudHJ5TW9kdWxlIHRyeSB0byByZXNvbHZlIGZyb20gbWFpblBhdGguXG4gICAgICAgIGlmICghdGhpcy5fZW50cnlNb2R1bGUgJiYgdGhpcy5fbWFpblBhdGgpIHtcbiAgICAgICAgICB0aW1lKCdBbmd1bGFyQ29tcGlsZXJQbHVnaW4uX21ha2UucmVzb2x2ZUVudHJ5TW9kdWxlRnJvbU1haW4nKTtcbiAgICAgICAgICB0aGlzLl9lbnRyeU1vZHVsZSA9IHJlc29sdmVFbnRyeU1vZHVsZUZyb21NYWluKFxuICAgICAgICAgICAgdGhpcy5fbWFpblBhdGgsIHRoaXMuX2NvbXBpbGVySG9zdCwgdGhpcy5fZ2V0VHNQcm9ncmFtKCkpO1xuICAgICAgICAgIHRpbWVFbmQoJ0FuZ3VsYXJDb21waWxlclBsdWdpbi5fbWFrZS5yZXNvbHZlRW50cnlNb2R1bGVGcm9tTWFpbicpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldExhenlSb3V0ZXNGcm9tTmd0b29scygpIHtcbiAgICB0cnkge1xuICAgICAgdGltZSgnQW5ndWxhckNvbXBpbGVyUGx1Z2luLl9nZXRMYXp5Um91dGVzRnJvbU5ndG9vbHMnKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IF9fTkdUT09MU19QUklWQVRFX0FQSV8yLmxpc3RMYXp5Um91dGVzKHtcbiAgICAgICAgcHJvZ3JhbTogdGhpcy5fZ2V0VHNQcm9ncmFtKCksXG4gICAgICAgIGhvc3Q6IHRoaXMuX2NvbXBpbGVySG9zdCxcbiAgICAgICAgYW5ndWxhckNvbXBpbGVyT3B0aW9uczogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fY29tcGlsZXJPcHRpb25zLCB7XG4gICAgICAgICAgLy8gZ2VuRGlyIHNlZW1zIHRvIHN0aWxsIGJlIG5lZWRlZCBpbiBAYW5ndWxhclxcY29tcGlsZXItY2xpXFxzcmNcXGNvbXBpbGVyX2hvc3QuanM6MjI2LlxuICAgICAgICAgIGdlbkRpcjogJycsXG4gICAgICAgIH0pLFxuICAgICAgICAvLyBUT0RPOiBmaXggY29tcGlsZXItY2xpIHR5cGluZ3M7IGVudHJ5TW9kdWxlIHNob3VsZCBub3QgYmUgc3RyaW5nLCBidXQgYWxzbyBvcHRpb25hbC5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vbi1udWxsLW9wZXJhdG9yXG4gICAgICAgIGVudHJ5TW9kdWxlOiB0aGlzLl9lbnRyeU1vZHVsZSAhLFxuICAgICAgfSk7XG4gICAgICB0aW1lRW5kKCdBbmd1bGFyQ29tcGlsZXJQbHVnaW4uX2dldExhenlSb3V0ZXNGcm9tTmd0b29scycpO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gV2Ugc2lsZW5jZSB0aGUgZXJyb3IgdGhhdCB0aGUgQGFuZ3VsYXIvcm91dGVyIGNvdWxkIG5vdCBiZSBmb3VuZC4gSW4gdGhhdCBjYXNlLCB0aGVyZSBpc1xuICAgICAgLy8gYmFzaWNhbGx5IG5vIHJvdXRlIHN1cHBvcnRlZCBieSB0aGUgYXBwIGl0c2VsZi5cbiAgICAgIGlmIChlcnIubWVzc2FnZS5zdGFydHNXaXRoKCdDb3VsZCBub3QgcmVzb2x2ZSBtb2R1bGUgQGFuZ3VsYXIvcm91dGVyJykpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRMYXp5Um91dGVzSW5Bc3QoY2hhbmdlZEZpbGVQYXRoczogc3RyaW5nW10pOiBMYXp5Um91dGVNYXAge1xuICAgIHRpbWUoJ0FuZ3VsYXJDb21waWxlclBsdWdpbi5fZmluZExhenlSb3V0ZXNJbkFzdCcpO1xuICAgIGNvbnN0IHJlc3VsdDogTGF6eVJvdXRlTWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBmb3IgKGNvbnN0IGZpbGVQYXRoIG9mIGNoYW5nZWRGaWxlUGF0aHMpIHtcbiAgICAgIGNvbnN0IGZpbGVMYXp5Um91dGVzID0gZmluZExhenlSb3V0ZXMoZmlsZVBhdGgsIHRoaXMuX2NvbXBpbGVySG9zdCwgdW5kZWZpbmVkLFxuICAgICAgICB0aGlzLl9jb21waWxlck9wdGlvbnMpO1xuICAgICAgZm9yIChjb25zdCByb3V0ZUtleSBvZiBPYmplY3Qua2V5cyhmaWxlTGF6eVJvdXRlcykpIHtcbiAgICAgICAgY29uc3Qgcm91dGUgPSBmaWxlTGF6eVJvdXRlc1tyb3V0ZUtleV07XG4gICAgICAgIHJlc3VsdFtyb3V0ZUtleV0gPSByb3V0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGltZUVuZCgnQW5ndWxhckNvbXBpbGVyUGx1Z2luLl9maW5kTGF6eVJvdXRlc0luQXN0Jyk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdExhenlSb3V0ZXNGcm9tUHJvZ3JhbSgpOiBMYXp5Um91dGVNYXAge1xuICAgIGNvbnN0IG5nUHJvZ3JhbSA9IHRoaXMuX3Byb2dyYW0gYXMgUHJvZ3JhbTtcbiAgICBpZiAoIW5nUHJvZ3JhbS5saXN0TGF6eVJvdXRlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdfbGlzdExhenlSb3V0ZXNGcm9tUHJvZ3JhbSB3YXMgY2FsbGVkIHdpdGggYW4gb2xkIHByb2dyYW0uJyk7XG4gICAgfVxuXG4gICAgY29uc3QgbGF6eVJvdXRlcyA9IG5nUHJvZ3JhbS5saXN0TGF6eVJvdXRlcygpO1xuXG4gICAgcmV0dXJuIGxhenlSb3V0ZXMucmVkdWNlKFxuICAgICAgKGFjYywgY3VycikgPT4ge1xuICAgICAgICBjb25zdCByZWYgPSBjdXJyLnJvdXRlO1xuICAgICAgICBpZiAocmVmIGluIGFjYyAmJiBhY2NbcmVmXSAhPT0gY3Vyci5yZWZlcmVuY2VkTW9kdWxlLmZpbGVQYXRoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgKyBgRHVwbGljYXRlZCBwYXRoIGluIGxvYWRDaGlsZHJlbiBkZXRlY3RlZDogXCIke3JlZn1cIiBpcyB1c2VkIGluIDIgbG9hZENoaWxkcmVuLCBgXG4gICAgICAgICAgICArIGBidXQgdGhleSBwb2ludCB0byBkaWZmZXJlbnQgbW9kdWxlcyBcIigke2FjY1tyZWZdfSBhbmQgYFxuICAgICAgICAgICAgKyBgXCIke2N1cnIucmVmZXJlbmNlZE1vZHVsZS5maWxlUGF0aH1cIikuIFdlYnBhY2sgY2Fubm90IGRpc3Rpbmd1aXNoIG9uIGNvbnRleHQgYW5kIGBcbiAgICAgICAgICAgICsgJ3dvdWxkIGZhaWwgdG8gbG9hZCB0aGUgcHJvcGVyIG9uZS4nLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYWNjW3JlZl0gPSBjdXJyLnJlZmVyZW5jZWRNb2R1bGUuZmlsZVBhdGg7XG5cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sXG4gICAgICB7fSBhcyBMYXp5Um91dGVNYXAsXG4gICAgKTtcbiAgfVxuXG4gIC8vIFByb2Nlc3MgdGhlIGxhenkgcm91dGVzIGRpc2NvdmVyZWQsIGFkZGluZyB0aGVuIHRvIF9sYXp5Um91dGVzLlxuICAvLyBUT0RPOiBmaW5kIGEgd2F5IHRvIHJlbW92ZSBsYXp5IHJvdXRlcyB0aGF0IGRvbid0IGV4aXN0IGFueW1vcmUuXG4gIC8vIFRoaXMgd2lsbCByZXF1aXJlIGEgcmVnaXN0cnkgb2Yga25vd24gcmVmZXJlbmNlcyB0byBhIGxhenkgcm91dGUsIHJlbW92aW5nIGl0IHdoZW4gbm9cbiAgLy8gbW9kdWxlIHJlZmVyZW5jZXMgaXQgYW55bW9yZS5cbiAgcHJpdmF0ZSBfcHJvY2Vzc0xhenlSb3V0ZXMoZGlzY292ZXJlZExhenlSb3V0ZXM6IExhenlSb3V0ZU1hcCkge1xuICAgIE9iamVjdC5rZXlzKGRpc2NvdmVyZWRMYXp5Um91dGVzKVxuICAgICAgLmZvckVhY2gobGF6eVJvdXRlS2V5ID0+IHtcbiAgICAgICAgY29uc3QgW2xhenlSb3V0ZU1vZHVsZSwgbW9kdWxlTmFtZV0gPSBsYXp5Um91dGVLZXkuc3BsaXQoJyMnKTtcblxuICAgICAgICBpZiAoIWxhenlSb3V0ZU1vZHVsZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxhenlSb3V0ZVRTRmlsZSA9IGRpc2NvdmVyZWRMYXp5Um91dGVzW2xhenlSb3V0ZUtleV0ucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xuICAgICAgICBsZXQgbW9kdWxlUGF0aDogc3RyaW5nLCBtb2R1bGVLZXk6IHN0cmluZztcblxuICAgICAgICBpZiAodGhpcy5fSml0TW9kZSkge1xuICAgICAgICAgIG1vZHVsZVBhdGggPSBsYXp5Um91dGVUU0ZpbGU7XG4gICAgICAgICAgbW9kdWxlS2V5ID0gYCR7bGF6eVJvdXRlTW9kdWxlfSR7bW9kdWxlTmFtZSA/ICcjJyArIG1vZHVsZU5hbWUgOiAnJ31gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1vZHVsZVBhdGggPSBsYXp5Um91dGVUU0ZpbGUucmVwbGFjZSgvKFxcLmQpP1xcLnRzeD8kLywgJycpO1xuICAgICAgICAgIG1vZHVsZVBhdGggKz0gJy5uZ2ZhY3RvcnkuanMnO1xuICAgICAgICAgIGNvbnN0IGZhY3RvcnlNb2R1bGVOYW1lID0gbW9kdWxlTmFtZSA/IGAjJHttb2R1bGVOYW1lfU5nRmFjdG9yeWAgOiAnJztcbiAgICAgICAgICBtb2R1bGVLZXkgPSBgJHtsYXp5Um91dGVNb2R1bGV9Lm5nZmFjdG9yeSR7ZmFjdG9yeU1vZHVsZU5hbWV9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vZHVsZVBhdGggPSB3b3JrYXJvdW5kUmVzb2x2ZShtb2R1bGVQYXRoKTtcblxuICAgICAgICBpZiAobW9kdWxlS2V5IGluIHRoaXMuX2xhenlSb3V0ZXMpIHtcbiAgICAgICAgICBpZiAodGhpcy5fbGF6eVJvdXRlc1ttb2R1bGVLZXldICE9PSBtb2R1bGVQYXRoKSB7XG4gICAgICAgICAgICAvLyBGb3VuZCBhIGR1cGxpY2F0ZSwgdGhpcyBpcyBhbiBlcnJvci5cbiAgICAgICAgICAgIHRoaXMuX3dhcm5pbmdzLnB1c2goXG4gICAgICAgICAgICAgIG5ldyBFcnJvcihgRHVwbGljYXRlZCBwYXRoIGluIGxvYWRDaGlsZHJlbiBkZXRlY3RlZCBkdXJpbmcgYSByZWJ1aWxkLiBgXG4gICAgICAgICAgICAgICAgKyBgV2Ugd2lsbCB0YWtlIHRoZSBsYXRlc3QgdmVyc2lvbiBkZXRlY3RlZCBhbmQgb3ZlcnJpZGUgaXQgdG8gc2F2ZSByZWJ1aWxkIHRpbWUuIGBcbiAgICAgICAgICAgICAgICArIGBZb3Ugc2hvdWxkIHBlcmZvcm0gYSBmdWxsIGJ1aWxkIHRvIHZhbGlkYXRlIHRoYXQgeW91ciByb3V0ZXMgZG9uJ3Qgb3ZlcmxhcC5gKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEZvdW5kIGEgbmV3IHJvdXRlLCBhZGQgaXQgdG8gdGhlIG1hcC5cbiAgICAgICAgICB0aGlzLl9sYXp5Um91dGVzW21vZHVsZUtleV0gPSBtb2R1bGVQYXRoO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUZvcmtlZFR5cGVDaGVja2VyKCkge1xuICAgIC8vIEJvb3RzdHJhcCB0eXBlIGNoZWNrZXIgaXMgdXNpbmcgbG9jYWwgQ0xJLlxuICAgIGNvbnN0IGc6IGFueSA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDoge307ICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWFueVxuICAgIGNvbnN0IHR5cGVDaGVja2VyRmlsZTogc3RyaW5nID0gZ1snX0RldktpdElzTG9jYWwnXVxuICAgICAgPyAnLi90eXBlX2NoZWNrZXJfYm9vdHN0cmFwLmpzJ1xuICAgICAgOiAnLi90eXBlX2NoZWNrZXJfd29ya2VyLmpzJztcblxuICAgIGNvbnN0IGRlYnVnQXJnUmVnZXggPSAvLS1pbnNwZWN0KD86LWJya3wtcG9ydCk/fC0tZGVidWcoPzotYnJrfC1wb3J0KS87XG5cbiAgICBjb25zdCBleGVjQXJndiA9IHByb2Nlc3MuZXhlY0FyZ3YuZmlsdGVyKChhcmcpID0+IHtcbiAgICAgIC8vIFJlbW92ZSBkZWJ1ZyBhcmdzLlxuICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2lzc3Vlcy85NDM1XG4gICAgICByZXR1cm4gIWRlYnVnQXJnUmVnZXgudGVzdChhcmcpO1xuICAgIH0pO1xuICAgIC8vIFNpZ25hbCB0aGUgcHJvY2VzcyB0byBzdGFydCBsaXN0ZW5pbmcgZm9yIG1lc3NhZ2VzXG4gICAgLy8gU29sdmVzIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2lzc3Vlcy85MDcxXG4gICAgY29uc3QgZm9ya0FyZ3MgPSBbQVVUT19TVEFSVF9BUkddO1xuICAgIGNvbnN0IGZvcmtPcHRpb25zOiBGb3JrT3B0aW9ucyA9IHsgZXhlY0FyZ3YgfTtcblxuICAgIHRoaXMuX3R5cGVDaGVja2VyUHJvY2VzcyA9IGZvcmsoXG4gICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCB0eXBlQ2hlY2tlckZpbGUpLFxuICAgICAgZm9ya0FyZ3MsXG4gICAgICBmb3JrT3B0aW9ucyk7XG5cbiAgICAvLyBIYW5kbGUgY2hpbGQgcHJvY2VzcyBleGl0LlxuICAgIHRoaXMuX3R5cGVDaGVja2VyUHJvY2Vzcy5vbmNlKCdleGl0JywgKF8sIHNpZ25hbCkgPT4ge1xuICAgICAgdGhpcy5fdHlwZUNoZWNrZXJQcm9jZXNzID0gbnVsbDtcblxuICAgICAgLy8gSWYgcHJvY2VzcyBleGl0ZWQgbm90IGJlY2F1c2Ugb2YgU0lHVEVSTSAoc2VlIF9raWxsRm9ya2VkVHlwZUNoZWNrZXIpLCB0aGFuIHNvbWV0aGluZ1xuICAgICAgLy8gd2VudCB3cm9uZyBhbmQgaXQgc2hvdWxkIGZhbGxiYWNrIHRvIHR5cGUgY2hlY2tpbmcgb24gdGhlIG1haW4gdGhyZWFkLlxuICAgICAgaWYgKHNpZ25hbCAhPT0gJ1NJR1RFUk0nKSB7XG4gICAgICAgIHRoaXMuX2ZvcmtUeXBlQ2hlY2tlciA9IGZhbHNlO1xuICAgICAgICBjb25zdCBtc2cgPSAnQW5ndWxhckNvbXBpbGVyUGx1Z2luOiBGb3JrZWQgVHlwZSBDaGVja2VyIGV4aXRlZCB1bmV4cGVjdGVkbHkuICcgK1xuICAgICAgICAgICdGYWxsaW5nIGJhY2sgdG8gdHlwZSBjaGVja2luZyBvbiBtYWluIHRocmVhZC4nO1xuICAgICAgICB0aGlzLl93YXJuaW5ncy5wdXNoKG1zZyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9raWxsRm9ya2VkVHlwZUNoZWNrZXIoKSB7XG4gICAgaWYgKHRoaXMuX3R5cGVDaGVja2VyUHJvY2VzcyAmJiB0aGlzLl90eXBlQ2hlY2tlclByb2Nlc3MucGlkKSB7XG4gICAgICB0cmVlS2lsbCh0aGlzLl90eXBlQ2hlY2tlclByb2Nlc3MucGlkLCAnU0lHVEVSTScpO1xuICAgICAgdGhpcy5fdHlwZUNoZWNrZXJQcm9jZXNzID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVGb3JrZWRUeXBlQ2hlY2tlcihyb290TmFtZXM6IHN0cmluZ1tdLCBjaGFuZ2VkQ29tcGlsYXRpb25GaWxlczogc3RyaW5nW10pIHtcbiAgICBpZiAodGhpcy5fdHlwZUNoZWNrZXJQcm9jZXNzKSB7XG4gICAgICBpZiAoIXRoaXMuX2ZvcmtlZFR5cGVDaGVja2VySW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdGhpcy5fdHlwZUNoZWNrZXJQcm9jZXNzLnNlbmQobmV3IEluaXRNZXNzYWdlKHRoaXMuX2NvbXBpbGVyT3B0aW9ucywgdGhpcy5fYmFzZVBhdGgsXG4gICAgICAgICAgdGhpcy5fSml0TW9kZSwgdGhpcy5fcm9vdE5hbWVzKSk7XG4gICAgICAgIHRoaXMuX2ZvcmtlZFR5cGVDaGVja2VySW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5fdHlwZUNoZWNrZXJQcm9jZXNzLnNlbmQobmV3IFVwZGF0ZU1lc3NhZ2Uocm9vdE5hbWVzLCBjaGFuZ2VkQ29tcGlsYXRpb25GaWxlcykpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlZ2lzdHJhdGlvbiBob29rIGZvciB3ZWJwYWNrIHBsdWdpbi5cbiAgYXBwbHkoY29tcGlsZXI6IENvbXBpbGVyKSB7XG4gICAgLy8gRGVjb3JhdGUgaW5wdXRGaWxlU3lzdGVtIHRvIHNlcnZlIGNvbnRlbnRzIG9mIENvbXBpbGVySG9zdC5cbiAgICAvLyBVc2UgZGVjb3JhdGVkIGlucHV0RmlsZVN5c3RlbSBpbiB3YXRjaEZpbGVTeXN0ZW0uXG4gICAgY29tcGlsZXIuaG9va3MuZW52aXJvbm1lbnQudGFwKCdhbmd1bGFyLWNvbXBpbGVyJywgKCkgPT4ge1xuICAgICAgLy8gVGhlIHdlYnBhY2sgdHlwZXMgY3VycmVudGx5IGRvIG5vdCBpbmNsdWRlIHRoZXNlXG4gICAgICBjb25zdCBjb21waWxlcldpdGhGaWxlU3lzdGVtcyA9IGNvbXBpbGVyIGFzIENvbXBpbGVyICYge1xuICAgICAgICBpbnB1dEZpbGVTeXN0ZW06IElucHV0RmlsZVN5c3RlbSxcbiAgICAgICAgd2F0Y2hGaWxlU3lzdGVtOiBOb2RlV2F0Y2hGaWxlU3lzdGVtSW50ZXJmYWNlLFxuICAgICAgfTtcblxuICAgICAgbGV0IGhvc3Q6IHZpcnR1YWxGcy5Ib3N0PGZzLlN0YXRzPiA9IHRoaXMuX29wdGlvbnMuaG9zdCB8fCBuZXcgV2VicGFja0lucHV0SG9zdChcbiAgICAgICAgY29tcGlsZXJXaXRoRmlsZVN5c3RlbXMuaW5wdXRGaWxlU3lzdGVtLFxuICAgICAgKTtcblxuICAgICAgbGV0IHJlcGxhY2VtZW50czogTWFwPFBhdGgsIFBhdGg+IHwgKChwYXRoOiBQYXRoKSA9PiBQYXRoKSB8IHVuZGVmaW5lZDtcbiAgICAgIGlmICh0aGlzLl9vcHRpb25zLmhvc3RSZXBsYWNlbWVudFBhdGhzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5ob3N0UmVwbGFjZW1lbnRQYXRocyA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY29uc3QgcmVwbGFjZW1lbnRSZXNvbHZlciA9IHRoaXMuX29wdGlvbnMuaG9zdFJlcGxhY2VtZW50UGF0aHM7XG4gICAgICAgICAgcmVwbGFjZW1lbnRzID0gcGF0aCA9PiBub3JtYWxpemUocmVwbGFjZW1lbnRSZXNvbHZlcihnZXRTeXN0ZW1QYXRoKHBhdGgpKSk7XG4gICAgICAgICAgaG9zdCA9IG5ldyBjbGFzcyBleHRlbmRzIHZpcnR1YWxGcy5SZXNvbHZlckhvc3Q8ZnMuU3RhdHM+IHtcbiAgICAgICAgICAgIF9yZXNvbHZlKHBhdGg6IFBhdGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZShyZXBsYWNlbWVudFJlc29sdmVyKGdldFN5c3RlbVBhdGgocGF0aCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KGhvc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcGxhY2VtZW50cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICBjb25zdCBhbGlhc0hvc3QgPSBuZXcgdmlydHVhbEZzLkFsaWFzSG9zdChob3N0KTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGZyb20gaW4gdGhpcy5fb3B0aW9ucy5ob3N0UmVwbGFjZW1lbnRQYXRocykge1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZEZyb20gPSBub3JtYWxpemUoZnJvbSk7XG4gICAgICAgICAgICBjb25zdCBub3JtYWxpemVkV2l0aCA9IG5vcm1hbGl6ZSh0aGlzLl9vcHRpb25zLmhvc3RSZXBsYWNlbWVudFBhdGhzW2Zyb21dKTtcbiAgICAgICAgICAgIGFsaWFzSG9zdC5hbGlhc2VzLnNldChub3JtYWxpemVkRnJvbSwgbm9ybWFsaXplZFdpdGgpO1xuICAgICAgICAgICAgcmVwbGFjZW1lbnRzLnNldChub3JtYWxpemVkRnJvbSwgbm9ybWFsaXplZFdpdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBob3N0ID0gYWxpYXNIb3N0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgd2VicGFjayBjb21waWxlciBob3N0LlxuICAgICAgY29uc3Qgd2VicGFja0NvbXBpbGVySG9zdCA9IG5ldyBXZWJwYWNrQ29tcGlsZXJIb3N0KFxuICAgICAgICB0aGlzLl9jb21waWxlck9wdGlvbnMsXG4gICAgICAgIHRoaXMuX2Jhc2VQYXRoLFxuICAgICAgICBob3N0LFxuICAgICAgKTtcbiAgICAgIHdlYnBhY2tDb21waWxlckhvc3QuZW5hYmxlQ2FjaGluZygpO1xuXG4gICAgICAvLyBDcmVhdGUgYW5kIHNldCBhIG5ldyBXZWJwYWNrUmVzb3VyY2VMb2FkZXIuXG4gICAgICB0aGlzLl9yZXNvdXJjZUxvYWRlciA9IG5ldyBXZWJwYWNrUmVzb3VyY2VMb2FkZXIoKTtcbiAgICAgIHdlYnBhY2tDb21waWxlckhvc3Quc2V0UmVzb3VyY2VMb2FkZXIodGhpcy5fcmVzb3VyY2VMb2FkZXIpO1xuXG4gICAgICAvLyBVc2UgdGhlIFdlYnBhY2tDb21waWxlckhvc3Qgd2l0aCBhIHJlc291cmNlIGxvYWRlciB0byBjcmVhdGUgYW4gQW5ndWxhckNvbXBpbGVySG9zdC5cbiAgICAgIHRoaXMuX2NvbXBpbGVySG9zdCA9IGNyZWF0ZUNvbXBpbGVySG9zdCh7XG4gICAgICAgIG9wdGlvbnM6IHRoaXMuX2NvbXBpbGVyT3B0aW9ucyxcbiAgICAgICAgdHNIb3N0OiB3ZWJwYWNrQ29tcGlsZXJIb3N0LFxuICAgICAgfSkgYXMgQ29tcGlsZXJIb3N0ICYgV2VicGFja0NvbXBpbGVySG9zdDtcblxuICAgICAgLy8gUmVzb2x2ZSBtYWluUGF0aCBpZiBwcm92aWRlZC5cbiAgICAgIGlmICh0aGlzLl9vcHRpb25zLm1haW5QYXRoKSB7XG4gICAgICAgIHRoaXMuX21haW5QYXRoID0gdGhpcy5fY29tcGlsZXJIb3N0LnJlc29sdmUodGhpcy5fb3B0aW9ucy5tYWluUGF0aCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlucHV0RGVjb3JhdG9yID0gbmV3IFZpcnR1YWxGaWxlU3lzdGVtRGVjb3JhdG9yKFxuICAgICAgICBjb21waWxlcldpdGhGaWxlU3lzdGVtcy5pbnB1dEZpbGVTeXN0ZW0sXG4gICAgICAgIHRoaXMuX2NvbXBpbGVySG9zdCxcbiAgICAgICk7XG4gICAgICBjb21waWxlcldpdGhGaWxlU3lzdGVtcy5pbnB1dEZpbGVTeXN0ZW0gPSBpbnB1dERlY29yYXRvcjtcbiAgICAgIGNvbXBpbGVyV2l0aEZpbGVTeXN0ZW1zLndhdGNoRmlsZVN5c3RlbSA9IG5ldyBWaXJ0dWFsV2F0Y2hGaWxlU3lzdGVtRGVjb3JhdG9yKFxuICAgICAgICBpbnB1dERlY29yYXRvcixcbiAgICAgICAgcmVwbGFjZW1lbnRzLFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIC8vIEFkZCBsYXp5IG1vZHVsZXMgdG8gdGhlIGNvbnRleHQgbW9kdWxlIGZvciBAYW5ndWxhci9jb3JlXG4gICAgY29tcGlsZXIuaG9va3MuY29udGV4dE1vZHVsZUZhY3RvcnkudGFwKCdhbmd1bGFyLWNvbXBpbGVyJywgY21mID0+IHtcbiAgICAgIGNvbnN0IGFuZ3VsYXJDb3JlUGFja2FnZVBhdGggPSByZXF1aXJlLnJlc29sdmUoJ0Bhbmd1bGFyL2NvcmUvcGFja2FnZS5qc29uJyk7XG5cbiAgICAgIC8vIEFQRnY2IGRvZXMgbm90IGhhdmUgc2luZ2xlIEZFU00gYW55bW9yZS4gSW5zdGVhZCBvZiB2ZXJpZnlpbmcgaWYgd2UncmUgcG9pbnRpbmcgdG9cbiAgICAgIC8vIEZFU01zLCB3ZSByZXNvbHZlIHRoZSBgQGFuZ3VsYXIvY29yZWAgcGF0aCBhbmQgdmVyaWZ5IHRoYXQgdGhlIHBhdGggZm9yIHRoZVxuICAgICAgLy8gbW9kdWxlIHN0YXJ0cyB3aXRoIGl0LlxuXG4gICAgICAvLyBUaGlzIG1heSBiZSBzbG93ZXIgYnV0IGl0IHdpbGwgYmUgY29tcGF0aWJsZSB3aXRoIGJvdGggQVBGNSwgNiBhbmQgcG90ZW50aWFsIGZ1dHVyZVxuICAgICAgLy8gdmVyc2lvbnMgKHVudGlsIHRoZSBkeW5hbWljIGltcG9ydCBhcHBlYXJzIG91dHNpZGUgb2YgY29yZSBJIHN1cHBvc2UpLlxuICAgICAgLy8gV2UgcmVzb2x2ZSBhbnkgc3ltYm9saWMgbGlua3MgaW4gb3JkZXIgdG8gZ2V0IHRoZSByZWFsIHBhdGggdGhhdCB3b3VsZCBiZSB1c2VkIGluIHdlYnBhY2suXG4gICAgICBjb25zdCBhbmd1bGFyQ29yZURpcm5hbWUgPSBmcy5yZWFscGF0aFN5bmMocGF0aC5kaXJuYW1lKGFuZ3VsYXJDb3JlUGFja2FnZVBhdGgpKTtcblxuICAgICAgY21mLmhvb2tzLmFmdGVyUmVzb2x2ZS50YXBQcm9taXNlKCdhbmd1bGFyLWNvbXBpbGVyJywgYXN5bmMgcmVzdWx0ID0+IHtcbiAgICAgICAgLy8gQWx0ZXIgb25seSByZXF1ZXN0IGZyb20gQW5ndWxhci5cbiAgICAgICAgaWYgKCFyZXN1bHQgfHwgIXRoaXMuZG9uZSB8fCAhcmVzdWx0LnJlc291cmNlLnN0YXJ0c1dpdGgoYW5ndWxhckNvcmVEaXJuYW1lKSkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kb25lLnRoZW4oXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgLy8gVGhpcyBmb2xkZXIgZG9lcyBub3QgZXhpc3QsIGJ1dCB3ZSBuZWVkIHRvIGdpdmUgd2VicGFjayBhIHJlc291cmNlLlxuICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgd2UgY2FuJ3QganVzdCBsZWF2ZSBpdCBhcyBpcyAoYW5ndWxhckNvcmVNb2R1bGVEaXIpLlxuICAgICAgICAgICAgcmVzdWx0LnJlc291cmNlID0gcGF0aC5qb2luKHRoaXMuX2Jhc2VQYXRoLCAnJCRfbGF6eV9yb3V0ZV9yZXNvdXJjZScpO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICAgICAgcmVzdWx0LmRlcGVuZGVuY2llcy5mb3JFYWNoKChkOiBhbnkpID0+IGQuY3JpdGljYWwgPSBmYWxzZSk7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgICAgICAgICByZXN1bHQucmVzb2x2ZURlcGVuZGVuY2llcyA9IChfZnM6IGFueSwgb3B0aW9uczogYW55LCBjYWxsYmFjazogQ2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZGVwZW5kZW5jaWVzID0gT2JqZWN0LmtleXModGhpcy5fbGF6eVJvdXRlcylcbiAgICAgICAgICAgICAgICAubWFwKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZHVsZVBhdGggPSB0aGlzLl9sYXp5Um91dGVzW2tleV07XG4gICAgICAgICAgICAgICAgICBjb25zdCBpbXBvcnRQYXRoID0ga2V5LnNwbGl0KCcjJylbMF07XG4gICAgICAgICAgICAgICAgICBpZiAobW9kdWxlUGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gaW1wb3J0UGF0aC5yZXBsYWNlKC8oXFwubmdmYWN0b3J5KT9cXC4oanN8dHMpJC8sICcnKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMuX2NvbnRleHRFbGVtZW50RGVwZW5kZW5jeUNvbnN0cnVjdG9yKG1vZHVsZVBhdGgsIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKHggPT4gISF4KTtcblxuICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5uYW1lTGF6eUZpbGVzKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jaHVua05hbWUgPSAnW3JlcXVlc3RdJztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGRlcGVuZGVuY2llcyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKCkgPT4gdW5kZWZpbmVkLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBDcmVhdGUgYW5kIGRlc3Ryb3kgZm9ya2VkIHR5cGUgY2hlY2tlciBvbiB3YXRjaCBtb2RlLlxuICAgIGNvbXBpbGVyLmhvb2tzLndhdGNoUnVuLnRhcCgnYW5ndWxhci1jb21waWxlcicsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9mb3JrVHlwZUNoZWNrZXIgJiYgIXRoaXMuX3R5cGVDaGVja2VyUHJvY2Vzcykge1xuICAgICAgICB0aGlzLl9jcmVhdGVGb3JrZWRUeXBlQ2hlY2tlcigpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbXBpbGVyLmhvb2tzLndhdGNoQ2xvc2UudGFwKCdhbmd1bGFyLWNvbXBpbGVyJywgKCkgPT4gdGhpcy5fa2lsbEZvcmtlZFR5cGVDaGVja2VyKCkpO1xuXG4gICAgLy8gUmVtYWtlIHRoZSBwbHVnaW4gb24gZWFjaCBjb21waWxhdGlvbi5cbiAgICBjb21waWxlci5ob29rcy5tYWtlLnRhcFByb21pc2UoJ2FuZ3VsYXItY29tcGlsZXInLCBjb21waWxhdGlvbiA9PiB0aGlzLl9tYWtlKGNvbXBpbGF0aW9uKSk7XG4gICAgY29tcGlsZXIuaG9va3MuaW52YWxpZC50YXAoJ2FuZ3VsYXItY29tcGlsZXInLCAoKSA9PiB0aGlzLl9maXJzdFJ1biA9IGZhbHNlKTtcbiAgICBjb21waWxlci5ob29rcy5hZnRlckVtaXQudGFwKCdhbmd1bGFyLWNvbXBpbGVyJywgY29tcGlsYXRpb24gPT4ge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgKGNvbXBpbGF0aW9uIGFzIGFueSkuX25nVG9vbHNXZWJwYWNrUGx1Z2luSW5zdGFuY2UgPSBudWxsO1xuICAgIH0pO1xuICAgIGNvbXBpbGVyLmhvb2tzLmRvbmUudGFwKCdhbmd1bGFyLWNvbXBpbGVyJywgKCkgPT4ge1xuICAgICAgdGhpcy5fZG9uZVByb21pc2UgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgY29tcGlsZXIuaG9va3MuYWZ0ZXJSZXNvbHZlcnMudGFwKCdhbmd1bGFyLWNvbXBpbGVyJywgY29tcGlsZXIgPT4ge1xuICAgICAgY29tcGlsZXIuaG9va3Mubm9ybWFsTW9kdWxlRmFjdG9yeS50YXAoJ2FuZ3VsYXItY29tcGlsZXInLCBubWYgPT4ge1xuICAgICAgICAvLyBWaXJ0dWFsIGZpbGUgc3lzdGVtLlxuICAgICAgICAvLyBUT0RPOiBjb25zaWRlciBpZiBpdCdzIGJldHRlciB0byByZW1vdmUgdGhpcyBwbHVnaW4gYW5kIGluc3RlYWQgbWFrZSBpdCB3YWl0IG9uIHRoZVxuICAgICAgICAvLyBWaXJ0dWFsRmlsZVN5c3RlbURlY29yYXRvci5cbiAgICAgICAgLy8gV2FpdCBmb3IgdGhlIHBsdWdpbiB0byBiZSBkb25lIHdoZW4gcmVxdWVzdGluZyBgLnRzYCBmaWxlcyBkaXJlY3RseSAoZW50cnkgcG9pbnRzKSwgb3JcbiAgICAgICAgLy8gd2hlbiB0aGUgaXNzdWVyIGlzIGEgYC50c2Agb3IgYC5uZ2ZhY3RvcnkuanNgIGZpbGUuXG4gICAgICAgIG5tZi5ob29rcy5iZWZvcmVSZXNvbHZlLnRhcFByb21pc2UoXG4gICAgICAgICAgJ2FuZ3VsYXItY29tcGlsZXInLFxuICAgICAgICAgIGFzeW5jIChyZXF1ZXN0PzogTm9ybWFsTW9kdWxlRmFjdG9yeVJlcXVlc3QpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRvbmUgJiYgcmVxdWVzdCkge1xuICAgICAgICAgICAgICBjb25zdCBuYW1lID0gcmVxdWVzdC5yZXF1ZXN0O1xuICAgICAgICAgICAgICBjb25zdCBpc3N1ZXIgPSByZXF1ZXN0LmNvbnRleHRJbmZvLmlzc3VlcjtcbiAgICAgICAgICAgICAgaWYgKG5hbWUuZW5kc1dpdGgoJy50cycpIHx8IG5hbWUuZW5kc1dpdGgoJy50c3gnKVxuICAgICAgICAgICAgICAgICAgfHwgKGlzc3VlciAmJiAvXFwudHN8bmdmYWN0b3J5XFwuanMkLy50ZXN0KGlzc3VlcikpKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZG9uZTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIHt9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29tcGlsZXIuaG9va3Mubm9ybWFsTW9kdWxlRmFjdG9yeS50YXAoJ2FuZ3VsYXItY29tcGlsZXInLCBubWYgPT4ge1xuICAgICAgbm1mLmhvb2tzLmJlZm9yZVJlc29sdmUudGFwQXN5bmMoXG4gICAgICAgICdhbmd1bGFyLWNvbXBpbGVyJyxcbiAgICAgICAgKHJlcXVlc3Q6IE5vcm1hbE1vZHVsZUZhY3RvcnlSZXF1ZXN0LCBjYWxsYmFjazogQ2FsbGJhY2s8Tm9ybWFsTW9kdWxlRmFjdG9yeVJlcXVlc3Q+KSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZVdpdGhQYXRocyhcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgIHRoaXMuX2NvbXBpbGVyT3B0aW9ucyxcbiAgICAgICAgICAgIHRoaXMuX2NvbXBpbGVySG9zdCxcbiAgICAgICAgICAgIHRoaXMuX21vZHVsZVJlc29sdXRpb25DYWNoZSxcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX21ha2UoY29tcGlsYXRpb246IGNvbXBpbGF0aW9uLkNvbXBpbGF0aW9uKSB7XG4gICAgdGltZSgnQW5ndWxhckNvbXBpbGVyUGx1Z2luLl9tYWtlJyk7XG4gICAgdGhpcy5fZW1pdFNraXBwZWQgPSB0cnVlO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICBpZiAoKGNvbXBpbGF0aW9uIGFzIGFueSkuX25nVG9vbHNXZWJwYWNrUGx1Z2luSW5zdGFuY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQW4gQG5ndG9vbHMvd2VicGFjayBwbHVnaW4gYWxyZWFkeSBleGlzdCBmb3IgdGhpcyBjb21waWxhdGlvbi4nKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgYSBwcml2YXRlIHZhcmlhYmxlIGZvciB0aGlzIHBsdWdpbiBpbnN0YW5jZS5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgKGNvbXBpbGF0aW9uIGFzIGFueSkuX25nVG9vbHNXZWJwYWNrUGx1Z2luSW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgLy8gVXBkYXRlIHRoZSByZXNvdXJjZSBsb2FkZXIgd2l0aCB0aGUgbmV3IHdlYnBhY2sgY29tcGlsYXRpb24uXG4gICAgdGhpcy5fcmVzb3VyY2VMb2FkZXIudXBkYXRlKGNvbXBpbGF0aW9uKTtcblxuICAgIHJldHVybiB0aGlzLl9kb25lUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLl91cGRhdGUoKSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5wdXNoQ29tcGlsYXRpb25FcnJvcnMoY29tcGlsYXRpb24pO1xuICAgICAgICB0aW1lRW5kKCdBbmd1bGFyQ29tcGlsZXJQbHVnaW4uX21ha2UnKTtcbiAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKGVycik7XG4gICAgICAgIHRoaXMucHVzaENvbXBpbGF0aW9uRXJyb3JzKGNvbXBpbGF0aW9uKTtcbiAgICAgICAgdGltZUVuZCgnQW5ndWxhckNvbXBpbGVyUGx1Z2luLl9tYWtlJyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcHVzaENvbXBpbGF0aW9uRXJyb3JzKGNvbXBpbGF0aW9uOiBjb21waWxhdGlvbi5Db21waWxhdGlvbikge1xuICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKC4uLnRoaXMuX2Vycm9ycyk7XG4gICAgY29tcGlsYXRpb24ud2FybmluZ3MucHVzaCguLi50aGlzLl93YXJuaW5ncyk7XG4gICAgdGhpcy5fZXJyb3JzID0gW107XG4gICAgdGhpcy5fd2FybmluZ3MgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgX21ha2VUcmFuc2Zvcm1lcnMoKSB7XG4gICAgY29uc3QgaXNBcHBQYXRoID0gKGZpbGVOYW1lOiBzdHJpbmcpID0+XG4gICAgICAhZmlsZU5hbWUuZW5kc1dpdGgoJy5uZ2ZhY3RvcnkudHMnKSAmJiAhZmlsZU5hbWUuZW5kc1dpdGgoJy5uZ3N0eWxlLnRzJyk7XG4gICAgY29uc3QgaXNNYWluUGF0aCA9IChmaWxlTmFtZTogc3RyaW5nKSA9PiBmaWxlTmFtZSA9PT0gKFxuICAgICAgdGhpcy5fbWFpblBhdGggPyB3b3JrYXJvdW5kUmVzb2x2ZSh0aGlzLl9tYWluUGF0aCkgOiB0aGlzLl9tYWluUGF0aFxuICAgICk7XG4gICAgY29uc3QgZ2V0RW50cnlNb2R1bGUgPSAoKSA9PiB0aGlzLmVudHJ5TW9kdWxlXG4gICAgICA/IHsgcGF0aDogd29ya2Fyb3VuZFJlc29sdmUodGhpcy5lbnRyeU1vZHVsZS5wYXRoKSwgY2xhc3NOYW1lOiB0aGlzLmVudHJ5TW9kdWxlLmNsYXNzTmFtZSB9XG4gICAgICA6IHRoaXMuZW50cnlNb2R1bGU7XG4gICAgY29uc3QgZ2V0TGF6eVJvdXRlcyA9ICgpID0+IHRoaXMuX2xhenlSb3V0ZXM7XG4gICAgY29uc3QgZ2V0VHlwZUNoZWNrZXIgPSAoKSA9PiB0aGlzLl9nZXRUc1Byb2dyYW0oKS5nZXRUeXBlQ2hlY2tlcigpO1xuXG4gICAgaWYgKHRoaXMuX0ppdE1vZGUpIHtcbiAgICAgIC8vIFJlcGxhY2UgcmVzb3VyY2VzIGluIEpJVC5cbiAgICAgIHRoaXMuX3RyYW5zZm9ybWVycy5wdXNoKHJlcGxhY2VSZXNvdXJjZXMoaXNBcHBQYXRoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlbW92ZSB1bm5lZWRlZCBhbmd1bGFyIGRlY29yYXRvcnMuXG4gICAgICB0aGlzLl90cmFuc2Zvcm1lcnMucHVzaChyZW1vdmVEZWNvcmF0b3JzKGlzQXBwUGF0aCwgZ2V0VHlwZUNoZWNrZXIpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGxhdGZvcm1UcmFuc2Zvcm1lcnMgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3RyYW5zZm9ybWVycy5wdXNoKC4uLnRoaXMuX3BsYXRmb3JtVHJhbnNmb3JtZXJzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX3BsYXRmb3JtID09PSBQTEFURk9STS5Ccm93c2VyKSB7XG4gICAgICAgIC8vIElmIHdlIGhhdmUgYSBsb2NhbGUsIGF1dG8gaW1wb3J0IHRoZSBsb2NhbGUgZGF0YSBmaWxlLlxuICAgICAgICAvLyBUaGlzIHRyYW5zZm9ybSBtdXN0IGdvIGJlZm9yZSByZXBsYWNlQm9vdHN0cmFwIGJlY2F1c2UgaXQgbG9va3MgZm9yIHRoZSBlbnRyeSBtb2R1bGVcbiAgICAgICAgLy8gaW1wb3J0LCB3aGljaCB3aWxsIGJlIHJlcGxhY2VkLlxuICAgICAgICBpZiAodGhpcy5fbm9ybWFsaXplZExvY2FsZSkge1xuICAgICAgICAgIHRoaXMuX3RyYW5zZm9ybWVycy5wdXNoKHJlZ2lzdGVyTG9jYWxlRGF0YShpc0FwcFBhdGgsIGdldEVudHJ5TW9kdWxlLFxuICAgICAgICAgICAgdGhpcy5fbm9ybWFsaXplZExvY2FsZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9KaXRNb2RlKSB7XG4gICAgICAgICAgLy8gUmVwbGFjZSBib290c3RyYXAgaW4gYnJvd3NlciBBT1QuXG4gICAgICAgICAgdGhpcy5fdHJhbnNmb3JtZXJzLnB1c2gocmVwbGFjZUJvb3RzdHJhcChpc0FwcFBhdGgsIGdldEVudHJ5TW9kdWxlLCBnZXRUeXBlQ2hlY2tlcikpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3BsYXRmb3JtID09PSBQTEFURk9STS5TZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtZXJzLnB1c2goZXhwb3J0TGF6eU1vZHVsZU1hcChpc01haW5QYXRoLCBnZXRMYXp5Um91dGVzKSk7XG4gICAgICAgIGlmICghdGhpcy5fSml0TW9kZSkge1xuICAgICAgICAgIHRoaXMuX3RyYW5zZm9ybWVycy5wdXNoKFxuICAgICAgICAgICAgZXhwb3J0TmdGYWN0b3J5KGlzTWFpblBhdGgsIGdldEVudHJ5TW9kdWxlKSxcbiAgICAgICAgICAgIHJlcGxhY2VTZXJ2ZXJCb290c3RyYXAoaXNNYWluUGF0aCwgZ2V0RW50cnlNb2R1bGUsIGdldFR5cGVDaGVja2VyKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGUoKSB7XG4gICAgdGltZSgnQW5ndWxhckNvbXBpbGVyUGx1Z2luLl91cGRhdGUnKTtcbiAgICAvLyBXZSBvbmx5IHdhbnQgdG8gdXBkYXRlIG9uIFRTIGFuZCB0ZW1wbGF0ZSBjaGFuZ2VzLCBidXQgYWxsIGtpbmRzIG9mIGZpbGVzIGFyZSBvbiB0aGlzXG4gICAgLy8gbGlzdCwgbGlrZSBwYWNrYWdlLmpzb24gYW5kIC5uZ3N1bW1hcnkuanNvbiBmaWxlcy5cbiAgICBjb25zdCBjaGFuZ2VkRmlsZXMgPSB0aGlzLl9nZXRDaGFuZ2VkQ29tcGlsYXRpb25GaWxlcygpO1xuXG4gICAgLy8gSWYgbm90aGluZyB3ZSBjYXJlIGFib3V0IGNoYW5nZWQgYW5kIGl0IGlzbid0IHRoZSBmaXJzdCBydW4sIGRvbid0IGRvIGFueXRoaW5nLlxuICAgIGlmIChjaGFuZ2VkRmlsZXMubGVuZ3RoID09PSAwICYmICF0aGlzLl9maXJzdFJ1bikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgLy8gTWFrZSBhIG5ldyBwcm9ncmFtIGFuZCBsb2FkIHRoZSBBbmd1bGFyIHN0cnVjdHVyZS5cbiAgICAgIC50aGVuKCgpID0+IHRoaXMuX2NyZWF0ZU9yVXBkYXRlUHJvZ3JhbSgpKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5lbnRyeU1vZHVsZSkge1xuICAgICAgICAgIC8vIFRyeSB0byBmaW5kIGxhenkgcm91dGVzIGlmIHdlIGhhdmUgYW4gZW50cnkgbW9kdWxlLlxuICAgICAgICAgIC8vIFdlIG5lZWQgdG8gcnVuIHRoZSBgbGlzdExhenlSb3V0ZXNgIHRoZSBmaXJzdCB0aW1lIGJlY2F1c2UgaXQgYWxzbyBuYXZpZ2F0ZXMgbGlicmFyaWVzXG4gICAgICAgICAgLy8gYW5kIG90aGVyIHRoaW5ncyB0aGF0IHdlIG1pZ2h0IG1pc3MgdXNpbmcgdGhlIChmYXN0ZXIpIGZpbmRMYXp5Um91dGVzSW5Bc3QuXG4gICAgICAgICAgLy8gTGF6eSByb3V0ZXMgbW9kdWxlcyB3aWxsIGJlIHJlYWQgd2l0aCBjb21waWxlckhvc3QgYW5kIGFkZGVkIHRvIHRoZSBjaGFuZ2VkIGZpbGVzLlxuICAgICAgICAgIGNvbnN0IGNoYW5nZWRUc0ZpbGVzID0gdGhpcy5fZ2V0Q2hhbmdlZFRzRmlsZXMoKTtcbiAgICAgICAgICBpZiAodGhpcy5fbmdDb21waWxlclN1cHBvcnRzTmV3QXBpKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzTGF6eVJvdXRlcyh0aGlzLl9saXN0TGF6eVJvdXRlc0Zyb21Qcm9ncmFtKCkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZmlyc3RSdW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NMYXp5Um91dGVzKHRoaXMuX2dldExhenlSb3V0ZXNGcm9tTmd0b29scygpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNoYW5nZWRUc0ZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NMYXp5Um91dGVzKHRoaXMuX2ZpbmRMYXp5Um91dGVzSW5Bc3QoY2hhbmdlZFRzRmlsZXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYWRkaXRpb25hbExhenlNb2R1bGVzKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzTGF6eVJvdXRlcyh0aGlzLl9vcHRpb25zLmFkZGl0aW9uYWxMYXp5TW9kdWxlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBFbWl0IGFuZCByZXBvcnQgZXJyb3JzLlxuXG4gICAgICAgIC8vIFdlIG5vdyBoYXZlIHRoZSBmaW5hbCBsaXN0IG9mIGNoYW5nZWQgVFMgZmlsZXMuXG4gICAgICAgIC8vIEdvIHRocm91Z2ggZWFjaCBjaGFuZ2VkIGZpbGUgYW5kIGFkZCB0cmFuc2Zvcm1zIGFzIG5lZWRlZC5cbiAgICAgICAgY29uc3Qgc291cmNlRmlsZXMgPSB0aGlzLl9nZXRDaGFuZ2VkVHNGaWxlcygpXG4gICAgICAgICAgLm1hcCgoZmlsZU5hbWUpID0+IHRoaXMuX2dldFRzUHJvZ3JhbSgpLmdldFNvdXJjZUZpbGUoZmlsZU5hbWUpKVxuICAgICAgICAgIC8vIEF0IHRoaXMgcG9pbnQgd2Ugc2hvdWxkbid0IG5lZWQgdG8gZmlsdGVyIG91dCB1bmRlZmluZWQgZmlsZXMsIGJlY2F1c2UgYW55IHRzIGZpbGVcbiAgICAgICAgICAvLyB0aGF0IGNoYW5nZWQgc2hvdWxkIGJlIGVtaXR0ZWQuXG4gICAgICAgICAgLy8gQnV0IGR1ZSB0byBob3N0UmVwbGFjZW1lbnRQYXRocyB0aGVyZSBjYW4gYmUgZmlsZXMgKHRoZSBlbnZpcm9ubWVudCBmaWxlcylcbiAgICAgICAgICAvLyB0aGF0IGNoYW5nZWQgYnV0IGFyZW4ndCBwYXJ0IG9mIHRoZSBjb21waWxhdGlvbiwgc3BlY2lhbGx5IG9uIGBuZyB0ZXN0YC5cbiAgICAgICAgICAvLyBTbyB3ZSBpZ25vcmUgbWlzc2luZyBzb3VyY2UgZmlsZXMgZmlsZXMgaGVyZS5cbiAgICAgICAgICAvLyBob3N0UmVwbGFjZW1lbnRQYXRocyBuZWVkcyB0byBiZSBmaXhlZCBhbnl3YXkgdG8gdGFrZSBjYXJlIG9mIHRoZSBmb2xsb3dpbmcgaXNzdWUuXG4gICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvaXNzdWVzLzczMDUjaXNzdWVjb21tZW50LTMzMjE1MDIzMFxuICAgICAgICAgIC5maWx0ZXIoKHgpID0+ICEheCkgYXMgdHMuU291cmNlRmlsZVtdO1xuXG4gICAgICAgIC8vIEVtaXQgZmlsZXMuXG4gICAgICAgIHRpbWUoJ0FuZ3VsYXJDb21waWxlclBsdWdpbi5fdXBkYXRlLl9lbWl0Jyk7XG4gICAgICAgIGNvbnN0IHsgZW1pdFJlc3VsdCwgZGlhZ25vc3RpY3MgfSA9IHRoaXMuX2VtaXQoc291cmNlRmlsZXMpO1xuICAgICAgICB0aW1lRW5kKCdBbmd1bGFyQ29tcGlsZXJQbHVnaW4uX3VwZGF0ZS5fZW1pdCcpO1xuXG4gICAgICAgIC8vIFJlcG9ydCBkaWFnbm9zdGljcy5cbiAgICAgICAgY29uc3QgZXJyb3JzID0gZGlhZ25vc3RpY3NcbiAgICAgICAgICAuZmlsdGVyKChkaWFnKSA9PiBkaWFnLmNhdGVnb3J5ID09PSB0cy5EaWFnbm9zdGljQ2F0ZWdvcnkuRXJyb3IpO1xuICAgICAgICBjb25zdCB3YXJuaW5ncyA9IGRpYWdub3N0aWNzXG4gICAgICAgICAgLmZpbHRlcigoZGlhZykgPT4gZGlhZy5jYXRlZ29yeSA9PT0gdHMuRGlhZ25vc3RpY0NhdGVnb3J5Lldhcm5pbmcpO1xuXG4gICAgICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBmb3JtYXREaWFnbm9zdGljcyhlcnJvcnMpO1xuICAgICAgICAgIHRoaXMuX2Vycm9ycy5wdXNoKG5ldyBFcnJvcihtZXNzYWdlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAod2FybmluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBmb3JtYXREaWFnbm9zdGljcyh3YXJuaW5ncyk7XG4gICAgICAgICAgdGhpcy5fd2FybmluZ3MucHVzaChtZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VtaXRTa2lwcGVkID0gIWVtaXRSZXN1bHQgfHwgZW1pdFJlc3VsdC5lbWl0U2tpcHBlZDtcblxuICAgICAgICAvLyBSZXNldCBjaGFuZ2VkIGZpbGVzIG9uIHN1Y2Nlc3NmdWwgY29tcGlsYXRpb24uXG4gICAgICAgIGlmICghdGhpcy5fZW1pdFNraXBwZWQgJiYgdGhpcy5fZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2NvbXBpbGVySG9zdC5yZXNldENoYW5nZWRGaWxlVHJhY2tlcigpO1xuICAgICAgICB9XG4gICAgICAgIHRpbWVFbmQoJ0FuZ3VsYXJDb21waWxlclBsdWdpbi5fdXBkYXRlJyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHdyaXRlSTE4bk91dEZpbGUoKSB7XG4gICAgZnVuY3Rpb24gX3JlY3Vyc2l2ZU1rRGlyKHA6IHN0cmluZykge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHApKSB7XG4gICAgICAgIF9yZWN1cnNpdmVNa0RpcihwYXRoLmRpcm5hbWUocCkpO1xuICAgICAgICBmcy5ta2RpclN5bmMocCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gV3JpdGUgdGhlIGV4dHJhY3RlZCBtZXNzYWdlcyB0byBkaXNrLlxuICAgIGlmICh0aGlzLl9jb21waWxlck9wdGlvbnMuaTE4bk91dEZpbGUpIHtcbiAgICAgIGNvbnN0IGkxOG5PdXRGaWxlUGF0aCA9IHBhdGgucmVzb2x2ZSh0aGlzLl9iYXNlUGF0aCwgdGhpcy5fY29tcGlsZXJPcHRpb25zLmkxOG5PdXRGaWxlKTtcbiAgICAgIGNvbnN0IGkxOG5PdXRGaWxlQ29udGVudCA9IHRoaXMuX2NvbXBpbGVySG9zdC5yZWFkRmlsZShpMThuT3V0RmlsZVBhdGgpO1xuICAgICAgaWYgKGkxOG5PdXRGaWxlQ29udGVudCkge1xuICAgICAgICBfcmVjdXJzaXZlTWtEaXIocGF0aC5kaXJuYW1lKGkxOG5PdXRGaWxlUGF0aCkpO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGkxOG5PdXRGaWxlUGF0aCwgaTE4bk91dEZpbGVDb250ZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRDb21waWxlZEZpbGUoZmlsZU5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IG91dHB1dEZpbGUgPSBmaWxlTmFtZS5yZXBsYWNlKC8udHN4PyQvLCAnLmpzJyk7XG4gICAgbGV0IG91dHB1dFRleHQ6IHN0cmluZztcbiAgICBsZXQgc291cmNlTWFwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgbGV0IGVycm9yRGVwZW5kZW5jaWVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKHRoaXMuX2VtaXRTa2lwcGVkKSB7XG4gICAgICBjb25zdCB0ZXh0ID0gdGhpcy5fY29tcGlsZXJIb3N0LnJlYWRGaWxlKG91dHB1dEZpbGUpO1xuICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgLy8gSWYgdGhlIGNvbXBpbGF0aW9uIGRpZG4ndCBlbWl0IGZpbGVzIHRoaXMgdGltZSwgdHJ5IHRvIHJldHVybiB0aGUgY2FjaGVkIGZpbGVzIGZyb20gdGhlXG4gICAgICAgIC8vIGxhc3QgY29tcGlsYXRpb24gYW5kIGxldCB0aGUgY29tcGlsYXRpb24gZXJyb3JzIHNob3cgd2hhdCdzIHdyb25nLlxuICAgICAgICBvdXRwdXRUZXh0ID0gdGV4dDtcbiAgICAgICAgc291cmNlTWFwID0gdGhpcy5fY29tcGlsZXJIb3N0LnJlYWRGaWxlKG91dHB1dEZpbGUgKyAnLm1hcCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhlcmUncyBub3RoaW5nIHdlIGNhbiBzZXJ2ZS4gUmV0dXJuIGFuIGVtcHR5IHN0cmluZyB0byBwcmV2ZW50IGxlbmdodHkgd2VicGFjayBlcnJvcnMsXG4gICAgICAgIC8vIGFkZCB0aGUgcmVidWlsZCB3YXJuaW5nIGlmIGl0J3Mgbm90IHRoZXJlIHlldC5cbiAgICAgICAgLy8gV2UgYWxzbyBuZWVkIHRvIGFsbCBjaGFuZ2VkIGZpbGVzIGFzIGRlcGVuZGVuY2llcyBvZiB0aGlzIGZpbGUsIHNvIHRoYXQgYWxsIG9mIHRoZW1cbiAgICAgICAgLy8gd2lsbCBiZSB3YXRjaGVkIGFuZCB0cmlnZ2VyIGEgcmVidWlsZCBuZXh0IHRpbWUuXG4gICAgICAgIG91dHB1dFRleHQgPSAnJztcbiAgICAgICAgZXJyb3JEZXBlbmRlbmNpZXMgPSB0aGlzLl9nZXRDaGFuZ2VkQ29tcGlsYXRpb25GaWxlcygpXG4gICAgICAgICAgLy8gVGhlc2UgcGF0aHMgYXJlIHVzZWQgYnkgdGhlIGxvYWRlciBzbyB3ZSBtdXN0IGRlbm9ybWFsaXplIHRoZW0uXG4gICAgICAgICAgLm1hcCgocCkgPT4gdGhpcy5fY29tcGlsZXJIb3N0LmRlbm9ybWFsaXplUGF0aChwKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENoZWNrIGlmIHRoZSBUUyBpbnB1dCBmaWxlIGFuZCB0aGUgSlMgb3V0cHV0IGZpbGUgZXhpc3QuXG4gICAgICBpZiAoKChmaWxlTmFtZS5lbmRzV2l0aCgnLnRzJykgfHwgZmlsZU5hbWUuZW5kc1dpdGgoJy50c3gnKSlcbiAgICAgICAgJiYgIXRoaXMuX2NvbXBpbGVySG9zdC5maWxlRXhpc3RzKGZpbGVOYW1lLCBmYWxzZSkpXG4gICAgICAgIHx8ICF0aGlzLl9jb21waWxlckhvc3QuZmlsZUV4aXN0cyhvdXRwdXRGaWxlLCBmYWxzZSkpIHtcbiAgICAgICAgbGV0IG1zZyA9IGAke2ZpbGVOYW1lfSBpcyBtaXNzaW5nIGZyb20gdGhlIFR5cGVTY3JpcHQgY29tcGlsYXRpb24uIGBcbiAgICAgICAgICArIGBQbGVhc2UgbWFrZSBzdXJlIGl0IGlzIGluIHlvdXIgdHNjb25maWcgdmlhIHRoZSAnZmlsZXMnIG9yICdpbmNsdWRlJyBwcm9wZXJ0eS5gO1xuXG4gICAgICAgIGlmICgvKFxcXFx8XFwvKW5vZGVfbW9kdWxlcyhcXFxcfFxcLykvLnRlc3QoZmlsZU5hbWUpKSB7XG4gICAgICAgICAgbXNnICs9ICdcXG5UaGUgbWlzc2luZyBmaWxlIHNlZW1zIHRvIGJlIHBhcnQgb2YgYSB0aGlyZCBwYXJ0eSBsaWJyYXJ5LiAnXG4gICAgICAgICAgICArICdUUyBmaWxlcyBpbiBwdWJsaXNoZWQgbGlicmFyaWVzIGFyZSBvZnRlbiBhIHNpZ24gb2YgYSBiYWRseSBwYWNrYWdlZCBsaWJyYXJ5LiAnXG4gICAgICAgICAgICArICdQbGVhc2Ugb3BlbiBhbiBpc3N1ZSBpbiB0aGUgbGlicmFyeSByZXBvc2l0b3J5IHRvIGFsZXJ0IGl0cyBhdXRob3IgYW5kIGFzayB0aGVtICdcbiAgICAgICAgICAgICsgJ3RvIHBhY2thZ2UgdGhlIGxpYnJhcnkgdXNpbmcgdGhlIEFuZ3VsYXIgUGFja2FnZSBGb3JtYXQgKGh0dHBzOi8vZ29vLmdsL2pCM0dWdikuJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfVxuXG4gICAgICBvdXRwdXRUZXh0ID0gdGhpcy5fY29tcGlsZXJIb3N0LnJlYWRGaWxlKG91dHB1dEZpbGUpIHx8ICcnO1xuICAgICAgc291cmNlTWFwID0gdGhpcy5fY29tcGlsZXJIb3N0LnJlYWRGaWxlKG91dHB1dEZpbGUgKyAnLm1hcCcpO1xuICAgIH1cblxuICAgIHJldHVybiB7IG91dHB1dFRleHQsIHNvdXJjZU1hcCwgZXJyb3JEZXBlbmRlbmNpZXMgfTtcbiAgfVxuXG4gIGdldERlcGVuZGVuY2llcyhmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHJlc29sdmVkRmlsZU5hbWUgPSB0aGlzLl9jb21waWxlckhvc3QucmVzb2x2ZShmaWxlTmFtZSk7XG4gICAgY29uc3Qgc291cmNlRmlsZSA9IHRoaXMuX2NvbXBpbGVySG9zdC5nZXRTb3VyY2VGaWxlKHJlc29sdmVkRmlsZU5hbWUsIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QpO1xuICAgIGlmICghc291cmNlRmlsZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9jb21waWxlck9wdGlvbnM7XG4gICAgY29uc3QgaG9zdCA9IHRoaXMuX2NvbXBpbGVySG9zdDtcbiAgICBjb25zdCBjYWNoZSA9IHRoaXMuX21vZHVsZVJlc29sdXRpb25DYWNoZTtcblxuICAgIGNvbnN0IGVzSW1wb3J0cyA9IGNvbGxlY3REZWVwTm9kZXM8dHMuSW1wb3J0RGVjbGFyYXRpb24+KHNvdXJjZUZpbGUsXG4gICAgICB0cy5TeW50YXhLaW5kLkltcG9ydERlY2xhcmF0aW9uKVxuICAgICAgLm1hcChkZWNsID0+IHtcbiAgICAgICAgY29uc3QgbW9kdWxlTmFtZSA9IChkZWNsLm1vZHVsZVNwZWNpZmllciBhcyB0cy5TdHJpbmdMaXRlcmFsKS50ZXh0O1xuICAgICAgICBjb25zdCByZXNvbHZlZCA9IHRzLnJlc29sdmVNb2R1bGVOYW1lKG1vZHVsZU5hbWUsIHJlc29sdmVkRmlsZU5hbWUsIG9wdGlvbnMsIGhvc3QsIGNhY2hlKTtcblxuICAgICAgICBpZiAocmVzb2x2ZWQucmVzb2x2ZWRNb2R1bGUpIHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZWQucmVzb2x2ZWRNb2R1bGUucmVzb2x2ZWRGaWxlTmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoeCA9PiB4KTtcblxuICAgIGNvbnN0IHJlc291cmNlSW1wb3J0cyA9IGZpbmRSZXNvdXJjZXMoc291cmNlRmlsZSlcbiAgICAgIC5tYXAoKHJlc291cmNlUmVwbGFjZW1lbnQpID0+IHJlc291cmNlUmVwbGFjZW1lbnQucmVzb3VyY2VQYXRocylcbiAgICAgIC5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHByZXYuY29uY2F0KGN1cnIpLCBbXSlcbiAgICAgIC5tYXAoKHJlc291cmNlUGF0aCkgPT4gcmVzb2x2ZShkaXJuYW1lKHJlc29sdmVkRmlsZU5hbWUpLCBub3JtYWxpemUocmVzb3VyY2VQYXRoKSkpO1xuXG4gICAgLy8gVGhlc2UgcGF0aHMgYXJlIG1lYW50IHRvIGJlIHVzZWQgYnkgdGhlIGxvYWRlciBzbyB3ZSBtdXN0IGRlbm9ybWFsaXplIHRoZW0uXG4gICAgY29uc3QgdW5pcXVlRGVwZW5kZW5jaWVzID0gIG5ldyBTZXQoW1xuICAgICAgLi4uZXNJbXBvcnRzLFxuICAgICAgLi4ucmVzb3VyY2VJbXBvcnRzLFxuICAgICAgLi4udGhpcy5nZXRSZXNvdXJjZURlcGVuZGVuY2llcyh0aGlzLl9jb21waWxlckhvc3QuZGVub3JtYWxpemVQYXRoKHJlc29sdmVkRmlsZU5hbWUpKSxcbiAgICBdLm1hcCgocCkgPT4gcCAmJiB0aGlzLl9jb21waWxlckhvc3QuZGVub3JtYWxpemVQYXRoKHApKSk7XG5cbiAgICByZXR1cm4gWy4uLnVuaXF1ZURlcGVuZGVuY2llc11cbiAgICAgIC5maWx0ZXIoeCA9PiAhIXgpIGFzIHN0cmluZ1tdO1xuICB9XG5cbiAgZ2V0UmVzb3VyY2VEZXBlbmRlbmNpZXMoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzb3VyY2VMb2FkZXIuZ2V0UmVzb3VyY2VEZXBlbmRlbmNpZXMoZmlsZU5hbWUpO1xuICB9XG5cbiAgLy8gVGhpcyBjb2RlIG1vc3RseSBjb21lcyBmcm9tIGBwZXJmb3JtQ29tcGlsYXRpb25gIGluIGBAYW5ndWxhci9jb21waWxlci1jbGlgLlxuICAvLyBJdCBza2lwcyB0aGUgcHJvZ3JhbSBjcmVhdGlvbiBiZWNhdXNlIHdlIG5lZWQgdG8gdXNlIGBsb2FkTmdTdHJ1Y3R1cmVBc3luYygpYCxcbiAgLy8gYW5kIHVzZXMgQ3VzdG9tVHJhbnNmb3JtZXJzLlxuICBwcml2YXRlIF9lbWl0KHNvdXJjZUZpbGVzOiB0cy5Tb3VyY2VGaWxlW10pIHtcbiAgICB0aW1lKCdBbmd1bGFyQ29tcGlsZXJQbHVnaW4uX2VtaXQnKTtcbiAgICBjb25zdCBwcm9ncmFtID0gdGhpcy5fcHJvZ3JhbTtcbiAgICBjb25zdCBhbGxEaWFnbm9zdGljczogQXJyYXk8dHMuRGlhZ25vc3RpYyB8IERpYWdub3N0aWM+ID0gW107XG5cbiAgICBsZXQgZW1pdFJlc3VsdDogdHMuRW1pdFJlc3VsdCB8IHVuZGVmaW5lZDtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuX0ppdE1vZGUpIHtcbiAgICAgICAgY29uc3QgdHNQcm9ncmFtID0gcHJvZ3JhbSBhcyB0cy5Qcm9ncmFtO1xuXG4gICAgICAgIGlmICh0aGlzLl9maXJzdFJ1bikge1xuICAgICAgICAgIC8vIENoZWNrIHBhcmFtZXRlciBkaWFnbm9zdGljcy5cbiAgICAgICAgICB0aW1lKCdBbmd1bGFyQ29tcGlsZXJQbHVnaW4uX2VtaXQudHMuZ2V0T3B0aW9uc0RpYWdub3N0aWNzJyk7XG4gICAgICAgICAgYWxsRGlhZ25vc3RpY3MucHVzaCguLi50c1Byb2dyYW0uZ2V0T3B0aW9uc0RpYWdub3N0aWNzKCkpO1xuICAgICAgICAgIHRpbWVFbmQoJ0FuZ3VsYXJDb21waWxlclBsdWdpbi5fZW1pdC50cy5nZXRPcHRpb25zRGlhZ25vc3RpY3MnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgodGhpcy5fZmlyc3RSdW4gfHwgIXRoaXMuX2ZvcmtUeXBlQ2hlY2tlcikgJiYgdGhpcy5fcHJvZ3JhbSkge1xuICAgICAgICAgIGFsbERpYWdub3N0aWNzLnB1c2goLi4uZ2F0aGVyRGlhZ25vc3RpY3ModGhpcy5fcHJvZ3JhbSwgdGhpcy5fSml0TW9kZSxcbiAgICAgICAgICAgICdBbmd1bGFyQ29tcGlsZXJQbHVnaW4uX2VtaXQudHMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhhc0Vycm9ycyhhbGxEaWFnbm9zdGljcykpIHtcbiAgICAgICAgICBzb3VyY2VGaWxlcy5mb3JFYWNoKChzZikgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGltZUxhYmVsID0gYEFuZ3VsYXJDb21waWxlclBsdWdpbi5fZW1pdC50cyske3NmLmZpbGVOYW1lfSsuZW1pdGA7XG4gICAgICAgICAgICB0aW1lKHRpbWVMYWJlbCk7XG4gICAgICAgICAgICBlbWl0UmVzdWx0ID0gdHNQcm9ncmFtLmVtaXQoc2YsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHsgYmVmb3JlOiB0aGlzLl90cmFuc2Zvcm1lcnMgfSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhbGxEaWFnbm9zdGljcy5wdXNoKC4uLmVtaXRSZXN1bHQuZGlhZ25vc3RpY3MpO1xuICAgICAgICAgICAgdGltZUVuZCh0aW1lTGFiZWwpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBhbmd1bGFyUHJvZ3JhbSA9IHByb2dyYW0gYXMgUHJvZ3JhbTtcblxuICAgICAgICAvLyBDaGVjayBBbmd1bGFyIHN0cnVjdHVyYWwgZGlhZ25vc3RpY3MuXG4gICAgICAgIHRpbWUoJ0FuZ3VsYXJDb21waWxlclBsdWdpbi5fZW1pdC5uZy5nZXROZ1N0cnVjdHVyYWxEaWFnbm9zdGljcycpO1xuICAgICAgICBhbGxEaWFnbm9zdGljcy5wdXNoKC4uLmFuZ3VsYXJQcm9ncmFtLmdldE5nU3RydWN0dXJhbERpYWdub3N0aWNzKCkpO1xuICAgICAgICB0aW1lRW5kKCdBbmd1bGFyQ29tcGlsZXJQbHVnaW4uX2VtaXQubmcuZ2V0TmdTdHJ1Y3R1cmFsRGlhZ25vc3RpY3MnKTtcblxuICAgICAgICBpZiAodGhpcy5fZmlyc3RSdW4pIHtcbiAgICAgICAgICAvLyBDaGVjayBUeXBlU2NyaXB0IHBhcmFtZXRlciBkaWFnbm9zdGljcy5cbiAgICAgICAgICB0aW1lKCdBbmd1bGFyQ29tcGlsZXJQbHVnaW4uX2VtaXQubmcuZ2V0VHNPcHRpb25EaWFnbm9zdGljcycpO1xuICAgICAgICAgIGFsbERpYWdub3N0aWNzLnB1c2goLi4uYW5ndWxhclByb2dyYW0uZ2V0VHNPcHRpb25EaWFnbm9zdGljcygpKTtcbiAgICAgICAgICB0aW1lRW5kKCdBbmd1bGFyQ29tcGlsZXJQbHVnaW4uX2VtaXQubmcuZ2V0VHNPcHRpb25EaWFnbm9zdGljcycpO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgQW5ndWxhciBwYXJhbWV0ZXIgZGlhZ25vc3RpY3MuXG4gICAgICAgICAgdGltZSgnQW5ndWxhckNvbXBpbGVyUGx1Z2luLl9lbWl0Lm5nLmdldE5nT3B0aW9uRGlhZ25vc3RpY3MnKTtcbiAgICAgICAgICBhbGxEaWFnbm9zdGljcy5wdXNoKC4uLmFuZ3VsYXJQcm9ncmFtLmdldE5nT3B0aW9uRGlhZ25vc3RpY3MoKSk7XG4gICAgICAgICAgdGltZUVuZCgnQW5ndWxhckNvbXBpbGVyUGx1Z2luLl9lbWl0Lm5nLmdldE5nT3B0aW9uRGlhZ25vc3RpY3MnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgodGhpcy5fZmlyc3RSdW4gfHwgIXRoaXMuX2ZvcmtUeXBlQ2hlY2tlcikgJiYgdGhpcy5fcHJvZ3JhbSkge1xuICAgICAgICAgIGFsbERpYWdub3N0aWNzLnB1c2goLi4uZ2F0aGVyRGlhZ25vc3RpY3ModGhpcy5fcHJvZ3JhbSwgdGhpcy5fSml0TW9kZSxcbiAgICAgICAgICAgICdBbmd1bGFyQ29tcGlsZXJQbHVnaW4uX2VtaXQubmcnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhhc0Vycm9ycyhhbGxEaWFnbm9zdGljcykpIHtcbiAgICAgICAgICB0aW1lKCdBbmd1bGFyQ29tcGlsZXJQbHVnaW4uX2VtaXQubmcuZW1pdCcpO1xuICAgICAgICAgIGNvbnN0IGV4dHJhY3RJMThuID0gISF0aGlzLl9jb21waWxlck9wdGlvbnMuaTE4bk91dEZpbGU7XG4gICAgICAgICAgY29uc3QgZW1pdEZsYWdzID0gZXh0cmFjdEkxOG4gPyBFbWl0RmxhZ3MuSTE4bkJ1bmRsZSA6IEVtaXRGbGFncy5EZWZhdWx0O1xuICAgICAgICAgIGVtaXRSZXN1bHQgPSBhbmd1bGFyUHJvZ3JhbS5lbWl0KHtcbiAgICAgICAgICAgIGVtaXRGbGFncywgY3VzdG9tVHJhbnNmb3JtZXJzOiB7XG4gICAgICAgICAgICAgIGJlZm9yZVRzOiB0aGlzLl90cmFuc2Zvcm1lcnMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGFsbERpYWdub3N0aWNzLnB1c2goLi4uZW1pdFJlc3VsdC5kaWFnbm9zdGljcyk7XG4gICAgICAgICAgaWYgKGV4dHJhY3RJMThuKSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlSTE4bk91dEZpbGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGltZUVuZCgnQW5ndWxhckNvbXBpbGVyUGx1Z2luLl9lbWl0Lm5nLmVtaXQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRpbWUoJ0FuZ3VsYXJDb21waWxlclBsdWdpbi5fZW1pdC5jYXRjaCcpO1xuICAgICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBhdmFpbGFibGUgaW4gdGhlIGltcG9ydCBiZWxvdywgYnV0IHRoaXMgd2F5IHdlIGF2b2lkIHRoZSBkZXBlbmRlbmN5LlxuICAgICAgLy8gaW1wb3J0IHsgaXNTeW50YXhFcnJvciB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbiAgICAgIGZ1bmN0aW9uIGlzU3ludGF4RXJyb3IoZXJyb3I6IEVycm9yKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoZXJyb3IgYXMgYW55KVsnbmdTeW50YXhFcnJvciddOyAgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1hbnlcbiAgICAgIH1cblxuICAgICAgbGV0IGVyck1zZzogc3RyaW5nO1xuICAgICAgbGV0IGNvZGU6IG51bWJlcjtcbiAgICAgIGlmIChpc1N5bnRheEVycm9yKGUpKSB7XG4gICAgICAgIC8vIGRvbid0IHJlcG9ydCB0aGUgc3RhY2sgZm9yIHN5bnRheCBlcnJvcnMgYXMgdGhleSBhcmUgd2VsbCBrbm93biBlcnJvcnMuXG4gICAgICAgIGVyck1zZyA9IGUubWVzc2FnZTtcbiAgICAgICAgY29kZSA9IERFRkFVTFRfRVJST1JfQ09ERTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVyck1zZyA9IGUuc3RhY2s7XG4gICAgICAgIC8vIEl0IGlzIG5vdCBhIHN5bnRheCBlcnJvciB3ZSBtaWdodCBoYXZlIGEgcHJvZ3JhbSB3aXRoIHVua25vd24gc3RhdGUsIGRpc2NhcmQgaXQuXG4gICAgICAgIHRoaXMuX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICBjb2RlID0gVU5LTk9XTl9FUlJPUl9DT0RFO1xuICAgICAgfVxuICAgICAgYWxsRGlhZ25vc3RpY3MucHVzaChcbiAgICAgICAgeyBjYXRlZ29yeTogdHMuRGlhZ25vc3RpY0NhdGVnb3J5LkVycm9yLCBtZXNzYWdlVGV4dDogZXJyTXNnLCBjb2RlLCBzb3VyY2U6IFNPVVJDRSB9KTtcbiAgICAgIHRpbWVFbmQoJ0FuZ3VsYXJDb21waWxlclBsdWdpbi5fZW1pdC5jYXRjaCcpO1xuICAgIH1cbiAgICB0aW1lRW5kKCdBbmd1bGFyQ29tcGlsZXJQbHVnaW4uX2VtaXQnKTtcblxuICAgIHJldHVybiB7IHByb2dyYW0sIGVtaXRSZXN1bHQsIGRpYWdub3N0aWNzOiBhbGxEaWFnbm9zdGljcyB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsaWRhdGVMb2NhbGUobG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAvLyBHZXQgdGhlIHBhdGggb2YgdGhlIGNvbW1vbiBtb2R1bGUuXG4gICAgY29uc3QgY29tbW9uUGF0aCA9IHBhdGguZGlybmFtZShyZXF1aXJlLnJlc29sdmUoJ0Bhbmd1bGFyL2NvbW1vbi9wYWNrYWdlLmpzb24nKSk7XG4gICAgLy8gQ2hlY2sgaWYgdGhlIGxvY2FsZSBmaWxlIGV4aXN0c1xuICAgIGlmICghZnMuZXhpc3RzU3luYyhwYXRoLnJlc29sdmUoY29tbW9uUGF0aCwgJ2xvY2FsZXMnLCBgJHtsb2NhbGV9LmpzYCkpKSB7XG4gICAgICAvLyBDaGVjayBmb3IgYW4gYWx0ZXJuYXRpdmUgbG9jYWxlIChpZiB0aGUgbG9jYWxlIGlkIHdhcyBiYWRseSBmb3JtYXR0ZWQpLlxuICAgICAgY29uc3QgbG9jYWxlcyA9IGZzLnJlYWRkaXJTeW5jKHBhdGgucmVzb2x2ZShjb21tb25QYXRoLCAnbG9jYWxlcycpKVxuICAgICAgICAuZmlsdGVyKGZpbGUgPT4gZmlsZS5lbmRzV2l0aCgnLmpzJykpXG4gICAgICAgIC5tYXAoZmlsZSA9PiBmaWxlLnJlcGxhY2UoJy5qcycsICcnKSk7XG5cbiAgICAgIGxldCBuZXdMb2NhbGU7XG4gICAgICBjb25zdCBub3JtYWxpemVkTG9jYWxlID0gbG9jYWxlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXy9nLCAnLScpO1xuICAgICAgZm9yIChjb25zdCBsIG9mIGxvY2FsZXMpIHtcbiAgICAgICAgaWYgKGwudG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZExvY2FsZSkge1xuICAgICAgICAgIG5ld0xvY2FsZSA9IGw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG5ld0xvY2FsZSkge1xuICAgICAgICBsb2NhbGUgPSBuZXdMb2NhbGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDaGVjayBmb3IgYSBwYXJlbnQgbG9jYWxlXG4gICAgICAgIGNvbnN0IHBhcmVudExvY2FsZSA9IG5vcm1hbGl6ZWRMb2NhbGUuc3BsaXQoJy0nKVswXTtcbiAgICAgICAgaWYgKGxvY2FsZXMuaW5kZXhPZihwYXJlbnRMb2NhbGUpICE9PSAtMSkge1xuICAgICAgICAgIGxvY2FsZSA9IHBhcmVudExvY2FsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl93YXJuaW5ncy5wdXNoKGBBbmd1bGFyQ29tcGlsZXJQbHVnaW46IFVuYWJsZSB0byBsb2FkIHRoZSBsb2NhbGUgZGF0YSBmaWxlIGAgK1xuICAgICAgICAgICAgYFwiQGFuZ3VsYXIvY29tbW9uL2xvY2FsZXMvJHtsb2NhbGV9XCIsIGAgK1xuICAgICAgICAgICAgYHBsZWFzZSBjaGVjayB0aGF0IFwiJHtsb2NhbGV9XCIgaXMgYSB2YWxpZCBsb2NhbGUgaWQuXG4gICAgICAgICAgICBJZiBuZWVkZWQsIHlvdSBjYW4gdXNlIFwicmVnaXN0ZXJMb2NhbGVEYXRhXCIgbWFudWFsbHkuYCk7XG5cbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsb2NhbGU7XG4gIH1cbn1cbiJdfQ==