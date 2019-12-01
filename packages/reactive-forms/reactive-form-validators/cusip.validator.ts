import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { BaseConfig } from "../models/config/base-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider"

export function cusipValidator(configModel: BaseConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
    let config = getConfigObject(configModel,control);
    if (ValidatorValueChecker.pass(control, config)) {
        var controlValue = control.value.toUpperCase();
        let isValid = RegexValidator.isValid(controlValue, RegExRule.cusip)
        if (isValid) {
         
            let numericValues = controlValue.split("").map((value) => {
                var charCode = value.charCodeAt(0);
                return charCode >= "A".charCodeAt(0) && charCode <= "Z".charCodeAt(0) ? charCode - "A".charCodeAt(0) + 10 : value
            });
            let totalCount = 0;
            for (var i = 0; i < numericValues.length - 1; i++) {
                var numericValue = parseInt(numericValues[i], 10);
                if (i % 2 !== 0) {
                    numericValue *= 2;
                }
                if (numericValue > 9) {
                    numericValue -= 9;
                }
                totalCount += numericValue;
            }

            totalCount = (10 - (totalCount % 10)) % 10;
            isValid = totalCount == numericValues[numericValues.length - 1];
        }      
      if (!isValid)
        return ObjectMaker.toJson(AnnotationTypes.cusip, config, [control.value]);
    }
    return ObjectMaker.null();
  }
}
