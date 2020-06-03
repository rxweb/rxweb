import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { BaseConfig } from "../models/config/base-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
export function gridValidator(configModel: BaseConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let config = getConfigObject(configModel,control);
        if (ValidatorValueChecker.pass(control, config)) {
            let controlValue = control.value.toUpperCase();
            var isValid = RegexValidator.isValid(controlValue, RegExRule.grid)
            if (isValid) {
                controlValue = controlValue.replace(/\s/g, '').replace(/-/g, '');
                if ('GRID:' === controlValue.substr(0, 5)) {
                    controlValue = controlValue.substr(5);
                }
                let alphaNums = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                var alphaNumLength = alphaNums.length,
                    length = controlValue.length,
                    check = Math.floor(alphaNumLength / 2);
                for (var i = 0; i < length; i++) {
                    check = (((check || alphaNumLength) * 2) % (alphaNumLength + 1) + alphaNums.indexOf(controlValue.charAt(i))) % alphaNumLength;
                }
                isValid = (check === 1);
            }
            if (!isValid)
                return ObjectMaker.toJson(AnnotationTypes.grid, config, [control.value]);
        }
        return ObjectMaker.null();
    }
}
