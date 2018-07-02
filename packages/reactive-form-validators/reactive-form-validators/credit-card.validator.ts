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
import { AnnotationTypes } from "../core/validator.static";

export function creditCardValidator(config:CreditCardConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        if (Linq.IsPassed(formGroupValue, config.conditionalExpressions, parentObject)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                let isValid = false;
                for (let creditCardType of config.creditCardTypes) {
                    switch (creditCardType) {
                        case CreditCardType.AmericanExpress:
                            isValid = RegexValidator.isValid(controlValue, RegExRule.creditCard.AmericanExpress);
                            break;
                        case CreditCardType.DinersClub:
                            isValid = RegexValidator.isValid(controlValue, RegExRule.creditCard.DinersClub);
                            break;
                        case CreditCardType.Discover:
                            isValid = RegexValidator.isValid(controlValue, RegExRule.creditCard.Discover);
                            break;
                        case CreditCardType.JCB:
                            isValid = RegexValidator.isValid(controlValue, RegExRule.creditCard.JCB);
                            break;
                        case CreditCardType.Maestro:
                            isValid = RegexValidator.isValid(controlValue, RegExRule.creditCard.Maestro);
                            break;
                        case CreditCardType.MasterCard:
                            isValid = RegexValidator.isValid(controlValue, RegExRule.creditCard.MasterCard);
                            break;
                        case CreditCardType.Visa:
                            isValid = RegexValidator.isValid(controlValue, RegExRule.creditCard.Visa);
                            break;
                    }
                }
                if (!isValid)
                    return ObjectMaker.toJson(AnnotationTypes.creditCard, config.message || null, [controlValue])
            }
        }
        return ObjectMaker.null();

    }
}
