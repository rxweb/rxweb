import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from "../core/validator.static";
import { UrlConfig } from "../models/config/url-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function url(config?: UrlConfig) {
    return baseDecoratorFunction (AnnotationTypes.url, config)    
}
export function urlAsync(config?: UrlConfig) {
    return baseDecoratorFunction(AnnotationTypes.url, [baseAsyncValidator(config, AnnotationTypes.url)], true);
}
