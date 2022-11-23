import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { SizeConfig} from "../models/config/size-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function fileSize(config:SizeConfig) {
    return baseDecoratorFunction (AnnotationTypes.fileSize, config)
}
export function fileSizeAsync(config?: SizeConfig) {
    return baseDecoratorFunction(AnnotationTypes.fileSize, [baseAsyncValidator(config, AnnotationTypes.fileSize)], true);
}
