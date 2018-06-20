import { defaultContainer } from '../core/defaultContainer';
import { DecoratorConfiguration } from '../core/validator.interface';
import { DecoratorName } from "../util/decorator-name";
import { AnnotationTypes } from "../core/validator.static";
import { DefaultConfig } from "../models/config/default-config";

export function json(config?: DefaultConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: number
    ) {
        var decoratorConfiguration: DecoratorConfiguration = {
            propertyIndex: parameterIndex,
            propertyName: propertyKey,
            annotationType: AnnotationTypes.json,
            config: config
        }
        let isPropertyKey = (propertyKey != undefined);
        defaultContainer.addAnnotation(!isPropertyKey ? target : target.constructor, decoratorConfiguration);
    }
}
