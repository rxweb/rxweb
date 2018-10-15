import {
    FormGroup,
    FormBuilder,
    Validators,
    Validator,
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { FactorConfig } from "../models/config/factor-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function factorValidator(config:FactorConfig): ValidatorFn {

    function positiveFactors(dividend){
      let factors = [];
      let index = 1;
      for (index = 1; index <= Math.floor(Math.sqrt(dividend)); index += 1){
          if (dividend % index === 0)
          {
           factors.push(index);
           if (dividend / index !== index)
            factors.push(dividend / index);
          }
    }

    factors.sort((x, y) => {return x - y;});  
     return factors;
    }

    return (control: FormGroup): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
      const dividendField = control.root.get([config.fieldName]);
      const dividend = (config.fieldName && dividendField) ? dividendField.value : config.dividend;
       if (FormProvider.ProcessRule(control,config)) {
        if (RegexValidator.isNotBlank(control.value) && dividend > 0) {
          if (positiveFactors(dividend).indexOf(parseInt(control.value)) == -1)
            return ObjectMaker.toJson(AnnotationTypes.factor, config.message || null, [control.value]);
        }
      }
        return ObjectMaker.null();
    }
}
