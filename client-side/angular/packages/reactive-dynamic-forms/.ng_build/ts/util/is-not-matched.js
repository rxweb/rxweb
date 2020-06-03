/**
 * @param {?} jsonObject
 * @param {?} compareObject
 * @return {?}
 */
export function isNotMatched(jsonObject, compareObject) {
    let /** @type {?} */ isModified = false;
    for (var /** @type {?} */ columnName in compareObject) {
        if (Array.isArray(jsonObject[columnName])) {
            for (var /** @type {?} */ i = 0; i < jsonObject[columnName].length; i++) {
                isModified = isNotMatched(jsonObject[columnName][i], compareObject[columnName][i]);
            }
        }
        else if (typeof jsonObject[columnName] == "object")
            isModified = isNotMatched(jsonObject[columnName], compareObject[columnName]);
        else
            isModified = !(jsonObject[columnName] == compareObject[columnName]);
        if (isModified)
            break;
    }
    return isModified;
}
//# sourceMappingURL=is-not-matched.js.map