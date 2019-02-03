import { defaultContainer } from '../core/defaultContainer';
import { PropertyInfo } from '../core/validator.interface';
import { OBJECT_PROPERTY } from "../const"
import { Type } from "../util/type";
import { PropConfig } from "../models/config/prop-config"

export function propObject<T>(entity: Type<T>,config?:PropConfig) {
    var entityType = entity;
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        defaultContainer.initPropertyObject(propertyKey,OBJECT_PROPERTY,entity,target,config);
    }
}
