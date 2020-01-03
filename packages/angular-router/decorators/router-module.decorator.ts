import { RouterModuleConfig } from "../interfaces/router-module-config";
import { routeContainer } from '../core/route-container'
export function routerModule(routerConfig: RouterModuleConfig) {
    return function (
        target: any
    ) {
        routeContainer.add(routerConfig);
    }
}
