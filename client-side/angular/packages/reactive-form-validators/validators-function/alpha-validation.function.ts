import {
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { AlphaConfig } from "../models/config/alpha-config";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { getConfigObject } from "../util/config-provider";
import { alphabet, alphaWithWhitespace, alphanumeric, alphanumericWithWitespace } from "../util/alphabet-regex.locale";
import { ReactiveFormConfig } from "../util/reactive-form-config";

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

function getRegex(key, regExps, config) {
    if (config.allowCharacters)
        if (config.allowWhiteSpace)
            regExps[1] = new RegExp(`^[0-9a-zA-Z @${config.allowCharacters}]+$`, ``);
        else
            regExps[0] = new RegExp(`^[0-9a-zA-Z @${config.allowCharacters}]+$`, ``);
    switch (key) {
        case "alpha":
            var alphaLocale = config.locale ? config.locale : ReactiveFormConfig.json && ReactiveFormConfig.json.defaultValidationLocale && ReactiveFormConfig.json.defaultValidationLocale.alpha ? ReactiveFormConfig.json.defaultValidationLocale.alpha : "";
            return [
                alphaLocale && alphaLocale in alphabet ? alphabet[alphaLocale] : regExps[0],
                alphaLocale && alphaLocale in alphaWithWhitespace ? alphaWithWhitespace[alphaLocale] : regExps[1]
            ];
            break;
        case "alphaNumeric":
            var alphaNumericLocale = config.locale ? config.locale : ReactiveFormConfig.json && ReactiveFormConfig.json.defaultValidationLocale && ReactiveFormConfig.json.defaultValidationLocale.alphaNumeric ? ReactiveFormConfig.json.defaultValidationLocale.alphaNumeric : "";

            return [
                alphaNumericLocale && alphaNumericLocale in alphanumeric ? alphanumeric[alphaNumericLocale] : regExps[0],
                alphaNumericLocale && alphaNumericLocale in alphanumericWithWitespace ? alphanumericWithWitespace[alphaNumericLocale] : regExps[1]
            ];
            break;
    }
}



