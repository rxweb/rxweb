import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanDeactivate } from "@angular/router";
import { BaseResolver } from "./base-resolver";
import { Inject } from "@angular/core";
import { RxTranslateConfig } from "../interface/rx-translate-config";


export class ComponentGuard extends BaseResolver implements CanActivate, CanActivateChild {

    constructor(@Inject("config") config: RxTranslateConfig) { super(config) }


    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.resolveRoute(childRoute);
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.resolveRoute(route);
    }

    
}
