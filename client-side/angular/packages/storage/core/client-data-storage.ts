import { Storage} from './storage'
export class ClientDataStorage {
    local: Storage;
    session: Storage;
    constructor() {
        this.local = new Storage("localStorage");
        this.session = new Storage("sessionStorage");
    }
}