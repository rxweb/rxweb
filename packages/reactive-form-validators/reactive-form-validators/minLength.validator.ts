import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";
import { RegexValidator } from "../util/regex-validator";
import { NumberConfig } from "../models/config/number-config";
import { Linq } from "../util/linq";
import { ApplicationUtil } from "../util/app-util";
import { DecoratorName } from "../util/decorator-name";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";

export function minLengthValidator(config:NumberConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        if (Linq.IsPassed(formGroupValue, config.conditionalExpressions)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                if (!(controlValue.length >= config.value))
                    return ObjectMaker.toJson(AnnotationTypes.minLength, config.message || null, [controlValue])
            }
        }
        return ObjectMaker.null();

    }
}
