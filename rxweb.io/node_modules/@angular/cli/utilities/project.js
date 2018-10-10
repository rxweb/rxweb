"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-global-tslint-disable no-any
const core_1 = require("@angular-devkit/core");
const fs = require("fs");
const os = require("os");
const path = require("path");
const find_up_1 = require("./find-up");
function insideProject() {
    return getProjectDetails() !== null;
}
exports.insideProject = insideProject;
function getProjectDetails() {
    const currentDir = process.cwd();
    const possibleConfigFiles = [
        'angular.json',
        '.angular.json',
        'angular-cli.json',
        '.angular-cli.json',
    ];
    const configFilePath = find_up_1.findUp(possibleConfigFiles, currentDir);
    if (configFilePath === null) {
        return null;
    }
    const configFileName = path.basename(configFilePath);
    const possibleDir = path.dirname(configFilePath);
    const homedir = os.homedir();
    if (core_1.normalize(possibleDir) === core_1.normalize(homedir)) {
        const packageJsonPath = path.join(possibleDir, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            // No package.json
            return null;
        }
        const packageJsonBuffer = fs.readFileSync(packageJsonPath);
        const packageJsonText = packageJsonBuffer === null ? '{}' : packageJsonBuffer.toString();
        const packageJson = JSON.parse(packageJsonText);
        if (!containsCliDep(packageJson)) {
            // No CLI dependency
            return null;
        }
    }
    return {
        root: possibleDir,
        configFile: configFileName,
    };
}
exports.getProjectDetails = getProjectDetails;
function containsCliDep(obj) {
    const pkgName = '@angular/cli';
    if (obj) {
        if (obj.dependencies && obj.dependencies[pkgName]) {
            return true;
        }
        if (obj.devDependencies && obj.devDependencies[pkgName]) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhci9jbGkvdXRpbGl0aWVzL3Byb2plY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpREFBaUQ7QUFDakQsK0NBQWlEO0FBQ2pELHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLHVDQUFtQztBQUVuQztJQUNFLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLElBQUksQ0FBQztBQUN0QyxDQUFDO0FBRkQsc0NBRUM7QUFPRDtJQUNFLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNqQyxNQUFNLG1CQUFtQixHQUFHO1FBQzFCLGNBQWM7UUFDZCxlQUFlO1FBQ2Ysa0JBQWtCO1FBQ2xCLG1CQUFtQjtLQUNwQixDQUFDO0lBQ0YsTUFBTSxjQUFjLEdBQUcsZ0JBQU0sQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMvRCxFQUFFLENBQUMsQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFckQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVqRCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMvRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLGtCQUFrQjtZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELE1BQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMzRCxNQUFNLGVBQWUsR0FBRyxpQkFBaUIsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekYsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsb0JBQW9CO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQztRQUNMLElBQUksRUFBRSxXQUFXO1FBQ2pCLFVBQVUsRUFBRSxjQUFjO0tBQzNCLENBQUM7QUFDSixDQUFDO0FBcENELDhDQW9DQztBQUVELHdCQUF3QixHQUFRO0lBQzlCLE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQztJQUMvQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWdsb2JhbC10c2xpbnQtZGlzYWJsZSBuby1hbnlcbmltcG9ydCB7IG5vcm1hbGl6ZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIG9zIGZyb20gJ29zJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBmaW5kVXAgfSBmcm9tICcuL2ZpbmQtdXAnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5zaWRlUHJvamVjdCgpOiBib29sZWFuIHtcbiAgcmV0dXJuIGdldFByb2plY3REZXRhaWxzKCkgIT09IG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdERldGFpbHMge1xuICByb290OiBzdHJpbmc7XG4gIGNvbmZpZ0ZpbGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9qZWN0RGV0YWlscygpOiBQcm9qZWN0RGV0YWlscyB8IG51bGwge1xuICBjb25zdCBjdXJyZW50RGlyID0gcHJvY2Vzcy5jd2QoKTtcbiAgY29uc3QgcG9zc2libGVDb25maWdGaWxlcyA9IFtcbiAgICAnYW5ndWxhci5qc29uJyxcbiAgICAnLmFuZ3VsYXIuanNvbicsXG4gICAgJ2FuZ3VsYXItY2xpLmpzb24nLFxuICAgICcuYW5ndWxhci1jbGkuanNvbicsXG4gIF07XG4gIGNvbnN0IGNvbmZpZ0ZpbGVQYXRoID0gZmluZFVwKHBvc3NpYmxlQ29uZmlnRmlsZXMsIGN1cnJlbnREaXIpO1xuICBpZiAoY29uZmlnRmlsZVBhdGggPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBjb25maWdGaWxlTmFtZSA9IHBhdGguYmFzZW5hbWUoY29uZmlnRmlsZVBhdGgpO1xuXG4gIGNvbnN0IHBvc3NpYmxlRGlyID0gcGF0aC5kaXJuYW1lKGNvbmZpZ0ZpbGVQYXRoKTtcblxuICBjb25zdCBob21lZGlyID0gb3MuaG9tZWRpcigpO1xuICBpZiAobm9ybWFsaXplKHBvc3NpYmxlRGlyKSA9PT0gbm9ybWFsaXplKGhvbWVkaXIpKSB7XG4gICAgY29uc3QgcGFja2FnZUpzb25QYXRoID0gcGF0aC5qb2luKHBvc3NpYmxlRGlyLCAncGFja2FnZS5qc29uJyk7XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKHBhY2thZ2VKc29uUGF0aCkpIHtcbiAgICAgIC8vIE5vIHBhY2thZ2UuanNvblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHBhY2thZ2VKc29uQnVmZmVyID0gZnMucmVhZEZpbGVTeW5jKHBhY2thZ2VKc29uUGF0aCk7XG4gICAgY29uc3QgcGFja2FnZUpzb25UZXh0ID0gcGFja2FnZUpzb25CdWZmZXIgPT09IG51bGwgPyAne30nIDogcGFja2FnZUpzb25CdWZmZXIudG9TdHJpbmcoKTtcbiAgICBjb25zdCBwYWNrYWdlSnNvbiA9IEpTT04ucGFyc2UocGFja2FnZUpzb25UZXh0KTtcbiAgICBpZiAoIWNvbnRhaW5zQ2xpRGVwKHBhY2thZ2VKc29uKSkge1xuICAgICAgLy8gTm8gQ0xJIGRlcGVuZGVuY3lcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcm9vdDogcG9zc2libGVEaXIsXG4gICAgY29uZmlnRmlsZTogY29uZmlnRmlsZU5hbWUsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNvbnRhaW5zQ2xpRGVwKG9iajogYW55KTogYm9vbGVhbiB7XG4gIGNvbnN0IHBrZ05hbWUgPSAnQGFuZ3VsYXIvY2xpJztcbiAgaWYgKG9iaikge1xuICAgIGlmIChvYmouZGVwZW5kZW5jaWVzICYmIG9iai5kZXBlbmRlbmNpZXNbcGtnTmFtZV0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAob2JqLmRldkRlcGVuZGVuY2llcyAmJiBvYmouZGV2RGVwZW5kZW5jaWVzW3BrZ05hbWVdKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=