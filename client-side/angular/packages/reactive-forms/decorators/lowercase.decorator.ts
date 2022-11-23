import { baseDecoratorFunction } from "./base-decorator.function"
import { MessageConfig } from "../models/config/message-config";
import { AnnotationTypes } from "../core/validator.static";

export function lowerCase(config?:MessageConfig) {
    return baseDecoratorFunction (AnnotationTypes.lowerCase, config)    
}
