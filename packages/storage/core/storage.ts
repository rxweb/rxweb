import { encoder } from "../functions/encoder";

export class Storage {
    private storage: any;
    constructor(name: string) {
        this.storage = window[name];
    }
    save(keyName: string, value: any): void {
        var local = {};
        local[keyName] = encoder(value,true);
        value = JSON.stringify(local);
        this.storage.setItem(keyName, value);
    }

    get(keyName: string): any {
        var jsonData = this.storage.getItem(keyName);
        if (jsonData) {
            jsonData = JSON.parse(jsonData);
            return encoder(jsonData[keyName],false);
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