import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";
import { RegExRule } from "../util/regex-rules";
import { RegexValidator } from "../util/regex-validator";
import { EmailConfig } from "../models/config/email-config";
import { ObjectMaker } from "../util/index";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function emailValidator(config:EmailConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
       if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                if (!RegexValidator.isValid(control.value, RegExRule.basicEmail ))
                    return ObjectMaker.toJson(AnnotationTypes.email, config.message || null, [control.value])
            }
        }
        return ObjectMaker.null();
    }
}
