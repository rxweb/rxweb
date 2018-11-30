import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";
import { RegexValidator } from "../util/regex-validator";
import { PasswordValidation } from "../models/password-validation.model";
import { PasswordConfig } from "../models/config/password-config";
import { Linq } from "../util/linq";
import { ApplicationUtil } from "../util/app-util";
import { DecoratorName } from "../util/decorator-name";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
export function passwordValidator(config:PasswordConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        let controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        if (RegexValidator.isNotBlank(controlValue)) {
            let validation = RegexValidator.isValidPassword(config.validation, controlValue);
            if (!validation.isValid)
                return ObjectMaker.toJson(AnnotationTypes.password, config.message || null, [controlValue])
            }
        return ObjectMaker.null();

    }
}
