import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { AlphaConfig } from "../models/config/alpha-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
export function alphaValidator(config: AlphaConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
            if (ValidatorValueChecker.pass(control,config)) {
              var isValid = (!config || !config.allowWhiteSpace) ?
                                  RegexValidator.isValid(control.value, RegExRule.alpha) :
                                  RegexValidator.isValid(control.value, RegExRule.alphaWithSpace);
                if (!isValid)
                    return ObjectMaker.toJson(AnnotationTypes.alpha, config, [control.value]);
            }
         return ObjectMaker.null();
    }
}
