"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const exception_1 = require("../../exception");
const memory_1 = require("./memory");
/**
 * A Host that records changes to the underlying Host, while keeping a record of Create, Overwrite,
 * Rename and Delete of files.
 *
 * This is fully compatible with Host, but will keep a staging of every changes asked. That staging
 * follows the principle of the Tree (e.g. can create a file that already exists).
 *
 * Using `create()` and `overwrite()` will force those operations, but using `write` will add
 * the create/overwrite records IIF the files does/doesn't already exist.
 */
class CordHost extends memory_1.SimpleMemoryHost {
    constructor(_back) {
        super();
        this._back = _back;
        this._filesToCreate = new Set();
        this._filesToRename = new Map();
        this._filesToRenameRevert = new Map();
        this._filesToDelete = new Set();
        this._filesToOverwrite = new Set();
    }
    get backend() { return this._back; }
    get capabilities() {
        // Our own host is always Synchronous, but the backend might not be.
        return {
            synchronous: this._back.capabilities.synchronous,
        };
    }
    /**
     * Create a copy of this host, including all actions made.
     * @returns {CordHost} The carbon copy.
     */
    clone() {
        const dolly = new CordHost(this._back);
        dolly._cache = new Map(this._cache);
        dolly._filesToCreate = new Set(this._filesToCreate);
        dolly._filesToRename = new Map(this._filesToRename);
        dolly._filesToRenameRevert = new Map(this._filesToRenameRevert);
        dolly._filesToDelete = new Set(this._filesToDelete);
        dolly._filesToOverwrite = new Set(this._filesToOverwrite);
        return dolly;
    }
    /**
     * Commit the changes recorded to a Host. It is assumed that the host does have the same structure
     * as the host that was used for backend (could be the same host).
     * @param host The host to create/delete/rename/overwrite files to.
     * @param force Whether to skip existence checks when creating/overwriting. This is
     *   faster but might lead to incorrect states. Because Hosts natively don't support creation
     *   versus overwriting (it's only writing), we check for existence before completing a request.
     * @returns An observable that completes when done, or error if an error occured.
     */
    commit(host, force = false) {
        // Really commit everything to the actual host.
        return rxjs_1.from(this.records()).pipe(operators_1.concatMap(record => {
            switch (record.kind) {
                case 'delete': return host.delete(record.path);
                case 'rename': return host.rename(record.from, record.to);
                case 'create':
                    return host.exists(record.path).pipe(operators_1.switchMap(exists => {
                        if (exists && !force) {
                            return rxjs_1.throwError(new exception_1.FileAlreadyExistException(record.path));
                        }
                        else {
                            return host.write(record.path, record.content);
                        }
                    }));
                case 'overwrite':
                    return host.exists(record.path).pipe(operators_1.switchMap(exists => {
                        if (!exists && !force) {
                            return rxjs_1.throwError(new exception_1.FileDoesNotExistException(record.path));
                        }
                        else {
                            return host.write(record.path, record.content);
                        }
                    }));
            }
        }), operators_1.reduce(() => { }));
    }
    records() {
        return [
            ...[...this._filesToDelete.values()].map(path => ({
                kind: 'delete', path,
            })),
            ...[...this._filesToRename.entries()].map(([from, to]) => ({
                kind: 'rename', from, to,
            })),
            ...[...this._filesToCreate.values()].map(path => ({
                kind: 'create', path, content: this._read(path),
            })),
            ...[...this._filesToOverwrite.values()].map(path => ({
                kind: 'overwrite', path, content: this._read(path),
            })),
        ];
    }
    /**
     * Specialized version of {@link CordHost#write} which forces the creation of a file whether it
     * exists or not.
     * @param {} path
     * @param {FileBuffer} content
     * @returns {Observable<void>}
     */
    create(path, content) {
        if (super._exists(path)) {
            throw new exception_1.FileAlreadyExistException(path);
        }
        if (this._filesToDelete.has(path)) {
            this._filesToDelete.delete(path);
            this._filesToOverwrite.add(path);
        }
        else {
            this._filesToCreate.add(path);
        }
        return super.write(path, content);
    }
    overwrite(path, content) {
        return this.isDirectory(path).pipe(operators_1.switchMap(isDir => {
            if (isDir) {
                return rxjs_1.throwError(new exception_1.PathIsDirectoryException(path));
            }
            return this.exists(path);
        }), operators_1.switchMap(exists => {
            if (!exists) {
                return rxjs_1.throwError(new exception_1.FileDoesNotExistException(path));
            }
            if (!this._filesToCreate.has(path)) {
                this._filesToOverwrite.add(path);
            }
            return super.write(path, content);
        }));
    }
    write(path, content) {
        return this.exists(path).pipe(operators_1.switchMap(exists => {
            if (exists) {
                // It exists, but might be being renamed or deleted. In that case we want to create it.
                if (this.willRename(path) || this.willDelete(path)) {
                    return this.create(path, content);
                }
                else {
                    return this.overwrite(path, content);
                }
            }
            else {
                return this.create(path, content);
            }
        }));
    }
    read(path) {
        if (this._exists(path)) {
            return super.read(path);
        }
        return this._back.read(path);
    }
    delete(path) {
        if (this._exists(path)) {
            if (this._filesToCreate.has(path)) {
                this._filesToCreate.delete(path);
            }
            else if (this._filesToOverwrite.has(path)) {
                this._filesToOverwrite.delete(path);
                this._filesToDelete.add(path);
            }
            else {
                const maybeOrigin = this._filesToRenameRevert.get(path);
                if (maybeOrigin) {
                    this._filesToRenameRevert.delete(path);
                    this._filesToRename.delete(maybeOrigin);
                    this._filesToDelete.add(maybeOrigin);
                }
                else {
                    return rxjs_1.throwError(new exception_1.UnknownException(`This should never happen. Path: ${JSON.stringify(path)}.`));
                }
            }
            return super.delete(path);
        }
        else {
            return this._back.exists(path).pipe(operators_1.switchMap(exists => {
                if (exists) {
                    this._filesToDelete.add(path);
                    return rxjs_1.of();
                }
                else {
                    return rxjs_1.throwError(new exception_1.FileDoesNotExistException(path));
                }
            }));
        }
    }
    rename(from, to) {
        return rxjs_1.concat(this.exists(to), this.exists(from)).pipe(operators_1.toArray(), operators_1.switchMap(([existTo, existFrom]) => {
            if (!existFrom) {
                return rxjs_1.throwError(new exception_1.FileDoesNotExistException(from));
            }
            if (from === to) {
                return rxjs_1.of();
            }
            if (existTo) {
                return rxjs_1.throwError(new exception_1.FileAlreadyExistException(to));
            }
            // If we're renaming a file that's been created, shortcircuit to creating the `to` path.
            if (this._filesToCreate.has(from)) {
                this._filesToCreate.delete(from);
                this._filesToCreate.add(to);
                return super.rename(from, to);
            }
            if (this._filesToOverwrite.has(from)) {
                this._filesToOverwrite.delete(from);
                // Recursively call this function. This is so we don't repeat the bottom logic. This
                // if will be by-passed because we just deleted the `from` path from files to overwrite.
                return rxjs_1.concat(this.rename(from, to), new rxjs_1.Observable(x => {
                    this._filesToOverwrite.add(to);
                    x.complete();
                }));
            }
            if (this._filesToDelete.has(to)) {
                this._filesToDelete.delete(to);
                this._filesToDelete.add(from);
                this._filesToOverwrite.add(to);
                // We need to delete the original and write the new one.
                return this.read(from).pipe(operators_1.map(content => this._write(to, content)));
            }
            const maybeTo1 = this._filesToRenameRevert.get(from);
            if (maybeTo1) {
                // We already renamed to this file (A => from), let's rename the former to the new
                // path (A => to).
                this._filesToRename.delete(maybeTo1);
                this._filesToRenameRevert.delete(from);
                from = maybeTo1;
            }
            this._filesToRename.set(from, to);
            this._filesToRenameRevert.set(to, from);
            // If the file is part of our data, just rename it internally.
            if (this._exists(from)) {
                return super.rename(from, to);
            }
            else {
                // Create a file with the same content.
                return this._back.read(from).pipe(operators_1.switchMap(content => super.write(to, content)));
            }
        }));
    }
    list(path) {
        return rxjs_1.concat(super.list(path), this._back.list(path)).pipe(operators_1.reduce((list, curr) => {
            curr.forEach(elem => list.add(elem));
            return list;
        }, new Set()), operators_1.map(set => [...set]));
    }
    exists(path) {
        return this._exists(path)
            ? rxjs_1.of(true)
            : ((this.willDelete(path) || this.willRename(path)) ? rxjs_1.of(false) : this._back.exists(path));
    }
    isDirectory(path) {
        return this._exists(path) ? super.isDirectory(path) : this._back.isDirectory(path);
    }
    isFile(path) {
        return this._exists(path)
            ? super.isFile(path)
            : ((this.willDelete(path) || this.willRename(path)) ? rxjs_1.of(false) : this._back.isFile(path));
    }
    stat(path) {
        // TODO: stat should be possible to implement, at least from memory.
        return null;
    }
    watch(path, options) {
        // Watching not supported.
        return null;
    }
    willCreate(path) {
        return this._filesToCreate.has(path);
    }
    willOverwrite(path) {
        return this._filesToOverwrite.has(path);
    }
    willDelete(path) {
        return this._filesToDelete.has(path);
    }
    willRename(path) {
        return this._filesToRename.has(path);
    }
    willRenameTo(path, to) {
        return this._filesToRename.get(path) === to;
    }
}
exports.CordHost = CordHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9jb3JlL3NyYy92aXJ0dWFsLWZzL2hvc3QvcmVjb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsK0JBTWM7QUFDZCw4Q0FBNEU7QUFDNUUsK0NBS3lCO0FBU3pCLHFDQUE0QztBQTRCNUM7Ozs7Ozs7OztHQVNHO0FBQ0gsY0FBc0IsU0FBUSx5QkFBZ0I7SUFPNUMsWUFBc0IsS0FBbUI7UUFBSSxLQUFLLEVBQUUsQ0FBQztRQUEvQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBTi9CLG1CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztRQUNqQyxtQkFBYyxHQUFHLElBQUksR0FBRyxFQUFjLENBQUM7UUFDdkMseUJBQW9CLEdBQUcsSUFBSSxHQUFHLEVBQWMsQ0FBQztRQUM3QyxtQkFBYyxHQUFHLElBQUksR0FBRyxFQUFRLENBQUM7UUFDakMsc0JBQWlCLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztJQUVRLENBQUM7SUFFdkQsSUFBSSxPQUFPLEtBQW1CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEQsSUFBSSxZQUFZO1FBQ2Qsb0VBQW9FO1FBQ3BFLE9BQU87WUFDTCxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVztTQUNqRCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUs7UUFDSCxNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdkMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsS0FBSyxDQUFDLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFD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LElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBVTtRQUNiLG9FQUFvRTtRQUNwRSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBVSxFQUFFLE9BQTBCO1FBQzFDLDBCQUEwQjtRQUMxQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxhQUFhLENBQUMsSUFBVTtRQUN0QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELFVBQVUsQ0FBQyxJQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNELFVBQVUsQ0FBQyxJQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNELFlBQVksQ0FBQyxJQUFVLEVBQUUsRUFBUTtRQUMvQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0NBQ0Y7QUF0VUQsNEJBc1VDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtcbiAgT2JzZXJ2YWJsZSxcbiAgY29uY2F0LFxuICBmcm9tIGFzIG9ic2VydmFibGVGcm9tLFxuICBvZixcbiAgdGhyb3dFcnJvcixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb25jYXRNYXAsIG1hcCwgcmVkdWNlLCBzd2l0Y2hNYXAsIHRvQXJyYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBGaWxlQWxyZWFkeUV4aXN0RXhjZXB0aW9uLFxuICBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uLFxuICBQYXRoSXNEaXJlY3RvcnlFeGNlcHRpb24sXG4gIFVua25vd25FeGNlcHRpb24sXG59IGZyb20gJy4uLy4uL2V4Y2VwdGlvbic7XG5pbXBvcnQgeyBQYXRoLCBQYXRoRnJhZ21lbnQgfSBmcm9tICcuLi9wYXRoJztcbmltcG9ydCB7XG4gIEZpbGVCdWZmZXIsXG4gIEhvc3QsXG4gIEhvc3RDYXBhYmlsaXRpZXMsXG4gIEhvc3RXYXRjaE9wdGlvbnMsXG4gIFJlYWRvbmx5SG9zdCxcbn0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2ltcGxlTWVtb3J5SG9zdCB9IGZyb20gJy4vbWVtb3J5JztcblxuXG5leHBvcnQgaW50ZXJmYWNlIENvcmRIb3N0Q3JlYXRlIHtcbiAga2luZDogJ2NyZWF0ZSc7XG4gIHBhdGg6IFBhdGg7XG4gIGNvbnRlbnQ6IEZpbGVCdWZmZXI7XG59XG5leHBvcnQgaW50ZXJmYWNlIENvcmRIb3N0T3ZlcndyaXRlIHtcbiAga2luZDogJ292ZXJ3cml0ZSc7XG4gIHBhdGg6IFBhdGg7XG4gIGNvbnRlbnQ6IEZpbGVCdWZmZXI7XG59XG5leHBvcnQgaW50ZXJmYWNlIENvcmRIb3N0UmVuYW1lIHtcbiAga2luZDogJ3JlbmFtZSc7XG4gIGZyb206IFBhdGg7XG4gIHRvOiBQYXRoO1xufVxuZXhwb3J0IGludGVyZmFjZSBDb3JkSG9zdERlbGV0ZSB7XG4gIGtpbmQ6ICdkZWxldGUnO1xuICBwYXRoOiBQYXRoO1xufVxuZXhwb3J0IHR5cGUgQ29yZEhvc3RSZWNvcmQgPSBDb3JkSG9zdENyZWF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBDb3JkSG9zdE92ZXJ3cml0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBDb3JkSG9zdFJlbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBDb3JkSG9zdERlbGV0ZTtcblxuXG4vKipcbiAqIEEgSG9zdCB0aGF0IHJlY29yZHMgY2hhbmdlcyB0byB0aGUgdW5kZXJseWluZyBIb3N0LCB3aGlsZSBrZWVwaW5nIGEgcmVjb3JkIG9mIENyZWF0ZSwgT3ZlcndyaXRlLFxuICogUmVuYW1lIGFuZCBEZWxldGUgb2YgZmlsZXMuXG4gKlxuICogVGhpcyBpcyBmdWxseSBjb21wYXRpYmxlIHdpdGggSG9zdCwgYnV0IHdpbGwga2VlcCBhIHN0YWdpbmcgb2YgZXZlcnkgY2hhbmdlcyBhc2tlZC4gVGhhdCBzdGFnaW5nXG4gKiBmb2xsb3dzIHRoZSBwcmluY2lwbGUgb2YgdGhlIFRyZWUgKGUuZy4gY2FuIGNyZWF0ZSBhIGZpbGUgdGhhdCBhbHJlYWR5IGV4aXN0cykuXG4gKlxuICogVXNpbmcgYGNyZWF0ZSgpYCBhbmQgYG92ZXJ3cml0ZSgpYCB3aWxsIGZvcmNlIHRob3NlIG9wZXJhdGlvbnMsIGJ1dCB1c2luZyBgd3JpdGVgIHdpbGwgYWRkXG4gKiB0aGUgY3JlYXRlL292ZXJ3cml0ZSByZWNvcmRzIElJRiB0aGUgZmlsZXMgZG9lcy9kb2Vzbid0IGFscmVhZHkgZXhpc3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb3JkSG9zdCBleHRlbmRzIFNpbXBsZU1lbW9yeUhvc3Qge1xuICBwcm90ZWN0ZWQgX2ZpbGVzVG9DcmVhdGUgPSBuZXcgU2V0PFBhdGg+KCk7XG4gIHByb3RlY3RlZCBfZmlsZXNUb1JlbmFtZSA9IG5ldyBNYXA8UGF0aCwgUGF0aD4oKTtcbiAgcHJvdGVjdGVkIF9maWxlc1RvUmVuYW1lUmV2ZXJ0ID0gbmV3IE1hcDxQYXRoLCBQYXRoPigpO1xuICBwcm90ZWN0ZWQgX2ZpbGVzVG9EZWxldGUgPSBuZXcgU2V0PFBhdGg+KCk7XG4gIHByb3RlY3RlZCBfZmlsZXNUb092ZXJ3cml0ZSA9IG5ldyBTZXQ8UGF0aD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2JhY2s6IFJlYWRvbmx5SG9zdCkgeyBzdXBlcigpOyB9XG5cbiAgZ2V0IGJhY2tlbmQoKTogUmVhZG9ubHlIb3N0IHsgcmV0dXJuIHRoaXMuX2JhY2s7IH1cbiAgZ2V0IGNhcGFiaWxpdGllcygpOiBIb3N0Q2FwYWJpbGl0aWVzIHtcbiAgICAvLyBPdXIgb3duIGhvc3QgaXMgYWx3YXlzIFN5bmNocm9ub3VzLCBidXQgdGhlIGJhY2tlbmQgbWlnaHQgbm90IGJlLlxuICAgIHJldHVybiB7XG4gICAgICBzeW5jaHJvbm91czogdGhpcy5fYmFjay5jYXBhYmlsaXRpZXMuc3luY2hyb25vdXMsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjb3B5IG9mIHRoaXMgaG9zdCwgaW5jbHVkaW5nIGFsbCBhY3Rpb25zIG1hZGUuXG4gICAqIEByZXR1cm5zIHtDb3JkSG9zdH0gVGhlIGNhcmJvbiBjb3B5LlxuICAgKi9cbiAgY2xvbmUoKTogQ29yZEhvc3Qge1xuICAgIGNvbnN0IGRvbGx5ID0gbmV3IENvcmRIb3N0KHRoaXMuX2JhY2spO1xuXG4gICAgZG9sbHkuX2NhY2hlID0gbmV3IE1hcCh0aGlzLl9jYWNoZSk7XG4gICAgZG9sbHkuX2ZpbGVzVG9DcmVhdGUgPSBuZXcgU2V0KHRoaXMuX2ZpbGVzVG9DcmVhdGUpO1xuICAgIGRvbGx5Ll9maWxlc1RvUmVuYW1lID0gbmV3IE1hcCh0aGlzLl9maWxlc1RvUmVuYW1lKTtcbiAgICBkb2xseS5fZmlsZXNUb1JlbmFtZVJldmVydCA9IG5ldyBNYXAodGhpcy5fZmlsZXNUb1JlbmFtZVJldmVydCk7XG4gICAgZG9sbHkuX2ZpbGVzVG9EZWxldGUgPSBuZXcgU2V0KHRoaXMuX2ZpbGVzVG9EZWxldGUpO1xuICAgIGRvbGx5Ll9maWxlc1RvT3ZlcndyaXRlID0gbmV3IFNldCh0aGlzLl9maWxlc1RvT3ZlcndyaXRlKTtcblxuICAgIHJldHVybiBkb2xseTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21taXQgdGhlIGNoYW5nZXMgcmVjb3JkZWQgdG8gYSBIb3N0LiBJdCBpcyBhc3N1bWVkIHRoYXQgdGhlIGhvc3QgZG9lcyBoYXZlIHRoZSBzYW1lIHN0cnVjdHVyZVxuICAgKiBhcyB0aGUgaG9zdCB0aGF0IHdhcyB1c2VkIGZvciBiYWNrZW5kIChjb3VsZCBiZSB0aGUgc2FtZSBob3N0KS5cbiAgICogQHBhcmFtIGhvc3QgVGhlIGhvc3QgdG8gY3JlYXRlL2RlbGV0ZS9yZW5hbWUvb3ZlcndyaXRlIGZpbGVzIHRvLlxuICAgKiBAcGFyYW0gZm9yY2UgV2hldGhlciB0byBza2lwIGV4aXN0ZW5jZSBjaGVja3Mgd2hlbiBjcmVhdGluZy9vdmVyd3JpdGluZy4gVGhpcyBpc1xuICAgKiAgIGZhc3RlciBidXQgbWlnaHQgbGVhZCB0byBpbmNvcnJlY3Qgc3RhdGVzLiBCZWNhdXNlIEhvc3RzIG5hdGl2ZWx5IGRvbid0IHN1cHBvcnQgY3JlYXRpb25cbiAgICogICB2ZXJzdXMgb3ZlcndyaXRpbmcgKGl0J3Mgb25seSB3cml0aW5nKSwgd2UgY2hlY2sgZm9yIGV4aXN0ZW5jZSBiZWZvcmUgY29tcGxldGluZyBhIHJlcXVlc3QuXG4gICAqIEByZXR1cm5zIEFuIG9ic2VydmFibGUgdGhhdCBjb21wbGV0ZXMgd2hlbiBkb25lLCBvciBlcnJvciBpZiBhbiBlcnJvciBvY2N1cmVkLlxuICAgKi9cbiAgY29tbWl0KGhvc3Q6IEhvc3QsIGZvcmNlID0gZmFsc2UpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAvLyBSZWFsbHkgY29tbWl0IGV2ZXJ5dGhpbmcgdG8gdGhlIGFjdHVhbCBob3N0LlxuICAgIHJldHVybiBvYnNlcnZhYmxlRnJvbSh0aGlzLnJlY29yZHMoKSkucGlwZShcbiAgICAgIGNvbmNhdE1hcChyZWNvcmQgPT4ge1xuICAgICAgICBzd2l0Y2ggKHJlY29yZC5raW5kKSB7XG4gICAgICAgICAgY2FzZSAnZGVsZXRlJzogcmV0dXJuIGhvc3QuZGVsZXRlKHJlY29yZC5wYXRoKTtcbiAgICAgICAgICBjYXNlICdyZW5hbWUnOiByZXR1cm4gaG9zdC5yZW5hbWUocmVjb3JkLmZyb20sIHJlY29yZC50byk7XG4gICAgICAgICAgY2FzZSAnY3JlYXRlJzpcbiAgICAgICAgICAgIHJldHVybiBob3N0LmV4aXN0cyhyZWNvcmQucGF0aCkucGlwZShcbiAgICAgICAgICAgICAgc3dpdGNoTWFwKGV4aXN0cyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0cyAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBGaWxlQWxyZWFkeUV4aXN0RXhjZXB0aW9uKHJlY29yZC5wYXRoKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBob3N0LndyaXRlKHJlY29yZC5wYXRoLCByZWNvcmQuY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgY2FzZSAnb3ZlcndyaXRlJzpcbiAgICAgICAgICAgIHJldHVybiBob3N0LmV4aXN0cyhyZWNvcmQucGF0aCkucGlwZShcbiAgICAgICAgICAgICAgc3dpdGNoTWFwKGV4aXN0cyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdHMgJiYgIWZvcmNlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRmlsZURvZXNOb3RFeGlzdEV4Y2VwdGlvbihyZWNvcmQucGF0aCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gaG9zdC53cml0ZShyZWNvcmQucGF0aCwgcmVjb3JkLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHJlZHVjZSgoKSA9PiB7fSksXG4gICAgKTtcbiAgfVxuXG4gIHJlY29yZHMoKTogQ29yZEhvc3RSZWNvcmRbXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIC4uLlsuLi50aGlzLl9maWxlc1RvRGVsZXRlLnZhbHVlcygpXS5tYXAocGF0aCA9PiAoe1xuICAgICAgICBraW5kOiAnZGVsZXRlJywgcGF0aCxcbiAgICAgIH0pIGFzIENvcmRIb3N0UmVjb3JkKSxcbiAgICAgIC4uLlsuLi50aGlzLl9maWxlc1RvUmVuYW1lLmVudHJpZXMoKV0ubWFwKChbZnJvbSwgdG9dKSA9PiAoe1xuICAgICAgICBraW5kOiAncmVuYW1lJywgZnJvbSwgdG8sXG4gICAgICB9KSBhcyBDb3JkSG9zdFJlY29yZCksXG4gICAgICAuLi5bLi4udGhpcy5fZmlsZXNUb0NyZWF0ZS52YWx1ZXMoKV0ubWFwKHBhdGggPT4gKHtcbiAgICAgICAga2luZDogJ2NyZWF0ZScsIHBhdGgsIGNvbnRlbnQ6IHRoaXMuX3JlYWQocGF0aCksXG4gICAgICB9KSBhcyBDb3JkSG9zdFJlY29yZCksXG4gICAgICAuLi5bLi4udGhpcy5fZmlsZXNUb092ZXJ3cml0ZS52YWx1ZXMoKV0ubWFwKHBhdGggPT4gKHtcbiAgICAgICAga2luZDogJ292ZXJ3cml0ZScsIHBhdGgsIGNvbnRlbnQ6IHRoaXMuX3JlYWQocGF0aCksXG4gICAgICB9KSBhcyBDb3JkSG9zdFJlY29yZCksXG4gICAgXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWFsaXplZCB2ZXJzaW9uIG9mIHtAbGluayBDb3JkSG9zdCN3cml0ZX0gd2hpY2ggZm9yY2VzIHRoZSBjcmVhdGlvbiBvZiBhIGZpbGUgd2hldGhlciBpdFxuICAgKiBleGlzdHMgb3Igbm90LlxuICAgKiBAcGFyYW0ge30gcGF0aFxuICAgKiBAcGFyYW0ge0ZpbGVCdWZmZXJ9IGNvbnRlbnRcbiAgICogQHJldHVybnMge09ic2VydmFibGU8dm9pZD59XG4gICAqL1xuICBjcmVhdGUocGF0aDogUGF0aCwgY29udGVudDogRmlsZUJ1ZmZlcik6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIGlmIChzdXBlci5fZXhpc3RzKHBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRmlsZUFscmVhZHlFeGlzdEV4Y2VwdGlvbihwYXRoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZmlsZXNUb0RlbGV0ZS5oYXMocGF0aCkpIHtcbiAgICAgIHRoaXMuX2ZpbGVzVG9EZWxldGUuZGVsZXRlKHBhdGgpO1xuICAgICAgdGhpcy5fZmlsZXNUb092ZXJ3cml0ZS5hZGQocGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZpbGVzVG9DcmVhdGUuYWRkKHBhdGgpO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBlci53cml0ZShwYXRoLCBjb250ZW50KTtcbiAgfVxuXG4gIG92ZXJ3cml0ZShwYXRoOiBQYXRoLCBjb250ZW50OiBGaWxlQnVmZmVyKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNEaXJlY3RvcnkocGF0aCkucGlwZShcbiAgICAgIHN3aXRjaE1hcChpc0RpciA9PiB7XG4gICAgICAgIGlmIChpc0Rpcikge1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBQYXRoSXNEaXJlY3RvcnlFeGNlcHRpb24ocGF0aCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZXhpc3RzKHBhdGgpO1xuICAgICAgfSksXG4gICAgICBzd2l0Y2hNYXAoZXhpc3RzID0+IHtcbiAgICAgICAgaWYgKCFleGlzdHMpIHtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRmlsZURvZXNOb3RFeGlzdEV4Y2VwdGlvbihwYXRoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2ZpbGVzVG9DcmVhdGUuaGFzKHBhdGgpKSB7XG4gICAgICAgICAgdGhpcy5fZmlsZXNUb092ZXJ3cml0ZS5hZGQocGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VwZXIud3JpdGUocGF0aCwgY29udGVudCk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgd3JpdGUocGF0aDogUGF0aCwgY29udGVudDogRmlsZUJ1ZmZlcik6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmV4aXN0cyhwYXRoKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGV4aXN0cyA9PiB7XG4gICAgICAgIGlmIChleGlzdHMpIHtcbiAgICAgICAgICAvLyBJdCBleGlzdHMsIGJ1dCBtaWdodCBiZSBiZWluZyByZW5hbWVkIG9yIGRlbGV0ZWQuIEluIHRoYXQgY2FzZSB3ZSB3YW50IHRvIGNyZWF0ZSBpdC5cbiAgICAgICAgICBpZiAodGhpcy53aWxsUmVuYW1lKHBhdGgpIHx8IHRoaXMud2lsbERlbGV0ZShwYXRoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHBhdGgsIGNvbnRlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vdmVyd3JpdGUocGF0aCwgY29udGVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZShwYXRoLCBjb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIHJlYWQocGF0aDogUGF0aCk6IE9ic2VydmFibGU8RmlsZUJ1ZmZlcj4ge1xuICAgIGlmICh0aGlzLl9leGlzdHMocGF0aCkpIHtcbiAgICAgIHJldHVybiBzdXBlci5yZWFkKHBhdGgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9iYWNrLnJlYWQocGF0aCk7XG4gIH1cblxuICBkZWxldGUocGF0aDogUGF0aCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIGlmICh0aGlzLl9leGlzdHMocGF0aCkpIHtcbiAgICAgIGlmICh0aGlzLl9maWxlc1RvQ3JlYXRlLmhhcyhwYXRoKSkge1xuICAgICAgICB0aGlzLl9maWxlc1RvQ3JlYXRlLmRlbGV0ZShwYXRoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fZmlsZXNUb092ZXJ3cml0ZS5oYXMocGF0aCkpIHtcbiAgICAgICAgdGhpcy5fZmlsZXNUb092ZXJ3cml0ZS5kZWxldGUocGF0aCk7XG4gICAgICAgIHRoaXMuX2ZpbGVzVG9EZWxldGUuYWRkKHBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWF5YmVPcmlnaW4gPSB0aGlzLl9maWxlc1RvUmVuYW1lUmV2ZXJ0LmdldChwYXRoKTtcbiAgICAgICAgaWYgKG1heWJlT3JpZ2luKSB7XG4gICAgICAgICAgdGhpcy5fZmlsZXNUb1JlbmFtZVJldmVydC5kZWxldGUocGF0aCk7XG4gICAgICAgICAgdGhpcy5fZmlsZXNUb1JlbmFtZS5kZWxldGUobWF5YmVPcmlnaW4pO1xuICAgICAgICAgIHRoaXMuX2ZpbGVzVG9EZWxldGUuYWRkKG1heWJlT3JpZ2luKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihcbiAgICAgICAgICAgIG5ldyBVbmtub3duRXhjZXB0aW9uKGBUaGlzIHNob3VsZCBuZXZlciBoYXBwZW4uIFBhdGg6ICR7SlNPTi5zdHJpbmdpZnkocGF0aCl9LmApLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN1cGVyLmRlbGV0ZShwYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2JhY2suZXhpc3RzKHBhdGgpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChleGlzdHMgPT4ge1xuICAgICAgICAgIGlmIChleGlzdHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGVzVG9EZWxldGUuYWRkKHBhdGgpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2Y8dm9pZD4oKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb24ocGF0aCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJlbmFtZShmcm9tOiBQYXRoLCB0bzogUGF0aCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiBjb25jYXQoXG4gICAgICB0aGlzLmV4aXN0cyh0byksXG4gICAgICB0aGlzLmV4aXN0cyhmcm9tKSxcbiAgICApLnBpcGUoXG4gICAgICB0b0FycmF5KCksXG4gICAgICBzd2l0Y2hNYXAoKFtleGlzdFRvLCBleGlzdEZyb21dKSA9PiB7XG4gICAgICAgIGlmICghZXhpc3RGcm9tKSB7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb24oZnJvbSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcm9tID09PSB0bykge1xuICAgICAgICAgIHJldHVybiBvZigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV4aXN0VG8pIHtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRmlsZUFscmVhZHlFeGlzdEV4Y2VwdGlvbih0bykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgd2UncmUgcmVuYW1pbmcgYSBmaWxlIHRoYXQncyBiZWVuIGNyZWF0ZWQsIHNob3J0Y2lyY3VpdCB0byBjcmVhdGluZyB0aGUgYHRvYCBwYXRoLlxuICAgICAgICBpZiAodGhpcy5fZmlsZXNUb0NyZWF0ZS5oYXMoZnJvbSkpIHtcbiAgICAgICAgICB0aGlzLl9maWxlc1RvQ3JlYXRlLmRlbGV0ZShmcm9tKTtcbiAgICAgICAgICB0aGlzLl9maWxlc1RvQ3JlYXRlLmFkZCh0byk7XG5cbiAgICAgICAgICByZXR1cm4gc3VwZXIucmVuYW1lKGZyb20sIHRvKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZmlsZXNUb092ZXJ3cml0ZS5oYXMoZnJvbSkpIHtcbiAgICAgICAgICB0aGlzLl9maWxlc1RvT3ZlcndyaXRlLmRlbGV0ZShmcm9tKTtcblxuICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNhbGwgdGhpcyBmdW5jdGlvbi4gVGhpcyBpcyBzbyB3ZSBkb24ndCByZXBlYXQgdGhlIGJvdHRvbSBsb2dpYy4gVGhpc1xuICAgICAgICAgIC8vIGlmIHdpbGwgYmUgYnktcGFzc2VkIGJlY2F1c2Ugd2UganVzdCBkZWxldGVkIHRoZSBgZnJvbWAgcGF0aCBmcm9tIGZpbGVzIHRvIG92ZXJ3cml0ZS5cbiAgICAgICAgICByZXR1cm4gY29uY2F0KFxuICAgICAgICAgICAgdGhpcy5yZW5hbWUoZnJvbSwgdG8pLFxuICAgICAgICAgICAgbmV3IE9ic2VydmFibGU8bmV2ZXI+KHggPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9maWxlc1RvT3ZlcndyaXRlLmFkZCh0byk7XG4gICAgICAgICAgICAgIHguY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ZpbGVzVG9EZWxldGUuaGFzKHRvKSkge1xuICAgICAgICAgIHRoaXMuX2ZpbGVzVG9EZWxldGUuZGVsZXRlKHRvKTtcbiAgICAgICAgICB0aGlzLl9maWxlc1RvRGVsZXRlLmFkZChmcm9tKTtcbiAgICAgICAgICB0aGlzLl9maWxlc1RvT3ZlcndyaXRlLmFkZCh0byk7XG5cbiAgICAgICAgICAvLyBXZSBuZWVkIHRvIGRlbGV0ZSB0aGUgb3JpZ2luYWwgYW5kIHdyaXRlIHRoZSBuZXcgb25lLlxuICAgICAgICAgIHJldHVybiB0aGlzLnJlYWQoZnJvbSkucGlwZShcbiAgICAgICAgICAgIG1hcChjb250ZW50ID0+IHRoaXMuX3dyaXRlKHRvLCBjb250ZW50KSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1heWJlVG8xID0gdGhpcy5fZmlsZXNUb1JlbmFtZVJldmVydC5nZXQoZnJvbSk7XG4gICAgICAgIGlmIChtYXliZVRvMSkge1xuICAgICAgICAgIC8vIFdlIGFscmVhZHkgcmVuYW1lZCB0byB0aGlzIGZpbGUgKEEgPT4gZnJvbSksIGxldCdzIHJlbmFtZSB0aGUgZm9ybWVyIHRvIHRoZSBuZXdcbiAgICAgICAgICAvLyBwYXRoIChBID0+IHRvKS5cbiAgICAgICAgICB0aGlzLl9maWxlc1RvUmVuYW1lLmRlbGV0ZShtYXliZVRvMSk7XG4gICAgICAgICAgdGhpcy5fZmlsZXNUb1JlbmFtZVJldmVydC5kZWxldGUoZnJvbSk7XG4gICAgICAgICAgZnJvbSA9IG1heWJlVG8xO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZmlsZXNUb1JlbmFtZS5zZXQoZnJvbSwgdG8pO1xuICAgICAgICB0aGlzLl9maWxlc1RvUmVuYW1lUmV2ZXJ0LnNldCh0bywgZnJvbSk7XG5cbiAgICAgICAgLy8gSWYgdGhlIGZpbGUgaXMgcGFydCBvZiBvdXIgZGF0YSwganVzdCByZW5hbWUgaXQgaW50ZXJuYWxseS5cbiAgICAgICAgaWYgKHRoaXMuX2V4aXN0cyhmcm9tKSkge1xuICAgICAgICAgIHJldHVybiBzdXBlci5yZW5hbWUoZnJvbSwgdG8pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIENyZWF0ZSBhIGZpbGUgd2l0aCB0aGUgc2FtZSBjb250ZW50LlxuICAgICAgICAgIHJldHVybiB0aGlzLl9iYWNrLnJlYWQoZnJvbSkucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcChjb250ZW50ID0+IHN1cGVyLndyaXRlKHRvLCBjb250ZW50KSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIGxpc3QocGF0aDogUGF0aCk6IE9ic2VydmFibGU8UGF0aEZyYWdtZW50W10+IHtcbiAgICByZXR1cm4gY29uY2F0KFxuICAgICAgc3VwZXIubGlzdChwYXRoKSxcbiAgICAgIHRoaXMuX2JhY2subGlzdChwYXRoKSxcbiAgICApLnBpcGUoXG4gICAgICByZWR1Y2UoKGxpc3Q6IFNldDxQYXRoRnJhZ21lbnQ+LCBjdXJyOiBQYXRoRnJhZ21lbnRbXSkgPT4ge1xuICAgICAgICBjdXJyLmZvckVhY2goZWxlbSA9PiBsaXN0LmFkZChlbGVtKSk7XG5cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgICB9LCBuZXcgU2V0PFBhdGhGcmFnbWVudD4oKSksXG4gICAgICBtYXAoc2V0ID0+IFsuLi5zZXRdKSxcbiAgICApO1xuICB9XG5cbiAgZXhpc3RzKHBhdGg6IFBhdGgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fZXhpc3RzKHBhdGgpXG4gICAgICA/IG9mKHRydWUpXG4gICAgICA6ICgodGhpcy53aWxsRGVsZXRlKHBhdGgpIHx8IHRoaXMud2lsbFJlbmFtZShwYXRoKSkgPyBvZihmYWxzZSkgOiB0aGlzLl9iYWNrLmV4aXN0cyhwYXRoKSk7XG4gIH1cbiAgaXNEaXJlY3RvcnkocGF0aDogUGF0aCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9leGlzdHMocGF0aCkgPyBzdXBlci5pc0RpcmVjdG9yeShwYXRoKSA6IHRoaXMuX2JhY2suaXNEaXJlY3RvcnkocGF0aCk7XG4gIH1cbiAgaXNGaWxlKHBhdGg6IFBhdGgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fZXhpc3RzKHBhdGgpXG4gICAgICA/IHN1cGVyLmlzRmlsZShwYXRoKVxuICAgICAgOiAoKHRoaXMud2lsbERlbGV0ZShwYXRoKSB8fCB0aGlzLndpbGxSZW5hbWUocGF0aCkpID8gb2YoZmFsc2UpIDogdGhpcy5fYmFjay5pc0ZpbGUocGF0aCkpO1xuICB9XG5cbiAgc3RhdChwYXRoOiBQYXRoKSB7XG4gICAgLy8gVE9ETzogc3RhdCBzaG91bGQgYmUgcG9zc2libGUgdG8gaW1wbGVtZW50LCBhdCBsZWFzdCBmcm9tIG1lbW9yeS5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHdhdGNoKHBhdGg6IFBhdGgsIG9wdGlvbnM/OiBIb3N0V2F0Y2hPcHRpb25zKSB7XG4gICAgLy8gV2F0Y2hpbmcgbm90IHN1cHBvcnRlZC5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHdpbGxDcmVhdGUocGF0aDogUGF0aCkge1xuICAgIHJldHVybiB0aGlzLl9maWxlc1RvQ3JlYXRlLmhhcyhwYXRoKTtcbiAgfVxuICB3aWxsT3ZlcndyaXRlKHBhdGg6IFBhdGgpIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsZXNUb092ZXJ3cml0ZS5oYXMocGF0aCk7XG4gIH1cbiAgd2lsbERlbGV0ZShwYXRoOiBQYXRoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbGVzVG9EZWxldGUuaGFzKHBhdGgpO1xuICB9XG4gIHdpbGxSZW5hbWUocGF0aDogUGF0aCkge1xuICAgIHJldHVybiB0aGlzLl9maWxlc1RvUmVuYW1lLmhhcyhwYXRoKTtcbiAgfVxuICB3aWxsUmVuYW1lVG8ocGF0aDogUGF0aCwgdG86IFBhdGgpIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsZXNUb1JlbmFtZS5nZXQocGF0aCkgPT09IHRvO1xuICB9XG59XG4iXX0=