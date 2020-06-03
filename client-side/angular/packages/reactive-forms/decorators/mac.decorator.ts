import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { BaseConfig} from "../models/config/base-config";

export function mac(config?:BaseConfig) {
    return baseDecoratorFunction (AnnotationTypes.mac,config)
}
