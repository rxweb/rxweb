import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";
import { NumberConfig } from "../models/config/number-config";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
export function maxLengthValidator(config: NumberConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (ValidatorValueChecker.pass(control,config)) {
                if (!(control.value.length <= config.value))
                    return ObjectMaker.toJson(AnnotationTypes.maxLength, config, [control.value,config.value])
            }
        return ObjectMaker.null();
    }
}
