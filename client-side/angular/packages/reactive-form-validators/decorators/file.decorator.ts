import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { FileConfig} from "../models/config/file-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function file(config?:FileConfig) {
    return baseDecoratorFunction(AnnotationTypes.file, config)
}
export function fileAsync(config?: FileConfig) {
    return baseDecoratorFunction(AnnotationTypes.file, [baseAsyncValidator(config, AnnotationTypes.file)], true);
}
