import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { FileConfig} from "../models/config/file-config";

export function file(config?:FileConfig) {
    return baseDecoratorFunction (AnnotationTypes.file, config)
}
