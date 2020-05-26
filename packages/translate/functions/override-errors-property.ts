import { AbstractControl } from "@angular/forms"
import { getKeyName } from "./get-key-name";
import { MultiLingualData } from "../core/multilingual-data";
import { getValue } from "./get-value";
import { ErrorMessageConfig } from "../interface/error-message-config";
import { translateConfigContainer } from "../core/translate-config-container";
import { isObject } from "./is-object";
export function overrideErrorsProperty(errorMessageConfig: ErrorMessageConfig) {
    let language = translateConfigContainer.config.languageCode;
    Object.defineProperty(AbstractControl.prototype, "errors", {
        get: function () {
            if (this.originalErrors && this.originalErrors.languageCode != translateConfigContainer.config.languageCode) {
                this.cloneErrors = getTranslatedErrorMessages(errorMessageConfig, Object.assign({}, this.originalErrors));
            }
            return this.cloneErrors;
        },
        set: function (v) {
            this.originalErrors = v;
            this.cloneErrors = v;
            if (v && isObject(v))
                this.cloneErrors = getTranslatedErrorMessages(errorMessageConfig, { ...v });
        },
        enumerable: true,
        configurable: true
    });

}

function getTranslatedErrorMessages(errorMessageConfig: ErrorMessageConfig,errors:any) {
    let keyName = getKeyName("global");
    let data = MultiLingualData.get(keyName);
    if (data) {
        data = getValue(errorMessageConfig.path, data);
        if (errors && isObject(errors)) {
            Object.keys(errors).forEach(key => {
                if (errors[key]) {
                    let message = '';
                    if (data[key])
                        message = data[key];
                    if (message) {
                        if (errorMessageConfig.parametersPropName && errors[key][errorMessageConfig.parametersPropName]) {
                            let values = errors[key][errorMessageConfig.parametersPropName];
                            values.forEach((t, index) => {
                                message = message.replace(`{{${index}}}`, t);
                            });
                        }
                        Object.keys(errors[key]).forEach(t => {
                            message = message.replace(`{{${t}}}`, errors[key][t]);
                        })
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