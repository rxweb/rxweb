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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhci9jbGkvdXRpbGl0aWVzL3Byb2plY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpREFBaUQ7QUFDakQsK0NBQWlEO0FBQ2pELHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLHVDQUFtQztBQUVuQztJQUNFLE9BQU8saUJBQWlCLEVBQUUsS0FBSyxJQUFJLENBQUM7QUFDdEMsQ0FBQztBQUZELHNDQUVDO0FBT0Q7SUFDRSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDakMsTUFBTSxtQkFBbUIsR0FBRztRQUMxQixjQUFjO1FBQ2QsZUFBZTtRQUNmLGtCQUFrQjtRQUNsQixtQkFBbUI7S0FDcEIsQ0FBQztJQUNGLE1BQU0sY0FBYyxHQUFHLGdCQUFNLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDL0QsSUFBSSxjQUFjLEtBQUssSUFBSSxFQUFFO1FBQzNCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXJELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFakQsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLElBQUksZ0JBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2pELE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ25DLGtCQUFrQjtZQUNsQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsTUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzNELE1BQU0sZUFBZSxHQUFHLGlCQUFpQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN6RixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDaEMsb0JBQW9CO1lBQ3BCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7S0FDRjtJQUVELE9BQU87UUFDTCxJQUFJLEVBQUUsV0FBVztRQUNqQixVQUFVLEVBQUUsY0FBYztLQUMzQixDQUFDO0FBQ0osQ0FBQztBQXBDRCw4Q0FvQ0M7QUFFRCx3QkFBd0IsR0FBUTtJQUM5QixNQUFNLE9BQU8sR0FBRyxjQUFjLENBQUM7SUFDL0IsSUFBSSxHQUFHLEVBQUU7UUFDUCxJQUFJLEdBQUcsQ0FBQyxZQUFZLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNqRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxHQUFHLENBQUMsZUFBZSxJQUFJLEdBQUcsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkQsT0FBTyxJQUFJLENBQUM7U0FDYjtLQUNGO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1nbG9iYWwtdHNsaW50LWRpc2FibGUgbm8tYW55XG5pbXBvcnQgeyBub3JtYWxpemUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBvcyBmcm9tICdvcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZmluZFVwIH0gZnJvbSAnLi9maW5kLXVwJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluc2lkZVByb2plY3QoKTogYm9vbGVhbiB7XG4gIHJldHVybiBnZXRQcm9qZWN0RGV0YWlscygpICE9PSBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2plY3REZXRhaWxzIHtcbiAgcm9vdDogc3RyaW5nO1xuICBjb25maWdGaWxlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvamVjdERldGFpbHMoKTogUHJvamVjdERldGFpbHMgfCBudWxsIHtcbiAgY29uc3QgY3VycmVudERpciA9IHByb2Nlc3MuY3dkKCk7XG4gIGNvbnN0IHBvc3NpYmxlQ29uZmlnRmlsZXMgPSBbXG4gICAgJ2FuZ3VsYXIuanNvbicsXG4gICAgJy5hbmd1bGFyLmpzb24nLFxuICAgICdhbmd1bGFyLWNsaS5qc29uJyxcbiAgICAnLmFuZ3VsYXItY2xpLmpzb24nLFxuICBdO1xuICBjb25zdCBjb25maWdGaWxlUGF0aCA9IGZpbmRVcChwb3NzaWJsZUNvbmZpZ0ZpbGVzLCBjdXJyZW50RGlyKTtcbiAgaWYgKGNvbmZpZ0ZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgY29uZmlnRmlsZU5hbWUgPSBwYXRoLmJhc2VuYW1lKGNvbmZpZ0ZpbGVQYXRoKTtcblxuICBjb25zdCBwb3NzaWJsZURpciA9IHBhdGguZGlybmFtZShjb25maWdGaWxlUGF0aCk7XG5cbiAgY29uc3QgaG9tZWRpciA9IG9zLmhvbWVkaXIoKTtcbiAgaWYgKG5vcm1hbGl6ZShwb3NzaWJsZURpcikgPT09IG5vcm1hbGl6ZShob21lZGlyKSkge1xuICAgIGNvbnN0IHBhY2thZ2VKc29uUGF0aCA9IHBhdGguam9pbihwb3NzaWJsZURpciwgJ3BhY2thZ2UuanNvbicpO1xuICAgIGlmICghZnMuZXhpc3RzU3luYyhwYWNrYWdlSnNvblBhdGgpKSB7XG4gICAgICAvLyBObyBwYWNrYWdlLmpzb25cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBwYWNrYWdlSnNvbkJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhwYWNrYWdlSnNvblBhdGgpO1xuICAgIGNvbnN0IHBhY2thZ2VKc29uVGV4dCA9IHBhY2thZ2VKc29uQnVmZmVyID09PSBudWxsID8gJ3t9JyA6IHBhY2thZ2VKc29uQnVmZmVyLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgcGFja2FnZUpzb24gPSBKU09OLnBhcnNlKHBhY2thZ2VKc29uVGV4dCk7XG4gICAgaWYgKCFjb250YWluc0NsaURlcChwYWNrYWdlSnNvbikpIHtcbiAgICAgIC8vIE5vIENMSSBkZXBlbmRlbmN5XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJvb3Q6IHBvc3NpYmxlRGlyLFxuICAgIGNvbmZpZ0ZpbGU6IGNvbmZpZ0ZpbGVOYW1lLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjb250YWluc0NsaURlcChvYmo6IGFueSk6IGJvb2xlYW4ge1xuICBjb25zdCBwa2dOYW1lID0gJ0Bhbmd1bGFyL2NsaSc7XG4gIGlmIChvYmopIHtcbiAgICBpZiAob2JqLmRlcGVuZGVuY2llcyAmJiBvYmouZGVwZW5kZW5jaWVzW3BrZ05hbWVdKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9iai5kZXZEZXBlbmRlbmNpZXMgJiYgb2JqLmRldkRlcGVuZGVuY2llc1twa2dOYW1lXSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIl19