import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { ComposeConfig } from "../models/config/compose-config";

export function compose(config?:ComposeConfig) {
    return baseDecoratorFunction(AnnotationTypes.compose,config);
}
