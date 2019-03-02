import { defaultContainer } from '../core/defaultContainer';
import {AnnotationConfiguration } from '../core/validator.interface';
import { AnnotationTypes } from '../core/validator.static';
export interface ClassType<T> {
    new (...args: any[]): T;
}
export function nested<T>(obj?: ClassType<T>) {
    var nestedPropConstructor = obj;
    return function (
        target: Object,
        propertyKey: string,
        parameterIndex?: number
    ) {
        var annotationConfiguration: AnnotationConfiguration = {
            propertyIndex: parameterIndex,
            propertyName: propertyKey,
            annotationType: AnnotationTypes.nested,
            target: target.constructor
        }
        
        let isPropertyKey = (propertyKey != undefined);
        if (nestedPropConstructor && nestedPropConstructor.constructor) {
            annotationConfiguration.propertyConstructor = nestedPropConstructor.constructor;
        }
        

        defaultContainer.addAnnotation(!isPropertyKey ? target : target.constructor, annotationConfiguration);
    }
}