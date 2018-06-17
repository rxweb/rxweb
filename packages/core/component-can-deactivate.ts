import {Observable} from "rxjs/Rx";

export interface ComponentCanDeactivate {
    canDeactivate: () => boolean | Observable<boolean> | Promise<boolean>;
}
