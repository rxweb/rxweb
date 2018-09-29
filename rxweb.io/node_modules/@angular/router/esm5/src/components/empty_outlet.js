/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component } from '@angular/core';
/**
 * This component is used internally within the router to be a placeholder when an empty
 * router-outlet is needed. For example, with a config such as:
 *
 * `{path: 'parent', outlet: 'nav', children: [...]}`
 *
 * In order to render, there needs to be a component on this config, which will default
 * to this `EmptyOutletComponent`.
 */
var EmptyOutletComponent = /** @class */ (function () {
    function EmptyOutletComponent() {
    }
    EmptyOutletComponent.decorators = [
        { type: Component, args: [{ template: "<router-outlet></router-outlet>" }] }
    ];
    return EmptyOutletComponent;
}());
export { EmptyOutletComponent };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHlfb3V0bGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9jb21wb25lbnRzL2VtcHR5X291dGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXhDOzs7Ozs7OztHQVFHO0FBQ0g7SUFBQTtJQUVBLENBQUM7O2dCQUZBLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxpQ0FBaUMsRUFBQzs7SUFFeEQsMkJBQUM7Q0FBQSxBQUZELElBRUM7U0FEWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUaGlzIGNvbXBvbmVudCBpcyB1c2VkIGludGVybmFsbHkgd2l0aGluIHRoZSByb3V0ZXIgdG8gYmUgYSBwbGFjZWhvbGRlciB3aGVuIGFuIGVtcHR5XG4gKiByb3V0ZXItb3V0bGV0IGlzIG5lZWRlZC4gRm9yIGV4YW1wbGUsIHdpdGggYSBjb25maWcgc3VjaCBhczpcbiAqXG4gKiBge3BhdGg6ICdwYXJlbnQnLCBvdXRsZXQ6ICduYXYnLCBjaGlsZHJlbjogWy4uLl19YFxuICpcbiAqIEluIG9yZGVyIHRvIHJlbmRlciwgdGhlcmUgbmVlZHMgdG8gYmUgYSBjb21wb25lbnQgb24gdGhpcyBjb25maWcsIHdoaWNoIHdpbGwgZGVmYXVsdFxuICogdG8gdGhpcyBgRW1wdHlPdXRsZXRDb21wb25lbnRgLlxuICovXG5AQ29tcG9uZW50KHt0ZW1wbGF0ZTogYDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5gfSlcbmV4cG9ydCBjbGFzcyBFbXB0eU91dGxldENvbXBvbmVudCB7XG59Il19