import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";
import { RegexValidator } from "../util/regex-validator";
import { RangeConfig } from "../models/config/range-config";
import { Linq } from "../util/linq";
import { ApplicationUtil } from "../util/app-util";
import { DecoratorName } from "../util/decorator-name";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";

export function rangeValidator(config:RangeConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        if (Linq.IsPassed(formGroupValue, config.conditionalExpression, parentObject)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                if (!(String(controlValue).indexOf(".") == -1 && parseInt(controlValue) >= config.minimumNumber && parseInt(controlValue) <= config.maximumNumber))
                    return ObjectMaker.toJson(AnnotationTypes.range, config.message || null, [config.minimumNumber, config.maximumNumber, controlValue])
            }
        }
        return ObjectMaker.null();
    }
}
