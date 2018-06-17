import { defaultContainer } from '../core/defaultContainer';
import { PropertyInfo } from '../core/validator.interface';
import { ARRAY_PROPERTY } from "../const"
import { Type } from "../util/index";


export function propArray<T>(entity:Type<T>) {
    var entityType = entity;
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: number
    ) {
        var propertyInfo: PropertyInfo = {
            name: propertyKey,
            propertyType: ARRAY_PROPERTY,
            entity: entity
        }
        defaultContainer.addProperty(target.constructor, propertyInfo);
    }
}
