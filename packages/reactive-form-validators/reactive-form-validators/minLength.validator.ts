import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";
import { NumberConfig } from "../models/config/number-config";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
export function minLengthValidator(config:NumberConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (ValidatorValueChecker.pass(control,config)) {
            if (!(String(control.value).length >= config.value))
                    return ObjectMaker.toJson(AnnotationTypes.minLength, config, [control.value,config.value])
            }
        return ObjectMaker.null();
    }
}
