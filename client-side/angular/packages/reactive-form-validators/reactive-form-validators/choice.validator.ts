import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { ChoiceConfig } from "../models/config/choice-config";
import { getConfigObject } from "../util/config-provider";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
export function choiceValidator(configModel: ChoiceConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let config = getConfigObject(configModel, control);
        if (FormProvider.ProcessRule(control, config)) {
            if (control.value instanceof Array) {
                config.minLength = (config.minLength == undefined) ? 0 : config.minLength;
                config.maxLength = (config.maxLength == undefined) ? 0 : config.maxLength;
                if ((((control.value.length) < config.minLength) || (config.maxLength !== 0 && control.value.length > config.maxLength)))
                    return ObjectMaker.toJson(AnnotationTypes.choice, config, [control.value]);
            }
        } return ObjectMaker.null();
    }
}
