import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'

import { ObjectMaker } from "../util/object-maker";
import { ArrayConfig } from "../models/config/array-config";
import { AnnotationTypes } from "../core/validator.static";
import { ApplicationUtil } from "../util/app-util";
import { FormProvider } from "../util/form-provider";
import {getConfigObject} from "../util/config-provider";
import { ARRAY_CONFIG } from "../const/config-names.const";
export function noneOfValidator(configModel: ArrayConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let config = getConfigObject(configModel,control,ARRAY_CONFIG);
        if (FormProvider.ProcessRule(control, config)) {
            var testResult = false; 
            for (let value of config.matchValues) {
                let matchValue = ApplicationUtil.lowerCaseWithTrim(value);
                testResult = Array.isArray(control.value) ? control.value.some((y) => ApplicationUtil.lowerCaseWithTrim(y) === matchValue) : ApplicationUtil.lowerCaseWithTrim(control.value) === matchValue;
                if (testResult)
                    break;
            }
            if (testResult)
                return ObjectMaker.toJson(AnnotationTypes.noneOf, config, [control.value]);
        }
        return ObjectMaker.null();
    }
}
