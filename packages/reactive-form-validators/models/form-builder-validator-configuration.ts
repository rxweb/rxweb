import {ValidatorFn } from '@angular/forms'
import { PropValidationConfig } from "./prop-validation-config";

export interface FormBuilderValidatorConfiguration{
      applyAllProps?:ValidatorFn[];
      excludeProps?:string[];
      dynamicValidation?:{ [key: string]: PropValidationConfig;
}


