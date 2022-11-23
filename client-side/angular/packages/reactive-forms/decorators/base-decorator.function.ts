import { defaultContainer } from '../core/defaultContainer';
export function baseDecoratorFunction(annotationType:string,config:any,isAsync:boolean = false) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        defaultContainer.init(target, parameterIndex, propertyKey, annotationType, config,isAsync)
    } 
}
