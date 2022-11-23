import { ActivatedRouteSnapshot } from "@angular/router";
import { ComponentGuard } from "../resolver";

export function overrideProperty() {
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "routeConfig", {
        get: function () { return this.cloneSnap; },
        set: function (v) {
            this.cloneSnap = v;
            if (this.cloneSnap && !this.cloneSnap.canActivate) {
                this.cloneSnap.canActivate = [ComponentGuard];
            }
            else if (this.cloneSnap && this.cloneSnap.canActivate) {
                if (this.cloneSnap.canActivate.filter(t => t == ComponentGuard).length == 0) {
                    this.cloneSnap.canActivate.push(ComponentGuard);
                }

            }
            if (this.cloneSnap && this.cloneSnap.children) {
                if (this.cloneSnap && !this.cloneSnap.canActivateChild) {
                    this.cloneSnap.canActivateChild = [ComponentGuard];
                }
                else if (this.cloneSnap && this.cloneSnap.canActivateChild) {
                    if (this.cloneSnap.canActivateChild.filter(t => t== ComponentGuard).length == 0)
                        this.cloneSnap.canActivateChild.push(ComponentGuard);
                }
            }
        },
        enumerable: true,
        configurable: true
    })
}