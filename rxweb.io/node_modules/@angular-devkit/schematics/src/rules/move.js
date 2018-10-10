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
function move(from, to) {
    if (to === undefined) {
        to = from;
        from = '/';
    }
    const fromPath = core_1.normalize('/' + from);
    const toPath = core_1.normalize('/' + to);
    return tree => tree.visit(path => {
        if (path.startsWith(fromPath)) {
            tree.rename(path, toPath + '/' + path.substr(fromPath.length));
        }
    });
}
exports.move = move;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy9zcmMvcnVsZXMvbW92ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtDQUFpRDtBQUlqRCxjQUFxQixJQUFZLEVBQUUsRUFBVztJQUM1QyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNyQixFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ1YsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxNQUFNLFFBQVEsR0FBRyxnQkFBUyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN2QyxNQUFNLE1BQU0sR0FBRyxnQkFBUyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUVuQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBZEQsb0JBY0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBub3JtYWxpemUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBSdWxlIH0gZnJvbSAnLi4vZW5naW5lL2ludGVyZmFjZSc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmUoZnJvbTogc3RyaW5nLCB0bz86IHN0cmluZyk6IFJ1bGUge1xuICBpZiAodG8gPT09IHVuZGVmaW5lZCkge1xuICAgIHRvID0gZnJvbTtcbiAgICBmcm9tID0gJy8nO1xuICB9XG5cbiAgY29uc3QgZnJvbVBhdGggPSBub3JtYWxpemUoJy8nICsgZnJvbSk7XG4gIGNvbnN0IHRvUGF0aCA9IG5vcm1hbGl6ZSgnLycgKyB0byk7XG5cbiAgcmV0dXJuIHRyZWUgPT4gdHJlZS52aXNpdChwYXRoID0+IHtcbiAgICBpZiAocGF0aC5zdGFydHNXaXRoKGZyb21QYXRoKSkge1xuICAgICAgdHJlZS5yZW5hbWUocGF0aCwgdG9QYXRoICsgJy8nICsgcGF0aC5zdWJzdHIoZnJvbVBhdGgubGVuZ3RoKSk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==