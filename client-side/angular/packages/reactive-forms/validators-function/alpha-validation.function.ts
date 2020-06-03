

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { AlphaConfig } from "../models/config/alpha-config";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { getConfigObject } from "../util/config-provider";
import { AbstractControl } from "../abstract/abstract-control";

export function alphaValidation(
    configModel: AlphaConfig,
    control: AbstractControl,
    regExps: RegExp[],
    key: string
) {
    let config = getConfigObject(configModel, control);
    if (ValidatorValueChecker.pass(control, config)) {
        var isValid = (!config || !config.allowWhiteSpace) ?
            RegexValidator.isValid(control.value, regExps[0]) :
            RegexValidator.isValid(control.value, regExps[1]);
        if (!isValid)
            return ObjectMaker.toJson(key, config, [control.value]);
    }
    return ObjectMaker.null();
}


