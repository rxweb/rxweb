import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";
import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { PatternConfig } from "../models/config/pattern-config";
import { ValidatorValueChecker } from "../util/validator-value-checker";
export function patternValidator(config: PatternConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (ValidatorValueChecker.pass(control,config)) {
                for (var pattern in config.expression)
                    if (!(RegexValidator.isValid(control.value, config.expression[pattern])))
                    return ObjectMaker.toJson(pattern, config, [control.value])
            }
        return ObjectMaker.null();
    }
}
