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
const exception_1 = require("../../exception");
class Empty {
    constructor() {
        this.capabilities = {
            synchronous: true,
        };
    }
    read(path) {
        return rxjs_1.throwError(new exception_1.FileDoesNotExistException(path));
    }
    list(path) {
        return rxjs_1.of([]);
    }
    exists(path) {
        return rxjs_1.of(false);
    }
    isDirectory(path) {
        return rxjs_1.of(false);
    }
    isFile(path) {
        return rxjs_1.of(false);
    }
    stat(path) {
        // We support stat() but have no file.
        return rxjs_1.of(null);
    }
}
exports.Empty = Empty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHkuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2NvcmUvc3JjL3ZpcnR1YWwtZnMvaG9zdC9lbXB0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtCQUFrRDtBQUNsRCwrQ0FBNEQ7QUFJNUQ7SUFBQTtRQUNXLGlCQUFZLEdBQXFCO1lBQ3hDLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUM7SUEwQkosQ0FBQztJQXhCQyxJQUFJLENBQUMsSUFBVTtRQUNiLE9BQU8saUJBQVUsQ0FBQyxJQUFJLHFDQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFVO1FBQ2IsT0FBTyxTQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFVO1FBQ2YsT0FBTyxTQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFVO1FBQ3BCLE9BQU8sU0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBVTtRQUNmLE9BQU8sU0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBVTtRQUNiLHNDQUFzQztRQUN0QyxPQUFPLFNBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUE3QkQsc0JBNkJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb24gfSBmcm9tICcuLi8uLi9leGNlcHRpb24nO1xuaW1wb3J0IHsgUGF0aCwgUGF0aEZyYWdtZW50IH0gZnJvbSAnLi4vcGF0aCc7XG5pbXBvcnQgeyBGaWxlQnVmZmVyLCBIb3N0Q2FwYWJpbGl0aWVzLCBSZWFkb25seUhvc3QsIFN0YXRzIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgRW1wdHkgaW1wbGVtZW50cyBSZWFkb25seUhvc3Qge1xuICByZWFkb25seSBjYXBhYmlsaXRpZXM6IEhvc3RDYXBhYmlsaXRpZXMgPSB7XG4gICAgc3luY2hyb25vdXM6IHRydWUsXG4gIH07XG5cbiAgcmVhZChwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxGaWxlQnVmZmVyPiB7XG4gICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb24ocGF0aCkpO1xuICB9XG5cbiAgbGlzdChwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxQYXRoRnJhZ21lbnRbXT4ge1xuICAgIHJldHVybiBvZihbXSk7XG4gIH1cblxuICBleGlzdHMocGF0aDogUGF0aCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBvZihmYWxzZSk7XG4gIH1cblxuICBpc0RpcmVjdG9yeShwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG9mKGZhbHNlKTtcbiAgfVxuXG4gIGlzRmlsZShwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG9mKGZhbHNlKTtcbiAgfVxuXG4gIHN0YXQocGF0aDogUGF0aCk6IE9ic2VydmFibGU8U3RhdHM8e30+IHwgbnVsbD4ge1xuICAgIC8vIFdlIHN1cHBvcnQgc3RhdCgpIGJ1dCBoYXZlIG5vIGZpbGUuXG4gICAgcmV0dXJuIG9mKG51bGwpO1xuICB9XG59XG4iXX0=