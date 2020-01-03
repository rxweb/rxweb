import { Injector } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { routeContainer } from "../core/route-container";
import { IMiddleware } from "../interfaces/i-middleware";

export function middleware(injector: Injector, route: ActivatedRouteSnapshot, complete: Function) {
    return (user) => {
        var middlewareModels = routeContainer.get().middlewares;
        var modelMiddleware = routeContainer.getModelDecorator(route.component as Function, "middleware");
        if (modelMiddleware) 
            middlewareModels = middlewareModels ? [...middlewareModels as Function[], ...modelMiddleware.functions] : [...modelMiddleware.functions];
        if (middlewareModels)
            callFunction(user, injector, route,complete, middlewareModels);
        else
            complete(true);
    }
}

function callFunction(user: { [key: string]: any }, injector: Injector, route: ActivatedRouteSnapshot,  complete: Function, middlewareModels: any, count?: number) {
    count = count == undefined ? 0 : count + 1;
    var middleware = injector.get(middlewareModels[count]) as IMiddleware;
    if (middleware) {
        var result = middleware.invoke(user, route)
        if (result instanceof Promise) {
            result.then(t => {
                if (t) {
                    if (middlewareModels.length > (count + 1))
                        callFunction(user, injector, route,complete, middlewareModels, count)
                    else
                        complete(t);
                } else
                    complete(t);
            })
        } else
            if (result && middlewareModels.length > (count + 1))
                callFunction(user, injector, route,complete, middlewareModels, count)
            else (result)
                complete(result)
    } else
        complete(true);
}
