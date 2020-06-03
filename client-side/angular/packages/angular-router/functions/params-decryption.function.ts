import { ActivatedRouteSnapshot } from "@angular/router";
import { routeContainer } from "../core/route-container";
import { encoder } from "../core/encoder";

export function paramsDecryption(route: ActivatedRouteSnapshot) {
    var isEncryption = routeContainer.get().urlEncryption;
    if (isEncryption) {
        var params = {};
        Object.keys(route.params).forEach(t => {
            let value = encoder.decode(route.params[t]);
            Object.defineProperty(params, t, {
                get: function () { return value; },
            }); 
        })
        delete route.params;
        route.params = Object.preventExtensions(params);
    }
}
