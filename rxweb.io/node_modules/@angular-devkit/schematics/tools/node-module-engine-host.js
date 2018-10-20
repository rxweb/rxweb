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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1tb2R1bGUtZW5naW5lLWhvc3QuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3MvdG9vbHMvbm9kZS1tb2R1bGUtZW5naW5lLWhvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwrQ0FBcUQ7QUFDckQsa0RBQWtEO0FBQ2xELCtCQUE2RDtBQU03RCw2Q0FBK0M7QUFDL0MsaUZBS3dDO0FBQ3hDLCtEQUFxRDtBQUdyRCx5Q0FBaUQsU0FBUSxvQkFBYTtJQUNwRSxZQUFZLElBQVk7UUFDdEIsS0FBSyxDQUFDLFdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsNkNBQTZDLENBQUMsQ0FBQztJQUN0RixDQUFDO0NBQ0Y7QUFKRCxrRkFJQztBQUdEOztHQUVHO0FBQ0gsMkJBQW1DLFNBQVEsdURBQXdCO0lBQ2pFLGdCQUFnQixLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFaEIsbUJBQW1CLENBQUMsSUFBWSxFQUFFLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ2pFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDeEIsT0FBTztZQUNQLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGtCQUFrQixFQUFFLElBQUk7U0FDekIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLFlBQVksQ0FBQyxJQUFZLEVBQUUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFDMUQsbUNBQW1DO1FBQ25DLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hELE9BQU8sY0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0wsK0VBQStFO1lBQy9FLElB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RCxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRVMsK0JBQStCLENBQ3ZDLElBQVksRUFDWixJQUF1QztRQUV2QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksUUFBUSxFQUFFO1lBQzFELE1BQU0sSUFBSSxzRUFBdUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6RDtRQUVELE9BQU8sa0JBQ0YsSUFBSSxJQUNQLElBQUksR0FDdUIsQ0FBQztJQUNoQyxDQUFDO0lBRVMsOEJBQThCLENBQ3RDLElBQVksRUFDWixXQUFxQyxFQUNyQyxJQUFzQztRQUV0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3RELE1BQU0sSUFBSSw4REFBK0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqRDtRQUVELE9BQU8sSUFBK0IsQ0FBQztJQUN6QyxDQUFDO0NBQ0Y7QUEzR0Qsc0RBMkdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCAqIGFzIGNvcmUgZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUvbm9kZSc7XG5pbXBvcnQgeyBkaXJuYW1lLCBqb2luLCByZXNvbHZlIGFzIHJlc29sdmVQYXRoIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBSdWxlRmFjdG9yeSB9IGZyb20gJy4uL3NyYyc7XG5pbXBvcnQge1xuICBGaWxlU3lzdGVtQ29sbGVjdGlvbkRlc2MsXG4gIEZpbGVTeXN0ZW1TY2hlbWF0aWNEZXNjLFxufSBmcm9tICcuL2Rlc2NyaXB0aW9uJztcbmltcG9ydCB7IEV4cG9ydFN0cmluZ1JlZiB9IGZyb20gJy4vZXhwb3J0LXJlZic7XG5pbXBvcnQge1xuICBDb2xsZWN0aW9uQ2Fubm90QmVSZXNvbHZlZEV4Y2VwdGlvbixcbiAgQ29sbGVjdGlvbk1pc3NpbmdTY2hlbWF0aWNzTWFwRXhjZXB0aW9uLFxuICBGaWxlU3lzdGVtRW5naW5lSG9zdEJhc2UsXG4gIFNjaGVtYXRpY01pc3NpbmdGaWVsZHNFeGNlcHRpb24sXG59IGZyb20gJy4vZmlsZS1zeXN0ZW0tZW5naW5lLWhvc3QtYmFzZSc7XG5pbXBvcnQgeyByZWFkSnNvbkZpbGUgfSBmcm9tICcuL2ZpbGUtc3lzdGVtLXV0aWxpdHknO1xuXG5cbmV4cG9ydCBjbGFzcyBOb2RlUGFja2FnZURvZXNOb3RTdXBwb3J0U2NoZW1hdGljcyBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgUGFja2FnZSAke0pTT04uc3RyaW5naWZ5KG5hbWUpfSB3YXMgZm91bmQgYnV0IGRvZXMgbm90IHN1cHBvcnQgc2NoZW1hdGljcy5gKTtcbiAgfVxufVxuXG5cbi8qKlxuICogQSBzaW1wbGUgRW5naW5lSG9zdCB0aGF0IHVzZXMgTm9kZU1vZHVsZXMgdG8gcmVzb2x2ZSBjb2xsZWN0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vZGVNb2R1bGVzRW5naW5lSG9zdCBleHRlbmRzIEZpbGVTeXN0ZW1FbmdpbmVIb3N0QmFzZSB7XG4gIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XG5cbiAgcHJvdGVjdGVkIF9yZXNvbHZlUGFja2FnZUpzb24obmFtZTogc3RyaW5nLCBiYXNlZGlyID0gcHJvY2Vzcy5jd2QoKSkge1xuICAgIHJldHVybiBjb3JlLnJlc29sdmUobmFtZSwge1xuICAgICAgYmFzZWRpcixcbiAgICAgIGNoZWNrTG9jYWw6IHRydWUsXG4gICAgICBjaGVja0dsb2JhbDogdHJ1ZSxcbiAgICAgIHJlc29sdmVQYWNrYWdlSnNvbjogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfcmVzb2x2ZVBhdGgobmFtZTogc3RyaW5nLCBiYXNlZGlyID0gcHJvY2Vzcy5jd2QoKSkge1xuICAgIC8vIEFsbG93IHJlbGF0aXZlIC8gYWJzb2x1dGUgcGF0aHMuXG4gICAgaWYgKG5hbWUuc3RhcnRzV2l0aCgnLicpIHx8IG5hbWUuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZVBhdGgoYmFzZWRpciwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIGl0J3MgYSBmaWxlIGluc2lkZSBhIHBhY2thZ2UsIHJlc29sdmUgdGhlIHBhY2thZ2UgdGhlbiByZXR1cm4gdGhlIGZpbGUuLi5cbiAgICAgIGlmIChuYW1lLnNwbGl0KCcvJykubGVuZ3RoID4gKG5hbWVbMF0gPT0gJ0AnID8gMiA6IDEpKSB7XG4gICAgICAgIGNvbnN0IHJlc3QgPSBuYW1lLnNwbGl0KCcvJyk7XG4gICAgICAgIGNvbnN0IHBhY2thZ2VOYW1lID0gcmVzdC5zaGlmdCgpICsgKG5hbWVbMF0gPT0gJ0AnID8gJy8nICsgcmVzdC5zaGlmdCgpIDogJycpO1xuXG4gICAgICAgIHJldHVybiByZXNvbHZlUGF0aChjb3JlLnJlc29sdmUocGFja2FnZU5hbWUsIHtcbiAgICAgICAgICBiYXNlZGlyLFxuICAgICAgICAgIGNoZWNrTG9jYWw6IHRydWUsXG4gICAgICAgICAgY2hlY2tHbG9iYWw6IHRydWUsXG4gICAgICAgICAgcmVzb2x2ZVBhY2thZ2VKc29uOiB0cnVlLFxuICAgICAgICB9KSwgJy4uJywgLi4ucmVzdCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb3JlLnJlc29sdmUobmFtZSwge1xuICAgICAgICBiYXNlZGlyLFxuICAgICAgICBjaGVja0xvY2FsOiB0cnVlLFxuICAgICAgICBjaGVja0dsb2JhbDogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfcmVzb2x2ZUNvbGxlY3Rpb25QYXRoKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IGNvbGxlY3Rpb25QYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgICBpZiAobmFtZS5zcGxpdCgnLycpLmxlbmd0aCA+IChuYW1lWzBdID09ICdAJyA/IDIgOiAxKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29sbGVjdGlvblBhdGggPSB0aGlzLl9yZXNvbHZlUGF0aChuYW1lLCBwcm9jZXNzLmN3ZCgpKTtcbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWNvbGxlY3Rpb25QYXRoKSB7XG4gICAgICBsZXQgcGFja2FnZUpzb25QYXRoID0gdGhpcy5fcmVzb2x2ZVBhY2thZ2VKc29uKG5hbWUsIHByb2Nlc3MuY3dkKCkpO1xuICAgICAgLy8gSWYgaXQncyBhIGZpbGUsIHVzZSBpdCBhcyBpcy4gT3RoZXJ3aXNlIGFwcGVuZCBwYWNrYWdlLmpzb24gdG8gaXQuXG4gICAgICBpZiAoIWNvcmUuZnMuaXNGaWxlKHBhY2thZ2VKc29uUGF0aCkpIHtcbiAgICAgICAgcGFja2FnZUpzb25QYXRoID0gam9pbihwYWNrYWdlSnNvblBhdGgsICdwYWNrYWdlLmpzb24nKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGtnSnNvblNjaGVtYXRpY3MgPSByZXF1aXJlKHBhY2thZ2VKc29uUGF0aClbJ3NjaGVtYXRpY3MnXTtcbiAgICAgIGlmICghcGtnSnNvblNjaGVtYXRpY3MgfHwgdHlwZW9mIHBrZ0pzb25TY2hlbWF0aWNzICE9ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBOb2RlUGFja2FnZURvZXNOb3RTdXBwb3J0U2NoZW1hdGljcyhuYW1lKTtcbiAgICAgIH1cbiAgICAgIGNvbGxlY3Rpb25QYXRoID0gdGhpcy5fcmVzb2x2ZVBhdGgocGtnSnNvblNjaGVtYXRpY3MsIGRpcm5hbWUocGFja2FnZUpzb25QYXRoKSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChjb2xsZWN0aW9uUGF0aCkge1xuICAgICAgICByZWFkSnNvbkZpbGUoY29sbGVjdGlvblBhdGgpO1xuXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uUGF0aDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuICAgIHRocm93IG5ldyBDb2xsZWN0aW9uQ2Fubm90QmVSZXNvbHZlZEV4Y2VwdGlvbihuYW1lKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfcmVzb2x2ZVJlZmVyZW5jZVN0cmluZyhyZWZTdHJpbmc6IHN0cmluZywgcGFyZW50UGF0aDogc3RyaW5nKSB7XG4gICAgY29uc3QgcmVmID0gbmV3IEV4cG9ydFN0cmluZ1JlZjxSdWxlRmFjdG9yeTx7fT4+KHJlZlN0cmluZywgcGFyZW50UGF0aCk7XG4gICAgaWYgKCFyZWYucmVmKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4geyByZWY6IHJlZi5yZWYsIHBhdGg6IHJlZi5tb2R1bGUgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdHJhbnNmb3JtQ29sbGVjdGlvbkRlc2NyaXB0aW9uKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBkZXNjOiBQYXJ0aWFsPEZpbGVTeXN0ZW1Db2xsZWN0aW9uRGVzYz4sXG4gICk6IEZpbGVTeXN0ZW1Db2xsZWN0aW9uRGVzYyB7XG4gICAgaWYgKCFkZXNjLnNjaGVtYXRpY3MgfHwgdHlwZW9mIGRlc2Muc2NoZW1hdGljcyAhPSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IENvbGxlY3Rpb25NaXNzaW5nU2NoZW1hdGljc01hcEV4Y2VwdGlvbihuYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uZGVzYyxcbiAgICAgIG5hbWUsXG4gICAgfSBhcyBGaWxlU3lzdGVtQ29sbGVjdGlvbkRlc2M7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3RyYW5zZm9ybVNjaGVtYXRpY0Rlc2NyaXB0aW9uKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBfY29sbGVjdGlvbjogRmlsZVN5c3RlbUNvbGxlY3Rpb25EZXNjLFxuICAgIGRlc2M6IFBhcnRpYWw8RmlsZVN5c3RlbVNjaGVtYXRpY0Rlc2M+LFxuICApOiBGaWxlU3lzdGVtU2NoZW1hdGljRGVzYyB7XG4gICAgaWYgKCFkZXNjLmZhY3RvcnlGbiB8fCAhZGVzYy5wYXRoIHx8ICFkZXNjLmRlc2NyaXB0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljTWlzc2luZ0ZpZWxkc0V4Y2VwdGlvbihuYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVzYyBhcyBGaWxlU3lzdGVtU2NoZW1hdGljRGVzYztcbiAgfVxufVxuIl19