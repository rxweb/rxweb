import { defaultContainer } from '../core/defaultContainer';
import { PropertyInfo } from '../core/validator.interface';
import { ARRAY_PROPERTY } from "../const"
import { Type } from "../util/index";
import { PropConfig } from "../models/config/prop-config"

export function propArray<T>(entity?:Type<T>,config?:PropConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        var propertyInfo: PropertyInfo = {
            name: propertyKey,
            propertyType: ARRAY_PROPERTY,
            entity: entity,
            dataPropertyName: config ? config.name : undefined
        }
        defaultContainer.addProperty(target.constructor, propertyInfo);
    }
}
