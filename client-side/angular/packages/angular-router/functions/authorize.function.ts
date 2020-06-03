import { Injector } from "@angular/core";
import { routeContainer } from "../core/route-container";
import { AUTHORIZATION } from "../const/app-const";
import { ActivatedRouteSnapshot } from "@angular/router";
import { IAuthorize } from "../interfaces/i-authorize";
import { componentInstanceProvider } from "../core/component-instance-provider";

export function authorize(injector: Injector, route: ActivatedRouteSnapshot, next: Function, complete: Function) {
        let component = routeContainer.getModelDecorator(route.component as Function, "access");
        let anonymous = routeContainer.getModelDecorator(route.component as Function, "anonymous");
        //if (!component && !anonymous)
        //    throw `Define anyone (@anonymous() or @access({...})) decorator on the route component `;
        if (component) {
            var authorizeModel = routeContainer.get().authorization;
            if (authorizeModel) {
                var authorize = injector.get(authorizeModel) as IAuthorize;
                var result = authorize.authorize(component.functions,route);
                if (result instanceof Promise) {
                    result.then(t => {
                        if (t)
                            componentInstanceProvider.setAuthroizeConfig(component.functions),next(anonymous);
                        else
                            complete(false)
                    })
                } else if (result === true)
                    componentInstanceProvider.setAuthroizeConfig(component.functions),next(anonymous)
                else
                    complete(result)

            } else
                next(anonymous);
        } else
            next(anonymous);
}
