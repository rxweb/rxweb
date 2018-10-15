import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { BaseConfig } from "../models/config/base-config";
import { ApplicationUtil } from "../util/app-util";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
export function primeNumberValidator(config: BaseConfig): ValidatorFn {
    function isPrime(value) {
        let isPrimeNumber = value != 1;
        for(var i=2; i<value; i++) {
            if(value % i == 0) {
                isPrimeNumber = false;
                break;
            }
        }
        return isPrimeNumber;
    }
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
          if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                if (!ApplicationUtil.isNumeric(control.value) || !isPrime(control.value))
                    return ObjectMaker.toJson(AnnotationTypes.primeNumber, config.message || null, [control.value]);
            }
        } return ObjectMaker.null();
    }
}
