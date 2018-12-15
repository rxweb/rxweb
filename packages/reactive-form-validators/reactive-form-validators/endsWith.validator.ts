import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { DefaultConfig } from "../models/config/default-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function endsWithValidator(config: DefaultConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
       if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                var endString = String(control.value).substr(control.value.length - config.value.length,config.value.length);
                if (endString != config.value)
                    return ObjectMaker.toJson(AnnotationTypes.endsWith, config.message || null, [control.value,config.value]);
            }
        } return ObjectMaker.null();
    }
}
