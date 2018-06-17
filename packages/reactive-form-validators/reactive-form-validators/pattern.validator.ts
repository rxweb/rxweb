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
import { PatternConfig } from "../models/config/pattern-config";
import { AnnotationTypes } from "../core/validator.static";

export function patternValidator(config: PatternConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        if (Linq.IsPassed(formGroupValue, config.conditionalExpressions)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                for (var pattern in config.pattern)
                    if (!(RegexValidator.isValid(controlValue, config.pattern[pattern])))
                    return ObjectMaker.toJson(pattern, config.message || null, [controlValue])
            }
        }
        return ObjectMaker.null();
    }
}
