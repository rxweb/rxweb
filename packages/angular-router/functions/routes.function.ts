import { Routes } from "@angular/router";
import { routePath } from "./route-path.function";

export function routes(routes: Routes) : Routes {
    let _routes: Routes = [];
    routes.forEach(t => {
        if (t.path)
            t.path = routePath(t.path)
        if (t.redirectTo)
            t.redirectTo = routePath(t.redirectTo)
        _routes.push(t)
    })
    return _routes;
}
