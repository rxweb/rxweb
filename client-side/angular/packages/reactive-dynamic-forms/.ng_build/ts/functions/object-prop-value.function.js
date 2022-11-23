/**
 * @param {?} key
 * @param {?} valueObject
 * @return {?}
 */
export function objectPropValue(key, valueObject) {
    let /** @type {?} */ jObject = undefined;
    let /** @type {?} */ splitTexts = key.split('.');
    for (var /** @type {?} */ column of splitTexts) {
        if (!jObject)
            jObject = valueObject;
        if (jObject)
            jObject = jObject[column];
        else
            break;
    }
    return jObject;
}
/**
 * @param {?} key
 * @param {?} value
 * @param {?} valueObject
 * @return {?}
 */
export function setObjectPropValue(key, value, valueObject) {
    let /** @type {?} */ jObject = valueObject;
    let /** @type {?} */ splitTexts = key.split('.');
    for (var /** @type {?} */ i = 0; i < splitTexts.length - 1; i++) {
        if (jObject)
            jObject = jObject[splitTexts[i]];
    }
    jObject[splitTexts[splitTexts.length - 1]] = value;
}
//# sourceMappingURL=object-prop-value.function.js.map