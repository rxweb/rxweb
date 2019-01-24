import { defaultContainer } from '../core/defaultContainer';
import {AnnotationConfiguration } from '../core/validator.interface';
import { AnnotationTypes } from '../core/validator.static';

export function table(tableName?: string) {
    return function (
        constructor: Function) {
        defaultContainer.addInstanceContainer(constructor, tableName);
    }
}
