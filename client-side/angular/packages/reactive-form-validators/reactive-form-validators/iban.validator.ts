import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { AnnotationTypes } from "../core/validator.static";
import { IBANConfig } from "../models/config/iban-config";
import { IBAN_COUNTRY_CODE_REGEX } from "../const/iban-country-wise-regex.const";
import { getConfigObject } from "../util/config-provider";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { ObjectMaker } from "../util/object-maker";

function hasValidIbanFormat(value:string,countryCode:string) {
    const strippedStr = value.replace(/[\s\-]+/gi, '').toUpperCase();
    const isoCountryCode = countryCode || strippedStr.slice(0, 2).toUpperCase();

    return (isoCountryCode in IBAN_COUNTRY_CODE_REGEX) &&
        IBAN_COUNTRY_CODE_REGEX[isoCountryCode].test(strippedStr);
}

function hasValidIbanChecksum(str) {
    const strippedStr = str.replace(/[^A-Z0-9]+/gi, '').toUpperCase(); // Keep only digits and A-Z latin alphabetic
    const rearranged = strippedStr.slice(4) + strippedStr.slice(0, 4);
    const alphaCapsReplacedWithDigits = rearranged.replace(/[A-Z]/g, char => char.charCodeAt(0) - 55);

    const remainder = alphaCapsReplacedWithDigits.match(/\d{1,7}/g)
        .reduce((acc, value) => Number(acc + value) % 97, '');

    return remainder === 1;
}

export function ibanValidator(configModel: IBANConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let config: IBANConfig = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            if (!(hasValidIbanFormat(control.value, config.countryCode) && hasValidIbanChecksum(control.value)))
                return ObjectMaker.toJson(AnnotationTypes.iban, config, [control.value, config.countryCode]);
        }
        return ObjectMaker.null();
  }
}
