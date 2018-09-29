"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// import { relative, Path } from "../../../angular_devkit/core/src/virtual-fs";
const core_1 = require("@angular-devkit/core");
function parseName(path, name) {
    const nameWithoutPath = core_1.basename(name);
    const namePath = core_1.dirname((path + '/' + name));
    return {
        name: nameWithoutPath,
        path: core_1.normalize('/' + namePath),
    };
}
exports.parseName = parseName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtbmFtZS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL3V0aWxpdHkvcGFyc2UtbmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBOzs7Ozs7R0FNRztBQUNILGdGQUFnRjtBQUNoRiwrQ0FBMEU7QUFPMUUsbUJBQTBCLElBQVksRUFBRSxJQUFZO0lBQ2xELE1BQU0sZUFBZSxHQUFHLGVBQVEsQ0FBQyxJQUFZLENBQUMsQ0FBQztJQUMvQyxNQUFNLFFBQVEsR0FBRyxjQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBUyxDQUFDLENBQUM7SUFFdEQsTUFBTSxDQUFDO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsSUFBSSxFQUFFLGdCQUFTLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztLQUNoQyxDQUFDO0FBQ0osQ0FBQztBQVJELDhCQVFDIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vLyBpbXBvcnQgeyByZWxhdGl2ZSwgUGF0aCB9IGZyb20gXCIuLi8uLi8uLi9hbmd1bGFyX2RldmtpdC9jb3JlL3NyYy92aXJ0dWFsLWZzXCI7XG5pbXBvcnQgeyBQYXRoLCBiYXNlbmFtZSwgZGlybmFtZSwgbm9ybWFsaXplIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvY2F0aW9uIHtcbiAgbmFtZTogc3RyaW5nO1xuICBwYXRoOiBQYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VOYW1lKHBhdGg6IHN0cmluZywgbmFtZTogc3RyaW5nKTogTG9jYXRpb24ge1xuICBjb25zdCBuYW1lV2l0aG91dFBhdGggPSBiYXNlbmFtZShuYW1lIGFzIFBhdGgpO1xuICBjb25zdCBuYW1lUGF0aCA9IGRpcm5hbWUoKHBhdGggKyAnLycgKyBuYW1lKSBhcyBQYXRoKTtcblxuICByZXR1cm4ge1xuICAgIG5hbWU6IG5hbWVXaXRob3V0UGF0aCxcbiAgICBwYXRoOiBub3JtYWxpemUoJy8nICsgbmFtZVBhdGgpLFxuICB9O1xufVxuIl19