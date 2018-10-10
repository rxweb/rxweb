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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2NvcmUvbm9kZS90ZXN0aW5nL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0IsbUNBQTBGO0FBQzFGLGtDQUF5QztBQUV6Qzs7R0FFRztBQUNILDhCQUFzQyxTQUFRLGVBQVMsQ0FBQyxVQUFvQjtJQUkxRTtRQUNFLE1BQU0sSUFBSSxHQUFHLGVBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsRUFBRSxDQUFDLFNBQVMsQ0FBQyxtQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFbEMsS0FBSyxDQUFDLElBQUkscUJBQWMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLGdCQUFnQixDQUFPO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDaEIsR0FBRyxDQUFDLENBQUMsUUFBc0IsRUFBRSxFQUFFLENBQUMsVUFBSSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztpQkFDbEQsTUFBTSxDQUFDLENBQUMsS0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtnQkFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QixDQUFDO1lBQ0gsQ0FBQyxFQUFFLEVBQVksQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakMsSUFBSSxJQUFJO1FBQ04sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZUFBUyxDQUFDLGdCQUFnQixDQUFXLElBQUksQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0NBQ0Y7QUFyQ0QsNERBcUNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgb3MgZnJvbSAnb3MnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFBhdGgsIFBhdGhGcmFnbWVudCwgZ2V0U3lzdGVtUGF0aCwgam9pbiwgbm9ybWFsaXplLCB2aXJ0dWFsRnMgfSBmcm9tICcuLi8uLi9zcmMnO1xuaW1wb3J0IHsgTm9kZUpzU3luY0hvc3QgfSBmcm9tICcuLi9ob3N0JztcblxuLyoqXG4gKiBBIFN5bmMgU2NvcGVkIEhvc3QgdGhhdCBjcmVhdGVzIGEgdGVtcG9yYXJ5IGRpcmVjdG9yeSBhbmQgc2NvcGUgdG8gaXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBUZW1wU2NvcGVkTm9kZUpzU3luY0hvc3QgZXh0ZW5kcyB2aXJ0dWFsRnMuU2NvcGVkSG9zdDxmcy5TdGF0cz4ge1xuICBwcm90ZWN0ZWQgX3N5bmM6IHZpcnR1YWxGcy5TeW5jRGVsZWdhdGVIb3N0PGZzLlN0YXRzPjtcbiAgcHJvdGVjdGVkIF9yb290OiBQYXRoO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IHJvb3QgPSBub3JtYWxpemUocGF0aC5qb2luKG9zLnRtcGRpcigpLCBgZGV2a2l0LWhvc3QtJHsrRGF0ZS5ub3coKX0tJHtwcm9jZXNzLnBpZH1gKSk7XG4gICAgZnMubWtkaXJTeW5jKGdldFN5c3RlbVBhdGgocm9vdCkpO1xuXG4gICAgc3VwZXIobmV3IE5vZGVKc1N5bmNIb3N0KCksIHJvb3QpO1xuICAgIHRoaXMuX3Jvb3QgPSByb290O1xuICB9XG5cbiAgZ2V0IGZpbGVzKCk6IFBhdGhbXSB7XG4gICAgY29uc3Qgc3luYyA9IHRoaXMuc3luYztcbiAgICBmdW5jdGlvbiBfdmlzaXQocDogUGF0aCk6IFBhdGhbXSB7XG4gICAgICByZXR1cm4gc3luYy5saXN0KHApXG4gICAgICAgIC5tYXAoKGZyYWdtZW50OiBQYXRoRnJhZ21lbnQpID0+IGpvaW4ocCwgZnJhZ21lbnQpKVxuICAgICAgICAucmVkdWNlKChmaWxlczogUGF0aFtdLCBwYXRoOiBQYXRoRnJhZ21lbnQpID0+IHtcbiAgICAgICAgICBpZiAoc3luYy5pc0RpcmVjdG9yeShwYXRoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZpbGVzLmNvbmNhdChfdmlzaXQocGF0aCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmlsZXMuY29uY2F0KHBhdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgW10gYXMgUGF0aFtdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3Zpc2l0KG5vcm1hbGl6ZSgnLycpKTtcbiAgfVxuXG4gIGdldCByb290KCkgeyByZXR1cm4gdGhpcy5fcm9vdDsgfVxuICBnZXQgc3luYygpIHtcbiAgICBpZiAoIXRoaXMuX3N5bmMpIHtcbiAgICAgIHRoaXMuX3N5bmMgPSBuZXcgdmlydHVhbEZzLlN5bmNEZWxlZ2F0ZUhvc3Q8ZnMuU3RhdHM+KHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9zeW5jO1xuICB9XG59XG4iXX0=