import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { IpConfig } from "../models/config/ip-config";

export function ip(config?:IpConfig) {
    return baseDecoratorFunction(AnnotationTypes.ip, config);
}

