"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const dependencies_1 = require("../../utility/dependencies");
const json_utils_1 = require("../../utility/json-utils");
const latest_versions_1 = require("../../utility/latest-versions");
const defaults = {
    appRoot: 'src',
    index: 'index.html',
    main: 'main.ts',
    polyfills: 'polyfills.ts',
    tsConfig: 'tsconfig.app.json',
    test: 'test.ts',
    outDir: 'dist/',
    karma: 'karma.conf.js',
    protractor: 'protractor.conf.js',
    testTsConfig: 'tsconfig.spec.json',
    serverOutDir: 'dist-server',
    serverMain: 'main.server.ts',
    serverTsConfig: 'tsconfig.server.json',
};
function getConfigPath(tree) {
    let possiblePath = core_1.normalize('.angular-cli.json');
    if (tree.exists(possiblePath)) {
        return possiblePath;
    }
    possiblePath = core_1.normalize('angular-cli.json');
    if (tree.exists(possiblePath)) {
        return possiblePath;
    }
    throw new schematics_1.SchematicsException('Could not find configuration file');
}
function migrateKarmaConfiguration(config) {
    return (host, context) => {
        context.logger.info(`Updating karma configuration`);
        try {
            const karmaPath = config && config.test && config.test.karma && config.test.karma.config
                ? config.test.karma.config
                : defaults.karma;
            const buffer = host.read(karmaPath);
            if (buffer !== null) {
                let content = buffer.toString();
                // Replace the 1.0 files and preprocessor entries, with and without comma at the end.
                // If these remain, they will cause the `ng test` to fail.
                content = content.replace(`{ pattern: './src/test.ts', watched: false },`, '');
                content = content.replace(`{ pattern: './src/test.ts', watched: false }`, '');
                content = content.replace(`'./src/test.ts': ['@angular/cli'],`, '');
                content = content.replace(`'./src/test.ts': ['@angular/cli']`, '');
                content = content.replace(/angularCli[^}]*},?/, '');
                // Replace 1.x plugin names.
                content = content.replace(/@angular\/cli/g, '@angular-devkit/build-angular');
                // Replace code coverage output path.
                content = content.replace('reports', `dir: require('path').join(__dirname, 'coverage'), reports`);
                host.overwrite(karmaPath, content);
            }
        }
        catch (_a) { }
        return host;
    };
}
function migrateConfiguration(oldConfig, logger) {
    return (host, context) => {
        const oldConfigPath = getConfigPath(host);
        const configPath = core_1.normalize('angular.json');
        context.logger.info(`Updating configuration`);
        const config = {
            '$schema': './node_modules/@angular/cli/lib/config/schema.json',
            version: 1,
            newProjectRoot: 'projects',
            projects: extractProjectsConfig(oldConfig, host, logger),
        };
        const defaultProject = extractDefaultProject(oldConfig);
        if (defaultProject !== null) {
            config.defaultProject = defaultProject;
        }
        const cliConfig = extractCliConfig(oldConfig);
        if (cliConfig !== null) {
            config.cli = cliConfig;
        }
        const schematicsConfig = extractSchematicsConfig(oldConfig);
        if (schematicsConfig !== null) {
            config.schematics = schematicsConfig;
        }
        const architectConfig = extractArchitectConfig(oldConfig);
        if (architectConfig !== null) {
            config.architect = architectConfig;
        }
        context.logger.info(`Removing old config file (${oldConfigPath})`);
        host.delete(oldConfigPath);
        context.logger.info(`Writing config file (${configPath})`);
        host.create(configPath, JSON.stringify(config, null, 2));
        return host;
    };
}
function extractCliConfig(config) {
    const newConfig = {};
    if (config.packageManager && config.packageManager !== 'default') {
        newConfig['packageManager'] = config.packageManager;
    }
    if (config.warnings) {
        if (config.warnings.versionMismatch !== undefined) {
            newConfig.warnings = Object.assign({}, (newConfig.warnings || {}), { versionMismatch: config.warnings.versionMismatch });
        }
        if (config.warnings.typescriptMismatch !== undefined) {
            newConfig.warnings = Object.assign({}, (newConfig.warnings || {}), { typescriptMismatch: config.warnings.typescriptMismatch });
        }
    }
    return Object.getOwnPropertyNames(newConfig).length == 0 ? null : newConfig;
}
function extractSchematicsConfig(config) {
    let collectionName = '@schematics/angular';
    if (!config || !config.defaults) {
        return null;
    }
    // const configDefaults = config.defaults;
    if (config.defaults && config.defaults.schematics && config.defaults.schematics.collection) {
        collectionName = config.defaults.schematics.collection;
    }
    /**
     * For each schematic
     *  - get the config
     *  - filter one's without config
     *  - combine them into an object
     */
    // tslint:disable-next-line:no-any
    const schematicConfigs = ['class', 'component', 'directive', 'guard',
        'interface', 'module', 'pipe', 'service']
        .map(schematicName => {
        // tslint:disable-next-line:no-any
        const schematicDefaults = config.defaults[schematicName] || null;
        return {
            schematicName,
            config: schematicDefaults,
        };
    })
        .filter(schematic => schematic.config !== null)
        .reduce((all, schematic) => {
        all[collectionName + ':' + schematic.schematicName] = schematic.config;
        return all;
    }, {});
    const componentUpdate = {};
    componentUpdate.prefix = '';
    const componentKey = collectionName + ':component';
    const directiveKey = collectionName + ':directive';
    if (!schematicConfigs[componentKey]) {
        schematicConfigs[componentKey] = {};
    }
    if (!schematicConfigs[directiveKey]) {
        schematicConfigs[directiveKey] = {};
    }
    if (config.apps && config.apps[0]) {
        schematicConfigs[componentKey].prefix = config.apps[0].prefix;
        schematicConfigs[directiveKey].prefix = config.apps[0].prefix;
    }
    if (config.defaults) {
        schematicConfigs[componentKey].styleext = config.defaults.styleExt;
    }
    return schematicConfigs;
}
function extractArchitectConfig(_config) {
    return null;
}
// This function is too big, but also really hard to refactor properly as the whole config
// depends on all parts of the config.
// tslint:disable-next-line:no-big-function
function extractProjectsConfig(config, tree, logger) {
    const builderPackage = '@angular-devkit/build-angular';
    const defaultAppNamePrefix = getDefaultAppNamePrefix(config);
    const buildDefaults = config.defaults && config.defaults.build
        ? {
            sourceMap: config.defaults.build.sourcemaps,
            progress: config.defaults.build.progress,
            poll: config.defaults.build.poll,
            deleteOutputPath: config.defaults.build.deleteOutputPath,
            preserveSymlinks: config.defaults.build.preserveSymlinks,
            showCircularDependencies: config.defaults.build.showCircularDependencies,
            commonChunk: config.defaults.build.commonChunk,
            namedChunks: config.defaults.build.namedChunks,
        }
        : {};
    const serveDefaults = config.defaults && config.defaults.serve
        ? {
            port: config.defaults.serve.port,
            host: config.defaults.serve.host,
            ssl: config.defaults.serve.ssl,
            sslKey: config.defaults.serve.sslKey,
            sslCert: config.defaults.serve.sslCert,
            proxyConfig: config.defaults.serve.proxyConfig,
        }
        : {};
    const apps = config.apps || [];
    // convert the apps to projects
    const browserApps = apps.filter(app => app.platform !== 'server');
    const serverApps = apps.filter(app => app.platform === 'server');
    const projectMap = browserApps
        // This function is too big, but also really hard to refactor properly as the whole config
        // depends on all parts of the config.
        // tslint:disable-next-line:no-big-function
        .map((app, idx) => {
        const defaultAppName = idx === 0 ? defaultAppNamePrefix : `${defaultAppNamePrefix}${idx}`;
        const name = app.name || defaultAppName;
        const outDir = app.outDir || defaults.outDir;
        const appRoot = app.root || defaults.appRoot;
        function _mapAssets(asset) {
            if (typeof asset === 'string') {
                return core_1.normalize(appRoot + '/' + asset);
            }
            else {
                if (asset.allowOutsideOutDir) {
                    logger.warn(core_1.tags.oneLine `
              Asset with input '${asset.input}' was not migrated because it
              uses the 'allowOutsideOutDir' option which is not supported in Angular CLI 6.
            `);
                    return null;
                }
                else if (asset.output) {
                    return {
                        glob: asset.glob,
                        input: core_1.normalize(appRoot + '/' + asset.input),
                        output: core_1.normalize('/' + asset.output),
                    };
                }
                else {
                    return {
                        glob: asset.glob,
                        input: core_1.normalize(appRoot + '/' + asset.input),
                        output: '/',
                    };
                }
            }
        }
        function _buildConfigurations() {
            const source = app.environmentSource;
            const environments = app.environments;
            const serviceWorker = app.serviceWorker;
            const productionPartial = Object.assign({ optimization: true, outputHashing: 'all', sourceMap: false, extractCss: true, namedChunks: false, aot: true, extractLicenses: true, vendorChunk: false, buildOptimizer: true }, (serviceWorker ? { serviceWorker: true, ngswConfigPath: '/src/ngsw-config.json' } : {}), (app.budgets ? { budgets: app.budgets } : {}));
            if (!environments) {
                return { production: productionPartial };
            }
            const configurations = Object.keys(environments).reduce((acc, environment) => {
                if (source === environments[environment]) {
                    return acc;
                }
                let isProduction = false;
                const environmentContent = tree.read(app.root + '/' + environments[environment]);
                if (environmentContent) {
                    isProduction = !!environmentContent.toString('utf-8')
                        // Allow for `production: true` or `production = true`. Best we can do to guess.
                        .match(/production['"]?\s*[:=]\s*true/);
                }
                let configurationName;
                // We used to use `prod` by default as the key, instead we now use the full word.
                // Try not to override the production key if it's there.
                if (environment == 'prod' && !environments['production'] && isProduction) {
                    configurationName = 'production';
                }
                else {
                    configurationName = environment;
                }
                acc[configurationName] = Object.assign({}, (isProduction ? productionPartial : {}), { fileReplacements: [
                        {
                            replace: `${app.root}/${source}`,
                            with: `${app.root}/${environments[environment]}`,
                        },
                    ] });
                return acc;
            }, {});
            if (!configurations['production']) {
                configurations['production'] = Object.assign({}, productionPartial);
            }
            return configurations;
        }
        function _serveConfigurations() {
            const environments = app.environments;
            if (!environments) {
                return {};
            }
            if (!architect) {
                throw new Error();
            }
            const configurations = architect.build.configurations;
            return Object.keys(configurations).reduce((acc, environment) => {
                acc[environment] = { browserTarget: `${name}:build:${environment}` };
                return acc;
            }, {});
        }
        function _extraEntryMapper(extraEntry) {
            let entry;
            if (typeof extraEntry === 'string') {
                entry = core_1.join(app.root, extraEntry);
            }
            else {
                const input = core_1.join(app.root, extraEntry.input || '');
                entry = { input, lazy: extraEntry.lazy };
                if (extraEntry.output) {
                    entry.bundleName = extraEntry.output;
                }
            }
            return entry;
        }
        const projectRoot = core_1.join(core_1.normalize(appRoot), '..');
        const project = {
            root: projectRoot,
            sourceRoot: appRoot,
            projectType: 'application',
        };
        const architect = {};
        project.architect = architect;
        // Browser target
        const buildOptions = Object.assign({ 
            // Make outputPath relative to root.
            outputPath: outDir, index: `${appRoot}/${app.index || defaults.index}`, main: `${appRoot}/${app.main || defaults.main}`, tsConfig: `${appRoot}/${app.tsconfig || defaults.tsConfig}` }, (app.baseHref ? { baseHref: app.baseHref } : {}), buildDefaults);
        if (app.polyfills) {
            buildOptions.polyfills = appRoot + '/' + app.polyfills;
        }
        if (app.stylePreprocessorOptions
            && app.stylePreprocessorOptions.includePaths
            && Array.isArray(app.stylePreprocessorOptions.includePaths)
            && app.stylePreprocessorOptions.includePaths.length > 0) {
            buildOptions.stylePreprocessorOptions = {
                includePaths: app.stylePreprocessorOptions.includePaths
                    .map(includePath => core_1.join(app.root, includePath)),
            };
        }
        buildOptions.assets = (app.assets || []).map(_mapAssets).filter(x => !!x);
        buildOptions.styles = (app.styles || []).map(_extraEntryMapper);
        buildOptions.scripts = (app.scripts || []).map(_extraEntryMapper);
        architect.build = {
            builder: `${builderPackage}:browser`,
            options: buildOptions,
            configurations: _buildConfigurations(),
        };
        // Serve target
        const serveOptions = Object.assign({ browserTarget: `${name}:build` }, serveDefaults);
        architect.serve = {
            builder: `${builderPackage}:dev-server`,
            options: serveOptions,
            configurations: _serveConfigurations(),
        };
        // Extract target
        const extractI18nOptions = { browserTarget: `${name}:build` };
        architect['extract-i18n'] = {
            builder: `${builderPackage}:extract-i18n`,
            options: extractI18nOptions,
        };
        const karmaConfig = config.test && config.test.karma
            ? config.test.karma.config || ''
            : '';
        // Test target
        const testOptions = {
            main: appRoot + '/' + app.test || defaults.test,
            // Make karmaConfig relative to root.
            karmaConfig,
        };
        if (app.polyfills) {
            testOptions.polyfills = appRoot + '/' + app.polyfills;
        }
        if (app.testTsconfig) {
            testOptions.tsConfig = appRoot + '/' + app.testTsconfig;
        }
        testOptions.scripts = (app.scripts || []).map(_extraEntryMapper);
        testOptions.styles = (app.styles || []).map(_extraEntryMapper);
        testOptions.assets = (app.assets || []).map(_mapAssets).filter(x => !!x);
        if (karmaConfig) {
            architect.test = {
                builder: `${builderPackage}:karma`,
                options: testOptions,
            };
        }
        const tsConfigs = [];
        const excludes = [];
        let warnForLint = false;
        if (config && config.lint && Array.isArray(config.lint)) {
            config.lint.forEach(lint => {
                if (lint.project) {
                    tsConfigs.push(lint.project);
                }
                else {
                    warnForLint = true;
                }
                if (lint.exclude) {
                    if (typeof lint.exclude === 'string') {
                        excludes.push(lint.exclude);
                    }
                    else {
                        lint.exclude.forEach(ex => excludes.push(ex));
                    }
                }
            });
        }
        if (warnForLint) {
            logger.warn(`
          Lint without 'project' was not migrated which is not supported in Angular CLI 6.
        `);
        }
        const removeDupes = (items) => items.reduce((newItems, item) => {
            if (newItems.indexOf(item) === -1) {
                newItems.push(item);
            }
            return newItems;
        }, []);
        // Tslint target
        const lintOptions = {
            tsConfig: removeDupes(tsConfigs).filter(t => t.indexOf('e2e') === -1),
            exclude: removeDupes(excludes),
        };
        architect.lint = {
            builder: `${builderPackage}:tslint`,
            options: lintOptions,
        };
        // server target
        const serverApp = serverApps
            .filter(serverApp => app.root === serverApp.root && app.index === serverApp.index)[0];
        if (serverApp) {
            const serverOptions = {
                outputPath: serverApp.outDir || defaults.serverOutDir,
                main: serverApp.main || defaults.serverMain,
                tsConfig: serverApp.tsconfig || defaults.serverTsConfig,
            };
            const serverTarget = {
                builder: '@angular-devkit/build-angular:server',
                options: serverOptions,
            };
            architect.server = serverTarget;
        }
        const e2eProject = {
            root: core_1.join(projectRoot, 'e2e'),
            sourceRoot: core_1.join(projectRoot, 'e2e'),
            projectType: 'application',
        };
        const e2eArchitect = {};
        // tslint:disable-next-line:max-line-length
        const protractorConfig = config && config.e2e && config.e2e.protractor && config.e2e.protractor.config
            ? config.e2e.protractor.config
            : '';
        const e2eOptions = {
            protractorConfig: protractorConfig,
            devServerTarget: `${name}:serve`,
        };
        const e2eTarget = {
            builder: `${builderPackage}:protractor`,
            options: e2eOptions,
        };
        e2eArchitect.e2e = e2eTarget;
        const e2eLintOptions = {
            tsConfig: removeDupes(tsConfigs).filter(t => t.indexOf('e2e') !== -1),
            exclude: removeDupes(excludes),
        };
        const e2eLintTarget = {
            builder: `${builderPackage}:tslint`,
            options: e2eLintOptions,
        };
        e2eArchitect.lint = e2eLintTarget;
        if (protractorConfig) {
            e2eProject.architect = e2eArchitect;
        }
        return { name, project, e2eProject };
    })
        .reduce((projects, mappedApp) => {
        const { name, project, e2eProject } = mappedApp;
        projects[name] = project;
        projects[name + '-e2e'] = e2eProject;
        return projects;
    }, {});
    return projectMap;
}
function getDefaultAppNamePrefix(config) {
    let defaultAppNamePrefix = 'app';
    if (config.project && config.project.name) {
        defaultAppNamePrefix = config.project.name;
    }
    return defaultAppNamePrefix;
}
function extractDefaultProject(config) {
    if (config.apps && config.apps[0]) {
        const app = config.apps[0];
        const defaultAppName = getDefaultAppNamePrefix(config);
        const name = app.name || defaultAppName;
        return name;
    }
    return null;
}
function updateSpecTsConfig(config) {
    return (host, context) => {
        const apps = config.apps || [];
        apps.forEach((app, idx) => {
            const testTsConfig = app.testTsconfig || defaults.testTsConfig;
            const tsSpecConfigPath = core_1.join(core_1.normalize(app.root || ''), testTsConfig);
            const buffer = host.read(tsSpecConfigPath);
            if (!buffer) {
                return;
            }
            const tsCfgAst = core_1.parseJsonAst(buffer.toString(), core_1.JsonParseMode.Loose);
            if (tsCfgAst.kind != 'object') {
                throw new schematics_1.SchematicsException('Invalid tsconfig. Was expecting an object');
            }
            const filesAstNode = json_utils_1.findPropertyInAstObject(tsCfgAst, 'files');
            if (filesAstNode && filesAstNode.kind != 'array') {
                throw new schematics_1.SchematicsException('Invalid tsconfig "files" property; expected an array.');
            }
            const recorder = host.beginUpdate(tsSpecConfigPath);
            const polyfills = app.polyfills || defaults.polyfills;
            if (!filesAstNode) {
                // Do nothing if the files array does not exist. This means exclude or include are
                // set and we shouldn't mess with that.
            }
            else {
                if (filesAstNode.value.indexOf(polyfills) == -1) {
                    json_utils_1.appendValueInAstArray(recorder, filesAstNode, polyfills);
                }
            }
            host.commitUpdate(recorder);
        });
    };
}
function updatePackageJson(config) {
    return (host, context) => {
        const dependency = {
            type: dependencies_1.NodeDependencyType.Dev,
            name: '@angular-devkit/build-angular',
            version: latest_versions_1.latestVersions.DevkitBuildAngular,
            overwrite: true,
        };
        dependencies_1.addPackageJsonDependency(host, dependency);
        context.addTask(new tasks_1.NodePackageInstallTask({
            packageManager: config.packageManager === 'default' ? undefined : config.packageManager,
        }));
        return host;
    };
}
function updateTsLintConfig() {
    return (host, context) => {
        const tsLintPath = '/tslint.json';
        const buffer = host.read(tsLintPath);
        if (!buffer) {
            return host;
        }
        const tsCfgAst = core_1.parseJsonAst(buffer.toString(), core_1.JsonParseMode.Loose);
        if (tsCfgAst.kind != 'object') {
            return host;
        }
        const rulesNode = json_utils_1.findPropertyInAstObject(tsCfgAst, 'rules');
        if (!rulesNode || rulesNode.kind != 'object') {
            return host;
        }
        const importBlacklistNode = json_utils_1.findPropertyInAstObject(rulesNode, 'import-blacklist');
        if (!importBlacklistNode || importBlacklistNode.kind != 'array') {
            return host;
        }
        const recorder = host.beginUpdate(tsLintPath);
        for (let i = 0; i < importBlacklistNode.elements.length; i++) {
            const element = importBlacklistNode.elements[i];
            if (element.kind == 'string' && element.value == 'rxjs') {
                const { start, end } = element;
                // Remove this element.
                if (i == importBlacklistNode.elements.length - 1) {
                    // Last element.
                    if (i > 0) {
                        // Not first, there's a comma to remove before.
                        const previous = importBlacklistNode.elements[i - 1];
                        recorder.remove(previous.end.offset, end.offset - previous.end.offset);
                    }
                    else {
                        // Only element, just remove the whole rule.
                        const { start, end } = importBlacklistNode;
                        recorder.remove(start.offset, end.offset - start.offset);
                        recorder.insertLeft(start.offset, '[]');
                    }
                }
                else {
                    // Middle, just remove the whole node (up to next node start).
                    const next = importBlacklistNode.elements[i + 1];
                    recorder.remove(start.offset, next.start.offset - start.offset);
                }
            }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
function updateRootTsConfig() {
    return (host, context) => {
        const tsConfigPath = '/tsconfig.json';
        const buffer = host.read(tsConfigPath);
        if (!buffer) {
            return;
        }
        const tsCfgAst = core_1.parseJsonAst(buffer.toString(), core_1.JsonParseMode.Loose);
        if (tsCfgAst.kind !== 'object') {
            throw new schematics_1.SchematicsException('Invalid root tsconfig. Was expecting an object');
        }
        const compilerOptionsAstNode = json_utils_1.findPropertyInAstObject(tsCfgAst, 'compilerOptions');
        if (!compilerOptionsAstNode || compilerOptionsAstNode.kind != 'object') {
            throw new schematics_1.SchematicsException('Invalid root tsconfig "compilerOptions" property; expected an object.');
        }
        if (json_utils_1.findPropertyInAstObject(compilerOptionsAstNode, 'baseUrl') &&
            json_utils_1.findPropertyInAstObject(compilerOptionsAstNode, 'module')) {
            return host;
        }
        const compilerOptions = compilerOptionsAstNode.value;
        const { baseUrl = './', module = 'es2015' } = compilerOptions;
        const validBaseUrl = ['./', '', '.'];
        if (!validBaseUrl.includes(baseUrl)) {
            const formattedBaseUrl = validBaseUrl.map(x => `'${x}'`).join(', ');
            context.logger.warn(core_1.tags.oneLine `Root tsconfig option 'baseUrl' is not one of: ${formattedBaseUrl}.
        This might cause unexpected behaviour when generating libraries.`);
        }
        if (module !== 'es2015') {
            context.logger.warn(`Root tsconfig option 'module' is not 'es2015'. This might cause unexpected behaviour.`);
        }
        compilerOptions.module = module;
        compilerOptions.baseUrl = baseUrl;
        host.overwrite(tsConfigPath, JSON.stringify(tsCfgAst.value, null, 2));
        return host;
    };
}
function default_1() {
    return (host, context) => {
        if (host.exists('/.angular.json') || host.exists('/angular.json')) {
            context.logger.info('Found a modern configuration file. Nothing to be done.');
            return host;
        }
        const configPath = getConfigPath(host);
        const configBuffer = host.read(core_1.normalize(configPath));
        if (configBuffer == null) {
            throw new schematics_1.SchematicsException(`Could not find configuration file (${configPath})`);
        }
        const config = core_1.parseJson(configBuffer.toString(), core_1.JsonParseMode.Loose);
        if (typeof config != 'object' || Array.isArray(config) || config === null) {
            throw new schematics_1.SchematicsException('Invalid angular-cli.json configuration; expected an object.');
        }
        return schematics_1.chain([
            migrateKarmaConfiguration(config),
            migrateConfiguration(config, context.logger),
            updateSpecTsConfig(config),
            updatePackageJson(config),
            updateRootTsConfig(),
            updateTsLintConfig(),
            (host, context) => {
                context.logger.warn(core_1.tags.oneLine `Some configuration options have been changed,
          please make sure to update any npm scripts which you may have modified.`);
                return host;
            },
        ]);
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL3NjaGVtYXRpY3MvYW5ndWxhci9taWdyYXRpb25zL3VwZGF0ZS02L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsK0NBVzhCO0FBQzlCLDJEQU1vQztBQUNwQyw0REFBMEU7QUFFMUUsNkRBSW9DO0FBQ3BDLHlEQUdrQztBQUNsQyxtRUFBK0Q7QUFFL0QsTUFBTSxRQUFRLEdBQUc7SUFDZixPQUFPLEVBQUUsS0FBSztJQUNkLEtBQUssRUFBRSxZQUFZO0lBQ25CLElBQUksRUFBRSxTQUFTO0lBQ2YsU0FBUyxFQUFFLGNBQWM7SUFDekIsUUFBUSxFQUFFLG1CQUFtQjtJQUM3QixJQUFJLEVBQUUsU0FBUztJQUNmLE1BQU0sRUFBRSxPQUFPO0lBQ2YsS0FBSyxFQUFFLGVBQWU7SUFDdEIsVUFBVSxFQUFFLG9CQUFvQjtJQUNoQyxZQUFZLEVBQUUsb0JBQW9CO0lBQ2xDLFlBQVksRUFBRSxhQUFhO0lBQzNCLFVBQVUsRUFBRSxnQkFBZ0I7SUFDNUIsY0FBYyxFQUFFLHNCQUFzQjtDQUN2QyxDQUFDO0FBRUYsdUJBQXVCLElBQVU7SUFDL0IsSUFBSSxZQUFZLEdBQUcsZ0JBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2xELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUM3QixPQUFPLFlBQVksQ0FBQztLQUNyQjtJQUNELFlBQVksR0FBRyxnQkFBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDN0MsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzdCLE9BQU8sWUFBWSxDQUFDO0tBQ3JCO0lBRUQsTUFBTSxJQUFJLGdDQUFtQixDQUFDLG1DQUFtQyxDQUFDLENBQUM7QUFDckUsQ0FBQztBQUVELG1DQUFtQyxNQUFpQjtJQUNsRCxPQUFPLENBQUMsSUFBVSxFQUFF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Q0FBQyxXQUFJLENBQUMsT0FBTyxDQUFBO2tGQUMwQyxDQUFDLENBQUM7Z0JBRTVFLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNKLENBQUM7QUFsQ0QsNEJBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtcbiAgSnNvbkFycmF5LFxuICBKc29uT2JqZWN0LFxuICBKc29uUGFyc2VNb2RlLFxuICBQYXRoLFxuICBqb2luLFxuICBsb2dnaW5nLFxuICBub3JtYWxpemUsXG4gIHBhcnNlSnNvbixcbiAgcGFyc2VKc29uQXN0LFxuICB0YWdzLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxuICBUcmVlLFxuICBjaGFpbixcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHsgTm9kZVBhY2thZ2VJbnN0YWxsVGFzayB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzL3Rhc2tzJztcbmltcG9ydCB7IEFwcENvbmZpZywgQ2xpQ29uZmlnIH0gZnJvbSAnLi4vLi4vdXRpbGl0eS9jb25maWcnO1xuaW1wb3J0IHtcbiAgTm9kZURlcGVuZGVuY3ksXG4gIE5vZGVEZXBlbmRlbmN5VHlwZSxcbiAgYWRkUGFja2FnZUpzb25EZXBlbmRlbmN5LFxufSBmcm9tICcuLi8uLi91dGlsaXR5L2RlcGVuZGVuY2llcyc7XG5pbXBvcnQge1xuICBhcHBlbmRWYWx1ZUluQXN0QXJyYXksXG4gIGZpbmRQcm9wZXJ0eUluQXN0T2JqZWN0LFxufSBmcm9tICcuLi8uLi91dGlsaXR5L2pzb24tdXRpbHMnO1xuaW1wb3J0IHsgbGF0ZXN0VmVyc2lvbnMgfSBmcm9tICcuLi8uLi91dGlsaXR5L2xhdGVzdC12ZXJzaW9ucyc7XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBhcHBSb290OiAnc3JjJyxcbiAgaW5kZXg6ICdpbmRleC5odG1sJyxcbiAgbWFpbjogJ21haW4udHMnLFxuICBwb2x5ZmlsbHM6ICdwb2x5ZmlsbHMudHMnLFxuICB0c0NvbmZpZzogJ3RzY29uZmlnLmFwcC5qc29uJyxcbiAgdGVzdDogJ3Rlc3QudHMnLFxuICBvdXREaXI6ICdkaXN0LycsXG4gIGthcm1hOiAna2FybWEuY29uZi5qcycsXG4gIHByb3RyYWN0b3I6ICdwcm90cmFjdG9yLmNvbmYuanMnLFxuICB0ZXN0VHNDb25maWc6ICd0c2NvbmZpZy5zcGVjLmpzb24nLFxuICBzZXJ2ZXJPdXREaXI6ICdkaXN0LXNlcnZlcicsXG4gIHNlcnZlck1haW46ICdtYWluLnNlcnZlci50cycsXG4gIHNlcnZlclRzQ29uZmlnOiAndHNjb25maWcuc2VydmVyLmpzb24nLFxufTtcblxuZnVuY3Rpb24gZ2V0Q29uZmlnUGF0aCh0cmVlOiBUcmVlKTogUGF0aCB7XG4gIGxldCBwb3NzaWJsZVBhdGggPSBub3JtYWxpemUoJy5hbmd1bGFyLWNsaS5qc29uJyk7XG4gIGlmICh0cmVlLmV4aXN0cyhwb3NzaWJsZVBhdGgpKSB7XG4gICAgcmV0dXJuIHBvc3NpYmxlUGF0aDtcbiAgfVxuICBwb3NzaWJsZVBhdGggPSBub3JtYWxpemUoJ2FuZ3VsYXItY2xpLmpzb24nKTtcbiAgaWYgKHRyZWUuZXhpc3RzKHBvc3NpYmxlUGF0aCkpIHtcbiAgICByZXR1cm4gcG9zc2libGVQYXRoO1xuICB9XG5cbiAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oJ0NvdWxkIG5vdCBmaW5kIGNvbmZpZ3VyYXRpb24gZmlsZScpO1xufVxuXG5mdW5jdGlvbiBtaWdyYXRlS2FybWFDb25maWd1cmF0aW9uKGNvbmZpZzogQ2xpQ29uZmlnKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIGNvbnRleHQubG9nZ2VyLmluZm8oYFVwZGF0aW5nIGthcm1hIGNvbmZpZ3VyYXRpb25gKTtcbiAgICB0cnkge1xuICAgICAgY29uc3Qga2FybWFQYXRoID0gY29uZmlnICYmIGNvbmZpZy50ZXN0ICYmIGNvbmZpZy50ZXN0Lmthcm1hICYmIGNvbmZpZy50ZXN0Lmthcm1hLmNvbmZpZ1xuICAgICAgICA/IGNvbmZpZy50ZXN0Lmthcm1hLmNvbmZpZ1xuICAgICAgICA6IGRlZmF1bHRzLmthcm1hO1xuICAgICAgY29uc3QgYnVmZmVyID0gaG9zdC5yZWFkKGthcm1hUGF0aCk7XG4gICAgICBpZiAoYnVmZmVyICE9PSBudWxsKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gYnVmZmVyLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIFJlcGxhY2UgdGhlIDEuMCBmaWxlcyBhbmQgcHJlcHJvY2Vzc29yIGVudHJpZXMsIHdpdGggYW5kIHdpdGhvdXQgY29tbWEgYXQgdGhlIGVuZC5cbiAgICAgICAgLy8gSWYgdGhlc2UgcmVtYWluLCB0aGV5IHdpbGwgY2F1c2UgdGhlIGBuZyB0ZXN0YCB0byBmYWlsLlxuICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKGB7IHBhdHRlcm46ICcuL3NyYy90ZXN0LnRzJywgd2F0Y2hlZDogZmFsc2UgfSxgLCAnJyk7XG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoYHsgcGF0dGVybjogJy4vc3JjL3Rlc3QudHMnLCB3YXRjaGVkOiBmYWxzZSB9YCwgJycpO1xuICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKGAnLi9zcmMvdGVzdC50cyc6IFsnQGFuZ3VsYXIvY2xpJ10sYCwgJycpO1xuICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKGAnLi9zcmMvdGVzdC50cyc6IFsnQGFuZ3VsYXIvY2xpJ11gLCAnJyk7XG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL2FuZ3VsYXJDbGlbXn1dKn0sPy8sICcnKTtcbiAgICAgICAgLy8gUmVwbGFjZSAxLnggcGx1Z2luIG5hbWVzLlxuICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9AYW5ndWxhclxcL2NsaS9nLCAnQGFuZ3VsYXItZGV2a2l0L2J1aWxkLWFuZ3VsYXInKTtcbiAgICAgICAgLy8gUmVwbGFjZSBjb2RlIGNvdmVyYWdlIG91dHB1dCBwYXRoLlxuICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKCdyZXBvcnRzJyxcbiAgICAgICAgICBgZGlyOiByZXF1aXJlKCdwYXRoJykuam9pbihfX2Rpcm5hbWUsICdjb3ZlcmFnZScpLCByZXBvcnRzYCk7XG4gICAgICAgIGhvc3Qub3ZlcndyaXRlKGthcm1hUGF0aCwgY29udGVudCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7IH1cblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5mdW5jdGlvbiBtaWdyYXRlQ29uZmlndXJhdGlvbihvbGRDb25maWc6IENsaUNvbmZpZywgbG9nZ2VyOiBsb2dnaW5nLkxvZ2dlckFwaSk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBjb25zdCBvbGRDb25maWdQYXRoID0gZ2V0Q29uZmlnUGF0aChob3N0KTtcbiAgICBjb25zdCBjb25maWdQYXRoID0gbm9ybWFsaXplKCdhbmd1bGFyLmpzb24nKTtcbiAgICBjb250ZXh0LmxvZ2dlci5pbmZvKGBVcGRhdGluZyBjb25maWd1cmF0aW9uYCk7XG4gICAgY29uc3QgY29uZmlnOiBKc29uT2JqZWN0ID0ge1xuICAgICAgJyRzY2hlbWEnOiAnLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvY2xpL2xpYi9jb25maWcvc2NoZW1hLmpzb24nLFxuICAgICAgdmVyc2lvbjogMSxcbiAgICAgIG5ld1Byb2plY3RSb290OiAncHJvamVjdHMnLFxuICAgICAgcHJvamVjdHM6IGV4dHJhY3RQcm9qZWN0c0NvbmZpZyhvbGRDb25maWcsIGhvc3QsIGxvZ2dlciksXG4gICAgfTtcbiAgICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IGV4dHJhY3REZWZhdWx0UHJvamVjdChvbGRDb25maWcpO1xuICAgIGlmIChkZWZhdWx0UHJvamVjdCAhPT0gbnVsbCkge1xuICAgICAgY29uZmlnLmRlZmF1bHRQcm9qZWN0ID0gZGVmYXVsdFByb2plY3Q7XG4gICAgfVxuICAgIGNvbnN0IGNsaUNvbmZpZyA9IGV4dHJhY3RDbGlDb25maWcob2xkQ29uZmlnKTtcbiAgICBpZiAoY2xpQ29uZmlnICE9PSBudWxsKSB7XG4gICAgICBjb25maWcuY2xpID0gY2xpQ29uZmlnO1xuICAgIH1cbiAgICBjb25zdCBzY2hlbWF0aWNzQ29uZmlnID0gZXh0cmFjdFNjaGVtYXRpY3NDb25maWcob2xkQ29uZmlnKTtcbiAgICBpZiAoc2NoZW1hdGljc0NvbmZpZyAhPT0gbnVsbCkge1xuICAgICAgY29uZmlnLnNjaGVtYXRpY3MgPSBzY2hlbWF0aWNzQ29uZmlnO1xuICAgIH1cbiAgICBjb25zdCBhcmNoaXRlY3RDb25maWcgPSBleHRyYWN0QXJjaGl0ZWN0Q29uZmlnKG9sZENvbmZpZyk7XG4gICAgaWYgKGFyY2hpdGVjdENvbmZpZyAhPT0gbnVsbCkge1xuICAgICAgY29uZmlnLmFyY2hpdGVjdCA9IGFyY2hpdGVjdENvbmZpZztcbiAgICB9XG5cbiAgICBjb250ZXh0LmxvZ2dlci5pbmZvKGBSZW1vdmluZyBvbGQgY29uZmlnIGZpbGUgKCR7b2xkQ29uZmlnUGF0aH0pYCk7XG4gICAgaG9zdC5kZWxldGUob2xkQ29uZmlnUGF0aCk7XG4gICAgY29udGV4dC5sb2dnZXIuaW5mbyhgV3JpdGluZyBjb25maWcgZmlsZSAoJHtjb25maWdQYXRofSlgKTtcbiAgICBob3N0LmNyZWF0ZShjb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeShjb25maWcsIG51bGwsIDIpKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5mdW5jdGlvbiBleHRyYWN0Q2xpQ29uZmlnKGNvbmZpZzogQ2xpQ29uZmlnKTogSnNvbk9iamVjdCB8IG51bGwge1xuICBjb25zdCBuZXdDb25maWc6IEpzb25PYmplY3QgPSB7fTtcbiAgaWYgKGNvbmZpZy5wYWNrYWdlTWFuYWdlciAmJiBjb25maWcucGFja2FnZU1hbmFnZXIgIT09ICdkZWZhdWx0Jykge1xuICAgIG5ld0NvbmZpZ1sncGFja2FnZU1hbmFnZXInXSA9IGNvbmZpZy5wYWNrYWdlTWFuYWdlcjtcbiAgfVxuICBpZiAoY29uZmlnLndhcm5pbmdzKSB7XG4gICAgaWYgKGNvbmZpZy53YXJuaW5ncy52ZXJzaW9uTWlzbWF0Y2ggIT09IHVuZGVmaW5lZCkge1xuICAgICAgbmV3Q29uZmlnLndhcm5pbmdzID0ge1xuICAgICAgICAuLi4oKG5ld0NvbmZpZy53YXJuaW5ncyBhcyBKc29uT2JqZWN0IHwgbnVsbCkgfHwge30pLFxuICAgICAgICAuLi57IHZlcnNpb25NaXNtYXRjaDogY29uZmlnLndhcm5pbmdzLnZlcnNpb25NaXNtYXRjaCB9LFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZy53YXJuaW5ncy50eXBlc2NyaXB0TWlzbWF0Y2ggIT09IHVuZGVmaW5lZCkge1xuICAgICAgbmV3Q29uZmlnLndhcm5pbmdzID0ge1xuICAgICAgICAuLi4oKG5ld0NvbmZpZy53YXJuaW5ncyBhcyBKc29uT2JqZWN0IHwgbnVsbCkgfHwge30pLFxuICAgICAgICAuLi57IHR5cGVzY3JpcHRNaXNtYXRjaDogY29uZmlnLndhcm5pbmdzLnR5cGVzY3JpcHRNaXNtYXRjaCB9LFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobmV3Q29uZmlnKS5sZW5ndGggPT0gMCA/IG51bGwgOiBuZXdDb25maWc7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RTY2hlbWF0aWNzQ29uZmlnKGNvbmZpZzogQ2xpQ29uZmlnKTogSnNvbk9iamVjdCB8IG51bGwge1xuICBsZXQgY29sbGVjdGlvbk5hbWUgPSAnQHNjaGVtYXRpY3MvYW5ndWxhcic7XG4gIGlmICghY29uZmlnIHx8ICFjb25maWcuZGVmYXVsdHMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBjb25zdCBjb25maWdEZWZhdWx0cyA9IGNvbmZpZy5kZWZhdWx0cztcbiAgaWYgKGNvbmZpZy5kZWZhdWx0cyAmJiBjb25maWcuZGVmYXVsdHMuc2NoZW1hdGljcyAmJiBjb25maWcuZGVmYXVsdHMuc2NoZW1hdGljcy5jb2xsZWN0aW9uKSB7XG4gICAgY29sbGVjdGlvbk5hbWUgPSBjb25maWcuZGVmYXVsdHMuc2NoZW1hdGljcy5jb2xsZWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvciBlYWNoIHNjaGVtYXRpY1xuICAgKiAgLSBnZXQgdGhlIGNvbmZpZ1xuICAgKiAgLSBmaWx0ZXIgb25lJ3Mgd2l0aG91dCBjb25maWdcbiAgICogIC0gY29tYmluZSB0aGVtIGludG8gYW4gb2JqZWN0XG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIGNvbnN0IHNjaGVtYXRpY0NvbmZpZ3M6IGFueSA9IFsnY2xhc3MnLCAnY29tcG9uZW50JywgJ2RpcmVjdGl2ZScsICdndWFyZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaW50ZXJmYWNlJywgJ21vZHVsZScsICdwaXBlJywgJ3NlcnZpY2UnXVxuICAgIC5tYXAoc2NoZW1hdGljTmFtZSA9PiB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgICBjb25zdCBzY2hlbWF0aWNEZWZhdWx0czogSnNvbk9iamVjdCA9IChjb25maWcuZGVmYXVsdHMgYXMgYW55KVtzY2hlbWF0aWNOYW1lXSB8fCBudWxsO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzY2hlbWF0aWNOYW1lLFxuICAgICAgICBjb25maWc6IHNjaGVtYXRpY0RlZmF1bHRzLFxuICAgICAgfTtcbiAgICB9KVxuICAgIC5maWx0ZXIoc2NoZW1hdGljID0+IHNjaGVtYXRpYy5jb25maWcgIT09IG51bGwpXG4gICAgLnJlZHVjZSgoYWxsOiBKc29uT2JqZWN0LCBzY2hlbWF0aWMpID0+IHtcbiAgICAgIGFsbFtjb2xsZWN0aW9uTmFtZSArICc6JyArIHNjaGVtYXRpYy5zY2hlbWF0aWNOYW1lXSA9IHNjaGVtYXRpYy5jb25maWc7XG5cbiAgICAgIHJldHVybiBhbGw7XG4gICAgfSwge30pO1xuXG4gIGNvbnN0IGNvbXBvbmVudFVwZGF0ZTogSnNvbk9iamVjdCA9IHt9O1xuICBjb21wb25lbnRVcGRhdGUucHJlZml4ID0gJyc7XG5cbiAgY29uc3QgY29tcG9uZW50S2V5ID0gY29sbGVjdGlvbk5hbWUgKyAnOmNvbXBvbmVudCc7XG4gIGNvbnN0IGRpcmVjdGl2ZUtleSA9IGNvbGxlY3Rpb25OYW1lICsgJzpkaXJlY3RpdmUnO1xuICBpZiAoIXNjaGVtYXRpY0NvbmZpZ3NbY29tcG9uZW50S2V5XSkge1xuICAgIHNjaGVtYXRpY0NvbmZpZ3NbY29tcG9uZW50S2V5XSA9IHt9O1xuICB9XG4gIGlmICghc2NoZW1hdGljQ29uZmlnc1tkaXJlY3RpdmVLZXldKSB7XG4gICAgc2NoZW1hdGljQ29uZmlnc1tkaXJlY3RpdmVLZXldID0ge307XG4gIH1cbiAgaWYgKGNvbmZpZy5hcHBzICYmIGNvbmZpZy5hcHBzWzBdKSB7XG4gICAgc2NoZW1hdGljQ29uZmlnc1tjb21wb25lbnRLZXldLnByZWZpeCA9IGNvbmZpZy5hcHBzWzBdLnByZWZpeDtcbiAgICBzY2hlbWF0aWNDb25maWdzW2RpcmVjdGl2ZUtleV0ucHJlZml4ID0gY29uZmlnLmFwcHNbMF0ucHJlZml4O1xuICB9XG4gIGlmIChjb25maWcuZGVmYXVsdHMpIHtcbiAgICBzY2hlbWF0aWNDb25maWdzW2NvbXBvbmVudEtleV0uc3R5bGVleHQgPSBjb25maWcuZGVmYXVsdHMuc3R5bGVFeHQ7XG4gIH1cblxuICByZXR1cm4gc2NoZW1hdGljQ29uZmlncztcbn1cblxuZnVuY3Rpb24gZXh0cmFjdEFyY2hpdGVjdENvbmZpZyhfY29uZmlnOiBDbGlDb25maWcpOiBKc29uT2JqZWN0IHwgbnVsbCB7XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIHRvbyBiaWcsIGJ1dCBhbHNvIHJlYWxseSBoYXJkIHRvIHJlZmFjdG9yIHByb3Blcmx5IGFzIHRoZSB3aG9sZSBjb25maWdcbi8vIGRlcGVuZHMgb24gYWxsIHBhcnRzIG9mIHRoZSBjb25maWcuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYmlnLWZ1bmN0aW9uXG5mdW5jdGlvbiBleHRyYWN0UHJvamVjdHNDb25maWcoXG4gIGNvbmZpZzogQ2xpQ29uZmlnLCB0cmVlOiBUcmVlLCBsb2dnZXI6IGxvZ2dpbmcuTG9nZ2VyQXBpLFxuKTogSnNvbk9iamVjdCB7XG4gIGNvbnN0IGJ1aWxkZXJQYWNrYWdlID0gJ0Bhbmd1bGFyLWRldmtpdC9idWlsZC1hbmd1bGFyJztcbiAgY29uc3QgZGVmYXVsdEFwcE5hbWVQcmVmaXggPSBnZXREZWZhdWx0QXBwTmFtZVByZWZpeChjb25maWcpO1xuXG4gIGNvbnN0IGJ1aWxkRGVmYXVsdHM6IEpzb25PYmplY3QgPSBjb25maWcuZGVmYXVsdHMgJiYgY29uZmlnLmRlZmF1bHRzLmJ1aWxkXG4gICAgPyB7XG4gICAgICBzb3VyY2VNYXA6IGNvbmZpZy5kZWZhdWx0cy5idWlsZC5zb3VyY2VtYXBzLFxuICAgICAgcHJvZ3Jlc3M6IGNvbmZpZy5kZWZhdWx0cy5idWlsZC5wcm9ncmVzcyxcbiAgICAgIHBvbGw6IGNvbmZpZy5kZWZhdWx0cy5idWlsZC5wb2xsLFxuICAgICAgZGVsZXRlT3V0cHV0UGF0aDogY29uZmlnLmRlZmF1bHRzLmJ1aWxkLmRlbGV0ZU91dHB1dFBhdGgsXG4gICAgICBwcmVzZXJ2ZVN5bWxpbmtzOiBjb25maWcuZGVmYXVsdHMuYnVpbGQucHJlc2VydmVTeW1saW5rcyxcbiAgICAgIHNob3dDaXJjdWxhckRlcGVuZGVuY2llczogY29uZmlnLmRlZmF1bHRzLmJ1aWxkLnNob3dDaXJjdWxhckRlcGVuZGVuY2llcyxcbiAgICAgIGNvbW1vbkNodW5rOiBjb25maWcuZGVmYXVsdHMuYnVpbGQuY29tbW9uQ2h1bmssXG4gICAgICBuYW1lZENodW5rczogY29uZmlnLmRlZmF1bHRzLmJ1aWxkLm5hbWVkQ2h1bmtzLFxuICAgIH0gYXMgSnNvbk9iamVjdFxuICAgIDoge307XG5cbiAgY29uc3Qgc2VydmVEZWZhdWx0czogSnNvbk9iamVjdCA9IGNvbmZpZy5kZWZhdWx0cyAmJiBjb25maWcuZGVmYXVsdHMuc2VydmVcbiAgICA/IHtcbiAgICAgIHBvcnQ6IGNvbmZpZy5kZWZhdWx0cy5zZXJ2ZS5wb3J0LFxuICAgICAgaG9zdDogY29uZmlnLmRlZmF1bHRzLnNlcnZlLmhvc3QsXG4gICAgICBzc2w6IGNvbmZpZy5kZWZhdWx0cy5zZXJ2ZS5zc2wsXG4gICAgICBzc2xLZXk6IGNvbmZpZy5kZWZhdWx0cy5zZXJ2ZS5zc2xLZXksXG4gICAgICBzc2xDZXJ0OiBjb25maWcuZGVmYXVsdHMuc2VydmUuc3NsQ2VydCxcbiAgICAgIHByb3h5Q29uZmlnOiBjb25maWcuZGVmYXVsdHMuc2VydmUucHJveHlDb25maWcsXG4gICAgfSBhcyBKc29uT2JqZWN0XG4gICAgOiB7fTtcblxuXG4gIGNvbnN0IGFwcHMgPSBjb25maWcuYXBwcyB8fCBbXTtcbiAgLy8gY29udmVydCB0aGUgYXBwcyB0byBwcm9qZWN0c1xuICBjb25zdCBicm93c2VyQXBwcyA9IGFwcHMuZmlsdGVyKGFwcCA9PiBhcHAucGxhdGZvcm0gIT09ICdzZXJ2ZXInKTtcbiAgY29uc3Qgc2VydmVyQXBwcyA9IGFwcHMuZmlsdGVyKGFwcCA9PiBhcHAucGxhdGZvcm0gPT09ICdzZXJ2ZXInKTtcblxuICBjb25zdCBwcm9qZWN0TWFwID0gYnJvd3NlckFwcHNcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHRvbyBiaWcsIGJ1dCBhbHNvIHJlYWxseSBoYXJkIHRvIHJlZmFjdG9yIHByb3Blcmx5IGFzIHRoZSB3aG9sZSBjb25maWdcbiAgICAvLyBkZXBlbmRzIG9uIGFsbCBwYXJ0cyBvZiB0aGUgY29uZmlnLlxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaWctZnVuY3Rpb25cbiAgICAubWFwKChhcHAsIGlkeCkgPT4ge1xuICAgICAgY29uc3QgZGVmYXVsdEFwcE5hbWUgPSBpZHggPT09IDAgPyBkZWZhdWx0QXBwTmFtZVByZWZpeCA6IGAke2RlZmF1bHRBcHBOYW1lUHJlZml4fSR7aWR4fWA7XG4gICAgICBjb25zdCBuYW1lID0gYXBwLm5hbWUgfHwgZGVmYXVsdEFwcE5hbWU7XG4gICAgICBjb25zdCBvdXREaXIgPSBhcHAub3V0RGlyIHx8IGRlZmF1bHRzLm91dERpcjtcbiAgICAgIGNvbnN0IGFwcFJvb3QgPSBhcHAucm9vdCB8fCBkZWZhdWx0cy5hcHBSb290O1xuXG4gICAgICBmdW5jdGlvbiBfbWFwQXNzZXRzKGFzc2V0OiBzdHJpbmcgfCBKc29uT2JqZWN0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXNzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZShhcHBSb290ICsgJy8nICsgYXNzZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChhc3NldC5hbGxvd091dHNpZGVPdXREaXIpIHtcbiAgICAgICAgICAgIGxvZ2dlci53YXJuKHRhZ3Mub25lTGluZWBcbiAgICAgICAgICAgICAgQXNzZXQgd2l0aCBpbnB1dCAnJHthc3NldC5pbnB1dH0nIHdhcyBub3QgbWlncmF0ZWQgYmVjYXVzZSBpdFxuICAgICAgICAgICAgICB1c2VzIHRoZSAnYWxsb3dPdXRzaWRlT3V0RGlyJyBvcHRpb24gd2hpY2ggaXMgbm90IHN1cHBvcnRlZCBpbiBBbmd1bGFyIENMSSA2LlxuICAgICAgICAgICAgYCk7XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYXNzZXQub3V0cHV0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBnbG9iOiBhc3NldC5nbG9iLFxuICAgICAgICAgICAgICBpbnB1dDogbm9ybWFsaXplKGFwcFJvb3QgKyAnLycgKyBhc3NldC5pbnB1dCksXG4gICAgICAgICAgICAgIG91dHB1dDogbm9ybWFsaXplKCcvJyArIGFzc2V0Lm91dHB1dCBhcyBzdHJpbmcpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgZ2xvYjogYXNzZXQuZ2xvYixcbiAgICAgICAgICAgICAgaW5wdXQ6IG5vcm1hbGl6ZShhcHBSb290ICsgJy8nICsgYXNzZXQuaW5wdXQpLFxuICAgICAgICAgICAgICBvdXRwdXQ6ICcvJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF9idWlsZENvbmZpZ3VyYXRpb25zKCk6IEpzb25PYmplY3Qge1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBhcHAuZW52aXJvbm1lbnRTb3VyY2U7XG4gICAgICAgIGNvbnN0IGVudmlyb25tZW50cyA9IGFwcC5lbnZpcm9ubWVudHM7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VXb3JrZXIgPSBhcHAuc2VydmljZVdvcmtlcjtcblxuICAgICAgICBjb25zdCBwcm9kdWN0aW9uUGFydGlhbCA9IHtcbiAgICAgICAgICBvcHRpbWl6YXRpb246IHRydWUsXG4gICAgICAgICAgb3V0cHV0SGFzaGluZzogJ2FsbCcsXG4gICAgICAgICAgc291cmNlTWFwOiBmYWxzZSxcbiAgICAgICAgICBleHRyYWN0Q3NzOiB0cnVlLFxuICAgICAgICAgIG5hbWVkQ2h1bmtzOiBmYWxzZSxcbiAgICAgICAgICBhb3Q6IHRydWUsXG4gICAgICAgICAgZXh0cmFjdExpY2Vuc2VzOiB0cnVlLFxuICAgICAgICAgIHZlbmRvckNodW5rOiBmYWxzZSxcbiAgICAgICAgICBidWlsZE9wdGltaXplcjogdHJ1ZSxcbiAgICAgICAgICAuLi4oc2VydmljZVdvcmtlciA/IHtzZXJ2aWNlV29ya2VyOiB0cnVlLCBuZ3N3Q29uZmlnUGF0aDogJy9zcmMvbmdzdy1jb25maWcuanNvbid9IDoge30pLFxuICAgICAgICAgIC4uLihhcHAuYnVkZ2V0cyA/IHsgYnVkZ2V0czogYXBwLmJ1ZGdldHMgYXMgSnNvbkFycmF5fSA6IHt9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIWVudmlyb25tZW50cykge1xuICAgICAgICAgIHJldHVybiB7IHByb2R1Y3Rpb246IHByb2R1Y3Rpb25QYXJ0aWFsIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb25maWd1cmF0aW9ucyA9IE9iamVjdC5rZXlzKGVudmlyb25tZW50cykucmVkdWNlKChhY2MsIGVudmlyb25tZW50KSA9PiB7XG4gICAgICAgICAgaWYgKHNvdXJjZSA9PT0gZW52aXJvbm1lbnRzW2Vudmlyb25tZW50XSkge1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgaXNQcm9kdWN0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgICBjb25zdCBlbnZpcm9ubWVudENvbnRlbnQgPSB0cmVlLnJlYWQoYXBwLnJvb3QgKyAnLycgKyBlbnZpcm9ubWVudHNbZW52aXJvbm1lbnRdKTtcbiAgICAgICAgICBpZiAoZW52aXJvbm1lbnRDb250ZW50KSB7XG4gICAgICAgICAgICBpc1Byb2R1Y3Rpb24gPSAhIWVudmlyb25tZW50Q29udGVudC50b1N0cmluZygndXRmLTgnKVxuICAgICAgICAgICAgICAvLyBBbGxvdyBmb3IgYHByb2R1Y3Rpb246IHRydWVgIG9yIGBwcm9kdWN0aW9uID0gdHJ1ZWAuIEJlc3Qgd2UgY2FuIGRvIHRvIGd1ZXNzLlxuICAgICAgICAgICAgICAubWF0Y2goL3Byb2R1Y3Rpb25bJ1wiXT9cXHMqWzo9XVxccyp0cnVlLyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IGNvbmZpZ3VyYXRpb25OYW1lO1xuICAgICAgICAgIC8vIFdlIHVzZWQgdG8gdXNlIGBwcm9kYCBieSBkZWZhdWx0IGFzIHRoZSBrZXksIGluc3RlYWQgd2Ugbm93IHVzZSB0aGUgZnVsbCB3b3JkLlxuICAgICAgICAgIC8vIFRyeSBub3QgdG8gb3ZlcnJpZGUgdGhlIHByb2R1Y3Rpb24ga2V5IGlmIGl0J3MgdGhlcmUuXG4gICAgICAgICAgaWYgKGVudmlyb25tZW50ID09ICdwcm9kJyAmJiAhZW52aXJvbm1lbnRzWydwcm9kdWN0aW9uJ10gJiYgaXNQcm9kdWN0aW9uKSB7XG4gICAgICAgICAgICBjb25maWd1cmF0aW9uTmFtZSA9ICdwcm9kdWN0aW9uJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uZmlndXJhdGlvbk5hbWUgPSBlbnZpcm9ubWVudDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhY2NbY29uZmlndXJhdGlvbk5hbWVdID0ge1xuICAgICAgICAgICAgLi4uKGlzUHJvZHVjdGlvbiA/IHByb2R1Y3Rpb25QYXJ0aWFsIDoge30pLFxuICAgICAgICAgICAgZmlsZVJlcGxhY2VtZW50czogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVwbGFjZTogYCR7YXBwLnJvb3R9LyR7c291cmNlfWAsXG4gICAgICAgICAgICAgICAgd2l0aDogYCR7YXBwLnJvb3R9LyR7ZW52aXJvbm1lbnRzW2Vudmlyb25tZW50XX1gLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30gYXMgSnNvbk9iamVjdCk7XG5cbiAgICAgICAgaWYgKCFjb25maWd1cmF0aW9uc1sncHJvZHVjdGlvbiddKSB7XG4gICAgICAgICAgY29uZmlndXJhdGlvbnNbJ3Byb2R1Y3Rpb24nXSA9IHsgLi4ucHJvZHVjdGlvblBhcnRpYWwgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb25maWd1cmF0aW9ucztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3NlcnZlQ29uZmlndXJhdGlvbnMoKTogSnNvbk9iamVjdCB7XG4gICAgICAgIGNvbnN0IGVudmlyb25tZW50cyA9IGFwcC5lbnZpcm9ubWVudHM7XG5cbiAgICAgICAgaWYgKCFlbnZpcm9ubWVudHMpIHtcbiAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhcmNoaXRlY3QpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbmZpZ3VyYXRpb25zID0gKGFyY2hpdGVjdC5idWlsZCBhcyBKc29uT2JqZWN0KS5jb25maWd1cmF0aW9ucyBhcyBKc29uT2JqZWN0O1xuXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb25maWd1cmF0aW9ucykucmVkdWNlKChhY2MsIGVudmlyb25tZW50KSA9PiB7XG4gICAgICAgICAgYWNjW2Vudmlyb25tZW50XSA9IHsgYnJvd3NlclRhcmdldDogYCR7bmFtZX06YnVpbGQ6JHtlbnZpcm9ubWVudH1gIH07XG5cbiAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSBhcyBKc29uT2JqZWN0KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX2V4dHJhRW50cnlNYXBwZXIoZXh0cmFFbnRyeTogc3RyaW5nIHwgSnNvbk9iamVjdCkge1xuICAgICAgICBsZXQgZW50cnk6IHN0cmluZyB8IEpzb25PYmplY3Q7XG4gICAgICAgIGlmICh0eXBlb2YgZXh0cmFFbnRyeSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBlbnRyeSA9IGpvaW4oYXBwLnJvb3QgYXMgUGF0aCwgZXh0cmFFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaW5wdXQgPSBqb2luKGFwcC5yb290IGFzIFBhdGgsIGV4dHJhRW50cnkuaW5wdXQgYXMgc3RyaW5nIHx8ICcnKTtcbiAgICAgICAgICBlbnRyeSA9IHsgaW5wdXQsIGxhenk6IGV4dHJhRW50cnkubGF6eSB9O1xuXG4gICAgICAgICAgaWYgKGV4dHJhRW50cnkub3V0cHV0KSB7XG4gICAgICAgICAgICBlbnRyeS5idW5kbGVOYW1lID0gZXh0cmFFbnRyeS5vdXRwdXQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVudHJ5O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm9qZWN0Um9vdCA9IGpvaW4obm9ybWFsaXplKGFwcFJvb3QpLCAnLi4nKTtcbiAgICAgIGNvbnN0IHByb2plY3Q6IEpzb25PYmplY3QgPSB7XG4gICAgICAgIHJvb3Q6IHByb2plY3RSb290LFxuICAgICAgICBzb3VyY2VSb290OiBhcHBSb290LFxuICAgICAgICBwcm9qZWN0VHlwZTogJ2FwcGxpY2F0aW9uJyxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGFyY2hpdGVjdDogSnNvbk9iamVjdCA9IHt9O1xuICAgICAgcHJvamVjdC5hcmNoaXRlY3QgPSBhcmNoaXRlY3Q7XG5cbiAgICAgICAgLy8gQnJvd3NlciB0YXJnZXRcbiAgICAgIGNvbnN0IGJ1aWxkT3B0aW9uczogSnNvbk9iamVjdCA9IHtcbiAgICAgICAgLy8gTWFrZSBvdXRwdXRQYXRoIHJlbGF0aXZlIHRvIHJvb3QuXG4gICAgICAgIG91dHB1dFBhdGg6IG91dERpcixcbiAgICAgICAgaW5kZXg6IGAke2FwcFJvb3R9LyR7YXBwLmluZGV4IHx8IGRlZmF1bHRzLmluZGV4fWAsXG4gICAgICAgIG1haW46IGAke2FwcFJvb3R9LyR7YXBwLm1haW4gfHwgZGVmYXVsdHMubWFpbn1gLFxuICAgICAgICB0c0NvbmZpZzogYCR7YXBwUm9vdH0vJHthcHAudHNjb25maWcgfHwgZGVmYXVsdHMudHNDb25maWd9YCxcbiAgICAgICAgLi4uKGFwcC5iYXNlSHJlZiA/IHsgYmFzZUhyZWY6IGFwcC5iYXNlSHJlZiB9IDoge30pLFxuICAgICAgICAuLi5idWlsZERlZmF1bHRzLFxuICAgICAgfTtcblxuICAgICAgaWYgKGFwcC5wb2x5ZmlsbHMpIHtcbiAgICAgICAgYnVpbGRPcHRpb25zLnBvbHlmaWxscyA9IGFwcFJvb3QgKyAnLycgKyBhcHAucG9seWZpbGxzO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXBwLnN0eWxlUHJlcHJvY2Vzc29yT3B0aW9uc1xuICAgICAgICAgICYmIGFwcC5zdHlsZVByZXByb2Nlc3Nvck9wdGlvbnMuaW5jbHVkZVBhdGhzXG4gICAgICAgICAgJiYgQXJyYXkuaXNBcnJheShhcHAuc3R5bGVQcmVwcm9jZXNzb3JPcHRpb25zLmluY2x1ZGVQYXRocylcbiAgICAgICAgICAmJiBhcHAuc3R5bGVQcmVwcm9jZXNzb3JPcHRpb25zLmluY2x1ZGVQYXRocy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGJ1aWxkT3B0aW9ucy5zdHlsZVByZXByb2Nlc3Nvck9wdGlvbnMgPSB7XG4gICAgICAgICAgaW5jbHVkZVBhdGhzOiBhcHAuc3R5bGVQcmVwcm9jZXNzb3JPcHRpb25zLmluY2x1ZGVQYXRoc1xuICAgICAgICAgICAgLm1hcChpbmNsdWRlUGF0aCA9PiBqb2luKGFwcC5yb290IGFzIFBhdGgsIGluY2x1ZGVQYXRoKSksXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGJ1aWxkT3B0aW9ucy5hc3NldHMgPSAoYXBwLmFzc2V0cyB8fCBbXSkubWFwKF9tYXBBc3NldHMpLmZpbHRlcih4ID0+ICEheCk7XG4gICAgICBidWlsZE9wdGlvbnMuc3R5bGVzID0gKGFwcC5zdHlsZXMgfHwgW10pLm1hcChfZXh0cmFFbnRyeU1hcHBlcik7XG4gICAgICBidWlsZE9wdGlvbnMuc2NyaXB0cyA9IChhcHAuc2NyaXB0cyB8fCBbXSkubWFwKF9leHRyYUVudHJ5TWFwcGVyKTtcbiAgICAgIGFyY2hpdGVjdC5idWlsZCA9IHtcbiAgICAgICAgYnVpbGRlcjogYCR7YnVpbGRlclBhY2thZ2V9OmJyb3dzZXJgLFxuICAgICAgICBvcHRpb25zOiBidWlsZE9wdGlvbnMsXG4gICAgICAgIGNvbmZpZ3VyYXRpb25zOiBfYnVpbGRDb25maWd1cmF0aW9ucygpLFxuICAgICAgfTtcblxuICAgICAgLy8gU2VydmUgdGFyZ2V0XG4gICAgICBjb25zdCBzZXJ2ZU9wdGlvbnM6IEpzb25PYmplY3QgPSB7XG4gICAgICAgIGJyb3dzZXJUYXJnZXQ6IGAke25hbWV9OmJ1aWxkYCxcbiAgICAgICAgLi4uc2VydmVEZWZhdWx0cyxcbiAgICAgIH07XG4gICAgICBhcmNoaXRlY3Quc2VydmUgPSB7XG4gICAgICAgIGJ1aWxkZXI6IGAke2J1aWxkZXJQYWNrYWdlfTpkZXYtc2VydmVyYCxcbiAgICAgICAgb3B0aW9uczogc2VydmVPcHRpb25zLFxuICAgICAgICBjb25maWd1cmF0aW9uczogX3NlcnZlQ29uZmlndXJhdGlvbnMoKSxcbiAgICAgIH07XG5cbiAgICAgIC8vIEV4dHJhY3QgdGFyZ2V0XG4gICAgICBjb25zdCBleHRyYWN0STE4bk9wdGlvbnM6IEpzb25PYmplY3QgPSB7IGJyb3dzZXJUYXJnZXQ6IGAke25hbWV9OmJ1aWxkYCB9O1xuICAgICAgYXJjaGl0ZWN0WydleHRyYWN0LWkxOG4nXSA9IHtcbiAgICAgICAgYnVpbGRlcjogYCR7YnVpbGRlclBhY2thZ2V9OmV4dHJhY3QtaTE4bmAsXG4gICAgICAgIG9wdGlvbnM6IGV4dHJhY3RJMThuT3B0aW9ucyxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGthcm1hQ29uZmlnID0gY29uZmlnLnRlc3QgJiYgY29uZmlnLnRlc3Qua2FybWFcbiAgICAgICAgICA/IGNvbmZpZy50ZXN0Lmthcm1hLmNvbmZpZyB8fCAnJ1xuICAgICAgICAgIDogJyc7XG4gICAgICAgIC8vIFRlc3QgdGFyZ2V0XG4gICAgICBjb25zdCB0ZXN0T3B0aW9uczogSnNvbk9iamVjdCA9IHtcbiAgICAgICAgICBtYWluOiBhcHBSb290ICsgJy8nICsgYXBwLnRlc3QgfHwgZGVmYXVsdHMudGVzdCxcbiAgICAgICAgICAvLyBNYWtlIGthcm1hQ29uZmlnIHJlbGF0aXZlIHRvIHJvb3QuXG4gICAgICAgICAga2FybWFDb25maWcsXG4gICAgICAgIH07XG5cbiAgICAgIGlmIChhcHAucG9seWZpbGxzKSB7XG4gICAgICAgIHRlc3RPcHRpb25zLnBvbHlmaWxscyA9IGFwcFJvb3QgKyAnLycgKyBhcHAucG9seWZpbGxzO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXBwLnRlc3RUc2NvbmZpZykge1xuICAgICAgICAgIHRlc3RPcHRpb25zLnRzQ29uZmlnID0gYXBwUm9vdCArICcvJyArIGFwcC50ZXN0VHNjb25maWc7XG4gICAgICAgIH1cbiAgICAgIHRlc3RPcHRpb25zLnNjcmlwdHMgPSAoYXBwLnNjcmlwdHMgfHwgW10pLm1hcChfZXh0cmFFbnRyeU1hcHBlcik7XG4gICAgICB0ZXN0T3B0aW9ucy5zdHlsZXMgPSAoYXBwLnN0eWxlcyB8fCBbXSkubWFwKF9leHRyYUVudHJ5TWFwcGVyKTtcbiAgICAgIHRlc3RPcHRpb25zLmFzc2V0cyA9IChhcHAuYXNzZXRzIHx8IFtdKS5tYXAoX21hcEFzc2V0cykuZmlsdGVyKHggPT4gISF4KTtcblxuICAgICAgaWYgKGthcm1hQ29uZmlnKSB7XG4gICAgICAgIGFyY2hpdGVjdC50ZXN0ID0ge1xuICAgICAgICAgIGJ1aWxkZXI6IGAke2J1aWxkZXJQYWNrYWdlfTprYXJtYWAsXG4gICAgICAgICAgb3B0aW9uczogdGVzdE9wdGlvbnMsXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRzQ29uZmlnczogc3RyaW5nW10gPSBbXTtcbiAgICAgIGNvbnN0IGV4Y2x1ZGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgbGV0IHdhcm5Gb3JMaW50ID0gZmFsc2U7XG4gICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5saW50ICYmIEFycmF5LmlzQXJyYXkoY29uZmlnLmxpbnQpKSB7XG4gICAgICAgIGNvbmZpZy5saW50LmZvckVhY2gobGludCA9PiB7XG4gICAgICAgICAgaWYgKGxpbnQucHJvamVjdCkge1xuICAgICAgICAgICAgdHNDb25maWdzLnB1c2gobGludC5wcm9qZWN0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2FybkZvckxpbnQgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChsaW50LmV4Y2x1ZGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbGludC5leGNsdWRlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBleGNsdWRlcy5wdXNoKGxpbnQuZXhjbHVkZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsaW50LmV4Y2x1ZGUuZm9yRWFjaChleCA9PiBleGNsdWRlcy5wdXNoKGV4KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHdhcm5Gb3JMaW50KSB7XG4gICAgICAgIGxvZ2dlci53YXJuKGBcbiAgICAgICAgICBMaW50IHdpdGhvdXQgJ3Byb2plY3QnIHdhcyBub3QgbWlncmF0ZWQgd2hpY2ggaXMgbm90IHN1cHBvcnRlZCBpbiBBbmd1bGFyIENMSSA2LlxuICAgICAgICBgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVtb3ZlRHVwZXMgPSAoaXRlbXM6IHN0cmluZ1tdKSA9PiBpdGVtcy5yZWR1Y2UoKG5ld0l0ZW1zLCBpdGVtKSA9PiB7XG4gICAgICAgIGlmIChuZXdJdGVtcy5pbmRleE9mKGl0ZW0pID09PSAtMSkge1xuICAgICAgICAgIG5ld0l0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3SXRlbXM7XG4gICAgICB9LCA8c3RyaW5nW10+IFtdKTtcblxuICAgICAgICAvLyBUc2xpbnQgdGFyZ2V0XG4gICAgICBjb25zdCBsaW50T3B0aW9uczogSnNvbk9iamVjdCA9IHtcbiAgICAgICAgdHNDb25maWc6IHJlbW92ZUR1cGVzKHRzQ29uZmlncykuZmlsdGVyKHQgPT4gdC5pbmRleE9mKCdlMmUnKSA9PT0gLTEpLFxuICAgICAgICBleGNsdWRlOiByZW1vdmVEdXBlcyhleGNsdWRlcyksXG4gICAgICB9O1xuICAgICAgYXJjaGl0ZWN0LmxpbnQgPSB7XG4gICAgICAgICAgYnVpbGRlcjogYCR7YnVpbGRlclBhY2thZ2V9OnRzbGludGAsXG4gICAgICAgICAgb3B0aW9uczogbGludE9wdGlvbnMsXG4gICAgICAgIH07XG5cbiAgICAgIC8vIHNlcnZlciB0YXJnZXRcbiAgICAgIGNvbnN0IHNlcnZlckFwcCA9IHNlcnZlckFwcHNcbiAgICAgICAgLmZpbHRlcihzZXJ2ZXJBcHAgPT4gYXBwLnJvb3QgPT09IHNlcnZlckFwcC5yb290ICYmIGFwcC5pbmRleCA9PT0gc2VydmVyQXBwLmluZGV4KVswXTtcblxuICAgICAgaWYgKHNlcnZlckFwcCkge1xuICAgICAgICBjb25zdCBzZXJ2ZXJPcHRpb25zOiBKc29uT2JqZWN0ID0ge1xuICAgICAgICAgIG91dHB1dFBhdGg6IHNlcnZlckFwcC5vdXREaXIgfHwgZGVmYXVsdHMuc2VydmVyT3V0RGlyLFxuICAgICAgICAgIG1haW46IHNlcnZlckFwcC5tYWluIHx8IGRlZmF1bHRzLnNlcnZlck1haW4sXG4gICAgICAgICAgdHNDb25maWc6IHNlcnZlckFwcC50c2NvbmZpZyB8fCBkZWZhdWx0cy5zZXJ2ZXJUc0NvbmZpZyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VydmVyVGFyZ2V0OiBKc29uT2JqZWN0ID0ge1xuICAgICAgICAgIGJ1aWxkZXI6ICdAYW5ndWxhci1kZXZraXQvYnVpbGQtYW5ndWxhcjpzZXJ2ZXInLFxuICAgICAgICAgIG9wdGlvbnM6IHNlcnZlck9wdGlvbnMsXG4gICAgICAgIH07XG4gICAgICAgIGFyY2hpdGVjdC5zZXJ2ZXIgPSBzZXJ2ZXJUYXJnZXQ7XG4gICAgICB9XG4gICAgICBjb25zdCBlMmVQcm9qZWN0OiBKc29uT2JqZWN0ID0ge1xuICAgICAgICByb290OiBqb2luKHByb2plY3RSb290LCAnZTJlJyksXG4gICAgICAgIHNvdXJjZVJvb3Q6IGpvaW4ocHJvamVjdFJvb3QsICdlMmUnKSxcbiAgICAgICAgcHJvamVjdFR5cGU6ICdhcHBsaWNhdGlvbicsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBlMmVBcmNoaXRlY3Q6IEpzb25PYmplY3QgPSB7fTtcblxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgY29uc3QgcHJvdHJhY3RvckNvbmZpZyA9IGNvbmZpZyAmJiBjb25maWcuZTJlICYmIGNvbmZpZy5lMmUucHJvdHJhY3RvciAmJiBjb25maWcuZTJlLnByb3RyYWN0b3IuY29uZmlnXG4gICAgICAgID8gY29uZmlnLmUyZS5wcm90cmFjdG9yLmNvbmZpZ1xuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgZTJlT3B0aW9uczogSnNvbk9iamVjdCA9IHtcbiAgICAgICAgcHJvdHJhY3RvckNvbmZpZzogcHJvdHJhY3RvckNvbmZpZyxcbiAgICAgICAgZGV2U2VydmVyVGFyZ2V0OiBgJHtuYW1lfTpzZXJ2ZWAsXG4gICAgICB9O1xuICAgICAgY29uc3QgZTJlVGFyZ2V0OiBKc29uT2JqZWN0ID0ge1xuICAgICAgICBidWlsZGVyOiBgJHtidWlsZGVyUGFja2FnZX06cHJvdHJhY3RvcmAsXG4gICAgICAgIG9wdGlvbnM6IGUyZU9wdGlvbnMsXG4gICAgICB9O1xuXG4gICAgICBlMmVBcmNoaXRlY3QuZTJlID0gZTJlVGFyZ2V0O1xuICAgICAgY29uc3QgZTJlTGludE9wdGlvbnM6IEpzb25PYmplY3QgPSB7XG4gICAgICAgIHRzQ29uZmlnOiByZW1vdmVEdXBlcyh0c0NvbmZpZ3MpLmZpbHRlcih0ID0+IHQuaW5kZXhPZignZTJlJykgIT09IC0xKSxcbiAgICAgICAgZXhjbHVkZTogcmVtb3ZlRHVwZXMoZXhjbHVkZXMpLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGUyZUxpbnRUYXJnZXQ6IEpzb25PYmplY3QgPSB7XG4gICAgICAgIGJ1aWxkZXI6IGAke2J1aWxkZXJQYWNrYWdlfTp0c2xpbnRgLFxuICAgICAgICBvcHRpb25zOiBlMmVMaW50T3B0aW9ucyxcbiAgICAgIH07XG4gICAgICBlMmVBcmNoaXRlY3QubGludCA9IGUyZUxpbnRUYXJnZXQ7XG4gICAgICBpZiAocHJvdHJhY3RvckNvbmZpZykge1xuICAgICAgICBlMmVQcm9qZWN0LmFyY2hpdGVjdCA9IGUyZUFyY2hpdGVjdDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgbmFtZSwgcHJvamVjdCwgZTJlUHJvamVjdCB9O1xuICAgIH0pXG4gICAgLnJlZHVjZSgocHJvamVjdHMsIG1hcHBlZEFwcCkgPT4ge1xuICAgICAgY29uc3Qge25hbWUsIHByb2plY3QsIGUyZVByb2plY3R9ID0gbWFwcGVkQXBwO1xuICAgICAgcHJvamVjdHNbbmFtZV0gPSBwcm9qZWN0O1xuICAgICAgcHJvamVjdHNbbmFtZSArICctZTJlJ10gPSBlMmVQcm9qZWN0O1xuXG4gICAgICByZXR1cm4gcHJvamVjdHM7XG4gICAgfSwge30gYXMgSnNvbk9iamVjdCk7XG5cbiAgcmV0dXJuIHByb2plY3RNYXA7XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBcHBOYW1lUHJlZml4KGNvbmZpZzogQ2xpQ29uZmlnKSB7XG4gIGxldCBkZWZhdWx0QXBwTmFtZVByZWZpeCA9ICdhcHAnO1xuICBpZiAoY29uZmlnLnByb2plY3QgJiYgY29uZmlnLnByb2plY3QubmFtZSkge1xuICAgIGRlZmF1bHRBcHBOYW1lUHJlZml4ID0gY29uZmlnLnByb2plY3QubmFtZTtcbiAgfVxuXG4gIHJldHVybiBkZWZhdWx0QXBwTmFtZVByZWZpeDtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdERlZmF1bHRQcm9qZWN0KGNvbmZpZzogQ2xpQ29uZmlnKTogc3RyaW5nIHwgbnVsbCB7XG4gIGlmIChjb25maWcuYXBwcyAmJiBjb25maWcuYXBwc1swXSkge1xuICAgIGNvbnN0IGFwcCA9IGNvbmZpZy5hcHBzWzBdO1xuICAgIGNvbnN0IGRlZmF1bHRBcHBOYW1lID0gZ2V0RGVmYXVsdEFwcE5hbWVQcmVmaXgoY29uZmlnKTtcbiAgICBjb25zdCBuYW1lID0gYXBwLm5hbWUgfHwgZGVmYXVsdEFwcE5hbWU7XG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVTcGVjVHNDb25maWcoY29uZmlnOiBDbGlDb25maWcpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgY29uc3QgYXBwcyA9IGNvbmZpZy5hcHBzIHx8IFtdO1xuICAgIGFwcHMuZm9yRWFjaCgoYXBwOiBBcHBDb25maWcsIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCB0ZXN0VHNDb25maWcgPSBhcHAudGVzdFRzY29uZmlnIHx8IGRlZmF1bHRzLnRlc3RUc0NvbmZpZztcbiAgICAgIGNvbnN0IHRzU3BlY0NvbmZpZ1BhdGggPSBqb2luKG5vcm1hbGl6ZShhcHAucm9vdCB8fCAnJyksIHRlc3RUc0NvbmZpZyk7XG4gICAgICBjb25zdCBidWZmZXIgPSBob3N0LnJlYWQodHNTcGVjQ29uZmlnUGF0aCk7XG5cbiAgICAgIGlmICghYnVmZmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuXG4gICAgICBjb25zdCB0c0NmZ0FzdCA9IHBhcnNlSnNvbkFzdChidWZmZXIudG9TdHJpbmcoKSwgSnNvblBhcnNlTW9kZS5Mb29zZSk7XG4gICAgICBpZiAodHNDZmdBc3Qua2luZCAhPSAnb2JqZWN0Jykge1xuICAgICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbignSW52YWxpZCB0c2NvbmZpZy4gV2FzIGV4cGVjdGluZyBhbiBvYmplY3QnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmlsZXNBc3ROb2RlID0gZmluZFByb3BlcnR5SW5Bc3RPYmplY3QodHNDZmdBc3QsICdmaWxlcycpO1xuICAgICAgaWYgKGZpbGVzQXN0Tm9kZSAmJiBmaWxlc0FzdE5vZGUua2luZCAhPSAnYXJyYXknKSB7XG4gICAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKCdJbnZhbGlkIHRzY29uZmlnIFwiZmlsZXNcIiBwcm9wZXJ0eTsgZXhwZWN0ZWQgYW4gYXJyYXkuJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZSh0c1NwZWNDb25maWdQYXRoKTtcblxuICAgICAgY29uc3QgcG9seWZpbGxzID0gYXBwLnBvbHlmaWxscyB8fCBkZWZhdWx0cy5wb2x5ZmlsbHM7XG4gICAgICBpZiAoIWZpbGVzQXN0Tm9kZSkge1xuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHRoZSBmaWxlcyBhcnJheSBkb2VzIG5vdCBleGlzdC4gVGhpcyBtZWFucyBleGNsdWRlIG9yIGluY2x1ZGUgYXJlXG4gICAgICAgIC8vIHNldCBhbmQgd2Ugc2hvdWxkbid0IG1lc3Mgd2l0aCB0aGF0LlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZpbGVzQXN0Tm9kZS52YWx1ZS5pbmRleE9mKHBvbHlmaWxscykgPT0gLTEpIHtcbiAgICAgICAgICBhcHBlbmRWYWx1ZUluQXN0QXJyYXkocmVjb3JkZXIsIGZpbGVzQXN0Tm9kZSwgcG9seWZpbGxzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVBhY2thZ2VKc29uKGNvbmZpZzogQ2xpQ29uZmlnKSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IGRlcGVuZGVuY3k6IE5vZGVEZXBlbmRlbmN5ID0ge1xuICAgICAgdHlwZTogTm9kZURlcGVuZGVuY3lUeXBlLkRldixcbiAgICAgIG5hbWU6ICdAYW5ndWxhci1kZXZraXQvYnVpbGQtYW5ndWxhcicsXG4gICAgICB2ZXJzaW9uOiBsYXRlc3RWZXJzaW9ucy5EZXZraXRCdWlsZEFuZ3VsYXIsXG4gICAgICBvdmVyd3JpdGU6IHRydWUsXG4gICAgfTtcbiAgICBhZGRQYWNrYWdlSnNvbkRlcGVuZGVuY3koaG9zdCwgZGVwZW5kZW5jeSk7XG5cbiAgICBjb250ZXh0LmFkZFRhc2sobmV3IE5vZGVQYWNrYWdlSW5zdGFsbFRhc2soe1xuICAgICAgcGFja2FnZU1hbmFnZXI6IGNvbmZpZy5wYWNrYWdlTWFuYWdlciA9PT0gJ2RlZmF1bHQnID8gdW5kZWZpbmVkIDogY29uZmlnLnBhY2thZ2VNYW5hZ2VyLFxuICAgIH0pKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUc0xpbnRDb25maWcoKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHRzTGludFBhdGggPSAnL3RzbGludC5qc29uJztcbiAgICBjb25zdCBidWZmZXIgPSBob3N0LnJlYWQodHNMaW50UGF0aCk7XG4gICAgaWYgKCFidWZmZXIpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cbiAgICBjb25zdCB0c0NmZ0FzdCA9IHBhcnNlSnNvbkFzdChidWZmZXIudG9TdHJpbmcoKSwgSnNvblBhcnNlTW9kZS5Mb29zZSk7XG5cbiAgICBpZiAodHNDZmdBc3Qua2luZCAhPSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxuXG4gICAgY29uc3QgcnVsZXNOb2RlID0gZmluZFByb3BlcnR5SW5Bc3RPYmplY3QodHNDZmdBc3QsICdydWxlcycpO1xuICAgIGlmICghcnVsZXNOb2RlIHx8IHJ1bGVzTm9kZS5raW5kICE9ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gaG9zdDtcbiAgICB9XG5cbiAgICBjb25zdCBpbXBvcnRCbGFja2xpc3ROb2RlID0gZmluZFByb3BlcnR5SW5Bc3RPYmplY3QocnVsZXNOb2RlLCAnaW1wb3J0LWJsYWNrbGlzdCcpO1xuICAgIGlmICghaW1wb3J0QmxhY2tsaXN0Tm9kZSB8fCBpbXBvcnRCbGFja2xpc3ROb2RlLmtpbmQgIT0gJ2FycmF5Jykge1xuICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxuXG4gICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKHRzTGludFBhdGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1wb3J0QmxhY2tsaXN0Tm9kZS5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGltcG9ydEJsYWNrbGlzdE5vZGUuZWxlbWVudHNbaV07XG4gICAgICBpZiAoZWxlbWVudC5raW5kID09ICdzdHJpbmcnICYmIGVsZW1lbnQudmFsdWUgPT0gJ3J4anMnKSB7XG4gICAgICAgIGNvbnN0IHsgc3RhcnQsIGVuZCB9ID0gZWxlbWVudDtcbiAgICAgICAgLy8gUmVtb3ZlIHRoaXMgZWxlbWVudC5cbiAgICAgICAgaWYgKGkgPT0gaW1wb3J0QmxhY2tsaXN0Tm9kZS5lbGVtZW50cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgLy8gTGFzdCBlbGVtZW50LlxuICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgLy8gTm90IGZpcnN0LCB0aGVyZSdzIGEgY29tbWEgdG8gcmVtb3ZlIGJlZm9yZS5cbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzID0gaW1wb3J0QmxhY2tsaXN0Tm9kZS5lbGVtZW50c1tpIC0gMV07XG4gICAgICAgICAgICByZWNvcmRlci5yZW1vdmUocHJldmlvdXMuZW5kLm9mZnNldCwgZW5kLm9mZnNldCAtIHByZXZpb3VzLmVuZC5vZmZzZXQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBPbmx5IGVsZW1lbnQsIGp1c3QgcmVtb3ZlIHRoZSB3aG9sZSBydWxlLlxuICAgICAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSBpbXBvcnRCbGFja2xpc3ROb2RlO1xuICAgICAgICAgICAgcmVjb3JkZXIucmVtb3ZlKHN0YXJ0Lm9mZnNldCwgZW5kLm9mZnNldCAtIHN0YXJ0Lm9mZnNldCk7XG4gICAgICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KHN0YXJ0Lm9mZnNldCwgJ1tdJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE1pZGRsZSwganVzdCByZW1vdmUgdGhlIHdob2xlIG5vZGUgKHVwIHRvIG5leHQgbm9kZSBzdGFydCkuXG4gICAgICAgICAgY29uc3QgbmV4dCA9IGltcG9ydEJsYWNrbGlzdE5vZGUuZWxlbWVudHNbaSArIDFdO1xuICAgICAgICAgIHJlY29yZGVyLnJlbW92ZShzdGFydC5vZmZzZXQsIG5leHQuc3RhcnQub2Zmc2V0IC0gc3RhcnQub2Zmc2V0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5mdW5jdGlvbiB1cGRhdGVSb290VHNDb25maWcoKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHRzQ29uZmlnUGF0aCA9ICcvdHNjb25maWcuanNvbic7XG4gICAgY29uc3QgYnVmZmVyID0gaG9zdC5yZWFkKHRzQ29uZmlnUGF0aCk7XG4gICAgaWYgKCFidWZmZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0c0NmZ0FzdCA9IHBhcnNlSnNvbkFzdChidWZmZXIudG9TdHJpbmcoKSwgSnNvblBhcnNlTW9kZS5Mb29zZSk7XG4gICAgaWYgKHRzQ2ZnQXN0LmtpbmQgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbignSW52YWxpZCByb290IHRzY29uZmlnLiBXYXMgZXhwZWN0aW5nIGFuIG9iamVjdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBpbGVyT3B0aW9uc0FzdE5vZGUgPSBmaW5kUHJvcGVydHlJbkFzdE9iamVjdCh0c0NmZ0FzdCwgJ2NvbXBpbGVyT3B0aW9ucycpO1xuICAgIGlmICghY29tcGlsZXJPcHRpb25zQXN0Tm9kZSB8fCBjb21waWxlck9wdGlvbnNBc3ROb2RlLmtpbmQgIT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKFxuICAgICAgICAnSW52YWxpZCByb290IHRzY29uZmlnIFwiY29tcGlsZXJPcHRpb25zXCIgcHJvcGVydHk7IGV4cGVjdGVkIGFuIG9iamVjdC4nLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBmaW5kUHJvcGVydHlJbkFzdE9iamVjdChjb21waWxlck9wdGlvbnNBc3ROb2RlLCAnYmFzZVVybCcpICYmXG4gICAgICBmaW5kUHJvcGVydHlJbkFzdE9iamVjdChjb21waWxlck9wdGlvbnNBc3ROb2RlLCAnbW9kdWxlJylcbiAgICApIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBpbGVyT3B0aW9ucyA9IGNvbXBpbGVyT3B0aW9uc0FzdE5vZGUudmFsdWU7XG4gICAgY29uc3QgeyBiYXNlVXJsID0gJy4vJywgbW9kdWxlID0gJ2VzMjAxNSd9ID0gY29tcGlsZXJPcHRpb25zO1xuXG4gICAgY29uc3QgdmFsaWRCYXNlVXJsID0gWycuLycsICcnLCAnLiddO1xuICAgIGlmICghdmFsaWRCYXNlVXJsLmluY2x1ZGVzKGJhc2VVcmwgYXMgc3RyaW5nKSkge1xuICAgICAgY29uc3QgZm9ybWF0dGVkQmFzZVVybCA9IHZhbGlkQmFzZVVybC5tYXAoeCA9PiBgJyR7eH0nYCkuam9pbignLCAnKTtcbiAgICAgIGNvbnRleHQubG9nZ2VyLndhcm4odGFncy5vbmVMaW5lXG4gICAgICAgIGBSb290IHRzY29uZmlnIG9wdGlvbiAnYmFzZVVybCcgaXMgbm90IG9uZSBvZjogJHtmb3JtYXR0ZWRCYXNlVXJsfS5cbiAgICAgICAgVGhpcyBtaWdodCBjYXVzZSB1bmV4cGVjdGVkIGJlaGF2aW91ciB3aGVuIGdlbmVyYXRpbmcgbGlicmFyaWVzLmAsXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChtb2R1bGUgIT09ICdlczIwMTUnKSB7XG4gICAgICBjb250ZXh0LmxvZ2dlci53YXJuKFxuICAgICAgICBgUm9vdCB0c2NvbmZpZyBvcHRpb24gJ21vZHVsZScgaXMgbm90ICdlczIwMTUnLiBUaGlzIG1pZ2h0IGNhdXNlIHVuZXhwZWN0ZWQgYmVoYXZpb3VyLmAsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbXBpbGVyT3B0aW9ucy5tb2R1bGUgPSBtb2R1bGU7XG4gICAgY29tcGlsZXJPcHRpb25zLmJhc2VVcmwgPSBiYXNlVXJsO1xuXG4gICAgaG9zdC5vdmVyd3JpdGUodHNDb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeSh0c0NmZ0FzdC52YWx1ZSwgbnVsbCwgMikpO1xuXG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgaWYgKGhvc3QuZXhpc3RzKCcvLmFuZ3VsYXIuanNvbicpIHx8IGhvc3QuZXhpc3RzKCcvYW5ndWxhci5qc29uJykpIHtcbiAgICAgIGNvbnRleHQubG9nZ2VyLmluZm8oJ0ZvdW5kIGEgbW9kZXJuIGNvbmZpZ3VyYXRpb24gZmlsZS4gTm90aGluZyB0byBiZSBkb25lLicpO1xuXG4gICAgICByZXR1cm4gaG9zdDtcbiAgICB9XG5cbiAgICBjb25zdCBjb25maWdQYXRoID0gZ2V0Q29uZmlnUGF0aChob3N0KTtcbiAgICBjb25zdCBjb25maWdCdWZmZXIgPSBob3N0LnJlYWQobm9ybWFsaXplKGNvbmZpZ1BhdGgpKTtcbiAgICBpZiAoY29uZmlnQnVmZmVyID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKGBDb3VsZCBub3QgZmluZCBjb25maWd1cmF0aW9uIGZpbGUgKCR7Y29uZmlnUGF0aH0pYCk7XG4gICAgfVxuICAgIGNvbnN0IGNvbmZpZyA9IHBhcnNlSnNvbihjb25maWdCdWZmZXIudG9TdHJpbmcoKSwgSnNvblBhcnNlTW9kZS5Mb29zZSk7XG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZyAhPSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KGNvbmZpZykgfHwgY29uZmlnID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbignSW52YWxpZCBhbmd1bGFyLWNsaS5qc29uIGNvbmZpZ3VyYXRpb247IGV4cGVjdGVkIGFuIG9iamVjdC4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgbWlncmF0ZUthcm1hQ29uZmlndXJhdGlvbihjb25maWcpLFxuICAgICAgbWlncmF0ZUNvbmZpZ3VyYXRpb24oY29uZmlnLCBjb250ZXh0LmxvZ2dlciksXG4gICAgICB1cGRhdGVTcGVjVHNDb25maWcoY29uZmlnKSxcbiAgICAgIHVwZGF0ZVBhY2thZ2VKc29uKGNvbmZpZyksXG4gICAgICB1cGRhdGVSb290VHNDb25maWcoKSxcbiAgICAgIHVwZGF0ZVRzTGludENvbmZpZygpLFxuICAgICAgKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICAgICAgY29udGV4dC5sb2dnZXIud2Fybih0YWdzLm9uZUxpbmVgU29tZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgaGF2ZSBiZWVuIGNoYW5nZWQsXG4gICAgICAgICAgcGxlYXNlIG1ha2Ugc3VyZSB0byB1cGRhdGUgYW55IG5wbSBzY3JpcHRzIHdoaWNoIHlvdSBtYXkgaGF2ZSBtb2RpZmllZC5gKTtcblxuICAgICAgICByZXR1cm4gaG9zdDtcbiAgICAgIH0sXG4gICAgXSk7XG4gIH07XG59XG4iXX0=