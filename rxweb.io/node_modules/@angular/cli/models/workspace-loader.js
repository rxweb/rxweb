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
const fs = require("fs");
const os_1 = require("os");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const find_up_1 = require("../utilities/find-up");
// TODO: error out instead of returning null when workspace cannot be found.
class WorkspaceLoader {
    constructor(_host) {
        this._host = _host;
        this._workspaceCacheMap = new Map();
        // TODO: add remaining fallbacks.
        this._configFileNames = [
            core_1.normalize('.angular.json'),
            core_1.normalize('angular.json'),
        ];
    }
    loadGlobalWorkspace() {
        return this._getGlobalWorkspaceFilePath().pipe(operators_1.concatMap(globalWorkspacePath => this._loadWorkspaceFromPath(globalWorkspacePath)));
    }
    loadWorkspace(projectPath) {
        return this._getProjectWorkspaceFilePath(projectPath).pipe(operators_1.concatMap(globalWorkspacePath => this._loadWorkspaceFromPath(globalWorkspacePath)));
    }
    // TODO: do this with the host instead of fs.
    _getProjectWorkspaceFilePath(projectPath) {
        // Find the workspace file, either where specified, in the Angular CLI project
        // (if it's in node_modules) or from the current process.
        const workspaceFilePath = (projectPath && find_up_1.findUp(this._configFileNames, projectPath))
            || find_up_1.findUp(this._configFileNames, process.cwd())
            || find_up_1.findUp(this._configFileNames, __dirname);
        if (workspaceFilePath) {
            return rxjs_1.of(core_1.normalize(workspaceFilePath));
        }
        else {
            throw new Error(`Local workspace file ('angular.json') could not be found.`);
        }
    }
    // TODO: do this with the host instead of fs.
    _getGlobalWorkspaceFilePath() {
        for (const fileName of this._configFileNames) {
            const workspaceFilePath = core_1.join(core_1.normalize(os_1.homedir()), fileName);
            if (fs.existsSync(workspaceFilePath)) {
                return rxjs_1.of(core_1.normalize(workspaceFilePath));
            }
        }
        return rxjs_1.of(null);
    }
    _loadWorkspaceFromPath(workspacePath) {
        if (!workspacePath) {
            return rxjs_1.of(null);
        }
        if (this._workspaceCacheMap.has(workspacePath)) {
            return rxjs_1.of(this._workspaceCacheMap.get(workspacePath) || null);
        }
        const workspaceRoot = core_1.dirname(workspacePath);
        const workspaceFileName = core_1.basename(workspacePath);
        const workspace = new core_1.experimental.workspace.Workspace(workspaceRoot, this._host);
        return workspace.loadWorkspaceFromHost(workspaceFileName).pipe(operators_1.tap(workspace => this._workspaceCacheMap.set(workspacePath, workspace)));
    }
}
exports.WorkspaceLoader = WorkspaceLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLWxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhci9jbGkvbW9kZWxzL3dvcmtzcGFjZS1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFFSCwrQ0FROEI7QUFDOUIseUJBQXlCO0FBQ3pCLDJCQUE2QjtBQUM3QiwrQkFBc0M7QUFDdEMsOENBQWdEO0FBQ2hELGtEQUE4QztBQUc5Qyw0RUFBNEU7QUFDNUU7SUFPRSxZQUFvQixLQUFxQjtRQUFyQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQU5qQyx1QkFBa0IsR0FBRyxJQUFJLEdBQUcsRUFBNEMsQ0FBQztRQUNqRixpQ0FBaUM7UUFDekIscUJBQWdCLEdBQUc7WUFDekIsZ0JBQVMsQ0FBQyxlQUFlLENBQUM7WUFDMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7U0FDMUIsQ0FBQztJQUMyQyxDQUFDO0lBRTlDLG1CQUFtQjtRQUNqQixPQUFPLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDLElBQUksQ0FDNUMscUJBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FDbkYsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhLENBQUMsV0FBb0I7UUFDaEMsT0FBTyxJQUFJLENBQUMsNEJBQTRCLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUN4RCxxQkFBUyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUNuRixDQUFDO0lBQ0osQ0FBQztJQUVELDZDQUE2QztJQUNyQyw0QkFBNEIsQ0FBQyxXQUFvQjtRQUN2RCw4RUFBOEU7UUFDOUUseURBQXlEO1FBQ3pELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxXQUFXLElBQUksZ0JBQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUM7ZUFDaEYsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO2VBQzVDLGdCQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTlDLElBQUksaUJBQWlCLEVBQUU7WUFDckIsT0FBTyxTQUFFLENBQUMsZ0JBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQztTQUM5RTtJQUNILENBQUM7SUFFRCw2Q0FBNkM7SUFDckMsMkJBQTJCO1FBQ2pDLEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQzVDLE1BQU0saUJBQWlCLEdBQUcsV0FBSSxDQUFDLGdCQUFTLENBQUMsWUFBTyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUUvRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDcEMsT0FBTyxTQUFFLENBQUMsZ0JBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7YUFDekM7U0FDRjtRQUVELE9BQU8sU0FBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFTyxzQkFBc0IsQ0FBQyxhQUEwQjtRQUN2RCxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLE9BQU8sU0FBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pCO1FBRUQsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzlDLE9BQU8sU0FBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7U0FDL0Q7UUFFRCxNQUFNLGFBQWEsR0FBRyxjQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0MsTUFBTSxpQkFBaUIsR0FBRyxlQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxtQkFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVsRixPQUFPLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FDNUQsZUFBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FDeEUsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWxFRCwwQ0FrRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIFBhdGgsXG4gIGJhc2VuYW1lLFxuICBkaXJuYW1lLFxuICBleHBlcmltZW50YWwsXG4gIGpvaW4sXG4gIG5vcm1hbGl6ZSxcbiAgdmlydHVhbEZzLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBob21lZGlyIH0gZnJvbSAnb3MnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvbmNhdE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZmluZFVwIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2ZpbmQtdXAnO1xuXG5cbi8vIFRPRE86IGVycm9yIG91dCBpbnN0ZWFkIG9mIHJldHVybmluZyBudWxsIHdoZW4gd29ya3NwYWNlIGNhbm5vdCBiZSBmb3VuZC5cbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VMb2FkZXIge1xuICBwcml2YXRlIF93b3Jrc3BhY2VDYWNoZU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBleHBlcmltZW50YWwud29ya3NwYWNlLldvcmtzcGFjZT4oKTtcbiAgLy8gVE9ETzogYWRkIHJlbWFpbmluZyBmYWxsYmFja3MuXG4gIHByaXZhdGUgX2NvbmZpZ0ZpbGVOYW1lcyA9IFtcbiAgICBub3JtYWxpemUoJy5hbmd1bGFyLmpzb24nKSxcbiAgICBub3JtYWxpemUoJ2FuZ3VsYXIuanNvbicpLFxuICBdO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9ob3N0OiB2aXJ0dWFsRnMuSG9zdCkgeyB9XG5cbiAgbG9hZEdsb2JhbFdvcmtzcGFjZSgpOiBPYnNlcnZhYmxlPGV4cGVyaW1lbnRhbC53b3Jrc3BhY2UuV29ya3NwYWNlIHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9nZXRHbG9iYWxXb3Jrc3BhY2VGaWxlUGF0aCgpLnBpcGUoXG4gICAgICBjb25jYXRNYXAoZ2xvYmFsV29ya3NwYWNlUGF0aCA9PiB0aGlzLl9sb2FkV29ya3NwYWNlRnJvbVBhdGgoZ2xvYmFsV29ya3NwYWNlUGF0aCkpLFxuICAgICk7XG4gIH1cblxuICBsb2FkV29ya3NwYWNlKHByb2plY3RQYXRoPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxleHBlcmltZW50YWwud29ya3NwYWNlLldvcmtzcGFjZSB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0UHJvamVjdFdvcmtzcGFjZUZpbGVQYXRoKHByb2plY3RQYXRoKS5waXBlKFxuICAgICAgY29uY2F0TWFwKGdsb2JhbFdvcmtzcGFjZVBhdGggPT4gdGhpcy5fbG9hZFdvcmtzcGFjZUZyb21QYXRoKGdsb2JhbFdvcmtzcGFjZVBhdGgpKSxcbiAgICApO1xuICB9XG5cbiAgLy8gVE9ETzogZG8gdGhpcyB3aXRoIHRoZSBob3N0IGluc3RlYWQgb2YgZnMuXG4gIHByaXZhdGUgX2dldFByb2plY3RXb3Jrc3BhY2VGaWxlUGF0aChwcm9qZWN0UGF0aD86IHN0cmluZyk6IE9ic2VydmFibGU8UGF0aCB8IG51bGw+IHtcbiAgICAvLyBGaW5kIHRoZSB3b3Jrc3BhY2UgZmlsZSwgZWl0aGVyIHdoZXJlIHNwZWNpZmllZCwgaW4gdGhlIEFuZ3VsYXIgQ0xJIHByb2plY3RcbiAgICAvLyAoaWYgaXQncyBpbiBub2RlX21vZHVsZXMpIG9yIGZyb20gdGhlIGN1cnJlbnQgcHJvY2Vzcy5cbiAgICBjb25zdCB3b3Jrc3BhY2VGaWxlUGF0aCA9IChwcm9qZWN0UGF0aCAmJiBmaW5kVXAodGhpcy5fY29uZmlnRmlsZU5hbWVzLCBwcm9qZWN0UGF0aCkpXG4gICAgICB8fCBmaW5kVXAodGhpcy5fY29uZmlnRmlsZU5hbWVzLCBwcm9jZXNzLmN3ZCgpKVxuICAgICAgfHwgZmluZFVwKHRoaXMuX2NvbmZpZ0ZpbGVOYW1lcywgX19kaXJuYW1lKTtcblxuICAgIGlmICh3b3Jrc3BhY2VGaWxlUGF0aCkge1xuICAgICAgcmV0dXJuIG9mKG5vcm1hbGl6ZSh3b3Jrc3BhY2VGaWxlUGF0aCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYExvY2FsIHdvcmtzcGFjZSBmaWxlICgnYW5ndWxhci5qc29uJykgY291bGQgbm90IGJlIGZvdW5kLmApO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE86IGRvIHRoaXMgd2l0aCB0aGUgaG9zdCBpbnN0ZWFkIG9mIGZzLlxuICBwcml2YXRlIF9nZXRHbG9iYWxXb3Jrc3BhY2VGaWxlUGF0aCgpOiBPYnNlcnZhYmxlPFBhdGggfCBudWxsPiB7XG4gICAgZm9yIChjb25zdCBmaWxlTmFtZSBvZiB0aGlzLl9jb25maWdGaWxlTmFtZXMpIHtcbiAgICAgIGNvbnN0IHdvcmtzcGFjZUZpbGVQYXRoID0gam9pbihub3JtYWxpemUoaG9tZWRpcigpKSwgZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyh3b3Jrc3BhY2VGaWxlUGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIG9mKG5vcm1hbGl6ZSh3b3Jrc3BhY2VGaWxlUGF0aCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvZihudWxsKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xvYWRXb3Jrc3BhY2VGcm9tUGF0aCh3b3Jrc3BhY2VQYXRoOiBQYXRoIHwgbnVsbCkge1xuICAgIGlmICghd29ya3NwYWNlUGF0aCkge1xuICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl93b3Jrc3BhY2VDYWNoZU1hcC5oYXMod29ya3NwYWNlUGF0aCkpIHtcbiAgICAgIHJldHVybiBvZih0aGlzLl93b3Jrc3BhY2VDYWNoZU1hcC5nZXQod29ya3NwYWNlUGF0aCkgfHwgbnVsbCk7XG4gICAgfVxuXG4gICAgY29uc3Qgd29ya3NwYWNlUm9vdCA9IGRpcm5hbWUod29ya3NwYWNlUGF0aCk7XG4gICAgY29uc3Qgd29ya3NwYWNlRmlsZU5hbWUgPSBiYXNlbmFtZSh3b3Jrc3BhY2VQYXRoKTtcbiAgICBjb25zdCB3b3Jrc3BhY2UgPSBuZXcgZXhwZXJpbWVudGFsLndvcmtzcGFjZS5Xb3Jrc3BhY2Uod29ya3NwYWNlUm9vdCwgdGhpcy5faG9zdCk7XG5cbiAgICByZXR1cm4gd29ya3NwYWNlLmxvYWRXb3Jrc3BhY2VGcm9tSG9zdCh3b3Jrc3BhY2VGaWxlTmFtZSkucGlwZShcbiAgICAgIHRhcCh3b3Jrc3BhY2UgPT4gdGhpcy5fd29ya3NwYWNlQ2FjaGVNYXAuc2V0KHdvcmtzcGFjZVBhdGgsIHdvcmtzcGFjZSkpLFxuICAgICk7XG4gIH1cbn1cbiJdfQ==