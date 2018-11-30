import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";
import { RegexValidator } from "../util/regex-validator";
import { MessageConfig } from "../models/config/message-config";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function lowercaseValidator(config:MessageConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
          if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                if (!(control.value === control.value.toLowerCase()))
                    return ObjectMaker.toJson(AnnotationTypes.lowerCase, config.message || null, [control.value])
            }
        }
        return ObjectMaker.null();
    }
}
