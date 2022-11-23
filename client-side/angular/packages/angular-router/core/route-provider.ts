import {  Routes, Route } from "@angular/router";
import { routeContainer } from "./route-container";
import { BaseCanActivate } from "../guard/base-can-activate.guard";
import { BaseCanDeactivate } from "../guard/base-can-deactivate.guard";
import { routePath } from "../functions/route-path.function";

export class RouteProvider {
    static routes: Routes = [];

    private static _routes: Routes = [];

    static addRoute(route: Route) {
        this.addCanActivate(route);
        this.addCanDeactivate(route);
        this._routes.push(route)
    }


    static applyRootRoutes(_routes?:Routes) {
        this.routes = [];
        var routes = _routes || [...this._routes];
        var isAllowEncryption = routeContainer.get().urlEncryption;
        if (isAllowEncryption) {
            routes.forEach(route => {
                route.path = routePath(route.path);
            })
        }
        this._routes = [];
        this.routes = routes;
    }



    private static addCanActivate(route: Route) {
        if (!route.canActivate)
            route.canActivate = [BaseCanActivate];
        else
            route.canActivate.push(BaseCanActivate);
    }

    private static addCanDeactivate(route: Route) {
        if (!route.canDeactivate)
            route.canDeactivate = [BaseCanDeactivate];
        else
            route.canDeactivate.push(BaseCanDeactivate);
    }

}
