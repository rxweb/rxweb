import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { ArrayConfig } from "../models/config/array-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';

export function allOfValidator(config: ArrayConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        if (FormProvider.ProcessRule(control,config)) {
            if (control.value instanceof Array) {
                var testResult = false;
                for(let value of config.matchValues){
                     testResult = control.value.some((y) => y == value);
                    if(!testResult)
                     break;
                }
                if (!testResult)
                    return ObjectMaker.toJson(AnnotationTypes.allOf, config.message || null, [control.value]);
            }
        } return ObjectMaker.null();
    }
}
