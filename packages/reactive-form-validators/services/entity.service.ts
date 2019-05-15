
function isObjectType(value:any) {
    return !(typeof value == "string" || typeof value === "number" || typeof value === "boolean" || value instanceof Date);
}

export function clone(jsonObject: { [key: string]: any }) {
    let jObject: any = {};
    if (isObjectType(jsonObject)) {
        for (var columnName in jsonObject) {
            if (Array.isArray(jsonObject[columnName])) {
                jObject[columnName] = [];
                for (let row of jsonObject[columnName]) {
                    jObject[columnName].push(clone(row))
                }
            } else if (typeof jsonObject[columnName] == "object")
                jObject[columnName] = clone(jsonObject[columnName]);
            else
                jObject[columnName] = jsonObject[columnName]
        }
        return jObject;
    }
    else
        return jsonObject;
    }

export function merge(firstObject: { [key: string]: any }, secondObject: { [key: string]: any }) {
        for (var columnName in secondObject) {
            if (Array.isArray(secondObject[columnName])) {
                if (!firstObject[columnName])
                    firstObject[columnName] = [];
                for (let row of secondObject[columnName])
                    firstObject[columnName].push(clone(row))
            } else if (typeof firstObject[columnName] == "object")
                firstObject[columnName] = merge(firstObject[columnName], secondObject[columnName])
            else
                firstObject[columnName] = secondObject[columnName];
        }
        return firstObject;
}

export function isMatched(jsonObject: { [key: string]: any }, compareObject: { [key: string]: any }) {
    let isModified: boolean = false;
    for (var columnName in compareObject) {
            if (Array.isArray(jsonObject[columnName])) {
                for (var i = 0; i < jsonObject[columnName].length; i++) {
                    isModified = isMatched(jsonObject[columnName][i], compareObject[columnName][i])
                }
            } else if (typeof jsonObject[columnName] == "object")
                isModified = isMatched(jsonObject[columnName], compareObject[columnName]);
            else
                isModified = !(jsonObject[columnName] == compareObject[columnName]);
            if (isModified)
                break;
    }
        return isModified;
}
