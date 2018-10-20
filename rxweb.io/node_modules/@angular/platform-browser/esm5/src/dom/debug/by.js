/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getDOM } from '../../dom/dom_adapter';
/**
 * Predicates for use with {@link DebugElement}'s query functions.
 *
 * @experimental All debugging apis are currently experimental.
 */
var By = /** @class */ (function () {
    function By() {
    }
    /**
     * Match all elements.
     *
     * @usageNotes
     * ### Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_all'}
     */
    By.all = function () { return function (debugElement) { return true; }; };
    /**
     * Match elements by the given CSS selector.
     *
     * @usageNotes
     * ### Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_css'}
     */
    By.css = function (selector) {
        return function (debugElement) {
            return debugElement.nativeElement != null ?
                getDOM().elementMatches(debugElement.nativeElement, selector) :
                false;
        };
    };
    /**
     * Match elements that have the given directive present.
     *
     * @usageNotes
     * ### Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_directive'}
     */
    By.directive = function (type) {
        return function (debugElement) { return debugElement.providerTokens.indexOf(type) !== -1; };
    };
    return By;
}());
export { By };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9kb20vZGVidWcvYnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBSTdDOzs7O0dBSUc7QUFDSDtJQUFBO0lBc0NBLENBQUM7SUFyQ0M7Ozs7Ozs7T0FPRztJQUNJLE1BQUcsR0FBVixjQUF3QyxPQUFPLFVBQUMsWUFBWSxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUFDLENBQUM7SUFFeEU7Ozs7Ozs7T0FPRztJQUNJLE1BQUcsR0FBVixVQUFXLFFBQWdCO1FBQ3pCLE9BQU8sVUFBQyxZQUFZO1lBQ2xCLE9BQU8sWUFBWSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxFQUFFLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDL0QsS0FBSyxDQUFDO1FBQ1osQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxZQUFTLEdBQWhCLFVBQWlCLElBQWU7UUFDOUIsT0FBTyxVQUFDLFlBQVksSUFBSyxPQUFBLFlBQVksQ0FBQyxjQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBbEQsQ0FBa0QsQ0FBQztJQUM5RSxDQUFDO0lBQ0gsU0FBQztBQUFELENBQUMsQUF0Q0QsSUFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGVidWdFbGVtZW50LCBQcmVkaWNhdGUsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtnZXRET019IGZyb20gJy4uLy4uL2RvbS9kb21fYWRhcHRlcic7XG5cblxuXG4vKipcbiAqIFByZWRpY2F0ZXMgZm9yIHVzZSB3aXRoIHtAbGluayBEZWJ1Z0VsZW1lbnR9J3MgcXVlcnkgZnVuY3Rpb25zLlxuICpcbiAqIEBleHBlcmltZW50YWwgQWxsIGRlYnVnZ2luZyBhcGlzIGFyZSBjdXJyZW50bHkgZXhwZXJpbWVudGFsLlxuICovXG5leHBvcnQgY2xhc3MgQnkge1xuICAvKipcbiAgICogTWF0Y2ggYWxsIGVsZW1lbnRzLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgcGxhdGZvcm0tYnJvd3Nlci9kb20vZGVidWcvdHMvYnkvYnkudHMgcmVnaW9uPSdieV9hbGwnfVxuICAgKi9cbiAgc3RhdGljIGFsbCgpOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50PiB7IHJldHVybiAoZGVidWdFbGVtZW50KSA9PiB0cnVlOyB9XG5cbiAgLyoqXG4gICAqIE1hdGNoIGVsZW1lbnRzIGJ5IHRoZSBnaXZlbiBDU1Mgc2VsZWN0b3IuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBwbGF0Zm9ybS1icm93c2VyL2RvbS9kZWJ1Zy90cy9ieS9ieS50cyByZWdpb249J2J5X2Nzcyd9XG4gICAqL1xuICBzdGF0aWMgY3NzKHNlbGVjdG9yOiBzdHJpbmcpOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50PiB7XG4gICAgcmV0dXJuIChkZWJ1Z0VsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiBkZWJ1Z0VsZW1lbnQubmF0aXZlRWxlbWVudCAhPSBudWxsID9cbiAgICAgICAgICBnZXRET00oKS5lbGVtZW50TWF0Y2hlcyhkZWJ1Z0VsZW1lbnQubmF0aXZlRWxlbWVudCwgc2VsZWN0b3IpIDpcbiAgICAgICAgICBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIE1hdGNoIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gZGlyZWN0aXZlIHByZXNlbnQuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBwbGF0Zm9ybS1icm93c2VyL2RvbS9kZWJ1Zy90cy9ieS9ieS50cyByZWdpb249J2J5X2RpcmVjdGl2ZSd9XG4gICAqL1xuICBzdGF0aWMgZGlyZWN0aXZlKHR5cGU6IFR5cGU8YW55Pik6IFByZWRpY2F0ZTxEZWJ1Z0VsZW1lbnQ+IHtcbiAgICByZXR1cm4gKGRlYnVnRWxlbWVudCkgPT4gZGVidWdFbGVtZW50LnByb3ZpZGVyVG9rZW5zICEuaW5kZXhPZih0eXBlKSAhPT0gLTE7XG4gIH1cbn1cbiJdfQ==