import {Injectable } from "@angular/core";

@Injectable()
export class Session {
    save(keyName: string, value: any): void {
        var session = {};
        session[keyName] = value;
        value = JSON.stringify(session);
        window.sessionStorage.setItem(keyName, value);
    }

    get(keyName: string): any {
        var jsonData = window.sessionStorage.getItem(keyName);
        if (jsonData !== undefined && jsonData !== null) {
            jsonData = JSON.parse(jsonData);
            return jsonData[keyName];
        }
        return undefined;
    }

    clearAll() {
        window.sessionStorage.clear();
    }

    remove(keyName: string): void {
        window.sessionStorage.removeItem(keyName);
    }
}