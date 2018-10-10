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
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const exception_1 = require("../exception/exception");
const entry_1 = require("./entry");
const interface_1 = require("./interface");
const recorder_1 = require("./recorder");
let _uniqueId = 0;
class HostDirEntry {
    constructor(parent, path, _host, _tree) {
        this.parent = parent;
        this.path = path;
        this._host = _host;
        this._tree = _tree;
    }
    get subdirs() {
        return this._host.list(this.path)
            .filter(fragment => this._host.isDirectory(core_1.join(this.path, fragment)));
    }
    get subfiles() {
        return this._host.list(this.path)
            .filter(fragment => this._host.isFile(core_1.join(this.path, fragment)));
    }
    dir(name) {
        return this._tree.getDir(core_1.join(this.path, name));
    }
    file(name) {
        return this._tree.get(core_1.join(this.path, name));
    }
    visit(visitor) {
        function _recurse(entry) {
            entry.subfiles.forEach(path => {
                visitor(core_1.join(entry.path, path), entry.file(path));
            });
            entry.subdirs.forEach(path => {
                _recurse(entry.dir(path));
            });
        }
        try {
            _recurse(this);
        }
        catch (e) {
            if (e !== interface_1.FileVisitorCancelToken) {
                throw e;
            }
        }
    }
}
exports.HostDirEntry = HostDirEntry;
class HostTree {
    constructor(_backend = new core_1.virtualFs.Empty()) {
        this._backend = _backend;
        this._id = --_uniqueId;
        this._ancestry = new Set();
        this._dirCache = new Map();
        this._record = new core_1.virtualFs.CordHost(new core_1.virtualFs.SafeReadonlyHost(_backend));
        this._recordSync = new core_1.virtualFs.SyncDelegateHost(this._record);
    }
    [interface_1.TreeSymbol]() {
        return this;
    }
    _normalizePath(path) {
        return core_1.normalize('/' + path);
    }
    _willCreate(path) {
        return this._record.willCreate(path);
    }
    _willOverwrite(path) {
        return this._record.willOverwrite(path);
    }
    _willDelete(path) {
        return this._record.willDelete(path);
    }
    _willRename(path) {
        return this._record.willRename(path);
    }
    // This can be used by old Schematics library with new Trees in some corner cases.
    // TODO: remove this for 7.0
    optimize() {
        return this;
    }
    branch() {
        const branchedTree = new HostTree(this._backend);
        branchedTree._record = this._record.clone();
        branchedTree._recordSync = new core_1.virtualFs.SyncDelegateHost(branchedTree._record);
        branchedTree._ancestry = new Set(this._ancestry).add(this._id);
        return branchedTree;
    }
    merge(other, strategy = interface_1.MergeStrategy.Default) {
        if (other === this) {
            // Merging with yourself? Tsk tsk. Nothing to do at least.
            return;
        }
        if (other instanceof HostTree && other._ancestry.has(this._id)) {
            // Workaround for merging a branch back into one of its ancestors
            // More complete branch point tracking is required to avoid
            strategy |= interface_1.MergeStrategy.Overwrite;
        }
        const creationConflictAllowed = (strategy & interface_1.MergeStrategy.AllowCreationConflict) == interface_1.MergeStrategy.AllowCreationConflict;
        const overwriteConflictAllowed = (strategy & interface_1.MergeStrategy.AllowOverwriteConflict) == interface_1.MergeStrategy.AllowOverwriteConflict;
        const deleteConflictAllowed = (strategy & interface_1.MergeStrategy.AllowOverwriteConflict) == interface_1.MergeStrategy.AllowDeleteConflict;
        other.actions.forEach(action => {
            switch (action.kind) {
                case 'c': {
                    const { path, content } = action;
                    if ((this._willCreate(path) || this._willOverwrite(path))) {
                        const existingContent = this.read(path);
                        if (existingContent && content.equals(existingContent)) {
                            // Identical outcome; no action required
                            return;
                        }
                        if (!creationConflictAllowed) {
                            throw new exception_1.MergeConflictException(path);
                        }
                        this._record.overwrite(path, content).subscribe();
                    }
                    else {
                        this._record.create(path, content).subscribe();
                    }
                    return;
                }
                case 'o': {
                    const { path, content } = action;
                    if (this._willDelete(path) && !overwriteConflictAllowed) {
                        throw new exception_1.MergeConflictException(path);
                    }
                    // Ignore if content is the same (considered the same change).
                    if (this._willOverwrite(path)) {
                        const existingContent = this.read(path);
                        if (existingContent && content.equals(existingContent)) {
                            // Identical outcome; no action required
                            return;
                        }
                        if (!overwriteConflictAllowed) {
                            throw new exception_1.MergeConflictException(path);
                        }
                    }
                    // We use write here as merge validation has already been done, and we want to let
                    // the CordHost do its job.
                    this._record.write(path, content).subscribe();
                    return;
                }
                case 'r': {
                    const { path, to } = action;
                    if (this._willDelete(path)) {
                        throw new exception_1.MergeConflictException(path);
                    }
                    if (this._willRename(path)) {
                        if (this._record.willRenameTo(path, to)) {
                            // Identical outcome; no action required
                            return;
                        }
                        // No override possible for renaming.
                        throw new exception_1.MergeConflictException(path);
                    }
                    this.rename(path, to);
                    return;
                }
                case 'd': {
                    const { path } = action;
                    if (this._willDelete(path)) {
                        // TODO: This should technically check the content (e.g., hash on delete)
                        // Identical outcome; no action required
                        return;
                    }
                    if (!this.exists(path) && !deleteConflictAllowed) {
                        throw new exception_1.MergeConflictException(path);
                    }
                    this._recordSync.delete(path);
                    return;
                }
            }
        });
    }
    get root() {
        return this.getDir('/');
    }
    // Readonly.
    read(path) {
        const entry = this.get(path);
        return entry ? entry.content : null;
    }
    exists(path) {
        return this._recordSync.isFile(this._normalizePath(path));
    }
    get(path) {
        const p = this._normalizePath(path);
        if (this._recordSync.isDirectory(p)) {
            throw new core_1.PathIsDirectoryException(p);
        }
        if (!this._recordSync.exists(p)) {
            return null;
        }
        return new entry_1.LazyFileEntry(p, () => Buffer.from(this._recordSync.read(p)));
    }
    getDir(path) {
        const p = this._normalizePath(path);
        if (this._recordSync.isFile(p)) {
            throw new core_1.PathIsFileException(p);
        }
        let maybeCache = this._dirCache.get(p);
        if (!maybeCache) {
            let parent = core_1.dirname(p);
            if (p === parent) {
                parent = null;
            }
            maybeCache = new HostDirEntry(parent && this.getDir(parent), p, this._recordSync, this);
            this._dirCache.set(p, maybeCache);
        }
        return maybeCache;
    }
    visit(visitor) {
        const allFiles = [];
        this.root.visit((path, entry) => {
            allFiles.push([path, entry]);
        });
        allFiles.forEach(([path, entry]) => visitor(path, entry));
    }
    // Change content of host files.
    overwrite(path, content) {
        const p = this._normalizePath(path);
        if (!this._recordSync.exists(p)) {
            throw new exception_1.FileDoesNotExistException(p);
        }
        const c = typeof content == 'string' ? Buffer.from(content) : content;
        this._record.overwrite(p, c).subscribe();
    }
    beginUpdate(path) {
        const entry = this.get(path);
        if (!entry) {
            throw new exception_1.FileDoesNotExistException(path);
        }
        return recorder_1.UpdateRecorderBase.createFromFileEntry(entry);
    }
    commitUpdate(record) {
        if (record instanceof recorder_1.UpdateRecorderBase) {
            const path = record.path;
            const entry = this.get(path);
            if (!entry) {
                throw new exception_1.ContentHasMutatedException(path);
            }
            else {
                const newContent = record.apply(entry.content);
                this.overwrite(path, newContent);
            }
        }
        else {
            throw new exception_1.InvalidUpdateRecordException();
        }
    }
    // Structural methods.
    create(path, content) {
        const p = this._normalizePath(path);
        if (this._recordSync.exists(p)) {
            throw new exception_1.FileAlreadyExistException(p);
        }
        const c = typeof content == 'string' ? Buffer.from(content) : content;
        this._record.create(p, c).subscribe();
    }
    delete(path) {
        this._recordSync.delete(this._normalizePath(path));
    }
    rename(from, to) {
        this._recordSync.rename(this._normalizePath(from), this._normalizePath(to));
    }
    apply(action, strategy) {
        throw new exception_1.SchematicsException('Apply not implemented on host trees.');
    }
    get actions() {
        // Create a list of all records until we hit our original backend. This is to support branches
        // that diverge from each others.
        const allRecords = [...this._record.records()];
        return core_1.clean(allRecords
            .map(record => {
            switch (record.kind) {
                case 'create':
                    return {
                        id: this._id,
                        parent: 0,
                        kind: 'c',
                        path: record.path,
                        content: Buffer.from(record.content),
                    };
                case 'overwrite':
                    return {
                        id: this._id,
                        parent: 0,
                        kind: 'o',
                        path: record.path,
                        content: Buffer.from(record.content),
                    };
                case 'rename':
                    return {
                        id: this._id,
                        parent: 0,
                        kind: 'r',
                        path: record.from,
                        to: record.to,
                    };
                case 'delete':
                    return {
                        id: this._id,
                        parent: 0,
                        kind: 'd',
                        path: record.path,
                    };
                default:
                    return;
            }
        }));
    }
}
exports.HostTree = HostTree;
class HostCreateTree extends HostTree {
    constructor(host) {
        super();
        const tempHost = new HostTree(host);
        tempHost.visit(path => {
            const content = tempHost.read(path);
            if (content) {
                this.create(path, content);
            }
        });
    }
}
exports.HostCreateTree = HostCreateTree;
class FilterHostTree extends HostTree {
    constructor(tree, filter = () => true) {
        const newBackend = new core_1.virtualFs.SimpleMemoryHost();
        // cast to allow access
        const originalBackend = tree._backend;
        const recurse = base => {
            return originalBackend.list(base)
                .pipe(operators_1.mergeMap(x => x), operators_1.map(path => core_1.join(base, path)), operators_1.concatMap(path => {
                let isDirectory = false;
                originalBackend.isDirectory(path).subscribe(val => isDirectory = val);
                if (isDirectory) {
                    return recurse(path);
                }
                let isFile = false;
                originalBackend.isFile(path).subscribe(val => isFile = val);
                if (!isFile || !filter(path)) {
                    return rxjs_1.of();
                }
                let content = null;
                originalBackend.read(path).subscribe(val => content = val);
                if (!content) {
                    return rxjs_1.of();
                }
                return newBackend.write(path, content);
            }));
        };
        recurse(core_1.normalize('/')).subscribe();
        super(newBackend);
        for (const action of tree.actions) {
            if (!filter(action.path)) {
                continue;
            }
            switch (action.kind) {
                case 'c':
                    this.create(action.path, action.content);
                    break;
                case 'd':
                    this.delete(action.path);
                    break;
                case 'o':
                    this.overwrite(action.path, action.content);
                    break;
                case 'r':
                    this.rename(action.path, action.to);
                    break;
            }
        }
    }
}
exports.FilterHostTree = FilterHostTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9zdC10cmVlLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9zY2hlbWF0aWNzL3NyYy90cmVlL2hvc3QtdHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtDQVU4QjtBQUM5QiwrQkFBc0M7QUFDdEMsOENBQTBEO0FBQzFELHNEQU9nQztBQVFoQyxtQ0FBd0M7QUFDeEMsMkNBVXFCO0FBQ3JCLHlDQUFnRDtBQUdoRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFHbEI7SUFDRSxZQUNXLE1BQXVCLEVBQ3ZCLElBQVUsRUFDVCxLQUFpQyxFQUNqQyxLQUFXO1FBSFosV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFDdkIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNULFVBQUssR0FBTCxLQUFLLENBQTRCO1FBQ2pDLFVBQUssR0FBTCxLQUFLLENBQU07SUFDcEIsQ0FBQztJQUVKLElBQUksT0FBTztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzlCLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBQ0QsSUFBSSxRQUFRO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBa0I7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LENBQUMsQ0FBQyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixRQUFRLENBQUM7WUFDWCxDQUFDO1lBRUQsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLEtBQUssR0FBRztvQkFDTixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN6QyxLQUFLLENBQUM7Z0JBQ1IsS0FBSyxHQUFHO29CQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6QixLQUFLLENBQUM7Z0JBQ1IsS0FBSyxHQUFHO29CQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzVDLEtBQUssQ0FBQztnQkFDUixLQUFLLEdBQUc7b0JBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDcEMsS0FBSyxDQUFDO1lBQ1YsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUE1REQsd0NBNERDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtcbiAgUGF0aCxcbiAgUGF0aEZyYWdtZW50LFxuICBQYXRoSXNEaXJlY3RvcnlFeGNlcHRpb24sXG4gIFBhdGhJc0ZpbGVFeGNlcHRpb24sXG4gIGNsZWFuLFxuICBkaXJuYW1lLFxuICBqb2luLFxuICBub3JtYWxpemUsXG4gIHZpcnR1YWxGcyxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvbmNhdE1hcCwgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIENvbnRlbnRIYXNNdXRhdGVkRXhjZXB0aW9uLFxuICBGaWxlQWxyZWFkeUV4aXN0RXhjZXB0aW9uLFxuICBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uLFxuICBJbnZhbGlkVXBkYXRlUmVjb3JkRXhjZXB0aW9uLFxuICBNZXJnZUNvbmZsaWN0RXhjZXB0aW9uLFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxufSBmcm9tICcuLi9leGNlcHRpb24vZXhjZXB0aW9uJztcbmltcG9ydCB7XG4gIEFjdGlvbixcbiAgQ3JlYXRlRmlsZUFjdGlvbixcbiAgRGVsZXRlRmlsZUFjdGlvbixcbiAgT3ZlcndyaXRlRmlsZUFjdGlvbixcbiAgUmVuYW1lRmlsZUFjdGlvbixcbn0gZnJvbSAnLi9hY3Rpb24nO1xuaW1wb3J0IHsgTGF6eUZpbGVFbnRyeSB9IGZyb20gJy4vZW50cnknO1xuaW1wb3J0IHtcbiAgRGlyRW50cnksXG4gIEZpbGVFbnRyeSxcbiAgRmlsZVByZWRpY2F0ZSxcbiAgRmlsZVZpc2l0b3IsXG4gIEZpbGVWaXNpdG9yQ2FuY2VsVG9rZW4sXG4gIE1lcmdlU3RyYXRlZ3ksXG4gIFRyZWUsXG4gIFRyZWVTeW1ib2wsXG4gIFVwZGF0ZVJlY29yZGVyLFxufSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBVcGRhdGVSZWNvcmRlckJhc2UgfSBmcm9tICcuL3JlY29yZGVyJztcblxuXG5sZXQgX3VuaXF1ZUlkID0gMDtcblxuXG5leHBvcnQgY2xhc3MgSG9zdERpckVudHJ5IGltcGxlbWVudHMgRGlyRW50cnkge1xuICBjb25zdHJ1Y3RvcihcbiAgICByZWFkb25seSBwYXJlbnQ6IERpckVudHJ5IHwgbnVsbCxcbiAgICByZWFkb25seSBwYXRoOiBQYXRoLFxuICAgIHByb3RlY3RlZCBfaG9zdDogdmlydHVhbEZzLlN5bmNEZWxlZ2F0ZUhvc3QsXG4gICAgcHJvdGVjdGVkIF90cmVlOiBUcmVlLFxuICApIHt9XG5cbiAgZ2V0IHN1YmRpcnMoKTogUGF0aEZyYWdtZW50W10ge1xuICAgIHJldHVybiB0aGlzLl9ob3N0Lmxpc3QodGhpcy5wYXRoKVxuICAgICAgLmZpbHRlcihmcmFnbWVudCA9PiB0aGlzLl9ob3N0LmlzRGlyZWN0b3J5KGpvaW4odGhpcy5wYXRoLCBmcmFnbWVudCkpKTtcbiAgfVxuICBnZXQgc3ViZmlsZXMoKTogUGF0aEZyYWdtZW50W10ge1xuICAgIHJldHVybiB0aGlzLl9ob3N0Lmxpc3QodGhpcy5wYXRoKVxuICAgICAgLmZpbHRlcihmcmFnbWVudCA9PiB0aGlzLl9ob3N0LmlzRmlsZShqb2luKHRoaXMucGF0aCwgZnJhZ21lbnQpKSk7XG4gIH1cblxuICBkaXIobmFtZTogUGF0aEZyYWdtZW50KTogRGlyRW50cnkge1xuICAgIHJldHVybiB0aGlzLl90cmVlLmdldERpcihqb2luKHRoaXMucGF0aCwgbmFtZSkpO1xuICB9XG4gIGZpbGUobmFtZTogUGF0aEZyYWdtZW50KTogRmlsZUVudHJ5IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3RyZWUuZ2V0KGpvaW4odGhpcy5wYXRoLCBuYW1lKSk7XG4gIH1cblxuICB2aXNpdCh2aXNpdG9yOiBGaWxlVmlzaXRvcik6IHZvaWQge1xuICAgIGZ1bmN0aW9uIF9yZWN1cnNlKGVudHJ5OiBEaXJFbnRyeSkge1xuICAgICAgZW50cnkuc3ViZmlsZXMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgdmlzaXRvcihqb2luKGVudHJ5LnBhdGgsIHBhdGgpLCBlbnRyeS5maWxlKHBhdGgpKTtcbiAgICAgIH0pO1xuICAgICAgZW50cnkuc3ViZGlycy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICBfcmVjdXJzZShlbnRyeS5kaXIocGF0aCkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIF9yZWN1cnNlKHRoaXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlICE9PSBGaWxlVmlzaXRvckNhbmNlbFRva2VuKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEhvc3RUcmVlIGltcGxlbWVudHMgVHJlZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2lkID0gLS1fdW5pcXVlSWQ7XG4gIHByaXZhdGUgX3JlY29yZDogdmlydHVhbEZzLkNvcmRIb3N0O1xuICBwcml2YXRlIF9yZWNvcmRTeW5jOiB2aXJ0dWFsRnMuU3luY0RlbGVnYXRlSG9zdDtcbiAgcHJpdmF0ZSBfYW5jZXN0cnkgPSBuZXcgU2V0PG51bWJlcj4oKTtcblxuICBwcml2YXRlIF9kaXJDYWNoZSA9IG5ldyBNYXA8UGF0aCwgSG9zdERpckVudHJ5PigpO1xuXG5cbiAgW1RyZWVTeW1ib2xdKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9iYWNrZW5kOiB2aXJ0dWFsRnMuUmVhZG9ubHlIb3N0PHt9PiA9IG5ldyB2aXJ0dWFsRnMuRW1wdHkoKSkge1xuICAgIHRoaXMuX3JlY29yZCA9IG5ldyB2aXJ0dWFsRnMuQ29yZEhvc3QobmV3IHZpcnR1YWxGcy5TYWZlUmVhZG9ubHlIb3N0KF9iYWNrZW5kKSk7XG4gICAgdGhpcy5fcmVjb3JkU3luYyA9IG5ldyB2aXJ0dWFsRnMuU3luY0RlbGVnYXRlSG9zdCh0aGlzLl9yZWNvcmQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9ub3JtYWxpemVQYXRoKHBhdGg6IHN0cmluZyk6IFBhdGgge1xuICAgIHJldHVybiBub3JtYWxpemUoJy8nICsgcGF0aCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3dpbGxDcmVhdGUocGF0aDogUGF0aCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmQud2lsbENyZWF0ZShwYXRoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfd2lsbE92ZXJ3cml0ZShwYXRoOiBQYXRoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZC53aWxsT3ZlcndyaXRlKHBhdGgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF93aWxsRGVsZXRlKHBhdGg6IFBhdGgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkLndpbGxEZWxldGUocGF0aCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3dpbGxSZW5hbWUocGF0aDogUGF0aCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmQud2lsbFJlbmFtZShwYXRoKTtcbiAgfVxuXG4gIC8vIFRoaXMgY2FuIGJlIHVzZWQgYnkgb2xkIFNjaGVtYXRpY3MgbGlicmFyeSB3aXRoIG5ldyBUcmVlcyBpbiBzb21lIGNvcm5lciBjYXNlcy5cbiAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgZm9yIDcuMFxuICBvcHRpbWl6ZSgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGJyYW5jaCgpOiBUcmVlIHtcbiAgICBjb25zdCBicmFuY2hlZFRyZWUgPSBuZXcgSG9zdFRyZWUodGhpcy5fYmFja2VuZCk7XG4gICAgYnJhbmNoZWRUcmVlLl9yZWNvcmQgPSB0aGlzLl9yZWNvcmQuY2xvbmUoKTtcbiAgICBicmFuY2hlZFRyZWUuX3JlY29yZFN5bmMgPSBuZXcgdmlydHVhbEZzLlN5bmNEZWxlZ2F0ZUhvc3QoYnJhbmNoZWRUcmVlLl9yZWNvcmQpO1xuICAgIGJyYW5jaGVkVHJlZS5fYW5jZXN0cnkgPSBuZXcgU2V0KHRoaXMuX2FuY2VzdHJ5KS5hZGQodGhpcy5faWQpO1xuXG4gICAgcmV0dXJuIGJyYW5jaGVkVHJlZTtcbiAgfVxuXG4gIG1lcmdlKG90aGVyOiBUcmVlLCBzdHJhdGVneTogTWVyZ2VTdHJhdGVneSA9IE1lcmdlU3RyYXRlZ3kuRGVmYXVsdCk6IHZvaWQge1xuICAgIGlmIChvdGhlciA9PT0gdGhpcykge1xuICAgICAgLy8gTWVyZ2luZyB3aXRoIHlvdXJzZWxmPyBUc2sgdHNrLiBOb3RoaW5nIHRvIGRvIGF0IGxlYXN0LlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChvdGhlciBpbnN0YW5jZW9mIEhvc3RUcmVlICYmIG90aGVyLl9hbmNlc3RyeS5oYXModGhpcy5faWQpKSB7XG4gICAgICAvLyBXb3JrYXJvdW5kIGZvciBtZXJnaW5nIGEgYnJhbmNoIGJhY2sgaW50byBvbmUgb2YgaXRzIGFuY2VzdG9yc1xuICAgICAgLy8gTW9yZSBjb21wbGV0ZSBicmFuY2ggcG9pbnQgdHJhY2tpbmcgaXMgcmVxdWlyZWQgdG8gYXZvaWRcbiAgICAgIHN0cmF0ZWd5IHw9IE1lcmdlU3RyYXRlZ3kuT3ZlcndyaXRlO1xuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0aW9uQ29uZmxpY3RBbGxvd2VkID1cbiAgICAgIChzdHJhdGVneSAmIE1lcmdlU3RyYXRlZ3kuQWxsb3dDcmVhdGlvbkNvbmZsaWN0KSA9PSBNZXJnZVN0cmF0ZWd5LkFsbG93Q3JlYXRpb25Db25mbGljdDtcbiAgICBjb25zdCBvdmVyd3JpdGVDb25mbGljdEFsbG93ZWQgPVxuICAgICAgKHN0cmF0ZWd5ICYgTWVyZ2VTdHJhdGVneS5BbGxvd092ZXJ3cml0ZUNvbmZsaWN0KSA9PSBNZXJnZVN0cmF0ZWd5LkFsbG93T3ZlcndyaXRlQ29uZmxpY3Q7XG4gICAgY29uc3QgZGVsZXRlQ29uZmxpY3RBbGxvd2VkID1cbiAgICAgIChzdHJhdGVneSAmIE1lcmdlU3RyYXRlZ3kuQWxsb3dPdmVyd3JpdGVDb25mbGljdCkgPT0gTWVyZ2VTdHJhdGVneS5BbGxvd0RlbGV0ZUNvbmZsaWN0O1xuXG4gICAgb3RoZXIuYWN0aW9ucy5mb3JFYWNoKGFjdGlvbiA9PiB7XG4gICAgICBzd2l0Y2ggKGFjdGlvbi5raW5kKSB7XG4gICAgICAgIGNhc2UgJ2MnOiB7XG4gICAgICAgICAgY29uc3QgeyBwYXRoLCBjb250ZW50IH0gPSBhY3Rpb247XG5cbiAgICAgICAgICBpZiAoKHRoaXMuX3dpbGxDcmVhdGUocGF0aCkgfHwgdGhpcy5fd2lsbE92ZXJ3cml0ZShwYXRoKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nQ29udGVudCA9IHRoaXMucmVhZChwYXRoKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0NvbnRlbnQgJiYgY29udGVudC5lcXVhbHMoZXhpc3RpbmdDb250ZW50KSkge1xuICAgICAgICAgICAgICAvLyBJZGVudGljYWwgb3V0Y29tZTsgbm8gYWN0aW9uIHJlcXVpcmVkXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFjcmVhdGlvbkNvbmZsaWN0QWxsb3dlZCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgTWVyZ2VDb25mbGljdEV4Y2VwdGlvbihwYXRoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fcmVjb3JkLm92ZXJ3cml0ZShwYXRoLCBjb250ZW50IGFzIHt9IGFzIHZpcnR1YWxGcy5GaWxlQnVmZmVyKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcmVjb3JkLmNyZWF0ZShwYXRoLCBjb250ZW50IGFzIHt9IGFzIHZpcnR1YWxGcy5GaWxlQnVmZmVyKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdvJzoge1xuICAgICAgICAgIGNvbnN0IHsgcGF0aCwgY29udGVudCB9ID0gYWN0aW9uO1xuICAgICAgICAgIGlmICh0aGlzLl93aWxsRGVsZXRlKHBhdGgpICYmICFvdmVyd3JpdGVDb25mbGljdEFsbG93ZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXJnZUNvbmZsaWN0RXhjZXB0aW9uKHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIElnbm9yZSBpZiBjb250ZW50IGlzIHRoZSBzYW1lIChjb25zaWRlcmVkIHRoZSBzYW1lIGNoYW5nZSkuXG4gICAgICAgICAgaWYgKHRoaXMuX3dpbGxPdmVyd3JpdGUocGF0aCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nQ29udGVudCA9IHRoaXMucmVhZChwYXRoKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0NvbnRlbnQgJiYgY29udGVudC5lcXVhbHMoZXhpc3RpbmdDb250ZW50KSkge1xuICAgICAgICAgICAgICAvLyBJZGVudGljYWwgb3V0Y29tZTsgbm8gYWN0aW9uIHJlcXVpcmVkXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFvdmVyd3JpdGVDb25mbGljdEFsbG93ZWQpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IE1lcmdlQ29uZmxpY3RFeGNlcHRpb24ocGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFdlIHVzZSB3cml0ZSBoZXJlIGFzIG1lcmdlIHZhbGlkYXRpb24gaGFzIGFscmVhZHkgYmVlbiBkb25lLCBhbmQgd2Ugd2FudCB0byBsZXRcbiAgICAgICAgICAvLyB0aGUgQ29yZEhvc3QgZG8gaXRzIGpvYi5cbiAgICAgICAgICB0aGlzLl9yZWNvcmQud3JpdGUocGF0aCwgY29udGVudCBhcyB7fSBhcyB2aXJ0dWFsRnMuRmlsZUJ1ZmZlcikuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdyJzoge1xuICAgICAgICAgIGNvbnN0IHsgcGF0aCwgdG8gfSA9IGFjdGlvbjtcbiAgICAgICAgICBpZiAodGhpcy5fd2lsbERlbGV0ZShwYXRoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1lcmdlQ29uZmxpY3RFeGNlcHRpb24ocGF0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuX3dpbGxSZW5hbWUocGF0aCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZWNvcmQud2lsbFJlbmFtZVRvKHBhdGgsIHRvKSkge1xuICAgICAgICAgICAgICAvLyBJZGVudGljYWwgb3V0Y29tZTsgbm8gYWN0aW9uIHJlcXVpcmVkXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTm8gb3ZlcnJpZGUgcG9zc2libGUgZm9yIHJlbmFtaW5nLlxuICAgICAgICAgICAgdGhyb3cgbmV3IE1lcmdlQ29uZmxpY3RFeGNlcHRpb24ocGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucmVuYW1lKHBhdGgsIHRvKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2QnOiB7XG4gICAgICAgICAgY29uc3QgeyBwYXRoIH0gPSBhY3Rpb247XG4gICAgICAgICAgaWYgKHRoaXMuX3dpbGxEZWxldGUocGF0aCkpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IFRoaXMgc2hvdWxkIHRlY2huaWNhbGx5IGNoZWNrIHRoZSBjb250ZW50IChlLmcuLCBoYXNoIG9uIGRlbGV0ZSlcbiAgICAgICAgICAgIC8vIElkZW50aWNhbCBvdXRjb21lOyBubyBhY3Rpb24gcmVxdWlyZWRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXRoaXMuZXhpc3RzKHBhdGgpICYmICFkZWxldGVDb25mbGljdEFsbG93ZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXJnZUNvbmZsaWN0RXhjZXB0aW9uKHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX3JlY29yZFN5bmMuZGVsZXRlKHBhdGgpO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXQgcm9vdCgpOiBEaXJFbnRyeSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RGlyKCcvJyk7XG4gIH1cblxuICAvLyBSZWFkb25seS5cbiAgcmVhZChwYXRoOiBzdHJpbmcpOiBCdWZmZXIgfCBudWxsIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0KHBhdGgpO1xuXG4gICAgcmV0dXJuIGVudHJ5ID8gZW50cnkuY29udGVudCA6IG51bGw7XG4gIH1cbiAgZXhpc3RzKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRTeW5jLmlzRmlsZSh0aGlzLl9ub3JtYWxpemVQYXRoKHBhdGgpKTtcbiAgfVxuXG4gIGdldChwYXRoOiBzdHJpbmcpOiBGaWxlRW50cnkgfCBudWxsIHtcbiAgICBjb25zdCBwID0gdGhpcy5fbm9ybWFsaXplUGF0aChwYXRoKTtcbiAgICBpZiAodGhpcy5fcmVjb3JkU3luYy5pc0RpcmVjdG9yeShwKSkge1xuICAgICAgdGhyb3cgbmV3IFBhdGhJc0RpcmVjdG9yeUV4Y2VwdGlvbihwKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9yZWNvcmRTeW5jLmV4aXN0cyhwKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBMYXp5RmlsZUVudHJ5KHAsICgpID0+IEJ1ZmZlci5mcm9tKHRoaXMuX3JlY29yZFN5bmMucmVhZChwKSkpO1xuICB9XG5cbiAgZ2V0RGlyKHBhdGg6IHN0cmluZyk6IERpckVudHJ5IHtcbiAgICBjb25zdCBwID0gdGhpcy5fbm9ybWFsaXplUGF0aChwYXRoKTtcbiAgICBpZiAodGhpcy5fcmVjb3JkU3luYy5pc0ZpbGUocCkpIHtcbiAgICAgIHRocm93IG5ldyBQYXRoSXNGaWxlRXhjZXB0aW9uKHApO1xuICAgIH1cblxuICAgIGxldCBtYXliZUNhY2hlID0gdGhpcy5fZGlyQ2FjaGUuZ2V0KHApO1xuICAgIGlmICghbWF5YmVDYWNoZSkge1xuICAgICAgbGV0IHBhcmVudDogUGF0aCB8IG51bGwgPSBkaXJuYW1lKHApO1xuICAgICAgaWYgKHAgPT09IHBhcmVudCkge1xuICAgICAgICBwYXJlbnQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBtYXliZUNhY2hlID0gbmV3IEhvc3REaXJFbnRyeShwYXJlbnQgJiYgdGhpcy5nZXREaXIocGFyZW50KSwgcCwgdGhpcy5fcmVjb3JkU3luYywgdGhpcyk7XG4gICAgICB0aGlzLl9kaXJDYWNoZS5zZXQocCwgbWF5YmVDYWNoZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1heWJlQ2FjaGU7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogRmlsZVZpc2l0b3IpOiB2b2lkIHtcbiAgICBjb25zdCBhbGxGaWxlczogW1BhdGgsIEZpbGVFbnRyeSB8IG51bGwgfCB1bmRlZmluZWRdW10gPSBbXTtcbiAgICB0aGlzLnJvb3QudmlzaXQoKHBhdGgsIGVudHJ5KSA9PiB7XG4gICAgICBhbGxGaWxlcy5wdXNoKFtwYXRoLCBlbnRyeV0pO1xuICAgIH0pO1xuXG4gICAgYWxsRmlsZXMuZm9yRWFjaCgoW3BhdGgsIGVudHJ5XSkgPT4gdmlzaXRvcihwYXRoLCBlbnRyeSkpO1xuICB9XG5cbiAgLy8gQ2hhbmdlIGNvbnRlbnQgb2YgaG9zdCBmaWxlcy5cbiAgb3ZlcndyaXRlKHBhdGg6IHN0cmluZywgY29udGVudDogQnVmZmVyIHwgc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgcCA9IHRoaXMuX25vcm1hbGl6ZVBhdGgocGF0aCk7XG4gICAgaWYgKCF0aGlzLl9yZWNvcmRTeW5jLmV4aXN0cyhwKSkge1xuICAgICAgdGhyb3cgbmV3IEZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb24ocCk7XG4gICAgfVxuICAgIGNvbnN0IGMgPSB0eXBlb2YgY29udGVudCA9PSAnc3RyaW5nJyA/IEJ1ZmZlci5mcm9tKGNvbnRlbnQpIDogY29udGVudDtcbiAgICB0aGlzLl9yZWNvcmQub3ZlcndyaXRlKHAsIGMgYXMge30gYXMgdmlydHVhbEZzLkZpbGVCdWZmZXIpLnN1YnNjcmliZSgpO1xuICB9XG4gIGJlZ2luVXBkYXRlKHBhdGg6IHN0cmluZyk6IFVwZGF0ZVJlY29yZGVyIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0KHBhdGgpO1xuICAgIGlmICghZW50cnkpIHtcbiAgICAgIHRocm93IG5ldyBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uKHBhdGgpO1xuICAgIH1cblxuICAgIHJldHVybiBVcGRhdGVSZWNvcmRlckJhc2UuY3JlYXRlRnJvbUZpbGVFbnRyeShlbnRyeSk7XG4gIH1cbiAgY29tbWl0VXBkYXRlKHJlY29yZDogVXBkYXRlUmVjb3JkZXIpOiB2b2lkIHtcbiAgICBpZiAocmVjb3JkIGluc3RhbmNlb2YgVXBkYXRlUmVjb3JkZXJCYXNlKSB7XG4gICAgICBjb25zdCBwYXRoID0gcmVjb3JkLnBhdGg7XG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0KHBhdGgpO1xuICAgICAgaWYgKCFlbnRyeSkge1xuICAgICAgICB0aHJvdyBuZXcgQ29udGVudEhhc011dGF0ZWRFeGNlcHRpb24ocGF0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBuZXdDb250ZW50ID0gcmVjb3JkLmFwcGx5KGVudHJ5LmNvbnRlbnQpO1xuICAgICAgICB0aGlzLm92ZXJ3cml0ZShwYXRoLCBuZXdDb250ZW50KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRVcGRhdGVSZWNvcmRFeGNlcHRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvLyBTdHJ1Y3R1cmFsIG1ldGhvZHMuXG4gIGNyZWF0ZShwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IEJ1ZmZlciB8IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHAgPSB0aGlzLl9ub3JtYWxpemVQYXRoKHBhdGgpO1xuICAgIGlmICh0aGlzLl9yZWNvcmRTeW5jLmV4aXN0cyhwKSkge1xuICAgICAgdGhyb3cgbmV3IEZpbGVBbHJlYWR5RXhpc3RFeGNlcHRpb24ocCk7XG4gICAgfVxuICAgIGNvbnN0IGMgPSB0eXBlb2YgY29udGVudCA9PSAnc3RyaW5nJyA/IEJ1ZmZlci5mcm9tKGNvbnRlbnQpIDogY29udGVudDtcbiAgICB0aGlzLl9yZWNvcmQuY3JlYXRlKHAsIGMgYXMge30gYXMgdmlydHVhbEZzLkZpbGVCdWZmZXIpLnN1YnNjcmliZSgpO1xuICB9XG4gIGRlbGV0ZShwYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZWNvcmRTeW5jLmRlbGV0ZSh0aGlzLl9ub3JtYWxpemVQYXRoKHBhdGgpKTtcbiAgfVxuICByZW5hbWUoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVjb3JkU3luYy5yZW5hbWUodGhpcy5fbm9ybWFsaXplUGF0aChmcm9tKSwgdGhpcy5fbm9ybWFsaXplUGF0aCh0bykpO1xuICB9XG5cbiAgYXBwbHkoYWN0aW9uOiBBY3Rpb24sIHN0cmF0ZWd5PzogTWVyZ2VTdHJhdGVneSk6IHZvaWQge1xuICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKCdBcHBseSBub3QgaW1wbGVtZW50ZWQgb24gaG9zdCB0cmVlcy4nKTtcbiAgfVxuICBnZXQgYWN0aW9ucygpOiBBY3Rpb25bXSB7XG4gICAgLy8gQ3JlYXRlIGEgbGlzdCBvZiBhbGwgcmVjb3JkcyB1bnRpbCB3ZSBoaXQgb3VyIG9yaWdpbmFsIGJhY2tlbmQuIFRoaXMgaXMgdG8gc3VwcG9ydCBicmFuY2hlc1xuICAgIC8vIHRoYXQgZGl2ZXJnZSBmcm9tIGVhY2ggb3RoZXJzLlxuICAgIGNvbnN0IGFsbFJlY29yZHMgPSBbLi4udGhpcy5fcmVjb3JkLnJlY29yZHMoKV07XG5cbiAgICByZXR1cm4gY2xlYW4oXG4gICAgICBhbGxSZWNvcmRzXG4gICAgICAgIC5tYXAocmVjb3JkID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlY29yZC5raW5kKSB7XG4gICAgICAgICAgICBjYXNlICdjcmVhdGUnOlxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLl9pZCxcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IDAsXG4gICAgICAgICAgICAgICAga2luZDogJ2MnLFxuICAgICAgICAgICAgICAgIHBhdGg6IHJlY29yZC5wYXRoLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEJ1ZmZlci5mcm9tKHJlY29yZC5jb250ZW50KSxcbiAgICAgICAgICAgICAgfSBhcyBDcmVhdGVGaWxlQWN0aW9uO1xuICAgICAgICAgICAgY2FzZSAnb3ZlcndyaXRlJzpcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5faWQsXG4gICAgICAgICAgICAgICAgcGFyZW50OiAwLFxuICAgICAgICAgICAgICAgIGtpbmQ6ICdvJyxcbiAgICAgICAgICAgICAgICBwYXRoOiByZWNvcmQucGF0aCxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBCdWZmZXIuZnJvbShyZWNvcmQuY29udGVudCksXG4gICAgICAgICAgICAgIH0gYXMgT3ZlcndyaXRlRmlsZUFjdGlvbjtcbiAgICAgICAgICAgIGNhc2UgJ3JlbmFtZSc6XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuX2lkLFxuICAgICAgICAgICAgICAgIHBhcmVudDogMCxcbiAgICAgICAgICAgICAgICBraW5kOiAncicsXG4gICAgICAgICAgICAgICAgcGF0aDogcmVjb3JkLmZyb20sXG4gICAgICAgICAgICAgICAgdG86IHJlY29yZC50byxcbiAgICAgICAgICAgICAgfSBhcyBSZW5hbWVGaWxlQWN0aW9uO1xuICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5faWQsXG4gICAgICAgICAgICAgICAgcGFyZW50OiAwLFxuICAgICAgICAgICAgICAgIGtpbmQ6ICdkJyxcbiAgICAgICAgICAgICAgICBwYXRoOiByZWNvcmQucGF0aCxcbiAgICAgICAgICAgICAgfSBhcyBEZWxldGVGaWxlQWN0aW9uO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBIb3N0Q3JlYXRlVHJlZSBleHRlbmRzIEhvc3RUcmVlIHtcbiAgY29uc3RydWN0b3IoaG9zdDogdmlydHVhbEZzLlJlYWRvbmx5SG9zdCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBjb25zdCB0ZW1wSG9zdCA9IG5ldyBIb3N0VHJlZShob3N0KTtcbiAgICB0ZW1wSG9zdC52aXNpdChwYXRoID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0ZW1wSG9zdC5yZWFkKHBhdGgpO1xuICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5jcmVhdGUocGF0aCwgY29udGVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZpbHRlckhvc3RUcmVlIGV4dGVuZHMgSG9zdFRyZWUge1xuICBjb25zdHJ1Y3Rvcih0cmVlOiBIb3N0VHJlZSwgZmlsdGVyOiBGaWxlUHJlZGljYXRlPGJvb2xlYW4+ID0gKCkgPT4gdHJ1ZSkge1xuICAgIGNvbnN0IG5ld0JhY2tlbmQgPSBuZXcgdmlydHVhbEZzLlNpbXBsZU1lbW9yeUhvc3QoKTtcbiAgICAvLyBjYXN0IHRvIGFsbG93IGFjY2Vzc1xuICAgIGNvbnN0IG9yaWdpbmFsQmFja2VuZCA9ICh0cmVlIGFzIEZpbHRlckhvc3RUcmVlKS5fYmFja2VuZDtcblxuICAgIGNvbnN0IHJlY3Vyc2U6IChiYXNlOiBQYXRoKSA9PiBPYnNlcnZhYmxlPHZvaWQ+ID0gYmFzZSA9PiB7XG4gICAgICByZXR1cm4gb3JpZ2luYWxCYWNrZW5kLmxpc3QoYmFzZSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWVyZ2VNYXAoeCA9PiB4KSxcbiAgICAgICAgICBtYXAocGF0aCA9PiBqb2luKGJhc2UsIHBhdGgpKSxcbiAgICAgICAgICBjb25jYXRNYXAocGF0aCA9PiB7XG4gICAgICAgICAgICBsZXQgaXNEaXJlY3RvcnkgPSBmYWxzZTtcbiAgICAgICAgICAgIG9yaWdpbmFsQmFja2VuZC5pc0RpcmVjdG9yeShwYXRoKS5zdWJzY3JpYmUodmFsID0+IGlzRGlyZWN0b3J5ID0gdmFsKTtcbiAgICAgICAgICAgIGlmIChpc0RpcmVjdG9yeSkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVjdXJzZShwYXRoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGlzRmlsZSA9IGZhbHNlO1xuICAgICAgICAgICAgb3JpZ2luYWxCYWNrZW5kLmlzRmlsZShwYXRoKS5zdWJzY3JpYmUodmFsID0+IGlzRmlsZSA9IHZhbCk7XG4gICAgICAgICAgICBpZiAoIWlzRmlsZSB8fCAhZmlsdGVyKHBhdGgpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBvZigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgY29udGVudDogQXJyYXlCdWZmZXIgfCBudWxsID0gbnVsbDtcbiAgICAgICAgICAgIG9yaWdpbmFsQmFja2VuZC5yZWFkKHBhdGgpLnN1YnNjcmliZSh2YWwgPT4gY29udGVudCA9IHZhbCk7XG4gICAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9mKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdCYWNrZW5kLndyaXRlKHBhdGgsIGNvbnRlbnQgYXMge30gYXMgdmlydHVhbEZzLkZpbGVCdWZmZXIpO1xuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH07XG5cbiAgICByZWN1cnNlKG5vcm1hbGl6ZSgnLycpKS5zdWJzY3JpYmUoKTtcblxuICAgIHN1cGVyKG5ld0JhY2tlbmQpO1xuXG4gICAgZm9yIChjb25zdCBhY3Rpb24gb2YgdHJlZS5hY3Rpb25zKSB7XG4gICAgICBpZiAoIWZpbHRlcihhY3Rpb24ucGF0aCkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoYWN0aW9uLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgdGhpcy5jcmVhdGUoYWN0aW9uLnBhdGgsIGFjdGlvbi5jb250ZW50KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgdGhpcy5kZWxldGUoYWN0aW9uLnBhdGgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvJzpcbiAgICAgICAgICB0aGlzLm92ZXJ3cml0ZShhY3Rpb24ucGF0aCwgYWN0aW9uLmNvbnRlbnQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyJzpcbiAgICAgICAgICB0aGlzLnJlbmFtZShhY3Rpb24ucGF0aCwgYWN0aW9uLnRvKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==