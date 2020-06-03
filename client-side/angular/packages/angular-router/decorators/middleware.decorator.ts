import { routeContainer } from "../core"

export function middleware(middlewares: Function[]) {
    return function (
        target: any
    ) {
        routeContainer.addModelDecorator(target, middlewares,"middleware")
    }
}
