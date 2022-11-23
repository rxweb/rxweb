import { encoder } from "../functions/encoder";

export class Storage {
    private storage: any;
    constructor(name: string) {
        this.storage = window[name];
    }
    save(keyName: string, value: any,isEncryption:boolean = true): void {
        var local = {};
        local[keyName] = isEncryption ? encoder(value, true) : value;
        value = JSON.stringify(local);
        this.storage.setItem(keyName, value);
    }

    get(keyName: string, isEncrypted: boolean = true): any {
        var jsonData = this.storage.getItem(keyName);
        if (jsonData) {
            jsonData = JSON.parse(jsonData);
            return isEncrypted ? encoder(jsonData[keyName], false) : jsonData[keyName];
        }
        return undefined;
    }

    clearAll() {
        this.storage.clear();
    }

    remove(keyName: string): void {
        this.storage.removeItem(keyName);
    }
}