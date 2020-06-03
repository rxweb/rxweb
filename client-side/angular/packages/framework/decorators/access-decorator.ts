import { AuthorizeConfig } from "../interface/config/authorize-config";
import { frameworkContainer } from "../core/frameworkContainer";
export function access(config: AuthorizeConfig) {
    return function (
        target: Object
    ) {
        frameworkContainer.addDecorator(target, "authorize",config)
    } 
}

