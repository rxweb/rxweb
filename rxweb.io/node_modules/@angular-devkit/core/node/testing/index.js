"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const src_1 = require("../../src");
const host_1 = require("../host");
/**
 * A Sync Scoped Host that creates a temporary directory and scope to it.
 */
class TempScopedNodeJsSyncHost extends src_1.virtualFs.ScopedHost {
    constructor() {
        const root = src_1.normalize(path.join(os.tmpdir(), `devkit-host-${+Date.now()}-${process.pid}`));
        fs.mkdirSync(src_1.getSystemPath(root));
        super(new host_1.NodeJsSyncHost(), root);
        this._root = root;
    }
    get files() {
        const sync = this.sync;
        function _visit(p) {
            return sync.list(p)
                .map((fragment) => src_1.join(p, fragment))
                .reduce((files, path) => {
                if (sync.isDirectory(path)) {
                    return files.concat(_visit(path));
                }
                else {
                    return files.concat(path);
                }
            }, []);
        }
        return _visit(src_1.normalize('/'));
    }
    get root() { return this._root; }
    get sync() {
        if (!this._sync) {
            this._sync = new src_1.virtualFs.SyncDelegateHost(this);
        }
        return this._sync;
    }
}
exports.TempScopedNodeJsSyncHost = TempScopedNodeJsSyncHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2NvcmUvbm9kZS90ZXN0aW5nL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0IsbUNBQTBGO0FBQzFGLGtDQUF5QztBQUV6Qzs7R0FFRztBQUNILDhCQUFzQyxTQUFRLGVBQVMsQ0FBQyxVQUFvQjtJQUkxRTtRQUNFLE1BQU0sSUFBSSxHQUFHLGVBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsRUFBRSxDQUFDLFNBQVMsQ0FBQyxtQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFbEMsS0FBSyxDQUFDLElBQUkscUJBQWMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLGdCQUFnQixDQUFPO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ2hCLEdBQUcsQ0FBQyxDQUFDLFFBQXNCLEVBQUUsRUFBRSxDQUFDLFVBQUksQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ2xELE1BQU0sQ0FBQyxDQUFDLEtBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7Z0JBQzVDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDMUIsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNuQztxQkFBTTtvQkFDTCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzNCO1lBQ0gsQ0FBQyxFQUFFLEVBQVksQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUFFRCxPQUFPLE1BQU0sQ0FBQyxlQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxJQUFJLEtBQUssT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqQyxJQUFJLElBQUk7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxlQUFTLENBQUMsZ0JBQWdCLENBQVcsSUFBSSxDQUFDLENBQUM7U0FDN0Q7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztDQUNGO0FBckNELDREQXFDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIG9zIGZyb20gJ29zJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBQYXRoLCBQYXRoRnJhZ21lbnQsIGdldFN5c3RlbVBhdGgsIGpvaW4sIG5vcm1hbGl6ZSwgdmlydHVhbEZzIH0gZnJvbSAnLi4vLi4vc3JjJztcbmltcG9ydCB7IE5vZGVKc1N5bmNIb3N0IH0gZnJvbSAnLi4vaG9zdCc7XG5cbi8qKlxuICogQSBTeW5jIFNjb3BlZCBIb3N0IHRoYXQgY3JlYXRlcyBhIHRlbXBvcmFyeSBkaXJlY3RvcnkgYW5kIHNjb3BlIHRvIGl0LlxuICovXG5leHBvcnQgY2xhc3MgVGVtcFNjb3BlZE5vZGVKc1N5bmNIb3N0IGV4dGVuZHMgdmlydHVhbEZzLlNjb3BlZEhvc3Q8ZnMuU3RhdHM+IHtcbiAgcHJvdGVjdGVkIF9zeW5jOiB2aXJ0dWFsRnMuU3luY0RlbGVnYXRlSG9zdDxmcy5TdGF0cz47XG4gIHByb3RlY3RlZCBfcm9vdDogUGF0aDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCByb290ID0gbm9ybWFsaXplKHBhdGguam9pbihvcy50bXBkaXIoKSwgYGRldmtpdC1ob3N0LSR7K0RhdGUubm93KCl9LSR7cHJvY2Vzcy5waWR9YCkpO1xuICAgIGZzLm1rZGlyU3luYyhnZXRTeXN0ZW1QYXRoKHJvb3QpKTtcblxuICAgIHN1cGVyKG5ldyBOb2RlSnNTeW5jSG9zdCgpLCByb290KTtcbiAgICB0aGlzLl9yb290ID0gcm9vdDtcbiAgfVxuXG4gIGdldCBmaWxlcygpOiBQYXRoW10ge1xuICAgIGNvbnN0IHN5bmMgPSB0aGlzLnN5bmM7XG4gICAgZnVuY3Rpb24gX3Zpc2l0KHA6IFBhdGgpOiBQYXRoW10ge1xuICAgICAgcmV0dXJuIHN5bmMubGlzdChwKVxuICAgICAgICAubWFwKChmcmFnbWVudDogUGF0aEZyYWdtZW50KSA9PiBqb2luKHAsIGZyYWdtZW50KSlcbiAgICAgICAgLnJlZHVjZSgoZmlsZXM6IFBhdGhbXSwgcGF0aDogUGF0aEZyYWdtZW50KSA9PiB7XG4gICAgICAgICAgaWYgKHN5bmMuaXNEaXJlY3RvcnkocGF0aCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWxlcy5jb25jYXQoX3Zpc2l0KHBhdGgpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZpbGVzLmNvbmNhdChwYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIFtdIGFzIFBhdGhbXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIF92aXNpdChub3JtYWxpemUoJy8nKSk7XG4gIH1cblxuICBnZXQgcm9vdCgpIHsgcmV0dXJuIHRoaXMuX3Jvb3Q7IH1cbiAgZ2V0IHN5bmMoKSB7XG4gICAgaWYgKCF0aGlzLl9zeW5jKSB7XG4gICAgICB0aGlzLl9zeW5jID0gbmV3IHZpcnR1YWxGcy5TeW5jRGVsZWdhdGVIb3N0PGZzLlN0YXRzPih0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fc3luYztcbiAgfVxufVxuIl19