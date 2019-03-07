import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { CreditCardConfig } from "../models/config/credit-card-config";
import { ApplicationUtil } from "../util/app-util";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { checkLength } from '../util/check-length'
import { calculate } from '../algorithm/luhn-algorithm'

export function creditCardValidator(config: CreditCardConfig): ValidatorFn {
    let cardDigits: { [key: string]: number[] } = {
        AmericanExpress: [15],
        DinersClub: [14, 16, 19],
        Discover: [16, 19],
        JCB: [16, 19],
        Maestro: [12, 16, 19],
        MasterCard: [16],
        Visa: [13, 16, 19]
    }
    function validate(creditCardNumber: string) {
        var digit = parseInt(creditCardNumber.substring(creditCardNumber.length - 1, creditCardNumber.length));
        return calculate(creditCardNumber.substring(0, creditCardNumber.length - 1)) == parseInt(String(digit)) ? !0 : !1
    }

    function getCardProviderName(cardNumber:string) {
        var cardProviderName = "";
        return /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/.test(cardNumber) ? cardProviderName = "Maestro" : /^5[1-5]/.test(cardNumber) ? cardProviderName = "MasterCard" : /^4/.test(cardNumber) ? cardProviderName = "Visa" : /^3[47]/.test(cardNumber) ? cardProviderName = "AmericanExpress" : /^(?:2131|1800|35)/.test(cardNumber) ? cardProviderName = "JCB" : /^3(?:0[0-5]|[68])/.test(cardNumber) ? cardProviderName = "DinersClub" : /^6(?:011|5)/.test(cardNumber) && (cardProviderName = "Discover"), cardProviderName;
    }

    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        config = ApplicationUtil.getConfigObject(config);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        if (FormProvider.ProcessRule(control, config)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                let isValid = false;
                let cardTypes = config.fieldName && parentObject[config.fieldName] ? [parentObject[config.fieldName]] : config.creditCardTypes
                let cardType: string = '';
                for (let creditCardType of cardTypes) {
                    isValid = checkLength(controlValue.length, cardDigits[creditCardType]) && getCardProviderName(controlValue) == creditCardType && validate(controlValue);
                    cardType = creditCardType;
                    if (isValid)
                        break;
                }
                if (!isValid)
                    return ObjectMaker.toJson(AnnotationTypes.creditCard, config, [controlValue, cardType])
            }
        }
        return ObjectMaker.null();

    }
}
