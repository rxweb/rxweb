import { defaultContainer } from '../core/defaultContainer';
import { OBJECT_PROPERTY } from "../const"
import { Type } from "../util/type";
import { PropObjectConfig } from "../models/config/prop-config"

export function propObject<T>(entity?: Type<T>, config?: PropObjectConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        defaultContainer.initPropertyObject(propertyKey,OBJECT_PROPERTY,entity,target,config);
    }
}
