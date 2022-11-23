import { baseDecoratorFunction } from "./base-decorator.function"
import { AlphaConfig } from "../models/config/alpha-config";
import { AnnotationTypes } from "../core/validator.static";

export function alphaNumeric(config?: AlphaConfig) {
    return baseDecoratorFunction(AnnotationTypes.alphaNumeric, config);
}
