import { getValue } from "./get-value";

export function getInstanceValue(key: string, componentData: any, parentData: any) {
    let value = "";
    if (key.indexOf("'") != 0) {
        value = getValue(key, parentData);
        if (!value)
            value = getValue(key, componentData)
    }
    return value == "" ? key.replace(new RegExp(/[']/, "g"), "") : value;
}