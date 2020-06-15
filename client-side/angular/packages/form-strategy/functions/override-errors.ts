import { getValue } from "./get-value";
import { isObject } from "./is-object";
import { runPipe } from "./pipe.transformer";
import { extract } from "./extract";
import { FormErrorMessageModuleConfig } from "../interface/form-error-message-module-config";
import { checkErrorMessageStrategy } from "./error-message-binding-strategy";
import { FormControl } from "../interface/form-control";
const NOT_IN: string[] = ["min", "max"];

export function getTranslatedErrorMessages(formControl:FormControl,errorMessageConfig: FormErrorMessageModuleConfig, errors: any) {
    if (errorMessageConfig.data) {
        let data = errorMessageConfig.messagePath != "" ? getValue(errorMessageConfig.messagePath, errorMessageConfig.data) : errorMessageConfig.data;
        if (data) {
            let isBind = checkErrorMessageStrategy(formControl, errorMessageConfig);
            let expressionResult = formControl.strategy ? formControl.strategy.conditional.allowMessageBinding() : true;
            if (isBind && expressionResult) {
                if (errors && isObject(errors)) {
                    Object.keys(errors).forEach(key => {
                        if (!isObject(errors[key]))
                            errors[key] = {};
                        if (errors[key] && isBind) {
                            let message = '';
                            if (data[key])
                                message = getMessage(data, key);
                            if (message) {
                                Object.keys(errors[key]).forEach(t => {
                                    if (Array.isArray(errors[key][t])) {
                                        errors[key][t].forEach((x, i) => {
                                            message = message.replace(`{{${i}}}`, errors[key][t][i]);
                                        });
                                    } else
                                        message = message.replace(`{{${t}}}`, errors[key][t]);
                                })
                                let value = formControl.value ? formControl.value : '';
                                message = message.replace(`{{value}}`, value);
                            }
                            errors[key]["message"] = message;
                        } else
                            errors[key]["message"] = "";
                    });
                    errors["languageCode"] = errorMessageConfig.language;
                }
            } else
                return undefined;
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
            let value = runPipe(key, data);
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