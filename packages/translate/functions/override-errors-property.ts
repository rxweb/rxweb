import { AbstractControl } from "@angular/forms"
import { getKeyName } from "./get-key-name";
import { MultiLingualData } from "../core/multilingual-data";
import { getValue } from "./get-value";
import { ErrorMessageConfig } from "../interface/error-message-config";
export function overrideErrorsProperty(errorMessageConfig: ErrorMessageConfig) {
    Object.defineProperty(AbstractControl.prototype, "errors", {
        get: function () { return this.originalErrors; },
        set: function (v) {
            this.originalErrors = v;
            let keyName = getKeyName("global");
            let data = MultiLingualData.get(keyName);
            data = getValue(errorMessageConfig.path, data);
            if (v) {
                Object.keys(v).forEach(key => {
                    if (v[key]) {
                        let message = '';
                        if (data[key])
                            message = data[key];
                        if (message && errorMessageConfig.parametersPropName && v[key][errorMessageConfig.parametersPropName]) {
                            let values = v[key][errorMessageConfig.parametersPropName];
                            values.forEach((t, index) => {
                                message = message.replace(`{{${index}}}`, t);
                            });
                        }
                        this.originalErrors[key]["message"] = message; 
                    }
                })
            }
        },
        enumerable: true,
        configurable: true
    });

}