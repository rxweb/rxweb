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
/**
 * Store contextual information about a `RouterOutlet`
 *
 *
 */
export class OutletContext {
    constructor() {
        this.outlet = null;
        this.route = null;
        this.resolver = null;
        this.children = new ChildrenOutletContexts();
        this.attachRef = null;
    }
}
if (false) {
    /** @type {?} */
    OutletContext.prototype.outlet;
    /** @type {?} */
    OutletContext.prototype.route;
    /** @type {?} */
    OutletContext.prototype.resolver;
    /** @type {?} */
    OutletContext.prototype.children;
    /** @type {?} */
    OutletContext.prototype.attachRef;
}
/**
 * Store contextual information about the children (= nested) `RouterOutlet`
 *
 *
 */
export class ChildrenOutletContexts {
    constructor() {
        this.contexts = new Map();
    }
    /**
     * Called when a `RouterOutlet` directive is instantiated
     * @param {?} childName
     * @param {?} outlet
     * @return {?}
     */
    onChildOutletCreated(childName, outlet) {
        /** @type {?} */
        const context = this.getOrCreateContext(childName);
        context.outlet = outlet;
        this.contexts.set(childName, context);
    }
    /**
     * Called when a `RouterOutlet` directive is destroyed.
     * We need to keep the context as the outlet could be destroyed inside a NgIf and might be
     * re-created later.
     * @param {?} childName
     * @return {?}
     */
    onChildOutletDestroyed(childName) {
        /** @type {?} */
        const context = this.getContext(childName);
        if (context) {
            context.outlet = null;
        }
    }
    /**
     * Called when the corresponding route is deactivated during navigation.
     * Because the component get destroyed, all children outlet are destroyed.
     * @return {?}
     */
    onOutletDeactivated() {
        /** @type {?} */
        const contexts = this.contexts;
        this.contexts = new Map();
        return contexts;
    }
    /**
     * @param {?} contexts
     * @return {?}
     */
    onOutletReAttached(contexts) { this.contexts = contexts; }
    /**
     * @param {?} childName
     * @return {?}
     */
    getOrCreateContext(childName) {
        /** @type {?} */
        let context = this.getContext(childName);
        if (!context) {
            context = new OutletContext();
            this.contexts.set(childName, context);
        }
        return context;
    }
    /**
     * @param {?} childName
     * @return {?}
     */
    getContext(childName) { return this.contexts.get(childName) || null; }
}
if (false) {
    /** @type {?} */
    ChildrenOutletContexts.prototype.contexts;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX291dGxldF9jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9yb3V0ZXJfb3V0bGV0X2NvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxNQUFNOztzQkFDd0IsSUFBSTtxQkFDSCxJQUFJO3dCQUNTLElBQUk7d0JBQ25DLElBQUksc0JBQXNCLEVBQUU7eUJBQ0gsSUFBSTs7Q0FDekM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9ELE1BQU07O3dCQUVlLElBQUksR0FBRyxFQUF5Qjs7Ozs7Ozs7SUFHbkQsb0JBQW9CLENBQUMsU0FBaUIsRUFBRSxNQUFvQjs7UUFDMUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN2Qzs7Ozs7Ozs7SUFPRCxzQkFBc0IsQ0FBQyxTQUFpQjs7UUFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxJQUFJLE9BQU8sRUFBRTtZQUNYLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO0tBQ0Y7Ozs7OztJQU1ELG1CQUFtQjs7UUFDakIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDMUIsT0FBTyxRQUFRLENBQUM7S0FDakI7Ozs7O0lBRUQsa0JBQWtCLENBQUMsUUFBb0MsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxFQUFFOzs7OztJQUV0RixrQkFBa0IsQ0FBQyxTQUFpQjs7UUFDbEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDO1FBRUQsT0FBTyxPQUFPLENBQUM7S0FDaEI7Ozs7O0lBRUQsVUFBVSxDQUFDLFNBQWlCLElBQXdCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7Q0FDbkciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1JvdXRlck91dGxldH0gZnJvbSAnLi9kaXJlY3RpdmVzL3JvdXRlcl9vdXRsZXQnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnLi9yb3V0ZXJfc3RhdGUnO1xuXG5cbi8qKlxuICogU3RvcmUgY29udGV4dHVhbCBpbmZvcm1hdGlvbiBhYm91dCBhIGBSb3V0ZXJPdXRsZXRgXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIE91dGxldENvbnRleHQge1xuICBvdXRsZXQ6IFJvdXRlck91dGxldHxudWxsID0gbnVsbDtcbiAgcm91dGU6IEFjdGl2YXRlZFJvdXRlfG51bGwgPSBudWxsO1xuICByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyfG51bGwgPSBudWxsO1xuICBjaGlsZHJlbiA9IG5ldyBDaGlsZHJlbk91dGxldENvbnRleHRzKCk7XG4gIGF0dGFjaFJlZjogQ29tcG9uZW50UmVmPGFueT58bnVsbCA9IG51bGw7XG59XG5cbi8qKlxuICogU3RvcmUgY29udGV4dHVhbCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY2hpbGRyZW4gKD0gbmVzdGVkKSBgUm91dGVyT3V0bGV0YFxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDaGlsZHJlbk91dGxldENvbnRleHRzIHtcbiAgLy8gY29udGV4dHMgZm9yIGNoaWxkIG91dGxldHMsIGJ5IG5hbWUuXG4gIHByaXZhdGUgY29udGV4dHMgPSBuZXcgTWFwPHN0cmluZywgT3V0bGV0Q29udGV4dD4oKTtcblxuICAvKiogQ2FsbGVkIHdoZW4gYSBgUm91dGVyT3V0bGV0YCBkaXJlY3RpdmUgaXMgaW5zdGFudGlhdGVkICovXG4gIG9uQ2hpbGRPdXRsZXRDcmVhdGVkKGNoaWxkTmFtZTogc3RyaW5nLCBvdXRsZXQ6IFJvdXRlck91dGxldCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdldE9yQ3JlYXRlQ29udGV4dChjaGlsZE5hbWUpO1xuICAgIGNvbnRleHQub3V0bGV0ID0gb3V0bGV0O1xuICAgIHRoaXMuY29udGV4dHMuc2V0KGNoaWxkTmFtZSwgY29udGV4dCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBgUm91dGVyT3V0bGV0YCBkaXJlY3RpdmUgaXMgZGVzdHJveWVkLlxuICAgKiBXZSBuZWVkIHRvIGtlZXAgdGhlIGNvbnRleHQgYXMgdGhlIG91dGxldCBjb3VsZCBiZSBkZXN0cm95ZWQgaW5zaWRlIGEgTmdJZiBhbmQgbWlnaHQgYmVcbiAgICogcmUtY3JlYXRlZCBsYXRlci5cbiAgICovXG4gIG9uQ2hpbGRPdXRsZXREZXN0cm95ZWQoY2hpbGROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZXRDb250ZXh0KGNoaWxkTmFtZSk7XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQub3V0bGV0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGNvcnJlc3BvbmRpbmcgcm91dGUgaXMgZGVhY3RpdmF0ZWQgZHVyaW5nIG5hdmlnYXRpb24uXG4gICAqIEJlY2F1c2UgdGhlIGNvbXBvbmVudCBnZXQgZGVzdHJveWVkLCBhbGwgY2hpbGRyZW4gb3V0bGV0IGFyZSBkZXN0cm95ZWQuXG4gICAqL1xuICBvbk91dGxldERlYWN0aXZhdGVkKCk6IE1hcDxzdHJpbmcsIE91dGxldENvbnRleHQ+IHtcbiAgICBjb25zdCBjb250ZXh0cyA9IHRoaXMuY29udGV4dHM7XG4gICAgdGhpcy5jb250ZXh0cyA9IG5ldyBNYXAoKTtcbiAgICByZXR1cm4gY29udGV4dHM7XG4gIH1cblxuICBvbk91dGxldFJlQXR0YWNoZWQoY29udGV4dHM6IE1hcDxzdHJpbmcsIE91dGxldENvbnRleHQ+KSB7IHRoaXMuY29udGV4dHMgPSBjb250ZXh0czsgfVxuXG4gIGdldE9yQ3JlYXRlQ29udGV4dChjaGlsZE5hbWU6IHN0cmluZyk6IE91dGxldENvbnRleHQge1xuICAgIGxldCBjb250ZXh0ID0gdGhpcy5nZXRDb250ZXh0KGNoaWxkTmFtZSk7XG5cbiAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQgPSBuZXcgT3V0bGV0Q29udGV4dCgpO1xuICAgICAgdGhpcy5jb250ZXh0cy5zZXQoY2hpbGROYW1lLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udGV4dDtcbiAgfVxuXG4gIGdldENvbnRleHQoY2hpbGROYW1lOiBzdHJpbmcpOiBPdXRsZXRDb250ZXh0fG51bGwgeyByZXR1cm4gdGhpcy5jb250ZXh0cy5nZXQoY2hpbGROYW1lKSB8fCBudWxsOyB9XG59XG4iXX0=