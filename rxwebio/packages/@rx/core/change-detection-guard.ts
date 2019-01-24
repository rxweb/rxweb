import {ActivatedRouteSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";

export interface ChangeDetectionGuard {
    canDeactivate: (component: any,
        route: ActivatedRouteSnapshot
    ) => boolean | Observable<boolean> | Promise<boolean>;
}
