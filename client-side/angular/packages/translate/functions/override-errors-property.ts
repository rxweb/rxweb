import { AbstractControl } from "@angular/forms"
import { getKeyName } from "./get-key-name";
import { MultiLingualData } from "../core/multilingual-data";
import { getValue } from "./get-value";
import { ErrorMessageConfig } from "../interface/error-message-config";
import { translateConfigContainer } from "../core/translate-config-container";
import { isObject } from "./is-object";
import { runPipe } from "./pipe.transformer";
import { extract } from "./extract";
const NOT_IN: string[] = ["min", "max"];

export function overrideErrorsProperty(errorMessageConfig: ErrorMessageConfig) {
    let language = translateConfigContainer.config.languageCode;
    Object.defineProperty(AbstractControl.prototype, "errors", {
        get: function () {
            if (this.originalErrors && this.originalErrors.languageCode != translateConfigContainer.config.languageCode) {
                this.cloneErrors = getTranslatedErrorMessages(errorMessageConfig, Object.assign({}, this.originalErrors), this.value);
            }
            return this.cloneErrors;
        },
        set: function (v) {
            this.originalErrors = v;
            this.cloneErrors = v;
            if (v && isObject(v))
                this.cloneErrors = getTranslatedErrorMessages(errorMessageConfig, { ...v },this.value);
        },
        enumerable: true,
        configurable: true
    });

}

function getTranslatedErrorMessages(errorMessageConfig: ErrorMessageConfig, errors: any,value:any) {
    let keyName = getKeyName("global");
    let data = MultiLingualData.get(keyName);
    if (data) {
        data = errorMessageConfig.path == "" ? data : getValue(errorMessageConfig.path, data);
        if (errors && isObject(errors)) {
            Object.keys(errors).forEach(key => {
                if (errors[key]) {
                    let message = '';
                    if (data[key])
                        message = getMessage(data,key);
                    if (message) {

                        Object.keys(errors[key]).forEach(t => {
                            if (Array.isArray(errors[key][t])) {
                                errors[key][t].forEach((x, i) => {
                                    message = message.replace(`{{${i}}}`, errors[key][t][i]);
                                });
                            } else
                                message = message.replace(`{{${t}}}`, errors[key][t]);
                        })
                        value = value ? value : '';
                        message = message.replace(`{{value}}`, value);
                    }
                    if (!isObject(errors[key]))
                        errors[key] = {};
                    errors[key]["message"] = message;

                }
            });
            errors["languageCode"] = translateConfigContainer.config.languageCode;
        }
    }
    return errors;
}

function getMessage(data, key) {
    let text = data[key];
    if (text.indexOf('{{') !== -1) {
        let stringExtractor = extract(['{{', '}}']);
        let keys = stringExtractor(text);
        keys.forEach(key => {
            let value = runPipe(key, data, data);
            if (key == value && NOT_IN.indexOf(key) == -1) {
                value = getValue(key, data);
                if (value) {
                    text = text.replace(`{{${key}}}`, value);
                }
            }
        })
    }
    return text;
}