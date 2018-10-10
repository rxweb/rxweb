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
const core = require("@angular-devkit/core/node");
const path_1 = require("path");
const export_ref_1 = require("./export-ref");
const file_system_engine_host_base_1 = require("./file-system-engine-host-base");
const file_system_utility_1 = require("./file-system-utility");
class NodePackageDoesNotSupportSchematics extends core_1.BaseException {
    constructor(name) {
        super(`Package ${JSON.stringify(name)} was found but does not support schematics.`);
    }
}
exports.NodePackageDoesNotSupportSchematics = NodePackageDoesNotSupportSchematics;
/**
 * A simple EngineHost that uses NodeModules to resolve collections.
 */
class NodeModulesEngineHost extends file_system_engine_host_base_1.FileSystemEngineHostBase {
    constructor() { super(); }
    _resolvePackageJson(name, basedir = process.cwd()) {
        return core.resolve(name, {
            basedir,
            checkLocal: true,
            checkGlobal: true,
            resolvePackageJson: true,
        });
    }
    _resolvePath(name, basedir = process.cwd()) {
        // Allow relative / absolute paths.
        if (name.startsWith('.') || name.startsWith('/')) {
            return path_1.resolve(basedir, name);
        }
        else {
            // If it's a file inside a package, resolve the package then return the file...
            if (name.split('/').length > (name[0] == '@' ? 2 : 1)) {
                const rest = name.split('/');
                const packageName = rest.shift() + (name[0] == '@' ? '/' + rest.shift() : '');
                return path_1.resolve(core.resolve(packageName, {
                    basedir,
                    checkLocal: true,
                    checkGlobal: true,
                    resolvePackageJson: true,
                }), '..', ...rest);
            }
            return core.resolve(name, {
                basedir,
                checkLocal: true,
                checkGlobal: true,
            });
        }
    }
    _resolveCollectionPath(name) {
        let collectionPath = undefined;
        if (name.split('/').length > (name[0] == '@' ? 2 : 1)) {
            try {
                collectionPath = this._resolvePath(name, process.cwd());
            }
            catch (_) {
            }
        }
        if (!collectionPath) {
            let packageJsonPath = this._resolvePackageJson(name, process.cwd());
            // If it's a file, use it as is. Otherwise append package.json to it.
            if (!core.fs.isFile(packageJsonPath)) {
                packageJsonPath = path_1.join(packageJsonPath, 'package.json');
            }
            const pkgJsonSchematics = require(packageJsonPath)['schematics'];
            if (!pkgJsonSchematics || typeof pkgJsonSchematics != 'string') {
                throw new NodePackageDoesNotSupportSchematics(name);
            }
            collectionPath = this._resolvePath(pkgJsonSchematics, path_1.dirname(packageJsonPath));
        }
        try {
            if (collectionPath) {
                file_system_utility_1.readJsonFile(collectionPath);
                return collectionPath;
            }
        }
        catch (e) {
        }
        throw new file_system_engine_host_base_1.CollectionCannotBeResolvedException(name);
    }
    _resolveReferenceString(refString, parentPath) {
        const ref = new export_ref_1.ExportStringRef(refString, parentPath);
        if (!ref.ref) {
            return null;
        }
        return { ref: ref.ref, path: ref.module };
    }
    _transformCollectionDescription(name, desc) {
        if (!desc.schematics || typeof desc.schematics != 'object') {
            throw new file_system_engine_host_base_1.CollectionMissingSchematicsMapException(name);
        }
        return Object.assign({}, desc, { name });
    }
    _transformSchematicDescription(name, _collection, desc) {
        if (!desc.factoryFn || !desc.path || !desc.description) {
            throw new file_system_engine_host_base_1.SchematicMissingFieldsException(name);
        }
        return desc;
    }
}
exports.NodeModulesEngineHost = NodeModulesEngineHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1tb2R1bGUtZW5naW5lLWhvc3QuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3MvdG9vbHMvbm9kZS1tb2R1bGUtZW5naW5lLWhvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwrQ0FBcUQ7QUFDckQsa0RBQWtEO0FBQ2xELCtCQUE2RDtBQU03RCw2Q0FBK0M7QUFDL0MsaUZBS3dDO0FBQ3hDLCtEQUFxRDtBQUdyRCx5Q0FBaUQsU0FBUSxvQkFBYTtJQUNwRSxZQUFZLElBQVk7UUFDdEIsS0FBSyxDQUFDLFdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsNkNBQTZDLENBQUMsQ0FBQztJQUN0RixDQUFDO0NBQ0Y7QUFKRCxrRkFJQztBQUdEOztHQUVHO0FBQ0gsMkJBQW1DLFNBQVEsdURBQXdCO0lBQ2pFLGdCQUFnQixLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFaEIsbUJBQW1CLENBQUMsSUFBWSxFQUFFLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUN4QixPQUFPO1lBQ1AsVUFBVSxFQUFFLElBQUk7WUFDaEIsV0FBVyxFQUFFLElBQUk7WUFDakIsa0JBQWtCLEVBQUUsSUFBSTtTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsWUFBWSxDQUFDLElBQVksRUFBRSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUMxRCxtQ0FBbUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxNQUFNLENBQUMsY0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztR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M0dELHNEQTJHQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEJhc2VFeGNlcHRpb24gfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgKiBhcyBjb3JlIGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlL25vZGUnO1xuaW1wb3J0IHsgZGlybmFtZSwgam9pbiwgcmVzb2x2ZSBhcyByZXNvbHZlUGF0aCB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUnVsZUZhY3RvcnkgfSBmcm9tICcuLi9zcmMnO1xuaW1wb3J0IHtcbiAgRmlsZVN5c3RlbUNvbGxlY3Rpb25EZXNjLFxuICBGaWxlU3lzdGVtU2NoZW1hdGljRGVzYyxcbn0gZnJvbSAnLi9kZXNjcmlwdGlvbic7XG5pbXBvcnQgeyBFeHBvcnRTdHJpbmdSZWYgfSBmcm9tICcuL2V4cG9ydC1yZWYnO1xuaW1wb3J0IHtcbiAgQ29sbGVjdGlvbkNhbm5vdEJlUmVzb2x2ZWRFeGNlcHRpb24sXG4gIENvbGxlY3Rpb25NaXNzaW5nU2NoZW1hdGljc01hcEV4Y2VwdGlvbixcbiAgRmlsZVN5c3RlbUVuZ2luZUhvc3RCYXNlLFxuICBTY2hlbWF0aWNNaXNzaW5nRmllbGRzRXhjZXB0aW9uLFxufSBmcm9tICcuL2ZpbGUtc3lzdGVtLWVuZ2luZS1ob3N0LWJhc2UnO1xuaW1wb3J0IHsgcmVhZEpzb25GaWxlIH0gZnJvbSAnLi9maWxlLXN5c3RlbS11dGlsaXR5JztcblxuXG5leHBvcnQgY2xhc3MgTm9kZVBhY2thZ2VEb2VzTm90U3VwcG9ydFNjaGVtYXRpY3MgZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoYFBhY2thZ2UgJHtKU09OLnN0cmluZ2lmeShuYW1lKX0gd2FzIGZvdW5kIGJ1dCBkb2VzIG5vdCBzdXBwb3J0IHNjaGVtYXRpY3MuYCk7XG4gIH1cbn1cblxuXG4vKipcbiAqIEEgc2ltcGxlIEVuZ2luZUhvc3QgdGhhdCB1c2VzIE5vZGVNb2R1bGVzIHRvIHJlc29sdmUgY29sbGVjdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb2RlTW9kdWxlc0VuZ2luZUhvc3QgZXh0ZW5kcyBGaWxlU3lzdGVtRW5naW5lSG9zdEJhc2Uge1xuICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoKTsgfVxuXG4gIHByb3RlY3RlZCBfcmVzb2x2ZVBhY2thZ2VKc29uKG5hbWU6IHN0cmluZywgYmFzZWRpciA9IHByb2Nlc3MuY3dkKCkpIHtcbiAgICByZXR1cm4gY29yZS5yZXNvbHZlKG5hbWUsIHtcbiAgICAgIGJhc2VkaXIsXG4gICAgICBjaGVja0xvY2FsOiB0cnVlLFxuICAgICAgY2hlY2tHbG9iYWw6IHRydWUsXG4gICAgICByZXNvbHZlUGFja2FnZUpzb246IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Jlc29sdmVQYXRoKG5hbWU6IHN0cmluZywgYmFzZWRpciA9IHByb2Nlc3MuY3dkKCkpIHtcbiAgICAvLyBBbGxvdyByZWxhdGl2ZSAvIGFic29sdXRlIHBhdGhzLlxuICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoJy4nKSB8fCBuYW1lLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgcmV0dXJuIHJlc29sdmVQYXRoKGJhc2VkaXIsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiBpdCdzIGEgZmlsZSBpbnNpZGUgYSBwYWNrYWdlLCByZXNvbHZlIHRoZSBwYWNrYWdlIHRoZW4gcmV0dXJuIHRoZSBmaWxlLi4uXG4gICAgICBpZiAobmFtZS5zcGxpdCgnLycpLmxlbmd0aCA+IChuYW1lWzBdID09ICdAJyA/IDIgOiAxKSkge1xuICAgICAgICBjb25zdCByZXN0ID0gbmFtZS5zcGxpdCgnLycpO1xuICAgICAgICBjb25zdCBwYWNrYWdlTmFtZSA9IHJlc3Quc2hpZnQoKSArIChuYW1lWzBdID09ICdAJyA/ICcvJyArIHJlc3Quc2hpZnQoKSA6ICcnKTtcblxuICAgICAgICByZXR1cm4gcmVzb2x2ZVBhdGgoY29yZS5yZXNvbHZlKHBhY2thZ2VOYW1lLCB7XG4gICAgICAgICAgYmFzZWRpcixcbiAgICAgICAgICBjaGVja0xvY2FsOiB0cnVlLFxuICAgICAgICAgIGNoZWNrR2xvYmFsOiB0cnVlLFxuICAgICAgICAgIHJlc29sdmVQYWNrYWdlSnNvbjogdHJ1ZSxcbiAgICAgICAgfSksICcuLicsIC4uLnJlc3QpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29yZS5yZXNvbHZlKG5hbWUsIHtcbiAgICAgICAgYmFzZWRpcixcbiAgICAgICAgY2hlY2tMb2NhbDogdHJ1ZSxcbiAgICAgICAgY2hlY2tHbG9iYWw6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Jlc29sdmVDb2xsZWN0aW9uUGF0aChuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBjb2xsZWN0aW9uUGF0aDogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKG5hbWUuc3BsaXQoJy8nKS5sZW5ndGggPiAobmFtZVswXSA9PSAnQCcgPyAyIDogMSkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbGxlY3Rpb25QYXRoID0gdGhpcy5fcmVzb2x2ZVBhdGgobmFtZSwgcHJvY2Vzcy5jd2QoKSk7XG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjb2xsZWN0aW9uUGF0aCkge1xuICAgICAgbGV0IHBhY2thZ2VKc29uUGF0aCA9IHRoaXMuX3Jlc29sdmVQYWNrYWdlSnNvbihuYW1lLCBwcm9jZXNzLmN3ZCgpKTtcbiAgICAgIC8vIElmIGl0J3MgYSBmaWxlLCB1c2UgaXQgYXMgaXMuIE90aGVyd2lzZSBhcHBlbmQgcGFja2FnZS5qc29uIHRvIGl0LlxuICAgICAgaWYgKCFjb3JlLmZzLmlzRmlsZShwYWNrYWdlSnNvblBhdGgpKSB7XG4gICAgICAgIHBhY2thZ2VKc29uUGF0aCA9IGpvaW4ocGFja2FnZUpzb25QYXRoLCAncGFja2FnZS5qc29uJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBrZ0pzb25TY2hlbWF0aWNzID0gcmVxdWlyZShwYWNrYWdlSnNvblBhdGgpWydzY2hlbWF0aWNzJ107XG4gICAgICBpZiAoIXBrZ0pzb25TY2hlbWF0aWNzIHx8IHR5cGVvZiBwa2dKc29uU2NoZW1hdGljcyAhPSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgTm9kZVBhY2thZ2VEb2VzTm90U3VwcG9ydFNjaGVtYXRpY3MobmFtZSk7XG4gICAgICB9XG4gICAgICBjb2xsZWN0aW9uUGF0aCA9IHRoaXMuX3Jlc29sdmVQYXRoKHBrZ0pzb25TY2hlbWF0aWNzLCBkaXJuYW1lKHBhY2thZ2VKc29uUGF0aCkpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpZiAoY29sbGVjdGlvblBhdGgpIHtcbiAgICAgICAgcmVhZEpzb25GaWxlKGNvbGxlY3Rpb25QYXRoKTtcblxuICAgICAgICByZXR1cm4gY29sbGVjdGlvblBhdGg7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIH1cbiAgICB0aHJvdyBuZXcgQ29sbGVjdGlvbkNhbm5vdEJlUmVzb2x2ZWRFeGNlcHRpb24obmFtZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Jlc29sdmVSZWZlcmVuY2VTdHJpbmcocmVmU3RyaW5nOiBzdHJpbmcsIHBhcmVudFBhdGg6IHN0cmluZykge1xuICAgIGNvbnN0IHJlZiA9IG5ldyBFeHBvcnRTdHJpbmdSZWY8UnVsZUZhY3Rvcnk8e30+PihyZWZTdHJpbmcsIHBhcmVudFBhdGgpO1xuICAgIGlmICghcmVmLnJlZikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgcmVmOiByZWYucmVmLCBwYXRoOiByZWYubW9kdWxlIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgX3RyYW5zZm9ybUNvbGxlY3Rpb25EZXNjcmlwdGlvbihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgZGVzYzogUGFydGlhbDxGaWxlU3lzdGVtQ29sbGVjdGlvbkRlc2M+LFxuICApOiBGaWxlU3lzdGVtQ29sbGVjdGlvbkRlc2Mge1xuICAgIGlmICghZGVzYy5zY2hlbWF0aWNzIHx8IHR5cGVvZiBkZXNjLnNjaGVtYXRpY3MgIT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBDb2xsZWN0aW9uTWlzc2luZ1NjaGVtYXRpY3NNYXBFeGNlcHRpb24obmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmRlc2MsXG4gICAgICBuYW1lLFxuICAgIH0gYXMgRmlsZVN5c3RlbUNvbGxlY3Rpb25EZXNjO1xuICB9XG5cbiAgcHJvdGVjdGVkIF90cmFuc2Zvcm1TY2hlbWF0aWNEZXNjcmlwdGlvbihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgX2NvbGxlY3Rpb246IEZpbGVTeXN0ZW1Db2xsZWN0aW9uRGVzYyxcbiAgICBkZXNjOiBQYXJ0aWFsPEZpbGVTeXN0ZW1TY2hlbWF0aWNEZXNjPixcbiAgKTogRmlsZVN5c3RlbVNjaGVtYXRpY0Rlc2Mge1xuICAgIGlmICghZGVzYy5mYWN0b3J5Rm4gfHwgIWRlc2MucGF0aCB8fCAhZGVzYy5kZXNjcmlwdGlvbikge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY01pc3NpbmdGaWVsZHNFeGNlcHRpb24obmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc2MgYXMgRmlsZVN5c3RlbVNjaGVtYXRpY0Rlc2M7XG4gIH1cbn1cbiJdfQ==