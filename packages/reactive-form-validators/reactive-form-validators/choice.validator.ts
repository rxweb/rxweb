import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { ChoiceConfig } from "../models/config/choice-config";
import { ApplicationUtil } from "../util/app-util";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
export function choiceValidator(config: ChoiceConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        if (FormProvider.ProcessRule(control,config)) {
            config.minLength = (config.minLength == undefined) ? 0: config.minLength;
            config.maxLength = (config.maxLength == undefined) ? 0: config.maxLength;
            if (control.value instanceof Array) {
                if (!((config.minLength <= control.value.length && config.maxLength == 0) || (config.maxLength >= control.value.length)))
                    return ObjectMaker.toJson(AnnotationTypes.choice, config.message || null, [control.value]);
            }
        } return ObjectMaker.null();
    }
}
