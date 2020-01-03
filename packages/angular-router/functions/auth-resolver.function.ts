import { Injector } from "@angular/core";
import { routeContainer } from "../core/route-container";
import { IAuthResolver } from "../interfaces/i-auth-resolver";

export function authResolver(injector: Injector, next: Function) {
    return (anonymous) => {
        if (!anonymous) {
            var authResolverModel = routeContainer.get().authentication;
            if (authResolverModel) {
                var authResolver = injector.get(authResolverModel) as IAuthResolver;
                var result = authResolver.resolveAuth();
                if (result instanceof Promise) {
                    result.then(t => {
                        routeContainer.setUser(t);
                        next(t);
                    })
                } else {
                    routeContainer.setUser(result);
                    next(result);
                }
            } else
                next(result);
        } else
            next(result);
    }
}
