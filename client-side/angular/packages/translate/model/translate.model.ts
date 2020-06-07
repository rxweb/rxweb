import { isObject } from "../functions/is-object";
import { extract } from "../functions/extract";
import { getValue } from "../functions/get-value";
import { translateConfigContainer } from "../core/translate-config-container";
import { equals } from "../functions/equals";
import { MultiLingualData } from "../core/multilingual-data";
import { getKeyName } from "../functions/get-key-name";
import { runPipe } from "../functions/pipe.transformer";

export class TranslateModel {
    constructor(public raw: { [key: string]: any }, private componentData: any, private modelName, private parentData) {
        let data = raw;
        if (data)
            Object.keys(data).forEach(key => {
                Object.defineProperty(this, key, {
                    get: function () {
                        let text = data[key];
                        if (isObject(text)) {
                            if (!(data[key] instanceof TranslateModel)) {
                                let pData = Object.keys(parentData).length == 0 ? data : parentData;
                                if (!translateConfigContainer.loading)
                                    text = data[key] = new TranslateModel(data[key], componentData, modelName, pData);
                                else
                                    return new TranslateModel(data[key], {}, modelName, pData);
                            } else
                                text = data[key];
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
        if (this.thisParameter[key])
            return this.getText(data, text, key);
        if (this.keyParameters && this.keyParameters[key] && isObject(this.keyParameters[key])) {
            if (!equals(this.keyParameters[key], this.getKeyValue(this.keyParameters[key])))
                return this.getText(data, text, key);
            else if (this.memoized[key])
                return this.memoized[key];
        }
        if (this.keyParameters && !this.keyParameters[key])
            return this.getText(data, text, key);
        else
            return typeof text === "function" ? text() : text;
    }

    private activeLanguage: any;

    private keyParameters: { [key: string]: any } = {};

    private memoized: { [key: string]: string } = {};

    private thisParameter: { [key: string]: boolean } = {};

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

    addOrUpdateKey(name: string, value: string | { [key: string]: any }) {
        let keyName = getKeyName(this.modelName, this.languageCode, undefined);
        let data = MultiLingualData.get(keyName);
        if (!isObject(value))
            data[name] = value;
        else if (data[name])
            data[name] = { ...data[name], ...<{ [key: string]: any }>value };
        else
            data[name] = value;
        MultiLingualData.addOrUpdate(keyName, data, this.languageCode);
        MultiLingualData.removeComponentPropValue(keyName, this.componentData.constructor);
    }

    private ngxTranslateParser(translations: any, key: string) {
        return translateConfigContainer.ngxTranslate["getParsedResult"](translations, key, null);
    }

    private getText(translations: any, text: string, columnKey: string) {
        text = translateConfigContainer.ngxTranslate ? this.ngxTranslateParser(translations, columnKey) : text;
        if (text.indexOf('this.') !== -1 || text.indexOf('{{{this') !== -1) {
            this.thisParameter[columnKey] = true;
            if (text.indexOf('{{{this') !== -1) {
                let stringExtractor = extract(['{{{', '}}}']);
                let keys = stringExtractor(text)
                keys.forEach(t => {
                    var func = new Function("x", "return " + t);
                    let calculatedText = func.call(this.componentData);
                    text = text.replace(`{{{${t}}}}`, calculatedText);
                })
            } else {
                var func = new Function("x", "return " + text);
                text = func.call(this.componentData);
            }
            
        }
        if (text && text.indexOf("{{") != -1) {
            let stringExtractor = extract(['{{', '}}']);
            let keys = stringExtractor(text);
            keys.forEach(key => {
                let value = runPipe(key, this.componentData, this.parentData);
                if (key == value) {
                    value = getValue(key, this.parentData);
                    if (!value)
                        value = getValue(key, this.componentData)
                }
                if (!this.keyParameters[columnKey])
                    this.keyParameters[columnKey] = {};
                this.keyParameters[columnKey][key] = value;
                text = text.replace(`{{${key}}}`, value);
            })
            this.memoized[columnKey] = text;
        } else
            this.keyParameters[columnKey] = true;
        return text;
    }
}
