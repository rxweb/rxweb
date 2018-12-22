import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { DefaultConfig } from "../models/config/default-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
export function endsWithValidator(config: DefaultConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (ValidatorValueChecker.pass(control,config)) {
                var endString = String(control.value).substr(control.value.length - config.value.length,config.value.length);
                if (endString != config.value)
                    return ObjectMaker.toJson(AnnotationTypes.endsWith, config, [control.value,config.value]);
            }
        return ObjectMaker.null();
    }
}
