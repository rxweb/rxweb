import { ActivatedRouteSnapshot } from "@angular/router";
import { ComponentGuard } from "../resolver";

export function overrideProperty() {
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "routeConfig", {
        get: function () { return this.cloneSnap; },
        set: function (v) {
            this.cloneSnap = v;
            if (this.cloneSnap && !this.cloneSnap.canActivate) {
                this.cloneSnap.canActivate = [ComponentGuard];
            } else if (this.cloneSnap && this.cloneSnap.canActivate)
                this.cloneSnap.canActivate.push(ComponentGuard);
            if (this.cloneSnap && this.cloneSnap.children) {
                this.cloneSnap.canActivateChild = [ComponentGuard]
            }
            
        },
        enumerable: true,
        configurable: true
    })
}