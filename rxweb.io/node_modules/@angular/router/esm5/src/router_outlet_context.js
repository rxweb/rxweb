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
var OutletContext = /** @class */ (function () {
    function OutletContext() {
        this.outlet = null;
        this.route = null;
        this.resolver = null;
        this.children = new ChildrenOutletContexts();
        this.attachRef = null;
    }
    return OutletContext;
}());
export { OutletContext };
/**
 * Store contextual information about the children (= nested) `RouterOutlet`
 *
 *
 */
var ChildrenOutletContexts = /** @class */ (function () {
    function ChildrenOutletContexts() {
        // contexts for child outlets, by name.
        this.contexts = new Map();
    }
    /** Called when a `RouterOutlet` directive is instantiated */
    ChildrenOutletContexts.prototype.onChildOutletCreated = function (childName, outlet) {
        var context = this.getOrCreateContext(childName);
        context.outlet = outlet;
        this.contexts.set(childName, context);
    };
    /**
     * Called when a `RouterOutlet` directive is destroyed.
     * We need to keep the context as the outlet could be destroyed inside a NgIf and might be
     * re-created later.
     */
    ChildrenOutletContexts.prototype.onChildOutletDestroyed = function (childName) {
        var context = this.getContext(childName);
        if (context) {
            context.outlet = null;
        }
    };
    /**
     * Called when the corresponding route is deactivated during navigation.
     * Because the component get destroyed, all children outlet are destroyed.
     */
    ChildrenOutletContexts.prototype.onOutletDeactivated = function () {
        var contexts = this.contexts;
        this.contexts = new Map();
        return contexts;
    };
    ChildrenOutletContexts.prototype.onOutletReAttached = function (contexts) { this.contexts = contexts; };
    ChildrenOutletContexts.prototype.getOrCreateContext = function (childName) {
        var context = this.getContext(childName);
        if (!context) {
            context = new OutletContext();
            this.contexts.set(childName, context);
        }
        return context;
    };
    ChildrenOutletContexts.prototype.getContext = function (childName) { return this.contexts.get(childName) || null; };
    return ChildrenOutletContexts;
}());
export { ChildrenOutletContexts };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX291dGxldF9jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9yb3V0ZXJfb3V0bGV0X2NvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBUUg7Ozs7R0FJRztBQUNIO0lBQUE7UUFDRSxXQUFNLEdBQXNCLElBQUksQ0FBQztRQUNqQyxVQUFLLEdBQXdCLElBQUksQ0FBQztRQUNsQyxhQUFRLEdBQWtDLElBQUksQ0FBQztRQUMvQyxhQUFRLEdBQUcsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1FBQ3hDLGNBQVMsR0FBMkIsSUFBSSxDQUFDO0lBQzNDLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFORCxJQU1DOztBQUVEOzs7O0dBSUc7QUFDSDtJQUFBO1FBQ0UsdUNBQXVDO1FBQy9CLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztJQTZDdEQsQ0FBQztJQTNDQyw2REFBNkQ7SUFDN0QscURBQW9CLEdBQXBCLFVBQXFCLFNBQWlCLEVBQUUsTUFBb0I7UUFDMUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHVEQUFzQixHQUF0QixVQUF1QixTQUFpQjtRQUN0QyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLElBQUksT0FBTyxFQUFFO1lBQ1gsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsb0RBQW1CLEdBQW5CO1FBQ0UsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDMUIsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVELG1EQUFrQixHQUFsQixVQUFtQixRQUFvQyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUV0RixtREFBa0IsR0FBbEIsVUFBbUIsU0FBaUI7UUFDbEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELDJDQUFVLEdBQVYsVUFBVyxTQUFpQixJQUF3QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDcEcsNkJBQUM7QUFBRCxDQUFDLEFBL0NELElBK0NDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtSb3V0ZXJPdXRsZXR9IGZyb20gJy4vZGlyZWN0aXZlcy9yb3V0ZXJfb3V0bGV0JztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGV9IGZyb20gJy4vcm91dGVyX3N0YXRlJztcblxuXG4vKipcbiAqIFN0b3JlIGNvbnRleHR1YWwgaW5mb3JtYXRpb24gYWJvdXQgYSBgUm91dGVyT3V0bGV0YFxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBPdXRsZXRDb250ZXh0IHtcbiAgb3V0bGV0OiBSb3V0ZXJPdXRsZXR8bnVsbCA9IG51bGw7XG4gIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZXxudWxsID0gbnVsbDtcbiAgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcnxudWxsID0gbnVsbDtcbiAgY2hpbGRyZW4gPSBuZXcgQ2hpbGRyZW5PdXRsZXRDb250ZXh0cygpO1xuICBhdHRhY2hSZWY6IENvbXBvbmVudFJlZjxhbnk+fG51bGwgPSBudWxsO1xufVxuXG4vKipcbiAqIFN0b3JlIGNvbnRleHR1YWwgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNoaWxkcmVuICg9IG5lc3RlZCkgYFJvdXRlck91dGxldGBcbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQ2hpbGRyZW5PdXRsZXRDb250ZXh0cyB7XG4gIC8vIGNvbnRleHRzIGZvciBjaGlsZCBvdXRsZXRzLCBieSBuYW1lLlxuICBwcml2YXRlIGNvbnRleHRzID0gbmV3IE1hcDxzdHJpbmcsIE91dGxldENvbnRleHQ+KCk7XG5cbiAgLyoqIENhbGxlZCB3aGVuIGEgYFJvdXRlck91dGxldGAgZGlyZWN0aXZlIGlzIGluc3RhbnRpYXRlZCAqL1xuICBvbkNoaWxkT3V0bGV0Q3JlYXRlZChjaGlsZE5hbWU6IHN0cmluZywgb3V0bGV0OiBSb3V0ZXJPdXRsZXQpOiB2b2lkIHtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZXRPckNyZWF0ZUNvbnRleHQoY2hpbGROYW1lKTtcbiAgICBjb250ZXh0Lm91dGxldCA9IG91dGxldDtcbiAgICB0aGlzLmNvbnRleHRzLnNldChjaGlsZE5hbWUsIGNvbnRleHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgYFJvdXRlck91dGxldGAgZGlyZWN0aXZlIGlzIGRlc3Ryb3llZC5cbiAgICogV2UgbmVlZCB0byBrZWVwIHRoZSBjb250ZXh0IGFzIHRoZSBvdXRsZXQgY291bGQgYmUgZGVzdHJveWVkIGluc2lkZSBhIE5nSWYgYW5kIG1pZ2h0IGJlXG4gICAqIHJlLWNyZWF0ZWQgbGF0ZXIuXG4gICAqL1xuICBvbkNoaWxkT3V0bGV0RGVzdHJveWVkKGNoaWxkTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2V0Q29udGV4dChjaGlsZE5hbWUpO1xuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICBjb250ZXh0Lm91dGxldCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBjb3JyZXNwb25kaW5nIHJvdXRlIGlzIGRlYWN0aXZhdGVkIGR1cmluZyBuYXZpZ2F0aW9uLlxuICAgKiBCZWNhdXNlIHRoZSBjb21wb25lbnQgZ2V0IGRlc3Ryb3llZCwgYWxsIGNoaWxkcmVuIG91dGxldCBhcmUgZGVzdHJveWVkLlxuICAgKi9cbiAgb25PdXRsZXREZWFjdGl2YXRlZCgpOiBNYXA8c3RyaW5nLCBPdXRsZXRDb250ZXh0PiB7XG4gICAgY29uc3QgY29udGV4dHMgPSB0aGlzLmNvbnRleHRzO1xuICAgIHRoaXMuY29udGV4dHMgPSBuZXcgTWFwKCk7XG4gICAgcmV0dXJuIGNvbnRleHRzO1xuICB9XG5cbiAgb25PdXRsZXRSZUF0dGFjaGVkKGNvbnRleHRzOiBNYXA8c3RyaW5nLCBPdXRsZXRDb250ZXh0PikgeyB0aGlzLmNvbnRleHRzID0gY29udGV4dHM7IH1cblxuICBnZXRPckNyZWF0ZUNvbnRleHQoY2hpbGROYW1lOiBzdHJpbmcpOiBPdXRsZXRDb250ZXh0IHtcbiAgICBsZXQgY29udGV4dCA9IHRoaXMuZ2V0Q29udGV4dChjaGlsZE5hbWUpO1xuXG4gICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICBjb250ZXh0ID0gbmV3IE91dGxldENvbnRleHQoKTtcbiAgICAgIHRoaXMuY29udGV4dHMuc2V0KGNoaWxkTmFtZSwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRleHQ7XG4gIH1cblxuICBnZXRDb250ZXh0KGNoaWxkTmFtZTogc3RyaW5nKTogT3V0bGV0Q29udGV4dHxudWxsIHsgcmV0dXJuIHRoaXMuY29udGV4dHMuZ2V0KGNoaWxkTmFtZSkgfHwgbnVsbDsgfVxufVxuIl19