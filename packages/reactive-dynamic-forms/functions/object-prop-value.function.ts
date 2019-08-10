export function objectPropValue(key: string, valueObject: { [key: string]: any }) {
    let jObject = undefined;
    let splitTexts = key.split('.');
    for (var column of splitTexts) {
        if (!jObject)
            jObject = valueObject;
        if (jObject)
            jObject = jObject[column];
        else
            break;
    }
    return jObject;
}

export function setObjectPropValue(key: string,value:any, valueObject: { [key: string]: any }) {
    let jObject = valueObject;
    let splitTexts = key.split('.');
    for (var i = 0; i < splitTexts.length - 1; i++) {
        if (jObject)
            jObject = jObject[splitTexts[i]];
    }
    jObject[splitTexts[splitTexts.length - 1]] = value;
}