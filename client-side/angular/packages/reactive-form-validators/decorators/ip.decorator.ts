import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { IpConfig } from "../models/config/ip-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function ip(config?:IpConfig) {
    return baseDecoratorFunction(AnnotationTypes.ip, config);
}
export function ipAsync(config?: IpConfig) {
    return baseDecoratorFunction(AnnotationTypes.ip, [baseAsyncValidator(config, AnnotationTypes.ip)], true);
}

