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
const json_utils_1 = require("./json-utils");
const pkgJsonPath = '/package.json';
var NodeDependencyType;
(function (NodeDependencyType) {
    NodeDependencyType["Default"] = "dependencies";
    NodeDependencyType["Dev"] = "devDependencies";
    NodeDependencyType["Peer"] = "peerDependencies";
    NodeDependencyType["Optional"] = "optionalDependencies";
})(NodeDependencyType = exports.NodeDependencyType || (exports.NodeDependencyType = {}));
function addPackageJsonDependency(tree, dependency) {
    const packageJsonAst = _readPackageJson(tree);
    const depsNode = json_utils_1.findPropertyInAstObject(packageJsonAst, dependency.type);
    const recorder = tree.beginUpdate(pkgJsonPath);
    if (!depsNode) {
        // Haven't found the dependencies key, add it to the root of the package.json.
        json_utils_1.appendPropertyInAstObject(recorder, packageJsonAst, dependency.type, {
            [dependency.name]: dependency.version,
        }, 2);
    }
    else if (depsNode.kind === 'object') {
        // check if package already added
        const depNode = json_utils_1.findPropertyInAstObject(depsNode, dependency.name);
        if (!depNode) {
            // Package not found, add it.
            json_utils_1.insertPropertyInAstObjectInOrder(recorder, depsNode, dependency.name, dependency.version, 4);
        }
        else if (dependency.overwrite) {
            // Package found, update version if overwrite.
            const { end, start } = depNode;
            recorder.remove(start.offset, end.offset - start.offset);
            recorder.insertRight(start.offset, JSON.stringify(dependency.version));
        }
    }
    tree.commitUpdate(recorder);
}
exports.addPackageJsonDependency = addPackageJsonDependency;
function getPackageJsonDependency(tree, name) {
    const packageJson = _readPackageJson(tree);
    let dep = null;
    [
        NodeDependencyType.Default,
        NodeDependencyType.Dev,
        NodeDependencyType.Optional,
        NodeDependencyType.Peer,
    ].forEach(depType => {
        if (dep !== null) {
            return;
        }
        const depsNode = json_utils_1.findPropertyInAstObject(packageJson, depType);
        if (depsNode !== null && depsNode.kind === 'object') {
            const depNode = json_utils_1.findPropertyInAstObject(depsNode, name);
            if (depNode !== null && depNode.kind === 'string') {
                const version = depNode.value;
                dep = {
                    type: depType,
                    name: name,
                    version: version,
                };
            }
        }
    });
    return dep;
}
exports.getPackageJsonDependency = getPackageJsonDependency;
function _readPackageJson(tree) {
    const buffer = tree.read(pkgJsonPath);
    if (buffer === null) {
        throw new schematics_1.SchematicsException('Could not read package.json.');
    }
    const content = buffer.toString();
    const packageJson = core_1.parseJsonAst(content, core_1.JsonParseMode.Strict);
    if (packageJson.kind != 'object') {
        throw new schematics_1.SchematicsException('Invalid package.json. Was expecting an object');
    }
    return packageJson;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jaWVzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9zY2hlbWF0aWNzL2FuZ3VsYXIvdXRpbGl0eS9kZXBlbmRlbmNpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwrQ0FBa0Y7QUFDbEYsMkRBQXVFO0FBQ3ZFLDZDQUl1QjtBQUd2QixNQUFNLFdBQVcsR0FBRyxlQUFlLENBQUM7QUFDcEMsSUFBWSxrQkFLWDtBQUxELFdBQVksa0JBQWtCO0lBQzVCLDhDQUF3QixDQUFBO0lBQ3hCLDZDQUF1QixDQUFBO0lBQ3ZCLCtDQUF5QixDQUFBO0lBQ3pCLHVEQUFpQyxDQUFBO0FBQ25DLENBQUMsRUFMVyxrQkFBa0IsR0FBbEIsMEJBQWtCLEtBQWxCLDBCQUFrQixRQUs3QjtBQVNELGtDQUF5QyxJQUFVLEVBQUUsVUFBMEI7SUFDN0UsTUFBTSxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsTUFBTSxRQUFRLEdBQUcsb0NBQXVCLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9DLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYiw4RUFBOEU7UUFDOUUsc0NBQXlCLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ25FLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsQ0FBQyxPQUFPO1NBQ3RDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDUDtTQUFNLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDckMsaUNBQWlDO1FBQ2pDLE1BQU0sT0FBTyxHQUFHLG9DQUF1QixDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLDZCQUE2QjtZQUM3Qiw2Q0FBZ0MsQ0FDOUIsUUFBUSxFQUNSLFFBQVEsRUFDUixVQUFVLENBQUMsSUFBSSxFQUNmLFVBQVUsQ0FBQyxPQUFPLEVBQ2xCLENBQUMsQ0FDRixDQUFDO1NBQ0g7YUFBTSxJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDL0IsOENBQThDO1lBQzlDLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDO1lBQy9CLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6RCxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUN4RTtLQUNGO0lBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBL0JELDREQStCQztBQUVELGtDQUF5QyxJQUFVLEVBQUUsSUFBWTtJQUMvRCxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxJQUFJLEdBQUcsR0FBMEIsSUFBSSxDQUFDO0lBQ3RDO1FBQ0Usa0JBQWtCLENBQUMsT0FBTztRQUMxQixrQkFBa0IsQ0FBQyxHQUFHO1FBQ3RCLGtCQUFrQixDQUFDLFFBQVE7UUFDM0Isa0JBQWtCLENBQUMsSUFBSTtLQUN4QixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNsQixJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBQ0QsTUFBTSxRQUFRLEdBQUcsb0NBQXVCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNuRCxNQUFNLE9BQU8sR0FBRyxvQ0FBdUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEQsSUFBSSxPQUFPLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUNqRCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUM5QixHQUFHLEdBQUc7b0JBQ0osSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLElBQUk7b0JBQ1YsT0FBTyxFQUFFLE9BQU87aUJBQ2pCLENBQUM7YUFDSDtTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUEzQkQsNERBMkJDO0FBRUQsMEJBQTBCLElBQVU7SUFDbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDbkIsTUFBTSxJQUFJLGdDQUFtQixDQUFDLDhCQUE4QixDQUFDLENBQUM7S0FDL0Q7SUFDRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFbEMsTUFBTSxXQUFXLEdBQUcsbUJBQVksQ0FBQyxPQUFPLEVBQUUsb0JBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRSxJQUFJLFdBQVcsQ0FBQyxJQUFJLElBQUksUUFBUSxFQUFFO1FBQ2hDLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO0tBQ2hGO0lBRUQsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEpzb25Bc3RPYmplY3QsIEpzb25QYXJzZU1vZGUsIHBhcnNlSnNvbkFzdCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IFNjaGVtYXRpY3NFeGNlcHRpb24sIFRyZWUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQge1xuICBhcHBlbmRQcm9wZXJ0eUluQXN0T2JqZWN0LFxuICBmaW5kUHJvcGVydHlJbkFzdE9iamVjdCxcbiAgaW5zZXJ0UHJvcGVydHlJbkFzdE9iamVjdEluT3JkZXIsXG4gfSBmcm9tICcuL2pzb24tdXRpbHMnO1xuXG5cbmNvbnN0IHBrZ0pzb25QYXRoID0gJy9wYWNrYWdlLmpzb24nO1xuZXhwb3J0IGVudW0gTm9kZURlcGVuZGVuY3lUeXBlIHtcbiAgRGVmYXVsdCA9ICdkZXBlbmRlbmNpZXMnLFxuICBEZXYgPSAnZGV2RGVwZW5kZW5jaWVzJyxcbiAgUGVlciA9ICdwZWVyRGVwZW5kZW5jaWVzJyxcbiAgT3B0aW9uYWwgPSAnb3B0aW9uYWxEZXBlbmRlbmNpZXMnLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vZGVEZXBlbmRlbmN5IHtcbiAgdHlwZTogTm9kZURlcGVuZGVuY3lUeXBlO1xuICBuYW1lOiBzdHJpbmc7XG4gIHZlcnNpb246IHN0cmluZztcbiAgb3ZlcndyaXRlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFBhY2thZ2VKc29uRGVwZW5kZW5jeSh0cmVlOiBUcmVlLCBkZXBlbmRlbmN5OiBOb2RlRGVwZW5kZW5jeSk6IHZvaWQge1xuICBjb25zdCBwYWNrYWdlSnNvbkFzdCA9IF9yZWFkUGFja2FnZUpzb24odHJlZSk7XG4gIGNvbnN0IGRlcHNOb2RlID0gZmluZFByb3BlcnR5SW5Bc3RPYmplY3QocGFja2FnZUpzb25Bc3QsIGRlcGVuZGVuY3kudHlwZSk7XG4gIGNvbnN0IHJlY29yZGVyID0gdHJlZS5iZWdpblVwZGF0ZShwa2dKc29uUGF0aCk7XG4gIGlmICghZGVwc05vZGUpIHtcbiAgICAvLyBIYXZlbid0IGZvdW5kIHRoZSBkZXBlbmRlbmNpZXMga2V5LCBhZGQgaXQgdG8gdGhlIHJvb3Qgb2YgdGhlIHBhY2thZ2UuanNvbi5cbiAgICBhcHBlbmRQcm9wZXJ0eUluQXN0T2JqZWN0KHJlY29yZGVyLCBwYWNrYWdlSnNvbkFzdCwgZGVwZW5kZW5jeS50eXBlLCB7XG4gICAgICBbZGVwZW5kZW5jeS5uYW1lXTogZGVwZW5kZW5jeS52ZXJzaW9uLFxuICAgIH0sIDIpO1xuICB9IGVsc2UgaWYgKGRlcHNOb2RlLmtpbmQgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gY2hlY2sgaWYgcGFja2FnZSBhbHJlYWR5IGFkZGVkXG4gICAgY29uc3QgZGVwTm9kZSA9IGZpbmRQcm9wZXJ0eUluQXN0T2JqZWN0KGRlcHNOb2RlLCBkZXBlbmRlbmN5Lm5hbWUpO1xuXG4gICAgaWYgKCFkZXBOb2RlKSB7XG4gICAgICAvLyBQYWNrYWdlIG5vdCBmb3VuZCwgYWRkIGl0LlxuICAgICAgaW5zZXJ0UHJvcGVydHlJbkFzdE9iamVjdEluT3JkZXIoXG4gICAgICAgIHJlY29yZGVyLFxuICAgICAgICBkZXBzTm9kZSxcbiAgICAgICAgZGVwZW5kZW5jeS5uYW1lLFxuICAgICAgICBkZXBlbmRlbmN5LnZlcnNpb24sXG4gICAgICAgIDQsXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoZGVwZW5kZW5jeS5vdmVyd3JpdGUpIHtcbiAgICAgIC8vIFBhY2thZ2UgZm91bmQsIHVwZGF0ZSB2ZXJzaW9uIGlmIG92ZXJ3cml0ZS5cbiAgICAgIGNvbnN0IHsgZW5kLCBzdGFydCB9ID0gZGVwTm9kZTtcbiAgICAgIHJlY29yZGVyLnJlbW92ZShzdGFydC5vZmZzZXQsIGVuZC5vZmZzZXQgLSBzdGFydC5vZmZzZXQpO1xuICAgICAgcmVjb3JkZXIuaW5zZXJ0UmlnaHQoc3RhcnQub2Zmc2V0LCBKU09OLnN0cmluZ2lmeShkZXBlbmRlbmN5LnZlcnNpb24pKTtcbiAgICB9XG4gIH1cblxuICB0cmVlLmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYWNrYWdlSnNvbkRlcGVuZGVuY3kodHJlZTogVHJlZSwgbmFtZTogc3RyaW5nKTogTm9kZURlcGVuZGVuY3kgfCBudWxsIHtcbiAgY29uc3QgcGFja2FnZUpzb24gPSBfcmVhZFBhY2thZ2VKc29uKHRyZWUpO1xuICBsZXQgZGVwOiBOb2RlRGVwZW5kZW5jeSB8IG51bGwgPSBudWxsO1xuICBbXG4gICAgTm9kZURlcGVuZGVuY3lUeXBlLkRlZmF1bHQsXG4gICAgTm9kZURlcGVuZGVuY3lUeXBlLkRldixcbiAgICBOb2RlRGVwZW5kZW5jeVR5cGUuT3B0aW9uYWwsXG4gICAgTm9kZURlcGVuZGVuY3lUeXBlLlBlZXIsXG4gIF0uZm9yRWFjaChkZXBUeXBlID0+IHtcbiAgICBpZiAoZGVwICE9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGRlcHNOb2RlID0gZmluZFByb3BlcnR5SW5Bc3RPYmplY3QocGFja2FnZUpzb24sIGRlcFR5cGUpO1xuICAgIGlmIChkZXBzTm9kZSAhPT0gbnVsbCAmJiBkZXBzTm9kZS5raW5kID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3QgZGVwTm9kZSA9IGZpbmRQcm9wZXJ0eUluQXN0T2JqZWN0KGRlcHNOb2RlLCBuYW1lKTtcbiAgICAgIGlmIChkZXBOb2RlICE9PSBudWxsICYmIGRlcE5vZGUua2luZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgdmVyc2lvbiA9IGRlcE5vZGUudmFsdWU7XG4gICAgICAgIGRlcCA9IHtcbiAgICAgICAgICB0eXBlOiBkZXBUeXBlLFxuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgdmVyc2lvbjogdmVyc2lvbixcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkZXA7XG59XG5cbmZ1bmN0aW9uIF9yZWFkUGFja2FnZUpzb24odHJlZTogVHJlZSk6IEpzb25Bc3RPYmplY3Qge1xuICBjb25zdCBidWZmZXIgPSB0cmVlLnJlYWQocGtnSnNvblBhdGgpO1xuICBpZiAoYnVmZmVyID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oJ0NvdWxkIG5vdCByZWFkIHBhY2thZ2UuanNvbi4nKTtcbiAgfVxuICBjb25zdCBjb250ZW50ID0gYnVmZmVyLnRvU3RyaW5nKCk7XG5cbiAgY29uc3QgcGFja2FnZUpzb24gPSBwYXJzZUpzb25Bc3QoY29udGVudCwgSnNvblBhcnNlTW9kZS5TdHJpY3QpO1xuICBpZiAocGFja2FnZUpzb24ua2luZCAhPSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKCdJbnZhbGlkIHBhY2thZ2UuanNvbi4gV2FzIGV4cGVjdGluZyBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIHJldHVybiBwYWNrYWdlSnNvbjtcbn1cbiJdfQ==