
import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { BaseConfig } from "../models/config/base-config";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { getConfigObject } from "../util/config-provider";
import { AbstractControl } from "../abstract/abstract-control";

export function regexValidation(
    configModel: BaseConfig,
    control: AbstractControl,
    regExp: RegExp,
    key: string
) {
    let config = getConfigObject(configModel, control);
    if (ValidatorValueChecker.pass(control, config)) {
        if (!RegexValidator.isValid(control.value, regExp))
            return ObjectMaker.toJson(key, config, [control.value]);
    }
    return ObjectMaker.null();
}