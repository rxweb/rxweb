import { baseDecoratorFunction } from "./base-decorator.function"
import { CreditCardConfig } from "../models/config/credit-card-config";
import { AnnotationTypes } from "../core/validator.static";

export function creditCard(config:CreditCardConfig) {
    return baseDecoratorFunction(AnnotationTypes.creditCard, config);
}
