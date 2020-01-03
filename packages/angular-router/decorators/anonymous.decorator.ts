import { routeContainer } from "../core"

export function anonymous() {
    return function (
        target: any
    ) {
        routeContainer.addModelDecorator(target, null,"anonymous")
    }
}
