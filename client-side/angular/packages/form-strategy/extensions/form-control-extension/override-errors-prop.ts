import { FormErrorMessageModuleConfig } from "../../interface/form-error-message-module-config";
import { getTranslatedErrorMessages } from "../../functions/override-errors";
import { isObject } from '../../functions/is-object'
import { setControlErrorMessages } from "../../functions/set-control-error-messages";

export function overrideErrorsProp(errorMessageConfig: FormErrorMessageModuleConfig) {
    return {
        get: function () {
            if (this.originalErrors && this.originalErrors.languageCode != errorMessageConfig.language) {
                this.cloneErrors = getTranslatedErrorMessages.call(this,this,errorMessageConfig, Object.assign({}, this.originalErrors));
            }
            return this.cloneErrors;
        },
        set: function (v) {
            this.originalErrors = v;
            this.cloneErrors = v;
            if (v && isObject(v))
                this.cloneErrors = getTranslatedErrorMessages.call(this,this,errorMessageConfig, { ...v });
            setControlErrorMessages.call(this)
        },
        enumerable: true,
        configurable: true
    }
}