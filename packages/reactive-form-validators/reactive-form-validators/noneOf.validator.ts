import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { ArrayConfig } from "../models/config/array-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function noneOfValidator(config: ArrayConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
          if (FormProvider.ProcessRule(control,config)) {
            if (control.value instanceof Array) {
                var testResult = false;
                for(let value of config.matchValues){
                     testResult = control.value.some((y) => y == value);
                    if(testResult)
                     break;
                }
                if (testResult)
                    return ObjectMaker.toJson(AnnotationTypes.noneOf, config.message || null, [control.value]);
            }
        } return ObjectMaker.null();
    }
}
