import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";
import { RegexValidator } from "../util/regex-validator";
import { MessageConfig } from "../models/config/message-config";
import { ApplicationUtil } from "../util/app-util";
import { Linq } from "../util/linq";
import { DecoratorName } from "../util/decorator-name";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { RequiredConfig } from "../models/config/required-config";

export function requiredValidator(config: RequiredConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        if (Linq.IsPassed(formGroupValue, config.conditionalExpressions)) {
            if (!RegexValidator.isNotBlank(controlValue)) {
                return ObjectMaker.toJson(AnnotationTypes.required, config.message || null, [controlValue])
            }
        }
        return ObjectMaker.null();
    }
}
