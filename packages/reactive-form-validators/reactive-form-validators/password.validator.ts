import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { RegexValidator } from "../util/regex-validator";
import { PasswordConfig } from "../models/config/password-config";
import {getConfigObject} from "../util/config-provider";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
export function passwordValidator(configModel: PasswordConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let config = getConfigObject(configModel,control);
    let controlValue = control.value;
    if (RegexValidator.isNotBlank(controlValue)) {
      let validation = RegexValidator.isValidPassword(config.validation, controlValue);
      if (!validation.isValid)
        return ObjectMaker.toJson(AnnotationTypes.password, config, [controlValue])
    }
    return ObjectMaker.null();

  }
}
