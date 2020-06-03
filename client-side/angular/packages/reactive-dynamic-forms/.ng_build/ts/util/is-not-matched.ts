export function isNotMatched(jsonObject: { [key: string]: any }, compareObject: { [key: string]: any }) {
    let isModified: boolean = false;
    for (var columnName in compareObject) {
            if (Array.isArray(jsonObject[columnName])) {
                for (var i = 0; i < jsonObject[columnName].length; i++) {
                    isModified = isNotMatched(jsonObject[columnName][i], compareObject[columnName][i])
                }
            } else if (typeof jsonObject[columnName] == "object")
                isModified = isNotMatched(jsonObject[columnName], compareObject[columnName]);
            else
                isModified = !(jsonObject[columnName] == compareObject[columnName]);
            if (isModified)
                break;
    }
        return isModified;
}