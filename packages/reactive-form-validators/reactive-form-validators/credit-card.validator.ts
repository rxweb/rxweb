import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { DecoratorName } from "../util/decorator-name"
import { ObjectMaker } from "../util/object-maker";
import { CreditCardTypes } from "../const/credit-card-types";
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
        if (Linq.IsPassed(formGroupValue, config.conditionalExpression, parentObject)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                let isValid = false;
                let cardTypes = config.fieldName && parentObject[config.fieldName] ? [parentObject[config.fieldName]] : config.creditCardTypes
                for (let creditCardType of cardTypes) {
                    switch (creditCardType) {
                        case "AmericanExpress":
                            isValid = RegexValidator.isValid(controlValue, RegExRule.creditCard.AmericanExpress);
                            break;
                        case "DinersClub":
                            isValid = RegexValidator.isValid(controlValue, RegExRule.creditCard.DinersClub);
                            break;
                        case "Discover":
                            isValid = RegexValidator.isValid(controlValue, RegExRule.creditCard.Discover);
                            break;
                        case "JCB":
                            isValid = RegexValidator.isValid(controlValue, RegExRule.creditCard.JCB);
                            break;
                        case "Maestro":
                            isValid = RegexValidator.isValid(controlValue, RegExRule.creditCard.Maestro);
                            break;
                        case "MasterCard":
                            isValid = RegexValidator.isValid(controlValue, RegExRule.creditCard.MasterCard);
                            break;
                        case "Visa":
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
