import { defaultContainer } from '../core/defaultContainer';
import { PropertyInfo } from '../core/validator.interface';
import { PROPERTY } from "../const"

export function prop() {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: number
    ) {
        var propertyInfo: PropertyInfo = {
            name : propertyKey,
            propertyType: PROPERTY
        }
        defaultContainer.addProperty(target.constructor, propertyInfo);
    }
}
