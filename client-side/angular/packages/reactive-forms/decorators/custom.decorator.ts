import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { CustomConfig } from "../models/config/custom-config";

export function custom(config?:CustomConfig) {
    return baseDecoratorFunction(AnnotationTypes.custom,config);
}
