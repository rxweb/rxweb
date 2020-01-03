import { routeContainer } from "../core"

export function preInit(resolvers: Function[]) {
    return function (
        target: any
    ) {
        routeContainer.addModelDecorator(target, resolvers,"preInit")
    }
}
