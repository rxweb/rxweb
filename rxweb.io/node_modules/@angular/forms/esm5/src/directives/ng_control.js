/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { AbstractControlDirective } from './abstract_control_directive';
function unimplemented() {
    throw new Error('unimplemented');
}
/**
 * @description
 * A base class that all control `FormControl`-based directives extend. It binds a `FormControl`
 * object to a DOM element.
 */
var NgControl = /** @class */ (function (_super) {
    tslib_1.__extends(NgControl, _super);
    function NgControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @description
         * The parent form for the control.
         *
         * @internal
         */
        _this._parent = null;
        /**
         * @description
         * The name for the control
         */
        _this.name = null;
        /**
         * @description
         * The value accessor for the control
         */
        _this.valueAccessor = null;
        /**
         * @description
         * The uncomposed array of synchronous validators for the control
         *
         * @internal
         */
        _this._rawValidators = [];
        /**
         * @description
         * The uncomposed array of async validators for the control
         *
         * @internal
         */
        _this._rawAsyncValidators = [];
        return _this;
    }
    Object.defineProperty(NgControl.prototype, "validator", {
        /**
         * @description
         * The registered synchronous validator function for the control
         *
         * @throws An exception that this method is not implemented
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgControl.prototype, "asyncValidator", {
        /**
         * @description
         * The registered async validator function for the control
         *
         * @throws An exception that this method is not implemented
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return NgControl;
}(AbstractControlDirective));
export { NgControl };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Zvcm1zL3NyYy9kaXJlY3RpdmVzL25nX2NvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUdILE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBS3RFO0lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQXdDLHFDQUF3QjtJQUFoRTtRQUFBLHFFQTREQztRQTNEQzs7Ozs7V0FLRztRQUNILGFBQU8sR0FBMEIsSUFBSSxDQUFDO1FBRXRDOzs7V0FHRztRQUNILFVBQUksR0FBZ0IsSUFBSSxDQUFDO1FBRXpCOzs7V0FHRztRQUNILG1CQUFhLEdBQThCLElBQUksQ0FBQztRQUVoRDs7Ozs7V0FLRztRQUNILG9CQUFjLEdBQWlDLEVBQUUsQ0FBQztRQUVsRDs7Ozs7V0FLRztRQUNILHlCQUFtQixHQUEyQyxFQUFFLENBQUM7O0lBeUJuRSxDQUFDO0lBakJDLHNCQUFJLGdDQUFTO1FBTmI7Ozs7O1dBS0c7YUFDSCxjQUFvQyxPQUFvQixhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBUTFFLHNCQUFJLHFDQUFjO1FBTmxCOzs7OztXQUtHO2FBQ0gsY0FBOEMsT0FBeUIsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQVMzRixnQkFBQztBQUFELENBQUMsQUE1REQsQ0FBd0Msd0JBQXdCLEdBNEQvRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbERpcmVjdGl2ZX0gZnJvbSAnLi9hYnN0cmFjdF9jb250cm9sX2RpcmVjdGl2ZSc7XG5pbXBvcnQge0NvbnRyb2xDb250YWluZXJ9IGZyb20gJy4vY29udHJvbF9jb250YWluZXInO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7QXN5bmNWYWxpZGF0b3IsIEFzeW5jVmFsaWRhdG9yRm4sIFZhbGlkYXRvciwgVmFsaWRhdG9yRm59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cbmZ1bmN0aW9uIHVuaW1wbGVtZW50ZWQoKTogYW55IHtcbiAgdGhyb3cgbmV3IEVycm9yKCd1bmltcGxlbWVudGVkJyk7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIGJhc2UgY2xhc3MgdGhhdCBhbGwgY29udHJvbCBgRm9ybUNvbnRyb2xgLWJhc2VkIGRpcmVjdGl2ZXMgZXh0ZW5kLiBJdCBiaW5kcyBhIGBGb3JtQ29udHJvbGBcbiAqIG9iamVjdCB0byBhIERPTSBlbGVtZW50LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdDb250cm9sIGV4dGVuZHMgQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlIHtcbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGUgcGFyZW50IGZvcm0gZm9yIHRoZSBjb250cm9sLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF9wYXJlbnQ6IENvbnRyb2xDb250YWluZXJ8bnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGUgbmFtZSBmb3IgdGhlIGNvbnRyb2xcbiAgICovXG4gIG5hbWU6IHN0cmluZ3xudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoZSB2YWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbnRyb2xcbiAgICovXG4gIHZhbHVlQWNjZXNzb3I6IENvbnRyb2xWYWx1ZUFjY2Vzc29yfG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIHVuY29tcG9zZWQgYXJyYXkgb2Ygc3luY2hyb25vdXMgdmFsaWRhdG9ycyBmb3IgdGhlIGNvbnRyb2xcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfcmF3VmFsaWRhdG9yczogQXJyYXk8VmFsaWRhdG9yfFZhbGlkYXRvckZuPiA9IFtdO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIHVuY29tcG9zZWQgYXJyYXkgb2YgYXN5bmMgdmFsaWRhdG9ycyBmb3IgdGhlIGNvbnRyb2xcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfcmF3QXN5bmNWYWxpZGF0b3JzOiBBcnJheTxBc3luY1ZhbGlkYXRvcnxBc3luY1ZhbGlkYXRvckZuPiA9IFtdO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIHJlZ2lzdGVyZWQgc3luY2hyb25vdXMgdmFsaWRhdG9yIGZ1bmN0aW9uIGZvciB0aGUgY29udHJvbFxuICAgKlxuICAgKiBAdGhyb3dzIEFuIGV4Y2VwdGlvbiB0aGF0IHRoaXMgbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZFxuICAgKi9cbiAgZ2V0IHZhbGlkYXRvcigpOiBWYWxpZGF0b3JGbnxudWxsIHsgcmV0dXJuIDxWYWxpZGF0b3JGbj51bmltcGxlbWVudGVkKCk7IH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoZSByZWdpc3RlcmVkIGFzeW5jIHZhbGlkYXRvciBmdW5jdGlvbiBmb3IgdGhlIGNvbnRyb2xcbiAgICpcbiAgICogQHRocm93cyBBbiBleGNlcHRpb24gdGhhdCB0aGlzIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWRcbiAgICovXG4gIGdldCBhc3luY1ZhbGlkYXRvcigpOiBBc3luY1ZhbGlkYXRvckZufG51bGwgeyByZXR1cm4gPEFzeW5jVmFsaWRhdG9yRm4+dW5pbXBsZW1lbnRlZCgpOyB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGUgY2FsbGJhY2sgbWV0aG9kIHRvIHVwZGF0ZSB0aGUgbW9kZWwgZnJvbSB0aGUgdmlldyB3aGVuIHJlcXVlc3RlZFxuICAgKlxuICAgKiBAcGFyYW0gbmV3VmFsdWUgVGhlIG5ldyB2YWx1ZSBmb3IgdGhlIHZpZXdcbiAgICovXG4gIGFic3RyYWN0IHZpZXdUb01vZGVsVXBkYXRlKG5ld1ZhbHVlOiBhbnkpOiB2b2lkO1xufVxuIl19