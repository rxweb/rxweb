import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { DecoratorName } from "../util/decorator-name"
import { ObjectMaker } from "../util/object-maker";
import { CreditCardType } from "../enums/credit-card-type";
import { CreditCardConfig } from "../models/config/credit-card-config";
import { ApplicationUtil } from "../util/app-util";
import { Linq } from "../util/linq";

export function creditCardValidator(config:CreditCardConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        if ( Linq.IsPassed(formGroupValue, config.conditionalExpressions)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                let isValid = false;
                for (let creditCardType of config.creditCardTypes) {
                    switch (creditCardType) {
                        case CreditCardType.AmericanExpress:
                            isValid = RegexValidator.isValid(controlValue, RegExRule.CreditCard.AmericanExpress);
                            break;
                        case CreditCardType.DinersClub:
                            isValid = RegexValidator.isValid(controlValue, RegExRule.CreditCard.DinersClub);
                            break;
                        case CreditCardType.Discover:
                            isValid = RegexValidator.isValid(controlValue, RegExRule.CreditCard.Discover);
                            break;
                        case CreditCardType.JCB:
                            isValid = RegexValidator.isValid(controlValue, RegExRule.CreditCard.JCB);
                            break;
                        case CreditCardType.Maestro:
                            isValid = RegexValidator.isValid(controlValue, RegExRule.CreditCard.Maestro);
                            break;
                        case CreditCardType.MasterCard:
                            isValid = RegexValidator.isValid(controlValue, RegExRule.CreditCard.MasterCard);
                            break;
                        case CreditCardType.Visa:
                            isValid = RegexValidator.isValid(controlValue, RegExRule.CreditCard.Visa);
                            break;
                    }
                }
                if (!isValid)
                    return ObjectMaker.toJson(DecoratorName.crediCard, config.message || null, [controlValue])
            }
        }
        return ObjectMaker.null();

    }
}
