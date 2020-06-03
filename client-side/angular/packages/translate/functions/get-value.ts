export function getValue(key,data) {
        let isObjectKey = key.indexOf(".") !== -1;
        if (isObjectKey) {
            let keys = key.split('.');
            let jObject = data;
            for (let column of keys) {
                if (jObject[column])
                    jObject = jObject[column]
                else {
                    jObject = "";
                    break;
                }
            }
            return jObject;
        }
        let value = data[key];
        return value == undefined ? '' : value;
    }