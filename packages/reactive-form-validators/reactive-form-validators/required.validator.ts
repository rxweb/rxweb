import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";
import { RegexValidator } from "../util/regex-validator";
import { MessageConfig } from "../models/config/message-config";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { RequiredConfig } from "../models/config/required-config";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function requiredValidator(config: RequiredConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
          if (FormProvider.ProcessRule(control,config)) {
            if (!RegexValidator.isNotBlank(control.value)) {
                return ObjectMaker.toJson(AnnotationTypes.required, config.message || null, [])
            }
        }
        return ObjectMaker.null();
    }
}
