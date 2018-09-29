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
import { setTestabilityGetter, ɵglobal as global } from '@angular/core';
import { getDOM } from '../dom/dom_adapter';
export class BrowserGetTestability {
    /**
     * @return {?}
     */
    static init() { setTestabilityGetter(new BrowserGetTestability()); }
    /**
     * @param {?} registry
     * @return {?}
     */
    addToWindow(registry) {
        global['getAngularTestability'] = (elem, findInAncestors = true) => {
            /** @type {?} */
            const testability = registry.findTestabilityInTree(elem, findInAncestors);
            if (testability == null) {
                throw new Error('Could not find testability for element.');
            }
            return testability;
        };
        global['getAllAngularTestabilities'] = () => registry.getAllTestabilities();
        global['getAllAngularRootElements'] = () => registry.getAllRootElements();
        /** @type {?} */
        const whenAllStable = (callback /** TODO #9100 */) => {
            /** @type {?} */
            const testabilities = global['getAllAngularTestabilities']();
            /** @type {?} */
            let count = testabilities.length;
            /** @type {?} */
            let didWork = false;
            /** @type {?} */
            const decrement = function (didWork_ /** TODO #9100 */) {
                didWork = didWork || didWork_;
                count--;
                if (count == 0) {
                    callback(didWork);
                }
            };
            testabilities.forEach(function (testability /** TODO #9100 */) {
                testability.whenStable(decrement);
            });
        };
        if (!global['frameworkStabilizers']) {
            global['frameworkStabilizers'] = [];
        }
        global['frameworkStabilizers'].push(whenAllStable);
    }
    /**
     * @param {?} registry
     * @param {?} elem
     * @param {?} findInAncestors
     * @return {?}
     */
    findTestabilityInTree(registry, elem, findInAncestors) {
        if (elem == null) {
            return null;
        }
        /** @type {?} */
        const t = registry.getTestability(elem);
        if (t != null) {
            return t;
        }
        else if (!findInAncestors) {
            return null;
        }
        if (getDOM().isShadowRoot(elem)) {
            return this.findTestabilityInTree(registry, getDOM().getHost(elem), true);
        }
        return this.findTestabilityInTree(registry, getDOM().parentElement(elem), true);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGFiaWxpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3Rlc3RhYmlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFtRCxvQkFBb0IsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXhILE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUUxQyxNQUFNOzs7O0lBQ0osTUFBTSxDQUFDLElBQUksS0FBSyxvQkFBb0IsQ0FBQyxJQUFJLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxFQUFFOzs7OztJQUVwRSxXQUFXLENBQUMsUUFBNkI7UUFDdkMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxJQUFTLEVBQUUsa0JBQTJCLElBQUksRUFBRSxFQUFFOztZQUMvRSxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzFFLElBQUksV0FBVyxJQUFJLElBQUksRUFBRTtnQkFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2FBQzVEO1lBQ0QsT0FBTyxXQUFXLENBQUM7U0FDcEIsQ0FBQztRQUVGLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTVFLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDOztRQUUxRSxNQUFNLGFBQWEsR0FBRyxDQUFDLFFBQWEsb0JBQW9CLEVBQUU7O1lBQ3hELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFLENBQUM7O1lBQzdELElBQUksS0FBSyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7O1lBQ2pDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQzs7WUFDcEIsTUFBTSxTQUFTLEdBQUcsVUFBUyxRQUFhO2dCQUN0QyxPQUFPLEdBQUcsT0FBTyxJQUFJLFFBQVEsQ0FBQztnQkFDOUIsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO29CQUNkLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbkI7YUFDRixDQUFDO1lBQ0YsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFTLFdBQWdCO2dCQUM3QyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ25DLENBQUMsQ0FBQztTQUNKLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7WUFDbkMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3JDO1FBQ0QsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQ3BEOzs7Ozs7O0lBRUQscUJBQXFCLENBQUMsUUFBNkIsRUFBRSxJQUFTLEVBQUUsZUFBd0I7UUFFdEYsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7O1FBQ0QsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDYixPQUFPLENBQUMsQ0FBQztTQUNWO2FBQU0sSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzRTtRQUNELE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDakY7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtHZXRUZXN0YWJpbGl0eSwgVGVzdGFiaWxpdHksIFRlc3RhYmlsaXR5UmVnaXN0cnksIHNldFRlc3RhYmlsaXR5R2V0dGVyLCDJtWdsb2JhbCBhcyBnbG9iYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2dldERPTX0gZnJvbSAnLi4vZG9tL2RvbV9hZGFwdGVyJztcblxuZXhwb3J0IGNsYXNzIEJyb3dzZXJHZXRUZXN0YWJpbGl0eSBpbXBsZW1lbnRzIEdldFRlc3RhYmlsaXR5IHtcbiAgc3RhdGljIGluaXQoKSB7IHNldFRlc3RhYmlsaXR5R2V0dGVyKG5ldyBCcm93c2VyR2V0VGVzdGFiaWxpdHkoKSk7IH1cblxuICBhZGRUb1dpbmRvdyhyZWdpc3RyeTogVGVzdGFiaWxpdHlSZWdpc3RyeSk6IHZvaWQge1xuICAgIGdsb2JhbFsnZ2V0QW5ndWxhclRlc3RhYmlsaXR5J10gPSAoZWxlbTogYW55LCBmaW5kSW5BbmNlc3RvcnM6IGJvb2xlYW4gPSB0cnVlKSA9PiB7XG4gICAgICBjb25zdCB0ZXN0YWJpbGl0eSA9IHJlZ2lzdHJ5LmZpbmRUZXN0YWJpbGl0eUluVHJlZShlbGVtLCBmaW5kSW5BbmNlc3RvcnMpO1xuICAgICAgaWYgKHRlc3RhYmlsaXR5ID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCB0ZXN0YWJpbGl0eSBmb3IgZWxlbWVudC4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZXN0YWJpbGl0eTtcbiAgICB9O1xuXG4gICAgZ2xvYmFsWydnZXRBbGxBbmd1bGFyVGVzdGFiaWxpdGllcyddID0gKCkgPT4gcmVnaXN0cnkuZ2V0QWxsVGVzdGFiaWxpdGllcygpO1xuXG4gICAgZ2xvYmFsWydnZXRBbGxBbmd1bGFyUm9vdEVsZW1lbnRzJ10gPSAoKSA9PiByZWdpc3RyeS5nZXRBbGxSb290RWxlbWVudHMoKTtcblxuICAgIGNvbnN0IHdoZW5BbGxTdGFibGUgPSAoY2FsbGJhY2s6IGFueSAvKiogVE9ETyAjOTEwMCAqLykgPT4ge1xuICAgICAgY29uc3QgdGVzdGFiaWxpdGllcyA9IGdsb2JhbFsnZ2V0QWxsQW5ndWxhclRlc3RhYmlsaXRpZXMnXSgpO1xuICAgICAgbGV0IGNvdW50ID0gdGVzdGFiaWxpdGllcy5sZW5ndGg7XG4gICAgICBsZXQgZGlkV29yayA9IGZhbHNlO1xuICAgICAgY29uc3QgZGVjcmVtZW50ID0gZnVuY3Rpb24oZGlkV29ya186IGFueSAvKiogVE9ETyAjOTEwMCAqLykge1xuICAgICAgICBkaWRXb3JrID0gZGlkV29yayB8fCBkaWRXb3JrXztcbiAgICAgICAgY291bnQtLTtcbiAgICAgICAgaWYgKGNvdW50ID09IDApIHtcbiAgICAgICAgICBjYWxsYmFjayhkaWRXb3JrKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHRlc3RhYmlsaXRpZXMuZm9yRWFjaChmdW5jdGlvbih0ZXN0YWJpbGl0eTogYW55IC8qKiBUT0RPICM5MTAwICovKSB7XG4gICAgICAgIHRlc3RhYmlsaXR5LndoZW5TdGFibGUoZGVjcmVtZW50KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpZiAoIWdsb2JhbFsnZnJhbWV3b3JrU3RhYmlsaXplcnMnXSkge1xuICAgICAgZ2xvYmFsWydmcmFtZXdvcmtTdGFiaWxpemVycyddID0gW107XG4gICAgfVxuICAgIGdsb2JhbFsnZnJhbWV3b3JrU3RhYmlsaXplcnMnXS5wdXNoKHdoZW5BbGxTdGFibGUpO1xuICB9XG5cbiAgZmluZFRlc3RhYmlsaXR5SW5UcmVlKHJlZ2lzdHJ5OiBUZXN0YWJpbGl0eVJlZ2lzdHJ5LCBlbGVtOiBhbnksIGZpbmRJbkFuY2VzdG9yczogYm9vbGVhbik6XG4gICAgICBUZXN0YWJpbGl0eXxudWxsIHtcbiAgICBpZiAoZWxlbSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgdCA9IHJlZ2lzdHJ5LmdldFRlc3RhYmlsaXR5KGVsZW0pO1xuICAgIGlmICh0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0O1xuICAgIH0gZWxzZSBpZiAoIWZpbmRJbkFuY2VzdG9ycykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChnZXRET00oKS5pc1NoYWRvd1Jvb3QoZWxlbSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbmRUZXN0YWJpbGl0eUluVHJlZShyZWdpc3RyeSwgZ2V0RE9NKCkuZ2V0SG9zdChlbGVtKSwgdHJ1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmZpbmRUZXN0YWJpbGl0eUluVHJlZShyZWdpc3RyeSwgZ2V0RE9NKCkucGFyZW50RWxlbWVudChlbGVtKSwgdHJ1ZSk7XG4gIH1cbn1cbiJdfQ==