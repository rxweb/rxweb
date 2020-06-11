import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from "@angular/router";
import { BaseResolver } from "./base-resolver";
import { Inject, Injector } from "@angular/core";
import { RxTranslateConfig } from "../interface/rx-translate-config";
import { translateConfigContainer } from '../core/translate-config-container'
import { RX_TRANSLATE_CONFIG, CUSTOM_LOADER } from "../core/rx-translate-config.const";
import { Title } from "@angular/platform-browser";
import { TranslationLoader } from "../interface/translation-loader";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class ComponentGuard extends BaseResolver implements CanActivate, CanActivateChild {

    constructor(@Inject(RX_TRANSLATE_CONFIG) config: RxTranslateConfig, injector: Injector, @Inject(CUSTOM_LOADER) customLoader: TranslationLoader, httpClient: HttpClient) { super(config, httpClient); translateConfigContainer.injector = injector; if (!translateConfigContainer.customLoader) translateConfigContainer.customLoader = customLoader; }


    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.resolveGlobalTranslate(childRoute);
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.resolveGlobalTranslate(route);
    }

    private resolveGlobalTranslate(route: ActivatedRouteSnapshot) {
        this.cloneBaseConfig = { ...translateConfigContainer.config };
        if (translateConfigContainer.globalTranslate) {
            return Observable.create(subscriber => {
                translateConfigContainer.globalTranslate.subscribe(t => {
                    this.resolveRoute(route).subscribe(x => { subscriber.next(x); subscriber.complete() });
                })
            })
        } else
            return this.resolveRoute(route);
    }

    
}
