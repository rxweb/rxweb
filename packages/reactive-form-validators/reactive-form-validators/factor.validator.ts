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
import { DecoratorName } from "../util/decorator-name"
import { ObjectMaker } from "../util/object-maker";
import { INVALID } from "../const/validator.const"
import { FactorConfig } from "../models/config/factor-config";
import { AnnotationTypes } from "../core/validator.static";
import { ApplicationUtil } from "../util/app-util";
import { Linq } from "../util/linq";

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
      const dividendField = control.root.get([config.fieldName]);
      const dividend = (config.fieldName && dividendField) ? dividendField.value : config.dividend;
      const controlValue = control.value;
      const formGroupValue = ApplicationUtil.getParentObjectValue(control);
      config = ApplicationUtil.getConfigObject(config);
      const parentObject = (control.parent) ? control.parent.value : undefined;
      if (Linq.IsPassed(formGroupValue, config.conditionalExpression, parentObject)) {
        if (RegexValidator.isNotBlank(controlValue) && dividend > 0) {
          if (positiveFactors(dividend).indexOf(parseInt(controlValue)) == -1)
            return ObjectMaker.toJson(AnnotationTypes.factor, config.message || null, [controlValue]);
        }
      }
        return ObjectMaker.null();
    }
}
