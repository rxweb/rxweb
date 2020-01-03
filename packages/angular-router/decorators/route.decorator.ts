import { Route } from "@angular/router"
import { RouteProvider } from "../core/route-provider";
export function route(route: Route) {
    return function (
        target: any
    ) {
        route.component = target;
        RouteProvider.addRoute(route);
    }
}
