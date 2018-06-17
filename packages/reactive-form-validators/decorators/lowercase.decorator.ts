import { defaultContainer } from '../core/defaultContainer';
import { DecoratorConfiguration } from '../core/validator.interface';
import { DecoratorName } from "../util/decorator-name";
import { DefaultConfig } from "../models/config/default-config";
import { MessageConfig } from "../models/config/message-config";
import { AnnotationTypes } from "../core/validator.static";

export function lowerCase(config?:MessageConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: number
    ) {
        var decoratorConfiguration: DecoratorConfiguration = {
            propertyIndex: parameterIndex,
            propertyName: propertyKey,
            annotationType: AnnotationTypes.lowerCase,
            config:config
        }
        let isPropertyKey = (propertyKey != undefined);
        defaultContainer.addAnnotation(!isPropertyKey ? target : target.constructor, decoratorConfiguration);
    }
}
