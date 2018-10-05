import { defaultContainer } from '../core/defaultContainer';
import { DecoratorConfiguration } from '../core/validator.interface';
import { DecoratorName } from "../util/decorator-name";
import { CreditCardType } from "../enums/credit-card-type"
import { CreditCardConfig } from "../models/config/credit-card-config";
import { AnnotationTypes } from "../core/validator.static";
export function creditCard(config:CreditCardConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.creditCard, config)    
    }
}
