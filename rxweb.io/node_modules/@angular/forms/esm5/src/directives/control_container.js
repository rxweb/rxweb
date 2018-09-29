/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { AbstractControlDirective } from './abstract_control_directive';
/**
 * A directive that contains multiple `NgControl`s.
 *
 * Only used by the forms module.
 *
 *
 */
var ControlContainer = /** @class */ (function (_super) {
    tslib_1.__extends(ControlContainer, _super);
    function ControlContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ControlContainer.prototype, "formDirective", {
        /**
         * Get the form to which this container belongs.
         */
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlContainer.prototype, "path", {
        /**
         * Get the path to this container.
         */
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    return ControlContainer;
}(AbstractControlDirective));
export { ControlContainer };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbF9jb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9mb3Jtcy9zcmMvZGlyZWN0aXZlcy9jb250cm9sX2NvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFJdEU7Ozs7OztHQU1HO0FBQ0g7SUFBK0MsNENBQXdCO0lBQXZFOztJQWFBLENBQUM7SUFOQyxzQkFBSSwyQ0FBYTtRQUhqQjs7V0FFRzthQUNILGNBQWlDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFLL0Msc0JBQUksa0NBQUk7UUFIUjs7V0FFRzthQUNILGNBQTRCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDNUMsdUJBQUM7QUFBRCxDQUFDLEFBYkQsQ0FBK0Msd0JBQXdCLEdBYXRFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbERpcmVjdGl2ZX0gZnJvbSAnLi9hYnN0cmFjdF9jb250cm9sX2RpcmVjdGl2ZSc7XG5pbXBvcnQge0Zvcm19IGZyb20gJy4vZm9ybV9pbnRlcmZhY2UnO1xuXG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBjb250YWlucyBtdWx0aXBsZSBgTmdDb250cm9sYHMuXG4gKlxuICogT25seSB1c2VkIGJ5IHRoZSBmb3JtcyBtb2R1bGUuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbnRyb2xDb250YWluZXIgZXh0ZW5kcyBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgbmFtZSAhOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZm9ybSB0byB3aGljaCB0aGlzIGNvbnRhaW5lciBiZWxvbmdzLlxuICAgKi9cbiAgZ2V0IGZvcm1EaXJlY3RpdmUoKTogRm9ybXxudWxsIHsgcmV0dXJuIG51bGw7IH1cblxuICAvKipcbiAgICogR2V0IHRoZSBwYXRoIHRvIHRoaXMgY29udGFpbmVyLlxuICAgKi9cbiAgZ2V0IHBhdGgoKTogc3RyaW5nW118bnVsbCB7IHJldHVybiBudWxsOyB9XG59XG4iXX0=