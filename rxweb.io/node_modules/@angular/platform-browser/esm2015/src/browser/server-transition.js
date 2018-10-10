/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_INITIALIZER, ApplicationInitStatus, InjectionToken, Injector } from '@angular/core';
import { getDOM } from '../dom/dom_adapter';
import { DOCUMENT } from '../dom/dom_tokens';
/** *
 * An id that identifies a particular application being bootstrapped, that should
 * match across the client/server boundary.
  @type {?} */
export const TRANSITION_ID = new InjectionToken('TRANSITION_ID');
/**
 * @param {?} transitionId
 * @param {?} document
 * @param {?} injector
 * @return {?}
 */
export function appInitializerFactory(transitionId, document, injector) {
    return () => {
        // Wait for all application initializers to be completed before removing the styles set by
        // the server.
        injector.get(ApplicationInitStatus).donePromise.then(() => {
            /** @type {?} */
            const dom = getDOM();
            /** @type {?} */
            const styles = Array.prototype.slice.apply(dom.querySelectorAll(document, `style[ng-transition]`));
            styles.filter(el => dom.getAttribute(el, 'ng-transition') === transitionId)
                .forEach(el => dom.remove(el));
        });
    };
}
/** @type {?} */
export const SERVER_TRANSITION_PROVIDERS = [
    {
        provide: APP_INITIALIZER,
        useFactory: appInitializerFactory,
        deps: [TRANSITION_ID, DOCUMENT, Injector],
        multi: true
    },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLXRyYW5zaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3NlcnZlci10cmFuc2l0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGVBQWUsRUFBRSxxQkFBcUIsRUFBVSxjQUFjLEVBQUUsUUFBUSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUV2SCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDMUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7OztBQU0zQyxhQUFhLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7Ozs7OztBQUVqRSxNQUFNLGdDQUFnQyxZQUFvQixFQUFFLFFBQWEsRUFBRSxRQUFrQjtJQUMzRixPQUFPLEdBQUcsRUFBRTs7O1FBR1YsUUFBUSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFOztZQUN4RCxNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQzs7WUFDckIsTUFBTSxNQUFNLEdBQ1IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxlQUFlLENBQUMsS0FBSyxZQUFZLENBQUM7aUJBQ3RFLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNwQyxDQUFDLENBQUM7S0FDSixDQUFDO0NBQ0g7O0FBRUQsYUFBYSwyQkFBMkIsR0FBcUI7SUFDM0Q7UUFDRSxPQUFPLEVBQUUsZUFBZTtRQUN4QixVQUFVLEVBQUUscUJBQXFCO1FBQ2pDLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO1FBQ3pDLEtBQUssRUFBRSxJQUFJO0tBQ1o7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FQUF9JTklUSUFMSVpFUiwgQXBwbGljYXRpb25Jbml0U3RhdHVzLCBJbmplY3QsIEluamVjdGlvblRva2VuLCBJbmplY3RvciwgU3RhdGljUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2dldERPTX0gZnJvbSAnLi4vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJy4uL2RvbS9kb21fdG9rZW5zJztcblxuLyoqXG4gKiBBbiBpZCB0aGF0IGlkZW50aWZpZXMgYSBwYXJ0aWN1bGFyIGFwcGxpY2F0aW9uIGJlaW5nIGJvb3RzdHJhcHBlZCwgdGhhdCBzaG91bGRcbiAqIG1hdGNoIGFjcm9zcyB0aGUgY2xpZW50L3NlcnZlciBib3VuZGFyeS5cbiAqL1xuZXhwb3J0IGNvbnN0IFRSQU5TSVRJT05fSUQgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ1RSQU5TSVRJT05fSUQnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFwcEluaXRpYWxpemVyRmFjdG9yeSh0cmFuc2l0aW9uSWQ6IHN0cmluZywgZG9jdW1lbnQ6IGFueSwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgLy8gV2FpdCBmb3IgYWxsIGFwcGxpY2F0aW9uIGluaXRpYWxpemVycyB0byBiZSBjb21wbGV0ZWQgYmVmb3JlIHJlbW92aW5nIHRoZSBzdHlsZXMgc2V0IGJ5XG4gICAgLy8gdGhlIHNlcnZlci5cbiAgICBpbmplY3Rvci5nZXQoQXBwbGljYXRpb25Jbml0U3RhdHVzKS5kb25lUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGRvbSA9IGdldERPTSgpO1xuICAgICAgY29uc3Qgc3R5bGVzOiBhbnlbXSA9XG4gICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGRvbS5xdWVyeVNlbGVjdG9yQWxsKGRvY3VtZW50LCBgc3R5bGVbbmctdHJhbnNpdGlvbl1gKSk7XG4gICAgICBzdHlsZXMuZmlsdGVyKGVsID0+IGRvbS5nZXRBdHRyaWJ1dGUoZWwsICduZy10cmFuc2l0aW9uJykgPT09IHRyYW5zaXRpb25JZClcbiAgICAgICAgICAuZm9yRWFjaChlbCA9PiBkb20ucmVtb3ZlKGVsKSk7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBTRVJWRVJfVFJBTlNJVElPTl9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtcbiAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgdXNlRmFjdG9yeTogYXBwSW5pdGlhbGl6ZXJGYWN0b3J5LFxuICAgIGRlcHM6IFtUUkFOU0lUSU9OX0lELCBET0NVTUVOVCwgSW5qZWN0b3JdLFxuICAgIG11bHRpOiB0cnVlXG4gIH0sXG5dO1xuIl19