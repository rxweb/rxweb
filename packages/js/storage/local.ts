export class Local {
    save(keyName: string, value: any): void {
        var local = {};
        local[keyName] = value;
        value = JSON.stringify(local);
        window.localStorage.setItem(keyName, value);
    }

    get(keyName: string): any {
        var jsonData = window.localStorage.getItem(keyName);
        if (jsonData) {
            jsonData = JSON.parse(jsonData);
            return jsonData[keyName];
        }
        return undefined;
    }

    clearAll() {
        window.localStorage.clear();
    }

    remove(keyName: string): void {
        window.localStorage.removeItem(keyName);
    }
}