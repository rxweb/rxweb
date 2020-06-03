import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from "../core/validator.static";
import { UrlConfig } from "../models/config/url-config";

export function url(config?: UrlConfig) {
    return baseDecoratorFunction (AnnotationTypes.url, config)    
}
