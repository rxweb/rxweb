import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { RequiredConfig } from "../models/config/required-config";
import { FormProvider } from '../util/form-provider';
import { getConfigObject } from "../util/config-provider";
export function requiredTrueValidator(configModel: RequiredConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let config = getConfigObject(configModel, control);
        if (FormProvider.ProcessRule(control, config)) {
            if (control.value !== true) {
                return ObjectMaker.toJson(AnnotationTypes.requiredTrue, config, [])
            }
        }
        return ObjectMaker.null();
    }
}
