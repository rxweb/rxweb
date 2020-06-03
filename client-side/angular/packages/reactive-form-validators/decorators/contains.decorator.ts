import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from "../core/validator.static";
import { ContainsConfig } from "../models/config/contains-config";

export function contains(config:ContainsConfig) {
    return baseDecoratorFunction(AnnotationTypes.contains, config);
}
