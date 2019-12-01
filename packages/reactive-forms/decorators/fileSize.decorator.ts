import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { SizeConfig} from "../models/config/size-config";

export function fileSize(config:SizeConfig) {
    return baseDecoratorFunction (AnnotationTypes.fileSize, config)
}
