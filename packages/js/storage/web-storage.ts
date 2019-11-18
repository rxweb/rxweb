import { Local } from './local'
import { Session } from './session'
export class ClientDataStorage {
    local: Local;
    session: Session;
    constructor() {
        this.local = new Local();
        this.session = new Session();
    }
}