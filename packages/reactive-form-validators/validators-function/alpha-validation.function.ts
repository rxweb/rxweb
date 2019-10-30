import {
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { AlphaConfig } from "../models/config/alpha-config";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { getConfigObject } from "../util/config-provider";
import { alphabet, alphaWithWhitespace, alphanumeric, alphanumericWithWitespace } from "../util/alphabet-regex.locale";

export function alphaValidation(
    configModel: AlphaConfig,
    control: AbstractControl,
    regExps: RegExp[],
    key: string
) {
    let config = getConfigObject(configModel, control);
    if (ValidatorValueChecker.pass(control, config)) {
        regExps = getRegex(key, regExps, config);
        var isValid = (!config || !config.allowWhiteSpace) ?
            RegexValidator.isValid(control.value, regExps[0]) :
            RegexValidator.isValid(control.value, regExps[1]);
        if (!isValid)
            return ObjectMaker.toJson(key, config, [control.value]);
    }
    return ObjectMaker.null();
}

function getRegex(key: string, regExps: RegExp[], config: any) {
    switch (key) {
        case "alpha":
            return [
                config.locale && config.locale in alphabet ? alphabet[config.locale] : regExps[0],
                config.locale && config.locale in alphaWithWhitespace ? alphaWithWhitespace[config.locale] : regExps[1]
            ]
            break;
        case "alphaNumeric":
            return [
                config.locale && config.locale in alphanumeric ? alphanumeric[config.locale] : regExps[0],
                config.locale && config.locale in alphanumericWithWitespace ? alphanumericWithWitespace[config.locale] : regExps[1]
            ]
            break;
    }

}


