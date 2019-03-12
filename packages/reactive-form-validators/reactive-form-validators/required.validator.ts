import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { RequiredConfig } from "../models/config/required-config";
import { FormProvider } from '../util/form-provider';
import {getConfigObject} from "../util/config-provider";
export function requiredValidator(config: RequiredConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    config = getConfigObject(config,control);
    if (FormProvider.ProcessRule(control, config)) {
      if (!RegexValidator.isNotBlank(control.value)) {
        return ObjectMaker.toJson(AnnotationTypes.required, config, [])
      }
    }
    return ObjectMaker.null();
  }
}
