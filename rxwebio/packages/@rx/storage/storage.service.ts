import {Injectable } from "@angular/core";

import {Local } from "./local.domain"
import {Session } from "./session.domain"


@Injectable()
export class RxStorage {
    local: Local;
    session: Session;
    constructor() {
        this.local = new Local();
        this.session = new Session();
    }
}



