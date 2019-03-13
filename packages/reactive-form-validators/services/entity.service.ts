
export function clone(jsonObject: { [key: string]: any }) {
        let jObject: any = {};
        for (var columnName in jsonObject) {
            if (Array.isArray(jsonObject[columnName])) {
                jObject[columnName] = [];
                for (let row of jsonObject[columnName]) {
                    jObject[columnName].push(this.clone(row))
                }
            } else if (typeof jsonObject[columnName] == "object")
                jObject[columnName] = this.clone(jsonObject[columnName]);
            else
                jObject[columnName] = jsonObject[columnName]
        }
        return jObject;
    }

export function merge(firstObject: { [key: string]: any }, secondObject: { [key: string]: any }) {
        for (var columnName in secondObject) {
            if (Array.isArray(secondObject[columnName])) {
                if (!firstObject[columnName])
                    firstObject[columnName] = [];
                for (let row of secondObject[columnName])
                    firstObject[columnName].push(this.clone(row))
            } else if (typeof firstObject[columnName] == "object")
                firstObject[columnName] = this.merge(firstObject[columnName], secondObject[columnName])
            else
                firstObject[columnName] = secondObject[columnName];
        }
        return firstObject;
    }
