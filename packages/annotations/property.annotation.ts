import { defaultContainer } from '../core/defaultContainer';
import {AnnotationConfiguration } from '../core/validator.interface';
import { AnnotationTypes } from '../core/validator.static';

export function property(propertyName?: string) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: number
    ) {
        defaultContainer.addPropertyName(target, propertyName);
    }
}
