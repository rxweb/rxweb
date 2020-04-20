import { isObject } from "../functions/is-object";
import { extract } from "../functions/extract";
import { getValue } from "../functions/get-value";
import { translateConfigContainer } from "../core/translate-config-container";

export class TranslateModel {
    constructor(private data: { [key: string]: any }, private componentData: any) {
        if (data)
            Object.keys(data).forEach(key => {
                Object.defineProperty(this, key, {
                    get: function () {
                        let text = data[key];
                        if (isObject(text)) {
                            if (!translateConfigContainer.loading)
                                text = data[key] = new TranslateModel(data[key], componentData);
                            else
                                return new TranslateModel(data[key], {});
                            return text;
                        }
                        return translateConfigContainer.loading ? "loading..." : this.getText(text);
                    },
                    enumerable: true,
                    configurable: true
                })
            })
    }

    get languageCode() {
        return translateConfigContainer.config ? translateConfigContainer.config.languageCode : "en";
    }


    get(key: string) {
        let jObject;
        if (key) {
            var keys = key.split(".");
            
            for (let column of keys) {
                if (!jObject)
                    jObject = this[column];
                else
                    jObject = jObject[column]
            }
        }
        return jObject;
    }

    private getText(text: string) {
        if (text.indexOf('this.') !== -1) {
            var func = new Function("x", "return "+ text);
            text = func.call(this.componentData);
        }
        if (text && text.indexOf("{{") != -1) {
            let stringExtractor = extract(['{{', '}}']);
            let keys = stringExtractor(text);
            keys.forEach(key => {
                text = text.replace(`{{${key}}}`, getValue(key, this.componentData));
            })
        }
        return text;
    }
}
