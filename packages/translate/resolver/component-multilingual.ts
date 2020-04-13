import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanDeactivate } from "@angular/router";
import { BaseResolver } from "./base-resolver";
import { Inject, Injector } from "@angular/core";
import { RxTranslateConfig } from "../interface/rx-translate-config";
import { translateConfigContainer } from '../core/translate-config-container'

export class ComponentGuard extends BaseResolver implements CanActivate, CanActivateChild {

    constructor(@Inject("config") config: RxTranslateConfig, injector: Injector) { super(config); translateConfigContainer.injector = injector }


    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.resolveRoute(childRoute);
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.resolveRoute(route);
    }

    
}
