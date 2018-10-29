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
const base_1 = require("./base");
function move(from, to) {
    if (to === undefined) {
        to = from;
        from = '/';
    }
    const fromPath = core_1.normalize('/' + from);
    const toPath = core_1.normalize('/' + to);
    if (fromPath === toPath) {
        return base_1.noop;
    }
    return tree => tree.visit(path => {
        if (path.startsWith(fromPath)) {
            tree.rename(path, toPath + '/' + path.substr(fromPath.length));
        }
    });
}
exports.move = move;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy9zcmMvcnVsZXMvbW92ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtDQUFpRDtBQUVqRCxpQ0FBOEI7QUFHOUIsY0FBcUIsSUFBWSxFQUFFLEVBQVc7SUFDNUMsSUFBSSxFQUFFLEtBQUssU0FBUyxFQUFFO1FBQ3BCLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDVixJQUFJLEdBQUcsR0FBRyxDQUFDO0tBQ1o7SUFFRCxNQUFNLFFBQVEsR0FBRyxnQkFBUyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN2QyxNQUFNLE1BQU0sR0FBRyxnQkFBUyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUVuQyxJQUFJLFFBQVEsS0FBSyxNQUFNLEVBQUU7UUFDdkIsT0FBTyxXQUFJLENBQUM7S0FDYjtJQUVELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQy9CLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFsQkQsb0JBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgbm9ybWFsaXplIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgUnVsZSB9IGZyb20gJy4uL2VuZ2luZS9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4vYmFzZSc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmUoZnJvbTogc3RyaW5nLCB0bz86IHN0cmluZyk6IFJ1bGUge1xuICBpZiAodG8gPT09IHVuZGVmaW5lZCkge1xuICAgIHRvID0gZnJvbTtcbiAgICBmcm9tID0gJy8nO1xuICB9XG5cbiAgY29uc3QgZnJvbVBhdGggPSBub3JtYWxpemUoJy8nICsgZnJvbSk7XG4gIGNvbnN0IHRvUGF0aCA9IG5vcm1hbGl6ZSgnLycgKyB0byk7XG5cbiAgaWYgKGZyb21QYXRoID09PSB0b1BhdGgpIHtcbiAgICByZXR1cm4gbm9vcDtcbiAgfVxuXG4gIHJldHVybiB0cmVlID0+IHRyZWUudmlzaXQocGF0aCA9PiB7XG4gICAgaWYgKHBhdGguc3RhcnRzV2l0aChmcm9tUGF0aCkpIHtcbiAgICAgIHRyZWUucmVuYW1lKHBhdGgsIHRvUGF0aCArICcvJyArIHBhdGguc3Vic3RyKGZyb21QYXRoLmxlbmd0aCkpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=