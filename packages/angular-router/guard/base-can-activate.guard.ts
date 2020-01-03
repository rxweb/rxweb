import { Injectable, Injector } from "@angular/core";
import { Router ,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import { authResolver } from "../functions/auth-resolver.function";
import { authorize } from "../functions/authorize.function";
import { middleware } from "../functions/middleware.function";
import { paramsDecryption } from "../functions/params-decryption.function";
import { multilingual } from "../functions/multilingual.function";
import { ParamResolver } from "../core/param-resolver.service";
import { componentInstanceProvider } from "../core/component-instance-provider";


@Injectable()
export class BaseCanActivate implements CanActivate {
    constructor(
        private injector: Injector, private paramResolver: ParamResolver) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Promise<boolean> {
        var promise = new Promise<boolean>((r, reject) => {
            paramsDecryption(route);
            let resolve = this.resolveRoute(r, route)
            authorize(this.injector, route, authResolver(this.injector, middleware(this.injector,route,resolve)), resolve)
        })
        return promise;
    }

    resolveRoute(resolve, route: ActivatedRouteSnapshot) {
        return (value: boolean) => {
            if (value) 
                componentInstanceProvider.setComponentRoute(route, this.injector.get(Router));
            resolve(value);
        }
    }
}
