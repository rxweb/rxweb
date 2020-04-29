import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanDeactivate } from "@angular/router";
import { BaseResolver } from "./base-resolver";
import { Inject, Injector } from "@angular/core";
import { RxTranslateConfig } from "../interface/rx-translate-config";
import { translateConfigContainer } from '../core/translate-config-container'
import { RX_TRANSLATE_CONFIG } from "../core/rx-translate-config.const";
import { Title } from "@angular/platform-browser";

export class ComponentGuard extends BaseResolver implements CanActivate, CanActivateChild {

    constructor(@Inject(RX_TRANSLATE_CONFIG) config: RxTranslateConfig, injector: Injector) { super(config); translateConfigContainer.injector = injector }


    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.resolveRoute(childRoute);
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.resolveRoute(route);
    }

    
}
