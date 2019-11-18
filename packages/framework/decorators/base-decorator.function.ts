import { frameworkContainer } from '../core/frameworkContainer';
export function baseDecoratorFunction(annotationType: string, config?: any) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        frameworkContainer.addAnnotation(target.constructor, { type: annotationType, propName: propertyKey, config: config })
    }
}
