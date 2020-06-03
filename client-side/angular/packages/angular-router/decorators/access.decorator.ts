import { routeContainer } from "../core"
import { AuthorizeConfig } from "../interfaces/authorize-config"

export function access(authorizeConfig: AuthorizeConfig) {
    return function (
        target: any
    ) {
        routeContainer.addModelDecorator(target, authorizeConfig,"access")
    }
}
