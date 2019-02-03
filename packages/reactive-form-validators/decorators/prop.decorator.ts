import { defaultContainer } from '../core/defaultContainer';
import { PropertyInfo } from '../core/validator.interface';
import { PROPERTY } from "../const"
import { PropConfig } from "../models/config/prop-config"
export function prop(config?:PropConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        var propertyInfo: PropertyInfo = {
            name : propertyKey,
            propertyType: PROPERTY,
            dataPropertyName: config ? config.name : undefined
        }
        defaultContainer.addProperty(target.constructor, propertyInfo);
    }
}
