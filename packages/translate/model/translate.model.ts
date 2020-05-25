import { isObject } from "../functions/is-object";
import { extract } from "../functions/extract";
import { getValue } from "../functions/get-value";
import { translateConfigContainer } from "../core/translate-config-container";
import { equals } from "../functions/equals";

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
                        return translateConfigContainer.loading ? "loading..." : this.transform(data, key, text)
                    },
                    enumerable: true,
                    configurable: true
                })
            })
    }

    private getKeyValue(keyParamObject: any) {
        let keyValue = {};
        Object.keys(keyParamObject).forEach(key => {
            keyValue[key] = getValue(key, this.componentData);
        })
        return keyValue;
    }

    private transform(data, key, text) {
        if (this.keyParameters && this.keyParameters[key] && isObject(this.keyParameters[key])) {
            if (!equals(this.keyParameters[key], this.getKeyValue(this.keyParameters[key])))
                return this.getText(data,text, key);
            else if (this.memoized[key])
                return this.memoized[key];
        }
        if (this.keyParameters && !this.keyParameters[key])
            return this.getText(data,text, key);
        else
            return typeof text === "function" ? text():text;
    }

    private activeLanguage: any;

    private keyParameters: { [key: string]: any } = {};

    private memoized: { [key: string]: string } = {};

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

    private ngxTranslateParser(translations: any, key: string) {
        return translateConfigContainer.ngxTranslate["getParsedResult"](translations, key, null);
    }

    private getText(translations: any, text: string, columnKey: string) {
        text = translateConfigContainer.ngxTranslate ? this.ngxTranslateParser(translations, columnKey) : text;
        if (text.indexOf('this.') !== -1) {
            var func = new Function("x", "return " + text);
            text = func.call(this.componentData);
        }
        if (text && text.indexOf("{{") != -1) {
            let stringExtractor = extract(['{{', '}}']);
            let keys = stringExtractor(text);
            keys.forEach(key => {
                if (!this.keyParameters[columnKey])
                    this.keyParameters[columnKey] = {};
                let value = this.keyParameters[columnKey][key] = getValue(key, this.componentData);
                text = text.replace(`{{${key}}}`, value);
            })
            this.memoized[columnKey] = text;
        } else
            this.keyParameters[columnKey] = true;
        return text;
    }
}
