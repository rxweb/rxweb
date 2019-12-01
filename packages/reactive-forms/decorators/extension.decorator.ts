import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { ExtensionConfig } from "../models/config/extension-config";

export function extension(config:ExtensionConfig) {
    return baseDecoratorFunction (AnnotationTypes.extension, config)
}
