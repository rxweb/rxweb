import { Injectable } from "@angular/core";
import { http, RxHttp } from "@rxweb/http";

@http({
    path: "api/Users"
})
@Injectable({
    providedIn: 'root'
})
export class UserService extends RxHttp {
    constructor() {
        super();
    }

    addUser(user?: any) {
        return this.post({body: user });
    }

}