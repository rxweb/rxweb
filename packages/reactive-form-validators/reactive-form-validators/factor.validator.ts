import {
    FormGroup,
    FormBuilder,
    Validators,
    Validator,
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { FactorConfig } from "../models/config/factor-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function factorValidator(config:FactorConfig): ValidatorFn {

    function positiveFactors(dividend,value){
      let isPositive = false;
      let factors = [];
      let index = 1;
      for (index = 1; index <= Math.floor(Math.sqrt(dividend)); index += 1){
          if (dividend % index === 0)
          {
            if(index == value)
              isPositive = true;
           if (dividend / index !== index)
                if((dividend / index) == value)
                  isPositive = true;
            if(isPositive)
              break;
            }
    }
      return isPositive;
    }

    return (control: FormGroup): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
      const dividendField:any = (control.parent && config.fieldName) ?  ApplicationUtil.getFormControl(config.fieldName,control) : undefined
      const dividend = (config.fieldName && dividendField) ? dividendField.value : config.dividend;
       if (FormProvider.ProcessRule(control,config)) {
        if (RegexValidator.isNotBlank(control.value) && dividend > 0) {
          if (!RegexValidator.isValid(control.value, RegExRule.onlyDigit) || !positiveFactors(dividend,parseInt(control.value)))
            return ObjectMaker.toJson(AnnotationTypes.factor, config.message || null, [control.value]);
        }
      }
        return ObjectMaker.null();
    }
}
