import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"

@Injectable()
export class BaseCanDeactivate implements CanDeactivate<any> {
    constructor() { }

    canDeactivate(
        component: any,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): boolean {
        return (component.canDeactivate) ? component.canDeactivate(currentRoute, currentState, nextState) : true;
    }
}
