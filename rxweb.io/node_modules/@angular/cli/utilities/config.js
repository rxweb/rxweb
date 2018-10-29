"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const node_1 = require("@angular-devkit/core/node");
const fs_1 = require("fs");
const os = require("os");
const path = require("path");
const find_up_1 = require("./find-up");
function getSchemaLocation() {
    return path.join(__dirname, '../lib/config/schema.json');
}
exports.workspaceSchemaPath = getSchemaLocation();
const configNames = ['angular.json', '.angular.json'];
const globalFileName = '.angular-config.json';
function projectFilePath(projectPath) {
    // Find the configuration, either where specified, in the Angular CLI project
    // (if it's in node_modules) or from the current process.
    return (projectPath && find_up_1.findUp(configNames, projectPath))
        || find_up_1.findUp(configNames, process.cwd())
        || find_up_1.findUp(configNames, __dirname);
}
function globalFilePath() {
    const home = os.homedir();
    if (!home) {
        return null;
    }
    const p = path.join(home, globalFileName);
    if (fs_1.existsSync(p)) {
        return p;
    }
    return null;
}
const cachedWorkspaces = new Map();
function getWorkspace(level = 'local') {
    const cached = cachedWorkspaces.get(level);
    if (cached != undefined) {
        return cached;
    }
    const configPath = level === 'local' ? projectFilePath() : globalFilePath();
    if (!configPath) {
        cachedWorkspaces.set(level, null);
        return null;
    }
    const root = core_1.normalize(path.dirname(configPath));
    const file = core_1.normalize(path.basename(configPath));
    const workspace = new core_1.experimental.workspace.Workspace(root, new node_1.NodeJsSyncHost());
    workspace.loadWorkspaceFromHost(file).subscribe();
    cachedWorkspaces.set(level, workspace);
    return workspace;
}
exports.getWorkspace = getWorkspace;
function createGlobalSettings() {
    const home = os.homedir();
    if (!home) {
        throw new Error('No home directory found.');
    }
    const globalPath = path.join(home, globalFileName);
    fs_1.writeFileSync(globalPath, JSON.stringify({ version: 1 }));
    return globalPath;
}
exports.createGlobalSettings = createGlobalSettings;
function getWorkspaceRaw(level = 'local') {
    let configPath = level === 'local' ? projectFilePath() : globalFilePath();
    if (!configPath) {
        if (level === 'global') {
            configPath = createGlobalSettings();
        }
        else {
            return [null, null];
        }
    }
    let content = '';
    new node_1.NodeJsSyncHost().read(core_1.normalize(configPath))
        .subscribe(data => content = core_1.virtualFs.fileBufferToString(data));
    const ast = core_1.parseJsonAst(content, core_1.JsonParseMode.Loose);
    if (ast.kind != 'object') {
        throw new Error('Invalid JSON');
    }
    return [ast, configPath];
}
exports.getWorkspaceRaw = getWorkspaceRaw;
function validateWorkspace(json) {
    const workspace = new core_1.experimental.workspace.Workspace(core_1.normalize('.'), new node_1.NodeJsSyncHost());
    let error;
    workspace.loadWorkspaceFromJson(json).subscribe({
        error: e => error = e,
    });
    if (error) {
        throw error;
    }
    return true;
}
exports.validateWorkspace = validateWorkspace;
function getProjectByCwd(workspace) {
    try {
        return workspace.getProjectByPath(core_1.normalize(process.cwd()));
    }
    catch (e) {
        if (e instanceof core_1.experimental.workspace.AmbiguousProjectPathException) {
            return workspace.getDefaultProjectName();
        }
        throw e;
    }
}
function getPackageManager() {
    let workspace = getWorkspace('local');
    if (workspace) {
        const project = getProjectByCwd(workspace);
        if (project && workspace.getProjectCli(project)) {
            const value = workspace.getProjectCli(project)['packageManager'];
            if (typeof value == 'string') {
                return value;
            }
        }
        if (workspace.getCli()) {
            const value = workspace.getCli()['packageManager'];
            if (typeof value == 'string') {
                return value;
            }
        }
    }
    workspace = getWorkspace('global');
    if (workspace && workspace.getCli()) {
        const value = workspace.getCli()['packageManager'];
        if (typeof value == 'string') {
            return value;
        }
    }
    // Only check legacy if updated workspace is not found.
    if (!workspace) {
        const legacyPackageManager = getLegacyPackageManager();
        if (legacyPackageManager !== null) {
            return legacyPackageManager;
        }
    }
    return 'npm';
}
exports.getPackageManager = getPackageManager;
function migrateLegacyGlobalConfig() {
    const homeDir = os.homedir();
    if (homeDir) {
        const legacyGlobalConfigPath = path.join(homeDir, '.angular-cli.json');
        if (fs_1.existsSync(legacyGlobalConfigPath)) {
            const content = fs_1.readFileSync(legacyGlobalConfigPath, 'utf-8');
            const legacy = core_1.parseJson(content, core_1.JsonParseMode.Loose);
            if (!legacy || typeof legacy != 'object' || Array.isArray(legacy)) {
                return false;
            }
            const cli = {};
            if (legacy.packageManager && typeof legacy.packageManager == 'string'
                && legacy.packageManager !== 'default') {
                cli['packageManager'] = legacy.packageManager;
            }
            if (legacy.defaults && typeof legacy.defaults == 'object' && !Array.isArray(legacy.defaults)
                && legacy.defaults.schematics && typeof legacy.defaults.schematics == 'object'
                && !Array.isArray(legacy.defaults.schematics)
                && typeof legacy.defaults.schematics.collection == 'string') {
                cli['defaultCollection'] = legacy.defaults.schematics.collection;
            }
            if (legacy.warnings && typeof legacy.warnings == 'object'
                && !Array.isArray(legacy.warnings)) {
                const warnings = {};
                if (typeof legacy.warnings.versionMismatch == 'boolean') {
                    warnings['versionMismatch'] = legacy.warnings.versionMismatch;
                }
                if (typeof legacy.warnings.typescriptMismatch == 'boolean') {
                    warnings['typescriptMismatch'] = legacy.warnings.typescriptMismatch;
                }
                if (Object.getOwnPropertyNames(warnings).length > 0) {
                    cli['warnings'] = warnings;
                }
            }
            if (Object.getOwnPropertyNames(cli).length > 0) {
                const globalPath = path.join(homeDir, globalFileName);
                fs_1.writeFileSync(globalPath, JSON.stringify({ version: 1, cli }, null, 2));
                return true;
            }
        }
    }
    return false;
}
exports.migrateLegacyGlobalConfig = migrateLegacyGlobalConfig;
// Fallback, check for packageManager in config file in v1.* global config.
function getLegacyPackageManager() {
    const homeDir = os.homedir();
    if (homeDir) {
        const legacyGlobalConfigPath = path.join(homeDir, '.angular-cli.json');
        if (fs_1.existsSync(legacyGlobalConfigPath)) {
            const content = fs_1.readFileSync(legacyGlobalConfigPath, 'utf-8');
            const legacy = core_1.parseJson(content, core_1.JsonParseMode.Loose);
            if (!legacy || typeof legacy != 'object' || Array.isArray(legacy)) {
                return null;
            }
            if (legacy.packageManager && typeof legacy.packageManager === 'string'
                && legacy.packageManager !== 'default') {
                return legacy.packageManager;
            }
        }
    }
    return null;
}
function getDefaultSchematicCollection() {
    let workspace = getWorkspace('local');
    if (workspace) {
        const project = getProjectByCwd(workspace);
        if (project && workspace.getProjectCli(project)) {
            const value = workspace.getProjectCli(project)['defaultCollection'];
            if (typeof value == 'string') {
                return value;
            }
        }
        if (workspace.getCli()) {
            const value = workspace.getCli()['defaultCollection'];
            if (typeof value == 'string') {
                return value;
            }
        }
    }
    workspace = getWorkspace('global');
    if (workspace && workspace.getCli()) {
        const value = workspace.getCli()['defaultCollection'];
        if (typeof value == 'string') {
            return value;
        }
    }
    return '@schematics/angular';
}
exports.getDefaultSchematicCollection = getDefaultSchematicCollection;
function getSchematicDefaults(collection, schematic, project) {
    let result = {};
    const fullName = `${collection}:${schematic}`;
    let workspace = getWorkspace('global');
    if (workspace && workspace.getSchematics()) {
        const schematicObject = workspace.getSchematics()[fullName];
        if (schematicObject) {
            result = Object.assign({}, result, schematicObject);
        }
        const collectionObject = workspace.getSchematics()[collection];
        if (typeof collectionObject == 'object' && !Array.isArray(collectionObject)) {
            result = Object.assign({}, result, collectionObject[schematic]);
        }
    }
    workspace = getWorkspace('local');
    if (workspace) {
        if (workspace.getSchematics()) {
            const schematicObject = workspace.getSchematics()[fullName];
            if (schematicObject) {
                result = Object.assign({}, result, schematicObject);
            }
            const collectionObject = workspace.getSchematics()[collection];
            if (typeof collectionObject == 'object' && !Array.isArray(collectionObject)) {
                result = Object.assign({}, result, collectionObject[schematic]);
            }
        }
        project = project || getProjectByCwd(workspace);
        if (project && workspace.getProjectSchematics(project)) {
            const schematicObject = workspace.getProjectSchematics(project)[fullName];
            if (schematicObject) {
                result = Object.assign({}, result, schematicObject);
            }
            const collectionObject = workspace.getProjectSchematics(project)[collection];
            if (typeof collectionObject == 'object' && !Array.isArray(collectionObject)) {
                result = Object.assign({}, result, collectionObject[schematic]);
            }
        }
    }
    return result;
}
exports.getSchematicDefaults = getSchematicDefaults;
function isWarningEnabled(warning) {
    let workspace = getWorkspace('local');
    if (workspace) {
        const project = getProjectByCwd(workspace);
        if (project && workspace.getProjectCli(project)) {
            const warnings = workspace.getProjectCli(project)['warnings'];
            if (typeof warnings == 'object' && !Array.isArray(warnings)) {
                const value = warnings[warning];
                if (typeof value == 'boolean') {
                    return value;
                }
            }
        }
        if (workspace.getCli()) {
            const warnings = workspace.getCli()['warnings'];
            if (typeof warnings == 'object' && !Array.isArray(warnings)) {
                const value = warnings[warning];
                if (typeof value == 'boolean') {
                    return value;
                }
            }
        }
    }
    workspace = getWorkspace('global');
    if (workspace && workspace.getCli()) {
        const warnings = workspace.getCli()['warnings'];
        if (typeof warnings == 'object' && !Array.isArray(warnings)) {
            const value = warnings[warning];
            if (typeof value == 'boolean') {
                return value;
            }
        }
    }
    return true;
}
exports.isWarningEnabled = isWarningEnabled;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyL2NsaS91dGlsaXRpZXMvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsK0NBUzhCO0FBQzlCLG9EQUEyRDtBQUMzRCwyQkFBNkQ7QUFDN0QseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3Qix1Q0FBbUM7QUFFbkM7SUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDJCQUEyQixDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUVZLFFBQUEsbUJBQW1CLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztBQUV2RCxNQUFNLFdBQVcsR0FBRyxDQUFFLGNBQWMsRUFBRSxlQUFlLENBQUUsQ0FBQztBQUN4RCxNQUFNLGNBQWMsR0FBRyxzQkFBc0IsQ0FBQztBQUU5Qyx5QkFBeUIsV0FBb0I7SUFDM0MsNkVBQTZFO0lBQzdFLHlEQUF5RDtJQUN6RCxPQUFPLENBQUMsV0FBVyxJQUFJLGdCQUFNLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1dBQ2pELGdCQUFNLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztXQUNsQyxnQkFBTSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRUQ7SUFDRSxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDMUIsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztJQUMxQyxJQUFJLGVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNqQixPQUFPLENBQUMsQ0FBQztLQUNWO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsTUFBTSxn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QUMsQ0FBQztZQUNoQyxJQUFJLE9BQU8sS0FBSyxJQUFJLFNBQVMsRUFBRTtnQkFDN0IsT0FBTyxLQUFLLENBQUM7YUFDZDtTQUNGO0tBQ0Y7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFyQ0QsNENBcUNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBKc29uQXN0T2JqZWN0LFxuICBKc29uT2JqZWN0LFxuICBKc29uUGFyc2VNb2RlLFxuICBleHBlcmltZW50YWwsXG4gIG5vcm1hbGl6ZSxcbiAgcGFyc2VKc29uLFxuICBwYXJzZUpzb25Bc3QsXG4gIHZpcnR1YWxGcyxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgTm9kZUpzU3luY0hvc3QgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZS9ub2RlJztcbmltcG9ydCB7IGV4aXN0c1N5bmMsIHJlYWRGaWxlU3luYywgd3JpdGVGaWxlU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIG9zIGZyb20gJ29zJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBmaW5kVXAgfSBmcm9tICcuL2ZpbmQtdXAnO1xuXG5mdW5jdGlvbiBnZXRTY2hlbWFMb2NhdGlvbigpOiBzdHJpbmcge1xuICByZXR1cm4gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL2xpYi9jb25maWcvc2NoZW1hLmpzb24nKTtcbn1cblxuZXhwb3J0IGNvbnN0IHdvcmtzcGFjZVNjaGVtYVBhdGggPSBnZXRTY2hlbWFMb2NhdGlvbigpO1xuXG5jb25zdCBjb25maWdOYW1lcyA9IFsgJ2FuZ3VsYXIuanNvbicsICcuYW5ndWxhci5qc29uJyBdO1xuY29uc3QgZ2xvYmFsRmlsZU5hbWUgPSAnLmFuZ3VsYXItY29uZmlnLmpzb24nO1xuXG5mdW5jdGlvbiBwcm9qZWN0RmlsZVBhdGgocHJvamVjdFBhdGg/OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgLy8gRmluZCB0aGUgY29uZmlndXJhdGlvbiwgZWl0aGVyIHdoZXJlIHNwZWNpZmllZCwgaW4gdGhlIEFuZ3VsYXIgQ0xJIHByb2plY3RcbiAgLy8gKGlmIGl0J3MgaW4gbm9kZV9tb2R1bGVzKSBvciBmcm9tIHRoZSBjdXJyZW50IHByb2Nlc3MuXG4gIHJldHVybiAocHJvamVjdFBhdGggJiYgZmluZFVwKGNvbmZpZ05hbWVzLCBwcm9qZWN0UGF0aCkpXG4gICAgICB8fCBmaW5kVXAoY29uZmlnTmFtZXMsIHByb2Nlc3MuY3dkKCkpXG4gICAgICB8fCBmaW5kVXAoY29uZmlnTmFtZXMsIF9fZGlybmFtZSk7XG59XG5cbmZ1bmN0aW9uIGdsb2JhbEZpbGVQYXRoKCk6IHN0cmluZyB8IG51bGwge1xuICBjb25zdCBob21lID0gb3MuaG9tZWRpcigpO1xuICBpZiAoIWhvbWUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHAgPSBwYXRoLmpvaW4oaG9tZSwgZ2xvYmFsRmlsZU5hbWUpO1xuICBpZiAoZXhpc3RzU3luYyhwKSkge1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmNvbnN0IGNhY2hlZFdvcmtzcGFjZXMgPSBuZXcgTWFwPHN0cmluZywgZXhwZXJpbWVudGFsLndvcmtzcGFjZS5Xb3Jrc3BhY2UgfCBudWxsPigpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29ya3NwYWNlKFxuICBsZXZlbDogJ2xvY2FsJyB8ICdnbG9iYWwnID0gJ2xvY2FsJyxcbik6IGV4cGVyaW1lbnRhbC53b3Jrc3BhY2UuV29ya3NwYWNlIHwgbnVsbCB7XG4gIGNvbnN0IGNhY2hlZCA9IGNhY2hlZFdvcmtzcGFjZXMuZ2V0KGxldmVsKTtcbiAgaWYgKGNhY2hlZCAhPSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gY2FjaGVkO1xuICB9XG5cbiAgY29uc3QgY29uZmlnUGF0aCA9IGxldmVsID09PSAnbG9jYWwnID8gcHJvamVjdEZpbGVQYXRoKCkgOiBnbG9iYWxGaWxlUGF0aCgpO1xuXG4gIGlmICghY29uZmlnUGF0aCkge1xuICAgIGNhY2hlZFdvcmtzcGFjZXMuc2V0KGxldmVsLCBudWxsKTtcblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qgcm9vdCA9IG5vcm1hbGl6ZShwYXRoLmRpcm5hbWUoY29uZmlnUGF0aCkpO1xuICBjb25zdCBmaWxlID0gbm9ybWFsaXplKHBhdGguYmFzZW5hbWUoY29uZmlnUGF0aCkpO1xuICBjb25zdCB3b3Jrc3BhY2UgPSBuZXcgZXhwZXJpbWVudGFsLndvcmtzcGFjZS5Xb3Jrc3BhY2UoXG4gICAgcm9vdCxcbiAgICBuZXcgTm9kZUpzU3luY0hvc3QoKSxcbiAgKTtcblxuICB3b3Jrc3BhY2UubG9hZFdvcmtzcGFjZUZyb21Ib3N0KGZpbGUpLnN1YnNjcmliZSgpO1xuICBjYWNoZWRXb3Jrc3BhY2VzLnNldChsZXZlbCwgd29ya3NwYWNlKTtcblxuICByZXR1cm4gd29ya3NwYWNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR2xvYmFsU2V0dGluZ3MoKTogc3RyaW5nIHtcbiAgY29uc3QgaG9tZSA9IG9zLmhvbWVkaXIoKTtcbiAgaWYgKCFob21lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBob21lIGRpcmVjdG9yeSBmb3VuZC4nKTtcbiAgfVxuXG4gIGNvbnN0IGdsb2JhbFBhdGggPSBwYXRoLmpvaW4oaG9tZSwgZ2xvYmFsRmlsZU5hbWUpO1xuICB3cml0ZUZpbGVTeW5jKGdsb2JhbFBhdGgsIEpTT04uc3RyaW5naWZ5KHsgdmVyc2lvbjogMSB9KSk7XG5cbiAgcmV0dXJuIGdsb2JhbFBhdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXb3Jrc3BhY2VSYXcoXG4gIGxldmVsOiAnbG9jYWwnIHwgJ2dsb2JhbCcgPSAnbG9jYWwnLFxuKTogW0pzb25Bc3RPYmplY3QgfCBudWxsLCBzdHJpbmcgfCBudWxsXSB7XG4gIGxldCBjb25maWdQYXRoID0gbGV2ZWwgPT09ICdsb2NhbCcgPyBwcm9qZWN0RmlsZVBhdGgoKSA6IGdsb2JhbEZpbGVQYXRoKCk7XG5cbiAgaWYgKCFjb25maWdQYXRoKSB7XG4gICAgaWYgKGxldmVsID09PSAnZ2xvYmFsJykge1xuICAgICAgY29uZmlnUGF0aCA9IGNyZWF0ZUdsb2JhbFNldHRpbmdzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbbnVsbCwgbnVsbF07XG4gICAgfVxuICB9XG5cbiAgbGV0IGNvbnRlbnQgPSAnJztcbiAgbmV3IE5vZGVKc1N5bmNIb3N0KCkucmVhZChub3JtYWxpemUoY29uZmlnUGF0aCkpXG4gICAgLnN1YnNjcmliZShkYXRhID0+IGNvbnRlbnQgPSB2aXJ0dWFsRnMuZmlsZUJ1ZmZlclRvU3RyaW5nKGRhdGEpKTtcblxuICBjb25zdCBhc3QgPSBwYXJzZUpzb25Bc3QoY29udGVudCwgSnNvblBhcnNlTW9kZS5Mb29zZSk7XG5cbiAgaWYgKGFzdC5raW5kICE9ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEpTT04nKTtcbiAgfVxuXG4gIHJldHVybiBbYXN0LCBjb25maWdQYXRoXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlV29ya3NwYWNlKGpzb246IEpzb25PYmplY3QpIHtcbiAgY29uc3Qgd29ya3NwYWNlID0gbmV3IGV4cGVyaW1lbnRhbC53b3Jrc3BhY2UuV29ya3NwYWNlKFxuICAgIG5vcm1hbGl6ZSgnLicpLFxuICAgIG5ldyBOb2RlSnNTeW5jSG9zdCgpLFxuICApO1xuXG4gIGxldCBlcnJvcjtcbiAgd29ya3NwYWNlLmxvYWRXb3Jrc3BhY2VGcm9tSnNvbihqc29uKS5zdWJzY3JpYmUoe1xuICAgIGVycm9yOiBlID0+IGVycm9yID0gZSxcbiAgfSk7XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvamVjdEJ5Q3dkKHdvcmtzcGFjZTogZXhwZXJpbWVudGFsLndvcmtzcGFjZS5Xb3Jrc3BhY2UpOiBzdHJpbmcgfCBudWxsIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd29ya3NwYWNlLmdldFByb2plY3RCeVBhdGgobm9ybWFsaXplKHByb2Nlc3MuY3dkKCkpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgZXhwZXJpbWVudGFsLndvcmtzcGFjZS5BbWJpZ3VvdXNQcm9qZWN0UGF0aEV4Y2VwdGlvbikge1xuICAgICAgcmV0dXJuIHdvcmtzcGFjZS5nZXREZWZhdWx0UHJvamVjdE5hbWUoKTtcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFja2FnZU1hbmFnZXIoKTogc3RyaW5nIHtcbiAgbGV0IHdvcmtzcGFjZSA9IGdldFdvcmtzcGFjZSgnbG9jYWwnKTtcblxuICBpZiAod29ya3NwYWNlKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IGdldFByb2plY3RCeUN3ZCh3b3Jrc3BhY2UpO1xuICAgIGlmIChwcm9qZWN0ICYmIHdvcmtzcGFjZS5nZXRQcm9qZWN0Q2xpKHByb2plY3QpKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHdvcmtzcGFjZS5nZXRQcm9qZWN0Q2xpKHByb2plY3QpWydwYWNrYWdlTWFuYWdlciddO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh3b3Jrc3BhY2UuZ2V0Q2xpKCkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gd29ya3NwYWNlLmdldENsaSgpWydwYWNrYWdlTWFuYWdlciddO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd29ya3NwYWNlID0gZ2V0V29ya3NwYWNlKCdnbG9iYWwnKTtcbiAgaWYgKHdvcmtzcGFjZSAmJiB3b3Jrc3BhY2UuZ2V0Q2xpKCkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHdvcmtzcGFjZS5nZXRDbGkoKVsncGFja2FnZU1hbmFnZXInXTtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLy8gT25seSBjaGVjayBsZWdhY3kgaWYgdXBkYXRlZCB3b3Jrc3BhY2UgaXMgbm90IGZvdW5kLlxuICBpZiAoIXdvcmtzcGFjZSkge1xuICAgIGNvbnN0IGxlZ2FjeVBhY2thZ2VNYW5hZ2VyID0gZ2V0TGVnYWN5UGFja2FnZU1hbmFnZXIoKTtcbiAgICBpZiAobGVnYWN5UGFja2FnZU1hbmFnZXIgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBsZWdhY3lQYWNrYWdlTWFuYWdlcjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gJ25wbSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaWdyYXRlTGVnYWN5R2xvYmFsQ29uZmlnKCk6IGJvb2xlYW4ge1xuICBjb25zdCBob21lRGlyID0gb3MuaG9tZWRpcigpO1xuICBpZiAoaG9tZURpcikge1xuICAgIGNvbnN0IGxlZ2FjeUdsb2JhbENvbmZpZ1BhdGggPSBwYXRoLmpvaW4oaG9tZURpciwgJy5hbmd1bGFyLWNsaS5qc29uJyk7XG4gICAgaWYgKGV4aXN0c1N5bmMobGVnYWN5R2xvYmFsQ29uZmlnUGF0aCkpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSByZWFkRmlsZVN5bmMobGVnYWN5R2xvYmFsQ29uZmlnUGF0aCwgJ3V0Zi04Jyk7XG4gICAgICBjb25zdCBsZWdhY3kgPSBwYXJzZUpzb24oY29udGVudCwgSnNvblBhcnNlTW9kZS5Mb29zZSk7XG4gICAgICBpZiAoIWxlZ2FjeSB8fCB0eXBlb2YgbGVnYWN5ICE9ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkobGVnYWN5KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNsaTogSnNvbk9iamVjdCA9IHt9O1xuXG4gICAgICBpZiAobGVnYWN5LnBhY2thZ2VNYW5hZ2VyICYmIHR5cGVvZiBsZWdhY3kucGFja2FnZU1hbmFnZXIgPT0gJ3N0cmluZydcbiAgICAgICAgICAmJiBsZWdhY3kucGFja2FnZU1hbmFnZXIgIT09ICdkZWZhdWx0Jykge1xuICAgICAgICBjbGlbJ3BhY2thZ2VNYW5hZ2VyJ10gPSBsZWdhY3kucGFja2FnZU1hbmFnZXI7XG4gICAgICB9XG5cbiAgICAgIGlmIChsZWdhY3kuZGVmYXVsdHMgJiYgdHlwZW9mIGxlZ2FjeS5kZWZhdWx0cyA9PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShsZWdhY3kuZGVmYXVsdHMpXG4gICAgICAgICAgJiYgbGVnYWN5LmRlZmF1bHRzLnNjaGVtYXRpY3MgJiYgdHlwZW9mIGxlZ2FjeS5kZWZhdWx0cy5zY2hlbWF0aWNzID09ICdvYmplY3QnXG4gICAgICAgICAgJiYgIUFycmF5LmlzQXJyYXkobGVnYWN5LmRlZmF1bHRzLnNjaGVtYXRpY3MpXG4gICAgICAgICAgJiYgdHlwZW9mIGxlZ2FjeS5kZWZhdWx0cy5zY2hlbWF0aWNzLmNvbGxlY3Rpb24gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgY2xpWydkZWZhdWx0Q29sbGVjdGlvbiddID0gbGVnYWN5LmRlZmF1bHRzLnNjaGVtYXRpY3MuY29sbGVjdGlvbjtcbiAgICAgIH1cblxuICAgICAgaWYgKGxlZ2FjeS53YXJuaW5ncyAmJiB0eXBlb2YgbGVnYWN5Lndhcm5pbmdzID09ICdvYmplY3QnXG4gICAgICAgICAgJiYgIUFycmF5LmlzQXJyYXkobGVnYWN5Lndhcm5pbmdzKSkge1xuXG4gICAgICAgIGNvbnN0IHdhcm5pbmdzOiBKc29uT2JqZWN0ID0ge307XG4gICAgICAgIGlmICh0eXBlb2YgbGVnYWN5Lndhcm5pbmdzLnZlcnNpb25NaXNtYXRjaCA9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICB3YXJuaW5nc1sndmVyc2lvbk1pc21hdGNoJ10gPSBsZWdhY3kud2FybmluZ3MudmVyc2lvbk1pc21hdGNoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbGVnYWN5Lndhcm5pbmdzLnR5cGVzY3JpcHRNaXNtYXRjaCA9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICB3YXJuaW5nc1sndHlwZXNjcmlwdE1pc21hdGNoJ10gPSBsZWdhY3kud2FybmluZ3MudHlwZXNjcmlwdE1pc21hdGNoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdhcm5pbmdzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY2xpWyd3YXJuaW5ncyddID0gd2FybmluZ3M7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGNsaSkubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBnbG9iYWxQYXRoID0gcGF0aC5qb2luKGhvbWVEaXIsIGdsb2JhbEZpbGVOYW1lKTtcbiAgICAgICAgd3JpdGVGaWxlU3luYyhnbG9iYWxQYXRoLCBKU09OLnN0cmluZ2lmeSh7IHZlcnNpb246IDEsIGNsaSB9LCBudWxsLCAyKSk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBGYWxsYmFjaywgY2hlY2sgZm9yIHBhY2thZ2VNYW5hZ2VyIGluIGNvbmZpZyBmaWxlIGluIHYxLiogZ2xvYmFsIGNvbmZpZy5cbmZ1bmN0aW9uIGdldExlZ2FjeVBhY2thZ2VNYW5hZ2VyKCk6IHN0cmluZyB8IG51bGwge1xuICBjb25zdCBob21lRGlyID0gb3MuaG9tZWRpcigpO1xuICBpZiAoaG9tZURpcikge1xuICAgIGNvbnN0IGxlZ2FjeUdsb2JhbENvbmZpZ1BhdGggPSBwYXRoLmpvaW4oaG9tZURpciwgJy5hbmd1bGFyLWNsaS5qc29uJyk7XG4gICAgaWYgKGV4aXN0c1N5bmMobGVnYWN5R2xvYmFsQ29uZmlnUGF0aCkpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSByZWFkRmlsZVN5bmMobGVnYWN5R2xvYmFsQ29uZmlnUGF0aCwgJ3V0Zi04Jyk7XG5cbiAgICAgIGNvbnN0IGxlZ2FjeSA9IHBhcnNlSnNvbihjb250ZW50LCBKc29uUGFyc2VNb2RlLkxvb3NlKTtcbiAgICAgIGlmICghbGVnYWN5IHx8IHR5cGVvZiBsZWdhY3kgIT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShsZWdhY3kpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAobGVnYWN5LnBhY2thZ2VNYW5hZ2VyICYmIHR5cGVvZiBsZWdhY3kucGFja2FnZU1hbmFnZXIgPT09ICdzdHJpbmcnXG4gICAgICAgICAgJiYgbGVnYWN5LnBhY2thZ2VNYW5hZ2VyICE9PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgcmV0dXJuIGxlZ2FjeS5wYWNrYWdlTWFuYWdlcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRTY2hlbWF0aWNDb2xsZWN0aW9uKCk6IHN0cmluZyB7XG4gIGxldCB3b3Jrc3BhY2UgPSBnZXRXb3Jrc3BhY2UoJ2xvY2FsJyk7XG5cbiAgaWYgKHdvcmtzcGFjZSkge1xuICAgIGNvbnN0IHByb2plY3QgPSBnZXRQcm9qZWN0QnlDd2Qod29ya3NwYWNlKTtcbiAgICBpZiAocHJvamVjdCAmJiB3b3Jrc3BhY2UuZ2V0UHJvamVjdENsaShwcm9qZWN0KSkge1xuICAgICAgY29uc3QgdmFsdWUgPSB3b3Jrc3BhY2UuZ2V0UHJvamVjdENsaShwcm9qZWN0KVsnZGVmYXVsdENvbGxlY3Rpb24nXTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAod29ya3NwYWNlLmdldENsaSgpKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHdvcmtzcGFjZS5nZXRDbGkoKVsnZGVmYXVsdENvbGxlY3Rpb24nXTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHdvcmtzcGFjZSA9IGdldFdvcmtzcGFjZSgnZ2xvYmFsJyk7XG4gIGlmICh3b3Jrc3BhY2UgJiYgd29ya3NwYWNlLmdldENsaSgpKSB7XG4gICAgY29uc3QgdmFsdWUgPSB3b3Jrc3BhY2UuZ2V0Q2xpKClbJ2RlZmF1bHRDb2xsZWN0aW9uJ107XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAnQHNjaGVtYXRpY3MvYW5ndWxhcic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2hlbWF0aWNEZWZhdWx0cyhcbiAgY29sbGVjdGlvbjogc3RyaW5nLFxuICBzY2hlbWF0aWM6IHN0cmluZyxcbiAgcHJvamVjdD86IHN0cmluZyB8IG51bGwsXG4pOiB7fSB7XG4gIGxldCByZXN1bHQgPSB7fTtcbiAgY29uc3QgZnVsbE5hbWUgPSBgJHtjb2xsZWN0aW9ufToke3NjaGVtYXRpY31gO1xuXG4gIGxldCB3b3Jrc3BhY2UgPSBnZXRXb3Jrc3BhY2UoJ2dsb2JhbCcpO1xuICBpZiAod29ya3NwYWNlICYmIHdvcmtzcGFjZS5nZXRTY2hlbWF0aWNzKCkpIHtcbiAgICBjb25zdCBzY2hlbWF0aWNPYmplY3QgPSB3b3Jrc3BhY2UuZ2V0U2NoZW1hdGljcygpW2Z1bGxOYW1lXTtcbiAgICBpZiAoc2NoZW1hdGljT2JqZWN0KSB7XG4gICAgICByZXN1bHQgPSB7IC4uLnJlc3VsdCwgLi4uKHNjaGVtYXRpY09iamVjdCBhcyB7fSkgfTtcbiAgICB9XG4gICAgY29uc3QgY29sbGVjdGlvbk9iamVjdCA9IHdvcmtzcGFjZS5nZXRTY2hlbWF0aWNzKClbY29sbGVjdGlvbl07XG4gICAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uT2JqZWN0ID09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb25PYmplY3QpKSB7XG4gICAgICByZXN1bHQgPSB7IC4uLnJlc3VsdCwgLi4uKGNvbGxlY3Rpb25PYmplY3Rbc2NoZW1hdGljXSBhcyB7fSkgfTtcbiAgICB9XG5cbiAgfVxuXG4gIHdvcmtzcGFjZSA9IGdldFdvcmtzcGFjZSgnbG9jYWwnKTtcblxuICBpZiAod29ya3NwYWNlKSB7XG4gICAgaWYgKHdvcmtzcGFjZS5nZXRTY2hlbWF0aWNzKCkpIHtcbiAgICAgIGNvbnN0IHNjaGVtYXRpY09iamVjdCA9IHdvcmtzcGFjZS5nZXRTY2hlbWF0aWNzKClbZnVsbE5hbWVdO1xuICAgICAgaWYgKHNjaGVtYXRpY09iamVjdCkge1xuICAgICAgICByZXN1bHQgPSB7IC4uLnJlc3VsdCwgLi4uKHNjaGVtYXRpY09iamVjdCBhcyB7fSkgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25PYmplY3QgPSB3b3Jrc3BhY2UuZ2V0U2NoZW1hdGljcygpW2NvbGxlY3Rpb25dO1xuICAgICAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uT2JqZWN0ID09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb25PYmplY3QpKSB7XG4gICAgICAgIHJlc3VsdCA9IHsgLi4ucmVzdWx0LCAuLi4oY29sbGVjdGlvbk9iamVjdFtzY2hlbWF0aWNdIGFzIHt9KSB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHByb2plY3QgPSBwcm9qZWN0IHx8IGdldFByb2plY3RCeUN3ZCh3b3Jrc3BhY2UpO1xuICAgIGlmIChwcm9qZWN0ICYmIHdvcmtzcGFjZS5nZXRQcm9qZWN0U2NoZW1hdGljcyhwcm9qZWN0KSkge1xuICAgICAgY29uc3Qgc2NoZW1hdGljT2JqZWN0ID0gd29ya3NwYWNlLmdldFByb2plY3RTY2hlbWF0aWNzKHByb2plY3QpW2Z1bGxOYW1lXTtcbiAgICAgIGlmIChzY2hlbWF0aWNPYmplY3QpIHtcbiAgICAgICAgcmVzdWx0ID0geyAuLi5yZXN1bHQsIC4uLihzY2hlbWF0aWNPYmplY3QgYXMge30pIH07XG4gICAgICB9XG4gICAgICBjb25zdCBjb2xsZWN0aW9uT2JqZWN0ID0gd29ya3NwYWNlLmdldFByb2plY3RTY2hlbWF0aWNzKHByb2plY3QpW2NvbGxlY3Rpb25dO1xuICAgICAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uT2JqZWN0ID09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb25PYmplY3QpKSB7XG4gICAgICAgIHJlc3VsdCA9IHsgLi4ucmVzdWx0LCAuLi4oY29sbGVjdGlvbk9iamVjdFtzY2hlbWF0aWNdIGFzIHt9KSB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1dhcm5pbmdFbmFibGVkKHdhcm5pbmc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBsZXQgd29ya3NwYWNlID0gZ2V0V29ya3NwYWNlKCdsb2NhbCcpO1xuXG4gIGlmICh3b3Jrc3BhY2UpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gZ2V0UHJvamVjdEJ5Q3dkKHdvcmtzcGFjZSk7XG4gICAgaWYgKHByb2plY3QgJiYgd29ya3NwYWNlLmdldFByb2plY3RDbGkocHJvamVjdCkpIHtcbiAgICAgIGNvbnN0IHdhcm5pbmdzID0gd29ya3NwYWNlLmdldFByb2plY3RDbGkocHJvamVjdClbJ3dhcm5pbmdzJ107XG4gICAgICBpZiAodHlwZW9mIHdhcm5pbmdzID09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHdhcm5pbmdzKSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHdhcm5pbmdzW3dhcm5pbmddO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09ICdib29sZWFuJykge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAod29ya3NwYWNlLmdldENsaSgpKSB7XG4gICAgICBjb25zdCB3YXJuaW5ncyA9IHdvcmtzcGFjZS5nZXRDbGkoKVsnd2FybmluZ3MnXTtcbiAgICAgIGlmICh0eXBlb2Ygd2FybmluZ3MgPT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkod2FybmluZ3MpKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gd2FybmluZ3Nbd2FybmluZ107XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd29ya3NwYWNlID0gZ2V0V29ya3NwYWNlKCdnbG9iYWwnKTtcbiAgaWYgKHdvcmtzcGFjZSAmJiB3b3Jrc3BhY2UuZ2V0Q2xpKCkpIHtcbiAgICBjb25zdCB3YXJuaW5ncyA9IHdvcmtzcGFjZS5nZXRDbGkoKVsnd2FybmluZ3MnXTtcbiAgICBpZiAodHlwZW9mIHdhcm5pbmdzID09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHdhcm5pbmdzKSkge1xuICAgICAgY29uc3QgdmFsdWUgPSB3YXJuaW5nc1t3YXJuaW5nXTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cbiJdfQ==