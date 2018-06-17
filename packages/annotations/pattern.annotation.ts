import { defaultContainer } from '../core/defaultContainer';
import {AnnotationConfiguration } from '../core/validator.interface';
import { AnnotationTypes } from '../core/validator.static';

export function pattern(pattern: string,type?:string, message?: string) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: number
    ) {
        var annotationConfiguration: AnnotationConfiguration = {
            propertyIndex: parameterIndex,
            propertyName: propertyKey,
            annotationType: AnnotationTypes.pattern,
            message: message,
            checkValue: pattern,
            patternType:type
        }
        let isPropertyKey = (propertyKey != undefined);
        defaultContainer.addAnnotation(!isPropertyKey ? target : target.constructor, annotationConfiguration);
    }
}
