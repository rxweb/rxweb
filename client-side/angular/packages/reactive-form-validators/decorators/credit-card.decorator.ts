import { baseDecoratorFunction } from "./base-decorator.function"
import { CreditCardConfig } from "../models/config/credit-card-config";
import { AnnotationTypes } from "../core/validator.static";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function creditCard(config:CreditCardConfig) {
    return baseDecoratorFunction(AnnotationTypes.creditCard, config);
}
export function creditCardAsync(config?: CreditCardConfig) {
    return baseDecoratorFunction(AnnotationTypes.creditCard, [baseAsyncValidator(config, AnnotationTypes.creditCard)], true);
}
