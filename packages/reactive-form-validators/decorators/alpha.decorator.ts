import { defaultContainer } from '../core/defaultContainer';
import { DecoratorConfiguration } from '../core/validator.interface';
import { AnnotationTypes } from '../core/validator.static';
import { DecoratorName } from "../util/decorator-name";
import { AlphaConfig } from "../models/config/alpha-config";

export function alpha(config?:AlphaConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: number
    ) {
        var decoratorConfiguration: DecoratorConfiguration = {
            propertyIndex: parameterIndex,
            propertyName: propertyKey,
            annotationType: AnnotationTypes.alpha,
            config: config
        }
        let isPropertyKey = (propertyKey != undefined);
        defaultContainer.addAnnotation(!isPropertyKey ? target : target.constructor, decoratorConfiguration);
    }
}
