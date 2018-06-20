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

export function uppercaseValidator(config: MessageConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        if (Linq.IsPassed(formGroupValue, config.conditionalExpressions, parentObject)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                if (!(controlValue === controlValue.toUpperCase()))
                    return ObjectMaker.toJson(AnnotationTypes.upperCase, config.message || null, [controlValue])
            }
        }
        return ObjectMaker.null();

    }
}
