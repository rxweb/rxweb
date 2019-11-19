import { baseDecoratorFunction } from "./base-decorator.function"
import { AuthorizeConfig } from "../interface/config/authorize-config";
import { frameworkContainer } from "../core/frameworkContainer";
export function authorize(config: AuthorizeConfig) {
    return function (
        target: Object
    ) {
        frameworkContainer.addDecorator(target, "authorize",config)
    } 
}

