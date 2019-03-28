import {
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { AlphaConfig } from "../models/config/alpha-config";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { getConfigObject } from "../util/config-provider";

export function alphaValidation(params: {
    configModel: AlphaConfig,
    control: AbstractControl
    regExps: RegExp[],
    key: string
}) {
    let config = getConfigObject(params.configModel, params.control);
    if (ValidatorValueChecker.pass(params.control, config)) {
        var isValid = (!config || !config.allowWhiteSpace) ?
            RegexValidator.isValid(params.control.value, params.regExps[0]) :
            RegexValidator.isValid(params.control.value, params.regExps[1]);
        if (!isValid)
            return ObjectMaker.toJson(params.key, config, [params.control.value]);
    }
    return ObjectMaker.null();
}