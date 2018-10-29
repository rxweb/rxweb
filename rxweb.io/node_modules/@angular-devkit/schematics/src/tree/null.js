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
const exception_1 = require("../exception/exception");
const interface_1 = require("./interface");
const recorder_1 = require("./recorder");
class CannotCreateFileException extends core_1.BaseException {
    constructor(path) { super(`Cannot create file "${path}".`); }
}
exports.CannotCreateFileException = CannotCreateFileException;
class NullTreeDirEntry {
    constructor(path) {
        this.path = path;
        this.subdirs = [];
        this.subfiles = [];
    }
    get parent() {
        return this.path == '/' ? null : new NullTreeDirEntry(core_1.dirname(this.path));
    }
    dir(name) {
        return new NullTreeDirEntry(core_1.join(this.path, name));
    }
    file(_name) { return null; }
    visit() { }
}
exports.NullTreeDirEntry = NullTreeDirEntry;
class NullTree {
    constructor() {
        this.root = new NullTreeDirEntry(core_1.normalize('/'));
    }
    [interface_1.TreeSymbol]() {
        return this;
    }
    branch() {
        return new NullTree();
    }
    merge(_other, _strategy) { }
    // Simple readonly file system operations.
    exists(_path) { return false; }
    read(_path) { return null; }
    get(_path) { return null; }
    getDir(path) { return new NullTreeDirEntry(core_1.normalize('/' + path)); }
    visit() { }
    // Change content of host files.
    beginUpdate(path) {
        throw new exception_1.FileDoesNotExistException(path);
    }
    commitUpdate(record) {
        throw new exception_1.FileDoesNotExistException(record instanceof recorder_1.UpdateRecorderBase
            ? record.path
            : '<unknown>');
    }
    // Change structure of the host.
    copy(path, _to) {
        throw new exception_1.FileDoesNotExistException(path);
    }
    delete(path) {
        throw new exception_1.FileDoesNotExistException(path);
    }
    create(path, _content) {
        throw new CannotCreateFileException(path);
    }
    rename(path, _to) {
        throw new exception_1.FileDoesNotExistException(path);
    }
    overwrite(path, _content) {
        throw new exception_1.FileDoesNotExistException(path);
    }
    apply(_action, _strategy) { }
    get actions() {
        return [];
    }
}
exports.NullTree = NullTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVsbC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy9zcmMvdHJlZS9udWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsK0NBTzhCO0FBQzlCLHNEQUFtRTtBQUVuRSwyQ0FBd0Y7QUFDeEYseUNBQWdEO0FBR2hELCtCQUF1QyxTQUFRLG9CQUFhO0lBQzFELFlBQVksSUFBWSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdEU7QUFGRCw4REFFQztBQUdEO0lBS0UsWUFBNEIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFFN0IsWUFBTyxHQUFtQixFQUFFLENBQUM7UUFDN0IsYUFBUSxHQUFtQixFQUFFLENBQUM7SUFIRSxDQUFDO0lBSjFDLElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQU9ELEdBQUcsQ0FBQyxJQUFrQjtRQUNwQixPQUFPLElBQUksZ0JBQWdCLENBQUMsV0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsSUFBSSxDQUFDLEtBQW1CLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRTFDLEtBQUssS0FBSSxDQUFDO0NBQ1g7QUFoQkQsNENBZ0JDO0FBR0Q7SUFBQTtRQVVXLFNBQUksR0FBYSxJQUFJLGdCQUFnQixDQUFDLGdCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQXdDakUsQ0FBQztJQWpEQyxDQUFDLHNCQUFVLENBQUM7UUFDVixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDRCxLQUFLLENBQUMsTUFBWSxFQUFFLFNBQXlCLElBQVMsQ0FBQztJQUl2RCwwQ0FBMEM7SUFDMUMsTUFBTSxDQUFDLEtBQWEsSUFBSSxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkMsSUFBSSxDQUFDLEtBQWEsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDcEMsR0FBRyxDQUFDLEtBQWEsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbkMsTUFBTSxDQUFDLElBQVksSUFBSSxPQUFPLElBQUksZ0JBQWdCLENBQUMsZ0JBQVMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUUsS0FBSyxLQUFJLENBQUM7SUFFVixnQ0FBZ0M7SUFDaEMsV0FBVyxDQUFDLElBQVk7UUFDdEIsTUFBTSxJQUFJLHFDQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDRCxZQUFZLENBQUMsTUFBc0I7UUFDakMsTUFBTSxJQUFJLHFDQUF5QixDQUFDLE1BQU0sWUFBWSw2QkFBa0I7WUFDdEUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJO1lBQ2IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxnQ0FBZ0M7SUFDaEMsSUFBSSxDQUFDLElBQVksRUFBRSxHQUFXO1FBQzVCLE1BQU0sSUFBSSxxQ0FBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQVk7UUFDakIsTUFBTSxJQUFJLHFDQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBWSxFQUFFLFFBQXlCO1FBQzVDLE1BQU0sSUFBSSx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQVksRUFBRSxHQUFXO1FBQzlCLE1BQU0sSUFBSSxxQ0FBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsU0FBUyxDQUFDLElBQVksRUFBRSxRQUF5QjtRQUMvQyxNQUFNLElBQUkscUNBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFlLEVBQUUsU0FBeUIsSUFBUyxDQUFDO0lBQzFELElBQUksT0FBTztRQUNULE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztDQUNGO0FBbERELDRCQWtEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7XG4gIEJhc2VFeGNlcHRpb24sXG4gIFBhdGgsXG4gIFBhdGhGcmFnbWVudCxcbiAgZGlybmFtZSxcbiAgam9pbixcbiAgbm9ybWFsaXplLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uIH0gZnJvbSAnLi4vZXhjZXB0aW9uL2V4Y2VwdGlvbic7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL2FjdGlvbic7XG5pbXBvcnQgeyBEaXJFbnRyeSwgTWVyZ2VTdHJhdGVneSwgVHJlZSwgVHJlZVN5bWJvbCwgVXBkYXRlUmVjb3JkZXIgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBVcGRhdGVSZWNvcmRlckJhc2UgfSBmcm9tICcuL3JlY29yZGVyJztcblxuXG5leHBvcnQgY2xhc3MgQ2Fubm90Q3JlYXRlRmlsZUV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcpIHsgc3VwZXIoYENhbm5vdCBjcmVhdGUgZmlsZSBcIiR7cGF0aH1cIi5gKTsgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBOdWxsVHJlZURpckVudHJ5IGltcGxlbWVudHMgRGlyRW50cnkge1xuICBnZXQgcGFyZW50KCk6IERpckVudHJ5IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMucGF0aCA9PSAnLycgPyBudWxsIDogbmV3IE51bGxUcmVlRGlyRW50cnkoZGlybmFtZSh0aGlzLnBhdGgpKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBwYXRoOiBQYXRoKSB7fVxuXG4gIHJlYWRvbmx5IHN1YmRpcnM6IFBhdGhGcmFnbWVudFtdID0gW107XG4gIHJlYWRvbmx5IHN1YmZpbGVzOiBQYXRoRnJhZ21lbnRbXSA9IFtdO1xuXG4gIGRpcihuYW1lOiBQYXRoRnJhZ21lbnQpOiBEaXJFbnRyeSB7XG4gICAgcmV0dXJuIG5ldyBOdWxsVHJlZURpckVudHJ5KGpvaW4odGhpcy5wYXRoLCBuYW1lKSk7XG4gIH1cbiAgZmlsZShfbmFtZTogUGF0aEZyYWdtZW50KSB7IHJldHVybiBudWxsOyB9XG5cbiAgdmlzaXQoKSB7fVxufVxuXG5cbmV4cG9ydCBjbGFzcyBOdWxsVHJlZSBpbXBsZW1lbnRzIFRyZWUge1xuICBbVHJlZVN5bWJvbF0oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBicmFuY2goKTogVHJlZSB7XG4gICAgcmV0dXJuIG5ldyBOdWxsVHJlZSgpO1xuICB9XG4gIG1lcmdlKF9vdGhlcjogVHJlZSwgX3N0cmF0ZWd5PzogTWVyZ2VTdHJhdGVneSk6IHZvaWQge31cblxuICByZWFkb25seSByb290OiBEaXJFbnRyeSA9IG5ldyBOdWxsVHJlZURpckVudHJ5KG5vcm1hbGl6ZSgnLycpKTtcblxuICAvLyBTaW1wbGUgcmVhZG9ubHkgZmlsZSBzeXN0ZW0gb3BlcmF0aW9ucy5cbiAgZXhpc3RzKF9wYXRoOiBzdHJpbmcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIHJlYWQoX3BhdGg6IHN0cmluZykgeyByZXR1cm4gbnVsbDsgfVxuICBnZXQoX3BhdGg6IHN0cmluZykgeyByZXR1cm4gbnVsbDsgfVxuICBnZXREaXIocGF0aDogc3RyaW5nKSB7IHJldHVybiBuZXcgTnVsbFRyZWVEaXJFbnRyeShub3JtYWxpemUoJy8nICsgcGF0aCkpOyB9XG4gIHZpc2l0KCkge31cblxuICAvLyBDaGFuZ2UgY29udGVudCBvZiBob3N0IGZpbGVzLlxuICBiZWdpblVwZGF0ZShwYXRoOiBzdHJpbmcpOiBuZXZlciB7XG4gICAgdGhyb3cgbmV3IEZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb24ocGF0aCk7XG4gIH1cbiAgY29tbWl0VXBkYXRlKHJlY29yZDogVXBkYXRlUmVjb3JkZXIpOiBuZXZlciB7XG4gICAgdGhyb3cgbmV3IEZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb24ocmVjb3JkIGluc3RhbmNlb2YgVXBkYXRlUmVjb3JkZXJCYXNlXG4gICAgICA/IHJlY29yZC5wYXRoXG4gICAgICA6ICc8dW5rbm93bj4nKTtcbiAgfVxuXG4gIC8vIENoYW5nZSBzdHJ1Y3R1cmUgb2YgdGhlIGhvc3QuXG4gIGNvcHkocGF0aDogc3RyaW5nLCBfdG86IHN0cmluZyk6IG5ldmVyIHtcbiAgICB0aHJvdyBuZXcgRmlsZURvZXNOb3RFeGlzdEV4Y2VwdGlvbihwYXRoKTtcbiAgfVxuICBkZWxldGUocGF0aDogc3RyaW5nKTogbmV2ZXIge1xuICAgIHRocm93IG5ldyBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uKHBhdGgpO1xuICB9XG4gIGNyZWF0ZShwYXRoOiBzdHJpbmcsIF9jb250ZW50OiBCdWZmZXIgfCBzdHJpbmcpOiBuZXZlciB7XG4gICAgdGhyb3cgbmV3IENhbm5vdENyZWF0ZUZpbGVFeGNlcHRpb24ocGF0aCk7XG4gIH1cbiAgcmVuYW1lKHBhdGg6IHN0cmluZywgX3RvOiBzdHJpbmcpOiBuZXZlciB7XG4gICAgdGhyb3cgbmV3IEZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb24ocGF0aCk7XG4gIH1cbiAgb3ZlcndyaXRlKHBhdGg6IHN0cmluZywgX2NvbnRlbnQ6IEJ1ZmZlciB8IHN0cmluZyk6IG5ldmVyIHtcbiAgICB0aHJvdyBuZXcgRmlsZURvZXNOb3RFeGlzdEV4Y2VwdGlvbihwYXRoKTtcbiAgfVxuXG4gIGFwcGx5KF9hY3Rpb246IEFjdGlvbiwgX3N0cmF0ZWd5PzogTWVyZ2VTdHJhdGVneSk6IHZvaWQge31cbiAgZ2V0IGFjdGlvbnMoKTogQWN0aW9uW10ge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuIl19