import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { NumericConfig } from "../models/config/numeric-config";
import { AnnotationTypes } from "../core/validator.static";
import { ApplicationUtil } from '../util/app-util';
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { VALIDATOR_CONFIG  } from "../const/app.const";
import {getConfigObject} from "../util/config-provider";
export function numericValidator(configModel: NumericConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null=> {
        if (configModel && (!control[VALIDATOR_CONFIG] || !control[VALIDATOR_CONFIG][AnnotationTypes.numeric]))
            ApplicationUtil.configureControl(control, configModel, AnnotationTypes.numeric);
        let config = getConfigObject(configModel,control);
        if (ValidatorValueChecker.pass(control, config)) {
            if (!RegexValidator.isValid(control.value, ApplicationUtil.numericValidation(config.allowDecimal, config.acceptValue)))
                return ObjectMaker.toJson(AnnotationTypes.numeric, config, [control.value]);
        }
        return ObjectMaker.null();
    }
}
